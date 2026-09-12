(() => {
  const page = document.querySelector('.study-chelsea-2026');
  if (!page || page.dataset.n5ChelseaLineupBoards) return;
  page.dataset.n5ChelseaLineupBoards = '1';

  document.querySelectorAll('.td-match-diagram,.td-board-diagram,.td-portrait-board').forEach((node) => node.remove());

  const SPRITE = 'assets/tactical/chelsea-2026/lineup-sprite.webp?v=20260913-lineup-1';
  const face = {
    'Raya':[0,0], 'Calafiori':[20,0], 'Gabriel':[40,0], 'Konsa':[60,0], 'White':[80,0], 'Lewis-Skelly':[100,0],
    'Rice':[0,33.333], 'Tzolis':[20,33.333], 'Ødegaard':[40,33.333], 'Saka':[60,33.333], 'Havertz':[80,33.333], 'João Pedro':[100,33.333],
    'Palmer':[0,66.667], 'Neto':[20,66.667], 'Rogers':[40,66.667], 'Lavia':[60,66.667], 'James':[80,66.667], 'Hato':[100,66.667],
    'Acheampong':[0,100], 'Lacroix':[20,100], 'Fofana':[40,100], 'Martínez':[60,100]
  };

  const style = document.createElement('style');
  style.textContent = `
    .td-portrait-board{margin:34px auto 0;max-width:940px;opacity:1!important;visibility:visible!important;transform:none!important}
    .td-portrait-board-head{margin:0 0 13px;padding:0 2px}
    .td-portrait-board-kicker{margin:0;color:#d8bd67;font:800 .74rem/1 Inter,sans-serif;letter-spacing:.11em;text-transform:uppercase}
    .td-portrait-board-idea{margin:7px 0 0;max-width:760px;color:#d4dbe2;font:600 1rem/1.58 Inter,sans-serif}
    .td-portrait-board-shell{position:relative;overflow:hidden;aspect-ratio:1.12/1;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at 52% 35%,rgba(255,255,255,.13),transparent 33%),radial-gradient(circle at 52% 78%,rgba(255,255,255,.05),transparent 30%),linear-gradient(180deg,#373737 0%,#262626 52%,#171717 100%);box-shadow:0 24px 54px rgba(0,0,0,.25),inset 0 0 90px rgba(0,0,0,.34)}
    .td-portrait-board-shell::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.35),transparent 10%,transparent 90%,rgba(0,0,0,.35));z-index:1}
    .td-pitch-line{position:absolute;z-index:2;pointer-events:none;box-sizing:border-box}
    .td-pitch-side-left{left:5.3%;top:-2%;height:106%;width:1px;border-left:2px solid rgba(255,255,255,.92);transform:rotate(3deg)}
    .td-pitch-side-right{right:5.3%;top:-2%;height:106%;width:1px;border-right:2px solid rgba(255,255,255,.92);transform:rotate(-3deg)}
    .td-pitch-halfway{left:5.7%;right:5.7%;top:36%;height:1px;border-top:2px solid rgba(255,255,255,.92)}
    .td-pitch-centre{left:38%;top:23%;width:24%;aspect-ratio:1;border:2px solid rgba(255,255,255,.92);border-radius:50%}
    .td-pitch-centre::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#f5f5f5}
    .td-pitch-box{left:30%;bottom:-1px;width:40%;height:17%;border:2px solid rgba(255,255,255,.92);border-bottom:0}
    .td-pitch-arc{left:42%;bottom:12.6%;width:16%;height:10%;border:2px solid rgba(255,255,255,.92);border-bottom-color:transparent;border-radius:50% 50% 0 0}
    .td-pitch-spot{left:49.55%;bottom:5.6%;width:8px;height:8px;border-radius:50%;background:#fff}
    .td-board-zone{position:absolute;z-index:2;border:1px dashed rgba(216,189,103,.56);background:rgba(216,189,103,.055);border-radius:18px;pointer-events:none}
    .td-board-zone.is-red{border-color:rgba(235,107,116,.52);background:rgba(203,57,69,.045)}
    .td-board-zone.is-blue{border-color:rgba(128,175,255,.48);background:rgba(56,126,224,.045)}
    .td-board-arrows{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}
    .td-board-arrows path{fill:none;stroke-width:1.15;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 2px 2px rgba(0,0,0,.45))}
    .td-board-arrows .ars-arrow{stroke:#ff7b83}.td-board-arrows .che-arrow{stroke:#7eb0ff}.td-board-arrows .gold-arrow{stroke:#e1c86e}.td-board-arrows .ghost-arrow{stroke:rgba(255,255,255,.46);stroke-dasharray:2.5 2.2}
    .td-player{position:absolute;z-index:5;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:5px;min-width:60px;pointer-events:none}
    .td-player-disc{position:relative;width:52px;height:52px;border-radius:50%;overflow:hidden;background:#24272b;box-shadow:0 5px 9px rgba(0,0,0,.58),0 0 0 2px #fff,0 0 0 6px var(--team)}
    .td-player-face{position:absolute;inset:0;background-image:url('${SPRITE}');background-repeat:no-repeat;background-size:600% 400%;background-position:var(--px) var(--py);transform:scale(1.16);transform-origin:center center}
    .td-player.is-arsenal{--team:#e31937}.td-player.is-chelsea{--team:#1c4ed8}
    .td-player.is-highlight .td-player-disc{box-shadow:0 6px 11px rgba(0,0,0,.62),0 0 0 2px #fff,0 0 0 6px var(--team),0 0 26px rgba(216,189,103,.5)}
    .td-player.is-muted{opacity:.64}
    .td-player-name{padding:3px 7px;border-radius:999px;background:rgba(0,0,0,.58);color:#f6f7f8;font:700 .68rem/1 Inter,sans-serif;white-space:nowrap;box-shadow:0 2px 5px rgba(0,0,0,.28);backdrop-filter:blur(3px)}
    .td-ball{position:absolute;z-index:7;transform:translate(-50%,-50%);font-size:27px;line-height:1;filter:drop-shadow(0 3px 2px rgba(0,0,0,.55))}
    .td-board-tag{position:absolute;z-index:4;transform:translate(-50%,-50%);padding:6px 8px;border:1px solid rgba(255,255,255,.1);border-radius:9px;background:rgba(6,9,12,.64);color:#d8bd67;font:800 .62rem/1 Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
    .td-portrait-board figcaption{margin:12px 2px 0;color:#aeb9c3;font:500 .92rem/1.65 Inter,sans-serif}.td-portrait-board figcaption b{color:#f4f7f8}
    @media(max-width:720px){.td-portrait-board{margin-top:26px}.td-portrait-board-idea{font-size:.93rem}.td-player-disc{width:42px;height:42px;box-shadow:0 4px 7px rgba(0,0,0,.52),0 0 0 1.5px #fff,0 0 0 4px var(--team)}.td-player{min-width:48px;gap:4px}.td-player-name{font-size:.56rem;padding:2px 5px}.td-player-face{transform:scale(1.18)}.td-ball{font-size:21px}.td-board-tag{font-size:.52rem;padding:5px 6px}.td-portrait-board figcaption{font-size:.86rem}}
  `;
  document.head.append(style);

  const P=(team,name,x,y,extra='')=>({team,name,x,y,extra});
  const Z=(x,y,w,h,tone='gold')=>({x,y,w,h,tone});
  const A=(x1,y1,x2,y2,tone='ars',curve=0)=>({x1,y1,x2,y2,tone,curve});

  const boards=[
    {id:'00',idea:'Chelsea khóa giữa. Arsenal kéo khối sang phải trước, rồi quay lại đánh khe trung lộ.',cap:'Cụm xanh khóa giữa sân, cụm đỏ tập trung cánh phải và đường vàng là pha tái nhập vào trong.',ball:[74,31],zones:[Z(33,36,32,24,'blue'),Z(67,22,23,44,'red'),Z(44,38,13,24)],players:[P('arsenal','Saka',84,24,'highlight'),P('arsenal','White',78,35),P('arsenal','Ødegaard',70,45),P('arsenal','Rice',63,56),P('arsenal','Havertz',79,55),P('arsenal','Gabriel',43,73,'muted'),P('arsenal','Konsa',57,73,'muted'),P('arsenal','Raya',50,86,'muted'),P('chelsea','Palmer',41,39),P('chelsea','João Pedro',50,31),P('chelsea','Rogers',59,39),P('chelsea','James',43,51),P('chelsea','Lavia',57,51),P('chelsea','Hato',36,68,'muted'),P('chelsea','Fofana',50,70,'muted'),P('chelsea','Lacroix',64,68,'muted')],arrows:[A(79,55,79,39),A(84,24,79,34),A(70,45,54,47,'gold',-5)],tags:[['RE-ENTRY',50,43]]},
    {id:'01',idea:'Chelsea nhường biên tương đối, miễn là khối 5 người ở trung tâm vẫn giữ nguyên hình.',cap:'Tzolis và Saka kéo chiều ngang, còn năm quân Chelsea vẫn bó chặt khu trung tâm.',ball:[88,30],zones:[Z(34,32,32,29,'blue'),Z(5,18,18,60),Z(77,18,18,60)],players:[P('arsenal','Tzolis',12,27),P('arsenal','Saka',88,27),P('arsenal','Rice',50,57),P('arsenal','Gabriel',42,72,'muted'),P('arsenal','Konsa',58,72,'muted'),P('arsenal','Raya',50,85,'muted'),P('chelsea','Palmer',40,37),P('chelsea','João Pedro',50,30),P('chelsea','Rogers',60,37),P('chelsea','James',43,50),P('chelsea','Lavia',57,50),P('chelsea','Hato',20,57,'muted'),P('chelsea','Acheampong',80,57,'muted'),P('chelsea','Fofana',42,68,'muted'),P('chelsea','Lacroix',58,68,'muted')],arrows:[A(18,27,33,34),A(82,27,67,34)],tags:[['CENTRAL SHIELD',50,27]]},
    {id:'02',idea:'Overload cánh phải: Saka, White, Ødegaard, Rice và Havertz cùng xuất hiện trong một hành lang.',cap:'Chelsea phải dồn người thật sang một phía; ảnh cầu thủ giúp đọc ngay ai đang tạo overload và ai đang bị kéo theo.',ball:[79,35],zones:[Z(66,18,28,53,'red')],players:[P('arsenal','Saka',86,22,'highlight'),P('arsenal','White',80,34),P('arsenal','Ødegaard',73,45),P('arsenal','Rice',67,55),P('arsenal','Havertz',82,55),P('arsenal','Gabriel',43,75,'muted'),P('arsenal','Konsa',57,75,'muted'),P('chelsea','Acheampong',87,39),P('chelsea','Lacroix',80,27),P('chelsea','James',72,35),P('chelsea','Rogers',68,27),P('chelsea','Lavia',55,49),P('chelsea','Fofana',49,67,'muted'),P('chelsea','Hato',34,67,'muted')],arrows:[A(67,55,72,46),A(82,55,83,42),A(86,22,84,35)],tags:[['RIGHT-SIDE OVERLOAD',80,16]]},
    {id:'03',idea:'Chelsea chuyển sang 5-4-1. Palmer và Rogers phải hồi vị trí rất xa ra hai biên.',cap:'Hai tuyến Chelsea hiện thành một khối thấp; Tzolis và Saka là hai runner Arsenal tấn công khoảng sau lưng.',ball:[17,28],zones:[Z(12,33,76,29,'blue')],players:[P('chelsea','Palmer',18,42,'highlight'),P('chelsea','James',39,42),P('chelsea','Lavia',61,42),P('chelsea','Rogers',82,42,'highlight'),P('chelsea','João Pedro',50,28),P('chelsea','Hato',12,63),P('chelsea','Fofana',31,64),P('chelsea','Lacroix',50,65),P('chelsea','Acheampong',69,64),P('chelsea','Neto',88,63),P('arsenal','Tzolis',11,27),P('arsenal','Saka',89,27),P('arsenal','Rice',50,57),P('arsenal','Gabriel',42,78,'muted'),P('arsenal','Konsa',58,78,'muted')],arrows:[A(11,27,16,38),A(89,27,84,38),A(18,30,18,40,'ghost'),A(82,30,82,40,'ghost')]},
    {id:'04',idea:'Một pivot bị kéo ngang để cứu cánh phải; chính chuyển động đó làm khe ở trong xuất hiện.',cap:'James dịch sang hỗ trợ, Lavia còn ở giữa và Ødegaard có đường tái nhập vào khe vừa mở.',ball:[74,39],zones:[Z(69,22,23,48,'red'),Z(44,37,15,23)],players:[P('arsenal','Saka',86,25),P('arsenal','White',80,36),P('arsenal','Ødegaard',72,47,'highlight'),P('arsenal','Havertz',84,57),P('arsenal','Rice',61,58),P('chelsea','James',70,42,'highlight'),P('chelsea','Lavia',51,47),P('chelsea','Acheampong',74,62),P('chelsea','Lacroix',55,67),P('chelsea','Hato',26,61,'muted')],arrows:[A(53,42,69,41,'che'),A(72,47,56,47,'gold')],tags:[['INSIDE SPACE',51,39]]},
    {id:'05',idea:'Rice lùi xuống kéo một pivot bước lên; Ødegaard và Calafiori chiếm khoảng sau lớp pressing.',cap:'Rice là người kéo, James bước theo, còn Ødegaard và Calafiori đứng sau tuyến pressing để nhận bóng.',ball:[50,68],zones:[Z(37,35,27,22)],players:[P('arsenal','Rice',50,68,'highlight'),P('arsenal','Ødegaard',46,43,'highlight'),P('arsenal','Calafiori',61,40,'highlight'),P('arsenal','Gabriel',39,79,'muted'),P('arsenal','Konsa',61,79,'muted'),P('chelsea','James',48,56,'highlight'),P('chelsea','Lavia',58,48),P('chelsea','Palmer',38,42,'muted'),P('chelsea','Fofana',46,65,'muted'),P('chelsea','Lacroix',64,63,'muted')],arrows:[A(50,68,49,57),A(46,43,53,42,'gold'),A(61,40,67,34,'gold')]},
    {id:'06',idea:'Calafiori invert vào half-space kéo Neto đi theo, làm hành lang ngoài biên bị bỏ trống.',cap:'Calafiori kéo Neto vào trong; Tzolis giữ ngoài biên và khoảng trống giữa Hato, Fofana và hành lang bắt đầu xuất hiện.',ball:[20,60],zones:[Z(7,24,20,55,'red'),Z(28,32,23,30)],players:[P('arsenal','Calafiori',22,65,'highlight'),P('arsenal','Tzolis',11,40),P('chelsea','Neto',34,52,'highlight'),P('chelsea','Hato',16,50),P('chelsea','Fofana',30,61),P('chelsea','Lacroix',47,63),P('chelsea','Acheampong',64,63,'muted'),P('arsenal','Rice',53,49),P('arsenal','Ødegaard',62,39,'muted')],arrows:[A(22,65,37,47),A(34,52,39,47,'che')],tags:[['WIDE GAP',16,30]]},
    {id:'07',idea:'Arsenal dùng back two để dồn người lên. Khi mất bóng hai hành lang transition mở rất rộng.',cap:'Gabriel và Konsa gần như đứng một mình phía sau; Rogers, Palmer và Neto là ba hướng phản công Chelsea.',ball:[51,38],zones:[Z(5,25,18,63,'blue'),Z(77,25,18,63,'blue')],players:[P('arsenal','Gabriel',43,77),P('arsenal','Konsa',57,77),P('arsenal','Saka',24,36),P('arsenal','White',36,39),P('arsenal','Ødegaard',49,42),P('arsenal','Havertz',62,39),P('arsenal','Tzolis',76,36),P('chelsea','Rogers',14,31,'highlight'),P('chelsea','Palmer',50,30,'highlight'),P('chelsea','Neto',86,31,'highlight')],arrows:[A(14,31,36,67,'che'),A(50,30,50,66,'che'),A(86,31,64,67,'che')]},
    {id:'08',idea:'Chelsea có bóng thì đổi shape: Palmer vào trong, Acheampong bước lên half-space, Neto giữ chiều rộng.',cap:'Arsenal lùi thành 4-4-2 rõ ràng trong khi Chelsea tạo shape lệch phải từ Martínez ở đáy.',ball:[61,31],zones:[Z(57,17,29,47,'blue')],players:[P('chelsea','Neto',87,24,'highlight'),P('chelsea','Acheampong',73,34,'highlight'),P('chelsea','Palmer',61,31,'highlight'),P('chelsea','James',47,42),P('chelsea','Lavia',57,46),P('chelsea','Rogers',69,43),P('chelsea','Fofana',46,68,'muted'),P('chelsea','Lacroix',54,68,'muted'),P('chelsea','Martínez',50,84,'muted'),P('arsenal','Havertz',43,39),P('arsenal','Ødegaard',52,37),P('arsenal','Tzolis',31,56),P('arsenal','Rice',44,57),P('arsenal','Lewis-Skelly',57,57),P('arsenal','Saka',70,56),P('arsenal','Calafiori',27,73,'muted'),P('arsenal','Gabriel',42,73,'muted'),P('arsenal','Konsa',58,73,'muted'),P('arsenal','White',73,73,'muted')],arrows:[A(73,34,85,26,'che'),A(61,31,54,41,'che')]},
    {id:'09',idea:'Arsenal không cần xóa Palmer. Họ chỉ cần buộc anh nhận bóng sâu hơn và xa khu số 10.',cap:'Palmer lùi xuống gần James và Lavia; Ødegaard đứng sát, còn Rice và Lewis-Skelly khóa phần sân phía trước.',ball:[50,57],zones:[Z(42,22,16,16)],players:[P('chelsea','Palmer',50,57,'highlight'),P('chelsea','James',42,65),P('chelsea','Lavia',58,65),P('chelsea','João Pedro',50,27),P('chelsea','Rogers',67,35),P('arsenal','Ødegaard',50,48,'highlight'),P('arsenal','Rice',40,44),P('arsenal','Lewis-Skelly',60,44),P('arsenal','Gabriel',43,77,'muted'),P('arsenal','Konsa',57,77,'muted')],arrows:[A(50,40,50,55,'che'),A(50,48,50,55)],tags:[['#10 ZONE',50,25]]}
  ];

  const arrowSvg=(board)=>{
    const base=`arr-${board.id}`;
    const paths=board.arrows.map((a)=>{
      const cls=a.tone==='che'?'che-arrow':a.tone==='gold'?'gold-arrow':a.tone==='ghost'?'ghost-arrow':'ars-arrow';
      const marker=a.tone==='che'?`${base}-b`:a.tone==='gold'?`${base}-g`:`${base}-r`;
      const mx=(a.x1+a.x2)/2+(a.curve||0), my=(a.y1+a.y2)/2-Math.abs(a.curve||0)*.25;
      return `<path class="${cls}" d="M${a.x1} ${a.y1} Q${mx} ${my} ${a.x2} ${a.y2}" marker-end="url(#${marker})"/>`;
    }).join('');
    return `<svg class="td-board-arrows" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="${base}-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ff7b83"/></marker><marker id="${base}-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#7eb0ff"/></marker><marker id="${base}-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#e1c86e"/></marker></defs>${paths}</svg>`;
  };

  const makePlayer=(p)=>{
    const pos=face[p.name]||[0,0];
    const classes=['td-player',`is-${p.team}`];
    if(p.extra.includes('muted')) classes.push('is-muted');
    if(p.extra.includes('highlight')) classes.push('is-highlight');
    return `<div class="${classes.join(' ')}" style="left:${p.x}%;top:${p.y}%"><div class="td-player-disc"><span class="td-player-face" style="--px:${pos[0]}%;--py:${pos[1]}%"></span></div><div class="td-player-name">${p.name}</div></div>`;
  };

  const sections=[...page.querySelectorAll('.td-section')];
  boards.forEach((board,index)=>{
    const section=sections[index]; if(!section) return;
    const figure=document.createElement('figure'); figure.className='td-portrait-board';
    const zones=board.zones.map(z=>`<div class="td-board-zone ${z.tone==='red'?'is-red':z.tone==='blue'?'is-blue':''}" style="left:${z.x}%;top:${z.y}%;width:${z.w}%;height:${z.h}%"></div>`).join('');
    const tags=(board.tags||[]).map(([text,x,y])=>`<span class="td-board-tag" style="left:${x}%;top:${y}%">${text}</span>`).join('');
    figure.innerHTML=`<div class="td-portrait-board-head"><p class="td-portrait-board-kicker">Sa bàn ${board.id}</p><p class="td-portrait-board-idea">${board.idea}</p></div><div class="td-portrait-board-shell"><i class="td-pitch-line td-pitch-side-left"></i><i class="td-pitch-line td-pitch-side-right"></i><i class="td-pitch-line td-pitch-halfway"></i><i class="td-pitch-line td-pitch-centre"></i><i class="td-pitch-line td-pitch-box"></i><i class="td-pitch-line td-pitch-arc"></i><i class="td-pitch-line td-pitch-spot"></i>${zones}${arrowSvg(board)}${board.players.map(makePlayer).join('')}${board.ball?`<span class="td-ball" style="left:${board.ball[0]}%;top:${board.ball[1]}%">⚽</span>`:''}${tags}</div><figcaption><b>Hình ${board.id}.</b> ${board.cap}</figcaption>`;
    (section.querySelector('.td-copy')||section.lastElementChild)?.insertAdjacentElement('afterend',figure);
  });
})();