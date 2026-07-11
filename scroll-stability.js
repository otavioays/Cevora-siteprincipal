(() => {
  'use strict';

  if (window.__cevoraScrollStabilityLoaded) return;
  window.__cevoraScrollStabilityLoaded = true;

  const configs = [
    {
      section: '#conversion[data-conversion-lab-layout="true"]',
      moving: '.cro-card, .heatmap-card',
      reveal: '.section-reveal, .conversion-editorial-step, .price-spotlight'
    },
    {
      section: '#course[data-course-journey-layout="true"]',
      moving: '.course-card',
      reveal: '.section-reveal, .course-editorial-step, .price-spotlight'
    },
    {
      section: '#acquisition[data-acquisition-command-layout="true"]',
      moving: '.acquisition-card',
      reveal: '.section-reveal, .acquisition-editorial-step, .price-spotlight'
    },
    {
      section: '#prosperity-engine[data-funnel-radial-layout="true"]',
      moving: '.funnel-card',
      reveal: '.section-reveal, .funnel-editorial-step, .price-spotlight'
    }
  ];

  const clearMotion = (element) => {
    if (!element) return;

    element.getAnimations?.().forEach((animation) => animation.cancel());
    element.removeAttribute('data-float');
    element.removeAttribute('data-course-float');
    element.removeAttribute('data-acquisition-float');
    element.removeAttribute('data-funnel-float');
    element.style.removeProperty('transform');
    element.style.removeProperty('translate');
    element.style.removeProperty('will-change');
  };

  const stabilize = () => {
    configs.forEach(({ section: selector, moving, reveal }) => {
      const section = document.querySelector(selector);
      if (!section) return;

      section.classList.add('is-scroll-stable');

      const movingElements = [...section.querySelectorAll(moving)];
      if (window.gsap && movingElements.length) {
        window.gsap.killTweensOf(movingElements);
      }
      movingElements.forEach(clearMotion);

      section.querySelectorAll(reveal).forEach((element) => {
        element.classList.add(
          'is-visible',
          'is-price-visible',
          'is-conversion-editorial-visible',
          'is-course-editorial-visible',
          'is-acquisition-editorial-visible',
          'is-funnel-editorial-visible'
        );
        element.style.removeProperty('transform');
        element.style.removeProperty('translate');
        element.style.removeProperty('filter');
        element.style.removeProperty('opacity');
        element.style.removeProperty('will-change');
      });
    });
  };

  const observer = new MutationObserver(() => stabilize());
  observer.observe(document.querySelector('main') || document.documentElement, {
    childList: true,
    subtree: true
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stabilize, { once: true });
  } else {
    stabilize();
  }

  window.addEventListener('load', stabilize, { once: true });
  window.addEventListener('pageshow', stabilize);
  [250, 900, 1800, 3200].forEach((delay) => window.setTimeout(stabilize, delay));
  window.setTimeout(() => observer.disconnect(), 6500);
})();

(() => {
  if (document.querySelector('script[src="ganesha-offer.js"]')) return;
  const script = document.createElement('script');
  script.src = 'ganesha-offer.js';
  script.defer = true;
  document.body.appendChild(script);
})();