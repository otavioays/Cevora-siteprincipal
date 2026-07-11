(() => {
  'use strict';

  if (window.__cevoraCourseEditorialRevealLoaded) return;
  window.__cevoraCourseEditorialRevealLoaded = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let prepared = false;
  let revealed = false;
  let observer;

  const prepare = () => {
    if (prepared) return true;

    const section = document.querySelector('#course');
    const content = section?.querySelector('.course__content');
    if (!section || !content) return false;

    const groups = [
      ['.fold-index-label'],
      ['.course__eyebrow', '.course__title', '.course__rule'],
      ['.course__copy', '.course__support'],
      ['[data-price-card="course"]'],
      ['.course__actions'],
      ['.course-benefits']
    ];

    const resolvedGroups = groups.map((selectors) =>
      selectors.map((selector) => content.querySelector(selector)).filter(Boolean)
    );

    if (resolvedGroups.some((group) => group.length === 0)) return false;

    resolvedGroups.forEach((group, index) => {
      group.forEach((element) => {
        element.classList.add('course-editorial-step');
        element.style.setProperty('--course-editorial-delay', `${index * 85}ms`);
      });
    });

    section.classList.add('is-course-editorial-reveal-ready');
    prepared = true;

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      content.querySelector('[data-price-card="course"]')?.classList.add('is-price-visible');
      content.querySelectorAll('.course-editorial-step').forEach((element) => {
        element.classList.add('is-course-editorial-visible');
      });

      window.setTimeout(() => {
        section.classList.add('is-course-editorial-reveal-complete');
      }, 1250);
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