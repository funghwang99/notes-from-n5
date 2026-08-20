(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const navigation = document.querySelector('[data-navigation]');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      navigation.classList.toggle('is-open', !isOpen);
    });
    navigation.addEventListener('click', (event) => {
      if (!event.target.closest('a')) return;
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '80px 0px' });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const readingProgress = document.querySelector('[data-reading-progress]');
  if (readingProgress) {
    let progressRaf = 0;
    const renderProgress = () => {
      progressRaf = 0;
      if (document.hidden) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      readingProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const scheduleProgress = () => {
      if (progressRaf || document.hidden) return;
      progressRaf = requestAnimationFrame(renderProgress);
    };
    readingProgress.style.width = '100%';
    readingProgress.style.transformOrigin = 'left center';
    readingProgress.style.willChange = 'transform';
    scheduleProgress();
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress, { passive: true });
    document.addEventListener('visibilitychange', scheduleProgress);
  }

  const archiveEntries = Array.from(document.querySelectorAll('.archive-entry[data-paths]'));
  const archiveFilters = Array.from(document.querySelectorAll('[data-archive-filter]'));
  if (archiveEntries.length && archiveFilters.length) {
    const paths = {
      'hy-vong': 'Hy Vọng',
      'tuoi-tre': 'Tuổi Trẻ',
      'ngoai-anh-den': 'Ngoài Ánh Đèn',
      'chua-nguoi': 'Chưa Nguôi',
      'bat-tu': 'Bất Tử',
      'tuong-dai': 'Tượng Đài',
    };
    const requestedPath = new URLSearchParams(window.location.search).get('path');
    const activePath = Object.hasOwn(paths, requestedPath) ? requestedPath : 'all';

    archiveEntries.forEach((entry) => {
      const entryPaths = entry.dataset.paths.split(/\s+/).filter(Boolean);
      entry.hidden = activePath !== 'all' && !entryPaths.includes(activePath);
    });
    archiveFilters.forEach((filter) => {
      const current = filter.dataset.archiveFilter === activePath;
      filter.classList.toggle('is-current', current);
      if (current) filter.setAttribute('aria-current', 'page');
      else filter.removeAttribute('aria-current');
    });

    const visibleCount = archiveEntries.filter((entry) => !entry.hidden).length;
    const archiveCount = document.querySelector('[data-archive-count]');
    const archiveStatus = document.querySelector('[data-archive-status]');
    if (archiveCount) archiveCount.textContent = `${visibleCount} bài viết`;
    if (archiveStatus) archiveStatus.textContent = activePath === 'all' ? 'Đã xuất bản' : `Mạch ${paths[activePath]}`;
  }

  if (document.body.classList.contains('layout-letter')) {
    const style = document.createElement('style');
    style.textContent = '.layout-letter .article-body .article-lead::first-letter{color:inherit}';
    document.head.append(style);
  }

  const loadFirstAvailableImage = (sources, onReady) => {
    const trySource = (index) => {
      if (index >= sources.length || document.hidden) return;
      const probe = new Image();
      probe.decoding = 'async';
      probe.onload = () => onReady(sources[index]);
      probe.onerror = () => trySource(index + 1);
      probe.src = sources[index];
    };
    trySource(0);
  };

  if (document.body.classList.contains('layout-hagi')) {
    const sources = [
      'https://www.theduochronicles.com/content/images/2023/04/gheorghe-hagi-world-cup-1994.jpg',
      'https://cdn.mos.cms.futurecdn.net/v2/t%3A0%2Cl%3A180%2Ccw%3A450%2Cch%3A450%2Cq%3A80%2Cw%3A900/tUqyMqKPeNijbs8ki3cfK3.jpg',
      'https://cdn-mds.pickx.be/NewsFolder/w-700_h-500/BELGAIMAGE-130809427_20200629015959.jpg',
    ];
    loadFirstAvailableImage(sources, (source) => {
      const hero = document.querySelector('.hagi-hero-photo');
      if (hero) {
        hero.style.backgroundImage = `linear-gradient(90deg,rgba(17,26,50,.98) 0%,rgba(17,26,50,.88) 38%,rgba(17,26,50,.25) 72%,rgba(17,26,50,.45) 100%),linear-gradient(0deg,rgba(17,26,50,.8),transparent 45%),url("${source}")`;
        hero.style.backgroundPosition = 'center 34%';
        hero.style.backgroundSize = 'cover';
      }
      document.querySelectorAll('.hagi-figure figcaption').forEach((caption) => caption.remove());
    });
  }

  if (document.body.classList.contains('layout-bould')) {
    const heroSources = [
      'https://www.arsenalpics.com/p/5/steve-bould-arsenals-defensive-icon-50149.jpg.webp',
      'https://www.justarsenal.com/wp-content/uploads/2021/05/Steve-Bould.jpg',
    ];
    const awaySources = [
      'https://www.justarsenal.com/wp-content/uploads/2021/05/Steve-Bould.jpg',
      'https://www.arsenalpics.com/p/5/steve-bould-arsenals-defensive-icon-50149.jpg.webp',
    ];
    loadFirstAvailableImage(heroSources, (source) => {
      document.body.style.setProperty('--article-hero-image', `url("${source}")`);
      document.body.style.setProperty('--article-hero-position', 'left center');
      const heroMedia = document.querySelector('.article-hero-media');
      if (heroMedia) {
        heroMedia.style.backgroundSize = 'auto 100%';
        heroMedia.style.backgroundRepeat = 'no-repeat';
        heroMedia.style.backgroundPosition = 'left center';
        heroMedia.style.transform = 'none';
      }
      const lateCareerFigure = document.querySelector('.bould-figure--coach img');
      if (lateCareerFigure) {
        lateCareerFigure.src = source;
        lateCareerFigure.alt = 'Steve Bould thi đấu cho Arsenal trong màu áo đỏ trắng.';
        lateCareerFigure.style.objectPosition = 'center top';
      }
    });
    loadFirstAvailableImage(awaySources, (source) => {
      const firstFigure = document.querySelector('.bould-figure--statue img');
      if (firstFigure) {
        firstFigure.src = source;
        firstFigure.alt = 'Steve Bould thi đấu cho Arsenal trong bộ áo sân khách màu vàng.';
        firstFigure.style.objectPosition = 'center top';
      }
    });
  }

  (() => {
    const file = window.location.pathname.split('/').pop() || '';
    const lingeringFiles = new Set([
      'the-second-revolution.html',
      'the-second-arrow.html',
      'the-last-summer-we-borrowed.html',
      'the-last-empty-room.html',
      'the-prince-that-never-became-king.html',
    ]);
    const hopeFiles = new Set([
      'before-the-waiting-began.html',
      'the-language-football-forgot.html',
      'day-khong-phai-la-ket-thuc.html',
    ]);
    const replaceLabel = (node, from, to) => {
      if (!node || !node.textContent.toLowerCase().includes(from.toLowerCase())) return;
      node.textContent = node.textContent.replace(new RegExp(from, 'gi'), to);
    };
    document.querySelectorAll('.eyebrow, .article-meta').forEach((node) => {
      if (lingeringFiles.has(file)) {
        replaceLabel(node, 'Di sản', 'Chưa Nguôi');
        replaceLabel(node, 'Tượng Đài', 'Chưa Nguôi');
      }
      if (hopeFiles.has(file)) replaceLabel(node, 'Mất mát', 'Hy Vọng');
    });
  })();

  const publishMaradona = () => {
    const story = {
      href: 'el-pibe-de-oro.html',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Maradona%20cup%20azteca.jpg?width=1200',
      alt: 'Diego Maradona nâng World Cup tại Azteca năm 1986.',
      label: 'Bất Tử · Diego Maradona',
      title: 'El Pibe de Oro',
      deck: 'Naples giữ lại Diego. Argentina giữ lại Cậu Bé Vàng. Giữa hai nơi ấy là một sự nghiệp quá lớn để chỉ được nhớ bằng một phiên bản.',
    };

    const archive = document.querySelector('.archive#archive');
    if (archive && !archive.querySelector(`a[href="${story.href}"]`)) {
      const entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.dataset.paths = 'bat-tu';
      entry.innerHTML = `<a class="archive-thumb" href="${story.href}"><img src="${story.image}" alt="${story.alt}" style="object-position:center 42%" /></a><div class="archive-entry-copy"><p class="article-meta">Argentina · Diego Maradona</p><h2><a href="${story.href}">${story.title}</a></h2><p>${story.deck}</p></div><a class="archive-arrow" href="${story.href}" aria-label="Đọc bài ${story.title}">↗</a>`;
      const first = archive.querySelector('.archive-entry');
      if (first) first.before(entry); else archive.append(entry);

      const knownPaths = new Set(['hy-vong','tuoi-tre','ngoai-anh-den','chua-nguoi','bat-tu','tuong-dai']);
      const requested = new URLSearchParams(window.location.search).get('path');
      const active = knownPaths.has(requested) ? requested : 'all';
      const entries = Array.from(archive.querySelectorAll('.archive-entry[data-paths]'));
      entries.forEach((item) => {
        const itemPaths = item.dataset.paths.split(/\s+/).filter(Boolean);
        item.hidden = active !== 'all' && !itemPaths.includes(active);
      });
      const count = archive.querySelector('[data-archive-count]');
      if (count) count.textContent = `${entries.filter((item) => !item.hidden).length} bài viết`;
    }

    const main = document.querySelector('.home-story-main');
    const sideCards = Array.from(document.querySelectorAll('.home-story-small'));
    if (main) {
      main.href = story.href;
      const image = main.querySelector('img');
      const label = main.querySelector('.home-story-label');
      const title = main.querySelector('h3');
      const deck = main.querySelector('.home-story-main-copy > p:last-child');
      if (image) { image.src = story.image; image.alt = story.alt; image.style.objectPosition = 'center 42%'; }
      if (label) label.textContent = story.label;
      if (title) title.textContent = story.title;
      if (deck) deck.textContent = story.deck;
    }

    const sideStories = [
      {href:'o-rei.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pele%20con%20brasil.jpg?width=1000', alt:'Pelé trong màu áo Brazil.', label:'Bất Tử · Pelé', title:'O Rei', position:'center 22%'},
      {href:'der-kaiser.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Franz%20Beckenbauer%20%281975%29.jpg?width=1000', alt:'Franz Beckenbauer năm 1975.', label:'Bất Tử · Franz Beckenbauer', title:'Der Kaiser', position:'center 24%'},
    ];
    sideCards.slice(0,2).forEach((card, index) => {
      const data = sideStories[index];
      if (!data) return;
      card.href = data.href;
      const image = card.querySelector('img');
      const label = card.querySelector('.home-story-label');
      const title = card.querySelector('h3');
      if (image) { image.src = data.image; image.alt = data.alt; image.style.objectPosition = data.position; }
      if (label) label.textContent = data.label;
      if (title) title.textContent = data.title;
    });

    document.querySelectorAll('.home-flow-set').forEach((set) => {
      if (set.querySelector(`a[href="${story.href}"]`)) return;
      const duplicate = set.getAttribute('aria-hidden') === 'true';
      const card = document.createElement('a');
      card.className = 'home-flow-card';
      card.href = story.href;
      card.draggable = false;
      if (duplicate) { card.setAttribute('aria-hidden','true'); card.tabIndex = -1; }
      const image = document.createElement('img');
      image.src = story.image;
      image.alt = duplicate ? '' : story.alt;
      image.decoding = 'async';
      image.fetchPriority = 'low';
      image.draggable = false;
      image.style.objectPosition = 'center 42%';
      const copy = document.createElement('span');
      copy.className = 'home-flow-copy';
      copy.innerHTML = `<span class="home-flow-meta">${story.label}</span><strong>${story.title}</strong>`;
      card.append(image, copy);
      set.prepend(card);
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', publishMaradona, { once:true });
  else publishMaradona();
})();
