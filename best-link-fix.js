(() => {
  const freshHref = 'the-fifth-beatle.html?v=20260829-best-3';

  const fix = (root = document) => {
    root.querySelectorAll?.('a[href="the-fifth-beatle.html"], a[href^="the-fifth-beatle.html?v="]').forEach((link) => {
      if (link.getAttribute('href') !== freshHref) link.setAttribute('href', freshHref);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => fix(), { once:true });
  } else {
    fix();
  }
  window.addEventListener('load', () => fix(), { once:true });
})();
