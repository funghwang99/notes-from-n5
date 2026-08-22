(() => {
  const page = document.querySelector('.muller-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const buildArchiveAction = () => {
    const mexico = document.querySelector('.bomber-mexico');
    const tenGrid = mexico?.querySelector('.bomber-ten-grid');
    if (!mexico || !tenGrid || mexico.querySelector('.bomber-action-archive')) return;

    const style = document.createElement('style');
    style.textContent = '.bomber-action-archive{position:relative;width:min(1120px,calc(100% - 3rem));height:min(62vw,42rem);margin:0 auto 5rem;overflow:hidden}.bomber-action-archive img{width:100%;height:100%;object-fit:cover;object-position:center 36%;filter:grayscale(1) contrast(1.14) brightness(.76);transform:scale(1.015)}.bomber-action-archive:after{position:absolute;inset:0;background:linear-gradient(90deg,rgba(12,11,10,.15),transparent 46%,rgba(211,30,44,.09)),linear-gradient(0deg,rgba(12,11,10,.62),transparent 42%);content:""}.bomber-action-archive figcaption{position:absolute;z-index:2;right:1rem;bottom:1rem;color:#d6cec3;font-size:.54rem;letter-spacing:.11em;text-transform:uppercase}@media(max-width:700px){.bomber-action-archive{height:68svh}}';
    document.head.append(style);

    const figure = document.createElement('figure');
    figure.className = 'bomber-action-archive reveal';
    figure.innerHTML = '<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Sparta%20tegen%20Bayern%20M%C3%BCnchen%201-3%20Muller%20%28midden%29%20spring%20hoger%20dan%20Eykenbroek%20en%20%2C%20Bestanddeelnr%20924-0809.jpg?width=1800" alt="Gerd Müller tranh chấp trên không cho Bayern Munich năm 1970." loading="lazy" decoding="async" /><figcaption>Rotterdam · 09.12.1970 · Nationaal Archief / Anefo</figcaption>';
    tenGrid.insertAdjacentElement('afterend', figure);
    requestAnimationFrame(() => figure.classList.add('is-visible'));
  };
  buildArchiveAction();

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
