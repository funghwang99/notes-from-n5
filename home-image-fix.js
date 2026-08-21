(() => {
  if (window.__N5_HOME_IMAGE_FIX__) return;
  window.__N5_HOME_IMAGE_FIX__ = true;

  const PUSKAS_HREF = 'szaguldo-ornagy.html';
  const PUSKAS_IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Puskas%20Hidegkuti%201954.png?width=1400';
  const YASHIN_HREF = 'chernyi-pauk.html';
  const YASHIN_IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Lev_Yashin_1960b.jpg?width=1200';

  const applyImage = (link, src, alt, position) => {
    const img = link?.querySelector('img');
    if (!img) return;
    if (img.src !== src) img.src = src;
    img.dataset.src = src;
    if (alt && !link.closest('[aria-hidden="true"]')) img.alt = alt;
    img.style.objectPosition = position;
  };

  const fix = () => {
    document.querySelectorAll(`a[href="${PUSKAS_HREF}"]`).forEach((link) => {
      applyImage(link, PUSKAS_IMAGE, 'Ferenc Puskás cùng Nándor Hidegkuti năm 1954.', 'center center');
    });

    document.querySelectorAll(`a[href="${YASHIN_HREF}"]`).forEach((link) => {
      applyImage(link, YASHIN_IMAGE, 'Lev Yashin trong một pha hành động năm 1960.', 'center 18%');
    });
  };

  let queued = false;
  const queueFix = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fix();
    });
  };

  fix();
  requestAnimationFrame(fix);

  const target = document.querySelector('.home-page main') || document.body;
  if (!target) return;
  const observer = new MutationObserver(queueFix);
  observer.observe(target, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['href', 'src', 'style'],
  });

  window.addEventListener('load', fix, { once: true });
})();
