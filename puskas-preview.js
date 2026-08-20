(() => {
  if (window.__N5_PUSKAS_PREVIEW__) return;
  window.__N5_PUSKAS_PREVIEW__ = true;

  const story = {
    href: 'szaguldo-ornagy.html',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Puskas%201954.png?width=900',
    alt: 'Ferenc Puskás năm 1954.',
    label: 'Bất Tử · Ferenc Puskás',
    meta: 'Hungary · Ferenc Puskás',
    title: 'Száguldó Őrnagy',
    deck: 'Từ Kispest tới Wembley và Bern, rồi qua một đường đứt của lịch sử để xuất hiện lại ở Madrid, Glasgow và trong chính cái tên bóng đá dành cho những bàn thắng đẹp nhất.',
    position: 'center 24%',
    archivePosition: '52% 38%',
  };

  const fixArchiveThumbs = (archive) => {
    const puskas = archive.querySelector(`a[href="${story.href}"] img`);
    if (puskas) {
      puskas.src = story.image;
      puskas.alt = story.alt;
      puskas.style.objectPosition = story.archivePosition;
    }

    const hagi = archive.querySelector('a[href="the-second-revolution.html"] img');
    if (hagi) {
      hagi.src = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gheorghe%20Hagi.JPG?width=900';
      hagi.alt = 'Gheorghe Hagi.';
      hagi.style.objectPosition = 'center 24%';
      hagi.addEventListener('error', () => {
        hagi.src = 'https://www.lequipe.fr/_medias/img-photo-jpg/en-1994-lors-de-la-coupe-du-monde-aux-etats-unis-le-point-d-orgue-de-la-carriere-de-gheorghe-hagi-an/1500000002249855/33%3A38%2C1975%3A1341-828-556-75/2e383.jpg';
        hagi.style.objectPosition = 'center 28%';
      }, { once:true });
    }
  };

  const updateArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;

    let entry = archive.querySelector(`.archive-entry a[href="${story.href}"]`)?.closest('.archive-entry');
    if (!entry) {
      entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.dataset.paths = 'bat-tu';
      entry.innerHTML = `<a class="archive-thumb" href="${story.href}"><img src="${story.image}" alt="${story.alt}" style="object-position:${story.archivePosition}" /></a><div class="archive-entry-copy"><p class="article-meta">${story.meta}</p><h2><a href="${story.href}">${story.title}</a></h2><p>${story.deck}</p></div><a class="archive-arrow" href="${story.href}" aria-label="Đọc bài ${story.title}">↗</a>`;
      const first = archive.querySelector('.archive-entry');
      if (first) first.before(entry); else archive.append(entry);
    }

    fixArchiveThumbs(archive);

    const knownPaths = new Set(['hy-vong','tuoi-tre','ngoai-anh-den','chua-nguoi','bat-tu','tuong-dai']);
    const requested = new URLSearchParams(window.location.search).get('path');
    const active = knownPaths.has(requested) ? requested : 'all';
    const entries = [...archive.querySelectorAll('.archive-entry[data-paths]')];
    entries.forEach((item) => {
      const paths = item.dataset.paths.split(/\s+/).filter(Boolean);
      item.hidden = active !== 'all' && !paths.includes(active);
    });
    const count = archive.querySelector('[data-archive-count]');
    if (count) count.textContent = `${entries.filter((item) => !item.hidden).length} bài viết`;
  };

  const setCard = (card, data) => {
    if (!card || !data) return;
    card.href = data.href;
    const image = card.querySelector('img');
    const label = card.querySelector('.home-story-label');
    const title = card.querySelector('h3');
    if (image) { image.src = data.image; image.alt = data.alt; image.style.objectPosition = data.position; }
    if (label) label.textContent = data.label;
    if (title) title.textContent = data.title;
  };

  const updateHome = () => {
    const main = document.querySelector('.home-story-main');
    if (main) {
      main.href = story.href;
      const image = main.querySelector('img');
      const label = main.querySelector('.home-story-label');
      const title = main.querySelector('h3');
      const deck = main.querySelector('.home-story-main-copy > p:last-child');
      if (image) { image.src = story.image; image.alt = story.alt; image.style.objectPosition = story.position; }
      if (label) label.textContent = story.label;
      if (title) title.textContent = story.title;
      if (deck) deck.textContent = story.deck;
    }

    const sides = [...document.querySelectorAll('.home-story-small')];
    const sideStories = [
      { href:'el-pibe-de-oro.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Maradona%20cup%20azteca.jpg?width=1000', alt:'Diego Maradona nâng World Cup tại Azteca năm 1986.', label:'Bất Tử · Diego Maradona', title:'El Pibe de Oro', position:'center 42%' },
      { href:'o-rei.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pele%20con%20brasil.jpg?width=1000', alt:'Pelé trong màu áo Brazil.', label:'Bất Tử · Pelé', title:'O Rei', position:'center 22%' },
    ];
    sides.slice(0,2).forEach((card, i) => setCard(card, sideStories[i]));

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
      image.style.objectPosition = story.position;
      image.addEventListener('error', () => { image.remove(); card.classList.add('is-image-missing'); }, { once:true });
      const copy = document.createElement('span');
      copy.className = 'home-flow-copy';
      copy.innerHTML = `<span class="home-flow-meta">${story.label}</span><strong>${story.title}</strong>`;
      card.append(image, copy);
      set.prepend(card);
    });
  };

  const run = () => { updateArchive(); updateHome(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once:true });
  else run();
})();
