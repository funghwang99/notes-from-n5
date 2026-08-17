(() => {
  const href = 'der-kaiser.html';
  const portrait = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Franz%20Beckenbauer%20%281975%29.jpg?width=1200';
  const trophy = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Finale%20wereldkampioenschap%20voetbal%201974%20in%20Munchen%2C%20West%20Duitsland%20tegen%20Nederla%2C%20Franz%20Beckenbauer%20Stanley%20Rous.jpg?width=1600';

  const archive = document.querySelector('.archive#archive');
  if (archive && !archive.querySelector(`a[href="${href}"]`)) {
    const firstEntry = archive.querySelector('.archive-entry');
    const entry = document.createElement('article');
    entry.className = 'archive-entry reveal is-visible';
    entry.dataset.paths = 'bat-tu';
    entry.innerHTML = `<a class="archive-thumb" href="${href}"><img src="${portrait}" alt="Franz Beckenbauer năm 1975." style="object-position:center 24%" /></a><div class="archive-entry-copy"><p class="article-meta">Đức · Franz Beckenbauer</p><h2><a href="${href}">Der Kaiser</a></h2><p>Một người sinh ra trước Tây Đức, lớn lên trước Bayern của quyền lực, rồi có mặt ở cả hai đầu của một thời đại.</p></div><a class="archive-arrow" href="${href}" aria-label="Đọc bài Der Kaiser">↗</a>`;
    if (firstEntry) firstEntry.before(entry);
    else archive.append(entry);
  }

  const mainStory = document.querySelector('.home-story-main');
  if (mainStory) {
    mainStory.href = href;
    const image = mainStory.querySelector('img');
    const label = mainStory.querySelector('.home-story-label');
    const title = mainStory.querySelector('h3');
    const deck = mainStory.querySelector('.home-story-main-copy > p:last-child');
    if (image) {
      image.src = trophy;
      image.alt = 'Franz Beckenbauer cùng World Cup sau trận chung kết năm 1974.';
      image.style.objectPosition = 'center 46%';
    }
    if (label) label.textContent = 'Bất Tử · Franz Beckenbauer';
    if (title) title.textContent = 'Der Kaiser';
    if (deck) deck.textContent = 'Một người sinh ra trước Tây Đức, lớn lên trước Bayern của quyền lực, rồi có mặt ở cả hai đầu của một thời đại.';
  }

  const sideStories = document.querySelectorAll('.home-story-side .home-story-small');
  const sideData = [
    {
      href:'a-alegria-do-povo.html',
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Garrincha_e_o_povo.jpg?width=1200',
      alt:'Garrincha giữa người hâm mộ Brazil năm 1962.',
      position:'center 42%',
      label:'Bất Tử · Garrincha',
      title:'A Alegria do Povo',
    },
    {
      href:'saint-johan.html',
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Johan_Cruijff_%281974%29.jpg?width=1200',
      alt:'Johan Cruyff năm 1974.',
      position:'center 30%',
      label:'Bất Tử · Johan Cruyff',
      title:'Saint Johan',
    },
  ];
  sideStories.forEach((card, index) => {
    const data = sideData[index];
    if (!data) return;
    card.href = data.href;
    const image = card.querySelector('img');
    const label = card.querySelector('.home-story-label');
    const title = card.querySelector('h3');
    if (image) {
      image.src = data.image;
      image.alt = data.alt;
      image.style.objectPosition = data.position;
    }
    if (label) label.textContent = data.label;
    if (title) title.textContent = data.title;
  });

  const makeGalleryCard = (duplicate = false) => {
    const card = document.createElement('a');
    card.className = 'home-flow-card';
    card.href = href;
    card.draggable = false;
    if (duplicate) {
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    }
    const image = document.createElement('img');
    image.src = portrait;
    image.alt = duplicate ? '' : 'Franz Beckenbauer năm 1975.';
    image.loading = 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    image.style.objectPosition = 'center 24%';
    image.addEventListener('error', () => {
      image.remove();
      card.classList.add('is-image-missing');
    }, { once:true });
    const copy = document.createElement('span');
    copy.className = 'home-flow-copy';
    copy.innerHTML = '<span class="home-flow-meta">Bất Tử · Franz Beckenbauer</span><strong>Der Kaiser</strong>';
    card.append(image, copy);
    return card;
  };

  const addToGallery = () => {
    const sets = Array.from(document.querySelectorAll('.home-flow-set'));
    if (!sets.length) return false;
    sets.forEach((set) => {
      if (set.querySelector(`a[href="${href}"]`)) return;
      const duplicate = set.getAttribute('aria-hidden') === 'true';
      set.prepend(makeGalleryCard(duplicate));
    });
    return true;
  };

  if (!addToGallery()) {
    const observer = new MutationObserver(() => {
      if (addToGallery()) observer.disconnect();
    });
    observer.observe(document.body, { childList:true, subtree:true });
    window.setTimeout(() => observer.disconnect(), 8000);
  }
})();