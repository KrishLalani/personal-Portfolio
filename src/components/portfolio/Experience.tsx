import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./SectionHeading";
import { experience } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="04 — Experience"
          title="Professional experience."
          description="Roles where I built backend, computer-vision, and IoT systems for real deployments."
        />

        <div ref={ref} className="relative mt-14 mx-auto max-w-3xl">
          {/* Timeline rail */}
          <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2" aria-hidden>
            <motion.div
              style={{ height: lineHeight }}
              className="w-px bg-gradient-to-b from-primary via-primary/60 to-transparent"
            />
          </div>

          <ol className="space-y-10 sm:space-y-12">
            {experience.map((item, i) => {
              const right = i % 2 === 0;
              const logo = "logo" in item ? (item.logo as string) : undefined;
              return (
                <motion.li
                  key={item.title + item.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0"
                >
                  {/* Dot */}
                  <div
                    aria-hidden
                    className="absolute left-4 top-6 z-10 -translate-x-1/2 sm:left-1/2"
                  >
                    <span className="relative inline-flex size-3">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
                      <span className="relative size-3 rounded-full bg-primary ring-4 ring-background" />
                    </span>
                  </div>

                  <div
                    className={
                      right ? "sm:col-start-1 sm:pr-12" : "sm:col-start-2 sm:pl-12"
                    }
                  >
                    <div
                      className={cn(
                        "group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-card",
                        right && "sm:text-right",
                      )}
                    >
                      <div className={cn("flex", right && "sm:justify-end")}>
                        {logo ? (
                          <span className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 shadow-elegant ring-1 ring-black/[0.04]">
                            <img
                              src={logo}
                              alt={`${item.company} logo`}
                              loading="lazy"
                              className="h-6 w-auto max-w-[9.5rem] object-contain sm:h-7"
                            />
                          </span>
                        ) : (
                          <span
                            aria-hidden
                            className="inline-flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 font-mono text-[11px] font-semibold text-primary"
                          >
                            {item.mark}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-primary">
                        {item.company}
                      </p>

                      <div
                        className={cn(
                          "mt-3.5 flex flex-wrap items-center gap-2",
                          right && "sm:justify-end",
                        )}
                      >
                        <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                          {item.year}
                        </span>
                        <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
                          {item.meta}
                        </span>
                      </div>

                      <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
