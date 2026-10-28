# SeedController — Sovereign Semen Retention, NNN War Room & Bio-Transmutation Suite

Full-stack **Netlify + NeonDB (PostgreSQL)** web application inspired by **SeedController**, **ASCEND**, **Seed**, **NoBeep**, **Transcend**, **Rising Drop**, and the global **No Nut November (NNN)** movement.

## 340-Character Functional Description
> SeedController is a responsive, privacy-first semen retention & NNN web app built for Netlify and NeonDB PostgreSQL. It pairs a 3D evolving Aura Orb and dual P/MO streak counters with a 30-day NNN War Room, Top 50 YouTube cinema, live Reddit/PubMed APIs, urge thermometer, breathwork, fasting timer, AI coach, blogs, and journal.

---

## Complete Feature Matrix

### 1. Command Center (Dashboard)
* **Evolving 3D Interactive Aura Orb (*Seed Inspired*)**: Golden-spiral 110-node 3D constellation sphere on HTML5 `<canvas>` that evolves across 8 stages and harmonic frequencies (`396 Hz` to `963 Hz`).
* **Second-by-Second Multi-Track Streak Counter (*SeedController + Rising Drop*)**: Tracks your main PMO retention streak (`Days`, `Hours`, `Minutes`, `Seconds`) alongside separate **P-Free (Visual Purity)**, **MO-Free (Seed Retained)**, and **All-Time Best Streak** counters.
* **Discreet Privacy Blur Mode**: One-click `🔒 Discreet Mode` header button applies a `14px` privacy blur when in public spaces.
* **Daily Energy Transmutation Habits & Intermittent Fasting Tracker (*Transcend Inspired*)**: 6 daily habits with persistent **Aura XP** rewards and an integrated **Intermittent Fasting Tracker** (`16:8`, `18:6`, `20:4`, `24h`) with autophagy telemetry.

### 2. NNN (No Nut November) Challenge Mega-Hub (`🍂 NNN Challenge Hub`)
* **Custom High-Resolution Murals & Vector Clip Art**: Includes 3 bespoke digital murals (*The Spartan Autumn Citadel*, *Temple of Ojas & Neural Ascension*, and *Cyber-Stoic Aegis Urge Shield*) in `assets/murals/`.
* **Live NNN Countdown & Active Survival Clock**: Automatically counts down to November 1st (00:00:00) or tracks remaining survival time inside November.
* **30-Day Interactive November Survival Matrix**: Click any day (`Nov 1` – `Nov 30`) to cycle between **Clean Survived (`🛡️`)**, **High-Urge Survived (`🔥`)**, and **Slip (`💀`)**, syncing directly with the `sc_nnn_daily_tracker` table in NeonDB.
* **Real-Time NNN Urge Intensity Thermometer & Defcon Gauge**: Interactive `0–10` voltage slider that calculates your live Defcon status (*DEFCON 5 Sovereign Calm*, *DEFCON 3 Elevated Voltage*, *DEFCON 1 Red Alert Override*), prescribes immediate somatic countermeasures, and logs readings to NeonDB.
* **Live Reddit Subreddit Scraper (`r/nonutnovember`, `r/SemenRetention`, `r/NoFap`)**: Supports authenticated **Reddit OAuth2 (`REDDIT_CLIENT_ID` + `REDDIT_CLIENT_SECRET`)** as well as keyless public JSON scraping.
* **Dynamic YouTube Content Cinema (Top 50 NNN & Retention Videos)**: Queries the live **YouTube Data API v3 (`YOUTUBE_API_KEY`)** and includes a curated 50-video master index with an inline privacy-enhanced (`youtube-nocookie.com`) cinema player.
* **NNN Funny Stories & Superpower Lore Vault**: Read and publish comedic NNN survival chronicles persisted in the `sc_nnn_stories` NeonDB table.
* **Complete History of NNN Timeline (1500 BCE – 2026)**: Traces the lineage from Vedic Brahmacharya and Classical Greek Olympians to the 2003 Jiang et al. study, the 2011 Urban Dictionary coinage, and modern bio-optimization.
* **Live API Keys Vault**: Manage and test `YOUTUBE_API_KEY`, `PIXABAY_API_KEY`, `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, and `NCBI_API_KEY` directly in the UI or via Netlify Environment Variables.

### 3. 90-Day Reboot Plan, Urge Shield, Academy, Blogs, Journal & NeonDB Setup
* **8 Rank Progression Badges & 12-Week Visual Ladder (*ASCEND + NoBeep + Rising Drop*)**
* **Non-Destructive Historical Relapse Ledger**: Records triggers and lessons in `sc_relapse_logs` without erasing your past streak milestones.
* **Emergency Urge SOS Overlay, 3-Mode Paced Breathwork & 432Hz Web Audio Binaural Synthesizer**
* **24/7 Context-Aware AI Retention & Transmutation Coach**
* **Blogs & Field Reports Repository (`sc_blogs`), Private Journal (`sc_journal_entries`), Brotherhood Wall (`sc_community_checkins`), and System Hosts Porn Blocker Generator**

---

## Database Schema & Migration Guide (NeonDB PostgreSQL)

The application uses **8 PostgreSQL tables** prefixed with `sc_` so they never collide with existing tables (like `humans`) in your NeonDB database:
1. `sc_profiles` — Practitioner profile, dual P/MO start timestamps, longest streak, Aura XP, fasting state, and blocker domains
2. `sc_daily_habits` — Daily completed transmutation habits
3. `sc_relapse_logs` — Non-destructive historical relapse & trigger ledger
4. `sc_journal_entries` — Private retention & transmutation journal entries
5. `sc_blogs` — Science-backed articles and community field reports
6. `sc_community_checkins` — Brotherhood accountability wall pledges
7. `sc_nnn_daily_tracker` *(NEW)* — 30-day November survival status (`survived`, `danger_zone`, `fallen`) and urge thermometer logs (`0–10`)
8. `sc_nnn_stories` *(NEW)* — Funny NNN survival stories, meme lore, and laugh salutes

### What to Run in NeonDB SQL Editor
Open [Neon Console](https://console.neon.tech/) → **SQL Editor**, select your database in the top dropdown, and run `sql/schema.sql`. Even if you already ran the earlier 6-table script, `sql/schema.sql` uses `CREATE TABLE IF NOT EXISTS` so it will cleanly add `sc_nnn_daily_tracker` and `sc_nnn_stories` without touching your existing data.

---

## Live APIs & Keyless / Instant-Key Alternatives (No Reddit or Pixabay Key Required!)

| Feature / Feed | Default 100% Keyless Live API (Zero Setup) | Optional API-Key Upgrade (`Netlify Env Var`) | How to Obtain Free Key (If Desired) |
| :--- | :--- | :--- | :--- |
| **NNN Visual Gallery & Classical Art** | **Art Institute of Chicago Open REST API** (`api.artic.edu`) + **Wikimedia Commons Live API** (`commons.wikimedia.org`) | **`PEXELS_API_KEY`** *(Best Pixabay replacement)* or **`UNSPLASH_ACCESS_KEY`** | **Pexels (10-sec instant key):** Sign up at [pexels.com/api](https://www.pexels.com/api/) and click **Generate API Key**.<br>**Unsplash:** Create an app at [unsplash.com/developers](https://unsplash.com/developers) and copy your **Access Key**. |
| **Live Reddit & Community Scraper** | **Browser-Direct Reddit Public JSON** (`reddit.com/r/{sub}/hot.json`) + **PullPush.io Reddit API** (`api.pullpush.io`) + **Hacker News Algolia API** (`hn.algolia.com`) | `REDDIT_CLIENT_ID` & `REDDIT_CLIENT_SECRET` *(100% Optional — Not required!)* | No API key needed! The 3-tier keyless pipeline scrapes `r/nonutnovember`, `r/SemenRetention`, `r/NoFap`, `r/Stoicism`, `r/getdisciplined`, and Hacker News automatically. |
| **Top 50 NNN YouTube Cinema** | **Built-in 50-Video Curated NNN & Retention Cinema Index** | **`YOUTUBE_API_KEY`** | Go to [Google Cloud Console](https://console.cloud.google.com/) → Enable **YouTube Data API v3** → **Credentials → Create API Key**. |
| **Science & Neurobiology Feed** | **NIH NCBI PubMed E-Utilities Public API** (`eutils.ncbi.nlm.nih.gov`, 3 req/s keyless) | `NCBI_API_KEY` *(Optional)* | Sign in at [ncbi.nlm.nih.gov/account/settings](https://www.ncbi.nlm.nih.gov/account/settings/) → **Create an API Key** (raises rate limit to 10 req/s). |
| **Daily Stoic & Discipline Quotes** | **DummyJSON Live Quotes REST API** (`dummyjson.com/quotes/random`) | *(None Needed)* | 100% keyless open REST API. |

---

## Step-by-Step User Manual (Start to End)

1. **Daily Check-In & Streak Calibration**:
   - Open the **Command Center** tab (`🏛️`). Click **📅 Edit Start Date** if you want to backdate your current PMO or P-Free streak.
   - Check off your 6 **Daily Energy Transmutation Habits** as you complete them each day (+25 to +40 Aura XP each).
2. **Entering the NNN (No Nut November) War Room**:
   - Click the **🍂 NNN Challenge Hub** tab in the top navigation bar.
   - In **🗓️ 30-Day Tracker & Urge Meter**, click today's date tile on the 30-day grid to log your daily survival status.
   - If you feel an urge building, slide the **NNN Urge Intensity Thermometer** (`0–10`) to read your Defcon level and follow the prescribed somatic countermeasure, then click **🛡️ Log Urge Reading & Claim +25 Aura XP**.
3. **Watching the Top 50 NNN & Retention Videos**:
   - Click the **🎬 Top 50 NNN YouTube Videos** sub-tab inside the NNN Hub.
   - Filter by category (*NNN Survival*, *Neuroscience*, *Transmutation*, *Stoic Discipline*) or search by keyword, and click any video card to play it directly inside the **SeedController Cinema** player.
4. **Scraping Live Reddit Threads & Sharing Funny NNN Stories**:
   - Click **📡 Live Reddit Scraper (API)** to pull live threads from `r/nonutnovember`, `r/SemenRetention`, or `r/NoFap`.
   - Click **😂 Funny Stories & Lore** to read comedic NNN chronicles or publish your own story to NeonDB.
5. **Emergency Urge Defense & 432Hz Breathwork**:
   - Whenever an acute urge strikes, click the red **🚨 Urge SOS** button in the top header to launch the 90-second override timer, or open **🧘 Urge Shield & Breathwork** to run the animated breath pacer alongside the **432Hz Theta Binaural Hypnosis Drone**.
6. **Syncing Across Devices with NeonDB**:
   - Open **🗄️ NeonDB & Blocker Setup**, enter your personal **Unique NeonDB Profile Key**, and click **⬆️ Force Save State to NeonDB** or **⬇️ Load Profile from NeonDB**.
