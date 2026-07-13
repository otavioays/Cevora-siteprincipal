(() => {
  'use strict';

  const pomegranateHref = 'pomegranate-symbol-v17.css?v=17.0';
  if (!document.querySelector('link[data-cevora-pomegranate="v17"]')) {
    const pomegranateStyle = document.createElement('link');
    pomegranateStyle.rel = 'stylesheet';
    pomegranateStyle.href = pomegranateHref;
    pomegranateStyle.dataset.cevoraPomegranate = 'v17';
    document.head.appendChild(pomegranateStyle);
  }

  const PRICE = 'R$ 200';

  const style = document.createElement('style');
  style.textContent = `
    .catalog-price-note {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:24px;
      margin:18px 0 32px;
      padding:18px 20px;
      border:1px solid rgba(216,173,95,.28);
      background:linear-gradient(110deg,rgba(216,173,95,.08),rgba(15,11,8,.82),rgba(125,17,29,.08));
      box-shadow:0 18px 50px rgba(0,0,0,.22);
    }
    .catalog-price-note span,
    .tech-card__price span,
    .detail-price span {
      font:9px/1.3 "Space Mono",ui-monospace,monospace;
      letter-spacing:.13em;
      text-transform:uppercase;
      color:rgba(216,173,95,.58);
    }
    .catalog-price-note strong {
      font-family:"Cormorant Garamond",Georgia,serif;
      font-size:clamp(24px,2.5vw,36px);
      font-weight:500;
      color:var(--gold-bright,#f0cc82);
    }
    .tech-card__price {
      position:relative;
      z-index:2;
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      margin:20px 0 2px;
      padding:13px 14px;
      border:1px solid rgba(216,173,95,.22);
      background:rgba(216,173,95,.055);
    }
    .tech-card__price strong {
      font-family:"Cormorant Garamond",Georgia,serif;
      font-size:25px;
      font-weight:600;
      line-height:1;
      color:var(--gold-bright,#f0cc82);
      white-space:nowrap;
    }
    .detail-price {
      display:inline-flex;
      align-items:center;
      gap:22px;
      margin:26px 0 4px;
      padding:14px 18px;
      border:1px solid rgba(216,173,95,.32);
      background:linear-gradient(105deg,rgba(216,173,95,.09),rgba(14,10,8,.8));
      box-shadow:0 18px 55px rgba(0,0,0,.24);
    }
    .detail-price strong {
      font-family:"Cormorant Garamond",Georgia,serif;
      font-size:clamp(30px,3vw,43px);
      font-weight:600;
      line-height:1;
      color:#f0cc82;
      white-space:nowrap;
    }
    @media (max-width:620px) {
      .catalog-price-note { align-items:flex-start; flex-direction:column; gap:9px; }
      .detail-price { width:100%; justify-content:space-between; box-sizing:border-box; }
    }
  `;
  document.head.appendChild(style);

  const mountCatalogPricing = () => {
    const catalogStatus = document.querySelector('.catalog-status');
    if (catalogStatus && !document.querySelector('.catalog-price-note')) {
      const note = document.createElement('div');
      note.className = 'catalog-price-note';
      note.setAttribute('aria-label', 'Valor unitário de cada automação: R$ 200');
      note.innerHTML = '<span>Valor unitário de cada automação</span><strong>R$ 200</strong>';
      catalogStatus.insertAdjacentElement('afterend', note);
    }

    document.querySelectorAll('.tech-card[data-solution]').forEach((card) => {
      if (card.querySelector('.tech-card__price')) return;
      const price = document.createElement('div');
      price.className = 'tech-card__price';
      price.innerHTML = `<span>Valor da automação</span><strong>${PRICE}</strong>`;
      const action = card.querySelector('[data-open-solution]');
      if (action) card.insertBefore(price, action);
      else card.appendChild(price);
    });
  };

  const mountDetailPricing = () => {
    const heroCopy = document.querySelector('.detail-hero__copy');
    if (!heroCopy || heroCopy.querySelector('.detail-price')) return;
    const price = document.createElement('div');
    price.className = 'detail-price';
    price.setAttribute('aria-label', 'Valor desta automação: R$ 200');
    price.innerHTML = `<span>Valor desta automação</span><strong>${PRICE}</strong>`;
    const actions = heroCopy.querySelector('.detail-hero__actions');
    if (actions) heroCopy.insertBefore(price, actions);
    else heroCopy.appendChild(price);
  };

  const mountPricing = () => {
    mountCatalogPricing();
    mountDetailPricing();
  };

  mountPricing();
  const observer = new MutationObserver(mountPricing);
  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
})();