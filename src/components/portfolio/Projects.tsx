import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github, Target, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { projects } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return desktop;
}

function ProjectPanel({
  project,
  index,
  rail = false,
}: {
  project: (typeof projects)[number];
  index: number;
  rail?: boolean;
}) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
    stiffness: 120,
    damping: 18,
  });

  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  }

  return (
    <article
      className={cn(
        "relative flex flex-col gap-7",
        rail
          ? "h-full w-[88vw] shrink-0 justify-center px-6 py-12 sm:w-[72vw] lg:w-[78vw] lg:flex-row lg:items-center lg:gap-14 lg:px-12"
          : "mx-auto w-full max-w-2xl items-center text-center",
      )}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handlePointerMove}
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformPerspective: 1200,
        }}
        className={cn("relative aspect-[16/10] w-full", rail && "lg:w-[56%]")}
      >
        <div className="relative size-full overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1600}
            height={1000}
            loading="lazy"
            className={cn(
              "absolute inset-0 size-full object-cover transition-transform duration-700 ease-out",
              hovered ? "scale-[1.035]" : "scale-100",
            )}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/15" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-black/55" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
                Case study {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-display text-3xl">{project.title}</p>
            </div>
            <span className="hidden max-w-56 text-right text-[10px] uppercase tracking-[0.12em] text-white/70 sm:block">
              {project.category}
            </span>
          </div>
        </div>
      </motion.div>

      <div
        className={cn(
          rail ? "lg:w-[44%] lg:text-left" : "flex flex-col items-center",
        )}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")} · {project.category}
        </p>
        <h3 className="mt-4 font-display text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">
          {project.title}
        </h3>
        <p
          className={cn(
            "mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base",
            !rail && "mx-auto",
          )}
        >
          {project.description}
        </p>

        {(project.role || project.result) && (
          <div
            className={cn(
              "mt-5 flex flex-col gap-2.5",
              !rail && "items-center",
            )}
          >
            {project.role && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground">
                <Wrench className="size-3.5 shrink-0 text-primary" />
                {project.role}
              </span>
            )}
            {project.result && (
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-foreground">
                <Target className="size-3.5 shrink-0 text-primary" />
                {project.result}
              </span>
            )}
          </div>
        )}

        <ul
          className={cn(
            "mt-5 flex flex-wrap gap-2",
            !rail && "justify-center",
          )}
        >
          {project.stack.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-border bg-surface px-3 py-1 text-[10px] text-muted-foreground"
            >
              {technology}
            </li>
          ))}
        </ul>

        {(project.demo || project.repo) && (
          <div
            className={cn(
              "mt-6 flex flex-wrap gap-3",
              !rail && "justify-center",
            )}
          >
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Live demo <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground"
              >
                <Github className="size-4" /> Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function HorizontalRail() {
  const wrapper = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["start start", "end end"],
  });
  const total = projects.length;
  const maximum = ((total - 1) / total) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${maximum}%`]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={wrapper}
      className="relative"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-background">
        <div className="absolute inset-x-0 top-0 z-20 h-px bg-border">
          <motion.div className="h-full bg-primary" style={{ width: progress }} />
        </div>
        <div className="pointer-events-none absolute right-6 top-6 z-20 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Scroll to explore
        </div>

        <motion.div
          style={{ x, width: `${total * 100}%` }}
          className="flex h-full"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="flex h-full"
              style={{ width: `${100 / total}%` }}
            >
              <ProjectPanel project={project} index={index} rail />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function VerticalProjects() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 md:space-y-20">
      {projects.map((project, index) => (
        <ProjectPanel key={project.title} project={project} index={index} />
      ))}
    </div>
  );
}

function MobileProjects() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const r = (child as HTMLElement).getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    (el.children[i] as HTMLElement | undefined)?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  return (
    <div className="px-4">
      <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="inline-block h-px w-6 bg-primary" />
        Swipe to explore
      </p>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="w-[86%] shrink-0 snap-center min-[420px]:w-[72%]"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="relative aspect-[16/10]">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/15" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-black/60" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/65">
                    Case study {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-0.5 font-display text-2xl leading-tight">
                    {project.title}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  {project.category}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                  {project.description}
                </p>

                {project.result && (
                  <span className="mt-3.5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground">
                    <Target className="size-3.5 shrink-0 text-primary" />
                    {project.result}
                  </span>
                )}

                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] text-muted-foreground"
                    >
                      {technology}
                    </li>
                  ))}
                  {project.stack.length > 5 && (
                    <li className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] text-muted-foreground">
                      +{project.stack.length - 5}
                    </li>
                  )}
                </ul>

                {(project.demo || project.repo) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                      >
                        Live demo <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground"
                      >
                        <Github className="size-3.5" /> Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {projects.map((project, i) => (
          <button
            key={project.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${project.title}`}
            aria-current={active === i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              active === i ? "w-6 bg-primary" : "w-1.5 bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();

  return (
    <section id="work" aria-labelledby="work-heading" className="relative">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-32">
        <SectionHeading
          eyebrow="03 — Selected work"
          title="Products built for real constraints."
          description="Scroll through projects spanning computer vision, university systems, civic technology, web scraping, club operations, and workforce safety."
        />
      </div>

      <div className="mt-8 sm:mt-12">
        {desktop ? (
          reduce ? (
            <VerticalProjects />
          ) : (
            <HorizontalRail />
          )
        ) : (
          <MobileProjects />
        )}
      </div>
    </section>
  );
}
