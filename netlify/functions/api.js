const { Pool } = require("pg");

/**
 * SeedController + NNN (No Nut November) Unified NeonDB PostgreSQL Serverless Handler
 * Matches your exact pg.Pool + process.env.DATABASE_URL architecture.
 * Automatically creates all 8 tables (including NNN tracker & NNN funny stories) on first call.
 */
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

let schemaInitialized = false;

async function ensureSchema() {
    if (schemaInitialized) return;

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
    `);

    // Seed initial blogs if empty
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
                'A landmark study by Jiang et al. (2003) published in the Journal of Zhejiang University SCIENCE demonstrated that serum testosterone concentrations remain stable during the first 6 days of abstinence, then surge to 145.7% of baseline on Day 7. Beyond the acute Day-7 hormonal wave, prolonged semen retention shifts focus toward androgen receptor (AR) sensitivity in the prefrontal cortex and amygdala.',
                'https://pubmed.ncbi.nlm.nih.gov/12659241/',
                68
            ),
            (
                'Dopamine D2 Receptor Resensitization & Prefrontal Executive Control',
                'SeedController Lab',
                'Neuroscience',
                '7 min read',
                'How removing artificial supernormal stimuli reverses striatal downregulation and rebuilds deep work capacity over a 90-day reboot cycle.',
                'Neuroimaging studies by Kühn and Gallinat (2014) in JAMA Psychiatry revealed an inverse correlation between compulsive visual consumption and gray matter volume in the right caudate of the striatum, alongside reduced functional connectivity to the dorsolateral prefrontal cortex (dlPFC).',
                'https://pubmed.ncbi.nlm.nih.gov/24871202/',
                94
            ),
            (
                'Ojas, Sublimation, and Modern Bio-Energetic Transmutation Protocols',
                'Acharya Dev & Performance Team',
                'Transmutation',
                '5 min read',
                'Synthesizing classical Brahmacharya breathwork with modern vagal tone regulation to redirect restless urge energy into creative output.',
                'Retention without transmutation creates internal friction; retention paired with deliberate somatic channeling produces extraordinary creative stamina. Execute a 4-7-8 breath cycle followed by compound movement to convert urge waves into tangible progress.',
                'https://pubmed.ncbi.nlm.nih.gov/29616846/',
                53
            )
        `);
    }

    // Seed initial community check-ins if empty
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

    // Seed initial NNN Funny Stories if empty
    const storyCount = await pool.query(`SELECT COUNT(*)::int AS cnt FROM sc_nnn_stories`);
    if (storyCount.rows[0].cnt === 0) {
        await pool.query(`
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
            )
        `);
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
            const [profileRes, habitsRes, relapsesRes, journalsRes, blogsRes, commRes, nnnDaysRes, nnnStoriesRes] = await Promise.all([
                pool.query(`SELECT * FROM sc_profiles WHERE profile_key = $1`, [profileKey]),
                pool.query(`SELECT * FROM sc_daily_habits WHERE profile_key = $1 AND completed_date = CURRENT_DATE ORDER BY id ASC`, [profileKey]),
                pool.query(`SELECT * FROM sc_relapse_logs WHERE profile_key = $1 ORDER BY logged_at DESC LIMIT 30`, [profileKey]),
                pool.query(`SELECT * FROM sc_journal_entries WHERE profile_key = $1 ORDER BY created_at DESC LIMIT 50`, [profileKey]),
                pool.query(`SELECT * FROM sc_blogs ORDER BY created_at DESC LIMIT 30`),
                pool.query(`SELECT * FROM sc_community_checkins ORDER BY created_at DESC LIMIT 25`),
                pool.query(`SELECT * FROM sc_nnn_daily_tracker WHERE profile_key = $1 ORDER BY day_number ASC`, [profileKey]),
                pool.query(`SELECT * FROM sc_nnn_stories ORDER BY laugh_sparks DESC, created_at DESC LIMIT 30`)
            ]);

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({
                    source: "neondb-postgresql",
                    profile: profileRes.rows[0],
                    todayHabits: habitsRes.rows,
                    relapseHistory: relapsesRes.rows,
                    journalEntries: journalsRes.rows,
                    blogs: blogsRes.rows,
                    communityCheckins: commRes.rows,
                    nnnDailyTracker: nnnDaysRes.rows,
                    nnnStories: nnnStoriesRes.rows
                })
            };
        }

        /* ===== POST / PUT / DELETE: Mutate state in NeonDB ===== */
        const body = JSON.parse(event.body || "{}");
        const action = body.action || params.action || "";
        const targetProfile = String(body.profileKey || profileKey).trim();

        // 1. Update Profile
        if (action === "update_profile") {
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
                     fasting_start_time = $10,
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
                    custom_blocked_domains !== undefined ? String(custom_blocked_domains) : null
                ]
            );

            return {
                statusCode: 200,
                headers: HEADERS,
                body: JSON.stringify({ message: "Profile updated in NeonDB", profile: result.rows[0] })
            };
        }

        // 2. Toggle Daily Habit
        if (action === "toggle_habit") {
            const { habit_code, habit_label, aura_reward = 25 } = body;
            const existing = await pool.query(
                `SELECT id FROM sc_daily_habits WHERE profile_key = $1 AND habit_code = $2 AND completed_date = CURRENT_DATE`,
                [targetProfile, habit_code]
            );

            let completed = false;
            if (existing.rowCount > 0) {
                await pool.query(`DELETE FROM sc_daily_habits WHERE id = $1`, [existing.rows[0].id]);
                await pool.query(`UPDATE sc_profiles SET aura_points = GREATEST(0, aura_points - $2) WHERE profile_key = $1`, [targetProfile, Number(aura_reward)]);
                completed = false;
            } else {
                await pool.query(
                    `INSERT INTO sc_daily_habits (profile_key, habit_code, habit_label, aura_reward, completed_date)
                     VALUES ($1, $2, $3, $4, CURRENT_DATE)`,
                    [targetProfile, habit_code, habit_label, Number(aura_reward)]
                );
                await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + $2 WHERE profile_key = $1`, [targetProfile, Number(aura_reward)]);
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

        // 3. Log Relapse
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

            let dateUpdateSql = `pmo_start_time = NOW(), p_start_time = NOW(), mo_start_time = NOW()`;
            if (streak_type === "P_ONLY") {
                dateUpdateSql = `p_start_time = NOW(), pmo_start_time = NOW()`;
            } else if (streak_type === "MO_ONLY") {
                dateUpdateSql = `mo_start_time = NOW(), pmo_start_time = NOW()`;
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
                body: JSON.stringify({ relapse: insertRes.rows[0], profile: profileRes.rows[0] })
            };
        }

        // 4. Journal CRUD
        if (action === "add_journal") {
            const { title, mood = "Focused", energy_level = 8, urge_intensity = 2, content } = body;
            const entryRes = await pool.query(
                `INSERT INTO sc_journal_entries (profile_key, title, mood, energy_level, urge_intensity, content)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [targetProfile, title, mood, Number(energy_level), Number(urge_intensity), content]
            );
            await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 30 WHERE profile_key = $1`, [targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ entry: entryRes.rows[0] }) };
        }

        if (action === "delete_journal") {
            const { id } = body;
            await pool.query(`DELETE FROM sc_journal_entries WHERE id = $1 AND profile_key = $2`, [Number(id), targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ deletedId: Number(id) }) };
        }

        // 5. Blog CRUD
        if (action === "add_blog") {
            const { title, author, category, read_time, summary, content, source_url } = body;
            const blogRes = await pool.query(
                `INSERT INTO sc_blogs (title, author, category, read_time, summary, content, source_url, upvotes)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, 1) RETURNING *`,
                [title, author || "Community Scholar", category || "Transmutation", read_time || "5 min read", summary, content, source_url || ""]
            );
            await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 50 WHERE profile_key = $1`, [targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ blog: blogRes.rows[0] }) };
        }

        if (action === "upvote_blog") {
            const { id } = body;
            const blogRes = await pool.query(`UPDATE sc_blogs SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *`, [Number(id)]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ blog: blogRes.rows[0] }) };
        }

        // 6. Community Check-In
        if (action === "add_checkin") {
            const { handle, rank_badge, streak_days, pledge_text } = body;
            const commRes = await pool.query(
                `INSERT INTO sc_community_checkins (handle, rank_badge, streak_days, pledge_text, sparks)
                 VALUES ($1, $2, $3, $4, 1) RETURNING *`,
                [handle || "Anonymous Monk", rank_badge || "Initiate", Number(streak_days || 1), pledge_text]
            );
            await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 20 WHERE profile_key = $1`, [targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ checkin: commRes.rows[0] }) };
        }

        if (action === "spark_checkin") {
            const { id } = body;
            const commRes = await pool.query(`UPDATE sc_community_checkins SET sparks = sparks + 1 WHERE id = $1 RETURNING *`, [Number(id)]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ checkin: commRes.rows[0] }) };
        }

        // 7. NNN 30-Day Daily Tracker & Urge Thermometer Log (NEW)
        if (action === "log_nnn_day") {
            const { day_number = 1, status = "survived", urge_level = 2, trigger_note = "" } = body;
            const dayNum = Math.max(1, Math.min(30, Number(day_number)));
            const urgeVal = Math.max(0, Math.min(10, Number(urge_level)));

            const nnnRes = await pool.query(
                `INSERT INTO sc_nnn_daily_tracker (profile_key, challenge_year, day_number, status, urge_level, trigger_note, logged_at)
                 VALUES ($1, 2026, $2, $3, $4, $5, NOW())
                 ON CONFLICT (profile_key, challenge_year, day_number)
                 DO UPDATE SET status = EXCLUDED.status, urge_level = EXCLUDED.urge_level, trigger_note = EXCLUDED.trigger_note, logged_at = NOW()
                 RETURNING *`,
                [targetProfile, dayNum, status, urgeVal, String(trigger_note)]
            );

            if (status === "survived") {
                await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 25 WHERE profile_key = $1`, [targetProfile]);
            }

            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ nnnDay: nnnRes.rows[0] }) };
        }

        // 8. NNN Funny Stories & War Room Lore CRUD (NEW)
        if (action === "add_nnn_story") {
            const { author_handle, day_tag, title, story_body, humor_tag } = body;
            const storyRes = await pool.query(
                `INSERT INTO sc_nnn_stories (author_handle, day_tag, title, story_body, humor_tag, laugh_sparks)
                 VALUES ($1, $2, $3, $4, $5, 1) RETURNING *`,
                [
                    author_handle || "NovemberSpartan",
                    day_tag || "Day 15 of NNN",
                    title,
                    story_body,
                    humor_tag || "Superpower Meme Lore"
                ]
            );
            await pool.query(`UPDATE sc_profiles SET aura_points = aura_points + 35 WHERE profile_key = $1`, [targetProfile]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ story: storyRes.rows[0] }) };
        }

        if (action === "spark_nnn_story") {
            const { id } = body;
            const storyRes = await pool.query(`UPDATE sc_nnn_stories SET laugh_sparks = laugh_sparks + 1 WHERE id = $1 RETURNING *`, [Number(id)]);
            return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ story: storyRes.rows[0] }) };
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
