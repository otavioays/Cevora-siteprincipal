(() => {
  'use strict';

  if (window.__cevoraGaneshaOfferLoaded) return;
  window.__cevoraGaneshaOfferLoaded = true;

  const STORAGE_KEY = 'cevora-ganesha-offer-dismissed';
  const IMAGE_SRC = 'data:image/webp;base64,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';

  if (sessionStorage.getItem(STORAGE_KEY) === 'true') return;

  const mount = () => {
    if (document.querySelector('#ganeshaOffer')) return;

    const widget = document.createElement('aside');
    widget.className = 'ganesha-offer';
    widget.id = 'ganeshaOffer';
    widget.setAttribute('aria-hidden', 'true');
    widget.innerHTML = `
      <button class="ganesha-offer__surface" type="button" aria-label="Ganhe acesso a tudo isso sem custo. Oferta exclusiva para algumas clínicas. Verificar disponibilidade.">
        <img src="${IMAGE_SRC}" alt="" width="600" height="200" decoding="async" />
      </button>
      <button class="ganesha-offer__close" type="button" aria-label="Fechar promoção">×</button>
    `;

    document.body.appendChild(widget);

    const surface = widget.querySelector('.ganesha-offer__surface');
    const close = widget.querySelector('.ganesha-offer__close');
    let shown = false;
    let timer;

    const show = () => {
      if (shown || sessionStorage.getItem(STORAGE_KEY) === 'true') return;
      shown = true;
      widget.classList.add('is-visible');
      widget.setAttribute('aria-hidden', 'false');
      window.removeEventListener('scroll', maybeShow);
    };

    const hide = (persist = true) => {
      window.clearTimeout(timer);
      widget.classList.remove('is-visible');
      widget.classList.add('is-closing');
      widget.setAttribute('aria-hidden', 'true');
      if (persist) sessionStorage.setItem(STORAGE_KEY, 'true');
      window.setTimeout(() => widget.remove(), 520);
    };

    const maybeShow = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (window.scrollY / scrollable >= .2) show();
    };

    const restoreDefaultContactCopy = () => {
      const modal = document.querySelector('#contactModal');
      if (!modal) return;
      const eyebrow = modal.querySelector('.modal__eyebrow');
      const title = modal.querySelector('#contactTitle');
      const copy = title?.nextElementSibling;
      const submit = modal.querySelector('.lead-form button[type="submit"] span');
      if (eyebrow) eyebrow.textContent = 'Implantação personalizada';
      if (title) title.textContent = 'Leve o Cevora Concierge para sua clínica.';
      if (copy) copy.textContent = 'Preencha os dados e deixe a Cevora preparar o próximo passo.';
      if (submit) submit.textContent = 'Solicitar apresentação';
    };

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-open="contact"]');
      if (trigger && !trigger.closest('#ganeshaOffer')) restoreDefaultContactCopy();
    }, true);

    surface?.addEventListener('click', () => {
      const modal = document.querySelector('#contactModal');
      if (!modal) return;

      const eyebrow = modal.querySelector('.modal__eyebrow');
      const title = modal.querySelector('#contactTitle');
      const copy = title?.nextElementSibling;
      const form = modal.querySelector('#leadForm');
      const submit = form?.querySelector('button[type="submit"] span');

      if (eyebrow) eyebrow.textContent = 'Promoção exclusiva';
      if (title) title.textContent = 'Veja se sua clínica ainda pode receber tudo isso sem custo.';
      if (copy) copy.textContent = 'Preencha os dados para confirmarmos se essa condição especial ainda está disponível para sua clínica.';
      if (submit) submit.textContent = 'Verificar disponibilidade';

      if (form && !form.querySelector('input[name="origem"]')) {
        const origin = document.createElement('input');
        origin.type = 'hidden';
        origin.name = 'origem';
        origin.value = 'Promoção Ganesha — acesso sem custo';
        form.appendChild(origin);
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      window.setTimeout(() => modal.querySelector('input')?.focus(), 90);
    });

    close?.addEventListener('click', (event) => {
      event.stopPropagation();
      hide(true);
    });

    window.addEventListener('scroll', maybeShow, { passive: true });
    timer = window.setTimeout(show, 5600);
    maybeShow();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();