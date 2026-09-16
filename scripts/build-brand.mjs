/**
 * Build the LinkedIn / brand asset kit from the reviewed career facts.
 *
 * Outputs (career/):
 *   LinkedIn_Banner.svg|.png            1584x396  dark, the default
 *   LinkedIn_Banner_Light.svg|.png      1584x396  light alternative
 *   LinkedIn_Featured_Portfolio.png     1200x627  Featured-section card
 *   LinkedIn_Featured_PondGuard.png     1200x627
 *   LinkedIn_Featured_Placestar.png     1200x627
 *   Brand_Palette.png                   1200x600  swatch sheet
 *
 * SVGs are written as portable files (with Arial/Georgia fallbacks) and then
 * rasterised through headless Chrome, which loads the real webfonts so the PNGs
 * match the website's typography exactly.
 *
 * Usage: node scripts/build-brand.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const OUT = new URL("../career/", import.meta.url);
mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- palette */
// Taken from src/styles.css so every asset matches the deployed site.
const C = {
  ink: "#101a16",
  inkDeep: "#0b1410",
  panel: "#1b2a21",
  panelLine: "#304034",
  text: "#edf2e9",
  muted: "#abb9ae",
  primary: "#a8dcb0",
  primaryDeep: "#23745a",
  lightBg: "#f7f9f5",
  lightSurface: "#eef2eb",
  lightText: "#172b25",
  lightMuted: "#5d6d64",
  lightLine: "#dce3d9",
};

const SANS = "Inter, Arial, Helvetica, sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const MONO = "'JetBrains Mono', 'SF Mono', Consolas, monospace";

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/* ------------------------------------------------------------- the banner */
/**
 * LinkedIn renders this 1584x396 image differently per surface. Two areas are
 * treated as unsafe and carry nothing but texture:
 *   - bottom-left ~0-330 x ~230-396, where the profile photo sits on desktop
 *   - the outer left/right thirds, which mobile crops away
 * All wording lives between x=366 and x=1250.
 */
function banner({ light = false } = {}) {
  const bg = light ? C.lightBg : C.ink;
  const bg2 = light ? C.lightSurface : "#16332a";
  const text = light ? C.lightText : C.text;
  const muted = light ? C.lightMuted : C.muted;
  const accent = light ? C.primaryDeep : C.primary;
  const line = light ? C.lightLine : C.panelLine;
  const panel = light ? "#ffffff" : "#16271f";
  const gridOpacity = light ? ".5" : ".42";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1584" height="396" viewBox="0 0 1584 396" role="img" aria-label="Krish Lalani, Software Developer. Backend systems, computer vision, practical software.">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="${bg}"/><stop offset="1" stop-color="${bg2}"/>
  </linearGradient>
  <radialGradient id="halo" cx=".5" cy=".5">
    <stop stop-color="${accent}" stop-opacity="${light ? ".14" : ".20"}"/>
    <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
  </radialGradient>
  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
    <path d="M28 0H0V28" stroke="${accent}" stroke-opacity="${light ? ".10" : ".07"}" fill="none"/>
  </pattern>
</defs>

<rect width="1584" height="396" fill="url(#bg)"/>
<rect width="1584" height="396" fill="url(#grid)" opacity="${gridOpacity}"/>
<ellipse cx="1290" cy="198" rx="390" ry="370" fill="url(#halo)"/>

<!-- Texture only: LinkedIn's profile photo overlaps this corner. -->
<g fill="none" stroke="${accent}" stroke-opacity="${light ? ".22" : ".16"}">
  <circle cx="158" cy="182" r="110"/>
  <circle cx="158" cy="182" r="164" stroke-dasharray="2 9"/>
  <path d="M0 182H270M158 18V296"/>
</g>
<g fill="${accent}" opacity=".55"><circle cx="236" cy="104" r="4"/><circle cx="74" cy="256" r="2.5"/></g>
<path d="M318 48V348" stroke="${line}"/>

<!-- Message block -->
<text x="366" y="78" font-family="${SANS}" font-size="16" font-weight="600" letter-spacing="3.6" fill="${text}">KRISH LALANI</text>
<text x="366" y="104" font-family="${MONO}" font-size="10" letter-spacing="2.6" fill="${muted}">SOFTWARE DEVELOPER</text>
<text x="363" y="178" font-family="${SANS}" font-size="52" font-weight="700" letter-spacing="-2" fill="${text}">Backend systems.</text>
<text x="364" y="246" font-family="${SERIF}" font-size="64" font-style="italic" letter-spacing="-1.4" fill="${accent}">Computer vision.</text>
<text x="366" y="292" font-family="${SANS}" font-size="25" font-weight="400" letter-spacing="-.4" fill="${muted}">Practical software.</text>
<path d="M366 316H986" stroke="${line}"/>
<text x="366" y="345" font-family="${MONO}" font-size="12" letter-spacing="2" fill="${accent}">PYTHON · NODE.JS · YOLO · OPENCV</text>

<!-- Two disciplines converging on a shipped product -->
<text x="1064" y="48" font-family="${MONO}" font-size="9" letter-spacing="2.4" fill="${muted}">FROM INPUT TO IMPACT</text>
<g fill="${panel}" stroke="${line}">
  <rect x="1056" y="66" width="300" height="104" rx="10"/>
  <rect x="1056" y="216" width="300" height="108" rx="10"/>
</g>
<path d="M1056 102H1356M1056 252H1356" stroke="${line}"/>
<text x="1074" y="92" font-family="${MONO}" font-size="10" letter-spacing="1.8" fill="${accent}">{ } BACKEND</text>
<text x="1074" y="242" font-family="${MONO}" font-size="10" letter-spacing="1.8" fill="${accent}">[ ] COMPUTER VISION</text>
<g font-family="${MONO}" font-size="11" fill="${muted}">
  <text x="1074" y="126">request → API → auth → data</text>
  <text x="1074" y="148">schema / access control</text>
  <text x="1120" y="284">frame → model → detection</text>
  <text x="1120" y="306">train / evaluate / deploy</text>
</g>
<!-- Small detector glyph beside the vision panel -->
<g stroke="${accent}" fill="none" stroke-opacity=".8">
  <rect x="1074" y="266" width="34" height="34" rx="3"/>
  <path d="M1074 277h34M1074 289h34M1085 266v34M1097 266v34" stroke-opacity=".3"/>
</g>
<path d="M1356 118h44v94h16M1356 288h44v-76" fill="none" stroke="${accent}" stroke-opacity=".45"/>
<g fill="${accent}"><circle cx="1360" cy="118" r="3.5"/><circle cx="1360" cy="288" r="3.5"/></g>
<g fill="${panel}" stroke="${accent}" stroke-opacity=".55">
  <rect x="1416" y="176" width="72" height="72" rx="14"/>
</g>
<path d="M1440 212l10 11 18-21" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
<text x="1452" y="272" font-family="${MONO}" font-size="9" letter-spacing="1.8" fill="${muted}" text-anchor="middle">SHIPPED</text>

<text x="1056" y="360" font-family="${MONO}" font-size="11" letter-spacing=".6" fill="${muted}">portfolio.krishlalani.dev</text>
</svg>`;
}

/* ------------------------------------------------- Featured section cards */
/**
 * Featured-section card, 1200x627 (LinkedIn's 1.91:1 link-preview ratio).
 * SVG text does not wrap, so `body` is passed as explicit lines. When a motif
 * is present the text column stops at x=780 to keep the two apart.
 */
function featured({ eyebrow, title, italic, body, meta, motif }) {
  const lines = Array.isArray(body) ? body : [body];
  const titleY = italic ? 252 : 268;
  const italicY = titleY + 88;
  const bodyTop = (italic ? italicY : titleY) + 74;
  const bodyLines = lines
    .map(
      (line, index) =>
        `<text x="72" y="${bodyTop + index * 36}" font-family="${SANS}" font-size="25" fill="${C.muted}">${esc(line)}</text>`,
    )
    .join("\n");
  const ruleY = bodyTop + (lines.length - 1) * 36 + 48;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="627" viewBox="0 0 1200 627">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${C.ink}"/><stop offset="1" stop-color="#16332a"/></linearGradient>
  <radialGradient id="halo"><stop stop-color="${C.primary}" stop-opacity=".18"/><stop offset="1" stop-color="${C.primary}" stop-opacity="0"/></radialGradient>
  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="${C.primary}" stroke-opacity=".07" fill="none"/></pattern>
</defs>
<rect width="1200" height="627" fill="url(#bg)"/>
<rect width="1200" height="627" fill="url(#grid)"/>
<ellipse cx="980" cy="150" rx="420" ry="380" fill="url(#halo)"/>
<g fill="none" stroke="${C.panelLine}"><path d="M72 72h34M72 72v34M1128 555h-34M1128 555v-34"/></g>
<text x="72" y="124" font-family="${MONO}" font-size="13" letter-spacing="3.4" fill="${C.primary}">${esc(eyebrow)}</text>
<text x="70" y="${titleY}" font-family="${SANS}" font-size="78" font-weight="700" letter-spacing="-2.6" fill="${C.text}">${esc(title)}</text>
${italic ? `<text x="70" y="${italicY}" font-family="${SERIF}" font-size="80" font-style="italic" letter-spacing="-1.6" fill="${C.primary}">${esc(italic)}</text>` : ""}
${bodyLines}
<path d="M72 ${ruleY}H${motif ? 780 : 1128}" stroke="${C.panelLine}"/>
<text x="72" y="${ruleY + 40}" font-family="${MONO}" font-size="15" letter-spacing="1.6" fill="${C.muted}">${esc(meta)}</text>
${motif ?? ""}
<text x="72" y="562" font-family="${MONO}" font-size="14" letter-spacing="1" fill="${C.primary}">portfolio.krishlalani.dev</text>
<text x="1128" y="562" text-anchor="end" font-family="${MONO}" font-size="14" letter-spacing="2.4" fill="${C.muted}">KRISH LALANI</text>
</svg>`;
}

const detectorMotif = `
<g opacity=".92">
  <rect x="822" y="176" width="306" height="236" rx="10" fill="#0e1f18" stroke="${C.panelLine}"/>
  <g stroke="${C.primary}" fill="none" stroke-opacity=".22">
    <path d="M822 232h306M822 294h306M822 356h306"/>
  </g>
  <g transform="translate(0,45)">
  <g stroke="${C.primary}" fill="none" stroke-width="1.6">
    <path d="M866 196v-14h-14M964 182h14v14M978 236v14h-14M866 250h-14v-14"/>
  </g>
  <rect x="852" y="182" width="126" height="68" fill="${C.primary}" fill-opacity=".12"/>
  <rect x="852" y="164" width="86" height="16" rx="3" fill="${C.primary}"/>
  <text x="858" y="176" font-family="${MONO}" font-size="10" fill="#0d1512">heron 0.94</text>
  <g stroke="#7ec8e3" fill="none" stroke-width="1.6">
    <path d="M1034 300v-12h-12M1084 288h12v12M1096 322v12h-12M1034 334h-12v-12"/>
  </g>
  <rect x="1022" y="288" width="74" height="46" fill="#7ec8e3" fill-opacity=".12"/>
  </g>
</g>`;

const apiMotif = `
<g opacity=".95">
  <rect x="822" y="176" width="306" height="236" rx="10" fill="#0e1f18" stroke="${C.panelLine}"/>
  <g transform="translate(0,45)">
  <g font-family="${MONO}" font-size="12" fill="${C.muted}">
    <text x="842" y="186">POST /api/v1/auth/session</text>
    <text x="842" y="216">GET  /api/v1/placements</text>
    <text x="842" y="246">GET  /api/v1/students/:id</text>
    <text x="842" y="276">PATCH /api/v1/exams/:id</text>
  </g>
  <g font-family="${MONO}" font-size="11">
    <rect x="1042" y="174" width="34" height="16" rx="3" fill="${C.primary}" fill-opacity=".22"/><text x="1048" y="186" fill="${C.primary}">201</text>
    <rect x="1042" y="204" width="34" height="16" rx="3" fill="${C.primary}" fill-opacity=".22"/><text x="1048" y="216" fill="${C.primary}">200</text>
    <rect x="1042" y="234" width="34" height="16" rx="3" fill="${C.primary}" fill-opacity=".22"/><text x="1048" y="246" fill="${C.primary}">200</text>
    <rect x="1042" y="264" width="34" height="16" rx="3" fill="${C.primary}" fill-opacity=".22"/><text x="1048" y="276" fill="${C.primary}">200</text>
  </g>
  <path d="M842 300h256" stroke="${C.panelLine}"/>
  <text x="842" y="324" font-family="${MONO}" font-size="11" fill="${C.muted}">100+ students · single-session controls</text>
  </g>
</g>`;

/* ------------------------------------------------------------- swatches */
function palette() {
  const swatches = [
    ["Ink", C.ink, "Background, dark"],
    ["Panel", C.panel, "Cards, elevated"],
    ["Line", C.panelLine, "Borders, dark"],
    ["Mint", C.primary, "Accent, dark"],
    ["Forest", C.primaryDeep, "Accent, light"],
    ["Paper", C.lightBg, "Background, light"],
    ["Slate", C.lightText, "Text, light"],
    ["Muted", C.lightMuted, "Secondary text"],
  ];
  const cells = swatches
    .map((item, index) => {
      const x = 72 + (index % 4) * 270;
      const y = 150 + Math.floor(index / 4) * 210;
      const dark = ["#f7f9f5", "#a8dcb0"].includes(item[1]);
      return `<g>
  <rect x="${x}" y="${y}" width="238" height="120" rx="10" fill="${item[1]}" stroke="${C.panelLine}"/>
  <text x="${x + 16}" y="${y + 40}" font-family="${SANS}" font-size="19" font-weight="600" fill="${dark ? C.lightText : C.text}">${item[0]}</text>
  <text x="${x + 16}" y="${y + 106}" font-family="${MONO}" font-size="13" fill="${dark ? C.lightMuted : C.muted}">${item[1]}</text>
  <text x="${x + 16}" y="${y + 148}" font-family="${MONO}" font-size="12" letter-spacing="1.4" fill="${C.muted}">${item[2].toUpperCase()}</text>
</g>`;
    })
    .join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
<rect width="1200" height="600" fill="${C.ink}"/>
<text x="72" y="82" font-family="${MONO}" font-size="13" letter-spacing="3.4" fill="${C.primary}">BRAND PALETTE</text>
<text x="70" y="124" font-family="${SANS}" font-size="30" font-weight="600" letter-spacing="-.8" fill="${C.text}">Krish Lalani — colour system</text>
${cells}
</svg>`;
}

/* ------------------------------------------------------- write + rasterise */
const assets = [
  ["LinkedIn_Banner", banner(), 1584, 396],
  ["LinkedIn_Banner_Light", banner({ light: true }), 1584, 396],
  [
    "LinkedIn_Featured_Portfolio",
    featured({
      eyebrow: "PORTFOLIO",
      title: "Backend systems.",
      italic: "Computer vision.",
      body: ["REST APIs, detection models, and image-processing pipelines."],
      meta: "PYTHON · NODE.JS · YOLO · OPENCV",
    }),
    1200,
    627,
  ],
  [
    "LinkedIn_Featured_PondGuard",
    featured({
      eyebrow: "PROJECT · COMPUTER VISION",
      title: "PondGuard",
      body: [
        "Camera-based bird detection",
        "that triggers automated deterrents.",
      ],
      meta: "PYTHON · FLASK · YOLO11 · RASPBERRY PI",
      motif: detectorMotif,
    }),
    1200,
    627,
  ],
  [
    "LinkedIn_Featured_Placestar",
    featured({
      eyebrow: "PROJECT · BACKEND LEADERSHIP",
      title: "Placestar",
      body: [
        "Placement and examination APIs",
        "for a live university rollout.",
      ],
      meta: "NODE.JS · EXPRESS · MYSQL · JWT",
      motif: apiMotif,
    }),
    1200,
    627,
  ],
  ["Brand_Palette", palette(), 1200, 600],
];

for (const [name, svg] of assets) {
  writeFileSync(new URL(`${name}.svg`, OUT), svg + "\n");
}
console.log(`Wrote ${assets.length} SVG assets.`);

/* Rasterise through headless Chrome so the real webfonts are applied. */
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const child = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--hide-scrollbars",
    `--user-data-dir=${process.env.TMPDIR ?? "/tmp"}/kl-brand-profile`,
    "about:blank",
  ],
  { stdio: "ignore", detached: true },
);

async function connect() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const info = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (info.ok) return;
    } catch {
      /* Chrome is still starting. */
    }
    await sleep(250);
  }
  throw new Error("Headless Chrome did not start");
}
await connect();

const target = await (
  await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, {
    method: "PUT",
  })
).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message.result);
    pending.delete(message.id);
  }
});
await new Promise((resolve) => ws.addEventListener("open", resolve));
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const next = ++id;
    pending.set(next, resolve);
    ws.send(JSON.stringify({ id: next, method, params }));
  });

await send("Page.enable");
for (const [name, svg, width, height] of assets) {
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=block">
<style>html,body{margin:0;padding:0;background:transparent}svg{display:block}</style></head>
<body>${svg}</body></html>`;
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send("Page.navigate", {
    url: "data:text/html;charset=utf-8," + encodeURIComponent(html),
  });
  await sleep(1400); // let the webfonts load and lay out
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 0, width, height, scale: 1 },
    captureBeyondViewport: true,
  });
  writeFileSync(new URL(`${name}.png`, OUT), Buffer.from(shot.data, "base64"));
  console.log(`  ${name}.png  ${width}x${height} @2x`);
}
ws.close();
try {
  process.kill(-child.pid);
} catch {
  /* Chrome already exited. */
}
console.log("Brand kit built.");
process.exit(0);
