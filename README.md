# Community Tokens Hub (CTH) — PWA MVP

Next.js + Supabase powered MVP for the Community Tokens Hub. The UI is rebuilt
with Tailwind + Framer Motion and includes the core pages: registration,
dashboard, collection, leaderboard, and Kaspi QR top-up.

## ✅ What’s included

- PWA-ready layout + manifest
- Dark gradient + glassmorphism UI
- TikTok registration flow stub (OCR + verification hooks)
- Dashboard with XP, balance, quests, and stickers
- Kaspi QR top-up screen
- Static leaderboard + collection grid

## 🧩 Env configuration

Copy `.env.example` to `.env.local` and fill Supabase/worker keys:

```bash
cp .env.example .env.local
```

## 🧪 Local development

```bash
npm install
npm run dev
```

## 🚀 GitHub Pages deployment

```bash
./deploy.sh
```

This builds a static export into `out/` and publishes it to GitHub Pages.
