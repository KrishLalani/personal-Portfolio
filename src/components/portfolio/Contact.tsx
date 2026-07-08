import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FileDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const links = [
  { label: "GitHub", value: "View repositories", href: profile.github, Icon: Github },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: profile.linkedin,
    Icon: Linkedin,
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[1.5rem] border border-border bg-foreground p-6 text-background sm:rounded-[2rem] sm:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/55">
                07 — Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-5 max-w-[12ch] font-display text-[clamp(2.6rem,12vw,6.5rem)] leading-[0.9] tracking-tight"
              >
                Let&apos;s build something useful.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-background/65">
                I&apos;m open to software development roles and freelance work.
                The fastest way to reach me is by email.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground"
                >
                  <Mail className="size-4" />
                  Email me
                </a>
                <a
                  href={profile.resume}
                  download="Krish_Lalani_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-background/20 px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10"
                >
                  <FileDown className="size-4" />
                  Résumé
                </a>
              </div>
            </motion.div>

            <div className="divide-y divide-background/15 border-y border-background/15">
              {links.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-background/20">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-background/50">
                      {label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-background/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-background" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
