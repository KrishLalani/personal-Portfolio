import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";
export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };
  return (
    <section
      tabIndex={-1}
      id="contact"
      aria-labelledby="contact-heading"
      className="portfolio-section contact-section"
    >
      <div className="portfolio-container">
        <div className="contact-panel">
          <div>
            <p className="eyebrow">06 / Get in touch</p>
            <h2 id="contact-heading">
              Have a problem
              <br />
              <span>worth solving?</span>
            </h2>
            <p className="contact-description">
              Let’s talk about software development opportunities, freelance
              projects, or a technical challenge you’re working on.
            </p>
            <a href={`mailto:${profile.email}`} className="contact-email">
              {profile.email}
              <ArrowUpRight size={24} />
            </a>
            <a
              href={profile.resumeDocx}
              download="Krish_Lalani_Resume.docx"
              className="resume-word-link"
            >
              <FileDown size={14} /> Resume in Word format
            </a>
            <div className="copy-row">
              <button type="button" onClick={copyEmail}>
                {copyState === "copied" ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}{" "}
                {copyState === "copied" ? "Email copied" : "Copy email address"}
              </button>
              <span role="status">
                {copyState === "error"
                  ? "Copy unavailable. Select the email address above or use Email me."
                  : copyState === "copied"
                    ? "Copied to clipboard."
                    : ""}
              </span>
            </div>
          </div>
          <div className="contact-actions">
            <span className="availability">
              <span />
              {profile.availability}
            </span>
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} />
              <span>Email me</span>
              <ArrowUpRight size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={18} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              <span>Explore GitHub</span>
              <ArrowUpRight size={18} />
            </a>
            <a href={profile.resume} download="Krish_Lalani_Resume.pdf">
              <FileDown size={18} />
              <span>Download resume</span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
