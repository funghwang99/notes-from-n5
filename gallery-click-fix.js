(() => {
  if (!window.__N5_PUSKAS_HOME_LOADER__) {
    window.__N5_PUSKAS_HOME_LOADER__ = true;
    const preview = document.createElement('script');
    preview.src = 'puskas-preview.js?v=20260820-puskas-1';
    preview.async = false;
    document.head.append(preview);
  }

  const setup = () => {
    const viewport = document.querySelector('.home-flow-viewport');
    if (!viewport || viewport.dataset.clickFixReady === 'true') return;
    viewport.dataset.clickFixReady = 'true';

    let pressedCard = null;
    let startX = 0;
    let startY = 0;
    let maxDistance = 0;
    let pointerId = null;

    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pressedCard = event.target.closest('.home-flow-card');
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      maxDistance = 0;
    }, true);

    viewport.addEventListener('pointermove', (event) => {
      if (event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      maxDistance = Math.max(maxDistance, Math.hypot(dx, dy));
    }, true);

    const finish = (event) => {
      if (event.pointerId !== pointerId) return;
      const card = pressedCard;
      const wasClick = card && maxDistance < 7;
      pressedCard = null;
      pointerId = null;
      if (!wasClick) return;
      window.location.assign(card.href);
    };

    viewport.addEventListener('pointerup', finish, true);
    viewport.addEventListener('pointercancel', () => {
      pressedCard = null;
      pointerId = null;
    }, true);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(setup), { once:true });
  } else {
    requestAnimationFrame(setup);
  }
})();