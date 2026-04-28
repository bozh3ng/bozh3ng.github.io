(function () {
  var ENDPOINT = "https://blog-analytics.bozh3ng.workers.dev/collect";
  if (!ENDPOINT) return;

  var sid =
    Math.random().toString(36).slice(2) + Date.now().toString(36);
  var start = Date.now();
  var visible = !document.hidden;
  var elapsed = 0; // ms the tab has been visible
  var sent = false;

  function dur() {
    return elapsed + (visible ? Date.now() - start : 0);
  }

  function ping(type) {
    var d = dur();
    var payload = {
      sid: sid,
      url: location.pathname,
      title: document.title,
      type: type,
      duration: d,
      ref: document.referrer,
      sw: screen.width,
      sh: screen.height,
      lang: navigator.language,
    };
    // Use sendBeacon for leave events (reliable on tab close)
    if (type === "leave" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, JSON.stringify(payload));
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function () {});
    }
  }

  // Track visibility changes (pause timer when tab hidden)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      elapsed += Date.now() - start;
      visible = false;
    } else {
      start = Date.now();
      visible = true;
    }
  });

  // Pageview on load
  ping("pageview");

  // Heartbeat every 30s (so we know they're still reading)
  var hb = setInterval(function () {
    ping("heartbeat");
  }, 30000);

  // Leave event
  function onLeave() {
    if (sent) return;
    sent = true;
    clearInterval(hb);
    ping("leave");
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) onLeave();
  });
  window.addEventListener("beforeunload", onLeave);
  window.addEventListener("pagehide", onLeave);
})();
