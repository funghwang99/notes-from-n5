(() => {
  const page = document.querySelector('.muller-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-bomber-distance]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(1, Math.max(0, scrollY / max)) * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const heroPhoto = document.querySelector('.bomber-hero-photo');
  if (heroPhoto && !reduced) {
    heroPhoto.addEventListener('pointermove', (event) => {
      const rect = heroPhoto.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroPhoto.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${y * -4}deg)`;
    });
    heroPhoto.addEventListener('pointerleave', () => { heroPhoto.style.transform = ''; });
  }

  const ball = document.querySelector('[data-bomber-ball]');
  const boxSection = document.querySelector('.bomber-box-section');
  const updateBall = () => {
    if (!ball || !boxSection) return;
    const rect = boxSection.getBoundingClientRect();
    const total = rect.height + innerHeight;
    const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / total));
    const x = 18 + progress * 40;
    const y = 24 + progress * 56;
    ball.style.left = `${x}%`;
    ball.style.top = `${y}%`;
  };
  updateBall();
  addEventListener('scroll', updateBall, { passive:true });
  addEventListener('resize', updateBall, { passive:true });

  const sceneSections = [...document.querySelectorAll('[data-bomber-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.bomberScene = active.target.dataset.bomberScene || '';
    }, { rootMargin:'-26% 0px -44%', threshold:[.14,.38,.7] });
    sceneSections.forEach(section => sceneObserver.observe(section));
  }

  const moment = document.querySelector('[data-bomber-43]');
  const tick = document.querySelector('[data-bomber-tick]');
  const frames = [...document.querySelectorAll('[data-bomber-frame]')];
  let played = false;

  const play43 = () => {
    if (played || !moment) return;
    played = true;
    if (reduced) {
      if (tick) tick.textContent = '03';
      frames.forEach(frame => frame.classList.add('is-active'));
      moment.classList.add('is-goal');
      return;
    }
    frames.forEach((frame,index) => {
      setTimeout(() => {
        frame.classList.add('is-active');
        if (tick) tick.textContent = String(index + 1).padStart(2,'0');
        if (index === frames.length - 1) setTimeout(() => moment.classList.add('is-goal'), 260);
      }, index * 720);
    });
  };

  if ('IntersectionObserver' in window && moment) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        play43();
        observer.disconnect();
      }
    }, { threshold:.42 });
    observer.observe(moment);
  } else play43();
})();
