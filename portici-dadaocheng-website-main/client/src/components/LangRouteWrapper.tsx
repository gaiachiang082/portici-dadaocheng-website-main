import type { ReactNode } from "react";
import { useParams } from "wouter";
import { isLang } from "@/contexts/LangContext";
import NotFound from "@/pages/NotFound";

/**
 * Nested under `/:lang` (wouter `nest`). Renders children only for supported locale codes.
 */
export default function LangRouteWrapper({ children }: { children: ReactNode }) {
  const params = useParams<{ lang: string }>();
  if (!isLang(params.lang)) {
    return <NotFound />;
  }
  return <>{children}</>;
}
