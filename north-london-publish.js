(() => {
  const HREF = 'north-london-derby.html?v=20260905-nld-1';
  const BASE = 'north-london-derby.html';
  const IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Arsenal%20vs%20Tottenham.jpg?width=1200';
  const FALLBACK = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Spurs%20vs%20Arsenal%2C%20Avril%202007.jpg?width=1100';

  const guardImage = (img) => {
    if (!img || img.dataset.nldGuard) return;
    img.dataset.nldGuard = '1';
    img.addEventListener('error', () => {
      if (!img.dataset.nldFallback) {
        img.dataset.nldFallback = '1';
        img.src = FALLBACK;
        img.style.objectPosition = 'center 40%';
        return;
      }
      img.closest('a')?.classList.add('is-image-missing');
      img.remove();
    });
  };

  const applyArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;
    let entry = archive.querySelector(`.archive-entry a[href^="${BASE}"]`)?.closest('.archive-entry');
    if (!entry) {
      entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.innerHTML = `<a class="archive-thumb" href="${HREF}"><img src="${IMAGE}" alt="North London Derby giữa Arsenal và Tottenham." style="object-position:center 48%" /></a><div class="archive-entry-copy"><p class="article-meta">North London · Arsenal vs Tottenham</p><h2><a href="${HREF}">North London Derby</a></h2><p>Một cuộc dời nhà năm 1913, một vết thương năm 1919 và hơn một thế kỷ để đường biên vô hình giữa đỏ và trắng không bao giờ biến mất.</p></div><a class="archive-arrow" href="${HREF}" aria-label="Đọc bài North London Derby">↗</a>`;
    }
    entry.dataset.paths = 'history';
    entry.querySelectorAll(`a[href^="${BASE}"]`).forEach((link) => { link.href = HREF; });
    guardImage(entry.querySelector('img'));
    const first = archive.querySelector('.archive-entry');
    if (first !== entry) archive.insertBefore(entry, first);
  };

  const applyHome = () => {
    document.querySelectorAll('.home-flow-set').forEach((set) => {
      let card = set.querySelector(`a[href^="${BASE}"]`);
      const duplicate = set.getAttribute('aria-hidden') === 'true';
      if (!card) {
        card = document.createElement('a');
        card.className = 'home-flow-card';
        card.draggable = false;
        if (duplicate) { card.setAttribute('aria-hidden','true'); card.tabIndex = -1; }
        card.innerHTML = `<img src="${IMAGE}" alt="${duplicate ? '' : 'North London Derby giữa Arsenal và Tottenham.'}" decoding="async" loading="lazy" draggable="false" style="object-position:center 48%" /><span class="home-flow-copy"><span class="home-flow-meta">History · North London Derby</span><strong>Cuộc chiến không bao giờ kết thúc</strong></span>`;
      }
      card.href = HREF;
      const meta = card.querySelector('.home-flow-meta');
      if (meta) meta.textContent = 'History · North London Derby';
      guardImage(card.querySelector('img'));
      const first = set.querySelector('.home-flow-card');
      if (first !== card) set.insertBefore(card, first);
    });
  };

  const apply = () => { applyArchive(); applyHome(); };
  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load', apply, { once:true });

  if (!window.__N5_FALSE_LINES_PUBLISH_LOADER__) {
    window.__N5_FALSE_LINES_PUBLISH_LOADER__ = true;
    const publish = document.createElement('script');
    publish.src = 'false-lines-publish.js?v=20260905-false-lines-1';
    publish.async = false;
    document.head.append(publish);
  }
})();