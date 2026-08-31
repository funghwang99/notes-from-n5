(() => {
  const HREF = 'sir-bobby-charlton.html?v=20260830-charlton-2';
  const BASE = 'sir-bobby-charlton.html';
  const IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bobby%20charlton%20elgrafico.JPG?width=1000';

  const applyArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;

    let entry = archive.querySelector(`.archive-entry a[href^="${BASE}"]`)?.closest('.archive-entry');
    if (!entry) {
      entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.dataset.paths = 'bat-tu';
      entry.innerHTML = `<a class="archive-thumb" href="${HREF}"><img src="${IMAGE}" alt="Bobby Charlton trong một ảnh chân dung đầu thập niên 1960." style="object-position:center 22%" /></a><div class="archive-entry-copy"><p class="article-meta">England · Bobby Charlton</p><h2><a href="${HREF}">Sir Bobby Charlton</a></h2><p>Munich là điều ông mang theo. Hai lần trở lại Wembley mới cho thấy Sir Bobby đã đi xa đến đâu.</p></div><a class="archive-arrow" href="${HREF}" aria-label="Đọc bài Sir Bobby Charlton">↗</a>`;
    }

    entry.querySelectorAll(`a[href^="${BASE}"]`).forEach((link) => link.setAttribute('href', HREF));
    const first = archive.querySelector('.archive-entry');
    if (first !== entry) archive.insertBefore(entry, first);

    const requested = new URLSearchParams(location.search).get('path');
    const active = new Set(['hy-vong','tuoi-tre','ngoai-anh-den','chua-nguoi','bat-tu','tuong-dai']).has(requested) ? requested : 'all';
    const entries = [...archive.querySelectorAll('.archive-entry[data-paths]')];
    entries.forEach((item) => {
      const paths = (item.dataset.paths || '').split(/\s+/).filter(Boolean);
      item.hidden = active !== 'all' && !paths.includes(active);
    });
    const count = archive.querySelector('[data-archive-count]');
    if (count) count.textContent = `${entries.filter((item) => !item.hidden).length} bài viết`;
  };

  const applyHome = () => {
    document.querySelectorAll('.home-flow-set').forEach((set) => {
      let card = set.querySelector(`a[href^="${BASE}"]`);
      const duplicate = set.getAttribute('aria-hidden') === 'true';
      if (!card) {
        card = document.createElement('a');
        card.className = 'home-flow-card';
        card.draggable = false;
        if (duplicate) {
          card.setAttribute('aria-hidden', 'true');
          card.tabIndex = -1;
        }
        card.innerHTML = `<img src="${IMAGE}" alt="${duplicate ? '' : 'Bobby Charlton trong một ảnh chân dung đầu thập niên 1960.'}" decoding="async" loading="lazy" draggable="false" style="object-position:center 22%" /><span class="home-flow-copy"><span class="home-flow-meta">Bất Tử · Bobby Charlton</span><strong>Sir Bobby Charlton</strong></span>`;
      }
      card.href = HREF;
      const first = set.querySelector('.home-flow-card');
      if (first !== card) set.insertBefore(card, first);
    });
  };

  const apply = () => {
    applyArchive();
    applyHome();
  };

  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load', apply, { once:true });

  if (!window.__N5_MOORE_PUBLISH_LOADER__) {
    window.__N5_MOORE_PUBLISH_LOADER__ = true;
    const publish = document.createElement('script');
    publish.src = 'moore-publish.js?v=20260831-moore-2';
    publish.async = false;
    document.head.append(publish);
  }
})();
