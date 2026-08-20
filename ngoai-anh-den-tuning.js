(() => {
  const body = document.body;
  const isRice = body.classList.contains('layout-keystone');
  const isMask = body.classList.contains('layout-mask');
  if (!isRice && !isMask) return;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const progress = (el) => {
    const rect = el.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / travel);
  };

  const boot = (tries = 0) => {
    if (isRice) {
      const stage = document.querySelector('.nad-rice-stage');
      if (!stage) {
        if (tries < 120) requestAnimationFrame(() => boot(tries + 1));
        return;
      }
      const left = stage.querySelector('.nad-rice-node--left');
      const ten = stage.querySelector('.nad-rice-node--ten');
      const right = stage.querySelector('.nad-rice-node--right');
      const back = stage.querySelector('.nad-rice-node--back');
      if (left) left.textContent = '11';
      if (ten) ten.textContent = '10';
      if (right) right.textContent = '7';
      if (back) back.textContent = 'BACK LINE';
      return;
    }

    const stage = document.querySelector('.nad-mask-stage');
    if (!stage) {
      if (tries < 120) requestAnimationFrame(() => boot(tries + 1));
      return;
    }

    const people = [...stage.querySelectorAll('.nad-mask-person')];
    const main = stage.querySelector('.nad-mask-face');
    let raf = 0;

    const render = () => {
      raf = 0;
      const p = progress(stage);
      const cols = window.innerWidth <= 700 ? 6 : 10;
      const rows = Math.ceil(people.length / cols);
      const cx = (cols - 1) / 2;
      const cy = (rows - 1) / 2;
      const maxD = Math.hypot(cx, cy) || 1;

      if (main) main.style.setProperty('--mask-main', String(.86 + .16 * ease(clamp((p - .04) / .36))));

      people.forEach((node, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        const d = Math.hypot(x - cx, y - cy) / maxD;
        const threshold = .12 + d * .58;
        const lit = ease(clamp((p - threshold) / .15));
        node.style.setProperty('--mask-ripple', String(.05 + .86 * lit));
        node.style.setProperty('--mask-ripple-scale', String(.72 + .28 * lit));
        node.style.setProperty('--mask-ripple-y', `${(1 - lit) * 10}px`);
      });
    };

    const schedule = () => {
      if (raf || document.hidden) return;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('scroll', schedule, { passive:true });
    window.addEventListener('resize', schedule, { passive:true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); });
    schedule();
  };

  boot();
})();
