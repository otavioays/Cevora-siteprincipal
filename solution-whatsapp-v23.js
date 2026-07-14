(() => {
  'use strict';

  const PHONE = '5531973453814';
  const SELECTOR = '[data-whatsapp-cta]';

  const getModuleName = () => {
    const title = document.querySelector('#detailTitle');
    const value = title && title.textContent ? title.textContent.trim() : '';
    return value && value !== 'Solução Cevora' ? value : 'uma automação da Cevora';
  };

  const buildUrl = () => {
    const message = `Olá! Vi a solução ${getModuleName()} no site da Cevora e quero entender se ela faz sentido para a minha clínica.`;
    return `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(message)}`;
  };

  const syncLinks = () => {
    const url = buildUrl();
    document.querySelectorAll(SELECTOR).forEach((link) => {
      link.href = url;
      link.removeAttribute('target');
      link.removeAttribute('data-diagnostic-open');
    });

    const context = document.querySelector('#detailWhatsappContext');
    if (context) context.textContent = `Conversa sobre ${getModuleName()}`;
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest(SELECTOR);
    if (!link) return;

    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    window.location.assign(buildUrl());
  }, true);

  syncLinks();
  window.addEventListener('pageshow', syncLinks);

  const title = document.querySelector('#detailTitle');
  if (title && 'MutationObserver' in window) {
    const observer = new MutationObserver(syncLinks);
    observer.observe(title, { childList: true, characterData: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 8000);
  }
})();