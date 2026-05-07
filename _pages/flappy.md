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
</div>

<style>
  .flappy-wrapper {
    max-width: 800px;
    margin: 2rem auto;
    text-align: center;
  }

  .flappy-hud {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 0.25rem;
    margin-bottom: 0.5rem;
    font-family: "Courier New", monospace;
    color: var(--global-text-color-light);
  }

  .flappy-score {
    font-size: 2rem;
    font-weight: 700;
    color: var(--global-theme-color);
  }

  .flappy-best {
    font-size: 0.9rem;
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
</style>
