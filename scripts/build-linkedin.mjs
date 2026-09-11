import { readFileSync, writeFileSync } from "node:fs";
const data = JSON.parse(
  readFileSync(
    new URL("../content-review/career-content.json", import.meta.url),
    "utf8",
  ),
);
const output = [
  "# Krish Lalani — LinkedIn profile content",
  "",
  "Prepared from the reviewed website facts. This is a profile update pack; the LinkedIn account itself has not been changed.",
  "",
  "## Headline",
  "",
  "Software Developer | Python & Node.js | Backend Engineering | Computer Vision · YOLO · OpenCV",
  "",
  "## About",
  "",
  ...data.about.flatMap((paragraph) => [paragraph, ""]),
  `Open to collaboration and freelance projects. Contact: ${data.profile.email}`,
  "",
  "## Experience",
  "",
];
for (const item of data.experience)
  output.push(
    `### ${item.title} — ${item.company}`,
    "",
    `${item.year} | ${item.meta}`,
    "",
    ...item.bullets.map((bullet) => `- ${bullet}`),
    "",
  );
output.push(
  "## Skills to emphasize",
  "",
  data.coreSkills.join(", ") + ".",
  "",
  "Supporting skills: Computer Vision, Object Detection, FastAPI, Flask, Django, JavaScript, SQL, PostgreSQL, MySQL, PyTorch, Git, Docker, Linux.",
  "",
  "Associate skills with the experience and projects where you used them. IoT is not a positioning pillar.",
  "",
  "## Projects",
  "",
);
for (const project of data.projects)
  output.push(
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
output.push("## Education", "");
for (const item of data.education)
  output.push(
    `**${item.degree} — ${item.institution}**`,
    "",
    `${item.year} | ${item.detail}`,
    "",
  );
output.push(
  "## Recognition and participation",
  "",
  ...data.highlights.flatMap((item) => [
    `**${item.title}**`,
    "",
    item.issuer + (item.year === "2025" ? " | 2025" : ""),
    "",
  ]),
);
output.push(
  "## Featured section — proposed order",
  "",
  "1. Portfolio: Krish Lalani — Backend Engineering & Computer Vision. Use https://portfolio.krishlalani.dev after the updated site is deployed.",
  "2. PondGuard: project overview, a real demonstration if available, and your software contribution.",
  "3. Placestar: backend leadership, access controls, and the 100+ student live examination.",
  "",
  "Use real public links or media you are permitted to share. No demo URLs have been invented.",
  "",
  "## Banner",
  "",
  "Use LinkedIn_Banner.png from this folder. It matches the website and uses the approved headline.",
  "",
  "## Apply to your existing account",
  "",
  data.profile.linkedin,
  "",
  "Update the introduction headline, About, experience, skills, education, and Featured items with the text above. Review profile-change notification preferences if you want to control whether your network is notified.",
  "",
  "[LinkedIn introduction editing](https://www.linkedin.com/help/linkedin/answer/a547248) · [LinkedIn Featured content](https://www.linkedin.com/help/linkedin/answer/a1584657) · [LinkedIn banner specifications](https://www.linkedin.com/help/lms/answer/a549049)",
  "",
);
writeFileSync(
  new URL("../career/LinkedIn_Profile.md", import.meta.url),
  output.join("\n"),
);
console.log("LinkedIn content synchronized with website facts.");
