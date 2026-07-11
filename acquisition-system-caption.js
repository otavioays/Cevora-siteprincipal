(() => {
  'use strict';

  if (window.__cevoraAcquisitionSystemCaptionLoaded) return;
  window.__cevoraAcquisitionSystemCaptionLoaded = true;

  const mount = () => {
    const visual = document.querySelector('#acquisition .acquisition__visual');
    if (!visual) return false;

    if (visual.querySelector('[data-acquisition-system-caption]')) return true;

    const caption = document.createElement('div');
    caption.className = 'acquisition-system-caption';
    caption.dataset.acquisitionSystemCaption = 'true';
    caption.setAttribute('aria-hidden', 'true');
    caption.innerHTML = `
      <i class="acquisition-system-caption__dot"></i>
      <span class="acquisition-system-caption__primary">Protótipo visual</span>
      <b class="acquisition-system-caption__line"></b>
      <span>4 fontes representadas</span>
      <b class="acquisition-system-caption__line"></b>
      <span>Análise por procedimento</span>
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
