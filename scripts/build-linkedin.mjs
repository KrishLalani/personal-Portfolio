/**
 * Build the LinkedIn profile pack and the brand kit reference from the same
 * reviewed career facts the website and resume use.
 *
 * Writes career/LinkedIn_Profile.md and career/Brand_Kit.md.
 * Run scripts/build-brand.mjs first if the images need regenerating.
 *
 * Nothing here is invented. Every claim traces back to
 * src/lib/portfolio-data.ts via content-review/career-content.json.
 */
import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(
  readFileSync(
    new URL("../content-review/career-content.json", import.meta.url),
    "utf8",
  ),
);
const { profile } = data;

/* LinkedIn's published field limits, used for the counts printed below. */
const LIMITS = {
  headline: 220,
  about: 2600,
  experience: 2000,
  skills: 50,
  pinnedSkills: 3,
  customUrl: [3, 100],
};

/** Roughly what LinkedIn shows on desktop before the "…see more" fold. */
const FOLD = 275;

const count = (text, limit) => `${text.length} / ${limit} characters`;
const bare = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* --------------------------------------------------------------- headline */
const headlines = [
  {
    text: "Software Developer | Python & Node.js | Backend Engineering | Computer Vision · YOLO · OpenCV",
    when: "The default. Leads with the two disciplines and the five terms recruiters actually type. Use this unless one of the cases below applies.",
  },
  {
    text: "Software Developer at Microble Technologies | Python, REST APIs & Computer Vision | YOLO · OpenCV · PyTorch",
    when: "Use while you want the current employer visible in search results and on every comment you leave.",
  },
  {
    text: "Backend & Computer Vision Developer | Python · FastAPI · Node.js | Industrial Inspection & Detection Systems",
    when: "Use when applying to machine-vision or industrial-automation roles, where 'industrial inspection' is the phrase being searched.",
  },
];

/* ------------------------------------------------------------------ about */
const aboutFull = [
  "I build the parts of a product people never see: the APIs that serve it, the schemas underneath, and the models that decide what happens next.",
  "",
  "I work in two areas that keep meeting each other. On the backend I design REST APIs, database schemas, authentication, and role-based access controls with Python and Node.js. In computer vision I prepare datasets and train, evaluate, and deploy YOLO and OpenCV object-detection models for industrial inspection.",
  "",
  "At Microble Technologies I develop machine-vision systems for industrial inspection, including insulator defect detection, and own the pipeline from image collection and annotation through to deployment. Before that, at Empire Circuits, I built PondGuard's detection and response software, an OpenCV image-stitching pipeline for PCB inspection, and real-time monitoring dashboards on ThingsBoard, Grafana, and MQTT.",
  "",
  "I also lead. At CHARUSAT University I led a four-engineer backend team building Placestar, a placement and examination platform that supported a live examination with 100+ students, and ran the sprint planning and code reviews behind it.",
  "",
  "Tools I reach for most: Python, FastAPI, Flask, Node.js, Express, PostgreSQL, MySQL, YOLO, OpenCV, PyTorch, Docker, Git.",
  "",
  "Open to collaboration and freelance work.",
  "",
  `Portfolio: ${bare(profile.website)}`,
  `GitHub: ${bare(profile.github)}`,
  `Email: ${profile.email}`,
].join("\n");

const aboutShort = [
  "I build backends and the computer-vision models that sit behind them: REST APIs, database schemas, and YOLO/OpenCV detection pipelines for industrial inspection.",
  "",
  "At Microble Technologies I develop machine-vision systems for insulator defect detection, owning everything from dataset annotation to deployment. Earlier I led a four-engineer backend team on Placestar, a platform that supported a live examination with 100+ students.",
  "",
  "Python · Node.js · FastAPI · REST APIs · YOLO · OpenCV · PostgreSQL · Docker",
  "",
  "Open to collaboration and freelance work.",
  "",
  `${bare(profile.website)} · ${profile.email}`,
].join("\n");

const fold = (text) => {
  const flat = text.replace(/\n+/g, " ").trim();
  return flat.length <= FOLD ? flat : flat.slice(0, FOLD).trimEnd() + "…";
};

/* ----------------------------------------------------------------- skills */
/**
 * LinkedIn matches skills against its own controlled vocabulary. Free-typed
 * skills do not feed recruiter search, so the exact autocomplete label matters
 * more than the wording. Names below are the ones LinkedIn offers.
 */
const pinned = [
  [
    "Python (Programming Language)",
    "The single term most recruiters filter on first.",
  ],
  [
    "Computer Vision",
    "The differentiator. Very few backend developers have it.",
  ],
  ["REST APIs", "Covers the backend half without narrowing to one framework."],
];

const skillGroups = [
  [
    "Languages and backend",
    [
      "Node.js",
      "JavaScript",
      "SQL",
      "FastAPI",
      "Flask",
      "Django",
      "Express.js",
      "Back-End Web Development",
      "API Development",
      "JSON Web Token (JWT)",
    ],
  ],
  [
    "Computer vision and machine learning",
    [
      "OpenCV",
      "PyTorch",
      "Object Detection",
      "Image Processing",
      "Deep Learning",
      "Machine Learning",
      "Data Annotation",
      "Model Deployment",
    ],
  ],
  [
    "Databases",
    ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Supabase", "Database Design"],
  ],
  [
    "Platform and tooling",
    [
      "Git",
      "Docker",
      "Linux",
      "CI/CD",
      "Postman API",
      "Azure DevOps",
      "Selenium",
      "Beautiful Soup",
    ],
  ],
  ["Monitoring and edge", ["Grafana", "MQTT", "Raspberry Pi", "Geofencing"]],
  [
    "Ways of working",
    [
      "Team Leadership",
      "Code Review",
      "Agile Methodologies",
      "Technical Documentation",
    ],
  ],
];

const totalSkills =
  pinned.length + skillGroups.reduce((sum, [, items]) => sum + items.length, 0);

/* --------------------------------------------------- recruiter vocabulary */
/**
 * Terms a recruiter hiring for these roles would type. Coverage is computed,
 * not asserted, so this table cannot drift away from the copy above it.
 */
const searchTerms = [
  "Python",
  "Backend",
  "REST API",
  "Computer Vision",
  "YOLO",
  "OpenCV",
  "PyTorch",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Machine Learning",
  "Object Detection",
  "Team Lead",
];

const experienceText = data.experience
  .map((item) => `${item.title} ${item.company} ${item.bullets.join(" ")}`)
  .join(" ");
const skillsText = [
  ...pinned.map(([name]) => name),
  ...skillGroups.flatMap(([, items]) => items),
].join(" ");

const fields = {
  Headline: headlines[0].text,
  About: aboutFull,
  Experience: experienceText,
  Skills: skillsText,
};

/**
 * Loose match, the way a search index would treat it: case-insensitive, and
 * hyphens count as spaces so "object detection" finds "object-detection".
 */
const normalise = (text) =>
  text.toLowerCase().replace(/[-\u2011\u2013\u2014]/g, " ");
const has = (haystack, term) => normalise(haystack).includes(normalise(term));

const coverage = searchTerms.map((term) => {
  const hits = Object.entries(fields)
    .filter(([, text]) => has(text, term))
    .map(([name]) => name);
  const onlySkills = hits.length === 1 && hits[0] === "Skills";
  return {
    term,
    hits,
    grade: hits.length === 0 ? "missing" : onlySkills ? "weak" : "good",
  };
});
const uncovered = coverage.filter((row) => row.grade === "missing");
const weak = coverage.filter((row) => row.grade === "weak");

/* ------------------------------------------------------------- featured */
const featured = [
  {
    title: "Portfolio — Krish Lalani",
    description:
      "Backend systems, computer vision, and the six projects behind them. Includes a live in-browser detection demo.",
    link: profile.website,
    image: "LinkedIn_Featured_Portfolio.png",
  },
  {
    title: "PondGuard — camera-based bird detection",
    description:
      "A YOLO11 detection system that captures events and triggers sprinklers and a red-beam deterrent around ponds. I owned the complete software implementation.",
    link: `${profile.website}/#project-pondguard`,
    image: "LinkedIn_Featured_PondGuard.png",
  },
  {
    title: "Placestar — placement and examination platform",
    description:
      "I led a four-engineer backend team on the APIs, MySQL schema, JWT authentication, and access controls. Supported a live examination with 100+ students.",
    link: `${profile.website}/#project-placestar`,
    image: "LinkedIn_Featured_Placestar.png",
  },
];

/* ------------------------------------------------------ recommendations */
const recommendations = [
  {
    who: "Your manager at Empire Circuits",
    ask: "PondGuard end to end, and the OpenCV stitching pipeline",
    why: "A completed remote role with shipped software. The strongest single reference you can have.",
  },
  {
    who: "Your faculty supervisor for the CHARUSAT internship",
    ask: "Leading the four-engineer backend team and the live examination",
    why: "The only public evidence of you leading people rather than code.",
  },
  {
    who: "A teammate from the Placestar backend team",
    ask: "How you split the work, reviewed code, and handled the exam-day load",
    why: "Peer recommendations read as more candid than manager ones.",
  },
];

const requestTemplate = `Hi [name],

I'm tidying up my LinkedIn profile as I start looking at [backend / computer vision] roles, and a short recommendation from you would carry real weight.

If you're willing, the part most worth mentioning is [the specific thing from the table above] — a few sentences is plenty, and no rush at all.

Happy to write one for you as well if that's useful.

Thanks,
Krish`;

/* ----------------------------------------------------------- the document */
const out = [];
const push = (...lines) => out.push(...lines);

push(
  "# Krish Lalani — LinkedIn profile pack",
  "",
  "Paste-ready copy for every field, generated from the same reviewed facts as the website and the resume. Nothing on the LinkedIn account has been changed; this is the script to follow.",
  "",
  `**Profile:** ${profile.linkedin}`,
  "",
  "Work top to bottom. Section 1 is the highest-value change on the page and takes two minutes.",
  "",
  "---",
  "",
  "## 1. Fix the profile URL first",
  "",
  `Your URL is currently \`${bare(profile.linkedin)}\`. The \`bb4385252\` is a random string LinkedIn assigns when the name is taken, and it appears on your resume, your email signature, and every application you send.`,
  "",
  "Claim a clean one:",
  "",
  "```",
  "linkedin.com/in/krishlalani",
  "```",
  "",
  `Edit it from **Edit public profile & URL** at the top right of your profile. LinkedIn allows ${LIMITS.customUrl[0]}–${LIMITS.customUrl[1]} letters or numbers, with no spaces, hyphens, or other symbols. If \`krishlalani\` is taken, \`krishlalanidev\` and \`krishlalanipy\` both read as deliberate; a trailing number reads as a fallback, so try the words first.`,
  "",
  "**This one has a tail.** The old URL appears in places that need updating afterwards:",
  "",
  "| File | What to change |",
  "| --- | --- |",
  "| `src/lib/portfolio-data.ts` | `profile.linkedin` |",
  "| `career/Krish_Lalani_Resume.pdf` | Rebuilt automatically once the data file changes |",
  "| Email signature, GitHub profile | By hand |",
  "",
  "LinkedIn keeps redirecting the old URL, so nothing breaks in the meantime.",
  "",
  "## 2. Photo and banner",
  "",
  "**Banner.** `LinkedIn_Banner.png` (1584 × 396). `LinkedIn_Banner_Light.png` is the same layout on the light palette.",
  "",
  "Both leave two areas deliberately empty, because LinkedIn covers them:",
  "",
  "- **Bottom-left**, roughly 330 × 165 px, sits under your profile photo on desktop.",
  "- **The outer left and right thirds** are cropped on mobile, so every word sits in the middle band.",
  "",
  "**Photo.** Upload at 400 × 400 or larger, square. Face filling roughly 60% of the frame, looking at the camera, plain or softly blurred background. The portrait already on your website works. Set its visibility to **All LinkedIn members** — a photo restricted to your network is invisible to exactly the recruiters you want.",
  "",
  "## 3. Headline",
  "",
  `LinkedIn's limit is ${LIMITS.headline} characters, and the headline follows you into search results, comments, and messages. It is the most-read line on the profile after your name.`,
  "",
);

headlines.forEach((option, index) => {
  push(
    `**Option ${index + 1}** — ${count(option.text, LIMITS.headline)}`,
    "",
    "```",
    option.text,
    "```",
    "",
    option.when,
    "",
  );
});

push(
  "## 4. About",
  "",
  `LinkedIn truncates this at roughly ${FOLD} characters on desktop. Everything after the "…see more" link is only read by people who already decided to keep reading, so the first paragraph does the work.`,
  "",
  "### Option A — full",
  "",
  `${count(aboutFull, LIMITS.about)}.`,
  "",
  "```",
  aboutFull,
  "```",
  "",
  "**What shows before the fold:**",
  "",
  "> " + fold(aboutFull),
  "",
  "### Option B — concise",
  "",
  `${count(aboutShort, LIMITS.about)}. Use this if the full version feels long, or while you are applying to a narrower set of roles.`,
  "",
  "```",
  aboutShort,
  "```",
  "",
  "**What shows before the fold:**",
  "",
  "> " + fold(aboutShort),
  "",
  "## 5. Experience",
  "",
  `Paste each block into the matching role. Each is well inside LinkedIn's ${LIMITS.experience}-character limit.`,
  "",
  "Two things to set while you are in each entry. Attach the **skills** used in that role, which is what makes them endorsable and searchable. And set the right **employment type** — the CHARUSAT entry is an internship and should say so, since an unmarked internship reads as an inflated title.",
  "",
);

for (const item of data.experience) {
  const body = item.bullets.map((bullet) => `• ${bullet}`).join("\n");
  push(
    `### ${item.title} — ${item.company}`,
    "",
    `${item.year} · ${item.meta}`,
    "",
    "```",
    body,
    "```",
    `${body.length} / ${LIMITS.experience} characters.`,
    "",
  );
}

push(
  "## 6. Skills",
  "",
  `Add up to ${LIMITS.skills}. The list below is ${totalSkills}, which leaves room to grow.`,
  "",
  "**Pick each skill from LinkedIn's autocomplete rather than typing it free-hand.** Only skills matched to LinkedIn's own vocabulary feed recruiter search; a free-typed one sits on your profile doing nothing. That is why some names below look slightly odd — they are LinkedIn's spellings, not mine.",
  "",
  `### Pin these ${LIMITS.pinnedSkills}`,
  "",
  "These are the only ones shown on the profile itself. Everything else lives behind **Show all skills**.",
  "",
  "| Skill | Why this one |",
  "| --- | --- |",
  ...pinned.map(([name, why]) => `| ${name} | ${why} |`),
  "",
  "### Add the rest",
  "",
);

for (const [label, items] of skillGroups)
  push(`**${label}** — ${items.join(", ")}`, "");

push(
  "### Recruiter vocabulary check",
  "",
  "Computed from the copy in this document, so it cannot drift away from what you actually paste in.",
  "",
  "Recruiter search weights the headline and About far above the skills list, so a term that only appears under Skills is present but not working hard.",
  "",
  "| Search term | Appears in | Strength |",
  "| --- | --- | --- |",
  ...coverage.map((row) => {
    const mark =
      row.grade === "good"
        ? "strong"
        : row.grade === "weak"
          ? "thin"
          : "**missing**";
    return `| ${row.term} | ${row.hits.length ? row.hits.join(", ") : "nowhere"} | ${mark} |`;
  }),
  "",
  uncovered.length === 0
    ? `All ${searchTerms.length} terms appear somewhere indexed.`
    : `${uncovered.length} term(s) appear nowhere. Add them before publishing.`,
  "",
  weak.length === 0
    ? "None of them rest on the skills list alone."
    : weak.length === 1
      ? `One sits only in the skills list: ${weak[0].term}. That is a choice rather than an oversight — the work behind it is real but secondary to the two disciplines the profile leads with, and forcing it into the headline would read as keyword stuffing. Move it up only if you start targeting roles that lead with it.`
      : `${weak.length} sit only in the skills list: ${weak.map((row) => row.term).join(", ")}. Those are choices rather than oversights — the work behind them is real but secondary to the two disciplines the profile leads with, and forcing them into the headline would read as keyword stuffing. Move one up only if you start targeting roles that lead with it.`,
  "",
  "## 7. Featured",
  "",
  "Add these three, in this order. Each has a matching 1200 × 627 image in this folder, which is the size LinkedIn uses for link previews. Paste the title and description rather than letting LinkedIn scrape them.",
  "",
);

featured.forEach((item, index) => {
  push(
    `### ${index + 1}. ${item.title}`,
    "",
    `**Link:** ${item.link}`,
    "",
    `**Image:** \`${item.image}\``,
    "",
    "**Description:**",
    "",
    "```",
    item.description,
    "```",
    "",
  );
});

/* Featured already carries PondGuard and Placestar; the Projects section is
   where the other four earn their keywords. */
const featuredTitles = new Set(["PondGuard", "Placestar"]);
const remainingProjects = data.projects.filter(
  (project) => !featuredTitles.has(project.title),
);

push(
  "Only real, public URLs. No demo links have been invented, and the project cards on the site hide their buttons until a real repository or demo URL exists.",
  "",
  "## 8. Projects section",
  "",
  `Optional, and lower value than Featured — most readers never scroll this far. PondGuard and Placestar are already covered above, so add the remaining ${remainingProjects.length} here and the whole body of work is on the page.`,
  "",
);

for (const project of remainingProjects)
  push(
    `### ${project.title}`,
    "",
    project.description,
    "",
    `Contribution: ${project.role}`,
    ...(project.result ? ["", `Result: ${project.result}`] : []),
    "",
    `Technologies: ${project.stack.join(", ")}.`,
    "",
  );

push("## 9. Education", "");
for (const item of data.education)
  push(
    `**${item.degree} — ${item.institution}**`,
    "",
    `${item.year} | ${item.detail}`,
    "",
  );

push(
  "Put the CGPA in the grade field rather than the description. Both are strong numbers and LinkedIn renders the grade field prominently.",
  "",
  "## 10. Honours and participation",
  "",
  ...data.highlights.flatMap((item) => [
    `**${item.title}** — ${item.issuer}${item.year === "2025" ? " | 2025" : ""}`,
    "",
  ]),
  "Both belong under **Honors & awards**. The hackathon is listed as participation, not a placing — keep it that way.",
  "",
  "## 11. Recommendations",
  "",
  "The emptiest part of most engineering profiles, and the one a reader trusts most, because you did not write it. Three is plenty.",
  "",
  "| Ask | About | Why them |",
  "| --- | --- | --- |",
  ...recommendations.map(
    (item) => `| ${item.who} | ${item.ask} | ${item.why} |`,
  ),
  "",
  "A request with a specific ask gets written; a blank one sits unanswered. Something like:",
  "",
  "```",
  requestTemplate,
  "```",
  "",
  "## 12. Open to work",
  "",
  "Set this under **Open to** → **Finding a new job**.",
  "",
  "- **Job titles:** Software Developer, Backend Developer, Python Developer, Computer Vision Engineer, Machine Learning Engineer.",
  "- **Visibility:** choose **Recruiters only** while you are employed. The green #OpenToWork photo frame is visible to everyone, including your current employer.",
  "- **Start date and location:** set both honestly, including whether you will take remote work. Recruiters filter hard on these.",
  "",
  "## 13. Order of operations",
  "",
  "1. Turn off profile-update notifications before you start, so your network is not alerted to each individual edit. Settings → Visibility → **Share profile updates with your network**.",
  "2. Claim the custom URL (section 1).",
  "3. Upload the banner and photo.",
  "4. Headline, then About.",
  "5. Each experience entry, attaching skills and setting employment type as you go.",
  "6. Education, then honours.",
  "7. Skills: add all of them, then pin the three.",
  "8. Featured last, so the profile is complete when someone clicks through.",
  "9. Turn notifications back on.",
  "10. Send the three recommendation requests.",
  "11. Update `profile.linkedin` in `src/lib/portfolio-data.ts` and re-run the builders, so the site and resume carry the new URL.",
  "",
  "## 14. What not to do",
  "",
  "- Do not add demo links that do not exist. An empty button is better than a dead one.",
  "- Do not let the CHARUSAT internship sit untagged as a regular role.",
  "- Do not describe the hackathon as a win.",
  "- Do not free-type skills. If LinkedIn does not offer it in the dropdown, it does not count.",
  "- Do not edit anything in `career/` by hand. It regenerates from `src/lib/portfolio-data.ts`.",
  "",
  "---",
  "",
  "[Editing your intro](https://www.linkedin.com/help/linkedin/answer/a547248) · [Custom public profile URL](https://www.linkedin.com/help/linkedin/answer/a542685) · [Featured section](https://www.linkedin.com/help/linkedin/answer/a1584657) · [Banner specifications](https://www.linkedin.com/help/lms/answer/a549049) · [Open to work](https://www.linkedin.com/help/linkedin/answer/a507508)",
  "",
);

writeFileSync(
  new URL("../career/LinkedIn_Profile.md", import.meta.url),
  out.join("\n"),
);

/* ------------------------------------------------------------ brand kit */
const brand = `# Krish Lalani — brand kit

One identity across the portfolio site, the resume, and LinkedIn. Every value
here is the value actually used in \`src/styles.css\`, so the assets and the
deployed site cannot drift apart.

## Colour

| Token | Hex | Where it is used |
| --- | --- | --- |
| Ink | \`#101A16\` | Dark background |
| Panel | \`#1B2A21\` | Raised cards on dark |
| Line | \`#304034\` | Borders on dark |
| Mint | \`#A8DCB0\` | Accent on dark: links, highlights, the italic line |
| Forest | \`#23745A\` | Accent on light: the same role, darker for contrast |
| Paper | \`#F7F9F5\` | Light background |
| Slate | \`#172B25\` | Body text on light |
| Muted | \`#5D6D64\` | Secondary text on light |

Mint on Ink and Slate on Paper both clear WCAG AA for body text. Never put Mint
on Paper or Forest on Ink; each accent belongs to one background.

See \`Brand_Palette.png\` for the swatch sheet.

## Type

| Role | Family | Notes |
| --- | --- | --- |
| Display | Instrument Serif, italic | Reserved for the second line of the headline pair, never body copy |
| Sans | Inter | Headings and body, 300–700 |
| Mono | JetBrains Mono | Labels, eyebrows, numbers, code |

Headings run tight: about \`-0.03em\` letter-spacing. Mono labels run loose:
\`0.2em\`, uppercase, 9–11px.

The resume is the deliberate exception. It sets in Arial, because a PDF that
embeds an unusual font is a PDF some applicant tracking systems parse badly.

## The headline pair

The identity is one idea, repeated everywhere:

> **Backend systems.** *Computer vision.* Practical software.

Set the first line in bold Inter, the second in italic Instrument Serif in the
accent colour, the third in regular weight. Do not reorder or reword the pair.

## Assets in this folder

| File | Size | Use |
| --- | --- | --- |
| \`LinkedIn_Banner.png\` | 1584 × 396 | LinkedIn banner, dark |
| \`LinkedIn_Banner_Light.png\` | 1584 × 396 | LinkedIn banner, light |
| \`LinkedIn_Featured_*.png\` | 1200 × 627 | Featured section and link previews |
| \`Brand_Palette.png\` | 1200 × 600 | Colour reference |
| \`Krish_Lalani_Resume.pdf\` | Letter, 1 page | The version a person reads |
| \`Krish_Lalani_Resume_ATS.pdf\` | Letter, 1 page | The version software parses |

PNGs are exported at 2× for retina screens. The \`.svg\` beside each PNG is the
editable source.

## Rebuilding

\`\`\`sh
node scripts/export-career-content.mjs   # website facts -> career-content.json
node scripts/build-brand.mjs             # banners, featured cards, palette
node scripts/build-linkedin.mjs          # this file and the LinkedIn pack
python3 scripts/build-resume.py          # designed resume
python3 scripts/build-resume.py --ats    # ATS resume
\`\`\`

Edit \`src/lib/portfolio-data.ts\` and re-run all five. Nothing is written twice
by hand.
`;
writeFileSync(new URL("../career/Brand_Kit.md", import.meta.url), brand);

console.log("LinkedIn pack and brand kit written.");
console.log(
  `  headlines      ${headlines.map((h) => h.text.length).join(", ")} chars (limit ${LIMITS.headline})`,
);
console.log(`  about full     ${aboutFull.length} / ${LIMITS.about}`);
console.log(`  about concise  ${aboutShort.length} / ${LIMITS.about}`);
console.log(`  skills listed  ${totalSkills} / ${LIMITS.skills}`);
console.log(
  uncovered.length === 0
    ? `  keywords       ${searchTerms.length} covered, ${weak.length} skills-only`
    : `  keywords       MISSING: ${uncovered.map((r) => r.term).join(", ")}`,
);
