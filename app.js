(() => {
  const core = document.createElement('script');
  core.src = 'app-core.js?v=20260820-puskas-1';
  core.async = false;
  document.head.append(core);

  if (document.querySelector('.archive#archive') && !window.__N5_CHARLTON_PUBLISH_LOADER__) {
    window.__N5_CHARLTON_PUBLISH_LOADER__ = true;
    const publish = document.createElement('script');
    publish.src = 'charlton-publish.js?v=20260905-adams-1';
    publish.async = false;
    document.head.append(publish);
  }

  if (document.querySelector('.archive#archive') && !window.__N5_BRUNO_DIRECT_PUBLISH_LOADER__) {
    window.__N5_BRUNO_DIRECT_PUBLISH_LOADER__ = true;
    const bruno = document.createElement('script');
    bruno.src = 'bruno-publish.js?v=20260905-bruno-4';
    bruno.async = false;
    document.head.append(bruno);
  }

  if (document.querySelector('.archive#archive') && !window.__N5_ADAMS_PUBLISH_LOADER__) {
    window.__N5_ADAMS_PUBLISH_LOADER__ = true;
    const adams = document.createElement('script');
    adams.src = 'adams-publish.js?v=20260905-adams-3';
    adams.async = false;
    document.head.append(adams);
  }

  if (document.querySelector('.archive#archive') && !window.__N5_NLD_DIRECT_PUBLISH_LOADER__) {
    window.__N5_NLD_DIRECT_PUBLISH_LOADER__ = true;
    const history = document.createElement('script');
    history.src = 'north-london-publish.js?v=20260905-false-lines-1';
    history.async = false;
    document.head.append(history);
  }

  const BEST_HREF = 'the-fifth-beatle.html?v=20260829-best-3';
  const archive = document.querySelector('.archive#archive');
  if (archive && !archive.querySelector('a[href^="the-fifth-beatle.html"]')) {
    const entry = document.createElement('article');
    entry.className = 'archive-entry reveal';
    entry.dataset.paths = 'bat-tu';
    entry.innerHTML = `<a class="archive-thumb" href="${BEST_HREF}"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/George%20Best%20%281976%29.jpg?width=1000" alt="George Best trong một trận đấu của Northern Ireland năm 1976." style="object-position:center 24%" /></a><div class="archive-entry-copy"><p class="article-meta">Northern Ireland · George Best</p><h2><a href="${BEST_HREF}">The Fifth Beatle</a></h2><p>Lisbon khiến cả châu Âu nhìn thấy George Best. Sau đó máy ảnh mới bắt đầu đuổi theo cầu thủ ấy ra khỏi sân.</p></div><a class="archive-arrow" href="${BEST_HREF}" aria-label="Đọc bài The Fifth Beatle">↗</a>`;
    const firstEntry = archive.querySelector('.archive-entry');
    if (firstEntry) archive.insertBefore(entry, firstEntry);
    else archive.append(entry);
  } else if (archive) {
    archive.querySelectorAll('a[href^="the-fifth-beatle.html"]').forEach((link) => link.setAttribute('href', BEST_HREF));
  }

  if (archive && !archive.querySelector('a[href="o-doutor.html"]')) {
    const entry = document.createElement('article');
    entry.className = 'archive-entry reveal';
    entry.dataset.paths = 'bat-tu';
    entry.innerHTML = '<a class="archive-thumb" href="o-doutor.html"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Italy%20v%20brazil%201982%2002.jpg?width=1200" alt="Sócrates trong trận Brazil gặp Italy tại World Cup 1982." style="object-position:center 48%" /></a><div class="archive-entry-copy"><p class="article-meta">Brazil · Sócrates</p><h2><a href="o-doutor.html">O Doutor</a></h2><p>Một bác sĩ, một đội trưởng, một playmaker — và trong những cuộc biểu quyết ở Corinthians, vẫn chỉ là một người với một lá phiếu.</p></div><a class="archive-arrow" href="o-doutor.html" aria-label="Đọc bài O Doutor">↗</a>';
    const firstEntry = archive.querySelector('.archive-entry');
    if (firstEntry) archive.insertBefore(entry, firstEntry);
    else archive.append(entry);
  }

  if (archive && !archive.querySelector('a[href="pantera-negra.html"]')) {
    const entry = document.createElement('article');
    entry.className = 'archive-entry reveal';
    entry.dataset.paths = 'bat-tu';
    entry.innerHTML = '<a class="archive-thumb" href="pantera-negra.html"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Eusebio%20%281963%29.jpg?width=1000" alt="Eusébio trong một buổi tập năm 1963." style="object-position:center 28%" /></a><div class="archive-entry-copy"><p class="article-meta">Portugal · Eusébio</p><h2><a href="pantera-negra.html">Pantera Negra</a></h2><p>Từ những sân đất ở Mafalala, Pantera Negra đã chạy thẳng vào lịch sử bóng đá thế giới.</p></div><a class="archive-arrow" href="pantera-negra.html" aria-label="Đọc bài Pantera Negra">↗</a>';
    const firstEntry = archive.querySelector('.archive-entry');
    if (firstEntry) archive.insertBefore(entry, firstEntry);
    else archive.append(entry);
  }

  if (archive && !archive.querySelector('a[href="der-bomber.html"]')) {
    const entry = document.createElement('article');
    entry.className = 'archive-entry reveal';
    entry.dataset.paths = 'bat-tu';
    entry.innerHTML = '<a class="archive-thumb" href="der-bomber.html"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Gerd%20M%C3%BCller%20c1973%20%28cropped%29.jpg?width=900" alt="Cận cảnh Gerd Müller vào khoảng năm 1973." style="object-position:center 20%" /></a><div class="archive-entry-copy"><p class="article-meta">Germany · Gerd Müller</p><h2><a href="der-bomber.html">Der Bomber</a></h2><p>Không cần một cú nã đại bác. Chỉ cần vài mét, một khoảnh khắc và một nhịp phản ứng ngắn hơn tất cả.</p></div><a class="archive-arrow" href="der-bomber.html" aria-label="Đọc bài Der Bomber">↗</a>';
    const firstEntry = archive.querySelector('.archive-entry');
    if (firstEntry) archive.insertBefore(entry, firstEntry);
    else archive.append(entry);
  }

  if (archive) {
    const count = archive.querySelector('[data-archive-count]');
    if (count) count.textContent = '38 bài viết';
  }

  if (document.body?.classList.contains('layout-baggio')) {
    const BAGGIO_WC94_IMAGE = 'https://retrosoccerkits.com/cdn/shop/files/IMG_9105.jpg?v=1683804239&width=1946';
    const image = document.querySelector('.baggio-figure--hero img');
    if (image) {
      image.src = BAGGIO_WC94_IMAGE;
      image.alt = 'Roberto Baggio trong màu áo sân nhà của Italy tại World Cup 1994.';
      image.style.objectPosition = 'center 28%';
      const caption = image.closest('figure')?.querySelector('figcaption');
      if (caption) caption.textContent = 'Roberto Baggio trong màu áo Italy tại World Cup 1994.';
    }
  }

  if (document.querySelector('.archive#archive') && !window.__N5_PUSKAS_PREVIEW_LOADER__) {
    window.__N5_PUSKAS_PREVIEW_LOADER__ = true;
    const preview = document.createElement('script');
    preview.src = 'puskas-preview.js?v=20260822-baggio-commons-1';
    preview.async = false;
    document.head.append(preview);
  }

  if (document.querySelector('.archive#archive') && !window.__N5_BAGGIO_ARCHIVE_FIX_LOADER__) {
    window.__N5_BAGGIO_ARCHIVE_FIX_LOADER__ = true;
    const baggioFix = document.createElement('script');
    baggioFix.src = 'baggio-archive-fix.js?v=20260822-wc94-1';
    baggioFix.async = false;
    document.head.append(baggioFix);
  }

  if (document.querySelector('.archive#archive') && !window.__N5_DI_STEFANO_PREVIEW_LOADER__) {
    window.__N5_DI_STEFANO_PREVIEW_LOADER__ = true;
    const preview = document.createElement('script');
    preview.src = 'di-stefano-preview.js?v=20260822-image-fix-1';
    preview.async = false;
    document.head.append(preview);
  }

  const outsideLightLayouts = [
    'layout-bould',
    'layout-eight',
    'layout-language',
    'layout-photoessay',
    'layout-keystone',
    'layout-mask',
  ];
  const isOutsideLight = outsideLightLayouts.some((name) => document.body?.classList.contains(name));
  if (isOutsideLight && !window.__N5_NAD_WOW_LOADER__) {
    window.__N5_NAD_WOW_LOADER__ = true;

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'ngoai-anh-den-wow.css?v=20260820-nad-1';
    document.head.append(style);

    const experience = document.createElement('script');
    experience.src = 'ngoai-anh-den-wow.js?v=20260820-nad-1';
    experience.async = false;
    document.head.append(experience);

    const tuningStyle = document.createElement('link');
    tuningStyle.rel = 'stylesheet';
    tuningStyle.href = 'ngoai-anh-den-tuning.css?v=20260820-nad-2';
    document.head.append(tuningStyle);

    const tuning = document.createElement('script');
    tuning.src = 'ngoai-anh-den-tuning.js?v=20260820-nad-2';
    tuning.async = false;
    document.head.append(tuning);
  }

  const lingeringLayouts = [
    'layout-robben',
    'layout-hagi',
    'layout-baggio',
    'layout-summer',
    'layout-monument',
    'layout-prince',
  ];
  const isLingering = lingeringLayouts.some((name) => document.body?.classList.contains(name));
  if (isLingering && !window.__N5_CHUA_NGUOI_WOW_LOADER__) {
    window.__N5_CHUA_NGUOI_WOW_LOADER__ = true;

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'chua-nguoi-wow.css?v=20260820-cn-1';
    document.head.append(style);

    const tuning = document.createElement('link');
    tuning.rel = 'stylesheet';
    tuning.href = 'chua-nguoi-tuning.css?v=20260820-cn-1';
    document.head.append(tuning);

    const fixStyle = document.createElement('link');
    fixStyle.rel = 'stylesheet';
    fixStyle.href = 'chua-nguoi-fix.css?v=20260820-cn-fix-2';
    document.head.append(fixStyle);

    const experience = document.createElement('script');
    experience.src = 'chua-nguoi-wow.js?v=20260820-cn-1';
    experience.async = false;
    document.head.append(experience);

    const fix = document.createElement('script');
    fix.src = 'chua-nguoi-fix.js?v=20260820-cn-fix-2';
    fix.async = false;
    document.head.append(fix);
  }
})();