(() => {
  'use strict';

  if (window.__cevoraConversionLabLayoutLoaded) return;
  window.__cevoraConversionLabLayoutLoaded = true;

  const mount = () => {
    const section = document.querySelector('#conversion');
    const content = section?.querySelector('.conversion__content');
    const visual = section?.querySelector('.conversion__visual');
    const marker = content?.querySelector('.fold-index-label');
    const price = content?.querySelector('[data-price-card="conversion"]');

    if (!section || !content || !visual || !marker || !price) return false;
    if (section.dataset.conversionLabLayout === 'true') return true;

    const bridge = section.querySelector('.conversion-bridge');
    const layout = document.createElement('div');
    layout.className = 'conversion-lab-layout';
    layout.dataset.conversionLabLayout = 'true';

    const editorial = document.createElement('div');
    editorial.className = 'conversion-lab-editorial';

    const commerce = document.createElement('div');
    commerce.className = 'conversion-lab-commerce';

    [
      '.fold-index-label',
      '.conversion__eyebrow',
      '.conversion__title',
      '.conversion__rule',
      '.conversion__copy',
      '.conversion__proof'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) editorial.appendChild(element);
    });

    [
      '[data-price-card="conversion"]',
      '.conversion__actions',
      '.conversion-benefits'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) commerce.appendChild(element);
    });

    content.append(editorial, commerce);

    const stage = document.createElement('div');
    stage.className = 'conversion-lab-stage';

    const readout = document.createElement('div');
    readout.className = 'conversion-lab-readout';

    [
      '.conversion-orbit--outer',
      '.conversion-orbit--inner',
      '.conversion-glow',
      '.lucky-cat',
      '.ab-card',
      '.heatmap-card'
    ].forEach((selector) => {
      const element = visual.querySelector(selector);
      if (element) stage.appendChild(element);
    });

    ['.conversion-card', '.performance-card'].forEach((selector) => {
      const element = visual.querySelector(selector);
      if (element) readout.appendChild(element);
    });

    visual.append(stage, readout);
    layout.append(content, visual);

    if (bridge) section.insertBefore(layout, bridge);
    else section.appendChild(layout);

    content.classList.add('conversion-lab-copyrail');
    visual.classList.add('conversion-lab-visual');
    section.dataset.conversionLabLayout = 'true';

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
