(() => {
  'use strict';

  if (window.__cevoraAcquisitionCommandLayoutLoaded) return;
  window.__cevoraAcquisitionCommandLayoutLoaded = true;

  const mount = () => {
    const section = document.querySelector('#acquisition');
    const content = section?.querySelector('.acquisition__content');
    const visual = section?.querySelector('.acquisition__visual');
    const marker = content?.querySelector('.fold-index-label');
    const price = content?.querySelector('[data-price-card="acquisition"]');

    if (!section || !content || !visual || !marker || !price) return false;
    if (section.dataset.acquisitionCommandLayout === 'true') return true;

    const bridge = section.querySelector('.acquisition-bridge');
    const layout = document.createElement('div');
    layout.className = 'acquisition-command-layout';
    layout.dataset.acquisitionCommandLayout = 'true';

    const intro = document.createElement('div');
    intro.className = 'acquisition-command-intro';

    const commerce = document.createElement('div');
    commerce.className = 'acquisition-command-commerce';

    [
      '.fold-index-label',
      '.early-access-pill',
      '.acquisition__eyebrow',
      '.acquisition__title',
      '.acquisition__rule',
      '.acquisition__copy',
      '.acquisition__support',
      '.founders-note'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) intro.appendChild(element);
    });

    [
      '[data-price-card="acquisition"]',
      '.acquisition__actions',
      '.acquisition-benefits'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) commerce.appendChild(element);
    });

    content.append(intro, commerce);

    const console = document.createElement('div');
    console.className = 'acquisition-command-console';

    const sources = document.createElement('div');
    sources.className = 'acquisition-command-sources';
    sources.setAttribute('aria-label', 'Fontes representadas no protótipo');

    const sourceHeader = document.createElement('div');
    sourceHeader.className = 'acquisition-command-zone-label';
    sourceHeader.innerHTML = '<span>01</span><strong>Fontes observadas</strong>';
    sources.appendChild(sourceHeader);

    const sourceList = document.createElement('div');
    sourceList.className = 'acquisition-command-source-list';
    const radarLabels = visual.querySelector('.radar-labels');
    if (radarLabels) {
      [...radarLabels.children].forEach((label, index) => {
        const item = document.createElement('div');
        item.className = 'acquisition-command-source';
        item.innerHTML = `<i>${String(index + 1).padStart(2, '0')}</i><span>${label.textContent}</span><b aria-hidden="true"></b>`;
        sourceList.appendChild(item);
      });
      radarLabels.remove();
    }
    sources.appendChild(sourceList);

    const access = visual.querySelector('.access-card');
    if (access) sources.appendChild(access);

    const core = document.createElement('div');
    core.className = 'acquisition-command-core';
    const coreHeader = document.createElement('div');
    coreHeader.className = 'acquisition-command-zone-label';
    coreHeader.innerHTML = '<span>02</span><strong>Inteligência central</strong>';
    core.appendChild(coreHeader);

    [
      '.acquisition-orbit--outer',
      '.acquisition-orbit--inner',
      '.acquisition-glow',
      '.acquisition-lion',
      '.radar-card'
    ].forEach((selector) => {
      const element = visual.querySelector(selector);
      if (element) core.appendChild(element);
    });

    const analysis = document.createElement('div');
    analysis.className = 'acquisition-command-analysis';
    const analysisHeader = document.createElement('div');
    analysisHeader.className = 'acquisition-command-zone-label';
    analysisHeader.innerHTML = '<span>03</span><strong>Decisão por procedimento</strong>';
    analysis.appendChild(analysisHeader);

    ['.priority-card', '.procedure-card'].forEach((selector) => {
      const element = visual.querySelector(selector);
      if (element) analysis.appendChild(element);
    });

    console.append(sources, core, analysis);
    visual.appendChild(console);
    layout.append(content, visual);

    if (bridge) section.insertBefore(layout, bridge);
    else section.appendChild(layout);

    content.classList.add('acquisition-command-copyrail');
    visual.classList.add('acquisition-command-stage');
    section.dataset.acquisitionCommandLayout = 'true';

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