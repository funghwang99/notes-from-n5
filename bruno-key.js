(() => {
  const page = document.querySelector('.bruno-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-bruno-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(100, Math.max(0, (scrollY / max) * 100))}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const scenes = [...document.querySelectorAll('[data-bruno-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.brunoScene = active.target.dataset.brunoScene || '';
    }, { rootMargin:'-23% 0px -48%', threshold:[.12,.35,.62] });
    scenes.forEach((section) => sceneObserver.observe(section));
  }

  const hero = document.querySelector('.bruno-hero');
  const heroImg = hero?.querySelector('.bruno-hero-photo img');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-turned'));
  if (hero && heroImg && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroImg.style.transform = `scale(1.045) translate(${x * -7}px,${y * -5}px)`;
    });
    hero.addEventListener('pointerleave', () => { heroImg.style.transform = 'scale(1.02)'; });
  }

  if (heroImg) {
    const figure = heroImg.closest('figure');
    const caption = figure?.querySelector('figcaption');
    const fallback = () => {
      if (heroImg.dataset.fallbackUsed) {
        if (figure) figure.classList.add('is-image-missing');
        heroImg.remove();
        if (caption) caption.textContent = 'Bruno Guimarães · tactical portrait';
        return;
      }
      heroImg.dataset.fallbackUsed = '1';
      heroImg.src = heroImg.dataset.fallbackSrc || '';
      heroImg.alt = 'Bruno Guimarães trong một buổi khởi động trước trận đấu năm 2026.';
      if (caption) caption.textContent = 'Bruno Guimarães · 2026 · Wikimedia Commons';
    };
    heroImg.addEventListener('error', fallback);
    if (heroImg.complete && heroImg.naturalWidth === 0) queueMicrotask(fallback);
  }

  const house = document.querySelector('.bruno-house');
  if (house) {
    const rooms = [...house.querySelectorAll('.bruno-room')];
    const lightRooms = () => rooms.forEach((room, index) => setTimeout(() => room.classList.add('is-lit'), reduced ? 0 : index * 180));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        lightRooms(); observer.disconnect();
      }, { threshold:.38 });
      observer.observe(house);
    } else lightRooms();
  }

  const orbit = document.querySelector('[data-bruno-orbit]');
  if (orbit) {
    const activate = () => orbit.classList.add('is-live');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activate(); observer.disconnect();
      }, { threshold:.45 });
      observer.observe(orbit);
    } else activate();
  }

  const engine = document.querySelector('[data-bruno-engine]');
  if (engine) {
    const rice = engine.querySelector('[data-engine-state="rice"]');
    const bruno = engine.querySelector('[data-engine-state="bruno"]');
    const runEngine = () => {
      if (reduced) return;
      let swapped = false;
      const tick = () => {
        if (!document.body.contains(engine)) return;
        swapped = !swapped;
        engine.classList.toggle('is-swapped', swapped);
        if (rice) rice.textContent = swapped ? 'GO' : 'HOLD';
        if (bruno) bruno.textContent = swapped ? 'HOLD' : 'GO';
      };
      tick();
      const id = setInterval(tick, 1700);
      const stop = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) return;
        clearInterval(id); stop.disconnect();
      }, { rootMargin:'120% 0px' });
      stop.observe(engine);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        runEngine(); observer.disconnect();
      }, { threshold:.45 });
      observer.observe(engine);
    }
  }

  const shapes = document.querySelector('[data-bruno-shapes]');
  if (shapes) {
    const labels = ['3—1—6','3—2—5','LEFT OVERLOAD','REST DEFENCE','TWO STRIKERS'];
    const stateLabel = shapes.querySelector('[data-shape-label]');
    const topState = shapes.querySelector('.bruno-shape-top span:last-child');
    const options = [...shapes.querySelectorAll('.bruno-shape-options span')];
    let state = 0;
    const setState = (next) => {
      state = next % labels.length;
      shapes.dataset.state = String(state);
      if (stateLabel) stateLabel.textContent = labels[state];
      if (topState) topState.textContent = `STATE 0${state + 1}/05`;
      options.forEach((item,index) => item.classList.toggle('is-current', index === state));
    };
    setState(0);
    if (!reduced && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        const id = setInterval(() => setState(state + 1), 1900);
        const off = new IntersectionObserver((watch) => {
          if (watch.some((entry) => entry.isIntersecting)) return;
          clearInterval(id); off.disconnect();
        }, { rootMargin:'70% 0px' });
        off.observe(shapes); observer.disconnect();
      }, { threshold:.48 });
      observer.observe(shapes);
    }
  }

  const leftMap = document.querySelector('[data-bruno-left]');
  const risk = document.querySelector('[data-bruno-risk]');
  const doors = document.querySelector('[data-bruno-doors]');
  const finish = document.querySelector('.bruno-finish');
  const oneShot = (element, className = 'is-live', threshold = .4) => {
    if (!element) return;
    const activate = () => element.classList.add(className);
    if (!('IntersectionObserver' in window)) { activate(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      activate(); observer.disconnect();
    }, { threshold });
    observer.observe(element);
  };
  oneShot(leftMap, 'is-live', .45);
  oneShot(risk, 'is-live', .4);
  oneShot(doors, 'is-live', .38);
  oneShot(finish, 'is-live', .28);
})();
