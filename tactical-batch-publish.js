(() => {
  const VERSION = '20260906-tactical-batch-5';
  const stories = [
    {
      base:'the-jover.html', href:`the-jover.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2024%20Emirates%20Cup%20-%20Corner%20Kick.jpg?width=1200',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Samir%20Nasri%20Arsenal%20corner%20kick.jpg?width=1100',
      focus:'50% 42%', alt:'Declan Rice chuẩn bị thực hiện một quả phạt góc cho Arsenal.',
      meta:'Tactical Dive · Nicolas Jover', title:'The Jover',
      deck:'Khi bóng ngừng lăn, bài vở chiến lược vẫn tiếp tục chuyển động.'
    },
    {
      base:'twenty-metres.html', href:`twenty-metres.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20bukayo%20saka%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mikel%20Arteta%20Arsenal%20Borussia%20Dortmund.jpg?width=1100',
      focus:'50% 0%', alt:'Bukayo Saka trong màu áo Arsenal.',
      meta:'Tactical Dive · Mikel Arteta', title:'Twenty Metres',
      deck:'Arteta không muốn cầm bóng cho đẹp. Ông muốn chiếm đúng không gian để cả trận đấu chạy theo ý mình.'
    },
    {
      base:'not-the-next-partey.html', href:`not-the-next-partey.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20Mart%C3%ADn%20Zubimendi%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Spain%20football%20team%20in%202025.jpg?width=1100',
      focus:'50% 0%', alt:'Martín Zubimendi trong màu áo Arsenal.',
      meta:'Tactical Dive · Martín Zubimendi', title:'Not the Next Partey',
      deck:'Không phải một Thomas Partey đệ nhị. Là một cách mới để Arsenal dựng lại cái trụ giữa sân.'
    },
    {
      base:'necessary-imperfection.html', href:`necessary-imperfection.html?v=${VERSION}`,
      image:'gyokeres-arrival.webp',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20Viktor%20Gy%C3%B6keres%202026.jpg?width=1100',
      focus:'50% 2%', alt:'Viktor Gyökeres trong màu áo Arsenal.',
      meta:'Tactical Dive · Viktor Gyökeres', title:'The Necessary Imperfection',
      deck:'Bóng đá không cần một tiền đạo hoàn hảo. Arsenal cần một tiền đạo phù hợp với những bài toán hiện tại.'
    },
    {
      base:'basque-shield.html', href:`basque-shield.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20mikel%20merino%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mikel%20Merino%202018.jpg?width=1100',
      focus:'50% 0%', alt:'Mikel Merino trong màu áo Arsenal.',
      meta:'Tactical Dive · Mikel Merino', title:'Basque Shield',
      deck:'Không phải người khiến khán đài bật dậy. Là người lấp khoảng trống để những người khác được tự do.'
    }
  ];

  const PATHS = {
    'hy-vong':'Hy Vọng',
    'tuoi-tre':'Tuổi Trẻ',
    'ngoai-anh-den':'Ngoài Ánh Đèn',
    'tactical-dive':'Tactical Dive',
    'history':'History',
    'scouting-report':'Scouting Report',
    'chua-nguoi':'Chưa Nguôi',
    'bat-tu':'Bất Tử',
    'tuong-dai':'Tượng Đài'
  };

  const ensurePathUI = () => {
    const grid = document.querySelector('.home-path-grid');
    if (grid) {
      let card = grid.querySelector('a[href*="path=scouting-report"]');
      if (!card) {
        card = document.createElement('a');
        card.className = 'home-path-card reveal is-visible';
        card.dataset.number = '09';
        card.href = 'articles.html?path=scouting-report#archive';
        card.innerHTML = '<div class="home-path-top"><span>09</span><span class="home-path-arrow">↗</span></div><h3>Scouting Report</h3><p>Đọc dữ liệu, eye test và context để hiểu profile, strengths, limitations và role projection của từng cầu thủ.</p>';
        grid.append(card);
      }
      grid.dataset.pathCount = String(grid.querySelectorAll('.home-path-card').length);
      if (!document.querySelector('#n5-nine-path-grid-style')) {
        const style = document.createElement('style');
        style.id = 'n5-nine-path-grid-style';
        style.textContent = '@media (min-width:1001px){.home-path-grid[data-path-count="9"]{grid-template-columns:repeat(3,minmax(0,1fr))!important}}';
        document.head.append(style);
      }
    }

    const filters = document.querySelector('.archive-filters');
    if (filters && !filters.querySelector('[data-archive-filter="scouting-report"]')) {
      const link = document.createElement('a');
      link.href = 'articles.html?path=scouting-report#archive';
      link.dataset.archiveFilter = 'scouting-report';
      link.textContent = 'Scouting Report';
      const tactical = filters.querySelector('[data-archive-filter="tactical-dive"]');
      if (tactical) tactical.after(link);
      else filters.append(link);
    }
  };

  const guard = (img, story) => {
    if (!img || img.dataset.tdBatchGuard) return;
    img.dataset.tdBatchGuard = '1';
    img.addEventListener('error', () => {
      if (!img.dataset.tdBatchFallback) {
        img.dataset.tdBatchFallback = '1';
        img.src = story.fallback;
        return;
      }
      const link = img.closest('a');
      img.remove();
      link?.classList.add('is-image-missing');
    });
  };

  const syncImage = (img, story, alt = story.alt) => {
    if (!img) return;
    img.src = story.image;
    img.alt = alt;
    img.style.objectPosition = story.focus;
    guard(img, story);
  };

  const refilter = (archive) => {
    if (!archive) return;
    const requested = new URLSearchParams(location.search).get('path');
    const active = Object.hasOwn(PATHS, requested) ? requested : 'all';
    const entries = [...archive.querySelectorAll('.archive-entry[data-paths]')];

    entries.forEach((entry) => {
      const paths = (entry.dataset.paths || '').split(/\s+/).filter(Boolean);
      const shouldHide = active !== 'all' && !paths.includes(active);
      if (entry.hidden !== shouldHide) entry.hidden = shouldHide;
    });

    archive.querySelectorAll('[data-archive-filter]').forEach((filter) => {
      const current = filter.dataset.archiveFilter === active;
      if (filter.classList.contains('is-current') !== current) filter.classList.toggle('is-current', current);
      if (current) {
        if (filter.getAttribute('aria-current') !== 'page') filter.setAttribute('aria-current', 'page');
      } else if (filter.hasAttribute('aria-current')) {
        filter.removeAttribute('aria-current');
      }
    });

    const count = archive.querySelector('[data-archive-count]');
    const status = archive.querySelector('[data-archive-status]');
    const countText = `${entries.filter((entry) => !entry.hidden).length} bài viết`;
    const statusText = active === 'all' ? 'Đã xuất bản' : `Mạch ${PATHS[active]}`;
    if (count && count.textContent !== countText) count.textContent = countText;
    if (status && status.textContent !== statusText) status.textContent = statusText;
  };

  let archiveObserver = null;
  let archiveQueued = false;
  const watchArchive = (archive) => {
    if (!archive || archiveObserver) return;
    archiveObserver = new MutationObserver(() => {
      if (archiveQueued) return;
      archiveQueued = true;
      requestAnimationFrame(() => {
        archiveQueued = false;
        ensurePathUI();
        refilter(archive);
      });
    });
    archiveObserver.observe(archive, {
      childList:true,
      subtree:true,
      attributes:true,
      attributeFilter:['hidden','class','aria-current','data-paths']
    });
  };

  const applyArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;
    ensurePathUI();

    stories.forEach((story) => {
      let entry = archive.querySelector(`.archive-entry a[href^="${story.base}"]`)?.closest('.archive-entry');
      if (!entry) {
        entry = document.createElement('article');
        entry.className = 'archive-entry reveal is-visible';
        entry.innerHTML = `<a class="archive-thumb" href="${story.href}"><img src="${story.image}" alt="${story.alt}" style="object-position:${story.focus}" /></a><div class="archive-entry-copy"><p class="article-meta">${story.meta}</p><h2><a href="${story.href}">${story.title}</a></h2><p>${story.deck}</p></div><a class="archive-arrow" href="${story.href}" aria-label="Đọc bài ${story.title}">↗</a>`;
      }
      entry.dataset.paths = 'tactical-dive';
      entry.querySelectorAll(`a[href^="${story.base}"]`).forEach((a) => a.href = story.href);
      syncImage(entry.querySelector('img'), story);
      const first = archive.querySelector('.archive-entry');
      if (first !== entry) archive.insertBefore(entry, first);
    });

    refilter(archive);
    watchArchive(archive);
  };

  let latestRun = 0;
  let latestObserver = null;

  const readFlowStory = (card) => {
    const img = card?.querySelector('img');
    return {
      href:card?.getAttribute('href') || '#',
      image:img?.getAttribute('src') || img?.dataset.src || '',
      alt:img?.alt || '',
      focus:img?.style.objectPosition || 'center',
      meta:card?.querySelector('.home-flow-meta')?.textContent?.trim() || '',
      title:card?.querySelector('.home-flow-copy strong')?.textContent?.trim() || ''
    };
  };

  const fillLatestCard = (anchor, story) => {
    if (!anchor || !story) return;
    anchor.href = story.href;
    const img = anchor.querySelector('img');
    if (img) {
      img.src = story.image;
      img.alt = story.alt;
      img.style.objectPosition = story.focus;
    }
    const label = anchor.querySelector('.home-story-label');
    const title = anchor.querySelector('h3');
    if (label) label.textContent = story.meta;
    if (title) title.textContent = story.title;
  };

  const syncLatest = () => {
    const latest = document.querySelector('.home-latest');
    const source = document.querySelector('.home-flow-set:not([aria-hidden="true"])');
    if (!latest || !source) return;

    const cards = [...source.querySelectorAll(':scope > .home-flow-card')].slice(0,3);
    if (cards.length < 3) return;
    const newest = cards.map(readFlowStory);
    const main = latest.querySelector('.home-story-main');
    const side = [...latest.querySelectorAll('.home-story-small')];
    fillLatestCard(main, newest[0]);
    fillLatestCard(side[0], newest[1]);
    fillLatestCard(side[1], newest[2]);

    const deck = main?.querySelector('.home-story-main-copy > p:last-child');
    if (!deck) return;
    const matching = stories.find((story) => newest[0].href.startsWith(story.base));
    if (matching) {
      deck.textContent = matching.deck;
      return;
    }

    const run = ++latestRun;
    deck.textContent = 'Bài viết mới nhất trên Notes from N5.';
    fetch(newest[0].href, {cache:'no-store'})
      .then((response) => response.ok ? response.text() : '')
      .then((html) => {
        if (!html || run !== latestRun) return;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const description = doc.querySelector('meta[name="description"]')?.content?.trim();
        if (description) deck.textContent = description;
      })
      .catch(() => {});
  };

  const watchLatest = () => {
    if (latestObserver) return;
    const source = document.querySelector('.home-flow-set:not([aria-hidden="true"])');
    if (!source) return;
    latestObserver = new MutationObserver(() => requestAnimationFrame(syncLatest));
    latestObserver.observe(source, {childList:true});
  };

  const applyHome = () => {
    ensurePathUI();
    document.querySelectorAll('.home-flow-set').forEach((set) => {
      const duplicate = set.getAttribute('aria-hidden') === 'true';
      stories.forEach((story) => {
        let card = set.querySelector(`a[href^="${story.base}"]`);
        if (!card) {
          card = document.createElement('a');
          card.className = 'home-flow-card';
          card.draggable = false;
          if (duplicate) {
            card.setAttribute('aria-hidden','true');
            card.tabIndex = -1;
          }
          card.innerHTML = `<img src="${story.image}" alt="${duplicate ? '' : story.alt}" decoding="async" loading="lazy" draggable="false" style="object-position:${story.focus}" /><span class="home-flow-copy"><span class="home-flow-meta">${story.meta}</span><strong>${story.title}</strong></span>`;
        }
        card.href = story.href;
        syncImage(card.querySelector('img'), story, duplicate ? '' : story.alt);
        const first = set.querySelector('.home-flow-card');
        if (first !== card) set.insertBefore(card, first);
      });
    });
    syncLatest();
    watchLatest();
  };

  const settleArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;
    ensurePathUI();
    refilter(archive);
  };

  const apply = () => {
    ensurePathUI();
    applyArchive();
    applyHome();
  };

  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load', () => {
    apply();
    [0,100,350,900].forEach((delay) => setTimeout(settleArchive, delay));
  }, {once:true});
})();
