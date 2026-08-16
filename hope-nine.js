(() => {
  if (!document.body.classList.contains('layout-nine')) return;

  const hero = document.querySelector('.nine-hero');
  const article = document.querySelector('.nine-article');
  const timeline = document.querySelector('.nine-timeline');
  const turn = document.querySelector('.nine-wembley');
  const release = document.querySelector('.nine-minute--winner');
  if (!hero || !article) return;

  if (!document.querySelector('.nine-compression-ruler')) {
    const ruler = document.createElement('section');
    ruler.className = 'nine-compression-ruler';
    ruler.setAttribute('aria-hidden', 'true');
    ruler.innerHTML = '<span class="from">2005</span><strong>3,283</strong><span class="to">2014 · one afternoon</span>';
    hero.after(ruler);
  }

  document.querySelectorAll('.nine-minute').forEach((node) => {
    const minute = node.querySelector('span')?.textContent?.trim();
    if (minute) node.dataset.ghost = minute;
  });

  const update = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * .9)));
    hero.style.setProperty('--nine-compress', String(1 - progress * .68));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === turn || entry.target === timeline) document.body.classList.add('nine-phase-turn');
        if (entry.target === release) document.body.classList.add('nine-phase-release');
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });
    [timeline, turn, release].filter(Boolean).forEach((node) => observer.observe(node));
  }
})();
