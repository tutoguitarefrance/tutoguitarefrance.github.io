(function () {
  const btn = document.querySelector('.menuBtn');
  const nav = document.querySelector('.nav');
  if (!btn || !nav) return;

  if (window.matchMedia('(max-width: 768px)').matches) {
    document.body.appendChild(nav);
  }

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(!nav.classList.contains('is-open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
  });
})();
