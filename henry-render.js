(() => {
  const mount = document.querySelector("#henry-essay");
  const paras = window.HENRY_PARAS || [];
  if (!mount || !paras.length) return;

  const hero = "https://upload.wikimedia.org/wikipedia/commons/b/b5/Thierry_Henry_Statue_2.jpg";
  const highbury = "https://upload.wikimedia.org/wikipedia/commons/c/cc/The_last_ever_game_at_Highbury.jpg";
  const henry = "https://upload.wikimedia.org/wikipedia/commons/6/66/Henry_And_Persie_Bonding_%28289633666%29.jpg";

  const large = new Set([11,12,14,15,16,21,22,33,34,36,37,40,41,43,44,45,47,48,49]);
  const short = new Set([2,3,5,7,11,12,14,15,16,18,19,21,22,33,34,36,37,40,41,43,44,45,47,48,49]);
  const breaks = new Map([[9,"henry-return"],[24,"henry-kingdom"],[30,"henry-farewell"],[38,"henry-two-bodies"]]);

  const makeFigure = (src, alt, caption, cls) => {
    const figure = document.createElement("figure");
    figure.className = `henry-figure ${cls} reveal`;
    figure.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy" decoding="async"><figcaption>${caption}</figcaption>`;
    return figure;
  };

  let section = document.createElement("section");
  section.className = "henry-section henry-opening";
  mount.append(section);

  paras.forEach((text, index) => {
    if (breaks.has(index)) {
      section = document.createElement("section");
      section.className = `henry-section ${breaks.get(index)}`;
      mount.append(section);
      if (index === 24) {
        const crown = document.createElement("aside");
        crown.className = "henry-crown reveal";
        crown.innerHTML = "<span>THE CROWN</span><blockquote>Chiếc vương miện chưa bao giờ chỉ nằm trên đầu anh.</blockquote>";
        section.append(crown);
      }
    }

    if (index === 17) section.append(makeFigure(
      henry,
      "Thierry Henry và Robin van Persie trong màu áo Arsenal tại Highbury năm 2006.",
      "Thierry Henry tại Arsenal, 2006. Ảnh: Ronnie Macdonald / Wikimedia Commons, CC BY 2.0.",
      "henry-figure--wide"
    ));

    if (index === 30) section.append(makeFigure(
      highbury,
      "Highbury trong trận đấu cuối cùng của Arsenal tại sân vận động ngày 7 tháng 5 năm 2006.",
      "Trận đấu cuối cùng tại Highbury, 7.5.2006. Ảnh: Mark Hammond / Wikimedia Commons, CC BY 2.0.",
      "henry-figure--highbury"
    ));

    if (index === 40) section.append(makeFigure(
      hero,
      "Bức tượng Thierry Henry bên ngoài Emirates Stadium.",
      "Bức tượng Thierry Henry bên ngoài Emirates. Ảnh: Ronnie Macdonald / Wikimedia Commons, CC BY 2.0.",
      "henry-figure--statue"
    ));

    const p = document.createElement("p");
    p.textContent = text;
    if (index === 0) p.className = "article-lead";
    else if (large.has(index)) p.className = "henry-line henry-line--large";
    else if (short.has(index)) p.className = "henry-line";
    section.append(p);
  });
})();