(() => {
  if (window.__N5_DI_STEFANO_PREVIEW__) return;
  window.__N5_DI_STEFANO_PREVIEW__ = true;

  const story = {
    href: 'la-saeta-rubia.html',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Di%20stefano%20real%20madrid%20cf%20%28cropped%29.png?width=1200',
    alt: 'Alfredo Di Stéfano trong màu áo Real Madrid năm 1959.',
    label: 'Bất Tử · Alfredo Di Stéfano',
    meta: 'Argentina · Alfredo Di Stéfano',
    title: 'La Saeta Rubia',
    deck: 'Trước khi Real Madrid có một lịch sử ở châu Âu, Alfredo Di Stéfano đã có mặt trong từng trang đầu tiên của nó.',
    position: 'center 24%',
  };

  const updateArchive = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;
    let entry = archive.querySelector(`.archive-entry a[href="${story.href}"]`)?.closest('.archive-entry');
    if (!entry) {
      entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.dataset.paths = 'bat-tu';
      entry.innerHTML = `<a class="archive-thumb" href="${story.href}"><img src="${story.image}" alt="${story.alt}" style="object-position:${story.position}" /></a><div class="archive-entry-copy"><p class="article-meta">${story.meta}</p><h2><a href="${story.href}">${story.title}</a></h2><p>${story.deck}</p></div><a class="archive-arrow" href="${story.href}" aria-label="Đọc bài ${story.title}">↗</a>`;
      const first = archive.querySelector('.archive-entry');
      if (first) first.before(entry); else archive.append(entry);
    }

    const requested = new URLSearchParams(location.search).get('path');
    const active = ['hy-vong','tuoi-tre','ngoai-anh-den','chua-nguoi','bat-tu','tuong-dai'].includes(requested) ? requested : 'all';
    const entries = [...archive.querySelectorAll('.archive-entry[data-paths]')];
    entries.forEach((item) => {
      const paths = item.dataset.paths.split(/\s+/).filter(Boolean);
      item.hidden = active !== 'all' && !paths.includes(active);
    });
    const count = archive.querySelector('[data-archive-count]');
    if (count) count.textContent = `${entries.filter((item) => !item.hidden).length} bài viết`;
  };

  const setSmall = (card, data) => {
    if (!card || !data) return;
    card.href = data.href;
    const img = card.querySelector('img');
    const label = card.querySelector('.home-story-label');
    const title = card.querySelector('h3');
    if (img) { img.src = data.image; img.alt = data.alt; img.style.objectPosition = data.position; }
    if (label) label.textContent = data.label;
    if (title) title.textContent = data.title;
  };

  const updateHome = () => {
    const main = document.querySelector('.home-story-main');
    if (main) {
      main.href = story.href;
      const img = main.querySelector('img');
      const label = main.querySelector('.home-story-label');
      const title = main.querySelector('h3');
      const deck = main.querySelector('.home-story-main-copy > p:last-child');
      if (img) { img.src = story.image; img.alt = story.alt; img.style.objectPosition = story.position; }
      if (label) label.textContent = story.label;
      if (title) title.textContent = story.title;
      if (deck) deck.textContent = story.deck;
    }

    const side = [...document.querySelectorAll('.home-story-small')];
    const puskas = {href:'szaguldo-ornagy.html',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Puskas%201954.png?width=1000',alt:'Ferenc Puskás năm 1954.',label:'Bất Tử · Ferenc Puskás',title:'Száguldó Őrnagy',position:'center 24%'};
    const maradona = {href:'el-pibe-de-oro.html',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Maradona%20cup%20azteca.jpg?width=1000',alt:'Diego Maradona nâng World Cup tại Azteca năm 1986.',label:'Bất Tử · Diego Maradona',title:'El Pibe de Oro',position:'center 42%'};
    setSmall(side[0], puskas);
    setSmall(side[1], maradona);

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
