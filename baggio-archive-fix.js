(() => {
  // Keep this compatibility script in sync with the archive and the article.
  const BAGGIO_ARCHIVE_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Roberto_Baggio_-_Italia_%2790.jpg';
  const apply = () => {
    const img = document.querySelector('.archive#archive a[href="the-second-arrow.html"] img');
    if (!img) return;
    if (img.getAttribute('src') !== BAGGIO_ARCHIVE_IMAGE) img.src = BAGGIO_ARCHIVE_IMAGE;
    img.alt = 'Roberto Baggio trong màu áo đội tuyển Italy năm 1990.';
    img.style.objectPosition = 'center 32%';
  };
  apply();
  window.addEventListener('load', apply, { once: true });
})();
