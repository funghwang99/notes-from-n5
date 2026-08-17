(() => {
  const root = document.querySelector('.kaiser-page');
  if (!root) return;

  const axisFill = document.querySelector('[data-kaiser-axis-fill]');
  const markers = Array.from(document.querySelectorAll('[data-kaiser-marker]'));
  const sections = Array.from(document.querySelectorAll('[data-kaiser-section]'));
  const libero = document.querySelector('[data-kaiser-libero]');
  const ball = document.querySelector('[data-kaiser-ball]');
  const bridge = document.querySelector('.kaiser-bridge');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  const setActiveYear = (year) => {
    markers.forEach((marker) => marker.classList.toggle('is-active', marker.dataset.kaiserMarker === year));
  };

  const update = () => {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pageProgress = clamp(window.scrollY / maxScroll);
    if (axisFill) axisFill.style.height = `${pageProgress * 100}%`;

    if (libero && ball) {
      const rect = libero.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const local = clamp((window.innerHeight - rect.top) / span);
      const eased = reduceMotion ? .62 : 0.12 + local * 0.76;
      ball.style.left = `${eased * 100}%`;
    }

    if (bridge) {
      const rect = bridge.getBoundingClientRect();
      const local = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      bridge.style.setProperty('--kaiser-progress', String(local));
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveYear(visible.target.dataset.kaiserSection);
    }, { rootMargin: '-28% 0px -52% 0px', threshold: [0, .1, .35, .65] });
    sections.forEach((section) => observer.observe(section));
  } else if (markers[0]) {
    markers[0].classList.add('is-active');
  }

  update();
  window.addEventListener('scroll', update, { passive:true });
  window.addEventListener('resize', update, { passive:true });
})();