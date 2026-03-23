import { z } from "zod";

/**
 * Raw process.env shape before defaults and production constraints.
 * Booleans are not read via `envVar === "literal"` (that pattern produced booleans and leaked secrets).
 */
const envSchema = z
  .object({
    NODE_ENV: z.string().optional(),
    VITE_APP_ID: z.string().optional(),
    JWT_SECRET: z.string().optional(),
    OAUTH_SERVER_URL: z.string().optional(),
    OWNER_OPEN_ID: z.string().optional(),
    BUILT_IN_FORGE_API_URL: z.string().optional(),
    BUILT_IN_FORGE_API_KEY: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.NODE_ENV === "production") {
      if (!(data.VITE_APP_ID ?? "").trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "VITE_APP_ID is required in production (OAuth client id).",
          path: ["VITE_APP_ID"],
        });
      }
      const jwt = (data.JWT_SECRET ?? "").trim();
      if (jwt.length < 16) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "JWT_SECRET is required in production (min 16 characters).",
          path: ["JWT_SECRET"],
        });
      }
    }
  });

const parsed = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  VITE_APP_ID: process.env.VITE_APP_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  OAUTH_SERVER_URL: process.env.OAUTH_SERVER_URL,
  OWNER_OPEN_ID: process.env.OWNER_OPEN_ID,
  BUILT_IN_FORGE_API_URL: process.env.BUILT_IN_FORGE_API_URL,
  BUILT_IN_FORGE_API_KEY: process.env.BUILT_IN_FORGE_API_KEY,
});

/** Derived from validated NODE_ENV (same signal used in Zod production checks). */
const isProduction = parsed.NODE_ENV === "production";

const trim = (value: string | undefined) => (value ?? "").trim();

/** Fixed key used only when NODE_ENV is not production and JWT_SECRET is unset. */
const DEV_JWT_FALLBACK = "dev-only-insecure-jwt-secret";

const jwtFromEnv = trim(parsed.JWT_SECRET);

let cookieSecret: string;
if (jwtFromEnv.length > 0) {
  cookieSecret = jwtFromEnv;
} else if (!isProduction) {
  console.warn(
    "[env] JWT_SECRET is not set (or is only whitespace). Using a built-in development signing key — " +
      "sessions are not secret between restarts or machines. Set JWT_SECRET in .env for local auth parity with production."
  );
  cookieSecret = DEV_JWT_FALLBACK;
} else {
  throw new Error(
    "[env] JWT_SECRET is empty in production after Zod validation — this should be impossible."
  );
}

/**
 * Validated server configuration. Same property names as before for call-site compatibility.
 */
export const ENV = {
  /** OAuth / WebDev client id (historically exposed to Vite as VITE_APP_ID). */
  appId: trim(parsed.VITE_APP_ID),
  /** Symmetric key for session JWT (JWT_SECRET, or dev fallback when allowed). */
  cookieSecret,
  oAuthServerUrl: trim(parsed.OAUTH_SERVER_URL),
  /** Promote this openId to admin on upsert (optional). */
  ownerOpenId: trim(parsed.OWNER_OPEN_ID),
  isProduction,
  forgeApiUrl: trim(parsed.BUILT_IN_FORGE_API_URL),
  forgeApiKey: trim(parsed.BUILT_IN_FORGE_API_KEY),
} as const;
