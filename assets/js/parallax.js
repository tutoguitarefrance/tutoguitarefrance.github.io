document.addEventListener("DOMContentLoaded", () => {
  const photos = document.querySelectorAll("[data-depth-photo]");

  if (!photos.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 840px)").matches;

  if (reduced || mobile) return;

  let ticking = false;

  function updateDepth() {
    photos.forEach((photo) => {
      const section = photo.closest("[data-depth-section]");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const speed = parseFloat(photo.dataset.speed || "0.18");

      const y = -rect.top * speed;

      photo.style.transform = `translate3d(0, calc(-50% + ${y}px), 0)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateDepth);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  updateDepth();
});
