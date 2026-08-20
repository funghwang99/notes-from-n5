(() => {
  const host = document.querySelector('.home-collage');
  if (!host) return;

  const stories = [
    { href:'el-pibe-de-oro.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Maradona%20cup%20azteca.jpg?width=1000', label:'Bất Tử · Diego Maradona', title:'El Pibe de Oro', alt:'Diego Maradona nâng World Cup tại Azteca năm 1986.', position:'center 42%' },
    { href:'o-rei.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pele%20con%20brasil.jpg?width=1000', label:'Bất Tử · Pelé', title:'O Rei', alt:'Pelé trong màu áo Brazil.', position:'center 22%' },
    { href:'der-kaiser.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Franz%20Beckenbauer%20%281975%29.jpg?width=1000', label:'Bất Tử · Franz Beckenbauer', title:'Der Kaiser', alt:'Franz Beckenbauer năm 1975.', position:'center 24%' },
    { href:'a-alegria-do-povo.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Garrincha_na_copa_de_1962_%28cropped%29.jpg?width=1000', label:'Bất Tử · Garrincha', title:'A Alegria do Povo', alt:'Garrincha tại World Cup 1962.', position:'center 38%' },
    { href:'saint-johan.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Johan_Cruijff_%281974%29.jpg?width=1000', label:'Bất Tử · Johan Cruyff', title:'Saint Johan', alt:'Johan Cruyff năm 1974.', position:'center 22%' },
    { href:'between-him-and-history.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/FIFA_World_Cup_2010_Final_Netherlands_team.JPG?width=1000', label:'Chưa Nguôi · Arjen Robben', title:'Between Him and History', alt:'Arjen Robben cùng Hà Lan trước chung kết World Cup 2010.', position:'88% 66%' },
    { href:'when-we-were-allowed-to-dream-again.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Reiss_Nelson_2015_%28cropped%29.jpg?width=900', label:'Hy Vọng · Arsenal 2022/23', title:'When We Were Allowed to Dream Again', alt:'Reiss Nelson thời trẻ trong màu áo Arsenal.', position:'center 24%' },
    { href:'the-age-we-never-let-him-leave.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/TheoWalcottUnderhill.JPG?width=900', label:'Tuổi Trẻ · Theo Walcott', title:'The Age We Never Let Him Leave', alt:'Theo Walcott thời trẻ trong màu áo Arsenal.', position:'center 20%' },
    { href:'before-the-waiting-began.html', image:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/05/20/01/4-Victor-Valdes-Getty.jpg', label:'Hy Vọng · Paris 2006', title:'Before the Waiting Began', alt:'Thierry Henry bị Víctor Valdés từ chối tại Paris 2006.', position:'center 48%' },
    { href:'nine-years-in-one-afternoon.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/FA_Cup_Final_2014_02.jpg?width=1000', label:'Hy Vọng · Wembley 2014', title:'Nine Years in One Afternoon', alt:'Arsenal tại Wembley năm 2014.', position:'center 38%' },
    { href:'the-second-revolution.html', image:'https://cdn.plus.fifa.com/images/public/cms/b6/88/f4/86/b688f486-ef82-463c-aa85-73bf545c32fd.jpg?height=700&width=1100', label:'Chưa Nguôi · Gheorghe Hagi', title:'The Second Revolution.', alt:'Gheorghe Hagi trong màu áo Romania.', position:'center 28%' },
    { href:'the-second-arrow.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/ROBERTO_BAGGIO_LANEROSSI_VICENZA_BIANCOROSSO.jpg?width=900', label:'Chưa Nguôi · Roberto Baggio', title:'The Second Arrow.', alt:'Roberto Baggio thời trẻ.', position:'center 24%' },
    { href:'before-the-arms-were-raised.html', image:'https://www.justarsenal.com/wp-content/uploads/2021/05/Steve-Bould.jpg', label:'Ngoài Ánh Đèn · Steve Bould', title:'Before the Arms Were Raised.', alt:'Steve Bould thi đấu cho Arsenal.', position:'center top' },
    { href:'the-shape-of-an-eight.html', image:'cazorla-arsenal.webp', label:'Ngoài Ánh Đèn · Santi Cazorla', title:'The Shape of an Eight.', alt:'Santi Cazorla trong màu áo Arsenal.', position:'center 24%' },
    { href:'the-language-football-forgot.html', image:'ozil-2015-16.webp', label:'Ngoài Ánh Đèn · Mesut Özil', title:'The Language Football Forgot.', alt:'Mesut Özil trong màu áo Arsenal.', position:'center 24%' },
    { href:'the-last-summer-we-borrowed.html', image:'messi-2022.webp', label:'Chưa Nguôi · Lionel Messi', title:'The Last Summer We Borrowed.', alt:'Lionel Messi cùng Argentina tại World Cup 2022.', position:'center 22%' },
    { href:'the-man-between-chapters.html', image:'trossard-arrival.webp', label:'Ngoài Ánh Đèn · Leandro Trossard', title:'The Man Between Chapters.', alt:'Leandro Trossard trong màu áo Arsenal.', position:'center 22%' },
    { href:'the-keystone.html', image:'rice-freekick.webp', label:'Ngoài Ánh Đèn · Declan Rice', title:'The Keystone', alt:'Declan Rice trong màu áo Arsenal.', position:'center 28%' },
    { href:'the-last-empty-room.html', image:'ronaldo-2016.webp', label:'Chưa Nguôi · Cristiano Ronaldo', title:'The Last Empty Room.', alt:'Cristiano Ronaldo cùng Portugal.', position:'center 22%' },
    { href:'the-prince-that-never-became-king.html', image:'neymar-2014.webp', label:'Chưa Nguôi · Neymar', title:'The Prince That Never Became King.', alt:'Neymar cùng Brazil.', position:'center 20%' },
    { href:'the-stones-beneath.html', image:'hale-quartet.webp', label:'Tuổi Trẻ · Hale End', title:'The stones beneath.', alt:'Những cầu thủ trưởng thành từ Hale End.', position:'center 28%' },
    { href:'until-i-put-on-the-mask.html', image:'gyokeres-arrival.webp', label:'Ngoài Ánh Đèn · Viktor Gyökeres', title:'Until I put on the mask.', alt:'Viktor Gyökeres trong màu áo Arsenal.', position:'center 24%' },
    { href:'you-deserve-more.html', image:'saka-young.webp', label:'Tuổi Trẻ · Bukayo Saka', title:'You deserve more.', alt:'Bukayo Saka thời trẻ tại Arsenal.', position:'center 22%' },
    { href:'day-khong-phai-la-ket-thuc.html', image:'budapest-2026.webp', label:'Hy Vọng · Budapest 2026', title:'Đây không phải là kết thúc.', alt:'Arsenal sau chung kết Champions League 2026.', position:'center 38%' },
    { href:'it-is-hope-that-kills-us.html', image:'hope-fans.webp', label:'Hy Vọng · Arsenal', title:'It is hope that kills us.', alt:'Những người hâm mộ Arsenal trên khán đài.', position:'center 30%' }
  ];

  const style = document.createElement('style');
  style.textContent = `
    .home-collage.home-flow-gallery{position:relative;display:flex;min-height:72vh;align-items:center;overflow:hidden;isolation:isolate;margin-right:calc(clamp(1.2rem,5.5vw,6.5rem)*-1);contain:layout paint style}
    .home-flow-viewport{position:relative;width:100%;overflow:hidden;padding:2.2rem 0;cursor:grab;touch-action:pan-y pinch-zoom;user-select:none;-webkit-user-select:none;mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%)}
    .home-flow-gallery.is-dragging .home-flow-viewport{cursor:grabbing}
    .home-flow-track{display:flex;width:max-content;transform:translate3d(0,0,0);will-change:auto}
    .home-flow-gallery.is-active .home-flow-track{will-change:transform}
    .home-flow-set{display:flex;gap:1rem;padding-right:1rem;align-items:center}
    .home-flow-card{position:relative;display:block;flex:0 0 clamp(16rem,18vw,19rem);height:clamp(23rem,49vh,28rem);overflow:hidden;background:linear-gradient(145deg,#2a2824,#141412);color:#f8f5ed;text-decoration:none;box-shadow:0 18px 42px rgba(0,0,0,.26);transition:transform 180ms ease,box-shadow 180ms ease;contain:layout paint style}
    .home-flow-card:hover,.home-flow-card:focus-visible{z-index:3;transform:translateY(-.3rem);box-shadow:0 24px 52px rgba(0,0,0,.34);outline:none}
    .home-flow-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;transition:transform 360ms ease;background:#1d1c19}
    .home-flow-card:hover img,.home-flow-card:focus-visible img{transform:scale(1.025)}
    .home-flow-card:after{position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,7,.92) 0%,rgba(8,8,7,.46) 34%,rgba(8,8,7,.05) 72%);content:"";pointer-events:none}
    .home-flow-card.is-image-missing:before{position:absolute;right:-.3rem;bottom:-1rem;color:rgba(248,245,237,.07);font-size:8rem;font-weight:850;letter-spacing:-.12em;content:"N5"}
    .home-flow-copy{position:absolute;z-index:2;right:1rem;bottom:1.1rem;left:1rem;pointer-events:none}
    .home-flow-meta{display:block;margin-bottom:.45rem;color:#d3cdc2;font-size:.56rem;font-weight:760;letter-spacing:.11em;text-transform:uppercase}
    .home-flow-copy strong{display:block;font-family:var(--serif);font-size:clamp(1.55rem,2.05vw,2.35rem);font-weight:520;letter-spacing:-.045em;line-height:.98}
    .home-flow-arrow{position:absolute;z-index:10;top:50%;display:grid;width:3.15rem;height:3.15rem;place-items:center;border:1px solid rgba(248,245,237,.34);border-radius:50%;background:rgba(18,18,16,.94);color:#f8f5ed;font:400 1.45rem/1 var(--sans);cursor:pointer;transform:translateY(-50%);transition:background 160ms ease,border-color 160ms ease,transform 160ms ease}
    .home-flow-arrow:hover,.home-flow-arrow:focus-visible{border-color:rgba(248,245,237,.78);background:rgba(248,245,237,.94);color:#171714;outline:none;transform:translateY(-50%) scale(1.05)}
    .home-flow-arrow--prev{left:.55rem}.home-flow-arrow--next{right:.55rem}
    .home-collage-mark{display:none!important}
    @media(max-width:1000px){.home-collage.home-flow-gallery{min-height:58vh;margin-right:0}.home-flow-card{flex-basis:15.5rem;height:22.5rem}.home-flow-arrow{width:2.8rem;height:2.8rem}}
    @media(max-width:700px){.home-collage.home-flow-gallery{min-height:46vh;margin:1rem -1rem 0}.home-flow-viewport{padding:1rem 0;mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)}.home-flow-card{flex-basis:13.5rem;height:20rem}.home-flow-copy strong{font-size:1.5rem}.home-flow-arrow{width:2.5rem;height:2.5rem;font-size:1.15rem}.home-flow-arrow--prev{left:.35rem}.home-flow-arrow--next{right:.35rem}}
  `;
  document.head.append(style);

  const makeCard = (story, duplicate = false) => {
    const card = document.createElement('a');
    card.className = 'home-flow-card';
    card.href = story.href;
    card.draggable = false;
    if (duplicate) {
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    }

    const image = document.createElement('img');
    image.dataset.src = story.image;
    image.alt = duplicate ? '' : story.alt;
    image.decoding = 'async';
    image.fetchPriority = 'low';
    image.draggable = false;
    image.style.objectPosition = story.position || 'center';
    image.addEventListener('error', () => {
      image.remove();
      card.classList.add('is-image-missing');
    }, { once:true });

    const copy = document.createElement('span');
    copy.className = 'home-flow-copy';
    const meta = document.createElement('span');
    meta.className = 'home-flow-meta';
    meta.textContent = story.label;
    const title = document.createElement('strong');
    title.textContent = story.title;
    copy.append(meta, title);
    card.append(image, copy);
    return card;
  };

  const makeSet = (duplicate = false) => {
    const set = document.createElement('div');
    set.className = 'home-flow-set';
    if (duplicate) set.setAttribute('aria-hidden', 'true');
    stories.forEach((story) => set.append(makeCard(story, duplicate)));
    return set;
  };

  host.classList.add('home-flow-gallery');
  host.setAttribute('aria-label', 'Tất cả bài viết trên Notes from N5. Gallery tự trôi từ phải sang trái; có thể kéo ngang, dùng nút mũi tên và bấm vào từng bài để đọc.');

  const viewport = document.createElement('div');
  viewport.className = 'home-flow-viewport';
  const track = document.createElement('div');
  track.className = 'home-flow-track';
  const firstSet = makeSet(false);
  const secondSet = makeSet(true);
  track.append(firstSet, secondSet);
  viewport.append(track);

  const prevButton = document.createElement('button');
  prevButton.className = 'home-flow-arrow home-flow-arrow--prev';
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Xem bài trước');
  prevButton.innerHTML = '<span aria-hidden="true">←</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'home-flow-arrow home-flow-arrow--next';
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Xem bài tiếp theo');
  nextButton.innerHTML = '<span aria-hidden="true">→</span>';

  host.replaceChildren(viewport, prevButton, nextButton);

  const galleryImages = Array.from(track.querySelectorAll('img[data-src]'));
  const loadImage = (image) => {
    if (!image?.dataset.src) return;
    image.src = image.dataset.src;
    delete image.dataset.src;
  };
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadImage(entry.target);
        imageObserver.unobserve(entry.target);
      });
    }, { root:null, rootMargin:'250px 900px', threshold:0.01 });
    galleryImages.forEach((image) => imageObserver.observe(image));
  } else {
    galleryImages.forEach(loadImage);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AUTO_SPEED = 18;
  let setWidth = 1;
  let offset = 0;
  let dragging = false;
  let hovered = false;
  let focused = false;
  let galleryVisible = false;
  let startX = 0;
  let startOffset = 0;
  let activePointerId = null;
  let moved = false;
  let suppressClickUntil = 0;
  let lastFrame = performance.now();
  let autoFrame = 0;
  let nudgeAnimation = 0;
  let resumeTimer = 0;

  const normalize = (value) => ((value % setWidth) + setWidth) % setWidth;
  const render = () => {
    if (setWidth > 0) offset = normalize(offset);
    track.style.transform = `translate3d(${-offset}px,0,0)`;
  };
  const measure = () => {
    setWidth = Math.max(1, firstSet.getBoundingClientRect().width);
    offset = normalize(offset);
    render();
  };

  const shouldAutoRun = () => galleryVisible && !document.hidden && !reduceMotion && !dragging && !hovered && !focused && !nudgeAnimation;
  const stopAuto = () => {
    if (!autoFrame) return;
    cancelAnimationFrame(autoFrame);
    autoFrame = 0;
  };
  const frame = (now) => {
    autoFrame = 0;
    if (!shouldAutoRun()) return;
    const dt = Math.min(42, now - lastFrame);
    lastFrame = now;
    offset += AUTO_SPEED * dt / 1000;
    render();
    autoFrame = requestAnimationFrame(frame);
  };
  const startAuto = () => {
    if (!shouldAutoRun() || autoFrame) return;
    lastFrame = performance.now();
    autoFrame = requestAnimationFrame(frame);
  };
  const scheduleResume = (delay = 650) => {
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      resumeTimer = 0;
      startAuto();
    }, delay);
  };

  const cardStep = () => {
    const card = firstSet.querySelector('.home-flow-card');
    if (!card) return 280;
    const styles = getComputedStyle(firstSet);
    const gap = parseFloat(styles.columnGap || styles.gap || '16') || 16;
    return card.getBoundingClientRect().width + gap;
  };

  const nudge = (direction) => {
    if (nudgeAnimation) cancelAnimationFrame(nudgeAnimation);
    if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = 0; }
    stopAuto();
    const from = offset;
    const distance = cardStep() * direction;
    const started = performance.now();
    const duration = 320;
    const animate = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      offset = from + distance * eased;
      render();
      if (t < 1) nudgeAnimation = requestAnimationFrame(animate);
      else {
        nudgeAnimation = 0;
        scheduleResume(650);
      }
    };
    nudgeAnimation = requestAnimationFrame(animate);
  };

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      galleryVisible = Boolean(entry?.isIntersecting);
      host.classList.toggle('is-active', galleryVisible);
      if (galleryVisible) startAuto();
      else stopAuto();
    }, { rootMargin:'180px 0px', threshold:0.01 });
    visibilityObserver.observe(host);
  } else {
    galleryVisible = true;
    host.classList.add('is-active');
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  host.addEventListener('mouseenter', () => { hovered = true; stopAuto(); });
  host.addEventListener('mouseleave', () => { hovered = false; startAuto(); });
  host.addEventListener('focusin', () => { focused = true; stopAuto(); });
  host.addEventListener('focusout', (event) => {
    if (!host.contains(event.relatedTarget)) { focused = false; startAuto(); }
  });

  prevButton.addEventListener('click', () => nudge(-1));
  nextButton.addEventListener('click', () => nudge(1));

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (nudgeAnimation) {
      cancelAnimationFrame(nudgeAnimation);
      nudgeAnimation = 0;
    }
    if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = 0; }
    stopAuto();
    dragging = true;
    moved = false;
    activePointerId = event.pointerId;
    startX = event.clientX;
    startOffset = offset;
    host.classList.add('is-dragging');
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!dragging || event.pointerId !== activePointerId) return;
    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) > 5) moved = true;
    offset = startOffset - deltaX;
    render();
    if (moved) event.preventDefault();
  });

  const endDrag = (event) => {
    if (!dragging || event.pointerId !== activePointerId) return;
    dragging = false;
    host.classList.remove('is-dragging');
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    activePointerId = null;
    if (moved) suppressClickUntil = performance.now() + 420;
    scheduleResume(650);
  };

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('click', (event) => {
    if (performance.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  viewport.addEventListener('dragstart', (event) => event.preventDefault());

  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      measure();
    });
  }, { passive:true });

  requestAnimationFrame(() => {
    measure();
    startAuto();
  });
})();
