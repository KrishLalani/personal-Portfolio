import resumeUrl from "@/assets/Krish_Lalani_Resume.pdf?url";
import pondGuardImage from "@/assets/project-1.jpg";
import placestarImage from "@/assets/project-2.jpg";
import shopifyImage from "@/assets/project-3.jpg";
import additionalProjectImage from "@/assets/project-4.jpg";
import microbleLogo from "@/assets/Microble_light.svg";
import empireLogo from "@/assets/Empire_Circuit.png";
import infotactLogo from "@/assets/Infotact_solution.png";
import charusatLogo from "@/assets/CHARUSAT_NEW.6cad095d.png";

// ─────────────────────────────────────────────────────────────────────────────
// Portfolio content for Krish Lalani.
//
// NOTE: Project descriptions below are professional DRAFTS written from each
// project's name (LinkedIn can't be auto-imported). Edit the `description`,
// `stack`, `demo`, and `repo` fields with your real details — everything here
// flows into the UI automatically.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Krish Lalani",
  role: "Software Developer",
  tagline:
    "I design and build end-to-end systems — from backend and computer vision to connected products. Open to collaborate and freelance.",
  email: "Krish7lalani@gmail.com",
  github: "https://github.com/KrishLalani",
  linkedin: "https://www.linkedin.com/in/krish-lalani-bb4385252/",
  resume: resumeUrl,
  location: "Gujarat, India",
  availability: "Open to collaborate & freelance",
};

// Honest, defensible numbers — confirm/adjust to taste.
export const stats = [
  { label: "Projects featured", value: 6, suffix: "" },
  { label: "Core technologies", value: 30, suffix: "+" },
  { label: "Years coding", value: 3, suffix: "+" },
  { label: "Disciplines", value: 2, suffix: "" },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: [
      "Django",
      "FastAPI",
      "Flask",
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
    ],
  },
  {
    category: "Computer Vision & AI",
    items: ["YOLO", "OpenCV", "PyTorch"],
  },
  {
    category: "Edge & IoT",
    items: ["Raspberry Pi", "ESP32", "MQTT"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase", "SQLite"],
  },
  {
    category: "DevOps",
    items: ["Git", "Azure DevOps", "Docker", "Linux", "CI/CD", "Postman"],
  },
  {
    category: "Monitoring",
    items: ["Grafana", "ThingsBoard IoT"],
  },
  {
    category: "Web & Data",
    items: ["Selenium", "EJS"],
  },
];

// Each project: title, category, description (DRAFT), stack, accent gradient,
// optional demo + repo links (omit or leave "" to hide the button).
export const projects = [
  {
    title: "PondGuard",
    category: "Smart surveillance · Pond protection",
    description:
      "A camera system that uses a YOLO11 model to detect target birds around ponds, then auto-captures the event and triggers sprinklers and a red-beam deterrent.",
    role: "Owned the full software side (a teammate handled hardware).",
    result: "~75% detection confidence on real birds.",
    stack: [
      "Python",
      "Flask",
      "SQLite",
      "YOLO11",
      "Google Colab",
      "Raspberry Pi",
      "Pi Camera",
    ],
    image: pondGuardImage,
    imageAlt: "Temporary preview image for the PondGuard monitoring system",
    accent: "from-[oklch(0.72_0.18_160)] to-[oklch(0.7_0.18_220)]",
    demo: "",
    repo: "",
  },
  {
    title: "Placestar",
    category: "University placement & exam platform",
    description:
      "A secure placement and examination platform for CHARUSAT University, with Wi-Fi–restricted access and single-session controls to prevent remote cheating.",
    role: "Led the backend team; built the architecture and APIs from scratch.",
    result: "Ran reliably for a live test with 100+ students.",
    image: placestarImage,
    imageAlt: "Temporary preview image for the Placestar university platform",
    stack: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MySQL",
      "REST APIs",
      "Backend leadership",
    ],
    accent: "from-[oklch(0.75_0.15_230)] to-[oklch(0.68_0.18_245)]",
    demo: "",
    repo: "",
  },
  {
    title: "Droplify",
    category: "E-commerce analytics & price tracking",
    description:
      "A price-tracking app that scrapes Flipkart, Amazon, Meesho, and Myntra, turns the data into analytics, and emails alerts when prices drop.",
    role: "Solo-built the full app — backend, scraping, analytics, and alerts.",
    result: "Validated across 25+ real product pages.",
    image: shopifyImage,
    imageAlt: "Temporary preview image for the Droplify price-tracking platform",
    stack: [
      "Python",
      "Flask",
      "SQLite",
      "Beautiful Soup",
      "Selenium",
      "Web scraping",
      "Data analytics",
      "Email alerts",
    ],
    accent: "from-[oklch(0.68_0.18_245)] to-[oklch(0.7_0.18_280)]",
    demo: "",
    repo: "",
  },
  {
    title: "AMC Connect",
    category: "Indus Hackathon · Civic complaints",
    description:
      "A civic complaint platform that validates GPS and uses computer vision to verify complaint images before submission, with live status tracking for citizens and officials.",
    role: "Built the backend, screening model, and LLM auto-descriptions.",
    result: "",
    image: additionalProjectImage,
    imageAlt: "Temporary preview image for the AMC Connect civic platform",
    stack: [
      "Python",
      "FastAPI",
      "Supabase",
      "PyTorch",
      "YOLO",
      "LLM integration",
      "Computer vision",
      "GPS validation",
    ],
    accent: "from-[oklch(0.68_0.18_245)] to-[oklch(0.7_0.18_280)]",
    demo: "",
    repo: "",
  },
  {
    title: "ClubSphere",
    category: "Multi-club management",
    description:
      "A platform to run multiple clubs from one system — memberships, roles, events, attendance, and approval workflows.",
    role: "Led backend — architecture, database, APIs, and auth.",
    result: "Piloted with clubs at CHARUSAT University.",
    image: additionalProjectImage,
    imageAlt: "Temporary preview image for the ClubSphere management platform",
    stack: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST APIs",
      "JWT authentication",
      "Backend leadership",
    ],
    accent: "from-[oklch(0.68_0.2_300)] to-[oklch(0.62_0.2_340)]",
    demo: "",
    repo: "",
  },
  {
    title: "Worker Location Management",
    category: "Geofenced workforce monitoring",
    description:
      "A ThingsBoard workforce-tracking system using nRF tags and geofencing to monitor zones and inactivity, with dashboard, email, and on-device alerts.",
    role: "Owned the ThingsBoard software, geofencing, and alert logic.",
    result: "Validated monitoring rules using RSSI signal data.",
    image: additionalProjectImage,
    imageAlt: "Temporary preview image for the Worker Location Management system",
    stack: [
      "ThingsBoard",
      "nRF tracking tags",
      "Geofencing",
      "Location monitoring",
      "Rule engine",
      "Email alerts",
      "On-device alerts",
    ],
    accent: "from-[oklch(0.65_0.18_220)] to-[oklch(0.7_0.18_260)]",
    demo: "",
    repo: "",
  },
];

export const experience = [
  {
    year: "Apr 2026 — Present",
    title: "Software Developer",
    company: "Microble Technologies",
    meta: "Hybrid",
    mark: "MT",
    logo: microbleLogo,
    description:
      "Building machine-vision systems for industrial inspection — including insulator defect inspection with YOLO detection models and classical image-processing pipelines (OpenCV). Owning dataset collection, annotation, and augmentation, plus training, evaluation, and deployment of vision models into production workflows.",
  },
  {
    year: "Sep 2025 — Apr 2026",
    title: "Python Developer",
    company: "Empire Circuits LLC",
    meta: "New Jersey, USA · Remote",
    mark: "EC",
    logo: empireLogo,
    description:
      "Built computer-vision and IoT systems including PondGuard, an OpenCV image-stitching QA pipeline for PCB inspection, and real-time ThingsBoard and Grafana dashboards backed by MQTT.",
  },
  {
    year: "Apr 2025 — Jul 2025",
    title: "Python Developer",
    company: "Infotact Solution",
    meta: "Bengaluru, Karnataka",
    mark: "IS",
    logo: infotactLogo,
    description:
      "Built Droplify, an e-commerce price tracker using FastAPI, async scraping, product-data integrations, analytics dashboards, and an automated price-drop alert engine.",
  },
  {
    year: "Jun 2024 — Aug 2024",
    title: "Backend Developer & Team Lead",
    company: "CHARUSAT University",
    meta: "In-house Internship · Anand, Gujarat",
    mark: "CU",
    logo: charusatLogo,
    description:
      "Led a four-engineer team building Placestar. Designed the Node.js and Express REST API, database schema, JWT authentication, role-based access, sprint plans, reviews, and backend optimizations.",
  },
];

export const education = [
  {
    year: "2023 — 2026",
    degree: "B.E. in Computer Engineering",
    institution: "CHARUSAT University, Anand",
    detail: "CGPA: 9.07 / 10.00",
  },
  {
    year: "2020 — 2023",
    degree: "Diploma in Computer Engineering",
    institution: "A.V. Parekh Technical Institute, Rajkot",
    detail: "CGPA: 9.89 / 10.00 · Top 10 Merit Award",
  },
];

// Honest highlights — swap in real certificate names/issuers when you have them.
export const highlights = [
  {
    title: "Indus Hackathon",
    issuer: "AMC Connect · Civic technology project",
    year: "2025",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "React · Node · PostgreSQL",
    year: "2024",
  },
  {
    title: "Generative AI Projects",
    issuer: "OpenAI · hands-on",
    year: "2025",
  },
];

// Kept as an alias so existing imports keep working.
export const certifications = highlights;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
