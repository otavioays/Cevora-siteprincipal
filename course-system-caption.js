(() => {
  'use strict';

  if (window.__cevoraCourseSystemCaptionLoaded) return;
  window.__cevoraCourseSystemCaptionLoaded = true;

  const mount = () => {
    const visual = document.querySelector('#course .course__visual');
    if (!visual) return false;

    if (visual.querySelector('[data-course-system-caption]')) return true;

    const caption = document.createElement('div');
    caption.className = 'course-system-caption';
    caption.dataset.courseSystemCaption = 'true';
    caption.setAttribute('aria-hidden', 'true');
    caption.innerHTML = `
      <i class="course-system-caption__dot"></i>
      <span class="course-system-caption__primary">Trilha educacional</span>
      <b class="course-system-caption__line"></b>
      <span>5 pilares</span>
      <b class="course-system-caption__line"></b>
      <span>Plano de 90 dias</span>
    `;

    visual.insertAdjacentElement('afterbegin', caption);
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

/*
 * Below-fold image policy.
 * Keep the first product eager, while images injected later are decoded off the
 * critical path and fetched with low priority when the browser supports it.
 */
(() => {
  'use strict';

  if (window.__cevoraImagePolicyLoaded) return;
  window.__cevoraImagePolicyLoaded = true;

  const belowFoldSelector = '#conversion img, #course img, #acquisition img, #prosperity-engine img';

  const optimize = (scope = document) => {
    const images = [];

    if (scope instanceof HTMLImageElement && scope.matches(belowFoldSelector)) {
      images.push(scope);
    }

    if (scope.querySelectorAll) {
      images.push(...scope.querySelectorAll(belowFoldSelector));
    }

    images.forEach((image) => {
      if (image.dataset.loadingOptimized === 'true') return;
      image.dataset.loadingOptimized = 'true';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.fetchPriority = 'low';
    });
  };

  optimize();

  const root = document.querySelector('main') || document.body;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) optimize(node);
      });
    });

    if (document.querySelector('#prosperity-engine')) {
      optimize();
      observer.disconnect();
    }
  });

  observer.observe(root, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 12000);
})();

(() => {
  if (document.querySelector('script[src="image-intrinsics.js"]')) return;
  const script = document.createElement('script');
  script.src = 'image-intrinsics.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  if (document.querySelector('script[src="course-journey-layout.js"]')) return;
  const script = document.createElement('script');
  script.src = 'course-journey-layout.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  if (document.querySelector('script[data-ganesha-loader]')) return;
  const script = document.createElement('script');
  script.src = 'ganesha-offer.js?v=10';
  script.defer = true;
  script.dataset.ganeshaLoader = 'true';
  document.body.appendChild(script);
})();