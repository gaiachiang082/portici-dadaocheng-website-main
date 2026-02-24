import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/* ─────────────────────────────────────────────────────────────────
   WORKSHOPS — 工作坊課程
   ───────────────────────────────────────────────────────────────── */
export const workshops = mysqlTable("workshops", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  titleZh: varchar("titleZh", { length: 256 }),
  category: varchar("category", { length: 64 }).notNull(), // calligraphy | ink | food | tea
  description: text("description"),
  descriptionZh: text("descriptionZh"),
  durationMinutes: int("durationMinutes").default(120),
  maxParticipants: int("maxParticipants").default(12),
  priceEur: decimal("priceEur", { precision: 10, scale: 2 }).notNull(), // full price in EUR
  depositPercent: int("depositPercent").default(50), // % to pay upfront
  location: varchar("location", { length: 256 }),
  imageUrl: text("imageUrl"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Workshop = typeof workshops.$inferSelect;
export type InsertWorkshop = typeof workshops.$inferInsert;

/* ─────────────────────────────────────────────────────────────────
   WORKSHOP SESSIONS — 每場次日期時間
   ───────────────────────────────────────────────────────────────── */
export const workshopSessions = mysqlTable("workshop_sessions", {
  id: int("id").autoincrement().primaryKey(),
  workshopId: int("workshopId").notNull(),
  sessionDate: timestamp("sessionDate").notNull(), // UTC
  spotsTotal: int("spotsTotal").default(12).notNull(),
  spotsBooked: int("spotsBooked").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WorkshopSession = typeof workshopSessions.$inferSelect;

/* ─────────────────────────────────────────────────────────────────
   BOOKINGS — 報名記錄
   ───────────────────────────────────────────────────────────────── */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  workshopId: int("workshopId").notNull(),

  // Guest info (no login required)
  guestName: varchar("guestName", { length: 256 }).notNull(),
  guestEmail: varchar("guestEmail", { length: 320 }).notNull(),
  guestPhone: varchar("guestPhone", { length: 64 }),
  guestCountry: varchar("guestCountry", { length: 128 }),
  participants: int("participants").default(1).notNull(),
  notes: text("notes"),

  // Payment
  totalAmountEur: decimal("totalAmountEur", { precision: 10, scale: 2 }).notNull(),
  depositAmountEur: decimal("depositAmountEur", { precision: 10, scale: 2 }).notNull(),
  balanceAmountEur: decimal("balanceAmountEur", { precision: 10, scale: 2 }).notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 256 }),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 256 }),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "deposit_paid", "fully_paid", "refunded", "cancelled"]).default("pending").notNull(),
  depositPaidAt: timestamp("depositPaidAt"),
  balancePaidAt: timestamp("balancePaidAt"),

  // Booking status
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending").notNull(),
  confirmationCode: varchar("confirmationCode", { length: 32 }).unique(),
  cancelledAt: timestamp("cancelledAt"),
  cancellationReason: text("cancellationReason"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

/* ─────────────────────────────────────────────────────────────────
   NEWSLETTER SUBSCRIBERS
   ───────────────────────────────────────────────────────────────── */
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 256 }),
  language: varchar("language", { length: 8 }).default("it"),
  source: varchar("source", { length: 64 }).default("website"), // website | booking | event
  isActive: boolean("isActive").default(true).notNull(),
  welcomeSentAt: timestamp("welcomeSentAt"),
  unsubscribedAt: timestamp("unsubscribedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
