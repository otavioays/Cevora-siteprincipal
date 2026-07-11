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

(() => {
  if (document.querySelector('script[src="course-journey-layout.js"]')) return;
  const script = document.createElement('script');
  script.src = 'course-journey-layout.js';
  script.defer = true;
  document.body.appendChild(script);
})();

(() => {
  try {
    sessionStorage.removeItem('cevora-ganesha-offer-dismissed');
  } catch (_) {}

  const load = (src) => {
    if (document.querySelector(`script[data-ganesha-loader="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = `${src}?v=4`;
    script.defer = true;
    script.dataset.ganeshaLoader = src;
    document.body.appendChild(script);
  };

  load('ganesha-offer.js');
  load('ganesha-offer-ds.js');
})();