(() => {
  const HREF = 'bruno-key.html?v=20260905-bruno-4';
  const BASE = 'bruno-key.html';
  const IMAGE = 'https://assets.goal.com/images/v3/getty-2290826102/crop/MM5DGMRXGI5DCOBUGE5G433XMU5DAORWGU%3D%3D%3D%3D%3D%3D/GettyImages-2290826102.jpg?auto=webp&format=pjpg&quality=68&width=1200';
  const FALLBACK = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bruno%20Guimar%C3%A3es%2024052026%20%281%29.jpg?width=1000';

  const guardImage = (img) => {
    if (!img || img.dataset.brunoGuard) return;
    img.dataset.brunoGuard = '1';
    img.addEventListener('error', () => {
      if (!img.dataset.brunoFallback) {
        img.dataset.brunoFallback = '1';
        img.src = FALLBACK;
        img.style.objectPosition = 'center 20%';
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
      entry.innerHTML = `<a class="archive-thumb" href="${HREF}"><img src="${IMAGE}" alt="Bruno Guimarães thi đấu trong màu áo Arsenal năm 2026." style="object-position:center 24%" /></a><div class="archive-entry-copy"><p class="article-meta">Arsenal · Bruno Guimarães</p><h2><a href="${HREF}">Chiếc chìa khóa mới của Arteta?</a></h2><p>Bruno không xây thêm căn phòng nào. Anh trao cho Arteta chiếc chìa khóa để mở những căn phòng vốn đã ở đó.</p></div><a class="archive-arrow" href="${HREF}" aria-label="Đọc bài Chiếc chìa khóa mới của Arteta?">↗</a>`;
    }
    entry.dataset.paths = 'tactical-dive';
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
        card.innerHTML = `<img src="${IMAGE}" alt="${duplicate ? '' : 'Bruno Guimarães thi đấu trong màu áo Arsenal năm 2026.'}" decoding="async" loading="lazy" draggable="false" style="object-position:center 24%" /><span class="home-flow-copy"><span class="home-flow-meta">Tactical Dive · Bruno Guimarães</span><strong>Chiếc chìa khóa mới?</strong></span>`;
      }
      card.href = HREF;
      const meta = card.querySelector('.home-flow-meta');
      if (meta) meta.textContent = 'Tactical Dive · Bruno Guimarães';
      guardImage(card.querySelector('img'));
      const first = set.querySelector('.home-flow-card');
      if (first !== card) set.insertBefore(card, first);
    });
  };

  const apply = () => { applyArchive(); applyHome(); };
  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load', apply, { once:true });
})();