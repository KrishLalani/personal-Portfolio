import { GraduationCap } from "lucide-react";
import { education, highlights } from "@/lib/portfolio-data";
import { SectionHeading } from "./SectionHeading";
export function Education() {
  return (
    <section
      tabIndex={-1}
      id="education"
      aria-labelledby="education-heading"
      className="portfolio-section education-section"
    >
      <div className="portfolio-container">
        <SectionHeading
          id="education-heading"
          eyebrow="05 / Education & learning"
          title="A foundation to build on."
        />
        <div className="education-grid">
          {education.map((item) => (
            <article key={item.degree} className="education-card">
              <div className="flex justify-between gap-4">
                <GraduationCap size={23} strokeWidth={1.5} />
                <span className="eyebrow">{item.year}</span>
              </div>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
              <strong>{item.detail}</strong>
            </article>
          ))}
        </div>
        <div
          id="certifications"
          aria-labelledby="certifications-heading"
          className="highlights"
        >
          <h3 id="certifications-heading">Recognition & participation</h3>
          <div>
            {highlights.map((item) => (
              <article key={item.title}>
                <span className="eyebrow">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.issuer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
