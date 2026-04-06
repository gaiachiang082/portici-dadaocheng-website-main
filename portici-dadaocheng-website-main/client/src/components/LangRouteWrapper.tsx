import type { ReactNode } from "react";
import { Redirect, useLocation, useParams } from "wouter";
import { isLang, switchLangInPath } from "@/contexts/LangContext";
import NotFound from "@/pages/NotFound";

/**
 * Nested under `/:lang` (wouter `nest`). Renders children only for supported locale codes.
 * `/en/*` is redirected to the same path under `/it` (EN not public; routes/files retained).
 */
export default function LangRouteWrapper({ children }: { children: ReactNode }) {
  const params = useParams<{ lang: string }>();
  const [path] = useLocation();

  if (params.lang === "en") {
    return <Redirect to={switchLangInPath(path, "it")} />;
  }
  if (!isLang(params.lang)) {
    return <NotFound />;
  }
  return <>{children}</>;
}
