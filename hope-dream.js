(() => {
  if (!document.body.classList.contains('layout-dream')) return;

  const body = document.body;
  const article = document.querySelector('.dream-body');
  const bournemouth = document.querySelector('.dream-bournemouth');
  const ending = document.querySelector('.dream-ending');
  if (!article) return;

  const update = () => {
    if (window.innerWidth <= 640) {
      body.style.setProperty('--dream-copy-width', 'calc(100% - 2rem)');
      body.style.setProperty('--dream-glow', '1');
      return;
    }

    const rect = article.getBoundingClientRect();
    const travelled = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
    const width = 34 + travelled * 20;
    body.style.setProperty('--dream-copy-width', `${width.toFixed(2)}rem`);
    body.style.setProperty('--dream-glow', travelled.toFixed(3));
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === bournemouth) body.classList.toggle('dream-is-open', entry.isIntersecting);
        if (entry.target === ending && entry.isIntersecting) body.classList.add('dream-is-settled');
      });
    }, { rootMargin: '-18% 0px -30% 0px', threshold: .08 });
    [bournemouth, ending].filter(Boolean).forEach((node) => observer.observe(node));
  }
})();
