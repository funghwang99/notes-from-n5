(() => {
  if (window.__N5_PELE_PREVIEW__) return;
  window.__N5_PELE_PREVIEW__ = true;

  const href = 'o-rei.html';
  const portrait = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pele%20con%20brasil.jpg?width=1200';
  const stockholm = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pele%20v%20sweden%201958.jpg?width=1600';
  const beckenbauerPortrait = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Franz%20Beckenbauer%20%281975%29.jpg?width=1200';
  const beckenbauerCup = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Finale%20wereldkampioenschap%20voetbal%201974%20in%20Munchen%2C%20West%20Duitsland%20tegen%20Nederla%2C%20Franz%20Beckenbauer%20Stanley%20Rous.jpg?width=1200';
  const garrincha = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Garrincha_e_o_povo.jpg?width=1200';

  const archive = document.querySelector('.archive#archive');
  const refreshArchive = () => {
    if (!archive) return;
    if (!archive.querySelector(`a[href="${href}"]`)) {
      const entry = document.createElement('article');
      entry.className = 'archive-entry reveal is-visible';
      entry.dataset.paths = 'bat-tu';
      entry.innerHTML = `<a class="archive-thumb" href="${href}"><img src="${portrait}" alt="Pelé trong màu áo Brazil năm 1970." style="object-position:center 22%" /></a><div class="archive-entry-copy"><p class="article-meta">Brazil · Pelé</p><h2><a href="${href}">O Rei</a></h2><p>Từ cậu bé mười bảy tuổi ở Stockholm tới cái tên mà bóng đá cuối cùng dành cho chỉ một người.</p></div><a class="archive-arrow" href="${href}" aria-label="Đọc bài O Rei">↗</a>`;
      const first = archive.querySelector('.archive-entry');
      if (first) first.before(entry); else archive.append(entry);
    }
    const requested = new URLSearchParams(window.location.search).get('path') || 'all';
    const entries = Array.from(archive.querySelectorAll('.archive-entry[data-paths]'));
    entries.forEach((entry) => {
      const paths = (entry.dataset.paths || '').split(/\s+/).filter(Boolean);
      entry.hidden = requested !== 'all' && !paths.includes(requested);
    });
    const count = archive.querySelector('[data-archive-count]');
    if (count) count.textContent = `${entries.filter((entry) => !entry.hidden).length} bài viết`;
  };
  refreshArchive();
  if (archive) window.setTimeout(refreshArchive, 250);

  const mainStory = document.querySelector('.home-story-main');
  if (mainStory) {
    mainStory.href = href;
    const image = mainStory.querySelector('img');
    const label = mainStory.querySelector('.home-story-label');
    const title = mainStory.querySelector('h3');
    const deck = mainStory.querySelector('.home-story-main-copy > p:last-child');
    if (image) { image.src = stockholm; image.alt = 'Pelé trong trận chung kết World Cup 1958.'; image.style.objectPosition = 'center 40%'; }
    if (label) label.textContent = 'Bất Tử · Pelé';
    if (title) title.textContent = 'O Rei';
    if (deck) deck.textContent = 'Từ cậu bé mười bảy tuổi ở Stockholm tới cái tên mà bóng đá cuối cùng dành cho chỉ một người.';
  }

  const sideStories = document.querySelectorAll('.home-story-side .home-story-small');
  const sideData = [
    { href:'der-kaiser.html', image:beckenbauerPortrait, alt:'Franz Beckenbauer năm 1975.', position:'center 24%', label:'Bất Tử · Franz Beckenbauer', title:'Der Kaiser' },
    { href:'a-alegria-do-povo.html', image:garrincha, alt:'Garrincha giữa người hâm mộ Brazil năm 1962.', position:'center 42%', label:'Bất Tử · Garrincha', title:'A Alegria do Povo' },
  ];
  sideStories.forEach((card,index) => {
    const data = sideData[index]; if (!data) return;
    card.href = data.href;
    const image = card.querySelector('img'); const label = card.querySelector('.home-story-label'); const title = card.querySelector('h3');
    if (image) { image.src=data.image; image.alt=data.alt; image.style.objectPosition=data.position; }
    if (label) label.textContent=data.label; if (title) title.textContent=data.title;
  });

  const collage = document.querySelector('.home-collage');
  if (collage) {
    collage.querySelectorAll('a.home-shot').forEach((shot) => shot.remove());
    const makeShot = (cls, item) => {
      const a = document.createElement('a'); a.className = `home-shot ${cls}`; a.href=item.href;
      a.innerHTML = `<img src="${item.image}" alt="${item.alt}" style="object-position:${item.position}" /><span class="home-shot-copy"><span>${item.label}</span><strong>${item.title}</strong></span>`;
      return a;
    };
    const mark = collage.querySelector('.home-collage-mark');
    const shots = [
      makeShot('home-shot--one',{href, image:stockholm, alt:'Pelé tại chung kết World Cup 1958.', position:'center 42%', label:'Bất Tử · Pelé', title:'O Rei'}),
      makeShot('home-shot--two',{href:'der-kaiser.html', image:beckenbauerCup, alt:'Franz Beckenbauer cùng World Cup năm 1974.', position:'center 45%', label:'Bất Tử · Franz Beckenbauer', title:'Der Kaiser'}),
      makeShot('home-shot--three',{href:'the-shape-of-an-eight.html', image:'cazorla-arsenal.webp', alt:'Santi Cazorla trong màu áo Arsenal.', position:'center 28%', label:'Ngoài Ánh Đèn · Santi Cazorla', title:'The Shape of an Eight.'}),
    ];
    shots.forEach((shot) => collage.insertBefore(shot, mark));
  }

  const makeGalleryCard = (duplicate=false) => {
    const card=document.createElement('a'); card.className='home-flow-card'; card.href=href; card.draggable=false;
    if (duplicate) { card.setAttribute('aria-hidden','true'); card.tabIndex=-1; }
    const image=document.createElement('img'); image.src=portrait; image.alt=duplicate?'':'Pelé trong màu áo Brazil năm 1970.'; image.loading='lazy'; image.decoding='async'; image.draggable=false; image.style.objectPosition='center 22%';
    image.addEventListener('error',()=>{image.remove();card.classList.add('is-image-missing')},{once:true});
    const copy=document.createElement('span'); copy.className='home-flow-copy'; copy.innerHTML='<span class="home-flow-meta">Bất Tử · Pelé</span><strong>O Rei</strong>';
    card.append(image,copy); return card;
  };
  const addToGallery=()=>{const sets=Array.from(document.querySelectorAll('.home-flow-set'));if(!sets.length)return false;sets.forEach(set=>{if(set.querySelector(`a[href="${href}"]`))return;set.prepend(makeGalleryCard(set.getAttribute('aria-hidden')==='true'));});return true;};
  if(!addToGallery()){const observer=new MutationObserver(()=>{if(addToGallery())observer.disconnect();});observer.observe(document.body,{childList:true,subtree:true});window.setTimeout(()=>observer.disconnect(),8000);}
})();