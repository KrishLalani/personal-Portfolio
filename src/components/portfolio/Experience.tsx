import { experience } from "@/lib/portfolio-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useSpotlight } from "@/hooks/use-spotlight";
import { useMobileCarousel } from "@/hooks/use-mobile-carousel";
import { MobileCarouselControls } from "./MobileCarouselControls";
export function Experience() {
  const carousel = useMobileCarousel<HTMLOListElement>(experience.length);
  const spotlight = useSpotlight();
  return (
    <section
      tabIndex={-1}
      id="experience"
      aria-labelledby="experience-heading"
      className="portfolio-section"
    >
      <div className="portfolio-container">
        <SectionHeading
          id="experience-heading"
          eyebrow="02 / Experience"
          title="Engineering, in practice."
          description="Software development across industry and university teams."
        />
        <MobileCarouselControls
          carousel={carousel}
          count={experience.length}
          itemLabel="experience"
          viewportId="experience-slides"
        />
        <ol
          className="experience-list mobile-carousel-track"
          id="experience-slides"
          ref={carousel.viewportRef}
          {...carousel.interactionProps}
          tabIndex={0}
          aria-label="Experience slides"
        >
          {experience.map((item, i) => (
            <Reveal
              as="li"
              key={item.company}
              delay={Math.min(i, 3) * 0.08}
              className="experience-row"
              onPointerMove={spotlight}
            >
              <div className="experience-date">
                <span className="eyebrow">{item.year}</span>
                {i === 0 && (
                  <span className="current-badge">
                    <span className="status-dot" />
                    Current role
                  </span>
                )}
              </div>
              <div>
                <div className="experience-title">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.company}</p>
                  </div>
                  <div className="company-logo">
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      loading="lazy"
                      width="100"
                      height="36"
                    />
                  </div>
                </div>
                <p className="experience-meta">{item.meta}</p>
                {"bullets" in item && item.bullets ? (
                  <ul className="experience-description experience-bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="experience-description">{item.description}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
