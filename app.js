const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-navigation]");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const readingProgress = document.querySelector("[data-reading-progress]");

if (readingProgress) {
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

const archiveEntries = Array.from(document.querySelectorAll("[data-paths]"));
const archiveFilters = Array.from(document.querySelectorAll("[data-archive-filter]"));

if (archiveEntries.length && archiveFilters.length) {
  const paths = {
    "hy-vong": "Hy vọng",
    "tuoi-tre": "Tuổi trẻ",
    "mat-mat": "Mất mát",
    "ngoai-anh-den": "Ngoài ánh đèn",
    "di-san": "Di sản",
    "bat-tu": "Bất tử",
  };
  const requestedPath = new URLSearchParams(window.location.search).get("path");
  const activePath = Object.hasOwn(paths, requestedPath) ? requestedPath : "all";

  archiveEntries.forEach((entry) => {
    const entryPaths = entry.dataset.paths.split(/\s+/).filter(Boolean);
    entry.hidden = activePath !== "all" && !entryPaths.includes(activePath);
  });

  archiveFilters.forEach((filter) => {
    const isCurrent = filter.dataset.archiveFilter === activePath;
    filter.classList.toggle("is-current", isCurrent);
    if (isCurrent) filter.setAttribute("aria-current", "page");
    else filter.removeAttribute("aria-current");
  });

  const visibleCount = archiveEntries.filter((entry) => !entry.hidden).length;
  const archiveCount = document.querySelector("[data-archive-count]");
  const archiveStatus = document.querySelector("[data-archive-status]");
  if (archiveCount) archiveCount.textContent = `${visibleCount} bài viết`;
  if (archiveStatus && activePath !== "all") archiveStatus.textContent = `Mạch ${paths[activePath]}`;
}

if (document.body.classList.contains("layout-letter")) {
  const style = document.createElement("style");
  style.textContent = ".layout-letter .article-body .article-lead::first-letter{color:inherit}";
  document.head.append(style);
}

// Preview / archive thumbnails deliberately use a different image from each article hero.
const thumbnailMap = {
  "nine-years-in-one-afternoon.html": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/FA_Cup_Final_2014_02.jpg?width=1400",
    alt: "Arsenal trong trận chung kết FA Cup 2014 tại Wembley.",
    position: "center 38%",
  },
  "the-second-revolution.html": {
    src: "https://cdn.mos.cms.futurecdn.net/v2/t%3A0%2Cl%3A180%2Ccw%3A450%2Cch%3A450%2Cq%3A80%2Cw%3A900/tUqyMqKPeNijbs8ki3cfK3.jpg",
    alt: "Gheorghe Hagi trong áo vàng Romania tại World Cup 1994.",
    position: "center 32%",
  },
  "the-move-before-the-move.html": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dennis_Bergkamp.jpg?width=1200",
    alt: "Dennis Bergkamp trong màu áo Arsenal.",
    position: "center 24%",
  },
  "the-second-arrow.html": {
    src: "https://media-assets.vanityfair.it/photos/614cad28ab48b5e28ef85408/16:9/w_1600,c_limit/roberto-baggio-P.jpg",
    alt: "Roberto Baggio cùng Italy tại trận chung kết World Cup 1994 ở Pasadena.",
    position: "center 32%",
  },
  "the-crown-we-all-wore.html": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Thierry_Henry%E2%80%99s_iconic_knee_slide.jpg?width=1200",
    alt: "Thierry Henry trong một màn ăn mừng mang tính biểu tượng của Arsenal.",
    position: "center 28%",
  },
  "the-world-was-late.html": { src: "wright-179.webp", alt: "Ian Wright trong màu áo Arsenal.", position: "center 22%" },
  "before-the-arms-were-raised.html": { src: "https://www.justarsenal.com/wp-content/uploads/2021/05/Steve-Bould.jpg", alt: "Steve Bould thi đấu cho Arsenal.", position: "center top" },
  "the-ship-that-still-knew-its-name.html": { src: "adams-2002.webp", alt: "Tony Adams trong màu áo Arsenal.", position: "center 18%" },
  "the-shape-of-an-eight.html": { src: "cazorla-arsenal.webp", alt: "Santi Cazorla trong màu áo Arsenal.", position: "center 24%" },
  "the-language-football-forgot.html": { src: "ozil-2015-16.webp", alt: "Mesut Özil trong màu áo Arsenal mùa 2015–16.", position: "center 24%" },
  "the-last-summer-we-borrowed.html": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lionel_Messi_Argentina_v_Egypt_7_July_2026-112.jpg?width=1400", alt: "Lionel Messi trong màu áo Argentina tại World Cup 2026.", position: "center 30%" },
  "the-man-between-chapters.html": { src: "trossard-arrival.webp", alt: "Leandro Trossard trong những ngày đầu tại Arsenal.", position: "center 22%" },
  "the-keystone.html": { src: "rice-freekick.webp", alt: "Declan Rice trong màu áo Arsenal.", position: "center 28%" },
  "the-last-empty-room.html": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cristiano_Ronaldo_Croatia_v_Portugal_2_July_2026-086.jpg?width=1400", alt: "Cristiano Ronaldo trong màu áo Portugal tại World Cup 2026.", position: "center 28%" },
  "the-prince-that-never-became-king.html": { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Neymar_at_2026_FIFA_World_Cup_by_YantsImages.jpg?width=1400", alt: "Neymar trong màu áo Brazil tại World Cup 2026.", position: "center 24%" },
  "the-stones-beneath.html": { src: "hale-quartet.webp", alt: "Những cầu thủ trưởng thành từ Hale End.", position: "center 28%" },
  "until-i-put-on-the-mask.html": { src: "gyokeres-arrival.webp", alt: "Viktor Gyökeres trong những ngày đầu tại Arsenal.", position: "center 24%" },
  "you-deserve-more.html": { src: "saka-young.webp", alt: "Bukayo Saka thời trẻ tại Arsenal.", position: "center 22%" },
  "day-khong-phai-la-ket-thuc.html": {
    src: "https://editorial.uefa.com/resources/02a6-20c57f6d10b6-e7dc42fa812d-1000/format/wide1/paris_saint-germain_v_arsenal_fc_-_uefa_champions_league_final_2026.jpeg?imwidth=1200",
    fallback: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1_kai_havertz_2026_%28cropped%29.jpg?width=1200",
    alt: "Gabriel thất vọng sau loạt luân lưu chung kết Champions League 2026 tại Budapest.",
    position: "center 40%",
  },
  "it-is-hope-that-kills-us.html": { src: "hope-fans.webp", alt: "Những người hâm mộ Arsenal trên khán đài.", position: "center 30%" },
};

Object.entries(thumbnailMap).forEach(([href, config]) => {
  document.querySelectorAll(`a[href*="${href}"] img`).forEach((image) => {
    if (config.fallback) {
      image.onerror = () => {
        image.onerror = null;
        image.src = config.fallback;
      };
    }
    image.src = config.src;
    image.alt = config.alt;
    image.style.objectPosition = config.position;
  });
});

// Playing-era hero corrections for Hagi and Steve Bould.
const loadFirstAvailableImage = (sources, onReady) => {
  const trySource = (index) => {
    if (index >= sources.length) return;
    const probe = new Image();
    probe.onload = () => onReady(sources[index]);
    probe.onerror = () => trySource(index + 1);
    probe.src = sources[index];
  };
  trySource(0);
};

const hagiPlayingImages = [
  "https://www.theduochronicles.com/content/images/2023/04/gheorghe-hagi-world-cup-1994.jpg",
  "https://cdn.mos.cms.futurecdn.net/v2/t%3A0%2Cl%3A180%2Ccw%3A450%2Cch%3A450%2Cq%3A80%2Cw%3A900/tUqyMqKPeNijbs8ki3cfK3.jpg",
  "https://cdn-mds.pickx.be/NewsFolder/w-700_h-500/BELGAIMAGE-130809427_20200629015959.jpg",
];

loadFirstAvailableImage(hagiPlayingImages, (source) => {
  if (!document.body.classList.contains("layout-hagi")) return;
  const hero = document.querySelector(".hagi-hero-photo");
  if (hero) {
    hero.style.backgroundImage = `linear-gradient(90deg,rgba(17,26,50,.98) 0%,rgba(17,26,50,.88) 38%,rgba(17,26,50,.25) 72%,rgba(17,26,50,.45) 100%),linear-gradient(0deg,rgba(17,26,50,.8),transparent 45%),url("${source}")`;
    hero.style.backgroundPosition = "center 34%";
    hero.style.backgroundSize = "cover";
  }
  document.querySelectorAll(".hagi-figure figcaption").forEach((caption) => caption.remove());
});

const bouldHeroImages = [
  "https://www.arsenalpics.com/p/5/steve-bould-arsenals-defensive-icon-50149.jpg.webp",
  "https://www.justarsenal.com/wp-content/uploads/2021/05/Steve-Bould.jpg",
];

const bouldAwayImages = [
  "https://www.justarsenal.com/wp-content/uploads/2021/05/Steve-Bould.jpg",
  "https://www.arsenalpics.com/p/5/steve-bould-arsenals-defensive-icon-50149.jpg.webp",
];

loadFirstAvailableImage(bouldHeroImages, (source) => {
  if (!document.body.classList.contains("layout-bould")) return;
  document.body.style.setProperty("--article-hero-image", `url("${source}")`);
  document.body.style.setProperty("--article-hero-position", "left center");

  const heroMedia = document.querySelector(".article-hero-media");
  if (heroMedia) {
    heroMedia.style.backgroundSize = "auto 100%";
    heroMedia.style.backgroundRepeat = "no-repeat";
    heroMedia.style.backgroundPosition = "left center";
    heroMedia.style.transform = "none";
  }

  const lateCareerFigure = document.querySelector(".bould-figure--coach img");
  if (lateCareerFigure) {
    lateCareerFigure.src = source;
    lateCareerFigure.alt = "Steve Bould thi đấu cho Arsenal trong màu áo đỏ trắng.";
    lateCareerFigure.style.objectPosition = "center top";
  }
});

loadFirstAvailableImage(bouldAwayImages, (source) => {
  if (!document.body.classList.contains("layout-bould")) return;
  const firstFigure = document.querySelector(".bould-figure--statue img");
  if (firstFigure) {
    firstFigure.src = source;
    firstFigure.alt = "Steve Bould thi đấu cho Arsenal trong bộ áo sân khách màu vàng.";
    firstFigure.style.objectPosition = "center top";
  }
});

// Publish Before the Waiting Began into the archive and the home-page latest slot.
const waitingThumbnail = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/05/20/01/4-Victor-Valdes-Getty.jpg";
const archive = document.querySelector(".archive#archive");
if (archive && !archive.querySelector('a[href="before-the-waiting-began.html"]')) {
  const firstEntry = archive.querySelector(".archive-entry");
  const entry = document.createElement("article");
  entry.className = "archive-entry reveal is-visible";
  entry.dataset.paths = "mat-mat";
  entry.innerHTML = `<a class="archive-thumb" href="before-the-waiting-began.html"><img src="${waitingThumbnail}" alt="Thierry Henry bị Víctor Valdés từ chối trong trận chung kết Champions League 2006." style="object-position:center 48%" /></a><div class="archive-entry-copy"><p class="article-meta">Arsenal · Paris 2006</p><h2><a href="before-the-waiting-began.html">Before the Waiting Began</a></h2><p>Paris 2006, khoảnh khắc Arsenal rời một trận chung kết mà chưa ai biết cuộc chờ đợi vừa bắt đầu.</p></div><a class="archive-arrow" href="before-the-waiting-began.html" aria-label="Đọc bài Before the Waiting Began">↗</a>`;
  if (firstEntry) firstEntry.before(entry);

  const paths = {"hy-vong":"Hy vọng","tuoi-tre":"Tuổi trẻ","mat-mat":"Mất mát","ngoai-anh-den":"Ngoài ánh đèn","di-san":"Di sản","bat-tu":"Bất tử"};
  const requestedPath = new URLSearchParams(window.location.search).get("path");
  const activePath = Object.hasOwn(paths, requestedPath) ? requestedPath : "all";
  document.querySelectorAll(".archive-entry[data-paths]").forEach((item) => {
    const itemPaths = item.dataset.paths.split(/\s+/).filter(Boolean);
    item.hidden = activePath !== "all" && !itemPaths.includes(activePath);
  });
  const visible = Array.from(document.querySelectorAll(".archive-entry[data-paths]")).filter((item) => !item.hidden).length;
  const count = document.querySelector("[data-archive-count]");
  if (count) count.textContent = `${visible} bài viết`;
}

const homeMainStory = document.querySelector(".home-story-main");
if (homeMainStory) {
  homeMainStory.href = "before-the-waiting-began.html";
  const image = homeMainStory.querySelector("img");
  const label = homeMainStory.querySelector(".home-story-label");
  const title = homeMainStory.querySelector("h3");
  const deck = homeMainStory.querySelector(".home-story-main-copy > p:last-child");
  if (image) {
    image.src = waitingThumbnail;
    image.alt = "Thierry Henry bị Víctor Valdés từ chối trong trận chung kết Champions League 2006.";
    image.style.objectPosition = "center 48%";
  }
  if (label) label.textContent = "Mất mát · Arsenal · Paris 2006";
  if (title) title.textContent = "Before the Waiting Began";
  if (deck) deck.textContent = "Một trận thua ở Paris dần trở thành điểm bắt đầu của hai mươi năm chờ đợi.";
}
