# Kelvin Njoroge — Personal Portfolio

> Full-Stack Software Developer · AI Project Lead · Mathematics Graduate · Nairobi, Kenya

🌐 **Live site:** [kelvin-njoroge.netlify.app](https://kelvin-njoroge.netlify.app)

Live portfolio built with React, Tailwind CSS, and Framer Motion. Features a cinematic preloader, interactive sections, a custom cursor, and a working contact form.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animations | Framer Motion |
| Icons | Lucide React + custom inline SVGs |
| Email | EmailJS (`@emailjs/browser`) |
| Build tool | Vite 8 |

---

## Features

- **Cinematic preloader** — multi-phase terminal animation with hex grid assembly, character-by-character typing, and a hard 4-second exit
- **Custom cursor** — glowing 4-point star with comet trail and click-burst sparkle effect
- **Glassmorphism UI** — frosted glass cards with `backdrop-blur`, neon cyan accent colour, subtle border glows
- **Animated background** — floating radial neon blobs + dot-matrix grid overlay
- **Sticky navbar** — scroll-aware with active section tracking and mobile slide-out drawer
- **Hero section** — two-column layout with photo, typing effect subtitle, CTA buttons, and social links
- **About / Core Pillars** — bio, stats, floating badges, 4-pillar skill cards
- **Experience timeline** — 5 roles with animated neon spine, pulsing nodes, tech-stack badges
- **Projects grid** — filterable glassmorphic cards with category badges and live/GitHub links
- **Certifications dashboard** — education card, cert grid, animated skill-proficiency bars
- **Design Work gallery** — continuous RAF-driven marquee loop with hover-pause and fullscreen lightbox
- **Contact form** — EmailJS integration, sends directly to `njorogekelvin2022@gmail.com`
- **Fully responsive** — mobile, tablet, and ultra-wide layouts

---

## Project Structure

```
kelvin-portfolio/
├── public/
│   └── favicon.jpeg            # Profile photo favicon
├── src/
│   ├── assets/
│   │   ├── kelvin.jpg           # Hero photo
│   │   ├── pillars.jpg          # About section image
│   │   ├── My profile.jpeg      # Favicon source
│   │   └── Designworks/         # Graphic design portfolio images
│   ├── components/
│   │   ├── Preloader.jsx        # 4-second cinematic loading screen
│   │   ├── CursorStar.jsx       # Custom star cursor + sparkle effect
│   │   ├── BackgroundBlobs.jsx  # Animated neon background blobs
│   │   ├── Navbar.jsx           # Sticky navigation bar
│   │   ├── Hero.jsx             # Landing section
│   │   ├── About.jsx            # Bio + Core Pillars
│   │   ├── Experience.jsx       # Career timeline
│   │   ├── Projects.jsx         # Projects grid
│   │   ├── Certifications.jsx   # Education & certs
│   │   ├── DesignWork.jsx       # Graphic design marquee gallery
│   │   ├── Contact.jsx          # Contact form (EmailJS)
│   │   ├── Footer.jsx           # Footer with nav + socials
│   │   └── SocialIcons.jsx      # Inline SVG icons (GitHub, LinkedIn, X, YouTube)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Tailwind + custom CSS variables & animations
├── index.html
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Vokeh254/kelvin-portfolio.git
cd kelvin-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy the contents of `dist/` to any static host (Vercel, Netlify, GitHub Pages).

---

## EmailJS Setup (Contact Form)

The contact form sends emails directly to `njorogekelvin2022@gmail.com` via [EmailJS](https://www.emailjs.com) — no backend required.

**One-time configuration:**

1. Sign up at [emailjs.com](https://www.emailjs.com) (free — 200 emails/month)
2. **Add Email Service** → Gmail → connect `njorogekelvin2022@gmail.com` → copy the **Service ID**
3. **Create Template** with these variables:

   ```
   From:    {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   Body:    {{message}}
   To:      {{to_email}}
   ```

   Copy the **Template ID**

4. **Account → API Keys** → copy your **Public Key**

5. Open `src/components/Contact.jsx` and fill in lines 14–16:

   ```js
   const EMAILJS_SERVICE_ID  = 'service_xxxxxxx';
   const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';
   const EMAILJS_PUBLIC_KEY  = 'your_public_key';
   ```

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo at [vercel.com](https://vercel.com/new):

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## Socials

| Platform | Link |
|---|---|
| GitHub | [github.com/Vokeh254](https://github.com/Vokeh254) |
| LinkedIn | [linkedin.com/in/kelvin-njoroge-037719271](https://www.linkedin.com/in/kelvin-njoroge-037719271) |
| Twitter / X | [x.com/Kelvin-njoroge](https://x.com/Kelvin-njoroge) |
| YouTube | [youtube.com/@TruCoder_1ob](https://www.youtube.com/@TruCoder_1ob) |
| Email | njorogekelvin2022@gmail.com |

---

## License

MIT — feel free to fork and adapt for your own portfolio. A credit link back is appreciated but not required.
# My_PortfolioV2
