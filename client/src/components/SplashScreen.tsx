import { useEffect, useRef, useState } from "react";

const logoUrl = "/assets/cba-logo.png";

/* Visible hold time before fade-out starts, and the fade-out duration itself.
   Kept short per spec (~1.5-2.5s total for a normal load); reduced-motion
   visitors get a much quicker, simplified pass instead of the full sequence. */
const HOLD_MS = 1500;
const HOLD_MS_REDUCED = 300;
const EXIT_MS = 450;
const EXIT_MS_REDUCED = 150;

type Phase = "enter" | "exiting" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("enter");
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const hold = reducedMotion.current ? HOLD_MS_REDUCED : HOLD_MS;
    const exit = reducedMotion.current ? EXIT_MS_REDUCED : EXIT_MS;
    const toExit = window.setTimeout(() => setPhase("exiting"), hold);
    const toDone = window.setTimeout(() => setPhase("done"), hold + exit);
    return () => {
      window.clearTimeout(toExit);
      window.clearTimeout(toDone);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`splash-screen ${phase === "exiting" ? "splash-exiting" : ""} ${reducedMotion.current ? "splash-reduced" : ""}`}
      aria-hidden="true"
    >
      <div className="splash-glow" />
      <div className="splash-mark">
        <span className="splash-logo-frame">
          <img src={logoUrl} alt="" className="splash-logo" draggable={false} />
          <span className="splash-shimmer" />
        </span>
        <span className="splash-wordmark">
          <strong>CBA</strong>
          <small>INGREDIENTS</small>
        </span>
      </div>
    </div>
  );
}
