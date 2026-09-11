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
  const rows = Array.from(
    { length: Math.ceil(groups.length / 2) },
    (_, index) => groups.slice(index * 2, index * 2 + 2),
  );
  const carousel = useMobileCarousel(rows.length);
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
          count={rows.length}
          itemLabel="skill row"
          viewportId="skill-slides"
        />
        <div
          className="skills-grid mobile-carousel-track"
          id="skill-slides"
          ref={carousel.viewportRef}
          {...carousel.interactionProps}
        >
          {rows.map((row, rowIndex) => (
            <div className="skill-row" key={row[0].category}>
              {row.map((group, columnIndex) => {
                const i = rowIndex * 2 + columnIndex;
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
          ))}
        </div>
      </div>
    </section>
  );
}
