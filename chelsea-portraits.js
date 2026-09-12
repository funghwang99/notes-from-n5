(() => {
  const page = document.querySelector('.study-chelsea-2026');
  if (!page || page.dataset.n5ChelseaPortraits) return;
  page.dataset.n5ChelseaPortraits = '1';

  const commons = (file) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=240`;

  const portraits = {
    'Saka': commons('Bukayo Saka England v Panama 27 June 26-108.jpg'),
    'White': commons('Benjamin White.jpg'),
    'Ødegaard': commons('Martin Ødegaard.JPG'),
    'Rice': commons('Declan Rice.jpg'),
    'Havertz': commons('1 kai havertz 2026 (cropped).jpg'),
    'Calafiori': commons('1 Riccardo Calafiori 2026.jpg'),
    'Martinelli': commons('Gabriel Martinelli Brazil V Morocco 13 June 2026-144.jpg'),
    'Palmer': commons('Cole Palmer.jpg'),
    'James': commons('Reece James 2021.jpg'),
    'Lavia': commons('Roméo Lavia 20042025 (1) cropped.jpg'),
    'Neto': commons('Pedro Neto USMNT v Portugal Mar 31 2026-48 (cropped).jpg')
  };

  const style = document.createElement('style');
  style.textContent = `
    .study-chelsea-2026 .td-player-disc.has-portrait::before{display:none!important}
    .study-chelsea-2026 .td-player-disc.has-portrait span{display:none!important}
    .study-chelsea-2026 .td-player-disc.has-portrait{background:#20242a!important;overflow:hidden!important}
    .study-chelsea-2026 .td-player-disc.has-portrait img{position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:50% 18%;transform:scale(1.1);filter:saturate(.96) contrast(1.04)}
    .study-chelsea-2026 .td-player.is-arsenal .td-player-disc.has-portrait{box-shadow:0 6px 10px rgba(0,0,0,.58),0 0 0 2px rgba(255,255,255,.95),0 0 0 6px #e31937!important}
    .study-chelsea-2026 .td-player.is-chelsea .td-player-disc.has-portrait{box-shadow:0 6px 10px rgba(0,0,0,.58),0 0 0 2px rgba(255,255,255,.95),0 0 0 6px #1c4ed8!important}
    .study-chelsea-2026 .td-player.is-highlight .td-player-disc.has-portrait{box-shadow:0 6px 10px rgba(0,0,0,.58),0 0 0 2px #fff,0 0 0 6px var(--team),0 0 28px rgba(216,189,103,.52)!important}
    @media(max-width:720px){.study-chelsea-2026 .td-player-disc.has-portrait img{transform:scale(1.12)}}
  `;
  document.head.append(style);

  const apply = () => {
    let changed = 0;
    page.querySelectorAll('.td-player').forEach((player) => {
      if (player.dataset.portraitApplied) return;
      const name = player.querySelector('.td-player-name')?.textContent?.trim();
      const src = portraits[name];
      if (!src) return;

      const disc = player.querySelector('.td-player-disc');
      if (!disc) return;

      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener('load', () => {
        disc.classList.add('has-portrait');
      }, { once:true });
      img.addEventListener('error', () => {
        img.remove();
        disc.classList.remove('has-portrait');
      }, { once:true });

      disc.prepend(img);
      player.dataset.portraitApplied = '1';
      changed += 1;
    });
    return changed;
  };

  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(page, { childList:true, subtree:true });
    setTimeout(() => observer.disconnect(), 8000);
  }
})();
