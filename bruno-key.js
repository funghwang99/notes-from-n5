(() => {
  const page = document.querySelector('.bruno-page');
  if (!page) return;

  const author = document.querySelector('.article-byline span:first-child');
  if (author) author.textContent = 'Chuyện Nhà Chú';
  const taxonomy = document.querySelector('.bruno-hero .eyebrow');
  if (taxonomy) taxonomy.textContent = 'Tactical Dive · Bruno Guimarães';

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rail = document.querySelector('[data-bruno-rail]');
  const updateRail = () => {
    if (!rail) return;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    rail.style.height = `${Math.min(100, Math.max(0, (scrollY / max) * 100))}%`;
  };
  updateRail();
  addEventListener('scroll', updateRail, { passive:true });
  addEventListener('resize', updateRail, { passive:true });

  const scenes = [...document.querySelectorAll('[data-bruno-scene]')];
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) root.dataset.brunoScene = active.target.dataset.brunoScene || '';
    }, { rootMargin:'-23% 0px -48%', threshold:[.12,.35,.62] });
    scenes.forEach((section) => sceneObserver.observe(section));
  }

  const hero = document.querySelector('.bruno-hero');
  const heroImg = hero?.querySelector('.bruno-hero-photo img');
  if (hero) requestAnimationFrame(() => hero.classList.add('is-turned'));
  if (hero && heroImg && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroImg.style.transform = `scale(1.045) translate(${x * -7}px,${y * -5}px)`;
    });
    hero.addEventListener('pointerleave', () => { heroImg.style.transform = 'scale(1.02)'; });
  }

  if (heroImg) {
    const figure = heroImg.closest('figure');
    const caption = figure?.querySelector('figcaption');
    const fallback = () => {
      if (heroImg.dataset.fallbackUsed) {
        if (figure) figure.classList.add('is-image-missing');
        heroImg.remove();
        if (caption) caption.textContent = 'Bruno Guimarães · tactical portrait';
        return;
      }
      heroImg.dataset.fallbackUsed = '1';
      heroImg.src = heroImg.dataset.fallbackSrc || '';
      heroImg.alt = 'Bruno Guimarães trong một buổi khởi động trước trận đấu năm 2026.';
      if (caption) caption.textContent = 'Bruno Guimarães · 2026 · Wikimedia Commons';
    };
    heroImg.addEventListener('error', fallback);
    if (heroImg.complete && heroImg.naturalWidth === 0) queueMicrotask(fallback);
  }

  const house = document.querySelector('.bruno-house');
  if (house) {
    const rooms = [...house.querySelectorAll('.bruno-room')];
    const lightRooms = () => rooms.forEach((room, index) => setTimeout(() => room.classList.add('is-lit'), reduced ? 0 : index * 180));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        lightRooms(); observer.disconnect();
      }, { threshold:.38 });
      observer.observe(house);
    } else lightRooms();
  }

  const orbit = document.querySelector('[data-bruno-orbit]');
  if (orbit) {
    const activate = () => orbit.classList.add('is-live');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        activate(); observer.disconnect();
      }, { threshold:.45 });
      observer.observe(orbit);
    } else activate();
  }

  const engine = document.querySelector('[data-bruno-engine]');
  if (engine) {
    const rice = engine.querySelector('[data-engine-state="rice"]');
    const bruno = engine.querySelector('[data-engine-state="bruno"]');
    const runEngine = () => {
      if (reduced) return;
      let swapped = false;
      const tick = () => {
        if (!document.body.contains(engine)) return;
        swapped = !swapped;
        engine.classList.toggle('is-swapped', swapped);
        if (rice) rice.textContent = swapped ? 'GO' : 'HOLD';
        if (bruno) bruno.textContent = swapped ? 'HOLD' : 'GO';
      };
      tick();
      const id = setInterval(tick, 1700);
      const stop = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) return;
        clearInterval(id); stop.disconnect();
      }, { rootMargin:'120% 0px' });
      stop.observe(engine);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        runEngine(); observer.disconnect();
      }, { threshold:.45 });
      observer.observe(engine);
    }
  }

  /* Tactical board v3: the phase-one signature is a 3-1-6 with Rice/Bruno rotating the single-pivot responsibility. */
  const shapes = document.querySelector('[data-bruno-shapes]');
  if (shapes) {
    const pitch = shapes.querySelector('.bruno-pitch');
    const stateLabel = shapes.querySelector('[data-shape-label]');
    const topState = shapes.querySelector('[data-shape-counter]') || shapes.querySelector('.bruno-shape-top span:last-child');
    const note = shapes.querySelector('[data-shape-note]');
    const buttons = [...shapes.querySelectorAll('[data-shape-trigger]')];
    const players = Object.fromEntries(
      [...shapes.querySelectorAll('[data-player]')].map((player) => [player.dataset.player, player])
    );

    const introParagraph = document.querySelector('.bruno-shapes .bruno-copy p:first-child');
    if (introParagraph) {
      introParagraph.textContent = 'Điểm quan trọng ở đây không phải Arsenal có năm sơ đồ khác nhau, mà là cùng một đội hình có thể đi qua nhiều trạng thái khác nhau trong cùng một chuỗi bóng. Ở phase một, Gabriel, Saliba và Timber tạo hàng ba phía sau, còn trước họ chỉ cần một điểm tựa. Rice có thể giữ đáy để Bruno bước lên thành người thứ sáu ở tuyến cao; ở nhịp kế tiếp Bruno có thể lùi xuống và Rice là người tiến lên. Cấu trúc vẫn là 3-1-6, nhưng người giữ số 1 không cố định. Chính khả năng đổi vai này mới là thứ Bruno thêm vào: Arsenal không cần kéo Ødegaard xuống phase một như một mặc định chỉ để duy trì thêm một điểm nối.';
    }

    if (buttons[1]) buttons[1].innerHTML = 'PHASE 1<span>3—1—6 ROTATION</span>';

    let rotationCue = pitch?.querySelector('.bruno-db-rotation-cue');
    if (pitch && !rotationCue) {
      rotationCue = document.createElement('div');
      rotationCue.className = 'bruno-db-rotation-cue';
      rotationCue.setAttribute('aria-hidden','true');
      rotationCue.innerHTML = '<span data-rotation-hold>41 HOLD</span><i>⇄</i><span data-rotation-go>39 GO</span>';
      pitch.append(rotationCue);
    }

    const states = [
      {
        key:'base',
        label:'STARTING XI · 4—3—3',
        note:'33 Calafiori · 6 Gabriel · 2 Saliba · 12 Timber / 39 Bruno · 41 Rice · 8 Ødegaard / 10 Eze · 29 Havertz · 7 Saka.',
        positions:{
          calafiori:[16,78], gabriel:[38,80], saliba:[62,80], timber:[84,78],
          bruno:[42,57], rice:[53,62], odegaard:[66,45],
          eze:[18,29], havertz:[50,21], saka:[82,29]
        }
      },
      {
        key:'rotation',
        label:'PHASE 1 · 3—1—6 ROTATION',
        note:'Rice holds, Bruno goes. Then they swap: Bruno holds, Rice goes. The single pivot changes; the 3-1-6 does not. Ødegaard stays high on the right rather than being dragged into phase one by default.',
        positions:{
          calafiori:[10,31], gabriel:[30,81], saliba:[50,83], timber:[70,81],
          bruno:[40,41], rice:[50,63], odegaard:[67,35],
          eze:[28,34], havertz:[50,19], saka:[88,30]
        },
        rotation:{
          a:{bruno:[40,41], rice:[50,63]},
          b:{bruno:[50,63], rice:[40,41]}
        }
      },
      {
        key:'box',
        label:'MIDFIELD BOX · FOUR INSIDE',
        note:'Eze tucks in from the left while Calafiori owns the touchline. Bruno and Rice form the lower pair; Eze and Ødegaard sit above them: a true four-man central box, not a left-side overload.',
        positions:{
          calafiori:[10,30], gabriel:[30,80], saliba:[50,82], timber:[70,80],
          bruno:[42,56], rice:[58,56], odegaard:[60,39],
          eze:[40,39], havertz:[50,19], saka:[88,30]
        }
      },
      {
        key:'rest',
        label:'REST DEFENCE · 3+1',
        note:'Three defenders stay behind the attack, with one of Bruno/Rice as the single screen. Here Rice holds; the roles can flip without changing the 3+1 principle.',
        positions:{
          calafiori:[11,30], gabriel:[31,80], saliba:[50,82], timber:[69,80],
          bruno:[43,47], rice:[50,64], odegaard:[62,40],
          eze:[35,34], havertz:[51,21], saka:[86,31]
        }
      },
      {
        key:'press',
        label:'HIGH PRESS · 4—4—2',
        note:'Havertz + Ødegaard lead the first line. Eze–Rice–Bruno–Saka form the four behind them: force the goalkeeper or centre-back long, then let 39 and 41 attack the second ball.',
        positions:{
          calafiori:[16,79], gabriel:[38,81], saliba:[62,81], timber:[84,79],
          eze:[16,54], rice:[39,55], bruno:[61,55], saka:[84,54],
          havertz:[42,28], odegaard:[58,28]
        }
      }
    ];

    let state = 0;
    let autoId = 0;
    let rotationId = 0;
    let rotationSwapped = false;
    let userLocked = false;

    const place = (name, coords) => {
      const player = players[name];
      if (!player || !coords) return;
      player.style.setProperty('--px', `${coords[0]}%`);
      player.style.setProperty('--py', `${coords[1]}%`);
    };

    const stopRotation = () => {
      if (rotationId) clearInterval(rotationId);
      rotationId = 0;
      rotationSwapped = false;
      shapes.classList.remove('is-db-swapped');
    };

    const renderRotationCue = (swapped) => {
      if (!rotationCue) return;
      const hold = rotationCue.querySelector('[data-rotation-hold]');
      const go = rotationCue.querySelector('[data-rotation-go]');
      if (hold) hold.textContent = swapped ? '39 HOLD' : '41 HOLD';
      if (go) go.textContent = swapped ? '41 GO' : '39 GO';
    };

    const startRotation = () => {
      stopRotation();
      const current = states[1];
      const rotate = () => {
        rotationSwapped = !rotationSwapped;
        const pair = rotationSwapped ? current.rotation.b : current.rotation.a;
        place('bruno', pair.bruno);
        place('rice', pair.rice);
        shapes.classList.toggle('is-db-swapped', rotationSwapped);
        renderRotationCue(rotationSwapped);
        if (note) note.textContent = rotationSwapped
          ? 'Bruno holds the single pivot. Rice goes. One drops, one rises — the 3-1-6 stays intact.'
          : 'Rice holds the single pivot. Bruno goes. One drops, one rises — the 3-1-6 stays intact.';
      };
      renderRotationCue(false);
      if (!reduced) rotationId = setInterval(rotate, 1550);
    };

    const setState = (next, fromUser = false) => {
      stopRotation();
      state = (next + states.length) % states.length;
      const current = states[state];
      shapes.dataset.state = String(state);
      shapes.dataset.stateName = current.key;
      if (stateLabel) stateLabel.textContent = current.label;
      if (topState) topState.textContent = `STATE 0${state + 1}/05`;
      if (note) note.textContent = current.note;
      Object.entries(current.positions).forEach(([name, coords]) => place(name, coords));
      buttons.forEach((button,index) => {
        const active = index === state;
        button.classList.toggle('is-current', active);
        button.setAttribute('aria-pressed', String(active));
      });
      if (current.key === 'rotation') startRotation();
      if (fromUser) {
        userLocked = true;
        if (autoId) clearInterval(autoId);
      }
    };

    buttons.forEach((button,index) => {
      button.addEventListener('click', () => setState(index, true));
    });

    setState(0);

    if (!reduced && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (!userLocked) {
          autoId = setInterval(() => {
            if (!userLocked) setState(state + 1);
          }, 5200);
        }
        const off = new IntersectionObserver((watch) => {
          if (watch.some((entry) => entry.isIntersecting)) return;
          if (autoId) clearInterval(autoId);
          stopRotation();
          off.disconnect();
        }, { rootMargin:'70% 0px' });
        off.observe(shapes); observer.disconnect();
      }, { threshold:.42 });
      observer.observe(shapes);
    }
  }

  const leftMap = document.querySelector('[data-bruno-left]');
  const risk = document.querySelector('[data-bruno-risk]');
  const doors = document.querySelector('[data-bruno-doors]');
  const finish = document.querySelector('.bruno-finish');
  const oneShot = (element, className = 'is-live', threshold = .4) => {
    if (!element) return;
    const activate = () => element.classList.add(className);
    if (!('IntersectionObserver' in window)) { activate(); return; }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      activate(); observer.disconnect();
    }, { threshold });
    observer.observe(element);
  };
  oneShot(leftMap, 'is-live', .45);
  oneShot(risk, 'is-live', .4);
  oneShot(doors, 'is-live', .38);
  oneShot(finish, 'is-live', .28);
})();