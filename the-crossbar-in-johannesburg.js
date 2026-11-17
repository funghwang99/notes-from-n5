/* Gyan's real match clip replaces the illustrative goal animation. */
(() => {
  const video = document.querySelector('.cj-penalty-video');
  const replay = document.querySelector('[data-replay]');
  if (!video) return;
  replay?.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    const playing = video.play();
    if (playing?.catch) playing.catch(() => video.focus());
  });
})();
