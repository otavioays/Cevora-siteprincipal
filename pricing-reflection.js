(() => {
  'use strict';

  if (window.__cevoraPricingReflectionLoaded) return;
  window.__cevoraPricingReflectionLoaded = true;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enhanced = new WeakSet();

  const enhance = (card) => {
    if (!card || enhanced.has(card)) return;
    enhanced.add(card);

    if (!card.querySelector(':scope > .price-reflection')) {
      const reflection = document.createElement('span');
      reflection.className = 'price-reflection';
      reflection.setAttribute('aria-hidden', 'true');
      card.appendChild(reflection);
    }

    if (!canHover || reduceMotion) return;

    let frame = 0;

    card.addEventListener('pointerenter', () => {
      card.classList.add('is-reflecting');
    });

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.setProperty('--price-reflection-x', `${x.toFixed(2)}%`);
        card.style.setProperty('--price-reflection-y', `${y.toFixed(2)}%`);
      });
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      card.classList.remove('is-reflecting');
      card.style.setProperty('--price-reflection-x', '50%');
      card.style.setProperty('--price-reflection-y', '50%');
    });
  };

  const scan = () => {
    document.querySelectorAll('.price-spotlight').forEach(enhance);
  };

  scan();

  const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.addedNodes.length)) scan();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(scan, 900);
  window.setTimeout(scan, 2500);
})();
