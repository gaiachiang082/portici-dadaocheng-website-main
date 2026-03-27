export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

/** Newsletter `source` for /magazine current-issue subscribe (Issue No.1 by email). */
export const MAGAZINE_ISSUE_1_SOURCE = "magazine_issue_1";

/** Public path to Issue No.1 PDF (served from `client/public`). */
export const ISSUE_NO1_PDF_PUBLIC_PATH = "/magazine/portici-magazine-n1-v2.pdf";
