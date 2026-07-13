(() => {
  'use strict';

  const loadStylesheet = ({ name, href }) => {
    const selector = `link[data-cevora-style="${name}"]`;
    if (document.querySelector(selector)) return;
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = href;
    style.dataset.cevoraStyle = name;
    document.head.appendChild(style);
  };

  const loadScript = ({ name, src, delay = 0 }) => {
    const selector = `script[data-cevora-script="${name}"]`;
    if (document.querySelector(selector)) return;

    const mount = () => {
      if (document.querySelector(selector)) return;
      const script = document.createElement('script');
      script.src = src;
      script.dataset.cevoraScript = name;
      document.body.appendChild(script);
    };

    if (delay > 0) window.setTimeout(mount, delay);
    else mount();
  };

  const loadModule = ({ name, styleHref, scriptSrc, delay = 1200 }) => {
    const scriptSelector = `script[data-cevora-module="${name}"]`;
    const styleSelector = `link[data-cevora-module="${name}"]`;

    const mountScript = () => {
      if (document.querySelector(scriptSelector)) return;
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.dataset.cevoraModule = name;
      document.body.appendChild(script);
    };

    if (document.querySelector(styleSelector)) {
      mountScript();
      return;
    }

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = styleHref;
    style.dataset.cevoraModule = name;
    style.addEventListener('load', mountScript, { once: true });
    document.head.appendChild(style);
    window.setTimeout(mountScript, delay);
  };

  loadStylesheet({
    name: 'thesis-layout-fix',
    href: 'styles-thesis-layout-fix.css'
  });

  loadModule({
    name: 'product-architecture',
    styleHref: 'styles-product-architecture.css',
    scriptSrc: 'product-architecture.js'
  });

  loadModule({
    name: 'trust-authority',
    styleHref: 'styles-trust-authority.css',
    scriptSrc: 'trust-authority.js',
    delay: 1500
  });

  loadScript({
    name: 'copy-strengthener-v6',
    src: 'copy-strengthener.js',
    delay: 80
  });

  document.documentElement.classList.add('story-motion-ready');

  document.querySelectorAll('[data-nav-problem]').forEach((link) => {
    link.setAttribute('href', '#problema');
  });

  document.querySelectorAll('[data-nav-method]').forEach((link) => {
    link.setAttribute('href', '#metodo');
  });

  const routeSolutionsNavigation = () => {
    document.querySelectorAll('.desktop-nav a, .mobile-menu a').forEach((link) => {
      const label = link.textContent.trim().toLowerCase();
      if (!label.includes('soluções') && !label.includes('solucoes')) return;
      link.setAttribute('href', 'solucoes.html');
      link.removeAttribute('data-nav-solutions');
    });
  };

  routeSolutionsNavigation();

  const routeObserver = new MutationObserver(routeSolutionsNavigation);
  routeObserver.observe(document.querySelector('main') || document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href']
  });

  const routeInterval = window.setInterval(routeSolutionsNavigation, 350);
  window.setTimeout(() => {
    routeSolutionsNavigation();
    routeObserver.disconnect();
    window.clearInterval(routeInterval);
  }, 11000);

  const diagnosticRequest = new URLSearchParams(window.location.search).get('diagnostico');
  if (diagnosticRequest === '1') {
    const openRequestedDiagnostic = () => {
      window.setTimeout(() => {
        document.querySelector('[data-diagnostic-open]')?.click();
      }, 700);
    };

    if (document.readyState === 'complete') openRequestedDiagnostic();
    else window.addEventListener('load', openRequestedDiagnostic, { once: true });
  }

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