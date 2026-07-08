import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { skills } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import {
  Code2,
  Server,
  Database,
  Brain,
  Cpu,
  GitBranch,
  Activity,
  Globe2,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  Backend: Server,
  "Computer Vision & AI": Brain,
  "Edge & IoT": Cpu,
  Databases: Database,
  DevOps: GitBranch,
  Monitoring: Activity,
  "Web & Data": Globe2,
};

const DEVICON_ROOT =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE_ICON_ROOT = "https://cdn.simpleicons.org";

const SKILL_LOGOS: Record<string, string> = {
  Python: `${DEVICON_ROOT}/python/python-original.svg`,
  JavaScript: `${DEVICON_ROOT}/javascript/javascript-original.svg`,
  SQL: `${DEVICON_ROOT}/azuresqldatabase/azuresqldatabase-original.svg`,
  HTML5: `${DEVICON_ROOT}/html5/html5-original.svg`,
  CSS3: `${DEVICON_ROOT}/css3/css3-original.svg`,
  Django: `${DEVICON_ROOT}/django/django-plain.svg`,
  FastAPI: `${DEVICON_ROOT}/fastapi/fastapi-original.svg`,
  Flask: `${DEVICON_ROOT}/flask/flask-original.svg`,
  "Node.js": `${DEVICON_ROOT}/nodejs/nodejs-original.svg`,
  "Express.js": `${DEVICON_ROOT}/express/express-original.svg`,
  "REST APIs": `${DEVICON_ROOT}/swagger/swagger-original.svg`,
  JWT: `${DEVICON_ROOT}/json/json-original.svg`,
  YOLO: `${SIMPLE_ICON_ROOT}/ultralytics/111F68`,
  OpenCV: `${DEVICON_ROOT}/opencv/opencv-original.svg`,
  PyTorch: `${DEVICON_ROOT}/pytorch/pytorch-original.svg`,
  "Raspberry Pi": `${DEVICON_ROOT}/raspberrypi/raspberrypi-original.svg`,
  ESP32: `${DEVICON_ROOT}/embeddedc/embeddedc-original.svg`,
  MQTT: `${DEVICON_ROOT}/mqtt/mqtt-original.svg`,
  PostgreSQL: `${DEVICON_ROOT}/postgresql/postgresql-original.svg`,
  MySQL: `${DEVICON_ROOT}/mysql/mysql-original.svg`,
  MongoDB: `${DEVICON_ROOT}/mongodb/mongodb-original.svg`,
  Firebase: `${DEVICON_ROOT}/firebase/firebase-original.svg`,
  Supabase: `${DEVICON_ROOT}/supabase/supabase-original.svg`,
  SQLite: `${DEVICON_ROOT}/sqlite/sqlite-original.svg`,
  Git: `${DEVICON_ROOT}/git/git-original.svg`,
  "Azure DevOps": `${DEVICON_ROOT}/azuredevops/azuredevops-original.svg`,
  Docker: `${DEVICON_ROOT}/docker/docker-original.svg`,
  Linux: `${DEVICON_ROOT}/linux/linux-original.svg`,
  "CI/CD": `${DEVICON_ROOT}/githubactions/githubactions-original.svg`,
  Postman: `${DEVICON_ROOT}/postman/postman-original.svg`,
  Grafana: `${DEVICON_ROOT}/grafana/grafana-original.svg`,
  "ThingsBoard IoT": `${SIMPLE_ICON_ROOT}/thingsboard/2A7DE1`,
  Selenium: `${DEVICON_ROOT}/selenium/selenium-original.svg`,
  EJS: `${DEVICON_ROOT}/ejs/ejs-original.svg`,
};

export function Skills() {
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
    <section id="skills" aria-labelledby="skills-heading" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="02 — Toolkit"
          title="Tools I build with."
          description="The backend, computer-vision, IoT, data, and deployment technologies I have used across projects and professional roles."
        />

        <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:hidden">
          <span className="inline-block h-px w-6 bg-primary" />
          Swipe to explore
        </p>

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 hide-scrollbar sm:mt-12 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-4"
        >
          {skills.map((group, i) => {
            const Icon = ICONS[group.category] ?? Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="group relative w-[80%] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/40 min-[420px]:w-[68%] sm:w-auto sm:shrink sm:rounded-2xl sm:p-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100 sm:opacity-70"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-primary shadow-elegant">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      {group.items.length} tools
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {group.category}
                  </h3>
                  <ul className="mt-4 grid grid-cols-4 gap-2.5 sm:gap-3">
                    {group.items.map((item) => {
                      return (
                        <li
                          key={item}
                          aria-label={item}
                          tabIndex={0}
                          className="group/skill relative flex aspect-square items-center justify-center rounded-xl border border-border bg-white p-2.5 shadow-sm ring-1 ring-black/[0.03] transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:p-3"
                        >
                          <img
                            src={SKILL_LOGOS[item]}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            className="size-7 object-contain transition-transform group-hover/skill:scale-110 sm:size-8"
                          />
                          <span className="sr-only">{item}</span>
                          <span
                            aria-hidden
                            className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 z-30 w-max max-w-44 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-center text-[11px] font-semibold leading-tight text-background opacity-0 shadow-elegant transition-all duration-150 group-hover/skill:-translate-y-1 group-hover/skill:opacity-100 group-focus-visible/skill:-translate-y-1 group-focus-visible/skill:opacity-100"
                          >
                            {item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile carousel indicators */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
          {skills.map((group, i) => (
            <button
              key={group.category}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${group.category}`}
              aria-current={active === i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                active === i ? "w-6 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
