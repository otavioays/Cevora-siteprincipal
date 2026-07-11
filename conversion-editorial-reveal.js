(() => {
  'use strict';

  if (window.__cevoraConversionEditorialRevealLoaded) return;
  window.__cevoraConversionEditorialRevealLoaded = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let prepared = false;
  let revealed = false;
  let observer;

  const prepare = () => {
    if (prepared) return true;

    const section = document.querySelector('#conversion');
    const content = section?.querySelector('.conversion__content');
    if (!section || !content) return false;

    const groups = [
      ['.fold-index-label'],
      ['.conversion__eyebrow', '.conversion__title', '.conversion__rule'],
      ['.conversion__copy', '.conversion__proof'],
      ['[data-price-card="conversion"]'],
      ['.conversion__actions'],
      ['.conversion-benefits']
    ];

    const resolvedGroups = groups.map((selectors) =>
      selectors.map((selector) => content.querySelector(selector)).filter(Boolean)
    );

    if (resolvedGroups.some((group) => group.length === 0)) return false;

    resolvedGroups.forEach((group, index) => {
      group.forEach((element) => {
        element.classList.add('conversion-editorial-step');
        element.style.setProperty('--conversion-editorial-delay', `${index * 80}ms`);
      });
    });

    section.classList.add('is-editorial-reveal-ready');
    prepared = true;

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      content.querySelector('[data-price-card="conversion"]')?.classList.add('is-price-visible');
      content.querySelectorAll('.conversion-editorial-step').forEach((element) => {
        element.classList.add('is-editorial-visible');
      });

      window.setTimeout(() => {
        section.classList.add('is-editorial-reveal-complete');
      }, 1200);
    };

    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveal();
      return true;
    }

    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        observer.disconnect();
      }
    }, {
      threshold: .22,
      rootMargin: '0px 0px -10% 0px'
    });

    observer.observe(section);
    return true;
  };

  if (!prepare()) {
    const mountObserver = new MutationObserver(() => {
      if (prepare()) mountObserver.disconnect();
    });

    mountObserver.observe(document.querySelector('main') || document.documentElement, {
      childList: true,
      subtree: true
    });

    window.setTimeout(() => {
      prepare();
      mountObserver.disconnect();
    }, 7000);
  }
})();
