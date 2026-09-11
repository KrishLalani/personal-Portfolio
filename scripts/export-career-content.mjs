import { readFileSync, writeFileSync } from "node:fs";
// Export the same reviewed facts used by the website for the document builder.
const source = readFileSync(
  new URL("../src/lib/portfolio-data.ts", import.meta.url),
  "utf8",
)
  .replace(
    /^import (\w+) from "([^"\n]+)";$/gm,
    (_, name, path) => `const ${name} = ${JSON.stringify(path)};`,
  )
  .replace(/export const /g, "const ");
const data = new Function(
  `${source}\nreturn { profile, skills, projects, experience, education, highlights, about: biography, coreSkills };`,
)();
writeFileSync(
  new URL("../content-review/career-content.json", import.meta.url),
  JSON.stringify(data, null, 2) + "\n",
);
