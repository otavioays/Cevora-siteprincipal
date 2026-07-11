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
        origin.value = 'Promoção — acesso grátis';
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