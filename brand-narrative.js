(() => {
  'use strict';

  document.documentElement.classList.add('story-motion-ready');

  document.querySelectorAll('[data-nav-problem]').forEach((link) => {
    link.setAttribute('href', '#problema');
  });

  document.querySelectorAll('[data-nav-method]').forEach((link) => {
    link.setAttribute('href', '#metodo');
  });

  const revealItems = [...document.querySelectorAll('[data-story-reveal]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((item) => observer.observe(item));
})();
