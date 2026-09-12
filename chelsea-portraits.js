(() => {
  const page = document.querySelector('.study-chelsea-2026');
  if (!page || page.dataset.n5ChelseaPortraitsV2) return;
  page.dataset.n5ChelseaPortraitsV2 = '1';

  const commons = (file, width = 420) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=${width}`;
  const real = (file, pos = '50% 18%', scale = 1.58) => ({ src: commons(file), pos, scale, real: true });

  const portraits = {
    'Saka': real('Bukayo Saka England v Panama 27 June 26-108.jpg', '50% 13%', 1.72),
    'White': real('Benjamin White.jpg', '50% 16%', 1.62),
    'Ødegaard': real('Martin Ødegaard.JPG', '50% 15%', 1.68),
    'Rice': real('Declan Rice.jpg', '50% 14%', 1.67),
    'Havertz': real('1 kai havertz 2026 (cropped).jpg', '50% 14%', 1.58),
    'Calafiori': real('1 Riccardo Calafiori 2026.jpg', '50% 13%', 1.64),
    'Martinelli': real('Gabriel Martinelli Brazil V Morocco 13 June 2026-144.jpg', '50% 12%', 1.74),
    'Palmer': real('COLE PALMER.jpg', '50% 14%', 1.62),
    'James': real('Reece James England v Ghana 23 June 2026-248 (cropped).jpg', '50% 14%', 1.58),
    'Lavia': real('Roméo Lavia 20042025 (1) cropped.jpg', '50% 13%', 1.5),
    'Neto': real('Pedro Neto USMNT v Portugal Mar 31 2026-48 (cropped).jpg', '50% 13%', 1.62),
    'João Pedro': real('João Pedro, 2025 FIFA Club World Cup final (54654843615).jpg', '50% 12%', 1.42),
    'Rogers': real('St. Louis City vs Aston Villa (Jul 2025) 18 (cropped).jpg', '50% 15%', 1.55)
  };

  const avatar = (team, seed = '') => {
    const arsenal = team === 'arsenal';
    const accent = arsenal ? '#e31937' : team === 'chelsea' ? '#1c4ed8' : '#596574';
    const bg = arsenal ? '#43131a' : team === 'chelsea' ? '#10265d' : '#252d36';
    const hair = arsenal ? '#221714' : '#171a22';
    const skin = ['#d9a67e','#c58d68','#a96f50','#e0b18e'][Math.abs([...seed].reduce((a,c)=>a+c.charCodeAt(0),0)) % 4];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="g"><stop offset="0" stop-color="${accent}" stop-opacity=".34"/><stop offset="1" stop-color="${bg}"/></radialGradient></defs><rect width="100" height="100" fill="url(#g)"/><ellipse cx="50" cy="40" rx="23" ry="27" fill="${skin}"/><path d="M28 35c2-17 13-26 23-26 13 0 23 10 23 27-8-7-16-10-25-10-7 0-14 3-21 9Z" fill="${hair}"/><circle cx="42" cy="41" r="2.3" fill="#242424"/><circle cx="58" cy="41" r="2.3" fill="#242424"/><path d="M43 54c5 4 10 4 15 0" fill="none" stroke="#7c4d3d" stroke-width="2" stroke-linecap="round"/><path d="M16 100c4-26 17-39 34-39s30 13 34 39" fill="${accent}"/><path d="M39 64h22l-3 15H42z" fill="#f3f4f6" opacity=".82"/></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const style = document.createElement('style');
  style.textContent = `
    .study-chelsea-2026 .td-player-disc.has-portrait::before{display:none!important}
    .study-chelsea-2026 .td-player-disc.has-portrait span{display:none!important}
    .study-chelsea-2026 .td-player-disc.has-portrait{background:#20242a!important;overflow:hidden!important}
    .study-chelsea-2026 .td-player-disc.has-portrait img{position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;object-position:var(--portrait-pos,50% 16%);transform:scale(var(--portrait-scale,1.58));transform-origin:center 28%;filter:saturate(.98) contrast(1.06) brightness(1.02)}
    .study-chelsea-2026 .td-player-disc.has-avatar img{transform:scale(1.03)!important;object-position:50% 50%!important;filter:none!important}
    .study-chelsea-2026 .td-player.is-arsenal .td-player-disc.has-portrait{box-shadow:0 7px 12px rgba(0,0,0,.62),0 0 0 2px rgba(255,255,255,.98),0 0 0 6px #e31937!important}
    .study-chelsea-2026 .td-player.is-chelsea .td-player-disc.has-portrait{box-shadow:0 7px 12px rgba(0,0,0,.62),0 0 0 2px rgba(255,255,255,.98),0 0 0 6px #1c4ed8!important}
    .study-chelsea-2026 .td-player.is-neutral .td-player-disc.has-portrait{box-shadow:0 7px 12px rgba(0,0,0,.62),0 0 0 2px rgba(255,255,255,.94),0 0 0 6px #687483!important}
    .study-chelsea-2026 .td-player.is-highlight .td-player-disc.has-portrait{box-shadow:0 7px 12px rgba(0,0,0,.62),0 0 0 2px #fff,0 0 0 6px var(--team),0 0 30px rgba(216,189,103,.56)!important}
    .study-chelsea-2026 .td-player-name{background:rgba(0,0,0,.58)!important;backdrop-filter:blur(2px)}
    @media(max-width:720px){.study-chelsea-2026 .td-player-disc.has-portrait img{transform:scale(calc(var(--portrait-scale,1.58) * 1.03))}}
  `;
  document.head.append(style);

  const applyPortrait = (player) => {
    if (player.dataset.portraitAppliedV2) return false;
    const name = player.querySelector('.td-player-name')?.textContent?.trim() || '';
    const disc = player.querySelector('.td-player-disc');
    if (!disc) return false;

    const team = player.classList.contains('is-arsenal') ? 'arsenal' : player.classList.contains('is-chelsea') ? 'chelsea' : 'neutral';
    const entry = portraits[name];
    const fallback = avatar(team, name || team);
    const img = document.createElement('img');
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';

    const show = (src, pos = '50% 50%', scale = 1.03, isAvatar = false) => {
      disc.style.setProperty('--portrait-pos', pos);
      disc.style.setProperty('--portrait-scale', scale);
      img.src = src;
      if (isAvatar) disc.classList.add('has-avatar');
      else disc.classList.remove('has-avatar');
    };

    img.addEventListener('load', () => disc.classList.add('has-portrait'));
    img.addEventListener('error', () => {
      if (img.dataset.fellBack) return;
      img.dataset.fellBack = '1';
      show(fallback, '50% 50%', 1.03, true);
      disc.classList.add('has-portrait');
    });

    disc.prepend(img);
    if (entry) show(entry.src, entry.pos, entry.scale, false);
    else show(fallback, '50% 50%', 1.03, true);
    player.dataset.portraitAppliedV2 = '1';
    return true;
  };

  const apply = () => {
    let changed = 0;
    page.querySelectorAll('.td-player').forEach((player) => {
      if (applyPortrait(player)) changed += 1;
    });
    return changed;
  };

  apply();
  const observer = new MutationObserver(apply);
  observer.observe(page, { childList:true, subtree:true });
  setTimeout(() => observer.disconnect(), 10000);
})();
