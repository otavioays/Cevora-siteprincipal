(() => {
  'use strict';

  if (window.__cevoraFunnelEditorialRevealLoaded) return;
  window.__cevoraFunnelEditorialRevealLoaded = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let prepared = false;
  let revealed = false;
  let observer;

  const prepare = () => {
    if (prepared) return true;

    const section = document.querySelector('#prosperity-engine');
    const content = section?.querySelector('.funnel__content');
    if (!section || !content) return false;

    const groups = [
      ['.fold-index-label'],
      ['.funnel__eyebrow', '.funnel__title', '.funnel__rule'],
      ['.funnel__copy', '.funnel__support', '.funnel-capacity'],
      ['[data-price-card="funnel"]'],
      ['.funnel__actions'],
      ['.funnel-benefits']
    ];

    const resolvedGroups = groups.map((selectors) =>
      selectors.map((selector) => content.querySelector(selector)).filter(Boolean)
    );

    if (resolvedGroups.some((group) => group.length === 0)) return false;

    resolvedGroups.forEach((group, index) => {
      group.forEach((element) => {
        element.classList.add('funnel-editorial-step');
        element.style.setProperty('--funnel-editorial-delay', `${index * 85}ms`);
      });
    });

    section.classList.add('is-funnel-editorial-reveal-ready');
    prepared = true;

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      content.querySelector('[data-price-card="funnel"]')?.classList.add('is-price-visible');
      content.querySelectorAll('.funnel-editorial-step').forEach((element) => {
        element.classList.add('is-funnel-editorial-visible');
      });

      window.setTimeout(() => {
        section.classList.add('is-funnel-editorial-reveal-complete');
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
      threshold: .2,
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
  if (document.querySelector('script[src="funnel-system-caption.js"]')) return;
  const script = document.createElement('script');
  script.src = 'funnel-system-caption.js';
  script.defer = true;
  document.body.appendChild(script);
})();
