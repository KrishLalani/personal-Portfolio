
# Krish Lalani — Premium Portfolio

A frontend-only, single-page portfolio with award-winning polish: minimalist composition, Linear/Vercel-grade detailing, Framer Motion throughout, system-preference theme, and a #018DEF accent over a near-black #020B1A canvas.

## Design system

- **Tokens** in `src/styles.css` (oklch): `--background`, `--foreground`, `--primary` (#018DEF), `--accent`, `--muted`, plus `--gradient-primary`, `--gradient-mesh`, `--shadow-glow`, `--shadow-elegant`.
- **Light/Dark** via `.dark` class with `next-themes`-style toggle (no extra dep — small custom hook reading `prefers-color-scheme` + localStorage). Defaults to system.
- **Type**: Inter for UI/body, Instrument Serif accents for editorial headline moments. Generous tracking, large display sizes, asymmetric weight pairing.
- **Layout**: 12-col max-w-7xl, generous vertical rhythm (py-32 sections), section eyebrow labels, numbered section markers (01 — About) à la Linear.

## Sections & interactions

1. **Hero** — Full-viewport. Animated mesh-gradient blob background (CSS + Framer Motion), mouse-tracking radial glow, floating geometric shapes parallaxed to cursor, large split headline ("Developer & Product Builder"), tagline, two magnetic CTAs (View Work / Contact). Scroll-cue at bottom.
2. **About** — Two-col: portrait placeholder (rounded, soft glow ring) + bio, career goals, education, story. Below: 4 animated stat cards (years, projects, clients, technologies) with count-up on scroll.
3. **Skills** — Categorized grid (Frontend / Backend / Database / Cloud / AI). Glass cards with subtle border, hover lift + glow, animated icon sweep, staggered reveal.
4. **Featured Projects** — 3–4 large cards alternating left/right. Glassmorphism, parallax screenshot inside frame, hover zoom, tech-stack chips, Live Demo + GitHub buttons. Placeholder screenshots generated via imagegen.
5. **Experience Timeline** — Vertical timeline, animated draw-on-scroll line, dot markers pulse on enter, cards slide in from alternating sides on desktop, single column on mobile.
6. **Certifications & Achievements** — Bento-style card grid with hover tilt and gradient border-on-hover.
7. **Contact** — Split layout: left = headline + socials (GitHub, LinkedIn, Email, Resume Download), right = frontend-only form (name, email, message) with focused-input glow, submit shows a success toast (sonner) — no backend.
8. **Footer** — Minimal: wordmark, nav, socials, copyright, subtle gradient hairline.

## Global polish

- Sticky top nav with blur backdrop, active-section highlight via IntersectionObserver, theme toggle, mobile sheet menu.
- Custom cursor (desktop only) — small dot + ring that scales on hovering interactive elements.
- Page-level entrance: stagger fade/translate via Framer Motion.
- Scroll-triggered reveals using `whileInView` with `once: true`.
- Smooth scroll behavior + anchor offsets for sticky nav.
- Reduced-motion respected (prefers-reduced-motion disables magnetic/cursor/parallax).

## Content (using what you shared + tasteful placeholders you can edit)

- Name: **Krish Lalani**, Role: **Developer & Product Builder**, Tagline: "Turning complex challenges into elegant digital solutions."
- Socials: GitHub `https://github.com`, LinkedIn `https://www.linkedin.com/in/krish-lalani-bb4385252/`, Email `Krish7lalani@gmail.com`, Resume → `#` placeholder.
- Projects, experience, education, certifications: realistic placeholders aligned to the listed skill stack (React/TS, Node, Postgres, AWS, OpenAI) — clearly structured so you can swap copy in one file.

## File structure

```text
src/
  routes/
    __root.tsx              (add ThemeProvider, custom cursor, SEO defaults)
    index.tsx               (renders <Portfolio />, route-level head/SEO + JSON-LD Person)
  components/
    portfolio/
      Nav.tsx
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Certifications.tsx
      Contact.tsx
      Footer.tsx
      MagneticButton.tsx
      CustomCursor.tsx
      SectionHeading.tsx
      ThemeToggle.tsx
    Portfolio.tsx           (composes the sections)
  hooks/
    use-theme.ts
    use-mouse-position.ts
    use-magnetic.ts
  lib/
    portfolio-data.ts       (single source of truth for content)
  assets/
    project-*.jpg           (generated screenshots)
    avatar.jpg              (generated portrait placeholder)
  styles.css                (extended design tokens + keyframes)
```

## Technical notes

- Add `framer-motion` via `bun add framer-motion`.
- Use existing shadcn `button`, `card`, `input`, `textarea`, `sonner`.
- All colors via semantic tokens — no hard-coded hex in components.
- SEO: route `head()` with title, description, og:title/description/type=website, og:url, canonical, JSON-LD `Person`. Single H1 in hero. Semantic landmarks (`<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`). Alt text on every image. `prefers-reduced-motion` honored. Lazy-loaded project images. Responsive viewport already set in `__root.tsx`.
- Lighthouse target: 95+ across the board.

## Out of scope (per your spec)

No backend, API, DB, auth, CMS, admin, or server logic. Contact form is presentational only.

After you approve, I'll build it in one pass and generate the placeholder imagery.
