import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/**
 * Scrolls the window to the top when the pathname changes (wouter route),
 * except for hash destinations and browser back/forward (popstate).
 */
export default function ScrollToTopOnRouteChange() {
  const [pathname] = useLocation();
  const prevPathname = useRef<string | null>(null);
  const skipFromPopState = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      skipFromPopState.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      return;
    }
    if (prevPathname.current === pathname) return;

    prevPathname.current = pathname;

    if (skipFromPopState.current) {
      skipFromPopState.current = false;
      return;
    }

    if (window.location.hash) return;

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
