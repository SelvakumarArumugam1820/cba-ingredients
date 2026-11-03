import { useEffect } from "react";
import { useLocation } from "wouter";
import { scrollToHash } from "@/lib/sectionNav";

/**
 * Keeps scroll position in step with the URL:
 * - route change → top of the new page, or the "#section" in the URL;
 * - hash-only back/forward (popstate) → the matching section;
 * - direct load / refresh of "/#section" → that section, re-aligned once
 *   images and fonts have settled so late layout shifts can't leave it off.
 */
export default function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    // Wait one frame so the new route has rendered its sections.
    const frame = requestAnimationFrame(() => {
      if (!scrollToHash(hash, "instant")) window.scrollTo({ top: 0, behavior: "instant" });
    });
    if (!hash) return () => cancelAnimationFrame(frame);

    const realign = () => {
      if (window.location.hash === hash) scrollToHash(hash, "instant");
    };
    const timer = window.setTimeout(realign, 600);
    window.addEventListener("load", realign, { once: true });
    // Stop correcting as soon as the visitor scrolls on their own.
    const cancel = () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", realign);
    };
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, { once: true, passive: true });
    return () => {
      cancelAnimationFrame(frame);
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    };
  }, [location]);

  // Back/forward between "/" and "/#section" doesn't change wouter's location.
  useEffect(() => {
    const onPop = () => {
      if (window.location.pathname === "/") scrollToHash(window.location.hash);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return null;
}
