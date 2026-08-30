(() => {
  const page = document.querySelector('.moore-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-moore-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    rail.style.height = `${progress * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const sections = [...document.querySelectorAll('[data-moore-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.mooreScene = active.target.dataset.mooreScene || '';
    }, { rootMargin:'-24% 0px -46%', threshold:[.12,.35,.62] });
    sections.forEach((section) => sceneObserver.observe(section));
  }

  const hero = document.querySelector('.moore-hero');
  const heroImage = hero?.querySelector('.moore-hero-photo img');
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

  const sequences = [document.querySelector('.moore-free-kick'), document.querySelector('.moore-last-pass')].filter(Boolean);
  if ('IntersectionObserver' in window) {
    const sequenceObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-running');
        sequenceObserver.unobserve(entry.target);
      });
    }, { threshold:.45 });
    sequences.forEach((sequence) => sequenceObserver.observe(sequence));
  } else {
    sequences.forEach((sequence) => sequence.classList.add('is-running'));
  }

  const tackle = document.querySelector('[data-moore-tackle]');
  if (tackle) {
    if ('IntersectionObserver' in window) {
      const tackleObserver = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        tackle.classList.add('is-running');
        tackleObserver.disconnect();
      }, { threshold:.5 });
      tackleObserver.observe(tackle);
    } else {
      tackle.classList.add('is-running');
    }
  }

  const useFallback = (img) => {
    const figure = img.closest('figure');
    const caption = figure?.querySelector('figcaption');
    const fallback = img.dataset.fallbackSrc;
    if (!fallback || img.dataset.fallbackUsed) {
      if (figure) figure.hidden = true;
      return;
    }
    img.dataset.fallbackUsed = '1';
    img.src = fallback;
    if (img.dataset.fallbackAlt) img.alt = img.dataset.fallbackAlt;
    if (caption && img.dataset.fallbackCaption) caption.textContent = img.dataset.fallbackCaption;
    if (figure) figure.classList.add('is-fallback');
  };

  document.querySelectorAll('img[data-fallback-src]').forEach((img) => {
    img.addEventListener('error', () => useFallback(img));
    if (img.complete && img.naturalWidth === 0) queueMicrotask(() => useFallback(img));
  });

  const counters = [...document.querySelectorAll('[data-moore-count]')];
  const animateCounter = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.mooreCount || el.textContent.trim());
    if (!Number.isFinite(target) || reduced) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 820;
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
})();