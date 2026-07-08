import { motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  MapPin,
  RadioTower,
} from "lucide-react";
import avatar from "@/assets/avatar.jpg";
import { profile } from "@/lib/portfolio-data";

const disciplines = [
  {
    number: "01",
    title: "Backend systems",
    description: "APIs, databases, authentication, and reliable services.",
    Icon: Code2,
  },
  {
    number: "02",
    title: "Computer vision",
    description: "Detection and image-processing for real-world use.",
    Icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Connected products",
    description: "Cameras, sensors, dashboards, alerts, and edge devices.",
    Icon: RadioTower,
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-12 sm:py-20 lg:min-h-screen lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-7 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:self-center"
          >
            <div className="relative mx-auto max-w-[14rem] min-[420px]:max-w-[16rem] sm:max-w-sm lg:mx-0 lg:max-w-md">
              <div
                aria-hidden
                className="absolute -left-4 -top-4 size-24 border-l border-t border-primary/60"
              />
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 size-24 border-b border-r border-primary/60"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-card">
                <div className="relative overflow-hidden rounded-[1.55rem]">
                  <img
                    src={avatar}
                    alt={`Portrait of ${profile.name}`}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="aspect-[4/5] max-h-[22rem] w-full object-cover object-center saturate-[0.88] sm:max-h-[28rem] lg:max-h-[34rem]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-black/55 sm:h-36" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-5">
                    <p className="font-display text-lg leading-tight sm:text-2xl">
                      {profile.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/70 sm:mt-1 sm:text-[10px] sm:tracking-[0.16em]">
                      <MapPin className="size-3" />
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-8 hidden rounded-xl border border-border bg-card px-3 py-2.5 shadow-card sm:block sm:-right-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  Current focus
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  Useful systems
                </p>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              01 — About
            </motion.p>

            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="mt-4 max-w-[15ch] font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1] tracking-tight text-foreground"
            >
              Building software that{" "}
              <span className="italic text-primary">works beyond the demo.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mt-5 grid gap-3 border-y border-border py-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:gap-4 sm:py-5 sm:text-[15px]"
            >
              <p>
                I&apos;m a software developer working across backend systems,
                computer vision, and connected products.
              </p>
              <p>
                I build with Python and Node.js, own complete software flows,
                and have led backend work from architecture through testing.
              </p>
            </motion.div>

            <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
              {disciplines.map(({ number, title, description, Icon }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group flex items-center gap-3.5 rounded-2xl border border-border bg-card p-3.5 text-left transition-all hover:border-primary/40 hover:shadow-card sm:flex-col sm:items-start sm:gap-0 sm:p-4"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 sm:mt-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        {title}
                      </h3>
                      <span className="hidden font-mono text-[9px] tracking-[0.16em] text-primary sm:inline">
                        {number}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:mt-1">
                      {description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
