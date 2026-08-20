(() => {
  const body = document.body;
  const kind = body.classList.contains('layout-bould') ? 'bould'
    : body.classList.contains('layout-eight') ? 'eight'
    : body.classList.contains('layout-language') ? 'language'
    : body.classList.contains('layout-photoessay') ? 'trossard'
    : body.classList.contains('layout-keystone') ? 'rice'
    : body.classList.contains('layout-mask') ? 'mask'
    : null;
  if (!kind) return;

  body.classList.add('nad-wow');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.article-hero');
  const article = document.querySelector('.article-body');
  if (!hero || !article) return;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const progress = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / travel);
  };
  const articleProgress = () => {
    const rect = article.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / travel);
  };
  const micro = (text) => `<span class="nad-micro">${text}</span>`;
  let stage = null;
  let updateKind = () => {};
  let resizeKind = () => {};

  if (kind === 'bould') {
    const heroOverlay = document.createElement('div');
    heroOverlay.className = 'nad-bould-hero';
    heroOverlay.setAttribute('aria-hidden', 'true');
    heroOverlay.innerHTML = `<div><span>FRAME −01</span><strong>BOULD LOOKS UP</strong></div><i></i><div><span>FRAME 00</span><strong>ARMS RAISED</strong></div>`;
    hero.append(heroOverlay);

    stage = document.createElement('section');
    stage.className = 'nad-bould-stage';
    stage.dataset.nadStage = 'bould';
    stage.innerHTML = `<div class="nad-bould-sticky"><div class="nad-bould-film" aria-hidden="true"></div><div class="nad-bould-seq-top nad-micro"><span>HIGHBURY · 03.05.1998</span><b>THE FRAME BEFORE THE FRAME</b><span>ARSENAL × EVERTON</span></div><div class="nad-bould-frame-title" aria-hidden="true">−01</div><div class="nad-bould-passline" aria-hidden="true"></div><div class="nad-bould-person nad-bould-person--a"><span class="nad-micro">BEHIND THE IMAGE</span><strong>BOULD</strong></div><div class="nad-bould-person nad-bould-person--b"><span class="nad-micro">INSIDE THE IMAGE</span><strong>ADAMS</strong></div><p class="nad-bould-caption">Lịch sử giữ lại hai cánh tay. Nhưng vài giây trước đó, có một người đã ngẩng đầu và nhìn thấy khoảnh khắc trước khi nó tồn tại.</p></div>`;
    const beat = article.querySelector('.bould-pass-beat');
    (beat || article.lastElementChild)?.before(stage);

    updateKind = () => {
      const hp = clamp(-hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight));
      heroOverlay.style.setProperty('--bould-hero-ball', `${mix(10, 90, hp)}%`);
      const p = reduceMotion ? 1 : progress(stage);
      stage.style.setProperty('--bould-line', String(.04 + .96 * ease(p)));
      stage.style.setProperty('--bould-a', String(1 - .72 * ease(clamp((p - .32) / .5))));
      stage.style.setProperty('--bould-b', String(.16 + .84 * ease(clamp((p - .18) / .55))));
      stage.style.setProperty('--bould-caption', String(.18 + .82 * ease(clamp((p - .52) / .35))));
    };
  }

  if (kind === 'eight') {
    const orbit = document.createElement('aside');
    orbit.className = 'nad-eight-orbit';
    orbit.setAttribute('aria-hidden', 'true');
    orbit.innerHTML = `<svg viewBox="0 0 100 180" preserveAspectRatio="none"><path d="M50 12 C14 12 12 70 50 90 C88 110 86 168 50 168 C14 168 12 110 50 90 C88 70 86 12 50 12" pathLength="1"></path><path class="nad-eight-live" d="M50 12 C14 12 12 70 50 90 C88 110 86 168 50 168 C14 168 12 110 50 90 C88 70 86 12 50 12" pathLength="1"></path></svg><i class="nad-eight-ball"></i><span class="nad-eight-label nad-eight-label--top">OUTBOUND</span><span class="nad-eight-label nad-eight-label--mid">KNOT</span><span class="nad-eight-label nad-eight-label--bottom">RETURN</span>`;
    body.append(orbit);
    const path = orbit.querySelector('.nad-eight-live');
    const ball = orbit.querySelector('.nad-eight-ball');
    let total = 1;
    const measure = () => { try { total = path.getTotalLength() || 1; } catch { total = 1; } };
    measure();
    resizeKind = measure;
    updateKind = () => {
      const p = reduceMotion ? 1 : articleProgress();
      orbit.style.setProperty('--eight-offset', String(1 - p));
      const point = path.getPointAtLength(total * p);
      ball.style.left = `${point.x}%`;
      ball.style.top = `${point.y / 180 * 100}%`;
      orbit.style.opacity = String(.28 + .68 * Math.sin(Math.PI * clamp(p * 1.03)));
    };
  }

  if (kind === 'language') {
    const rail = document.createElement('aside');
    rail.className = 'nad-language-rail';
    rail.setAttribute('aria-hidden', 'true');
    rail.innerHTML = '<span>SPACE</span><span>PAUSE</span><span>FUTURE</span><span>SILENCE</span>';
    body.append(rail);

    stage = document.createElement('section');
    stage.className = 'nad-language-stage';
    stage.dataset.nadStage = 'language';
    stage.innerHTML = `<div class="nad-language-sticky"><div class="nad-language-top nad-micro"><span>THE GRAMMAR OF ÖZIL</span><b>PASS INTO THE FUTURE</b><span>10</span></div><h2 class="nad-language-thesis">He did not pass to where you <em>were.</em></h2><div class="nad-language-field"><div class="nad-language-now">${micro('CURRENT POSITION')}<strong>NOW</strong></div><div class="nad-language-next">${micro('THE PLACE NOT YET THERE')}<strong>NEXT</strong></div><i class="nad-language-pass"></i></div><div class="nad-language-ghost" aria-hidden="true">BECOME</div></div>`;
    const firstQuote = article.querySelector('.pull-quote');
    (firstQuote || article.children[8] || article.firstElementChild).before(stage);
    const railItems = [...rail.children];
    updateKind = () => {
      const ap = articleProgress();
      const active = Math.min(3, Math.floor(ap * 4));
      railItems.forEach((item, index) => item.classList.toggle('is-current', index === active));
      const p = reduceMotion ? 1 : progress(stage);
      stage.style.setProperty('--lang-line', String(.04 + .96 * ease(clamp((p - .08) / .72))));
      stage.style.setProperty('--lang-ghost', String(.08 + .28 * ease(clamp((p - .45) / .4))));
    };
  }

  if (kind === 'trossard') {
    const heroOverlay = document.createElement('div');
    heroOverlay.className = 'nad-trossard-hero';
    heroOverlay.setAttribute('aria-hidden', 'true');
    heroOverlay.innerHTML = `<div><span>CHAPTER BEFORE</span><strong>THE STORY</strong></div><i></i><div><span>CHAPTER AFTER</span><strong>THE STORY</strong></div>`;
    hero.append(heroOverlay);

    stage = document.createElement('section');
    stage.className = 'nad-trossard-strip';
    stage.dataset.nadStage = 'trossard';
    const frames = [
      ['JAN 2023','ARRIVAL','STEP IN'],
      ['FULHAM','3 ASSISTS','KEEP IT MOVING'],
      ['WEMBLEY','LATE GOAL','KEEP IT ALIVE'],
      ['GOODISON','1–0','BREAK THE SPELL'],
      ['BAYERN','EQUALISER','ENTER ON CUE'],
      ['2025/26','WEST HAM','WRITE THE LINE']
    ];
    stage.innerHTML = `<div class="nad-trossard-sticky"><div class="nad-trossard-top nad-micro"><span>THE EDIT</span><b>THE MAN BETWEEN CHAPTERS</b><span>ROLL 19</span></div><div class="nad-trossard-track">${frames.map((f,i)=>`<div class="nad-trossard-frame${i===3?' is-splice':''}"><span class="nad-micro">${f[0]}</span><strong>${f[1]}</strong><small>${f[2]}</small></div>`).join('')}</div></div>`;
    const firstFigure = article.querySelector('.story-figure');
    if (firstFigure) firstFigure.after(stage); else article.children[5]?.after(stage);
    const track = stage.querySelector('.nad-trossard-track');
    let maxShift = 0;
    const measure = () => { maxShift = Math.max(0, track.scrollWidth - window.innerWidth * .88); };
    measure();
    resizeKind = measure;
    updateKind = () => {
      const p = reduceMotion ? .5 : progress(stage);
      track.style.setProperty('--splice-x', `${-maxShift * ease(p)}px`);
    };
  }

  if (kind === 'rice') {
    const heroOverlay = document.createElement('div');
    heroOverlay.className = 'nad-rice-hero';
    heroOverlay.setAttribute('aria-hidden', 'true');
    heroOverlay.innerHTML = `<strong>4</strong><span class="nad-micro">CENTER OF GRAVITY</span>`;
    hero.append(heroOverlay);

    stage = document.createElement('section');
    stage.className = 'nad-rice-stage';
    stage.dataset.nadStage = 'rice';
    stage.innerHTML = `<div class="nad-rice-sticky"><div class="nad-rice-top nad-micro"><span>LOAD DISTRIBUTION</span><b>WHEN 4 HOLDS, OTHERS CAN MOVE</b><span>STABILITY</span></div><div class="nad-rice-plane"><i class="nad-rice-vector v1"></i><i class="nad-rice-vector v2"></i><i class="nad-rice-vector v3"></i><i class="nad-rice-vector v4"></i><div class="nad-rice-node nad-rice-node--left">LEFT 8</div><div class="nad-rice-node nad-rice-node--ten">10</div><div class="nad-rice-node nad-rice-node--right">RIGHT 8</div><div class="nad-rice-node nad-rice-node--back">BACK LINE</div><div class="nad-rice-four"><strong>4</strong><small class="nad-micro">RICE</small></div></div></div>`;
    const firstQuote = article.querySelector('.pull-quote');
    (firstQuote || article.children[5] || article.firstElementChild).after(stage);
    const nodes = [...stage.querySelectorAll('.nad-rice-node')];
    const drifts = [[-34,28],[8,-34],[31,21],[-10,34]];
    updateKind = () => {
      const p = reduceMotion ? 1 : progress(stage);
      const locked = ease(clamp((p - .08) / .72));
      stage.style.setProperty('--rice-tilt', `${mix(-7,0,locked)}deg`);
      stage.style.setProperty('--rice-four', String(mix(.82,1,locked)));
      stage.style.setProperty('--rice-vector', String(mix(.12,1,locked)));
      nodes.forEach((node,i) => {
        node.style.setProperty('--rx', `${mix(drifts[i][0],0,locked)}px`);
        node.style.setProperty('--ry', `${mix(drifts[i][1],0,locked)}px`);
      });
    };
  }

  if (kind === 'mask') {
    const heroOverlay = document.createElement('div');
    heroOverlay.className = 'nad-mask-hero';
    heroOverlay.setAttribute('aria-hidden', 'true');
    heroOverlay.innerHTML = `<span class="nad-micro">WHO IS VIKTOR?</span><strong>14</strong><i></i><i></i>`;
    hero.append(heroOverlay);

    stage = document.createElement('section');
    stage.className = 'nad-mask-stage';
    stage.dataset.nadStage = 'mask';
    const people = Array.from({length:60},(_,i)=>`<span class="nad-mask-person" data-mask-index="${i}"></span>`).join('');
    stage.innerHTML = `<div class="nad-mask-sticky"><div class="nad-mask-top nad-micro"><span>ONE GESTURE</span><b>THE RITUAL</b><span>60,000 ECHOES</span></div><div class="nad-mask-crowd" aria-hidden="true">${people}</div><div class="nad-mask-face" aria-hidden="true"><strong>14</strong><i></i><i></i></div><div class="nad-mask-thesis"><span class="nad-micro">FIRST IT WAS HIS</span><strong>THEN THE WHOLE STAND WORE IT.</strong></div></div>`;
    const maskFigure = article.querySelector('.story-figure--round');
    (maskFigure || article.children[8] || article.firstElementChild).before(stage);
    const peopleNodes = [...stage.querySelectorAll('.nad-mask-person')];
    updateKind = () => {
      const p = reduceMotion ? 1 : progress(stage);
      stage.style.setProperty('--mask-face', String(mix(.84,1.05,ease(clamp((p-.08)/.5)))));
      peopleNodes.forEach((node,i) => {
        const threshold = .18 + (i / Math.max(1, peopleNodes.length - 1)) * .58;
        const lit = ease(clamp((p - threshold) / .12));
        node.style.setProperty('--mask-person', String(.06 + .8 * lit));
        node.style.setProperty('--mask-scale', String(.7 + .3 * lit));
      });
    };
  }

  let raf = 0;
  const run = () => {
    raf = 0;
    updateKind();
  };
  const schedule = () => {
    if (raf || document.hidden) return;
    raf = requestAnimationFrame(run);
  };
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', () => {
    resizeKind();
    schedule();
  }, { passive:true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); });
  resizeKind();
  schedule();
})();
