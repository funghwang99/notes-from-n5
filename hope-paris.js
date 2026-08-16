(() => {
  if (!document.body.classList.contains('layout-waiting')) return;

  const hero = document.querySelector('.waiting-hero');
  const body = document.querySelector('.waiting-body');
  const bridge = document.querySelector('.waiting-bridge');
  if (!hero || !body) return;

  const door = document.createElement('div');
  door.className = 'paris-door';
  door.setAttribute('aria-hidden', 'true');
  door.innerHTML = '<span class="paris-door-panel paris-door-panel--left"></span><span class="paris-door-panel paris-door-panel--right"></span><span class="paris-door-slit"></span><span class="paris-door-label">Paris · 17 May 2006</span>';
  hero.append(door);

  const clock = document.createElement('div');
  clock.className = 'paris-clock';
  clock.setAttribute('aria-hidden', 'true');
  clock.innerHTML = ['18′','37′','76′','81′','FT'].map((t) => `<span data-paris-time="${t}">${t}<i></i></span>`).join('');
  document.body.append(clock);

  if (bridge && !bridge.querySelector('.paris-corridor')) {
    const corridor = document.createElement('div');
    corridor.className = 'paris-corridor reveal is-visible';
    corridor.setAttribute('aria-hidden', 'true');
    corridor.innerHTML = ['2006','2010','2014','2018','2022','2026'].map((year) => `<span>${year}</span>`).join('');
    bridge.prepend(corridor);
  }

  const markers = [
    { node: document.querySelector('.waiting-quote'), time: '18′' },
    { node: document.querySelectorAll('.waiting-marker')[1], time: '37′' },
    { node: document.querySelector('.waiting-figure--chance'), time: '76′' },
    { node: document.querySelector('.waiting-figure--after'), time: '81′' },
    { node: bridge, time: 'FT' },
  ].filter((item) => item.node);

  const activate = (time) => {
    clock.querySelectorAll('span').forEach((item) => item.classList.toggle('is-active', item.dataset.parisTime === time));
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = markers.find((marker) => marker.node === entry.target);
          if (item) activate(item.time);
        }
      });
    }, { rootMargin: '-32% 0px -52% 0px', threshold: 0 });
    markers.forEach((item) => observer.observe(item.node));
  }

  const update = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * .92)));
    const maxGap = Math.min(window.innerWidth * .22, 260);
    hero.style.setProperty('--paris-door-gap', `${4 + progress * maxGap}px`);

    const bodyRect = body.getBoundingClientRect();
    const on = bodyRect.top < window.innerHeight * .7 && bodyRect.bottom > window.innerHeight * .25;
    document.body.classList.toggle('paris-clock-on', on && window.innerWidth > 900);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();
