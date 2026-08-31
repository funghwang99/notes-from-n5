(() => {
  const page = document.querySelector('.baresi-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-baresi-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    rail.style.height = `${progress * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const sections = [...document.querySelectorAll('[data-baresi-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.baresiScene = active.target.dataset.baresiScene || '';
    }, { rootMargin:'-24% 0px -46%', threshold:[.12,.35,.62] });
    sections.forEach((section) => sceneObserver.observe(section));
  }

  const line = document.querySelector('[data-baresi-line]');
  if (line) {
    const activateLine = () => line.classList.add('is-stepping');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (reduced) {
          activateLine();
          observer.disconnect();
          return;
        }
        setTimeout(activateLine, 280);
        observer.disconnect();
      }, { threshold:.5 });
      observer.observe(line);
    } else {
      activateLine();
    }
  }

  const counters = [...document.querySelectorAll('[data-baresi-count]')];
  const animateCounter = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.baresiCount || el.textContent.trim());
    if (!Number.isFinite(target) || reduced) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 900;
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
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold:.6 });
    counters.forEach((counter) => countObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  const hero = document.querySelector('.baresi-hero');
  const heroImage = hero?.querySelector('.baresi-hero-photo img');
  if (hero && heroImage && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroImage.style.transform = `rotate(-1.5deg) scale(1.025) translate(${x * -5}px, ${y * -4}px)`;
    });
    hero.addEventListener('pointerleave', () => {
      heroImage.style.transform = 'rotate(-1.5deg) scale(1.01)';
    });
  }
})();
