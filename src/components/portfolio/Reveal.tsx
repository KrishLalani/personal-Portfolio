import type React from "react";
import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds of delay before this element animates in. */
  delay?: number;
  direction?: Direction;
  /** Travel distance in pixels before settling. */
  distance?: number;
  id?: string;
  onPointerMove?: (event: React.PointerEvent<HTMLElement>) => void;
}

// Widened on purpose: motion.create() over a generic ElementType produces a
// union TypeScript cannot represent, and the props here are checked by use.
type AnyMotionTag = React.ComponentType<Record<string, unknown>>;
const motionTagCache = new Map<string, AnyMotionTag>();

/** One cached motion component per tag, shared across renders and instances. */
function useMotionTag(as: ElementType): AnyMotionTag {
  return useMemo(() => {
    if (typeof as !== "string") return motion.create(as) as AnyMotionTag;
    const cached = motionTagCache.get(as);
    if (cached) return cached;
    const created = motion.create(as) as AnyMotionTag;
    motionTagCache.set(as, created);
    return created;
  }, [as]);
}

const offset = (direction: Direction, distance: number) => {
  if (direction === "up") return { y: distance };
  if (direction === "down") return { y: -distance };
  if (direction === "left") return { x: distance };
  if (direction === "right") return { x: -distance };
  return {};
};

/**
 * Scroll-triggered entrance. Animates once, honours prefers-reduced-motion by
 * rendering the final state immediately so content is never hidden.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  direction = "up",
  distance = 26,
  id,
  onPointerMove,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = useMotionTag(as);

  if (reduce) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id} onPointerMove={onPointerMove}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Wraps a list so each <RevealItem> child enters in sequence. */
export function RevealGroup({
  children,
  className,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = useMotionTag(as);

  if (reduce) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = useMotionTag(as);

  if (reduce) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag id={id} className={className} variants={childVariants}>
      {children}
    </MotionTag>
  );
}
