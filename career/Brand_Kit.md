# Krish Lalani — brand kit

One identity across the portfolio site, the resume, and LinkedIn. Every value
here is the value actually used in `src/styles.css`, so the assets and the
deployed site cannot drift apart.

## Colour

| Token | Hex | Where it is used |
| --- | --- | --- |
| Ink | `#101A16` | Dark background |
| Panel | `#1B2A21` | Raised cards on dark |
| Line | `#304034` | Borders on dark |
| Mint | `#A8DCB0` | Accent on dark: links, highlights, the italic line |
| Forest | `#23745A` | Accent on light: the same role, darker for contrast |
| Paper | `#F7F9F5` | Light background |
| Slate | `#172B25` | Body text on light |
| Muted | `#5D6D64` | Secondary text on light |

Mint on Ink and Slate on Paper both clear WCAG AA for body text. Never put Mint
on Paper or Forest on Ink; each accent belongs to one background.

See `Brand_Palette.png` for the swatch sheet.

## Type

| Role | Family | Notes |
| --- | --- | --- |
| Display | Instrument Serif, italic | Reserved for the second line of the headline pair, never body copy |
| Sans | Inter | Headings and body, 300–700 |
| Mono | JetBrains Mono | Labels, eyebrows, numbers, code |

Headings run tight: about `-0.03em` letter-spacing. Mono labels run loose:
`0.2em`, uppercase, 9–11px.

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
| `LinkedIn_Banner.png` | 1584 × 396 | LinkedIn banner, dark |
| `LinkedIn_Banner_Light.png` | 1584 × 396 | LinkedIn banner, light |
| `LinkedIn_Featured_*.png` | 1200 × 627 | Featured section and link previews |
| `Brand_Palette.png` | 1200 × 600 | Colour reference |
| `Krish_Lalani_Resume.pdf` | Letter, 1 page | The version a person reads |
| `Krish_Lalani_Resume_ATS.pdf` | Letter, 1 page | The version software parses |

PNGs are exported at 2× for retina screens. The `.svg` beside each PNG is the
editable source.

## Rebuilding

```sh
node scripts/export-career-content.mjs   # website facts -> career-content.json
node scripts/build-brand.mjs             # banners, featured cards, palette
node scripts/build-linkedin.mjs          # this file and the LinkedIn pack
python3 scripts/build-resume.py          # designed resume
python3 scripts/build-resume.py --ats    # ATS resume
```

Edit `src/lib/portfolio-data.ts` and re-run all five. Nothing is written twice
by hand.
