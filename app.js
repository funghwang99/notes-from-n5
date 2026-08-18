(() => {
  const loadSiteEnhancements = () => {
    if (!document.querySelector('.archive#archive, .home-collage')) return;
    [
      'retire-tuong-dai.js?v=20260818-retire-tuong-dai-2',
      'beckenbauer-preview.js?v=20260818-kaiser-1',
      'pele-preview.js?v=20260818-orei-1',
    ].forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.head.append(script);
    });
  };

  const base = document.createElement('script');
  base.src = 'app-base.js?v=20260818-orei-1';
  base.async = false;
  base.addEventListener('load', loadSiteEnhancements, { once:true });
  base.addEventListener('error', loadSiteEnhancements, { once:true });
  document.head.append(base);
})();
