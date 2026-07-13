(() => {
  'use strict';

  const openSolutionTab = (key) => {
    if (!key) return;
    const url = `solucao.html?modulo=${encodeURIComponent(key)}`;
    const tab = window.open(url, '_blank', 'noopener,noreferrer');
    if (tab) tab.opener = null;
  };

  const prepareCards = () => {
    document.querySelectorAll('.tech-card[data-solution]').forEach((card) => {
      if (card.dataset.detailReady === 'true') return;
      card.dataset.detailReady = 'true';
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Abrir explicação de ${card.querySelector('h3')?.textContent || 'solução'} em nova aba`);

      const action = card.querySelector('[data-open-solution]');
      if (action) {
        const label = action.querySelector('span');
        if (label) label.textContent = 'Entender a solução';
        action.setAttribute('aria-label', `Abrir explicação de ${card.querySelector('h3')?.textContent || 'solução'} em nova aba`);
      }

      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openSolutionTab(card.dataset.solution);
      });
    });
  };

  document.addEventListener('click', (event) => {
    const card = event.target.closest('.tech-card[data-solution]');
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openSolutionTab(card.dataset.solution);
  }, true);

  prepareCards();
  const observer = new MutationObserver(prepareCards);
  observer.observe(document.querySelector('#technologyGrid') || document.documentElement, {
    childList: true,
    subtree: true
  });
  window.setTimeout(() => observer.disconnect(), 8000);

  const core = document.createElement('script');
  core.src = 'solutions-page-core.js';
  core.dataset.solutionsCore = 'true';
  document.body.appendChild(core);
})();