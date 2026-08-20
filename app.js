(() => {
  const core = document.createElement('script');
  core.src = 'app-core.js?v=20260820-nad-1';
  core.async = false;
  document.head.append(core);

  const outsideLightLayouts = [
    'layout-bould',
    'layout-eight',
    'layout-language',
    'layout-photoessay',
    'layout-keystone',
    'layout-mask',
  ];
  const isOutsideLight = outsideLightLayouts.some((name) => document.body?.classList.contains(name));
  if (!isOutsideLight || window.__N5_NAD_WOW_LOADER__) return;
  window.__N5_NAD_WOW_LOADER__ = true;

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'ngoai-anh-den-wow.css?v=20260820-nad-1';
  document.head.append(style);

  const experience = document.createElement('script');
  experience.src = 'ngoai-anh-den-wow.js?v=20260820-nad-1';
  experience.async = false;
  document.head.append(experience);
})();
