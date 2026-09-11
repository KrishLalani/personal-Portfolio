import {
  Code2,
  Server,
  Database,
  ScanLine,
  Cpu,
  GitBranch,
  Activity,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { coreSkills, skills } from "@/lib/portfolio-data";
import { SectionHeading } from "./SectionHeading";
import { useMobileCarousel } from "@/hooks/use-mobile-carousel";
import { MobileCarouselControls } from "./MobileCarouselControls";
const icons: Record<string, LucideIcon> = {
  Languages: Code2,
  Backend: Server,
  "Computer Vision & AI": ScanLine,
  "Edge & IoT": Cpu,
  Databases: Database,
  DevOps: GitBranch,
  Monitoring: Activity,
  "Web & Data": Globe2,
};
export function Skills() {
  const groups = skills.filter((group) => group.category !== "Edge & IoT");
  const carousel = useMobileCarousel(groups.length);
  return (
    <section
      tabIndex={-1}
      id="skills"
      aria-labelledby="skills-heading"
      className="portfolio-section skills-section"
    >
      <div className="portfolio-container">
        <SectionHeading
          id="skills-heading"
          eyebrow="03 / Technical toolkit"
          title="The tools behind the work."
          description="From API architecture and model development to databases and deployment."
        />
        <div className="core-skills">
          <span className="eyebrow">Core strengths</span>
          <ul>
            {coreSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <MobileCarouselControls
          carousel={carousel}
          count={groups.length}
          itemLabel="skill group"
          viewportId="skill-slides"
        />
        <div
          className="skills-grid mobile-carousel-track"
          id="skill-slides"
          ref={carousel.viewportRef}
          {...carousel.interactionProps}
        >
          {groups.map((group, i) => {
            const Icon = icons[group.category] ?? Code2;
            return (
              <article className="skill-group" key={group.category}>
                <div className="skill-group-top">
                  <Icon size={21} strokeWidth={1.5} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{group.category}</h3>
                <ul className="skill-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
