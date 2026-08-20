(() => {
  const core = document.createElement('script');
  core.src = 'app-core.js?v=20260820-puskas-1';
  core.async = false;
  document.head.append(core);

  if (document.querySelector('.archive#archive') && !window.__N5_PUSKAS_PREVIEW_LOADER__) {
    window.__N5_PUSKAS_PREVIEW_LOADER__ = true;
    const preview = document.createElement('script');
    preview.src = 'puskas-preview.js?v=20260820-archive-fix-3';
    preview.async = false;
    document.head.append(preview);
  }

  const outsideLightLayouts = [
    'layout-bould',
    'layout-eight',
    'layout-language',
    'layout-photoessay',
    'layout-keystone',
    'layout-mask',
  ];
  const isOutsideLight = outsideLightLayouts.some((name) => document.body?.classList.contains(name));
  if (isOutsideLight && !window.__N5_NAD_WOW_LOADER__) {
    window.__N5_NAD_WOW_LOADER__ = true;

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'ngoai-anh-den-wow.css?v=20260820-nad-1';
    document.head.append(style);

    const experience = document.createElement('script');
    experience.src = 'ngoai-anh-den-wow.js?v=20260820-nad-1';
    experience.async = false;
    document.head.append(experience);

    const tuningStyle = document.createElement('link');
    tuningStyle.rel = 'stylesheet';
    tuningStyle.href = 'ngoai-anh-den-tuning.css?v=20260820-nad-2';
    document.head.append(tuningStyle);

    const tuning = document.createElement('script');
    tuning.src = 'ngoai-anh-den-tuning.js?v=20260820-nad-2';
    tuning.async = false;
    document.head.append(tuning);
  }

  const lingeringLayouts = [
    'layout-robben',
    'layout-hagi',
    'layout-baggio',
    'layout-summer',
    'layout-monument',
    'layout-prince',
  ];
  const isLingering = lingeringLayouts.some((name) => document.body?.classList.contains(name));
  if (isLingering && !window.__N5_CHUA_NGUOI_WOW_LOADER__) {
    window.__N5_CHUA_NGUOI_WOW_LOADER__ = true;

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'chua-nguoi-wow.css?v=20260820-cn-1';
    document.head.append(style);

    const tuning = document.createElement('link');
    tuning.rel = 'stylesheet';
    tuning.href = 'chua-nguoi-tuning.css?v=20260820-cn-1';
    document.head.append(tuning);

    const fixStyle = document.createElement('link');
    fixStyle.rel = 'stylesheet';
    fixStyle.href = 'chua-nguoi-fix.css?v=20260820-cn-fix-1';
    document.head.append(fixStyle);

    const experience = document.createElement('script');
    experience.src = 'chua-nguoi-wow.js?v=20260820-cn-1';
    experience.async = false;
    document.head.append(experience);

    const fix = document.createElement('script');
    fix.src = 'chua-nguoi-fix.js?v=20260820-cn-fix-1';
    fix.async = false;
    document.head.append(fix);
  }
})();