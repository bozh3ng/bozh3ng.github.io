// ASCII Flappy Bird with Celeste-inspired physics.
// Works on any <canvas data-flappy> element, at any size.
// Game scales proportionally to canvas width (reference width = 800px).
(function () {
  const BIRD_SPRITES = {
    // Head always faces right. Body stays fixed; wings sweep up → mid → down.
    wingDown: [
      "          ",
      "          ",
      "    (o)__>",
      "  7_\\_/   ",
      " 7__,     ",
    ],
    wingMid: [
      "          ",
      "          ",
      "7___(o)__>",
      "    \\_/   ",
      "          ",
    ],
    wingUp: [
      " 7____    ",
      "  7_,     ",
      "    (o)__>",
      "    \\_/   ",
      "          ",
    ],
  };

  function getCss(name) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }

  function createFlappyGame(canvas) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Scale everything relative to a reference width of 800px.
    const S = W / 800;

    // Sizes (scaled)
    const CHAR_W = 9 * S;
    const CHAR_H = 14 * S;
    const BIRD_WIDTH_CHARS = 10;
    const BIRD_HEIGHT_CHARS = 5;
    const BIRD_W = BIRD_WIDTH_CHARS * CHAR_W;
    const BIRD_H = BIRD_HEIGHT_CHARS * CHAR_H;

    // Physics (scaled for consistent feel regardless of canvas size)
    const GRAVITY_UP = 1500 * S;
    const GRAVITY_DOWN = 2400 * S;
    const HOLD_GRAVITY_MULT = 0.3;
    const HOLD_MAX_TIME = 0.22;
    const JUMP_IMPULSE = -500 * S;
    const MAX_FALL_SPEED = 780 * S;
    const WORLD_SPEED = 170 * S;
    const PIPE_GAP = 220 * S;
    const PIPE_SPACING = 380 * S;
    const PIPE_WIDTH = 60 * S;
    const BIRD_X = 150 * S;
    const HITBOX_INSET_X = 25 * S;
    const HITBOX_INSET_Y = 20 * S;

    // Font sizes (scaled, with minimums so overlays stay readable on small canvases)
    const FONT_START = Math.max(16, 32 * S);
    const FONT_HINT = Math.max(10, 14 * S);
    const FONT_PAUSED = Math.max(18, 28 * S);
    const FONT_GAMEOVER = Math.max(20, 36 * S);
    const FONT_SCORE = Math.max(14, 22 * S);

    // State
    let bird, pipes, score, best, gameStarted, gameOver;
    let holdingStart = 0;
    let isHolding = false;
    let wingPhase = 0;
    let flapTimer = 0;
    let lastTime = 0;
    let particles = [];
    let mouseInside = false;

    // Per-canvas best score in localStorage (shared across instances)
    best = Number(localStorage.getItem("flappy-best") || 0);

    function findHud(selector) {
      // Look for a HUD element in a container adjacent to the canvas.
      const wrapper = canvas.closest(".flappy-wrapper") ||
                      canvas.closest(".flappy-mini") ||
                      canvas.parentElement;
      if (!wrapper) return null;
      return wrapper.querySelector(selector);
    }

    function reset() {
      bird = { x: BIRD_X, y: H / 2, vy: 0 };
      pipes = [];
      score = 0;
      gameStarted = false;
      gameOver = false;
      flapTimer = 0;
      wingPhase = 1;
      particles = [];
      spawnPipe(W + 100 * S);
      spawnPipe(W + 100 * S + PIPE_SPACING);
      spawnPipe(W + 100 * S + PIPE_SPACING * 2);
      updateHud();
    }

    function spawnPipe(x) {
      const margin = 40 * S;
      const gapY = margin + Math.random() * (H - margin * 2 - PIPE_GAP);
      pipes.push({ x, gapY, passed: false });
    }

    function updateHud() {
      // Scores are now drawn inside the canvas; no external HUD update needed.
    }

    function startFlap() {
      if (!gameStarted) gameStarted = true;
      if (gameOver) {
        reset();
        return;
      }
      bird.vy = JUMP_IMPULSE;
      holdingStart = performance.now();
      isHolding = true;
      flapTimer = 0.15;
      wingPhase = (wingPhase + 1) % 3;
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: bird.x + BIRD_W * 0.3,
          y: bird.y + BIRD_H,
          vx: (-80 + Math.random() * -40) * S,
          vy: (40 + Math.random() * 60) * S,
          life: 0.4,
          char: ["·", "*", "'"][Math.floor(Math.random() * 3)],
        });
      }
    }

    function endFlap() {
      isHolding = false;
    }

    canvas.addEventListener("mousedown", (e) => {
      e.preventDefault();
      canvas.focus();
      startFlap();
    });
    canvas.addEventListener("mouseup", () => endFlap());
    canvas.addEventListener("mouseleave", () => {
      endFlap();
      mouseInside = false;
    });
    canvas.addEventListener("mouseenter", () => {
      mouseInside = true;
      lastTime = 0;
    });
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      mouseInside = true;
      startFlap();
    }, { passive: false });
    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      endFlap();
    }, { passive: false });
    canvas.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!e.repeat) startFlap();
      }
    });
    canvas.addEventListener("keyup", (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") endFlap();
    });

    function update(dt) {
      if (!gameStarted || gameOver) return;
      if (!mouseInside) return;

      const holdElapsed = (performance.now() - holdingStart) / 1000;
      let g;
      if (bird.vy < 0 && isHolding && holdElapsed < HOLD_MAX_TIME) {
        g = GRAVITY_UP * HOLD_GRAVITY_MULT;
      } else if (bird.vy < 0) {
        g = GRAVITY_UP;
      } else {
        g = GRAVITY_DOWN;
      }

      bird.vy += g * dt;
      if (bird.vy > MAX_FALL_SPEED) bird.vy = MAX_FALL_SPEED;
      bird.y += bird.vy * dt;

      pipes.forEach((p) => (p.x -= WORLD_SPEED * dt));

      while (pipes.length && pipes[0].x + PIPE_WIDTH < 0) pipes.shift();
      const rightmost = pipes[pipes.length - 1];
      if (rightmost && rightmost.x < W - PIPE_SPACING) {
        spawnPipe(rightmost.x + PIPE_SPACING);
      }

      pipes.forEach((p) => {
        if (!p.passed && p.x + PIPE_WIDTH < bird.x) {
          p.passed = true;
          score++;
          updateHud();
        }
      });

      if (flapTimer > 0) flapTimer -= dt;

      particles.forEach((pt) => {
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.vy += 200 * S * dt;
        pt.life -= dt;
      });
      particles = particles.filter((pt) => pt.life > 0);

      const birdBox = {
        x: bird.x + HITBOX_INSET_X,
        y: bird.y + HITBOX_INSET_Y,
        w: BIRD_W - HITBOX_INSET_X * 2,
        h: BIRD_H - HITBOX_INSET_Y * 2,
      };
      if (birdBox.y < 0 || birdBox.y + birdBox.h > H) {
        die();
        return;
      }
      for (const p of pipes) {
        const upper = { x: p.x, y: 0, w: PIPE_WIDTH, h: p.gapY };
        const lower = {
          x: p.x,
          y: p.gapY + PIPE_GAP,
          w: PIPE_WIDTH,
          h: H - (p.gapY + PIPE_GAP),
        };
        if (hit(birdBox, upper) || hit(birdBox, lower)) {
          die();
          return;
        }
      }
    }

    function hit(a, b) {
      return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
      );
    }

    function die() {
      gameOver = true;
      if (score > best) {
        best = score;
        localStorage.setItem("flappy-best", best);
        updateHud();
      }
    }

    function getBirdSprite() {
      if (flapTimer > 0.1) return BIRD_SPRITES.wingUp;
      if (flapTimer > 0.05) return BIRD_SPRITES.wingMid;
      if (flapTimer > 0) return BIRD_SPRITES.wingDown;
      if (bird && bird.vy < -50 * S) return BIRD_SPRITES.wingUp;
      if (bird && bird.vy > 200 * S) return BIRD_SPRITES.wingDown;
      return BIRD_SPRITES.wingMid;
    }

    function drawAsciiBlock(lines, x, y, color) {
      ctx.fillStyle = color;
      ctx.font = `bold ${CHAR_H}px "Courier New", monospace`;
      ctx.textBaseline = "top";
      for (let r = 0; r < lines.length; r++) {
        ctx.fillText(lines[r], x, y + r * CHAR_H);
      }
    }

    function drawPipeColumn(x, y, h, upper) {
      const cols = Math.max(1, Math.floor(PIPE_WIDTH / CHAR_W));
      const rows = Math.floor(h / CHAR_H);
      if (rows <= 0) return;
      ctx.font = `bold ${CHAR_H}px "Courier New", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = getCss("--global-theme-color") || "#4ab";
      for (let r = 0; r < rows; r++) {
        let line = "";
        const isCap = upper ? r === rows - 1 : r === 0;
        for (let c = 0; c < cols; c++) {
          if (isCap) line += "=";
          else if (c === 0 || c === cols - 1) line += "|";
          else line += " ";
        }
        ctx.fillText(line, x, y + r * CHAR_H);
      }
    }

    function drawPipe(p) {
      drawPipeColumn(p.x, 0, p.gapY, true);
      drawPipeColumn(p.x, p.gapY + PIPE_GAP, H - (p.gapY + PIPE_GAP), false);
    }

    function drawHud() {
      const scoreSize = Math.max(18, 28 * S);
      ctx.textBaseline = "top";

      // Current score - top left
      ctx.fillStyle = getCss("--global-text-color") || "#eee";
      ctx.textAlign = "left";
      ctx.font = `bold ${scoreSize}px "Courier New", monospace`;
      ctx.fillText(String(score), 12 * S, 8 * S);

      // Best - top right, same font as score but lighter color
      ctx.fillStyle = getCss("--global-text-color-light") || "#aaa";
      ctx.textAlign = "right";
      ctx.fillText("best " + best, W - 12 * S, 8 * S);

      ctx.textAlign = "left";
    }

    function drawStart() {
      ctx.fillStyle = getCss("--global-text-color-light") || "#888";
      ctx.font = `bold ${FONT_START}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.fillText("[ click to begin ]", W / 2, H / 2 - 20 * S);
      ctx.font = `${FONT_HINT}px "Courier New", monospace`;
      ctx.fillText("hold longer = float higher", W / 2, H / 2 + 20 * S);
      ctx.textAlign = "left";
    }

    function drawPaused() {
      // Tint using the page bg color so it adapts to light/dark mode
      const bg = getCss("--global-bg-color") || "#fff";
      ctx.fillStyle = bg;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      ctx.fillStyle = getCss("--global-text-color-light") || "#999";
      ctx.font = `bold ${FONT_PAUSED}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.fillText("|| paused", W / 2, H / 2 - 10 * S);
      ctx.font = `${FONT_HINT}px "Courier New", monospace`;
      ctx.fillText("hover to resume", W / 2, H / 2 + 20 * S);
      ctx.textAlign = "left";
    }

    function drawGameOver() {
      const bg = getCss("--global-bg-color") || "#fff";
      ctx.fillStyle = bg;
      ctx.globalAlpha = 0.75;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;

      ctx.fillStyle = getCss("--global-text-color-light") || "#999";
      ctx.textAlign = "center";
      ctx.font = `bold ${Math.max(20, 32 * S)}px "Courier New", monospace`;
      ctx.fillText(`score: ${score}`, W / 2, H / 2 - 30 * S);
      ctx.font = `${Math.max(16, 22 * S)}px "Courier New", monospace`;
      ctx.fillText(`best: ${best}`, W / 2, H / 2 + 10 * S);
      ctx.fillText("[ click to retry ]", W / 2, H / 2 + 45 * S);
      ctx.textAlign = "left";
    }

    function render() {
      ctx.fillStyle = getCss("--global-bg-color") || "#111";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = getCss("--global-divider-color") || "#333";
      ctx.beginPath();
      ctx.moveTo(0, H - 1);
      ctx.lineTo(W, H - 1);
      ctx.stroke();

      // Dim everything (pipes, bird, hud) when paused (mouse outside during play)
      const paused = gameStarted && !gameOver && !mouseInside;
      if (paused) ctx.globalAlpha = 0.4;

      pipes.forEach(drawPipe);

      ctx.fillStyle = getCss("--global-theme-color") || "#4ab";
      ctx.font = `bold ${CHAR_H}px "Courier New", monospace`;
      particles.forEach((pt) => {
        ctx.globalAlpha = (paused ? 0.4 : 1) * Math.max(0, pt.life / 0.4);
        ctx.fillText(pt.char, pt.x, pt.y);
      });
      ctx.globalAlpha = paused ? 0.4 : 1;

      const sprite = getBirdSprite();
      const color = getCss("--global-text-color") || "#eee";
      drawAsciiBlock(sprite, bird.x, bird.y, color);

      // HUD: visible during active play AND while paused (semi-transparent via globalAlpha)
      if (gameStarted && !gameOver) drawHud();

      ctx.globalAlpha = 1;

      if (!gameStarted) drawStart();
      if (gameOver) drawGameOver();
      if (paused) drawPaused();
    }

    function loop(ts) {
      if (!lastTime) lastTime = ts;
      let dt = (ts - lastTime) / 1000;
      lastTime = ts;
      if (dt > 0.05) dt = 0.05;
      update(dt);
      render();
      requestAnimationFrame(loop);
    }

    reset();
    requestAnimationFrame(loop);
  }

  function initAll() {
    // Attach to the main canvas (flappy page)
    const mainCanvas = document.getElementById("flappy-canvas");
    if (mainCanvas) createFlappyGame(mainCanvas);

    // Attach to all canvases opted-in via data-flappy
    document.querySelectorAll("canvas[data-flappy]").forEach((c) => {
      if (c.id === "flappy-canvas") return; // already initialized
      createFlappyGame(c);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
