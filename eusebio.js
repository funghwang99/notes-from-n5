(() => {
  const page = document.querySelector('.eusebio-page');
  if (!page) return;

  const structuralFix = document.createElement('style');
  structuralFix.textContent = '.pantera-opening.pantera-copy{width:100%;max-width:none;margin:0;font-family:inherit;font-size:inherit;line-height:inherit}.pantera-opening>.article-lead{width:min(760px,calc(100% - 3rem));margin:0 auto;font-family:var(--serif)}';
  document.head.append(structuralFix);

  const rail = document.querySelector('[data-pantera-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    rail.style.height = `${progress * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const comeback = document.querySelector('[data-comeback]');
  const portugal = document.querySelector('[data-score-portugal]');
  const korea = document.querySelector('[data-score-korea]');
  let played = false;

  const playComeback = () => {
    if (played || !portugal || !korea) return;
    played = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      portugal.textContent = '5';
      korea.textContent = '3';
      comeback?.classList.add('is-complete');
      return;
    }
    const frames = [
      ['0','3'], ['1','3'], ['2','3'], ['3','3'], ['4','3'], ['5','3']
    ];
    frames.forEach(([p,k], index) => setTimeout(() => {
      portugal.textContent = p;
      korea.textContent = k;
      if (index === frames.length - 1) comeback?.classList.add('is-complete');
    }, index * 440));
  };

  if ('IntersectionObserver' in window && comeback) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        playComeback();
        observer.disconnect();
      }
    }, { threshold:.48 });
    observer.observe(comeback);
  } else {
    playComeback();
  }

  const sections = [...document.querySelectorAll('[data-pantera-section]')];
  const root = document.documentElement;
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.panteraScene = active.target.dataset.panteraSection || '';
    }, { rootMargin:'-25% 0px -45%', threshold:[.15,.4,.7] });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
