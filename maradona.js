(() => {
  const root = document.querySelector('.maradona-page');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const map = (v, a, b) => clamp((v - a) / Math.max(.0001, b - a));
  const ease = (t) => 1 - Math.pow(1 - clamp(t), 3);
  const mix = (a, b, t) => a + (b - a) * t;

  const hero = document.querySelector('.maradona-hero');
  const four = document.querySelector('[data-four-minutes]');
  const handBall = four?.querySelector('.maradona-hand-ball');
  const handPhoto = four?.querySelector('.maradona-goal--hand .maradona-goal-photo');
  const feetPhoto = four?.querySelector('.maradona-goal--feet .maradona-goal-photo');
  const fourClock = four?.querySelector('[data-four-clock]');
  const dribbleBall = four?.querySelector('.maradona-dribble-ball');
  const dribblePath = four?.querySelector('.maradona-dribble path');
  const fourCenter = four?.querySelector('.maradona-four-center');
  const convergence = document.querySelector('.maradona-convergence');
  const convergenceCopy = convergence?.querySelector('.maradona-convergence-copy');
  const tracked = [hero, four, convergence].filter(Boolean);
  const visible = new Set();
  let pointerSplit = null;

  const progress = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / travel);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
    }, { rootMargin:'60% 0px', threshold:0.01 });
    tracked.forEach((node) => observer.observe(node));
  } else {
    tracked.forEach((node) => visible.add(node));
  }

  const updateHero = () => {
    if (!hero) return;
    if (pointerSplit !== null && !reduceMotion) {
      hero.style.setProperty('--hero-left', `${pointerSplit}%`);
      return;
    }
    if (reduceMotion) {
      hero.style.setProperty('--hero-left', '50%');
      return;
    }
    const rect = hero.getBoundingClientRect();
    const p = clamp((0 - rect.top) / Math.max(1, hero.offsetHeight));
    const split = 50 + Math.sin(p * Math.PI) * 2.4;
    hero.style.setProperty('--hero-left', `${split}%`);
  };

  const updateFour = () => {
    if (!four) return;
    const p = reduceMotion ? 1 : progress(four);

    const handP = ease(map(p, .04, .42));
    const handX = mix(23, 73, handP);
    const handY = mix(72, 31, handP);
    if (handBall) {
      handBall.style.setProperty('--hand-x', `${handX}%`);
      handBall.style.setProperty('--hand-y', `${handY}%`);
    }

    const handFade = 1 - ease(map(p, .42, .62));
    if (handPhoto) handPhoto.style.setProperty('--goal-photo', String(.08 + handP * handFade * .3));

    const dribbleP = ease(map(p, .42, .9));
    const samples = [
      [8,78],[20,67],[31,51],[43,46],[53,31],[65,35],[74,51],[84,43],[94,23]
    ];
    const scaled = dribbleP * (samples.length - 1);
    const index = Math.min(samples.length - 2, Math.floor(scaled));
    const local = scaled - index;
    const a = samples[index];
    const b = samples[index + 1];
    if (dribbleBall) {
      dribbleBall.style.setProperty('--dribble-x', `${mix(a[0], b[0], local)}%`);
      dribbleBall.style.setProperty('--dribble-y', `${mix(a[1], b[1], local)}%`);
    }
    if (dribblePath) dribblePath.style.setProperty('--dribble-offset', String(1 - dribbleP));
    if (feetPhoto) feetPhoto.style.setProperty('--goal-photo', String(.07 + ease(map(p, .38, .72)) * .28));

    if (fourClock) {
      const clockP = ease(map(p, .26, .72));
      const remaining = Math.max(0, Math.round((1 - clockP) * 240));
      const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
      const seconds = String(remaining % 60).padStart(2, '0');
      fourClock.textContent = `${minutes}:${seconds}`;
    }

    if (fourCenter) {
      const enter = ease(map(p, .3, .5));
      const leave = 1 - ease(map(p, .72, .92));
      const opacity = Math.max(.18, Math.min(1, enter, leave));
      fourCenter.style.setProperty('--four-center-opacity', String(opacity));
      fourCenter.style.setProperty('--four-center-scale', String(.9 + opacity * .1));
    }
  };

  const updateConvergence = () => {
    if (!convergence) return;
    const p = reduceMotion ? 1 : progress(convergence);
    convergence.style.setProperty('--converge-line', String(1 - ease(map(p, .42, .9)) * .92));
    if (convergenceCopy) {
      const opacity = ease(map(p, .12, .48));
      convergenceCopy.style.setProperty('--converge-copy', String(.12 + opacity * .88));
    }
  };

  let raf = 0;
  const update = () => {
    raf = 0;
    if (visible.has(hero)) updateHero();
    if (visible.has(four)) updateFour();
    if (visible.has(convergence)) updateConvergence();
  };
  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };

  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      pointerSplit = clamp(((event.clientX - rect.left) / Math.max(1, rect.width)) * 100, 26, 74);
      hero.classList.add('is-pointer-active');
      schedule();
    }, { passive:true });
    hero.addEventListener('pointerleave', () => {
      pointerSplit = null;
      hero.classList.remove('is-pointer-active');
      schedule();
    }, { passive:true });
  }

  schedule();
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule, { passive:true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); });
})();
