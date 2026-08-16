(() => {
  const body = document.body;
  const clockState = document.querySelector('[data-cruyff-clock-state]');
  const pauses = Array.from(document.querySelectorAll('[data-cruyff-pause]'));
  const fields = Array.from(document.querySelectorAll('[data-motion-field]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setPauseState = (active) => {
    body.classList.toggle('is-fourteen', active);
    if (clockState) clockState.textContent = active ? 'MATCH PAUSED' : 'IN MOTION';
  };

  if ('IntersectionObserver' in window && pauses.length) {
    let activeCount = 0;
    const pauseObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          activeCount += 1;
        } else {
          entry.target.classList.remove('is-active');
          activeCount = Math.max(0, activeCount - 1);
        }
      });
      setPauseState(activeCount > 0);
    }, { threshold: 0.52 });

    pauses.forEach((section) => pauseObserver.observe(section));
  } else {
    pauses.forEach((section) => section.classList.add('is-active'));
  }

  if (reduceMotion || !fields.length) return;

  let ticking = false;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  const updateMotion = () => {
    const viewport = window.innerHeight || 1;
    fields.forEach((field) => {
      const rect = field.getBoundingClientRect();
      const progress = clamp((viewport - rect.top) / (rect.height + viewport));
      field.querySelectorAll('.cruyff-node').forEach((node, index) => {
        const dx = Number(node.dataset.dx || 0);
        const dy = Number(node.dataset.dy || 0);
        const stagger = (index - 2.5) * 0.035;
        const local = clamp(progress + stagger);
        const x = dx * (local - .5);
        const y = dy * Math.sin(local * Math.PI);
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        node.style.opacity = String(.44 + local * .56);
      });
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateMotion);
  };

  updateMotion();
  window.addEventListener('scroll', requestUpdate, { passive:true });
  window.addEventListener('resize', requestUpdate);
})();
