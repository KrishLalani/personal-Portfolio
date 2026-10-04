import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  FileDown,
  ScanLine,
  Server,
} from "lucide-react";
import { experience, profile, stats } from "@/lib/portfolio-data";
import { DetectionCanvas } from "./DetectionCanvas";
import { RequestFlow } from "./RequestFlow";
import { SplitText } from "./SplitText";
import { Counter } from "./Counter";

const systems = [
  {
    label: "Computer vision",
    Icon: ScanLine,
    title: "From pixels to decisions.",
    nodes: ["Image capture", "YOLO / OpenCV", "Detection", "System response"],
    tools: "Python · YOLO · OpenCV · PyTorch",
    description:
      "Detection models and image-processing pipelines for industrial inspection.",
    href: "#experience",
  },
  {
    label: "Backend engineering",
    Icon: Server,
    title: "The logic behind the product.",
    nodes: ["Client request", "REST API", "Authentication", "Database"],
    tools: "Python · Node.js · SQL · REST APIs",
    description:
      "API architecture, authentication, and database design for platforms with real users.",
    href: "#work",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const system = systems[active];
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.75,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section id="top" aria-labelledby="hero-heading" className="hero-section">
      <div className="portfolio-container">
        <motion.div className="hero-topline" {...fade(0.05)}>
          <span className="eyebrow">Software Developer</span>
          <span className="availability">
            <span />
            {profile.availability}
          </span>
        </motion.div>

        <div className="hero-layout">
          <div className="hero-copy">
            <motion.p className="eyebrow text-primary" {...fade(0.12)}>
              Python · Backend · Computer vision
            </motion.p>

            <h1 id="hero-heading">
              <SplitText text="Backend systems." delay={0.1} />
              <br />
              <SplitText
                text="Computer vision."
                delay={0.22}
                className="hero-italic"
              />
              <br />
              <SplitText text="Practical software." delay={0.34} />
            </h1>

            <motion.p className="hero-description" {...fade(0.5)}>
              I build REST APIs, detection models, and image-processing
              pipelines. From backend architecture to industrial inspection, I
              turn technical requirements into working software.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 mt-8" {...fade(0.6)}>
              <a href="#work" className="button-primary">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a
                href={profile.resume}
                download="Krish_Lalani_Resume.pdf"
                className="button-secondary"
              >
                <FileDown size={16} /> Download resume
              </a>
            </motion.div>

            <motion.p className="hero-current" {...fade(0.7)}>
              <span className="status-dot" />
              Currently {experience[0].title} at{" "}
              <a href="#experience">
                {experience[0].company} <ArrowUpRight size={13} />
              </a>
            </motion.p>
          </div>

          <motion.div className="system-card" {...fade(0.3)}>
            <div className="system-card-top">
              <span className="flex items-center gap-2">
                <span className="status-dot" />
                ENGINEERING / EXPLORER
              </span>
              <span>0{active + 1}—02</span>
            </div>

            <div
              className="system-tabs"
              aria-label="Explore engineering disciplines"
            >
              {systems.map(({ label, Icon }, index) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div
              className="system-content"
              aria-live="polite"
              aria-atomic="true"
            >
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {active === 0 ? <DetectionCanvas /> : <RequestFlow />}
              </motion.div>

              <div className="system-flow">
                {system.nodes.map((node, i) => (
                  <div key={node}>
                    <span>0{i + 1}</span>
                    {node}
                  </div>
                ))}
              </div>

              <div className="system-detail">
                <h2>{system.title}</h2>
                <p>{system.description}</p>
                <span>{system.tools}</span>
              </div>
            </div>

            <a className="system-link" href={system.href}>
              Explore related work <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>

        <div className="stat-band">
          {stats.map((stat) => (
            <article key={stat.label}>
              <strong>
                <Counter value={stat.value} suffix={stat.suffix} />
              </strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>

        <div className="hero-bottom">
          <a href="#work">
            <ArrowDown size={16} /> A closer look at the work
          </a>
          <span>
            {profile.location} <span className="mx-2">/</span> Open to
            collaboration
          </span>
        </div>
      </div>
    </section>
  );
}
