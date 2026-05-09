// Reflex test:
// - 5 thumbs per round
// - Between lights: 300-500ms delay (chosen randomly)
// - A random thumb lights; player has up to 1000ms to click
// - Click or timeout records a time (timeout = 1000ms)
// - Round ends after 5 lights; average is reported
// - Best average is saved to localStorage
(function () {
  const board = document.querySelector("[data-reflex-board]");
  if (!board) return;

  const thumbs = Array.from(board.querySelectorAll("[data-reflex-thumb]"));
  const startBtn = document.querySelector("[data-reflex-start]");
  const hitsEl = document.querySelector("[data-reflex-hits]");
  const avgEl = document.querySelector("[data-reflex-avg]");
  const bestEl = document.querySelector("[data-reflex-best]");

  const TOTAL_LIGHTS = 5;
  const MIN_DELAY = 300; // ms before next light
  const MAX_DELAY = 500;
  const LIGHT_TIMEOUT = 1000; // ms a light stays on

  const BEST_KEY = "reflex-best-avg";

  let roundActive = false;
  let hits = 0; // number of thumbs completed this round (hit or missed)
  let times = []; // ms per light (click reaction, or LIGHT_TIMEOUT if missed)
  let activeIdx = -1;
  let activeStart = 0;
  let nextLightTimer = null;
  let timeoutTimer = null;

  loadBest();

  function loadBest() {
    const best = localStorage.getItem(BEST_KEY);
    if (best) bestEl.textContent = Number(best).toFixed(0) + " ms";
  }

  function saveBest(avg) {
    const current = Number(localStorage.getItem(BEST_KEY));
    if (!current || avg < current) {
      localStorage.setItem(BEST_KEY, String(Math.round(avg)));
      bestEl.textContent = Math.round(avg) + " ms";
    }
  }

  function resetBoard() {
    thumbs.forEach((t) => {
      t.classList.remove("lit", "hit", "miss");
      t.disabled = true;
    });
    activeIdx = -1;
  }

  function startRound() {
    if (roundActive) return;
    roundActive = true;
    hits = 0;
    times = [];
    hitsEl.textContent = "0";
    avgEl.textContent = "—";
    startBtn.disabled = true;
    startBtn.textContent = "…";
    resetBoard();
    thumbs.forEach((t) => (t.disabled = false));
    scheduleNext();
  }

  function scheduleNext() {
    if (hits >= TOTAL_LIGHTS) {
      endRound();
      return;
    }
    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
    nextLightTimer = setTimeout(lightRandom, delay);
  }

  function lightRandom() {
    // Pick any of the 5 thumbs (random, can repeat)
    const idx = Math.floor(Math.random() * thumbs.length);
    activeIdx = idx;
    activeStart = performance.now();
    const el = thumbs[idx];
    el.classList.remove("hit", "miss");
    el.classList.add("lit");

    // Timeout: if no click within LIGHT_TIMEOUT, count as a miss
    timeoutTimer = setTimeout(() => handleMiss(idx), LIGHT_TIMEOUT);
  }

  function spawnHearts(el) {
    const icons = ["❤", "✨", "👍", "💫", "⭐"];
    const count = 6;
    const rect = el.getBoundingClientRect();
    const startX = rect.width - 8; // start near the right edge of the thumb
    const startY = rect.height / 2 - 10;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "thumb-heart";
      heart.textContent = icons[Math.floor(Math.random() * icons.length)];
      heart.style.left = startX + "px";
      heart.style.top = startY + "px";
      // Launch to the right (decelerates), then buoyancy lifts it upward (accelerates).
      const dx = 100 + Math.random() * 80; // 100-180 px right total
      const rise = -100 - Math.random() * 60; // rises 100-160 px upward
      heart.style.setProperty("--reflex-dx", dx + "px");
      heart.style.setProperty("--reflex-rise", rise + "px");
      heart.style.animationDelay = i * 30 + "ms";
      el.appendChild(heart);
      setTimeout(() => heart.remove(), 1100);
    }
  }

  function handleHit(idx) {
    if (activeIdx !== idx) return;
    const reaction = performance.now() - activeStart;
    clearTimeout(timeoutTimer);
    timeoutTimer = null;
    activeIdx = -1;

    const el = thumbs[idx];
    el.classList.remove("lit");
    el.classList.add("hit");
    spawnHearts(el);
    setTimeout(() => el.classList.remove("hit"), 250);

    times.push(reaction);
    hits += 1;
    updateStats();
    scheduleNext();
  }

  function handleMiss(idx) {
    if (activeIdx !== idx) return;
    activeIdx = -1;

    const el = thumbs[idx];
    el.classList.remove("lit");
    el.classList.add("miss");
    setTimeout(() => el.classList.remove("miss"), 350);

    times.push(LIGHT_TIMEOUT);
    hits += 1;
    updateStats();
    scheduleNext();
  }

  function updateStats() {
    hitsEl.textContent = String(hits);
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    avgEl.textContent = avg.toFixed(0) + " ms";
  }

  function endRound() {
    roundActive = false;
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    avgEl.textContent = avg.toFixed(0) + " ms";
    saveBest(avg);
    resetBoard();
    startBtn.disabled = false;
    startBtn.textContent = "Play again";
  }

  // Event wiring
  thumbs.forEach((t) => {
    const idx = Number(t.dataset.reflexThumb);
    t.addEventListener("click", () => {
      if (!roundActive) return;
      if (t.classList.contains("lit")) {
        handleHit(idx);
      }
      // Clicks on non-lit thumbs are ignored (you could add a penalty later).
    });
  });

  startBtn.addEventListener("click", startRound);
})();
