import { useEffect } from "react";

/**
 * Fades elements carrying the `.reveal` class up into view as they enter the
 * viewport by toggling `.in-view`. Falls back to showing everything when
 * IntersectionObserver is unavailable or the user prefers reduced motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    els.forEach((el) => io.observe(el));

    // Safety net: never leave content hidden if the observer misbehaves.
    const failSafe = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("in-view"));
    }, 2600);

    return () => {
      window.clearTimeout(failSafe);
      io.disconnect();
    };
  }, []);
}
