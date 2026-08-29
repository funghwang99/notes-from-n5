(() => {
  const page = document.querySelector('.best-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-best-runline]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    rail.style.height = `${progress * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const sceneSections = [...document.querySelectorAll('[data-best-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.bestScene = active.target.dataset.bestScene || '';
    }, { rootMargin:'-24% 0px -46%', threshold:[.12,.35,.62] });
    sceneSections.forEach((section) => sceneObserver.observe(section));
  }

  const hero = document.querySelector('.best-hero');
  const heroImage = hero?.querySelector('.best-hero-photo img');
  if (hero && heroImage && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroImage.style.transform = `scale(1.04) translate(${x * -7}px, ${y * -5}px)`;
    });
    hero.addEventListener('pointerleave', () => {
      heroImage.style.transform = 'scale(1.025)';
    });
  }

  const move = document.querySelector('[data-best-move]');
  if (move) {
    if ('IntersectionObserver' in window) {
      const moveObserver = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        move.classList.add('is-running');
        moveObserver.disconnect();
      }, { threshold:.45 });
      moveObserver.observe(move);
    } else {
      move.classList.add('is-running');
    }
  }

  const counters = [...document.querySelectorAll('[data-best-count]')];
  const animateCount = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.bestCount || el.textContent.trim());
    if (!Number.isFinite(target) || reduced) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 780;
    const draw = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(draw);
      else el.textContent = String(target);
    };
    requestAnimationFrame(draw);
  };

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold:.6 });
    counters.forEach((counter) => countObserver.observe(counter));
  } else {
    counters.forEach(animateCount);
  }
})();