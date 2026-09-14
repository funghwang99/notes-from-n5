(() => {
  const page = document.querySelector('.study-chelsea-2026');
  if (!page || page.dataset.n5ChelseaFiveBoards) return;
  page.dataset.n5ChelseaFiveBoards = '1';

  document.querySelectorAll('.td-match-diagram,.td-board-diagram,.td-portrait-board,.td-five-board').forEach((node) => node.remove());

  const SPRITE = 'assets/tactical/chelsea-2026/lineup-sprite.webp?v=20260914-fiveboards-1';
  const face = {
    'Raya':[0,0], 'Calafiori':[20,0], 'Gabriel':[40,0], 'Konsa':[60,0], 'White':[80,0], 'Lewis-Skelly':[100,0],
    'Rice':[0,33.333], 'Tzolis':[20,33.333], 'Ødegaard':[40,33.333], 'Saka':[60,33.333], 'Havertz':[80,33.333], 'João Pedro':[100,33.333],
    'Palmer':[0,66.667], 'Neto':[20,66.667], 'Rogers':[40,66.667], 'Lavia':[60,66.667], 'James':[80,66.667], 'Hato':[100,66.667],
    'Acheampong':[0,100], 'Lacroix':[20,100], 'Fofana':[40,100], 'Martínez':[60,100]
  };

  const style = document.createElement('style');
  style.textContent = `
    .td-five-board{margin:34px auto 0;max-width:980px;opacity:1!important;visibility:visible!important;transform:none!important}
    .td-five-board-head{margin:0 0 12px;padding:0 2px}
    .td-five-board-kicker{margin:0;color:#d8bd67;font:800 .72rem/1 Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase}
    .td-five-board-idea{margin:7px 0 0;max-width:780px;color:#d9dfe5;font:650 1rem/1.55 Inter,sans-serif}
    .td-five-board-shell{position:relative;overflow:hidden;aspect-ratio:1.45/1;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at 50% 36%,rgba(255,255,255,.14),transparent 30%),linear-gradient(180deg,#373737 0%,#272727 52%,#171717 100%);box-shadow:0 24px 56px rgba(0,0,0,.28),inset 0 0 105px rgba(0,0,0,.4)}
    .td-five-board-shell::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.36),transparent 10%,transparent 90%,rgba(0,0,0,.36))}
    .td-pitch{position:absolute;inset:0;z-index:2;pointer-events:none}
    .td-pitch i{position:absolute;display:block;box-sizing:border-box}
    .td-side-l{left:4.8%;top:-2%;height:105%;border-left:2px solid rgba(255,255,255,.92);transform:rotate(2.1deg)}
    .td-side-r{right:4.8%;top:-2%;height:105%;border-right:2px solid rgba(255,255,255,.92);transform:rotate(-2.1deg)}
    .td-half{left:5%;right:5%;top:49.8%;border-top:2px solid rgba(255,255,255,.92)}
    .td-circle{left:40.2%;top:31.5%;width:19.6%;aspect-ratio:1;border:2px solid rgba(255,255,255,.92);border-radius:50%}
    .td-circle::after{content:"";position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border-radius:50%;background:#fff}
    .td-box-top{left:29%;top:-1px;width:42%;height:14.5%;border:2px solid rgba(255,255,255,.92);border-top:0}
    .td-box-bottom{left:29%;bottom:-1px;width:42%;height:14.5%;border:2px solid rgba(255,255,255,.92);border-bottom:0}
    .td-arc-top{left:43%;top:11.5%;width:14%;height:8%;border:2px solid rgba(255,255,255,.92);border-top-color:transparent;border-radius:0 0 50% 50%}
    .td-arc-bottom{left:43%;bottom:11.5%;width:14%;height:8%;border:2px solid rgba(255,255,255,.92);border-bottom-color:transparent;border-radius:50% 50% 0 0}
    .td-zone{position:absolute;z-index:2;border:1px solid rgba(216,189,103,.66);background:rgba(216,189,103,.075);border-radius:18px;pointer-events:none}
    .td-zone.dashed{border-style:dashed}.td-zone.blue{border-color:rgba(98,157,255,.58);background:rgba(50,104,207,.065)}.td-zone.red{border-color:rgba(255,104,114,.58);background:rgba(184,43,54,.055)}
    .td-lines{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;overflow:visible}
    .td-lines path,.td-lines polyline{fill:none;stroke-linecap:round;stroke-linejoin:round}
    .td-lines .white{stroke:rgba(255,255,255,.96);stroke-width:2.8}.td-lines .red{stroke:#ff727c;stroke-width:1.25}.td-lines .blue{stroke:#75a8ff;stroke-width:1.25}.td-lines .gold{stroke:#e1c86e;stroke-width:1.4}.td-lines .ghost{stroke:rgba(255,255,255,.45);stroke-width:1;stroke-dasharray:2.5 2.2}
    .td-player{position:absolute;z-index:5;transform:translate(-50%,-50%);pointer-events:none}
    .td-player-disc{position:relative;width:48px;height:48px;border-radius:50%;overflow:hidden;background:#24272b;box-shadow:0 5px 9px rgba(0,0,0,.58),0 0 0 2px #fff,0 0 0 5px var(--team)}
    .td-player-face{position:absolute;inset:0;background-image:url('${SPRITE}');background-repeat:no-repeat;background-size:600% 400%;background-position:var(--px) var(--py);transform:scale(1.13);transform-origin:center center}
    .td-player.is-arsenal{--team:#e31937}.td-player.is-chelsea{--team:#1c4ed8}
    .td-player.is-muted{opacity:.72}.td-player.is-focus .td-player-disc{box-shadow:0 5px 10px rgba(0,0,0,.62),0 0 0 2px #fff,0 0 0 6px var(--team),0 0 24px rgba(216,189,103,.48)}
    .td-player.is-warning .td-player-disc{box-shadow:0 5px 10px rgba(0,0,0,.62),0 0 0 2px #fff,0 0 0 6px #efe400,0 0 22px rgba(239,228,0,.42)}
    .td-ball{position:absolute;z-index:7;transform:translate(-50%,-50%);font-size:25px;line-height:1;filter:drop-shadow(0 3px 2px rgba(0,0,0,.55))}
    .td-label{position:absolute;z-index:6;transform:translate(-50%,-50%);padding:5px 7px;border-radius:999px;background:rgba(6,9,12,.72);border:1px solid rgba(255,255,255,.1);color:#eef1f4;font:750 .6rem/1 Inter,sans-serif;letter-spacing:.05em;white-space:nowrap}
    .td-label.gold{color:#e1c86e}.td-five-board figcaption{margin:12px 2px 0;color:#abb6c0;font:500 .92rem/1.62 Inter,sans-serif}.td-five-board figcaption b{color:#f4f7f8}
    @media(max-width:720px){.td-five-board{margin-top:26px}.td-five-board-idea{font-size:.92rem}.td-player-disc{width:36px;height:36px;box-shadow:0 4px 7px rgba(0,0,0,.52),0 0 0 1.5px #fff,0 0 0 4px var(--team)}.td-player-face{transform:scale(1.16)}.td-ball{font-size:19px}.td-label{font-size:.48rem;padding:4px 5px}.td-five-board figcaption{font-size:.84rem}}
  `;
  document.head.append(style);

  const P=(team,name,x,y,extra='')=>({team,name,x,y,extra});
  const Z=(x,y,w,h,tone='gold',extra='')=>({x,y,w,h,tone,extra});
  const L=(text,x,y,tone='')=>({text,x,y,tone});
  const A=(x1,y1,x2,y2,tone='red',curve=0)=>({x1,y1,x2,y2,tone,curve});

  const boards=[
    {
      id:'01',
      idea:'Chelsea kéo Palmer và Rogers vào trong, ghép với João Pedro, James và Lavia để tạo ưu thế quân số ở trung lộ.',
      cap:'Palmer và Rogers rời hành lang biên để bó vào trong. Cụm năm người của Chelsea tạo một pentagon trung tâm, buộc Arsenal phải bảo vệ rất hẹp.',
      ball:[47,44],
      players:[
        P('chelsea','João Pedro',50,35,'focus'),P('chelsea','Palmer',42,44,'focus'),P('chelsea','Rogers',58,44,'focus'),P('chelsea','James',43,57,'focus'),P('chelsea','Lavia',57,57,'focus'),
        P('chelsea','Neto',14,43),P('chelsea','Acheampong',86,43),P('chelsea','Hato',17,68,'muted'),P('chelsea','Fofana',35,74,'muted'),P('chelsea','Lacroix',65,74,'muted'),P('chelsea','Martínez',50,88,'muted'),
        P('arsenal','Havertz',50,27),P('arsenal','Ødegaard',39,39),P('arsenal','Rice',50,51),P('arsenal','Lewis-Skelly',32,56),P('arsenal','Saka',84,31),P('arsenal','Tzolis',16,31),P('arsenal','Calafiori',23,65),P('arsenal','White',77,65),P('arsenal','Gabriel',42,78,'muted'),P('arsenal','Konsa',58,78,'muted')
      ],
      zones:[Z(35,29,30,36,'blue')],
      polygon:[[50,35],[58,44],[57,57],[43,57],[42,44],[50,35]],
      labels:[L('5v4 CENTRAL OVERLOAD',50,67,'gold')]
    },
    {
      id:'02',
      idea:'Arsenal trả lời bằng cách dồn năm người sang cánh phải: Havertz, Ødegaard, Saka, Rice và White.',
      cap:'Saka giữ biên, White overlap thấp hơn, Ødegaard và Rice tạo góc chuyền còn Havertz trôi sang cùng phía. Chelsea bị buộc phải co cụm vào một hành lang.',
      ball:[78,30],
      players:[
        P('arsenal','Saka',83,28,'focus'),P('arsenal','White',78,43,'focus'),P('arsenal','Ødegaard',70,38,'focus'),P('arsenal','Rice',68,53,'focus'),P('arsenal','Havertz',79,54,'focus'),P('arsenal','Tzolis',18,30),P('arsenal','Lewis-Skelly',36,54),P('arsenal','Calafiori',23,63),P('arsenal','Gabriel',43,76,'muted'),P('arsenal','Konsa',57,76,'muted'),
        P('chelsea','Acheampong',88,42),P('chelsea','Lacroix',78,61),P('chelsea','Fofana',58,66),P('chelsea','Hato',33,65),P('chelsea','James',55,48),P('chelsea','Lavia',64,43),P('chelsea','Palmer',47,34),P('chelsea','Rogers',61,32),P('chelsea','João Pedro',50,24),P('chelsea','Martínez',50,88,'muted')
      ],
      zones:[Z(62,20,29,43,'red')],
      arrows:[A(78,43,82,31,'red'),A(70,38,79,34,'red'),A(68,53,73,43,'red'),A(79,54,79,43,'red')],
      labels:[L('5-MAN RIGHT OVERLOAD',77,18,'gold')]
    },
    {
      id:'03',
      idea:'Chelsea phản ứng bằng cách kéo Lavia sang cánh phải. Cái giá là James phải một mình che một vùng trung lộ quá rộng.',
      cap:'Lavia bị hút sang vùng overload. James ở lại làm pivot duy nhất và khoảng trống quanh anh mở ra — đúng khu vực Arsenal muốn tái nhập từ biên vào giữa.',
      ball:[77,31],
      players:[
        P('arsenal','Saka',83,27),P('arsenal','White',79,43),P('arsenal','Ødegaard',70,38),P('arsenal','Rice',67,53),P('arsenal','Havertz',79,54),P('arsenal','Tzolis',18,31),P('arsenal','Lewis-Skelly',35,54),P('arsenal','Calafiori',23,63),P('arsenal','Gabriel',43,76,'muted'),P('arsenal','Konsa',57,76,'muted'),
        P('chelsea','Lavia',70,43,'focus'),P('chelsea','James',53,48,'warning'),P('chelsea','Acheampong',88,42),P('chelsea','Lacroix',78,61),P('chelsea','Fofana',58,66),P('chelsea','Hato',33,65),P('chelsea','Palmer',45,33),P('chelsea','Rogers',61,32),P('chelsea','João Pedro',50,24),P('chelsea','Martínez',50,88,'muted')
      ],
      zones:[Z(63,20,29,43,'red'),Z(43,38,19,23,'gold','dashed')],
      arrows:[A(58,47,69,44,'blue'),A(70,38,56,45,'gold',-3)],
      labels:[L('LAVIA SHIFTS',72,18),L('JAMES ALONE',52,64,'gold')]
    },
    {
      id:'04',
      idea:'Trong build-up, Lewis-Skelly lùi xuống nhận bóng. Một pivot Chelsea phải bước theo, tạo khoảng trống sau lưng lớp pressing đầu tiên.',
      cap:'Lewis-Skelly trở thành điểm nhận thấp bên cạnh first line. Khi Chelsea cử người theo, Arsenal có đường chuyền vào Rice/Ødegaard ở phía sau áp lực.',
      ball:[39,64],
      players:[
        P('arsenal','Raya',50,87),P('arsenal','Gabriel',43,75),P('arsenal','Konsa',58,75),P('arsenal','Lewis-Skelly',39,64,'focus'),P('arsenal','Rice',50,54),P('arsenal','Ødegaard',60,45),P('arsenal','White',77,58),P('arsenal','Calafiori',26,52),P('arsenal','Tzolis',14,37),P('arsenal','Saka',84,34),P('arsenal','Havertz',61,31),
        P('chelsea','João Pedro',50,28),P('chelsea','Palmer',42,38),P('chelsea','Rogers',58,37),P('chelsea','Lavia',45,50,'focus'),P('chelsea','James',57,50),P('chelsea','Neto',26,43),P('chelsea','Acheampong',17,58),P('chelsea','Hato',31,67),P('chelsea','Fofana',50,68),P('chelsea','Lacroix',69,67),P('chelsea','Martínez',50,88,'muted')
      ],
      zones:[Z(41,39,20,23,'gold','dashed')],
      arrows:[A(45,50,40,61,'blue'),A(39,64,50,54,'gold'),A(50,54,60,45,'gold')],
      labels:[L('DRAW THE PIVOT',40,72,'gold')]
    },
    {
      id:'05',
      idea:'Calafiori di chuyển liên tục vào trong, kéo Neto theo. Tzolis giữ biên và buộc Acheampong phải 1v1 — khoảng cách với Lacroix vì thế bị kéo giãn.',
      cap:'Neto bị Calafiori kéo khỏi hành lang. Acheampong phải giữ Tzolis một mình ở ngoài, còn khe giữa Acheampong và Lacroix trở thành đường chạy cho Calafiori khai thác.',
      ball:[18,42],
      players:[
        P('arsenal','Tzolis',13,40,'focus'),P('arsenal','Calafiori',30,49,'focus'),P('arsenal','Lewis-Skelly',39,60),P('arsenal','Rice',50,53),P('arsenal','Ødegaard',60,44),P('arsenal','Saka',84,32),P('arsenal','White',77,58),P('arsenal','Havertz',61,31),P('arsenal','Gabriel',43,75),P('arsenal','Konsa',58,75),P('arsenal','Raya',50,87),
        P('chelsea','Neto',31,43,'focus'),P('chelsea','Acheampong',17,56,'focus'),P('chelsea','Lacroix',39,64,'focus'),P('chelsea','Fofana',55,68),P('chelsea','Hato',69,65),P('chelsea','Lavia',47,49),P('chelsea','James',58,50),P('chelsea','Palmer',43,36),P('chelsea','Rogers',58,36),P('chelsea','João Pedro',50,27),P('chelsea','Martínez',50,88,'muted')
      ],
      zones:[Z(17,46,23,24,'gold','dashed')],
      arrows:[A(30,49,35,58,'red'),A(31,43,30,49,'blue'),A(30,49,34,61,'gold')],
      labels:[L('1v1',15,66),L('GAP',31,70,'gold')]
    }
  ];

  const pathSvg=(board)=>{
    const defs=`<defs><marker id="arr-r-${board.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ff727c"/></marker><marker id="arr-b-${board.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#75a8ff"/></marker><marker id="arr-g-${board.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#e1c86e"/></marker></defs>`;
    let body='';
    if(board.polygon){body+=`<polyline class="white" points="${board.polygon.map(([x,y])=>`${x},${y}`).join(' ')}"/>`;}
    (board.arrows||[]).forEach((a)=>{
      const mx=(a.x1+a.x2)/2+(a.curve||0), my=(a.y1+a.y2)/2-Math.abs(a.curve||0)*.25;
      const marker=a.tone==='blue'?`arr-b-${board.id}`:a.tone==='gold'?`arr-g-${board.id}`:`arr-r-${board.id}`;
      body+=`<path class="${a.tone}" d="M${a.x1} ${a.y1} Q${mx} ${my} ${a.x2} ${a.y2}" marker-end="url(#${marker})"/>`;
    });
    return `<svg class="td-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${defs}${body}</svg>`;
  };

  const playerHtml=(p)=>{
    const pos=face[p.name]||[0,0];
    const extra=p.extra?` ${p.extra.split(/\s+/).map((v)=>`is-${v}`).join(' ')}`:'';
    return `<div class="td-player is-${p.team}${extra}" style="left:${p.x}%;top:${p.y}%" title="${p.name}"><div class="td-player-disc"><span class="td-player-face" style="--px:${pos[0]}%;--py:${pos[1]}%"></span></div></div>`;
  };

  const pitch=`<div class="td-pitch"><i class="td-side-l"></i><i class="td-side-r"></i><i class="td-half"></i><i class="td-circle"></i><i class="td-box-top"></i><i class="td-box-bottom"></i><i class="td-arc-top"></i><i class="td-arc-bottom"></i></div>`;
  const sections=[...page.querySelectorAll('.td-section')];

  boards.forEach((board,index)=>{
    const section=sections[index];
    if(!section) return;
    const figure=document.createElement('figure');
    figure.className='td-five-board';
    const zones=(board.zones||[]).map((z)=>`<div class="td-zone ${z.tone==='blue'?'blue':z.tone==='red'?'red':''} ${z.extra||''}" style="left:${z.x}%;top:${z.y}%;width:${z.w}%;height:${z.h}%"></div>`).join('');
    const labels=(board.labels||[]).map((l)=>`<span class="td-label ${l.tone||''}" style="left:${l.x}%;top:${l.y}%">${l.text}</span>`).join('');
    figure.innerHTML=`<div class="td-five-board-head"><p class="td-five-board-kicker">Sa bàn ${board.id}</p><p class="td-five-board-idea">${board.idea}</p></div><div class="td-five-board-shell">${pitch}${zones}${pathSvg(board)}${board.players.map(playerHtml).join('')}${board.ball?`<span class="td-ball" style="left:${board.ball[0]}%;top:${board.ball[1]}%">⚽</span>`:''}${labels}</div><figcaption><b>Hình ${board.id}.</b> ${board.cap}</figcaption>`;
    const anchor=section.querySelector('.td-copy')||section.lastElementChild;
    anchor?.insertAdjacentElement('afterend',figure);
  });
})();