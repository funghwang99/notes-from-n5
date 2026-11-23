/* The Island He Chose — chapter location, progressive enhancement only. */
(() => {
  const nav = document.querySelector('.rv-index');
  if (!nav) return;
  const anchors = [...nav.querySelectorAll('a[href^="#"]')];
  const stops = anchors.map(anchor => ({
    anchor,
    section: document.getElementById(anchor.getAttribute('href').slice(1))
  })).filter(item => item.section);
  if (!stops.length) return;

  let scheduled = false;
  const refresh = () => {
    scheduled = false;
    const line = Math.max(130, window.innerHeight * .32);
    let active = stops[0];
    for (const item of stops) {
      if (item.section.getBoundingClientRect().top <= line) active = item;
    }
    for (const item of stops) {
      if (item === active) item.anchor.setAttribute('aria-current','location');
      else item.anchor.removeAttribute('aria-current');
    }
  };
  const requestRefresh = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(refresh);
  };
  window.addEventListener('scroll',requestRefresh,{passive:true});
  window.addEventListener('resize',requestRefresh,{passive:true});
  window.addEventListener('hashchange',requestRefresh);
  requestRefresh();
})();
