import { useEffect, useState } from "react";
import { useMobileCarousel } from "@/hooks/use-mobile-carousel";
import { MobileCarouselControls } from "./MobileCarouselControls";
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  ScanLine,
  Server,
  Radio,
  BarChart3,
  MapPin,
  Users,
} from "lucide-react";
import { projects, profile } from "@/lib/portfolio-data";
import { SectionHeading } from "./SectionHeading";
const categories = ["All work", "Computer vision", "Backend", "Monitoring"];
const projectMeta = [
  {
    groups: ["Computer vision"],
    Icon: ScanLine,
    flow: ["Camera", "YOLO11", "Event capture", "Deterrent"],
    number: "01",
    theme: "mint",
  },
  {
    groups: ["Backend"],
    Icon: Server,
    flow: ["Campus access", "Session control", "REST API", "MySQL"],
    number: "02",
    theme: "blue",
  },
  {
    groups: ["Backend"],
    Icon: BarChart3,
    flow: ["Product pages", "Scraping", "Analytics", "Price alerts"],
    number: "03",
    theme: "sand",
  },
  {
    groups: ["Computer vision", "Backend"],
    Icon: MapPin,
    flow: ["GPS + image", "Validation", "Submission", "Status tracking"],
    number: "04",
    theme: "blue",
  },
  {
    groups: ["Backend"],
    Icon: Users,
    flow: ["Memberships", "Roles", "Events", "Approvals"],
    number: "05",
    theme: "mint",
  },
  {
    groups: ["Monitoring"],
    Icon: Radio,
    flow: ["nRF tags", "RSSI data", "Zone rules", "Alerts"],
    number: "06",
    theme: "sand",
  },
];
const slug = (title: string) => title.toLowerCase().replaceAll(" ", "-");
export function Projects() {
  const [filter, setFilter] = useState("All work");
  const visible = projects
    .map((project, i) => ({ ...project, ...projectMeta[i] }))
    .filter(
      (project) => filter === "All work" || project.groups.includes(filter),
    );
  const carousel = useMobileCarousel(visible.length, filter);
  const { setActive, setPaused, viewportRef, goTo } = carousel;

  useEffect(() => {
    let frame = 0;
    const showLinkedProject = () => {
      if (!window.location.hash.startsWith("#project-")) return;
      setFilter("All work");
      setPaused(true);
      frame = requestAnimationFrame(() => {
        const cards = Array.from(viewportRef.current?.children ?? []);
        const index = cards.findIndex(
          (card) => `#${card.id}` === window.location.hash,
        );
        if (index >= 0) goTo(index, false);
      });
    };
    showLinkedProject();
    window.addEventListener("hashchange", showLinkedProject);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", showLinkedProject);
    };
  }, [goTo, setPaused, viewportRef]);
  return (
    <section
      tabIndex={-1}
      id="work"
      aria-labelledby="work-heading"
      className="portfolio-section work-section"
    >
      <div className="portfolio-container">
        <div className="section-intro">
          <SectionHeading
            id="work-heading"
            eyebrow="01 / Selected work"
            title="Real problems. Working systems."
            description="A selection of projects across computer vision, backend engineering, and monitoring software."
          />
          <span className="section-count">
            {String(projects.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
        <div className="project-filters" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => {
                setFilter(category);
                setActive(0);
                setPaused(true);
              }}
              aria-pressed={filter === category}
            >
              {category}
            </button>
          ))}
          <span role="status">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <MobileCarouselControls
          carousel={carousel}
          count={visible.length}
          itemLabel="project"
          viewportId="project-slides"
        />
        <div
          key={filter}
          className="project-grid mobile-carousel-track"
          id="project-slides"
          ref={viewportRef}
          {...carousel.interactionProps}
        >
          {visible.map((project) => (
            <article
              className={`project-card project-${project.theme}`}
              id={`project-${slug(project.title)}`}
              key={project.title}
            >
              <div
                className="project-visual"
                aria-label={`${project.title} system overview`}
              >
                <div className="project-visual-top">
                  <span>{project.number} / SYSTEM OVERVIEW</span>
                  <project.Icon size={19} strokeWidth={1.4} />
                </div>
                <div className="project-visual-title">
                  {project.title}
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="project-flow">
                  {project.flow.map((step, i) => (
                    <div key={step}>
                      <span>0{i + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="project-body">
                <p className="eyebrow text-primary">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.result && (
                  <p className="project-result">
                    <span className="status-dot" />
                    {project.result}
                  </p>
                )}
                <details className="project-details">
                  <summary>
                    My contribution & technologies <ChevronDown size={16} />
                  </summary>
                  <div>
                    <p className="text-sm leading-relaxed">{project.role}</p>
                    <ul className="skill-tags mt-4">
                      {project.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                    {(project.repo || project.demo) && (
                      <div className="flex gap-4 mt-5">
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-link"
                          >
                            <Github size={15} /> Source code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-link"
                          >
                            Live demo <ArrowUpRight size={15} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
        <a
          className="work-github inline-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={17} /> Explore my GitHub <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
