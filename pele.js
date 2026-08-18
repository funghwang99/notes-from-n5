(() => {
  const root = document.querySelector('.pele-page');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const states = Array.from(document.querySelectorAll('[data-name-state]'));
  const sections = Array.from(document.querySelectorAll('[data-pele-section]'));
  const namingStage = document.querySelector('[data-naming-stage]');
  const namingAge = namingStage?.querySelector('.pele-naming-age');
  const namingYear = namingStage?.querySelector('.pele-naming-year');
  const namingName = namingStage?.querySelector('strong');
  const orbit = document.querySelector('[data-pele-orbit]');
  const orbitRings = orbit ? Array.from(orbit.querySelectorAll('.pele-orbit-ring')) : [];
  const pass = document.querySelector('[data-final-pass]');
  const passBall = pass?.querySelector('.pele-pass-ball');
  const passEnd = pass?.querySelector('.pele-pass-end');
  const relics = Array.from(document.querySelectorAll('[data-relic]'));
  const relicLabels = Array.from(document.querySelectorAll('.pele-relic .pele-label'));
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  if (passEnd) passEnd.textContent = 'CA';
  if (relicLabels[0]) relicLabels[0].textContent = 'Brazil × England';
  if (relicLabels[1]) relicLabels[1].textContent = 'Brazil × Uruguay';

  const setState = (value) => states.forEach((node) => node.classList.toggle('is-active', node.dataset.nameState === value));
  const localProgress = (el) => {
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
  };

  const update = () => {
    if (namingStage && !reduceMotion) {
      const p = localProgress(namingStage);
      if (namingAge) namingAge.style.transform = `translateY(${(p - .5) * -42}px)`;
      if (namingYear) namingYear.style.transform = `translateY(${(p - .5) * 62}px)`;
      if (namingName) namingName.style.transform = `translateX(${(1 - p) * 36}px)`;
    }

    if (orbitRings.length && !reduceMotion) {
      const p = localProgress(orbit);
      orbitRings.forEach((ring, index) => {
        const dir = index % 2 ? -1 : 1;
        ring.style.transform = `rotate(${dir * (p - .5) * (22 + index * 9)}deg) scale(${.96 + p * .07})`;
      });
    }

    if (pass && passBall) {
      const p = reduceMotion ? .78 : localProgress(pass);
      passBall.style.left = `${14 + p * 72}%`;
    }

    relics.forEach((relic, index) => {
      if (reduceMotion) return;
      const p = localProgress(relic);
      relic.style.setProperty('--relic-shift', `${(p - .5) * (index ? -14 : 14)}px`);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setState(visible.target.dataset.peleSection);
    }, { rootMargin:'-28% 0px -50% 0px', threshold:[0,.1,.3,.6] });
    sections.forEach((section) => observer.observe(section));
  } else if (states[0]) states[0].classList.add('is-active');

  update();
  window.addEventListener('scroll', update, { passive:true });
  window.addEventListener('resize', update, { passive:true });
})();