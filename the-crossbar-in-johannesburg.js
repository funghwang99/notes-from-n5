(() => {
  const host=document.querySelector('.cj-penalty-visual');
  const replay=document.querySelector('[data-replay]');
  if (!host) return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const play=()=>{if(reduced)return;host.classList.remove('is-playing');void host.offsetWidth;host.classList.add('is-playing');};
  replay?.addEventListener('click',play);
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){play();observer.disconnect();}},{threshold:.3});
    observer.observe(host);
  } else play();
})();