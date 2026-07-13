(() => {
  'use strict';

  const openSolutionTab = (key) => {
    if (!key) return;
    const url = `solucao.html?modulo=${encodeURIComponent(key)}`;
    const tab = window.open(url, '_blank', 'noopener,noreferrer');
    if (tab) tab.opener = null;
  };

  const interactionStyle = document.createElement('style');
  interactionStyle.textContent = `
    .tech-card[data-detail-ready="true"] { cursor:pointer; }
    .tech-card[data-detail-ready="true"]:focus-visible {
      outline:1px solid var(--gold-bright);
      outline-offset:5px;
      border-color:rgba(240,204,130,.58);
      box-shadow:0 0 0 1px rgba(240,204,130,.12),0 24px 70px rgba(0,0,0,.42);
    }
    .tech-card[data-detail-ready="true"] [data-open-solution] { pointer-events:none; }
    .tech-card[data-detail-ready="true"] [data-open-solution]::after {
      content:"NOVA ABA";
      margin-left:auto;
      color:rgba(216,173,95,.42);
      font:7px/1 "Space Mono",monospace;
      letter-spacing:.12em;
    }
  `;
  document.head.appendChild(interactionStyle);

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
        action.setAttribute('tabindex', '-1');
        action.setAttribute('aria-hidden', 'true');
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