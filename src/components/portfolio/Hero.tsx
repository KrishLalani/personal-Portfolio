import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { profile } from "@/lib/portfolio-data";

const HACKER_PHRASES = [
  "Building Software",
  "From Bold Ideas",
  "To Shipped Products",
];
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01xz$%&";

function ScrambleHeadline() {
  const elRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (reduce) {
      el.textContent = HACKER_PHRASES[0];
      return;
    }

    type Frag = { from: string; to: string; start: number; end: number; char?: string };
    let queue: Frag[] = [];
    let frame = 0;
    let raf = 0;
    let resolveCurrent: (() => void) | null = null;
    let cancelled = false;

    function render(next: string) {
      const current = el!.dataset.value ?? "";
      const length = Math.max(current.length, next.length);
      queue = [];
      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 30);
        const end = start + 12 + Math.floor(Math.random() * 30);
        queue.push({ from: current[i] ?? "", to: next[i] ?? "", start, end });
      }
      cancelAnimationFrame(raf);
      frame = 0;
      el!.dataset.value = next;
      return new Promise<void>((resolve) => {
        resolveCurrent = resolve;
        tick();
      });
    }

    function tick() {
      let output = "";
      let done = 0;
      for (const frag of queue) {
        if (frame >= frag.end) {
          done++;
          output += frag.to;
        } else if (frame >= frag.start) {
          if (!frag.char || Math.random() < 0.28) {
            frag.char =
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          output += `<span class="text-primary/70">${frag.char}</span>`;
        } else {
          output += frag.from;
        }
      }
      el!.innerHTML = output;
      if (done === queue.length) {
        resolveCurrent?.();
      } else {
        frame++;
        raf = requestAnimationFrame(tick);
      }
    }

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    let index = 0;
    (async function loop() {
      while (!cancelled) {
        await render(HACKER_PHRASES[index]);
        if (cancelled) break;
        await sleep(1500);
        index = (index + 1) % HACKER_PHRASES.length;
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return <span ref={elRef} className="whitespace-nowrap" aria-hidden />;
}

function ProductBlueprint({ reduce }: { reduce: boolean | null }) {
  const modules = [
    { x: 66, y: 116, label: "VISION", color: "var(--aurora-3)" },
    { x: 66, y: 238, label: "API", color: "var(--primary)" },
    { x: 66, y: 360, label: "DATA", color: "var(--aurora-2)" },
  ];

  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[33rem]">
      <div
        aria-hidden
        className="absolute inset-[12%] bg-primary/10 blur-3xl"
      />
      <svg
        viewBox="0 0 540 640"
        role="img"
        aria-label="Animated product blueprint assembling vision, API, and data modules into deployed software"
        className="relative size-full overflow-visible"
      >
        <defs>
          <linearGradient id="blueprint-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--aurora-3)" />
            <stop offset="55%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--aurora-2)" />
          </linearGradient>
          <filter id="blueprint-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="screen-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--card)" />
            <stop offset="100%" stopColor="var(--surface)" />
          </linearGradient>
        </defs>

        <g opacity="0.55" stroke="var(--border)" strokeWidth="1">
          {Array.from({ length: 12 }, (_, index) => (
            <line
              key={`vertical-${index}`}
              x1={index * 48}
              y1="0"
              x2={index * 48}
              y2="640"
            />
          ))}
          {Array.from({ length: 14 }, (_, index) => (
            <line
              key={`horizontal-${index}`}
              x1="0"
              y1={index * 48}
              x2="540"
              y2={index * 48}
            />
          ))}
        </g>

        <motion.g
          initial={{ opacity: 0, x: 28, y: 18 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect
            x="158"
            y="70"
            width="330"
            height="430"
            rx="26"
            fill="url(#screen-fill)"
            stroke="url(#blueprint-edge)"
            strokeWidth="2"
          />
          <path
            d="M158 128 H488"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle cx="190" cy="100" r="5" fill="var(--destructive)" opacity="0.7" />
          <circle cx="210" cy="100" r="5" fill="var(--aurora-4)" opacity="0.7" />
          <circle cx="230" cy="100" r="5" fill="var(--aurora-3)" opacity="0.8" />
          <text
            x="454"
            y="105"
            textAnchor="end"
            fill="var(--muted-foreground)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="2"
          >
            PRODUCT.OS
          </text>

          <rect x="184" y="154" width="278" height="54" rx="14" fill="var(--accent)" />
          <circle cx="210" cy="181" r="10" fill="var(--primary)" opacity="0.85" />
          <rect x="232" y="169" width="112" height="8" rx="4" fill="var(--foreground)" opacity="0.8" />
          <rect x="232" y="185" width="72" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.45" />

          <rect x="184" y="230" width="172" height="118" rx="16" fill="var(--accent)" />
          <path
            d="M204 315 C228 292 246 310 270 270 C294 230 316 298 338 256"
            fill="none"
            stroke="url(#blueprint-edge)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="374" y="230" width="88" height="118" rx="16" fill="var(--accent)" />
          <circle cx="418" cy="274" r="23" fill="none" stroke="var(--border)" strokeWidth="8" />
          <motion.path
            d="M418 251 A23 23 0 0 1 439 283"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="8"
            strokeLinecap="round"
            animate={reduce ? {} : { pathLength: [0.25, 0.8, 0.25] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="418" y="323" textAnchor="middle" fill="var(--muted-foreground)" fontFamily="var(--font-mono)" fontSize="8">
            LIVE
          </text>

          {[0, 1, 2].map((index) => (
            <g key={index}>
              <rect
                x="184"
                y={370 + index * 36}
                width="278"
                height="24"
                rx="8"
                fill="var(--accent)"
              />
              <motion.rect
                x="198"
                y={379 + index * 36}
                width={92 + index * 34}
                height="6"
                rx="3"
                fill={index === 0 ? "var(--primary)" : "var(--muted-foreground)"}
                opacity={index === 0 ? 0.8 : 0.35}
                animate={
                  reduce
                    ? {}
                    : { width: [70 + index * 25, 118 + index * 25, 70 + index * 25] }
                }
                transition={{
                  duration: 3.5 + index * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          ))}
        </motion.g>

        {modules.map((module, index) => (
          <motion.g
            key={module.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.35 + index * 0.15 }}
          >
            <rect
              x={module.x}
              y={module.y}
              width="68"
              height="68"
              rx="18"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <circle
              cx={module.x + 34}
              cy={module.y + 25}
              r="8"
              fill={module.color}
              opacity="0.85"
            />
            <text
              x={module.x + 34}
              y={module.y + 49}
              textAnchor="middle"
              fill="var(--muted-foreground)"
              fontFamily="var(--font-mono)"
              fontSize="8"
              letterSpacing="1.2"
            >
              {module.label}
            </text>
          </motion.g>
        ))}

        {[
          { d: "M134 150 C146 150 146 174 158 174", delay: 0 },
          { d: "M134 272 C146 272 146 288 158 288", delay: 0.7 },
          { d: "M134 394 C146 394 146 420 158 420", delay: 1.4 },
        ].map((connection) => (
          <g key={connection.d}>
            <path
              d={connection.d}
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="4 5"
            />
            <motion.circle
              r="4"
              fill="var(--primary)"
              filter="url(#blueprint-glow)"
              style={{ offsetPath: `path("${connection.d}")` }}
              animate={
                reduce
                  ? {}
                  : { offsetDistance: ["0%", "100%"], opacity: [0, 1, 0] }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: connection.delay,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        <motion.g
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="310"
            y="532"
            width="178"
            height="58"
            rx="18"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="338"
            cy="561"
            r="7"
            fill="var(--aurora-3)"
            filter="url(#blueprint-glow)"
            animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <text x="358" y="558" fill="var(--foreground)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.2">
            DEPLOYED
          </text>
          <text x="358" y="575" fill="var(--muted-foreground)" fontFamily="var(--font-mono)" fontSize="8">
            idea → working product
          </text>
        </motion.g>

        <path
          d="M420 500 V532"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeDasharray="4 5"
        />
        <motion.circle
          r="4"
          fill="var(--primary)"
          filter="url(#blueprint-glow)"
          style={{ offsetPath: 'path("M420 500 V532")' }}
          animate={
            reduce
              ? {}
              : { offsetDistance: ["0%", "100%"], opacity: [0, 1, 0] }
          }
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-border"
    >
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid opacity-70" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[45rem] bg-gradient-to-b from-primary/8 via-transparent to-transparent"
      />
      <div className="mx-auto grid w-full max-w-7xl gap-9 px-4 pb-14 pt-24 sm:gap-10 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-x-10 lg:gap-y-6 lg:pb-24 lg:pt-28">
        {/* Intro + headline */}
        <div className="mx-auto flex max-w-xl flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:mx-0 lg:max-w-none lg:items-start lg:self-end lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-center font-mono text-[9px] uppercase leading-snug tracking-[0.12em] text-foreground sm:text-[10px] sm:tracking-[0.16em]"
          >
            <span className="relative inline-flex size-1.5 shrink-0">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
              <span className="relative size-1.5 rounded-full bg-primary" />
            </span>
            <span>
              Open to collaborate, freelance &amp; build end-to-end product.
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:mt-9 sm:text-xs sm:tracking-[0.24em]"
          >
            Hello, I&apos;m {profile.name}
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="drop-shadow-title mt-3.5 flex min-h-[1.35em] max-w-full items-center justify-center gap-2 font-mono text-[clamp(1.35rem,6.4vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:mt-5 sm:gap-2.5 lg:justify-start"
          >
            <span className="sr-only">
              Building software, from bold ideas to shipped products.
            </span>
            <span aria-hidden className="text-primary">
              &gt;
            </span>
            <span aria-hidden className="inline-flex items-center">
              <ScrambleHeadline />
              <span className="animate-caret ml-1.5 inline-block h-[0.95em] w-[0.5ch] rounded-[1px] bg-primary align-middle" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-7 sm:max-w-xl sm:text-lg"
          >
            I build reliable backend systems, computer-vision pipelines, and
            connected products—from the first API decision to software that
            works in the field.
          </motion.p>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[15rem] min-[420px]:max-w-[17rem] sm:max-w-[20rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-center"
        >
          <ProductBlueprint reduce={reduce} />
        </motion.div>

        {/* Actions + meta */}
        <div className="mx-auto w-full max-w-xl lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-none lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.46 }}
            className="flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-center sm:gap-4 lg:justify-start"
          >
            <MagneticButton href="#work" variant="primary">
              <Sparkles className="size-4" />
              Explore my work
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Let&apos;s talk
              <ArrowUpRight className="size-4" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="mx-auto mt-7 flex max-w-sm flex-col items-center gap-2 border-t border-border pt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:text-[10px] sm:tracking-[0.14em] lg:mx-0 lg:justify-start"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3 text-primary" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-3 text-primary" />
              {profile.availability}
            </span>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-6 right-6 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground lg:flex"
      >
        Continue
        <ArrowDown className="size-3.5 text-primary" />
      </motion.a>
    </section>
  );
}
