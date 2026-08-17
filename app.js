(() => {
  const loadRetirementCleanup = () => {
    if (!document.querySelector('.archive#archive, .home-collage')) return;
    const script = document.createElement('script');
    script.src = 'retire-tuong-dai.js?v=20260818-retire-tuong-dai-2';
    script.defer = true;
    document.head.append(script);
  };

  const base = document.createElement('script');
  base.src = 'app-base.js?v=20260818-retire-tuong-dai-2';
  base.async = false;
  base.addEventListener('load', loadRetirementCleanup, { once:true });
  base.addEventListener('error', loadRetirementCleanup, { once:true });
  document.head.append(base);
})();
