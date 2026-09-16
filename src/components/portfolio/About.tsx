import { ArrowUpRight, ScanLine, Server } from "lucide-react";
import { biography, profile } from "@/lib/portfolio-data";
import avatar from "@/assets/avatar-optimized.webp";
import { Reveal } from "./Reveal";
export function About() {
  return (
    <section
      tabIndex={-1}
      id="about"
      aria-labelledby="about-heading"
      className="portfolio-section"
    >
      <div className="portfolio-container about-layout">
        <Reveal className="about-portrait" direction="right" distance={34}>
          <img
            src={avatar}
            alt={`Portrait of ${profile.name}`}
            width="1024"
            height="1024"
            loading="lazy"
          />
          <div className="portrait-caption">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </div>
        </Reveal>
        <Reveal
          className="about-copy"
          direction="left"
          distance={34}
          delay={0.1}
        >
          <p className="eyebrow">04 / About me</p>
          <h2 id="about-heading">
            A developer.
            <br />
            <span className="hero-italic">A problem solver.</span>
          </h2>
          {biography.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="about-focus">
            <span>
              <Server size={18} />
              Backend engineering
            </span>
            <span>
              <ScanLine size={18} />
              Computer vision
            </span>
          </div>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-link"
          >
            More about my journey on LinkedIn <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
