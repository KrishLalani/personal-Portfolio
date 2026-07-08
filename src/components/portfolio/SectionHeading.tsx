import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: Props) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-4 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:mb-5 sm:text-[11px] sm:tracking-[0.22em]"
      >
        <span className="relative inline-flex size-1.5">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
          <span className="relative inline-block size-1.5 rounded-full bg-primary" />
        </span>
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="drop-shadow-title font-display text-[clamp(2.2rem,10vw,4.5rem)] font-normal leading-[0.98] tracking-tight text-foreground [text-wrap:balance]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
