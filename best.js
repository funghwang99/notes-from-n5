(() => {
  const page = document.querySelector('.best-page');
  if (!page) return;
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-best-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(1, Math.max(0, scrollY / max)) * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const sections = [...document.querySelectorAll('[data-best-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.bestScene = active.target.dataset.bestScene || '';
    }, { rootMargin:'-24% 0px -46%', threshold:[.15,.4,.7] });
    sections.forEach(section => sceneObserver.observe(section));
  }

  const flash = document.querySelector('[data-best-flash]');
  if (flash) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          flash.classList.add('is-fired');
          observer.disconnect();
        }
      }, { threshold:.48 });
      observer.observe(flash);
    } else flash.classList.add('is-fired');
  }

  const extra = document.querySelector('[data-best-extra]');
  if (extra) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          extra.classList.add('is-running');
          observer.disconnect();
        }
      }, { threshold:.48 });
      observer.observe(extra);
    } else extra.classList.add('is-running');
  }

  const hero = document.querySelector('.best-hero');
  const heroImage = hero?.querySelector('img');
  if (hero && heroImage && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroImage.style.transform = `scale(1.045) translate(${x * -8}px, ${y * -6}px)`;
    });
    hero.addEventListener('pointerleave', () => { heroImage.style.transform = ''; });
  }

  const numbers = [...document.querySelectorAll('.best-number-wall strong')];
  const animateNumber = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.textContent.trim());
    if (!Number.isFinite(target) || reduced) return;
    const start = performance.now();
    const duration = 900;
    const draw = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(draw);
      else el.textContent = String(target);
    };
    requestAnimationFrame(draw);
  };
  if ('IntersectionObserver' in window) {
    const numberObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateNumber(entry.target);
        numberObserver.unobserve(entry.target);
      });
    }, { threshold:.65 });
    numbers.forEach(n => numberObserver.observe(n));
  }
})();