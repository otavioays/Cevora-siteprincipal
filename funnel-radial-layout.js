(() => {
  'use strict';

  if (window.__cevoraFunnelRadialLayoutLoaded) return;
  window.__cevoraFunnelRadialLayoutLoaded = true;

  const mount = () => {
    const section = document.querySelector('#prosperity-engine');
    const content = section?.querySelector('.funnel__content');
    const visual = section?.querySelector('.funnel__visual');
    const marker = content?.querySelector('.fold-index-label');
    const price = content?.querySelector('[data-price-card="funnel"]');
    const orange = visual?.querySelector('.funnel-orange');
    const cards = {
      chain: visual?.querySelector('.chain-card'),
      operating: visual?.querySelector('.operating-card'),
      connected: visual?.querySelector('.connected-card'),
      status: visual?.querySelector('.status-card')
    };

    if (!section || !content || !visual || !marker || !price || !orange) return false;
    if (Object.values(cards).some((card) => !card)) return false;
    if (section.dataset.funnelRadialLayout === 'true') return true;

    const bridge = section.querySelector('.funnel-bridge');
    const layout = document.createElement('div');
    layout.className = 'funnel-radial-layout';
    layout.dataset.funnelRadialLayout = 'true';

    const intro = document.createElement('div');
    intro.className = 'funnel-radial-intro';

    const commerce = document.createElement('div');
    commerce.className = 'funnel-radial-commerce';

    [
      '.fold-index-label',
      '.funnel__eyebrow',
      '.funnel__title',
      '.funnel__rule',
      '.funnel__copy',
      '.funnel__support',
      '.funnel-capacity'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) intro.appendChild(element);
    });

    [
      '[data-price-card="funnel"]',
      '.funnel__actions',
      '.funnel-benefits'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) commerce.appendChild(element);
    });

    content.append(intro, commerce);

    const shell = document.createElement('div');
    shell.className = 'funnel-radial-shell';
    shell.setAttribute('aria-label', 'Mapa radial dos módulos do Prosperity Engine');

    const connectors = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    connectors.setAttribute('class', 'funnel-radial-connectors');
    connectors.setAttribute('viewBox', '0 0 1000 760');
    connectors.setAttribute('preserveAspectRatio', 'none');
    connectors.setAttribute('aria-hidden', 'true');
    connectors.innerHTML = `
      <defs>
        <linearGradient id="funnelRadialLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#8b2413" stop-opacity=".34"></stop>
          <stop offset=".52" stop-color="#e59b36" stop-opacity=".72"></stop>
          <stop offset="1" stop-color="#f1cc82" stop-opacity=".26"></stop>
        </linearGradient>
      </defs>
      <path d="M500 380 C390 300 320 210 210 152"></path>
      <path d="M500 380 C610 300 680 210 790 152"></path>
      <path d="M500 380 C390 470 320 555 210 624"></path>
      <path d="M500 380 C610 470 680 555 790 624"></path>
      <circle cx="500" cy="380" r="14"></circle>
      <circle cx="500" cy="380" r="186" class="funnel-radial-connectors__orbit"></circle>
    `;

    const core = document.createElement('div');
    core.className = 'funnel-radial-core';

    const coreLabel = document.createElement('div');
    coreLabel.className = 'funnel-radial-core-label';
    coreLabel.setAttribute('aria-hidden', 'true');
    coreLabel.innerHTML = '<span>05</span><strong>Núcleo do sistema</strong>';

    const coreArt = document.createElement('div');
    coreArt.className = 'funnel-radial-core-art';

    [
      '.funnel-orbit--outer',
      '.funnel-orbit--inner',
      '.funnel-glow'
    ].forEach((selector) => {
      const element = visual.querySelector(selector);
      if (element) core.appendChild(element);
    });

    coreArt.appendChild(orange);
    core.append(coreLabel, coreArt);

    cards.chain.classList.add('funnel-radial-module', 'funnel-radial-module--positioning');
    cards.operating.classList.add('funnel-radial-module', 'funnel-radial-module--operation');
    cards.connected.classList.add('funnel-radial-module', 'funnel-radial-module--connection');
    cards.status.classList.add('funnel-radial-module', 'funnel-radial-module--implementation');

    shell.append(
      connectors,
      core,
      cards.chain,
      cards.operating,
      cards.connected,
      cards.status
    );

    visual.appendChild(shell);
    layout.append(content, visual);

    if (bridge) section.insertBefore(layout, bridge);
    else section.appendChild(layout);

    content.classList.add('funnel-radial-copyrail');
    visual.classList.add('funnel-radial-stage');
    section.dataset.funnelRadialLayout = 'true';

    return true;
  };

  if (!mount()) {
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });

    observer.observe(document.querySelector('main') || document.documentElement, {
      childList: true,
      subtree: true
    });

    window.setTimeout(() => {
      mount();
      observer.disconnect();
    }, 7000);
  }
})();