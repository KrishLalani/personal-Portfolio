import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fixed background layer: a slow parallax aurora wash, a masked grid, and an
 * animated film grain. Purely decorative and pointer-transparent.
 */
export function AmbientField() {
  const auroraRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 42;
      targetY = (event.clientY / window.innerHeight - 0.5) * 42;
    };
    const onScroll = () => {
      targetY = (window.scrollY % 900) * 0.045 - 20;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;
      if (auroraRef.current) {
        auroraRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  return (
    <>
      <div className="ambient-field" aria-hidden="true">
        <div className="aurora" ref={auroraRef} />
        <div className="grid-lines" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
