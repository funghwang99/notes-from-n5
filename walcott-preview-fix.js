(() => {
  const TAXONOMY = [
    {
      slug: "hy-vong",
      label: "Hy Vọng",
      description: "Có những điều ta vẫn chờ, dù biết chính việc chờ đợi có thể làm mình đau.",
    },
    {
      slug: "tuoi-tre",
      label: "Tuổi Trẻ",
      description: "Những năm tháng khi mọi thứ còn ở phía trước, và chẳng ai biết mình sẽ trở thành ai.",
    },
    {
      slug: "ngoai-anh-den",
      label: "Ngoài Ánh Đèn",
      description: "Có những người không cần được nhìn thấy nhiều nhất để được nhớ lâu nhất.",
    },
    {
      slug: "chua-nguoi",
      label: "Chưa Nguôi",
      description: "Có những khoảnh khắc đã đi qua rất lâu, nhưng thời gian vẫn chưa đủ để làm chúng thôi đau.",
    },
    {
      slug: "bat-tu",
      label: "Bất Tử",
      description: "Có những người rời sân từ lâu, nhưng chưa bao giờ thật sự rời Arsenal.",
    },
    {
      slug: "tuong-dai",
      label: "Tượng Đài",
      description: "Có những người đi qua bóng đá. Có những người ở lại trong cách bóng đá được nhớ về.",
    },
  ];

  const taxonomyBySlug = Object.fromEntries(TAXONOMY.map((item) => [item.slug, item]));
  const lingeringLegendLabels = new Map([
    ["between-him-and-history.html", "Chưa Nguôi · Arjen Robben"],
    ["the-second-revolution.html", "Chưa Nguôi · Gheorghe Hagi"],
    ["the-second-arrow.html", "Chưa Nguôi · Roberto Baggio"],
    ["the-last-summer-we-borrowed.html", "Chưa Nguôi · Lionel Messi"],
    ["the-last-empty-room.html", "Chưa Nguôi · Cristiano Ronaldo"],
    ["the-prince-that-never-became-king.html", "Chưa Nguôi · Neymar"],
  ]);
  const outsideSpotlight = new Set([
    "the-keystone.html",
    "until-i-put-on-the-mask.html",
    "the-language-football-forgot.html",
  ]);
  const monuments = new Set([
    "the-throne-no-one-inherited.html",
  ]);

  const fileNameFromHref = (href = "") => href.split("/").pop().split("?")[0].split("#")[0];

  const normalizeRequestedPath = (value) => {
    if (value === "mat-mat") return "hy-vong";
    if (value === "di-san") return "chua-nguoi";
    return taxonomyBySlug[value] ? value : "all";
  };

  const classifyArchiveEntry = (entry) => {
    const link = entry.querySelector("h2 a, .archive-thumb");
    const file = fileNameFromHref(link?.getAttribute("href") || "");
    const oldPaths = (entry.dataset.paths || "").split(/\s+/).filter(Boolean);

    if (monuments.has(file)) return "tuong-dai";
    if (outsideSpotlight.has(file)) return "ngoai-anh-den";
    if (lingeringLegendLabels.has(file)) return "chua-nguoi";
    if (oldPaths.includes("mat-mat")) return "hy-vong";
    if (oldPaths.includes("di-san")) return "chua-nguoi";
    return oldPaths[0] || "";
  };

  const applyArchiveTaxonomy = () => {
    const archive = document.querySelector(".archive#archive");
    if (!archive) return;

    archive.querySelectorAll(".archive-entry").forEach((entry) => {
      const nextPath = classifyArchiveEntry(entry);
      if (nextPath) entry.dataset.paths = nextPath;
    });

    const nav = archive.querySelector(".archive-filters");
    if (nav) {
      nav.innerHTML = [
        '<a href="articles.html#archive" data-archive-filter="all">Tất cả</a>',
        ...TAXONOMY.map((item) => `<a href="articles.html?path=${item.slug}#archive" data-archive-filter="${item.slug}">${item.label}</a>`),
      ].join("");
    }

    const requested = new URLSearchParams(window.location.search).get("path");
    const activePath = normalizeRequestedPath(requested);
    const entries = Array.from(archive.querySelectorAll(".archive-entry[data-paths]"));

    entries.forEach((entry) => {
      const paths = entry.dataset.paths.split(/\s+/).filter(Boolean);
      entry.hidden = activePath !== "all" && !paths.includes(activePath);
    });

    archive.querySelectorAll("[data-archive-filter]").forEach((filter) => {
      const current = filter.dataset.archiveFilter === activePath;
      filter.classList.toggle("is-current", current);
      if (current) filter.setAttribute("aria-current", "page");
      else filter.removeAttribute("aria-current");
    });

    const visible = entries.filter((entry) => !entry.hidden).length;
    const count = archive.querySelector("[data-archive-count]");
    const status = archive.querySelector("[data-archive-status]");
    if (count) count.textContent = `${visible} bài viết`;
    if (status) status.textContent = activePath === "all" ? "Đã xuất bản" : `Mạch ${taxonomyBySlug[activePath].label}`;
  };

  const applyHomePathCards = () => {
    const cards = Array.from(document.querySelectorAll(".home-path-card"));
    if (!cards.length) return;

    TAXONOMY.forEach((item, index) => {
      const card = cards[index];
      if (!card) return;
      const number = String(index + 1).padStart(2, "0");
      card.href = `articles.html?path=${item.slug}#archive`;
      card.dataset.number = number;
      const topNumber = card.querySelector(".home-path-top span:first-child");
      const heading = card.querySelector("h3");
      const description = card.querySelector("p");
      if (topNumber) topNumber.textContent = number;
      if (heading) heading.textContent = item.label;
      if (description) description.textContent = item.description;
    });
  };

  const relabelText = (text) => text.replace(/Mất mát/gi, "Hy Vọng");

  const applyPreviewLabels = () => {
    document.querySelectorAll(".home-story-label, .home-shot-copy > span, .home-flow-meta").forEach((node) => {
      node.textContent = relabelText(node.textContent);
    });

    lingeringLegendLabels.forEach((label, href) => {
      document.querySelectorAll(`.home-flow-card[href="${href}"] .home-flow-meta`).forEach((node) => {
        node.textContent = label;
      });
    });

    document.querySelectorAll('.home-flow-card[href="the-keystone.html"] .home-flow-meta').forEach((node) => {
      node.textContent = "Ngoài Ánh Đèn · Declan Rice";
    });
    document.querySelectorAll('.home-flow-card[href="until-i-put-on-the-mask.html"] .home-flow-meta').forEach((node) => {
      node.textContent = "Ngoài Ánh Đèn · Viktor Gyökeres";
    });
    document.querySelectorAll('.home-flow-card[href="the-language-football-forgot.html"] .home-flow-meta').forEach((node) => {
      node.textContent = "Ngoài Ánh Đèn · Mesut Özil";
    });
    document.querySelectorAll('.home-flow-card[href="the-throne-no-one-inherited.html"] .home-flow-meta').forEach((node) => {
      node.textContent = "Tượng Đài · Pelé";
    });
  };

  const walcottHref = "the-age-we-never-let-him-leave.html";
  const walcottArchiveImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/TheoWalcottUnderhill.JPG?width=1200";

  document.querySelectorAll(`.home-flow-card[href="${walcottHref}"] img`).forEach((image) => {
    image.src = walcottArchiveImage;
    image.alt = "Theo Walcott thời trẻ trong màu áo Arsenal.";
    image.style.objectPosition = "center 20%";
  });

  document.querySelectorAll(`a.archive-thumb[href="${walcottHref}"] img`).forEach((image) => {
    image.src = walcottArchiveImage;
    image.alt = "Theo Walcott thời trẻ trong màu áo Arsenal.";
    image.style.objectPosition = "center 20%";
  });

  const dreamHref = "when-we-were-allowed-to-dream-again.html";
  const dreamImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Reiss_Nelson_2015.jpg?width=1400";
  const dreamThumb = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Reiss_Nelson_2015_%28cropped%29.jpg?width=1000";

  const archive = document.querySelector(".archive#archive");
  if (archive && !archive.querySelector(`a[href="${dreamHref}"]`)) {
    const firstEntry = archive.querySelector(".archive-entry");
    const entry = document.createElement("article");
    entry.className = "archive-entry reveal is-visible";
    entry.dataset.paths = "hy-vong";
    entry.innerHTML = `<a class="archive-thumb" href="${dreamHref}"><img src="${dreamThumb}" alt="Reiss Nelson thời trẻ trong màu áo Arsenal." style="object-position:center 24%" /></a><div class="archive-entry-copy"><p class="article-meta">Arsenal · 2022/23</p><h2><a href="${dreamHref}">When We Were Allowed to Dream Again</a></h2><p>Mùa giải chiếc cúp chưa trở lại, nhưng Arsenal đã khiến chúng ta dám mơ về nó một lần nữa.</p></div><a class="archive-arrow" href="${dreamHref}" aria-label="Đọc bài When We Were Allowed to Dream Again">↗</a>`;
    if (firstEntry) firstEntry.before(entry);
    else archive.append(entry);
  }

  const robbenHref = "between-him-and-history.html";
  const robbenThumb = "https://commons.wikimedia.org/wiki/Special:Redirect/file/FIFA_World_Cup_2010_Final_Netherlands_team.JPG?width=1400";
  const robbenLatest = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Robben_Kuyt_2.jpg?width=1400";

  if (archive && !archive.querySelector(`a[href="${robbenHref}"]`)) {
    const firstEntry = archive.querySelector(".archive-entry");
    const entry = document.createElement("article");
    entry.className = "archive-entry reveal is-visible";
    entry.dataset.paths = "chua-nguoi";
    entry.innerHTML = `<a class="archive-thumb" href="${robbenHref}"><img src="${robbenThumb}" alt="Arjen Robben cùng đội tuyển Hà Lan trước chung kết World Cup 2010." style="object-position:88% 66%" /></a><div class="archive-entry-copy"><p class="article-meta">Hà Lan · Arjen Robben</p><h2><a href="${robbenHref}">Between Him and History</a></h2><p>Bảy mươi sáu năm để đi đến vài giây, rồi giữa Arjen Robben và lịch sử là một bàn chân của Iker Casillas.</p></div><a class="archive-arrow" href="${robbenHref}" aria-label="Đọc bài Between Him and History">↗</a>`;
    if (firstEntry) firstEntry.before(entry);
    else archive.append(entry);
  }

  const peleHref = "the-throne-no-one-inherited.html";
  const peleThumb = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pele_con_brasil.jpg?width=1200";
  const peleLatest = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pel%C3%A9_goal_1958_WC_final.jpg?width=1800";

  if (archive && !archive.querySelector(`a[href="${peleHref}"]`)) {
    const firstEntry = archive.querySelector(".archive-entry");
    const entry = document.createElement("article");
    entry.className = "archive-entry reveal is-visible";
    entry.dataset.paths = "tuong-dai";
    entry.innerHTML = `<a class="archive-thumb" href="${peleHref}"><img src="${peleThumb}" alt="Pelé trong màu áo Brazil." style="object-position:center 28%" /></a><div class="archive-entry-copy"><p class="article-meta">Brazil · Pelé</p><h2><a href="${peleHref}">The Throne No One Inherited</a></h2><p>Ba World Cup, một danh xưng và chiếc ngai mà bóng đá chưa bao giờ thật sự trao lại cho một người khác.</p></div><a class="archive-arrow" href="${peleHref}" aria-label="Đọc bài The Throne No One Inherited">↗</a>`;
    if (firstEntry) firstEntry.before(entry);
    else archive.append(entry);
  }

  const mainStory = document.querySelector(".home-story-main");
  if (mainStory) {
    mainStory.href = peleHref;
    const image = mainStory.querySelector("img");
    const label = mainStory.querySelector(".home-story-label");
    const title = mainStory.querySelector("h3");
    const deck = mainStory.querySelector(".home-story-main-copy > p:last-child");
    if (image) {
      image.src = peleLatest;
      image.alt = "Pelé ghi bàn trong trận chung kết World Cup 1958.";
      image.style.objectPosition = "center 50%";
    }
    if (label) label.textContent = "Tượng Đài · Brazil · Pelé";
    if (title) title.textContent = "The Throne No One Inherited";
    if (deck) deck.textContent = "Những người vĩ đại tiếp tục xuất hiện. Danh xưng O Rei thì vẫn chưa thật sự thuộc về ai khác.";
  }

  const appendCard = (set, duplicate, story, mode = "append") => {
    if (!set || set.querySelector(`.home-flow-card[href="${story.href}"]`)) return;
    const card = document.createElement("a");
    card.className = "home-flow-card";
    card.href = story.href;
    card.draggable = false;
    if (duplicate) {
      card.setAttribute("aria-hidden", "true");
      card.tabIndex = -1;
    }
    const image = document.createElement("img");
    image.src = story.image;
    image.alt = duplicate ? "" : story.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.draggable = false;
    image.style.objectPosition = story.position || "center";
    image.addEventListener("error", () => {
      image.remove();
      card.classList.add("is-image-missing");
    }, { once:true });
    const copy = document.createElement("span");
    copy.className = "home-flow-copy";
    copy.innerHTML = `<span class="home-flow-meta">${story.label}</span><strong>${story.title}</strong>`;
    card.append(image, copy);
    if (mode === "prepend") set.prepend(card);
    else set.append(card);
  };

  const gallerySets = document.querySelectorAll(".home-flow-set");
  if (gallerySets.length >= 2) {
    appendCard(gallerySets[0], false, { href:dreamHref, image:dreamThumb, alt:"Reiss Nelson thời trẻ trong màu áo Arsenal.", position:"center 24%", label:"Hy Vọng · Arsenal 2022/23", title:"When We Were Allowed to Dream Again" });
    appendCard(gallerySets[1], true, { href:dreamHref, image:dreamThumb, alt:"", position:"center 24%", label:"Hy Vọng · Arsenal 2022/23", title:"When We Were Allowed to Dream Again" });
    appendCard(gallerySets[0], false, { href:robbenHref, image:robbenThumb, alt:"Arjen Robben cùng Hà Lan trước chung kết World Cup 2010.", position:"88% 66%", label:"Chưa Nguôi · Arjen Robben", title:"Between Him and History" }, "prepend");
    appendCard(gallerySets[1], true, { href:robbenHref, image:robbenThumb, alt:"", position:"88% 66%", label:"Chưa Nguôi · Arjen Robben", title:"Between Him and History" }, "prepend");
    appendCard(gallerySets[0], false, { href:peleHref, image:peleThumb, alt:"Pelé trong màu áo Brazil.", position:"center 28%", label:"Tượng Đài · Pelé", title:"The Throne No One Inherited" }, "prepend");
    appendCard(gallerySets[1], true, { href:peleHref, image:peleThumb, alt:"", position:"center 28%", label:"Tượng Đài · Pelé", title:"The Throne No One Inherited" }, "prepend");
  }

  applyHomePathCards();
  applyPreviewLabels();
  applyArchiveTaxonomy();

  requestAnimationFrame(() => {
    applyHomePathCards();
    applyPreviewLabels();
    applyArchiveTaxonomy();
  });
})();
