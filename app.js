(() => {
  const loadScriptOnce = (src, key) => {
    if (key && window[key]) return;
    const base = src.split('?')[0];
    if ([...document.scripts].some((script) => (script.getAttribute('src') || '').split('?')[0] === base)) {
      if (key) window[key] = true;
      return;
    }
    if (key) window[key] = true;
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.head.append(script);
  };

  const loadStyleOnce = (href) => {
    const base = href.split('?')[0];
    if ([...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => (link.getAttribute('href') || '').split('?')[0] === base)) return;
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = href;
    document.head.append(style);
  };

  loadScriptOnce('app-core.js?v=20260907-clean-1', '__N5_CORE_LOADER__');

  const archive = document.querySelector('.archive#archive');
  if (archive) {
    loadScriptOnce('archive-taxonomy-v2.js?v=20260907-clean-1', '__N5_ARCHIVE_TAXONOMY_V2__');
    loadScriptOnce('charlton-publish.js?v=20260905-adams-1', '__N5_CHARLTON_PUBLISH_LOADER__');
    loadScriptOnce('bruno-publish.js?v=20260905-bruno-4', '__N5_BRUNO_DIRECT_PUBLISH_LOADER__');
    loadScriptOnce('adams-publish.js?v=20260905-adams-3', '__N5_ADAMS_PUBLISH_LOADER__');
    loadScriptOnce('north-london-publish.js?v=20260905-false-lines-1', '__N5_NLD_DIRECT_PUBLISH_LOADER__');
    loadScriptOnce('tactical-batch-publish.js?v=20260907-clean-1', '__N5_TACTICAL_BATCH_DIRECT_LOADER__');

    const addLegacyEntry = ({ base, href, path, image, alt, position, meta, title, deck }) => {
      let entry = archive.querySelector(`.archive-entry a[href^="${base}"]`)?.closest('.archive-entry');
      if (!entry) {
        entry = document.createElement('article');
        entry.className = 'archive-entry reveal is-visible';
        entry.dataset.paths = path;
        entry.innerHTML = `<a class="archive-thumb" href="${href}"><img src="${image}" alt="${alt}" style="object-position:${position}" /></a><div class="archive-entry-copy"><p class="article-meta">${meta}</p><h2><a href="${href}">${title}</a></h2><p>${deck}</p></div><a class="archive-arrow" href="${href}" aria-label="Đọc bài ${title}">↗</a>`;
        const first = archive.querySelector('.archive-entry');
        if (first) archive.insertBefore(entry, first); else archive.append(entry);
      } else {
        entry.dataset.paths = path;
        entry.querySelectorAll(`a[href^="${base}"]`).forEach((link) => { link.href = href; });
      }
    };

    addLegacyEntry({
      base:'the-fifth-beatle.html', href:'the-fifth-beatle.html?v=20260829-best-3', path:'bat-tu',
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/George%20Best%20%281976%29.jpg?width=1000', alt:'George Best trong một trận đấu của Northern Ireland năm 1976.', position:'center 24%',
      meta:'Northern Ireland · George Best', title:'The Fifth Beatle', deck:'Lisbon khiến cả châu Âu nhìn thấy George Best. Sau đó máy ảnh mới bắt đầu đuổi theo cầu thủ ấy ra khỏi sân.'
    });
    addLegacyEntry({
      base:'o-doutor.html', href:'o-doutor.html', path:'bat-tu',
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Italy%20v%20brazil%201982%2002.jpg?width=1200', alt:'Sócrates trong trận Brazil gặp Italy tại World Cup 1982.', position:'center 48%',
      meta:'Brazil · Sócrates', title:'O Doutor', deck:'Một bác sĩ, một đội trưởng, một playmaker — và trong những cuộc biểu quyết ở Corinthians, vẫn chỉ là một người với một lá phiếu.'
    });
    addLegacyEntry({
      base:'pantera-negra.html', href:'pantera-negra.html', path:'bat-tu',
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Eusebio%20%281963%29.jpg?width=1000', alt:'Eusébio trong một buổi tập năm 1963.', position:'center 28%',
      meta:'Portugal · Eusébio', title:'Pantera Negra', deck:'Từ những sân đất ở Mafalala, Pantera Negra đã chạy thẳng vào lịch sử bóng đá thế giới.'
    });
    addLegacyEntry({
      base:'der-bomber.html', href:'der-bomber.html', path:'bat-tu',
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gerd%20M%C3%BCller%20c1973%20%28cropped%29.jpg?width=900', alt:'Cận cảnh Gerd Müller vào khoảng năm 1973.', position:'center 20%',
      meta:'Germany · Gerd Müller', title:'Der Bomber', deck:'Không cần một cú nã đại bác. Chỉ cần vài mét, một khoảnh khắc và một nhịp phản ứng ngắn hơn tất cả.'
    });

    loadScriptOnce('puskas-preview.js?v=20260822-baggio-commons-1', '__N5_PUSKAS_PREVIEW_LOADER__');
    loadScriptOnce('baggio-archive-fix.js?v=20260822-wc94-1', '__N5_BAGGIO_ARCHIVE_FIX_LOADER__');
    loadScriptOnce('di-stefano-preview.js?v=20260822-image-fix-1', '__N5_DI_STEFANO_PREVIEW_LOADER__');
  }

  if (document.body?.classList.contains('layout-baggio')) {
    const image = document.querySelector('.baggio-figure--hero img');
    if (image) {
      image.src = 'https://retrosoccerkits.com/cdn/shop/files/IMG_9105.jpg?v=1683804239&width=1946';
      image.alt = 'Roberto Baggio trong màu áo sân nhà của Italy tại World Cup 1994.';
      image.style.objectPosition = 'center 28%';
      const caption = image.closest('figure')?.querySelector('figcaption');
      if (caption) caption.textContent = 'Roberto Baggio trong màu áo Italy tại World Cup 1994.';
    }
  }

  const outsideLightLayouts = new Set(['layout-bould','layout-eight','layout-language','layout-photoessay','layout-keystone','layout-mask']);
  if ([...outsideLightLayouts].some((name) => document.body?.classList.contains(name))) {
    loadStyleOnce('ngoai-anh-den-wow.css?v=20260820-nad-1');
    loadStyleOnce('ngoai-anh-den-tuning.css?v=20260820-nad-2');
    loadScriptOnce('ngoai-anh-den-wow.js?v=20260820-nad-1', '__N5_NAD_WOW_LOADER__');
    loadScriptOnce('ngoai-anh-den-tuning.js?v=20260820-nad-2', '__N5_NAD_TUNING_LOADER__');
  }

  const lingeringLayouts = new Set(['layout-robben','layout-hagi','layout-baggio','layout-summer','layout-monument','layout-prince']);
  if ([...lingeringLayouts].some((name) => document.body?.classList.contains(name))) {
    loadStyleOnce('chua-nguoi-wow.css?v=20260820-cn-1');
    loadStyleOnce('chua-nguoi-tuning.css?v=20260820-cn-1');
    loadStyleOnce('chua-nguoi-fix.css?v=20260820-cn-fix-2');
    loadScriptOnce('chua-nguoi-wow.js?v=20260820-cn-1', '__N5_CHUA_NGUOI_WOW_LOADER__');
    loadScriptOnce('chua-nguoi-fix.js?v=20260820-cn-fix-2', '__N5_CHUA_NGUOI_FIX_LOADER__');
  }
})();