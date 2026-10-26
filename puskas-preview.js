(() => {
  if (window.__N5_PUSKAS_PREVIEW__) return;
  window.__N5_PUSKAS_PREVIEW__ = true;

  const BAGGIO_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Roberto_Baggio_-_Italia_%2790.jpg';

  const setImage = (href, src, alt, position) => {
    const image = document.querySelector(`.archive#archive a[href="${href}"] img`);
    if (!image) return;
    image.src = src;
    image.alt = alt;
    image.style.objectPosition = position;
  };

  const run = () => {
    const archive = document.querySelector('.archive#archive');
    if (!archive) return;

    setImage(
      'szaguldo-ornagy.html',
      'https://commons.wikimedia.org/wiki/Special:Redirect/file/Puskas%20Hidegkuti%201954.png?width=1200',
      'Ferenc Puskás cùng Nándor Hidegkuti năm 1954.',
      'center center'
    );
    setImage(
      'the-second-revolution.html',
      'https://images.weserv.nl/?url=www.planetworldcup.com/CUPS/1994/wc94_012.jpg&w=1200&h=800&fit=cover&output=webp',
      'Gheorghe Hagi giữa các cầu thủ Argentina tại World Cup 1994.',
      'center 44%'
    );
    setImage(
      'the-second-arrow.html',
      BAGGIO_IMAGE,
      'Roberto Baggio trong màu áo Italy năm 1990.',
      'center 42%'
    );
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
