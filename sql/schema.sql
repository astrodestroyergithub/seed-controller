-- =====================================================================
-- SeedController Sovereign — Complete Fresh NeonDB PostgreSQL Schema
-- Paste and execute this entire script inside the NeonDB SQL Editor:
-- https://console.neon.tech -> SQL Editor -> Run
--
-- STEP 1: Drops all existing SeedController tables & views cleanly
--         so zero constraint or duplicate-key violations can occur.
-- STEP 2: Recreates all 9 tables + 1 immutable Year-Wise NNN Status view.
-- STEP 3: Seeds all 4 profiles with distinct Streaks, Fasting states,
--         Habits, Relapse Logs, Journals, Multi-Year NNN Survival Matrices,
--         and Self-Touching Calendar records.
-- =====================================================================

-- =====================================================================
-- STEP 1: CLEANLY DELETE EXISTING SEEDCONTROLLER VIEW & TABLES
-- =====================================================================
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

-- =====================================================================
-- STEP 2: CREATE FRESH TABLES & IMMUTABLE YEAR-WISE NNN VIEW
-- =====================================================================

-- 1. User Profiles & Streak / Fasting / Blocker State
CREATE TABLE sc_profiles (
    profile_key VARCHAR(64) PRIMARY KEY,
    display_name VARCHAR(120) NOT NULL DEFAULT 'Sovereign Initiate',
    pmo_start_time TIMESTAMPTZ NOT NULL DEFAULT (NOW() - INTERVAL '14 days'),
    p_start_time TIMESTAMPTZ NOT NULL DEFAULT (NOW() - INTERVAL '21 days'),
    mo_start_time TIMESTAMPTZ NOT NULL DEFAULT (NOW() - INTERVAL '14 days'),
    longest_streak_days INTEGER NOT NULL DEFAULT 21,
    aura_points INTEGER NOT NULL DEFAULT 420,
    target_days INTEGER NOT NULL DEFAULT 90,
    fasting_active BOOLEAN NOT NULL DEFAULT FALSE,
    fasting_start_time TIMESTAMPTZ,
    fasting_target_hours INTEGER NOT NULL DEFAULT 16,
    blocker_strictness VARCHAR(32) NOT NULL DEFAULT 'strict',
    custom_blocked_domains TEXT NOT NULL DEFAULT 'adultsite.example,triggerhub.example,nsfwscroll.example',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Daily Energy Transmutation Habits Log (Scoped by profile_key)
CREATE TABLE sc_daily_habits (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    habit_code VARCHAR(64) NOT NULL,
    habit_label VARCHAR(160) NOT NULL,
    aura_reward INTEGER NOT NULL DEFAULT 25,
    completed_date DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE(profile_key, habit_code, completed_date)
);

-- 3. Non-Destructive Historical Relapse Ledger (Scoped by profile_key)
CREATE TABLE sc_relapse_logs (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    streak_type VARCHAR(16) NOT NULL DEFAULT 'PMO',
    streak_days_achieved NUMERIC(6,2) NOT NULL DEFAULT 0,
    trigger_category VARCHAR(80) NOT NULL,
    emotional_state VARCHAR(80) NOT NULL,
    lesson_learned TEXT NOT NULL,
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Private Retention & Transmutation Journal Entries (Scoped by profile_key)
CREATE TABLE sc_journal_entries (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    title VARCHAR(200) NOT NULL,
    mood VARCHAR(60) NOT NULL,
    energy_level INTEGER NOT NULL DEFAULT 8,
    urge_intensity INTEGER NOT NULL DEFAULT 2,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Science-Backed Blogs & Community Field Reports
CREATE TABLE sc_blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(220) NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'SeedController Research',
    category VARCHAR(80) NOT NULL DEFAULT 'Neuroscience',
    read_time VARCHAR(32) NOT NULL DEFAULT '5 min read',
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    source_url TEXT,
    upvotes INTEGER NOT NULL DEFAULT 24,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Brotherhood Accountability Check-In Wall
CREATE TABLE sc_community_checkins (
    id SERIAL PRIMARY KEY,
    handle VARCHAR(80) NOT NULL,
    rank_badge VARCHAR(80) NOT NULL,
    streak_days INTEGER NOT NULL DEFAULT 1,
    pledge_text TEXT NOT NULL,
    sparks INTEGER NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. NNN 30-Day Daily Survival Matrix & Urge Thermometer Log (Scoped by profile_key & challenge_year)
CREATE TABLE sc_nnn_daily_tracker (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    challenge_year INTEGER NOT NULL DEFAULT 2026,
    day_number INTEGER NOT NULL CHECK (day_number BETWEEN 1 AND 30),
    status VARCHAR(24) NOT NULL DEFAULT 'survived' CHECK (status IN ('survived', 'danger_zone', 'fallen')),
    urge_level INTEGER NOT NULL DEFAULT 2 CHECK (urge_level BETWEEN 0 AND 10),
    trigger_note VARCHAR(220) DEFAULT '',
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(profile_key, challenge_year, day_number)
);

-- 8. NNN Funny Stories, War Room Lore & Survival Chronicles
CREATE TABLE sc_nnn_stories (
    id SERIAL PRIMARY KEY,
    author_handle VARCHAR(80) NOT NULL DEFAULT 'Spartan_Day14',
    day_tag VARCHAR(40) NOT NULL DEFAULT 'Day 14 of NNN',
    title VARCHAR(200) NOT NULL,
    story_body TEXT NOT NULL,
    humor_tag VARCHAR(60) NOT NULL DEFAULT 'Superpower Meme Lore',
    laugh_sparks INTEGER NOT NULL DEFAULT 42,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Profile-Scoped Self-Touching & Sexual Activity Records Calendar Table
CREATE TABLE sc_self_touching_records (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    record_date DATE NOT NULL,
    activity_status VARCHAR(64) NOT NULL CHECK (
        activity_status IN (
            'No Sexual Activity',
            'Only Gooning',
            'Masturbation With Ejaculation',
            'Masturbation Without Ejaculation',
            'Penetrative Sex',
            'Oral Sex',
            'Light Couple Play',
            'Drink Partner''s Cum',
            'Drink Own Cum'
        )
    ),
    notes VARCHAR(255) DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(profile_key, record_date)
);

-- 10. Read-Only Immutable Year-Wise NNN Challenge Status View (Per Profile & Year, 2023–2030)
-- Evaluates strictly to: 'November Not Over Yet', 'Failed', or 'Success'
CREATE OR REPLACE VIEW sc_nnn_yearly_status_view AS
WITH years AS (
    SELECT generate_series(2023, 2030) AS challenge_year
),
profile_years AS (
    SELECT p.profile_key, p.display_name, y.challenge_year
    FROM sc_profiles p
    CROSS JOIN years y
),
agg AS (
    SELECT
        t.profile_key,
        t.challenge_year,
        COUNT(*) FILTER (WHERE t.status IN ('survived', 'danger_zone')) AS days_survived,
        COUNT(*) FILTER (WHERE t.status = 'fallen') AS days_fallen,
        MIN(t.day_number) FILTER (WHERE t.status = 'fallen') AS first_fallen_day
    FROM sc_nnn_daily_tracker t
    GROUP BY t.profile_key, t.challenge_year
)
SELECT
    py.profile_key,
    py.display_name,
    py.challenge_year,
    COALESCE(a.days_survived, 0)::int AS days_survived,
    COALESCE(a.days_fallen, 0)::int AS days_fallen,
    a.first_fallen_day,
    CASE
        WHEN COALESCE(a.days_fallen, 0) > 0 THEN 'Failed'
        WHEN CURRENT_DATE <= MAKE_DATE(py.challenge_year, 11, 30) THEN 'November Not Over Yet'
        WHEN COALESCE(a.days_survived, 0) > 0 THEN 'Success'
        ELSE 'Failed'
    END AS nnn_status
FROM profile_years py
LEFT JOIN agg a
    ON a.profile_key = py.profile_key
   AND a.challenge_year = py.challenge_year
ORDER BY py.profile_key ASC, py.challenge_year DESC;

-- =====================================================================
-- STEP 3: MULTI-PROFILE SEED DATA (4 DISTINCT PROFILES)
-- =====================================================================

-- 3A. Seed 4 Distinct Profiles in sc_profiles
INSERT INTO sc_profiles (
    profile_key, display_name, pmo_start_time, p_start_time, mo_start_time,
    longest_streak_days, aura_points, target_days,
    fasting_active, fasting_start_time, fasting_target_hours,
    blocker_strictness, custom_blocked_domains
)
VALUES
(
    'default_monk',
    'Sovereign Initiate',
    NOW() - INTERVAL '14 days 8 hours',
    NOW() - INTERVAL '21 days 4 hours',
    NOW() - INTERVAL '14 days 8 hours',
    21,
    420,
    90,
    FALSE,
    NULL,
    16,
    'strict',
    'adultsite.example,triggerhub.example,nsfwscroll.example'
),
(
    'spartan_arjun',
    'Spartan Commander Arjun',
    NOW() - INTERVAL '42 days 6 hours',
    NOW() - INTERVAL '56 days 2 hours',
    NOW() - INTERVAL '42 days 6 hours',
    56,
    1180,
    90,
    TRUE,
    NOW() - INTERVAL '14 hours 25 minutes',
    18,
    'strict',
    'adultsite.example,shortsdoom.example,latebait.example'
),
(
    'vedic_sage_108',
    'Brahmacharya Sage 108',
    NOW() - INTERVAL '95 days 11 hours',
    NOW() - INTERVAL '120 days 5 hours',
    NOW() - INTERVAL '95 days 11 hours',
    120,
    2640,
    180,
    TRUE,
    NOW() - INTERVAL '19 hours 10 minutes',
    20,
    'maximum',
    'adultsite.example,triggerhub.example,dopaminetrap.example,reelsbait.example'
),
(
    'neophyte_seeker',
    'Reboot Challenger',
    NOW() - INTERVAL '3 days 15 hours',
    NOW() - INTERVAL '7 days 9 hours',
    NOW() - INTERVAL '3 days 15 hours',
    12,
    145,
    30,
    FALSE,
    NULL,
    24,
    'standard',
    'adultsite.example,triggerhub.example'
)
ON CONFLICT (profile_key) DO NOTHING;

-- 3B. Seed Profile-Specific Daily Energy Transmutation Habits for Today
INSERT INTO sc_daily_habits (profile_key, habit_code, habit_label, aura_reward, completed_date)
VALUES
    ('default_monk', 'cold_exposure', '❄️ Cold Shower / Vagal Hydro-Reset (3 mins)', 30, CURRENT_DATE),
    ('default_monk', 'zero_edging', '🛡️ Zero Peek & Zero Dopamine Binge Scrolling', 35, CURRENT_DATE),

    ('spartan_arjun', 'cold_exposure', '❄️ Cold Shower / Vagal Hydro-Reset (3 mins)', 30, CURRENT_DATE),
    ('spartan_arjun', 'pranayama', '🧘 10-Min Pranayama / Ojas Upward Draw', 25, CURRENT_DATE),
    ('spartan_arjun', 'heavy_training', '🏋️ Compound Strength / High-Intensity Output', 35, CURRENT_DATE),
    ('spartan_arjun', 'deep_creation', '💻 90-Min Undistracted Deep Work / Study Block', 40, CURRENT_DATE),
    ('spartan_arjun', 'zero_edging', '🛡️ Zero Peek & Zero Dopamine Binge Scrolling', 35, CURRENT_DATE),

    ('vedic_sage_108', 'cold_exposure', '❄️ Cold Shower / Vagal Hydro-Reset (3 mins)', 30, CURRENT_DATE),
    ('vedic_sage_108', 'pranayama', '🧘 10-Min Pranayama / Ojas Upward Draw', 25, CURRENT_DATE),
    ('vedic_sage_108', 'heavy_training', '🏋️ Compound Strength / High-Intensity Output', 35, CURRENT_DATE),
    ('vedic_sage_108', 'deep_creation', '💻 90-Min Undistracted Deep Work / Study Block', 40, CURRENT_DATE),
    ('vedic_sage_108', 'zero_edging', '🛡️ Zero Peek & Zero Dopamine Binge Scrolling', 35, CURRENT_DATE),
    ('vedic_sage_108', 'night_curfew', '🌙 Digital Sunset (Phone Away 45m Before Sleep)', 25, CURRENT_DATE),

    ('neophyte_seeker', 'cold_exposure', '❄️ Cold Shower / Vagal Hydro-Reset (3 mins)', 30, CURRENT_DATE)
ON CONFLICT (profile_key, habit_code, completed_date) DO NOTHING;

-- 3C. Seed Profile-Specific Historical Relapse Logs
INSERT INTO sc_relapse_logs (profile_key, streak_type, streak_days_achieved, trigger_category, emotional_state, lesson_learned, logged_at)
VALUES
    ('default_monk', 'MO_ONLY', 19.4, 'Late Night Scrolling', 'Exhausted / Low Dopamine', 'Kept P-Free streak intact; installed bedroom phone curfew after 10:30 PM.', NOW() - INTERVAL '14 days'),
    ('default_monk', 'PMO', 11.2, 'Stress / Work Burnout', 'Restless / Anxious', 'Replaced afternoon stress cues with 4-7-8 breathwork and 25 pushups.', NOW() - INTERVAL '34 days'),
    ('spartan_arjun', 'MO_ONLY', 31.5, 'Travel Fatigue', 'Restless / Anxious', 'Maintained 18:6 Warrior Monk fasting and cold showers during hotel stays.', NOW() - INTERVAL '42 days'),
    ('vedic_sage_108', 'PMO', 64.0, 'Complacency at Day 64', 'Overconfident (Just a peek)', 'Adopted unbroken Siddhasana pranayama and 20:4 Deep Autophagy fasting.', NOW() - INTERVAL '95 days'),
    ('neophyte_seeker', 'PMO', 4.5, 'Social Media Algorithm', 'Boredom & Isolation', 'Enabled CleanBrowsing DNS 185.228.168.10 and started logging every day in the Self-Touching Calendar.', NOW() - INTERVAL '3 days');

-- 3D. Seed Profile-Specific Private Journal Entries
INSERT INTO sc_journal_entries (profile_key, title, mood, energy_level, urge_intensity, content, created_at)
VALUES
    ('default_monk', 'Day 14 (default_monk): Noticeable Surge in Morning Drive & Focus', '⚡ High Drive & Focused', 9, 2, 'Two full weeks locked in on default_monk profile. Completed a 16-hour intermittent fast and hit a personal best on compound lifts.', NOW() - INTERVAL '6 hours'),
    ('spartan_arjun', 'Day 42 (Spartan Arjun): 18:6 Autophagy Fast + Zero Urge Volatility', '🔥 Unstoppable Spartan', 10, 1, 'Currently 14.5 hours into my 18:6 Warrior Monk fast. Voice resonance, posture, and coding output are at all-time highs.', NOW() - INTERVAL '3 hours'),
    ('vedic_sage_108', 'Day 95 (Vedic Sage 108): Full 90-Day Reboot Completed & Ojas Stabilized', '🧘 Sovereign Equanimity', 10, 0, '19+ hours into today''s 20:4 Deep Autophagy fast. Completed 3 consecutive victorious NNN campaigns (2023, 2024, 2025) and locked in all 30 days for 2026.', NOW() - INTERVAL '2 hours'),
    ('neophyte_seeker', 'Day 3 (Reboot Challenger): Building Honest Accountability', '🛡️ Determined', 7, 5, 'Failed NNN in 2024 and 2025 early, but logging every trigger honestly now. Preparing for a 24h Solar Reset fast.', NOW() - INTERVAL '8 hours');

-- 3E. Seed Multi-Year NNN Daily Survival Matrix Records Per Profile (sc_nnn_daily_tracker)
-- 1) default_monk: 2023 Success (30/30), 2024 Failed (Day 11), 2025 Success (30/30), 2026 Active (Days 1-14 logged)
INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'default_monk', 2023, d, 'survived', 2, 'Completed 2023 NNN cleanly'
FROM generate_series(1, 30) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'default_monk', 2024, d,
       CASE WHEN d = 11 THEN 'fallen' WHEN d IN (6, 9) THEN 'danger_zone' ELSE 'survived' END,
       CASE WHEN d = 11 THEN 9 WHEN d IN (6, 9) THEN 7 ELSE 2 END,
       CASE WHEN d = 11 THEN 'Late night scrolling slip in Nov 2024' ELSE 'Held the line' END
FROM generate_series(1, 11) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'default_monk', 2025, d,
       CASE WHEN d IN (7, 14, 21) THEN 'danger_zone' ELSE 'survived' END,
       CASE WHEN d IN (7, 14, 21) THEN 6 ELSE 2 END,
       'Completed 2025 NNN cleanly'
FROM generate_series(1, 30) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'default_monk', 2026, d,
       CASE WHEN d IN (7, 12) THEN 'danger_zone' ELSE 'survived' END,
       CASE WHEN d IN (7, 12) THEN 7 ELSE 2 END,
       '2026 NNN War Room log'
FROM generate_series(1, 14) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

-- 2) spartan_arjun: 2023 Failed (Day 19), 2024 Success (30/30), 2025 Success (30/30), 2026 Active (Days 1-22 logged)
INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'spartan_arjun', 2023, d,
       CASE WHEN d = 19 THEN 'fallen' ELSE 'survived' END,
       CASE WHEN d = 19 THEN 9 ELSE 3 END,
       '2023 Campaign'
FROM generate_series(1, 19) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'spartan_arjun', 2024, d,
       CASE WHEN d IN (8, 17, 25) THEN 'danger_zone' ELSE 'survived' END,
       3,
       '2024 Spartan Victory'
FROM generate_series(1, 30) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'spartan_arjun', 2025, d, 'survived', 1, '2025 Flawless Spartan Run'
FROM generate_series(1, 30) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'spartan_arjun', 2026, d,
       CASE WHEN d IN (5, 15, 22) THEN 'danger_zone' ELSE 'survived' END,
       2,
       '2026 Spartan Regiment'
FROM generate_series(1, 22) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

-- 3) vedic_sage_108: 2023 Success, 2024 Success, 2025 Success, 2026 30-day Sovereign Plan
INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'vedic_sage_108', yr, d, 'survived', 1, 'Brahmacharya Mastery'
FROM generate_series(2023, 2026) AS yr
CROSS JOIN generate_series(1, 30) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

-- 4) neophyte_seeker: 2023 Failed (Day 3), 2024 Failed (Day 4), 2025 Failed (Day 9), 2026 Failed (Day 6)
INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'neophyte_seeker', 2023, d,
       CASE WHEN d = 3 THEN 'fallen' ELSE 'danger_zone' END,
       8,
       '2023 Early Slip'
FROM generate_series(1, 3) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'neophyte_seeker', 2024, d,
       CASE WHEN d = 4 THEN 'fallen' ELSE 'danger_zone' END,
       8,
       '2024 Early Slip'
FROM generate_series(1, 4) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'neophyte_seeker', 2025, d,
       CASE WHEN d = 9 THEN 'fallen' WHEN d IN (3, 7) THEN 'danger_zone' ELSE 'survived' END,
       7,
       '2025 Week-2 Slip'
FROM generate_series(1, 9) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
SELECT 'neophyte_seeker', 2026, d,
       CASE WHEN d = 6 THEN 'fallen' WHEN d IN (3, 5) THEN 'danger_zone' ELSE 'survived' END,
       8,
       '2026 Attempt'
FROM generate_series(1, 8) AS d
ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

-- 3F. Seed Profile-Specific Self-Touching & Sexual Activity Records Across October & November 2026
INSERT INTO sc_self_touching_records (profile_key, record_date, activity_status, notes)
VALUES
    ('default_monk', '2026-10-02', 'Masturbation With Ejaculation', 'Elapsed record before current 14d streak (Immutable)'),
    ('default_monk', '2026-10-08', 'Only Gooning', 'Late night trigger browsing (Immutable)'),
    ('default_monk', '2026-10-14', 'Masturbation Without Ejaculation', 'Edging incident before reset (Immutable)'),
    ('default_monk', '2026-10-15', 'No Sexual Activity', 'Clean retention streak initiated (Immutable)'),
    ('default_monk', '2026-10-18', 'No Sexual Activity', 'Cold plunge + compound lifts (Immutable)'),
    ('default_monk', '2026-10-22', 'No Sexual Activity', 'Day-7 testosterone peak channeled (Immutable)'),
    ('default_monk', '2026-10-25', 'No Sexual Activity', 'Zero urges all day (Immutable)'),
    ('default_monk', '2026-10-28', 'No Sexual Activity', 'Clean discipline locked in (Immutable)'),
    ('default_monk', '2026-10-29', 'No Sexual Activity', 'Current day commitment — editable'),
    ('default_monk', '2026-10-30', 'No Sexual Activity', 'Planned clean pre-NNN day — editable'),
    ('default_monk', '2026-11-01', 'No Sexual Activity', 'NNN Day 1 Sovereign Lock-In — editable'),

    ('spartan_arjun', '2026-10-04', 'Penetrative Sex', 'With partner (Immutable)'),
    ('spartan_arjun', '2026-10-11', 'Light Couple Play', 'Non-ejaculatory bonding (Immutable)'),
    ('spartan_arjun', '2026-10-16', 'Oral Sex', 'Anniversary evening (Immutable)'),
    ('spartan_arjun', '2026-10-20', 'No Sexual Activity', '18:6 Warrior Monk fast + gym (Immutable)'),
    ('spartan_arjun', '2026-10-24', 'No Sexual Activity', 'Full Spartan protocol (Immutable)'),
    ('spartan_arjun', '2026-10-29', 'No Sexual Activity', 'Active 18:6 fast + clean focus — editable'),
    ('spartan_arjun', '2026-11-01', 'No Sexual Activity', 'NNN Day 1 Spartan Oath — editable'),

    ('vedic_sage_108', '2026-10-01', 'No Sexual Activity', 'Brahmacharya sadhana (Immutable)'),
    ('vedic_sage_108', '2026-10-07', 'No Sexual Activity', 'Ojas transmutation + pranayama (Immutable)'),
    ('vedic_sage_108', '2026-10-14', 'No Sexual Activity', '20:4 Deep Autophagy fast (Immutable)'),
    ('vedic_sage_108', '2026-10-21', 'No Sexual Activity', '90+ Day Solar Sovereign (Immutable)'),
    ('vedic_sage_108', '2026-10-29', 'No Sexual Activity', 'Unbroken celibacy — editable'),
    ('vedic_sage_108', '2026-11-01', 'No Sexual Activity', 'NNN Sovereign Mastery — editable'),

    ('neophyte_seeker', '2026-10-03', 'Only Gooning', 'Weekend relapse (Immutable)'),
    ('neophyte_seeker', '2026-10-09', 'Masturbation With Ejaculation', 'Late night slip (Immutable)'),
    ('neophyte_seeker', '2026-10-14', 'Oral Sex', 'Partner encounter (Immutable)'),
    ('neophyte_seeker', '2026-10-19', 'Drink Partner''s Cum', 'Logged intimate encounter (Immutable)'),
    ('neophyte_seeker', '2026-10-22', 'Drink Own Cum', 'Logged experimental slip (Immutable)'),
    ('neophyte_seeker', '2026-10-25', 'Masturbation Without Ejaculation', 'Stopped before point of no return (Immutable)'),
    ('neophyte_seeker', '2026-10-29', 'No Sexual Activity', 'Starting fresh today — editable'),
    ('neophyte_seeker', '2026-10-31', 'Light Couple Play', 'Planned date night — editable future status')
ON CONFLICT (profile_key, record_date) DO NOTHING;

-- 3G. Seed Science-Backed Blogs, Brotherhood Check-Ins, and Funny NNN Stories
INSERT INTO sc_blogs (title, author, category, read_time, summary, content, source_url, upvotes)
VALUES
    (
        'The Day-7 Testosterone Peak & Androgen Receptor Upregulation',
        'Dr. Marcus Vance • Neuroendocrinology',
        'Endocrinology',
        '6 min read',
        'Clinical evaluation of serum testosterone dynamics during short-term and long-term abstinence, and why receptor density matters more than transient spikes.',
        'A landmark study by Jiang et al. (2003) published in the Journal of Zhejiang University SCIENCE demonstrated that serum testosterone concentrations remain stable during the first 6 days of abstinence, then surge to 145.7% of baseline on Day 7. Beyond the acute Day-7 hormonal wave, prolonged semen retention shifts focus toward androgen receptor (AR) sensitivity in the prefrontal cortex and amygdala. When chronic supranormal dopamine stimulation ceases, DeltaFosB accumulation begins to clear, restoring natural drive, morning vitality, and calm assertiveness during high-pressure tasks.',
        'https://pubmed.ncbi.nlm.nih.gov/12659241/',
        68
    ),
    (
        'Dopamine D2 Receptor Resensitization & Prefrontal Executive Control',
        'SeedController Lab',
        'Neuroscience',
        '7 min read',
        'How removing artificial supernormal stimuli reverses striatal downregulation and rebuilds deep work capacity over a 90-day reboot cycle.',
        'Neuroimaging studies by Kühn and Gallinat (2014) in JAMA Psychiatry revealed an inverse correlation between compulsive visual consumption and gray matter volume in the right caudate of the striatum, alongside reduced functional connectivity to the dorsolateral prefrontal cortex (dlPFC). During a structured 90-day reboot, abstaining from artificial novelty allows tonic dopamine baseline levels to stabilize. Practitioners consistently report a transition around Days 21–35 where everyday rewards—sunlight, strength training, deep coding, and conversation—regain vivid emotional salience.',
        'https://pubmed.ncbi.nlm.nih.gov/24871202/',
        94
    ),
    (
        'Ojas, Sublimation, and Modern Bio-Energetic Transmutation Protocols',
        'Acharya Dev & Performance Team',
        'Transmutation',
        '5 min read',
        'Synthesizing classical Brahmacharya breathwork with modern vagal tone regulation to redirect restless urge energy into creative output.',
        'Retention without transmutation creates internal friction; retention paired with deliberate somatic channeling produces extraordinary creative stamina. When sympathetic arousal spikes during an urge wave, executing a 4-4-6-2 box-breath or Ashwini Mudra contracts the pelvic floor while lengthening the exhalation, activating the vagus nerve. Follow this immediately with 20 minutes of compound physical movement or focused output to convert stagnant restlessness into tangible progress.',
        'https://pubmed.ncbi.nlm.nih.gov/29616846/',
        53
    );

INSERT INTO sc_community_checkins (handle, rank_badge, streak_days, pledge_text, sparks)
VALUES
    ('SpartanCoder_99', 'Solar Sovereign (Day 60+)', 64, 'Day 64 locked in. Replaced late-night doomscrolling with 5:30 AM cold plunges and 2 hours of deep system architecture work.', 31),
    ('VedicMonk_IN', 'Transmuter (Day 30+)', 38, 'Completed an 18-hour intermittent fast alongside pranayama today. Urges around day 35 were strong, but the Emergency Urge Shield kept me grounded.', 24),
    ('AtlasReborn', 'Guardian (Day 14+)', 16, 'Two full weeks clean on both P and MO tracks. Sleep quality and eye contact in meetings have noticeably leveled up.', 19);

INSERT INTO sc_nnn_stories (author_handle, day_tag, title, story_body, humor_tag, laugh_sparks)
VALUES
    (
        'LevitationMonk_99',
        'Day 12 of NNN',
        'Accidentally Teleported to the Gym Squat Rack at 5:15 AM',
        'By Day 12 of No Nut November, my alarm did not wake me up—I woke up the alarm. I went to make black coffee, blinked once, and somehow I was already warming up with 225 lbs on the barbell while reciting Marcus Aurelius in Latin. Even the gym bro who never spots anyone nodded at me in solemn respect.',
        'Superpower Meme Lore',
        128
    ),
    (
        'ColdShowerGeneral',
        'Day 19 of NNN',
        'The Wi-Fi Router Blinked and I Thought It Was Morse Code From My Future Self',
        'Week 3 urges hit at 11:30 PM while I was finishing a coding sprint. Instead of opening a new tab, I sprinted to the bathroom, turned the shower knob to Arctic Glacier mode, and did 40 pushups on the tile floor. My roommate asked if we were under siege. I told him: Only by our own limbic systems, brother.',
        'Urge Survival Comedy',
        96
    ),
    (
        'BrahmacharyaCoder',
        'Day 26 of NNN',
        'Dogs Bark in Respect & My CSS Grid Centered Itself on the First Try',
        'People told me the NNN superpower memes were exaggerated. Explain how on Day 26 I wrote a 400-line PostgreSQL migration and a responsive flexbox layout without opening StackOverflow once, and stray squirrels on my morning walk stood at attention as I walked past.',
        'Developer Ascension',
        164
    ),
    (
        'StoicSpartan_07',
        'Day 7 of NNN',
        'The Great Peanut Butter Misunderstanding of November 3rd',
        'My younger cousin genuinely thought No Nut November meant banning almonds, cashews, and peanut butter sandwiches for 30 days. He proudly threw away three jars of crunchy Skippy to support the brotherhood. None of us had the heart to tell him until December 1st.',
        'Wholesome Fail',
        215
    );