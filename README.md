# SeedController Sovereign — Full-Stack Retention, Bio-Transmutation, NNN War Room & Self-Touching Activity Calendar Platform

**SeedController Sovereign** is a full-stack **Netlify Serverless + NeonDB (PostgreSQL)** web application designed for structured semen retention, 90-day neurological rebooting, **No Nut November (NNN)** campaign tracking, and daily **Self-Touching & Intimate Activity** logging across multiple practitioner profiles.

---

## Table of Contents

1. [Platform Overview & What It Holds for the User](#1-platform-overview--what-it-holds-for-the-user)
2. [Step-by-Step Fresh Setup: Deleting Old Tables & Creating the Database](#2-step-by-step-fresh-setup-deleting-old-tables--creating-the-database)
3. [Step-by-Step Deployment to Netlify (GitHub or Netlify CLI)](#3-step-by-step-deployment-to-netlify-github-or-netlify-cli)
4. [Complete Database Architecture (9 Tables + 1 Read-Only View)](#4-complete-database-architecture-9-tables--1-read-only-view)
5. [Master User Manual: How to Use Every Module Effectively (Start to End)](#5-master-user-manual-how-to-use-every-module-effectively-start-to-end)
   - [5.1 Multi-Profile Management & Creating Custom Profiles (`sc_profiles`)](#51-multi-profile-management--creating-custom-profiles-sc_profiles)
   - [5.2 Command Center (Dashboard): 3D Seed Orb, Multi-Track Timers, Habits & Fasting](#52-command-center-dashboard-3d-seed-orb-multi-track-timers-habits--fasting)
   - [5.3 NNN War Room: Profile-Scoped 30-Day November Survival Matrix (`sc_nnn_daily_tracker`)](#53-nnn-war-room-profile-scoped-30-day-november-survival-matrix-sc_nnn_daily_tracker)
   - [5.4 NNN Urge Intensity Thermometer & Defcon Countermeasures (`0–10`)](#54-nnn-urge-intensity-thermometer--defcon-countermeasures-010)
   - [5.5 Year-Wise Immutable NNN Challenge Status (`sc_nnn_yearly_status_view`, `2023–2030`)](#55-year-wise-immutable-nnn-challenge-status-sc_nnn_yearly_status_view-20232030)
   - [5.6 Top 50 NNN YouTube Cinema, Live Reddit Scraper, Funny Stories, History & Visual Gallery](#56-top-50-nnn-youtube-cinema-live-reddit-scraper-funny-stories-history--visual-gallery)
   - [5.7 Self-Touching & Intimate Activity Records Calendar (`sc_self_touching_records`)](#57-self-touching--intimate-activity-records-calendar-sc_self_touching_records)
   - [5.8 90-Day Reboot Plan, 8 Rank Tiers, 12-Week Ladder & Non-Destructive Relapse Ledger](#58-90-day-reboot-plan-8-rank-tiers-12-week-ladder--non-destructive-relapse-ledger)
   - [5.9 Emergency Urge SOS, 432Hz Binaural Breathwork & 24/7 AI Neural Mentor](#59-emergency-urge-sos-432hz-binaural-breathwork--247-ai-neural-mentor)
   - [5.10 Science Feed, Blogs, Private Journal, Brotherhood Wall & Porn Blocker Generator](#510-science-feed-blogs-private-journal-brotherhood-wall--porn-blocker-generator)
6. [Live Public APIs & Optional API Keys Guide](#6-live-public-apis--optional-api-keys-guide)
7. [Extending Years & Customizing the Platform](#7-extending-years--customizing-the-platform)

---

## 1. Platform Overview & What It Holds for the User

SeedController Sovereign combines 9 integrated modules in a single responsive interface backed by NeonDB PostgreSQL:

| Navigation Tab | Primary Function for the User | Backing NeonDB Table / API |
| :--- | :--- | :--- |
| **🏛️ Command Center** | Live PMO / P-Free / MO-Free timers, 8-stage 3D Evolving Seed Orb (`396 Hz–963 Hz`), 6 Daily Energy Transmutation Habits, and Profile-Scoped Intermittent Fasting (`16:8`, `18:6`, `20:4`, `24h`). | `sc_profiles`, `sc_daily_habits`, DummyJSON Quotes API |
| **🍂 NNN Challenge Hub** | Profile-scoped 30-day **November Daily Survival Matrix**, **Urge Thermometer (`0–10`)**, **Year-Wise Immutable NNN Status (`2023–2030`)**, **Top 50 YouTube Cinema**, **Live Reddit Scraper**, **Funny Stories**, **History Timeline**, and **Visual Gallery**. | `sc_nnn_daily_tracker`, `sc_nnn_yearly_status_view`, `sc_nnn_stories`, Reddit / YouTube / Museum / AI APIs |
| **📅 Self-Touching & Activity Calendar** | Large 7-column month-wise calendar (`2023–2030`) per profile with automatic elapsed-date immutability, 9 official activity statuses, **Between 2 Dates** filter, and **Status Filter**. | `sc_self_touching_records` |
| **📈 90-Day Reboot & Ranks** | 8 unlockable Rank Badges, 12-Week Rising Drop Visual Ladder, Dopamine D2 / Androgen Recovery Chart, and Non-Destructive Historical Relapse Ledger. | `sc_relapse_logs`, `sc_profiles` |
| **🧘 Urge Shield & Breathwork** | 3-mode animated Breathwork Pacer (`4-4-4-4 Box`, `4-7-8 Vagal`, `6-3-6 Ojas`), synthesized **432Hz Theta Binaural Hypnosis Drone**, and **24/7 AI Neural Mentor**. | Web Audio API, `sc_profiles` |
| **🧬 Science & Live APIs** | Curated clinical neuroendocrinology curriculum plus live **NIH NCBI PubMed E-Utilities API** search and live community pulse. | NCBI PubMed API, Reddit JSON |
| **📰 Blogs & Articles** | Science-backed articles and community field reports with full-article modal reader, category filter, upvoting, and publishing form. | `sc_blogs` |
| **📓 Journal & Brotherhood** | Private retention & transmutation journal (`Energy 1–10`, `Urge 0–10`, mood tags) and Brotherhood Accountability Check-In Wall. | `sc_journal_entries`, `sc_community_checkins` |
| **🗄️ NeonDB & Blocker Setup** | Live NeonDB diagnostic console, custom profile management, `/etc/hosts` trigger-domain blocker generator, and portable JSON backup export. | `sc_profiles` |

---

## 2. Step-by-Step Fresh Setup: Deleting Old Tables & Creating the Database

Follow these exact steps to start completely fresh in NeonDB so zero constraint or duplicate-key violations can occur:

### Step 2.1: Open the NeonDB SQL Editor
1. Log in to [Neon Console](https://console.neon.tech/).
2. Select your project and click **SQL Editor** in the left navigation sidebar.
3. Confirm your target database name is selected in the top dropdown bar.

### Step 2.2: Delete Existing SeedController Tables & View Cleanly
To remove any older SeedController tables and constraints (while leaving any other unrelated tables in your database untouched), run:

```sql
DROP VIEW IF EXISTS sc_nnn_yearly_status_view CASCADE;

DROP TABLE IF EXISTS
    sc_self_touching_records,
    sc_nnn_stories,
    sc_nnn_daily_tracker,
    sc_community_checkins,
    sc_blogs,
    sc_journal_entries,
    sc_relapse_logs,
    sc_daily_habits,
    sc_profiles
CASCADE;
```

*(Note: This exact `DROP VIEW` and `DROP TABLE ... CASCADE` block is already included at the top of `sql/schema.sql` / `seedcontroller-neondb-schema.sql`).*

### Step 2.3: Run the Fresh Schema & Multi-Profile Seed Script
1. Open `sql/schema.sql` (or `seedcontroller-neondb-schema.sql`), copy the entire script, paste it into the **NeonDB SQL Editor**, and click **Run**.
2. This creates all **9 tables** and **1 read-only view (`sc_nnn_yearly_status_view`)**, and seeds **4 distinct practitioner profiles** (`default_monk`, `spartan_arjun`, `vedic_sage_108`, `neophyte_seeker`) with distinct streaks, fasting protocols, habits, relapse histories, journals, multi-year NNN matrices, and self-touching calendar logs.
3. Go to **Dashboard → Connection Details** in the Neon Console and copy your pooled PostgreSQL connection string:
   ```text
   postgresql://USER:PASSWORD@ep-xyz-pooler.region.aws.neon.tech/DBNAME?sslmode=require
   ```

---

## 3. Step-by-Step Deployment to Netlify (GitHub or Netlify CLI)

1. **Extract the Project Archive**:
   Unzip `seedcontroller-netlify.zip` into a clean folder on your computer.
2. **Install Node Dependencies**:
   Open a terminal in that folder and run:
   ```bash
   npm install
   ```
   This installs the `pg` PostgreSQL driver required by `netlify/functions/api.js`.
3. **Deploy to Netlify**:
   * **Option A — Via GitHub (Recommended)**:
     1. Push the folder to a GitHub repository.
     2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site → Import an existing project → GitHub**.
     3. Select your repository. Keep **Build command** blank, **Publish directory** set to `.`, and **Functions directory** set to `netlify/functions`.
   * **Option B — Via Netlify CLI**:
     Run `npx netlify-cli deploy --prod` from the project directory.
4. **Configure `DATABASE_URL` in Netlify**:
   * In your Netlify Site Dashboard, navigate to **Site configuration → Environment variables → Add a variable**.
   * Set **Key** = `DATABASE_URL` and **Value** = your NeonDB connection string from Step 2.3.
   * Navigate to **Deploys → Trigger deploy → Deploy site** so the serverless functions load `DATABASE_URL`.
5. **Verify Live Connection**:
   Open your live Netlify URL. The top-right status pill will display a solid green dot (**`● NeonDB Connected`**).

---

## 4. Complete Database Architecture (9 Tables + 1 Read-Only View)

| # | Name | Type | Key / Unique Constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `sc_profiles` | Table | `PRIMARY KEY (profile_key)` | Practitioner profile metadata, PMO / P-Free / MO-Free start timestamps, longest streak, Aura XP, fasting state (`fasting_active`, `fasting_start_time`, `fasting_target_hours`), and blocker settings. |
| 2 | `sc_daily_habits` | Table | `UNIQUE (profile_key, habit_code, completed_date)` | Daily completed transmutation habits per profile. |
| 3 | `sc_relapse_logs` | Table | `PRIMARY KEY (id)` | Non-destructive historical relapse & trigger ledger scoped by `profile_key`. |
| 4 | `sc_journal_entries` | Table | `PRIMARY KEY (id)` | Private retention & transmutation journal entries scoped by `profile_key`. |
| 5 | `sc_blogs` | Table | `PRIMARY KEY (id)` | Science-backed articles and community field reports. |
| 6 | `sc_community_checkins` | Table | `PRIMARY KEY (id)` | Brotherhood accountability wall pledges and salutes. |
| 7 | `sc_nnn_daily_tracker` | Table | `UNIQUE (profile_key, challenge_year, day_number)` | 30-day November Daily Survival Matrix (`survived`, `danger_zone`, `fallen`) and urge thermometer logs (`0–10`) per profile and year. |
| 8 | `sc_nnn_stories` | Table | `PRIMARY KEY (id)` | Funny NNN survival chronicles, superpower meme lore, and laugh salutes. |
| 9 | `sc_self_touching_records` | Table | `UNIQUE (profile_key, record_date)` | Daily self-touching and intimate activity records across all 9 official statuses per profile. |
| 10 | `sc_nnn_yearly_status_view` | View | Read-Only View (`2023–2030`) | Computes the immutable NNN verdict (`'November Not Over Yet'`, `'Failed'`, `'Success'`) per `profile_key` and `challenge_year`. |

---

## 5. Master User Manual: How to Use Every Module Effectively (Start to End)

### 5.1 Multi-Profile Management & Creating Custom Profiles (`sc_profiles`)

The platform comes pre-loaded with 4 distinct practitioner archetypes in `sc_profiles` so you can immediately see how different streaks, fasting protocols, NNN matrices, and activity calendars behave:
* **`default_monk` (*Sovereign Initiate*)**: 14d PMO / 21d P-Free streak, `16:8` Fasting Standby, NNN 2023 Success, 2024 Failed (Day 11), 2025 Success, 2026 Active.
* **`spartan_arjun` (*Spartan Commander Arjun*)**: 42d PMO / 56d P-Free streak, **Active `18:6` Warrior Monk Fast** (in Autophagy Zone), NNN 2023 Failed (Day 19), 2024 Success, 2025 Success, 2026 Active.
* **`vedic_sage_108` (*Brahmacharya Sage 108*)**: 95d PMO / 120d P-Free streak, **Active `20:4` Deep Autophagy Fast**, 6/6 daily habits completed, NNN 2023–2025 Flawless Success.
* **`neophyte_seeker` (*Reboot Challenger*)**: 3d PMO / 7d P-Free streak, `24h` Solar Reset Standby, NNN 2023–2026 early slips logged for honest accountability.

**How to Switch Profiles**:
* Use any of the 5 synchronized **Profile Key (`sc_profiles`)** dropdowns located in the **Top Header**, **Command Center**, **November Daily Survival Matrix**, **Year-Wise NNN Status**, or **Self-Touching Calendar**.
* Selecting a profile updates every widget on the platform simultaneously and fetches the latest records for that `profile_key` from NeonDB.

**How to Create Your Own Custom Profile (3 Methods)**:
1. **Method 1 — Click `+ New` in the Header or `➕ Create Custom Profile` in the Command Center**:
   * Enter a **Unique Profile Key** (e.g., `rahul_sovereign_01`), **Practitioner Display Name** (e.g., `Rahul Sovereign`), **Target Reboot Goal** (`30`, `60`, `90`, `180`, or `365` days), and **Fasting Protocol** (`16:8`, `18:6`, `20:4`, or `24h`).
   * Click **🚀 Create & Switch to Profile**. The profile is saved to `sc_profiles` in NeonDB with a fresh Day-0 timer, an empty November Survival Matrix, and an empty Self-Touching Calendar.
2. **Method 2 — Via the `🗄️ NeonDB & Blocker Setup` Tab**:
   * Enter your new key in **Unique NeonDB Profile Key** and your name in **Practitioner Title / Name**, then click **⬆️ Force Save State to NeonDB**.
3. **Method 3 — Via SQL in NeonDB**:
   * Run `INSERT INTO sc_profiles (profile_key, display_name) VALUES ('my_custom_key', 'My Name') ON CONFLICT (profile_key) DO NOTHING;` in the NeonDB SQL Editor.

---

### 5.2 Command Center (Dashboard): 3D Seed Orb, Multi-Track Timers, Habits & Fasting

1. **Interactive 3D Evolving Seed / Aura Orb**:
   * Drag across the `<canvas>` orb with your mouse or finger to rotate the 110-node golden-spiral constellation sphere in 3D space and trigger a bio-energetic pulse.
   * As your PMO streak advances, the orb automatically evolves across 8 stages and harmonic frequencies (`Stage I: Ember Seed • 396 Hz` up to `Stage VIII: Cosmic Singularity • 963 Hz`).
2. **Multi-Track Second-by-Second Streak Counter & Start Date Calibration**:
   * Tracks your primary **PMO-Free Streak** (`Days`, `Hours`, `Minutes`, `Seconds`) alongside separate **P-Free (Visual Purity)**, **MO-Free (Seed Retained)**, and **All-Time Best Streak** counters.
   * Click **📅 Edit Start Date** to backdate your PMO or P-Free start timestamp to the exact date and minute your current streak began; click **Save & Sync** to persist in `sc_profiles`.
3. **Daily Energy Transmutation Habits (`sc_daily_habits`)**:
   * Click any of the 6 daily habits (*Cold Shower*, *10-Min Pranayama*, *Compound Strength*, *90-Min Deep Work*, *Zero Edging*, *Digital Sunset*) to toggle completion for the active profile today and earn `+25` to `+40 Aura XP`.
4. **Profile-Scoped Intermittent Fasting Tracker**:
   * Select your protocol (`16:8 Lean Gains`, `18:6 Warrior Monk`, `20:4 Deep Autophagy`, or `24h Full Solar Reset`).
   * Click **⚡ Start Fasting Window** to begin the live count-up timer and track your metabolic stage (*Fed / Baseline* → *Lipolysis Ramp-Up* → *🔥 Ketosis & BDNF Active* at 12h+ → *🧬 Deep Autophagy & HGH Surge* at 18h+).
   * Click **⏹️ Complete Fast (+35 Aura XP)** when your window concludes.
5. **Discreet Privacy Blur Mode (`🔒 Discreet Mode`)**:
   * Click **🔒 Discreet Mode** in the top header at any time in public spaces to apply an instant `14px` privacy blur over all content; click **Unlock View** to restore.

---

### 5.3 NNN War Room: Profile-Scoped 30-Day November Survival Matrix (`sc_nnn_daily_tracker`)

Open the **🍂 NNN Challenge Hub** tab in the main navigation bar:
1. **Select Profile & Challenge Year**:
   * Use the **Profile Key (`sc_profiles`)** dropdown and **Challenge Year** dropdown (`November 2023` through `November 2030`) at the top of the **November Daily Survival Matrix**.
2. **Understand Elapsed-Date Immutability (`🔒 Read-Only` vs `✏️ Editable`)**:
   * **Elapsed Dates (`< Today`)**: Any November date that has already passed (for example, all 30 days of November 2023, 2024, and 2025, or past days in November of the current year) is automatically locked with a **`🔒 Read-Only`** badge. Clicking an elapsed date displays a read-only notice, and `netlify/functions/api.js` enforces an HTTP 403 guard on the server.
   * **Current & Future Dates (`>= Today`)**: Any current or future November date displays an **`✏️ Editable`** badge.
   * **Testing Mid-November Lock Behavior**: Switch the **Elapsed Lock Reference** dropdown from `Live System Date` to `Demo Mid-Nov (Nov 15, 2026)` to preview how `Nov 1–14` lock as `🔒 Read-Only` while `Nov 15–30` remain `✏️ Editable`.
3. **Updating a Day's Status for the Active Profile**:
   * Click any **`✏️ Editable`** tile (`Nov 1` to `Nov 30`) to cycle its status:
     - **🛡️ Clean (`survived`)** — Awards `+25 Aura XP` and logs a clean day.
     - **🔥 Urge Won (`danger_zone`)** — Logs a high-urge day survived intact.
     - **💀 Slip (`fallen`)** — Logs a failure on that day (which immediately marks that year's NNN verdict as `'Failed'`).
     - **⏳ Pending (`unlogged`)** — Clears the log for that day in `sc_nnn_daily_tracker`.
   * Every click updates `sc_nnn_daily_tracker` in NeonDB **exclusively for the selected `profile_key` and `challenge_year`**.

---

### 5.4 NNN Urge Intensity Thermometer & Defcon Countermeasures (`0–10`)

Located on the right side of the **🗓️ 30-Day Tracker & Urge Meter** pane:
1. Drag the **Urge Intensity Slider (`0–10`)** to match your current internal urge voltage:
   * **`0–3` (`DEFCON 5 • SOVEREIGN CALM`)**: Steady prefrontal control; channel energy into deep work.
   * **`4–6` (`DEFCON 3 • ELEVATED VOLTAGE`)**: Prescribes immediate posture shift, 10 slow nasal breaths, and leaving idle screens.
   * **`7–10` (`DEFCON 1 • RED ALERT OVERRIDE`)**: Prescribes dropping your device immediately, 30 pushups to failure, and a 3-minute cold water shock.
2. Add an optional trigger note and click **🛡️ Log Urge Reading & Claim +25 Aura XP** to save the reading into `sc_nnn_daily_tracker` for the active profile.

---

### 5.5 Year-Wise Immutable NNN Challenge Status (`sc_nnn_yearly_status_view`, `2023–2030`)

Scroll down below the 30-Day Matrix (or click **🏆 Year-Wise NNN Status** in the NNN sub-bar):
1. Select any **Profile Key (`sc_profiles`)** and **Inspect Challenge Year (`2023`–`2030`)**.
2. Inspect both the **Single-Year Immutable Verdict Banner** and the **Multi-Year Breakdown Table**.
3. Each year is evaluated strictly to one of **3 read-only, immutable values**:
   * **`🔒 Failed`**: The profile has 1 or more `'fallen'` days logged in `sc_nnn_daily_tracker` for that year (or November has ended with 0 survived days). Displays the exact date of the first slip (e.g., `✕ Failed on Nov 11, 2024`).
   * **`🔒 November Not Over Yet`**: Zero failures are logged AND the current date is on or before November 30 of that challenge year (`CURRENT_DATE <= MAKE_DATE(challenge_year, 11, 30)`).
   * **`🔒 Success`**: November 30 of that challenge year has passed with zero failures and survived days logged.

---

### 5.6 Top 50 NNN YouTube Cinema, Live Reddit Scraper, Funny Stories, History & Visual Gallery

Use the sub-navigation pills inside the **🍂 NNN Challenge Hub**:
1. **🎬 Top 50 NNN YouTube Videos**:
   * Filter by category (*All*, *NNN Survival*, *Neuroscience*, *Transmutation*, *Stoic Discipline*) or type a keyword in the search box.
   * Click any of the 50 video cards to watch it immediately inside the embedded privacy-enhanced **SeedController Cinema (`youtube-nocookie.com`)** player at the top of the pane.
2. **📡 Live Reddit Scraper (API)**:
   * Select a community (`r/nonutnovember`, `r/SemenRetention`, `r/NoFap`, `r/Stoicism`, `r/getdisciplined`) and click **🔄 Scrape Live Threads** to pull real-time discussions using the 3-tier keyless pipeline.
3. **😂 Funny Stories & Lore (`sc_nnn_stories`)**:
   * Click **😂 Laugh Salute** on any comedic NNN chronicle to increment its salute count in NeonDB, or click **✍️ Share Your NNN Story** to publish your own war-room story (`+35 Aura XP`).
4. **📜 History of NNN (`1500 BCE – 2026`)**:
   * Explore the 6 historical epochs from Vedic *Brahmacharya* and Classical Greek Olympic *Taracheia* to the 2003 Jiang et al. study and modern global NNN campaigns.
5. **🖼️ Visual Gallery & 🔑 API Keys Vault**:
   * Switch between the 4 keyless art engines (*Art Institute of Chicago Open API*, *Wikimedia Commons API*, *Pollinations.ai Live AI Mural Generator*, and *NASA Cosmic API* with pre-filled `DEMO_KEY`) or save optional keys in the **🔑 Live API Keys Vault**.

---

### 5.7 Self-Touching & Intimate Activity Records Calendar (`sc_self_touching_records`)

Click **📅 Self-Touching & Activity Calendar** in the main navigation bar:
1. **Select Active Profile (`sc_profiles`)**:
   * Choose any profile from the **Active Profile Key (`sc_profiles`)** dropdown at the top-right. The 4 KPI cards (*Total Logged Dates*, *No Sexual Activity Days*, *Immutable Elapsed Logs*, *Current / Future Logs*), the 7-column month calendar, and the filtered table below immediately update for that profile.
2. **Navigate Months & Years (`2023–2030`)**:
   * Use the **Month** dropdown (`January`–`December`), **Year** dropdown (`2023`–`2030`), **`◀` / `▶`** buttons, or **Today** button.
3. **Elapsed-Date Immutability vs. Current/Future Date Editing**:
   * **Elapsed Dates (`< Today`)**: Automatically display **`🔒 Immutable`**. Clicking any elapsed date shows a read-only lock toast, and `netlify/functions/api.js` blocks any modification with HTTP 403.
   * **Current & Future Dates (`>= Today`)**: Display **`✏️ Editable`**. Clicking any current or future date opens the **Self-Touching & Sexual Activity Status Editor Modal**.
4. **Assigning Any of the 9 Official Statuses**:
   * In the modal, select one of the 9 exact statuses:
     1. `'No Sexual Activity'` (`ST_01`)
     2. `'Only Gooning'` (`ST_02`)
     3. `'Masturbation With Ejaculation'` (`ST_03`)
     4. `'Masturbation Without Ejaculation'` (`ST_04`)
     5. `'Penetrative Sex'` (`ST_05`)
     6. `'Oral Sex'` (`ST_06`)
     7. `'Light Couple Play'` (`ST_07`)
     8. `"Drink Partner's Cum"` (`ST_08`)
     9. `'Drink Own Cum'` (`ST_09`)
   * Add optional notes and click **💾 Save Status to NeonDB** (or click **🗑️ Clear Future Date Log** to remove a future log).
   * The frontend transmits the neutral `status_code` (`ST_01`–`ST_09`) over the network so no browser extension or WAF keyword filter can interfere, and `api.js` writes the exact status string into `sc_self_touching_records`.
5. **Filtering Between 2 Dates & By Activity Status**:
   * **Between 2 Dates**: Pick a **From Date** and **To Date** to highlight only calendar cells within that window and list all dates in that range in the table below.
   * **Filter By Status**: Use the **Filter Dates By Status** dropdown or click any of the 9 **Quick-Filter Status Chips** to isolate dates with that exact status. Click **🔄 Reset All Filters** to return to the full view.

---

### 5.8 90-Day Reboot Plan, 8 Rank Tiers, 12-Week Ladder & Non-Destructive Relapse Ledger

Open **📈 90-Day Reboot & Ranks**:
* **8 Rank Progression Badges**: Automatically unlock as your PMO streak crosses `Day 0`, `Day 3`, `Day 7`, `Day 14`, `Day 30`, `Day 60`, `Day 90`, and `Day 180`.
* **12-Week Visual Ladder & Neuro-Recovery Trajectory Chart**: Visualizes your completion percentage across each physiological milestone alongside the Dopamine D2 & Androgen Sensitivity curves.
* **Non-Destructive Historical Relapse Ledger (`sc_relapse_logs`)**: Click **⚠️ Log Relapse / Reset** if a slip occurs. Select which track was affected (`Full PMO Reset`, `P-Only Slip`, or `MO-Only Slip`), the primary trigger, emotional state, and your lesson learned. Your `longest_streak_days` and historical logs in `sc_relapse_logs` are permanently preserved.

---

### 5.9 Emergency Urge SOS, 432Hz Binaural Breathwork & 24/7 AI Neural Mentor

1. **Emergency Urge SOS (`🚨 Urge SOS` Header Button)**:
   * Click **🚨 Urge SOS** whenever an acute urge wave hits to launch a 90-second countdown timer and 4-step physical override checklist. Click **✅ I Conquered This Urge (+40 Aura XP)** once the wave passes.
2. **3-Mode Paced Breathwork Ring & 432Hz Hypnosis Drone (`🧘 Urge Shield & Breathwork`)**:
   * Choose **4-4-4-4 Box Breath**, **4-7-8 Vagal Brake**, or **6-3-6 Ojas Draw** and click **▶️ Start Breathwork Session** (`+10 Aura XP` per completed cycle).
   * Click **🔊 Play 432Hz Hypnosis Drone** to synthesize a live 6Hz Alpha-Theta binaural beat via the Web Audio API.
3. **24/7 AI Neural Mentor**:
   * Click a quick protocol chip (*Late-Night Urge*, *Dopamine Flatline*, *Transmute Energy*) or type any question to receive streak-calibrated guidance.

---

### 5.10 Science Feed, Blogs, Private Journal, Brotherhood Wall & Porn Blocker Generator

* **🧬 Science & Live APIs**: Select a research query and click **🔄 Query PubMed API** to fetch live peer-reviewed studies from the NIH NCBI E-Utilities API.
* **📰 Blogs & Articles (`sc_blogs`)**: Click **Read Full** on any article to open the full modal reader, click `🔥` to upvote, or click **✍️ Publish New Article** (`+50 Aura XP`).
* **📓 Journal & Brotherhood (`sc_journal_entries` & `sc_community_checkins`)**: Record private journal entries with `Energy (1–10)` and `Urge (0–10)` sliders (`+30 Aura XP`), and post public pledges on the Brotherhood Wall (`+20 Aura XP`).
* **🗄️ NeonDB & Blocker Setup**: Click **⬇️ Download `/etc/hosts` Blocklist** to generate a system-level `0.0.0.0` hosts shield file (`seedcontroller-hosts-shield.txt`), or click **📦 Export Full JSON Backup** to download a portable JSON snapshot of your entire state.

---

## 6. Live Public APIs & Optional API Keys Guide

All live feeds work **100% keyless out of the box**. Optional keys can be added either in the **🔑 Live API Keys Vault** inside the NNN Hub or in **Netlify Environment Variables**:

| Module | Built-In 100% Keyless Engine (Active by Default) | Optional API Key | How to Obtain Free Key (Optional) |
| :--- | :--- | :--- | :--- |
| **NNN Visual Gallery** | **Art Institute of Chicago API** + **Wikimedia Commons API** + **Pollinations.ai Live AI** + **NASA Open API (`DEMO_KEY`)** | `PEXELS_API_KEY`, `UNSPLASH_ACCESS_KEY`, `PIXABAY_API_KEY` | No key needed! Optional keys available at [api.nasa.gov](https://api.nasa.gov/), [pexels.com/api](https://www.pexels.com/api/), or [unsplash.com/developers](https://unsplash.com/developers). |
| **Live Reddit Scraper** | **Reddit Public JSON** + **PullPush.io API** + **Hacker News Algolia API** | `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET` | 100% optional; keyless 3-tier scraper runs automatically. |
| **Top 50 YouTube Cinema** | **50-Video Curated NNN & Retention Master Index** + `youtube-nocookie.com` Embed | `YOUTUBE_API_KEY` | Enable **YouTube Data API v3** in [Google Cloud Console](https://console.cloud.google.com/). |
| **Neuroscience Feed** | **NIH NCBI PubMed E-Utilities API** (`3 req/sec` keyless) | `NCBI_API_KEY` | Optional key at [ncbi.nlm.nih.gov/account/settings](https://www.ncbi.nlm.nih.gov/account/settings/) raises limit to `10 req/sec`. |
| **Daily Stoic Quotes** | **DummyJSON Quotes REST API** | *(None Required)* | 100% open keyless API. |

---

## 7. Extending Years & Customizing the Platform

The platform supports years **`2023` through `2030`** across the November Daily Survival Matrix, Year-Wise NNN Status View, and Self-Touching Calendar. To extend the year range further in the future (e.g., to `2035`):
1. **In NeonDB (`sql/schema.sql` & `netlify/functions/api.js`)**: Change `SELECT generate_series(2023, 2030) AS challenge_year` inside `sc_nnn_yearly_status_view` to `SELECT generate_series(2023, 2035) AS challenge_year`.
2. **In `index.html` / `app.js`**: Add `<option value="2031">...</option>` through `2035` to `#nnnMatrixYearSelect`, `#nnnStatusYearSelect`, and `#stYearSelect`, and include the new years in `yearsToList`.
