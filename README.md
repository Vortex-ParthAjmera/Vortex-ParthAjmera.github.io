<div align="center">

# ✦ PARTH AJMERA — PORTFOLIO

**Futuristic Space-Tech Developer Portfolio**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Visit-blueviolet?style=for-the-badge&logoColor=white)](https://vortex-parthajmera.github.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-89.7%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-FF6B35?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## Overview

A personal portfolio website for **Parth Ajmera** — AI/ML Engineer and Systems Developer — built with a futuristic space-tech aesthetic. The site features an animated neural-uplink preloader rendered entirely in SVG, smooth Framer Motion transitions, and a server-side Gemini AI integration. It is deployed as a static GitHub Pages site and built with a modern React + TypeScript + Vite stack.

> **Tagline:** *"Futuristic Space-Tech Developer Portfolio"*

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 (Vite plugin) |
| **Animation** | Framer Motion 12, Anime.js 4 |
| **AI Integration** | Google Gemini AI (`@google/genai` 2.4) |
| **Icons** | Lucide React |
| **Backend / API** | Express 4 (server-side Gemini API calls) |
| **Deployment** | GitHub Pages (GitHub Actions CI/CD) |

---

## Features

- **Neural Uplink Preloader** — A fully custom SVG chip animation with animated PCB trace flows renders instantly before the React bundle loads, giving a zero-blank-screen experience.
- **Gemini AI Integration** — Server-side Gemini API calls power interactive AI features on the portfolio, with secrets managed via environment variables.
- **Smooth Animations** — Framer Motion and Anime.js drive page transitions, scroll-triggered reveals, and micro-interactions throughout.
- **Fully Typed** — 100% TypeScript with strict type checking (`tsc --noEmit` in CI).
- **Automated CI/CD** — GitHub Actions workflow handles build and deployment to GitHub Pages on every push to `main`.
- **Space-Tech Aesthetic** — Dark background (`#050505`), glowing neon palette (purple, cyan, yellow, green, red), monospace typography, and a hardware-inspired visual language.

---

## Project Structure

```
Vortex-ParthAjmera.github.io/
├── .github/
│   └── workflows/        # GitHub Actions CI/CD pipeline
├── public/               # Static assets served as-is
├── src/                  # React application source (TypeScript)
│   └── main.tsx          # Application entry point
├── index.html            # HTML shell with SVG preloader
├── vite.config.ts        # Vite + Tailwind + React config
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
├── metadata.json         # App metadata (name, description, capabilities)
└── .env.example          # Environment variable template
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or your preferred package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vortex-ParthAjmera/Vortex-ParthAjmera.github.io.git
cd Vortex-ParthAjmera.github.io

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your keys (see Environment Variables section below)

# 4. Start the development server
npm run dev
```

The dev server starts at `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
# Required — Gemini AI API key for server-side AI calls
GEMINI_API_KEY="your_gemini_api_key_here"

# Required — The URL where this app is hosted (used for self-referential links and API endpoints)
APP_URL="https://vortex-parthajmera.github.io"
```

> **Note:** Never commit your `.env` file. It is listed in `.gitignore`. The `.env.example` file exists solely as a reference template.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server on `localhost:3000` with HMR |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` and `server.js` build artifacts |

---

## Deployment

The site deploys automatically to **GitHub Pages** via the GitHub Actions workflow in `.github/workflows/`. Every push to `main` triggers:

1. Dependency installation
2. TypeScript type check
3. Vite production build
4. Deployment of `dist/` to the `gh-pages` branch

The live site is accessible at:
**[https://vortex-parthajmera.github.io](https://vortex-parthajmera.github.io)**

---

## Architecture Notes

**Preloader Design** — `index.html` contains a pure HTML/CSS/SVG preloader that renders when `#root` is empty (before JS loads). It displays an animated PCB chip with flowing coloured traces, giving the impression the neural uplink is initialising. This approach requires zero JavaScript and disappears the moment React mounts.

**Server-Side AI** — The `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` capability flag in `metadata.json` indicates Gemini API calls are made server-side (via Express), keeping the API key out of the browser bundle entirely.

**Path Aliases** — `@` is aliased to the project root in both `vite.config.ts` and `tsconfig.json` for clean imports.

---

## About the Developer

**Parth Ajmera** — AI/ML Engineer & Systems Developer at **Doon University, Dehradun**.

- Competitive programmer and algorithmic trading enthusiast (IMC Prosperity 4 participant)
- Builder of full-stack applications, AI-powered tools, and real-time systems
- Interests span quantitative finance, AI/ML, live event production, and Japanese (JLPT N5)

---

## License

This project is a personal portfolio. All source code is © Parth Ajmera. Feel free to draw inspiration, but please do not copy and deploy it as your own portfolio.

---

<div align="center">

**Built with ⚡ by [Parth Ajmera](https://github.com/Vortex-ParthAjmera)**

*"INIT_NEURAL_UPLINK..."*

</div>
