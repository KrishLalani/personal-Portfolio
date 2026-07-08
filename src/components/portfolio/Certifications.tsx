import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { certifications } from "@/lib/portfolio-data";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="06 — Recognition"
          title="Highlights & experience."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                  <Award className="size-4" />
                </div>
                <span className="text-xs text-muted-foreground">{c.year}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold leading-snug tracking-tight text-foreground">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
