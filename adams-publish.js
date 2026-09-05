(() => {
  const HREF = 'mr-arsenal.html?v=20260905-adams-1';
  const BASE = 'mr-arsenal.html';
  const IMAGE = 'https://www.arsenal.com/sites/default/files/styles/desktop_16x9/public/images/adams-celeb-everton.png?auto=webp&h=3c8f2bed&itok=ug525wSK';
  const FALLBACK = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tony%20Adams%20Statue%20-%20front%20%28cropped%29.jpg?width=1000';
  const PATHS = {
    'hy-vong':'Hy Vọng','tuoi-tre':'Tuổi Trẻ','ngoai-anh-den':'Ngoài Ánh Đèn','tactical-dive':'Tactical Dive','history':'History','chua-nguoi':'Chưa Nguôi','bat-tu':'Bất Tử','tuong-dai':'Tượng Đài'
  };

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
      const link = img.closest('a');
      img.remove();
      link?.classList.add('is-image-missing');
    });
  };

  const refilter = (archive) => {
    const requested = new URLSearchParams(location.search).get('path');
    const active = Object.hasOwn(PATHS, requested) ? requested : 'all';
    const entries = [...archive.querySelectorAll('.archive-entry[data-paths]')];
    entries.forEach((item) => {
      const paths = (item.dataset.paths || '').split(/\s+/).filter(Boolean);
      item.hidden = active !== 'all' && !paths.includes(active);
    });
    archive.querySelectorAll('[data-archive-filter]').forEach((link) => {
      const current = link.dataset.archiveFilter === active;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    });
    const count = archive.querySelector('[data-archive-count]');
    const status = archive.querySelector('[data-archive-status]');
    if (count) count.textContent = `${entries.filter((item) => !item.hidden).length} bài viết`;
    if (status) status.textContent = active === 'all' ? 'Đã xuất bản' : `Mạch ${PATHS[active]}`;
  };

  const applyArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;
    let entry = archive.querySelector(`.archive-entry a[href^="${BASE}"]`)?.closest('.archive-entry');
    if (!entry) {
      entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.dataset.paths = 'tuong-dai';
      entry.innerHTML = `<a class="archive-thumb" href="${HREF}"><img src="${IMAGE}" alt="Tony Adams dang hai tay ăn mừng trong màu áo Arsenal tại Highbury năm 1998." style="object-position:center 48%" /></a><div class="archive-entry-copy"><p class="article-meta">Arsenal · Tony Adams</p><h2><a href="${HREF}">The Ship That Still Knew Its Name</a></h2><p>Arsenal thay huấn luyện viên, cầu thủ, cách chơi rồi cả sân vận động. Trong gần hai thập kỷ, người mang cái tên ấy ra sân vẫn là Tony Adams.</p></div><a class="archive-arrow" href="${HREF}" aria-label="Đọc bài The Ship That Still Knew Its Name">↗</a>`;
    }
    entry.dataset.paths = 'tuong-dai';
    entry.querySelectorAll(`a[href^="${BASE}"]`).forEach((link) => link.setAttribute('href', HREF));
    guardImage(entry.querySelector('img'));
    const first = archive.querySelector('.archive-entry');
    if (first !== entry) archive.insertBefore(entry, first);
    refilter(archive);
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
        card.innerHTML = `<img src="${IMAGE}" alt="${duplicate ? '' : 'Tony Adams dang hai tay ăn mừng cho Arsenal tại Highbury năm 1998.'}" decoding="async" loading="lazy" draggable="false" style="object-position:center 48%" /><span class="home-flow-copy"><span class="home-flow-meta">Tượng Đài · Tony Adams</span><strong>Mr. Arsenal</strong></span>`;
      }
      card.href = HREF;
      guardImage(card.querySelector('img'));
      const first = set.querySelector('.home-flow-card');
      if (first !== card) set.insertBefore(card, first);
    });
  };

  const apply = () => { applyArchive(); applyHome(); };
  apply(); requestAnimationFrame(apply); window.addEventListener('load', apply, { once:true });
})();