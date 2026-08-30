(() => {
  const freshHref = 'the-fifth-beatle.html?v=20260829-best-3';
  const fix = (root = document) => {
    root.querySelectorAll?.('a[href="the-fifth-beatle.html"], a[href^="the-fifth-beatle.html?v="]').forEach((link) => {
      if (link.getAttribute('href') !== freshHref) link.setAttribute('href', freshHref);
    });
  };
  fix();
  document.addEventListener('DOMContentLoaded', () => fix(), { once:true });
  window.addEventListener('load', () => fix(), { once:true });
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches?.('a[href="the-fifth-beatle.html"], a[href^="the-fifth-beatle.html?v="]')) node.href = freshHref;
        fix(node);
      });
    }
  });
  observer.observe(document.documentElement, { childList:true, subtree:true });

  if (!window.__N5_CHARLTON_PUBLISH_LOADER__) {
    window.__N5_CHARLTON_PUBLISH_LOADER__ = true;
    const publish = document.createElement('script');
    publish.src = 'charlton-publish.js?v=20260830-charlton-3';
    publish.async = false;
    document.head.append(publish);
  }
})();