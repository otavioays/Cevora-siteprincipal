(() => {
  'use strict';

  if (window.__cevoraAcquisitionEditorialRevealLoaded) return;
  window.__cevoraAcquisitionEditorialRevealLoaded = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let prepared = false;
  let revealed = false;
  let observer;

  const prepare = () => {
    if (prepared) return true;

    const section = document.querySelector('#acquisition');
    const content = section?.querySelector('.acquisition__content');
    if (!section || !content) return false;

    const groups = [
      ['.fold-index-label'],
      ['.early-access-pill', '.acquisition__eyebrow', '.acquisition__title', '.acquisition__rule'],
      ['.acquisition__copy', '.acquisition__support', '.founders-note'],
      ['[data-price-card="acquisition"]'],
      ['.acquisition__actions'],
      ['.acquisition-benefits']
    ];

    const resolvedGroups = groups.map((selectors) =>
      selectors.map((selector) => content.querySelector(selector)).filter(Boolean)
    );

    if (resolvedGroups.some((group) => group.length === 0)) return false;

    resolvedGroups.forEach((group, index) => {
      group.forEach((element) => {
        element.classList.add('acquisition-editorial-step');
        element.style.setProperty('--acquisition-editorial-delay', `${index * 85}ms`);
      });
    });

    section.classList.add('is-acquisition-editorial-reveal-ready');
    prepared = true;

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      content.querySelector('[data-price-card="acquisition"]')?.classList.add('is-price-visible');
      content.querySelectorAll('.acquisition-editorial-step').forEach((element) => {
        element.classList.add('is-acquisition-editorial-visible');
      });

      window.setTimeout(() => {
        section.classList.add('is-acquisition-editorial-reveal-complete');
      }, 1300);
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
      threshold: .18,
      rootMargin: '0px 0px -8% 0px'
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

(() => {
  if (document.querySelector('script[src="funnel-editorial-reveal.js"]')) return;
  const script = document.createElement('script');
  script.src = 'funnel-editorial-reveal.js';
  script.defer = true;
  document.body.appendChild(script);
})();
