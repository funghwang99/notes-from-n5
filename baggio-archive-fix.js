(() => {
  const BAGGIO_ARCHIVE_IMAGE = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Roberto_Baggio_-_Italia_%2790.jpg?width=1000";

  const apply = () => {
    const image = document.querySelector('.archive#archive a[href="the-second-arrow.html"] img');
    if (!image) return;
    if (image.src !== BAGGIO_ARCHIVE_IMAGE) image.src = BAGGIO_ARCHIVE_IMAGE;
    image.alt = 'Roberto Baggio trong màu áo Italy trước World Cup 1990.';
    image.style.objectPosition = 'center 24%';
  };

  apply();
  queueMicrotask(apply);
  requestAnimationFrame(apply);
  setTimeout(apply, 120);
  setTimeout(apply, 500);
  window.addEventListener('load', apply, { once: true });
})();
