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
          <h3 class="ganesha-offer__title">Ganhe acesso a tudo isso <strong>DE GRAÇA</strong></h3>
          <p class="ganesha-offer__copy">Condição exclusiva liberada para algumas clínicas selecionadas.</p>
          <button class="ganesha-offer__cta" type="button">
            <span>Quero receber DE GRAÇA</span>
            <i aria-hidden="true">↗</i>
          </button>
          <span class="ganesha-offer__microcopy">Clique para verificar se a condição ainda está disponível</span>
        </div>
        <span class="ganesha-offer__system-line" aria-hidden="true"></span>
      </div>
    `;

    const cta = widget.querySelector('.ganesha-offer__cta');

    cta?.addEventListener('click', () => {
      const modal = document.querySelector('#contactModal');
      if (!modal) return;

      const eyebrow = modal.querySelector('.modal__eyebrow');
      const title = modal.querySelector('#contactTitle');
      const copy = title?.nextElementSibling;
      const form = modal.querySelector('#leadForm');
      const submit = form?.querySelector('button[type="submit"] span');

      if (eyebrow) eyebrow.textContent = 'Promoção exclusiva';
      if (title) title.textContent = 'Veja se sua clínica ainda pode receber tudo isso DE GRAÇA.';
      if (copy) copy.textContent = 'Preencha os dados para confirmarmos se essa condição especial ainda está disponível para sua clínica.';
      if (submit) submit.textContent = 'Quero receber DE GRAÇA';

      if (form && !form.querySelector('input[name="origem"]')) {
        const origin = document.createElement('input');
        origin.type = 'hidden';
        origin.name = 'origem';
        origin.value = 'Promoção Ganesha — acesso grátis';
        form.appendChild(origin);
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      window.setTimeout(() => modal.querySelector('input')?.focus(), 90);
    });

    widget.classList.remove('is-closing');
    widget.classList.add('is-visible');
    widget.setAttribute('aria-hidden', 'false');
    sessionStorage.removeItem('cevora-ganesha-offer-dismissed');

    return true;
  };

  if (enhance()) return;

  const observer = new MutationObserver(() => {
    if (enhance()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 10000);
})();