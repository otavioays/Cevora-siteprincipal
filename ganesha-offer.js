(() => {
  'use strict';

  if (window.__cevoraGaneshaOfferLoaded) return;
  window.__cevoraGaneshaOfferLoaded = true;

  const OFFER_URL = 'oferta-gratis.html';

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

    const cta = widget.querySelector('.ganesha-offer__cta');
    let offerPrefetched = false;

    const prefetchOffer = () => {
      if (offerPrefetched || document.querySelector('link[data-offer-prefetch]')) return;
      offerPrefetched = true;

      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = OFFER_URL;
      link.as = 'document';
      link.dataset.offerPrefetch = 'true';
      document.head.appendChild(link);
    };

    const show = () => {
      widget.classList.add('is-visible');
      widget.setAttribute('aria-hidden', 'false');
      window.removeEventListener('scroll', maybeShow);
    };

    const maybeShow = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (window.scrollY / scrollable >= .2) show();
    };

    cta?.addEventListener('pointerenter', prefetchOffer, { once: true });
    cta?.addEventListener('focus', prefetchOffer, { once: true });
    cta?.addEventListener('touchstart', prefetchOffer, { once: true, passive: true });
    cta?.addEventListener('click', () => {
      prefetchOffer();
      window.location.assign(OFFER_URL);
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