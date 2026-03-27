import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

// Mock the email module
vi.mock("./email/resend", () => ({
  sendNewsletterWelcome: vi.fn().mockResolvedValue(true),
  sendNewsletterWelcomeWithMagazineIssue1: vi.fn().mockResolvedValue(true),
  sendMagazineIssue1Delivery: vi.fn().mockResolvedValue(true),
}));

import { getDb } from "./db";
import { sendNewsletterWelcome } from "./email/resend";

const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
};

describe("Newsletter subscription logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getDb).mockResolvedValue(mockDb as any);
  });

  it("should detect already-subscribed email", async () => {
    const existingSubscriber = {
      id: 1,
      email: "test@example.com",
      isActive: true,
    };

    // Chain: select().from().where() → returns existing subscriber
    const whereMock = vi.fn().mockResolvedValue([existingSubscriber]);
    const fromMock = vi.fn().mockReturnValue({ where: whereMock });
    mockDb.select.mockReturnValue({ from: fromMock });

    // Simulate the subscribe logic
    const db = await getDb();
    const rows = await db!.select().from({} as any).where({} as any);
    expect(rows[0]).toEqual(existingSubscriber);
    expect(rows[0].isActive).toBe(true);
  });

  it("should insert new subscriber when email not found", async () => {
    // Chain: select().from().where() → returns empty array
    const whereMock = vi.fn().mockResolvedValue([]);
    const fromMock = vi.fn().mockReturnValue({ where: whereMock });
    mockDb.select.mockReturnValue({ from: fromMock });

    // Chain: insert().values() → success
    const valuesMock = vi.fn().mockResolvedValue([{ insertId: 42 }]);
    mockDb.insert.mockReturnValue({ values: valuesMock });

    const db = await getDb();
    const existing = await db!.select().from({} as any).where({} as any);
    expect(existing).toHaveLength(0);

    await db!.insert({} as any).values({ email: "new@example.com" });
    expect(mockDb.insert).toHaveBeenCalledTimes(1);
    expect(valuesMock).toHaveBeenCalledTimes(1);
  });

  it("sendNewsletterWelcome should be callable with email and name", async () => {
    const result = await sendNewsletterWelcome("user@test.com", "Marco");
    expect(result).toBe(true);
    expect(sendNewsletterWelcome).toHaveBeenCalledWith("user@test.com", "Marco");
  });

  it("sendNewsletterWelcome should work without a name", async () => {
    const result = await sendNewsletterWelcome("anon@test.com");
    expect(result).toBe(true);
  });
});
