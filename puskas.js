(() => {
  const body = document.body;
  if (!body.classList.contains('puskas-page')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const map = (v, a, b) => clamp((v - a) / Math.max(.0001, b - a));
  const stageProgress = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const travel = Math.max(1, rect.height - innerHeight);
    return clamp(-rect.top / travel);
  };
  const hero = document.querySelector('.puskas-hero');
  const runway = document.querySelector('[data-puskas-runway]');
  const bern = document.querySelector('[data-puskas-bern]');
  const rupture = document.querySelector('[data-puskas-rupture]');
  const reentry = document.querySelector('.puskas-reentry');
  const glasgow = document.querySelector('[data-puskas-glasgow]');
  const afterlife = document.querySelector('.puskas-afterlife');
  const ending = document.querySelector('.puskas-ending');

  // The 2009 → EVERY SEASON visual is the article's final image, not an interlude.
  // Move it after the written ending so the last thing the reader sees is the name.
  if (afterlife && ending && ending.nextElementSibling !== afterlife) {
    ending.after(afterlife);
  }

  const pathData = [];
  const setupPath = (root, pathSelector, ballSelector, cssX, cssY) => {
    const path = root?.querySelector(pathSelector);
    const ball = root?.querySelector(ballSelector);
    if (!path || !ball) return null;
    let length = 1;
    let box = null;
    const measure = () => {
      try { length = path.getTotalLength() || 1; } catch { length = 1; }
      box = path.ownerSVGElement?.getBoundingClientRect() || null;
    };
    measure();
    const item = { root, path, ball, cssX, cssY, measure, get length(){ return length; }, get box(){ return box; } };
    pathData.push(item);
    return item;
  };

  const heroPath = setupPath(hero, '.puskas-hero-path path', '.puskas-hero-ball', '--pk-hero-x', '--pk-hero-y');
  const runwayPath = setupPath(runway, '.puskas-runway-live', '.puskas-runway-ball', '--pk-runway-x', '--pk-runway-y');
  const bernPath = setupPath(bern, '.puskas-bern-path', '.puskas-bern-ball', '--pk-bern-x', '--pk-bern-y');

  const placeBall = (item, p) => {
    if (!item?.box) return;
    const point = item.path.getPointAtLength(item.length * clamp(p));
    const svg = item.path.ownerSVGElement;
    const vb = svg.viewBox.baseVal;
    const x = vb.width ? (point.x - vb.x) / vb.width * 100 : 0;
    const y = vb.height ? (point.y - vb.y) / vb.height * 100 : 0;
    const rect = svg.getBoundingClientRect();
    const rootRect = item.root.getBoundingClientRect();
    const px = (rect.left - rootRect.left) + rect.width * x / 100;
    const py = (rect.top - rootRect.top) + rect.height * y / 100;
    item.root.style.setProperty(item.cssX, `${px / rootRect.width * 100}%`);
    item.root.style.setProperty(item.cssY, `${py / rootRect.height * 100}%`);
  };

  const near = (el, margin = innerHeight * 1.2) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.bottom > -margin && r.top < innerHeight + margin;
  };

  const renderHero = () => {
    if (!hero || !near(hero, innerHeight * .4)) return;
    const rect = hero.getBoundingClientRect();
    const p = reduceMotion ? 1 : clamp(-rect.top / Math.max(1, hero.offsetHeight * .72));
    const draw = .08 + .92 * ease(p);
    hero.style.setProperty('--pk-hero-dash', String(1 - draw));
    placeBall(heroPath, draw);
  };

  const renderRunway = () => {
    if (!runway || !near(runway)) return;
    const p = reduceMotion ? 1 : stageProgress(runway);
    const draw = .03 + .97 * ease(map(p, .03, .86));
    runway.style.setProperty('--pk-runway-dash', String(1 - draw));
    placeBall(runwayPath, draw);
  };

  const renderBern = () => {
    if (!bern || !near(bern)) return;
    const p = reduceMotion ? 1 : stageProgress(bern);
    const approach = ease(map(p, .04, .64));
    const denied = ease(map(p, .61, .82));
    bern.style.setProperty('--pk-bern-dash', String(1 - approach));
    bern.style.setProperty('--pk-flag', String(denied));
    bern.style.setProperty('--pk-bern-ball', String(1 - .82 * denied));
    placeBall(bernPath, approach);
  };

  const renderRupture = () => {
    if (!rupture || !near(rupture)) return;
    const p = reduceMotion ? 1 : stageProgress(rupture);
    const split = ease(map(p, .12, .74));
    rupture.style.setProperty('--pk-gap', `${1 + split * 20}%`);
    rupture.style.setProperty('--pk-rupture-copy', String(.14 + .86 * ease(map(p, .48, .78))));
  };

  const renderReentry = () => {
    if (!reentry || !near(reentry, innerHeight * .5)) return;
    const r = reentry.getBoundingClientRect();
    const p = reduceMotion ? 1 : clamp((innerHeight - r.top) / Math.max(innerHeight * .7, r.height));
    reentry.style.setProperty('--pk-reentry', String(.05 + .95 * ease(p)));
  };

  const renderGlasgow = () => {
    if (!glasgow || !near(glasgow)) return;
    const p = reduceMotion ? 1 : stageProgress(glasgow);
    const draw = ease(map(p, .05, .78));
    glasgow.style.setProperty('--pk-four-dash', String(1 - draw));
    glasgow.style.setProperty('--pk-four-ball', String(.08 + .92 * ease(map(p, .42, .82))));
  };

  const renderAfterlife = () => {
    if (!afterlife || !near(afterlife)) return;
    const p = reduceMotion ? 1 : stageProgress(afterlife);
    const lines = ease(map(p, .08, .66));
    const name = ease(map(p, .38, .78));
    afterlife.style.setProperty('--pk-after-line', String(.04 + .96 * lines));
    afterlife.style.setProperty('--pk-name-opacity', String(.1 + .9 * name));
    afterlife.style.setProperty('--pk-name-scale', String(.88 + .12 * name));
    afterlife.style.setProperty('--pk-after-caption', String(.12 + .88 * ease(map(p, .62, .88))));
  };

  let raf = 0;
  const render = () => {
    raf = 0;
    renderHero();
    renderRunway();
    renderBern();
    renderRupture();
    renderReentry();
    renderGlasgow();
    renderAfterlife();
  };
  const schedule = () => {
    if (raf || document.hidden) return;
    raf = requestAnimationFrame(render);
  };
  const measure = () => {
    pathData.forEach((item) => item.measure());
    schedule();
  };

  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', measure, { passive:true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); });
  requestAnimationFrame(() => { measure(); render(); });
})();