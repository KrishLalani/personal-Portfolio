import { ArrowUpRight, ScanLine, Server } from "lucide-react";
import { biography, profile } from "@/lib/portfolio-data";
import avatar from "@/assets/avatar-optimized.webp";
export function About() {
  return (
    <section
      tabIndex={-1}
      id="about"
      aria-labelledby="about-heading"
      className="portfolio-section"
    >
      <div className="portfolio-container about-layout">
        <div className="about-portrait">
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
        </div>
        <div className="about-copy">
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
        </div>
      </div>
    </section>
  );
}
