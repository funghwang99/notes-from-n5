(() => {
  const HREF = 'mr-arsenal.html?v=20260906-adams-4';
  const BASE = 'mr-arsenal.html';
  const TITLE = 'Mr. Arsenal';
  const IMAGE = 'https://www.arsenal.com/sites/default/files/styles/desktop_16x9/public/images/adams-celeb-everton.png?auto=webp&h=3c8f2bed&itok=ug525wSK';
  const FALLBACK = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tony%20Adams%20Statue%20-%20front%20%28cropped%29.jpg?width=1000';

  const guardImage = (img) => {
    if (!img || img.dataset.adamsGuard) return;
    img.dataset.adamsGuard = '1';
    img.addEventListener('error', () => {
      if (!img.dataset.adamsFallback) {
        img.dataset.adamsFallback = '1';
        img.src = FALLBACK;
        img.style.objectPosition = 'center 22%';
        img.alt = 'Tượng Tony Adams bên ngoài Emirates Stadium.';
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
      entry.innerHTML = `<a class="archive-thumb" href="${HREF}"><img src="${IMAGE}" alt="Tony Adams dang hai tay ăn mừng trong màu áo Arsenal tại Highbury năm 1998." style="object-position:center 48%" /></a><div class="archive-entry-copy"><p class="article-meta">Arsenal · Tony Adams</p><h2><a href="${HREF}">${TITLE}</a></h2><p>Arsenal thay huấn luyện viên, cầu thủ, cách chơi rồi cả sân vận động. Trong gần hai thập kỷ, người mang cái tên ấy ra sân vẫn là Tony Adams.</p></div><a class="archive-arrow" href="${HREF}" aria-label="Đọc bài ${TITLE}">↗</a>`;
    }
    entry.dataset.paths = 'tuong-dai';
    entry.querySelectorAll(`a[href^="${BASE}"]`).forEach((link) => { link.href = HREF; });
    const titleLink = entry.querySelector('.archive-entry-copy h2 a');
    if (titleLink) titleLink.textContent = TITLE;
    const arrow = entry.querySelector('.archive-arrow');
    if (arrow) arrow.setAttribute('aria-label', `Đọc bài ${TITLE}`);
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
        card.innerHTML = `<img src="${IMAGE}" alt="${duplicate ? '' : 'Tony Adams dang hai tay ăn mừng cho Arsenal tại Highbury năm 1998.'}" decoding="async" loading="lazy" draggable="false" style="object-position:center 48%" /><span class="home-flow-copy"><span class="home-flow-meta">Tượng Đài · Tony Adams</span><strong>${TITLE}</strong></span>`;
      }
      card.href = HREF;
      const title = card.querySelector('.home-flow-copy strong');
      if (title) title.textContent = TITLE;
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