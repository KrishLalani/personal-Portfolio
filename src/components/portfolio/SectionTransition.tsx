import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

/**
 * Curtain wipe transition between in-page sections.
 * Intercepts anchor clicks on <a href="#section"> links, plays a curtain wipe,
 * then performs the smooth scroll.
 */
export function SectionTransition() {
  const [show, setShow] = useState(false);

  const play = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    setShow(true);
    // wait for curtain to cover
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: "auto", block: "start" });
      // begin reveal
      window.setTimeout(() => setShow(false), 80);
    }, 520);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.startsWith("#") || href.length < 2) return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      // close any open menus by blurring
      (document.activeElement as HTMLElement)?.blur?.();
      // update URL hash without default jump
      history.replaceState(null, "", href);
      play(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [play]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          className="pointer-events-none fixed inset-0 z-[150]"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-background" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 blur-3xl"
            style={{ background: "var(--gradient-aurora)" }}
          />
          <div className="absolute inset-x-0 bottom-8 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Transitioning
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
