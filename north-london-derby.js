(() => {
  const page = document.querySelector('.nld-page');
  if (!page) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const rail = document.querySelector('[data-nld-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(100, Math.max(0, scrollY / max * 100))}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const scenes = [...document.querySelectorAll('[data-nld-scene]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const live = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (live) root.dataset.nldScene = live.target.dataset.nldScene || '';
    }, { rootMargin:'-22% 0px -50%', threshold:[.12,.34,.6] });
    scenes.forEach((node) => observer.observe(node));
  }

  const hero = document.querySelector('.nld-hero');
  const heroImg = hero?.querySelector('.nld-hero-photo img');
  if (hero && heroImg && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroImg.style.transform = `scale(1.045) translate(${x * -7}px,${y * -5}px)`;
    });
    hero.addEventListener('pointerleave', () => { heroImg.style.transform = 'scale(1.025)'; });
  }

  if (heroImg) {
    const figure = heroImg.closest('figure');
    const caption = figure?.querySelector('figcaption');
    const fallback = () => {
      if (heroImg.dataset.fallbackUsed) {
        heroImg.remove();
        if (figure) figure.classList.add('is-image-missing');
        if (caption) caption.textContent = 'North London Derby · archival image unavailable';
        return;
      }
      heroImg.dataset.fallbackUsed = '1';
      heroImg.src = heroImg.dataset.fallbackSrc || '';
      heroImg.alt = 'Hai đội trưởng Arsenal và Tottenham trước North London Derby tại White Hart Lane năm 2007.';
      heroImg.style.objectPosition = 'center 40%';
      if (caption) caption.textContent = 'White Hart Lane · 2007 · Wikimedia Commons';
    };
    heroImg.addEventListener('error', fallback);
    if (heroImg.complete && heroImg.naturalWidth === 0) queueMicrotask(fallback);
  }

  const map = document.querySelector('[data-nld-map]');
  if (map) {
    const activate = () => map.classList.add('is-live');
    if (!('IntersectionObserver' in window) || reduced) activate();
    else {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activate(); observer.disconnect();
      }, { threshold:.38 });
      observer.observe(map);
    }
  }

  const split = document.querySelector('.nld-split');
  if (split && !reduced) {
    let raf = 0;
    const draw = () => {
      raf = 0;
      const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, innerHeight * 1.1)));
      split.style.transform = `translateX(${progress * 7 - 3.5}px)`;
      split.style.opacity = String(.82 - progress * .22);
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(draw);
    };
    draw();
    addEventListener('scroll', schedule, { passive:true });
  }

  const oneShot = (selector, className = 'is-live', threshold = .35) => {
    const node = document.querySelector(selector);
    if (!node) return;
    const activate = () => node.classList.add(className);
    if (!('IntersectionObserver' in window)) { activate(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      activate(); observer.disconnect();
    }, { threshold });
    observer.observe(node);
  };

  oneShot('.nld-ballot');
  oneShot('.nld-city-grid');
  oneShot('.nld-generation');
  oneShot('.nld-era-strip');
  oneShot('.nld-finish', 'is-live', .2);
})();