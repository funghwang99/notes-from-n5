(() => {
  if (window.__N5_HOME_IMAGE_FIX__) return;
  window.__N5_HOME_IMAGE_FIX__ = true;

  const PUSKAS_HREF = 'szaguldo-ornagy.html';
  const PUSKAS_IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Puskas%20Hidegkuti%201954.png?width=1400';
  const YASHIN_HREF = 'chernyi-pauk.html';
  const YASHIN_IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Lev_Yashin_1960b.jpg?width=1200';
  const EUSEBIO_HREF = 'pantera-negra.html';
  const EUSEBIO_IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Eusebio%20%281963%29.jpg?width=1000';

  const applyImage = (link, src, alt, position) => {
    const img = link?.querySelector('img');
    if (!img) return;
    const current = img.getAttribute('src') || '';
    if (current !== src) img.setAttribute('src', src);
    if (img.dataset.src !== src) img.dataset.src = src;
    if (alt && !link.closest('[aria-hidden="true"]') && img.alt !== alt) img.alt = alt;
    if (img.style.objectPosition !== position) img.style.objectPosition = position;
  };

  const addEusebioCard = () => {
    document.querySelectorAll('.home-flow-set').forEach((set) => {
      if (set.querySelector(`a[href="${EUSEBIO_HREF}"]`)) return;
      const duplicate = set.getAttribute('aria-hidden') === 'true';
      const card = document.createElement('a');
      card.className = 'home-flow-card';
      card.href = EUSEBIO_HREF;
      card.draggable = false;
      if (duplicate) {
        card.setAttribute('aria-hidden', 'true');
        card.tabIndex = -1;
      }

      const image = document.createElement('img');
      image.src = EUSEBIO_IMAGE;
      image.alt = duplicate ? '' : 'Eusébio trong một buổi tập năm 1963.';
      image.decoding = 'async';
      image.loading = 'lazy';
      image.draggable = false;
      image.style.objectPosition = 'center 28%';

      const copy = document.createElement('span');
      copy.className = 'home-flow-copy';
      const meta = document.createElement('span');
      meta.className = 'home-flow-meta';
      meta.textContent = 'Bất Tử · Eusébio';
      const title = document.createElement('strong');
      title.textContent = 'Pantera Negra';
      copy.append(meta, title);
      card.append(image, copy);
      set.prepend(card);
    });
  };

  const fix = () => {
    document.querySelectorAll(`a[href="${PUSKAS_HREF}"]`).forEach((link) => {
      applyImage(link, PUSKAS_IMAGE, 'Ferenc Puskás cùng Nándor Hidegkuti năm 1954.', 'center center');
    });

    document.querySelectorAll(`a[href="${YASHIN_HREF}"]`).forEach((link) => {
      applyImage(link, YASHIN_IMAGE, 'Lev Yashin trong một pha hành động năm 1960.', 'center 18%');
    });

    addEusebioCard();
  };

  fix();
  requestAnimationFrame(fix);
  window.addEventListener('load', fix, { once: true });
})();
