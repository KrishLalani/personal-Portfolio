import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/portfolio-data";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="05 — Education"
          title="Academic foundation."
          description="My formal education in computer engineering."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {education.map((item, index) => (
            <motion.article
              key={item.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-5">
                <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
                  <GraduationCap className="size-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.year}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-tight text-foreground sm:text-3xl">
                {item.degree}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.institution}
              </p>
              <p className="mt-5 border-l-2 border-primary/60 pl-4 text-sm font-medium text-foreground">
                {item.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
