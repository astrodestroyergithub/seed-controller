-- =====================================================================
-- SeedController + NNN (No Nut November) Full-Stack NeonDB PostgreSQL Schema
-- Paste and execute this entire script inside the NeonDB SQL Editor
-- (https://console.neon.tech -> SQL Editor)
-- Safe to run on an existing database (uses IF NOT EXISTS & ON CONFLICT DO NOTHING)
-- =====================================================================

-- 1. User Profiles & Streak / Fasting / Blocker State
CREATE TABLE IF NOT EXISTS sc_profiles (
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

-- 2. Daily Energy Transmutation Habits Log
CREATE TABLE IF NOT EXISTS sc_daily_habits (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    habit_code VARCHAR(64) NOT NULL,
    habit_label VARCHAR(160) NOT NULL,
    aura_reward INTEGER NOT NULL DEFAULT 25,
    completed_date DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE(profile_key, habit_code, completed_date)
);

-- 3. Non-Destructive Historical Relapse Ledger (Rising Drop / NoBeep style)
CREATE TABLE IF NOT EXISTS sc_relapse_logs (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    streak_type VARCHAR(16) NOT NULL DEFAULT 'PMO',
    streak_days_achieved NUMERIC(6,2) NOT NULL DEFAULT 0,
    trigger_category VARCHAR(80) NOT NULL,
    emotional_state VARCHAR(80) NOT NULL,
    lesson_learned TEXT NOT NULL,
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Private Retention & Transmutation Journal Entries
CREATE TABLE IF NOT EXISTS sc_journal_entries (
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
CREATE TABLE IF NOT EXISTS sc_blogs (
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
CREATE TABLE IF NOT EXISTS sc_community_checkins (
    id SERIAL PRIMARY KEY,
    handle VARCHAR(80) NOT NULL,
    rank_badge VARCHAR(80) NOT NULL,
    streak_days INTEGER NOT NULL DEFAULT 1,
    pledge_text TEXT NOT NULL,
    sparks INTEGER NOT NULL DEFAULT 5,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- NEW FOR NNN (NO NUT NOVEMBER) CHALLENGE EXPANSION (TABLES 7 & 8)
-- =====================================================================

-- 7. NNN 30-Day Daily Survival Matrix & Urge Thermometer Log
CREATE TABLE IF NOT EXISTS sc_nnn_daily_tracker (
    id SERIAL PRIMARY KEY,
    profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
    challenge_year INTEGER NOT NULL DEFAULT 2026,
    day_number INTEGER NOT NULL CHECK (day_number BETWEEN 1 AND 30),
    status VARCHAR(24) NOT NULL DEFAULT 'survived', -- 'survived', 'danger_zone', 'fallen'
    urge_level INTEGER NOT NULL DEFAULT 2 CHECK (urge_level BETWEEN 0 AND 10),
    trigger_note VARCHAR(220) DEFAULT '',
    logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(profile_key, challenge_year, day_number)
);

-- 8. NNN Funny Stories, War Room Lore & Survival Chronicles
CREATE TABLE IF NOT EXISTS sc_nnn_stories (
    id SERIAL PRIMARY KEY,
    author_handle VARCHAR(80) NOT NULL DEFAULT 'Spartan_Day14',
    day_tag VARCHAR(40) NOT NULL DEFAULT 'Day 14 of NNN',
    title VARCHAR(200) NOT NULL,
    story_body TEXT NOT NULL,
    humor_tag VARCHAR(60) NOT NULL DEFAULT 'Superpower Meme Lore',
    laugh_sparks INTEGER NOT NULL DEFAULT 42,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- INITIAL SEED DATA (Safe to run multiple times)
-- =====================================================================

INSERT INTO sc_profiles (profile_key, display_name)
VALUES ('default_monk', 'Sovereign Initiate')
ON CONFLICT (profile_key) DO NOTHING;

INSERT INTO sc_nnn_stories (author_handle, day_tag, title, story_body, humor_tag, laugh_sparks)
SELECT * FROM (VALUES
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
    )
) AS v(author_handle, day_tag, title, story_body, humor_tag, laugh_sparks)
WHERE NOT EXISTS (SELECT 1 FROM sc_nnn_stories LIMIT 1);
