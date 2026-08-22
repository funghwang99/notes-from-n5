(() => {
  const BAGGIO_ARCHIVE_IMAGE = "https://retrosoccerkits.com/cdn/shop/files/IMG_9105.jpg?v=1683804239&width=1946";

  const apply = () => {
    const image = document.querySelector('.archive#archive a[href="the-second-arrow.html"] img');
    if (!image) return;
    if (image.src !== BAGGIO_ARCHIVE_IMAGE) image.src = BAGGIO_ARCHIVE_IMAGE;
    image.alt = 'Roberto Baggio trong màu áo sân nhà của Italy tại World Cup 1994.';
    image.style.objectPosition = 'center 28%';
  };

  apply();
  queueMicrotask(apply);
  requestAnimationFrame(apply);
  setTimeout(apply, 120);
  setTimeout(apply, 500);
  window.addEventListener('load', apply, { once: true });
})();
