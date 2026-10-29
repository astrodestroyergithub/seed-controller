const { Pool } = require("pg");

/**
 * SeedController Sovereign + NNN War Room + Self-Touching Calendar
 * Unified NeonDB PostgreSQL Serverless Handler (netlify/functions/api.js)
 * Uses process.env.DATABASE_URL with pg.Pool.
 * Self-healing schema migration + one-time multi-profile seeding + strict elapsed-date immutability guards.
 */
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const VALID_SELF_TOUCHING_STATUSES = [
    "No Sexual Activity",
    "Only Gooning",
    "Masturbation With Ejaculation",
    "Masturbation Without Ejaculation",
    "Penetrative Sex",
    "Oral Sex",
    "Light Couple Play",
    "Drink Partner's Cum",
    "Drink Own Cum"
];

let schemaInitialized = false;

async function ensureSchema() {
    if (schemaInitialized) return;

    // 1. Create core tables if they do not exist
    await pool.query(`
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

        CREATE TABLE IF NOT EXISTS sc_daily_habits (
            id SERIAL PRIMARY KEY,
            profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
            habit_code VARCHAR(64) NOT NULL,
            habit_label VARCHAR(160) NOT NULL,
            aura_reward INTEGER NOT NULL DEFAULT 25,
            completed_date DATE NOT NULL DEFAULT CURRENT_DATE,
            UNIQUE(profile_key, habit_code, completed_date)
        );

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

        CREATE TABLE IF NOT EXISTS sc_community_checkins (
            id SERIAL PRIMARY KEY,
            handle VARCHAR(80) NOT NULL,
            rank_badge VARCHAR(80) NOT NULL,
            streak_days INTEGER NOT NULL DEFAULT 1,
            pledge_text TEXT NOT NULL,
            sparks INTEGER NOT NULL DEFAULT 5,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS sc_nnn_daily_tracker (
            id SERIAL PRIMARY KEY,
            profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk',
            challenge_year INTEGER NOT NULL DEFAULT 2026,
            day_number INTEGER NOT NULL CHECK (day_number BETWEEN 1 AND 30),
            status VARCHAR(24) NOT NULL DEFAULT 'survived',
            urge_level INTEGER NOT NULL DEFAULT 2 CHECK (urge_level BETWEEN 0 AND 10),
            trigger_note VARCHAR(220) DEFAULT '',
            logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE(profile_key, challenge_year, day_number)
        );

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

        CREATE TABLE IF NOT EXISTS sc_self_touching_records (
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
    `);

    // 2. Self-healing column & constraint migration for pre-existing tables from older schema versions
    try {
        await pool.query(`
            ALTER TABLE sc_nnn_daily_tracker ADD COLUMN IF NOT EXISTS profile_key VARCHAR(64) NOT NULL DEFAULT 'default_monk';
            ALTER TABLE sc_nnn_daily_tracker ADD COLUMN IF NOT EXISTS challenge_year INTEGER NOT NULL DEFAULT 2026;
            ALTER TABLE sc_nnn_daily_tracker ADD COLUMN IF NOT EXISTS status VARCHAR(24) NOT NULL DEFAULT 'survived';
            ALTER TABLE sc_nnn_daily_tracker ADD COLUMN IF NOT EXISTS urge_level INTEGER NOT NULL DEFAULT 2;
            ALTER TABLE sc_nnn_daily_tracker ADD COLUMN IF NOT EXISTS trigger_note VARCHAR(220) DEFAULT '';
            ALTER TABLE sc_nnn_daily_tracker ADD COLUMN IF NOT EXISTS logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
        `);

        // Drop ANY legacy 1-column or 2-column unique constraint on sc_nnn_daily_tracker (e.g. UNIQUE(profile_key, day_number) or UNIQUE(challenge_year, day_number))
        await pool.query(`
            DO $$
            DECLARE
                r RECORD;
            BEGIN
                FOR r IN (
                    SELECT conname, pg_get_constraintdef(oid) AS def
                    FROM pg_constraint
                    WHERE conrelid = 'sc_nnn_daily_tracker'::regclass
                      AND contype = 'u'
                ) LOOP
                    IF r.def NOT LIKE '%(profile_key, challenge_year, day_number)%' THEN
                        EXECUTE 'ALTER TABLE sc_nnn_daily_tracker DROP CONSTRAINT IF EXISTS ' || quote_ident(r.conname);
                    END IF;
                END LOOP;

                -- Remove any duplicate (profile_key, challenge_year, day_number) rows before adding the 3-column unique constraint
                DELETE FROM sc_nnn_daily_tracker a
                USING sc_nnn_daily_tracker b
                WHERE a.id < b.id
                  AND a.profile_key = b.profile_key
                  AND a.challenge_year = b.challenge_year
                  AND a.day_number = b.day_number;

                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint
                    WHERE conrelid = 'sc_nnn_daily_tracker'::regclass
                      AND contype = 'u'
                      AND pg_get_constraintdef(oid) LIKE '%(profile_key, challenge_year, day_number)%'
                ) THEN
                    ALTER TABLE sc_nnn_daily_tracker
                    ADD CONSTRAINT sc_nnn_daily_tracker_profile_year_day_uq UNIQUE (profile_key, challenge_year, day_number);
                END IF;
            END $$;
        `);
    } catch (migErr) {
        console.warn("Schema constraint migration warning:", migErr.message);
    }

    // 3. Create or replace the read-only Year-Wise NNN Challenge Status View (2023–2030)
    await pool.query(`
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
    `);

    // 4. Fault-isolated initial seed data (only seeds empty tables once so user edits/deletions are never overwritten)
    try {
        await pool.query(`
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
        `);

        const habitsCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_daily_habits`);
        if (habitsCount.rows[0].cnt === 0) {
            await pool.query(`
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
            `);
        }

        const relCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_relapse_logs`);
        if (relCount.rows[0].cnt === 0) {
            await pool.query(`
                INSERT INTO sc_relapse_logs (profile_key, streak_type, streak_days_achieved, trigger_category, emotional_state, lesson_learned, logged_at)
                VALUES
                    ('default_monk', 'MO_ONLY', 19.4, 'Late Night Scrolling', 'Exhausted / Low Dopamine', 'Kept P-Free streak intact; installed bedroom phone curfew after 10:30 PM.', NOW() - INTERVAL '14 days'),
                    ('default_monk', 'PMO', 11.2, 'Stress / Work Burnout', 'Restless / Anxious', 'Replaced afternoon stress cues with 4-7-8 breathwork and 25 pushups.', NOW() - INTERVAL '34 days'),
                    ('spartan_arjun', 'MO_ONLY', 31.5, 'Travel Fatigue', 'Restless / Anxious', 'Maintained 18:6 Warrior Monk fasting and cold showers during hotel stays.', NOW() - INTERVAL '42 days'),
                    ('vedic_sage_108', 'PMO', 64.0, 'Complacency at Day 64', 'Overconfident (Just a peek)', 'Adopted unbroken Siddhasana pranayama and 20:4 Deep Autophagy fasting.', NOW() - INTERVAL '95 days'),
                    ('neophyte_seeker', 'PMO', 4.5, 'Social Media Algorithm', 'Boredom & Isolation', 'Enabled CleanBrowsing DNS 185.228.168.10 and started logging every day in the Self-Touching Calendar.', NOW() - INTERVAL '3 days');
            `);
        }

        const jrnCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_journal_entries`);
        if (jrnCount.rows[0].cnt === 0) {
            await pool.query(`
                INSERT INTO sc_journal_entries (profile_key, title, mood, energy_level, urge_intensity, content, created_at)
                VALUES
                    ('default_monk', 'Day 14 (default_monk): Noticeable Surge in Morning Drive & Focus', '⚡ High Drive & Focused', 9, 2, 'Two full weeks locked in on default_monk profile. Completed a 16-hour intermittent fast and hit a personal best on compound lifts.', NOW() - INTERVAL '6 hours'),
                    ('spartan_arjun', 'Day 42 (Spartan Arjun): 18:6 Autophagy Fast + Zero Urge Volatility', '🔥 Unstoppable Spartan', 10, 1, 'Currently 14.5 hours into my 18:6 Warrior Monk fast. Voice resonance, posture, and coding output are at all-time highs.', NOW() - INTERVAL '3 hours'),
                    ('vedic_sage_108', 'Day 95 (Vedic Sage 108): Full 90-Day Reboot Completed & Ojas Stabilized', '🧘 Sovereign Equanimity', 10, 0, '19+ hours into today''s 20:4 Deep Autophagy fast. Completed 3 consecutive victorious NNN campaigns (2023, 2024, 2025) and locked in all 30 days for 2026.', NOW() - INTERVAL '2 hours'),
                    ('neophyte_seeker', 'Day 3 (Reboot Challenger): Building Honest Accountability', '🛡️ Determined', 7, 5, 'Failed NNN in 2024 and 2025 early, but logging every trigger honestly now. Preparing for a 24h Solar Reset fast.', NOW() - INTERVAL '8 hours');
            `);
        }

        // Only seed sc_nnn_daily_tracker when the table has no multi-profile records yet
        const nnnProfileCheck = await pool.query(`SELECT COUNT(DISTINCT profile_key)::int AS p_cnt FROM sc_nnn_daily_tracker`);
        if (nnnProfileCheck.rows[0].p_cnt < 2) {
            await pool.query(`
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

                INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note)
                SELECT 'vedic_sage_108', yr, d, 'survived', 1, 'Brahmacharya Mastery'
                FROM generate_series(2023, 2026) AS yr
                CROSS JOIN generate_series(1, 30) AS d
                ON CONFLICT (profile_key, challenge_year, day_number) DO NOTHING;

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
            `);
        }

        const stCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_self_touching_records`);
        if (stCount.rows[0].cnt === 0) {
            await pool.query(`
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
            `);
        }

        const blogCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_blogs`);
        if (blogCount.rows[0].cnt === 0) {
            await pool.query(`
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
                )
            `);
        }

        const commCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_community_checkins`);
        if (commCount.rows[0].cnt === 0) {
            await pool.query(`
                INSERT INTO sc_community_checkins (handle, rank_badge, streak_days, pledge_text, sparks)
                VALUES
                ('SpartanCoder_99', 'Solar Sovereign (Day 60+)', 64, 'Day 64 locked in. Replaced late-night doomscrolling with 5:30 AM cold plunges and 2 hours of deep system architecture work.', 31),
                ('VedicMonk_IN', 'Transmuter (Day 30+)', 38, 'Completed an 18-hour intermittent fast alongside pranayama today. Urges around day 35 were strong, but the Emergency Urge Shield kept me grounded.', 24),
                ('AtlasReborn', 'Guardian (Day 14+)', 16, 'Two full weeks clean on both P and MO tracks. Sleep quality and eye contact in meetings have noticeably leveled up.', 19)
            `);
        }

        const nnnStoryCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_nnn_stories`);
        if (nnnStoryCount.rows[0].cnt === 0) {
            await pool.query(`
                INSERT INTO sc_nnn_stories (author_handle, day_tag, title, story_body, humor_tag, laugh_sparks)
                VALUES
                ('LevitationMonk_99', 'Day 12 of NNN', 'Accidentally Teleported to the Gym Squat Rack at 5:15 AM', 'By Day 12 of No Nut November, my alarm did not wake me up—I woke up the alarm. I went to make black coffee, blinked once, and somehow I was already warming up with 225 lbs on the barbell while reciting Marcus Aurelius in Latin.', 'Superpower Meme Lore', 128),
                ('ColdShowerGeneral', 'Day 19 of NNN', 'The Wi-Fi Router Blinked and I Thought It Was Morse Code From My Future Self', 'Week 3 urges hit at 11:30 PM while I was finishing a coding sprint. Instead of opening a new tab, I sprinted to the bathroom, turned the shower knob to Arctic Glacier mode, and did 40 pushups.', 'Urge Survival Comedy', 96),
                ('BrahmacharyaCoder', 'Day 26 of NNN', 'Dogs Bark in Respect & My CSS Grid Centered Itself on the First Try', 'On Day 26 I wrote a 400-line PostgreSQL migration and a responsive flexbox layout without opening StackOverflow once.', 'Developer Ascension', 164),
                ('StoicSpartan_07', 'Day 7 of NNN', 'The Great Peanut Butter Misunderstanding of November 3rd', 'My younger cousin genuinely thought No Nut November meant banning almonds, cashews, and peanut butter sandwiches for 30 days. He proudly threw away three jars of crunchy Skippy to support the brotherhood.', 'Wholesome Fail', 215)
            `);
        }
    } catch (seedErr) {
        console.warn("Non-fatal initial seed warning:", seedErr.message);
    }

    schemaInitialized = true;
}

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
};

exports.handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: HEADERS, body: "" };
    }

    if (!process.env.DATABASE_URL) {
        return {
            statusCode: 503,
            headers: HEADERS,
            body: JSON.stringify({
                error: "DATABASE_URL environment variable is not configured in Netlify.",
                hint: "Add DATABASE_URL in Netlify Site Settings -> Environment Variables."
            })
        };
    }

    try {
        await ensureSchema();

        const params = event.queryStringParameters || {};
        const profileKey = String(params.profileKey || "default_monk").trim();

        await pool.query(
            `INSERT INTO sc_profiles (profile_key) VALUES ($1) ON CONFLICT (profile_key) DO NOTHING`,
            [profileKey]
        );

        /* ===== GET: Fetch full synchronized state from NeonDB ===== */
        if (event.httpMethod === "GET") {
            const [
                profileRes,
                allProfilesRes,
                habitsRes,
                relapsesRes,
                journalsRes,
                blogsRes,
                commRes,
                nnnDaysRes,
                allNnnDaysRes,
                nnnYearlyRes,
                selfTouchRes,
                allSelfTouchRes,
                nnnStoriesRes
            ] = await Promise.all([
                pool.query(`SELECT * FROM sc_profiles WHERE profile_key = $1`, [profileKey]),
                pool.query(`SELECT * FROM sc_profiles ORDER BY profile_key ASC`),
                pool.query(`SELECT * FROM sc_daily_habits WHERE profile_key = $1 AND completed_date = CURRENT_DATE ORDER BY id ASC`, [profileKey]),
                pool.query(`SELECT * FROM sc_relapse_logs WHERE profile_key = $1 ORDER BY logged_at DESC LIMIT 30`, [profileKey]),
                pool.query(`SELECT * FROM sc_journal_entries WHERE profile_key = $1 ORDER BY created_at DESC LIMIT 50`, [profileKey]),
                pool.query(`SELECT * FROM sc_blogs ORDER BY created_at DESC LIMIT 30`),
                pool.query(`SELECT * FROM sc_community_checkins ORDER BY created_at DESC LIMIT 25`),
                pool.query(`SELECT * FROM sc_nnn_daily_tracker WHERE profile_key = $1 ORDER BY challenge_year DESC, day_number ASC`, [profileKey]),
                pool.query(`SELECT * FROM sc_nnn_daily_tracker ORDER BY profile_key ASC, challenge_year DESC, day_number ASC`),
                pool.query(`SELECT * FROM sc_nnn_yearly_status_view ORDER BY profile_key ASC, challenge_year DESC`),
                pool.query(
                    `SELECT id, profile_key, TO_CHAR(record_date, 'YYYY-MM-DD') AS record_date, activity_status, notes, updated_at
                     FROM sc_self_touching_records
                     WHERE profile_key = $1
                     ORDER BY record_date ASC`,
                    [profileKey]
                ),
                pool.query(
                    `SELECT id, profile_key, TO_CHAR(record_date, 'YYYY-MM-DD') AS record_date, activity_status, notes, updated_at
                     FROM sc_self_touching_records
                     ORDER BY profile_key ASC, record_date ASC`
                ),
                pool.query(`SELECT * FROM sc_nnn_stories ORDER BY created_at DESC LIMIT 30`)
            ]);

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({
                    source: "neondb-postgresql",
                    profile: profileRes.rows[0],
                    allProfiles: allProfilesRes.rows,
                    todayHabits: habitsRes.rows,
                    relapseHistory: relapsesRes.rows,
                    journalEntries: journalsRes.rows,
                    blogs: blogsRes.rows,
                    communityCheckins: commRes.rows,
                    nnnDailyTracker: nnnDaysRes.rows,
                    allNnnDailyTracker: allNnnDaysRes.rows,
                    nnnYearlyStatus: nnnYearlyRes.rows,
                    selfTouchingRecords: selfTouchRes.rows,
                    allSelfTouchingRecords: allSelfTouchRes.rows,
                    nnnStories: nnnStoriesRes.rows
                })
            };
        }

        /* ===== POST / PUT / DELETE: Mutate state in NeonDB ===== */
        const rawBody = event.isBase64Encoded
            ? Buffer.from(event.body || "", "base64").toString("utf8")
            : (event.body || "{}");
        const body = JSON.parse(rawBody || "{}");
        const action = body.action || params.action || "";
        const targetProfile = String(body.profileKey || body.profile_key || profileKey || "default_monk").trim();

        await pool.query(
            `INSERT INTO sc_profiles (profile_key, display_name)
             VALUES ($1, $2)
             ON CONFLICT (profile_key) DO NOTHING`,
            [targetProfile, body.display_name || targetProfile]
        );

        if (action === "create_profile" || action === "update_profile") {
            const {
                display_name,
                pmo_start_time,
                p_start_time,
                mo_start_time,
                longest_streak_days,
                aura_points,
                target_days,
                fasting_active,
                fasting_start_time,
                fasting_target_hours,
                blocker_strictness,
                custom_blocked_domains
            } = body;

            const hasFastingStartTime = Object.prototype.hasOwnProperty.call(body, "fasting_start_time");

            const result = await pool.query(
                `UPDATE sc_profiles
                 SET display_name = COALESCE($2, display_name),
                     pmo_start_time = COALESCE($3, pmo_start_time),
                     p_start_time = COALESCE($4, p_start_time),
                     mo_start_time = COALESCE($5, mo_start_time),
                     longest_streak_days = GREATEST(longest_streak_days, COALESCE($6, longest_streak_days)),
                     aura_points = COALESCE($7, aura_points),
                     target_days = COALESCE($8, target_days),
                     fasting_active = COALESCE($9, fasting_active),
                     fasting_start_time = CASE WHEN $14::boolean THEN $10::timestamptz ELSE fasting_start_time END,
                     fasting_target_hours = COALESCE($11, fasting_target_hours),
                     blocker_strictness = COALESCE($12, blocker_strictness),
                     custom_blocked_domains = COALESCE($13, custom_blocked_domains),
                     updated_at = NOW()
                 WHERE profile_key = $1
                 RETURNING *`,
                [
                    targetProfile,
                    display_name || null,
                    pmo_start_time || null,
                    p_start_time || null,
                    mo_start_time || null,
                    longest_streak_days !== undefined ? Number(longest_streak_days) : null,
                    aura_points !== undefined ? Number(aura_points) : null,
                    target_days !== undefined ? Number(target_days) : null,
                    fasting_active !== undefined ? Boolean(fasting_active) : null,
                    fasting_start_time || null,
                    fasting_target_hours !== undefined ? Number(fasting_target_hours) : null,
                    blocker_strictness || null,
                    custom_blocked_domains !== undefined ? String(custom_blocked_domains) : null,
                    Boolean(hasFastingStartTime)
                ]
            );

            const allProfilesRes = await pool.query(`SELECT * FROM sc_profiles ORDER BY profile_key ASC`);

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({
                    message: action === "create_profile" ? "Custom profile created in NeonDB" : "Profile updated in NeonDB",
                    profile: result.rows[0],
                    allProfiles: allProfilesRes.rows
                })
            };
        }

        if (action === "toggle_habit") {
            const { habit_code, habit_label, aura_reward = 25 } = body;
            if (!habit_code || !habit_label) {
                return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "habit_code and habit_label required" }) };
            }

            const existing = await pool.query(
                `SELECT id FROM sc_daily_habits WHERE profile_key = $1 AND habit_code = $2 AND completed_date = CURRENT_DATE`,
                [targetProfile, habit_code]
            );

            let completed = false;
            if (existing.rowCount > 0) {
                await pool.query(`DELETE FROM sc_daily_habits WHERE id = $1`, [existing.rows[0].id]);
                await pool.query(`UPDATE sc_profiles SET aura_points = GREATEST(0, aura_points - $2), updated_at = NOW() WHERE profile_key = $1`, [targetProfile, Number(aura_reward)]);
                completed = false;
            } else {
                await pool.query(
                    `INSERT INTO sc_daily_habits (profile_key, habit_code, habit_label, aura_reward, completed_date)
                     VALUES ($1, $2, $3, $4, CURRENT_DATE)
                     ON CONFLICT (profile_key, habit_code, completed_date) DO NOTHING`,
                    [targetProfile, habit_code, habit_label, Number(aura_reward)]
                );
                await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + $2, updated_at = NOW() WHERE profile_key = $1`, [targetProfile, Number(aura_reward)]);
                completed = true;
            }

            const updatedProfile = await pool.query(`SELECT * FROM sc_profiles WHERE profile_key = $1`, [targetProfile]);
            const todayHabits = await pool.query(`SELECT * FROM sc_daily_habits WHERE profile_key = $1 AND completed_date = CURRENT_DATE`, [targetProfile]);

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({ completed, profile: updatedProfile.rows[0], todayHabits: todayHabits.rows })
            };
        }

        if (action === "log_relapse") {
            const {
                streak_type = "PMO",
                streak_days_achieved = 0,
                trigger_category = "Late Night Browsing",
                emotional_state = "Stressed / Fatigued",
                lesson_learned = "Will activate Emergency Urge Shield earlier."
            } = body;

            const insertRes = await pool.query(
                `INSERT INTO sc_relapse_logs (profile_key, streak_type, streak_days_achieved, trigger_category, emotional_state, lesson_learned)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`,
                [targetProfile, streak_type, Number(streak_days_achieved), trigger_category, emotional_state, lesson_learned]
            );

            let dateUpdateSql = `pmo_start_time = NOW(), mo_start_time = NOW()`;
            if (streak_type === "P_ONLY") {
                dateUpdateSql = `p_start_time = NOW(), pmo_start_time = NOW()`;
            } else if (streak_type === "MO_ONLY") {
                dateUpdateSql = `mo_start_time = NOW(), pmo_start_time = NOW()`;
            } else {
                dateUpdateSql = `pmo_start_time = NOW(), p_start_time = NOW(), mo_start_time = NOW()`;
            }

            const profileRes = await pool.query(
                `UPDATE sc_profiles
                 SET ${dateUpdateSql},
                     longest_streak_days = GREATEST(longest_streak_days, FLOOR($2)::int),
                     updated_at = NOW()
                 WHERE profile_key = $1
                 RETURNING *`,
                [targetProfile, Number(streak_days_achieved)]
            );

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({
                    message: "Relapse logged without erasing historical milestones.",
                    relapse: insertRes.rows[0],
                    profile: profileRes.rows[0]
                })
            };
        }

        if (action === "add_journal") {
            const { title, mood = "Focused", energy_level = 8, urge_intensity = 2, content } = body;
            if (!title || !content) {
                return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Title and content are required." }) };
            }

            const entryRes = await pool.query(
                `INSERT INTO sc_journal_entries (profile_key, title, mood, energy_level, urge_intensity, content)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`,
                [targetProfile, title, mood, Number(energy_level), Number(urge_intensity), content]
            );
            const updatedProf = await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 30, updated_at = NOW() WHERE profile_key = $1 RETURNING *`, [targetProfile]);

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({ message: "Journal saved to NeonDB (+30 Aura)", entry: entryRes.rows[0], profile: updatedProf.rows[0] })
            };
        }

        if (action === "delete_journal") {
            const { id } = body;
            await pool.query(`DELETE FROM sc_journal_entries WHERE id = $1 AND profile_key = $2`, [Number(id), targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ message: "Journal deleted", deletedId: Number(id) }) };
        }

        if (action === "add_blog") {
            const { title, author, category, read_time, summary, content, source_url } = body;
            if (!title || !summary || !content) {
                return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Title, summary, and content are required." }) };
            }
            const blogRes = await pool.query(
                `INSERT INTO sc_blogs (title, author, category, read_time, summary, content, source_url, upvotes)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, 1)
                 RETURNING *`,
                [
                    title,
                    author || "Community Scholar",
                    category || "Transmutation",
                    read_time || "4 min read",
                    summary,
                    content,
                    source_url || ""
                ]
            );
            await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 50, updated_at = NOW() WHERE profile_key = $1`, [targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ message: "Blog published to NeonDB", blog: blogRes.rows[0] }) };
        }

        if (action === "upvote_blog") {
            const { id } = body;
            const blogRes = await pool.query(
                `UPDATE sc_blogs SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *`,
                [Number(id)]
            );
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ blog: blogRes.rows[0] }) };
        }

        if (action === "add_checkin") {
            const { handle, rank_badge, streak_days, pledge_text } = body;
            if (!pledge_text) {
                return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Pledge text is required." }) };
            }
            const commRes = await pool.query(
                `INSERT INTO sc_community_checkins (handle, rank_badge, streak_days, pledge_text, sparks)
                 VALUES ($1, $2, $3, $4, 1)
                 RETURNING *`,
                [handle || "Anonymous Monk", rank_badge || "Initiate", Number(streak_days || 1), pledge_text]
            );
            await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 20, updated_at = NOW() WHERE profile_key = $1`, [targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ checkin: commRes.rows[0] }) };
        }

        if (action === "spark_checkin") {
            const { id } = body;
            const commRes = await pool.query(
                `UPDATE sc_community_checkins SET sparks = sparks + 1 WHERE id = $1 RETURNING *`,
                [Number(id)]
            );
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ checkin: commRes.rows[0] }) };
        }

        // 7. Profile-Scoped NNN Daily Survival Matrix & Urge Thermometer Log (With Elapsed Date Immutability Check)
        if (action === "log_nnn_day") {
            const challengeYear = Number(body.challenge_year || 2026);
            const dayNumber = Number(body.day_number || 1);
            const status = String(body.status || "survived");
            const urgeLevel = Number(body.urge_level !== undefined ? body.urge_level : 2);
            const triggerNote = String(body.trigger_note || "");

            if (dayNumber < 1 || dayNumber > 30) {
                return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "day_number must be between 1 and 30." }) };
            }

            // Enforce server-side immutability for elapsed November dates
            const elapsedCheck = await pool.query(
                `SELECT (MAKE_DATE($1::int, 11, $2::int) < CURRENT_DATE) AS is_elapsed`,
                [challengeYear, dayNumber]
            );
            if (elapsedCheck.rows[0]?.is_elapsed) {
                return {
                    statusCode: 403,
                    headers: HEADERS,
                    body: JSON.stringify({
                        error: `November ${dayNumber}, ${challengeYear} has already elapsed and is permanently in read-only mode.`
                    })
                };
            }

            if (status === "unlogged") {
                await pool.query(
                    `DELETE FROM sc_nnn_daily_tracker WHERE profile_key = $1 AND challenge_year = $2 AND day_number = $3`,
                    [targetProfile, challengeYear, dayNumber]
                );
                return {
                    statusCode: 200,
                    headers: HEADERS,
                    body: JSON.stringify({
                        deleted: true,
                        profile_key: targetProfile,
                        challenge_year: challengeYear,
                        day_number: dayNumber
                    })
                };
            }

            const nnnRes = await pool.query(
                `INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note, logged_at)
                 VALUES ($1, $2, $3, $4, $5, $6, NOW())
                 ON CONFLICT (profile_key, challenge_year, day_number)
                 DO UPDATE SET status = EXCLUDED.status, urge_level = EXCLUDED.urge_level, trigger_note = EXCLUDED.trigger_note, logged_at = NOW()
                 RETURNING *`,
                [targetProfile, challengeYear, dayNumber, status, urgeLevel, triggerNote]
            );

            let updatedProfileRow = null;
            if (status === "survived") {
                const profUpd = await pool.query(
                    `UPDATE sc_profiles SET aura_points = aura_points + 25, updated_at = NOW() WHERE profile_key = $1 RETURNING *`,
                    [targetProfile]
                );
                updatedProfileRow = profUpd.rows[0] || null;
            }

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({
                    nnnDay: nnnRes.rows[0],
                    profile: updatedProfileRow
                })
            };
        }

        // 8. NNN Funny Stories & Laugh Salutes
        if (action === "add_nnn_story") {
            const { author_handle, day_tag, title, story_body, humor_tag } = body;
            if (!title || !story_body) {
                return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "Title and story_body required" }) };
            }
            const stRes = await pool.query(
                `INSERT INTO sc_nnn_stories (author_handle, day_tag, title, story_body, humor_tag, laugh_sparks)
                 VALUES ($1, $2, $3, $4, $5, 1)
                 RETURNING *`,
                [author_handle || "AnonSpartan", day_tag || "Day 14 of NNN", title, story_body, humor_tag || "Superpower Meme Lore"]
            );
            await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 35, updated_at = NOW() WHERE profile_key = $1`, [targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ story: stRes.rows[0] }) };
        }

        if (action === "spark_nnn_story") {
            const { id } = body;
            const stRes = await pool.query(
                `UPDATE sc_nnn_stories SET laugh_sparks = laugh_sparks + 1 WHERE id = $1 RETURNING *`,
                [Number(id)]
            );
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ story: stRes.rows[0] }) };
        }

        // 9. Profile-Scoped Self-Touching & Sexual Activity Records Calendar (With Elapsed Date Immutability Check)
        if (action === "save_self_touching_record") {
            const recordDate = String(body.record_date || "").trim();
            const activityStatus = String(body.activity_status || "").trim();
            const notes = String(body.notes || "").trim();

            if (!/^\d{4}-\d{2}-\d{2}$/.test(recordDate)) {
                return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: "record_date (YYYY-MM-DD) is required." }) };
            }

            // Enforce server-side immutability for elapsed dates
            const elapsedRes = await pool.query(
                `SELECT ($1::date < CURRENT_DATE) AS is_elapsed`,
                [recordDate]
            );
            if (elapsedRes.rows[0]?.is_elapsed) {
                return {
                    statusCode: 403,
                    headers: HEADERS,
                    body: JSON.stringify({
                        error: `Date ${recordDate} has already elapsed and is permanently immutable.`
                    })
                };
            }

            if (activityStatus === "CLEAR") {
                await pool.query(
                    `DELETE FROM sc_self_touching_records WHERE profile_key = $1 AND record_date = $2::date`,
                    [targetProfile, recordDate]
                );
                return {
                    statusCode: 200,
                    headers: HEADERS,
                    body: JSON.stringify({ deleted: true, profile_key: targetProfile, record_date: recordDate })
                };
            }

            if (!VALID_SELF_TOUCHING_STATUSES.includes(activityStatus)) {
                return {
                    statusCode: 400,
                    headers: HEADERS,
                    body: JSON.stringify({
                        error: `Invalid activity_status. Allowed values: ${VALID_SELF_TOUCHING_STATUSES.join(", ")}`
                    })
                };
            }

            const recRes = await pool.query(
                `INSERT INTO sc_self_touching_records (profile_key, record_date, activity_status, notes, updated_at)
                 VALUES ($1, $2::date, $3, $4, NOW())
                 ON CONFLICT (profile_key, record_date)
                 DO UPDATE SET activity_status = EXCLUDED.activity_status, notes = EXCLUDED.notes, updated_at = NOW()
                 RETURNING id, profile_key, TO_CHAR(record_date, 'YYYY-MM-DD') AS record_date, activity_status, notes, updated_at`,
                [targetProfile, recordDate, activityStatus, notes]
            );

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({ record: recRes.rows[0] })
            };
        }

        return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: `Unknown action: ${action}` }) };
    } catch (err) {
        console.error("NeonDB API Error:", err);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify({ error: err.message || "Internal Server Error" })
        };
    }
};