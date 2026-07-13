(() => {
  'use strict';

  if (window.__cevoraFoldIndexLoaded) return;
  window.__cevoraFoldIndexLoaded = true;

  const folds = [
    { section: '#produto', content: '.hero__content', number: '01', name: 'Sistema Cevora' },
    { section: '#problema', content: '.brand-story__shell', number: '02', name: 'O intervalo invisível' },
    { section: '#tese', content: '.brand-story__shell', number: '03', name: 'A solução errada' },
    { section: '#metodo', content: '.brand-story__shell', number: '04', name: 'Método Cevora' },
    { section: '#solucoes', content: '.solutions-architecture__shell', number: '05', name: 'Arquitetura de soluções' }
  ];

  const render = ({ number, name }) => {
    const marker = document.createElement('div');
    marker.className = 'fold-index-label';
    marker.setAttribute('aria-label', `Seção ${Number(number)} de ${folds.length}: ${name}`);
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
  }, 9000);
})();