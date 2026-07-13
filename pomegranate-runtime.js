(() => {
  'use strict';

  const source = 'assets/pomegranate-cevora.svg';

  const replacePomegranate = () => {
    document.querySelectorAll('img[src*="pomegranate"]').forEach((image) => {
      if (image.getAttribute('src') === source) return;
      image.setAttribute('src', source);
      image.setAttribute('alt', 'Romã, símbolo da Cevora');
      image.decoding = 'async';
    });
  };

  replacePomegranate();

  const observer = new MutationObserver(replacePomegranate);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
})();