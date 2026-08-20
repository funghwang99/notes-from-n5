(() => {
  const root = document.querySelector('.pele-page');
  if (!root) return;

  root.classList.remove('pele-signal-mode');
  root.classList.add('pele-signal-v3');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const sectionProgress = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / travel);
  };
  const nearViewport = (el, margin = 0.65) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const pad = window.innerHeight * margin;
    return rect.bottom >= -pad && rect.top <= window.innerHeight + pad;
  };

  const ui = document.createElement('aside');
  ui.className = 'pele-broadcast-ui';
  ui.setAttribute('aria-hidden', 'true');
  ui.innerHTML = `
    <div class="pele-broadcast-top"><span>N5 WORLD FEED</span><span>CH 10</span></div>
    <div class="pele-broadcast-state">SEARCHING</div>
    <div class="pele-broadcast-bottom"><span>PELÉ</span><span>O REI</span></div>`;
  document.body.append(ui);

  const hero = document.querySelector('.pele-hero');
  const heroPortrait = hero?.querySelector('.pele-hero-portrait');
  const heroCopy = hero?.querySelector('.pele-hero-copy');
  const heroIndex = hero?.querySelector('.pele-hero-index');
  let tunerDot = null;

  if (hero && heroPortrait && !hero.querySelector('.pele-acquire-stage')) {
    const stage = document.createElement('div');
    stage.className = 'pele-acquire-stage';
    const screen = document.createElement('div');
    screen.className = 'pele-acquire-screen';
    screen.innerHTML = `
      <div class="pele-acquire-static" aria-hidden="true"></div>
      <div class="pele-acquire-tear" aria-hidden="true"></div>
      <div class="pele-acquire-meta" aria-hidden="true"><span>WORLD FEED · 1958</span><strong>SEARCHING</strong></div>
      <div class="pele-acquire-search" aria-hidden="true"><span>SEARCHING FOR SIGNAL</span><b>A face the world will remember.</b><i></i></div>
      <div class="pele-lock-burst" aria-hidden="true"></div>
      <div class="pele-lock-title" aria-hidden="true"><span>O</span><strong>REI</strong></div>`;
    stage.append(screen);
    hero.prepend(stage);
    screen.prepend(heroPortrait);
    if (heroCopy) screen.append(heroCopy);
    if (heroIndex) screen.append(heroIndex);

    const tuner = document.createElement('div');
    tuner.className = 'pele-tuner';
    tuner.setAttribute('aria-hidden', 'true');
    tuner.innerHTML = '<div class="pele-tuner-track"><span class="pele-tuner-dot"></span></div><div class="pele-tuner-copy"><span>SEARCH</span><span>LOCK</span><span>RECEIVE</span></div>';
    stage.append(tuner);
    tunerDot = tuner.querySelector('.pele-tuner-dot');
  }

  const namingStage = document.querySelector('[data-naming-stage]');
  if (namingStage && !namingStage.querySelector('.pele-signal-lock')) {
    const lock = document.createElement('div');
    lock.className = 'pele-signal-lock';
    lock.textContent = 'SIGNAL ACQUIRED';
    namingStage.append(lock);
  }

  const travel = document.querySelector('.pele-travel');
  const travelPhoto = travel?.querySelector('.pele-travel-photo img');
  if (travel && !travel.querySelector('.pele-world-wall')) {
    const worldWall = document.createElement('div');
    worldWall.className = 'pele-world-wall';
    const photoSrc = travelPhoto?.src || 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pel%C3%A9%201960.jpg?width=1600';
    worldWall.innerHTML = `
      <div class="pele-world-wall-sticky">
        <div class="pele-world-wall-title"><small>SANTOS · THE WORLD</small>BEFORE THE WHISTLE,<strong>THEY WERE ALREADY WAITING.</strong></div>
        <figure class="pele-world-wall-photo"><img src="${photoSrc}" alt="" loading="lazy" decoding="async" /></figure>
        <div class="pele-poster pele-poster--1"><small>WORLD FEED</small><strong>EUROPE</strong><em>PELÉ · O REI</em></div>
        <div class="pele-poster pele-poster--2"><small>SANTOS FC</small><strong>SOUTH AMERICA</strong><em>NUMBER 10</em></div>
        <div class="pele-poster pele-poster--3"><small>WORLD FEED</small><strong>AFRICA</strong><em>PELÉ · O REI</em></div>
        <div class="pele-poster pele-poster--4"><small>SANTOS</small><strong>COPA LIBERTADORES</strong><em>CHAMPION</em></div>
        <div class="pele-poster pele-poster--5"><small>SANTOS</small><strong>INTERCONTINENTAL CUP</strong><em>THE NAME TRAVELS</em></div>
        <div class="pele-poster pele-poster--6"><small>BEFORE KICK-OFF</small><strong>CROWD · EXPECTATION</strong><em>EVENT</em></div>
        <div class="pele-world-marquee" aria-hidden="true"><span>PELÉ</span><span>O REI</span><span>PELÉ</span><span>O REI</span></div>
        <div class="pele-world-counter"><span>KNOWN BEFORE ARRIVAL</span><strong>O REI</strong><span>ONE NAME · MANY STANDS</span></div>
      </div>`;
    travel.append(worldWall);
  }

  const bodySection = document.querySelector('.pele-body');
  if (bodySection && !bodySection.querySelector('.pele-interference')) {
    const interference = document.createElement('div');
    interference.className = 'pele-interference';
    interference.setAttribute('aria-hidden', 'true');
    interference.innerHTML = '<i></i><i></i><i></i><i></i>';
    bodySection.prepend(interference);
    const error = document.createElement('div');
    error.className = 'pele-signal-error';
    error.innerHTML = '1962 · 1966 &nbsp; <strong>SIGNAL INTERRUPTED</strong> &nbsp; THE NAME SURVIVES THE BODY';
    bodySection.querySelector('.pele-copy')?.after(error);
  }

  const mexico = document.querySelector('.pele-mexico');
  const relics = Array.from(document.querySelectorAll('.pele-relic'));
  if (mexico && !mexico.querySelector('.pele-mexico-lock')) {
    const lock = document.createElement('div');
    lock.className = 'pele-mexico-lock';
    lock.innerHTML = '<span>MEXICO · 1970</span><strong>ARCHIVE PRESERVED</strong><span>TWO MOMENTS · ZERO GOALS</span>';
    mexico.querySelector('.pele-section-title')?.before(lock);
  }

  relics.forEach((relic, index) => {
    const graphic = relic.querySelector(index === 0 ? '.pele-relic-goal' : '.pele-relic-run');
    const copy = relic.querySelector('.pele-relic-copy');
    if (graphic && !graphic.closest('.pele-relic-visual')) {
      const visual = document.createElement('div');
      visual.className = 'pele-relic-visual';
      graphic.before(visual);
      visual.append(graphic);
    }
    if (copy && !copy.querySelector('.pele-replay-bar')) {
      const bar = document.createElement('div');
      bar.className = 'pele-replay-bar';
      bar.innerHTML = index === 0
        ? '<span>REPLAY 01</span><strong>NO GOAL</strong><span>MEMORY: PRESERVED</span>'
        : '<span>REPLAY 02</span><strong>NO GOAL</strong><span>MEMORY: PRESERVED</span>';
      copy.append(bar);
    }
  });

  const azteca = document.querySelector('.pele-azteca');
  if (azteca && !azteca.querySelector('.pele-live-bug')) {
    const live = document.createElement('div');
    live.className = 'pele-live-bug';
    live.textContent = 'LIVE · AZTECA';
    azteca.append(live);
  }

  const remains = document.querySelector('.pele-remains');
  let afterimage = remains?.querySelector('.pele-afterimage') || null;
  if (remains && !afterimage) {
    afterimage = document.createElement('div');
    afterimage.className = 'pele-afterimage';
    afterimage.innerHTML = `
      <div class="pele-afterimage-sticky">
        <div class="pele-memory-ticks"><span>STOCKHOLM · 1958</span><span>SANTOS</span><span>MEXICO · 1970</span><span>29.12.2022</span></div>
        <div class="pele-power-line" aria-hidden="true"></div>
        <div class="pele-after-name" aria-label="O Rei"><span>O</span><strong>REI</strong></div>
        <div class="pele-after-caption">PICTURE GONE · NAME REMAINS</div>
      </div>`;
    remains.querySelector('.pele-last-name')?.before(afterimage);
  }

  const updateHero = () => {
    if (!hero || !nearViewport(hero, .35)) return;
    const p = reduceMotion ? 1 : sectionProgress(hero);
    const screen = hero.querySelector('.pele-acquire-screen');
    const portrait = hero.querySelector('.pele-hero-portrait img');
    const metaStrong = hero.querySelector('.pele-acquire-meta strong');
    const staticLayer = hero.querySelector('.pele-acquire-static');
    const search = hero.querySelector('.pele-acquire-search');
    const lock = hero.querySelector('.pele-lock-title');
    const copy = hero.querySelector('.pele-hero-copy');
    const index = hero.querySelector('.pele-hero-index');
    const staticOpacity = reduceMotion ? 0 : clamp(1 - p * 2.25);
    const lockOpacity = reduceMotion ? 1 : clamp((p - .28) / .2);
    const copyOpacity = reduceMotion ? 1 : clamp((p - .58) / .2);

    if (staticLayer) staticLayer.style.setProperty('--hero-static', String(staticOpacity));
    if (screen) {
      screen.style.setProperty('--hero-static', String(staticOpacity));
      screen.style.setProperty('--hero-scan', `${-110 + p * 260}%`);
      screen.style.setProperty('--hero-tear', `${Math.sin(p * 27) * (1 - p) * 18}px`);
      screen.style.setProperty('--hero-tear-top', `${23 + ((p * 137) % 51)}%`);
    }
    if (portrait) {
      portrait.style.setProperty('--hero-scale', String(1.095 - p * .055));
      portrait.style.setProperty('--hero-x', `${Math.sin(p * 19) * (1 - p) * 3}px`);
      portrait.style.setProperty('--hero-y', `${Math.cos(p * 17) * (1 - p) * 2}px`);
    }
    if (search) {
      search.style.setProperty('--hero-search', String(clamp(1 - p * 2.15)));
      search.style.setProperty('--hero-tune', `${-120 + p * 500}%`);
    }
    if (lock) {
      lock.style.setProperty('--hero-lock', String(lockOpacity));
      lock.style.setProperty('--hero-lock-y', `${(1 - lockOpacity) * 44}px`);
    }
    if (copy) {
      copy.style.setProperty('--hero-copy', String(copyOpacity));
      copy.style.setProperty('--hero-copy-y', `${(1 - copyOpacity) * 30}px`);
    }
    if (index) index.style.setProperty('--hero-copy', String(copyOpacity));
    if (tunerDot) tunerDot.style.setProperty('--tuner', `${8 + p * 84}%`);
    if (metaStrong) metaStrong.textContent = p < .3 ? 'SEARCHING' : p < .55 ? 'SIGNAL FOUND' : 'SIGNAL LOCKED';
  };

  const updateBody = () => {
    if (!bodySection || reduceMotion || !nearViewport(bodySection, .35)) return;
    const p = sectionProgress(bodySection);
    bodySection.querySelectorAll('.pele-interference i').forEach((bar, i) => {
      bar.style.setProperty('--tear', `${Math.sin((p * 15) + i * 1.7) * 6}vw`);
    });
  };

  const updateAfterimage = () => {
    if (!afterimage || !nearViewport(afterimage, .35)) return;
    const p = reduceMotion ? 1 : sectionProgress(afterimage);
    const sticky = afterimage.querySelector('.pele-afterimage-sticky');
    if (!sticky) return;
    const fade = (start, span=.16) => String(1 - .92 * clamp((p - start) / span));
    sticky.style.setProperty('--mem1', fade(.05));
    sticky.style.setProperty('--mem2', fade(.19));
    sticky.style.setProperty('--mem3', fade(.33));
    sticky.style.setProperty('--mem4', fade(.47));
    sticky.style.setProperty('--power-width', `${Math.max(.4, 74 * (1 - clamp((p - .16) / .52)))}vw`);
    sticky.style.setProperty('--power-dot', String(Math.max(.04, 1 - clamp((p - .48) / .22))));
    const name = reduceMotion ? 1 : clamp((p - .57) / .24);
    sticky.style.setProperty('--after-name', String(.02 + name * .94));
    sticky.style.setProperty('--after-scale', String(.86 + name * .14));
    sticky.style.setProperty('--after-glow', `${name * 34}px`);
    sticky.style.setProperty('--after-caption', String(clamp((p - .78) / .14) * .68));
    sticky.style.setProperty('--after-scan', String(.28 * (1 - p)));
  };

  let raf = 0;
  const render = () => {
    raf = 0;
    if (document.hidden) return;
    updateHero();
    updateBody();
    updateAfterimage();
  };
  const schedule = () => {
    if (raf || document.hidden) return;
    raf = requestAnimationFrame(render);
  };

  schedule();
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule, { passive:true });
  document.addEventListener('visibilitychange', schedule);
})();
