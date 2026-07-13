(() => {
  'use strict';

  const interactionStyle = document.createElement('style');
  interactionStyle.textContent = `
    .tech-card[data-detail-ready="true"] {
      position:relative;
      cursor:pointer;
    }

    .tech-card__detail-link {
      position:absolute;
      inset:0;
      z-index:20;
      display:block;
      border-radius:inherit;
      cursor:pointer;
    }

    .tech-card:has(.tech-card__detail-link:focus-visible) {
      outline:1px solid var(--gold-bright);
      outline-offset:5px;
      border-color:rgba(240,204,130,.58);
      box-shadow:0 0 0 1px rgba(240,204,130,.12),0 24px 70px rgba(0,0,0,.42);
    }

    .tech-card[data-detail-ready="true"] [data-open-solution] {
      pointer-events:none;
    }

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

      const key = card.dataset.solution;
      const title = card.querySelector('h3')?.textContent?.trim() || 'solução';
      const detailUrl = `solucao.html?modulo=${encodeURIComponent(key)}`;

      card.dataset.detailReady = 'true';
      card.removeAttribute('role');
      card.removeAttribute('tabindex');
      card.removeAttribute('aria-label');

      const detailLink = document.createElement('a');
      detailLink.className = 'tech-card__detail-link';
      detailLink.href = detailUrl;
      detailLink.target = '_blank';
      detailLink.rel = 'noopener noreferrer';
      detailLink.setAttribute('aria-label', `Abrir explicação de ${title} em nova aba`);
      card.appendChild(detailLink);

      const action = card.querySelector('[data-open-solution]');
      if (action) {
        const label = action.querySelector('span');
        if (label) label.textContent = 'Entender a solução';
        action.setAttribute('tabindex', '-1');
        action.setAttribute('aria-hidden', 'true');
      }
    });
  };

  prepareCards();

  const observer = new MutationObserver(prepareCards);
  observer.observe(document.querySelector('#technologyGrid') || document.documentElement, {
    childList: true,
    subtree: true
  });
  window.setTimeout(() => observer.disconnect(), 8000);

  const pomegranate = document.createElement('script');
  pomegranate.src = 'pomegranate-runtime.js';
  pomegranate.dataset.pomegranateRuntime = 'true';
  document.body.appendChild(pomegranate);

  const core = document.createElement('script');
  core.src = 'solutions-page-core.js';
  core.dataset.solutionsCore = 'true';
  document.body.appendChild(core);

  const pricing = document.createElement('script');
  pricing.src = 'automation-pricing.js';
  pricing.dataset.automationPricing = 'true';
  document.body.appendChild(pricing);
})();