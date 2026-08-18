(() => {
  const root = document.querySelector('.pele-page');
  if (!root) return;
  root.classList.add('pele-signal-mode');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const localProgress = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
  };

  const ui = document.createElement('aside');
  ui.className = 'pele-broadcast-ui';
  ui.setAttribute('aria-hidden', 'true');
  ui.innerHTML = '<div class="pele-broadcast-top"><span>N5 WORLD FEED</span><span>CH 10</span></div><div class="pele-broadcast-state">SEARCHING</div><div class="pele-broadcast-bottom"><span>PELÉ</span><span>O REI</span></div>';
  document.body.append(ui);
  const uiState = ui.querySelector('.pele-broadcast-state');

  const hero = document.querySelector('.pele-hero');
  if (hero) {
    const tuner = document.createElement('div');
    tuner.className = 'pele-tuner';
    tuner.setAttribute('aria-hidden', 'true');
    tuner.innerHTML = '<div class="pele-tuner-track"><span class="pele-tuner-dot"></span></div><div class="pele-tuner-copy"><span>SEARCH</span><span>SIGNAL</span><span>LOCK</span></div>';
    hero.append(tuner);
  }
  const tunerDot = document.querySelector('.pele-tuner-dot');

  const namingStage = document.querySelector('.pele-naming-stage');
  if (namingStage && !namingStage.querySelector('.pele-signal-lock')) {
    const lock = document.createElement('div');
    lock.className = 'pele-signal-lock';
    lock.textContent = 'SIGNAL ACQUIRED · 1958';
    namingStage.append(lock);
  }

  const travel = document.querySelector('.pele-travel');
  let transmissionMap = null;
  if (travel && !travel.querySelector('.pele-transmission-map')) {
    transmissionMap = document.createElement('div');
    transmissionMap.className = 'pele-transmission-map reveal is-visible';
    transmissionMap.setAttribute('aria-hidden', 'true');
    transmissionMap.innerHTML = [
      '<div class="pele-signal-origin">10<small>SANTOS / BRAZIL</small></div>',
      '<div class="pele-signal-node pele-signal-node--europe"><span>EUROPE</span><small>SIGNAL RECEIVED</small></div>',
      '<div class="pele-signal-node pele-signal-node--africa"><span>AFRICA</span><small>SIGNAL RECEIVED</small></div>',
      '<div class="pele-signal-node pele-signal-node--south"><span>SOUTH AMERICA</span><small>SIGNAL RECEIVED</small></div>',
      '<i class="pele-beam pele-beam--europe"></i><i class="pele-beam pele-beam--africa"></i><i class="pele-beam pele-beam--south"></i>'
    ].join('');
    const photo = travel.querySelector('.pele-travel-photo');
    if (photo) photo.before(transmissionMap); else travel.append(transmissionMap);
  } else transmissionMap = travel?.querySelector('.pele-transmission-map') || null;

  const bodySection = document.querySelector('.pele-body');
  if (bodySection && !bodySection.querySelector('.pele-interference')) {
    const interference = document.createElement('div');
    interference.className = 'pele-interference';
    interference.setAttribute('aria-hidden', 'true');
    interference.innerHTML = '<i></i><i></i><i></i><i></i>';
    bodySection.prepend(interference);
    const error = document.createElement('div');
    error.className = 'pele-signal-error reveal is-visible';
    error.innerHTML = '1962 / 1966 &nbsp;·&nbsp; <strong>SIGNAL INTERRUPTED</strong> &nbsp;·&nbsp; O REI STILL ON AIR';
    const divider = bodySection.querySelector('.pele-body-divider');
    if (divider) divider.before(error); else bodySection.append(error);
  }
  const interferenceBars = Array.from(document.querySelectorAll('.pele-interference i'));

  const mexico = document.querySelector('.pele-mexico');
  if (mexico && !mexico.querySelector('.pele-mexico-lock')) {
    const lock = document.createElement('div');
    lock.className = 'pele-mexico-lock reveal is-visible';
    lock.innerHTML = '<span>MEXICO · 1970</span><strong>SIGNAL LOCKED</strong><span>WORLD CUP · FINAL TRANSMISSION</span>';
    const title = mexico.querySelector('.pele-section-title');
    if (title) title.before(lock); else mexico.prepend(lock);
  }

  document.querySelectorAll('.pele-relic').forEach((relic, index) => {
    if (relic.querySelector('.pele-replay-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'pele-replay-bar';
    bar.innerHTML = `<span>REPLAY ${String(index + 1).padStart(2, '0')}</span><strong>NO GOAL</strong><span>MEMORY RETAINED</span>`;
    const visual = relic.querySelector('.pele-relic-goal, .pele-relic-run');
    if (visual) visual.before(bar); else relic.append(bar);
  });

  const azteca = document.querySelector('.pele-azteca');
  if (azteca && !azteca.querySelector('.pele-live-tag')) {
    const live = document.createElement('div');
    live.className = 'pele-live-tag reveal is-visible';
    live.innerHTML = '<span>LIVE</span> AZTECA · FINAL FEED · BRAZIL 4–1 ITALY';
    const title = azteca.querySelector('.pele-section-title');
    if (title) title.before(live); else azteca.prepend(live);
  }

  const lastName = document.querySelector('.pele-last-name');
  let powerLine = null;
  if (lastName) {
    lastName.dataset.text = 'O REI';
    if (!lastName.querySelector('.pele-afterimage-label')) {
      const label = document.createElement('span');
      label.className = 'pele-afterimage-label';
      label.textContent = 'PICTURE GONE · NAME REMAINS';
      lastName.append(label);
    }
    powerLine = document.createElement('i');
    powerLine.className = 'pele-power-line';
    powerLine.setAttribute('aria-hidden', 'true');
    lastName.append(powerLine);
  }

  const stateMap = [
    { selector: '.pele-hero', state: 'SEARCHING' },
    { selector: '.pele-birth', state: 'ACQUIRED' },
    { selector: '.pele-travel', state: 'TRANSMITTING' },
    { selector: '.pele-body', state: 'INTERRUPTED' },
    { selector: '.pele-mexico', state: 'LOCKED' },
    { selector: '.pele-azteca', state: 'LIVE' },
    { selector: '.pele-remains', state: 'AFTERIMAGE' },
  ].map((item) => ({ ...item, el: document.querySelector(item.selector) })).filter((item) => item.el);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const item = stateMap.find((candidate) => candidate.el === visible.target);
      if (item && uiState) uiState.textContent = item.state;
    }, { rootMargin: '-24% 0px -58% 0px', threshold: [0, .12, .3, .55] });
    stateMap.forEach((item) => observer.observe(item.el));
  }

  const update = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const page = clamp(window.scrollY / max);
    if (tunerDot) tunerDot.style.top = `${8 + page * 84}%`;

    if (transmissionMap && !reduceMotion) {
      const p = localProgress(transmissionMap);
      transmissionMap.style.setProperty('--scan', `${-120 + p * 240}%`);
    }

    if (interferenceBars.length && !reduceMotion) {
      const p = localProgress(bodySection);
      interferenceBars.forEach((bar, index) => {
        const dir = index % 2 ? -1 : 1;
        bar.style.setProperty('--tear', `${dir * (p - .5) * (70 + index * 22)}px`);
      });
    }

    if (lastName) {
      const p = localProgress(lastName);
      if (powerLine) powerLine.style.width = `${Math.max(0, 92 - p * 110)}%`;
      const strong = lastName.querySelector('strong');
      if (strong) strong.style.opacity = String(.18 + p * .82);
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
})();
