/* Notes from N5 — The Statue That Moved Again.
   Progressive enhancements only: article remains fully readable without scripts. */
(() => {
  'use strict';
  const doc = document;
  const nav = Array.from(doc.querySelectorAll('[data-th-nav]'));
  const allSections = Array.from(doc.querySelectorAll('#th-beginning,#th-highbury,#th-bronze,#th-return,#th-goal,#th-after,#th-end'));
  if (!nav.length || !allSections.length) return;
  const setCurrent = (id) => {
    for (const link of nav) {
      if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  setCurrent('th-beginning');
  if (typeof IntersectionObserver !== 'undefined') {
    const chapters = new IntersectionObserver((entries) => {
      for (const item of entries) {
        if (item.isIntersecting) setCurrent(item.target.id);
      }
    }, { rootMargin: '-30% 0px -54% 0px', threshold: 0 });
    for (const chapter of allSections) chapters.observe(chapter);
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      const revealEls = Array.from(doc.querySelectorAll('.th-reveal'));
      const reveal = new IntersectionObserver((entries, obs) => {
        for (const entry of entries) if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      }, { rootMargin: '0px 0px 80px 0px', threshold: .01 });
      revealEls.forEach((el) => { el.classList.add('is-visible'); });
      doc.body.classList.add('th-animated');
      requestAnimationFrame(() => {
        revealEls.forEach((el) => {
          el.classList.remove('is-visible');
          if (el.getBoundingClientRect().top < window.innerHeight * .95) el.classList.add('is-visible');
          else reveal.observe(el);
        });
      });
    }
  }
})();