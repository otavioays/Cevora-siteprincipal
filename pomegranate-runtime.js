(() => {
  'use strict';

  const styleHref = 'styles-pomegranate-css.css';

  if (!document.querySelector(`link[href="${styleHref}"]`)) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = styleHref;
    style.dataset.pomegranateCss = 'true';
    document.head.appendChild(style);
  }

  const markup = `
    <span class="cevora-pomegranate" role="img" aria-label="Romã, símbolo da Cevora">
      <span class="cevora-pomegranate__crown" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <span class="cevora-pomegranate__collar" aria-hidden="true"></span>
      <span class="cevora-pomegranate__seeds" aria-hidden="true"></span>
      <span class="cevora-pomegranate__body" aria-hidden="true"><i class="cevora-pomegranate__vein"></i></span>
      <span class="cevora-pomegranate__shadow" aria-hidden="true"></span>
    </span>
  `;

  const mount = () => {
    document.querySelectorAll('.system-console__symbol, .detail-console__symbol').forEach((container) => {
      if (container.classList.contains('has-css-pomegranate')) return;
      container.classList.add('has-css-pomegranate');
      container.removeAttribute('aria-label');
      container.innerHTML = markup;
    });
  };

  mount();

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
})();