(() => {
  'use strict';

  if (window.__cevoraGaneshaDsLoaded) return;
  window.__cevoraGaneshaDsLoaded = true;

  const enhance = () => {
    const widget = document.querySelector('#ganeshaOffer');
    if (!widget || widget.dataset.dsReady === 'true') return Boolean(widget);

    widget.dataset.dsReady = 'true';
    widget.innerHTML = `
      <button class="ganesha-offer__cta ganesha-offer__cta--solo" type="button" aria-label="Quero receber tudo isso de graça">
        <span class="ganesha-offer__cta-kicker">Condição especial ativa</span>
        <strong>Quero receber <em>DE GRAÇA</em></strong>
        <i aria-hidden="true">↗</i>
      </button>
    `;

    const cta = widget.querySelector('.ganesha-offer__cta');

    cta?.addEventListener('click', () => {
      window.location.href = 'oferta-gratis.html';
    });

    widget.classList.remove('is-closing');
    widget.classList.add('is-visible');
    widget.setAttribute('aria-hidden', 'false');

    try {
      sessionStorage.removeItem('cevora-ganesha-offer-dismissed');
    } catch (_) {}

    return true;
  };

  if (enhance()) return;

  const observer = new MutationObserver(() => {
    if (enhance()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 10000);
})();