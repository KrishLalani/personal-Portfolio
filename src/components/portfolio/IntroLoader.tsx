import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/portfolio-data";

const SESSION_KEY = "intro-played-v1";

export function IntroLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      setCount(100);
      const t = setTimeout(finish, 400);
      return () => clearTimeout(t);
    }
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, reduce]);

  function finish() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex flex-col bg-background"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* aurora blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-aurora)" }}
          />

          {/* center wordmark */}
          <div className="relative flex flex-1 items-center justify-center px-6">
            <div className="relative flex items-end gap-4 overflow-hidden">
              {profile.name.split(" ").map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block font-display text-[clamp(3rem,12vw,9rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
                  >
                    {i === 1 ? <span className="italic text-aurora">{word}</span> : word}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          {/* bottom bar */}
          <div className="relative flex items-end justify-between px-6 pb-8 sm:px-10 sm:pb-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Loading portfolio
              </motion.span>
            </div>
            <div className="font-mono text-3xl tabular-nums text-foreground sm:text-5xl">
              {String(count).padStart(3, "0")}
            </div>
          </div>

          {/* progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
