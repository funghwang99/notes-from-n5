(() => {
  // Keep the corrected Walcott preview imagery.
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

  // Publish the newest Hy vọng essay across archive, latest slot and gallery.
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

    const paths = {"hy-vong":"Hy vọng","tuoi-tre":"Tuổi trẻ","mat-mat":"Mất mát","ngoai-anh-den":"Ngoài ánh đèn","di-san":"Di sản","bat-tu":"Bất tử"};
    const requestedPath = new URLSearchParams(window.location.search).get("path");
    const activePath = Object.hasOwn(paths, requestedPath) ? requestedPath : "all";
    const entries = Array.from(document.querySelectorAll(".archive-entry[data-paths]"));
    entries.forEach((item) => {
      const itemPaths = item.dataset.paths.split(/\s+/).filter(Boolean);
      item.hidden = activePath !== "all" && !itemPaths.includes(activePath);
    });
    const visible = entries.filter((item) => !item.hidden).length;
    const count = document.querySelector("[data-archive-count]");
    const status = document.querySelector("[data-archive-status]");
    if (count) count.textContent = `${visible} bài viết`;
    if (status) status.textContent = activePath === "all" ? "Đã xuất bản" : `Mạch ${paths[activePath]}`;
  }

  const mainStory = document.querySelector(".home-story-main");
  if (mainStory) {
    mainStory.href = dreamHref;
    const image = mainStory.querySelector("img");
    const label = mainStory.querySelector(".home-story-label");
    const title = mainStory.querySelector("h3");
    const deck = mainStory.querySelector(".home-story-main-copy > p:last-child");
    if (image) {
      image.src = dreamImage;
      image.alt = "Reiss Nelson trong màu áo Arsenal.";
      image.style.objectPosition = "center 28%";
    }
    if (label) label.textContent = "Hy vọng · Arsenal · 2022/23";
    if (title) title.textContent = "When We Were Allowed to Dream Again";
    if (deck) deck.textContent = "Mùa giải chiếc cúp chưa trở lại, nhưng giấc mơ đã về nhà trước nó.";
  }

  const appendDreamCard = (set, duplicate) => {
    if (!set || set.querySelector(`.home-flow-card[href="${dreamHref}"]`)) return;
    const card = document.createElement("a");
    card.className = "home-flow-card";
    card.href = dreamHref;
    card.draggable = false;
    if (duplicate) {
      card.setAttribute("aria-hidden", "true");
      card.tabIndex = -1;
    }
    const image = document.createElement("img");
    image.src = dreamThumb;
    image.alt = duplicate ? "" : "Reiss Nelson thời trẻ trong màu áo Arsenal.";
    image.loading = "lazy";
    image.decoding = "async";
    image.draggable = false;
    image.style.objectPosition = "center 24%";
    image.addEventListener("error", () => {
      image.remove();
      card.classList.add("is-image-missing");
    }, { once:true });
    const copy = document.createElement("span");
    copy.className = "home-flow-copy";
    copy.innerHTML = `<span class="home-flow-meta">Hy vọng · Arsenal 2022/23</span><strong>When We Were Allowed to Dream Again</strong>`;
    card.append(image, copy);
    set.append(card);
  };

  const gallerySets = document.querySelectorAll(".home-flow-set");
  if (gallerySets.length >= 2) {
    appendDreamCard(gallerySets[0], false);
    appendDreamCard(gallerySets[1], true);
  }
})();
