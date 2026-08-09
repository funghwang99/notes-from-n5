(() => {
  const articleHref = "the-age-we-never-let-him-leave.html";
  const archiveImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/TheoWalcottUnderhill.JPG?width=1200";
  const homeImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Theo_Walcott_vs_Fulham_-_20_April_2013.jpg?width=1600";

  const mainStory = document.querySelector(".home-story-main");
  if (mainStory) {
    mainStory.href = articleHref;
    const image = mainStory.querySelector("img");
    const label = mainStory.querySelector(".home-story-label");
    const title = mainStory.querySelector("h3");
    const deck = mainStory.querySelector(".home-story-main-copy > p:last-child");
    if (image) {
      image.src = homeImage;
      image.alt = "Theo Walcott thi đấu cho Arsenal.";
      image.style.objectPosition = "center 24%";
    }
    if (label) label.textContent = "Tuổi trẻ · Arsenal · Theo Walcott";
    if (title) title.textContent = "The Age We Never Let Him Leave";
    if (deck) deck.textContent = "Một sự nghiệp thật bị giữ mãi dưới cái bóng của cầu thủ mà người ta từng tưởng tượng anh sẽ trở thành.";
  }

  document.querySelectorAll(`.home-flow-card[href="${articleHref}"] img`).forEach((image) => {
    image.src = archiveImage;
    image.alt = "Theo Walcott thời trẻ trong màu áo Arsenal.";
    image.style.objectPosition = "center 20%";
  });

  document.querySelectorAll(`a.archive-thumb[href="${articleHref}"] img`).forEach((image) => {
    image.src = archiveImage;
    image.alt = "Theo Walcott thời trẻ trong màu áo Arsenal.";
    image.style.objectPosition = "center 20%";
  });
})();
