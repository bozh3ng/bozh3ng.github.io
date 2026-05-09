---
layout: default
permalink: /flappy/
title: flappy
nav: true
nav_order: 7
---

<div class="post">
  <div class="header-bar">
    <h1>ASCII Flappy</h1>
    <h2>Click and hold to flap. Release to fall.</h2>
  </div>

  <div class="flappy-wrapper">
    <canvas id="flappy-canvas" width="800" height="500" tabindex="0"></canvas>
    <div class="flappy-hint">Click to start · Hold longer to float higher</div>
  </div>

  <div class="game-section-divider"></div>

  <div class="header-bar">
    <h1>Reaction Time Test</h1>
    <h2>Five thumbs, one round. Click each the moment it lights up.</h2>
  </div>

  <div class="reflex-wrapper">
    <div class="reflex-stats">
      <div class="reflex-stat">
        <span class="reflex-stat-label">hit</span>
        <span class="reflex-stat-value" data-reflex-hits>0</span>
        <span class="reflex-stat-suffix">/5</span>
      </div>
      <div class="reflex-stat">
        <span class="reflex-stat-label">avg</span>
        <span class="reflex-stat-value" data-reflex-avg>—</span>
      </div>
      <div class="reflex-stat">
        <span class="reflex-stat-label">best</span>
        <span class="reflex-stat-value" data-reflex-best>—</span>
      </div>
    </div>

    <div class="reflex-board" data-reflex-board>
      <button class="reflex-thumb" data-reflex-thumb="0" aria-label="Thumb 1">
        <i class="fa-solid fa-thumbs-up"></i>
      </button>
      <button class="reflex-thumb" data-reflex-thumb="1" aria-label="Thumb 2">
        <i class="fa-solid fa-thumbs-up"></i>
      </button>
      <button class="reflex-thumb" data-reflex-thumb="2" aria-label="Thumb 3">
        <i class="fa-solid fa-thumbs-up"></i>
      </button>
      <button class="reflex-thumb" data-reflex-thumb="3" aria-label="Thumb 4">
        <i class="fa-solid fa-thumbs-up"></i>
      </button>
      <button class="reflex-thumb" data-reflex-thumb="4" aria-label="Thumb 5">
        <i class="fa-solid fa-thumbs-up"></i>
      </button>
    </div>

    <div class="reflex-controls">
      <button class="reflex-start" data-reflex-start>Start round</button>
      <div class="reflex-hint">
        A random thumb lights up every 0.3–0.5 s. Click it before it fades (1 s).
      </div>
    </div>
  </div>
</div>

<style>
  .flappy-wrapper {
    max-width: 800px;
    margin: 2rem auto;
    text-align: center;
  }

  #flappy-canvas {
    display: block;
    width: 100%;
    max-width: 800px;
    height: auto;
    aspect-ratio: 8 / 5;
    background: var(--global-bg-color);
    border: 2px solid var(--global-divider-color);
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    image-rendering: pixelated;
  }

  #flappy-canvas:focus {
    border-color: var(--global-theme-color);
  }

  .flappy-hint {
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: var(--global-text-color-light);
    font-style: italic;
  }

  .game-section-divider {
    max-width: 800px;
    margin: 3rem auto;
    border-top: 1px solid var(--global-divider-color);
  }

  .reflex-wrapper {
    max-width: 600px;
    margin: 2rem auto;
    text-align: left;
  }

  .reflex-stats {
    display: flex;
    gap: 2.5rem;
    margin-bottom: 1.5rem;
    font-family: "Courier New", monospace;
  }

  .reflex-stat {
    display: flex;
    flex-direction: column;
    color: var(--global-text-color-light);
  }

  .reflex-stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .reflex-stat-value {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--global-text-color);
    font-variant-numeric: tabular-nums;
  }

  .reflex-stat-suffix {
    font-size: 0.8rem;
    color: var(--global-text-color-light);
  }

  .reflex-board {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
  }

  .reflex-thumb {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 2px solid var(--global-divider-color);
    border-radius: 12px;
    color: var(--global-text-color-light);
    font-size: 1.5rem;
    cursor: pointer;
    position: relative;
    overflow: visible;
    transition:
      background 0.1s ease,
      border-color 0.1s ease,
      color 0.1s ease,
      box-shadow 0.1s ease;
  }

  .reflex-thumb:hover:not(:disabled) {
    border-color: var(--global-theme-color);
  }

  .reflex-thumb:disabled {
    cursor: default;
  }

  .reflex-thumb.lit {
    background: var(--global-theme-color);
    border-color: var(--global-theme-color);
    color: white;
    box-shadow: 0 0 20px -4px var(--global-theme-color);
  }

  .reflex-thumb.hit i {
    animation: thumb-pop-fast 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .reflex-thumb .thumb-heart {
    animation:
      reflex-spray-x 0.9s ease-out forwards,
      reflex-spray-y 0.9s ease-in forwards;
    will-change: transform, opacity;
  }

  /* Horizontal: launched fast to the right, decelerates from air drag (ease-out). */
  @keyframes reflex-spray-x {
    0% {
      translate: 0 0;
    }
    100% {
      translate: var(--reflex-dx, 120px) 0;
    }
  }

  /* Vertical: starts at rest, buoyancy accelerates it upward (ease-in).
     Only goes up — never falls. Fades out as it rises. */
  @keyframes reflex-spray-y {
    0% {
      transform: translateY(0) scale(0.6);
      opacity: 0;
    }
    15% {
      transform: translateY(-6px) scale(0.9);
      opacity: 1;
    }
    100% {
      transform: translateY(var(--reflex-rise, -120px)) scale(1.1);
      opacity: 0;
    }
  }

  @keyframes thumb-pop-fast {
    0% {
      transform: scale(1) rotate(0deg);
    }
    40% {
      transform: scale(1.4) rotate(-15deg);
    }
    70% {
      transform: scale(0.9) rotate(8deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  .reflex-thumb.miss {
    animation: reflex-miss 0.22s ease-out;
  }

  @keyframes reflex-miss {
    0%,
    100% {
      transform: translateX(0);
    }
    30% {
      transform: translateX(-5px);
    }
    70% {
      transform: translateX(5px);
    }
  }

  .reflex-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .reflex-start {
    padding: 0.6rem 1.8rem;
    background: var(--global-theme-color);
    border: none;
    border-radius: 2rem;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      transform 0.12s ease,
      opacity 0.2s ease;
  }

  .reflex-start:hover {
    transform: translateY(-1px);
  }

  .reflex-start:active {
    transform: scale(0.96);
  }

  .reflex-start:disabled {
    opacity: 0.5;
    cursor: default;
    transform: none;
  }

  .reflex-hint {
    font-size: 0.85rem;
    color: var(--global-text-color-light);
    font-style: italic;
  }
</style>

<script src="{{ '/assets/js/reflex.js' | relative_url }}"></script>
