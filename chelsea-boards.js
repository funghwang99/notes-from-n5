(() => {
  const page = document.querySelector('.study-chelsea-2026');
  if (!page || page.dataset.n5ChelseaReferenceBoards) return;
  page.dataset.n5ChelseaReferenceBoards = '1';

  document.querySelectorAll('.td-match-diagram,.td-board-diagram,.td-portrait-board,.td-five-board,.td-reference-board').forEach((node) => node.remove());

  const SPRITE = 'assets/tactical/chelsea-2026/lineup-sprite.webp?v=20260914-reference-2';
  const face = {
    'Raya':[0,0], 'Calafiori':[20,0], 'Gabriel':[40,0], 'Konsa':[60,0], 'White':[80,0], 'Lewis-Skelly':[100,0],
    'Rice':[0,33.333], 'Tzolis':[20,33.333], 'Ødegaard':[40,33.333], 'Saka':[60,33.333], 'Havertz':[80,33.333], 'João Pedro':[100,33.333],
    'Palmer':[0,66.667], 'Neto':[20,66.667], 'Rogers':[40,66.667], 'Lavia':[60,66.667], 'James':[80,66.667], 'Hato':[100,66.667],
    'Acheampong':[0,100], 'Lacroix':[20,100], 'Fofana':[40,100], 'Martínez':[60,100]
  };

  const style = document.createElement('style');
  style.textContent = `
    .td-reference-board{margin:34px auto 0;max-width:1060px;opacity:1!important;visibility:visible!important;transform:none!important}
    .td-reference-head{margin:0 0 12px;padding:0 2px}
    .td-reference-kicker{margin:0;color:#d8bd67;font:800 .72rem/1 Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase}
    .td-reference-idea{margin:7px 0 0;max-width:820px;color:#d9dfe5;font:650 1rem/1.55 Inter,sans-serif}
    .td-reference-pitch{position:relative;overflow:hidden;aspect-ratio:1.72/1;border:1px solid rgba(255,255,255,.08);background:radial-gradient(circle at 50% 44%,rgba(255,255,255,.16),transparent 32%),linear-gradient(180deg,#353535 0%,#272727 51%,#181818 100%);box-shadow:0 24px 56px rgba(0,0,0,.3),inset 0 0 120px rgba(0,0,0,.36)}
    .td-reference-pitch::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.3),transparent 9%,transparent 91%,rgba(0,0,0,.3))}
    .td-ref-mark{position:absolute;z-index:2;box-sizing:border-box;pointer-events:none;border-color:rgba(255,255,255,.9)}
    .td-ref-touch-l{left:4.2%;top:-3%;height:106%;border-left:2px solid rgba(255,255,255,.92);transform:rotate(2.3deg)}
    .td-ref-touch-r{right:4.2%;top:-3%;height:106%;border-right:2px solid rgba(255,255,255,.92);transform:rotate(-2.3deg)}
    .td-ref-half{left:4.4%;right:4.4%;top:50%;border-top:2px solid rgba(255,255,255,.9)}
    .td-ref-circle{left:42%;top:32%;width:16%;aspect-ratio:1;border:2px solid rgba(255,255,255,.9);border-radius:50%}
    .td-ref-circle::after{content:"";position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px;border-radius:50%;background:#fff}
    .td-ref-box-top{left:31%;top:-1px;width:38%;height:14%;border:2px solid rgba(255,255,255,.9);border-top:0}
    .td-ref-box-bottom{left:31%;bottom:-1px;width:38%;height:14%;border:2px solid rgba(255,255,255,.9);border-bottom:0}
    .td-ref-arc-top{left:44%;top:11.2%;width:12%;height:8%;border:2px solid rgba(255,255,255,.9);border-top-color:transparent;border-radius:0 0 50% 50%}
    .td-ref-arc-bottom{left:44%;bottom:11.2%;width:12%;height:8%;border:2px solid rgba(255,255,255,.9);border-bottom-color:transparent;border-radius:50% 50% 0 0}
    .td-ref-zone{position:absolute;z-index:2;border-radius:18px;pointer-events:none;background:rgba(216,189,103,.06);border:1px dashed rgba(216,189,103,.5)}
    .td-ref-zone.blue{background:rgba(54,120,226,.055);border-color:rgba(91,151,255,.5)}
    .td-ref-zone.red{background:rgba(215,51,69,.05);border-color:rgba(255,105,115,.5)}
    .td-ref-svg{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;overflow:visible}
    .td-ref-svg path,.td-ref-svg polyline{fill:none;stroke-linecap:round;stroke-linejoin:round}
    .td-ref-svg .shape{stroke:rgba(255,255,255,.98);stroke-width:3.1;filter:drop-shadow(0 2px 2px rgba(0,0,0,.4))}
    .td-ref-svg .ars{stroke:#ff747e;stroke-width:1.25}.td-ref-svg .che{stroke:#75a9ff;stroke-width:1.25}.td-ref-svg .gold{stroke:#e4cd71;stroke-width:1.35}.td-ref-svg .gap{stroke:rgba(228,205,113,.8);stroke-width:1.1;stroke-dasharray:2.5 2.5}
    .td-token{position:absolute;z-index:5;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;pointer-events:none;background:#282b2f;box-shadow:0 6px 10px rgba(0,0,0,.58),0 0 0 2px rgba(255,255,255,.96),0 0 0 5px var(--team)}
    .td-token.arsenal{--team:#e31937}.td-token.chelsea{--team:#1b50c9}
    .td-token.key{box-shadow:0 6px 10px rgba(0,0,0,.62),0 0 0 2px #fff,0 0 0 6px var(--team),0 0 24px rgba(216,189,103,.35)}
    .td-token.warning{box-shadow:0 6px 10px rgba(0,0,0,.62),0 0 0 2px #fff,0 0 0 6px #e8e100,0 0 20px rgba(232,225,0,.42)}
    .td-token-face{position:absolute;inset:0;border-radius:50%;background-image:url('${SPRITE}');background-repeat:no-repeat;background-size:600% 400%;background-position:var(--px) var(--py);transform:scale(1.14);transform-origin:center center}
    .td-ref-ball{position:absolute;z-index:7;transform:translate(-50%,-50%);font-size:24px;line-height:1;filter:drop-shadow(0 3px 2px rgba(0,0,0,.5))}
    .td-reference-board figcaption{margin:12px 2px 0;color:#aeb8c2;font:500 .92rem/1.62 Inter,sans-serif}.td-reference-board figcaption b{color:#f5f7f8}
    @media(max-width:720px){.td-reference-board{margin-top:26px}.td-reference-idea{font-size:.92rem}.td-token{width:36px;height:36px;box-shadow:0 4px 7px rgba(0,0,0,.55),0 0 0 1.5px #fff,0 0 0 4px var(--team)}.td-token.key{box-shadow:0 4px 7px rgba(0,0,0,.58),0 0 0 1.5px #fff,0 0 0 4px var(--team),0 0 16px rgba(216,189,103,.32)}.td-token.warning{box-shadow:0 4px 7px rgba(0,0,0,.58),0 0 0 1.5px #fff,0 0 0 4px #e8e100}.td-token-face{transform:scale(1.16)}.td-ref-ball{font-size:18px}.td-reference-board figcaption{font-size:.84rem}}
  `;
  document.head.append(style);

  const P=(team,name,x,y,state='')=>({team,name,x,y,state});
  const Z=(x,y,w,h,tone='')=>({x,y,w,h,tone});
  const M=(x1,y1,x2,y2,tone='ars',curve=0)=>({x1,y1,x2,y2,tone,curve});

  const boards = [
    {
      id:'01',
      idea:'Chelsea kéo Palmer và Rogers vào giữa để tạo thế overload trung lộ quanh João Pedro, James và Lavia.',
      cap:'Đúng như mẫu: Palmer và Rogers bó vào trong, tạo một pentagon năm người của Chelsea ở trung lộ. Hai winger còn lại giữ chiều ngang, phía sau vẫn là hàng thủ đầy đủ.',
      ball:[44,52],
      players:[
        P('arsenal','Raya',50,6),P('arsenal','White',17,19),P('arsenal','Konsa',39,21),P('arsenal','Gabriel',60,21),P('arsenal','Calafiori',82,20),P('arsenal','Rice',50,34),P('arsenal','Lewis-Skelly',36,40),P('arsenal','Ødegaard',63,40),P('arsenal','Saka',11,48),P('arsenal','Tzolis',89,48),P('arsenal','Havertz',50,45),
        P('chelsea','João Pedro',50,39,'key'),P('chelsea','Palmer',41,49,'key'),P('chelsea','Rogers',59,49,'key'),P('chelsea','James',42,60,'key'),P('chelsea','Lavia',58,60,'key'),P('chelsea','Neto',14,57),P('chelsea','Hato',16,75),P('chelsea','Fofana',36,78),P('chelsea','Lacroix',63,78),P('chelsea','Acheampong',85,74),P('chelsea','Martínez',50,92)
      ],
      zones:[Z(34,32,32,36,'blue')],
      polygon:[[50,39],[59,49],[58,60],[42,60],[41,49],[50,39]]
    },
    {
      id:'02',
      idea:'Arsenal tạo overload đúng cánh phải của Saka: Havertz, Ødegaard, Saka, Rice và White cùng xuất hiện trong một hành lang.',
      cap:'Cánh phải của Arsenal nằm bên trái hình khi Arsenal tấn công xuống dưới. Năm quân đỏ tụ lại đúng như mẫu, trong khi cả hai đội vẫn đủ 11 người để đọc được shape tổng thể.',
      ball:[13,44],
      players:[
        P('arsenal','Raya',50,6),P('arsenal','Gabriel',58,20),P('arsenal','Konsa',42,20),P('arsenal','Calafiori',80,24),P('arsenal','Lewis-Skelly',51,36),P('arsenal','Tzolis',88,44),P('arsenal','Saka',12,43,'key'),P('arsenal','White',18,55,'key'),P('arsenal','Ødegaard',27,47,'key'),P('arsenal','Rice',32,58,'key'),P('arsenal','Havertz',30,36,'key'),
        P('chelsea','João Pedro',52,39),P('chelsea','Palmer',43,47),P('chelsea','Rogers',61,47),P('chelsea','James',48,57),P('chelsea','Lavia',58,57),P('chelsea','Neto',84,54),P('chelsea','Hato',15,73),P('chelsea','Fofana',35,76),P('chelsea','Lacroix',63,76),P('chelsea','Acheampong',86,72),P('chelsea','Martínez',50,92)
      ],
      zones:[Z(6,29,32,39,'red')]
    },
    {
      id:'03',
      idea:'Chelsea kéo Lavia qua cánh overload. James bị bỏ lại một mình và phải quán xuyến vùng trung lộ quá rộng.',
      cap:'Lavia dịch hẳn sang trái hình để hỗ trợ cánh Saka. James ở lại giữa sân với vòng vàng, cho thấy khoảng trống trung tâm Arsenal có thể quay vào khai thác.',
      ball:[13,43],
      players:[
        P('arsenal','Raya',50,6),P('arsenal','Gabriel',58,20),P('arsenal','Konsa',42,20),P('arsenal','Calafiori',80,24),P('arsenal','Lewis-Skelly',51,36),P('arsenal','Tzolis',88,44),P('arsenal','Saka',12,42,'key'),P('arsenal','White',18,55),P('arsenal','Ødegaard',28,47),P('arsenal','Rice',33,58),P('arsenal','Havertz',30,36),
        P('chelsea','João Pedro',52,39),P('chelsea','Palmer',43,47),P('chelsea','Rogers',62,47),P('chelsea','Lavia',27,56,'key'),P('chelsea','James',51,57,'warning'),P('chelsea','Neto',84,54),P('chelsea','Hato',15,73),P('chelsea','Fofana',35,76),P('chelsea','Lacroix',63,76),P('chelsea','Acheampong',86,72),P('chelsea','Martínez',50,92)
      ],
      zones:[Z(6,29,32,39,'red'),Z(40,43,22,25,'')],
      arrows:[M(55,57,29,56,'che'),M(29,47,46,53,'gold',-2)]
    },
    {
      id:'04',
      idea:'Lewis-Skelly lùi xuống trong build-up và kéo một pivot Chelsea bước theo, mở khoảng trống phía sau lớp pressing.',
      cap:'Lewis-Skelly hạ thấp gần first line Arsenal. Lavia bước ra khỏi double pivot để theo anh, trong khi Rice và Ødegaard đứng ở khoảng phía sau áp lực.',
      ball:[37,30],
      players:[
        P('arsenal','Raya',50,6),P('arsenal','White',18,20),P('arsenal','Konsa',41,21),P('arsenal','Gabriel',59,21),P('arsenal','Calafiori',81,21),P('arsenal','Lewis-Skelly',37,30,'key'),P('arsenal','Rice',49,42),P('arsenal','Ødegaard',61,44),P('arsenal','Saka',11,50),P('arsenal','Tzolis',89,50),P('arsenal','Havertz',52,36),
        P('chelsea','João Pedro',50,46),P('chelsea','Palmer',42,52),P('chelsea','Rogers',59,52),P('chelsea','Lavia',38,42,'key'),P('chelsea','James',57,58),P('chelsea','Neto',84,54),P('chelsea','Hato',15,73),P('chelsea','Fofana',35,76),P('chelsea','Lacroix',63,76),P('chelsea','Acheampong',86,72),P('chelsea','Martínez',50,92)
      ],
      zones:[Z(43,37,22,18,'')],
      arrows:[M(45,56,39,43,'che'),M(37,30,48,41,'gold')]
    },
    {
      id:'05',
      idea:'Calafiori đi vào trong kéo Neto theo. Tzolis giữ biên, buộc Acheampong phải 1v1 và làm khe Acheampong–Lacroix mở lớn.',
      cap:'Bên trái Arsenal nằm phía phải hình: Tzolis ghim biên, Neto bị Calafiori kéo vào trong, còn Acheampong phải ở lại với Tzolis. Khoảng cách tới Lacroix trở thành khe cho Calafiori tấn công.',
      ball:[89,48],
      players:[
        P('arsenal','Raya',50,6),P('arsenal','White',18,20),P('arsenal','Konsa',41,21),P('arsenal','Gabriel',59,21),P('arsenal','Lewis-Skelly',43,38),P('arsenal','Rice',51,46),P('arsenal','Ødegaard',61,43),P('arsenal','Saka',11,49),P('arsenal','Havertz',51,35),P('arsenal','Tzolis',89,48,'key'),P('arsenal','Calafiori',73,48,'key'),
        P('chelsea','João Pedro',50,43),P('chelsea','Palmer',41,51),P('chelsea','Rogers',60,51),P('chelsea','James',48,59),P('chelsea','Lavia',58,59),P('chelsea','Neto',72,51,'key'),P('chelsea','Hato',15,73),P('chelsea','Fofana',36,76),P('chelsea','Lacroix',64,75,'key'),P('chelsea','Acheampong',86,67,'key'),P('chelsea','Martínez',50,92)
      ],
      zones:[Z(64,55,23,22,'')],
      arrows:[M(80,27,73,47,'ars'),M(82,49,73,50,'che'),M(73,48,68,68,'gold',2)]
    }
  ];

  const arrowSvg = (board) => {
    const defs = `<defs><marker id="r-${board.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ff747e"/></marker><marker id="b-${board.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#75a9ff"/></marker><marker id="g-${board.id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#e4cd71"/></marker></defs>`;
    let body = '';
    if (board.polygon) body += `<polyline class="shape" points="${board.polygon.map(([x,y]) => `${x},${y}`).join(' ')}"/>`;
    (board.arrows || []).forEach((a) => {
      const mx = (a.x1+a.x2)/2 + (a.curve || 0);
      const my = (a.y1+a.y2)/2 - Math.abs(a.curve || 0)*.25;
      const cls = a.tone === 'che' ? 'che' : a.tone === 'gold' ? 'gold' : 'ars';
      const marker = a.tone === 'che' ? `b-${board.id}` : a.tone === 'gold' ? `g-${board.id}` : `r-${board.id}`;
      body += `<path class="${cls}" d="M${a.x1} ${a.y1} Q${mx} ${my} ${a.x2} ${a.y2}" marker-end="url(#${marker})"/>`;
    });
    return `<svg class="td-ref-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${defs}${body}</svg>`;
  };

  const tokenHtml = (p) => {
    const pos = face[p.name];
    if (!pos) return '';
    const state = p.state ? ` ${p.state}` : '';
    return `<span class="td-token ${p.team}${state}" style="left:${p.x}%;top:${p.y}%" title="${p.name}" aria-label="${p.name}"><span class="td-token-face" style="--px:${pos[0]}%;--py:${pos[1]}%"></span></span>`;
  };

  const pitch = `<i class="td-ref-mark td-ref-touch-l"></i><i class="td-ref-mark td-ref-touch-r"></i><i class="td-ref-mark td-ref-half"></i><i class="td-ref-mark td-ref-circle"></i><i class="td-ref-mark td-ref-box-top"></i><i class="td-ref-mark td-ref-box-bottom"></i><i class="td-ref-mark td-ref-arc-top"></i><i class="td-ref-mark td-ref-arc-bottom"></i>`;
  const sections = [...page.querySelectorAll('.td-section')];

  boards.forEach((board, index) => {
    const section = sections[index];
    if (!section) return;
    const figure = document.createElement('figure');
    figure.className = 'td-reference-board';
    const zones = (board.zones || []).map((z) => `<span class="td-ref-zone ${z.tone}" style="left:${z.x}%;top:${z.y}%;width:${z.w}%;height:${z.h}%"></span>`).join('');
    figure.innerHTML = `<div class="td-reference-head"><p class="td-reference-kicker">Sa bàn ${board.id}</p><p class="td-reference-idea">${board.idea}</p></div><div class="td-reference-pitch">${pitch}${zones}${arrowSvg(board)}${board.players.map(tokenHtml).join('')}${board.ball ? `<span class="td-ref-ball" style="left:${board.ball[0]}%;top:${board.ball[1]}%">⚽</span>` : ''}</div><figcaption><b>Hình ${board.id}.</b> ${board.cap}</figcaption>`;
    const anchor = section.querySelector('.td-copy') || section.lastElementChild;
    anchor?.insertAdjacentElement('afterend', figure);
  });
})();