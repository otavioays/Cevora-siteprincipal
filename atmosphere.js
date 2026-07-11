(() => {
  'use strict';

  if (window.__cevoraAtmosphereLoaded) return;
  window.__cevoraAtmosphereLoaded = true;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  let sections = [];
  let seams = [];
  let frame = 0;
  let refreshFrame = 0;

  const sectionSelector = 'main > section';

  const makeSurface = () => {
    const surface = document.createElement('div');
    surface.className = 'fold-grid-surface';
    surface.setAttribute('aria-hidden', 'true');
    return surface;
  };

  const makeSeam = (index) => {
    const seam = document.createElement('div');
    seam.className = 'fold-seam';
    seam.dataset.seamIndex = String(index);
    seam.setAttribute('aria-hidden', 'true');
    seam.innerHTML = '<span class="fold-seam__aura"></span><span class="fold-seam__spark"></span><span class="fold-seam__mark">✦</span>';
    return seam;
  };

  const rebuild = () => {
    document.querySelectorAll('.fold-seam').forEach((seam) => seam.remove());
    sections = [...document.querySelectorAll(sectionSelector)];

    sections.forEach((section, index) => {
      section.classList.add('cevora-fold');
      section.dataset.foldIndex = String(index + 1);
      if (!section.querySelector(':scope > .fold-grid-surface')) {
        section.insertAdjacentElement('afterbegin', makeSurface());
      }
    });

    sections.slice(0, -1).forEach((section, index) => {
      section.insertAdjacentElement('afterend', makeSeam(index));
    });

    seams = [...document.querySelectorAll('.fold-seam')];
    update();
  };

  const requestRefresh = () => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(rebuild);
  };

  const update = () => {
    frame = 0;
    const viewportHeight = Math.max(window.innerHeight, 1);
    const center = viewportHeight * .5;
    const scrollY = window.scrollY || 0;

    root.style.setProperty('--grid-drift-y', `${reduceMotion ? 0 : (scrollY * .045) % 80}px`);
    root.style.setProperty('--grid-drift-x', `${reduceMotion ? 0 : Math.sin(scrollY * .0017) * 8}px`);

    let closest = null;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height * .5;
      const distance = Math.abs(sectionCenter - center);
      const presence = Math.max(0, Math.min(1, 1 - distance / (viewportHeight * .9)));
      section.style.setProperty('--fold-presence', presence.toFixed(3));

      if (distance < closestDistance) {
        closest = section;
        closestDistance = distance;
      }
    });

    sections.forEach((section) => section.classList.toggle('is-fold-active', section === closest));

    seams.forEach((seam) => {
      const rect = seam.getBoundingClientRect();
      const seamCenter = rect.top + rect.height * .5;
      const progress = Math.max(0, Math.min(1, 1 - Math.abs(seamCenter - center) / (viewportHeight * .62)));
      seam.style.setProperty('--seam-progress', progress.toFixed(3));
    });
  };

  const requestUpdate = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  if (!reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      root.style.setProperty('--grid-pointer-x', `${event.clientX}px`);
      root.style.setProperty('--grid-pointer-y', `${event.clientY}px`);
    }, { passive: true });
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });

  const observer = new MutationObserver((mutations) => {
    const changed = mutations.some((mutation) => [...mutation.addedNodes, ...mutation.removedNodes]
      .some((node) => node.nodeType === 1 && (node.matches?.('section, .fold-seam') || node.querySelector?.('section'))));
    if (changed) requestRefresh();
  });

  observer.observe(document.querySelector('main') || document.body, { childList: true, subtree: false });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rebuild, { once: true });
  } else {
    rebuild();
  }

  window.setTimeout(requestRefresh, 900);
  window.setTimeout(requestRefresh, 2400);
})();
