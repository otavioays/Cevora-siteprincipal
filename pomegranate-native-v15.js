(() => {
  'use strict';

  const STYLE_ID = 'cevora-pomegranate-direct-v16';
  const SELECTOR = '.system-console__symbol, .detail-console__symbol';

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      ${SELECTOR} {
        position: relative !important;
        z-index: 3 !important;
        display: block !important;
        width: 118px !important;
        height: 112px !important;
        min-width: 118px !important;
        min-height: 112px !important;
        overflow: visible !important;
        border: 1px solid rgba(240, 204, 130, .34) !important;
        border-radius: 48% 52% 50% 50% / 42% 42% 58% 58% !important;
        background:
          radial-gradient(circle at 69% 23%, rgba(255, 147, 151, .98) 0 4%, rgba(213, 35, 59, .94) 17%, transparent 38%),
          radial-gradient(circle at 27% 36%, rgba(255, 169, 164, .34), transparent 29%),
          radial-gradient(circle at 52% 70%, #7d111d 0, #43060f 58%, #1b0106 100%),
          linear-gradient(135deg, #d52440 0, #80101f 48%, #250208 100%) !important;
        box-shadow:
          inset 15px 10px 24px rgba(255, 197, 181, .13),
          inset -20px -18px 34px rgba(12, 0, 3, .78),
          inset 0 0 0 1px rgba(255, 255, 255, .035),
          0 20px 34px rgba(0, 0, 0, .5),
          0 0 42px rgba(125, 17, 29, .35) !important;
        filter: none !important;
        transform-origin: 50% 70%;
        animation: cevoraFruitFloatV16 5.6s ease-in-out infinite;
        isolation: isolate;
      }

      ${SELECTOR} > * {
        display: none !important;
      }

      ${SELECTOR}::before {
        content: '';
        position: absolute;
        z-index: 4;
        left: 50%;
        top: -37px;
        width: 82px;
        height: 47px;
        transform: translateX(-50%);
        clip-path: polygon(
          0 100%,
          12% 33%,
          27% 78%,
          37% 4%,
          50% 70%,
          63% 4%,
          73% 78%,
          88% 33%,
          100% 100%,
          72% 88%,
          50% 100%,
          28% 88%
        );
        background:
          linear-gradient(104deg, #4a2206 0, #d39b3d 25%, #fff0aa 45%, #b76c1d 68%, #321303 100%);
        filter: drop-shadow(0 5px 7px rgba(0, 0, 0, .62));
      }

      ${SELECTOR}::after {
        content: '';
        position: absolute;
        z-index: 2;
        left: 16px;
        top: 13px;
        width: 34px;
        height: 67px;
        border-radius: 50%;
        background: linear-gradient(105deg, rgba(255, 255, 255, .48), rgba(255, 190, 180, .13) 43%, transparent 74%);
        filter: blur(.7px);
        transform: rotate(18deg);
        opacity: .58;
        pointer-events: none;
      }

      @keyframes cevoraFruitFloatV16 {
        0%, 100% { transform: translateY(1px) rotate(-.35deg); }
        50% { transform: translateY(-5px) rotate(.45deg); }
      }

      @media (max-width: 560px) {
        ${SELECTOR} {
          width: 104px !important;
          height: 100px !important;
          min-width: 104px !important;
          min-height: 100px !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        ${SELECTOR} { animation: none; }
      }
    `;
    document.head.appendChild(style);
  }

  const mount = () => {
    document.querySelectorAll(SELECTOR).forEach((container) => {
      if (container.dataset.pomegranateRendered === 'v16' && container.children.length === 0) return;
      container.replaceChildren();
      container.setAttribute('role', 'img');
      container.setAttribute('aria-label', 'Romã, símbolo da Cevora');
      container.dataset.pomegranateRendered = 'v16';
    });
  };

  mount();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  }

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 8000);
})();