(() => {
  const archive = document.querySelector('.archive#archive');
  if (!archive) return;

  const PATHS = {
    'hy-vong': 'Hy Vọng',
    'tuoi-tre': 'Tuổi Trẻ',
    'ngoai-anh-den': 'Ngoài Ánh Đèn',
    'tactical-dive': 'Tactical Dive',
    'history': 'History',
    'chua-nguoi': 'Chưa Nguôi',
    'bat-tu': 'Bất Tử',
    'tuong-dai': 'Tượng Đài',
  };

  const FILTER_ORDER = [
    ['all', 'Tất cả'],
    ['hy-vong', 'Hy Vọng'],
    ['tuoi-tre', 'Tuổi Trẻ'],
    ['ngoai-anh-den', 'Ngoài Ánh Đèn'],
    ['tactical-dive', 'Tactical Dive'],
    ['history', 'History'],
    ['chua-nguoi', 'Chưa Nguôi'],
    ['bat-tu', 'Bất Tử'],
    ['tuong-dai', 'Tượng Đài'],
  ];

  const filters = archive.querySelector('.archive-filters');
  if (filters) {
    FILTER_ORDER.forEach(([key, label]) => {
      let link = filters.querySelector(`[data-archive-filter="${key}"]`);
      if (!link) {
        link = document.createElement('a');
        link.dataset.archiveFilter = key;
        filters.append(link);
      }
      link.textContent = label;
      link.href = key === 'all' ? 'articles.html#archive' : `articles.html?path=${key}#archive`;
    });

    FILTER_ORDER.forEach(([key]) => {
      const link = filters.querySelector(`[data-archive-filter="${key}"]`);
      if (link) filters.append(link);
    });
  }

  const requested = new URLSearchParams(location.search).get('path');
  const active = Object.prototype.hasOwnProperty.call(PATHS, requested) ? requested : 'all';

  let scheduled = false;
  const apply = () => {
    scheduled = false;

    const entries = [...archive.querySelectorAll('.archive-entry[data-paths]')];
    entries.forEach((entry) => {
      const itemPaths = (entry.dataset.paths || '').split(/\s+/).filter(Boolean);
      const shouldHide = active !== 'all' && !itemPaths.includes(active);
      if (entry.hidden !== shouldHide) entry.hidden = shouldHide;
    });

    archive.querySelectorAll('[data-archive-filter]').forEach((link) => {
      const current = link.dataset.archiveFilter === active;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const visible = entries.filter((entry) => !entry.hidden).length;
    const count = archive.querySelector('[data-archive-count]');
    const status = archive.querySelector('[data-archive-status]');
    const countText = `${visible} bài viết`;
    const statusText = active === 'all' ? 'Đã xuất bản' : `Mạch ${PATHS[active]}`;
    if (count && count.textContent !== countText) count.textContent = countText;
    if (status && status.textContent !== statusText) status.textContent = statusText;
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(apply);
  };

  apply();

  const observer = new MutationObserver(schedule);
  observer.observe(archive, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['hidden', 'data-paths'],
  });

  window.addEventListener('load', schedule, { once: true });
})();
