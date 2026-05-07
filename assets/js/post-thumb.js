// Thumb button for posts: toggle like state, persist in localStorage,
// play a small heart animation when liking.
(function () {
  const STORAGE_KEY = "post-likes";

  function loadLikes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveLikes(likes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
    } catch (e) {
      // ignore storage errors
    }
  }

  function spawnHearts(button) {
    const container = button.parentElement;
    const rect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const centerX = rect.left - containerRect.left + rect.width / 2;
    const centerY = rect.top - containerRect.top + rect.height / 2;

    const icons = ["❤", "✨", "👍", "💫", "⭐"];
    const count = 5;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "thumb-heart";
      heart.textContent = icons[Math.floor(Math.random() * icons.length)];

      const offsetX = (Math.random() - 0.5) * 60;
      heart.style.left = centerX + offsetX + "px";
      heart.style.top = centerY - 10 + "px";
      heart.style.animationDelay = i * 60 + "ms";

      container.appendChild(heart);
      setTimeout(() => heart.remove(), 1200);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".post-thumb-button");
    if (!button) return;

    const postUrl = button.dataset.postUrl;
    const countEl = button.querySelector(".post-thumb-count");
    const iconEl = button.querySelector("i");
    const likes = loadLikes();

    const liked = !!likes[postUrl];
    if (liked) {
      button.classList.add("liked");
      iconEl.classList.remove("fa-regular");
      iconEl.classList.add("fa-solid");
      countEl.textContent = "1";
    }

    button.addEventListener("click", function () {
      const currentLikes = loadLikes();
      const isLiked = !!currentLikes[postUrl];

      if (isLiked) {
        delete currentLikes[postUrl];
        button.classList.remove("liked");
        iconEl.classList.remove("fa-solid");
        iconEl.classList.add("fa-regular");
        countEl.textContent = "0";
      } else {
        currentLikes[postUrl] = true;
        button.classList.add("liked");
        iconEl.classList.remove("fa-regular");
        iconEl.classList.add("fa-solid");
        countEl.textContent = "1";
        spawnHearts(button);
      }

      saveLikes(currentLikes);
    });
  });
})();
