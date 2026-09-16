import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { navLinks, profile } from "@/lib/portfolio-data";
import { Magnetic } from "./Magnetic";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="portfolio-container">
        <div className="footer-top">
          <div className="footer-mark">
            <span className="monogram">
              kl<span>.</span>
            </span>
            <p>
              Backend systems. <em>Computer vision.</em> Practical software.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <span className="eyebrow">Sections</span>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-reach">
            <span className="eyebrow">Elsewhere</span>
            <ul>
              <li>
                <a href={`mailto:${profile.email}`}>
                  <Mail size={15} /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github size={15} /> GitHub
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={15} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {profile.name} · {profile.role} · {profile.location}
          </p>
          <Magnetic strength={0.2}>
            <a href="#top" className="footer-top-link" aria-label="Back to top">
              <ArrowUp size={16} />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
