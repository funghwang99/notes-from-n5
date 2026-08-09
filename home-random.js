(() => {
  const gallery = document.querySelector('[data-home-gallery]');
  if (!gallery) return;

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
    { href:'until-i-put-on-the-mask.html', image:'gyokeres-arrival.webp', label:'Arsenal · Viktor Gyökeres', title:'Until I put on the mask.', alt:'Viktor Gyökeres trong màu áo Arsenal.', position:'center 24%' },
    { href:'you-deserve-more.html', image:'saka-young.webp', label:'Tuổi trẻ · Bukayo Saka', title:'You deserve more.', alt:'Bukayo Saka thời trẻ tại Arsenal.', position:'center 22%' },
    { href:'day-khong-phai-la-ket-thuc.html', image:'budapest-2026.webp', label:'Mất mát · Budapest 2026', title:'Đây không phải là kết thúc.', alt:'Arsenal sau chung kết Champions League 2026 tại Budapest.', position:'center 38%' },
    { href:'it-is-hope-that-kills-us.html', image:'hope-fans.webp', label:'Hy vọng · Arsenal', title:'It is hope that kills us.', alt:'Những người hâm mộ Arsenal trên khán đài.', position:'center 30%' },
    { href:'before-the-waiting-began.html', image:'budapest-2006.webp', label:'Mất mát · Paris 2006', title:'Before the Waiting Began', alt:'Arsenal trong trận chung kết Champions League 2006.', position:'center 40%' }
  ];

  const makeCard = (story, duplicate = false) => {
    const card = document.createElement('a');
    card.className = 'home-flow-card';
    card.href = story.href;
    if (duplicate) card.setAttribute('aria-hidden', 'true');

    const image = document.createElement('img');
    image.src = story.image;
    image.alt = duplicate ? '' : story.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
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
    stories.forEach((story) => set.append(makeCard(story, duplicate)));
    return set;
  };

  gallery.replaceChildren(makeSet(false), makeSet(true));
})();
