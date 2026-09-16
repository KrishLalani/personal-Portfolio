import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  /** Rendered after the animated words, e.g. a trailing accent. */
  children?: ReactNode;
}

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.055, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Word-by-word mask reveal.
 *
 * The scroll trigger lives on the outer wrapper, never on the masked words
 * themselves: a word parked below its overflow-hidden box has an empty
 * intersection rect, so an observer attached to it would never fire and the
 * text would stay hidden forever. The wrapper is always visible, and the words
 * animate through inherited variants.
 */
export function SplitText({ text, className, delay = 0, children }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span className={className}>
        {text}
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      aria-label={text}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      style={{ display: "inline-block" }}
    >
      {words.map((item, index) => (
        <span
          key={`${item}-${index}`}
          aria-hidden="true"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.08em",
          }}
        >
          <motion.span
            variants={word}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {item}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
      {children}
    </motion.span>
  );
}
