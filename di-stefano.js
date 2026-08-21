(() => {
  if (window.__N5_DI_STEFANO__) return;
  window.__N5_DI_STEFANO__ = true;

  const birthEra = document.querySelector('.ds-birth-top span:last-child');
  const glasgowEra = document.querySelector('.ds-glasgow-meta span:last-child');
  const everywhereMark = document.querySelector('.ds-everywhere-center strong');
  if (birthEra) birthEra.textContent = 'EUROPE · FIRST SEASON';
  if (glasgowEra) glasgowEra.textContent = 'FINAL 05';
  if (everywhereMark) everywhereMark.textContent = 'EVERYWHERE';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const progress = (el, start = .9, end = -.1) => {
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const from = vh * start;
    const to = vh * end - r.height;
    return clamp((from - r.top) / Math.max(1, from - to));
  };
  const near = (el, pad = 1.35) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return r.bottom > -vh * pad && r.top < vh * (1 + pad);
  };

  const hero = document.querySelector('.ds-hero');
  const birth = document.querySelector('.ds-birth');
  const book = document.querySelector('.ds-book');
  const pages = [...document.querySelectorAll('.ds-page')];
  const bookBars = [...document.querySelectorAll('.ds-book-progress span')];
  const glasgow = document.querySelector('.ds-glasgow');
  const everywhere = document.querySelector('.ds-everywhere');
  const blank = document.querySelector('.ds-blank');
  const ending = document.querySelector('.ds-ending');
  const years = [...document.querySelectorAll('.ds-ending-year')];
  const stamps = [...document.querySelectorAll('.ds-ending-stamps span')];

  let ticking = false;
  const update = () => {
    ticking = false;

    if (hero && near(hero, .4)) {
      const p = reduceMotion ? 1 : progress(hero, .98, .15);
      hero.style.setProperty('--ds-hero-progress', p.toFixed(4));
    }

    if (birth && near(birth, .6)) {
      const p = reduceMotion ? 1 : progress(birth, .86, .15);
      birth.style.setProperty('--ds-birth-progress', p.toFixed(4));
    }

    if (book && near(book, .25)) {
      const r = book.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(1, r.height - vh);
      const p = reduceMotion ? 1 : clamp((-r.top) / total);
      const exact = p * pages.length;
      const index = Math.min(pages.length - 1, Math.floor(exact));
      const local = clamp(exact - index);
      book.dataset.chapter = String(index + 1);
      book.style.setProperty('--ds-book-progress', p.toFixed(4));
      book.style.setProperty('--ds-page-local', local.toFixed(4));

      pages.forEach((page, i) => {
        const d = i - exact;
        let x = 0;
        let y = 0;
        let rot = 0;
        let scale = 1;
        let opacity = 1;
        if (d < -1) {
          x = -112;
          rot = -8;
          opacity = .05;
        } else if (d < 0) {
          const t = 1 + d;
          x = -112 * (1 - t);
          rot = -8 * (1 - t);
          opacity = .08 + t * .92;
        } else {
          x = Math.min(8, d * 2.2);
          y = Math.min(20, d * 7);
          scale = Math.max(.92, 1 - d * .018);
          opacity = Math.max(.22, 1 - d * .16);
        }
        page.style.transform = `translate3d(${x}%,${y}px,0) rotateY(${rot}deg) scale(${scale})`;
        page.style.opacity = String(opacity);
        page.style.zIndex = String(20 - i + (i === index ? 20 : 0));
      });

      bookBars.forEach((bar, i) => {
        let fill = 0;
        if (i < index) fill = 1;
        else if (i === index) fill = local;
        bar.style.setProperty('--fill', String(fill));
      });
    }

    if (glasgow && near(glasgow, .65)) {
      const p = reduceMotion ? 1 : progress(glasgow, .85, .08);
      glasgow.style.setProperty('--ds-glasgow-progress', p.toFixed(4));
    }

    if (everywhere && near(everywhere, .65)) {
      const p = reduceMotion ? 1 : progress(everywhere, .86, .08);
      everywhere.style.setProperty('--ds-everywhere-progress', p.toFixed(4));
    }

    if (blank && near(blank, .3)) {
      const r = blank.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = reduceMotion ? 1 : clamp((-r.top) / Math.max(1, r.height - vh));
      blank.style.setProperty('--ds-blank-progress', p.toFixed(4));
    }

    if (ending && near(ending, .25)) {
      const r = ending.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = reduceMotion ? 1 : clamp((-r.top) / Math.max(1, r.height - vh));
      const eased = 1 - Math.pow(1 - p, 2.1);
      ending.style.setProperty('--ds-ending-progress', eased.toFixed(4));
      const lit = Math.min(5, Math.floor(p * 6.3));
      years.forEach((year, i) => year.classList.toggle('is-lit', i < lit));
      stamps.forEach((stamp, i) => {
        const s = clamp((p - (.10 + i * .11)) / .14);
        stamp.style.setProperty('--stamp', s.toFixed(3));
      });
    }
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  addEventListener('load', request, { once: true });
  request();
})();
