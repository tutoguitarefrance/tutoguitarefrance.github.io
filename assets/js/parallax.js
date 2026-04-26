(() => {
  const isReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  if (isReduced || isCoarse) return;

  const layers = Array.from(document.querySelectorAll('[data-parallax-layer]'));
  if (!layers.length) return;

  let raf = 0;

  const update = () => {
    raf = 0;
    const vh = window.innerHeight || 1;

    for (const el of layers) {
      const rect = el.getBoundingClientRect();
      const speedAttr = el.getAttribute('data-speed');
      const speed = speedAttr ? Number(speedAttr) : 0.2;
      const progress = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
      const y = -progress * 80 * speed;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    }
  };

  const requestUpdate = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();
