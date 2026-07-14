(() => {
  'use strict';

  const phone = '5531973453814';
  const title = document.querySelector('#detailTitle');
  const context = document.querySelector('#detailWhatsappContext');
  const ctas = [
    document.querySelector('#detailNavWhatsapp'),
    document.querySelector('#detailDiagnostic'),
    document.querySelector('#detailClosingCta'),
    document.querySelector('#detailWhatsappCta')
  ].filter(Boolean);

  if (ctas.length === 0) return;

  const getModuleName = () => {
    const moduleName = title?.textContent?.trim();
    return moduleName && moduleName !== 'Solução Cevora'
      ? moduleName
      : 'uma automação da Cevora';
  };

  const buildWhatsappUrl = () => {
    const moduleName = getModuleName();
    const message = `Olá! Vi a solução ${moduleName} no site da Cevora e quero entender se ela faz sentido para a minha clínica.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const updateLinks = () => {
    const moduleName = getModuleName();
    const whatsappUrl = buildWhatsappUrl();

    ctas.forEach((link) => {
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.removeAttribute('data-diagnostic-open');
    });

    document.querySelector('#detailDiagnostic span')?.replaceChildren(document.createTextNode('Conversar no WhatsApp'));
    document.querySelector('#detailClosingCta span')?.replaceChildren(document.createTextNode('Conversar no WhatsApp'));

    if (context) {
      context.textContent = moduleName === 'uma automação da Cevora'
        ? 'Conversa sobre a solução desta página'
        : `Conversa sobre ${moduleName}`;
    }
  };

  updateLinks();

  if (title && 'MutationObserver' in window) {
    const observer = new MutationObserver(updateLinks);
    observer.observe(title, { childList: true, characterData: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 6000);
  }

  window.addEventListener('pageshow', updateLinks);
})();
