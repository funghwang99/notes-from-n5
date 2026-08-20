(() => {
  const root = document.querySelector('.pele-page');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const map = (v, a, b) => clamp((v - a) / Math.max(.0001, b - a));
  const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const mix = (a, b, t) => a + (b - a) * t;
  const docTop = (el) => el ? el.getBoundingClientRect().top + window.scrollY : 0;
  const rangeNear = (top, height, margin = .7) => {
    const pad = window.innerHeight * margin;
    const viewTop = window.scrollY - pad;
    const viewBottom = window.scrollY + window.innerHeight + pad;
    return viewBottom >= top && viewTop <= top + height;
  };

  const worldWall = document.querySelector('.pele-world-wall');
  const worldTitle = worldWall?.querySelector('.pele-world-wall-title');
  const worldPhoto = worldWall?.querySelector('.pele-world-wall-photo');
  const worldMarquee = worldWall?.querySelector('.pele-world-marquee');
  const posters = worldWall ? Array.from(worldWall.querySelectorAll('.pele-poster')) : [];

  if (worldTitle) {
    worldTitle.innerHTML = `
      <small>SANTOS · THE WORLD</small>
      <span class="pele-world-line pele-world-line--one">BEFORE THE WHISTLE,</span>
      <strong class="pele-world-line pele-world-line--two">THEY WERE ALREADY</strong>
      <strong class="pele-world-line pele-world-line--three">WAITING.</strong>`;
  }

  const relics = Array.from(document.querySelectorAll('.pele-relic'));
  const installSaveReplay = (relic) => {
    const graphic = relic?.querySelector('.pele-relic-goal');
    if (!graphic || graphic.dataset.tuned === '1') return graphic;
    graphic.dataset.tuned = '1';
    graphic.insertAdjacentHTML('afterbegin', `
      <svg class="pele-replay-svg pele-replay-svg--save" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="path-ghost" pathLength="1" d="M16 74 C37 63 58 38 75 24" />
        <path class="path-main" pathLength="1" d="M16 74 C37 63 58 38 75 24 C82 19 87 11 91 4" />
      </svg>
      <span class="pele-replay-impact" aria-hidden="true"></span>
      <span class="pele-save-hand" aria-hidden="true"></span>`);
    return graphic;
  };
  const installMazurReplay = (relic) => {
    const graphic = relic?.querySelector('.pele-relic-run');
    if (!graphic || graphic.dataset.tuned === '1') return graphic;
    graphic.dataset.tuned = '1';
    graphic.insertAdjacentHTML('afterbegin', `
      <svg class="pele-replay-svg pele-replay-svg--mazur" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="path-ghost" pathLength="1" d="M28 62 C48 59 69 54 93 47" />
        <path class="path-main" pathLength="1" d="M28 62 C48 59 69 54 93 47" />
        <path class="path-man" pathLength="1" d="M24 65 C34 58 41 43 52 33 C60 26 67 23 74 22" />
      </svg>
      <span class="pele-keeper-dot" aria-hidden="true"></span>
      <span class="pele-no-touch" aria-hidden="true">NO TOUCH</span>`);
    return graphic;
  };
  const saveGraphic = installSaveReplay(relics[0]);
  const mazurGraphic = installMazurReplay(relics[1]);

  const azteca = document.querySelector('.pele-azteca');
  const oldPass = azteca?.querySelector('.pele-final-pass');
  let pauseAct = azteca?.querySelector('.pele-pause-act');
  if (azteca && !pauseAct) {
    pauseAct = document.createElement('div');
    pauseAct.className = 'pele-pause-act';
    pauseAct.innerHTML = `
      <div class="pele-pause-sticky">
        <div class="pele-pause-top"><span>AZTECA · FINAL ACT</span><strong>FEED HELD</strong><span>ONE SECOND</span></div>
        <div class="pele-pause-center">
          <div class="pele-pause-clock" data-pause-clock>01.00</div>
          <h3 class="pele-pause-title">ONE BEAT.<span>EVERYTHING WAITS.</span></h3>
          <p class="pele-pause-note">Pelé giữ bóng một nhịp. Không sút. Không vội. Chỉ đủ lâu để khoảng trống bên phải xuất hiện.</p>
        </div>
        <div class="pele-pause-steps"><span class="pele-pause-step" data-pause-step="hold">HOLD</span><span class="pele-pause-step" data-pause-step="look">LOOK</span><span class="pele-pause-step" data-pause-step="release">RELEASE</span></div>
        <div class="pele-pause-shutter" aria-hidden="true"></div>
        <div class="pele-pause-play" aria-hidden="true">PLAY · CARLOS ALBERTO ARRIVES</div>
      </div>`;
    if (oldPass) oldPass.after(pauseAct);
    else azteca.querySelector('.pele-azteca-photo')?.before(pauseAct);
  }

  const uiState = document.querySelector('.pele-broadcast-state');
  const stateSections = [
    ['.pele-hero','SEARCHING'],
    ['.pele-birth','SIGNAL ACQUIRED'],
    ['.pele-travel','WORLD FEED'],
    ['.pele-body','SIGNAL INTERRUPTED'],
    ['.pele-mexico','ARCHIVE PRESERVED'],
    ['.pele-azteca','LIVE FEED'],
    ['.pele-remains','PICTURE GONE'],
  ].map(([selector,label]) => [document.querySelector(selector),label]).filter(([node]) => node);

  if (uiState && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        const found = stateSections.find(([node]) => node === visible.target);
        if (found) uiState.textContent = found[1];
      }
    }, { rootMargin:'-30% 0px -48% 0px', threshold:[0,.12,.35,.6] });
    stateSections.forEach(([node]) => observer.observe(node));
  }

  const metrics = {
    world:{top:0,height:1,travel:1},
    rooms:[],
    save:{w:1,h:1,ballW:0,ballH:0},
    mazur:{w:1,h:1,ballW:0,ballH:0,manW:0,manH:0},
    pause:{top:0,height:1,travel:1},
  };

  const measure = () => {
    if (worldWall) {
      metrics.world.top = docTop(worldWall);
      metrics.world.height = worldWall.offsetHeight;
      metrics.world.travel = Math.max(1, worldWall.offsetHeight - window.innerHeight);
    }
    metrics.rooms = relics.map((relic) => ({
      top: docTop(relic),
      height: Math.max(relic.offsetHeight, window.innerHeight),
    }));
    if (saveGraphic) {
      const ball = saveGraphic.querySelector('.pele-relic-ball');
      metrics.save = {w:saveGraphic.clientWidth,h:saveGraphic.clientHeight,ballW:ball?.offsetWidth||0,ballH:ball?.offsetHeight||0};
    }
    if (mazurGraphic) {
      const ball = mazurGraphic.querySelector('.pele-run-ball');
      const man = mazurGraphic.querySelector('.pele-run-man');
      metrics.mazur = {w:mazurGraphic.clientWidth,h:mazurGraphic.clientHeight,ballW:ball?.offsetWidth||0,ballH:ball?.offsetHeight||0,manW:man?.offsetWidth||0,manH:man?.offsetHeight||0};
    }
    if (pauseAct) {
      metrics.pause.top = docTop(pauseAct);
      metrics.pause.height = pauseAct.offsetHeight;
      metrics.pause.travel = Math.max(1, pauseAct.offsetHeight - window.innerHeight);
    }
  };

  const roomProgress = (index) => {
    const room = metrics.rooms[index];
    if (!room) return 0;
    const start = room.top - window.innerHeight * .62;
    const end = room.top + window.innerHeight * .42;
    return clamp((window.scrollY - start) / Math.max(1, end - start));
  };

  const updateWorld = () => {
    if (!worldWall || !rangeNear(metrics.world.top, metrics.world.height, .8)) return;
    const raw = reduceMotion ? 1 : clamp((window.scrollY - metrics.world.top) / metrics.world.travel);
    const titleLines = worldWall.querySelectorAll('.pele-world-line');
    const ranges = [[.02,.17], [.1,.31], [.2,.43]];
    titleLines.forEach((line, i) => {
      const t = easeOut(map(raw, ranges[i][0], ranges[i][1]));
      line.style.setProperty('--line-opacity', String(t));
      line.style.setProperty('--line-x', `${mix(i === 1 ? 5 : -5, 0, t)}vw`);
      line.style.setProperty('--line-y', `${mix(22, 0, t)}px`);
    });
    const settle = easeOut(map(raw, .02, .52));
    const vectors = [[-260,-80,-7],[230,-120,6],[-250,140,5],[260,130,-5],[-300,15,-4],[300,-10,4]];
    posters.forEach((poster, i) => {
      const [dx,dy,rot] = vectors[i] || [0,0,0];
      const drift = map(raw,.55,1) * (i % 2 ? 10 : -10);
      poster.style.setProperty('--poster-x', `${dx * (1 - settle) + drift}px`);
      poster.style.setProperty('--poster-y', `${dy * (1 - settle)}px`);
      poster.style.setProperty('--poster-r', `${rot * (1 - settle)}deg`);
      poster.style.setProperty('--poster-opacity', String(.25 + settle * .75));
    });
    if (worldPhoto) {
      worldPhoto.style.setProperty('--world-photo-scale', String(.82 + easeOut(map(raw,.05,.5)) * .18));
      worldPhoto.style.setProperty('--world-photo-rotate', `${mix(-1.2,0,easeOut(map(raw,.05,.5)))}deg`);
    }
    if (worldMarquee) worldMarquee.style.setProperty('--world-marquee', `${mix(-11,8,easeOut(map(raw,.08,.72)))}%`);
  };

  const updateSave = () => {
    if (!saveGraphic || !relics[0] || !rangeNear(metrics.rooms[0]?.top||0, metrics.rooms[0]?.height||1, .55)) return;
    const p = reduceMotion ? 1 : roomProgress(0);
    const {w,h,ballW,ballH} = metrics.save;
    const ball = saveGraphic.querySelector('.pele-relic-ball');
    const paths = saveGraphic.querySelectorAll('.pele-replay-svg path');
    const impact = saveGraphic.querySelector('.pele-replay-impact');
    const hand = saveGraphic.querySelector('.pele-save-hand');
    let x, y;
    if (p < .7) {
      const t = easeOut(p / .7);
      x = mix(.16, .75, t);
      y = mix(.74, .24, t);
    } else {
      const t = easeOut((p - .7) / .3);
      x = mix(.75, .91, t);
      y = mix(.24, .04, t);
    }
    if (ball) {
      ball.style.setProperty('--save-x', `${x * w - ballW / 2}px`);
      ball.style.setProperty('--save-y', `${y * h - ballH / 2}px`);
      ball.style.setProperty('--save-scale', String(1 + Math.sin(Math.min(1,p) * Math.PI) * .12));
    }
    paths.forEach((path, i) => path.style.setProperty('--path-offset', String(1 - clamp((p - i * .05) / .84))));
    const hit = 1 - Math.min(1, Math.abs(p - .7) / .16);
    if (impact) {
      impact.style.left = '75%'; impact.style.top = '24%';
      impact.style.setProperty('--impact-opacity', String(hit * .9));
      impact.style.setProperty('--impact-scale', String(.55 + hit * .7));
    }
    if (hand) {
      hand.style.left = '79%'; hand.style.top = '22%';
      hand.style.setProperty('--hand-opacity', String(hit * .82));
      hand.style.setProperty('--hand-scale', String(.68 + hit * .42));
    }
    relics[0].style.setProperty('--relic-number-y', `${-24 * p}px`);
  };

  const updateMazur = () => {
    if (!mazurGraphic || !relics[1] || !rangeNear(metrics.rooms[1]?.top||0, metrics.rooms[1]?.height||1, .55)) return;
    const p = reduceMotion ? 1 : roomProgress(1);
    const {w,h,ballW,ballH,manW,manH} = metrics.mazur;
    const ball = mazurGraphic.querySelector('.pele-run-ball');
    const man = mazurGraphic.querySelector('.pele-run-man');
    const keeper = mazurGraphic.querySelector('.pele-keeper-dot');
    const label = mazurGraphic.querySelector('.pele-no-touch');
    const paths = mazurGraphic.querySelectorAll('.pele-replay-svg path');
    const ballT = easeOut(p);
    const bx = mix(.28, .94, ballT);
    const by = mix(.62, .47, ballT);
    const manT = easeOut(map(p, .08, .88));
    const mx = mix(.24, .74, manT);
    const my = mix(.65, .22, Math.sin(manT * Math.PI / 2));
    if (ball) {
      ball.style.setProperty('--maz-ball-x', `${bx * w - ballW / 2}px`);
      ball.style.setProperty('--maz-ball-y', `${by * h - ballH / 2}px`);
      ball.style.setProperty('--maz-ball-scale', String(1 + map(p,.52,.72) * .13));
    }
    if (man) {
      man.style.setProperty('--maz-man-x', `${mx * w - manW / 2}px`);
      man.style.setProperty('--maz-man-y', `${my * h - manH / 2}px`);
    }
    if (keeper) {
      keeper.style.left = '56%'; keeper.style.top = '48%';
      keeper.style.setProperty('--keeper-x', `${-42 * easeOut(map(p,.18,.68))}px`);
      keeper.style.setProperty('--keeper-y', `${12 * easeOut(map(p,.18,.68))}px`);
      keeper.style.setProperty('--keeper-opacity', String(.72 - map(p,.62,.92) * .45));
    }
    if (label) {
      const noTouch = Math.min(map(p,.32,.5), 1 - map(p,.68,.86));
      label.style.left = '52%'; label.style.top = '40%';
      label.style.setProperty('--no-touch-opacity', String(Math.max(0,noTouch) * .94));
      label.style.setProperty('--no-touch-scale', String(.88 + Math.max(0,noTouch) * .12));
    }
    paths.forEach((path, i) => path.style.setProperty('--path-offset', String(1 - clamp((p - i * .04) / .86))));
    relics[1].style.setProperty('--relic-number-y', `${-22 * p}px`);
  };

  const updatePause = () => {
    if (!pauseAct || !rangeNear(metrics.pause.top, metrics.pause.height, .65)) return;
    const p = reduceMotion ? 1 : clamp((window.scrollY - metrics.pause.top) / metrics.pause.travel);
    const sticky = pauseAct.querySelector('.pele-pause-sticky');
    const clock = pauseAct.querySelector('[data-pause-clock]');
    const steps = Array.from(pauseAct.querySelectorAll('[data-pause-step]'));
    const remaining = Math.max(0, 1 - p);
    if (clock) clock.textContent = remaining.toFixed(2).padStart(4,'0');
    if (sticky) {
      sticky.style.setProperty('--pause-clock-x', `${mix(-4,0,easeOut(map(p,0,.35)))}vw`);
      sticky.style.setProperty('--pause-title-y', `${mix(30,0,easeOut(map(p,.08,.42)))}px`);
      sticky.style.setProperty('--pause-title-opacity', String(.3 + .7 * easeOut(map(p,.05,.38))));
      sticky.style.setProperty('--pause-note-opacity', String(.35 + .65 * easeOut(map(p,.2,.55))));
      sticky.style.setProperty('--pause-sweep', `${Math.min(100, easeOut(map(p,.48,.94)) * 100)}%`);
      sticky.style.setProperty('--pause-play', String(easeOut(map(p,.74,.94))));
      sticky.style.setProperty('--pause-play-y', `${mix(18,0,easeOut(map(p,.74,.94)))}px`);
    }
    const active = p < .34 ? 'hold' : p < .68 ? 'look' : 'release';
    steps.forEach((step) => step.classList.toggle('is-active', step.dataset.pauseStep === active));
  };

  let raf = 0;
  const render = () => {
    raf = 0;
    if (document.hidden) return;
    updateWorld();
    updateSave();
    updateMazur();
    updatePause();
  };
  const schedule = () => {
    if (raf || document.hidden) return;
    raf = requestAnimationFrame(render);
  };

  let resizeRaf = 0;
  const onResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      measure();
      schedule();
    });
  };

  requestAnimationFrame(() => {
    measure();
    schedule();
  });
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', onResize, { passive:true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { measure(); schedule(); }
  });
})();
