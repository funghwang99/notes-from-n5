/* Notes from N5 / Chưa Nguôi — The Final He Could Never Play.
   Progressive enhancement. All article content remains visible without JS. */
(() => {
  'use strict';
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof IntersectionObserver === 'undefined') return;
  const items = [...document.querySelectorAll('.bk-reveal')];
  const observer = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      o.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px 60px 0px', threshold: 0.01 });
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * .96 || rect.bottom < 0) item.classList.add('is-visible');
    else observer.observe(item);
  });
  document.body.classList.add('bk-motion');

  // The referee's card moves once only, and always remains visible.
  const yellowCard = document.querySelector('.bk-yellow-card');
  if (yellowCard) {
    const cardObserver = new IntersectionObserver((entries, watch) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        yellowCard.classList.add('is-in-view');
        watch.disconnect();
      }
    }, { threshold: 0.25 });
    cardObserver.observe(yellowCard);
  }
})();
