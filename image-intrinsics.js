(() => {
  'use strict';

  if (window.__cevoraImageIntrinsicsLoaded) return;
  window.__cevoraImageIntrinsicsLoaded = true;

  const dimensions = new Map([
    ['assets/pomegranate.webp', [720, 720]],
    ['assets/pomegranate.svg', [720, 720]],
    ['assets/fortune-frog.svg', [640, 640]],
    ['assets/acquisition-lion.svg', [1200, 1200]],
    ['assets/prosperity-orange.svg', [1200, 1200]]
  ]);

  const apply = (root = document) => {
    root.querySelectorAll?.('img').forEach((image) => {
      const source = image.getAttribute('src');
      const size = dimensions.get(source);
      if (!size) return;

      if (!image.hasAttribute('width')) image.width = size[0];
      if (!image.hasAttribute('height')) image.height = size[1];
      if (!image.hasAttribute('decoding')) image.decoding = 'async';
    });
  };

  apply();

  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.matches?.('img')) apply(node.parentElement || document);
        else apply(node);
      });
    });

    if (document.querySelector('#prosperity-engine img')) observer.disconnect();
  });

  observer.observe(document.querySelector('main') || document.body, {
    childList: true,
    subtree: true
  });

  window.setTimeout(() => observer.disconnect(), 12000);
})();