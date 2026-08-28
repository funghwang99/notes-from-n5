(() => {
  const page = document.querySelector('.socrates-page');
  if (!page) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-doctor-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / max));
    rail.style.height = `${progress * 100}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const heroPhoto = document.querySelector('.doctor-hero-photo');
  if (heroPhoto && !reduced) {
    heroPhoto.addEventListener('pointermove', (event) => {
      const rect = heroPhoto.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroPhoto.style.transform = `perspective(1200px) rotateY(${x * 3.5}deg) rotateX(${y * -3}deg)`;
    });
    heroPhoto.addEventListener('pointerleave', () => { heroPhoto.style.transform = ''; });
  }

  const scenes = [...document.querySelectorAll('[data-doctor-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.doctorScene = active.target.dataset.doctorScene || '';
    }, { rootMargin:'-26% 0px -44%', threshold:[.14,.38,.7] });
    scenes.forEach(scene => sceneObserver.observe(scene));
  }

  const hands = document.querySelector('.doctor-hands');
  const voteBoard = document.querySelector('[data-vote-board]');
  if (hands) {
    if (reduced || !('IntersectionObserver' in window) || !voteBoard) {
      hands.classList.add('is-raised');
    } else {
      const voteObserver = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          hands.classList.add('is-raised');
          voteObserver.disconnect();
        }
      }, { threshold:.42 });
      voteObserver.observe(voteBoard);
    }
  }

  const countTargets = [...document.querySelectorAll('.doctor-vote-count [data-count]')];
  const animateCount = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target) || reduced) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    const draw = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(draw);
      else el.textContent = String(target);
    };
    requestAnimationFrame(draw);
  };

  const voteCount = document.querySelector('.doctor-vote-count');
  if (voteCount && countTargets.length) {
    if ('IntersectionObserver' in window) {
      const countObserver = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          countTargets.forEach(animateCount);
          countObserver.disconnect();
        }
      }, { threshold:.48 });
      countObserver.observe(voteCount);
    } else countTargets.forEach(animateCount);
  }

  const farewell = document.querySelector('.doctor-farewell');
  const farewellArms = document.querySelector('[data-farewell-arms]');
  if (farewell && farewellArms) {
    if (reduced || !('IntersectionObserver' in window)) {
      farewellArms.classList.add('is-raised');
    } else {
      const farewellObserver = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          farewellArms.classList.add('is-raised');
          farewellObserver.disconnect();
        }
      }, { threshold:.3 });
      farewellObserver.observe(farewell);
    }
  }
})();
