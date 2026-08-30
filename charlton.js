(() => {
  const page = document.querySelector('.charlton-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-charlton-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    rail.style.height = `${progress * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const sections = [...document.querySelectorAll('[data-charlton-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.charltonScene = active.target.dataset.charltonScene || '';
    }, { rootMargin:'-24% 0px -46%', threshold:[.12,.35,.62] });
    sections.forEach((section) => sceneObserver.observe(section));
  }

  document.querySelectorAll('img[data-fallback-src]').forEach((img) => {
    const fallback = img.dataset.fallbackSrc;
    if (!fallback) return;
    img.addEventListener('error', () => {
      if (img.dataset.fallbackUsed) {
        const figure = img.closest('figure');
        if (figure) figure.hidden = true;
        return;
      }
      img.dataset.fallbackUsed = '1';
      img.src = fallback;
    });
  });

  const finalSequence = document.querySelector('[data-charlton-final]');
  if (finalSequence) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        finalSequence.classList.add('is-running');
        observer.disconnect();
      }, { threshold:.5 });
      observer.observe(finalSequence);
    } else {
      finalSequence.classList.add('is-running');
    }
  }

  const counters = [...document.querySelectorAll('[data-charlton-count]')];
  const animateCounter = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.charltonCount || el.textContent.trim());
    if (!Number.isFinite(target) || reduced) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 850;
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

  const hero = document.querySelector('.charlton-hero');
  const heroImage = hero?.querySelector('.charlton-hero-photo img');
  if (hero && heroImage && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroImage.style.transform = `scale(1.04) translate(${x * -6}px, ${y * -4}px)`;
    });
    hero.addEventListener('pointerleave', () => {
      heroImage.style.transform = 'scale(1.02)';
    });
  }
})();