import { ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {profile.role} · © {year}
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground"
          aria-label="Footer"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          aria-label="Back to top"
        >
          <ArrowUp className="size-4" />
        </a>
      </div>
    </footer>
  );
}
