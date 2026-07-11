(() => {
  'use strict';

  if (window.__cevoraTechnicalFramesLoaded) return;
  window.__cevoraTechnicalFramesLoaded = true;

  const frames = [
    { section: '#produto', target: '.hero__visual', variant: 'concierge' },
    { section: '#conversion', target: '.conversion__visual', variant: 'conversion' },
    { section: '#course', target: '.course__content', variant: 'course' },
    { section: '#acquisition', target: '.acquisition__visual', variant: 'acquisition' },
    { section: '#prosperity-engine', target: '.funnel__visual', variant: 'funnel' }
  ];

  const mount = () => {
    let mounted = 0;

    frames.forEach(({ section, target, variant }) => {
      const fold = document.querySelector(section);
      const area = fold?.querySelector(target);
      if (!area) return;

      if (!area.querySelector(':scope > [data-technical-frame]')) {
        const frame = document.createElement('div');
        frame.className = `technical-frame technical-frame--${variant}`;
        frame.dataset.technicalFrame = variant;
        frame.setAttribute('aria-hidden', 'true');
        area.appendChild(frame);
      }

      mounted += 1;
    });

    return mounted;
  };

  mount();

  const observer = new MutationObserver(() => {
    if (mount() === frames.length) observer.disconnect();
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
