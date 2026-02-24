/**
 * Tests for Stripe Webhook handler
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock Stripe
vi.mock("stripe", () => {
  const mockStripe = {
    webhooks: {
      constructEvent: vi.fn(),
    },
  };
  return { default: vi.fn(() => mockStripe) };
});

import { handleStripeWebhook } from "./stripe/webhook";
import { getDb } from "./db";
import Stripe from "stripe";

function makeReqRes(body: any, sig?: string) {
  const req: any = {
    headers: { "stripe-signature": sig ?? "test-sig" },
    body,
  };
  const res: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return { req, res };
}

describe("Stripe Webhook — /api/stripe/webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure STRIPE_WEBHOOK_SECRET is not set so we skip sig verification in tests
    delete process.env.STRIPE_WEBHOOK_SECRET;
  });

  it("returns 200 and received:true for a valid checkout.session.completed event", async () => {
    const mockEvent = {
      id: "evt_test_001",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_001",
          metadata: {
            booking_id: "42",
            confirmation_code: "PD-ABCDEF",
          },
        },
      },
    };

    const mockBooking = {
      id: 42,
      sessionId: 10,
      participants: 2,
      paymentStatus: "pending",
      status: "pending",
      depositAmountEur: "35.00",
      guestName: "Mario Rossi",
      guestEmail: "mario@test.com",
    };

    const mockSession = {
      id: 10,
      spotsBooked: 3,
    };

    let selectCallCount = 0;
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockImplementation(() => {
        selectCallCount++;
        if (selectCallCount === 1) return Promise.resolve([mockBooking]);
        return Promise.resolve([mockSession]);
      }),
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
    };

    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const { req, res } = makeReqRes(mockEvent);
    await handleStripeWebhook(req, res);

    expect(res.json).toHaveBeenCalledWith({ received: true });
    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.status).not.toHaveBeenCalledWith(500);
  });

  it("returns 200 without error for unknown event types (no-op)", async () => {
    const mockEvent = {
      id: "evt_test_002",
      type: "payment_intent.created",
      data: { object: {} },
    };

    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue([]),
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
    };

    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const { req, res } = makeReqRes(mockEvent);
    await handleStripeWebhook(req, res);

    expect(res.json).toHaveBeenCalledWith({ received: true });
  });

  it("returns 400 when Stripe signature verification fails", async () => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";

    const stripeInstance = new Stripe("", {} as any);
    vi.mocked(stripeInstance.webhooks.constructEvent).mockImplementation(() => {
      throw new Error("No signatures found matching the expected signature for payload");
    });

    const { req, res } = makeReqRes(Buffer.from("{}"), "invalid-sig");
    await handleStripeWebhook(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("skips processing if booking is already deposit_paid (idempotency)", async () => {
    const mockEvent = {
      id: "evt_test_003",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_003",
          metadata: {
            booking_id: "99",
            confirmation_code: "PD-XXXXXX",
          },
        },
      },
    };

    const alreadyPaidBooking = {
      id: 99,
      sessionId: 5,
      participants: 1,
      paymentStatus: "deposit_paid", // already paid
      status: "confirmed",
      depositAmountEur: "20.00",
      guestName: "Test User",
      guestEmail: "test@test.com",
    };

    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValueOnce([alreadyPaidBooking]),
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
    };

    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const { req, res } = makeReqRes(mockEvent);
    await handleStripeWebhook(req, res);

    expect(res.json).toHaveBeenCalledWith({ received: true });
    // update should NOT have been called since booking is already paid
    expect(mockDb.update).not.toHaveBeenCalled();
  });
});
