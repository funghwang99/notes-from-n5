(() => {
  const field = document.querySelector('[data-ash-field]');
  if (!field || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = window.innerWidth < 700 ? 28 : 52;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'ash-particle';
    particle.style.setProperty('--x', `${Math.random() * 100}%`);
    particle.style.setProperty('--s', `${0.12 + Math.random() * 0.34}rem`);
    particle.style.setProperty('--o', `${0.16 + Math.random() * 0.42}`);
    particle.style.setProperty('--b', `${Math.random() * 1.4}px`);
    particle.style.setProperty('--d', `${8 + Math.random() * 12}s`);
    particle.style.setProperty('--delay', `${-Math.random() * 18}s`);
    particle.style.setProperty('--dx', `${-9 + Math.random() * 18}vw`);
    fragment.append(particle);
  }

  field.append(fragment);
})();
