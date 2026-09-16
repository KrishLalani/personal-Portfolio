import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { navLinks } from "@/lib/portfolio-data";

/** Top reading-progress bar plus a small section readout in the corner. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const [percent, setPercent] = useState(0);
  const [section, setSection] = useState("Intro");
  // The readout and the footer's back-to-top button share the bottom-right
  // corner, so the readout steps aside once the footer is on screen.
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (value) =>
      setPercent(Math.round(value * 100)),
    );
  }, [scrollYProgress]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = navLinks.find(
            (link) => link.href === `#${entry.target.id}`,
          );
          setSection(match ? match.label : "Intro");
        }
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    const top = document.getElementById("top");
    if (top) observer.observe(top);
    for (const link of navLinks) {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -35% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: width }}
        aria-hidden="true"
      />
      <div className="scroll-readout" data-hidden={atFooter} aria-hidden="true">
        <span>{section}</span>
        <span style={{ color: "var(--primary)" }}>
          {String(percent).padStart(3, "0")}%
        </span>
      </div>
    </>
  );
}
