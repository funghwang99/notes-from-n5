(() => {
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touchline = document.querySelector('[data-touchline-progress]');
  const dribble = document.querySelector('[data-dribble-section]');
  const runner = document.querySelector('[data-garrincha-runner]');
  const ball = document.querySelector('[data-garrincha-ball]');
  const defenders = Array.from(document.querySelectorAll('[data-defender]'));
  const fade = document.querySelector('.garrincha-fade');

  const updatePageProgress = () => {
    if (!touchline) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
    touchline.style.height = `${progress * 100}%`;
  };

  const sectionProgress = (section) => {
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const travel = rect.height + window.innerHeight;
    return clamp((window.innerHeight - rect.top) / travel);
  };

  const updateDribble = () => {
    if (!dribble || !runner || reduceMotion) return;
    const p = sectionProgress(dribble);
    const corridor = dribble.getBoundingClientRect().height * 0.68;
    const weave = Math.sin(p * Math.PI * 6);
    const burst = Math.pow(p, 1.12);
    runner.style.setProperty('--runner-y', `${burst * corridor}px`);
    runner.style.setProperty('--runner-x', `${weave * 30}px`);
    runner.style.setProperty('--runner-r', `${weave * -9}deg`);
    if (ball) {
      ball.style.setProperty('--ball-y', `${burst * corridor * 1.015}px`);
      ball.style.setProperty('--ball-x', `${Math.sin(p * Math.PI * 6 + .55) * 24}px`);
    }

    defenders.forEach((defender, index) => {
      const center = [0.28, 0.51, 0.72][index] ?? 0.5;
      const distance = Math.abs(p - center);
      const attack = clamp(1 - distance / 0.11);
      const passed = p > center ? clamp((p - center) / 0.08) : 0;
      defender.style.setProperty('--def-x', `${attack * -36 + passed * 76}px`);
      defender.style.setProperty('--def-r', `${attack * 14 + passed * 42}deg`);
      defender.style.opacity = String(1 - passed * .45);
    });
  };

  const updateFade = () => {
    if (!fade) return;
    const p = sectionProgress(fade);
    fade.style.setProperty('--fade-color', String(1 - clamp(p * 1.3)));
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    updatePageProgress();
    updateDribble();
    updateFade();
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  const epitaph = document.querySelector('[data-epitaph]');
  if (epitaph && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('garrincha-at-home', entry.isIntersecting);
    }, { threshold: .45 });
    observer.observe(epitaph);
  }
})();
