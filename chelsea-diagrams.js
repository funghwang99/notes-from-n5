(() => {
  const page = document.querySelector('.study-chelsea-2026');
  if (!page || page.dataset.n5ChelseaDiagrams) return;
  page.dataset.n5ChelseaDiagrams = '1';

  const css = document.createElement('style');
  css.textContent = `
    .td-match-diagram{margin:30px auto 0;max-width:980px;padding:18px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,#101820,#0b1117);box-shadow:0 18px 42px rgba(0,0,0,.2)}
    .td-match-diagram svg{display:block;width:100%;height:auto}
    .td-match-diagram figcaption{margin:12px 2px 0;color:#b5c0ca;font:500 .92rem/1.6 var(--sans,Inter,sans-serif)}
    .td-match-diagram figcaption b{color:#f5f7f8}
    .td-match-diagram .pitch{fill:#111b24;stroke:rgba(255,255,255,.14);stroke-width:2}
    .td-match-diagram .pitch-line{fill:none;stroke:rgba(255,255,255,.12);stroke-width:2}
    .td-match-diagram .ars{fill:#c63844;stroke:#ffd7da;stroke-width:2}
    .td-match-diagram .che{fill:#3377d6;stroke:#dce9ff;stroke-width:2}
    .td-match-diagram .node-label{fill:#fff;font:800 13px/1 var(--sans,Inter,sans-serif);text-anchor:middle;dominant-baseline:middle}
    .td-match-diagram .zone-red{fill:rgba(212,57,70,.1);stroke:rgba(235,107,116,.5);stroke-width:2;stroke-dasharray:8 8}
    .td-match-diagram .zone-blue{fill:rgba(51,119,214,.11);stroke:rgba(121,168,255,.48);stroke-width:2;stroke-dasharray:8 8}
    .td-match-diagram .zone-gold{fill:rgba(217,192,107,.1);stroke:rgba(217,192,107,.48);stroke-width:2;stroke-dasharray:8 8}
    .td-match-diagram .arrow-red,.td-match-diagram .arrow-blue,.td-match-diagram .arrow-gold{fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
    .td-match-diagram .arrow-red{stroke:#eb6b74}.td-match-diagram .arrow-blue{stroke:#79a8ff}.td-match-diagram .arrow-gold{stroke:#d9c06b}
    .td-match-diagram .ghost{fill:none;stroke:rgba(215,221,229,.42);stroke-width:3;stroke-dasharray:9 8}
    .td-match-diagram .tag{fill:#0b1218;stroke:rgba(255,255,255,.14);stroke-width:1.5}
    .td-match-diagram .tag-title{fill:#f6f8fa;font:800 12px/1 var(--sans,Inter,sans-serif)}
    .td-match-diagram .tag-copy{fill:#9fb0c0;font:600 10.5px/1 var(--sans,Inter,sans-serif)}
    .td-match-diagram .zone-label{fill:#9fb0c0;font:800 10px/1 var(--sans,Inter,sans-serif);letter-spacing:.08em}
    @media(max-width:720px){.td-match-diagram{padding:10px;margin-top:22px}.td-match-diagram figcaption{font-size:.86rem}}
  `;
  document.head.append(css);

  const diagrams = {
    '00': {
      caption:'Chelsea khóa giữa bằng một box năm người. Arsenal đi ra cánh để kéo khối lệch đi, sau đó quay lại đánh vào khoảng trống vừa mở ở trung lộ.',
      zones:[['blue',238,116,276,186,'CENTRAL BOX'],['red',548,105,120,225,'OVERLOAD'],['gold',337,155,92,134,'RE-ENTRY']],
      ars:[['S',616,118],['W',590,192],['Ø',538,238],['R',498,296],['H',582,286]],
      che:[['P',310,168],['JP',380,128],['R',450,168],['J',322,232],['L',438,232]],
      arrows:[['red',582,286,612,205],['red',616,118,582,220],['gold',538,238,405,225]],
      tags:[['Chelsea khóa giữa',45,42],['Arsenal kéo khối sang biên',500,365]]
    },
    '01': {
      caption:'Chỉ giữ width chưa đủ. Chelsea chấp nhận Arsenal có bóng ở biên miễn là khối trung tâm vẫn giữ được hình dạng.',
      zones:[['blue',228,90,304,205,'CENTRAL SHIELD'],['gold',52,55,122,310,'WIDE'],['gold',586,55,122,310,'WIDE']],
      ars:[['LW',110,108],['RW',650,108]],
      che:[['P',305,130],['JP',380,112],['R',455,130],['J',327,210],['L',433,210]],
      arrows:[['red',150,108,248,116],['red',610,108,512,116]],
      tags:[['Biên được nhường',52,28],['5 người bảo vệ trung lộ',263,320]]
    },
    '02': {
      caption:'Saka, White, Ødegaard, Rice và Havertz cùng dồn vào cánh phải. Chelsea không còn xử lý một cặp winger–full-back mà là cả một cụm năm người.',
      zones:[['red',474,54,218,306,'RIGHT-SIDE OVERLOAD']],
      ars:[['S',640,98],['W',603,165],['Ø',551,216],['R',510,274],['H',608,286]],
      che:[['WB',646,182],['CB',598,120],['J',564,165],['R',528,130]],
      arrows:[['red',510,274,548,220],['red',551,216,592,167],['red',608,286,618,198],['red',640,98,628,164]],
      tags:[['5 Arsenal players / 1 corridor',48,55],['Chelsea bị overload',48,320]]
    },
    '03': {
      caption:'5-4-1 che biên tốt hơn trên sơ đồ, nhưng Palmer và Rogers phải hồi vị trí rất xa. Những pha chạy phía sau họ vẫn còn đất diễn.',
      zones:[['blue',70,128,620,150,'5—4—1 MIDFIELD LINE']],
      ars:[['RW',112,82],['LW',648,82]],
      che:[['P',160,205],['J',290,205],['L',470,205],['R',600,205],['JP',380,124]],
      arrows:[['red',112,82,178,148],['red',648,82,582,148]],
      ghost:[[160,120,225,58],[600,120,535,58]],
      tags:[['Wide midfielders phải chạy về rất xa',52,306]]
    },
    '04': {
      caption:'Khi James hoặc Lavia dịch ngang để cứu cánh đang bị overload, khoảng trống trong trung lộ xuất hiện. Đây mới là đích đến thật sự của Arsenal.',
      zones:[['red',496,82,176,260,'OVERLOAD'],['gold',296,140,126,132,'INSIDE SPACE']],
      ars:[['S',600,108],['W',566,168],['Ø',536,226],['H',610,258]],
      che:[['L',380,206],['J',320,180]],
      arrows:[['blue',320,180,518,178],['gold',536,226,410,206]],
      tags:[['Pivot bị kéo lệch',62,58],['Biên tạo ra khoảng trống ở giữa',448,350]]
    },
    '05': {
      caption:'Rice hoặc Lewis-Skelly lùi xuống kéo một pivot bước lên. Người còn lại bị cô lập, còn Ødegaard và Calafiori có thể nhận bóng phía sau lớp pressing.',
      zones:[['gold',274,150,216,100,'BETWEEN THE LINES']],
      ars:[['R',280,300],['Ø',388,185],['C',468,176]],
      che:[['J',336,240],['L',430,210]],
      arrows:[['red',280,300,328,248],['gold',388,185,445,184],['gold',468,176,536,136]],
      tags:[['Kéo pivot bước lên',70,58],['Khoảng sau lớp pressing mở ra',434,296]]
    },
    '06': {
      caption:'Calafiori di chuyển vào half-space kéo Neto đi theo. Chỉ riêng chuyển động đó đã làm back five méo hình và mở khoảng trống ngoài biên.',
      zones:[['red',122,84,162,248,'OUTSIDE SPACE'],['gold',246,128,166,154,'HALF-SPACE']],
      ars:[['C',178,314]],
      che:[['N',252,234],['A',150,168],['CB',224,158],['CB',300,150],['CB',376,152]],
      arrows:[['red',178,314,292,196],['blue',252,234,310,198]],
      tags:[['Calafiori kéo reference vào trong',454,54],['Back five mất hình dạng',454,304]]
    },
    '07': {
      caption:'Đổi từ back three sang back two giúp Arsenal dồn thêm người lên cao, nhưng khi counterpress bị vượt qua thì hai hành lang chuyển trạng thái mở ra rất nhanh.',
      zones:[['blue',34,52,150,316,'TRANSITION LANE'],['blue',576,52,150,316,'TRANSITION LANE']],
      ars:[['CB',282,334],['CB',476,334],['S',208,164],['W',286,186],['Ø',366,204],['H',442,190],['M',528,164]],
      che:[['R',128,96],['P',380,98],['N',632,96]],
      arrows:[['blue',128,96,252,262],['blue',380,98,382,260],['blue',632,96,508,262]],
      tags:[['Back two + nhiều người đứng cao',220,46]]
    },
    '08': {
      caption:'Khi có bóng Chelsea chuyển sang cấu trúc hybrid: Palmer bó vào, RCB dâng lên half-space, Neto giữ biên. Arsenal đáp lại bằng 4-4-2 khá thận trọng.',
      zones:[['blue',454,62,158,278,'NETO WIDE / PALMER INSIDE']],
      ars:[['H',286,170],['Ø',344,150],['LM',250,232],['CM',326,236],['CM',402,236],['RM',478,232]],
      che:[['N',586,96],['RCB',512,172],['P',432,144],['J',336,184],['L',396,214],['R',486,208]],
      arrows:[['blue',512,172,576,106],['blue',432,144,362,176]],
      tags:[['Chelsea biến hình khi có bóng',54,54],['Arsenal giữ 4—4—2 trung block',58,318]]
    },
    '09': {
      caption:'Arsenal không cần loại Palmer khỏi trận. Họ buộc anh lùi sâu gần James và Lavia để chạm bóng, tức nhận bóng ở nơi ít nguy hiểm hơn.',
      zones:[['gold',294,52,172,90,'DANGEROUS #10 ZONE']],
      ars:[['A',380,154]],
      che:[['P',380,100],['J',328,204],['L',432,204]],
      arrows:[['blue',380,100,350,184],['red',380,154,380,118]],
      ghost:[[380,100,380,238]],
      tags:[['Palmer vẫn có bóng',494,78],['Nhưng xa khung thành hơn',58,300]]
    }
  };

  const node = (team,[label,x,y]) => `<circle cx="${x}" cy="${y}" r="20" class="${team}"></circle><text x="${x}" y="${y+1}" class="node-label">${label}</text>`;
  const zone = ([kind,x,y,w,h,label]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" class="zone-${kind}"></rect><text x="${x+10}" y="${Math.max(18,y-8)}" class="zone-label">${label}</text>`;
  const arrow = ([kind,x1,y1,x2,y2],id) => `<path d="M${x1} ${y1} C${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}" class="arrow-${kind}" marker-end="url(#${id}-${kind})"></path>`;
  const tag = ([text,x,y]) => `<rect x="${x}" y="${y}" width="220" height="46" rx="11" class="tag"></rect><text x="${x+14}" y="${y+27}" class="tag-title">${text}</text>`;

  const make = (key,data) => {
    const id = `tdm-${key}`;
    const svg = `
      <svg viewBox="0 0 760 420" role="img" aria-label="Tactical illustration ${key}">
        <defs>
          <marker id="${id}-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#eb6b74"></path></marker>
          <marker id="${id}-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#79a8ff"></path></marker>
          <marker id="${id}-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#d9c06b"></path></marker>
        </defs>
        <rect x="20" y="20" width="720" height="380" rx="26" class="pitch"></rect>
        <line x1="380" y1="20" x2="380" y2="400" class="pitch-line"></line>
        <circle cx="380" cy="210" r="50" class="pitch-line"></circle>
        ${(data.zones||[]).map(zone).join('')}
        ${(data.ghost||[]).map(([x1,y1,x2,y2])=>`<path d="M${x1} ${y1} L${x2} ${y2}" class="ghost"></path>`).join('')}
        ${(data.che||[]).map(p=>node('che',p)).join('')}
        ${(data.ars||[]).map(p=>node('ars',p)).join('')}
        ${(data.arrows||[]).map(a=>arrow(a,id)).join('')}
        ${(data.tags||[]).map(tag).join('')}
      </svg>`;
    const figure = document.createElement('figure');
    figure.className = 'td-match-diagram reveal is-visible';
    figure.innerHTML = `${svg}<figcaption><b>Hình ${key}.</b> ${data.caption}</figcaption>`;
    return figure;
  };

  [...page.querySelectorAll('.td-section')].forEach((section) => {
    const label = section.querySelector('.td-head > p')?.textContent?.trim();
    const key = label?.match(/^(\d{2})/)?.[1];
    if (!key || !diagrams[key] || section.querySelector('.td-match-diagram')) return;
    const copy = section.querySelector('.td-copy');
    if (!copy) return;
    copy.insertAdjacentElement('afterend', make(key, diagrams[key]));
  });
})();
