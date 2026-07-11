(() => {
  'use strict';

  if (window.__cevoraFoldIndexLoaded) return;
  window.__cevoraFoldIndexLoaded = true;

  const folds = [
    { section: '#produto', content: '.hero__content', number: '01', name: 'Concierge 24/7' },
    { section: '#conversion', content: '.conversion__content', number: '02', name: 'Conversion Atelier' },
    { section: '#course', content: '.course__content', number: '03', name: 'Clínica Próspera' },
    { section: '#acquisition', content: '.acquisition__content', number: '04', name: 'Acquisition OS' },
    { section: '#prosperity-engine', content: '.funnel__content', number: '05', name: 'Prosperity Engine' }
  ];

  const render = ({ number, name }) => {
    const marker = document.createElement('div');
    marker.className = 'fold-index-label';
    marker.setAttribute('aria-label', `Produto ${Number(number)} de ${folds.length}: ${name}`);
    marker.innerHTML = `
      <span class="fold-index-label__number">${number}</span>
      <i class="fold-index-label__line" aria-hidden="true"></i>
      <strong class="fold-index-label__name">${name}</strong>
    `;
    return marker;
  };

  const mount = () => {
    let mounted = 0;

    folds.forEach((fold) => {
      const section = document.querySelector(fold.section);
      const content = section?.querySelector(fold.content);
      if (!content) return;

      if (!content.querySelector(':scope > .fold-index-label')) {
        content.insertAdjacentElement('afterbegin', render(fold));
      }
      mounted += 1;
    });

    return mounted;
  };

  mount();

  const observer = new MutationObserver(() => {
    if (mount() === folds.length) observer.disconnect();
  });

  observer.observe(document.querySelector('main') || document.documentElement, {
    childList: true,
    subtree: true
  });

  window.setTimeout(() => {
    mount();
    observer.disconnect();
  }, 7000);
})();
