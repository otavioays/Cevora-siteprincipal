(() => {
  'use strict';

  const href = 'pomegranate-symbol-v17.css?v=17.0';
  if (!document.querySelector(`link[data-cevora-pomegranate="v17"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.cevoraPomegranate = 'v17';
    document.head.appendChild(link);
  }

  document.querySelectorAll('.system-console__symbol, .detail-console__symbol').forEach((container) => {
    container.replaceChildren();
    container.setAttribute('role', 'img');
    container.setAttribute('aria-label', 'Romã, símbolo da Cevora');
  });
})();