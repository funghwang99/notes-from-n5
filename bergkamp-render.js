(() => {
  const root = document.querySelector("[data-bergkamp-article]");
  const normalizeText = (value) => String(value ?? "").normalize("NFC").replace(/[\u200B-\u200D\uFEFF]/g, "");
  const text = (window.BERGKAMP_TEXT || []).map(normalizeText);
  if (!root || text.length !== 21) return;

  const paragraph = (value, className = "") => {
    const p = document.createElement("p");
    if (className) p.className = className;
    p.textContent = normalizeText(value);
    return p;
  };

  const label = (number, title) => {
    const box = document.createElement("div");
    box.className = "bergkamp-section-label reveal is-visible";
    const numberEl = document.createElement("span");
    numberEl.textContent = normalizeText(number);
    const titleEl = document.createElement("p");
    titleEl.textContent = normalizeText(title);
    box.append(numberEl, titleEl);
    return box;
  };

  const section = (className, number, title, indexes) => {
    const node = document.createElement("section");
    node.className = `bergkamp-section ${className}`;
    if (number) node.append(label(number, title));
    indexes.forEach((index) => node.append(paragraph(text[index], index === 0 ? "article-lead" : "")));
    return node;
  };

  root.append(section("bergkamp-opening", "", "", [0, 1, 2]));

  const newcastle = section("bergkamp-match", "01", "St James’ Park · 2002", [3]);
  const quote = document.createElement("aside");
  quote.className = "bergkamp-quote reveal is-visible";
  quote.innerHTML = "<span>Quyết định trước cú chạm</span><blockquote>“I’m going to turn him.”</blockquote>";
  newcastle.append(quote, paragraph(text[4]));
  const portrait = document.createElement("figure");
  portrait.className = "bergkamp-figure bergkamp-figure--portrait reveal is-visible";
  portrait.innerHTML = '<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Dennis_Bergkamp.jpg?width=1200" alt="Dennis Bergkamp trong màu áo Arsenal năm 2001." loading="lazy" decoding="async" /><figcaption>Dennis Bergkamp trong màu áo Arsenal, 2001.</figcaption>';
  newcastle.append(portrait);
  root.append(newcastle);

  const marseille = section("bergkamp-three-touches", "02", "Marseille · 1998", [5, 6]);
  const touches = document.createElement("div");
  touches.className = "touch-diagram reveal is-visible";
  touches.innerHTML = '<div><span>01</span><strong>Kéo bóng xuống</strong><p>Không làm mất đà chạy.</p></div><div><span>02</span><strong>Đi qua Ayala</strong><p>Mở sẵn góc dứt điểm.</p></div><div><span>03</span><strong>Má ngoài chân phải</strong><p>Hoàn tất điều hai cú chạm trước đã vẽ ra.</p></div>';
  marseille.append(touches);
  root.append(marseille);

  const method = section("bergkamp-method", "03", "Phần suy nghĩ bên trong chuyển động", [7, 8, 9]);
  method.append(paragraph("Có những cầu thủ chuyền bóng tới nơi đồng đội đang đứng. Bergkamp chuyền bóng tới nơi đồng đội sắp trở thành phiên bản nguy hiểm nhất của chính họ.", "bergkamp-line reveal is-visible"));
  root.append(method);

  root.append(section("bergkamp-arsenal", "04", "Nước đi dành cho Arsenal", [10, 11, 12]));
  root.append(section("bergkamp-legacy", "05", "Điều còn ở lại trước khi ta nhận ra", [13, 14, 15, 16]));

  const farewell = section("bergkamp-farewell", "06", "Highbury khép lại", [17, 18, 19]);
  const unveiling = document.createElement("figure");
  unveiling.className = "bergkamp-figure bergkamp-figure--unveiling reveal is-visible";
  unveiling.innerHTML = '<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Dennis_Bergkamp_2014.jpg?width=1400" alt="Dennis Bergkamp tại lễ khánh thành bức tượng bên ngoài Emirates Stadium năm 2014." loading="lazy" decoding="async" /><figcaption>Dennis Bergkamp tại lễ khánh thành bức tượng bên ngoài Emirates, 2014.</figcaption>';
  farewell.append(unveiling);
  root.append(farewell);

  const coda = document.createElement("section");
  coda.className = "bergkamp-section bergkamp-coda";
  coda.append(paragraph(text[20], "bergkamp-final"));
  const checkmate = document.createElement("div");
  checkmate.className = "bergkamp-checkmate reveal is-visible";
  checkmate.setAttribute("aria-hidden", "true");
  checkmate.innerHTML = "<span>The move</span><i></i><strong>before the move.</strong>";
  coda.append(checkmate);
  root.append(coda);

  const notes = document.createElement("footer");
  notes.className = "article-notes";
  notes.innerHTML = '<p>Hình ảnh qua Wikimedia Commons: <a href="https://commons.wikimedia.org/wiki/File:Dennis_Bergkamp_statue.jpg">Ronnie Macdonald</a> (<a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>), <a href="https://commons.wikimedia.org/wiki/File:Dennis_Bergkamp_2014.jpg">Kieran Clarke</a> (<a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>), và <a href="https://commons.wikimedia.org/wiki/File:Dennis_Bergkamp.jpg">Paul &amp; Aline Burland</a> (<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>).</p>';
  root.append(notes);

  window.dispatchEvent(new Event("resize"));
})();
