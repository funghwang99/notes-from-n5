(() => {
  const host = document.querySelector('.home-collage');
  if (!host) return;

  const stories = [
    { href:'nine-years-in-one-afternoon.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/FA_Cup_Final_2014_02.jpg?width=1200', label:'Hy vọng · Wembley 2014', title:'Nine Years in One Afternoon', alt:'Arsenal tại Wembley năm 2014.', position:'center 38%' },
    { href:'the-second-revolution.html', image:'https://cdn.mos.cms.futurecdn.net/v2/t%3A0%2Cl%3A180%2Ccw%3A450%2Cch%3A450%2Cq%3A80%2Cw%3A900/tUqyMqKPeNijbs8ki3cfK3.jpg', label:'Di sản · Gheorghe Hagi', title:'The Second Revolution.', alt:'Gheorghe Hagi trong màu áo Romania.', position:'center 32%' },
    { href:'the-move-before-the-move.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dennis_Bergkamp.jpg?width=1000', label:'Bất tử · Dennis Bergkamp', title:'The Move Before the Move.', alt:'Dennis Bergkamp trong màu áo Arsenal.', position:'center 25%' },
    { href:'the-second-arrow.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Roberto_Baggio_-_Italia_%2790.jpg?width=1000', label:'Di sản · Roberto Baggio', title:'The Second Arrow.', alt:'Roberto Baggio trong màu áo Italy.', position:'center 22%' },
    { href:'the-crown-we-all-wore.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Thierry_Henry%E2%80%99s_iconic_knee_slide.jpg?width=1000', label:'Bất tử · Thierry Henry', title:'The Crown We All Wore.', alt:'Thierry Henry trong màu áo Arsenal.', position:'center 30%' },
    { href:'the-world-was-late.html', image:'wright-179.webp', label:'Bất tử · Ian Wright', title:'The World Was Late.', alt:'Ian Wright trong màu áo Arsenal.', position:'center 22%' },
    { href:'before-the-arms-were-raised.html', image:'bould-portrait.webp', label:'Ngoài ánh đèn · Steve Bould', title:'Before the Arms Were Raised.', alt:'Steve Bould trong màu áo Arsenal.', position:'center top' },
    { href:'the-ship-that-still-knew-its-name.html', image:'adams-2002.webp', label:'Bất tử · Tony Adams', title:'The Ship That Still Knew Its Name.', alt:'Tony Adams trong màu áo Arsenal.', position:'center 18%' },
    { href:'the-shape-of-an-eight.html', image:'cazorla-arsenal.webp', label:'Ngoài ánh đèn · Santi Cazorla', title:'The Shape of an Eight.', alt:'Santi Cazorla trong màu áo Arsenal.', position:'center 24%' },
    { href:'the-language-football-forgot.html', image:'ozil-2015-16.webp', label:'Mất mát · Mesut Özil', title:'The Language Football Forgot.', alt:'Mesut Özil trong màu áo Arsenal.', position:'center 24%' },
    { href:'the-last-summer-we-borrowed.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Lionel_Messi_Argentina_v_Egypt_7_July_2026-112.jpg?width=1000', label:'Di sản · Lionel Messi', title:'The Last Summer We Borrowed.', alt:'Lionel Messi cùng Argentina tại World Cup 2026.', position:'center 30%' },
    { href:'the-man-between-chapters.html', image:'trossard-arrival.webp', label:'Ngoài ánh đèn · Leandro Trossard', title:'The Man Between Chapters.', alt:'Leandro Trossard trong màu áo Arsenal.', position:'center 22%' },
    { href:'the-keystone.html', image:'rice-freekick.webp', label:'Arsenal · Declan Rice', title:'The Keystone', alt:'Declan Rice trong màu áo Arsenal.', position:'center 28%' },
    { href:'the-last-empty-room.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cristiano_Ronaldo_Croatia_v_Portugal_2_July_2026-086.jpg?width=1000', label:'Di sản · Cristiano Ronaldo', title:'The Last Empty Room.', alt:'Cristiano Ronaldo cùng Portugal tại World Cup 2026.', position:'center 28%' },
    { href:'the-prince-that-never-became-king.html', image:'neymar-final-world-cup.webp', label:'Di sản · Neymar', title:'The Prince That Never Became King.', alt:'Neymar cùng Brazil tại World Cup.', position:'center 24%' },
    { href:'the-stones-beneath.html', image:'hale-quartet.webp', label:'Tuổi trẻ · Hale End', title:'The stones beneath.', alt:'Những cầu thủ trưởng thành từ Hale End.', position:'center 28%' },
    { href:'the-age-we-never-let-him-leave.html', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Theo_Walcott_3.jpg?width=1000', label:'Tuổi trẻ · Theo Walcott', title:'The Age We Never Let Him Leave', alt:'Theo Walcott thời trẻ trong màu áo Arsenal.', position:'center 18%' },
    { href:'until-i-put-on-the-mask.html', image:'gyokeres-arrival.webp', label:'Arsenal · Viktor Gyökeres', title:'Until I put on the mask.', alt:'Viktor Gyökeres trong màu áo Arsenal.', position:'center 24%' },
    { href:'you-deserve-more.html', image:'saka-young.webp', label:'Tuổi trẻ · Bukayo Saka', title:'You deserve more.', alt:'Bukayo Saka thời trẻ tại Arsenal.', position:'center 22%' },
    { href:'day-khong-phai-la-ket-thuc.html', image:'budapest-2026.webp', label:'Mất mát · Budapest 2026', title:'Đây không phải là kết thúc.', alt:'Arsenal sau chung kết Champions League 2026 tại Budapest.', position:'center 38%' },
    { href:'it-is-hope-that-kills-us.html', image:'hope-fans.webp', label:'Hy vọng · Arsenal', title:'It is hope that kills us.', alt:'Những người hâm mộ Arsenal trên khán đài.', position:'center 30%' },
    { href:'before-the-waiting-began.html', image:'budapest-2006.webp', label:'Mất mát · Paris 2006', title:'Before the Waiting Began', alt:'Arsenal trong trận chung kết Champions League 2006.', position:'center 40%' }
  ];

  const style = document.createElement('style');
  style.textContent = `
    .home-collage.home-flow-gallery{position:relative;display:flex;min-height:72vh;align-items:center;overflow:hidden;isolation:isolate;margin-right:calc(clamp(1.2rem,5.5vw,6.5rem)*-1)}
    .home-flow-viewport{position:relative;width:100%;overflow:hidden;padding:2.2rem 0;cursor:grab;touch-action:pan-y pinch-zoom;user-select:none;-webkit-user-select:none;mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%)}
    .home-flow-gallery.is-dragging .home-flow-viewport{cursor:grabbing}
    .home-flow-track{display:flex;width:max-content;will-change:transform;transform:translate3d(0,0,0)}
    .home-flow-set{display:flex;gap:1rem;padding-right:1rem;align-items:center}
    .home-flow-card{position:relative;display:block;flex:0 0 clamp(16rem,18vw,19rem);height:clamp(23rem,49vh,28rem);overflow:hidden;background:linear-gradient(145deg,#2a2824,#141412);color:#f8f5ed;text-decoration:none;box-shadow:0 24px 55px rgba(0,0,0,.3);transition:transform 220ms ease,box-shadow 220ms ease}
    .home-flow-card:hover,.home-flow-card:focus-visible{z-index:3;transform:translateY(-.35rem);box-shadow:0 32px 72px rgba(0,0,0,.45);outline:none}
    .home-flow-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;filter:saturate(.78) contrast(1.04);transition:transform 500ms ease,filter 500ms ease}
    .home-flow-card:hover img,.home-flow-card:focus-visible img{transform:scale(1.035);filter:saturate(.98) contrast(1.02)}
    .home-flow-card:after{position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,7,.92) 0%,rgba(8,8,7,.48) 34%,rgba(8,8,7,.06) 72%);content:"";pointer-events:none}
    .home-flow-card.is-image-missing:before{position:absolute;right:-.3rem;bottom:-1rem;color:rgba(248,245,237,.07);font-size:8rem;font-weight:850;letter-spacing:-.12em;content:"N5"}
    .home-flow-copy{position:absolute;z-index:2;right:1rem;bottom:1.1rem;left:1rem;pointer-events:none}
    .home-flow-meta{display:block;margin-bottom:.45rem;color:#d3cdc2;font-size:.56rem;font-weight:760;letter-spacing:.11em;text-transform:uppercase}
    .home-flow-copy strong{display:block;font-family:var(--serif);font-size:clamp(1.55rem,2.05vw,2.35rem);font-weight:520;letter-spacing:-.045em;line-height:.98}
    .home-flow-arrow{position:absolute;z-index:10;top:50%;display:grid;width:3.15rem;height:3.15rem;place-items:center;border:1px solid rgba(248,245,237,.34);border-radius:50%;background:rgba(18,18,16,.72);color:#f8f5ed;font:400 1.45rem/1 var(--sans);cursor:pointer;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transform:translateY(-50%);transition:background 180ms ease,border-color 180ms ease,transform 180ms ease,opacity 180ms ease}
    .home-flow-arrow:hover,.home-flow-arrow:focus-visible{border-color:rgba(248,245,237,.78);background:rgba(248,245,237,.94);color:#171714;outline:none;transform:translateY(-50%) scale(1.06)}
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
    image.src = story.image;
    image.alt = duplicate ? '' : story.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AUTO_SPEED = 18;
  let setWidth = 1;
  let offset = 0;
  let dragging = false;
  let hovered = false;
  let focused = false;
  let startX = 0;
  let startOffset = 0;
  let activePointerId = null;
  let moved = false;
  let suppressClickUntil = 0;
  let resumeAfter = 0;
  let lastFrame = performance.now();
  let nudgeAnimation = null;

  const normalize = (value) => ((value % setWidth) + setWidth) % setWidth;

  const measure = () => {
    setWidth = Math.max(1, firstSet.getBoundingClientRect().width);
    offset = normalize(offset);
    track.style.transform = `translate3d(${-offset}px,0,0)`;
  };

  const render = () => {
    if (setWidth > 0) offset = normalize(offset);
    track.style.transform = `translate3d(${-offset}px,0,0)`;
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
    const from = offset;
    const distance = cardStep() * direction;
    const started = performance.now();
    const duration = 360;
    resumeAfter = started + duration + 900;

    const animate = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      offset = from + distance * eased;
      render();
      if (t < 1) nudgeAnimation = requestAnimationFrame(animate);
      else nudgeAnimation = null;
    };
    nudgeAnimation = requestAnimationFrame(animate);
  };

  const frame = (now) => {
    const dt = Math.min(50, now - lastFrame);
    lastFrame = now;
    const paused = dragging || hovered || focused || nudgeAnimation || now < resumeAfter;
    if (!reduceMotion && !paused) {
      offset += AUTO_SPEED * dt / 1000;
      render();
    }
    requestAnimationFrame(frame);
  };

  host.addEventListener('mouseenter', () => { hovered = true; });
  host.addEventListener('mouseleave', () => { hovered = false; });
  host.addEventListener('focusin', () => { focused = true; });
  host.addEventListener('focusout', (event) => {
    if (!host.contains(event.relatedTarget)) focused = false;
  });

  prevButton.addEventListener('click', () => nudge(-1));
  nextButton.addEventListener('click', () => nudge(1));

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (nudgeAnimation) {
      cancelAnimationFrame(nudgeAnimation);
      nudgeAnimation = null;
    }
    dragging = true;
    moved = false;
    activePointerId = event.pointerId;
    startX = event.clientX;
    startOffset = offset;
    resumeAfter = Infinity;
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
    if (moved) suppressClickUntil = performance.now() + 450;
    resumeAfter = performance.now() + 850;
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
  window.addEventListener('resize', measure, { passive:true });

  requestAnimationFrame(() => {
    measure();
    requestAnimationFrame(frame);
  });
})();