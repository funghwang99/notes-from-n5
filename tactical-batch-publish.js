(() => {
  const VERSION = '20260907-scott-1';
  const stories = [
    {
      path:'tactical-dive', base:'the-jover.html', href:`the-jover.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2024%20Emirates%20Cup%20-%20Corner%20Kick.jpg?width=1200',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Samir%20Nasri%20Arsenal%20corner%20kick.jpg?width=1100',
      focus:'50% 42%', alt:'Declan Rice chuẩn bị thực hiện một quả phạt góc cho Arsenal.',
      meta:'Tactical Dive · Nicolas Jover', title:'The Jover',
      deck:'Khi bóng ngừng lăn, bài vở chiến lược vẫn tiếp tục chuyển động.'
    },
    {
      path:'tactical-dive', base:'twenty-metres.html', href:`twenty-metres.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20bukayo%20saka%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mikel%20Arteta%20Arsenal%20Borussia%20Dortmund.jpg?width=1100',
      focus:'50% 0%', alt:'Bukayo Saka trong màu áo Arsenal.',
      meta:'Tactical Dive · Mikel Arteta', title:'Twenty Metres',
      deck:'Arteta không muốn cầm bóng cho đẹp. Ông muốn chiếm đúng không gian để cả trận đấu chạy theo ý mình.'
    },
    {
      path:'tactical-dive', base:'not-the-next-partey.html', href:`not-the-next-partey.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20Mart%C3%ADn%20Zubimendi%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Spain%20football%20team%20in%202025.jpg?width=1100',
      focus:'50% 0%', alt:'Martín Zubimendi trong màu áo Arsenal.',
      meta:'Tactical Dive · Martín Zubimendi', title:'Not the Next Partey',
      deck:'Không phải một Thomas Partey đệ nhị. Là một cách mới để Arsenal dựng lại cái trụ giữa sân.'
    },
    {
      path:'tactical-dive', base:'necessary-imperfection.html', href:`necessary-imperfection.html?v=${VERSION}`,
      image:'gyokeres-arrival.webp',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20Viktor%20Gy%C3%B6keres%202026.jpg?width=1100',
      focus:'50% 2%', alt:'Viktor Gyökeres trong màu áo Arsenal.',
      meta:'Tactical Dive · Viktor Gyökeres', title:'The Necessary Imperfection',
      deck:'Bóng đá không cần một tiền đạo hoàn hảo. Arsenal cần một tiền đạo phù hợp với những bài toán hiện tại.'
    },
    {
      path:'tactical-dive', base:'basque-shield.html', href:`basque-shield.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20mikel%20merino%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mikel%20Merino%202018.jpg?width=1100',
      focus:'50% 0%', alt:'Mikel Merino trong màu áo Arsenal.',
      meta:'Tactical Dive · Mikel Merino', title:'Basque Shield',
      deck:'Không phải người khiến khán đài bật dậy. Là người lấp khoảng trống để những người khác được tự do.'
    },
    {
      path:'scouting-report', base:'adam-wharton-scouting-report.html', href:`adam-wharton-scouting-report.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20adam%20wharton%202026%20%28Adam%20Wharton%29.jpg?width=1200',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2%20adam%20wharton%202026.jpg?width=1200',
      focus:'50% 17%', alt:'Adam Wharton trong màu áo Crystal Palace năm 2026.',
      meta:'Scouting Report · Adam Wharton', title:'Adam Wharton',
      deck:'Vertical progressive passer / deep-lying playmaker. Một profile được xây từ progression, pre-orientation và deep creation.'
    },
    {
      path:'scouting-report', base:'alex-scott-scouting-report.html', href:`alex-scott-scouting-report.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Alex%20Scott%2009052026%20%281%29.jpg?width=1200',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Alex%20Scott%2009052026%20%282%29.jpg?width=1200',
      focus:'50% 18%', alt:'Alex Scott trong màu áo AFC Bournemouth năm 2026.',
      meta:'Scouting Report · Alex Scott', title:'Alex Scott',
      deck:'Press-resistant, ball-carrying No.8 / connector. Một profile được xây từ carry, mobility và two-way activity.'
    }
  ];

  const guardImage = (img, story) => {
    if (!img || img.dataset.n5StoryGuard) return;
    img.dataset.n5StoryGuard = '1';
    img.addEventListener('error', () => {
      if (!img.dataset.n5StoryFallback) {
        img.dataset.n5StoryFallback = '1';
        img.src = story.fallback;
        return;
      }
      img.closest('a')?.classList.add('is-image-missing');
      img.remove();
    });
  };

  const syncImage = (img, story, alt = story.alt) => {
    if (!img) return;
    if (!img.dataset.n5StoryFallback && img.getAttribute('src') !== story.image) img.src = story.image;
    img.alt = alt;
    img.style.objectPosition = story.focus;
    guardImage(img, story);
  };

  const applyArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;

    stories.forEach((story) => {
      let entry = archive.querySelector(`.archive-entry a[href^="${story.base}"]`)?.closest('.archive-entry');
      if (!entry) {
        entry = document.createElement('article');
        entry.className = 'archive-entry reveal is-visible';
        entry.innerHTML = `<a class="archive-thumb" href="${story.href}"><img src="${story.image}" alt="${story.alt}" style="object-position:${story.focus}" /></a><div class="archive-entry-copy"><p class="article-meta">${story.meta}</p><h2><a href="${story.href}">${story.title}</a></h2><p>${story.deck}</p></div><a class="archive-arrow" href="${story.href}" aria-label="Đọc bài ${story.title}">↗</a>`;
      }

      entry.dataset.paths = story.path;
      entry.querySelectorAll(`a[href^="${story.base}"]`).forEach((link) => { link.href = story.href; });
      const meta = entry.querySelector('.article-meta');
      const title = entry.querySelector('h2 a');
      const deck = entry.querySelector('.archive-entry-copy > p:last-child');
      if (meta) meta.textContent = story.meta;
      if (title) title.textContent = story.title;
      if (deck) deck.textContent = story.deck;
      syncImage(entry.querySelector('img'), story);

      const first = archive.querySelector('.archive-entry');
      if (first !== entry) archive.insertBefore(entry, first);
    });
  };

  const makeHomeCard = (story, duplicate) => {
    const card = document.createElement('a');
    card.className = 'home-flow-card';
    card.href = story.href;
    card.draggable = false;
    if (duplicate) {
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    }
    card.innerHTML = `<img src="${story.image}" alt="${duplicate ? '' : story.alt}" decoding="async" loading="lazy" draggable="false" style="object-position:${story.focus}" /><span class="home-flow-copy"><span class="home-flow-meta">${story.meta}</span><strong>${story.title}</strong></span>`;
    return card;
  };

  const applyHome = () => {
    document.querySelectorAll('.home-flow-set').forEach((set) => {
      const duplicate = set.getAttribute('aria-hidden') === 'true';
      stories.forEach((story) => {
        let card = set.querySelector(`a[href^="${story.base}"]`);
        if (!card) card = makeHomeCard(story, duplicate);
        card.href = story.href;
        const meta = card.querySelector('.home-flow-meta');
        const title = card.querySelector('.home-flow-copy strong');
        if (meta) meta.textContent = story.meta;
        if (title) title.textContent = story.title;
        syncImage(card.querySelector('img'), story, duplicate ? '' : story.alt);
        const first = set.querySelector('.home-flow-card');
        if (first !== card) set.insertBefore(card, first);
      });
    });
  };

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

  let latestRun = 0;
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
    fetch(newest[0].href, { cache:'no-store' })
      .then((response) => response.ok ? response.text() : '')
      .then((html) => {
        if (!html || run !== latestRun) return;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const description = doc.querySelector('meta[name="description"]')?.content?.trim();
        if (description) deck.textContent = description;
      })
      .catch(() => {});
  };

  let latestObserver = null;
  const watchLatest = () => {
    if (latestObserver) return;
    const source = document.querySelector('.home-flow-set:not([aria-hidden="true"])');
    if (!source) return;
    latestObserver = new MutationObserver(() => requestAnimationFrame(syncLatest));
    latestObserver.observe(source, { childList:true });
  };

  const apply = () => {
    applyArchive();
    applyHome();
    syncLatest();
    watchLatest();
  };

  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load', apply, { once:true });
})();