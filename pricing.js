(() => {
  'use strict';

  if (window.__cevoraPricingLoaded) return;
  window.__cevoraPricingLoaded = true;

  const qs = (selector, scope = document) => scope.querySelector(selector);

  const products = [
    {
      section: '#produto',
      anchor: '.hero__support',
      key: 'concierge',
      label: 'Implantação personalizada',
      badge: 'Preço inicial',
      setup: '1.390',
      setupLabel: 'implantação',
      recurring: '297',
      recurringLabel: '/mês',
      note: 'Configuração personalizada, monitoramento e ajustes contínuos.'
    },
    {
      section: '#conversion',
      anchor: '.conversion__proof',
      key: 'conversion',
      label: 'Projeto completo',
      badge: 'Investimento',
      single: '2.390',
      singleLabel: 'pagamento único',
      note: 'Copy, design, desenvolvimento e rastreamento incluídos.'
    },
    {
      section: '#course',
      anchor: '.course__support',
      key: 'course',
      label: 'Acesso completo',
      badge: 'Entrada no ecossistema',
      single: '297',
      singleLabel: 'pagamento único',
      note: 'Formação completa, ferramentas práticas e plano de 90 dias.'
    },
    {
      section: '#acquisition',
      anchor: '.founders-note',
      key: 'acquisition',
      label: 'Condição de clínica fundadora',
      badge: 'Acesso antecipado',
      setup: '297',
      setupLabel: 'implantação',
      recurring: '147',
      recurringLabel: '/mês',
      note: 'Valor preservado para as clínicas que entrarem na primeira fase.'
    },
    {
      section: '#prosperity-engine',
      anchor: '.funnel__support',
      key: 'funnel',
      label: 'Implantação completa',
      badge: 'Oferta principal',
      setup: '4.990',
      setupLabel: 'implantação',
      recurring: '697',
      recurringLabel: '/mês',
      note: 'Mídia paga e ferramentas externas são contratadas separadamente.'
    }
  ];

  const money = (value, suffix = '') => `
    <span class="price-spotlight__currency">R$</span>
    <strong>${value}</strong>
    ${suffix ? `<em>${suffix}</em>` : ''}
  `;

  const render = (product) => {
    const split = product.setup && product.recurring;
    return `
      <aside class="price-spotlight price-spotlight--${split ? 'split' : 'single'}" data-price-card="${product.key}" aria-label="Preço do produto">
        <div class="price-spotlight__shine" aria-hidden="true"></div>
        <div class="price-spotlight__topline">
          <span class="price-spotlight__label"><i aria-hidden="true"></i>${product.label}</span>
          <span class="price-spotlight__badge">${product.badge}</span>
        </div>
        ${split ? `
          <div class="price-spotlight__tiers">
            <div class="price-spotlight__tier">
              <small>${product.setupLabel}</small>
              <div class="price-spotlight__amount">${money(product.setup)}</div>
            </div>
            <span class="price-spotlight__plus" aria-hidden="true">+</span>
            <div class="price-spotlight__tier price-spotlight__tier--monthly">
              <small>continuidade</small>
              <div class="price-spotlight__amount">${money(product.recurring, product.recurringLabel)}</div>
            </div>
          </div>
        ` : `
          <div class="price-spotlight__single-row">
            <div class="price-spotlight__amount">${money(product.single)}</div>
            <span>${product.singleLabel}</span>
          </div>
        `}
        <p>${product.note}</p>
      </aside>
    `;
  };

  const animateCard = (card) => {
    if (card.dataset.priceObserved) return;
    card.dataset.priceObserved = 'true';

    if (!('IntersectionObserver' in window)) {
      card.classList.add('is-price-visible');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        card.classList.add('is-price-visible');
        observer.disconnect();
      }
    }, { threshold: .3 });

    observer.observe(card);
  };

  const mountPrices = () => {
    let mounted = 0;

    products.forEach((product) => {
      const section = qs(product.section);
      if (!section) return;

      const existing = qs(`[data-price-card="${product.key}"]`, section);
      if (existing) {
        animateCard(existing);
        mounted += 1;
        return;
      }

      const anchor = qs(product.anchor, section);
      if (!anchor) return;

      anchor.insertAdjacentHTML('afterend', render(product));
      const card = qs(`[data-price-card="${product.key}"]`, section);
      if (card) {
        animateCard(card);
        mounted += 1;
      }
    });

    return mounted;
  };

  mountPrices();

  const observer = new MutationObserver(() => {
    const mounted = mountPrices();
    if (mounted === products.length) observer.disconnect();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.setTimeout(() => {
    mountPrices();
    observer.disconnect();
  }, 7000);
})();

(() => {
  if (document.querySelector('script[src="concierge-ai.js"]')) return;
  const script = document.createElement('script');
  script.src = 'concierge-ai.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  if (document.querySelector('script[src="atmosphere.js"]')) return;
  const script = document.createElement('script');
  script.src = 'atmosphere.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  if (document.querySelector('script[src="pricing-reflection.js"]')) return;
  const script = document.createElement('script');
  script.src = 'pricing-reflection.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  if (document.querySelector('script[src="fold-index.js"]')) return;
  const script = document.createElement('script');
  script.src = 'fold-index.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  if (document.querySelector('script[src="technical-frames.js"]')) return;
  const script = document.createElement('script');
  script.src = 'technical-frames.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  if (document.querySelector('script[src="conversion-editorial-reveal.js"]')) return;
  const script = document.createElement('script');
  script.src = 'conversion-editorial-reveal.js';
  script.defer = true;
  document.body.appendChild(script);
})();
