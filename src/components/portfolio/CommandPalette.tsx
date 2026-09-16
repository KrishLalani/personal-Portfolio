import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Command,
  Copy,
  FileDown,
  Github,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { navLinks, profile, projects } from "@/lib/portfolio-data";
import { useTheme } from "@/hooks/use-theme";

interface Action {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: typeof Search;
  run: () => void;
}

const slug = (title: string) => title.toLowerCase().replaceAll(" ", "-");

/**
 * ⌘K / Ctrl+K palette: jump to a section or project, copy the email address,
 * flip the theme, or open an external profile. Keyboard-first, focus-trapped,
 * and closed on Escape.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);
  // The palette mounts inside <header>, which sets backdrop-filter. That makes
  // the header the containing block for position:fixed children, so the overlay
  // has to be portalled to <body> or it is trapped inside the nav bar.
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const { toggle } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
    openerRef.current?.focus?.();
  }, []);

  const go = useCallback(
    (hash: string) => {
      close();
      window.setTimeout(() => {
        document.getElementById(hash.replace("#", ""))?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        history.replaceState(null, "", hash);
      }, 90);
    },
    [close],
  );

  const actions = useMemo<Action[]>(() => {
    const items: Action[] = navLinks.map((link) => ({
      id: `nav${link.href}`,
      group: "Navigate",
      label: link.label,
      hint: link.href,
      icon: Layers,
      run: () => go(link.href),
    }));

    for (const project of projects) {
      items.push({
        id: `project-${project.title}`,
        group: "Projects",
        label: project.title,
        hint: project.category.split("·")[0].trim(),
        icon: Search,
        run: () => go(`#project-${slug(project.title)}`),
      });
    }

    items.push(
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setCopied(true),
            () => setCopied(false),
          );
          close();
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        hint: "mailto",
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
          close();
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download resume (PDF)",
        icon: FileDown,
        run: () => {
          const anchor = document.createElement("a");
          anchor.href = profile.resume;
          anchor.download = "Krish_Lalani_Resume.pdf";
          anchor.click();
          close();
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        icon: isDark ? Sun : Moon,
        run: () => {
          toggle();
          close();
        },
      },
      {
        id: "github",
        group: "Elsewhere",
        label: "GitHub",
        hint: "KrishLalani",
        icon: Github,
        run: () => {
          window.open(profile.github, "_blank", "noopener");
          close();
        },
      },
      {
        id: "linkedin",
        group: "Elsewhere",
        label: "LinkedIn",
        hint: "krish-lalani",
        icon: Linkedin,
        run: () => {
          window.open(profile.linkedin, "_blank", "noopener");
          close();
        },
      },
    );
    return items;
  }, [close, go, isDark, toggle]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.hint ?? ""} ${action.group}`
        .toLowerCase()
        .includes(term),
    );
  }, [actions, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Action[]>();
    for (const action of filtered) {
      const bucket = map.get(action.group) ?? [];
      bucket.push(action);
      map.set(action.group, bucket);
    }
    return [...map.entries()];
  }, [filtered]);

  useEffect(() => setMounted(true), []);

  // Mirror the theme class so the palette shows the right icon (client only).
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Global open shortcut.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openerRef.current = document.activeElement as HTMLElement;
        setOpen((value) => !value);
      }
      if (event.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  const onListKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((value) => (value + 1) % Math.max(1, filtered.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor(
        (value) =>
          (value - 1 + Math.max(1, filtered.length)) %
          Math.max(1, filtered.length),
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      filtered[cursor]?.run();
    } else if (event.key === "Tab") {
      // Keep focus inside the panel.
      event.preventDefault();
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let flatIndex = -1;

  return (
    <>
      <button
        type="button"
        className="cmdk-hint"
        onClick={(event) => {
          openerRef.current = event.currentTarget;
          setOpen(true);
        }}
        aria-haspopup="dialog"
      >
        <Command size={12} /> Search <kbd>⌘K</kbd>
      </button>

      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard." : ""}
      </span>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="cmdk-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) close();
                }}
              >
                <motion.div
                  className="cmdk-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Command palette"
                  initial={{ opacity: 0, y: -14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onKeyDown={onListKey}
                >
                  <div className="cmdk-search">
                    <Search size={17} />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search sections, projects, actions…"
                      aria-label="Search sections, projects and actions"
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </div>
                  <div className="cmdk-list" ref={listRef}>
                    {grouped.length === 0 && (
                      <p className="cmdk-empty">No matches for “{query}”.</p>
                    )}
                    {grouped.map(([group, items]) => (
                      <div key={group}>
                        <p className="cmdk-group">{group}</p>
                        {items.map((action) => {
                          flatIndex += 1;
                          const index = flatIndex;
                          const Icon = action.icon;
                          return (
                            <button
                              key={action.id}
                              type="button"
                              className="cmdk-item"
                              data-active={index === cursor}
                              onMouseEnter={() => setCursor(index)}
                              onClick={action.run}
                            >
                              <Icon size={15} />
                              {action.label}
                              {action.hint && <span>{action.hint}</span>}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="cmdk-footer">
                    <span>↑↓ Navigate</span>
                    <span>↵ Open</span>
                    <span>Esc Close</span>
                    <span style={{ marginLeft: "auto" }}>
                      <ArrowUpRight size={11} /> {filtered.length} results
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
