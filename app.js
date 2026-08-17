(() => {
  const loadMonumentExperience = () => {
    const map = [
      ['layout-bergkamp', 'monument-bergkamp-wow.js'],
      ['layout-henry', 'monument-henry-wow.js'],
      ['layout-wright', 'monument-wright-wow.js'],
      ['layout-theseus', 'monument-adams-wow.js'],
    ];
    const match = map.find(([className]) => document.body.classList.contains(className));
    if (!match) return;
    const script = document.createElement('script');
    script.src = `${match[1]}?v=20260818-monuments-1`;
    script.defer = true;
    document.head.append(script);
  };

  const base = document.createElement('script');
  base.src = 'app-base.js?v=20260818-monuments-1';
  base.async = false;
  base.addEventListener('load', loadMonumentExperience, { once:true });
  base.addEventListener('error', loadMonumentExperience, { once:true });
  document.head.append(base);
})();
