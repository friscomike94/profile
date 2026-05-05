# Mike's Portfolio — Claude Code Context

## Project Overview
Personal portfolio website for Mike, a multidisciplinary designer (UI/UX, Motion, Brand Identity).
BFA Web Design & New Media — Academy of Art University, San Francisco.

## File Structure
```
mike-portfolio/
├── index.html          # Main single-page site
├── css/
│   └── style.css       # All styles — single stylesheet
├── js/
│   ├── logo.js         # MK badge logo rotation + glitch animation
│   └── main.js         # Cursor, scroll reveal, nav interactions
├── assets/
│   └── logo/           # Logo exports (SVG, PNG)
└── CLAUDE.md           # This file
```

## Design System

### Colors
- `--ink: #0a0a0a`       → Primary background (near-black)
- `--paper: #f2ede6`     → Primary text (warm off-white)
- `--acid: #c8ff00`      → Accent / brand color (electric lime)
- `--red: #ff1f1f`       → Glitch channel / danger
- `--blue: #0014ff`      → Glitch channel / secondary
- `--muted: #9a9189`     → Secondary text

### Typography
- `--f-display: 'Bebas Neue'`         → All headings, hero, section titles
- `--f-body: 'Bricolage Grotesque'`   → Body text, descriptions
- `--f-mono: 'IBM Plex Mono'`         → Labels, tags, nav, code-like elements

### Aesthetic Direction
- **Vibe:** American streetwear energy — raw, loud, controlled chaos
- **Layout:** Diagonal hero split (dark left / light right), editorial work list rows
- **Motion:** Smooth easing on all transitions, scroll reveal with stagger
- **Logo:** MK hex badge with sci-fi HUD elements, hover-activated rotation + chromatic glitch

## Key Components

### Logo (js/logo.js)
The MK hex badge lives in `#badge-hero` inside the hero section.
- Outer hex polygon (`#hex-spin`) rotates on hover at 2.2°/frame
- Inner ring (`#inner-ring`) counter-rotates at 0.65x speed
- 6 vertex dots (`#dot0–5`) track the spinning polygon
- Chromatic aberration: `#glitch-red` and `#glitch-blue` layers fire randomly every 500–900ms on hover
- Speed eases in/out with lerp factor 0.04

### Cursor (js/main.js)
Custom acid-green cursor with lagging ring follower.
- Dot: instant, mix-blend-mode difference
- Ring: lerp at 0.1 factor, expands to 52px on hover over interactive elements

### Scroll Reveal
`.reveal` class → opacity 0, translateY 40px
`.reveal.in` class → opacity 1, translateY 0
Triggered by IntersectionObserver at 0.12 threshold with 90ms stagger.

### Work Items
`.work-item` rows slide right on hover (padding-left: 1rem).
`.featured-row .work-title-row` renders in `--acid` color.

## How to Customize

### Update Projects
Edit the `.work-item` blocks in `index.html`.
Each item needs: `work-idx`, `work-tags-row` (`.wtag` spans), `work-title-row`, `work-desc`.

### Update Contact Links
Find `href="mailto:mike@email.com"` and the LinkedIn/Behance anchors in `#contact`.

### Add a New Section
1. Add `<section id="new-section">` in `index.html`
2. Add nav link in `<ul class="n-links">`
3. Style in `css/style.css` following existing section patterns
4. Add `.reveal` class to elements you want animated in

### Change Accent Color
Update `--acid` in `:root` in `css/style.css`. The logo SVG uses hardcoded `#c8ff00` — update those too.

## Performance Notes
- No build step required — pure HTML/CSS/JS, open index.html directly in browser
- Google Fonts loaded via CDN (requires internet)
- All animations use `requestAnimationFrame` and CSS transforms (GPU accelerated)
- No external JS dependencies

## Browser Support
Chrome, Firefox, Safari, Edge — modern browsers only.
`backdrop-filter` (nav blur) may not work in older Firefox.
