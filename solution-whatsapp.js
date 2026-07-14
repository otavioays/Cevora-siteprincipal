(() => {
  'use strict';

  const phone = ['55', '31', '97345', '3814'].join('');
  const button = document.querySelector('#detailWhatsappCta');
  const title = document.querySelector('#detailTitle');
  const context = document.querySelector('#detailWhatsappContext');

  if (!button) return;

  const updateLink = () => {
    const moduleName = title?.textContent?.trim();
    const validName = moduleName && moduleName !== 'Solução Cevora'
      ? moduleName
      : 'uma automação da Cevora';

    const message = `Olá! Vi a solução ${validName} no site da Cevora e quero entender se ela faz sentido para a minha clínica.`;
    button.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    if (context) {
      context.textContent = validName === 'uma automação da Cevora'
        ? 'Conversa sobre a solução desta página'
        : `Conversa sobre ${validName}`;
    }
  };

  updateLink();

  if (title && 'MutationObserver' in window) {
    const observer = new MutationObserver(updateLink);
    observer.observe(title, { childList: true, characterData: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 4000);
  }
})();
