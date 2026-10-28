# SeedController — Sovereign Semen Retention, Bio-Transmutation & Neuro-Reboot Suite

Full-stack **Netlify + NeonDB (PostgreSQL)** web application inspired by **SeedController**, **ASCEND**, **Seed**, **NoBeep**, **Transcend**, and **Rising Drop**.

## 340-Character Functional Description
> SeedController is a responsive, privacy-first semen retention & discipline web app built for Netlify and NeonDB PostgreSQL. It pairs a 3D evolving Aura Orb and dual P/MO streak counters with a 90-day reboot ladder, emergency urge shield, breathwork & 432Hz audio, fasting timer, AI coach, blogs, journal, and live PubMed/quote APIs.

---

## Key Features Included
1. **Private Dual-Track Streak Counter (SeedController + Rising Drop)**:
   - Second-by-second live retention timer (`Days`, `Hours`, `Minutes`, `Seconds`) plus separate **P-Free (Visual Purity)**, **MO-Free (Seed Retained)**, and **All-Time Best Streak** counters.
   - **Discreet Privacy Blur Mode**: One-click lock button blurs the screen when in public.
2. **Evolving 3D Interactive Aura Orb (Seed Inspired)**:
   - Hardware-accelerated HTML5 `<canvas>` 3D Golden-Spiral Constellation Orb that evolves across 8 stages and harmonic frequencies (`396 Hz` to `963 Hz`) and responds to touch/mouse drag.
3. **90-Day Reboot Plan, 8 Rank Badges & 12-Week Visual Ladder (ASCEND + NoBeep + Rising Drop)**:
   - 8 unlockable ranks (*Seed Initiate* → *Brahmacharya Sage*), 12-week progress ladder, Chart.js dopamine/androgen recovery trajectory, and a **Non-Destructive Historical Relapse Ledger** that logs triggers and lessons without erasing past milestones.
4. **Emergency Urge SOS Shield, Paced Breathwork & 432Hz Binaural Hypnosis (ASCEND + Seed)**:
   - 90-second neurological override countdown, 3 somatic breathing modes (*4-4-4-4 Box Calm*, *4-7-8 Vagal Brake*, *6-3-6 Ojas Draw*), Web Audio API 432Hz/Theta binaural drone synthesizer, and an interactive **AI Retention & Transmutation Coach**.
5. **Daily Energy Transmutation Habits & Intermittent Fasting Tracker (Transcend Inspired)**:
   - 6 daily habits with persistent **Aura XP** rewards and an integrated **Intermittent Fasting Tracker** (`16:8`, `18:6`, `20:4`, `24h`) with autophagy telemetry.
6. **Science Academy, Dynamic Public APIs, Blogs, Journal & Community Wall**:
   - Real-time integration with **NIH NCBI PubMed E-Utilities API** (`eutils.ncbi.nlm.nih.gov`), **DummyJSON Quotes API**, and **Reddit r/SemenRetention JSON feeds** via `/.netlify/functions/public-feed`.
   - Full CRUD **Blogs**, **Private Retention Journal**, **Brotherhood Check-in Wall**, and **DNS/Hosts Porn Blocker Configurator** backed by **NeonDB PostgreSQL**.

---

## Project Structure
```text
seedcontroller-netlify/
├── index.html                      # Fully responsive application UI
├── styles.css                      # Glassmorphic cosmic-purple & gold stylesheet
├── app.js                          # Frontend state, 3D Orb, timers, API & NeonDB sync
├── package.json                    # Node dependencies (pg Pool)
├── netlify.toml                    # Netlify build & functions routing config
├── .env.example                    # Environment variable template (DATABASE_URL)
├── site.webmanifest                # Web App Manifest for mobile/desktop install
├── favicon/
│   ├── favicon.svg                 # Crisp vector emblem
│   ├── favicon.ico                 # Multi-size classic favicon
│   ├── favicon-32x32.png           # Standard browser tab icon
│   ├── apple-touch-icon.png        # 180x180 iOS home screen icon
│   ├── icon-192.png                # 192x192 Android PWA icon
│   └── icon-512.png                # 512x512 high-res splash icon
├── netlify/
│   └── functions/
│       ├── api.js                  # NeonDB PostgreSQL serverless CRUD & auto-migration
│       └── public-feed.js          # Dynamic PubMed, Quotes & Reddit API proxy
└── sql/
    └── schema.sql                  # Optional manual SQL schema for NeonDB console
```

---

## Step-by-Step Deployment Instructions (Netlify + NeonDB)

### Step 1: Set Up Your NeonDB PostgreSQL Database
1. Log in to [Neon Console](https://console.neon.tech/) and create or select a project.
2. Copy your pooled or direct PostgreSQL connection string (`postgresql://user:pass@ep-...neon.tech/neondb?sslmode=require`).
3. *(Optional)* Open the **Neon SQL Editor** and run `sql/schema.sql`. Note that `netlify/functions/api.js` also runs `CREATE TABLE IF NOT EXISTS` and seeds initial blog/community records automatically on its first invocation!

### Step 2: Deploy to Netlify
1. Unzip `seedcontroller-netlify.zip` and push the folder to a GitHub/GitLab repository (or use the Netlify CLI: `npm install && npx netlify deploy --prod`).
2. In the **Netlify Dashboard**, click **Add new site -> Import an existing project** and select your repository.
3. Verify the build settings (auto-detected via `netlify.toml`):
   - **Publish directory**: `.`
   - **Functions directory**: `netlify/functions`
4. Go to **Site Configuration -> Environment variables -> Add a variable**:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste your NeonDB connection string.
5. Trigger a redeploy (**Deploys -> Trigger deploy -> Deploy site**). Your app and serverless functions (`/.netlify/functions/api` and `/.netlify/functions/public-feed`) will be live!
