(() => {
  const page = document.querySelector('.baresi-page');
  if (!page) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pitch = document.querySelector('[data-baresi-line]');
  if (pitch) {
    const oldCall = pitch.querySelector('.baresi-line-call');
    if (oldCall) oldCall.hidden = true;

    if (!pitch.querySelector('.baresi-trigger-word')) {
      const trigger = document.createElement('div');
      trigger.className = 'baresi-trigger-word';
      trigger.setAttribute('aria-hidden', 'true');
      trigger.innerHTML = '<span>ONE SIGNAL.</span><strong>FOUR STEPS.</strong>';
      pitch.append(trigger);
    }

    if (!pitch.querySelector('.baresi-offside-flash')) {
      const flash = document.createElement('div');
      flash.className = 'baresi-offside-flash';
      flash.setAttribute('aria-hidden', 'true');
      flash.innerHTML = '<span>OFFSIDE TRAP</span>';
      pitch.append(flash);
    }

    const activate = () => {
      if (pitch.dataset.wowDone) return;
      pitch.dataset.wowDone = '1';
      pitch.classList.add('is-armed');
      if (reduced) {
        pitch.classList.add('is-stepping', 'is-caught');
        return;
      }
      setTimeout(() => pitch.classList.add('is-stepping'), 420);
      setTimeout(() => pitch.classList.add('is-caught'), 1120);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activate();
        observer.disconnect();
      }, { threshold:.46 });
      observer.observe(pitch);
    } else activate();
  }

  const scoreWall = document.querySelector('.baresi-score-wall');
  if (scoreWall) {
    [...scoreWall.querySelectorAll('article')].forEach((article) => {
      const score = article.querySelector('strong');
      if (!score || score.classList.contains('baresi-score-lockup')) return;
      const match = score.textContent.trim().match(/^(\d+)\s*[—–-]\s*(\d+)$/);
      if (!match) return;
      score.className = 'baresi-score-lockup';
      score.innerHTML = `<span>${match[1]}</span><i aria-hidden="true"></i><span>${match[2]}</span>`;
    });

    const activateScores = () => scoreWall.classList.add('is-live');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activateScores();
        observer.disconnect();
      }, { threshold:.38 });
      observer.observe(scoreWall);
    } else activateScores();
  }

  const endurance = document.querySelector('.baresi-22');
  if (endurance) {
    endurance.innerHTML = '<article><span>22</span><strong>DAYS</strong><small>SURGERY → WORLD CUP FINAL</small></article><i aria-hidden="true"></i><article><span>120</span><strong>MINUTES</strong><small>0—0 VS BRAZIL</small></article>';
    const activateEndurance = () => endurance.classList.add('is-live');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activateEndurance();
        observer.disconnect();
      }, { threshold:.45 });
      observer.observe(endurance);
    } else activateEndurance();
  }

  const retired = document.querySelector('.baresi-retired');
  if (retired) {
    const shirt = retired.querySelector('.baresi-shirt');
    if (shirt) {
      shirt.innerHTML = '<span class="baresi-shirt-name">BARESI</span><strong class="baresi-shirt-number">6</strong>';
    }
    const copy = retired.children[1];
    if (copy) {
      copy.classList.add('baresi-retired-copy');
      copy.innerHTML = '<span>NO NEXT OWNER</span><strong>NUMBER 6</strong><em>PUT AWAY.</em><small>AC MILAN · 1997</small>';
    }
    const activateRetired = () => retired.classList.add('is-sealed');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activateRetired();
        observer.disconnect();
      }, { threshold:.48 });
      observer.observe(retired);
    } else activateRetired();
  }

  const finish = document.querySelector('.baresi-finish');
  if (finish) {
    const copy = finish.querySelector('.baresi-finish-copy');
    if (copy && !copy.querySelector('.baresi-finish-stamp')) {
      const stamp = document.createElement('div');
      stamp.className = 'baresi-finish-stamp';
      stamp.setAttribute('aria-hidden', 'true');
      stamp.innerHTML = '<span>NO NEXT OWNER</span><i></i><span>NUMBER 6</span>';
      copy.append(stamp);
    }
    const sealFinish = () => finish.classList.add('is-sealed');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        sealFinish();
        observer.disconnect();
      }, { threshold:.3 });
      observer.observe(finish);
    } else sealFinish();
  }
})();
