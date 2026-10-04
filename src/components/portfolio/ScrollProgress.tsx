import { motion, useScroll, useSpring } from "framer-motion";

/** A quiet progress bar that never covers page content. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: width }}
      aria-hidden="true"
    />
  );
}
