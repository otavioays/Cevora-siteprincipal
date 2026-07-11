(() => {
  'use strict';

  if (window.__cevoraFunnelSystemCaptionLoaded) return;
  window.__cevoraFunnelSystemCaptionLoaded = true;

  const mount = () => {
    const visual = document.querySelector('#prosperity-engine .funnel__visual');
    if (!visual) return false;

    if (visual.querySelector(':scope > [data-funnel-system-caption]')) return true;

    const caption = document.createElement('div');
    caption.className = 'funnel-system-caption';
    caption.dataset.funnelSystemCaption = 'true';
    caption.setAttribute('aria-hidden', 'true');
    caption.innerHTML = `
      <i class="funnel-system-caption__dot"></i>
      <span class="funnel-system-caption__primary">Modo demonstração</span>
      <b class="funnel-system-caption__line"></b>
      <span>5 módulos conectados</span>
      <b class="funnel-system-caption__line"></b>
      <span>Fluxo operacional</span>
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
