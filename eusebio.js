(() => {
  const page = document.querySelector('.eusebio-page');
  if (!page) return;

  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const buildSignatureLayer = () => {
    if (!document.querySelector('.pantera-ambient')) {
      const ambient = document.createElement('div');
      ambient.className = 'pantera-ambient';
      ambient.setAttribute('aria-hidden', 'true');
      ambient.innerHTML = '<span class="pantera-orb pantera-orb--1"></span><span class="pantera-orb pantera-orb--2"></span><span class="pantera-orb pantera-orb--3"></span><span class="pantera-claws"><i></i><i></i><i></i></span>';
      page.prepend(ambient);
    }

    const rail = document.querySelector('.pantera-rail');
    if (rail && !document.querySelector('.pantera-state')) {
      const state = document.createElement('aside');
      state.className = 'pantera-state';
      state.setAttribute('aria-hidden', 'true');
      state.innerHTML = '<span data-pantera-word="mafalala">DUST</span><span data-pantera-word="amsterdam">BURST</span><span data-pantera-word="speed">THREAT</span><span data-pantera-word="goodison">COMEBACK</span><span data-pantera-word="wembley">GRACE</span><span data-pantera-word="legacy">MEMORY</span><span data-pantera-word="panteao">HONOUR</span>';
      rail.insertAdjacentElement('afterend', state);
    }

    const comeback = document.querySelector('[data-comeback]');
    if (comeback && !comeback.querySelector('.pantera-goal-track')) {
      const track = document.createElement('div');
      track.className = 'pantera-goal-track';
      track.setAttribute('aria-hidden', 'true');
      track.innerHTML = '<span class="pantera-goal-chip is-korea">KOREA I</span><span class="pantera-goal-chip is-korea">KOREA II</span><span class="pantera-goal-chip is-korea">KOREA III</span><span class="pantera-goal-chip is-portugal">EUSÉBIO I</span><span class="pantera-goal-chip is-portugal">EUSÉBIO II</span><span class="pantera-goal-chip is-portugal">EUSÉBIO III</span><span class="pantera-goal-chip is-portugal">EUSÉBIO IV</span><span class="pantera-goal-chip is-portugal">JOSÉ AUGUSTO</span>';
      const final = comeback.querySelector('.pantera-comeback-final');
      if (final) comeback.insertBefore(track, final);
      else comeback.append(track);
    }

    const goodisonCopy = document.querySelector('.pantera-goodison .pantera-copy--light');
    if (goodisonCopy && !document.querySelector('.pantera-goodison-note')) {
      const note = document.createElement('div');
      note.className = 'pantera-goodison-note reveal';
      note.innerHTML = '<b>BOBBY CHARLTON</b>Một trong những màn trình diễn cá nhân hay nhất ông từng chứng kiến.';
      goodisonCopy.insertAdjacentElement('afterend', note);
    }

    const memorial = document.querySelector('.pantera-memorial');
    if (memorial && !document.querySelector('.pantera-honour')) {
      const honour = document.createElement('div');
      honour.className = 'pantera-honour reveal';
      honour.innerHTML = '<span>JANUARY 2014<br>3 DAYS NATIONAL MOURNING</span><i></i><strong>EUSÉBIO</strong><i></i><span>2015<br>PANTEÃO NACIONAL</span>';
      memorial.insertAdjacentElement('afterend', honour);
    }

    const finish = document.querySelector('.pantera-finish');
    if (finish && !finish.querySelector('.pantera-canon')) {
      const canon = document.createElement('div');
      canon.className = 'pantera-canon reveal';
      canon.setAttribute('aria-hidden', 'true');
      canon.innerHTML = '<span>FROM THE DUST</span><i></i><span>INTO MEMORY</span><strong>Panteão.</strong>';
      finish.prepend(canon);
    }

    if (finish && !finish.querySelector('.pantera-final-map')) {
      const route = document.createElement('div');
      route.className = 'pantera-final-map reveal';
      route.setAttribute('aria-hidden', 'true');
      route.innerHTML = '<span>MAFALALA</span><i></i><span>LISBON</span><i></i><span>AMSTERDAM</span><i></i><span>GOODISON</span><i></i><span>WEMBLEY</span><i></i><strong>PANTEÃO</strong>';
      const copy = finish.querySelector('.pantera-copy--finish');
      if (copy) copy.insertAdjacentElement('afterend', route);
      else finish.append(route);
    }
  };

  buildSignatureLayer();

  const railFill = document.querySelector('[data-pantera-rail]');
  const updateScrollState = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    if (railFill) railFill.style.height = `${progress * 100}%`;
    root.style.setProperty('--pantera-scroll', `${scrollY * -.06}px`);
  };
  updateScrollState();
  addEventListener('scroll', updateScrollState, { passive:true });
  addEventListener('resize', updateScrollState, { passive:true });

  if (!reducedMotion) {
    addEventListener('pointermove', (event) => {
      root.style.setProperty('--pantera-glow-x', `${(event.clientX / innerWidth) * 100}%`);
      root.style.setProperty('--pantera-glow-y', `${(event.clientY / innerHeight) * 100}%`);
    }, { passive:true });
  }

  const heroPhoto = document.querySelector('.pantera-hero-photo');
  if (heroPhoto && !reducedMotion) {
    const resetTilt = () => {
      heroPhoto.style.setProperty('--pantera-tilt-x', '0deg');
      heroPhoto.style.setProperty('--pantera-tilt-y', '0deg');
    };
    heroPhoto.addEventListener('pointermove', (event) => {
      const rect = heroPhoto.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(1, rect.width);
      const y = (event.clientY - rect.top) / Math.max(1, rect.height);
      heroPhoto.style.setProperty('--pantera-tilt-y', `${(x - .5) * 7}deg`);
      heroPhoto.style.setProperty('--pantera-tilt-x', `${(.5 - y) * 7}deg`);
    });
    heroPhoto.addEventListener('pointerleave', resetTilt);

    const updateHeroLift = () => {
      const rect = heroPhoto.getBoundingClientRect();
      const lift = Math.max(-16, Math.min(16, (innerHeight * .48 - rect.top) * .035));
      heroPhoto.style.setProperty('--pantera-lift', `${lift}px`);
    };
    updateHeroLift();
    addEventListener('scroll', updateHeroLift, { passive:true });
    addEventListener('resize', updateHeroLift, { passive:true });
  }

  const comeback = document.querySelector('[data-comeback]');
  const portugal = document.querySelector('[data-score-portugal]');
  const korea = document.querySelector('[data-score-korea]');
  const chips = [...document.querySelectorAll('.pantera-goal-chip')];
  let played = false;

  const playComeback = () => {
    if (played || !portugal || !korea) return;
    played = true;

    if (reducedMotion) {
      portugal.textContent = '5';
      korea.textContent = '3';
      chips.forEach((chip) => chip.classList.add('is-lit'));
      comeback?.classList.add('is-complete');
      return;
    }

    const steps = [
      { delay:0, chip:0, p:'0', k:'3' },
      { delay:180, chip:1, p:'0', k:'3' },
      { delay:360, chip:2, p:'0', k:'3' },
      { delay:900, chip:3, p:'1', k:'3' },
      { delay:1330, chip:4, p:'2', k:'3' },
      { delay:1760, chip:5, p:'3', k:'3' },
      { delay:2190, chip:6, p:'4', k:'3' },
      { delay:2740, chip:7, p:'5', k:'3', complete:true }
    ];

    steps.forEach((step) => setTimeout(() => {
      portugal.textContent = step.p;
      korea.textContent = step.k;
      chips[step.chip]?.classList.add('is-lit');
      if (step.complete) comeback?.classList.add('is-complete');
    }, step.delay));
  };

  if ('IntersectionObserver' in window && comeback) {
    const comebackObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        playComeback();
        comebackObserver.disconnect();
      }
    }, { threshold:.42 });
    comebackObserver.observe(comeback);
  } else {
    playComeback();
  }

  const sections = [...document.querySelectorAll('[data-pantera-section]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.panteraScene = active.target.dataset.panteraSection || '';
    }, { rootMargin:'-22% 0px -42%', threshold:[.12,.32,.58] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const wembleyMark = document.querySelector('.pantera-wembley-mark');
  if (wembleyMark && 'IntersectionObserver' in window) {
    const wembleyObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        wembleyMark.classList.add('is-visible');
        wembleyObserver.disconnect();
      }
    }, { threshold:.6 });
    wembleyObserver.observe(wembleyMark);
  }
})();
