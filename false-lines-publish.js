(() => {
  const HREF = 'false-lines.html?v=20260905-false-lines-2';
  const BASE = 'false-lines.html';
  const IMAGE = 'false-lines-card.svg?v=20260905-false-lines-1';

  const applyArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;
    let entry = archive.querySelector(`.archive-entry a[href^="${BASE}"]`)?.closest('.archive-entry');
    if (!entry) {
      entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.innerHTML = `<a class="archive-thumb" href="${HREF}"><img src="${IMAGE}" alt="Đồ họa chiến thuật False Lines với các đường kẻ bị phá vỡ." style="object-position:center" /></a><div class="archive-entry-copy"><p class="article-meta">Tactical Dive · Jamie Hamilton</p><h2><a href="${HREF}">False Lines</a></h2><p>Vì sao những “sự thật chiến thuật” trong bóng đá còn lạ hơn tiểu thuyết — và vì sao phần con người vẫn thoát khỏi mọi phép đo.</p></div><a class="archive-arrow" href="${HREF}" aria-label="Đọc bài False Lines">↗</a>`;
    }
    entry.dataset.paths = 'tactical-dive';
    entry.querySelectorAll(`a[href^="${BASE}"]`).forEach((link) => { link.href = HREF; });
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
        card.innerHTML = `<img src="${IMAGE}" alt="${duplicate ? '' : 'Đồ họa False Lines với một tactical grid và các đường kẻ đỏ bị lệch khỏi hệ thống.'}" decoding="async" loading="lazy" draggable="false" /><span class="home-flow-copy"><span class="home-flow-meta">Tactical Dive · Jamie Hamilton</span><strong>False Lines</strong></span>`;
      }
      card.href = HREF;
      const meta = card.querySelector('.home-flow-meta');
      if (meta) meta.textContent = 'Tactical Dive · Jamie Hamilton';
      const first = set.querySelector('.home-flow-card');
      if (first !== card) set.insertBefore(card, first);
    });
  };

  const apply = () => { applyArchive(); applyHome(); };
  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load', apply, { once:true });
})();
