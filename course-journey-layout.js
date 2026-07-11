(() => {
  'use strict';

  if (window.__cevoraCourseJourneyLayoutLoaded) return;
  window.__cevoraCourseJourneyLayoutLoaded = true;

  const mount = () => {
    const section = document.querySelector('#course');
    const content = section?.querySelector('.course__content');
    const visual = section?.querySelector('.course__visual');
    const marker = content?.querySelector('.fold-index-label');
    const price = content?.querySelector('[data-price-card="course"]');

    if (!section || !content || !visual || !marker || !price) return false;
    if (section.dataset.courseJourneyLayout === 'true') return true;

    const bridge = section.querySelector('.course-bridge');
    const layout = document.createElement('div');
    layout.className = 'course-journey-layout';
    layout.dataset.courseJourneyLayout = 'true';

    const intro = document.createElement('div');
    intro.className = 'course-journey-intro';

    const commerce = document.createElement('div');
    commerce.className = 'course-journey-commerce';

    [
      '.fold-index-label',
      '.course__eyebrow',
      '.course__title',
      '.course__rule',
      '.course__copy',
      '.course__support'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) intro.appendChild(element);
    });

    [
      '[data-price-card="course"]',
      '.course__actions',
      '.course-benefits'
    ].forEach((selector) => {
      const element = content.querySelector(selector);
      if (element) commerce.appendChild(element);
    });

    content.append(intro, commerce);

    const timeline = document.createElement('div');
    timeline.className = 'course-journey-timeline';

    const insights = document.createElement('div');
    insights.className = 'course-journey-insights';

    const plan = visual.querySelector('.plan-card');
    if (plan) timeline.appendChild(plan);

    [
      '.diagnostic-card',
      '.growth-card',
      '.method-card'
    ].forEach((selector) => {
      const element = visual.querySelector(selector);
      if (element) insights.appendChild(element);
    });

    visual.append(timeline, insights);
    layout.append(content, visual);

    if (bridge) section.insertBefore(layout, bridge);
    else section.appendChild(layout);

    content.classList.add('course-journey-copyrail');
    visual.classList.add('course-journey-stage');
    section.dataset.courseJourneyLayout = 'true';

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