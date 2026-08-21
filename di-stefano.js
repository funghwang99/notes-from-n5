(() => {
  if (window.__N5_DI_STEFANO_V2__) return;
  window.__N5_DI_STEFANO_V2__ = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const progress = (el, start = .92, end = -.12) => {
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const from = vh * start;
    const to = vh * end - r.height;
    return clamp((from - r.top) / Math.max(1, from - to));
  };
  const near = (el, pad = 1.2) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return r.bottom > -vh * pad && r.top < vh * (1 + pad);
  };

  const hero = document.querySelector('.ds2-hero');
  const whole = document.querySelector('.ds2-whole-pitch');
  const fieldZones = [...document.querySelectorAll('.ds2-field-zone')];
  const birth = document.querySelector('.ds2-birth');
  const five = document.querySelector('.ds2-five');
  const pillars = [...document.querySelectorAll('.ds2-pillar')];
  const meters = [...document.querySelectorAll('.ds2-five-meter span')];
  const vault = document.querySelector('.ds2-vault');
  const ending = document.querySelector('.ds2-ending');
  const roles = [...document.querySelectorAll('.ds2-ending-role')];

  let ticking = false;
  const update = () => {
    ticking = false;

    if (hero && near(hero, .45)) {
      const p = reduceMotion ? 1 : progress(hero, 1, .08);
      hero.style.setProperty('--hero-p', p.toFixed(4));
    }

    if (whole && near(whole, .35)) {
      const p = reduceMotion ? 1 : progress(whole, .98, -.03);
      whole.style.setProperty('--field-p', p.toFixed(4));
      const scaled = p * fieldZones.length;
      fieldZones.forEach((zone, index) => {
        const local = clamp(scaled - index, 0, 1);
        zone.style.setProperty('--zone-glow', local.toFixed(3));
        zone.classList.toggle('is-active', local > .18);
      });
    }

    if (birth && near(birth, .35)) {
      const p = reduceMotion ? 1 : progress(birth, .98, .05);
      birth.style.setProperty('--birth-p', p.toFixed(4));
    }

    if (five && near(five, .3)) {
      const p = reduceMotion ? 1 : progress(five, .98, -.03);
      five.style.setProperty('--five-p', p.toFixed(4));
      const scaled = p * pillars.length;
      pillars.forEach((pillar, index) => {
        const local = clamp(scaled - index, 0, 1);
        pillar.style.setProperty('--light', local.toFixed(3));
        if (meters[index]) meters[index].style.setProperty('--fill', local.toFixed(3));
      });
    }

    if (vault && near(vault, .55)) {
      const p = reduceMotion ? 1 : progress(vault, .94, .08);
      vault.style.setProperty('--vault-p', p.toFixed(4));
    }

    if (ending && near(ending, .25)) {
      const p = reduceMotion ? 1 : progress(ending, .98, -.02);
      ending.style.setProperty('--end-p', p.toFixed(4));
      roles.forEach((role, index) => {
        const start = index * .055;
        const fade = clamp(1 - (p - start) * 2.25, .02, .16);
        role.style.setProperty('--role-o', fade.toFixed(3));
      });
    }
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  addEventListener('scroll', request, { passive:true });
  addEventListener('resize', request, { passive:true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) request(); });
  request();
})();
