(() => {
  'use strict';

  const STYLE_ID = 'cevora-pomegranate-native-v15';
  const SELECTOR = '.system-console__symbol, .detail-console__symbol';

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      ${SELECTOR} > img { display: none !important; visibility: hidden !important; }
      ${SELECTOR}.has-native-pomegranate { overflow: visible; isolation: isolate; }
      .cevora-pomegranate-v15 {
        position: relative;
        display: block;
        width: 112px;
        height: 128px;
        filter: drop-shadow(0 20px 22px rgba(0,0,0,.58));
        animation: cevoraPomegranateFloat 5.6s ease-in-out infinite;
      }
      .cevora-pomegranate-v15::before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 112px;
        height: 112px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(182,39,55,.42), rgba(125,17,29,.16) 45%, transparent 72%);
        filter: blur(13px);
        transform: translateX(-50%);
        z-index: -2;
      }
      .cevora-pomegranate-v15__fruit {
        position: absolute;
        left: 50%;
        bottom: 7px;
        width: 98px;
        height: 94px;
        overflow: hidden;
        border: 1px solid rgba(240,204,130,.28);
        border-radius: 47% 53% 52% 48% / 40% 42% 58% 60%;
        background:
          radial-gradient(circle at 67% 24%, rgba(255,132,139,.98) 0 5%, rgba(202,27,52,.93) 20%, transparent 39%),
          radial-gradient(circle at 28% 37%, rgba(255,151,151,.34), transparent 29%),
          radial-gradient(circle at 54% 68%, #821020, #36050d 72%),
          linear-gradient(135deg, #c91d36, #78101f 50%, #230208);
        box-shadow:
          inset 14px 8px 22px rgba(255,190,177,.13),
          inset -18px -16px 30px rgba(15,0,3,.75),
          0 13px 28px rgba(0,0,0,.46),
          0 0 34px rgba(125,17,29,.24);
        transform: translateX(-50%);
      }
      .cevora-pomegranate-v15__fruit::before {
        content: '';
        position: absolute;
        inset: -15%;
        opacity: .4;
        background:
          repeating-radial-gradient(ellipse at 30% 30%, rgba(255,232,204,.2) 0 1px, transparent 1px 8px),
          repeating-linear-gradient(118deg, transparent 0 11px, rgba(240,204,130,.055) 12px, transparent 14px 27px);
        mix-blend-mode: screen;
        transform: rotate(-8deg);
      }
      .cevora-pomegranate-v15__fruit::after {
        content: '';
        position: absolute;
        left: 15px;
        top: 10px;
        width: 31px;
        height: 63px;
        border-radius: 50%;
        background: linear-gradient(105deg, rgba(255,255,255,.42), rgba(255,181,173,.1) 43%, transparent 73%);
        filter: blur(1px);
        transform: rotate(19deg);
        opacity: .55;
      }
      .cevora-pomegranate-v15__vein {
        position: absolute;
        right: 14px;
        top: 30px;
        width: 38px;
        height: 46px;
        border-right: 1px solid rgba(240,204,130,.45);
        border-bottom: 1px solid rgba(240,204,130,.23);
        border-radius: 0 0 80% 0;
        transform: rotate(14deg);
        opacity: .68;
      }
      .cevora-pomegranate-v15__crown {
        position: absolute;
        z-index: 4;
        left: 50%;
        top: 0;
        width: 84px;
        height: 49px;
        transform: translateX(-50%);
        filter: drop-shadow(0 5px 6px rgba(0,0,0,.6));
      }
      .cevora-pomegranate-v15__crown i {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 24px;
        height: 46px;
        clip-path: polygon(50% 0, 100% 100%, 50% 82%, 0 100%);
        background: linear-gradient(105deg, #542807, #d9a449 28%, #fff1ad 47%, #a75f18 70%, #321504);
        transform-origin: 50% 100%;
      }
      .cevora-pomegranate-v15__crown i:nth-child(1) { transform: translateX(-50%) scaleY(1.07); }
      .cevora-pomegranate-v15__crown i:nth-child(2) { transform: translateX(-50%) translateX(-18px) rotate(-27deg) scale(.9); }
      .cevora-pomegranate-v15__crown i:nth-child(3) { transform: translateX(-50%) translateX(18px) rotate(27deg) scale(.9); }
      .cevora-pomegranate-v15__crown i:nth-child(4) { transform: translateX(-50%) translateX(-32px) rotate(-50deg) scale(.76); }
      .cevora-pomegranate-v15__crown i:nth-child(5) { transform: translateX(-50%) translateX(32px) rotate(50deg) scale(.76); }
      .cevora-pomegranate-v15__seeds {
        position: absolute;
        z-index: 5;
        left: 50%;
        top: 30px;
        width: 40px;
        height: 12px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 4px 4px, #f0cc82 0 1.8px, transparent 2.1px),
          radial-gradient(circle at 13px 8px, #98591d 0 1.8px, transparent 2.1px),
          radial-gradient(circle at 22px 3px, #e1ae4e 0 1.7px, transparent 2px),
          radial-gradient(circle at 31px 8px, #6c3410 0 1.8px, transparent 2.1px),
          radial-gradient(circle at 37px 3px, #dba54a 0 1.5px, transparent 1.9px);
        transform: translateX(-50%);
      }
      .cevora-pomegranate-v15__shadow {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 76px;
        height: 13px;
        border-radius: 50%;
        background: rgba(0,0,0,.72);
        filter: blur(6px);
        transform: translateX(-50%);
        z-index: -1;
      }
      @keyframes cevoraPomegranateFloat {
        0%, 100% { transform: translateY(1px) rotate(-.35deg); }
        50% { transform: translateY(-5px) rotate(.45deg); }
      }
      @media (prefers-reduced-motion: reduce) {
        .cevora-pomegranate-v15 { animation: none; }
      }
    `;
    document.head.appendChild(style);
  }

  const markup = `
    <span class="cevora-pomegranate-v15" role="img" aria-label="Romã, símbolo da Cevora">
      <span class="cevora-pomegranate-v15__crown" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <span class="cevora-pomegranate-v15__seeds" aria-hidden="true"></span>
      <span class="cevora-pomegranate-v15__fruit" aria-hidden="true"><i class="cevora-pomegranate-v15__vein"></i></span>
      <span class="cevora-pomegranate-v15__shadow" aria-hidden="true"></span>
    </span>
  `;

  const mount = () => {
    document.querySelectorAll(SELECTOR).forEach((container) => {
      container.querySelectorAll('img').forEach((image) => image.remove());
      if (container.querySelector('.cevora-pomegranate-v15')) return;
      container.replaceChildren();
      container.classList.add('has-native-pomegranate');
      container.insertAdjacentHTML('afterbegin', markup);
    });
  };

  mount();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  }

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 10000);
})();