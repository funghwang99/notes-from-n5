(() => {
  const retired = new Set([
    'the-move-before-the-move.html',
    'the-crown-we-all-wore.html',
    'the-world-was-late.html',
    'the-ship-that-still-knew-its-name.html',
  ]);

  const fileName = (href = '') => href.split('/').pop().split('?')[0].split('#')[0];
  let cleaning = false;

  const clean = () => {
    if (cleaning) return;
    cleaning = true;

    document.querySelectorAll('a[href]').forEach((link) => {
      if (!retired.has(fileName(link.getAttribute('href') || ''))) return;
      const unit = link.closest('.archive-entry, .home-flow-card, .home-shot, .home-story-main, .home-story-small');
      if (unit) unit.remove();
      else link.remove();
    });

    const archive = document.querySelector('.archive#archive');
    if (archive) {
      const requested = new URLSearchParams(window.location.search).get('path') || 'all';
      const entries = Array.from(archive.querySelectorAll('.archive-entry[data-paths]'));
      entries.forEach((entry) => {
        const paths = (entry.dataset.paths || '').split(/\s+/).filter(Boolean);
        entry.hidden = requested !== 'all' && !paths.includes(requested);
      });
      const count = archive.querySelector('[data-archive-count]');
      if (count) count.textContent = `${entries.filter((entry) => !entry.hidden).length} bài viết`;
      if (requested === 'tuong-dai') {
        const status = archive.querySelector('[data-archive-status]');
        if (status) status.textContent = 'Mạch Tượng Đài';
      }
    }

    cleaning = false;
  };

  clean();
  new MutationObserver(clean).observe(document.documentElement, { childList:true, subtree:true });
})();
