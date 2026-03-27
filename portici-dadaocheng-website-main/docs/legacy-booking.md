# Mixed-mode system: frontstage vs legacy booking

This project deliberately runs in **two parallel modes**:

| Mode | Purpose |
|------|--------|
| **Frontstage (default)** | Editorial-led discovery, **interest-led** capture for live programs (`program_interests`), optional newsletter coupling. |
| **Legacy booking / deposit** | **Invited or conditional** flows: pick a dated session, create a booking record, pay a **50% deposit** via **Stripe Checkout**, confirmation email, admin operations. |

Neither mode is a mistake. **Do not remove legacy logic** without an explicit product and operations decision.

---

## 1. User-facing route roles

Routes below are defined in `client/src/App.tsx` unless noted.

| Route | Role |
|-------|------|
| **`/`** | Home: editorial entry, links to Magazine, Sessioni (`/eventi`), Laboratori (`/workshop`), newsletter, etc. |
| **`/eventi`** | **Sessioni**: demand-led framing; **`ProgramInterestSection`** (interest form + optional newsletter). Primary public path for “I’m interested in this line.” |
| **`/workshop`** | **Laboratori**: editorial/vision page; lists **DB-backed** workshop lines and sessions (`trpc.workshops.listAllWithSessions`). Primary CTA = interest → `/eventi`; secondary = **legacy deposit** link → `/workshops?booking=1&slug=…`. |
| **`/workshop/calligraphy`** | Deep dive / gallery for calligraphy; CTAs point to interest (`/eventi?interesse=…`) and related pages. |
| **`/workshops`** | **Mixed-mode:** **Default** = same interest UI as Sessioni (no global nav chrome; local nav). **Legacy** = full booking + deposit flow when activated (see query params below). |
| **`/booking/success`** | **Stripe success return URL** after deposit Checkout. Shows confirmation copy and `code` query param (booking confirmation code). Not used by interest-only users. |
| **`/admin`** | **Operators only** (`admin` role): bookings, workshop/session management, **program interests** export/list. |

Other public routes (e.g. `/magazine`, `/newsletter`, `/fondatrici`, `/contatti`, `/spazio`, `/articoli/…`) are editorial or content; they are not part of the deposit pipeline except as navigation.

---

## 2. Primary frontstage routes

These embody the **default public strategy** (editorial + interest, not checkout-first):

- **`/`**
- **`/eventi`**
- **`/magazine`**, **`/newsletter`** (and article routes under `/articoli`)

**`/workshop`** and **`/workshop/calligraphy`** are frontstage **storytelling** routes; they **feed** interest and may **link** to legacy only for invited users.

---

## 3. Retained legacy / mixed-mode routes

- **`/workshops`** — Interest by default; **legacy booking UI** when `legacyBooking` is on (`booking=1`, `slug=`, or in-page “Apri conferma e deposito”).
- **`/booking/success`** — Post-payment landing for Stripe.
- **`/admin`** — Operates on `bookings`, `workshop_sessions`, `workshops`, and `program_interests`.

Server: **`trpc.workshops.*`** (create booking, checkout session), **`server/stripe/workshopCheckout.ts`**, **`server/stripe/webhook.ts`**, **`sendBookingConfirmation`** in `server/email/resend.ts`.

---

## 4. Query parameters

### `/workshops` (legacy gate + deep link)

| Param | Behavior |
|-------|----------|
| **`booking=1`** | Opens **legacy** booking flow (workshop list → session → form → review → Stripe). |
| **`slug=<workshopSlug>`** | Also opens **legacy** and, on load, jumps to **session selection** for that workshop slug (skips the initial grid). |
| **`booking_cancelled=1`** | Present on **Stripe `cancel_url`** together with `booking=1`. User returns to legacy-capable page after abandoning Checkout (slug is **not** preserved in `cancel_url` today — user lands on list step). |

### Interest prefill (`ProgramInterestSection`)

The same component reads the query string on **`/eventi`** and on the **default (non-legacy)** view of **`/workshops`**, so deep links work on either route.

| Param | Behavior |
|-------|----------|
| **`interesse=<conceptSlug>`** | Pre-selects a **curated** concept if it matches `client/src/data/programConcepts.ts` (e.g. `calligraphy-ink`, `food-cultural`). |
| **`refSlug=<slug>`** + **`refTitle=<encodedTitle>`** | Pre-fills interest as a **workshop line from the site** (e.g. from `/workshop` cards). `refTitle` should be URL-encoded; slug stored as `workshop-<refSlug>` for `program_interests.topicSlug`. |

**Note:** `interesse` and `refSlug`/`refTitle` are for **interest capture**, not Stripe.

### `/booking/success`

| Param | Behavior |
|-------|----------|
| **`code=<confirmationCode>`** | Displayed to the user (matches booking confirmation code). |
| **`session_id={CHECKOUT_SESSION_ID}`** | Stripe placeholder; appended by Stripe for correlation (app may not read it). |

---

## 5. Stripe dependencies

Configured in **`server/stripe/workshopCheckout.ts`** (`createWorkshopCheckoutSession`).

| Setting | Current value (pattern) | Why it matters |
|---------|-------------------------|----------------|
| **`success_url`** | `{origin}/booking/success?code={confirmationCode}&session_id={CHECKOUT_SESSION_ID}` | User must land on a route that **exists** and matches product copy. Changing path or required query shape breaks **live** checkouts and bookmarks. |
| **`cancel_url`** | `{origin}/workshops?booking=1&booking_cancelled=1` | User must return to a page that still exposes **legacy** booking. **`booking=1`** is required so the app opens legacy mode (plain `/workshops` is interest-only). |

**Sync rule:** If you change **`/workshops`**, **`/booking/success`**, or these query conventions, update **`workshopCheckout.ts`** and redeploy. If Stripe Dashboard or another system hardcodes URLs, update those too.

Webhook handler: **`server/stripe/webhook.ts`** on **`/api/stripe/webhook`** (see `server/_core/index.ts`); marks deposit paid, updates session spots, sends confirmation email, notifies owner.

---

## 6. Operational rule (single sentence)

- **Default public flow** = interest-led (`/eventi`, default `/workshops`, editorial routes).
- **Legacy booking / deposit** = **invited or conditional** use (direct links with `?booking=1` / `?slug=`, or “Ho un invito” from `/workshop`).

---

## 7. Naming debt (intentional)

The codebase and database still use **`workshop`**, **`booking`**, **`workshops` router**, tables **`workshops` / `workshop_sessions` / `bookings`**, and filenames like **`Workshop.tsx` / `Workshops.tsx`**. That reflects **historical schema and APIs**, not an accidental reversion to “booking-first” product.

- **`/workshop`** (singular) ≈ editorial **Laboratori** page.  
- **`/workshops`** (plural) ≈ **mixed** page (interest + legacy machinery).

Renaming routes, routers, or tables is a **future migration**; until then, treat this as **documented technical debt**, not a bug.

---

## 8. Related implementation pointers

| Concern | Location |
|---------|----------|
| Interest API | `trpc.programInterest.register`, `server/routers/programInterest.ts`, table `program_interests` |
| Interest UI + URL parsing | `client/src/components/ProgramInterestSection.tsx` |
| Legacy UI gate | `client/src/pages/Workshops.tsx` (`legacyBooking`, `useEffect` on `searchParams`) |
| Booking + checkout API | `server/routers/workshops.ts` |
| Admin interests | `trpc.admin.listProgramInterests`, tab in `client/src/pages/Admin.tsx` |

---

## Ambiguities to clarify later (not blockers)

- **`cancel_url`** does not include **`slug`**; users who cancel Checkout may need to re-select the workshop from the list.
- **`trpc.workshops.getBooking`** exists but is **not** referenced from the current client bundle; confirm no external consumers before removing or repurposing.
- **Admin** booking cancel path and **session `spotsBooked`** updates should be validated in a dedicated ops/QA pass (separate from this doc).
