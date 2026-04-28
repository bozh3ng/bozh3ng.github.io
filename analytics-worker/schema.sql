DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT NOT NULL,
  page_title TEXT,
  event_type TEXT NOT NULL, -- 'pageview', 'heartbeat', 'leave'
  duration_ms INTEGER DEFAULT 0,
  screen_w INTEGER,
  screen_h INTEGER,
  lang TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_events_created ON events(created_at);
CREATE INDEX idx_events_page ON events(page_url);
CREATE INDEX idx_events_ip ON events(ip);
CREATE INDEX idx_events_session ON events(session_id);
