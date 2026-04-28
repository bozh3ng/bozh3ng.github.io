const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Stats-Key",
  "Access-Control-Max-Age": "86400",
};

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = env.ALLOWED_ORIGIN || "https://bozh3ng.github.io";
  const allow = origin === allowed || allowed === "*" ? origin : allowed;
  return { ...CORS_HEADERS, "Access-Control-Allow-Origin": allow };
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(request, env) },
  });
}

// --- Collect endpoint ---
async function handleCollect(request, env) {
  const body = await request.json();
  const { sid, url, title, type, duration, sw, sh, lang } = body;
  if (!sid || !url || !type) return json({ error: "missing fields" }, 400, request, env);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ua = request.headers.get("User-Agent") || "";
  const ref = request.headers.get("Referer") || body.ref || "";

  await env.DB.prepare(
    `INSERT INTO events (session_id, ip, user_agent, referrer, page_url, page_title, event_type, duration_ms, screen_w, screen_h, lang)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(sid, ip, ua, ref, url, title || "", type, duration || 0, sw || 0, sh || 0, lang || "")
    .run();

  return json({ ok: true }, 200, request, env);
}

// --- Stats endpoint (private) ---
async function handleStats(request, env) {
  const key = request.headers.get("X-Stats-Key") || new URL(request.url).searchParams.get("key");
  if (!key || key !== env.STATS_KEY) return json({ error: "unauthorized" }, 401, request, env);

  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get("days") || "7", 10);
  const page = url.searchParams.get("page") || null;
  const since = new Date(Date.now() - days * 86400000).toISOString();

  // Summary: unique IPs, total pageviews, top pages
  const summary = await env.DB.prepare(
    `SELECT COUNT(DISTINCT ip) as unique_visitors,
            COUNT(CASE WHEN event_type = 'pageview' THEN 1 END) as pageviews
     FROM events WHERE created_at >= ?`
  ).bind(since).first();

  const topPages = await env.DB.prepare(
    `SELECT page_url, page_title,
            COUNT(CASE WHEN event_type = 'pageview' THEN 1 END) as views,
            ROUND(AVG(CASE WHEN event_type = 'leave' AND duration_ms > 0 THEN duration_ms END) / 1000.0, 1) as avg_read_sec
     FROM events WHERE created_at >= ?
     GROUP BY page_url ORDER BY views DESC LIMIT 20`
  ).bind(since).all();

  const topReferrers = await env.DB.prepare(
    `SELECT referrer, COUNT(*) as hits
     FROM events WHERE created_at >= ? AND event_type = 'pageview' AND referrer != ''
     GROUP BY referrer ORDER BY hits DESC LIMIT 10`
  ).bind(since).all();

  // Recent visitors (last 50 unique sessions)
  const recent = await env.DB.prepare(
    `SELECT session_id, ip, user_agent, page_url, page_title, referrer,
            MIN(created_at) as arrived,
            MAX(CASE WHEN event_type = 'leave' THEN duration_ms ELSE 0 END) as read_ms
     FROM events WHERE created_at >= ?
     GROUP BY session_id ORDER BY arrived DESC LIMIT 50`
  ).bind(since).all();

  // Per-page detail if requested
  let pageDetail = null;
  if (page) {
    pageDetail = await env.DB.prepare(
      `SELECT session_id, ip, user_agent, referrer,
              MIN(created_at) as arrived,
              MAX(CASE WHEN event_type = 'leave' THEN duration_ms ELSE 0 END) as read_ms
       FROM events WHERE page_url LIKE ? AND created_at >= ?
       GROUP BY session_id ORDER BY arrived DESC LIMIT 50`
    ).bind(`%${page}%`, since).all();
  }

  return json({
    period: `last ${days} days`,
    summary,
    topPages: topPages.results,
    topReferrers: topReferrers.results,
    recentVisitors: recent.results,
    pageDetail: pageDetail?.results || null,
  }, 200, request, env);
}

// --- Router ---
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    const url = new URL(request.url);

    if (url.pathname === "/collect" && request.method === "POST") {
      try { return await handleCollect(request, env); }
      catch (e) { return json({ error: e.message }, 500, request, env); }
    }

    if (url.pathname === "/stats" && request.method === "GET") {
      return await handleStats(request, env);
    }

    return json({ error: "not found" }, 404, request, env);
  },
};
