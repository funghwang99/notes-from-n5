(() => {
  const story = {
    href: 'saint-johan.html',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Johan_Cruijff_%281974%29.jpg?width=1200',
    alt: 'Chân dung Johan Cruyff năm 1974.',
    position: 'center 22%',
    label: 'Bất Tử · Johan Cruyff',
    title: 'Saint Johan',
  };

  const mainImage = document.querySelector('.home-story-main[href="saint-johan.html"] img');
  if (mainImage) {
    mainImage.src = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Johan_Cruijff_maakt_het_eerste_doelpunt%2C_Bestanddeelnr_924-3450.jpg?width=1800';
    mainImage.alt = 'Johan Cruyff ghi bàn cho Ajax năm 1971.';
    mainImage.style.objectPosition = 'center 45%';
  }

  const sets = document.querySelectorAll('.home-flow-set');
  if (sets.length < 2) return;

  const makeCard = (duplicate) => {
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

  if (!sets[0].querySelector(`.home-flow-card[href="${story.href}"]`)) sets[0].prepend(makeCard(false));
  if (!sets[1].querySelector(`.home-flow-card[href="${story.href}"]`)) sets[1].prepend(makeCard(true));
})();
