# Krish Lalani — LinkedIn profile pack

Paste-ready copy for every field, generated from the same reviewed facts as the website and the resume. Nothing on the LinkedIn account has been changed; this is the script to follow.

**Profile:** https://www.linkedin.com/in/krish-lalani-bb4385252/

Work top to bottom. Section 1 is the highest-value change on the page and takes two minutes.

---

## 1. Fix the profile URL first

Your URL is currently `www.linkedin.com/in/krish-lalani-bb4385252`. The `bb4385252` is a random string LinkedIn assigns when the name is taken, and it appears on your resume, your email signature, and every application you send.

Claim a clean one:

```
linkedin.com/in/krishlalani
```

Edit it from **Edit public profile & URL** at the top right of your profile. LinkedIn allows 3–100 letters or numbers, with no spaces, hyphens, or other symbols. If `krishlalani` is taken, `krishlalanidev` and `krishlalanipy` both read as deliberate; a trailing number reads as a fallback, so try the words first.

**This one has a tail.** The old URL appears in places that need updating afterwards:

| File | What to change |
| --- | --- |
| `src/lib/portfolio-data.ts` | `profile.linkedin` |
| `career/Krish_Lalani_Resume.pdf` | Rebuilt automatically once the data file changes |
| Email signature, GitHub profile | By hand |

LinkedIn keeps redirecting the old URL, so nothing breaks in the meantime.

## 2. Photo and banner

**Banner.** `LinkedIn_Banner.png` (1584 × 396). `LinkedIn_Banner_Light.png` is the same layout on the light palette.

A simple layout with your name, role, specialties, and website. The left side stays clear of the profile photo, with the text kept near the center for smaller displays. Check LinkedIn’s crop preview before saving.

**Photo.** Upload at 400 × 400 or larger, square. Face filling roughly 60% of the frame, looking at the camera, plain or softly blurred background. The portrait already on your website works. Set its visibility to **All LinkedIn members** — a photo restricted to your network is invisible to exactly the recruiters you want.

## 3. Headline

LinkedIn's limit is 220 characters, and the headline follows you into search results, comments, and messages. It is the most-read line on the profile after your name.

**Option 1** — 93 / 220 characters

```
Software Developer | Python & Node.js | Backend Engineering | Computer Vision · YOLO · OpenCV
```

The default. Leads with the two disciplines and the five terms recruiters actually type. Use this unless one of the cases below applies.

**Option 2** — 107 / 220 characters

```
Software Developer at Microble Technologies | Python, REST APIs & Computer Vision | YOLO · OpenCV · PyTorch
```

Use while you want the current employer visible in search results and on every comment you leave.

**Option 3** — 108 / 220 characters

```
Backend & Computer Vision Developer | Python · FastAPI · Node.js | Industrial Inspection & Detection Systems
```

Use when applying to machine-vision or industrial-automation roles, where 'industrial inspection' is the phrase being searched.

## 4. About

LinkedIn truncates this at roughly 275 characters on desktop. Everything after the "…see more" link is only read by people who already decided to keep reading, so the first paragraph does the work.

### Option A — full

1375 / 2600 characters.

```
I build the parts of a product people never see: the APIs that serve it, the schemas underneath, and the models that decide what happens next.

I work in two areas that keep meeting each other. On the backend I design REST APIs, database schemas, authentication, and role-based access controls with Python and Node.js. In computer vision I prepare datasets and train, evaluate, and deploy YOLO and OpenCV object-detection models for industrial inspection.

At Microble Technologies I develop machine-vision systems for industrial inspection, including insulator defect detection, and own the pipeline from image collection and annotation through to deployment. Before that, at Empire Circuits, I built PondGuard's detection and response software, an OpenCV image-stitching pipeline for PCB inspection, and real-time monitoring dashboards on ThingsBoard, Grafana, and MQTT.

I also lead. At CHARUSAT University I led a four-engineer backend team building Placestar, a placement and examination platform that supported a live examination with 100+ students, and ran the sprint planning and code reviews behind it.

Tools I reach for most: Python, FastAPI, Flask, Node.js, Express, PostgreSQL, MySQL, YOLO, OpenCV, PyTorch, Docker, Git.

Open to collaboration and freelance work.

Portfolio: portfolio.krishlalani.dev
GitHub: github.com/KrishLalani
Email: Krish7lalani@gmail.com
```

**What shows before the fold:**

> I build the parts of a product people never see: the APIs that serve it, the schemas underneath, and the models that decide what happens next. I work in two areas that keep meeting each other. On the backend I design REST APIs, database schemas, authentication, and role-base…

### Option B — concise

604 / 2600 characters. Use this if the full version feels long, or while you are applying to a narrower set of roles.

```
I build backends and the computer-vision models that sit behind them: REST APIs, database schemas, and YOLO/OpenCV detection pipelines for industrial inspection.

At Microble Technologies I develop machine-vision systems for insulator defect detection, owning everything from dataset annotation to deployment. Earlier I led a four-engineer backend team on Placestar, a platform that supported a live examination with 100+ students.

Python · Node.js · FastAPI · REST APIs · YOLO · OpenCV · PostgreSQL · Docker

Open to collaboration and freelance work.

portfolio.krishlalani.dev · Krish7lalani@gmail.com
```

**What shows before the fold:**

> I build backends and the computer-vision models that sit behind them: REST APIs, database schemas, and YOLO/OpenCV detection pipelines for industrial inspection. At Microble Technologies I develop machine-vision systems for insulator defect detection, owning everything from…

## 5. Experience

Paste each block into the matching role. Each is well inside LinkedIn's 2000-character limit.

Two things to set while you are in each entry. Attach the **skills** used in that role, which is what makes them endorsable and searchable. And set the right **employment type** — the CHARUSAT entry is an internship and should say so, since an unmarked internship reads as an inflated title.

### Software Developer — Microble Technologies

Apr 2026 — Present · Hybrid

```
• Develop machine-vision systems for industrial inspection, including insulator defect detection using YOLO and OpenCV.
• Prepare training datasets through image collection, annotation, and augmentation.
• Train, evaluate, and deploy vision models into inspection workflows.
```
274 / 2000 characters.

### Python Developer — Empire Circuits LLC

Sep 2025 — Apr 2026 · New Jersey, USA · Remote

```
• Developed PondGuard’s software, integrating bird detection, event capture, and automated deterrent responses.
• Built an OpenCV image-stitching pipeline for PCB quality inspection.
• Built real-time monitoring dashboards using ThingsBoard, Grafana, and MQTT.
```
260 / 2000 characters.

### Python Developer — Infotact Solution

Apr 2025 — Jul 2025 · Bengaluru, Karnataka

```
• Developed Droplify, an e-commerce price-tracking application using Flask and SQLite.
• Implemented product-data collection with Beautiful Soup and Selenium, analytics dashboards, and automated price-drop alerts.
```
213 / 2000 characters.

### Backend Developer & Team Lead — CHARUSAT University

Jun 2024 — Aug 2024 · In-house Internship · Anand, Gujarat

```
• Led a four-engineer backend team building Placestar, a university placement and examination platform tested with 100+ students.
• Designed Node.js and Express REST APIs, database schemas, JWT authentication, and role-based access controls.
• Coordinated sprint planning, code reviews, and backend optimization.
```
312 / 2000 characters.

## 6. Skills

Add up to 50. The list below is 43, which leaves room to grow.

**Pick each skill from LinkedIn's autocomplete rather than typing it free-hand.** Only skills matched to LinkedIn's own vocabulary feed recruiter search; a free-typed one sits on your profile doing nothing. That is why some names below look slightly odd — they are LinkedIn's spellings, not mine.

### Pin these 3

These are the only ones shown on the profile itself. Everything else lives behind **Show all skills**.

| Skill | Why this one |
| --- | --- |
| Python (Programming Language) | The single term most recruiters filter on first. |
| Computer Vision | The differentiator. Very few backend developers have it. |
| REST APIs | Covers the backend half without narrowing to one framework. |

### Add the rest

**Languages and backend** — Node.js, JavaScript, SQL, FastAPI, Flask, Django, Express.js, Back-End Web Development, API Development, JSON Web Token (JWT)

**Computer vision and machine learning** — OpenCV, PyTorch, Object Detection, Image Processing, Deep Learning, Machine Learning, Data Annotation, Model Deployment

**Databases** — PostgreSQL, MySQL, MongoDB, SQLite, Supabase, Database Design

**Platform and tooling** — Git, Docker, Linux, CI/CD, Postman API, Azure DevOps, Selenium, Beautiful Soup

**Monitoring and edge** — Grafana, MQTT, Raspberry Pi, Geofencing

**Ways of working** — Team Leadership, Code Review, Agile Methodologies, Technical Documentation

### Recruiter vocabulary check

Computed from the copy in this document, so it cannot drift away from what you actually paste in.

Recruiter search weights the headline and About far above the skills list, so a term that only appears under Skills is present but not working hard.

| Search term | Appears in | Strength |
| --- | --- | --- |
| Python | Headline, About, Experience, Skills | strong |
| Backend | Headline, About, Experience | strong |
| REST API | About, Experience, Skills | strong |
| Computer Vision | Headline, About, Skills | strong |
| YOLO | Headline, About, Experience | strong |
| OpenCV | Headline, About, Experience, Skills | strong |
| PyTorch | About, Skills | strong |
| Node.js | Headline, About, Experience, Skills | strong |
| FastAPI | About, Skills | strong |
| PostgreSQL | About, Skills | strong |
| MySQL | About, Skills | strong |
| Docker | About, Skills | strong |
| Machine Learning | Skills | thin |
| Object Detection | About, Skills | strong |
| Team Lead | Experience, Skills | strong |

All 15 terms appear somewhere indexed.

One sits only in the skills list: Machine Learning. That is a choice rather than an oversight — the work behind it is real but secondary to the two disciplines the profile leads with, and forcing it into the headline would read as keyword stuffing. Move it up only if you start targeting roles that lead with it.

## 7. Featured

Add these three, in this order. Each has a matching 1200 × 627 image in this folder, which is the size LinkedIn uses for link previews. Paste the title and description rather than letting LinkedIn scrape them.

### 1. Portfolio — Krish Lalani

**Link:** https://portfolio.krishlalani.dev

**Image:** `LinkedIn_Featured_Portfolio.png`

**Description:**

```
Backend systems, computer vision, and the six projects behind them. Includes a live in-browser detection demo.
```

### 2. PondGuard — camera-based bird detection

**Link:** https://portfolio.krishlalani.dev/#project-pondguard

**Image:** `LinkedIn_Featured_PondGuard.png`

**Description:**

```
A YOLO11 detection system that captures events and triggers sprinklers and a red-beam deterrent around ponds. I owned the complete software implementation.
```

### 3. Placestar — placement and examination platform

**Link:** https://portfolio.krishlalani.dev/#project-placestar

**Image:** `LinkedIn_Featured_Placestar.png`

**Description:**

```
I led a four-engineer backend team on the APIs, MySQL schema, JWT authentication, and access controls. Supported a live examination with 100+ students.
```

Only real, public URLs. No demo links have been invented, and the project cards on the site hide their buttons until a real repository or demo URL exists.

## 8. Projects section

Optional, and lower value than Featured — most readers never scroll this far. PondGuard and Placestar are already covered above, so add the remaining 4 here and the whole body of work is on the page.

### Droplify

Built a price-tracking application that collects product data from Flipkart, Amazon, Meesho, and Myntra, presents price analytics, and sends email alerts when prices drop.

Contribution: Built the application independently, including the Flask backend, SQLite database, scraping with Beautiful Soup and Selenium, analytics, and email alerts.

Result: Validated across 25+ real product pages.

Technologies: Python, Flask, SQLite, Beautiful Soup, Selenium, Web scraping, Data analytics, Email alerts.

### AMC Connect

Built a civic complaint platform that validates GPS data and screens complaint images using computer vision before submission, with live status tracking for citizens and officials.

Contribution: Developed the FastAPI backend, image-screening model, and LLM integration for automatically generated complaint descriptions.

Technologies: Python, FastAPI, Supabase, PyTorch, YOLO, LLM integration, Computer vision, GPS validation.

### ClubSphere

Built a platform for managing multiple university clubs, including memberships, roles, events, attendance, and approval workflows.

Contribution: Led backend architecture, PostgreSQL database design, REST APIs, and JWT authentication using Node.js and Express.

Result: Piloted with clubs at CHARUSAT University.

Technologies: Node.js, Express.js, PostgreSQL, REST APIs, JWT authentication, Backend leadership.

### Worker Location Management

Developed workforce-monitoring software in ThingsBoard, using nRF tag signal data and geofencing rules to monitor zones and inactivity.

Contribution: Owned the ThingsBoard configuration, geofencing rules, and dashboard, email, and on-device alert logic.

Result: Validated monitoring rules using RSSI signal data.

Technologies: ThingsBoard, nRF tracking tags, Geofencing, Location monitoring, Rule engine, Email alerts, On-device alerts.

## 9. Education

**B.E. in Computer Engineering — CHARUSAT University, Anand**

2023 — 2026 | CGPA: 9.07 / 10.00

**Diploma in Computer Engineering — A.V. Parekh Technical Institute, Rajkot**

2020 — 2023 | CGPA: 9.89 / 10.00 · Top 10 Merit Award

Put the CGPA in the grade field rather than the description. Both are strong numbers and LinkedIn renders the grade field prominently.

## 10. Honours and participation

**Top 10 Merit Award** — Diploma in Computer Engineering · A.V. Parekh Technical Institute

**Indus Hackathon** — Participation · AMC Connect civic technology project | 2025

Both belong under **Honors & awards**. The hackathon is listed as participation, not a placing — keep it that way.

## 11. Recommendations

The emptiest part of most engineering profiles, and the one a reader trusts most, because you did not write it. Three is plenty.

| Ask | About | Why them |
| --- | --- | --- |
| Your manager at Empire Circuits | PondGuard end to end, and the OpenCV stitching pipeline | A completed remote role with shipped software. The strongest single reference you can have. |
| Your faculty supervisor for the CHARUSAT internship | Leading the four-engineer backend team and the live examination | The only public evidence of you leading people rather than code. |
| A teammate from the Placestar backend team | How you split the work, reviewed code, and handled the exam-day load | Peer recommendations read as more candid than manager ones. |

A request with a specific ask gets written; a blank one sits unanswered. Something like:

```
Hi [name],

I'm tidying up my LinkedIn profile as I start looking at [backend / computer vision] roles, and a short recommendation from you would carry real weight.

If you're willing, the part most worth mentioning is [the specific thing from the table above] — a few sentences is plenty, and no rush at all.

Happy to write one for you as well if that's useful.

Thanks,
Krish
```

## 12. Open to work

Set this under **Open to** → **Finding a new job**.

- **Job titles:** Software Developer, Backend Developer, Python Developer, Computer Vision Engineer, Machine Learning Engineer.
- **Visibility:** choose **Recruiters only** while you are employed. The green #OpenToWork photo frame is visible to everyone, including your current employer.
- **Start date and location:** set both honestly, including whether you will take remote work. Recruiters filter hard on these.

## 13. Order of operations

1. Turn off profile-update notifications before you start, so your network is not alerted to each individual edit. Settings → Visibility → **Share profile updates with your network**.
2. Claim the custom URL (section 1).
3. Upload the banner and photo.
4. Headline, then About.
5. Each experience entry, attaching skills and setting employment type as you go.
6. Education, then honours.
7. Skills: add all of them, then pin the three.
8. Featured last, so the profile is complete when someone clicks through.
9. Turn notifications back on.
10. Send the three recommendation requests.
11. Update `profile.linkedin` in `src/lib/portfolio-data.ts` and re-run the builders, so the site and resume carry the new URL.

## 14. What not to do

- Do not add demo links that do not exist. An empty button is better than a dead one.
- Do not let the CHARUSAT internship sit untagged as a regular role.
- Do not describe the hackathon as a win.
- Do not free-type skills. If LinkedIn does not offer it in the dropdown, it does not count.
- Do not edit anything in `career/` by hand. It regenerates from `src/lib/portfolio-data.ts`.

---

[Editing your intro](https://www.linkedin.com/help/linkedin/answer/a547248) · [Custom public profile URL](https://www.linkedin.com/help/linkedin/answer/a542685) · [Featured section](https://www.linkedin.com/help/linkedin/answer/a1584657) · [Banner specifications](https://www.linkedin.com/help/lms/answer/a549049) · [Open to work](https://www.linkedin.com/help/linkedin/answer/a507508)
