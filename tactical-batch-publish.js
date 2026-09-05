(() => {
  const VERSION = '20260905-tactical-batch-3';
  const stories = [
    {
      base:'the-jover.html', href:`the-jover.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/2024%20Emirates%20Cup%20-%20Corner%20Kick.jpg?width=1200',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Samir%20Nasri%20Arsenal%20corner%20kick.jpg?width=1100',
      focus:'50% 42%',
      alt:'Declan Rice chuẩn bị thực hiện một quả phạt góc cho Arsenal.',
      meta:'Tactical Dive · Nicolas Jover', title:'The Jover',
      deck:'Khi bóng ngừng lăn, bài vở chiến lược vẫn tiếp tục chuyển động.'
    },
    {
      base:'twenty-metres.html', href:`twenty-metres.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20bukayo%20saka%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mikel%20Arteta%20Arsenal%20Borussia%20Dortmund.jpg?width=1100',
      focus:'50% 0%',
      alt:'Bukayo Saka trong màu áo Arsenal.',
      meta:'Tactical Dive · Mikel Arteta', title:'Twenty Metres',
      deck:'Arteta không muốn cầm bóng cho đẹp. Ông muốn chiếm đúng không gian để cả trận đấu chạy theo ý mình.'
    },
    {
      base:'not-the-next-partey.html', href:`not-the-next-partey.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20Mart%C3%ADn%20Zubimendi%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Spain%20football%20team%20in%202025.jpg?width=1100',
      focus:'50% 0%',
      alt:'Martín Zubimendi trong màu áo Arsenal.',
      meta:'Tactical Dive · Martín Zubimendi', title:'Not the Next Partey',
      deck:'Không phải một Thomas Partey đệ nhị. Là một cách mới để Arsenal dựng lại cái trụ giữa sân.'
    },
    {
      base:'necessary-imperfection.html', href:`necessary-imperfection.html?v=${VERSION}`,
      image:'gyokeres-arrival.webp',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20Viktor%20Gy%C3%B6keres%202026.jpg?width=1100',
      focus:'50% 2%',
      alt:'Viktor Gyökeres trong màu áo Arsenal.',
      meta:'Tactical Dive · Viktor Gyökeres', title:'The Necessary Imperfection',
      deck:'Bóng đá không cần một tiền đạo hoàn hảo. Arsenal cần một tiền đạo phù hợp với những bài toán hiện tại.'
    },
    {
      base:'basque-shield.html', href:`basque-shield.html?v=${VERSION}`,
      image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1%20mikel%20merino%20arsenal%202025%20%28cropped%29.jpg?width=1100',
      fallback:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mikel%20Merino%202018.jpg?width=1100',
      focus:'50% 0%',
      alt:'Mikel Merino trong màu áo Arsenal.',
      meta:'Tactical Dive · Mikel Merino', title:'Basque Shield',
      deck:'Không phải người khiến khán đài bật dậy. Là người lấp khoảng trống để những người khác được tự do.'
    }
  ];
  const PATHS={'hy-vong':'Hy Vọng','tuoi-tre':'Tuổi Trẻ','ngoai-anh-den':'Ngoài Ánh Đèn','tactical-dive':'Tactical Dive','history':'History','chua-nguoi':'Chưa Nguôi','bat-tu':'Bất Tử','tuong-dai':'Tượng Đài'};

  const guard = (img, story) => {
    if (!img || img.dataset.tdBatchGuard) return;
    img.dataset.tdBatchGuard='1';
    img.addEventListener('error', () => {
      if (!img.dataset.tdBatchFallback) {
        img.dataset.tdBatchFallback='1';
        img.src=story.fallback;
        return;
      }
      const link=img.closest('a');
      img.remove();
      link?.classList.add('is-image-missing');
    });
  };

  const syncImage = (img, story, alt = story.alt) => {
    if (!img) return;
    img.src = story.image;
    img.alt = alt;
    img.style.objectPosition = story.focus;
    guard(img, story);
  };

  const refilter = (archive) => {
    const requested=new URLSearchParams(location.search).get('path');
    const active=Object.hasOwn(PATHS,requested)?requested:'all';
    const entries=[...archive.querySelectorAll('.archive-entry[data-paths]')];
    entries.forEach((entry)=>{
      const paths=(entry.dataset.paths||'').split(/\s+/).filter(Boolean);
      entry.hidden=active!=='all'&&!paths.includes(active);
    });
    archive.querySelectorAll('[data-archive-filter]').forEach((filter)=>{
      const current=filter.dataset.archiveFilter===active;
      filter.classList.toggle('is-current',current);
      if(current) filter.setAttribute('aria-current','page');
      else filter.removeAttribute('aria-current');
    });
    const count=archive.querySelector('[data-archive-count]');
    const status=archive.querySelector('[data-archive-status]');
    if(count) count.textContent=`${entries.filter((entry)=>!entry.hidden).length} bài viết`;
    if(status) status.textContent=active==='all'?'Đã xuất bản':`Mạch ${PATHS[active]}`;
  };

  const applyArchive = () => {
    const archive=document.querySelector('.archive#archive');
    if(!archive) return;

    stories.slice().reverse().forEach((story)=>{
      let entry=archive.querySelector(`.archive-entry a[href^="${story.base}"]`)?.closest('.archive-entry');
      if(!entry){
        entry=document.createElement('article');
        entry.className='archive-entry reveal is-visible';
        entry.innerHTML=`<a class="archive-thumb" href="${story.href}"><img src="${story.image}" alt="${story.alt}" style="object-position:${story.focus}" /></a><div class="archive-entry-copy"><p class="article-meta">${story.meta}</p><h2><a href="${story.href}">${story.title}</a></h2><p>${story.deck}</p></div><a class="archive-arrow" href="${story.href}" aria-label="Đọc bài ${story.title}">↗</a>`;
      }
      entry.dataset.paths='tactical-dive';
      entry.querySelectorAll(`a[href^="${story.base}"]`).forEach((a)=>a.href=story.href);
      syncImage(entry.querySelector('img'), story);
      const first=archive.querySelector('.archive-entry');
      if(first!==entry) archive.insertBefore(entry,first);
    });

    refilter(archive);
  };

  const applyHome = () => {
    document.querySelectorAll('.home-flow-set').forEach((set)=>{
      const duplicate=set.getAttribute('aria-hidden')==='true';
      stories.slice().reverse().forEach((story)=>{
        let card=set.querySelector(`a[href^="${story.base}"]`);
        if(!card){
          card=document.createElement('a');
          card.className='home-flow-card';
          card.draggable=false;
          if(duplicate){
            card.setAttribute('aria-hidden','true');
            card.tabIndex=-1;
          }
          card.innerHTML=`<img src="${story.image}" alt="${duplicate?'':story.alt}" decoding="async" loading="lazy" draggable="false" style="object-position:${story.focus}" /><span class="home-flow-copy"><span class="home-flow-meta">${story.meta}</span><strong>${story.title}</strong></span>`;
        }
        card.href=story.href;
        syncImage(card.querySelector('img'), story, duplicate ? '' : story.alt);
        const first=set.querySelector('.home-flow-card');
        if(first!==card) set.insertBefore(card,first);
      });
    });
  };

  const apply=()=>{
    applyArchive();
    applyHome();
  };

  apply();
  requestAnimationFrame(apply);
  window.addEventListener('load',apply,{once:true});
})();
