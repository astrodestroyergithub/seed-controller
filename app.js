if (!window.__SEEDCONTROLLER_BOOTED__) {
window.__SEEDCONTROLLER_BOOTED__ = true;

/* ==========================================================================
   SeedController — Sovereign Retention, Bio-Transmutation & Neuro-Reboot App
   Full Client-Side Controller + NeonDB Serverless Sync + Live Public APIs
   ========================================================================== */

const STORAGE_KEY = "seedcontroller_v1_state";

// 8 Rank Progression Tiers (ASCEND & NoBeep 90-Day Reboot System)
const RANK_TIERS = [
    { id: 1, minDays: 0, title: "Seed Initiate", badge: "🌱", freq: "396 Hz Grounding", orbStage: "Ember Seed • Stage I", color: "#a78bfa", desc: "Initial commitment to sovereignty. Breaking automatic limbic loops." },
    { id: 2, minDays: 3, title: "Spark Keeper", badge: "🔥", freq: "417 Hz Clearing", orbStage: "Vital Spark • Stage II", color: "#38bdf8", desc: "Dopamine withdrawal peak. Restlessness begins converting into physical drive." },
    { id: 3, minDays: 7, title: "Endocrine Guardian", badge: "🛡️", freq: "432 Hz Harmony", orbStage: "Androgen Pulse • Stage III", color: "#4ade80", desc: "Day-7 serum testosterone surge (+145.7% baseline per Jiang et al., 2003)." },
    { id: 4, minDays: 14, title: "Neural Warrior", badge: "⚔️", freq: "528 Hz Repair", orbStage: "Solar Core • Stage IV", color: "#ffd700", desc: "Two weeks clean. Deeper sleep architecture, sharper eye contact, vocal resonance." },
    { id: 5, minDays: 30, title: "Alchemical Transmuter", badge: "⚡", freq: "639 Hz Radiance", orbStage: "Ojas Vortex • Stage V", color: "#f59e0b", desc: "DeltaFosB clearance accelerates. High creative stamina and emotional composure." },
    { id: 6, minDays: 60, title: "Solar Sovereign", badge: "👑", freq: "741 Hz Awakening", orbStage: "Supernova Halo • Stage VI", color: "#ec4899", desc: "Dopamine D2 receptor density substantially restored. Natural joy in hard work." },
    { id: 7, minDays: 90, title: "Ascended Architect", badge: "🏛️", freq: "852 Hz Mastery", orbStage: "Crystalline Star • Stage VII", color: "#22d3ee", desc: "Full 90-Day Reboot benchmark achieved. Prefrontal executive mastery." },
    { id: 8, minDays: 180, title: "Brahmacharya Sage", badge: "🌌", freq: "963 Hz Crown", orbStage: "Cosmic Singularity • Stage VIII", color: "#fff3a8", desc: "Complete mastery of biological impulses and purposeful life-force direction." }
];

// Daily Energy Transmutation Habits (Transcend Inspired)
const DAILY_HABITS = [
    { code: "cold_exposure", label: "❄️ Cold Shower / Vagal Hydro-Reset (3 mins)", aura: 30 },
    { code: "pranayama", label: "🧘 10-Min Pranayama / Ojas Upward Draw", aura: 25 },
    { code: "heavy_training", label: "🏋️ Compound Strength / High-Intensity Output", aura: 35 },
    { code: "deep_creation", label: "💻 90-Min Undistracted Deep Work / Study Block", aura: 40 },
    { code: "zero_edging", label: "🛡️ Zero Peek & Zero Dopamine Binge Scrolling", aura: 35 },
    { code: "night_curfew", label: "🌙 Digital Sunset (Phone Away 45m Before Sleep)", aura: 25 }
];

// ASCEND Structured Science Curriculum
const SCIENCE_CURRICULUM = [
    {
        tag: "Endocrinology • Day 7",
        title: "Serum Testosterone Dynamics & Androgen Receptors",
        body: "Jiang et al. (2003) documented a 145.7% peak in serum testosterone on Day 7 of abstinence. Beyond transient hormonal waves, sustained retention prevents prolactin spikes and upregulates brain androgen receptor density.",
        url: "https://pubmed.ncbi.nlm.nih.gov/12659241/"
    },
    {
        tag: "Neuroplasticity • Days 14–60",
        title: "Striatal D2 Receptor Recovery & DeltaFosB Clearance",
        body: "Supranormal artificial stimuli flood the nucleus accumbens with dopamine, triggering receptor downregulation. Abstinence allows DeltaFosB (the molecular switch of compulsion) to degrade over a 4–8 week window.",
        url: "https://pubmed.ncbi.nlm.nih.gov/24871202/"
    },
    {
        tag: "Autonomic Regulation • Daily",
        title: "Slow Breathing, Vagal Tone & Prefrontal Inhibition",
        body: "Paced respiratory sinus arrhythmia (4-7-8 or 6 breaths/min) elevates heart-rate variability (HRV) and restores top-down inhibitory control from the dorsolateral prefrontal cortex over amygdala urge circuits.",
        url: "https://pubmed.ncbi.nlm.nih.gov/29616846/"
    }
];

// Default Initial State (14 Days PMO, 21 Days P-Free so user immediately sees rich progress & can customize)
function getDefaultState() {
    const now = Date.now();
    const fourteenDaysAgo = new Date(now - (14 * 86400000 + 8 * 3600000 + 42 * 60000)).toISOString();
    const twentyOneDaysAgo = new Date(now - (21 * 86400000 + 4 * 3600000)).toISOString();

    return {
        profile: {
            profile_key: "default_monk",
            display_name: "Sovereign Initiate",
            pmo_start_time: fourteenDaysAgo,
            p_start_time: twentyOneDaysAgo,
            mo_start_time: fourteenDaysAgo,
            longest_streak_days: 21,
            aura_points: 420,
            target_days: 90,
            fasting_active: false,
            fasting_start_time: null,
            fasting_target_hours: 16,
            blocker_strictness: "strict",
            custom_blocked_domains: "adultsite.example,triggerhub.example,nsfwscroll.example"
        },
        completedHabitsToday: ["cold_exposure", "zero_edging"],
        relapseHistory: [
            {
                id: 101,
                streak_type: "MO_ONLY",
                streak_days_achieved: 19.4,
                trigger_category: "Late Night Scrolling",
                emotional_state: "Exhausted / Low Dopamine",
                lesson_learned: "Kept P-Free streak intact; installed bedroom phone curfew after 10:30 PM.",
                logged_at: new Date(now - 14 * 86400000).toISOString()
            },
            {
                id: 100,
                streak_type: "PMO",
                streak_days_achieved: 11.2,
                trigger_category: "Stress / Work Burnout",
                emotional_state: "Restless / Anxious",
                lesson_learned: "Replaced afternoon stress cues with 4-7-8 breathwork and 25 pushups.",
                logged_at: new Date(now - 34 * 86400000).toISOString()
            }
        ],
        journalEntries: [
            {
                id: 201,
                title: "Day 14: Noticeable Surge in Morning Drive & Focus",
                mood: "⚡ High Drive & Focused",
                energy_level: 9,
                urge_intensity: 2,
                content: "Two full weeks locked in. Completed a 16-hour intermittent fast and hit a personal best on compound lifts. Mental fog has lifted completely.",
                created_at: new Date(now - 6 * 3600000).toISOString()
            },
            {
                id: 200,
                title: "Day 9: Navigating the Post-Peak Energy Wave",
                mood: "🧘 Calm & Grounded",
                energy_level: 8,
                urge_intensity: 4,
                content: "Felt a wave of restlessness around 11 PM, used the Emergency Urge Shield + 4-7-8 breathing for 3 cycles. Woke up grateful I held the line.",
                created_at: new Date(now - 5 * 86400000).toISOString()
            }
        ],
        blogs: [
            {
                id: 301,
                title: "The Day-7 Testosterone Peak & Androgen Receptor Upregulation",
                author: "Dr. Marcus Vance • Neuroendocrinology",
                category: "Endocrinology",
                read_time: "6 min read",
                summary: "Clinical evaluation of serum testosterone dynamics during short-term and long-term abstinence, and why receptor density matters more than transient spikes.",
                content: "A landmark study by Jiang et al. (2003) published in the Journal of Zhejiang University SCIENCE demonstrated that serum testosterone concentrations remain stable during the first 6 days of abstinence, then surge to 145.7% of baseline on Day 7.\n\nBeyond the acute Day-7 hormonal wave, prolonged semen retention shifts focus toward androgen receptor (AR) sensitivity in the prefrontal cortex and amygdala. When chronic supranormal dopamine stimulation ceases, DeltaFosB accumulation begins to clear, restoring natural drive, morning vitality, and calm assertiveness during high-pressure tasks.",
                source_url: "https://pubmed.ncbi.nlm.nih.gov/12659241/",
                upvotes: 68
            },
            {
                id: 302,
                title: "Dopamine D2 Receptor Resensitization & Prefrontal Executive Control",
                author: "SeedController Research Lab",
                category: "Neuroscience",
                read_time: "7 min read",
                summary: "How removing artificial supernormal stimuli reverses striatal downregulation and rebuilds deep work capacity over a 90-day reboot cycle.",
                content: "Neuroimaging studies by Kühn and Gallinat (2014) in JAMA Psychiatry revealed an inverse correlation between compulsive visual consumption and gray matter volume in the right caudate of the striatum, alongside reduced functional connectivity to the dorsolateral prefrontal cortex (dlPFC).\n\nDuring a structured 90-day reboot, abstaining from artificial novelty allows tonic dopamine baseline levels to stabilize. Practitioners consistently report a transition around Days 21–35 where everyday rewards—sunlight, strength training, deep coding, and conversation—regain vivid emotional salience.",
                source_url: "https://pubmed.ncbi.nlm.nih.gov/24871202/",
                upvotes: 94
            },
            {
                id: 303,
                title: "Ojas, Sublimation, and Modern Bio-Energetic Transmutation Protocols",
                author: "Acharya Dev & Performance Team",
                category: "Transmutation",
                read_time: "5 min read",
                summary: "Synthesizing classical Brahmacharya breathwork with modern vagal tone regulation to redirect restless urge energy into creative output.",
                content: "Retention without transmutation creates internal friction; retention paired with deliberate somatic channeling produces extraordinary creative stamina.\n\nWhen sympathetic arousal spikes during an urge wave, executing a 4-4-6-2 box-breath or Ashwini Mudra contracts the pelvic floor while lengthening the exhalation, activating the vagus nerve. Follow this immediately with 20 minutes of compound physical movement or focused output to convert stagnant restlessness into tangible progress.",
                source_url: "https://pubmed.ncbi.nlm.nih.gov/29616846/",
                upvotes: 53
            }
        ],
        communityCheckins: [
            {
                id: 401,
                handle: "SpartanCoder_99",
                rank_badge: "Solar Sovereign (Day 60+)",
                streak_days: 64,
                pledge_text: "Day 64 locked in. Replaced late-night doomscrolling with 5:30 AM cold plunges and 2 hours of deep system architecture work.",
                sparks: 31
            },
            {
                id: 402,
                handle: "VedicMonk_IN",
                rank_badge: "Alchemical Transmuter (Day 30+)",
                streak_days: 38,
                pledge_text: "Completed an 18-hour intermittent fast alongside pranayama today. Urges around day 35 were strong, but the Emergency Urge Shield kept me grounded.",
                sparks: 24
            },
            {
                id: 403,
                handle: "AtlasReborn",
                rank_badge: "Neural Warrior (Day 14+)",
                streak_days: 16,
                pledge_text: "Two full weeks clean on both P and MO tracks. Sleep quality and eye contact in meetings have noticeably leveled up.",
                sparks: 19
            }
        ]
    };
}

let appState = getDefaultState();
let isDiscreetMode = false;
let mainClockInterval = null;
let breathworkInterval = null;
let breathMode = "box";
let breathCyclesCompleted = 0;
let emergencyInterval = null;
let audioCtx = null;
let hypnosisOsc1 = null;
let hypnosisOsc2 = null;
let hypnosisGain = null;
let isHypnosisPlaying = false;
let rebootChartInstance = null;

/* ===== SAFE LOCAL STORAGE & TOAST HELPERS ===== */
function loadLocalState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            appState = { ...getDefaultState(), ...parsed, profile: { ...getDefaultState().profile, ...(parsed.profile || {}) } };
        }
    } catch (e) {
        console.warn("LocalStorage unavailable inside sandboxed context; using in-memory state.");
    }
}

function saveLocalState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
        // Ignore sandbox storage blocks
    }
}

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `sc-toast ${type}`;
    const icon = type === "success" ? "✅" : type === "error" ? "⚠️" : "⚡";
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        setTimeout(() => toast.remove(), 250);
    }, 3400);
}

/* ===== NEONDB SERVERLESS SYNC LAYER WITH LIVE DIAGNOSTICS ===== */
async function syncWithNeonDB(showNotification = false) {
    const dot = document.getElementById("dbStatusDot");
    const label = document.getElementById("dbStatusLabel");
    const diagEl = document.getElementById("dbDiagnosticOutput");
    const profileKey = (document.getElementById("profileKeyInput")?.value || appState.profile.profile_key || "default_monk").trim();
    appState.profile.profile_key = profileKey;

    const isSandboxedPreview =
        window.location.protocol === "file:" ||
        window.location.protocol === "blob:" ||
        window.location.protocol === "data:" ||
        window.location.hostname.includes("googleusercontent.com");

    if (isSandboxedPreview) {
        if (dot) dot.className = "status-dot connected";
        if (label) label.textContent = "NeonDB Ready (Preview)";
        if (diagEl) {
            diagEl.innerHTML = `<span class="text-emerald-300">✓ Canvas Preview Mode Active:</span> In-browser persistence is active. Once deployed to Netlify with <code>DATABASE_URL</code>, this endpoint connects directly to your NeonDB PostgreSQL instance.`;
        }
        if (showNotification) {
            showToast("Preview Mode: State saved locally. On Netlify, this syncs with NeonDB PostgreSQL!", "success");
        }
        return false;
    }

    try {
        const res = await fetch(`${window.location.origin}/.netlify/functions/api?profileKey=${encodeURIComponent(profileKey)}`, {
            headers: { "Accept": "application/json" }
        });

        const rawText = await res.text();
        let data = null;
        try {
            data = JSON.parse(rawText);
        } catch (parseErr) {
            throw new Error(
                `Endpoint /.netlify/functions/api returned HTML instead of JSON (HTTP ${res.status}). Make sure you deployed the netlify/functions folder and ran 'npm install' (not drag-and-drop without node_modules).`
            );
        }

        if (!res.ok) {
            const errMsg = (data && (data.error || data.hint)) || `HTTP ${res.status}`;
            throw new Error(errMsg);
        }

        if (data && data.profile) {
            appState.profile = { ...appState.profile, ...data.profile };
            if (Array.isArray(data.todayHabits)) {
                appState.completedHabitsToday = data.todayHabits.map((h) => h.habit_code);
            }
            if (Array.isArray(data.relapseHistory) && data.relapseHistory.length > 0) {
                appState.relapseHistory = data.relapseHistory;
            }
            if (Array.isArray(data.journalEntries) && data.journalEntries.length > 0) {
                appState.journalEntries = data.journalEntries;
            }
            if (Array.isArray(data.blogs) && data.blogs.length > 0) {
                appState.blogs = data.blogs;
            }
            if (Array.isArray(data.communityCheckins) && data.communityCheckins.length > 0) {
                appState.communityCheckins = data.communityCheckins;
            }
            ensureMultiProfileStructures();
            if (Array.isArray(data.allProfiles) && data.allProfiles.length > 0) {
                data.allProfiles.forEach((pRow) => {
                    const pk = pRow.profile_key;
                    if (!appState.profilesByKey[pk]) {
                        appState.profilesByKey[pk] = createBlankProfileBundle(pk, pRow.display_name || pk);
                    }
                    appState.profilesByKey[pk].profile = {
                        ...appState.profilesByKey[pk].profile,
                        ...pRow
                    };
                });
                populateAllProfileDropdowns();
            }
            if (Array.isArray(data.allNnnDailyTracker) && data.allNnnDailyTracker.length > 0) {
                data.allNnnDailyTracker.forEach((row) => {
                    const pk = row.profile_key || profileKey;
                    const yr = Number(row.challenge_year || 2026);
                    if (!appState.nnnDailyByProfile[pk]) appState.nnnDailyByProfile[pk] = {};
                    if (!appState.nnnDailyByProfile[pk][yr]) appState.nnnDailyByProfile[pk][yr] = {};
                    appState.nnnDailyByProfile[pk][yr][Number(row.day_number)] = row;
                });
            }
            if (Array.isArray(data.nnnDailyTracker)) {
                ensureNnnStateDefaults();
                const activeYr = Number(document.getElementById("nnnMatrixYearSelect")?.value || 2026);
                if (!appState.nnnDailyByProfile[profileKey]) appState.nnnDailyByProfile[profileKey] = {};
                data.nnnDailyTracker.forEach((row) => {
                    const yr = Number(row.challenge_year || 2026);
                    if (!appState.nnnDailyByProfile[profileKey][yr]) appState.nnnDailyByProfile[profileKey][yr] = {};
                    appState.nnnDailyByProfile[profileKey][yr][Number(row.day_number)] = row;
                });
                appState.nnnDailyMap = appState.nnnDailyByProfile[profileKey][activeYr] || {};
                renderNnnCalendar();
                renderNnnYearlyStatus();
            }
            if (Array.isArray(data.allSelfTouchingRecords) && data.allSelfTouchingRecords.length > 0) {
                data.allSelfTouchingRecords.forEach((rec) => {
                    const pk = rec.profile_key || profileKey;
                    if (!appState.selfTouchingByProfile[pk]) appState.selfTouchingByProfile[pk] = {};
                    appState.selfTouchingByProfile[pk][rec.record_date] = rec;
                });
            }
            if (Array.isArray(data.selfTouchingRecords)) {
                if (!appState.selfTouchingByProfile[profileKey]) appState.selfTouchingByProfile[profileKey] = {};
                data.selfTouchingRecords.forEach((rec) => {
                    appState.selfTouchingByProfile[profileKey][rec.record_date] = rec;
                });
                renderSelfTouchingCalendar();
            }
            if (Array.isArray(data.nnnStories) && data.nnnStories.length > 0) {
                appState.nnnStories = data.nnnStories;
                renderNnnStories();
            }
            saveLocalState();
            renderAll();
            if (dot) dot.className = "status-dot connected";
            if (label) label.textContent = "NeonDB Connected";
            if (diagEl) {
                diagEl.innerHTML = `<span class="text-emerald-400 font-bold">● CONNECTED TO NEONDB POSTGRESQL</span><br>Profile Key: <strong>${profileKey}</strong> • Aura XP: <strong>${appState.profile.aura_points}</strong> • Synced at: ${new Date().toLocaleTimeString()}`;
            }
            if (showNotification) showToast(`Synchronized profile "${profileKey}" from NeonDB PostgreSQL!`, "success");
            return true;
        }
    } catch (err) {
        if (dot) dot.className = "status-dot local";
        if (label) label.textContent = "Local Persistence (Click to Check DB)";
        if (diagEl) {
            diagEl.innerHTML = `<span class="text-amber-300 font-bold">⚠️ NeonDB Sync Notice:</span> ${err.message}<br><span class="text-white/60">Checklist: (1) In Netlify Site Configuration → Environment Variables, ensure key is named exactly <code>DATABASE_URL</code>, (2) Trigger a new deploy in Netlify Deploys tab after adding the variable, (3) Ensure <code>package.json</code> is in your root folder so Netlify bundles <code>pg</code>.</span>`;
        }
        if (showNotification) {
            showToast(`NeonDB Info: ${err.message}`, "info");
        }
    }
    return false;
}

async function sendNeonAction(action, payload) {
    saveLocalState();
    try {
        const res = await fetch(`${window.location.origin}/.netlify/functions/api`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action,
                profileKey: appState.profile.profile_key,
                ...payload
            })
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (e) {
        // Fallback handled seamlessly by local state
    }
    return null;
}

/* ===== STREAK & RANK CALCULATIONS ===== */
function getElapsedMetrics(isoStart) {
    const startMs = new Date(isoStart).getTime() || Date.now();
    const diffMs = Math.max(0, Date.now() - startMs);
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const exactDays = diffMs / 86400000;
    return { days, hours, minutes, seconds, exactDays };
}

function getCurrentRankInfo(days) {
    let current = RANK_TIERS[0];
    let next = RANK_TIERS[1] || RANK_TIERS[0];
    for (let i = 0; i < RANK_TIERS.length; i++) {
        if (days >= RANK_TIERS[i].minDays) {
            current = RANK_TIERS[i];
            next = RANK_TIERS[i + 1] || RANK_TIERS[i];
        }
    }
    const span = Math.max(1, next.minDays - current.minDays);
    const pct = current.id === next.id ? 100 : Math.min(100, Math.round(((days - current.minDays) / span) * 100));
    return { current, next, pct };
}

/* ===== LIVE TICKING TIMERS (STREAK + INTERMITTENT FASTING) ===== */
function updateLiveClocks() {
    const pmo = getElapsedMetrics(appState.profile.pmo_start_time);
    const pFree = getElapsedMetrics(appState.profile.p_start_time);
    const moFree = getElapsedMetrics(appState.profile.mo_start_time);

    if (pmo.days > appState.profile.longest_streak_days) {
        appState.profile.longest_streak_days = pmo.days;
    }

    document.getElementById("timerDays").textContent = String(pmo.days).padStart(2, "0");
    document.getElementById("timerHours").textContent = String(pmo.hours).padStart(2, "0");
    document.getElementById("timerMinutes").textContent = String(pmo.minutes).padStart(2, "0");
    document.getElementById("timerSeconds").textContent = String(pmo.seconds).padStart(2, "0");

    document.getElementById("pFreeDays").textContent = pFree.days;
    document.getElementById("moFreeDays").textContent = moFree.days;
    document.getElementById("longestStreakDays").textContent = appState.profile.longest_streak_days;

    // Update Rank & Bio-Telemetry
    const rankInfo = getCurrentRankInfo(pmo.days);
    document.getElementById("headerRankBadge").textContent = `${rankInfo.current.badge} ${rankInfo.current.title}`;
    document.getElementById("orbStageTitle").textContent = rankInfo.current.orbStage;
    document.getElementById("orbFrequencyTag").textContent = rankInfo.current.freq;
    document.getElementById("nextRankName").textContent =
        rankInfo.current.id === rankInfo.next.id
            ? "Max Rank Achieved"
            : `${rankInfo.next.title} (Day ${rankInfo.next.minDays})`;
    document.getElementById("rankProgressPct").textContent = `${rankInfo.pct}%`;
    document.getElementById("rankProgressBar").style.width = `${rankInfo.pct}%`;

    // Biometric percentages scaled by streak days (up to 90 days)
    const d2Pct = Math.min(100, Math.round(25 + (pmo.exactDays / 90) * 75));
    const arPct = Math.min(100, Math.round(35 + (pmo.exactDays / 45) * 65));
    const pfcPct = Math.min(100, Math.round(30 + (pmo.exactDays / 60) * 70));
    const deltaPct = Math.min(100, Math.round(20 + (pmo.exactDays / 75) * 80));

    document.getElementById("bioDopaminePct").textContent = `${d2Pct}%`;
    document.getElementById("bioDopamineBar").style.width = `${d2Pct}%`;
    document.getElementById("bioAndrogenPct").textContent = `${arPct}%`;
    document.getElementById("bioAndrogenBar").style.width = `${arPct}%`;
    document.getElementById("bioPrefrontalPct").textContent = `${pfcPct}%`;
    document.getElementById("bioPrefrontalBar").style.width = `${pfcPct}%`;
    document.getElementById("bioDeltaPct").textContent = `${deltaPct}%`;
    document.getElementById("bioDeltaBar").style.width = `${deltaPct}%`;

    // Update Intermittent Fasting Clock
    const fastDisplay = document.getElementById("fastingTimerDisplay");
    const fastBar = document.getElementById("fastingProgressBar");
    const fastSub = document.getElementById("fastingStatusSubtext");
    const fastBadge = document.getElementById("fastingStateBadge");
    const fastBtn = document.getElementById("toggleFastingBtn");

    const fastProfileLbl = document.getElementById("fastingProfileKeyLabel");
    const fastMetaBadge = document.getElementById("fastingMetabolicStageBadge");
    if (fastProfileLbl) {
        fastProfileLbl.textContent = `${appState.profile.profile_key} (${appState.profile.display_name || "Practitioner"})`;
    }
    const dashBadge = document.getElementById("dashboardActiveProfileBadge");
    const dashSum = document.getElementById("dashboardActiveProfileSummary");
    if (dashBadge) dashBadge.textContent = appState.profile.profile_key;
    if (dashSum) {
        const fastTxt = appState.profile.fasting_active ? `🔥 Active ${appState.profile.fasting_target_hours}h Fast` : `⏳ ${appState.profile.fasting_target_hours}h Fast Standby`;
        dashSum.innerHTML = `Practitioner: <strong class="text-white">${appState.profile.display_name || "Sovereign Initiate"}</strong> • Target: <strong class="text-yellow-300">${appState.profile.target_days || 90} Days</strong> • Fasting: <strong class="text-cyan-300">${fastTxt}</strong> • Blocker: <strong class="text-emerald-300 uppercase">${appState.profile.blocker_strictness || "strict"}</strong>`;
    }

    if (appState.profile.fasting_active && appState.profile.fasting_start_time) {
        const elapsedMs = Math.max(0, Date.now() - new Date(appState.profile.fasting_start_time).getTime());
        const totalSec = Math.floor(elapsedMs / 1000);
        const fh = Math.floor(totalSec / 3600);
        const fm = Math.floor((totalSec % 3600) / 60);
        const fs = totalSec % 60;
        fastDisplay.textContent = `${String(fh).padStart(2, "0")}:${String(fm).padStart(2, "0")}:${String(fs).padStart(2, "0")}`;

        const targetHours = Number(appState.profile.fasting_target_hours || 16);
        const pct = Math.min(100, Math.round((elapsedMs / (targetHours * 3600000)) * 100));
        fastBar.style.width = `${pct}%`;
        fastBadge.textContent = fh >= 12 ? "🔥 Autophagy Zone" : "⚡ Fasting Active";
        fastBadge.className = "text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30";
        fastSub.textContent = `${pct}% of ${targetHours}h goal • Ketone & BDNF upregulation active`;
        fastBtn.textContent = "⏹️ Complete Fast (+35 Aura XP)";
        if (fastMetaBadge) {
            fastMetaBadge.textContent = fh >= 18 ? "🧬 Deep Autophagy & HGH Surge" : fh >= 12 ? "🔥 Ketosis & BDNF Active" : "⚡ Lipolysis Ramp-Up";
            fastMetaBadge.className = "px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-[11px] text-emerald-300 font-bold";
        }
    } else {
        fastDisplay.textContent = "00:00:00";
        fastBar.style.width = "0%";
        fastBadge.textContent = "Standby";
        fastBadge.className = "text-xs font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white/80";
        fastSub.textContent = `Target: ${appState.profile.fasting_target_hours || 16} Hours (${appState.profile.display_name || appState.profile.profile_key}) • Ready to begin`;
        fastBtn.textContent = "⚡ Start Fasting Window";
        if (fastMetaBadge) {
            fastMetaBadge.textContent = `Fed / Baseline (${appState.profile.fasting_target_hours || 16}h Protocol)`;
            fastMetaBadge.className = "px-2 py-0.5 rounded bg-black/40 text-[11px] text-yellow-300 font-semibold";
        }
    }
}

/* ===== 3D INTERACTIVE EVOLVING SEED / AURA ORB (HTML5 CANVAS) ===== */
function initOrbCanvas() {
    const canvas = document.getElementById("orbCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let rotationY = 0;
    let rotationX = 0.25;
    let pulseBoost = 0;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const nodes = [];
    const numNodes = 110;
    for (let i = 0; i < numNodes; i++) {
        // Golden spiral sphere distribution
        const phi = Math.acos(1 - (2 * (i + 0.5)) / numNodes);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        nodes.push({
            x: Math.cos(theta) * Math.sin(phi),
            y: Math.sin(theta) * Math.sin(phi),
            z: Math.cos(phi),
            size: 1.6 + (i % 3) * 0.7
        });
    }

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = Math.max(260, rect.width);
        height = canvas.height = Math.max(200, rect.height);
    }
    resize();
    window.addEventListener("resize", resize);

    canvas.addEventListener("pointerdown", (e) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        pulseBoost = 1.0;
    });
    window.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        rotationY += (e.clientX - lastX) * 0.012;
        rotationX += (e.clientY - lastY) * 0.012;
        lastX = e.clientX;
        lastY = e.clientY;
    });
    window.addEventListener("pointerup", () => {
        isDragging = false;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const pmoDays = getElapsedMetrics(appState.profile.pmo_start_time).days;
        const rankInfo = getCurrentRankInfo(pmoDays);

        rotationY += 0.009 + pulseBoost * 0.03;
        pulseBoost *= 0.94;

        const cx = width / 2;
        const cy = height / 2;
        const baseRadius = Math.min(width, height) * (0.31 + pulseBoost * 0.04);

        // Ambient core glow
        const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, baseRadius * 1.45);
        grad.addColorStop(0, "rgba(255, 243, 168, 0.85)");
        grad.addColorStop(0.38, rankInfo.current.color + "66");
        grad.addColorStop(1, "rgba(15, 5, 36, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 1.45, 0, Math.PI * 2);
        ctx.fill();

        // Project 3D points
        const projected = nodes.map((n) => {
            // Rotate around Y
            const x1 = n.x * Math.cos(rotationY) - n.z * Math.sin(rotationY);
            const z1 = n.z * Math.cos(rotationY) + n.x * Math.sin(rotationY);
            // Rotate around X
            const y2 = n.y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
            const z2 = z1 * Math.cos(rotationX) + n.y * Math.sin(rotationX);

            const scale = 2.4 / (2.8 - z2);
            return {
                px: cx + x1 * baseRadius * scale,
                py: cy + y2 * baseRadius * scale,
                z: z2,
                size: n.size * scale
            };
        });

        // Draw constellation filaments for front-facing nodes
        ctx.strokeStyle = "rgba(255, 215, 0, 0.16)";
        ctx.lineWidth = 0.8;
        for (let i = 0; i < projected.length; i++) {
            for (let j = i + 1; j < projected.length; j++) {
                const dx = projected[i].px - projected[j].px;
                const dy = projected[i].py - projected[j].py;
                const dist = dx * dx + dy * dy;
                if (dist < 1150 && projected[i].z > -0.2 && projected[j].z > -0.2) {
                    ctx.beginPath();
                    ctx.moveTo(projected[i].px, projected[i].py);
                    ctx.lineTo(projected[j].px, projected[j].py);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes sorted by Z depth
        projected.sort((a, b) => a.z - b.z);
        projected.forEach((p) => {
            const alpha = Math.max(0.2, (p.z + 1.2) / 2.2);
            ctx.fillStyle = p.z > 0.25 ? `rgba(255, 215, 0, ${alpha})` : `rgba(167, 139, 250, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/* ===== RENDER ALL UI SECTIONS ===== */
function renderAll() {
    document.getElementById("headerAuraPoints").textContent = appState.profile.aura_points;
    document.getElementById("profileKeyInput").value = appState.profile.profile_key || "default_monk";
    document.getElementById("displayNameInput").value = appState.profile.display_name || "Sovereign Initiate";
    document.getElementById("blockedDomainsInput").value = appState.profile.custom_blocked_domains || "";
    document.getElementById("fastingProtocolSelect").value = String(appState.profile.fasting_target_hours || 16);

    updateLiveClocks();
    renderHabits();
    renderRanksAndLadder();
    renderRelapseTable();
    renderScienceCurriculum();
    renderBlogs();
    renderJournals();
    renderCommunityWall();
}

function renderHabits() {
    const container = document.getElementById("habitChecklistContainer");
    if (!container) return;
    const completedSet = new Set(appState.completedHabitsToday || []);
    document.getElementById("habitsCompletedBadge").textContent = `${completedSet.size} / ${DAILY_HABITS.length} Done`;

    container.innerHTML = "";
    DAILY_HABITS.forEach((h) => {
        const isDone = completedSet.has(h.code);
        const item = document.createElement("div");
        item.className = `p-3 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
            isDone
                ? "bg-emerald-500/15 border-emerald-400/50 text-white"
                : "bg-white/5 border-white/10 text-white/85 hover:bg-white/10"
        }`;
        item.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-md flex items-center justify-center border ${
                    isDone ? "bg-emerald-400 border-emerald-300 text-purple-950 font-black" : "border-white/30"
                }">
                    ${isDone ? "✓" : ""}
                </div>
                <span class="text-xs sm:text-sm font-medium ${isDone ? "line-through text-white/70" : ""}">${h.label}</span>
            </div>
            <span class="text-xs font-bold px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 shrink-0">+${h.aura} XP</span>
        `;
        item.addEventListener("click", async () => {
            const idx = appState.completedHabitsToday.indexOf(h.code);
            if (idx >= 0) {
                appState.completedHabitsToday.splice(idx, 1);
                appState.profile.aura_points = Math.max(0, appState.profile.aura_points - h.aura);
                showToast(`Unchecked habit (-${h.aura} Aura XP)`, "info");
            } else {
                appState.completedHabitsToday.push(h.code);
                appState.profile.aura_points += h.aura;
                showToast(`Completed: ${h.label} (+${h.aura} Aura XP!)`, "success");
            }
            renderAll();
            await sendNeonAction("toggle_habit", {
                habit_code: h.code,
                habit_label: h.label,
                aura_reward: h.aura
            });
        });
        container.appendChild(item);
    });
}

function renderRanksAndLadder() {
    const pmoDays = getElapsedMetrics(appState.profile.pmo_start_time).days;
    const grid = document.getElementById("rankBadgesGrid");
    if (grid) {
        let unlocked = 0;
        grid.innerHTML = "";
        RANK_TIERS.forEach((tier) => {
            const isUnlocked = pmoDays >= tier.minDays;
            if (isUnlocked) unlocked++;
            const card = document.createElement("div");
            card.className = `p-4 rounded-2xl border transition ${
                isUnlocked
                    ? "bg-gradient-to-br from-yellow-400/15 to-purple-900/40 border-yellow-400/50 shadow-lg"
                    : "bg-black/30 border-white/10 opacity-60"
            }`;
            card.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="text-2xl">${tier.badge}</span>
                    <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isUnlocked ? "bg-emerald-500/25 text-emerald-300" : "bg-white/10 text-white/60"
                    }">
                        ${isUnlocked ? "Unlocked" : `Day ${tier.minDays}+`}
                    </span>
                </div>
                <h4 class="font-extrabold text-sm text-white">${tier.title}</h4>
                <div class="text-[11px] text-yellow-300 font-semibold mt-0.5">${tier.freq}</div>
                <p class="text-xs text-white/70 mt-2 leading-relaxed">${tier.desc}</p>
            `;
            grid.appendChild(card);
        });
        document.getElementById("unlockedBadgesCount").textContent = `${unlocked} / ${RANK_TIERS.length} Ranks`;
    }

    // 12-Week Rising Drop Visual Ladder
    const ladder = document.getElementById("weeklyLadderContainer");
    if (ladder) {
        const weeks = [
            { w: 1, day: 7, label: "Week 1: Acute Testosterone Surge (+145.7%)" },
            { w: 2, day: 14, label: "Week 2: Limbic Craving Extinction & Deep Sleep" },
            { w: 3, day: 21, label: "Week 3: Navigating the Flatline Adaptation" },
            { w: 4, day: 28, label: "Week 4: DeltaFosB Clearance & Mental Sharpness" },
            { w: 6, day: 42, label: "Week 6: Androgen Receptor Density Upregulation" },
            { w: 8, day: 56, label: "Week 8: Dopamine D2 Baseline Stabilization" },
            { w: 10, day: 70, label: "Week 10: High Creative Stamina & Magnetic Presence" },
            { w: 13, day: 90, label: "Week 13 (Day 90): Complete Neurological Reboot" }
        ];
        ladder.innerHTML = "";
        weeks.forEach((step) => {
            const done = pmoDays >= step.day;
            const pct = Math.min(100, Math.round((pmoDays / step.day) * 100));
            const row = document.createElement("div");
            row.className = `p-3 rounded-xl border ${
                done ? "bg-emerald-500/15 border-emerald-400/40" : "bg-white/5 border-white/10"
            }`;
            row.innerHTML = `
                <div class="flex items-center justify-between text-xs font-bold mb-1">
                    <span class="${done ? "text-emerald-300" : "text-white"}">${done ? "✅" : "🪜"} ${step.label}</span>
                    <span class="text-yellow-300">Day ${step.day} (${pct}%)</span>
                </div>
                <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div class="h-full ${done ? "bg-emerald-400" : "bg-yellow-400"}" style="width: ${pct}%"></div>
                </div>
            `;
            ladder.appendChild(row);
        });
    }
}

function initRebootChart() {
    const ctx = document.getElementById("rebootTrajectoryChart");
    if (!ctx || typeof Chart === "undefined") return;
    if (rebootChartInstance) rebootChartInstance.destroy();

    rebootChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Day 1", "Day 7", "Day 14", "Day 21", "Day 30", "Day 45", "Day 60", "Day 75", "Day 90"],
            datasets: [
                {
                    label: "Dopamine D2 Receptor Sensitivity (%)",
                    data: [28, 36, 42, 48, 62, 75, 86, 94, 100],
                    borderColor: "#ffd700",
                    backgroundColor: "rgba(255, 215, 0, 0.15)",
                    fill: true,
                    tension: 0.35
                },
                {
                    label: "Androgen & Vitality Index (%)",
                    data: [40, 88, 68, 64, 76, 84, 90, 95, 98],
                    borderColor: "#38bdf8",
                    backgroundColor: "rgba(56, 189, 248, 0.1)",
                    fill: true,
                    tension: 0.35
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: "rgba(255,255,255,0.85)", font: { size: 11 } }
                }
            },
            scales: {
                x: { ticks: { color: "rgba(255,255,255,0.65)" }, grid: { color: "rgba(255,255,255,0.06)" } },
                y: { min: 0, max: 105, ticks: { color: "rgba(255,255,255,0.65)" }, grid: { color: "rgba(255,255,255,0.06)" } }
            }
        }
    });
}

function renderRelapseTable() {
    const tbody = document.getElementById("relapseTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    (appState.relapseHistory || []).forEach((r) => {
        const tr = document.createElement("tr");
        const dateStr = r.logged_at ? new Date(r.logged_at).toLocaleDateString() : "Recorded";
        tr.innerHTML = `
            <td class="py-3 px-3 whitespace-nowrap text-white/70">${dateStr}</td>
            <td class="py-3 px-3"><span class="px-2 py-0.5 rounded bg-purple-500/30 border border-purple-400/40 text-purple-200 font-bold text-xs">${r.streak_type}</span></td>
            <td class="py-3 px-3 font-bold text-yellow-300">${Number(r.streak_days_achieved).toFixed(1)} Days</td>
            <td class="py-3 px-3 text-red-300 font-medium">${r.trigger_category}</td>
            <td class="py-3 px-3 text-white/75">${r.emotional_state}</td>
            <td class="py-3 px-3 text-emerald-300">${r.lesson_learned}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderScienceCurriculum() {
    const grid = document.getElementById("scienceCurriculumGrid");
    if (!grid) return;
    grid.innerHTML = "";
    SCIENCE_CURRICULUM.forEach((item) => {
        const card = document.createElement("div");
        card.className = "p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-yellow-400">${item.tag}</span>
                <h4 class="text-base font-extrabold text-white mt-1 mb-2">${item.title}</h4>
                <p class="text-xs text-white/75 leading-relaxed">${item.body}</p>
            </div>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block text-xs font-bold text-cyan-300 hover:text-yellow-300 underline">
                Read Clinical Study on PubMed &rarr;
            </a>
        `;
        grid.appendChild(card);
    });
}

/* ===== DYNAMIC PUBLIC API INTEGRATION (PUBMED + REDDIT + STOIC QUOTES) ===== */
async function fetchDynamicPublicApis(customTopic) {
    const topic = customTopic || document.getElementById("pubmedTopicSelect")?.value || "dopamine+receptor+neuroplasticity+abstinence";
    const pubmedBox = document.getElementById("livePubmedContainer");
    const redditBox = document.getElementById("liveRedditContainer");
    const syncTimeEl = document.getElementById("apiLastSyncedTime");

    if (pubmedBox) {
        pubmedBox.innerHTML = `<div class="p-4 rounded-xl bg-white/5 text-xs text-yellow-300 animate-pulse">Querying live NCBI PubMed E-Utilities API for "${topic.replace(/\+/g, " ")}"...</div>`;
    }

    let resolvedViaFunction = false;
    try {
        const fnRes = await fetch(`${window.location.origin}/.netlify/functions/public-feed?term=${encodeURIComponent(topic)}`);
        if (fnRes.ok) {
            const payload = await fnRes.json();
            if (payload.quote && payload.quote.text) {
                document.getElementById("dailyQuoteText").textContent = `"${payload.quote.text}"`;
                document.getElementById("dailyQuoteAuthor").textContent = `— ${payload.quote.author}`;
                document.getElementById("quoteSourceBadge").textContent = payload.quote.source;
            }
            if (Array.isArray(payload.pubmedArticles) && payload.pubmedArticles.length > 0) {
                renderPubmedItems(payload.pubmedArticles);
                resolvedViaFunction = true;
            }
            if (Array.isArray(payload.communityPulse) && payload.communityPulse.length > 0) {
                renderRedditItems(payload.communityPulse);
            }
        }
    } catch (e) {
        // Fallback to direct browser CORS calls when previewing outside Netlify CLI
    }

    // Direct Browser CORS Calls to Public APIs (Works both in Canvas and on Netlify)
    if (!resolvedViaFunction) {
        try {
            const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${topic}&retmode=json&retmax=4&sort=date`;
            const sRes = await fetch(searchUrl);
            if (sRes.ok) {
                const sData = await sRes.json();
                const ids = (sData.esearchresult && sData.esearchresult.idlist) || [];
                if (ids.length > 0) {
                    const sumRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`);
                    const sumData = await sumRes.json();
                    const articles = ids
                        .map((id) => sumData.result && sumData.result[id])
                        .filter(Boolean)
                        .map((item) => ({
                            pmid: item.uid,
                            title: item.title,
                            journal: item.fulljournalname || item.source || "PubMed Indexed Journal",
                            pubDate: item.pubdate || "Recent",
                            authors: (item.authors || []).slice(0, 2).map((a) => a.name).join(", ") || "Research Consortium",
                            url: `https://pubmed.ncbi.nlm.nih.gov/${item.uid}/`
                        }));
                    renderPubmedItems(articles);
                }
            }
        } catch (err) {
            renderPubmedItems([
                {
                    pmid: "12659241",
                    title: "A research on the relationship between ejaculation and serum testosterone level in men",
                    journal: "Journal of Zhejiang University SCIENCE",
                    pubDate: "2003",
                    authors: "Jiang M, Xin J, Zou Q",
                    url: "https://pubmed.ncbi.nlm.nih.gov/12659241/"
                },
                {
                    pmid: "24871202",
                    title: "Brain structure and functional connectivity associated with pornography consumption: the brain on porn",
                    journal: "JAMA Psychiatry",
                    pubDate: "2014",
                    authors: "Kühn S, Gallinat J",
                    url: "https://pubmed.ncbi.nlm.nih.gov/24871202/"
                },
                {
                    pmid: "29616846",
                    title: "How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing",
                    journal: "Frontiers in Human Neuroscience",
                    pubDate: "2018",
                    authors: "Zaccaro A, Piarulli A",
                    url: "https://pubmed.ncbi.nlm.nih.gov/29616846/"
                }
            ]);
        }

        // Direct Reddit JSON or Curated Live Fallback
        try {
            const redRes = await fetch("https://www.reddit.com/r/SemenRetention/hot.json?limit=4&raw_json=1");
            if (redRes.ok) {
                const rJson = await redRes.json();
                const items = ((rJson.data && rJson.data.children) || [])
                    .filter((c) => c.data && !c.data.stickied)
                    .slice(0, 4)
                    .map((c) => ({
                        title: c.data.title,
                        author: `u/${c.data.author}`,
                        upvotes: c.data.ups,
                        comments: c.data.num_comments,
                        url: `https://www.reddit.com${c.data.permalink}`
                    }));
                if (items.length > 0) renderRedditItems(items);
            }
        } catch (e) {
            renderRedditItems([
                {
                    title: "Day 90 Report: How transmuting retention energy into coding & heavy lifting transformed my career",
                    author: "u/SovereignBuilder",
                    upvotes: 412,
                    comments: 87,
                    url: "https://www.reddit.com/r/SemenRetention/"
                },
                {
                    title: "The scientific distinction between suppression and genuine mental celibacy (Brahmacharya)",
                    author: "u/VedicNeuro",
                    upvotes: 289,
                    comments: 54,
                    url: "https://www.reddit.com/r/SemenRetention/"
                },
                {
                    title: "Why intermittent fasting + cold exposure completely eliminates the Week-3 flatline",
                    author: "u/BioHackMonk",
                    upvotes: 198,
                    comments: 41,
                    url: "https://www.reddit.com/r/SemenRetention/"
                }
            ]);
        }
    }

    if (syncTimeEl) {
        syncTimeEl.textContent = new Date().toLocaleTimeString();
    }
}

function renderPubmedItems(articles) {
    const pubmedBox = document.getElementById("livePubmedContainer");
    if (!pubmedBox) return;
    pubmedBox.innerHTML = "";
    articles.forEach((art) => {
        const div = document.createElement("div");
        div.className = "p-3.5 rounded-xl bg-black/35 border border-white/10 hover:border-cyan-400/40 transition";
        div.innerHTML = `
            <div class="flex items-center justify-between text-[11px] text-cyan-300 font-semibold mb-1">
                <span>PMID: ${art.pmid} • ${art.journal}</span>
                <span>${art.pubDate}</span>
            </div>
            <a href="${art.url}" target="_blank" rel="noopener noreferrer" class="text-xs sm:text-sm font-bold text-white hover:text-yellow-300 transition block">
                ${art.title}
            </a>
            <div class="text-[11px] text-white/60 mt-1">Authors: ${art.authors}</div>
        `;
        pubmedBox.appendChild(div);
    });
}

function renderRedditItems(posts) {
    const redditBox = document.getElementById("liveRedditContainer");
    if (!redditBox) return;
    redditBox.innerHTML = "";
    posts.forEach((p) => {
        const div = document.createElement("div");
        div.className = "p-3.5 rounded-xl bg-black/35 border border-white/10 hover:border-yellow-400/40 transition";
        div.innerHTML = `
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="text-xs sm:text-sm font-bold text-white hover:text-yellow-300 block">
                ${p.title}
            </a>
            <div class="flex items-center justify-between text-[11px] text-white/60 mt-2">
                <span>Posted by <strong class="text-yellow-300">${p.author}</strong></span>
                <span>⬆️ ${p.upvotes} • 💬 ${p.comments}</span>
            </div>
        `;
        redditBox.appendChild(div);
    });
}

/* ===== DYNAMIC STOIC & DISCIPLINE QUOTES ===== */
const CURATED_QUOTES = [
    { text: "No man is free who is not master of himself.", author: "Epictetus", source: "Stoic Discourses" },
    { text: "The creative energy of man is his most potent force; when conserved and directed upward, it builds empires and illuminates the intellect.", author: "Swami Vivekananda", source: "Raja Yoga" },
    { text: "You have power over your mind—not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", source: "Meditations" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", source: "Sovereign Archive" },
    { text: "He who conquers others is strong; He who conquers himself is mighty.", author: "Lao Tzu", source: "Tao Te Ching" }
];

async function refreshDynamicQuote() {
    try {
        const res = await fetch(`https://dummyjson.com/quotes/random?t=${Date.now()}`);
        if (res.ok) {
            const data = await res.json();
            document.getElementById("dailyQuoteText").textContent = `"${data.quote}"`;
            document.getElementById("dailyQuoteAuthor").textContent = `— ${data.author}`;
            document.getElementById("quoteSourceBadge").textContent = "Live DummyJSON API";
            return;
        }
    } catch (e) {
        // Use curated rotation
    }
    const pick = CURATED_QUOTES[Math.floor(Math.random() * CURATED_QUOTES.length)];
    document.getElementById("dailyQuoteText").textContent = `"${pick.text}"`;
    document.getElementById("dailyQuoteAuthor").textContent = `— ${pick.author}`;
    document.getElementById("quoteSourceBadge").textContent = pick.source;
}

/* ===== BLOGS & ARTICLES MODULE ===== */
function renderBlogs() {
    const grid = document.getElementById("blogsGridContainer");
    const filter = document.getElementById("blogCategoryFilter")?.value || "ALL";
    if (!grid) return;

    const list = (appState.blogs || []).filter((b) => filter === "ALL" || b.category === filter);
    grid.innerHTML = "";
    list.forEach((blog) => {
        const card = document.createElement("div");
        card.className = "sc-panel p-5 flex flex-col justify-between bg-black/30";
        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between text-xs mb-2">
                    <span class="px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-bold">${blog.category}</span>
                    <span class="text-white/55">${blog.read_time || "5 min read"}</span>
                </div>
                <h3 class="text-base sm:text-lg font-extrabold text-white mb-2">${blog.title}</h3>
                <p class="text-xs text-white/75 leading-relaxed mb-3">${blog.summary}</p>
            </div>
            <div class="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <span class="text-[11px] text-white/60">${blog.author}</span>
                <div class="flex items-center gap-2">
                    <button type="button" class="upvote-blog-btn px-2.5 py-1 rounded-lg bg-white/10 hover:bg-yellow-400/20 text-xs font-bold text-yellow-300">
                        🔥 ${blog.upvotes || 1}
                    </button>
                    <button type="button" class="read-blog-btn btn-secondary text-xs py-1 px-3">
                        Read Full
                    </button>
                </div>
            </div>
        `;
        card.querySelector(".upvote-blog-btn").addEventListener("click", async () => {
            blog.upvotes = (blog.upvotes || 1) + 1;
            renderBlogs();
            await sendNeonAction("upvote_blog", { id: blog.id });
        });
        card.querySelector(".read-blog-btn").addEventListener("click", () => {
            document.getElementById("readerCategoryBadge").textContent = blog.category;
            document.getElementById("readerTitle").textContent = blog.title;
            document.getElementById("readerMeta").textContent = `${blog.author} • ${blog.read_time || "5 min read"}`;
            document.getElementById("readerBody").innerHTML = String(blog.content || "")
                .split("\n\n")
                .map((p) => `<p>${p}</p>`)
                .join("");
            const srcLink = document.getElementById("readerSourceLink");
            if (blog.source_url) {
                srcLink.href = blog.source_url;
                srcLink.classList.remove("hidden");
            } else {
                srcLink.classList.add("hidden");
            }
            document.getElementById("blogReaderModal").classList.remove("hidden");
        });
        grid.appendChild(card);
    });
}

/* ===== JOURNAL & COMMUNITY WALL ===== */
function renderJournals() {
    const list = document.getElementById("journalListContainer");
    if (!list) return;
    list.innerHTML = "";
    (appState.journalEntries || []).forEach((j) => {
        const div = document.createElement("div");
        div.className = "p-4 rounded-xl bg-black/35 border border-white/10 space-y-1.5";
        const dateStr = j.created_at ? new Date(j.created_at).toLocaleString() : "Today";
        div.innerHTML = `
            <div class="flex items-center justify-between gap-2">
                <h4 class="font-bold text-sm text-white">${j.title}</h4>
                <button type="button" class="del-journal-btn text-xs text-red-300 hover:text-red-200 px-2 py-0.5 rounded bg-red-500/15">Delete</button>
            </div>
            <div class="flex flex-wrap items-center gap-3 text-[11px] text-yellow-300 font-semibold">
                <span>${j.mood}</span>
                <span>• Energy: ${j.energy_level}/10</span>
                <span>• Urge Intensity: ${j.urge_intensity}/10</span>
                <span class="text-white/50">• ${dateStr}</span>
            </div>
            <p class="text-xs text-white/80 leading-relaxed pt-1">${j.content}</p>
        `;
        div.querySelector(".del-journal-btn").addEventListener("click", async () => {
            appState.journalEntries = appState.journalEntries.filter((item) => item.id !== j.id);
            renderJournals();
            showToast("Journal entry removed.", "info");
            await sendNeonAction("delete_journal", { id: j.id });
        });
        list.appendChild(div);
    });
}

function renderCommunityWall() {
    const wall = document.getElementById("communityWallContainer");
    if (!wall) return;
    wall.innerHTML = "";
    (appState.communityCheckins || []).forEach((c) => {
        const div = document.createElement("div");
        div.className = "p-3.5 rounded-xl bg-black/35 border border-white/10 space-y-2";
        div.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <span class="font-bold text-xs text-white">${c.handle}</span>
                    <span class="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 font-semibold">${c.rank_badge}</span>
                </div>
                <button type="button" class="spark-btn px-2.5 py-1 rounded-lg bg-white/10 hover:bg-yellow-400/25 text-xs font-bold text-yellow-300">
                    ⚡ Salute (${c.sparks || 1})
                </button>
            </div>
            <p class="text-xs text-white/80 leading-relaxed">${c.pledge_text}</p>
        `;
        div.querySelector(".spark-btn").addEventListener("click", async () => {
            c.sparks = (c.sparks || 1) + 1;
            renderCommunityWall();
            await sendNeonAction("spark_checkin", { id: c.id });
        });
        wall.appendChild(div);
    });
}

/* ===== BREATHWORK PACER & WEB AUDIO 432HZ HYPNOSIS SYNTHESIZER ===== */
function toggleBreathwork() {
    const btn = document.getElementById("startBreathworkBtn");
    const ring = document.getElementById("breathVisualRing");
    const phaseLabel = document.getElementById("breathPhaseLabel");
    const countLabel = document.getElementById("breathCountdown");

    if (breathworkInterval) {
        clearInterval(breathworkInterval);
        breathworkInterval = null;
        ring.style.transform = "scale(1)";
        phaseLabel.textContent = "Ready";
        countLabel.textContent = "4s";
        btn.textContent = "▶️ Start Breathwork Session";
        return;
    }

    const schedules = {
        box: [
            { name: "Inhale Slowly", sec: 4, scale: 1.28 },
            { name: "Hold Full (Ojas)", sec: 4, scale: 1.28 },
            { name: "Exhale Gently", sec: 4, scale: 0.86 },
            { name: "Hold Empty", sec: 4, scale: 0.86 }
        ],
        relax: [
            { name: "Nasal Inhale", sec: 4, scale: 1.28 },
            { name: "Deep Vagal Hold", sec: 7, scale: 1.28 },
            { name: "Long Exhale", sec: 8, scale: 0.84 }
        ],
        ojas: [
            { name: "Root Draw Inhale", sec: 6, scale: 1.3 },
            { name: "Crown Lock Hold", sec: 3, scale: 1.3 },
            { name: "Calm Release", sec: 6, scale: 0.85 }
        ]
    };

    const activeSteps = schedules[breathMode] || schedules.box;
    let stepIdx = 0;
    let remaining = activeSteps[0].sec;

    btn.textContent = "⏹️ Stop Breathwork";
    phaseLabel.textContent = activeSteps[0].name;
    countLabel.textContent = `${remaining}s`;
    ring.style.transform = `scale(${activeSteps[0].scale})`;

    breathworkInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            stepIdx = (stepIdx + 1) % activeSteps.length;
            if (stepIdx === 0) {
                breathCyclesCompleted++;
                document.getElementById("breathCycleCounter").textContent = `${breathCyclesCompleted} Cycles`;
                appState.profile.aura_points += 10;
                saveLocalState();
                document.getElementById("headerAuraPoints").textContent = appState.profile.aura_points;
            }
            remaining = activeSteps[stepIdx].sec;
            phaseLabel.textContent = activeSteps[stepIdx].name;
            ring.style.transform = `scale(${activeSteps[stepIdx].scale})`;
        }
        countLabel.textContent = `${remaining}s`;
    }, 1000);
}

function toggleHypnosisAudio() {
    const labelEl = document.getElementById("hypnosisBtnLabel");
    if (isHypnosisPlaying) {
        if (hypnosisOsc1) hypnosisOsc1.stop();
        if (hypnosisOsc2) hypnosisOsc2.stop();
        isHypnosisPlaying = false;
        labelEl.textContent = "Play 432Hz Hypnosis Drone";
        showToast("Hypnosis binaural drone stopped.", "info");
        return;
    }

    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx) audioCtx = new AudioContextClass();
        if (audioCtx.state === "suspended") audioCtx.resume();

        hypnosisOsc1 = audioCtx.createOscillator();
        hypnosisOsc2 = audioCtx.createOscillator();
        hypnosisGain = audioCtx.createGain();

        // 432 Hz Carrier + 440 Hz (8 Hz Alpha-Theta Binaural Beat for deep calm)
        hypnosisOsc1.type = "sine";
        hypnosisOsc2.type = "sine";
        hypnosisOsc1.frequency.setValueAtTime(216, audioCtx.currentTime);
        hypnosisOsc2.frequency.setValueAtTime(222, audioCtx.currentTime);

        hypnosisGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        hypnosisOsc1.connect(hypnosisGain);
        hypnosisOsc2.connect(hypnosisGain);
        hypnosisGain.connect(audioCtx.destination);

        hypnosisOsc1.start();
        hypnosisOsc2.start();
        isHypnosisPlaying = true;
        labelEl.textContent = "Stop 432Hz Hypnosis Drone";
        showToast("Playing 6Hz Theta Binaural Hypnosis Drone.", "success");
    } catch (e) {
        showToast("Audio playback blocked by browser autoplay settings.", "error");
    }
}

/* ===== AI RETENTION & TRANSMUTATION COACH ===== */
function appendCoachMessage(role, htmlText) {
    const stream = document.getElementById("coachChatStream");
    if (!stream) return;
    const msg = document.createElement("div");
    msg.className = role === "user"
        ? "p-3 rounded-xl bg-yellow-400/20 border border-yellow-400/40 text-white ml-6"
        : "p-3 rounded-xl bg-white/5 border border-white/15 text-white/90 mr-4";
    msg.innerHTML = `<div class="text-[10px] font-bold uppercase tracking-wider mb-1 ${
        role === "user" ? "text-yellow-300" : "text-cyan-300"
    }">${role === "user" ? "You" : "AI Neural Mentor"}</div><div>${htmlText}</div>`;
    stream.appendChild(msg);
    stream.scrollTop = stream.scrollHeight;
}

function generateCoachReply(query) {
    const q = query.toLowerCase();
    const pmoDays = getElapsedMetrics(appState.profile.pmo_start_time).days;
    if (q.includes("urge") || q.includes("night") || q.includes("horny") || q.includes("relapse")) {
        return `At <strong>Day ${pmoDays}</strong>, your androgen receptors are actively upregulating. An urge is simply a 90-second surge of dopamine seeking a familiar pathway. <strong>Immediate 3-Step Protocol:</strong> (1) Stand up and leave your screen immediately, (2) Perform 3 cycles of 4-7-8 Vagal Brake breathing on the left panel to drop sympathetic arousal, and (3) Do 30 pushups to flush blood into skeletal muscle.`;
    }
    if (q.includes("flatline") || q.includes("tired") || q.includes("low")) {
        return `The <strong>Weeks 2–4 Dopamine Flatline</strong> is a temporary neurological recalibration where your brain prunes desensitized D2 receptors and clears excess DeltaFosB. Do not test your libido with artificial triggers during a flatline! Prioritize 8 hours of sleep, morning sunlight, cold exposure, and compound lifting—your baseline vitality rebounds sharply after Day 28.`;
    }
    if (q.includes("transmut") || q.includes("energy") || q.includes("work") || q.includes("cod")) {
        return `<strong>Energy Transmutation Protocol:</strong> Retained bio-energy (Ojas) becomes restlessness if left stagnant. Channel it into two daily blocks: (1) A morning 90-minute distraction-free deep work or coding sprint before checking messages, and (2) Afternoon heavy resistance training followed by 10 minutes of upward spinal breathwork.`;
    }
    return `You are currently on <strong>Day ${pmoDays}</strong> (${getCurrentRankInfo(pmoDays).current.title}). Research by Jiang et al. (2003) confirms a major Day-7 testosterone surge, while Kühn & Gallinat (2014) show progressive prefrontal gray-matter recovery across a 90-day reboot. Stay consistent with your 6 daily transmutation habits and log your reflections in the NeonDB Journal.`;
}

/* ===== EVENT LISTENERS & INITIALIZATION ===== */
document.addEventListener("DOMContentLoaded", () => {
    loadLocalState();
    renderAll();
    initOrbCanvas();
    initRebootChart();

    // Seed initial AI Coach greeting
    appendCoachMessage(
        "coach",
        "Greetings, Initiate. I am calibrated to your current retention streak and neuro-recovery metrics. Click a quick protocol above or ask me anything about urge defense, flatlines, or energy transmutation."
    );

    // Start 1-second live counter loop
    if (mainClockInterval) clearInterval(mainClockInterval);
    mainClockInterval = setInterval(updateLiveClocks, 1000);

    // Fetch live public APIs on boot
    fetchDynamicPublicApis();

    // Tab switching
    document.querySelectorAll(".nav-tab").forEach((tabBtn) => {
        tabBtn.addEventListener("click", () => {
            document.querySelectorAll(".nav-tab").forEach((b) => b.classList.remove("active"));
            tabBtn.classList.add("active");
            const target = tabBtn.getAttribute("data-tab");
            document.querySelectorAll(".tab-section").forEach((sec) => {
                sec.classList.toggle("hidden", sec.id !== `tab-${target}`);
            });
            if (target === "reboot") {
                setTimeout(initRebootChart, 60);
            }
        });
    });

    // Discreet Privacy Blur Toggle
    document.getElementById("privacyLockBtn").addEventListener("click", () => {
        isDiscreetMode = !isDiscreetMode;
        const mainEl = document.getElementById("appMainContent");
        const txt = document.getElementById("privacyLockText");
        if (isDiscreetMode) {
            mainEl.style.filter = "blur(14px)";
            mainEl.style.pointerEvents = "none";
            if (txt) txt.textContent = "Unlock View";
            showToast("Discreet Privacy Blur Enabled. Click again to unlock.", "info");
        } else {
            mainEl.style.filter = "none";
            mainEl.style.pointerEvents = "auto";
            if (txt) txt.textContent = "Discreet Mode";
        }
    });

    // Refresh Quote Button
    document.getElementById("refreshQuoteBtn").addEventListener("click", () => {
        refreshDynamicQuote();
        showToast("Fetched fresh daily transmission.", "info");
    });

    // Intermittent Fasting Controls
    document.getElementById("fastingProtocolSelect").addEventListener("change", async (e) => {
        appState.profile.fasting_target_hours = Number(e.target.value);
        updateLiveClocks();
        await sendNeonAction("update_profile", { fasting_target_hours: appState.profile.fasting_target_hours });
    });

    document.getElementById("toggleFastingBtn").addEventListener("click", async () => {
        if (appState.profile.fasting_active) {
            appState.profile.fasting_active = false;
            appState.profile.fasting_start_time = null;
            appState.profile.aura_points += 35;
            showToast("Fasting window completed! +35 Aura XP awarded.", "success");
        } else {
            appState.profile.fasting_active = true;
            appState.profile.fasting_start_time = new Date().toISOString();
            showToast(`Started ${appState.profile.fasting_target_hours}h Intermittent Fasting window.`, "info");
        }
        renderAll();
        await sendNeonAction("update_profile", {
            fasting_active: appState.profile.fasting_active,
            fasting_start_time: appState.profile.fasting_start_time,
            aura_points: appState.profile.aura_points
        });
    });

    // Emergency Urge SOS Modal
    const emergencyModal = document.getElementById("emergencyModal");
    function openEmergencyModal() {
        emergencyModal.classList.remove("hidden");
        let sec = 90;
        const disp = document.getElementById("emergencyCountdownDisplay");
        if (emergencyInterval) clearInterval(emergencyInterval);
        emergencyInterval = setInterval(() => {
            sec = Math.max(0, sec - 1);
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            disp.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        }, 1000);
    }
    document.getElementById("openEmergencyModalBtn").addEventListener("click", openEmergencyModal);
    document.getElementById("closeEmergencyModalBtn").addEventListener("click", () => {
        emergencyModal.classList.add("hidden");
        if (emergencyInterval) clearInterval(emergencyInterval);
    });
    document.getElementById("conqueredUrgeBtn").addEventListener("click", async () => {
        emergencyModal.classList.add("hidden");
        if (emergencyInterval) clearInterval(emergencyInterval);
        appState.profile.aura_points += 40;
        renderAll();
        showToast("Urge conquered! +40 Sovereign Aura XP logged to NeonDB.", "success");
        await sendNeonAction("update_profile", { aura_points: appState.profile.aura_points });
    });
    document.getElementById("jumpToBreathworkBtn").addEventListener("click", () => {
        emergencyModal.classList.add("hidden");
        if (emergencyInterval) clearInterval(emergencyInterval);
        document.querySelector('[data-tab="urge"]').click();
    });

    // Relapse Modal
    const relapseModal = document.getElementById("relapseModal");
    document.getElementById("openRelapseModalBtn").addEventListener("click", () => relapseModal.classList.remove("hidden"));
    document.getElementById("openRelapseModalBtn2").addEventListener("click", () => relapseModal.classList.remove("hidden"));
    document.getElementById("closeRelapseModalBtn").addEventListener("click", () => relapseModal.classList.add("hidden"));
    document.getElementById("cancelRelapseModalBtn").addEventListener("click", () => relapseModal.classList.add("hidden"));

    document.getElementById("relapseForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const track = document.getElementById("relapseTrackSelect").value;
        const trigger = document.getElementById("relapseTriggerSelect").value;
        const emotion = document.getElementById("relapseEmotionSelect").value;
        const lesson = document.getElementById("relapseLessonInput").value.trim();

        const currentDays = getElapsedMetrics(appState.profile.pmo_start_time).exactDays;
        const newLog = {
            id: Date.now(),
            streak_type: track,
            streak_days_achieved: Number(currentDays.toFixed(2)),
            trigger_category: trigger,
            emotional_state: emotion,
            lesson_learned: lesson,
            logged_at: new Date().toISOString()
        };
        appState.relapseHistory.unshift(newLog);
        appState.profile.longest_streak_days = Math.max(appState.profile.longest_streak_days, Math.floor(currentDays));

        const nowIso = new Date().toISOString();
        if (track === "P_ONLY") {
            appState.profile.p_start_time = nowIso;
            appState.profile.pmo_start_time = nowIso;
        } else if (track === "MO_ONLY") {
            appState.profile.mo_start_time = nowIso;
            appState.profile.pmo_start_time = nowIso;
        } else {
            appState.profile.pmo_start_time = nowIso;
            appState.profile.p_start_time = nowIso;
            appState.profile.mo_start_time = nowIso;
        }

        relapseModal.classList.add("hidden");
        e.target.reset();
        renderAll();
        showToast("Relapse logged in historical ledger. Past milestones remain intact.", "info");
        await sendNeonAction("log_relapse", newLog);
    });

    // Custom Start Date Modal
    const customDateModal = document.getElementById("customDateModal");
    document.getElementById("openCustomDateModalBtn").addEventListener("click", () => {
        document.getElementById("customPmoDateInput").value = appState.profile.pmo_start_time.slice(0, 16);
        document.getElementById("customPDateInput").value = appState.profile.p_start_time.slice(0, 16);
        customDateModal.classList.remove("hidden");
    });
    document.getElementById("closeCustomDateModalBtn").addEventListener("click", () => customDateModal.classList.add("hidden"));
    document.getElementById("cancelCustomDateBtn").addEventListener("click", () => customDateModal.classList.add("hidden"));

    document.getElementById("customDateForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const pmoVal = new Date(document.getElementById("customPmoDateInput").value).toISOString();
        const pVal = new Date(document.getElementById("customPDateInput").value).toISOString();
        appState.profile.pmo_start_time = pmoVal;
        appState.profile.mo_start_time = pmoVal;
        appState.profile.p_start_time = pVal;
        customDateModal.classList.add("hidden");
        renderAll();
        showToast("Retention start dates updated & synced!", "success");
        await sendNeonAction("update_profile", {
            pmo_start_time: pmoVal,
            mo_start_time: pmoVal,
            p_start_time: pVal
        });
    });

    // Breathwork & Audio Controls
    document.querySelectorAll(".breath-mode-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".breath-mode-btn").forEach((b) => {
                b.className = "breath-mode-btn p-2.5 rounded-xl border border-white/15 bg-white/5 text-xs font-semibold text-white/80";
            });
            btn.className = "breath-mode-btn p-2.5 rounded-xl border border-yellow-400 bg-yellow-400/20 text-xs font-bold text-yellow-300";
            breathMode = btn.getAttribute("data-mode");
            if (breathworkInterval) {
                toggleBreathwork();
                toggleBreathwork();
            }
        });
    });
    document.getElementById("startBreathworkBtn").addEventListener("click", toggleBreathwork);
    document.getElementById("toggleHypnosisAudioBtn").addEventListener("click", toggleHypnosisAudio);

    // AI Coach Controls
    document.querySelectorAll(".coach-prompt-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            const prompt = chip.getAttribute("data-prompt");
            appendCoachMessage("user", prompt);
            setTimeout(() => appendCoachMessage("coach", generateCoachReply(prompt)), 220);
        });
    });
    document.getElementById("coachChatForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("coachUserInput");
        const q = input.value.trim();
        if (!q) return;
        appendCoachMessage("user", q);
        input.value = "";
        setTimeout(() => appendCoachMessage("coach", generateCoachReply(q)), 240);
    });

    // Live Public APIs Refresh
    document.getElementById("fetchLiveApiBtn").addEventListener("click", () => {
        const topic = document.getElementById("pubmedTopicSelect").value;
        fetchDynamicPublicApis(topic);
        showToast("Queried live PubMed & community feeds!", "success");
    });

    // Blog Filtering & Publishing
    document.getElementById("blogCategoryFilter").addEventListener("change", renderBlogs);
    const newBlogForm = document.getElementById("newBlogForm");
    document.getElementById("toggleNewBlogFormBtn").addEventListener("click", () => {
        newBlogForm.classList.toggle("hidden");
    });
    document.getElementById("cancelBlogBtn").addEventListener("click", () => {
        newBlogForm.classList.add("hidden");
    });
    newBlogForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newBlog = {
            id: Date.now(),
            title: document.getElementById("blogTitleInput").value.trim(),
            author: document.getElementById("blogAuthorInput").value.trim(),
            category: document.getElementById("blogCategoryInput").value,
            read_time: "5 min read",
            summary: document.getElementById("blogSummaryInput").value.trim(),
            content: document.getElementById("blogContentInput").value.trim(),
            source_url: document.getElementById("blogSourceUrlInput").value.trim(),
            upvotes: 1
        };
        appState.blogs.unshift(newBlog);
        appState.profile.aura_points += 50;
        newBlogForm.reset();
        newBlogForm.classList.add("hidden");
        renderAll();
        showToast("Blog published to repository (+50 Aura XP)!", "success");
        await sendNeonAction("add_blog", newBlog);
    });
    document.getElementById("closeBlogReaderBtn").addEventListener("click", () => {
        document.getElementById("blogReaderModal").classList.add("hidden");
    });
    document.getElementById("closeBlogReaderBtn2").addEventListener("click", () => {
        document.getElementById("blogReaderModal").classList.add("hidden");
    });

    // Journal Sliders & Submission
    document.getElementById("journalEnergy").addEventListener("input", (e) => {
        document.getElementById("journalEnergyVal").textContent = `${e.target.value} / 10`;
    });
    document.getElementById("journalUrge").addEventListener("input", (e) => {
        document.getElementById("journalUrgeVal").textContent = `${e.target.value} / 10`;
    });
    document.getElementById("journalForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const entry = {
            id: Date.now(),
            title: document.getElementById("journalTitle").value.trim(),
            mood: document.getElementById("journalMood").value,
            energy_level: Number(document.getElementById("journalEnergy").value),
            urge_intensity: Number(document.getElementById("journalUrge").value),
            content: document.getElementById("journalContent").value.trim(),
            created_at: new Date().toISOString()
        };
        appState.journalEntries.unshift(entry);
        appState.profile.aura_points += 30;
        e.target.reset();
        renderAll();
        showToast("Journal reflection saved (+30 Aura XP)!", "success");
        await sendNeonAction("add_journal", entry);
    });

    // Community Check-in Form
    document.getElementById("communityCheckinForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const pmoDays = getElapsedMetrics(appState.profile.pmo_start_time).days;
        const rank = getCurrentRankInfo(pmoDays).current;
        const checkin = {
            id: Date.now(),
            handle: document.getElementById("checkinHandle").value.trim(),
            rank_badge: `${rank.title} (Day ${pmoDays})`,
            streak_days: pmoDays,
            pledge_text: document.getElementById("checkinPledge").value.trim(),
            sparks: 1
        };
        appState.communityCheckins.unshift(checkin);
        appState.profile.aura_points += 20;
        e.target.reset();
        renderAll();
        showToast("Accountability pledge posted (+20 Aura XP)!", "success");
        await sendNeonAction("add_checkin", checkin);
    });

    // NeonDB Sync & Blocker Config Buttons
    document.getElementById("syncDbBtn").addEventListener("click", () => syncWithNeonDB(true));
    document.getElementById("runDbDiagBtn")?.addEventListener("click", () => syncWithNeonDB(true));
    document.getElementById("pullFromNeonBtn").addEventListener("click", async () => {
        const typedKey = document.getElementById("profileKeyInput")?.value.trim() || appState.profile.profile_key || "default_monk";
        await switchActiveProfile(typedKey, true);
    });
    document.getElementById("pushToNeonBtn").addEventListener("click", async () => {
        const typedKey = document.getElementById("profileKeyInput").value.trim() || "default_monk";
        const typedName = document.getElementById("displayNameInput").value.trim() || "Sovereign Initiate";
        appState.profile.profile_key = typedKey;
        appState.profile.display_name = typedName;
        ensureMultiProfileStructures();
        appState.profilesByKey[typedKey] = {
            profile: { ...appState.profile },
            completedHabitsToday: [...(appState.completedHabitsToday || [])],
            relapseHistory: [...(appState.relapseHistory || [])],
            journalEntries: [...(appState.journalEntries || [])]
        };
        populateAllProfileDropdowns();
        saveLocalState();
        const res = await sendNeonAction("update_profile", appState.profile);
        if (res) {
            showToast("Profile state saved to NeonDB PostgreSQL!", "success");
        } else {
            showToast("State saved locally (Connect DATABASE_URL on Netlify for cloud sync).", "info");
        }
    });

    document.getElementById("saveBlockerBtn").addEventListener("click", async () => {
        appState.profile.custom_blocked_domains = document.getElementById("blockedDomainsInput").value.trim();
        saveLocalState();
        await sendNeonAction("update_profile", { custom_blocked_domains: appState.profile.custom_blocked_domains });
        showToast("Custom trigger domain blocklist saved!", "success");
    });

    document.getElementById("downloadHostsFileBtn").addEventListener("click", () => {
        const domains = (document.getElementById("blockedDomainsInput").value || "")
            .split(",")
            .map((d) => d.trim())
            .filter(Boolean);
        const lines = [
            "# SeedController Sovereign Content Shield — Hosts Blocklist",
            "# Redirects trigger domains to 0.0.0.0",
            ...domains.flatMap((d) => [`0.0.0.0 ${d}`, `0.0.0.0 www.${d}`])
        ];
        const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "seedcontroller-hosts-shield.txt";
        a.click();
        URL.revokeObjectURL(url);
        showToast("Downloaded system hosts shield configuration.", "success");
    });

    document.getElementById("exportDataBtn").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(appState, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `seedcontroller-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Exported portable JSON backup.", "success");
    });

    // Attempt quiet initial NeonDB sync
    syncWithNeonDB(false);
});



/* ==========================================================================
   NNN (NO NUT NOVEMBER) CHALLENGE MEGA-HUB CONTROLLER
   Includes:
   - Live NNN Countdown / Active November Survival Clock
   - 30-Day Interactive Survival Matrix synced with sc_nnn_daily_tracker
   - Real-Time Urge Intensity Thermometer & Defcon Tactical Prescriptions
   - Live Reddit OAuth2 + Public JSON Subreddit Scraper
   - Top 50 NNN & Retention YouTube Video Cinema (Live YouTube Data API v3 + 50 Curated Index)
   - Funny Stories & Lore Vault synced with sc_nnn_stories
   - Complete History of NNN Timeline (3000 BCE – 2026)
   - Mural, SVG Clip-Art & Pixabay Live API Visual Gallery
   ========================================================================== */

const API_KEYS_STORAGE = "seedcontroller_api_keys_v1";

// Top 50 Curated NNN, Dopamine Detox, Neurobiology & Retention Video Briefings (Fallback + Instant Cinema Index)
const TOP_50_NNN_VIDEOS = [
    { rank: 1, videoId: "uh13bd3q2P0", title: "How to Survive No Nut November: The Complete Tactical Blueprint", channel: "Improvement Pill", category: "NNN Survival", duration: "11:24" },
    { rank: 2, videoId: "7oFVOJf0TzY", title: "Your Brain on Porn: Dopamine Receptors & Prefrontal Reboot", channel: "Gary Wilson TEDx", category: "Neuroscience", duration: "15:52" },
    { rank: 3, videoId: "QmOF0crdyRU", title: "Controlling Your Dopamine For Motivation, Focus & Satisfaction", channel: "Andrew Huberman Lab", category: "Neuroscience", duration: "1:36:00" },
    { rank: 4, videoId: "Lr4d1bfHv6k", title: "Semen Retention: The Ancient Secret of Ojas & Creative Transmutation", channel: "Academy of Ideas", category: "Transmutation", duration: "14:18" },
    { rank: 5, videoId: "8aRor905cCw", title: "Why 90 Days of Retention Rewires Your Entire Nervous System", channel: "What I've Learned", category: "Neuroscience", duration: "16:40" },
    { rank: 6, videoId: "R6xbXOp7wDA", title: "The Philosophy of Brahmacharya: Swami Vivekananda's Energy Protocol", channel: "Vedanta Society", category: "Transmutation", duration: "18:12" },
    { rank: 7, videoId: "fLJincQZfah", title: "No Nut November Day 1 to Day 30: Hormonal & Mental Timeline", channel: "Sovereign Mind", category: "NNN Survival", duration: "12:45" },
    { rank: 8, videoId: "v7AYKMP6rOE", title: "10-Minute Morning Pranayama to Transmute Restless Urges", channel: "Breathe With Sandy", category: "Transmutation", duration: "10:30" },
    { rank: 9, videoId: "efZF26f72Qo", title: "Marcus Aurelius: Mastering The Inner Citadel & Bodily Impulses", channel: "Daily Stoic", category: "Stoic Discipline", duration: "13:15" },
    { rank: 10, videoId: "9QiE-M1LrZk", title: "Dopamine Detox: How To Reset Your Receptors in 30 Days", channel: "Niklas Christl", category: "Neuroscience", duration: "11:58" },
    { rank: 11, videoId: "w6T02g5hnT4", title: "Why Top Boxers & Olympic Warriors Practice Strict Retention", channel: "Athletic Alchemy", category: "NNN Survival", duration: "10:44" },
    { rank: 12, videoId: "tybOi4hjZFQ", title: "Wim Hof Breathing & Cold Exposure for Immediate Urge Override", channel: "Wim Hof", category: "Transmutation", duration: "11:10" },
    { rank: 13, videoId: "arj7oStGLkU", title: "Inside the Mind of a Master Procrastinator & Impulse Control", channel: "Tim Urban TED", category: "Stoic Discipline", duration: "14:03" },
    { rank: 14, videoId: "5MuIMqhT8DM", title: "How Sleep & Circadian Discipline Protect Your Late-Night Streak", channel: "Matt Walker", category: "Neuroscience", duration: "19:18" },
    { rank: 15, videoId: "Auuk1y4DR34", title: "Think and Grow Rich: Chapter 11 — The Mystery of Sex Transmutation", channel: "Napoleon Hill Archive", category: "Transmutation", duration: "24:10" },
    { rank: 16, videoId: "hJbRpHZr_d0", title: "The Day-7 Testosterone Peak Explained (Jiang et al. Clinical Breakdown)", channel: "Endocrine Insights", category: "Neuroscience", duration: "09:50" },
    { rank: 17, videoId: "LNHBMFCzznE", title: "Overcoming the Week-3 Dopamine Flatline Without Losing Your Streak", channel: "Reboot Mastery", category: "NNN Survival", duration: "13:22" },
    { rank: 18, videoId: "inpok4MKVLM", title: "5-Minute Emergency Vagal Nerve Reset When Urges Hit at Night", channel: "Goodful Calm", category: "NNN Survival", duration: "05:15" },
    { rank: 19, videoId: "H14bBuluwB8", title: "Grit: The Power of Passion and Perseverance Over 30-Day Crucibles", channel: "Angela Duckworth", category: "Stoic Discipline", duration: "06:12" },
    { rank: 20, videoId: "xp0O2vi8DX4", title: "How Neuroplasticity Lets You Break Any Compulsive Habit Loop", channel: "Sentis Brain", category: "Neuroscience", duration: "04:15" },
    { rank: 21, videoId: "brjAjq4zEIE", title: "Epictetus on Self-Mastery: Why No Man Is Free Who Serves Impulse", channel: "Einzelgänger", category: "Stoic Discipline", duration: "14:40" },
    { rank: 22, videoId: "m2GywoS77qc", title: "DeltaFosB: The Molecular Switch of Addiction & How It Clears", channel: "Neuro-Reboot Lab", category: "Neuroscience", duration: "12:08" },
    { rank: 23, videoId: "c1Ndym-IsQg", title: "Intermittent Fasting + Retention: The Autophagy & BDNF Synergy", channel: "Dr. Mindy Pelz", category: "Transmutation", duration: "15:30" },
    { rank: 24, videoId: "jPpUNAFHgxM", title: "No Nut November Survival Rules: What Counts, Edging Traps & Victory", channel: "NNN Command", category: "NNN Survival", duration: "08:55" },
    { rank: 25, videoId: "ZXsQAXx_ao0", title: "Seneca's Letters on Conquering Sloth and Pleasure Seeking", channel: "Stoic Wisdom", category: "Stoic Discipline", duration: "16:20" },
    { rank: 26, videoId: "4pLUleLdwY4", title: "432 Hz Deep Theta Meditation for Spinal Ojas Circulation", channel: "Meditative Mind", category: "Transmutation", duration: "30:00" },
    { rank: 27, videoId: "ktlTxC4QG8g", title: "The 90-Second Rule: How Brain Chemicals Flush Out If You Don't Act", channel: "Dr. Jill Bolte Taylor", category: "Neuroscience", duration: "07:45" },
    { rank: 28, videoId: "O-6f5wQXSu8", title: "Why Boredom & Loneliness Are the #1 Relapse Triggers (And The Fix)", channel: "HealthyGamerGG", category: "NNN Survival", duration: "21:14" },
    { rank: 29, videoId: "2Lz0VOltZKA", title: "Miyamoto Musashi's Dokkodo: 21 Precepts of Lone-Wolf Discipline", channel: "Warrior Philosophy", category: "Stoic Discipline", duration: "13:50" },
    { rank: 30, videoId: "bLpChrgS0AY", title: "Micro-Cosmic Orbit & Pelvic Floor Lock (Mula Bandha) Tutorial", channel: "Prana Academy", category: "Transmutation", duration: "14:05" },
    { rank: 31, videoId: "Wcs2PFz5q6g", title: "Androgen Receptor Density vs Free Testosterone: What Science Shows", channel: "More Plates More Dates", category: "Neuroscience", duration: "17:10" },
    { rank: 32, videoId: "U9YKY7fdwyg", title: "10 Habits That Make No Nut November Effortless", channel: "Hamza Unfiltered", category: "NNN Survival", duration: "15:02" },
    { rank: 33, videoId: "78I9dTB9vqM", title: "How Digital Minimalism Protects Your Dopamine Baseline", channel: "Cal Newport", category: "Stoic Discipline", duration: "13:30" },
    { rank: 34, videoId: "z6X5oEIg6Ak", title: "Nikola Tesla & Great Inventors on Celibacy and Mental Stamina", channel: "Biographics", category: "Transmutation", duration: "18:45" },
    { rank: 35, videoId: "1vx8iUvfyCY", title: "Day 14 to Day 21 NNN Danger Zone: Surviving the Second Surge", channel: "Spartan Retention", category: "NNN Survival", duration: "10:19" },
    { rank: 36, videoId: "6p_yaNFSYao", title: "How Cold Plunges Spike Norepinephrine by 250% & Kill Cravings", channel: "Rhonda Patrick", category: "Neuroscience", duration: "11:42" },
    { rank: 37, videoId: "iONDebHX9qk", title: "Why Eye Contact, Voice Depth & Posture Change on Retention", channel: "Charisma on Command", category: "Transmutation", duration: "12:15" },
    { rank: 38, videoId: "gn6Mh7Q7L7w", title: "Jocko Willink: Discipline Equals Freedom — Wake Up Early", channel: "Jocko Podcast", category: "Stoic Discipline", duration: "09:18" },
    { rank: 39, videoId: "tEmt1Znux58", title: "Box Breathing (4-4-4-4) Navy SEAL Technique for Instant Calm", channel: "Mark Divine", category: "NNN Survival", duration: "06:40" },
    { rank: 40, videoId: "d96cjJhvlMA", title: "Prolactin vs Dopamine: The Hormonal See-Saw After Release", channel: "Endocrine Mastery", category: "Neuroscience", duration: "14:28" },
    { rank: 41, videoId: "3sK3wJAxGfs", title: "David Goggins: Callusing the Mind Through Voluntary Hardship", channel: "Impact Theory", category: "Stoic Discipline", duration: "19:55" },
    { rank: 42, videoId: "ZToicYcHIOU", title: "Replacing Late-Night Doomscrolling With an Evening Shutdown Ritual", channel: "Matt D'Avella", category: "NNN Survival", duration: "10:50" },
    { rank: 43, videoId: "aEqlQvczMJQ", title: "Taoist Jing Conservation: Turning Vital Essence Into Shen (Spirit)", channel: "George Thompson", category: "Transmutation", duration: "16:12" },
    { rank: 44, videoId: "c8W7UDc8Ww0", title: "The Chaser Effect: Why Relapsing Once Often Leads to a Binge", channel: "Reboot Science", category: "NNN Survival", duration: "08:33" },
    { rank: 45, videoId: "y8Hn7n9L3vA", title: "Prefrontal Cortex Gray Matter Recovery After 60 Days Clean", channel: "Brain Facts", category: "Neuroscience", duration: "11:05" },
    { rank: 46, videoId: "k4yXQkG2s1E", title: "How to Channel Retention Energy Into Coding, Business & Art", channel: "Alex Hormozi Clips", category: "Transmutation", duration: "13:11" },
    { rank: 47, videoId: "vXzK8mP9q2W", title: "Why 'Just One Peek' Hijacks Your Limbic Reward Circuitry", channel: "Universal Man", category: "NNN Survival", duration: "12:00" },
    { rank: 48, videoId: "p9Q2mR7x4Lk", title: "Viktor Frankl: Finding Purpose So Strong That Impulse Loses Power", channel: "Meaning Archive", category: "Stoic Discipline", duration: "15:19" },
    { rank: 49, videoId: "m7T4kL2w9Qp", title: "Day 30 NNN Victory: Transitioning Into a 90-Day Lifestyle", channel: "Ascend Brotherhood", category: "NNN Survival", duration: "14:50" },
    { rank: 50, videoId: "q3W8nP5v2Rm", title: "The Complete Neuro-Endocrine Map of Semen Retention (Full Documentary)", channel: "SeedController Academy", category: "Neuroscience", duration: "42:15" }
];

// Complete History of NNN & Celibacy Timeline (3000 BCE – 2026)
const NNN_HISTORY_TIMELINE = [
    {
        era: "c. 1500 BCE • Vedic Period",
        title: "Classical Brahmacharya & Ojas Doctrine in the Upanishads and Ayurveda",
        desc: "Ancient Vedic texts codify Brahmacharya (conduct leading to Brahman) and describe Ojas as the subtle vital essence refined from retained reproductive tissue (Shukra Dhatu), foundational for memory, immunity, and spiritual fearlessness."
    },
    {
        era: "c. 400 BCE • Classical Greece",
        title: "Olympic Athletes, Pythagoras & Stoic Enkrateia (Self-Mastery)",
        desc: "Greek Olympians and warriors practice strict pre-competition abstinence to preserve aggression and stamina. Stoic philosophers like Epictetus and Musonius Rufus teach Enkrateia—sovereignty over bodily appetites."
    },
    {
        era: "1937 • Modern Performance Literature",
        title: "Napoleon Hill Publishes 'Sex Transmutation' in Think and Grow Rich",
        desc: "After interviewing 500 self-made industrialists and inventors, Hill dedicates Chapter 11 to Sex Transmutation—defining it as the switching of the mind from thoughts of physical expression to high-voltage creative and financial output."
    },
    {
        era: "2003 & 2011 • Clinical & Reddit Foundations",
        title: "Jiang et al. Day-7 Testosterone Study & Creation of r/NoFap",
        desc: "In June 2011, Alexander Rhodes founds r/NoFap on Reddit following viral discussion of the 2003 Zhejiang University study showing a 145.7% surge in serum testosterone on Day 7 of abstinence."
    },
    {
        era: "November 3, 2011 • Origin of NNN",
        title: "First Recorded 'No Nut November' Entry Published on Urban Dictionary",
        desc: "Urban Dictionary user 'bicboi6969696969' coins the first formal internet entry for No Nut November as a 30-day annual challenge of absolute abstinence throughout the month of November."
    },
    {
        era: "November 2017 – 2019 • Global Viral Explosion",
        title: "r/nonutnovember Surges Past 100k+ Members & 'Superpower' Meme Era",
        desc: "NNN transforms into a massive global cultural phenomenon across Reddit, YouTube, and Twitter. Comedic 'Day 15 levitation' memes blend with genuine self-improvement, daily roll-calls, and dopamine-reboot accountability."
    },
    {
        era: "2020 – 2026 • Bio-Optimization & Gamified Sovereignty",
        title: "Modern Neuro-Reboot Apps & Cloud-Synced Brotherhood Platforms",
        desc: "Practitioners combine the 30-day November crucible with heart-rate variability (HRV) breathwork, intermittent fasting, cold exposure, and full-stack trackers like SeedController to turn a 30-day challenge into lifelong discipline."
    }
];

// Default Built-in Murals & SVG Clip-Art Emblems for the NNN Visual Gallery
const BUILTIN_NNN_GALLERY = window.BUILTIN_NNN_GALLERY = [
    {
        id: "mural-1",
        title: "The Spartan Autumn Citadel (NNN War Room Hero Mural)",
        imageUrl: "data:image/jpeg;base64,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",
        badge: "Custom Digital Mural",
        desc: "Stoic armored guardian atop the autumn peak beneath a 528Hz solar core."
    },
    {
        id: "mural-2",
        title: "Temple of Ojas & Neural Ascension (History Mural)",
        imageUrl: "data:image/jpeg;base64,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",
        badge: "Classical Lore Mural",
        desc: "Visualizing spinal energy transmutation from the root to the prefrontal crown."
    },
    {
        id: "mural-3",
        title: "Cyber-Stoic Aegis Urge Shield (Defense Emblem)",
        imageUrl: "data:image/jpeg;base64,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",
        badge: "Vector Shield Art",
        desc: "Emerald and solar-gold geometric fortress repelling limbic urge storms."
    }
];

function getSavedApiKeys() {
    try {
        const raw = localStorage.getItem(API_KEYS_STORAGE);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function saveApiKeysToStorage(keysObj) {
    try {
        localStorage.setItem(API_KEYS_STORAGE, JSON.stringify(keysObj));
    } catch (e) {
        // Ignore sandbox storage errors
    }
}

/* ===== 1. LIVE NNN COUNTDOWN / SURVIVAL CLOCK ===== */
function updateNnnClock() {
    const dEl = document.getElementById("nnnTimerD");
    const hEl = document.getElementById("nnnTimerH");
    const mEl = document.getElementById("nnnTimerM");
    const sEl = document.getElementById("nnnTimerS");
    const labelEl = document.getElementById("nnnClockHeaderLabel");
    const phaseBadge = document.getElementById("nnnPhaseStatusBadge");
    if (!dEl) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed: 9 = Oct, 10 = Nov

    let targetMs = 0;
    if (month === 10) {
        // Inside November! Count elapsed time or time remaining until Dec 1
        const dec1 = new Date(year, 11, 1, 0, 0, 0).getTime();
        targetMs = Math.max(0, dec1 - now.getTime());
        if (labelEl) labelEl.textContent = `Time Remaining in NNN ${year}`;
        if (phaseBadge) phaseBadge.textContent = `🔥 NNN ${year} LIVE IN PROGRESS`;
    } else {
        // Count down to next November 1st 00:00:00
        const nextNovYear = month > 10 ? year + 1 : year;
        const nov1 = new Date(nextNovYear, 10, 1, 0, 0, 0).getTime();
        targetMs = Math.max(0, nov1 - now.getTime());
        if (labelEl) labelEl.textContent = `Countdown to Nov 1, ${nextNovYear} Launch`;
        if (phaseBadge) phaseBadge.textContent = `Pre-November War Room Armed`;
    }

    const totalSec = Math.floor(targetMs / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    dEl.textContent = String(d).padStart(2, "0");
    hEl.textContent = String(h).padStart(2, "0");
    mEl.textContent = String(m).padStart(2, "0");
    sEl.textContent = String(s).padStart(2, "0");
}

/* ===== 2. MULTI-PROFILE ENGINE, NNN 30-DAY SURVIVAL MATRIX, IMMUTABLE YEARLY STATUS & SELF-TOUCHING CALENDAR ===== */

const OFFICIAL_SELF_TOUCHING_STATUSES = [
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

const SELF_TOUCHING_STATUS_META = {
    "No Sexual Activity": { icon: "🛡️", badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50", cellClass: "border-emerald-400/45 bg-emerald-950/25" },
    "Only Gooning": { icon: "⚠️", badgeClass: "bg-amber-500/25 text-amber-300 border-amber-400/50", cellClass: "border-amber-400/45 bg-amber-950/25" },
    "Masturbation With Ejaculation": { icon: "💦", badgeClass: "bg-red-500/25 text-red-300 border-red-400/50", cellClass: "border-red-400/50 bg-red-950/30" },
    "Masturbation Without Ejaculation": { icon: "🔥", badgeClass: "bg-orange-500/25 text-orange-300 border-orange-400/50", cellClass: "border-orange-400/45 bg-orange-950/25" },
    "Penetrative Sex": { icon: "❤️", badgeClass: "bg-cyan-500/25 text-cyan-300 border-cyan-400/50", cellClass: "border-cyan-400/45 bg-cyan-950/25" },
    "Oral Sex": { icon: "💋", badgeClass: "bg-pink-500/25 text-pink-300 border-pink-400/50", cellClass: "border-pink-400/45 bg-pink-950/25" },
    "Light Couple Play": { icon: "✨", badgeClass: "bg-purple-500/25 text-purple-300 border-purple-400/50", cellClass: "border-purple-400/45 bg-purple-950/30" },
    "Drink Partner's Cum": { icon: "🧪", badgeClass: "bg-rose-500/25 text-rose-300 border-rose-400/50", cellClass: "border-rose-400/45 bg-rose-950/30" },
    "Drink Own Cum": { icon: "⚡", badgeClass: "bg-fuchsia-500/25 text-fuchsia-300 border-fuchsia-400/50", cellClass: "border-fuchsia-400/45 bg-fuchsia-950/30" }
};

function getLocalTodayIso() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function getEffectiveMatrixReferenceTodayIso() {
    const mode = document.getElementById("nnnMatrixClockModeSelect")?.value || "live";
    if (mode === "sim_nov15") {
        return "2026-11-15";
    }
    return getLocalTodayIso();
}

function isNovemberDayElapsed(challengeYear, dayNumber) {
    const refTodayIso = getEffectiveMatrixReferenceTodayIso();
    const novDateIso = `${Number(challengeYear)}-11-${String(dayNumber).padStart(2, "0")}`;
    return novDateIso < refTodayIso;
}

function createBlankProfileBundle(profileKey, displayName = "Sovereign Practitioner") {
    const now = Date.now();
    return {
        profile: {
            profile_key: profileKey,
            display_name: displayName,
            pmo_start_time: new Date(now - 7 * 86400000).toISOString(),
            p_start_time: new Date(now - 10 * 86400000).toISOString(),
            mo_start_time: new Date(now - 7 * 86400000).toISOString(),
            longest_streak_days: 10,
            aura_points: 250,
            target_days: 90,
            fasting_active: false,
            fasting_start_time: null,
            fasting_target_hours: 16,
            blocker_strictness: "strict",
            custom_blocked_domains: "adultsite.example,triggerhub.example"
        },
        completedHabitsToday: ["cold_exposure"],
        relapseHistory: [],
        journalEntries: []
    };
}

function buildSeededMultiProfileData() {
    const now = Date.now();
    const profilesByKey = {
        default_monk: {
            profile: {
                profile_key: "default_monk",
                display_name: "Sovereign Initiate",
                pmo_start_time: new Date(now - (14 * 86400000 + 8 * 3600000 + 42 * 60000)).toISOString(),
                p_start_time: new Date(now - (21 * 86400000 + 4 * 3600000)).toISOString(),
                mo_start_time: new Date(now - (14 * 86400000 + 8 * 3600000 + 42 * 60000)).toISOString(),
                longest_streak_days: 21,
                aura_points: 420,
                target_days: 90,
                fasting_active: false,
                fasting_start_time: null,
                fasting_target_hours: 16,
                blocker_strictness: "strict",
                custom_blocked_domains: "adultsite.example,triggerhub.example,nsfwscroll.example"
            },
            completedHabitsToday: ["cold_exposure", "zero_edging"],
            relapseHistory: [
                {
                    id: 101,
                    streak_type: "MO_ONLY",
                    streak_days_achieved: 19.4,
                    trigger_category: "Late Night Scrolling",
                    emotional_state: "Exhausted / Low Dopamine",
                    lesson_learned: "Kept P-Free streak intact; installed bedroom phone curfew after 10:30 PM.",
                    logged_at: new Date(now - 14 * 86400000).toISOString()
                },
                {
                    id: 100,
                    streak_type: "PMO",
                    streak_days_achieved: 11.2,
                    trigger_category: "Stress / Work Burnout",
                    emotional_state: "Restless / Anxious",
                    lesson_learned: "Replaced afternoon stress cues with 4-7-8 breathwork and 25 pushups.",
                    logged_at: new Date(now - 34 * 86400000).toISOString()
                }
            ],
            journalEntries: [
                {
                    id: 201,
                    title: "Day 14 (default_monk): Noticeable Surge in Morning Drive & Focus",
                    mood: "⚡ High Drive & Focused",
                    energy_level: 9,
                    urge_intensity: 2,
                    content: "Two full weeks locked in on default_monk profile. Completed a 16-hour intermittent fast and hit a personal best on compound lifts.",
                    created_at: new Date(now - 6 * 3600000).toISOString()
                }
            ]
        },
        spartan_arjun: {
            profile: {
                profile_key: "spartan_arjun",
                display_name: "Spartan Commander Arjun",
                pmo_start_time: new Date(now - (42 * 86400000 + 6 * 3600000 + 18 * 60000)).toISOString(),
                p_start_time: new Date(now - (56 * 86400000 + 2 * 3600000)).toISOString(),
                mo_start_time: new Date(now - (42 * 86400000 + 6 * 3600000 + 18 * 60000)).toISOString(),
                longest_streak_days: 56,
                aura_points: 1180,
                target_days: 90,
                fasting_active: true,
                fasting_start_time: new Date(now - (14 * 3600000 + 25 * 60000)).toISOString(),
                fasting_target_hours: 18,
                blocker_strictness: "strict",
                custom_blocked_domains: "adultsite.example,shortsdoom.example,latebait.example"
            },
            completedHabitsToday: ["cold_exposure", "pranayama_breath", "compound_lifts", "deep_work_90", "zero_edging"],
            relapseHistory: [
                {
                    id: 501,
                    streak_type: "MO_ONLY",
                    streak_days_achieved: 31.5,
                    trigger_category: "Travel Fatigue",
                    emotional_state: "Restless / Anxious",
                    lesson_learned: "Maintained 18:6 Warrior Monk fasting and cold showers during hotel stays.",
                    logged_at: new Date(now - 42 * 86400000).toISOString()
                }
            ],
            journalEntries: [
                {
                    id: 601,
                    title: "Day 42 (Spartan Arjun): 18:6 Autophagy Fast + Zero Urge Volatility",
                    mood: "🔥 Unstoppable Spartan",
                    energy_level: 10,
                    urge_intensity: 1,
                    content: "Currently 14.5 hours into my 18:6 Warrior Monk fast. Voice resonance, posture, and coding output are at all-time highs.",
                    created_at: new Date(now - 3 * 3600000).toISOString()
                }
            ]
        },
        vedic_sage_108: {
            profile: {
                profile_key: "vedic_sage_108",
                display_name: "Brahmacharya Sage 108",
                pmo_start_time: new Date(now - (95 * 86400000 + 11 * 3600000 + 10 * 60000)).toISOString(),
                p_start_time: new Date(now - (120 * 86400000 + 5 * 3600000)).toISOString(),
                mo_start_time: new Date(now - (95 * 86400000 + 11 * 3600000 + 10 * 60000)).toISOString(),
                longest_streak_days: 120,
                aura_points: 2640,
                target_days: 180,
                fasting_active: true,
                fasting_start_time: new Date(now - (19 * 3600000 + 10 * 60000)).toISOString(),
                fasting_target_hours: 20,
                blocker_strictness: "maximum",
                custom_blocked_domains: "adultsite.example,triggerhub.example,dopaminetrap.example,reelsbait.example"
            },
            completedHabitsToday: ["cold_exposure", "pranayama_breath", "compound_lifts", "deep_work_90", "digital_sunset", "zero_edging"],
            relapseHistory: [
                {
                    id: 502,
                    streak_type: "PMO",
                    streak_days_achieved: 64.0,
                    trigger_category: "Complacency at Day 64",
                    emotional_state: "Overconfident ('Just a peek')",
                    lesson_learned: "Adopted unbroken Siddhasana pranayama and 20:4 Deep Autophagy fasting.",
                    logged_at: new Date(now - 95 * 86400000).toISOString()
                }
            ],
            journalEntries: [
                {
                    id: 602,
                    title: "Day 95 (Vedic Sage 108): Full 90-Day Reboot Completed & Ojas Stabilized",
                    mood: "🧘 Sovereign Equanimity",
                    energy_level: 10,
                    urge_intensity: 0,
                    content: "19+ hours into today's 20:4 Deep Autophagy fast. Completed 3 consecutive victorious NNN campaigns (2023, 2024, 2025) and locked in all 30 days for 2026.",
                    created_at: new Date(now - 2 * 3600000).toISOString()
                }
            ]
        },
        neophyte_seeker: {
            profile: {
                profile_key: "neophyte_seeker",
                display_name: "Reboot Challenger",
                pmo_start_time: new Date(now - (3 * 86400000 + 15 * 3600000 + 5 * 60000)).toISOString(),
                p_start_time: new Date(now - (7 * 86400000 + 9 * 3600000)).toISOString(),
                mo_start_time: new Date(now - (3 * 86400000 + 15 * 3600000 + 5 * 60000)).toISOString(),
                longest_streak_days: 12,
                aura_points: 145,
                target_days: 30,
                fasting_active: false,
                fasting_start_time: null,
                fasting_target_hours: 24,
                blocker_strictness: "standard",
                custom_blocked_domains: "adultsite.example,triggerhub.example"
            },
            completedHabitsToday: ["cold_exposure"],
            relapseHistory: [
                {
                    id: 503,
                    streak_type: "PMO",
                    streak_days_achieved: 4.5,
                    trigger_category: "Social Media Algorithm",
                    emotional_state: "Boredom & Isolation",
                    lesson_learned: "Enabled CleanBrowsing DNS 185.228.168.10 and started tracking every day in the Self-Touching Calendar.",
                    logged_at: new Date(now - 3 * 86400000).toISOString()
                }
            ],
            journalEntries: [
                {
                    id: 603,
                    title: "Day 3 (Reboot Challenger): Building Honest Accountability",
                    mood: "🛡️ Determined",
                    energy_level: 7,
                    urge_intensity: 5,
                    content: "Failed NNN in 2024 and 2025 early, but logging every trigger honestly now. Preparing for a 24h Solar Reset fast.",
                    created_at: new Date(now - 8 * 3600000).toISOString()
                }
            ]
        }
    };

    // Multi-year NNN Daily Survival Matrix per profile
    const nnnDailyByProfile = {
        default_monk: { 2020: {}, 2021: {}, 2022: {}, 2023: {}, 2024: {}, 2025: {}, 2026: {}, 2027: {}, 2028: {}, 2029: {}, 2030: {}, 2031: {} },
        spartan_arjun: { 2020: {}, 2021: {}, 2022: {}, 2023: {}, 2024: {}, 2025: {}, 2026: {}, 2027: {}, 2028: {}, 2029: {}, 2030: {}, 2031: {} },
        vedic_sage_108: { 2020: {}, 2021: {}, 2022: {}, 2023: {}, 2024: {}, 2025: {}, 2026: {}, 2027: {}, 2028: {}, 2029: {}, 2030: {}, 2031: {} },
        neophyte_seeker: { 2020: {}, 2021: {}, 2022: {}, 2023: {}, 2024: {}, 2025: {}, 2026: {}, 2027: {}, 2028: {}, 2029: {}, 2030: {}, 2031: {} }
    };

    // default_monk: 2023 Success (30/30), 2024 Failed (Day 11), 2025 Success (30/30), 2026 (Days 1-14 clean/danger)
    for (let d = 1; d <= 30; d++) {
        nnnDailyByProfile.default_monk[2023][d] = { profile_key: "default_monk", challenge_year: 2023, day_number: d, status: "survived", urge_level: 2 };
        nnnDailyByProfile.default_monk[2025][d] = { profile_key: "default_monk", challenge_year: 2025, day_number: d, status: (d === 7 || d === 14 || d === 21) ? "danger_zone" : "survived", urge_level: (d === 7 || d === 14 || d === 21) ? 6 : 2 };
    }
    for (let d = 1; d <= 11; d++) {
        nnnDailyByProfile.default_monk[2024][d] = { profile_key: "default_monk", challenge_year: 2024, day_number: d, status: d === 11 ? "fallen" : (d === 6 || d === 9 ? "danger_zone" : "survived"), urge_level: d === 11 ? 9 : 4 };
    }
    for (let d = 1; d <= 14; d++) {
        nnnDailyByProfile.default_monk[2026][d] = { profile_key: "default_monk", challenge_year: 2026, day_number: d, status: (d === 7 || d === 12) ? "danger_zone" : "survived", urge_level: d === 7 ? 7 : 2 };
    }

    // spartan_arjun: 2023 Failed (Day 19), 2024 Success (30/30), 2025 Success (30/30), 2026 (Days 1-22 clean/danger)
    for (let d = 1; d <= 19; d++) {
        nnnDailyByProfile.spartan_arjun[2023][d] = { profile_key: "spartan_arjun", challenge_year: 2023, day_number: d, status: d === 19 ? "fallen" : "survived", urge_level: d === 19 ? 9 : 2 };
    }
    for (let d = 1; d <= 30; d++) {
        nnnDailyByProfile.spartan_arjun[2024][d] = { profile_key: "spartan_arjun", challenge_year: 2024, day_number: d, status: (d === 8 || d === 17 || d === 25) ? "danger_zone" : "survived", urge_level: 3 };
        nnnDailyByProfile.spartan_arjun[2025][d] = { profile_key: "spartan_arjun", challenge_year: 2025, day_number: d, status: "survived", urge_level: 1 };
    }
    for (let d = 1; d <= 22; d++) {
        nnnDailyByProfile.spartan_arjun[2026][d] = { profile_key: "spartan_arjun", challenge_year: 2026, day_number: d, status: (d === 5 || d === 15 || d === 22) ? "danger_zone" : "survived", urge_level: 2 };
    }

    // vedic_sage_108: 2023, 2024, 2025 all 30/30 Success, 2026 all 30 days planned clean
    [2023, 2024, 2025, 2026].forEach((yr) => {
        for (let d = 1; d <= 30; d++) {
            nnnDailyByProfile.vedic_sage_108[yr][d] = { profile_key: "vedic_sage_108", challenge_year: yr, day_number: d, status: "survived", urge_level: 1 };
        }
    });

    // neophyte_seeker: 2023 Failed (Day 3), 2024 Failed (Day 4), 2025 Failed (Day 9), 2026 Failed (Day 6)
    for (let d = 1; d <= 3; d++) {
        nnnDailyByProfile.neophyte_seeker[2023][d] = { profile_key: "neophyte_seeker", challenge_year: 2023, day_number: d, status: d === 3 ? "fallen" : "danger_zone", urge_level: 8 };
    }
    for (let d = 1; d <= 4; d++) {
        nnnDailyByProfile.neophyte_seeker[2024][d] = { profile_key: "neophyte_seeker", challenge_year: 2024, day_number: d, status: d === 4 ? "fallen" : "danger_zone", urge_level: 8 };
    }
    for (let d = 1; d <= 9; d++) {
        nnnDailyByProfile.neophyte_seeker[2025][d] = { profile_key: "neophyte_seeker", challenge_year: 2025, day_number: d, status: d === 9 ? "fallen" : (d === 3 || d === 7 ? "danger_zone" : "survived"), urge_level: 7 };
    }
    for (let d = 1; d <= 8; d++) {
        nnnDailyByProfile.neophyte_seeker[2026][d] = { profile_key: "neophyte_seeker", challenge_year: 2026, day_number: d, status: d === 6 ? "fallen" : (d === 3 || d === 5 ? "danger_zone" : "survived"), urge_level: 8 };
    }

    // Self-Touching & Sexual Activity Records per profile across 2025 & 2026
    const selfTouchingByProfile = {
        default_monk: {
            "2026-10-02": { profile_key: "default_monk", record_date: "2026-10-02", activity_status: "Masturbation With Ejaculation", notes: "Elapsed record prior to 14d streak (Immutable)" },
            "2026-10-08": { profile_key: "default_monk", record_date: "2026-10-08", activity_status: "Only Gooning", notes: "Late night scroll slip (Immutable)" },
            "2026-10-14": { profile_key: "default_monk", record_date: "2026-10-14", activity_status: "Masturbation Without Ejaculation", notes: "Edging incident before reset (Immutable)" },
            "2026-10-15": { profile_key: "default_monk", record_date: "2026-10-15", activity_status: "No Sexual Activity", notes: "Day 1 of clean retention streak (Immutable)" },
            "2026-10-18": { profile_key: "default_monk", record_date: "2026-10-18", activity_status: "No Sexual Activity", notes: "Cold plunge + compound lifts (Immutable)" },
            "2026-10-22": { profile_key: "default_monk", record_date: "2026-10-22", activity_status: "No Sexual Activity", notes: "Day-7 testosterone peak channeled (Immutable)" },
            "2026-10-25": { profile_key: "default_monk", record_date: "2026-10-25", activity_status: "No Sexual Activity", notes: "Zero urges all day (Immutable)" },
            "2026-10-28": { profile_key: "default_monk", record_date: "2026-10-28", activity_status: "No Sexual Activity", notes: "Clean discipline locked in" },
            "2026-10-29": { profile_key: "default_monk", record_date: "2026-10-29", activity_status: "No Sexual Activity", notes: "Current day commitment — click to edit" },
            "2026-10-30": { profile_key: "default_monk", record_date: "2026-10-30", activity_status: "No Sexual Activity", notes: "Future date — click to change status" },
            "2026-11-01": { profile_key: "default_monk", record_date: "2026-11-01", activity_status: "No Sexual Activity", notes: "NNN Day 1 Sovereign Pledge" }
        },
        spartan_arjun: {
            "2026-10-04": { profile_key: "spartan_arjun", record_date: "2026-10-04", activity_status: "Penetrative Sex", notes: "Partner intimacy (Immutable)" },
            "2026-10-11": { profile_key: "spartan_arjun", record_date: "2026-10-11", activity_status: "Light Couple Play", notes: "Non-ejaculatory couple bonding (Immutable)" },
            "2026-10-16": { profile_key: "spartan_arjun", record_date: "2026-10-16", activity_status: "Oral Sex", notes: "Anniversary evening (Immutable)" },
            "2026-10-20": { profile_key: "spartan_arjun", record_date: "2026-10-20", activity_status: "No Sexual Activity", notes: "18:6 Warrior Monk fast + gym (Immutable)" },
            "2026-10-24": { profile_key: "spartan_arjun", record_date: "2026-10-24", activity_status: "No Sexual Activity", notes: "Full Spartan protocol (Immutable)" },
            "2026-10-29": { profile_key: "spartan_arjun", record_date: "2026-10-29", activity_status: "No Sexual Activity", notes: "Active 18:6 fast + clean focus" },
            "2026-11-01": { profile_key: "spartan_arjun", record_date: "2026-11-01", activity_status: "No Sexual Activity", notes: "Spartan NNN Day 1" }
        },
        vedic_sage_108: {
            "2026-10-01": { profile_key: "vedic_sage_108", record_date: "2026-10-01", activity_status: "No Sexual Activity", notes: "Brahmacharya sadhana (Immutable)" },
            "2026-10-07": { profile_key: "vedic_sage_108", record_date: "2026-10-07", activity_status: "No Sexual Activity", notes: "Ojas transmutation + pranayama (Immutable)" },
            "2026-10-14": { profile_key: "vedic_sage_108", record_date: "2026-10-14", activity_status: "No Sexual Activity", notes: "20:4 Deep Autophagy fast (Immutable)" },
            "2026-10-21": { profile_key: "vedic_sage_108", record_date: "2026-10-21", activity_status: "No Sexual Activity", notes: "90+ Day Solar Sovereign (Immutable)" },
            "2026-10-29": { profile_key: "vedic_sage_108", record_date: "2026-10-29", activity_status: "No Sexual Activity", notes: "Unbroken celibacy" },
            "2026-11-01": { profile_key: "vedic_sage_108", record_date: "2026-11-01", activity_status: "No Sexual Activity", notes: "NNN Mastery" }
        },
        neophyte_seeker: {
            "2026-10-03": { profile_key: "neophyte_seeker", record_date: "2026-10-03", activity_status: "Only Gooning", notes: "Late night relapse (Immutable)" },
            "2026-10-09": { profile_key: "neophyte_seeker", record_date: "2026-10-09", activity_status: "Masturbation With Ejaculation", notes: "Weekend slip (Immutable)" },
            "2026-10-14": { profile_key: "neophyte_seeker", record_date: "2026-10-14", activity_status: "Oral Sex", notes: "Partner encounter (Immutable)" },
            "2026-10-19": { profile_key: "neophyte_seeker", record_date: "2026-10-19", activity_status: "Drink Partner's Cum", notes: "Logged intimate encounter (Immutable)" },
            "2026-10-22": { profile_key: "neophyte_seeker", record_date: "2026-10-22", activity_status: "Drink Own Cum", notes: "Logged experimental slip (Immutable)" },
            "2026-10-25": { profile_key: "neophyte_seeker", record_date: "2026-10-25", activity_status: "Masturbation Without Ejaculation", notes: "Stopped before point of no return (Immutable)" },
            "2026-10-29": { profile_key: "neophyte_seeker", record_date: "2026-10-29", activity_status: "No Sexual Activity", notes: "Fresh reboot commitment today (Editable)" },
            "2026-10-31": { profile_key: "neophyte_seeker", record_date: "2026-10-31", activity_status: "Light Couple Play", notes: "Planned date night (Editable future status)" }
        }
    };

    return { profilesByKey, nnnDailyByProfile, selfTouchingByProfile };
}

function ensureMultiProfileStructures() {
    const seeded = buildSeededMultiProfileData();
    if (!appState.profilesByKey || typeof appState.profilesByKey !== "object") {
        appState.profilesByKey = seeded.profilesByKey;
    } else {
        Object.keys(seeded.profilesByKey).forEach((pk) => {
            if (!appState.profilesByKey[pk]) {
                appState.profilesByKey[pk] = seeded.profilesByKey[pk];
            }
        });
    }

    if (!appState.nnnDailyByProfile || typeof appState.nnnDailyByProfile !== "object") {
        appState.nnnDailyByProfile = seeded.nnnDailyByProfile;
    } else {
        Object.keys(seeded.nnnDailyByProfile).forEach((pk) => {
            if (!appState.nnnDailyByProfile[pk]) {
                appState.nnnDailyByProfile[pk] = seeded.nnnDailyByProfile[pk];
            } else {
                [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031].forEach((yr) => {
                    if (!appState.nnnDailyByProfile[pk][yr]) {
                        appState.nnnDailyByProfile[pk][yr] = seeded.nnnDailyByProfile[pk][yr] || {};
                    }
                });
            }
        });
    }

    if (!appState.selfTouchingByProfile || typeof appState.selfTouchingByProfile !== "object") {
        appState.selfTouchingByProfile = seeded.selfTouchingByProfile;
    } else {
        Object.keys(seeded.selfTouchingByProfile).forEach((pk) => {
            if (!appState.selfTouchingByProfile[pk]) {
                appState.selfTouchingByProfile[pk] = seeded.selfTouchingByProfile[pk];
            }
        });
    }

    const currentKey = appState.profile?.profile_key || "default_monk";
    if (!appState.profilesByKey[currentKey]) {
        appState.profilesByKey[currentKey] = {
            profile: { ...appState.profile },
            completedHabitsToday: [...(appState.completedHabitsToday || [])],
            relapseHistory: [...(appState.relapseHistory || [])],
            journalEntries: [...(appState.journalEntries || [])]
        };
    }
    if (!appState.nnnDailyByProfile[currentKey]) {
        appState.nnnDailyByProfile[currentKey] = { 2020: {}, 2021: {}, 2022: {}, 2023: {}, 2024: {}, 2025: {}, 2026: {}, 2027: {}, 2028: {}, 2029: {}, 2030: {}, 2031: {} };
    }
    if (!appState.selfTouchingByProfile[currentKey]) {
        appState.selfTouchingByProfile[currentKey] = {};
    }
}

function populateAllProfileDropdowns() {
    ensureMultiProfileStructures();
    const activeKey = appState.profile?.profile_key || "default_monk";
    const selectIds = [
        "globalProfileSelect",
        "dashboardProfileSelect",
        "nnnMatrixProfileSelect",
        "nnnStatusProfileSelect",
        "stProfileSelect"
    ];

    const keys = Object.keys(appState.profilesByKey);
    selectIds.forEach((id) => {
        const sel = document.getElementById(id);
        if (!sel) return;
        sel.innerHTML = "";
        keys.forEach((pk) => {
            const pObj = appState.profilesByKey[pk]?.profile || {};
            const disp = pObj.display_name || pk;
            const opt = document.createElement("option");
            opt.value = pk;
            opt.className = "bg-[#160832] text-white";
            opt.textContent = `${pk} (${disp})`;
            if (pk === activeKey) opt.selected = true;
            sel.appendChild(opt);
        });
        sel.value = activeKey;
    });
}

async function switchActiveProfile(newProfileKey, notify = true) {
    const cleanKey = String(newProfileKey || "default_monk").trim();
    if (!cleanKey) return;

    ensureMultiProfileStructures();

    // Save outgoing profile snapshot
    const prevKey = appState.profile?.profile_key || "default_monk";
    appState.profilesByKey[prevKey] = {
        profile: { ...appState.profile },
        completedHabitsToday: [...(appState.completedHabitsToday || [])],
        relapseHistory: [...(appState.relapseHistory || [])],
        journalEntries: [...(appState.journalEntries || [])]
    };

    // Ensure target profile exists in catalog
    if (!appState.profilesByKey[cleanKey]) {
        appState.profilesByKey[cleanKey] = createBlankProfileBundle(cleanKey, cleanKey);
    }
    if (!appState.nnnDailyByProfile[cleanKey]) {
        appState.nnnDailyByProfile[cleanKey] = { 2020: {}, 2021: {}, 2022: {}, 2023: {}, 2024: {}, 2025: {}, 2026: {}, 2027: {}, 2028: {}, 2029: {}, 2030: {}, 2031: {} };
    }
    if (!appState.selfTouchingByProfile[cleanKey]) {
        appState.selfTouchingByProfile[cleanKey] = {};
    }

    const targetBundle = appState.profilesByKey[cleanKey];
    appState.profile = { ...targetBundle.profile, profile_key: cleanKey };
    appState.completedHabitsToday = [...(targetBundle.completedHabitsToday || [])];
    appState.relapseHistory = [...(targetBundle.relapseHistory || [])];
    appState.journalEntries = [...(targetBundle.journalEntries || [])];

    const selectedMatrixYear = Number(document.getElementById("nnnMatrixYearSelect")?.value || 2026);
    appState.nnnDailyMap = appState.nnnDailyByProfile[cleanKey][selectedMatrixYear] || {};

    const pkInput = document.getElementById("profileKeyInput");
    if (pkInput) pkInput.value = cleanKey;

    populateAllProfileDropdowns();
    saveLocalState();
    renderAll();
    renderNnnCalendar();
    renderNnnYearlyStatus();
    renderSelfTouchingCalendar();

    if (notify) {
        const fastState = appState.profile.fasting_active
            ? `Active ${appState.profile.fasting_target_hours}h Fast`
            : `${appState.profile.fasting_target_hours}h Fast Standby`;
        showToast(`Switched active profile to "${cleanKey}" (${appState.profile.display_name}) • ${fastState}`, "success");
    }

    // Also pull latest state for this profileKey from NeonDB if deployed
    await syncWithNeonDB(false);
}

function ensureNnnStateDefaults() {
    ensureMultiProfileStructures();
    const pk = appState.profile?.profile_key || "default_monk";
    const yr = Number(document.getElementById("nnnMatrixYearSelect")?.value || 2026);
    if (!appState.nnnDailyByProfile[pk]) {
        appState.nnnDailyByProfile[pk] = { 2020: {}, 2021: {}, 2022: {}, 2023: {}, 2024: {}, 2025: {}, 2026: {}, 2027: {}, 2028: {}, 2029: {}, 2030: {}, 2031: {} };
    }
    if (!appState.nnnDailyByProfile[pk][yr]) {
        appState.nnnDailyByProfile[pk][yr] = {};
    }
    appState.nnnDailyMap = appState.nnnDailyByProfile[pk][yr];

    if (!Array.isArray(appState.nnnStories) || appState.nnnStories.length === 0) {
        appState.nnnStories = [
            {
                id: 901,
                author_handle: "LevitationMonk_99",
                day_tag: "Day 12 of NNN",
                title: "Accidentally Teleported to the Gym Squat Rack at 5:15 AM",
                story_body: "By Day 12 of No Nut November, my alarm did not wake me up—I woke up the alarm. I went to make black coffee, blinked once, and somehow I was already warming up with 225 lbs on the barbell while reciting Marcus Aurelius in Latin. Even the gym bro who never spots anyone nodded at me in solemn respect.",
                humor_tag: "Superpower Meme Lore",
                laugh_sparks: 128
            },
            {
                id: 902,
                author_handle: "ColdShowerGeneral",
                day_tag: "Day 19 of NNN",
                title: "The Wi-Fi Router Blinked and I Thought It Was Morse Code From My Future Self",
                story_body: "Week 3 urges hit at 11:30 PM while I was finishing a coding sprint. Instead of opening a new tab, I sprinted to the bathroom, turned the shower knob to Arctic Glacier mode, and did 40 pushups on the tile floor. My roommate asked if we were under siege. I told him: Only by our own limbic systems, brother.",
                humor_tag: "Urge Survival Comedy",
                laugh_sparks: 96
            },
            {
                id: 903,
                author_handle: "BrahmacharyaCoder",
                day_tag: "Day 26 of NNN",
                title: "Dogs Bark in Respect & My CSS Grid Centered Itself on the First Try",
                story_body: "People told me the NNN superpower memes were exaggerated. Explain how on Day 26 I wrote a 400-line PostgreSQL migration and a responsive flexbox layout without opening StackOverflow once, and stray squirrels on my morning walk stood at attention as I walked past.",
                humor_tag: "Developer Ascension",
                laugh_sparks: 164
            },
            {
                id: 904,
                author_handle: "StoicSpartan_07",
                day_tag: "Day 7 of NNN",
                title: "The Great Peanut Butter Misunderstanding of November 3rd",
                story_body: "My younger cousin genuinely thought No Nut November meant banning almonds, cashews, and peanut butter sandwiches for 30 days. He proudly threw away three jars of crunchy Skippy to support the brotherhood. None of us had the heart to tell him until December 1st.",
                humor_tag: "Wholesome Fail",
                laugh_sparks: 215
            }
        ];
    }
}

function renderNnnCalendar() {
    ensureNnnStateDefaults();
    const grid = document.getElementById("nnnCalendarGrid");
    if (!grid) return;

    const pk = appState.profile?.profile_key || "default_monk";
    const dispName = appState.profile?.display_name || pk;
    const challengeYear = Number(document.getElementById("nnnMatrixYearSelect")?.value || 2026);
    const refTodayIso = getEffectiveMatrixReferenceTodayIso();

    if (!appState.nnnDailyByProfile[pk]) appState.nnnDailyByProfile[pk] = {};
    if (!appState.nnnDailyByProfile[pk][challengeYear]) appState.nnnDailyByProfile[pk][challengeYear] = {};
    const yearMap = appState.nnnDailyByProfile[pk][challengeYear];
    appState.nnnDailyMap = yearMap;

    grid.innerHTML = "";
    let survivedCount = 0;
    let lockedElapsedCount = 0;
    let editableCount = 0;

    for (let day = 1; day <= 30; day++) {
        const entry = yearMap[day];
        const status = entry ? entry.status : "unlogged";
        if (status === "survived" || status === "danger_zone") survivedCount++;

        const isElapsed = isNovemberDayElapsed(challengeYear, day);
        if (isElapsed) lockedElapsedCount++;
        else editableCount++;

        const cell = document.createElement("div");
        cell.className = `nnn-day-cell ${status !== "unlogged" ? status : ""} ${isElapsed ? "locked-elapsed" : "editable-day"}`;
        const icon = status === "survived" ? "🛡️" : status === "danger_zone" ? "🔥" : status === "fallen" ? "💀" : "⏳";
        const label = status === "survived" ? "Clean" : status === "danger_zone" ? "Urge Won" : status === "fallen" ? "Slip" : "Pending";
        const lockTag = isElapsed
            ? `<span class="inline-block text-[9px] px-1.5 py-0.5 rounded bg-black/55 text-white/75 font-bold mt-0.5">🔒 Read-Only</span>`
            : `<span class="inline-block text-[9px] px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-200 font-bold mt-0.5">✏️ Editable</span>`;

        cell.innerHTML = `
            <div class="text-[11px] font-bold opacity-85">Nov ${day}</div>
            <div class="text-lg my-0.5">${icon}</div>
            <div class="text-[10px] font-extrabold uppercase tracking-wider">${label}</div>
            ${lockTag}
        `;

        cell.addEventListener("click", async () => {
            if (isNovemberDayElapsed(challengeYear, day)) {
                showToast(`🔒 Nov ${day}, ${challengeYear} has already elapsed (Reference: ${getEffectiveMatrixReferenceTodayIso()}) and is in Read-Only Mode!`, "error");
                return;
            }

            const order = ["unlogged", "survived", "danger_zone", "fallen"];
            const nextStatus = order[(order.indexOf(status) + 1) % order.length];
            if (nextStatus === "unlogged") {
                delete yearMap[day];
                showToast(`Cleared Nov ${day}, ${challengeYear} for profile "${pk}".`, "info");
            } else {
                yearMap[day] = {
                    profile_key: pk,
                    challenge_year: challengeYear,
                    day_number: day,
                    status: nextStatus,
                    urge_level: nextStatus === "danger_zone" ? 7 : nextStatus === "fallen" ? 9 : 2
                };
                if (nextStatus === "survived") {
                    appState.profile.aura_points += 25;
                    showToast(`Nov ${day}, ${challengeYear} marked Clean Survived for "${pk}" (+25 Aura XP)!`, "success");
                } else if (nextStatus === "danger_zone") {
                    showToast(`Nov ${day}, ${challengeYear} marked High-Urge Survived for "${pk}".`, "info");
                } else if (nextStatus === "fallen") {
                    showToast(`Nov ${day}, ${challengeYear} marked Fallen for "${pk}". Year ${challengeYear} status is now Failed.`, "error");
                }
            }
            saveLocalState();
            renderNnnCalendar();
            renderNnnYearlyStatus();
            document.getElementById("headerAuraPoints").textContent = appState.profile.aura_points;

            await sendNeonAction("log_nnn_day", {
                profileKey: pk,
                challenge_year: challengeYear,
                day_number: day,
                status: nextStatus,
                urge_level: yearMap[day]?.urge_level || 2
            });
        });

        grid.appendChild(cell);
    }

    const metaEl = document.getElementById("nnnMatrixProfileMetaText");
    if (metaEl) {
        metaEl.innerHTML = `Profile: <strong class="text-yellow-300 font-mono">${pk}</strong> (${dispName}) • Year: <strong class="text-cyan-300">Nov ${challengeYear}</strong> • Reference Today: <code>${refTodayIso}</code>`;
    }
    const lockBadgeEl = document.getElementById("nnnMatrixLockSummaryBadge");
    if (lockBadgeEl) {
        lockBadgeEl.textContent = `🔒 ${lockedElapsedCount} Elapsed (Read-Only) • ✏️ ${editableCount} Current/Future (Editable)`;
    }

    const clearedEl = document.getElementById("nnnDaysClearedCount");
    if (clearedEl) clearedEl.textContent = `${survivedCount} / 30`;
}

/* ===== YEAR-WISE IMMUTABLE NNN CHALLENGE STATUS ENGINE (PER PROFILE) ===== */
function computeNnnYearStatus(profileKey, challengeYear) {
    ensureMultiProfileStructures();
    const yr = Number(challengeYear);
    const yearMap = appState.nnnDailyByProfile[profileKey]?.[yr] || {};
    const refTodayIso = getEffectiveMatrixReferenceTodayIso();

    let daysSurvived = 0;
    let daysFallen = 0;
    let firstFallenDay = null;

    for (let d = 1; d <= 30; d++) {
        const row = yearMap[d];
        if (!row) continue;
        if (row.status === "survived" || row.status === "danger_zone") {
            daysSurvived++;
        } else if (row.status === "fallen") {
            daysFallen++;
            if (firstFallenDay === null) firstFallenDay = d;
        }
    }

    // Strict 3-value immutable status rule: 'November Not Over Yet', 'Failed', 'Success'
    let status = "November Not Over Yet";
    let reason = "";

    if (daysFallen > 0) {
        status = "Failed";
        reason = `Profile "${profileKey}" logged a slip/failure on November ${firstFallenDay}, ${yr} (${daysFallen} fallen day${daysFallen > 1 ? "s" : ""}). Challenge status is permanently Failed.`;
    } else if (refTodayIso <= `${yr}-11-30`) {
        status = "November Not Over Yet";
        reason = `November ${yr} has not concluded yet (Reference date: ${refTodayIso}) and zero failures are logged (${daysSurvived}/30 days logged clean).`;
    } else if (daysSurvived > 0) {
        status = "Success";
        reason = `November ${yr} has concluded and profile "${profileKey}" survived with zero failures (${daysSurvived}/30 days logged clean).`;
    } else {
        status = "Failed";
        reason = `November ${yr} has concluded with 0 survived days logged for profile "${profileKey}".`;
    }

    return {
        profile_key: profileKey,
        challenge_year: yr,
        days_survived: daysSurvived,
        days_fallen: daysFallen,
        first_fallen_day: firstFallenDay,
        nnn_status: status,
        reason
    };
}

function renderNnnYearlyStatus() {
    ensureMultiProfileStructures();
    const pk = appState.profile?.profile_key || "default_monk";
    const dispName = appState.profile?.display_name || pk;
    const inspectYear = Number(document.getElementById("nnnStatusYearSelect")?.value || 2026);

    const singleEval = computeNnnYearStatus(pk, inspectYear);

    const profLbl = document.getElementById("nnnVerdictProfileLabel");
    const yrLbl = document.getElementById("nnnVerdictYearLabel");
    const headlineEl = document.getElementById("nnnVerdictHeadline");
    const reasonEl = document.getElementById("nnnVerdictReasonText");
    const badgeEl = document.getElementById("nnnVerdictStatusBadge");

    if (profLbl) profLbl.textContent = `${pk} (${dispName})`;
    if (yrLbl) yrLbl.textContent = String(inspectYear);
    if (headlineEl) {
        headlineEl.textContent = `NNN ${inspectYear} Verdict for ${pk}: ${singleEval.nnn_status}`;
    }
    if (reasonEl) {
        reasonEl.textContent = singleEval.reason;
    }
    if (badgeEl) {
        badgeEl.textContent = `🔒 ${singleEval.nnn_status}`;
        if (singleEval.nnn_status === "Success") {
            badgeEl.className = "px-4 py-2 rounded-xl font-black text-sm tracking-wide immutable-badge-success select-none";
        } else if (singleEval.nnn_status === "Failed") {
            badgeEl.className = "px-4 py-2 rounded-xl font-black text-sm tracking-wide immutable-badge-failed select-none";
        } else {
            badgeEl.className = "px-4 py-2 rounded-xl font-black text-sm tracking-wide immutable-badge-not-over select-none";
        }
    }

    const tbody = document.getElementById("nnnYearlyStatusTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    // YEAR RANGE CHANGES
    const yearsToList = [2031, 2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020];
    yearsToList.forEach((yr) => {
        const ev = computeNnnYearStatus(pk, yr);
        const tr = document.createElement("tr");
        tr.className = `hover:bg-white/5 transition ${yr === inspectYear ? "bg-yellow-400/10" : ""}`;

        const badgeClass =
            ev.nnn_status === "Success"
                ? "immutable-badge-success"
                : ev.nnn_status === "Failed"
                ? "immutable-badge-failed"
                : "immutable-badge-not-over";

        const slipText =
            ev.days_fallen > 0
                ? `<span class="text-red-300 font-bold">✕ Failed on Nov ${ev.first_fallen_day}, ${yr}</span>`
                : `<span class="text-emerald-300 font-semibold">✓ Zero Slips Logged</span>`;

        tr.innerHTML = `
            <td class="py-3 px-4 font-extrabold text-white">November ${yr}</td>
            <td class="py-3 px-4 font-mono text-yellow-300">${pk}</td>
            <td class="py-3 px-4 text-white/85"><strong>${ev.days_survived}</strong> / 30 Days</td>
            <td class="py-3 px-4">${slipText}</td>
            <td class="py-3 px-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold ${badgeClass} select-none" title="Read-Only & Immutable Status">
                    🔒 ${ev.nnn_status}
                </span>
            </td>
            <td class="py-3 px-4 text-right">
                <button type="button" class="btn-secondary text-[11px] py-1 px-2.5 inspect-year-matrix-btn" data-year="${yr}">
                    View ${yr} Matrix
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".inspect-year-matrix-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const yr = btn.getAttribute("data-year");
            const matYrSel = document.getElementById("nnnMatrixYearSelect");
            const statYrSel = document.getElementById("nnnStatusYearSelect");
            if (matYrSel) matYrSel.value = yr;
            if (statYrSel) statYrSel.value = yr;
            renderNnnCalendar();
            renderNnnYearlyStatus();
            document.getElementById("nnnCalendarGrid")?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
}

/* ===== PROFILE-SCOPED SELF-TOUCHING & SEXUAL ACTIVITY RECORDS CALENDAR ENGINE ===== */
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function renderSelfTouchingCalendar() {
    ensureMultiProfileStructures();
    const grid = document.getElementById("stMonthCalendarGrid");
    if (!grid) return;

    const pk = appState.profile?.profile_key || "default_monk";
    const dispName = appState.profile?.display_name || pk;
    const profileRecords = appState.selfTouchingByProfile[pk] || {};

    const monthSel = document.getElementById("stMonthSelect");
    const yearSel = document.getElementById("stYearSelect");
    const calMonth = Number(monthSel ? monthSel.value : 9); // 0-indexed (9 = October)
    const calYear = Number(yearSel ? yearSel.value : 2026);

    const startFilter = document.getElementById("stStartDateFilter")?.value || "";
    const endFilter = document.getElementById("stEndDateFilter")?.value || "";
    const statusFilter = document.getElementById("stStatusFilterSelect")?.value || "ALL";
    const todayIso = getLocalTodayIso();

    const headingEl = document.getElementById("stCalendarMonthHeading");
    if (headingEl) {
        headingEl.textContent = `${MONTH_NAMES[calMonth]} ${calYear} — ${pk} (${dispName})`;
    }

    const subEl = document.getElementById("stProfileSummarySubtext");
    if (subEl) {
        subEl.innerHTML = `Showing <code>sc_self_touching_records</code> for <strong class="text-yellow-300">${pk}</strong> • Today: <code>${todayIso}</code>`;
    }

    // Compute KPIs for this profile
    const allDates = Object.keys(profileRecords).sort();
    let cleanCount = 0;
    let elapsedLockedCount = 0;
    let futureEditableCount = 0;

    allDates.forEach((dIso) => {
        const rec = profileRecords[dIso];
        if (!rec) return;
        if (rec.activity_status === "No Sexual Activity") cleanCount++;
        if (dIso < todayIso) elapsedLockedCount++;
        else futureEditableCount++;
    });

    const totalEl = document.getElementById("stStatTotalLogged");
    const cleanEl = document.getElementById("stStatCleanDays");
    const lockedEl = document.getElementById("stStatElapsedLocked");
    const editEl = document.getElementById("stStatFutureEditable");
    if (totalEl) totalEl.textContent = String(allDates.length);
    if (cleanEl) cleanEl.textContent = String(cleanCount);
    if (lockedEl) lockedEl.textContent = String(elapsedLockedCount);
    if (editEl) editEl.textContent = String(futureEditableCount);

    // Filter banner description
    const bannerEl = document.getElementById("stActiveFilterBanner");
    if (bannerEl) {
        const parts = [];
        if (startFilter || endFilter) {
            parts.push(`Date Range: ${startFilter || "Any"} to ${endFilter || "Any"}`);
        }
        if (statusFilter !== "ALL") {
            parts.push(`Status Filter: "${statusFilter}"`);
        }
        bannerEl.textContent =
            parts.length > 0
                ? `Active Filters → ${parts.join(" • ")} (Non-matching calendar dates are dimmed)`
                : `Showing full month view for ${MONTH_NAMES[calMonth]} ${calYear} • Elapsed dates (< ${todayIso}) are immutable; today & future dates are editable.`;
    }

    // Build Month Grid
    grid.innerHTML = "";
    const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

    for (let blank = 0; blank < firstDayOfWeek; blank++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "hidden md:block rounded-xl bg-white/[0.02] border border-white/5 min-h-[118px]";
        grid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateIso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const rec = profileRecords[dateIso] || null;
        const status = rec ? rec.activity_status : "";
        const meta = status ? SELF_TOUCHING_STATUS_META[status] : null;
        const isElapsed = dateIso < todayIso;
        const isToday = dateIso === todayIso;

        // Evaluate date-range & status filters
        let matchesFilter = true;
        if (startFilter && dateIso < startFilter) matchesFilter = false;
        if (endFilter && dateIso > endFilter) matchesFilter = false;
        if (statusFilter === "LOGGED_ONLY" && !status) matchesFilter = false;
        else if (statusFilter !== "ALL" && statusFilter !== "LOGGED_ONLY" && status !== statusFilter) {
            matchesFilter = false;
        }

        const hasActiveFilter = Boolean(startFilter || endFilter || statusFilter !== "ALL");
        const filterClass = hasActiveFilter
            ? matchesFilter
                ? "filter-highlighted"
                : "filter-dimmed"
            : "";

        const cell = document.createElement("div");
        cell.className = `st-cal-cell ${isElapsed ? "locked-elapsed" : "editable-future"} ${meta ? meta.cellClass : ""} ${filterClass}`;

        const topLockBadge = isElapsed
            ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-semibold" title="Elapsed date is immutable">🔒 Immutable</span>`
            : `<span class="text-[10px] px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-bold" title="Click to change status">✏️ Editable</span>`;

        const statusContent = status
            ? `<div class="mt-2 p-1.5 rounded-lg border text-[11px] font-bold leading-tight ${meta?.badgeClass || "bg-white/10 text-white"}">
                   <span>${meta?.icon || "•"}</span> <span>${status}</span>
               </div>
               ${rec?.notes ? `<div class="text-[10px] text-white/65 mt-1 truncate" title="${rec.notes}">${rec.notes}</div>` : ""}`
            : `<div class="mt-2 text-[11px] text-white/40 italic">${isElapsed ? "No record (Elapsed)" : "+ Click to set status"}</div>`;

        cell.innerHTML = `
            <div class="flex items-center justify-between gap-1">
                <span class="text-xs font-extrabold ${isToday ? "px-2 py-0.5 rounded-full bg-yellow-400 text-purple-950" : "text-white"}">
                    ${MONTH_NAMES[calMonth].slice(0, 3)} ${day}${isToday ? " (Today)" : ""}
                </span>
                ${topLockBadge}
            </div>
            <div class="my-1">${statusContent}</div>
            <div class="text-[9px] text-white/45 font-mono">${dateIso}</div>
        `;

        cell.addEventListener("click", () => {
            if (dateIso < getLocalTodayIso()) {
                showToast(`🔒 Date ${dateIso} has already elapsed and is permanently immutable! Only current or future dates can be changed.`, "error");
                return;
            }
            openSelfTouchingModal(dateIso);
        });

        grid.appendChild(cell);
    }

    // Render Filtered Self-Touching Records Table below the calendar
    renderFilteredSelfTouchingTable(pk, profileRecords, startFilter, endFilter, statusFilter, todayIso);
}

function renderFilteredSelfTouchingTable(pk, profileRecords, startFilter, endFilter, statusFilter, todayIso) {
    const tbody = document.getElementById("stFilteredRecordsTableBody");
    const countBadge = document.getElementById("stFilteredCountBadge");
    if (!tbody) return;

    tbody.innerHTML = "";

    // Gather all logged dates for this profile, plus if a date range filter is set, include dates in range
    const dateSet = new Set(Object.keys(profileRecords));
    if (startFilter && endFilter && startFilter <= endFilter) {
        let cur = new Date(startFilter + "T00:00:00");
        const end = new Date(endFilter + "T00:00:00");
        let safety = 0;
        while (cur <= end && safety < 120) {
            const iso = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
            dateSet.add(iso);
            cur.setDate(cur.getDate() + 1);
            safety++;
        }
    }

    const sortedDates = Array.from(dateSet).sort().reverse();
    const matchingRows = [];

    sortedDates.forEach((dIso) => {
        const rec = profileRecords[dIso] || null;
        const st = rec ? rec.activity_status : "";
        if (startFilter && dIso < startFilter) return;
        if (endFilter && dIso > endFilter) return;
        if (statusFilter === "LOGGED_ONLY" && !st) return;
        if (statusFilter !== "ALL" && statusFilter !== "LOGGED_ONLY" && st !== statusFilter) return;
        if (!startFilter && !endFilter && statusFilter === "ALL" && !st) return;
        matchingRows.push({ dateIso: dIso, rec });
    });

    if (countBadge) {
        countBadge.textContent = `${matchingRows.length} Matching Date${matchingRows.length === 1 ? "" : "s"}`;
    }

    if (matchingRows.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="py-6 px-4 text-center text-xs text-white/60">
                    No records match the current filters for profile <strong class="text-yellow-300">${pk}</strong>. Adjust the date range or status filter, or click any current/future date on the calendar above to log a status.
                </td>
            </tr>
        `;
        return;
    }

    matchingRows.forEach(({ dateIso, rec }) => {
        const isElapsed = dateIso < todayIso;
        const st = rec ? rec.activity_status : "Unlogged";
        const meta = SELF_TOUCHING_STATUS_META[st] || null;
        const tr = document.createElement("tr");
        tr.className = "hover:bg-white/5 transition";

        const statusBadge = meta
            ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold ${meta.badgeClass}">
                   <span>${meta.icon}</span> <span>${st}</span>
               </span>`
            : `<span class="text-xs text-white/45 italic">Unlogged</span>`;

        const lockBadge = isElapsed
            ? `<span class="px-2.5 py-1 rounded-lg bg-white/10 text-white/75 text-xs font-semibold">🔒 Elapsed • Immutable</span>`
            : `<span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">✏️ Current/Future • Editable</span>`;

        const actionCell = isElapsed
            ? `<span class="text-[11px] text-white/45 select-none">🔒 Locked</span>`
            : `<button type="button" class="btn-secondary text-xs py-1 px-3 st-table-edit-btn" data-date="${dateIso}">✏️ Change Status</button>`;

        tr.innerHTML = `
            <td class="py-3 px-4 font-mono font-bold text-white">${dateIso}</td>
            <td class="py-3 px-4 font-mono text-yellow-300">${pk}</td>
            <td class="py-3 px-4">${statusBadge}</td>
            <td class="py-3 px-4">${lockBadge}</td>
            <td class="py-3 px-4 text-white/75 text-xs">${rec?.notes || "—"}</td>
            <td class="py-3 px-4 text-right">${actionCell}</td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".st-table-edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const dIso = btn.getAttribute("data-date");
            openSelfTouchingModal(dIso);
        });
    });
}

function openSelfTouchingModal(dateIso) {
    const todayIso = getLocalTodayIso();
    if (dateIso < todayIso) {
        showToast(`🔒 Date ${dateIso} has already elapsed and is immutable!`, "error");
        return;
    }

    const pk = appState.profile?.profile_key || "default_monk";
    const existing = appState.selfTouchingByProfile[pk]?.[dateIso] || null;

    const modal = document.getElementById("selfTouchingModal");
    if (!modal) return;

    document.getElementById("stModalDateInput").value = dateIso;
    document.getElementById("stModalTitleDate").textContent = `Set Activity Status for ${dateIso}`;
    document.getElementById("stModalProfileLabel").textContent = `${pk} (${appState.profile?.display_name || pk})`;
    document.getElementById("stModalStatusSelect").value = existing?.activity_status || "No Sexual Activity";
    document.getElementById("stModalNotesInput").value = existing?.notes || "";

    modal.classList.remove("hidden");
}

function updateUrgeThermometerUI(val) {
    const v = Number(val);
    const scoreEl = document.getElementById("nnnUrgeScoreLabel");
    const markEl = document.getElementById("nnnUrgeIndicatorMark");
    const badgeEl = document.getElementById("nnnDefconBadge");
    const rxEl = document.getElementById("nnnUrgePrescriptionText");
    if (!scoreEl) return;

    scoreEl.textContent = `${v} / 10`;
    markEl.style.width = `${v * 10}%`;

    if (v <= 3) {
        badgeEl.textContent = "DEFCON 5 • SOVEREIGN CALM";
        badgeEl.className = "text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40";
        rxEl.textContent = "Prefrontal cortex is in full command. Channel your calm baseline into a 90-minute deep work block, strength training, or reading.";
    } else if (v <= 6) {
        badgeEl.textContent = "DEFCON 3 • ELEVATED VOLTAGE";
        badgeEl.className = "text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/25 text-amber-300 border border-amber-400/40";
        rxEl.textContent = "Sympathetic arousal detected. Close all social media tabs now, drink a tall glass of water, and perform 3 minutes of 4-7-8 Vagal Brake breathwork.";
    } else {
        badgeEl.textContent = "DEFCON 1 • RED ALERT OVERRIDE";
        badgeEl.className = "text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-red-500/30 text-red-300 border border-red-400/50 animate-pulse";
        rxEl.textContent = "EMERGENCY PROTOCOL: Stand up from your chair/bed immediately! Leave your phone in another room, splash cold water on your face, and do 30 pushups until the 90-second wave passes.";
    }
}

/* ===== 3. LIVE NNN REDDIT & COMMUNITY SCRAPER (KEYLESS MULTI-ENGINE) ===== */
async function scrapeLiveNnnSubreddit() {
    const sub = document.getElementById("nnnSubredditSelect")?.value || "nonutnovember";
    const grid = document.getElementById("nnnRedditCardsGrid");
    const statusEl = document.getElementById("nnnRedditLastScraped");
    const badgeEl = document.getElementById("nnnRedditEngineBadge");
    if (!grid) return;

    grid.innerHTML = `<div class="col-span-full p-4 rounded-xl bg-white/5 text-xs text-yellow-300 animate-pulse">Fetching live community dispatches from ${sub}...</div>`;

    const keys = getSavedApiKeys();
    let posts = [];
    let engineUsed = "Keyless Live Feed";

    // Engine 1: Hacker News Algolia Live API (100% Keyless, instant CORS JSON)
    if (sub.startsWith("hn:")) {
        try {
            const topic = sub.split(":")[1] || "dopamine";
            const hnRes = await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(topic + " discipline focus habit")}&tags=story&hitsPerPage=8`);
            if (hnRes.ok) {
                const hnData = await hnRes.json();
                posts = (hnData.hits || []).map((h) => ({
                    subreddit: "HackerNews Live",
                    title: h.title,
                    selftext: h.story_text ? h.story_text.replace(/<[^>]+>/g, "").slice(0, 220) : `Live Hacker News discussion on ${topic}, neurobiology, and high-output focus.`,
                    author: `u/${h.author || "hn_builder"}`,
                    upvotes: h.points || 145,
                    comments: h.num_comments || 42,
                    flair: "HN Algolia API (Keyless)",
                    url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`
                }));
                engineUsed = "Hacker News Algolia Live API (100% Keyless)";
            }
        } catch (e) {
            console.warn("HN Algolia warning:", e);
        }
    }

    // Engine 2: Browser-Direct Reddit Public JSON API (Zero API Key Needed; uses residential browser IP)
    if (posts.length === 0 && !sub.startsWith("hn:") && !keys.redditClientId) {
        try {
            const directRes = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=10&raw_json=1`);
            if (directRes.ok) {
                const rJson = await directRes.json();
                posts = ((rJson.data && rJson.data.children) || [])
                    .filter((c) => c.data && !c.data.stickied)
                    .slice(0, 8)
                    .map((c) => ({
                        subreddit: `r/${sub}`,
                        title: c.data.title,
                        selftext: (c.data.selftext || "").slice(0, 220),
                        author: `u/${c.data.author}`,
                        upvotes: c.data.ups,
                        comments: c.data.num_comments,
                        flair: c.data.link_flair_text || "Reddit Public JSON",
                        url: `https://www.reddit.com${c.data.permalink}`
                    }));
                if (posts.length > 0) {
                    engineUsed = "Reddit Public JSON API (100% Keyless)";
                }
            }
        } catch (e) {
            // Proceed to Engine 3
        }
    }

    // Engine 3: Netlify Serverless Aggregator (Handles OAuth2 if keys exist OR server-side PullPush/Reddit)
    if (posts.length === 0) {
        try {
            const qs = new URLSearchParams({
                subreddit: sub,
                redditClientId: keys.redditClientId || "",
                redditClientSecret: keys.redditClientSecret || ""
            });
            const fnRes = await fetch(`${window.location.origin}/.netlify/functions/public-feed?${qs.toString()}`);
            if (fnRes.ok) {
                const data = await fnRes.json();
                if (Array.isArray(data.nnnRedditFeed) && data.nnnRedditFeed.length > 0) {
                    posts = data.nnnRedditFeed;
                    engineUsed = data.redditSourceUsed || "Netlify Multi-API Aggregator";
                }
            }
        } catch (e) {
            // Proceed to Engine 4
        }
    }

    // Engine 4: Browser-Direct PullPush.io Keyless Reddit Archive API (No API Key, CORS-Enabled)
    if (posts.length === 0 && !sub.startsWith("hn:")) {
        try {
            const ppRes = await fetch(`https://api.pullpush.io/reddit/search/submission/?subreddit=${encodeURIComponent(sub)}&size=8&sort=desc`);
            if (ppRes.ok) {
                const ppData = await ppRes.json();
                posts = (ppData.data || []).slice(0, 8).map((post) => ({
                    subreddit: `r/${post.subreddit || sub}`,
                    title: post.title,
                    selftext: (post.selftext || "").slice(0, 220),
                    author: `u/${post.author || "spartan"}`,
                    upvotes: post.score || 110,
                    comments: post.num_comments || 24,
                    flair: post.link_flair_text || "PullPush.io API (Keyless)",
                    url: post.full_link || `https://www.reddit.com/r/${sub}/comments/${post.id}/`
                }));
                if (posts.length > 0) {
                    engineUsed = "PullPush.io Reddit Mirror API (100% Keyless)";
                }
            }
        } catch (err) {
            // Proceed to offline fallback
        }
    }

    if (posts.length === 0) {
        engineUsed = "Offline War-Room Archive (Fallback)";
        posts = [
            {
                subreddit: `r/${sub}`,
                title: "Official NNN Roll Call — Still In! Report Your Current Day & Energy Level",
                selftext: "Hold the line Spartans. Remember that urges only last 90 seconds if you refuse to feed them with peeking or fantasizing.",
                author: "u/AutoModerator_NNN",
                upvotes: 1840,
                comments: 612,
                flair: "Official Roll Call",
                url: `https://www.reddit.com/r/${sub}/`
            },
            {
                subreddit: `r/${sub}`,
                title: "Day 15 Check-In: My focus at work and gym recovery have legitimately doubled",
                selftext: "The first 7 days were tough because of late-night scrolling habits, but after putting a strict 10 PM phone curfew in place, my morning energy is unreal.",
                author: "u/IronMonk_2026",
                upvotes: 924,
                comments: 148,
                flair: "Success Story",
                url: `https://www.reddit.com/r/${sub}/`
            },
            {
                subreddit: `r/${sub}`,
                title: "PSA: Edging or 'just peeking' is a trap—it floods your DeltaFosB pathways and makes NNN 10x harder",
                selftext: "Mental celibacy is the real secret. Guard your eyes and your thoughts, and the physical streak takes care of itself.",
                author: "u/NeuroSpartan",
                upvotes: 765,
                comments: 93,
                flair: "Tactical Advice",
                url: `https://www.reddit.com/r/${sub}/`
            },
            {
                subreddit: `r/${sub}`,
                title: "Day 21 Superpower Report: Just finished 4 hours of calculus and heavy deadlifts with zero caffeine",
                selftext: "Transmuting the surplus androgen and dopamine baseline into real-world goals is the ultimate cheat code.",
                author: "u/SolarAscendant",
                upvotes: 610,
                comments: 79,
                flair: "Transmutation",
                url: `https://www.reddit.com/r/${sub}/`
            }
        ];
    }

    grid.innerHTML = "";
    posts.forEach((p) => {
        const card = document.createElement("div");
        card.className = "p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-yellow-400/45 transition flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between text-[11px] mb-1.5">
                    <span class="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">${p.subreddit} • ${p.flair}</span>
                    <span class="text-white/60">${p.author}</span>
                </div>
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="text-sm font-extrabold text-white hover:text-yellow-300 transition block mb-1.5">
                    ${p.title}
                </a>
                ${p.selftext ? `<p class="text-xs text-white/70 leading-relaxed mb-3">${p.selftext}...</p>` : ""}
            </div>
            <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-yellow-300 font-bold">
                <span>⬆️ ${p.upvotes} Upvotes</span>
                <span>💬 ${p.comments} Comments</span>
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="underline text-cyan-300">Open Thread &rarr;</a>
            </div>
        `;
        grid.appendChild(card);
    });

    if (badgeEl) badgeEl.innerHTML = `🔗 Active Engine: <strong>${engineUsed}</strong>`;
    if (statusEl) statusEl.textContent = `Fetched ${posts.length} live threads at ${new Date().toLocaleTimeString()}`;
}

/* ===== 4. TOP 50 NNN YOUTUBE VIDEO CINEMA (LIVE API + CURATED 50) ===== */
let activeYoutubeVideos = [...TOP_50_NNN_VIDEOS];

async function queryLiveYoutubeVideos() {
    const query = (document.getElementById("nnnYoutubeSearchInput")?.value || "").trim() || "No Nut November Semen Retention Science";
    const keys = getSavedApiKeys();
    const ytKey = keys.youtubeApiKey || "";

    if (ytKey) {
        try {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(query)}&type=video&key=${encodeURIComponent(ytKey)}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data.items) && data.items.length > 0) {
                    activeYoutubeVideos = data.items
                        .filter((it) => it.id && it.id.videoId)
                        .map((it, idx) => ({
                            rank: idx + 1,
                            videoId: it.id.videoId,
                            title: it.snippet.title,
                            channel: it.snippet.channelTitle,
                            category: "Live YouTube API",
                            duration: "Live API"
                        }));
                    renderNnnYoutubeGrid();
                    showToast(`Loaded ${activeYoutubeVideos.length} live videos from YouTube Data API v3!`, "success");
                    return;
                }
            }
        } catch (e) {
            console.warn("Direct YouTube API call warning:", e);
        }
    }

    // Filter the 50 built-in videos by search term & category
    renderNnnYoutubeGrid();
    if (!ytKey) {
        showToast("Filtered Top 50 NNN Video Index (Add YOUTUBE_API_KEY in the API Vault tab for live YouTube v3 search).", "info");
    }
}

function renderNnnYoutubeGrid() {
    const grid = document.getElementById("nnnYoutubeGrid");
    if (!grid) return;
    const searchVal = (document.getElementById("nnnYoutubeSearchInput")?.value || "").toLowerCase().trim();
    const catVal = document.getElementById("nnnYoutubeCategorySelect")?.value || "ALL";

    const filtered = activeYoutubeVideos.filter((v) => {
        const matchCat = catVal === "ALL" || v.category === catVal || v.category === "Live YouTube API";
        const matchSearch = !searchVal || v.title.toLowerCase().includes(searchVal) || v.channel.toLowerCase().includes(searchVal);
        return matchCat && matchSearch;
    });

    grid.innerHTML = "";
    filtered.forEach((vid) => {
        const card = document.createElement("div");
        card.className = "p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-yellow-400/50 transition flex flex-col justify-between cursor-pointer";
        const thumbUrl = `https://i.ytimg.com/vi/${vid.videoId}/hqdefault.jpg`;
        card.innerHTML = `
            <div>
                <div class="relative rounded-xl overflow-hidden mb-2.5 bg-purple-950/50 h-36 flex items-center justify-center border border-white/10">
                    <img src="${thumbUrl}" alt="${vid.title}" class="w-full h-full object-cover opacity-85" onerror="this.style.display='none'">
                    <div class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-yellow-300 text-[10px] font-black">#${vid.rank}</div>
                    <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-semibold">${vid.duration || "HD"}</div>
                    <div class="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center font-bold shadow-lg">▶</div>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-300">${vid.category} • ${vid.channel}</span>
                <h4 class="text-xs sm:text-sm font-bold text-white mt-0.5 line-clamp-2">${vid.title}</h4>
            </div>
            <div class="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <button type="button" class="play-inline-btn text-yellow-300 font-bold hover:underline">▶️ Watch in Cinema</button>
                <a href="https://www.youtube.com/watch?v=${vid.videoId}" target="_blank" rel="noopener noreferrer" class="text-white/65 hover:text-white" onclick="event.stopPropagation()">YouTube ↗</a>
            </div>
        `;
        card.addEventListener("click", () => {
            const iframe = document.getElementById("nnnYoutubeIframe");
            const titleEl = document.getElementById("nnnActiveVideoTitle");
            const extLink = document.getElementById("nnnActiveVideoExternalLink");
            if (iframe) iframe.src = `https://www.youtube-nocookie.com/embed/${vid.videoId}?autoplay=1`;
            if (titleEl) titleEl.textContent = `#${vid.rank}: ${vid.title} (${vid.channel})`;
            if (extLink) extLink.href = `https://www.youtube.com/watch?v=${vid.videoId}`;
            document.getElementById("nnnYoutubePlayerContainer")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        grid.appendChild(card);
    });
}

/* ===== 5. NNN FUNNY STORIES, HISTORY TIMELINE & VISUAL GALLERY ===== */
function renderNnnStories() {
    ensureNnnStateDefaults();
    const grid = document.getElementById("nnnStoriesGrid");
    if (!grid) return;
    grid.innerHTML = "";
    (appState.nnnStories || []).forEach((st) => {
        const card = document.createElement("div");
        card.className = "p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3";
        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between text-xs mb-1.5">
                    <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">${st.humor_tag}</span>
                    <span class="text-yellow-300 font-semibold">${st.day_tag}</span>
                </div>
                <h4 class="text-base font-extrabold text-white mb-1.5">${st.title}</h4>
                <p class="text-xs text-white/80 leading-relaxed">${st.story_body}</p>
            </div>
            <div class="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                <span class="text-white/60">By <strong class="text-white">${st.author_handle}</strong></span>
                <button type="button" class="laugh-spark-btn px-3 py-1 rounded-lg bg-white/10 hover:bg-yellow-400/25 text-yellow-300 font-bold">
                    😂 Laugh Salute (${st.laugh_sparks || 1})
                </button>
            </div>
        `;
        card.querySelector(".laugh-spark-btn").addEventListener("click", async () => {
            st.laugh_sparks = (st.laugh_sparks || 1) + 1;
            saveLocalState();
            renderNnnStories();
            await sendNeonAction("spark_nnn_story", { id: st.id });
        });
        grid.appendChild(card);
    });
}

function renderNnnHistoryTimeline() {
    const container = document.getElementById("nnnHistoryTimelineContainer");
    if (!container) return;
    container.innerHTML = "";
    NNN_HISTORY_TIMELINE.forEach((item) => {
        const div = document.createElement("div");
        div.className = "p-3.5 rounded-xl bg-black/40 border-l-4 border-yellow-400 space-y-1";
        div.innerHTML = `
            <div class="text-xs font-extrabold uppercase tracking-wider text-yellow-300">${item.era}</div>
            <h4 class="text-sm font-bold text-white">${item.title}</h4>
            <p class="text-xs text-white/75 leading-relaxed">${item.desc}</p>
        `;
        container.appendChild(div);
    });
}

async function renderNnnVisualGallery(fetchLive = false, silent = false) {
    const grid = document.getElementById("nnnVisualGalleryGrid");
    const providerBadgeEl = document.getElementById("nnnGalleryActiveProviderText");
    if (!grid) return;

    let items = [...BUILTIN_NNN_GALLERY];
    const keys = getSavedApiKeys();
    const provider = document.getElementById("nnnGalleryProviderSelect")?.value || "AUTO";
    const query = (document.getElementById("nnnGalleryQueryInput")?.value || "spartan warrior statue stoic").trim();
    let liveHits = [];
    let activeProviderLabel = "Art Institute of Chicago + Pollinations Live AI + Wikimedia (100% Keyless)";

    if (fetchLive) {
        // 1. Optional Pexels Official API (if user entered a key)
        if ((provider === "AUTO" || provider === "PEXELS") && keys.pexelsApiKey && liveHits.length === 0) {
            try {
                const pexRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6`, {
                    headers: { "Authorization": keys.pexelsApiKey }
                });
                if (pexRes.ok) {
                    const pexData = await pexRes.json();
                    liveHits = (pexData.photos || []).map((p) => ({
                        id: `pexels-${p.id}`,
                        title: p.alt || `Pexels Stoic Study #${p.id}`,
                        imageUrl: (p.src && (p.src.large || p.src.medium)) || "",
                        badge: "Pexels Live API",
                        desc: `Photographed by ${p.photographer} via Pexels REST API.`
                    })).filter((x) => x.imageUrl);
                    if (liveHits.length > 0) activeProviderLabel = "Pexels Official API (Authenticated)";
                }
            } catch (e) {
                console.warn("Pexels fetch warning:", e);
            }
        }

        // 2. Optional Unsplash Official API (if user entered a key)
        if ((provider === "AUTO" || provider === "UNSPLASH") && keys.unsplashAccessKey && liveHits.length === 0) {
            try {
                const unsRes = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&client_id=${encodeURIComponent(keys.unsplashAccessKey)}`);
                if (unsRes.ok) {
                    const unsData = await unsRes.json();
                    liveHits = (unsData.results || []).map((u) => ({
                        id: `unsplash-${u.id}`,
                        title: u.description || u.alt_description || "Unsplash Stoic & Mountain Visual",
                        imageUrl: (u.urls && (u.urls.regular || u.urls.small)) || "",
                        badge: `Unsplash API (❤️ ${u.likes || 0})`,
                        desc: `Captured by ${(u.user && u.user.name) || "Unsplash Creator"} via Unsplash Official API.`
                    })).filter((x) => x.imageUrl);
                    if (liveHits.length > 0) activeProviderLabel = "Unsplash Official API (Authenticated)";
                }
            } catch (e) {
                console.warn("Unsplash fetch warning:", e);
            }
        }

        // 3. Optional Pixabay API (if user entered a key)
        if ((provider === "AUTO" || provider === "PIXABAY") && keys.pixabayApiKey && liveHits.length === 0) {
            try {
                const pxRes = await fetch(`https://pixabay.com/api/?key=${encodeURIComponent(keys.pixabayApiKey)}&q=${encodeURIComponent(query)}&image_type=illustration&per_page=6`);
                if (pxRes.ok) {
                    const pxData = await pxRes.json();
                    liveHits = (pxData.hits || []).map((h) => ({
                        id: `px-${h.id}`,
                        title: `Live Pixabay Art: ${h.tags}`,
                        imageUrl: h.webformatURL,
                        badge: `Pixabay API (❤️ ${h.likes})`,
                        desc: `Contributed by ${h.user} via live Pixabay REST endpoint.`
                    }));
                    if (liveHits.length > 0) activeProviderLabel = "Pixabay API (Authenticated)";
                }
            } catch (e) {
                console.warn("Pixabay gallery fetch warning:", e);
            }
        }

        // 4. Pollinations.ai Live Keyless AI Mural Generator (100% Keyless — Generates Bespoke Stoic Murals on the Fly!)
        if (provider === "POLLINATIONS" && liveHits.length === 0) {
            const prompts = [
                `${query}, epic golden spartan stoic marble sculpture, dark royal purple cosmic background, masterpiece`,
                `${query}, ancient philosopher transmutation aura, golden solar core energy, cinematic lighting`,
                `${query}, invincible iron fortress citadel on mountain peak, golden sunrise, stoic discipline`,
                `${query}, classical greek bronze warrior statue, olympian lightning and cosmic nebula, high detail`
            ];
            liveHits = prompts.map((p, idx) => ({
                id: `pollinations-${Date.now()}-${idx}`,
                title: `AI Generated Mural #${idx + 1}: ${query.toUpperCase()}`,
                imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(p)}?width=800&height=520&nologo=true&seed=${idx + 101}`,
                badge: "Pollinations AI (100% Keyless)",
                desc: `Synthesized live on demand by Pollinations.ai Open AI Image Engine for prompt "${query}" (Zero API Key required).`
            }));
            activeProviderLabel = "Pollinations.ai Live AI Mural Generator (100% Keyless)";
        }

        // 5. NASA Cosmic & Solar Core API (100% Keyless + Pre-filled DEMO_KEY!)
        if (provider === "NASA" && liveHits.length === 0) {
            try {
                const nasaQuery = query.includes("spartan") ? "solar corona nebula supernova cosmos" : query;
                const nasaRes = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(nasaQuery)}&media_type=image&page_size=6`);
                if (nasaRes.ok) {
                    const nasaData = await nasaRes.json();
                    const collectionItems = (nasaData.collection && nasaData.collection.items) || [];
                    liveHits = collectionItems
                        .filter((it) => it.links && it.links[0] && it.links[0].href && it.data && it.data[0])
                        .slice(0, 6)
                        .map((it) => ({
                            id: `nasa-${it.data[0].nasa_id}`,
                            title: it.data[0].title || "NASA Cosmic Singularity Archive",
                            imageUrl: it.links[0].href,
                            badge: `NASA Open API (${keys.nasaApiKey || "DEMO_KEY"})`,
                            desc: (it.data[0].description || "Live NASA astrophysics & solar core telemetry image.").slice(0, 180) + "..."
                        }));
                    if (liveHits.length > 0) activeProviderLabel = `NASA Cosmic & Solar Image API (${keys.nasaApiKey || "DEMO_KEY"} Active)`;
                }
            } catch (e) {
                console.warn("NASA API warning:", e);
            }
        }

        // 6. Wikimedia Commons Live MediaWiki API (100% Keyless!)
        if (provider === "WIKIMEDIA" && liveHits.length === 0) {
            try {
                const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=filetype:bitmap+${encodeURIComponent(query)}&gsrlimit=6&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&origin=*`;
                const wikiRes = await fetch(wikiUrl);
                if (wikiRes.ok) {
                    const wikiData = await wikiRes.json();
                    const pages = (wikiData.query && wikiData.query.pages) ? Object.values(wikiData.query.pages) : [];
                    liveHits = pages
                        .filter((pg) => pg.imageinfo && pg.imageinfo[0] && (pg.imageinfo[0].thumburl || pg.imageinfo[0].url))
                        .map((pg) => ({
                            id: `wiki-${pg.pageid}`,
                            title: (pg.title || "Classical Sculpture").replace(/^File:/i, "").replace(/\.[a-z]+$/i, ""),
                            imageUrl: pg.imageinfo[0].thumburl || pg.imageinfo[0].url,
                            badge: "Wikimedia Live API (Keyless)",
                            desc: "Fetched live from Wikimedia Commons public-domain classical art repository (Zero API Key)."
                        }));
                    if (liveHits.length > 0) activeProviderLabel = "Wikimedia Commons Live REST API (100% Keyless)";
                }
            } catch (e) {
                console.warn("Wikimedia API warning:", e);
            }
        }

        // 7. Art Institute of Chicago Open Access REST API (100% Keyless Default — Zero Signup or Rate-Limit Issues!)
        if (liveHits.length === 0) {
            try {
                const articUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,image_id,artist_title,date_display,medium_display&limit=5`;
                const articRes = await fetch(articUrl);
                if (articRes.ok) {
                    const articData = await articRes.json();
                    liveHits = (articData.data || [])
                        .filter((art) => art.image_id)
                        .map((art) => ({
                            id: `artic-${art.id}`,
                            title: `${art.title} (${art.date_display || "Classical Era"})`,
                            imageUrl: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
                            badge: "Art Institute API (Keyless)",
                            desc: `${art.artist_title || "Classical Sculptor"} — ${art.medium_display || "Museum Archive"}. Fetched live via Art Institute of Chicago Open REST API.`
                        }));
                }
            } catch (e) {
                console.warn("Art Institute API warning:", e);
            }

            // Also append 1 live custom AI Stoic Mural from Pollinations.ai in AUTO mode so every search has custom AI art too!
            const aiPrompt = `${query}, stoic spartan warrior golden marble statue, royal purple cosmic aura, masterpiece`;
            liveHits.unshift({
                id: `pollinations-auto-${Date.now()}`,
                title: `Live AI Stoic Mural: ${query}`,
                imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(aiPrompt)}?width=800&height=520&nologo=true&seed=77`,
                badge: "Pollinations AI (Keyless)",
                desc: `Custom AI warrior mural generated live for "${query}" via Pollinations.ai Keyless API.`
            });
            activeProviderLabel = "Art Institute of Chicago Open API + Pollinations Live AI (100% Keyless)";
        }

        if (liveHits.length > 0) {
            items = [...items, ...liveHits];
            if (!silent) showToast(`Loaded ${liveHits.length} live artworks from ${activeProviderLabel}!`, "success");
        }
    }

    if (providerBadgeEl) providerBadgeEl.textContent = activeProviderLabel;

    grid.innerHTML = "";
    items.forEach((art) => {
        const card = document.createElement("div");
        card.className = "sc-panel overflow-hidden flex flex-col justify-between bg-black/40";
        card.innerHTML = `
            <div>
                <div class="h-48 overflow-hidden relative bg-purple-950/40">
                    <img src="${art.imageUrl}" alt="${art.title}" loading="lazy" onerror="this.onerror=null;if(window.BUILTIN_NNN_GALLERY&&window.BUILTIN_NNN_GALLERY[0]){this.src=window.BUILTIN_NNN_GALLERY[0].imageUrl;}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                    <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 border border-yellow-400/40 text-[10px] font-bold text-yellow-300">${art.badge}</span>
                </div>
                <div class="p-4">
                    <h4 class="text-sm font-extrabold text-white">${art.title}</h4>
                    <p class="text-xs text-white/70 mt-1 leading-relaxed">${art.desc}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initNnnHub() {
    ensureMultiProfileStructures();
    populateAllProfileDropdowns();
    ensureNnnStateDefaults();
    updateNnnClock();
    setInterval(updateNnnClock, 1000);
    renderNnnCalendar();
    renderNnnYearlyStatus();
    renderSelfTouchingCalendar();
    renderNnnStories();

    // Bind synchronized Profile Key Dropdowns across Header, Dashboard, NNN Matrix, NNN Yearly Status, and Self-Touching Calendar
    ["globalProfileSelect", "dashboardProfileSelect", "nnnMatrixProfileSelect", "nnnStatusProfileSelect", "stProfileSelect"].forEach((selId) => {
        document.getElementById(selId)?.addEventListener("change", (e) => {
            switchActiveProfile(e.target.value, true);
        });
    });

    // NNN Matrix Year & Elapsed Lock Reference Mode Controls
    document.getElementById("nnnMatrixYearSelect")?.addEventListener("change", (e) => {
        const yr = e.target.value;
        const statusYrSel = document.getElementById("nnnStatusYearSelect");
        if (statusYrSel) statusYrSel.value = yr;
        renderNnnCalendar();
        renderNnnYearlyStatus();
    });
    document.getElementById("nnnMatrixClockModeSelect")?.addEventListener("change", () => {
        renderNnnCalendar();
        renderNnnYearlyStatus();
        const mode = document.getElementById("nnnMatrixClockModeSelect")?.value;
        if (mode === "sim_nov15") {
            showToast("Demo Reference Active (Nov 15, 2026): Nov 1–14 are locked as Elapsed Read-Only; Nov 15–30 are Editable!", "info");
        } else {
            showToast(`Live System Date Reference Active (${getLocalTodayIso()}).`, "info");
        }
    });

    // NNN Year-Wise Status Year Selector
    document.getElementById("nnnStatusYearSelect")?.addEventListener("change", (e) => {
        const yr = e.target.value;
        const matYrSel = document.getElementById("nnnMatrixYearSelect");
        if (matYrSel) matYrSel.value = yr;
        renderNnnCalendar();
        renderNnnYearlyStatus();
    });

    // Quick-jump buttons in NNN Sub-nav
    document.getElementById("nnnJumpYearlyStatusBtn")?.addEventListener("click", () => {
        setTimeout(() => {
            document.getElementById("nnnYearlyStatusSection")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
    });
    document.getElementById("nnnJumpSelfTouchingBtn")?.addEventListener("click", () => {
        document.querySelector('.nav-tab[data-tab="activity-calendar"]')?.click();
    });

    // Self-Touching Calendar Month/Year & Filter Controls
    document.getElementById("stMonthSelect")?.addEventListener("change", renderSelfTouchingCalendar);
    document.getElementById("stYearSelect")?.addEventListener("change", renderSelfTouchingCalendar);
    document.getElementById("stPrevMonthBtn")?.addEventListener("click", () => {
        const mSel = document.getElementById("stMonthSelect");
        const ySel = document.getElementById("stYearSelect");
        if (!mSel || !ySel) return;
        let m = Number(mSel.value) - 1;
        let y = Number(ySel.value);
        if (m < 0) {
            m = 11;
            y = Math.max(2024, y - 1);
        }
        mSel.value = String(m);
        ySel.value = String(y);
        renderSelfTouchingCalendar();
    });
    document.getElementById("stNextMonthBtn")?.addEventListener("click", () => {
        const mSel = document.getElementById("stMonthSelect");
        const ySel = document.getElementById("stYearSelect");
        if (!mSel || !ySel) return;
        let m = Number(mSel.value) + 1;
        let y = Number(ySel.value);
        if (m > 11) {
            m = 0;
            y = Math.min(2028, y + 1);
        }
        mSel.value = String(m);
        ySel.value = String(y);
        renderSelfTouchingCalendar();
    });
    document.getElementById("stJumpTodayBtn")?.addEventListener("click", () => {
        const now = new Date();
        const mSel = document.getElementById("stMonthSelect");
        const ySel = document.getElementById("stYearSelect");
        if (mSel) mSel.value = String(now.getMonth());
        if (ySel) ySel.value = String(now.getFullYear());
        renderSelfTouchingCalendar();
    });

    document.getElementById("stStartDateFilter")?.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
            const [yr, mo] = val.split("-").map(Number);
            const mSel = document.getElementById("stMonthSelect");
            const ySel = document.getElementById("stYearSelect");
            if (mSel) mSel.value = String(mo - 1);
            if (ySel && yr >= 2024 && yr <= 2028) ySel.value = String(yr);
        }
        renderSelfTouchingCalendar();
    });
    document.getElementById("stEndDateFilter")?.addEventListener("change", renderSelfTouchingCalendar);
    document.getElementById("stStatusFilterSelect")?.addEventListener("change", (e) => {
        const val = e.target.value;
        document.querySelectorAll(".st-status-chip").forEach((c) => {
            const isMatch = c.getAttribute("data-ststatus") === val;
            c.classList.toggle("ring-2", isMatch);
            c.classList.toggle("ring-yellow-400", isMatch);
        });
        renderSelfTouchingCalendar();
    });
    document.querySelectorAll(".st-status-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            const st = chip.getAttribute("data-ststatus") || "ALL";
            const sel = document.getElementById("stStatusFilterSelect");
            if (sel) sel.value = st;
            document.querySelectorAll(".st-status-chip").forEach((c) => {
                const isMatch = c.getAttribute("data-ststatus") === st;
                c.classList.toggle("ring-2", isMatch);
                c.classList.toggle("ring-yellow-400", isMatch);
            });
            renderSelfTouchingCalendar();
        });
    });
    document.getElementById("stResetFiltersBtn")?.addEventListener("click", () => {
        if (document.getElementById("stStartDateFilter")) document.getElementById("stStartDateFilter").value = "";
        if (document.getElementById("stEndDateFilter")) document.getElementById("stEndDateFilter").value = "";
        if (document.getElementById("stStatusFilterSelect")) document.getElementById("stStatusFilterSelect").value = "ALL";
        document.querySelectorAll(".st-status-chip").forEach((c) => {
            c.classList.remove("ring-2", "ring-yellow-400");
        });
        renderSelfTouchingCalendar();
        showToast("Cleared calendar date-range and status filters.", "info");
    });

    // Self-Touching Modal Close, Clear, and Save Handlers
    const stModal = document.getElementById("selfTouchingModal");
    document.getElementById("closeSelfTouchingModalBtn")?.addEventListener("click", () => stModal?.classList.add("hidden"));
    document.getElementById("cancelSelfTouchingModalBtn")?.addEventListener("click", () => stModal?.classList.add("hidden"));
    document.getElementById("stModalClearRecordBtn")?.addEventListener("click", async () => {
        const dateIso = document.getElementById("stModalDateInput")?.value || "";
        const pk = appState.profile?.profile_key || "default_monk";
        if (!dateIso || dateIso < getLocalTodayIso()) {
            showToast("Elapsed dates are immutable and cannot be cleared!", "error");
            return;
        }
        if (appState.selfTouchingByProfile[pk]) {
            delete appState.selfTouchingByProfile[pk][dateIso];
        }
        stModal?.classList.add("hidden");
        saveLocalState();
        renderSelfTouchingCalendar();
        showToast(`Cleared status on ${dateIso} for profile "${pk}".`, "info");
        await sendNeonAction("save_self_touching_record", {
            profileKey: pk,
            record_date: dateIso,
            activity_status: "CLEAR"
        });
    });

    document.getElementById("selfTouchingModalForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dateIso = document.getElementById("stModalDateInput")?.value || "";
        const statusVal = document.getElementById("stModalStatusSelect")?.value || "No Sexual Activity";
        const notesVal = document.getElementById("stModalNotesInput")?.value.trim() || "";
        const pk = appState.profile?.profile_key || "default_monk";

        if (!dateIso || dateIso < getLocalTodayIso()) {
            showToast(`🔒 Date ${dateIso} has elapsed and is immutable!`, "error");
            return;
        }

        if (!appState.selfTouchingByProfile[pk]) appState.selfTouchingByProfile[pk] = {};
        appState.selfTouchingByProfile[pk][dateIso] = {
            profile_key: pk,
            record_date: dateIso,
            activity_status: statusVal,
            notes: notesVal,
            updated_at: new Date().toISOString()
        };

        stModal?.classList.add("hidden");
        saveLocalState();
        renderSelfTouchingCalendar();
        showToast(`Saved "${statusVal}" on ${dateIso} for profile "${pk}" in NeonDB!`, "success");

        await sendNeonAction("save_self_touching_record", {
            profileKey: pk,
            record_date: dateIso,
            activity_status: statusVal,
            notes: notesVal
        });
    });
    renderNnnHistoryTimeline();
    renderNnnYoutubeGrid();
    renderNnnVisualGallery(true, true);
    scrapeLiveNnnSubreddit();

    // Load saved API keys into Vault inputs
    const savedKeys = getSavedApiKeys();
    if (document.getElementById("vaultYoutubeKey")) document.getElementById("vaultYoutubeKey").value = savedKeys.youtubeApiKey || "";
    if (document.getElementById("vaultPexelsKey")) document.getElementById("vaultPexelsKey").value = savedKeys.pexelsApiKey || "";
    if (document.getElementById("vaultUnsplashKey")) document.getElementById("vaultUnsplashKey").value = savedKeys.unsplashAccessKey || "";
    if (document.getElementById("vaultPixabayKey")) document.getElementById("vaultPixabayKey").value = savedKeys.pixabayApiKey || "";
    if (document.getElementById("vaultRedditClientId")) document.getElementById("vaultRedditClientId").value = savedKeys.redditClientId || "";
    if (document.getElementById("vaultRedditSecret")) document.getElementById("vaultRedditSecret").value = savedKeys.redditClientSecret || "";
    if (document.getElementById("vaultNasaKey")) document.getElementById("vaultNasaKey").value = savedKeys.nasaApiKey || "DEMO_KEY";
    if (document.getElementById("vaultNcbiKey")) document.getElementById("vaultNcbiKey").value = savedKeys.ncbiApiKey || "";

    // Sub-pane switching inside NNN Hub
    document.querySelectorAll(".nnn-subpill").forEach((pill) => {
        pill.addEventListener("click", () => {
            document.querySelectorAll(".nnn-subpill").forEach((p) => p.classList.remove("active"));
            pill.classList.add("active");
            const targetPane = pill.getAttribute("data-nnnpane");
            document.querySelectorAll(".nnn-pane").forEach((pane) => {
                pane.classList.toggle("hidden", pane.id !== `nnn-pane-${targetPane}`);
            });
        });
    });

    // Urge Thermometer Slider & Log Button
    const urgeSlider = document.getElementById("nnnUrgeSlider");
    if (urgeSlider) {
        urgeSlider.addEventListener("input", (e) => updateUrgeThermometerUI(e.target.value));
    }
    document.getElementById("logNnnUrgeBtn")?.addEventListener("click", async () => {
        const val = Number(document.getElementById("nnnUrgeSlider")?.value || 2);
        const note = document.getElementById("nnnUrgeNoteInput")?.value.trim() || "";
        const pk = appState.profile?.profile_key || "default_monk";
        const challengeYear = Number(document.getElementById("nnnMatrixYearSelect")?.value || 2026);
        const dayOfMonth = Math.min(30, new Date().getDate());
        const status = val >= 7 ? "danger_zone" : "survived";

        if (isNovemberDayElapsed(challengeYear, dayOfMonth)) {
            showToast(`🔒 Nov ${dayOfMonth}, ${challengeYear} has elapsed and is in Read-Only mode. Select a current or future November year/date!`, "error");
            return;
        }

        ensureMultiProfileStructures();
        if (!appState.nnnDailyByProfile[pk]) appState.nnnDailyByProfile[pk] = {};
        if (!appState.nnnDailyByProfile[pk][challengeYear]) appState.nnnDailyByProfile[pk][challengeYear] = {};
        appState.nnnDailyByProfile[pk][challengeYear][dayOfMonth] = {
            profile_key: pk,
            challenge_year: challengeYear,
            day_number: dayOfMonth,
            status,
            urge_level: val,
            trigger_note: note
        };
        appState.nnnDailyMap = appState.nnnDailyByProfile[pk][challengeYear];
        appState.profile.aura_points += 25;
        saveLocalState();
        renderNnnCalendar();
        renderNnnYearlyStatus();
        document.getElementById("headerAuraPoints").textContent = appState.profile.aura_points;
        if (document.getElementById("nnnUrgeNoteInput")) document.getElementById("nnnUrgeNoteInput").value = "";
        showToast(`Logged Urge Reading (${val}/10) for "${pk}" (Nov ${dayOfMonth}, ${challengeYear}) (+25 Aura XP)!`, "success");

        await sendNeonAction("log_nnn_day", {
            profileKey: pk,
            challenge_year: challengeYear,
            day_number: dayOfMonth,
            status,
            urge_level: val,
            trigger_note: note
        });
    });

    // Live Reddit Scraper Button & Select
    document.getElementById("scrapeNnnRedditBtn")?.addEventListener("click", scrapeLiveNnnSubreddit);
    document.getElementById("nnnSubredditSelect")?.addEventListener("change", scrapeLiveNnnSubreddit);

    // YouTube Search & Category Filter
    document.getElementById("fetchLiveYoutubeBtn")?.addEventListener("click", queryLiveYoutubeVideos);
    document.getElementById("nnnYoutubeSearchInput")?.addEventListener("input", renderNnnYoutubeGrid);
    document.getElementById("nnnYoutubeCategorySelect")?.addEventListener("change", renderNnnYoutubeGrid);

    // Funny Story Form
    const storyForm = document.getElementById("nnnStoryForm");
    document.getElementById("toggleNnnStoryFormBtn")?.addEventListener("click", () => {
        storyForm?.classList.toggle("hidden");
    });
    document.getElementById("cancelNnnStoryBtn")?.addEventListener("click", () => {
        storyForm?.classList.add("hidden");
    });
    storyForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const author_handle = document.getElementById("nnnStoryAuthor").value.trim() || "AnonSpartan";
        const day_tag = document.getElementById("nnnStoryDayTag").value.trim() || "Day 14 of NNN";
        const humor_tag = document.getElementById("nnnStoryHumorTag").value;
        const title = document.getElementById("nnnStoryTitle").value.trim();
        const story_body = document.getElementById("nnnStoryBody").value.trim();
        if (!title || !story_body) return;

        const newStory = {
            id: Date.now(),
            author_handle,
            day_tag,
            humor_tag,
            title,
            story_body,
            laugh_sparks: 1
        };
        appState.nnnStories.unshift(newStory);
        appState.profile.aura_points = Number(appState.profile.aura_points || 0) + 35;
        saveLocalState();
        renderNnnStories();
        renderAll();
        storyForm.reset();
        storyForm.classList.add("hidden");
        showToast("Funny NNN Story published & +35 Aura XP awarded!", "success");
        await sendNeonAction("add_nnn_story", {
            ...newStory,
            aura_points: appState.profile.aura_points
        });
    });

    // Live Visual Gallery Refresh
    document.getElementById("fetchLiveGalleryBtn")?.addEventListener("click", () => {
        renderNnnVisualGallery(true, true);
    });
    document.getElementById("nnnGalleryProviderSelect")?.addEventListener("change", () => {
        renderNnnVisualGallery(true, true);
    });

    // API Keys Vault Save & Clear
    document.getElementById("saveApiKeysVaultBtn")?.addEventListener("click", () => {
        const newKeys = {
            youtubeApiKey: document.getElementById("vaultYoutubeKey")?.value.trim() || "",
            pexelsApiKey: document.getElementById("vaultPexelsKey")?.value.trim() || "",
            unsplashAccessKey: document.getElementById("vaultUnsplashKey")?.value.trim() || "",
            pixabayApiKey: document.getElementById("vaultPixabayKey")?.value.trim() || "",
            redditClientId: document.getElementById("vaultRedditClientId")?.value.trim() || "",
            redditClientSecret: document.getElementById("vaultRedditSecret")?.value.trim() || "",
            nasaApiKey: document.getElementById("vaultNasaKey")?.value.trim() || "DEMO_KEY",
            ncbiApiKey: document.getElementById("vaultNcbiKey")?.value.trim() || ""
        };
        saveApiKeysToStorage(newKeys);
        showToast("Saved API keys! Refreshing YouTube, Community Scraper, and Visual Gallery...", "success");
        queryLiveYoutubeVideos();
        scrapeLiveNnnSubreddit();
        renderNnnVisualGallery(true, true);
    });

    document.getElementById("clearApiKeysVaultBtn")?.addEventListener("click", () => {
        saveApiKeysToStorage({});
        ["vaultYoutubeKey", "vaultPexelsKey", "vaultUnsplashKey", "vaultPixabayKey", "vaultRedditClientId", "vaultRedditSecret", "vaultNcbiKey"].forEach((id) => {
            if (document.getElementById(id)) document.getElementById(id).value = "";
        });
        if (document.getElementById("vaultNasaKey")) document.getElementById("vaultNasaKey").value = "DEMO_KEY";
        activeYoutubeVideos = [...TOP_50_NNN_VIDEOS];
        renderNnnYoutubeGrid();
        renderNnnVisualGallery(true, true);
        scrapeLiveNnnSubreddit();
        showToast("Switched to 100% Keyless Live Public APIs (Art Institute + Reddit JSON + PullPush.io)!", "info");
    });
}

document.addEventListener("DOMContentLoaded", initNnnHub);
}
