(() => {
  const page = document.querySelector('.adams-page');
  if (!page) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const rail = document.querySelector('[data-adams-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(100, Math.max(0, scrollY / max * 100))}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const hero = document.querySelector('.adams-hero');
  const heroImg = hero?.querySelector('.adams-hero-photo img');
  if (heroImg) {
    const figure = heroImg.closest('figure');
    const caption = figure?.querySelector('figcaption');
    const fallback = () => {
      if (!heroImg.dataset.fallbackUsed) {
        heroImg.dataset.fallbackUsed = '1';
        heroImg.src = heroImg.dataset.fallbackSrc || '';
        heroImg.alt = 'Tượng Tony Adams bên ngoài Emirates Stadium.';
        heroImg.style.objectPosition = 'center 24%';
        if (caption) caption.textContent = 'Tony Adams Statue · Emirates Stadium · Wikimedia Commons';
        return;
      }
      figure?.classList.add('is-image-missing');
      heroImg.remove();
    };
    heroImg.addEventListener('error', fallback);
    if (heroImg.complete && heroImg.naturalWidth === 0) queueMicrotask(fallback);

    if (!reduced && hero) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        heroImg.style.transform = `scale(1.055) translate(${x * -8}px,${y * -5}px)`;
      });
      hero.addEventListener('pointerleave', () => { heroImg.style.transform = 'scale(1.035)'; });
    }
  }

  const statueImg = document.querySelector('.adams-statue img');
  if (statueImg) {
    statueImg.addEventListener('error', () => {
      const figure = statueImg.closest('figure');
      figure?.classList.add('is-image-missing');
      statueImg.remove();
    }, { once:true });
  }

  const scenes = [...document.querySelectorAll('[data-adams-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.adamsScene = active.target.dataset.adamsScene || '';
    }, { rootMargin:'-20% 0px -48%', threshold:[.12,.35,.6] });
    scenes.forEach((section) => sceneObserver.observe(section));
  }

  const ship = document.querySelector('[data-adams-ship]');
  if (ship) {
    const planks = [...ship.querySelectorAll('[data-plank]')];
    const counter = ship.querySelector('[data-plank-count]');
    let timers = [];
    const reset = () => {
      timers.forEach(clearTimeout); timers = [];
      planks.forEach((plank) => plank.classList.remove('is-replaced'));
      if (counter) counter.textContent = `0 / ${planks.length}`;
    };
    const run = () => {
      reset();
      planks.forEach((plank,index) => {
        const id = setTimeout(() => {
          plank.classList.add('is-replaced');
          if (counter) counter.textContent = `${index + 1} / ${planks.length}`;
        }, reduced ? 0 : 360 + index * 310);
        timers.push(id);
      });
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        run(); observer.disconnect();
      }, { threshold:.38 });
      observer.observe(ship);
    } else run();
  }

  const backFour = document.querySelector('[data-back-four]');
  if (backFour) {
    const activate = () => backFour.classList.add('is-live');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setTimeout(activate, reduced ? 0 : 260); observer.disconnect();
      }, { threshold:.42 });
      observer.observe(backFour);
    } else activate();
  }

  const twoArsenals = document.querySelector('[data-two-arsenals]');
  if (twoArsenals && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      twoArsenals.classList.add('is-live'); observer.disconnect();
    }, { threshold:.35 });
    observer.observe(twoArsenals);
  }

  const goal = document.querySelector('[data-goal-run]');
  if (goal) {
    const beats = [...goal.querySelectorAll(':scope > span')];
    const run = () => beats.forEach((beat,index) => setTimeout(() => beat.classList.add('is-live'), reduced ? 0 : index * 440));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        run(); observer.disconnect();
      }, { threshold:.4 });
      observer.observe(goal);
    } else run();
  }
})();