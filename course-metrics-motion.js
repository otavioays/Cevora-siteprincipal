(() => {
  'use strict';

  if (window.__cevoraCourseMetricsMotionLoaded) return;
  window.__cevoraCourseMetricsMotionLoaded = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateMetrics = (section) => {
    if (!section || section.dataset.metricsAnimated === 'true') return;
    section.dataset.metricsAnimated = 'true';

    const rings = [...section.querySelectorAll('[data-course-progress]')];
    const growthCircle = section.querySelector('.growth-ring__value');
    const growthCount = section.querySelector('[data-growth-count]');

    if (reduceMotion) {
      rings.forEach((ring) => ring.style.setProperty('--progress', `${Number(ring.dataset.courseProgress) * 3.6}deg`));
      if (growthCircle) growthCircle.style.strokeDashoffset = '39.2';
      if (growthCount) growthCount.textContent = '87%';
      section.classList.add('is-metrics-animated');
      return;
    }

    rings.forEach((ring) => ring.style.setProperty('--progress', '0deg'));
    if (growthCircle) growthCircle.style.strokeDashoffset = '301.6';
    if (growthCount) growthCount.textContent = '0%';

    section.classList.add('is-metrics-animated');

    const start = performance.now();
    const duration = 1450;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const frame = (now) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = easeOut(raw);

      rings.forEach((ring) => {
        const target = Number(ring.dataset.courseProgress) * 3.6;
        ring.style.setProperty('--progress', `${target * eased}deg`);
      });

      if (growthCircle) {
        const from = 301.6;
        const to = 39.2;
        growthCircle.style.strokeDashoffset = String(from + (to - from) * eased);
      }

      if (growthCount) growthCount.textContent = `${Math.round(87 * eased)}%`;

      if (raw < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  const mount = () => {
    const section = document.querySelector('#course');
    const target = section?.querySelector('.course-journey-insights, .diagnostic-card, .growth-card');
    if (!section || !target) return false;

    if (!('IntersectionObserver' in window)) {
      animateMetrics(section);
      return true;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateMetrics(section);
        observer.disconnect();
      }
    }, { threshold: .32, rootMargin: '0px 0px -8% 0px' });

    observer.observe(target);
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

    window.setTimeout(() => observer.disconnect(), 8000);
  }
})();
