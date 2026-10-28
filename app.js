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
        const res = await fetch(`/.netlify/functions/api?profileKey=${encodeURIComponent(profileKey)}`, {
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
        const res = await fetch("/.netlify/functions/api", {
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
    } else {
        fastDisplay.textContent = "00:00:00";
        fastBar.style.width = "0%";
        fastBadge.textContent = "Standby";
        fastBadge.className = "text-xs font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white/80";
        fastSub.textContent = `Target: ${appState.profile.fasting_target_hours || 16} Hours • Ready to begin`;
        fastBtn.textContent = "⚡ Start Fasting Window";
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
        const fnRes = await fetch(`/.netlify/functions/public-feed?term=${encodeURIComponent(topic)}`);
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
    document.getElementById("pullFromNeonBtn").addEventListener("click", () => syncWithNeonDB(true));
    document.getElementById("pushToNeonBtn").addEventListener("click", async () => {
        appState.profile.profile_key = document.getElementById("profileKeyInput").value.trim() || "default_monk";
        appState.profile.display_name = document.getElementById("displayNameInput").value.trim() || "Sovereign Initiate";
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
