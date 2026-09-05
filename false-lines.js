(() => {
  const page = document.querySelector('.false-lines-page');
  if (!page) return;

  const photoFix = document.createElement('style');
  photoFix.textContent = `
    @media (min-width:981px){
      .false-lines-page .false-photo-triptych{
        grid-template-columns:repeat(3,minmax(0,1fr));
        align-items:stretch;
      }
      .false-lines-page .false-photo-card,
      .false-lines-page .false-photo-card--small{
        min-height:0;
        aspect-ratio:4/5;
      }
      .false-lines-page .false-photo-card img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
      .false-lines-page .false-photo-card:nth-child(1) img{object-position:center 30%;}
      .false-lines-page .false-photo-card:nth-child(2) img{object-position:center 42%;}
      .false-lines-page .false-photo-card:nth-child(3) img{object-position:center 28%;}
    }
  `;
  document.head.append(photoFix);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rail = document.querySelector('[data-false-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(100, Math.max(0, scrollY / max * 100))}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const consoleBox = document.querySelector('[data-false-console]');
  if (consoleBox && !reduced) {
    const values = [...consoleBox.querySelectorAll('[data-console-value]')];
    const confidence = consoleBox.querySelector('[data-confidence]');
    const frames = [
      ['12','8.4','17','0.8','96%'],
      ['18','7.9','23','0.6','97%'],
      ['25','7.4','31','0.5','98%'],
      ['31','6.8','38','0.4','99%']
    ];
    let index = 0;
    const tick = () => {
      index = (index + 1) % frames.length;
      values.forEach((node,i) => { if (node) node.textContent = frames[index][i]; });
      if (confidence) confidence.textContent = frames[index][4];
    };
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      tick();
      const id = setInterval(tick, 1150);
      observer.disconnect();
      const stop = new IntersectionObserver((entries2) => {
        if (entries2.some((entry) => entry.isIntersecting)) return;
        clearInterval(id);
        stop.disconnect();
      }, { rootMargin:'110% 0px' });
      stop.observe(consoleBox);
    }, { threshold:.35 });
    observer.observe(consoleBox);
  }

  const overload = document.querySelector('[data-false-overload]');
  if (overload) {
    const status = overload.querySelector('[data-fuse-status]');
    const trigger = () => {
      overload.classList.add('is-overloaded');
      if (status) status.textContent = 'OVERLOAD';
    };
    if (reduced || !('IntersectionObserver' in window)) trigger();
    else {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setTimeout(trigger, 650);
        observer.disconnect();
      }, { threshold:.48 });
      observer.observe(overload);
    }
  }

  const modeSwitch = document.querySelector('[data-false-switch]');
  if (modeSwitch) {
    const buttons = [...modeSwitch.querySelectorAll('[data-false-mode]')];
    const copy = modeSwitch.querySelector('[data-false-switch-copy]');
    const setMode = (mode) => {
      const feel = mode === 'feel';
      modeSwitch.classList.toggle('is-feel', feel);
      buttons.forEach((button) => {
        const active = button.dataset.falseMode === mode;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      if (copy) copy.textContent = feel ? 'Không còn tọa độ đúng. Chỉ còn đúng thời điểm.' : 'Mọi thứ đang ở đúng tọa độ.';
    };
    buttons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.falseMode)));
  }

  const finish = document.querySelector('.false-lines-finish');
  if (finish) {
    const activate = () => finish.classList.add('is-live');
    if (reduced || !('IntersectionObserver' in window)) activate();
    else {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activate(); observer.disconnect();
      }, { threshold:.28 });
      observer.observe(finish);
    }
  }
})();
