import assert from "node:assert/strict";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnv } from "vite";

const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
for (const [name, minimum] of [
  ["@tanstack/react-start", "1.168.60"],
  ["@tanstack/start-server-core", "1.169.39"],
]) {
  const version = lock.packages[`node_modules/${name}`]?.version;
  const actual = version?.split(".").map(Number);
  const expected = minimum.split(".").map(Number);
  assert(
    actual && actual.every(Number.isInteger),
    `Missing stable ${name} version`,
  );
  const difference =
    actual.map((part, i) => part - expected[i]).find((part) => part !== 0) ?? 0;
  assert(
    difference >= 0,
    `${name}@${version} is below the security patch ${minimum}`,
  );
}

const root = resolve("dist/client");
const html = readFileSync(resolve(root, "index.html"), "utf8");
for (const content of [
  "Krish Lalani",
  'id="work"',
  'id="contact"',
  "application/ld+json",
])
  assert(html.includes(content), `Missing prerendered content: ${content}`);
for (const match of html.matchAll(
  /(?:src|href)="(\/assets\/[^"?#]+)(?:[^\"]*)"/g,
))
  assert(
    existsSync(resolve(root, `.${decodeURIComponent(match[1])}`)),
    `Missing asset: ${match[1]}`,
  );
assert(existsSync(resolve(root, "404.html")), "Missing static 404 page");

const env = loadEnv("production", process.cwd(), "VITE_");
const origin = new URL(
  process.env.VITE_SITE_URL ||
    env.VITE_SITE_URL ||
    "https://portfolio.krishlalani.dev",
).origin;
assert(/^https?:\/\//.test(origin), "VITE_SITE_URL must be an HTTP(S) origin");
const escaped = origin.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
writeFileSync(
  resolve(root, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
writeFileSync(
  resolve(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escaped}/</loc></url></urlset>\n`,
);
console.log(
  "Static build verified: patched TanStack, rendered content, assets, 404, sitemap.",
);
