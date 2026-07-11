(() => {
  'use strict';

  if (window.__cevoraConversionSystemCaptionLoaded) return;
  window.__cevoraConversionSystemCaptionLoaded = true;

  const mount = () => {
    const visual = document.querySelector('#conversion .conversion__visual');
    if (!visual) return false;

    if (visual.querySelector('[data-conversion-system-caption]')) return true;

    const caption = document.createElement('div');
    caption.className = 'conversion-system-caption';
    caption.dataset.conversionSystemCaption = 'true';
    caption.setAttribute('aria-hidden', 'true');
    caption.innerHTML = `
      <i class="conversion-system-caption__dot"></i>
      <span class="conversion-system-caption__primary">Demonstração de teste</span>
      <b class="conversion-system-caption__line"></b>
      <span>2 variantes</span>
      <b class="conversion-system-caption__line"></b>
      <span>Leitura de conversão</span>
    `;

    visual.insertAdjacentElement('afterbegin', caption);
    return true;
  };

  if (!mount()) {
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });

    observer.observe(document.querySelector('main') || document.documentElement, {
      childList: true,
      subtree: true
    });

    window.setTimeout(() => {
      mount();
      observer.disconnect();
    }, 7000);
  }
})();

(() => {
  if (document.querySelector('script[src="conversion-lab-layout.js"]')) return;
  const script = document.createElement('script');
  script.src = 'conversion-lab-layout.js';
  script.defer = true;
  document.body.appendChild(script);
})();
