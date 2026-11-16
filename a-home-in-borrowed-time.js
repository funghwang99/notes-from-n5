/* Chapter-linked eight-year progress, with accessible static fallback. */
(() => {
  const marker=document.querySelector('[data-cesc-marker]');
  const progress=document.querySelector('[data-cesc-progress]');
  const label=document.querySelector('[data-cesc-year]');
  const chapters=[...document.querySelectorAll('.cesc-observed[data-cesc-era]')];
  if(!marker||!progress||!label||!chapters.length||!('IntersectionObserver' in window)) return;
  const from=(chapter)=>{
    const i=chapters.indexOf(chapter);
    const pct=Math.max(0,Math.min(100,(i/(chapters.length-1))*100));
    marker.style.left=pct+'%';progress.style.width=pct+'%';label.textContent=chapter.dataset.cescEra;
  };
  const io=new IntersectionObserver((entries)=>{
    const visible=entries.filter(x=>x.isIntersecting);
    if(!visible.length)return;
    visible.sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
    from(visible[0].target);
  },{rootMargin:'-18% 0px -48% 0px',threshold:0});
  chapters.forEach(x=>io.observe(x));
})();
