(() => {
  // Compatibility path for pages that still reference an older cached app.js.
  if (document.querySelector('script[data-n5-core-loader]')) return;
  const core = document.createElement('script');
  core.dataset.n5CoreLoader = 'true';
  core.src = 'app-core.js?v=20260820-perf-1';
  core.async = false;
  document.head.append(core);
})();
