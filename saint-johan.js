(() => {
  const body = document.body;
  body.classList.add('cruyff-wow');

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clockState = document.querySelector('[data-cruyff-clock-state]');
  const pauses = Array.from(document.querySelectorAll('[data-cruyff-pause]'));
  const fieldSection = document.querySelector('[data-motion-field]');
  const hero = document.querySelector('.cruyff-hero');
  const seventyFour = document.querySelector('.cruyff-seventy-four');
  const barcelona = document.querySelector('.cruyff-barcelona');
  const after = document.querySelector('.cruyff-after');
  const saint = document.querySelector('.cruyff-saint');
  const closing = document.querySelector('.cruyff-pause--closing');

  const sectionProgress = (section) => {
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    return clamp((viewport - rect.top) / (rect.height + viewport));
  };

  const addHeroSystem = () => {
    if (!hero || hero.querySelector('.cruyff-hero-hud')) return;
    const hud = document.createElement('div');
    hud.className = 'cruyff-hero-hud';
    hud.setAttribute('aria-hidden', 'true');
    hud.innerHTML = '<span>PLAYER</span><b>14</b><span>POSITION</span><b>UNDEFINED</b><span>SYSTEM</span><b>IN MOTION</b>';
    const vector = document.createElement('div');
    vector.className = 'cruyff-hero-vector';
    vector.setAttribute('aria-hidden', 'true');
    hero.append(hud, vector);
  };

  const addCoordinateRail = () => {
    if (document.querySelector('.cruyff-coordinate-rail')) return;
    const rail = document.createElement('aside');
    rail.className = 'cruyff-coordinate-rail';
    rail.setAttribute('aria-hidden', 'true');
    const points = [
      ['HERO', '.cruyff-hero'],
      ['14:00', '.cruyff-pause--opening'],
      ['AJAX', '.cruyff-field-section'],
      ['1974', '.cruyff-seventy-four'],
      ['BARÇA', '.cruyff-barcelona'],
      ['IDEA', '.cruyff-after'],
      ['SAINT', '.cruyff-saint'],
      ['14:00', '.cruyff-pause--closing'],
    ];
    points.forEach(([label, selector], index) => {
      const item = document.createElement('span');
      item.className = 'cruyff-coordinate-item';
      item.textContent = label;
      item.dataset.target = selector;
      item.dataset.index = String(index);
      rail.append(item);
    });
    body.append(rail);

    if ('IntersectionObserver' in window) {
      const items = Array.from(rail.children);
      const targets = points.map(([, selector]) => document.querySelector(selector)).filter(Boolean);
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        items.forEach((item) => item.classList.toggle('is-active', item.dataset.target === `.${visible.target.classList[0]}` || visible.target.matches(item.dataset.target)));
      }, { rootMargin: '-28% 0px -28% 0px', threshold: [0.05, 0.25, 0.5] });
      targets.forEach((target) => observer.observe(target));
    }
  };

  const addPauseRings = () => {
    pauses.forEach((pause, pauseIndex) => {
      if (pause.querySelector('.cruyff-applause-ring')) return;
      const ring = document.createElement('div');
      ring.className = 'cruyff-applause-ring';
      ring.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 60; i += 1) {
        const tick = document.createElement('i');
        tick.style.setProperty('--i', i);
        tick.style.setProperty('--tick', `${i * 6}deg`);
        ring.append(tick);
      }
      const caption = document.createElement('div');
      caption.className = 'cruyff-pause-caption';
      caption.textContent = pauseIndex === pauses.length - 1 ? 'SIXTY SECONDS · AGAIN' : 'SIXTY SECONDS · AMSTERDAM';
      pause.append(ring, caption);
      if (pauseIndex === pauses.length - 1) {
        const silence = document.createElement('div');
        silence.className = 'cruyff-silence';
        silence.setAttribute('aria-hidden', 'true');
        pause.prepend(silence);
      }
    });
  };

  const addFieldLanguage = () => {
    if (!fieldSection || fieldSection.querySelector('.cruyff-field-route-copy')) return;
    const field = fieldSection.querySelector('.cruyff-field');
    if (!field) return;
    const copy = document.createElement('div');
    copy.className = 'cruyff-field-route-copy';
    copy.setAttribute('aria-hidden', 'true');
    copy.innerHTML = '<span>NO FIXED</span><span>POSITION</span><span>14</span>';
    field.append(copy);
  };

  const addSeventyFourScore = () => {
    if (!seventyFour || seventyFour.querySelector('.cruyff-74-score')) return;
    const score = document.createElement('div');
    score.className = 'cruyff-74-score';
    score.setAttribute('aria-hidden', 'true');
    score.innerHTML = '<span>NED</span><b>1–2</b><span>FRG · 1974</span>';
    seventyFour.append(score);
  };

  const addBarcelonaAxis = () => {
    if (!barcelona || barcelona.querySelector('.cruyff-barca-axis')) return;
    const axis = document.createElement('div');
    axis.className = 'cruyff-barca-axis';
    axis.setAttribute('aria-hidden', 'true');
    axis.innerHTML = '<span>PLAYER · 1973</span><span>COACH</span><span>IDEA · 1992 →</span>';
    barcelona.append(axis);
  };

  const enhanceSaintThesis = () => {
    if (!saint || saint.querySelector('.cruyff-boundary')) return;
    const boundary = document.createElement('div');
    boundary.className = 'cruyff-boundary';
    boundary.setAttribute('aria-hidden', 'true');
    boundary.innerHTML = '<span>BEFORE</span><span>AFTER</span>';
    saint.prepend(boundary);

    const paragraph = saint.querySelector('.cruyff-saint-copy > p:not(.cruyff-section-label)');
    if (!paragraph) return;
    const target = 'Có những người đi qua một thời đại và để lại phía sau một đường ranh, nơi bóng đá ở bên này không còn giống hẳn bóng đá từng tồn tại ở bên kia. Cruyff thuộc về số ít ấy.';
    const text = paragraph.textContent;
    const index = text.indexOf(target);
    if (index < 0) return;
    const before = text.slice(0, index);
    const afterText = text.slice(index + target.length);
    paragraph.textContent = before;
    const thesis = document.createElement('span');
    thesis.className = 'cruyff-thesis';
    thesis.textContent = target;
    paragraph.append(thesis, document.createTextNode(afterText));
  };

  addHeroSystem();
  addCoordinateRail();
  addPauseRings();
  addFieldLanguage();
  addSeventyFourScore();
  addBarcelonaAxis();
  enhanceSaintThesis();

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
    }, { threshold: 0.48 });
    pauses.forEach((section) => pauseObserver.observe(section));
  } else {
    pauses.forEach((section) => section.classList.add('is-active'));
  }

  let ticking = false;
  const update = () => {
    ticking = false;

    const heroP = sectionProgress(hero);
    const fieldP = sectionProgress(fieldSection);
    const p74 = sectionProgress(seventyFour);
    const barcaP = sectionProgress(barcelona);
    const afterP = sectionProgress(after);
    const saintP = sectionProgress(saint);
    const closingP = sectionProgress(closing);

    if (hero) hero.style.setProperty('--hero-p', heroP.toFixed(3));
    if (fieldSection) fieldSection.style.setProperty('--field-p', fieldP.toFixed(3));
    if (seventyFour) seventyFour.style.setProperty('--seventy-four-p', p74.toFixed(3));
    if (barcelona) barcelona.style.setProperty('--barca-p', barcaP.toFixed(3));
    if (after) after.style.setProperty('--after-p', afterP.toFixed(3));
    if (saint) saint.style.setProperty('--saint-p', saintP.toFixed(3));
    if (closing) closing.style.setProperty('--closing-p', closingP.toFixed(3));

    if (!reduceMotion && fieldSection) {
      fieldSection.querySelectorAll('.cruyff-node').forEach((node, index) => {
        const dx = Number(node.dataset.dx || 0);
        const dy = Number(node.dataset.dy || 0);
        const stagger = (index - 2.5) * 0.045;
        const local = clamp(fieldP + stagger);
        const phase = local * Math.PI * 1.35;
        const x = dx * (local - .44) + Math.sin(phase * 2.1 + index) * 28;
        const y = dy * Math.sin(phase) + Math.cos(phase * 1.7 + index) * 18;
        const rotation = Math.sin(phase + index) * 12;
        node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
        node.style.opacity = String(.42 + local * .58);
      });
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();
