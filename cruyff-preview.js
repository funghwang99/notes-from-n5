(() => {
  const stories = {
    garrincha: {
      href: 'a-alegria-do-povo.html',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Garrincha_na_copa_de_1962_%28cropped%29.jpg?width=1200',
      featureImage: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Garrincha_e_o_povo.jpg?width=1800',
      alt: 'Garrincha giữa người hâm mộ Brazil năm 1962.',
      position: 'center 38%',
      label: 'Bất Tử · Garrincha',
      title: 'A Alegria do Povo',
      deck: 'Bên cánh phải, ông khiến cả khán đài chờ một cú lắc vai. Nhiều năm sau, cả một đất nước vẫn nhớ ông bằng hai chữ Niềm Vui.',
    },
    cruyff: {
      href: 'saint-johan.html',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Johan_Cruijff_%281974%29.jpg?width=1200',
      featureImage: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Johan_Cruijff_maakt_het_eerste_doelpunt%2C_Bestanddeelnr_924-3450.jpg?width=1400',
      alt: 'Johan Cruyff năm 1974.',
      position: 'center 30%',
      label: 'Bất Tử · Johan Cruyff',
      title: 'Saint Johan',
    },
    robben: {
      href: 'between-him-and-history.html',
      image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Robben_Kuyt_2.jpg?width=1200',
      alt: 'Arjen Robben cùng Dirk Kuyt sau World Cup 2010.',
      position: 'center 28%',
      label: 'Chưa Nguôi · Arjen Robben',
      title: 'Between Him and History',
    },
  };

  const main = document.querySelector('.home-story-main');
  if (main) {
    const story = stories.garrincha;
    main.href = story.href;
    const image = main.querySelector('img');
    const label = main.querySelector('.home-story-label');
    const title = main.querySelector('h3');
    const deck = main.querySelector('.home-story-main-copy > p:last-child');
    if (image) {
      image.src = story.featureImage;
      image.alt = story.alt;
      image.style.objectPosition = 'center 42%';
    }
    if (label) label.textContent = story.label;
    if (title) title.textContent = story.title;
    if (deck) deck.textContent = story.deck;
  }

  const sideCards = document.querySelectorAll('.home-story-small');
  const fillSideCard = (card, story) => {
    if (!card || !story) return;
    card.href = story.href;
    const image = card.querySelector('img');
    const label = card.querySelector('.home-story-label');
    const title = card.querySelector('h3');
    if (image) {
      image.src = story.image;
      image.alt = story.alt;
      image.style.objectPosition = story.position;
    }
    if (label) label.textContent = story.label;
    if (title) title.textContent = story.title;
  };
  fillSideCard(sideCards[0], stories.cruyff);
  fillSideCard(sideCards[1], stories.robben);

  const sets = document.querySelectorAll('.home-flow-set');
  if (sets.length < 2) return;

  const makeCard = (story, duplicate) => {
    const card = document.createElement('a');
    card.className = 'home-flow-card';
    card.href = story.href;
    card.draggable = false;
    if (duplicate) {
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    }

    const image = document.createElement('img');
    image.src = story.image;
    image.alt = duplicate ? '' : story.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    image.style.objectPosition = story.position;

    const copy = document.createElement('span');
    copy.className = 'home-flow-copy';
    copy.innerHTML = `<span class="home-flow-meta">${story.label}</span><strong>${story.title}</strong>`;
    card.append(image, copy);
    return card;
  };

  const prependStory = (set, story, duplicate) => {
    if (!set.querySelector(`.home-flow-card[href="${story.href}"]`)) set.prepend(makeCard(story, duplicate));
  };

  prependStory(sets[0], stories.cruyff, false);
  prependStory(sets[1], stories.cruyff, true);
  prependStory(sets[0], stories.garrincha, false);
  prependStory(sets[1], stories.garrincha, true);
})();
