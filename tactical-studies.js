(() => {
  const page = document.querySelector('.tactical-study');
  if (!page) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rail = document.querySelector('[data-td-progress]');
  const updateProgress = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(100, Math.max(0, scrollY / max * 100))}%`;
  };
  updateProgress();
  addEventListener('scroll', updateProgress, {passive:true});
  addEventListener('resize', updateProgress, {passive:true});

  const activateTabs = (root, selector, attr, onChange) => {
    if (!root) return;
    const buttons = [...root.querySelectorAll(selector)];
    buttons.forEach((button) => button.addEventListener('click', () => {
      const value = button.dataset.tdValue;
      root.setAttribute(attr, value);
      buttons.forEach((item) => item.classList.toggle('is-active', item === button));
      onChange?.(value, root);
    }));
  };

  const jover = document.querySelector('[data-jover-board]');
  activateTabs(jover?.parentElement, '[data-jover-tab]', 'data-unused', (value) => {
    jover.dataset.routine = value;
    const notes = {
      far:'Dồn quân cột xa, kéo người kèm rồi tấn công khoảng trống trung tâm.',
      screen:'Màn chắn tạo nửa giây chậm trễ — đủ để người đánh đầu chính thoát kèm.',
      second:'Pha đầu chỉ mở cửa. Đội hình đã sẵn để nuốt trái bóng bật ra lần hai.'
    };
    const note = jover.querySelector('[data-board-note]');
    if (note) note.textContent = notes[value];
  });

  const arteta = document.querySelector('[data-arteta-board]');
  activateTabs(arteta?.parentElement, '[data-arteta-tab]', 'data-unused', (value) => {
    arteta.dataset.width = value;
    const note = arteta.querySelector('[data-board-note]');
    if (note) note.innerHTML = value === 'wide' ? '<b>WIDE:</b> winger chạm biên, full-back đối thủ bị pin, lane giữa mở.' : '<b>NARROW:</b> sân co lại, đối thủ dễ bảo vệ trung lộ và chuẩn bị phản công.';
  });

  const zubi = document.querySelector('[data-zubi-board]');
  activateTabs(zubi?.parentElement, '[data-zubi-tab]', 'data-unused', (value) => {
    zubi.dataset.rotation = value;
    const note = zubi.querySelector('[data-board-note]');
    if (note) note.innerHTML = value === 'zubi' ? '<b>ZUBI DROP:</b> Zubimendi làm half-back, Rice bước lên lớp cắt pressing.' : '<b>RICE DROP:</b> Rice giữ đáy, Zubimendi tiến lên để điều phối phía sau tuyến pressing.';
  });

  const gyo = document.querySelector('[data-gyo-board]');
  activateTabs(gyo?.parentElement, '[data-gyo-tab]', 'data-unused', (value) => {
    gyo.dataset.scenario = value;
    const notes = {
      mid:'MIDBLOCK · Giữ bóng quay lưng, tạo một cọc nối hai tuyến và buộc trung vệ phải va chạm.',
      low:'LOWBLOCK · Ít phép thuật hơn Jesus, nhưng nhiều sức nặng hơn: chiếm box, chạm là sút.',
      counter:'COUNTER · Zubimendi chọc khe, Gyökeres đâm thẳng, Martinelli chạy xuyên khoảng trống.'
    };
    const note = gyo.querySelector('[data-board-note]');
    if (note) note.textContent = notes[value];
  });

  const merino = document.querySelector('[data-merino-stage]');
  if (merino) {
    const number = merino.querySelector('[data-merino-number]');
    const title = merino.querySelector('[data-merino-title]');
    const jobs = merino.querySelector('[data-merino-jobs]');
    const data = {
      '8': ['8','BOX-TO-BOX','DUEL|ARRIVE|PROGRESS|COVER'],
      '6': ['6','THE SHIELD','SCREEN|RECOVER|OPEN ANGLE|STABILISE'],
      '9': ['9','KAI-LITE','WALL|AERIAL|CHAOS|FINISH']
    };
    activateTabs(merino.parentElement, '[data-merino-tab]', 'data-unused', (value) => {
      const row = data[value];
      if (number) number.textContent = row[0];
      if (title) title.textContent = row[1];
      if (jobs) jobs.innerHTML = row[2].split('|').map((job) => `<li>${job}</li>`).join('');
    });
  }

  const guardImages = () => {
    page.querySelectorAll('img[data-fallback]').forEach((img) => {
      if (img.dataset.guard) return;
      img.dataset.guard = '1';
      img.addEventListener('error', () => {
        if (!img.dataset.triedFallback) {
          img.dataset.triedFallback = '1';
          img.src = img.dataset.fallback;
          return;
        }
        img.closest('figure')?.classList.add('is-image-missing');
        img.remove();
      });
    });
  };
  guardImages();

  if (!reduced && 'IntersectionObserver' in window) {
    const photos = [...document.querySelectorAll('.td-photo, .td-board')];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate([{opacity:.72,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
      observer.unobserve(entry.target);
    }), {threshold:.12});
    photos.forEach((item) => observer.observe(item));
  }
})();
