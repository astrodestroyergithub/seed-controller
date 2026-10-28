/**
 * SeedController + NNN (No Nut November) Multi-API Live Aggregator
 * Supports both server-side Netlify Environment Variables AND client-supplied API keys:
 *  1. YouTube Data API v3 (`YOUTUBE_API_KEY`) -> Fetches live Top 50 NNN & Semen Retention videos
 *  2. Reddit API (`REDDIT_CLIENT_ID` + `REDDIT_CLIENT_SECRET` OAuth2 OR public JSON) -> Scrapes r/nonutnovember, r/SemenRetention, r/NoFap
 *  3. Pixabay API (`PIXABAY_API_KEY`) / Pexels API (`PEXELS_API_KEY`) -> Fetches live NNN motivational & stoic visual gallery
 *  4. NIH NCBI PubMed API (`NCBI_API_KEY`) -> Fetches peer-reviewed neuroendocrinology & abstinence studies
 *  5. DummyJSON Quotes API -> Fetches live motivational & stoic transmissions
 */

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Cache-Control": "no-store, max-age=0"
};

const PUBMED_TOPICS = [
    "dopamine+receptor+neuroplasticity+abstinence",
    "testosterone+abstinence+endocrine+male",
    "mindfulness+meditation+prefrontal+cortex+self+control",
    "heart+rate+variability+slow+breathing+vagus+nerve",
    "behavioral+addiction+prefrontal+executive+function"
];

exports.handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: HEADERS, body: "" };
    }

    const params = event.queryStringParameters || {};
    const topicIndex = Number(params.topicIndex ?? (new Date().getUTCHours() % PUBMED_TOPICS.length));
    const customTerm = params.term ? encodeURIComponent(params.term) : PUBMED_TOPICS[topicIndex % PUBMED_TOPICS.length];
    const subreddit = (params.subreddit || "nonutnovember").replace(/[^a-zA-Z0-9_]/g, "");
    const ytQuery = params.ytQuery || "No Nut November Semen Retention Motivation Science";

    // Read API keys from Netlify Env Vars OR optional query parameters passed from the UI API Key Vault
    const youtubeKey = params.youtubeApiKey || process.env.YOUTUBE_API_KEY || "";
    const redditClientId = params.redditClientId || process.env.REDDIT_CLIENT_ID || "";
    const redditClientSecret = params.redditClientSecret || process.env.REDDIT_CLIENT_SECRET || "";
    const pixabayKey = params.pixabayApiKey || process.env.PIXABAY_API_KEY || "";
    const ncbiKey = params.ncbiApiKey || process.env.NCBI_API_KEY || "";

    const responsePayload = {
        fetchedAt: new Date().toISOString(),
        activeApis: {
            youtube: youtubeKey ? "Live YouTube Data API v3 (Key Authenticated)" : "Curated Top 50 NNN Video Index (Add YOUTUBE_API_KEY for live search)",
            reddit: redditClientId && redditClientSecret ? "Reddit OAuth2 Authenticated Scraper" : "Reddit Public JSON Scraper",
            pixabay: pixabayKey ? "Pixabay Live Image API (Key Authenticated)" : "Built-in NNN Mural & Stoic Art Vault",
            pubmed: ncbiKey ? "NIH PubMed API (Key Authenticated - 10 req/s)" : "NIH PubMed Public E-Utilities (Keyless 3 req/s)"
        },
        quote: null,
        pubmedArticles: [],
        communityPulse: [],
        nnnRedditFeed: [],
        youtubeVideos: [],
        galleryImages: []
    };

    // 1. Live Motivational / Stoic Quote
    try {
        const quoteRes = await fetch(`https://dummyjson.com/quotes/random?t=${Date.now()}`);
        if (quoteRes.ok) {
            const qData = await quoteRes.json();
            responsePayload.quote = {
                text: qData.quote,
                author: qData.author,
                source: "DummyJSON Live Quotes API"
            };
        }
    } catch (e) {
        responsePayload.quote = {
            text: "No man is free who is not master of himself.",
            author: "Epictetus",
            source: "Stoic Archive"
        };
    }

    // 2. Live PubMed Peer-Reviewed Studies
    try {
        const ncbiKeyParam = ncbiKey ? `&api_key=${encodeURIComponent(ncbiKey)}` : "";
        const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${customTerm}&retmode=json&retmax=5&sort=date${ncbiKeyParam}`;
        const searchRes = await fetch(searchUrl);
        if (searchRes.ok) {
            const searchData = await searchRes.json();
            const idList = (searchData.esearchresult && searchData.esearchresult.idlist) || [];
            if (idList.length > 0) {
                const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(",")}&retmode=json${ncbiKeyParam}`;
                const sumRes = await fetch(summaryUrl);
                if (sumRes.ok) {
                    const sumData = await sumRes.json();
                    const resultObj = sumData.result || {};
                    responsePayload.pubmedArticles = idList
                        .map((id) => resultObj[id])
                        .filter(Boolean)
                        .map((item) => ({
                            pmid: item.uid,
                            title: item.title,
                            journal: item.fulljournalname || item.source || "Peer-Reviewed Journal",
                            pubDate: item.pubdate || "Recent",
                            authors: (item.authors || []).slice(0, 3).map((a) => a.name).join(", ") || "Clinical Research Group",
                            url: `https://pubmed.ncbi.nlm.nih.gov/${item.uid}/`
                        }));
                }
            }
        }
    } catch (e) {
        console.warn("PubMed warning:", e.message);
    }

    // 3. Live Reddit Scraper (Supports OAuth2 Client ID + Secret OR Public JSON)
    try {
        let redditHeaders = { "User-Agent": "SeedControllerNNN/2.0 (Netlify Serverless)" };
        let redditBaseUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=12&raw_json=1`;

        if (redditClientId && redditClientSecret) {
            const authString = Buffer.from(`${redditClientId}:${redditClientSecret}`).toString("base64");
            const tokenRes = await fetch("https://www.reddit.com/api/v1/access_token", {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${authString}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "SeedControllerNNN/2.0"
                },
                body: "grant_type=client_credentials"
            });
            if (tokenRes.ok) {
                const tokenData = await tokenRes.json();
                if (tokenData.access_token) {
                    redditHeaders["Authorization"] = `Bearer ${tokenData.access_token}`;
                    redditBaseUrl = `https://oauth.reddit.com/r/${subreddit}/hot?limit=12&raw_json=1`;
                }
            }
        }

        const redditRes = await fetch(redditBaseUrl, { headers: redditHeaders });
        if (redditRes.ok) {
            const rData = await redditRes.json();
            const children = (rData.data && rData.data.children) || [];
            const mapped = children
                .filter((c) => c.data && !c.data.stickied)
                .slice(0, 10)
                .map((c) => ({
                    id: c.data.id,
                    subreddit: c.data.subreddit_name_prefixed || `r/${subreddit}`,
                    title: c.data.title,
                    selftext: (c.data.selftext || "").slice(0, 260),
                    author: `u/${c.data.author}`,
                    upvotes: c.data.ups,
                    comments: c.data.num_comments,
                    flair: c.data.link_flair_text || "NNN Field Report",
                    url: `https://www.reddit.com${c.data.permalink}`,
                    createdUtc: c.data.created_utc
                }));
            responsePayload.nnnRedditFeed = mapped;
            responsePayload.communityPulse = mapped.slice(0, 4);
        }
    } catch (e) {
        console.warn("Reddit scraper fallback:", e.message);
    }

    // 4. Live YouTube Data API v3 (Top 50 NNN Videos when YOUTUBE_API_KEY is provided)
    if (youtubeKey) {
        try {
            const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(ytQuery)}&type=video&Order=relevance&key=${encodeURIComponent(youtubeKey)}`;
            const ytRes = await fetch(ytUrl);
            if (ytRes.ok) {
                const ytData = await ytRes.json();
                responsePayload.youtubeVideos = (ytData.items || []).map((item, idx) => ({
                    rank: idx + 1,
                    videoId: item.id && item.id.videoId,
                    title: item.snippet ? item.snippet.title : "NNN Retention Guide",
                    channel: item.snippet ? item.snippet.channelTitle : "Retention Creator",
                    category: "Live YouTube API",
                    publishedAt: item.snippet ? item.snippet.publishedAt : "",
                    thumbnail: item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.high
                        ? item.snippet.thumbnails.high.url
                        : `https://i.ytimg.com/vi/${item.id && item.id.videoId}/hqdefault.jpg`
                })).filter((v) => v.videoId);
            }
        } catch (e) {
            console.warn("YouTube API warning:", e.message);
        }
    }

    // 5. Live Pixabay Visual Gallery API (when PIXABAY_API_KEY is provided)
    if (pixabayKey) {
        try {
            const pxUrl = `https://pixabay.com/api/?key=${encodeURIComponent(pixabayKey)}&q=spartan+warrior+mountain+meditation&image_type=illustration&per_page=12`;
            const pxRes = await fetch(pxUrl);
            if (pxRes.ok) {
                const pxData = await pxRes.json();
                responsePayload.galleryImages = (pxData.hits || []).map((h) => ({
                    id: h.id,
                    title: h.tags || "Stoic Ascension Artwork",
                    imageUrl: h.webformatURL,
                    sourceUrl: h.pageURL,
                    author: h.user,
                    likes: h.likes
                }));
            }
        } catch (e) {
            console.warn("Pixabay API warning:", e.message);
        }
    }

    return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(responsePayload)
    };
};
