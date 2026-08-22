(() => {
  const page = document.querySelector('.muller-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MULLER_CLOSEUP = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gerd%20M%C3%BCller%20c1973%20%28cropped%29.jpg?width=1200';
  const heroImage = document.querySelector('.bomber-hero-photo img');
  if (heroImage) {
    heroImage.src = MULLER_CLOSEUP;
    heroImage.alt = 'Cận cảnh Gerd Müller vào khoảng năm 1973.';
    heroImage.style.objectPosition = 'center 24%';
    const caption = heroImage.closest('figure')?.querySelector('figcaption');
    if (caption) caption.textContent = 'Gerd Müller · c.1973 · Wikimedia Commons / Public domain';
  }

  if (!document.querySelector('link[href^="muller-wow.css"]')) {
    const wow = document.createElement('link');
    wow.rel = 'stylesheet';
    wow.href = 'muller-wow.css?v=20260822-bomber-wow-1';
    document.head.append(wow);
  }

  const buildArchiveAction = () => {
    const mexico = document.querySelector('.bomber-mexico');
    const tenGrid = mexico?.querySelector('.bomber-ten-grid');
    if (!mexico || !tenGrid || mexico.querySelector('.bomber-action-archive')) return;

    const style = document.createElement('style');
    style.textContent = '.bomber-action-archive{position:relative;width:min(1120px,calc(100% - 3rem));height:min(62vw,42rem);margin:0 auto 5rem;overflow:hidden}.bomber-action-archive img{width:100%;height:100%;object-fit:cover;object-position:center 36%;filter:grayscale(1) contrast(1.14) brightness(.76);transform:scale(1.015)}.bomber-action-archive:after{position:absolute;inset:0;background:linear-gradient(90deg,rgba(12,11,10,.15),transparent 46%,rgba(211,30,44,.09)),linear-gradient(0deg,rgba(12,11,10,.62),transparent 42%);content:""}.bomber-action-archive figcaption{position:absolute;z-index:2;right:1rem;bottom:1rem;color:#d6cec3;font-size:.54rem;letter-spacing:.11em;text-transform:uppercase}@media(max-width:700px){.bomber-action-archive{height:68svh}}';
    document.head.append(style);

    const figure = document.createElement('figure');
    figure.className = 'bomber-action-archive reveal';
    figure.innerHTML = '<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Sparta%20tegen%20Bayern%20M%C3%BCnchen%201-3%20Muller%20%28midden%29%20spring%20hoger%20dan%20Eykenbroek%20en%20%2C%20Bestanddeelnr%20924-0809.jpg?width=1800" alt="Gerd Müller tranh chấp trên không cho Bayern Munich năm 1970." loading="lazy" decoding="async" /><figcaption>Rotterdam · 09.12.1970 · Nationaal Archief / Anefo</figcaption>';
    tenGrid.insertAdjacentElement('afterend', figure);
    requestAnimationFrame(() => figure.classList.add('is-visible'));
  };
  buildArchiveAction();

  const buildSignature = () => {
    if (!document.querySelector('.bomber-focus')) {
      const focus = document.createElement('div');
      focus.className = 'bomber-focus';
      focus.setAttribute('aria-hidden', 'true');
      focus.innerHTML = '<span class="bomber-focus-frame"></span><span class="bomber-focus-target"></span><span class="bomber-focus-label"><span>SPACE</span><strong>SHRINKS</strong></span>';
      page.prepend(focus);
    }

    if (!document.querySelector('.bomber-scene-word')) {
      const word = document.createElement('div');
      word.className = 'bomber-scene-word';
      word.setAttribute('aria-hidden', 'true');
      word.innerHTML = '<span data-bomber-word="outside">DISTANCE</span><span data-bomber-word="build">ARRIVAL</span><span data-bomber-word="box">5.5M</span><span data-bomber-word="ten">KNOWN</span><span data-bomber-word="final">43′</span><span data-bomber-word="numbers">MÜLLERN</span><span data-bomber-word="goal">GOAL</span>';
      page.append(word);
    }

    const moment = document.querySelector('[data-bomber-43]');
    if (moment && !document.querySelector('.bomber-reaction-strip')) {
      const strip = document.createElement('div');
      strip.className = 'bomber-reaction-strip';
      strip.setAttribute('aria-hidden', 'true');
      strip.innerHTML = '<span>BALL CHANGES PATH</span><span>NO RESET</span><span>ONE TURN</span><span>FINISH</span>';
      moment.insertAdjacentElement('afterend', strip);
    }
  };
  buildSignature();

  const rail = document.querySelector('[data-bomber-distance]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(1, Math.max(0, scrollY / max)) * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const updateFocus = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    root.style.setProperty('--bomber-focus-scale', (1 - progress * .62).toFixed(3));
    root.style.setProperty('--bomber-focus-alpha', (.12 + progress * .16).toFixed(3));
  };
  updateFocus();
  addEventListener('scroll', updateFocus, { passive:true });
  addEventListener('resize', updateFocus, { passive:true });

  if (!reduced) {
    addEventListener('pointermove', (event) => {
      root.style.setProperty('--bomber-cursor-x', `${(event.clientX / innerWidth) * 100}%`);
      root.style.setProperty('--bomber-cursor-y', `${(event.clientY / innerHeight) * 100}%`);
    }, { passive:true });
  }

  const heroPhoto = document.querySelector('.bomber-hero-photo');
  if (heroPhoto && !reduced) {
    heroPhoto.addEventListener('pointermove', (event) => {
      const rect = heroPhoto.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroPhoto.style.transform = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${y * -4}deg)`;
    });
    heroPhoto.addEventListener('pointerleave', () => { heroPhoto.style.transform = ''; });
  }

  const ball = document.querySelector('[data-bomber-ball]');
  const boxSection = document.querySelector('.bomber-box-section');
  const updateBall = () => {
    if (!ball || !boxSection) return;
    const rect = boxSection.getBoundingClientRect();
    const total = rect.height + innerHeight;
    const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / total));
    ball.style.left = `${18 + progress * 40}%`;
    ball.style.top = `${24 + progress * 56}%`;
    root.style.setProperty('--bomber-pulse', Math.min(1, Math.max(0, (progress - .6) / .4)).toFixed(2));
  };
  updateBall();
  addEventListener('scroll', updateBall, { passive:true });
  addEventListener('resize', updateBall, { passive:true });

  const sceneSections = [...document.querySelectorAll('[data-bomber-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.bomberScene = active.target.dataset.bomberScene || '';
    }, { rootMargin:'-26% 0px -44%', threshold:[.14,.38,.7] });
    sceneSections.forEach(section => sceneObserver.observe(section));
  }

  const tenGrid = document.querySelector('.bomber-ten-grid');
  if (tenGrid) {
    if ('IntersectionObserver' in window) {
      const tenObserver = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          tenGrid.classList.add('is-fired');
          tenObserver.disconnect();
        }
      }, { threshold:.4 });
      tenObserver.observe(tenGrid);
    } else tenGrid.classList.add('is-fired');
  }

  const moment = document.querySelector('[data-bomber-43]');
  const tick = document.querySelector('[data-bomber-tick]');
  const frames = [...document.querySelectorAll('[data-bomber-frame]')];
  let played = false;

  const play43 = () => {
    if (played || !moment) return;
    played = true;
    if (reduced) {
      if (tick) tick.textContent = '03';
      frames.forEach(frame => frame.classList.add('is-active'));
      moment.classList.add('is-goal');
      return;
    }
    frames.forEach((frame,index) => {
      setTimeout(() => {
        frame.classList.add('is-active');
        if (tick) tick.textContent = String(index + 1).padStart(2,'0');
        if (index === frames.length - 1) {
          setTimeout(() => {
            moment.classList.add('is-goal');
            root.style.setProperty('--bomber-pulse','1');
            setTimeout(() => root.style.setProperty('--bomber-pulse','.15'), 520);
          }, 260);
        }
      }, index * 720);
    });
  };

  if ('IntersectionObserver' in window && moment) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        play43();
        observer.disconnect();
      }
    }, { threshold:.42 });
    observer.observe(moment);
  } else play43();

  const numberItems = [...document.querySelectorAll('.bomber-number-wall article')];
  const animateCount = (article) => {
    if (article.dataset.counted) return;
    article.dataset.counted = 'true';
    const strong = article.querySelector('strong');
    if (!strong) return;
    const target = Number(strong.textContent.trim());
    if (!Number.isFinite(target) || reduced) {
      article.classList.add('is-counted');
      return;
    }
    const duration = 900;
    const start = performance.now();
    const draw = (now) => {
      const t = Math.min(1, (now - start) / duration);
      strong.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(draw);
      else {
        strong.textContent = String(target);
        article.classList.add('is-counted');
      }
    };
    requestAnimationFrame(draw);
  };

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold:.55 });
    numberItems.forEach(item => countObserver.observe(item));
  } else numberItems.forEach(animateCount);

  const verb = document.querySelector('.bomber-verb');
  if (verb && 'IntersectionObserver' in window) {
    const verbObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        verb.classList.add('is-defined');
        verbObserver.disconnect();
      }
    }, { threshold:.5 });
    verbObserver.observe(verb);
  } else verb?.classList.add('is-defined');

  const finish = document.querySelector('.bomber-finish');
  const goalmouth = document.querySelector('.bomber-goalmouth');
  const finalLine = document.querySelector('.bomber-final-line');
  if (finish && goalmouth && !reduced) {
    finish.addEventListener('pointermove', (event) => {
      const rect = finish.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      goalmouth.style.transform = `translateX(-50%) perspective(700px) rotateY(${x * 2.5}deg) rotateX(${y * -2}deg)`;
    });
    finish.addEventListener('pointerleave', () => { goalmouth.style.transform = ''; });
  }

  if (finish && 'IntersectionObserver' in window) {
    let hit = false;
    const finishObserver = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      finalLine?.classList.add('is-arrived');
      if (!hit && goalmouth) {
        hit = true;
        goalmouth.classList.add('is-net-hit');
      }
    }, { threshold:.36 });
    finishObserver.observe(finish);
  }
})();