/* Prefer the supplied Henry clip once the MP4 is deployed. */
(() => {
  const player=document.querySelector('.th-local-video');
  const fallback=document.querySelector('.th-video-fallback');
  if(!player || !fallback)return;
  const showLocal=()=>{player.hidden=false;fallback.hidden=true;};
  const showFallback=()=>{player.hidden=true;fallback.hidden=false;};
  player.addEventListener('loadedmetadata',showLocal);
  player.addEventListener('error',showFallback);
  if(player.readyState >= 1) showLocal(); else showFallback();
})();
/* The Statue That Moved Again — Notes from N5, interactive edition.
   Progressive enhancement only: story, pictures, and source text work without JS.
   All archival photographs are real. Pitch diagram is explanatory, not match footage. */
(() => {
  'use strict';

  const doc = document;
  const reducedMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const canObserve = typeof IntersectionObserver !== 'undefined';

  // Chapter navigation. Side rail is hidden at tablet widths.
  const chapterLinks = Array.from(doc.querySelectorAll('[data-th-nav]'));
  const chapterEls = Array.from(doc.querySelectorAll(
    '#th-beginning,#th-highbury,#th-bronze,#th-return,#th-goal,#th-after,#th-end'
  ));
  const setCurrent = (id) => {
    chapterLinks.forEach((link) => {
      if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  if (chapterLinks.length) setCurrent('th-beginning');

  if (canObserve && chapterEls.length) {
    const chapterObserver = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
        setCurrent(entry.target.id);
      });
    }, { rootMargin: '-27% 0px -52% 0px', threshold: 0 });
    chapterEls.forEach((element) => chapterObserver.observe(element));
  }

  // Quiet, one-shot text/photo entrances; never hide content without observer support.
  if (canObserve && !reducedMotion) {
    const revealEls = Array.from(doc.querySelectorAll('.th-reveal'));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 90px 0px', threshold: 0.01 });

    revealEls.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.93 || bounds.bottom < 0) {
        element.classList.add('is-visible');
      } else {
        revealObserver.observe(element);
      }
    });
    doc.body.classList.add('th-animated');
  }

  // A switch between the bronze monument and the real player on the cover.
  const cover = doc.querySelector('.th-cover');
  const coverButtons = Array.from(doc.querySelectorAll('[data-th-cover-mode]'));
  coverButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const living = button.dataset.thCoverMode === 'living';
      if (cover) cover.classList.toggle('is-living', living);
      coverButtons.forEach((other) => {
        const selected = other === button;
        other.classList.toggle('is-selected', selected);
        other.setAttribute('aria-pressed', String(selected));
      });
    });
  });

  // A direct, accessible side-by-side photo comparison. The pictures retain
  // their original proportions; only the reveal boundary moves.
  const compare = doc.querySelector('[data-th-compare]');
  const slider = doc.querySelector('[data-th-compare-range]');
  if (compare && slider) {
    const update = () => {
      const value = Math.max(5, Math.min(95, Number(slider.value) || 50));
      compare.style.setProperty('--th-compare', value + '%');
      slider.setAttribute('aria-valuetext',
        value + '% bức tượng, ' + (100 - value) + '% ảnh Henry trở lại');
    };
    slider.addEventListener('input', update);
    slider.addEventListener('change', update);
    update();
  }

  // The football diagram can be replayed, but is never presented as real video.
  const replay = doc.querySelector('[data-th-goal-replay]');
  const replayButton = doc.querySelector('[data-th-replay-button]');
  if (replay) {
    const play = () => {
      replay.classList.remove('is-replaying');
      // Reflow re-arms the path animations on subsequent clicks.
      void replay.offsetWidth;
      replay.classList.add('is-replaying');
    };
    if (replayButton) replayButton.addEventListener('click', play);
    if (canObserve && !reducedMotion) {
      const replayObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play();
          observer.disconnect();
        }
      }, { rootMargin: '0px 0px -18% 0px', threshold: 0.12 });
      replayObserver.observe(replay);
    } else {
      replay.classList.add('is-replaying');
    }
  }

  const panoramic = doc.querySelector('.th-statue-panorama');
  if (panoramic && canObserve && !reducedMotion) {
    const panoramicObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        panoramic.classList.add('is-in-view');
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    panoramicObserver.observe(panoramic);
  }
})();
