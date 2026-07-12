(() => {
  'use strict';

  if (window.__cevoraGaneshaOfferLoaded) return;
  window.__cevoraGaneshaOfferLoaded = true;

  const mount = () => {
    if (document.querySelector('#ganeshaOffer')) return;

    const widget = document.createElement('aside');
    widget.className = 'ganesha-offer';
    widget.id = 'ganeshaOffer';
    widget.setAttribute('aria-hidden', 'true');
    widget.innerHTML = `
      <button class="ganesha-offer__cta ganesha-offer__cta--solo" type="button" aria-label="Quero receber tudo isso de graça">
        <span class="ganesha-offer__cta-kicker">Condição especial ativa</span>
        <strong>Quero receber <em>DE GRAÇA</em></strong>
        <i aria-hidden="true">↗</i>
      </button>
    `;

    document.body.appendChild(widget);

    const show = () => {
      widget.classList.add('is-visible');
      widget.setAttribute('aria-hidden', 'false');
      window.removeEventListener('scroll', maybeShow);
    };

    const maybeShow = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (window.scrollY / scrollable >= .2) show();
    };

    widget.querySelector('.ganesha-offer__cta')?.addEventListener('click', () => {
      window.location.href = 'oferta-gratis.html';
    });

    window.addEventListener('scroll', maybeShow, { passive: true });
    window.setTimeout(show, 5600);
    maybeShow();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();