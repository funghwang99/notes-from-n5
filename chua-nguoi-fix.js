(() => {
  if (window.__N5_CHUA_NGUOI_FIX__) return;
  window.__N5_CHUA_NGUOI_FIX__ = true;

  const neymar = document.querySelector('.cn-neymar-mirage');
  if (neymar) {
    const word = neymar.querySelector('.cn-mirage-word');
    const small = word?.querySelector('small');
    if (word && small && !neymar.querySelector('.cn-mirage-subtitle')) {
      const subtitle = document.createElement('p');
      subtitle.className = 'cn-mirage-subtitle';
      subtitle.textContent = small.textContent || 'ALWAYS ONE HORIZON FARTHER';
      small.remove();
      word.after(subtitle);
    }
  }

  const ronaldo = document.querySelector('.cn-ronaldo-room .cn-room-corridor');
  if (ronaldo && !ronaldo.querySelector('.cn-room-trophy-door')) {
    const labels = [
      'PREMIER LEAGUE',
      'LA LIGA',
      'CHAMPIONS LEAGUE',
      "BALLON D'OR",
      'EURO',
      'GOLDEN BOOT',
      'RECORDS',
      'NATIONS LEAGUE',
    ];
    labels.forEach((label, index) => {
      const door = document.createElement('div');
      door.className = `cn-room-trophy-door td${index + 1}`;
      door.innerHTML = `<span>${label}</span>`;
      ronaldo.appendChild(door);
    });
  }
})();
