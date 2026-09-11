import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  FileDown,
  ScanLine,
  Server,
} from "lucide-react";
import { experience, profile } from "@/lib/portfolio-data";

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
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero-section">
      <div className="portfolio-container">
        <div className="hero-topline">
          <span className="eyebrow">{profile.name} / Software Developer</span>
          <span className="availability">
            <span />
            {profile.availability}
          </span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow text-primary">
              Python · Backend · Computer vision
            </p>
            <h1 id="hero-heading">
              Backend systems.
              <br />
              <span className="hero-italic">Computer vision.</span>
              <br />
              Practical software.
            </h1>
            <p className="hero-description">
              I build REST APIs, detection models, and image-processing
              pipelines. From backend architecture to industrial inspection, I
              turn technical requirements into working software.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
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
            </div>
            <p className="hero-current">
              <span className="status-dot" />
              Currently {experience[0].title} at{" "}
              <a href="#experience">
                {experience[0].company} <ArrowUpRight size={13} />
              </a>
            </p>
          </div>
          <div className="system-card">
            <div className="system-card-top">
              <span className="flex items-center gap-2">
                <span className="status-dot" />
                ENGINEERING / EXPLORER
              </span>
              <span>01—02</span>
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
              <div className="system-visual" aria-hidden="true">
                <div className="system-orbit orbit-one" />
                <div className="system-orbit orbit-two" />
                <div className="system-core">
                  <system.Icon size={40} strokeWidth={1} />
                  <span>{active === 0 ? "VISION" : "BACKEND"}</span>
                </div>
                <span className="system-coordinate coordinate-one">
                  INPUT → PROCESS
                </span>
                <span className="system-coordinate coordinate-two">
                  BUILD / EVALUATE / DEPLOY
                </span>
                <span className="system-cross cross-one">+</span>
                <span className="system-cross cross-two">+</span>
              </div>
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
          </div>
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
