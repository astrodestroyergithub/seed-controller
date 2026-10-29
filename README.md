# SeedController Sovereign — Full-Stack Retention, NNN War Room & Self-Touching Activity Calendar Platform

Full-stack **Netlify + NeonDB (PostgreSQL)** web application featuring multi-profile state synchronization, a 30-day **Profile-Scoped November Daily Survival Matrix** (`sc_nnn_daily_tracker`), **Year-Wise Immutable NNN Challenge Status** (`sc_nnn_yearly_status_view`), and a **Profile-Scoped Self-Touching & Sexual Activity Records Calendar** (`sc_self_touching_records`).

---

## 1. How to Delete Old Tables & Start 100% Afresh in NeonDB

If you want to wipe out all existing SeedController tables and views in NeonDB (or start in a brand-new NeonDB project/database) so zero constraint or duplicate-key violations can occur:

1. Open [Neon Console](https://console.neon.tech/) and go to **SQL Editor**.
2. Select your database in the top bar.
3. Run the clean drop query below (already included at the top of `sql/schema.sql` / `seedcontroller-neondb-schema.sql`):

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

4. Paste and execute the entire `sql/schema.sql` (`seedcontroller-neondb-schema.sql`) file. It will cleanly drop any old SeedController tables, create all **9 tables** and **1 read-only view**, and seed **4 distinct practitioner profiles** (`default_monk`, `spartan_arjun`, `vedic_sage_108`, `neophyte_seeker`) with zero errors.

---

## 2. Complete Database Architecture (9 Tables + 1 Read-Only View)

| # | Object Name | Type | Primary / Unique Constraint | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `sc_profiles` | Table | `PRIMARY KEY (profile_key)` | Stores each practitioner profile, PMO / P-Free / MO-Free start timestamps, longest streak, Aura XP, Intermittent Fasting state (`fasting_active`, `fasting_start_time`, `fasting_target_hours`), and blocker settings. |
| 2 | `sc_daily_habits` | Table | `UNIQUE (profile_key, habit_code, completed_date)` | Tracks the 6 daily energy transmutation habits completed per profile. |
| 3 | `sc_relapse_logs` | Table | `PRIMARY KEY (id)` | Non-destructive historical relapse & trigger ledger scoped by `profile_key`. |
| 4 | `sc_journal_entries` | Table | `PRIMARY KEY (id)` | Private retention & transmutation journal entries scoped by `profile_key`. |
| 5 | `sc_blogs` | Table | `PRIMARY KEY (id)` | Science-backed articles and community field reports. |
| 6 | `sc_community_checkins` | Table | `PRIMARY KEY (id)` | Brotherhood accountability wall pledges and salutes. |
| 7 | `sc_nnn_daily_tracker` | Table | `UNIQUE (profile_key, challenge_year, day_number)` | Stores the 30-day November Daily Survival Matrix (`survived`, `danger_zone`, `fallen`) and urge thermometer readings (`0–10`) per profile and year. |
| 8 | `sc_nnn_stories` | Table | `PRIMARY KEY (id)` | Comedic NNN survival chronicles, meme lore, and laugh salutes. |
| 9 | `sc_self_touching_records` | Table | `UNIQUE (profile_key, record_date)` | Stores daily self-touching and sexual activity statuses (`No Sexual Activity`, `Only Gooning`, `Masturbation With Ejaculation`, `Masturbation Without Ejaculation`, `Penetrative Sex`, `Oral Sex`, `Light Couple Play`, `Drink Partner's Cum`, `Drink Own Cum`) per profile. |
| 10 | `sc_nnn_yearly_status_view` | View | Read-Only View (`2023`–`2030`) | Computes the immutable NNN verdict (`'November Not Over Yet'`, `'Failed'`, `'Success'`) per `profile_key` and `challenge_year`. |

---

## 3. Core Multi-Profile & Immutability Features

1. **Multi-Profile Synchronization Across All Sections (`sc_profiles`)**:
   - Select any profile (`default_monk`, `spartan_arjun`, `vedic_sage_108`, `neophyte_seeker`, or create your own in **🗄️ NeonDB & Blocker Setup**) from the **Active Profile (`sc_profiles`)** dropdown in the top header, Command Center, NNN Survival Matrix, Year-Wise NNN Status, or Self-Touching Calendar.
   - Switching profiles immediately updates the **Intermittent Fasting Tracker** (active autophagy timer vs. standby and protocol `16:8`, `18:6`, `20:4`, `24h`), **PMO / P-Free / MO-Free Streak Timers**, **3D Evolving Seed Orb**, **Daily Transmutation Habits**, **Historical Relapse Ledger**, **Private Journal**, **November Daily Survival Matrix**, **Year-Wise NNN Status**, and **Self-Touching Calendar**.
2. **Profile-Scoped November Daily Survival Matrix (`sc_nnn_daily_tracker`)**:
   - Scoped to the selected `profile_key` and `challenge_year` (`2023`–`2030`).
   - **Elapsed Date Lock**: Any November date that has already passed (`date < today`) is locked in **Read-Only Mode (`🔒 Read-Only`)** on both the frontend and backend (`netlify/functions/api.js`, HTTP 403).
   - **Current & Future Dates Editable**: Any current or future November date (`date >= today`) is marked **`✏️ Editable`** and updates `sc_nnn_daily_tracker` exclusively for the active profile.
3. **Year-Wise Immutable NNN Challenge Status (`sc_nnn_yearly_status_view`)**:
   - Evaluates whether the selected profile failed or succeeded in NNN across years (`2023`–`2030`).
   - Status is strictly read-only and immutable with three allowed values: `'November Not Over Yet'`, `'Failed'`, and `'Success'`.
4. **Profile-Scoped Self-Touching & Sexual Activity Records Calendar (`sc_self_touching_records`)**:
   - Month-wise 7-column calendar across years (`2023`–`2030`) under **📅 Self-Touching & Activity Calendar**.
   - **Elapsed Dates Immutable**: Past dates (`< today`) automatically lock as **`🔒 Immutable`**.
   - **Current & Future Dates Editable**: Click any current or future date (`>= today`) to set or update one of the 9 exact statuses:
     - `'No Sexual Activity'`
     - `'Only Gooning'`
     - `'Masturbation With Ejaculation'`
     - `'Masturbation Without Ejaculation'`
     - `'Penetrative Sex'`
     - `'Oral Sex'`
     - `'Light Couple Play'`
     - `"Drink Partner's Cum"`
     - `'Drink Own Cum'`
   - Includes a **Between 2 Dates** filter (`From Date` and `To Date`), a **Status Filter** dropdown and quick-filter chips, and a synchronized matching records table.

---

## 4. Step-by-Step Fresh Setup & Deployment Guide (NeonDB + GitHub/CLI + Netlify)

1. **Reset / Initialize NeonDB Database**:
   - Log in to [Neon Console](https://console.neon.tech/), open **SQL Editor**, paste the entire `sql/schema.sql` (`seedcontroller-neondb-schema.sql`), and click **Run**.
   - Copy your pooled PostgreSQL connection string from the Neon Dashboard (`postgresql://USER:PASSWORD@ep-xyz-pooler.region.aws.neon.tech/DBNAME?sslmode=require`).
2. **Unzip Project & Install Dependencies**:
   - Extract `seedcontroller-netlify.zip` into a fresh folder on your computer.
   - Open a terminal in that folder and run `npm install` so the `pg` driver is installed for `netlify/functions/api.js`.
3. **Deploy to Netlify & Set `DATABASE_URL`**:
   - Push the folder to a fresh GitHub repository and connect it in [Netlify](https://app.netlify.com/) (**Add new site → Import an existing project**), OR deploy directly using the Netlify CLI (`npx netlify-cli deploy --prod`).
   - In **Netlify Site Configuration → Environment Variables**, add:
     - **Key**: `DATABASE_URL`
     - **Value**: Your NeonDB PostgreSQL connection string.
   - Trigger a deploy (**Deploys → Trigger deploy → Deploy site**) so the serverless functions pick up `DATABASE_URL`.
   - Open your live Netlify site URL—the header badge will turn solid green (**`● NeonDB Connected`**).
