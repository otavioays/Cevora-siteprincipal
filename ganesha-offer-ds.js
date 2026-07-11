(() => {
  'use strict';

  if (window.__cevoraGaneshaDsLoaded) return;
  window.__cevoraGaneshaDsLoaded = true;

  const enhance = () => {
    const widget = document.querySelector('#ganeshaOffer');
    if (!widget || widget.dataset.dsReady === 'true') return Boolean(widget);

    const previousSurface = widget.querySelector('.ganesha-offer__surface');
    const existingImage = previousSurface?.querySelector('img');
    const imageSrc = existingImage?.getAttribute('src');
    if (!imageSrc) return false;

    widget.dataset.dsReady = 'true';
    widget.innerHTML = `
      <div class="ganesha-offer__panel">
        <div class="ganesha-offer__medallion" aria-hidden="true">
          <img src="${imageSrc}" alt="" decoding="async" />
        </div>
        <div class="ganesha-offer__content">
          <span class="ganesha-offer__eyebrow">Condição especial ativa</span>
          <h3 class="ganesha-offer__title">Ganhe acesso a tudo isso <strong>sem custo</strong></h3>
          <p class="ganesha-offer__copy">Oferta exclusiva liberada para algumas clínicas selecionadas.</p>
          <button class="ganesha-offer__cta" type="button">
            <span>Verificar disponibilidade</span>
            <i aria-hidden="true">↗</i>
          </button>
          <span class="ganesha-offer__microcopy">Clique para confirmar se ainda está disponível</span>
        </div>
        <span class="ganesha-offer__system-line" aria-hidden="true"></span>
        <button class="ganesha-offer__close" type="button" aria-label="Fechar promoção">×</button>
      </div>
    `;

    const cta = widget.querySelector('.ganesha-offer__cta');
    const close = widget.querySelector('.ganesha-offer__close');

    cta?.addEventListener('click', () => {
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

    close?.addEventListener('click', () => {
      widget.classList.remove('is-visible');
      widget.classList.add('is-closing');
      widget.setAttribute('aria-hidden', 'true');
      sessionStorage.setItem('cevora-ganesha-offer-dismissed', 'true');
      window.setTimeout(() => widget.remove(), 520);
    });

    return true;
  };

  if (enhance()) return;

  const observer = new MutationObserver(() => {
    if (enhance()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 10000);
})();