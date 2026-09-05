(() => {
  const HREF = 'piscinin.html?v=20260831-baresi-2';
  const BASE = 'piscinin.html';
  const IMAGE = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Franco%20baresi%20panini%20card%201979%20%28cropped%29.jpg?width=900';

  const applyArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;

    let entry = archive.querySelector(`.archive-entry a[href^="${BASE}"]`)?.closest('.archive-entry');
    if (!entry) {
      entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.dataset.paths = 'bat-tu';
      entry.innerHTML = `<a class="archive-thumb" href="${HREF}"><img src="${IMAGE}" alt="Franco Baresi trẻ trong ảnh Panini năm 1979." style="object-position:center 22%" /></a><div class="archive-entry-copy"><p class="article-meta">Italy · Franco Baresi</p><h2><a href="${HREF}">Piscinin</a></h2><p>Cậu nhỏ bước vào đội một Milan. Hai mươi mùa sau, câu lạc bộ cất luôn số 6 ấy đi.</p></div><a class="archive-arrow" href="${HREF}" aria-label="Đọc bài Piscinin">↗</a>`;
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
        card.innerHTML = `<img src="${IMAGE}" alt="${duplicate ? '' : 'Franco Baresi trẻ trong ảnh Panini năm 1979.'}" decoding="async" loading="lazy" draggable="false" style="object-position:center 22%" /><span class="home-flow-copy"><span class="home-flow-meta">Bất Tử · Franco Baresi</span><strong>Piscinin</strong></span>`;
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

  if (!window.__N5_BRUNO_PUBLISH_LOADER__) {
    window.__N5_BRUNO_PUBLISH_LOADER__ = true;
    const publish = document.createElement('script');
    publish.src = 'bruno-publish.js?v=20260905-bruno-3';
    publish.async = false;
    document.head.append(publish);
  }
})();
