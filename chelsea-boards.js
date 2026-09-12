(() => {
  const page = document.querySelector('.study-chelsea-2026');
  if (!page) return;

  document.querySelectorAll('.td-match-diagram, .td-board-diagram').forEach((node) => node.remove());
  page.dataset.n5ChelseaBoards = '3';

  const css = document.createElement('style');
  css.textContent = `
    .td-board-diagram{margin:30px auto 0;max-width:900px;opacity:1!important;visibility:visible!important;transform:none!important}
    .td-board-shell{padding:14px;border:1px solid rgba(255,255,255,.10);background:#0d1115;box-shadow:0 20px 52px rgba(0,0,0,.28)}
    .td-board-head{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:0 2px 12px;flex-wrap:wrap}
    .td-board-head strong{display:block;color:#f6f7f8;font:800 clamp(.92rem,1.6vw,1.08rem)/1.25 Inter,sans-serif;letter-spacing:.03em}
    .td-board-head span{color:#98a6b2;font:700 .72rem/1 Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase}
    .td-board-legend{display:flex;gap:12px;align-items:center;color:#98a6b2;font:700 .7rem/1 Inter,sans-serif;text-transform:uppercase;letter-spacing:.08em}
    .td-board-legend i{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:6px;vertical-align:-1px}
    .td-board-legend .a{background:#d83b45}.td-board-legend .c{background:#3278db}
    .td-board-svg{display:block;width:100%;height:auto;background:radial-gradient(circle at 50% 32%,#3e3e3e 0%,#292929 38%,#171717 75%,#101010 100%)}
    .td-board-note{margin:12px 2px 0;color:#c1c9cf;font:500 .95rem/1.62 Inter,sans-serif}
    .td-board-note b{color:#fff}
    .td-board-svg .pitch-line{fill:none;stroke:rgba(255,255,255,.92);stroke-width:2.2}
    .td-board-svg .soft-line{fill:none;stroke:rgba(255,255,255,.32);stroke-width:1.4;stroke-dasharray:8 8}
    .td-board-svg .zone{fill:rgba(229,193,91,.09);stroke:rgba(229,193,91,.58);stroke-width:2.2;stroke-dasharray:10 10}
    .td-board-svg .zone-blue{fill:rgba(75,137,240,.08);stroke:rgba(111,164,255,.42);stroke-width:2;stroke-dasharray:10 10}
    .td-board-svg .route-a,.td-board-svg .route-c,.td-board-svg .route-g{fill:none;stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round}
    .td-board-svg .route-a{stroke:#ef6a72}.td-board-svg .route-c{stroke:#6da5ff}.td-board-svg .route-g{stroke:#e0c65f}
    .td-board-svg .token-ring{fill:#f4f4f4;stroke:#101010;stroke-width:2.2;filter:url(#shadow)}
    .td-board-svg .token-a{fill:#d83b45}.td-board-svg .token-c{fill:#3278db}
    .td-board-svg .token-text{fill:white;font:800 13px/1 Inter,sans-serif;text-anchor:middle;dominant-baseline:middle}
    .td-board-svg .token-name{fill:#f4f5f6;font:700 10px/1 Inter,sans-serif;text-anchor:middle;paint-order:stroke;stroke:#111;stroke-width:3px;stroke-linejoin:round}
    .td-board-svg .zone-label{fill:#f0d77b;font:800 10px/1 Inter,sans-serif;letter-spacing:.11em;text-anchor:middle;paint-order:stroke;stroke:#111;stroke-width:3px}
    .td-board-svg .ball{fill:#fff;stroke:#101010;stroke-width:2;filter:url(#shadow)}
    .td-board-svg .ball-dot{fill:#111}
    @media(max-width:720px){.td-board-shell{padding:8px}.td-board-note{font-size:.88rem}.td-board-head{margin-bottom:8px}.td-board-legend{gap:8px}}
  `;
  document.head.append(css);

  const P = (x,y,team,short,name) => ({x,y,team,short,name});
  const A = (x1,y1,x2,y2,color='a') => ({x1,y1,x2,y2,color});
  const Z = (x,y,w,h,label,kind='gold') => ({x,y,w,h,label,kind});

  const boards = [
    {
      n:'00', title:'Khóa giữa → kéo ra biên → quay vào trong',
      note:'Chelsea đóng trung lộ bằng 5 người. Arsenal đưa bóng sang phải để kéo shape lệch đi, rồi mới tái nhập vào khoảng trống ở giữa.',
      ball:[600,196],
      zones:[Z(282,240,250,170,'CENTRAL LOCK','blue'),Z(548,110,150,275,'RIGHT OVERLOAD'),Z(350,260,112,120,'RE-ENTRY')],
      players:[P(330,228,'c','PA','Palmer'),P(410,208,'c','JP','J. Pedro'),P(490,228,'c','RO','Rogers'),P(348,318,'c','JA','James'),P(472,318,'c','LA','Lavia'),P(636,145,'a','SA','Saka'),P(608,218,'a','BW','White'),P(565,292,'a','ØD','Ødegaard'),P(520,360,'a','RI','Rice'),P(625,340,'a','KA','Havertz')],
      arrows:[A(625,340,610,238),A(636,145,605,260),A(565,292,448,315,'g')]
    },
    {
      n:'01', title:'Chelsea nhường biên, nhưng giữ lõi trung tâm',
      note:'Width tự nó chưa đủ. Chelsea chấp nhận Arsenal có bóng ngoài biên miễn là khối 5 người ở giữa sân vẫn nguyên vẹn.',
      ball:[676,188],
      zones:[Z(270,205,280,210,'CENTRAL SHIELD','blue')],
      players:[P(335,220,'c','PA','Palmer'),P(410,198,'c','JP','J. Pedro'),P(485,220,'c','RO','Rogers'),P(355,310,'c','JA','James'),P(465,310,'c','LA','Lavia'),P(105,185,'a','LW','Left width'),P(680,185,'a','RW','Right width')],
      arrows:[A(666,188,540,220),A(120,185,276,220)]
    },
    {
      n:'02', title:'Right-side overload: 5 Arsenal, 1 hành lang',
      note:'Saka, White, Ødegaard, Rice và Havertz dồn sang phải. Chelsea phải giải quá nhiều reference trong cùng một corridor.',
      ball:[640,180],
      zones:[Z(520,92,190,360,'5v4 OVERLOAD')],
      players:[P(655,130,'a','SA','Saka'),P(622,210,'a','BW','White'),P(575,285,'a','ØD','Ødegaard'),P(525,355,'a','RI','Rice'),P(635,350,'a','KA','Havertz'),P(670,250,'c','WB','Wing-back'),P(620,155,'c','CB','RCB'),P(580,215,'c','JA','James'),P(535,170,'c','RO','Rogers')],
      arrows:[A(525,355,570,295),A(635,350,640,260),A(655,130,642,220)]
    },
    {
      n:'03', title:'5–4–1: kín hơn trên giấy, vẫn hở ở hành lang',
      note:'Palmer và Rogers phải lùi rất xa ra hai cánh. Arsenal vẫn có thể chạy sau lưng họ trước khi Chelsea kịp set lại block.',
      ball:[142,168],
      zones:[Z(120,255,580,135,'CHELSEA 4-MAN MIDFIELD','blue')],
      players:[P(160,318,'c','PA','Palmer'),P(300,318,'c','JA','James'),P(520,318,'c','LA','Lavia'),P(660,318,'c','RO','Rogers'),P(410,225,'c','JP','J. Pedro'),P(126,155,'a','RUN','Runner'),P(694,155,'a','RUN','Runner')],
      arrows:[A(126,155,176,270),A(694,155,644,270)],
      ghost:[A(160,250,220,125,'c'),A(660,250,600,125,'c')]
    },
    {
      n:'04', title:'Overload ngoài biên để mở khoảng trống phía trong',
      note:'Một pivot phải dạt sang cứu cánh phải. Khi James hoặc Lavia rời vị trí, inside lane mới là nơi Arsenal muốn tấn công.',
      ball:[565,270],
      zones:[Z(535,100,155,335,'OVERLOAD'),Z(325,250,132,132,'INSIDE SPACE')],
      players:[P(408,320,'c','LA','Lavia'),P(350,278,'c','JA','James'),P(642,150,'a','SA','Saka'),P(604,225,'a','BW','White'),P(566,300,'a','ØD','Ødegaard'),P(645,365,'a','KA','Havertz')],
      arrows:[A(350,278,548,245,'c'),A(566,300,435,318,'g')]
    },
    {
      n:'05', title:'Kéo pivot bước lên, nhận bóng sau lưng lớp pressing',
      note:'Rice hoặc Lewis-Skelly lùi xuống. Một pivot Chelsea bước theo, và Ødegaard/Calafiori xuất hiện đúng tầng phía sau.',
      ball:[292,438],
      zones:[Z(315,245,225,145,'BETWEEN LINES')],
      players:[P(292,438,'a','RI','Rice'),P(355,355,'c','JA','James'),P(470,322,'c','LA','Lavia'),P(410,280,'a','ØD','Ødegaard'),P(505,265,'a','CA','Calafiori')],
      arrows:[A(292,438,348,365),A(410,280,455,282,'g'),A(505,265,555,210,'g')]
    },
    {
      n:'06', title:'Calafiori kéo Neto vào trong, back five méo hình',
      note:'Calafiori không cần nhận bóng. Chỉ cần anh invert đủ sâu để Neto đi theo, khoảng giữa wing-back và centre-back đã mở.',
      ball:[175,485],
      zones:[Z(95,140,170,360,'OUTSIDE SPACE'),Z(250,235,180,190,'HALF-SPACE')],
      players:[P(175,485,'a','CA','Calafiori'),P(270,355,'c','NE','Neto'),P(145,250,'c','AC','Acheampong'),P(245,238,'c','CB','CB'),P(345,225,'c','CB','CB'),P(445,235,'c','CB','CB')],
      arrows:[A(175,485,315,315),A(270,355,325,312,'c')]
    },
    {
      n:'07', title:'Cái giá của overload: back two và hai hành lang trống',
      note:'Đẩy thêm người lên cao giúp Arsenal ép low block, nhưng khi mất bóng, Rogers, Palmer và Neto có thể chạy thẳng vào hai kênh transition.',
      ball:[420,340],
      zones:[Z(70,120,130,480,'TRANSITION'),Z(620,120,130,480,'TRANSITION')],
      players:[P(320,560,'a','CB','CB'),P(500,560,'a','CB','CB'),P(230,275,'a','SA','Saka'),P(315,305,'a','BW','White'),P(405,325,'a','ØD','Ødegaard'),P(492,305,'a','KA','Havertz'),P(575,275,'a','ML','Left 8'),P(140,165,'c','RO','Rogers'),P(410,160,'c','PA','Palmer'),P(680,165,'c','NE','Neto')],
      arrows:[A(140,165,270,500,'c'),A(410,160,410,505,'c'),A(680,165,550,500,'c')]
    },
    {
      n:'08', title:'Chelsea có bóng: Palmer vào trong, Neto giữ biên',
      note:'Chelsea biến hình khi possession: Palmer bó vào, RCB bước lên half-space, Neto đứng rộng. Arsenal đáp lại bằng 4–4–2 trung block.',
      ball:[535,245],
      zones:[Z(520,80,170,360,'NETO WIDE','blue')],
      players:[P(650,138,'c','NE','Neto'),P(555,255,'c','RCB','RCB'),P(470,220,'c','PA','Palmer'),P(365,285,'c','JA','James'),P(435,335,'c','LA','Lavia'),P(305,250,'a','KA','Havertz'),P(372,230,'a','ØD','Ødegaard'),P(265,375,'a','LM','LM'),P(350,390,'a','CM','CM'),P(445,390,'a','CM','CM'),P(535,375,'a','RM','RM')],
      arrows:[A(555,255,635,160,'c'),A(470,220,405,270,'c')]
    },
    {
      n:'09', title:'Không xóa Palmer khỏi trận — đẩy anh ra xa vùng số 10',
      note:'Palmer vẫn được chạm bóng, nhưng ở vị trí sâu hơn gần James/Lavia. Arsenal đổi nơi anh nhận bóng thay vì cố loại anh hoàn toàn.',
      ball:[410,315],
      zones:[Z(325,120,170,120,'DANGEROUS #10')],
      players:[P(410,175,'c','PA','Palmer'),P(355,330,'c','JA','James'),P(465,330,'c','LA','Lavia'),P(410,255,'a','MK','Marker')],
      arrows:[A(410,175,380,305,'c'),A(410,255,410,200)]
    }
  ];

  const defs = (id) => `
    <defs>
      <filter id="shadow-${id}" x="-80%" y="-80%" width="260%" height="260%"><feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#000" flood-opacity=".62"/></filter>
      <marker id="arr-a-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ef6a72"/></marker>
      <marker id="arr-c-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#6da5ff"/></marker>
      <marker id="arr-g-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#e0c65f"/></marker>
    </defs>`;

  const pitch = `
    <path d="M95 18 L725 18 L785 700 L35 700 Z" class="pitch-line"/>
    <path d="M66 335 L754 335" class="pitch-line"/>
    <circle cx="410" cy="335" r="90" class="pitch-line"/>
    <circle cx="410" cy="335" r="4" fill="#fff"/>
    <path d="M270 700 L270 610 L550 610 L550 700" class="pitch-line"/>
    <path d="M330 700 L330 660 L490 660 L490 700" class="pitch-line"/>
    <path d="M346 610 A72 72 0 0 1 474 610" class="pitch-line"/>
    <circle cx="410" cy="644" r="4" fill="#fff"/>
    <path d="M306 18 L306 76 L514 76 L514 18" class="pitch-line" opacity=".42"/>
    <path d="M355 76 A62 62 0 0 0 465 76" class="pitch-line" opacity=".42"/>`;

  const token = (p,id) => {
    const cls = p.team === 'a' ? 'token-a' : 'token-c';
    return `<g filter="url(#shadow-${id})"><circle cx="${p.x}" cy="${p.y}" r="25" class="token-ring"/><circle cx="${p.x}" cy="${p.y}" r="21" class="${cls}"/><path d="M${p.x-16} ${p.y+9} Q${p.x} ${p.y-8} ${p.x+16} ${p.y+9}" fill="rgba(255,255,255,.16)"/><text x="${p.x}" y="${p.y+1}" class="token-text">${p.short}</text></g><text x="${p.x}" y="${p.y+39}" class="token-name">${p.name}</text>`;
  };

  const ball = ([x,y],id) => `<g filter="url(#shadow-${id})"><circle cx="${x}" cy="${y}" r="12" class="ball"/><circle cx="${x}" cy="${y}" r="3.3" class="ball-dot"/><circle cx="${x-6}" cy="${y+4}" r="2.2" class="ball-dot"/><circle cx="${x+6}" cy="${y+4}" r="2.2" class="ball-dot"/></g>`;
  const zone = (z) => `<rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="24" class="${z.kind==='blue'?'zone-blue':'zone'}"/><text x="${z.x+z.w/2}" y="${z.y+18}" class="zone-label">${z.label}</text>`;
  const route = (r,id,ghost=false) => {
    const cls = ghost ? 'soft-line' : `route-${r.color}`;
    const marker = ghost ? '' : ` marker-end="url(#arr-${r.color}-${id})"`;
    const mx=(r.x1+r.x2)/2;
    return `<path d="M${r.x1} ${r.y1} C${mx} ${r.y1}, ${mx} ${r.y2}, ${r.x2} ${r.y2}" class="${cls}"${marker}/>`;
  };

  const sections = [...page.querySelectorAll('.td-section')];
  boards.forEach((b,idx) => {
    const section = sections[idx];
    if (!section) return;
    const id = `b${idx}`;
    const figure = document.createElement('figure');
    figure.className = 'td-board-diagram';
    figure.innerHTML = `<div class="td-board-shell"><div class="td-board-head"><div><span>Sa bàn ${b.n}</span><strong>${b.title}</strong></div><div class="td-board-legend"><span><i class="a"></i>Arsenal</span><span><i class="c"></i>Chelsea</span></div></div><svg class="td-board-svg" viewBox="0 0 820 720" role="img" aria-label="Sa bàn ${b.n}: ${b.title}">${defs(id)}${pitch}${(b.zones||[]).map(zone).join('')}${(b.ghost||[]).map(r=>route(r,id,true)).join('')}${(b.arrows||[]).map(r=>route(r,id,false)).join('')}${(b.players||[]).map(p=>token(p,id)).join('')}${b.ball?ball(b.ball,id):''}</svg><p class="td-board-note"><b>Ý chính:</b> ${b.note}</p></div>`;
    const anchor = section.querySelector('.td-copy') || section.lastElementChild;
    anchor?.insertAdjacentElement('afterend', figure);
  });
})();