/* Notes from N5 — The Island He Chose: exhibition edition.
   Progressive enhancement: full article and 15 original paragraphs remain
   readable without this script. Only decorative layout elements are built. */
(() => {
  const root = document.querySelector('.riva-page');
  if (!root) return;
  const path = 'M219 53 C234 38 253 48 265 54 C281 41 301 54 309 72 C322 86 302 102 301 119 C314 133 298 153 310 170 C322 194 310 212 324 231 C324 256 317 275 309 299 C315 322 315 337 306 356 C296 381 285 396 281 418 C266 449 257 467 240 488 C225 501 205 506 191 500 C173 491 165 478 151 467 C140 448 145 437 138 423 C129 409 131 395 124 381 C109 369 108 348 102 330 C99 309 112 293 106 274 C97 244 101 220 116 203 C116 180 123 167 128 149 C136 127 150 113 160 99 C159 78 193 59 219 53 Z';
  const islandSvg = cls => `<svg class="${cls}" viewBox="0 0 430 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g class="rv-island-rings" fill="none" stroke="currentColor" stroke-width=".75" opacity=".23"><circle cx="214" cy="294" r="184"/><circle cx="214" cy="294" r="237"/><circle cx="214" cy="294" r="294"/></g><path class="rv-island-fill" d="${path}" fill="currentColor" opacity=".09"/><path class="rv-island-stroke" d="${path}" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/><path class="rv-island-route" d="M 192 60 C 108 149 127 330 211 461" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 7" opacity=".58"/><circle cx="211" cy="461" r="6" fill="currentColor"/><circle cx="211" cy="461" r="15" fill="none" stroke="currentColor" stroke-width=".75"/><text x="238" y="468" fill="currentColor" font-family="Arial,sans-serif" font-size="16" letter-spacing="3">CAGLIARI</text></svg>`;
  const element = html => {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  const hero = document.querySelector('.rv-hero');
  if (hero && !hero.querySelector('.rv-cover-map')) {
    const folio = hero.querySelector('.rv-hero-folio');
    if (folio) {
      folio.before(element('<div class="rv-cover-number" aria-hidden="true"><span>EDITION</span><strong>11</strong><small>THE IMMORTALS</small></div>'));
      folio.before(element('<div class="rv-cover-map" aria-hidden="true">' + islandSvg('rv-cover-island') + '</div>'));
      folio.before(element('<div class="rv-cover-decor" aria-hidden="true"><span>1963 / A STRANGER</span><i></i><span>2024 / A SON</span></div>'));
    }
    const title = hero.querySelector('#riva-title');
    if (title) title.innerHTML = '<span class="rv-hero-title-line rv-hero-word--one">The</span><span class="rv-hero-title-line rv-hero-word--two">Island</span><span class="rv-hero-title-line rv-hero-word--three"><em>He Chose.</em></span>';
    const bottom = hero.querySelector('.rv-hero-bottom');
    if (bottom) bottom.appendChild(element('<span class="rv-hero-coordinate">39°13′ N / 9°07′ E</span>'));
  }
  const index = document.querySelector('.rv-index');
  if (index && !document.querySelector('.rv-overture')) {
    index.after(element('<aside class="rv-overture" aria-label="Một hành trình từ đất liền đến đảo Sardinia"><div class="rv-overture-edge"><span>A LIFE, IN FIVE ACTS</span><span>01 — 05</span></div><div class="rv-overture-main"><span class="rv-overture-year">1963.</span><strong>Một người xa lạ.<br><em>Một nơi để thuộc về.</em></strong></div><div class="rv-overture-route"><span>LEGNANO / MAINLAND</span><i aria-hidden="true"></i><span>CAGLIARI / SARDEGNA</span></div></aside>'));
  }
  const arrival = document.querySelector('#rv-arrival .rv-folio');
  if (arrival && !document.querySelector('.rv-arrival-masthead')) arrival.after(element('<div class="rv-arrival-masthead" aria-hidden="true"><span>CAPITOLO I</span><strong>18</strong><span>YEARS OLD / A DIFFERENT WORLD</span></div>'));
  const score = document.querySelector('#rv-rise .rv-scudetto');
  const goal = score && score.nextElementSibling;
  if (score && goal && goal.classList.contains('rv-cinéma') && !document.querySelector('.rv-scudetto-stage')) {
    const stage = element('<div class="rv-scudetto-stage"><div class="rv-scudetto-stage-head"><span>12 APRILE 1970 / AMSICORA</span><strong>SCUDETTO.</strong></div><div class="rv-scudetto-stage-grid"></div></div>');
    score.before(stage);
    const grid = stage.querySelector('.rv-scudetto-stage-grid');
    grid.append(score, goal);
  }
  const choice = document.querySelector('.rv-choice');
  if (choice && !choice.classList.contains('rv-choice--exhibition')) {
    choice.classList.add('rv-choice--exhibition');
    const main = choice.querySelector('.rv-choice-main');
    if (main) main.innerHTML = '<div class="rv-choice-panel rv-choice-panel--north"><span class="rv-choice-panel-label">01 / THE ROAD AWAY</span><strong class="rv-choice-word">TORINO</strong><span class="rv-choice-verdict">LEAVE.</span></div><div class="rv-choice-crosshair" aria-hidden="true"><span>OR</span></div><div class="rv-choice-panel rv-choice-panel--island">' + islandSvg('rv-choice-island') + '<span class="rv-choice-panel-label">02 / THE HOME HE CHOSE</span><strong class="rv-choice-word">SARDEGNA</strong><span class="rv-choice-verdict">STAY.</span></div>';
    const foot = choice.querySelector('.rv-choice-foot');
    if (main) main.before(element('<div class="rv-choice-intro" aria-hidden="true"><span>A CROSSROAD</span><strong>1973<span>.</span></strong><p>Two paths. One life.</p></div>'));
    if (foot) foot.before(element('<div class="rv-choice-statement"><span>AFTER ALL THESE YEARS</span><strong>He stayed.</strong><span>1973 · CAGLIARI</span></div>'));
  }
  const after = document.getElementById('rv-after');
  if (after && !document.querySelector('.rv-intermission')) after.before(element('<div class="rv-intermission" aria-hidden="true"><span>ROMBO DI TUONO</span><strong>IL NUMERO <i>11.</i></strong><span>THE REST OF A LIFE</span></div>'));
  const farewell = document.querySelector('#rv-farewell');
  if (farewell && !farewell.querySelector('.rv-farewell-map')) {
    farewell.prepend(element('<div class="rv-farewell-map" aria-hidden="true">' + islandSvg('rv-farewell-island') + '</div>'));
    const finale = farewell.querySelector('.rv-finale');
    const lastText = finale?.querySelector('strong');
    if (lastText) lastText.before(element('<div class="rv-finale-island" aria-hidden="true">' + islandSvg('rv-finale-outline') + '</div>'));
  }
  root.classList.add('rv-exhibition-ready');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const reveal = [...root.querySelectorAll('.rv-photo, .rv-cinéma, .rv-double, .rv-scudetto-stage, .rv-choice-main, .rv-numbers, .rv-bonaria, .rv-finale')];
    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('rv-visible');
        io.unobserve(entry.target);
      }
    }, {rootMargin:'0px 0px 20px 0px',threshold:0.03});
    reveal.forEach(node => {node.classList.add('rv-reveal');io.observe(node)});
    root.classList.add('rv-motion-on');
  }
})();
