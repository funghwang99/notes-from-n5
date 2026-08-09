(() => {
  const collage = document.querySelector('.home-collage');
  if (!collage) return;

  const slots = Array.from(collage.querySelectorAll('.home-shot'));
  if (slots.length !== 3) return;

  // Curated pool: local image assets only, so the masthead does not depend on hotlinks.
  const stories = [
    {
      href: 'the-world-was-late.html',
      image: 'wright-179.webp',
      alt: 'Ian Wright trong màu áo Arsenal.',
      label: 'Bất tử · Ian Wright',
      title: 'The World Was Late.',
      path: 'bat-tu',
      position: 'center 22%'
    },
    {
      href: 'the-ship-that-still-knew-its-name.html',
      image: 'adams-2002.webp',
      alt: 'Tony Adams trong màu áo Arsenal.',
      label: 'Bất tử · Tony Adams',
      title: 'The Ship That Still Knew Its Name.',
      path: 'bat-tu',
      position: 'center 18%'
    },
    {
      href: 'the-shape-of-an-eight.html',
      image: 'cazorla-arsenal.webp',
      alt: 'Santi Cazorla trong màu áo Arsenal.',
      label: 'Ngoài ánh đèn · Santi Cazorla',
      title: 'The Shape of an Eight.',
      path: 'ngoai-anh-den',
      position: 'center 24%'
    },
    {
      href: 'the-man-between-chapters.html',
      image: 'trossard-arrival.webp',
      alt: 'Leandro Trossard trong màu áo Arsenal.',
      label: 'Ngoài ánh đèn · Leandro Trossard',
      title: 'The Man Between Chapters.',
      path: 'ngoai-anh-den',
      position: 'center 22%'
    },
    {
      href: 'the-language-football-forgot.html',
      image: 'ozil-2015-16.webp',
      alt: 'Mesut Özil trong màu áo Arsenal mùa 2015–16.',
      label: 'Mất mát · Mesut Özil',
      title: 'The Language Football Forgot.',
      path: 'mat-mat',
      position: 'center 24%'
    },
    {
      href: 'day-khong-phai-la-ket-thuc.html',
      image: 'budapest-2026.webp',
      alt: 'Arsenal sau trận chung kết Champions League 2026 tại Budapest.',
      label: 'Mất mát · Budapest 2026',
      title: 'Đây không phải là kết thúc.',
      path: 'mat-mat',
      position: 'center 38%'
    },
    {
      href: 'the-stones-beneath.html',
      image: 'hale-quartet.webp',
      alt: 'Những cầu thủ trưởng thành từ Hale End.',
      label: 'Tuổi trẻ · Hale End',
      title: 'The stones beneath.',
      path: 'tuoi-tre',
      position: 'center 28%'
    },
    {
      href: 'you-deserve-more.html',
      image: 'saka-young.webp',
      alt: 'Bukayo Saka thời trẻ tại Arsenal.',
      label: 'Tuổi trẻ · Bukayo Saka',
      title: 'You deserve more.',
      path: 'tuoi-tre',
      position: 'center 22%'
    },
    {
      href: 'it-is-hope-that-kills-us.html',
      image: 'hope-fans.webp',
      alt: 'Những người hâm mộ Arsenal trên khán đài.',
      label: 'Hy vọng · Arsenal',
      title: 'It is hope that kills us.',
      path: 'hy-vong',
      position: 'center 30%'
    }
  ];

  const storageKey = 'n5-home-collage-last';
  let previous = [];
  try {
    previous = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(previous)) previous = [];
  } catch (_) {
    previous = [];
  }

  const shuffle = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Do not show any of the three stories from the immediately previous visit.
  let candidates = stories.filter((story) => !previous.includes(story.href));
  if (candidates.length < 3) candidates = [...stories];
  candidates = shuffle(candidates);

  // Prefer three different emotional paths so the collage feels editorial, not repetitive.
  const chosen = [];
  const usedPaths = new Set();
  for (const story of candidates) {
    if (!usedPaths.has(story.path)) {
      chosen.push(story);
      usedPaths.add(story.path);
      if (chosen.length === 3) break;
    }
  }

  if (chosen.length < 3) {
    for (const story of candidates) {
      if (!chosen.includes(story)) chosen.push(story);
      if (chosen.length === 3) break;
    }
  }

  slots.forEach((slot, index) => {
    const story = chosen[index];
    if (!story) return;

    const image = slot.querySelector('img');
    const meta = slot.querySelector('.home-shot-copy > span');
    const title = slot.querySelector('.home-shot-copy > strong');

    slot.href = story.href;
    if (image) {
      image.src = story.image;
      image.alt = story.alt;
      image.style.objectPosition = story.position;
    }
    if (meta) meta.textContent = story.label;
    if (title) title.textContent = story.title;
  });

  try {
    localStorage.setItem(storageKey, JSON.stringify(chosen.map((story) => story.href)));
  } catch (_) {
    // The collage still works if storage is unavailable; only anti-repeat is lost.
  }
})();
