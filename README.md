# Krish Lalani — Portfolio

A responsive portfolio focused on Python backend engineering and computer vision. Built with React, TanStack Start, TypeScript, and Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

The development server uses port 8080. Run `npm run build` for a production build; the standalone Node server is generated at `dist/server/index.mjs`.

## Content

`src/lib/portfolio-data.ts` contains profile details, approved biography, core skills, project descriptions, experience bullets, education, and recognition. The full review record is in `content-review/README.md`.

The website uses descriptive system overviews for projects. Replace them with actual project media only when available; generic images are not represented as product screenshots. Existing source images and the original supplied resumes remain in `src/assets`.

## Career materials

The `career` folder contains the designed PDF and Word resume with section bands, a compact skills table, and all six linked projects. It also includes extracted plain text, the previous table-free resume as `Krish_Lalani_Resume_ATS.pdf`/`.docx`, the LinkedIn profile pack, and a PNG/SVG banner illustrating backend and computer-vision workflows. The website downloads the updated designed PDF and Word files from `src/assets`. The ATS copies are preserved snapshots; the builder regenerates the designed version only.

To regenerate after a factual update:

```sh
node scripts/export-career-content.mjs
node scripts/build-linkedin.mjs
python scripts/build-resume.py
```

The document builder needs `python-docx`, `reportlab`, `pypdf`, and Arial fonts (the current script uses macOS system fonts). Use the bundled document runtime in Codex when available. Inspect the regenerated PDF and verify the Word document before replacing the website download copies. The current PDF passed visual review and text-extraction checks; Word structure was checked, but its visual rendering was unavailable because LibreOffice is not installed.

## Checks

```sh
npx tsc --noEmit
npm run build
```

The changed TypeScript files were also checked with ESLint. Browser verification covered desktop and 320/390/768px layouts, project filters, contribution details, the engineering explorer, theme persistence, mobile menu/Escape behavior, clipboard copying, PDF/Word downloads, section labels, image loading, reduced motion, content without JavaScript, and 404 handling.

## Deployment metadata

The confirmed origin is `https://portfolio.krishlalani.dev`. Override it with `VITE_SITE_URL` when building for another domain; `.env.example` documents the setting. The origin drives canonical and Open Graph URLs. The social sharing image is `public/social-card.png`.

These workspace changes have not been deployed. The LinkedIn pack and banner are prepared assets; the live LinkedIn account has not been modified.
