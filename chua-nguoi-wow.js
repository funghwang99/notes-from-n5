(() => {
  const body = document.body;
  const type = body.classList.contains('layout-robben') ? 'robben'
    : body.classList.contains('layout-hagi') ? 'hagi'
    : body.classList.contains('layout-baggio') ? 'baggio'
    : body.classList.contains('layout-summer') ? 'messi'
    : body.classList.contains('layout-monument') ? 'ronaldo'
    : body.classList.contains('layout-prince') ? 'neymar'
    : null;
  if (!type || window.__N5_CHUA_NGUOI_WOW__) return;
  window.__N5_CHUA_NGUOI_WOW__ = true;
  body.classList.add('cn-wow');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const map = (v, a, b) => clamp((v - a) / Math.max(.0001, b - a));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const stageProgress = (el) => {
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - innerHeight));
  };
  const near = (el, margin = innerHeight * .9) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.bottom > -margin && r.top < innerHeight + margin;
  };
  const insertAfter = (anchor, node) => {
    if (!anchor?.parentNode) return false;
    anchor.parentNode.insertBefore(node, anchor.nextSibling);
    return true;
  };
  const section = (name, inner) => {
    const el = document.createElement('section');
    el.className = `cn-signature cn-${name}`;
    el.dataset.cnScene = name;
    el.innerHTML = `<div class="cn-signature-sticky">${inner}</div>`;
    return el;
  };

  let scene = null;

  if (type === 'robben') {
    scene = section('robben-gap', `
      <div class="cn-signature-top"><span>1934 → 2010</span><b>THE GAP</b><span>62′ · JOHANNESBURG</span></div>
      <div class="cn-gap-years">76 YEARS</div>
      <div class="cn-gap-line"></div><span class="cn-gap-ball"></span><span class="cn-gap-foot"></span>
      <div class="cn-gap-mark cn-gap-mark--a"><strong>SNEIJDER</strong><span>THE PASS</span></div>
      <div class="cn-gap-mark cn-gap-mark--b"><strong>ROBBEN</strong><span>THE RUN</span></div>
      <div class="cn-gap-mark cn-gap-mark--c"><strong>CASILLAS</strong><span>THE FOOT</span></div>
      <div class="cn-gap-final">ONE FOOT<small>BETWEEN HIM AND HISTORY</small></div>
      <p class="cn-signature-thesis"><strong>Seventy-six years became one distance.</strong>Rồi khoảng cách ấy vừa đủ cho một bàn chân đặt vào.</p>`);
    const anchor = document.querySelector('.robben-moment') || document.querySelector('.robben-history-line');
    insertAfter(anchor, scene);
  }

  if (type === 'hagi') {
    scene = section('hagi-door', `
      <div class="cn-door-sky"></div>
      <div class="cn-signature-top"><span>1989</span><b>THE DOOR</b><span>1994</span></div>
      <div class="cn-door-beyond"><div><strong>1994</strong><span>ROMANIA STEPS THROUGH</span></div></div>
      <div class="cn-door-frame"><div class="cn-door-panel cn-door-panel--left"><span>19</span></div><div class="cn-door-panel cn-door-panel--right"><span>89</span></div></div>
      <i class="cn-door-step"></i>
      <p class="cn-signature-thesis"><strong>Một cánh cửa đã mở.</strong>Năm năm sau, một thế hệ khiến cả đất nước tin rằng mình có thể bước qua.</p>`);
    const anchor = document.querySelector('.hagi-years') || document.querySelector('.hagi-opening .article-lead');
    insertAfter(anchor, scene);
  }

  if (type === 'baggio') {
    scene = section('baggio-loop', `
      <div class="cn-signature-top"><span>PASADENA · 17.07.94</span><b>THE LOOP</b><span>ONE MISS · INFINITE REPLAYS</span></div>
      <div class="cn-loop-target"></div><i class="cn-loop-first"></i><div class="cn-loop-over">OVER.</div><div class="cn-loop-second"></div>
      <div class="cn-loop-copy"><span>ARROW 01 · LIFE</span><strong>The first arrow flew once.<br/><em>The second never stopped.</em></strong></div>`);
    const anchor = document.querySelector('.baggio-teaching') || document.querySelector('.baggio-emphasis');
    insertAfter(anchor, scene);
  }

  if (type === 'messi') {
    scene = section('messi-time', `
      <div class="cn-signature-top"><span>LUSAIL · 2022</span><b>BORROWED TIME</b><span>ONE LAST SUMMER</span></div>
      <div class="cn-time-horizon"></div><span class="cn-time-sun"></span><div class="cn-time-word">BORROWED</div>
      <div class="cn-time-stamp"><span>TIME LOAN</span><strong>ARGENTINA · 10</strong><span>RETURN: FINAL WHISTLE</span></div>
      <div class="cn-time-due"><span>EVERY BEAUTIFUL THING HAS A DUE DATE</span><strong>NOT YET.</strong></div>
      <p class="cn-signature-thesis"><strong>Thời gian không dừng lại.</strong>Chúng ta chỉ được mượn anh thêm một mùa hè.</p>`);
    const anchor = document.querySelector('.story-diptych') || document.querySelector('.article-body .article-lead');
    insertAfter(anchor, scene);
  }

  if (type === 'ronaldo') {
    scene = section('ronaldo-room', `
      <div class="cn-signature-top"><span>PORTUGAL · 7</span><b>THE LAST EMPTY ROOM</b><span>WORLD CUP</span></div>
      <div class="cn-room-corridor"><div class="cn-room-floor"></div>
        <div class="cn-room-door d1"><span>CHAMPIONS LEAGUE</span></div><div class="cn-room-door d2"><span>BALLON D'OR</span></div>
        <div class="cn-room-door d3"><span>EURO</span></div><div class="cn-room-door d4"><span>RECORDS</span></div>
        <div class="cn-room-number">7</div><div class="cn-room-empty"><strong>WORLD CUP</strong></div>
      </div>
      <p class="cn-signature-thesis"><strong>Mọi căn phòng khác đều đã sáng.</strong>Chỉ có một cánh cửa vẫn chưa bao giờ bật đèn.</p>`);
    const anchor = document.querySelector('.pull-quote') || document.querySelector('.chapter-line');
    insertAfter(anchor, scene);
  }

  if (type === 'neymar') {
    scene = section('neymar-mirage', `
      <div class="cn-mirage-field"></div><div class="cn-mirage-horizon"></div>
      <div class="cn-signature-top"><span>BRAZIL · 10</span><b>THE MIRAGE</b><span>2014 → 2022 →</span></div>
      <div class="cn-mirage-word">THE ENDING<small>ALWAYS ONE HORIZON FARTHER</small></div><i class="cn-mirage-path"></i><div class="cn-mirage-palace"></div>
      <div class="cn-mirage-end"><span>THE KINGDOM NEVER ARRIVED</span><strong>But the dream was real.</strong></div>
      <p class="cn-signature-thesis"><strong>Mỗi lần tưởng đã chạm tới.</strong>Cái kết đẹp lại lùi xa thêm một đường chân trời.</p>`);
    const anchor = document.querySelector('.story-diptych') || document.querySelector('.pull-quote');
    insertAfter(anchor, scene);
  }

  if (!scene) return;

  const render = () => {
    if (!near(scene)) return;
    const p = reduceMotion ? 1 : stageProgress(scene);

    if (type === 'robben') {
      const run = ease(map(p, .04, .59));
      const block = ease(map(p, .55, .74));
      scene.style.setProperty('--cn-gap-travel', String(.06 + .76 * run));
      scene.style.setProperty('--cn-gap-ball', String(.06 + .76 * run - .045 * block));
      scene.style.setProperty('--cn-gap-block', String(block));
    }
    if (type === 'hagi') {
      scene.style.setProperty('--cn-door-open', String(ease(map(p, .08, .68))));
      scene.style.setProperty('--cn-door-step', String(.08 + .92 * ease(map(p, .35, .82))));
    }
    if (type === 'baggio') {
      scene.style.setProperty('--cn-arrow-one', String(.03 + .97 * ease(map(p, .04, .37))));
      scene.style.setProperty('--cn-arrow-over', String(ease(map(p, .27, .46))));
      scene.style.setProperty('--cn-loop-turn', String(ease(map(p, .42, .9))));
    }
    if (type === 'messi') {
      scene.style.setProperty('--cn-sunset', String(ease(map(p, .02, .88))));
    }
    if (type === 'ronaldo') {
      const walk = ease(map(p, .04, .75));
      scene.style.setProperty('--cn-room-walk', String(walk));
      scene.style.setProperty('--cn-room-light', String(.15 + .85 * ease(map(p, .12, .52))));
      scene.style.setProperty('--cn-room-dark', String(ease(map(p, .55, .86))));
    }
    if (type === 'neymar') {
      const approach = ease(map(p, .04, .5));
      const retreat = ease(map(p, .48, .82));
      scene.style.setProperty('--cn-mirage-path', String(.05 + .95 * approach));
      scene.style.setProperty('--cn-mirage-focus', String(Math.max(.12, approach * (1 - retreat * .58))));
      scene.style.setProperty('--cn-mirage-scale', String(Math.max(.12, approach * (1 - retreat * .52))));
      scene.style.setProperty('--cn-mirage-word', String(.14 + .7 * approach * (1 - retreat * .55)));
      scene.style.setProperty('--cn-mirage-end', String(ease(map(p, .68, .91))));
    }
  };

  let raf = 0;
  const schedule = () => {
    if (raf || document.hidden) return;
    raf = requestAnimationFrame(() => { raf = 0; render(); });
  };
  addEventListener('scroll', schedule, { passive:true });
  addEventListener('resize', schedule, { passive:true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); });
  requestAnimationFrame(render);
})();
