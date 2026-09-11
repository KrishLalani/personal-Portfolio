import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/portfolio-data";
import { ThemeToggle } from "./ThemeToggle";
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(entry.target.id === "top" ? "" : `#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    const top = document.getElementById("top");
    if (top) observer.observe(top);
    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      media.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <header className="site-header" ref={headerRef}>
      <div className="portfolio-container nav-inner">
        <a
          href="#top"
          className="wordmark"
          aria-label={`${profile.name}, back to top`}
        >
          <span className="monogram">
            kl<span>.</span>
          </span>
          <span>KRISH LALANI</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              aria-current={active === link.href ? "location" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="nav-contact">
            Let’s talk <ArrowUpRight size={14} />
          </a>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        className="mobile-nav"
        hidden={!open}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => {
              setOpen(false);
              document
                .getElementById(link.href.slice(1))
                ?.focus({ preventScroll: true });
            }}
            aria-current={active === link.href ? "location" : undefined}
          >
            {link.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
      </nav>
    </header>
  );
}
