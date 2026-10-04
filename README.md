# Krish Lalani — Portfolio

React, TanStack Start, TypeScript, and Tailwind CSS. The production website is prerendered HTML with interactive React components: no running backend, paid API, database, or serverless function is required.

## Run locally

Use Node 22.12 or newer (`.nvmrc` selects Node 22).

```sh
npm ci
npm run dev
```

Development runs on port 8080. To check the exact static files you will deploy:

```sh
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`. Publish **`dist/client`**, which contains `index.html`, assets, resume downloads, a 404 page, robots.txt, and sitemap.xml. `dist/server` is used during prerendering only; do not upload it or configure a server start command.

## Free deployment

### Netlify

1. Select the **Free** plan and import the repository.
2. Use build command **`npm run build`**, publish directory **`dist/client`**, and Node **22**. `netlify.toml` provides these settings.
3. If the project has old build/start-command overrides or framework plugins from an earlier deployment, remove those overrides. This build needs no server adapter.
4. Deploy the updated commit, including **both `package.json` and `package-lock.json`**. Clear the old build cache for the first deployment after this update.

Alternatively, run `npm run build` locally and upload the **contents of `dist/client`** using Netlify's manual deploy interface. All contact actions use email or external profile links; no paid form service is required.

### Vercel

1. Import the repository using **Hobby** for a personal, non-commercial portfolio.
2. Select framework preset **Other**, Node **22.x**, build **`npm run build`**, and output **`dist/client`**. `vercel.json` contains the static deployment configuration.
3. Redeploy with the old build cache disabled. No server start command is needed.

Use a provider's free subdomain if you want to avoid domain registration fees. Set optional **`VITE_SITE_URL`** to the final HTTPS origin before building so canonical URLs, social previews, and the sitemap use that address. The default remains `https://portfolio.krishlalani.dev`.

Free plans still have traffic/build limits. Netlify Free pauses sites when their credit allowance is exhausted; Vercel Hobby is limited to personal, non-commercial use. Check [Netlify's current plan details](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) and [Vercel Hobby](https://vercel.com/docs/plans/hobby). These changes prepare the site for deployment; they do not change your hosting account's subscription or publish it automatically.

## Security fix

`@tanstack/react-start` is pinned to **1.168.60**, with `@tanstack/start-server-core` **1.169.39** in the lockfile. These are the patched releases for [GHSA-qx66-fv34-fjm8](https://github.com/TanStack/router/security/advisories/GHSA-qx66-fv34-fjm8). The router and its plugin are updated to compatible versions, and other dependencies have compatible security fixes.

Remove `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS` from the hosting environment if you previously added it. The build validates the patch versions and fails on missing prerendered content or referenced assets.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm audit
```

The browser tests use installed Google Chrome and preview `dist/client`. Coverage includes widths from 320 to 1920 pixels, phone landscape navigation, laptop hero fit at 1024 × 768 / 1280 × 720 / 1366 × 768 / 1440 × 900, mobile project and experience slides (buttons, keyboard, wrapping, and changing heights), reduced-motion hydration, standard pointer, project filtering/search, theme persistence, clipboard copying, PDF/Word downloads, local images, metadata, static 404 handling, and content without JavaScript. Screenshots and failure traces go to `test-results` (not committed). Lint checks code correctness; formatting is handled separately by Prettier. The UI component library has six existing Fast Refresh warnings.

## Responsive behavior

The opening section is compact enough for typical laptop screens. Projects and Experience use one card per slide below 768px, with touch scrolling, previous/next buttons, and optional autoplay (off by default). The slide container follows the active card’s height. Skills stay in a readable grid. Tablets use a single-column hero with a wider engineering panel, and desktop keeps the two-column composition. The native pointer is used throughout.

## Content and career materials

Edit `src/lib/portfolio-data.ts` for profile details, reviewed biography, skills, projects, experience, education, and recognition. Review notes live in `content-review/README.md`. Project visuals are descriptive system overviews, not product screenshots.

`career/LinkedIn_Banner.png` is the simplified dark banner; `LinkedIn_Banner_Light.png` is the light alternative. Both are **1584 × 396**, with editable SVG sources. They contain your name, role, specialties, and portfolio address, leaving space for LinkedIn's profile photo. Check the crop in LinkedIn before uploading.

```sh
npm run banner                         # rebuild only the two LinkedIn banners
node scripts/export-career-content.mjs
node scripts/build-linkedin.mjs         # regenerate profile pack and brand notes
```

Banner export uses installed Google Chrome; set `CHROME_PATH` for another Chromium executable. Its system fonts require no network download. `node scripts/build-brand.mjs` regenerates the entire brand kit; the other cards use webfonts.

The `career` folder also contains the PDF and Word resumes and ATS snapshots. Website downloads come from `src/assets`. `scripts/build-resume.py` requires `python-docx`, `reportlab`, `pypdf`, and Arial fonts; inspect regenerated documents before replacing download copies. The live LinkedIn profile has not been modified.
