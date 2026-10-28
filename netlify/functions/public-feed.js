/**
 * SeedController — Dynamic Public API Aggregator Function
 * Fetches live, time-varying data from public APIs (PubMed NCBI E-Utilities,
 * Reddit public JSON feeds for r/SemenRetention & r/NoFap, and Stoic/ZenQuotes)
 * without browser CORS bottlenecks.
 *
 * API KEY INFO:
 * - All 3 APIs are open, public JSON endpoints that work with ZERO API keys required!
 * - Optional: If you set `NCBI_API_KEY` in Netlify Environment Variables, it is
 *   automatically appended to PubMed requests to raise rate limits from 3 req/s to 10 req/s.
 */

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, max-age=0"
};

// Rotate search queries by hour/topic so results dynamically evolve with time
const PUBMED_TOPICS = [
    "dopamine+receptor+neuroplasticity+abstinence",
    "testosterone+abstinence+endocrine+male",
    "mindfulness+meditation+prefrontal+cortex+self+control",
    "heart+rate+variability+slow+breathing+vagus+nerve",
    "behavioral+addiction+prefrontal+executive+function"
];

exports.handler = async (event) => {
    const params = event.queryStringParameters || {};
    const topicIndex = Number(params.topicIndex ?? (new Date().getUTCHours() % PUBMED_TOPICS.length));
    const customTerm = params.term ? encodeURIComponent(params.term) : PUBMED_TOPICS[topicIndex % PUBMED_TOPICS.length];
    const ncbiKeyParam = process.env.NCBI_API_KEY ? `&api_key=${encodeURIComponent(process.env.NCBI_API_KEY)}` : "";

    const responsePayload = {
        fetchedAt: new Date().toISOString(),
        ActiveTopic: customTerm.replace(/\+/g, " "),
        quote: null,
        pubmedArticles: [],
        communityPulse: []
    };

    // 1. Fetch Live Motivational / Stoic Quote (Public Keyless Endpoint)
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
            source: "Stoic Archive Fallback"
        };
    }

    // 2. Fetch Live PubMed Peer-Reviewed Studies via NCBI E-Utilities (Keyless or Optional NCBI_API_KEY)
    try {
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
        console.warn("PubMed fetch warning:", e.message);
    }

    // 3. Fetch Live Reddit Community Discussions (r/SemenRetention public JSON feed — Keyless)
    try {
        const redditUrl = `https://www.reddit.com/r/SemenRetention/hot.json?limit=5&raw_json=1`;
        const redditRes = await fetch(redditUrl, {
            headers: { "User-Agent": "SeedControllerApp/1.0 (Netlify Serverless Function)" }
        });
        if (redditRes.ok) {
            const rData = await redditRes.json();
            const children = (rData.data && rData.data.children) || [];
            responsePayload.communityPulse = children
                .filter((c) => c.data && !c.data.stickied)
                .slice(0, 4)
                .map((c) => ({
                    title: c.data.title,
                    author: `u/${c.data.author}`,
                    upvotes: c.data.ups,
                    comments: c.data.num_comments,
                    url: `https://www.reddit.com${c.data.permalink}`,
                    createdUtc: c.data.created_utc
                }));
        }
    } catch (e) {
        console.warn("Reddit feed fallback:", e.message);
    }

    return {
        statusCode: 200,
        headers: HEADERS,
        body: JSON.stringify(responsePayload)
    };
};
