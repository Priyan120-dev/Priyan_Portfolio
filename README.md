# Priyan I — Senior Creative Developer Portfolio

A production-ready personal portfolio built for **Priyan I** (Software Engineer & Full Stack Developer), designed as a quiet, premium, editorial web experience inspired by Awwwards "Site of the Day" aesthetics (monochrome off-white `#f4f2ee`, deep `#0d0d0d` ink, and refined typography).

---

## 1. Quick Start & Running Locally

### Prerequisites
- Node.js 18+ (tested on Node v24.15)
- npm 9+
- Python 3.10+ & FFmpeg (only needed if rebuilding hero media assets)

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle and validate types
npm run build

# 4. Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Sections Table

| Order | Section | Identifier | Component | Description & Key Interaction |
|---|---|---|---|---|
| 00 | **Navigation** | `header` | `src/components/Navigation.tsx` | Initials mark (turns solid on scroll), sliding indicator pill, 2px scroll progress bar, and clip-path full-screen mobile menu. |
| 01 | **Hero** | `#hero` | `src/components/hero/Hero.tsx` | Centered 768×960 looping video with whitened backdrop (`mix-blend-mode: multiply`), ghost outlined name, sound unmute button with ping ring, and auto-pause when scrolled away (<35% visibility). |
| 02 | **About** | `#about` | `src/components/sections/About.tsx` | 3-column equal height layout. Center column features an interactive hanging lanyard ID card with damped pendulum swing physics and 3D flip on hover/tap/keyboard. |
| 03 | **Skills** | `#skills` | `src/components/sections/Skills.tsx` | "Periodic table of my stack": 8-column periodic element grid, diagonal wave entrance delay `(row + col) * 40ms`, category filter chips, and 320px sticky logo inspector with pop animation. |
| 04 | **Work** | `#work` | `src/components/sections/Work.tsx` | Expanding accordion gallery (`flex: 8` for open panel, slim vertical spines with rotating `+` buttons for closed panels), tech badges, and illustrative CSS/JSX grayscale mini-UIs. |
| 05 | **Certifications** | `#certifications` | `src/components/sections/Certifications.tsx` | Ink-flood index on a clean white band. Rows flood with solid ink on hover/focus with slide-in `↗` glyphs. |
| 06 | **Experience** | `#experience` | `src/components/sections/Experience.tsx` | Chronological timeline combining education (DSU, CGPA 8.29) and industry internships (Innovation Hacks, Oasis Infobyte, Reskilll). Vertical spine draws dynamically as user scrolls; ends with dashed "Next — Your team?" card. |
| 07 | **Achievements** | `#achievements` | `src/components/sections/Achievements.tsx` | Pinned horizontal gallery (`100svh` sticky container). Cards slide left as user scrolls down. Features 72px logo tiles, soft brand-tint glows, active card elevation, and `easeOutQuart` count-up numbers. |
| 08 | **Contact & Footer** | `#contact` | `src/components/sections/Contact.tsx` | Interactive letter-hopping heading, email link with accessible "Copy" chip, slow-spinning circular badge, and footer with "Back to top". |

---

## 3. How to Rebuild the Hero Video Assets

The project includes an automated Python pipeline in `scripts/build-hero-assets.py` that processes the input intro video using FFmpeg and NumPy:

1. **Tight Person Centering**: Crops the subject tightly head-to-toe (`848×1060` centered at X=968) and scales to `768×960` (aspect ratio 4:5).
2. **Backdrop Whitening**: Uses `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` to turn the studio background into clean pure white so it dissolves effortlessly into `#f4f2ee` via multiply blending.
3. **Seamless Video & Audio Loop**:
   - Applies FFmpeg `xfade` (0.5s transition) between the end and beginning of the clip.
   - Performs a sample-accurate NumPy cross-fade on the audio waveform to eliminate clicks, pops, and audio dropouts without changing speech speed or lip sync.
4. **Dual Format Compression**:
   - `public/hero/hero.mp4`: H.264 yuv420p (CRF 24, slow preset, AAC 96k, `+faststart`).
   - `public/hero/hero.webm`: VP9 (CRF 36, Opus 80k).
5. **Still Assets**:
   - Generates `public/portrait-bust.webp` (480×600) for the ID card and video poster.
   - Generates `public/og.jpg` (1200×630) for social sharing metadata.

To run the pipeline:
```bash
python scripts/build-hero-assets.py
```

---

## 4. Credits and Brand Logo Licenses

All logos are property of their respective owners and are used strictly under fair use to illustrate technical capabilities and achievements:
- **Devicon** (MIT License): Official SVGs for Python, JavaScript, TypeScript, C++, React, Next.js, HTML5, CSS3, Tailwind CSS, Framer Motion, Three.js, Node.js, Express, FastAPI, MongoDB, PostgreSQL, SQLite, Firebase, Supabase, Git, GitHub, Vercel, Netlify, Google.
- **Render**: Render Services Inc.
- **Gemini**: Google LLC
- **Concept Glyphs**: Custom monochrome SVG icons for REST APIs, JWT, Generative AI, Machine Learning, Data Analysis, and Data Visualization.
- Full details are provided in [public/logos/LICENSE.md](public/logos/LICENSE.md).

---

## 5. Non-Negotiable Rule Compliance

- **Zero Fabrication**: 100% of names, degrees, CGPAs (8.29), awards (Quantathon ₹50,000, 1st Prize AI Impact), certifications, projects, and hyperlinks originate directly from `Priyan_I_ATS_Resume_Final_Updated.pdf`.
- **Palette**: Strictly warm off-white (`#f4f2ee`), pure white (`#ffffff`), ink blacks (`#0d0d0d`, `#3a3a3a`), and neutral grays (`#77756f`, `#a9a6a0`). No accent colors, no gradients, and no full-width dark sections.
- **Zero Heavy 3D / Cursor Tracking**: Smooth scroll powered by lightweight Lenis; animations implemented using standard CSS, IntersectionObserver, and lightweight RAF loops. First-load bundle kept minimal.
- **Self-Hosted Fonts**: Variable Inter Tight, Instrument Serif, and JetBrains Mono self-hosted as `.woff2` files in `src/fonts/`.
