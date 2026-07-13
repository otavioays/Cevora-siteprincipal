(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.solutions-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-solutions-nav');
  const sections = [...document.querySelectorAll('[data-section]')];
  const indexLinks = [...document.querySelectorAll('[data-index]')];
  const navigationLinks = [...document.querySelectorAll('.solutions-nav a')];

  const setMenuState = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    mobileMenu?.classList.toggle('is-open', open);
  };

  menuButton?.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const setActiveSection = (name) => {
    indexLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.index === name));
    navigationLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${name}`));
  };

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.dataset.section);
    }, {
      rootMargin: '-30% 0px -45% 0px',
      threshold: [0, .15, .35, .6]
    });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: .12,
      rootMargin: '0px 0px -9% 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  if (!reducedMotion) {
    document.querySelectorAll('.solution-fold__visual, .solutions-hero__map').forEach((visual) => {
      let frame = 0;
      visual.addEventListener('pointermove', (event) => {
        const bounds = visual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          visual.style.setProperty('--pointer-x', `${x * 9}px`);
          visual.style.setProperty('--pointer-y', `${y * 7}px`);
          visual.style.transform = `perspective(1200px) rotateX(${y * -1.2}deg) rotateY(${x * 1.5}deg)`;
        });
      });

      visual.addEventListener('pointerleave', () => {
        visual.style.transform = '';
      });
    });
  }

  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && sections.some((section) => section.id === currentHash)) {
    setActiveSection(currentHash);
  } else {
    setActiveSection('pre-consulta');
  }
})();