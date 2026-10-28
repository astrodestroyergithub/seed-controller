-- =====================================================================
-- SeedController Full-Stack NeonDB PostgreSQL Schema & Seed Script
-- Paste and execute this entire script inside the NeonDB SQL Editor
-- (https://console.neon.tech -> SQL Editor)
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
-- OPTIONAL INITIAL SEED DATA (Safe to run multiple times)
-- =====================================================================

INSERT INTO sc_profiles (profile_key, display_name)
VALUES ('default_monk', 'Sovereign Initiate')
ON CONFLICT (profile_key) DO NOTHING;

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
