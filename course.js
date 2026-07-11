(() => {
  'use strict';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const courseMarkup = `
    <section class="course-section frame-corners" id="course" aria-labelledby="courseTitle">
      <div class="course__ornament course__ornament--one" aria-hidden="true"></div>
      <div class="course__ornament course__ornament--two" aria-hidden="true"></div>

      <div class="course__content section-reveal">
        <div class="eyebrow course__eyebrow">
          <span class="course-cap" aria-hidden="true">⌂</span>
          Formação avançada para cirurgiões plásticos
        </div>

        <h2 class="course__title" id="courseTitle">
          <span class="gold-gradient">Cevora</span>
          <span>Clínica Próspera</span>
        </h2>

        <div class="title-rule course__rule" aria-hidden="true"><span></span><i>✦</i><span></span></div>

        <p class="course__copy">Domine os sistemas que atraem, convertem e multiplicam oportunidades para sua clínica.</p>
        <p class="course__support">Aprenda a identificar gargalos, melhorar conversões e construir uma clínica mais previsível.</p>

        <div class="course__actions">
          <button class="button button--primary magnetic" type="button" data-open="contact" data-product="Cevora Clínica Próspera">
            <span class="course-target" aria-hidden="true">◎</span>
            <span>Quero dominar o crescimento</span>
            <i aria-hidden="true">↗</i>
          </button>
          <button class="button button--ghost magnetic" type="button" data-course-open>
            <span class="play-icon" aria-hidden="true">▶</span>
            <span>Conhecer a formação</span>
          </button>
        </div>

        <div class="course-benefits" aria-label="Diferenciais da formação">
          <div class="course-benefit" data-tilt><span>▤</span><strong>Método completo</strong></div>
          <div class="course-benefit" data-tilt><span>⚒</span><strong>Ferramentas práticas</strong></div>
          <div class="course-benefit" data-tilt><span>♙</span><strong>Aplicação guiada</strong></div>
          <div class="course-benefit" data-tilt><span>▣</span><strong>Plano de 90 dias</strong></div>
        </div>
      </div>

      <div class="course__visual parallax-zone section-reveal" aria-label="Visualização da formação Cevora Clínica Próspera">
        <div class="course-orbit course-orbit--outer" aria-hidden="true"><span></span><i></i></div>
        <div class="course-orbit course-orbit--inner" aria-hidden="true"><span></span></div>
        <div class="course-glow" aria-hidden="true"></div>

        <div class="fortune-frog parallax-layer" data-depth="0.07">
          <img src="assets/fortune-frog.svg" alt="Sapo da fortuna preto, dourado e vermelho, símbolo do Cevora Clínica Próspera" />
        </div>

        <article class="course-card diagnostic-card parallax-layer" data-depth="0.14" data-float="8">
          <header class="course-card__header"><span>▤</span><strong>Diagnóstico da clínica</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="diagnostic-grid">
            <div class="diagnostic-item"><div class="diagnostic-ring" data-course-progress="78"><span>♙</span></div><small>Aquisição</small></div>
            <div class="diagnostic-item"><div class="diagnostic-ring" data-course-progress="63"><span>▽</span></div><small>Conversão</small></div>
            <div class="diagnostic-item"><div class="diagnostic-ring" data-course-progress="72"><span>◉</span></div><small>Atendimento</small></div>
            <div class="diagnostic-item"><div class="diagnostic-ring" data-course-progress="86"><span>▥</span></div><small>Gestão</small></div>
          </div>
        </article>

        <article class="course-card plan-card parallax-layer" data-depth="0.1" data-float="9">
          <header class="course-card__header"><span>⌛</span><strong>Plano de 90 dias</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="plan-steps">
            <div class="plan-step"><i>✓</i><strong>Semanas 1–4</strong><span>Diagnóstico profundo e análise estratégica.</span></div>
            <div class="plan-step"><i>✓</i><strong>Semanas 5–8</strong><span>Implementação das melhorias prioritárias.</span></div>
            <div class="plan-step"><i>✓</i><strong>Semanas 9–12</strong><span>Escala, refinamento e consolidação.</span></div>
          </div>
        </article>

        <article class="course-card growth-card parallax-layer" data-depth="0.08" data-float="10">
          <header class="course-card__header"><span>♜</span><strong>Índice de crescimento</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="growth-card__body">
            <div class="growth-ring" aria-label="87 por cento do potencial de crescimento identificado">
              <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="growth-ring__track" cx="60" cy="60" r="48"/><circle class="growth-ring__value" cx="60" cy="60" r="48"/></svg>
              <strong data-growth-count>0%</strong>
            </div>
            <div class="growth-copy"><strong>Potencial de crescimento identificado</strong><span>Prioridades organizadas por impacto e velocidade.</span><small>↑ +42% vs. cenário atual</small></div>
          </div>
        </article>

        <article class="course-card method-card parallax-layer" data-depth="0.12" data-float="11">
          <strong>Método Fortuna Clínica</strong>
          <div class="method-pipeline">
            <div class="method-pillar"><i>◎</i><span>Atrair</span></div>
            <div class="method-pillar"><i>▽</i><span>Converter</span></div>
            <div class="method-pillar"><i>♙</i><span>Atender</span></div>
            <div class="method-pillar"><i>▥</i><span>Medir</span></div>
            <div class="method-pillar"><i>↗</i><span>Multiplicar</span></div>
          </div>
        </article>
      </div>

      <div class="course-bridge" aria-hidden="true"><span></span><i>Pare de depender da sorte para crescer.</i><span></span></div>
    </section>`;

  const modalMarkup = `
    <div class="modal" id="courseModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="courseModalTitle">
      <div class="modal__backdrop" data-course-close></div>
      <div class="modal__panel course-modal frame-corners">
        <button class="modal__close" type="button" aria-label="Fechar formação" data-course-close>×</button>
        <span class="modal__eyebrow">Método Fortuna Clínica™</span>
        <h2 id="courseModalTitle">Conhecimento que vira sistema.</h2>
        <p>A formação conecta aquisição, conversão, atendimento, gestão e multiplicação para que a clínica saiba onde agir primeiro.</p>
        <div class="course-modal-grid">
          <article><span>01</span><strong>Atrair</strong><small>Gerar interesse de pacientes compatíveis com o posicionamento da clínica.</small></article>
          <article><span>02</span><strong>Converter</strong><small>Transformar visitas e contatos em avaliações com menos fricção.</small></article>
          <article><span>03</span><strong>Atender</strong><small>Construir uma experiência consistente do primeiro contato à consulta.</small></article>
          <article><span>04</span><strong>Medir</strong><small>Usar indicadores simples para encontrar gargalos e prioridades.</small></article>
          <article><span>05</span><strong>Multiplicar</strong><small>Refinar o sistema sem reconstruir toda a operação a cada mês.</small></article>
        </div>
        <button class="button button--primary" type="button" data-course-close data-open="contact" data-product="Cevora Clínica Próspera"><span>Quero conhecer a formação</span><i>↗</i></button>
      </div>
    </div>`;

  const main = qs('main');
  if (main && !qs('#course')) main.insertAdjacentHTML('beforeend', courseMarkup);
  if (!qs('#courseModal')) document.body.insertAdjacentHTML('beforeend', modalMarkup);

  const section = qs('#course');
  const modal = qs('#courseModal');

  const openModal = () => {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => qs('button', modal)?.focus(), 80);
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  qsa('[data-course-open]').forEach((button) => button.addEventListener('click', openModal));
  qsa('[data-course-close]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal(); });

  let animated = false;
  const reveal = () => {
    if (animated || !section) return;
    animated = true;
    qsa('.section-reveal', section).forEach((el, index) => window.setTimeout(() => el.classList.add('is-visible'), index * 130));

    const gsap = window.gsap;
    const rings = qsa('[data-course-progress]', section);
    if (reduceMotion || !gsap) {
      rings.forEach((ring) => ring.style.setProperty('--progress', `${Number(ring.dataset.courseProgress) * 3.6}deg`));
      const count = qs('[data-growth-count]', section);
      if (count) count.textContent = '87%';
      const circle = qs('.growth-ring__value', section);
      if (circle) circle.style.strokeDashoffset = '39.2';
      return;
    }

    gsap.from('.fortune-frog', { opacity: 0, scale: .82, y: 58, duration: 1.55, ease: 'power4.out' });
    gsap.from('.course-card', { opacity: 0, x: 48, stagger: .14, duration: 1, delay: .2, ease: 'power3.out' });
    rings.forEach((ring, index) => {
      const state = { value: 0 };
      gsap.to(state, {
        value: Number(ring.dataset.courseProgress) * 3.6,
        duration: 1.35,
        delay: .35 + index * .08,
        ease: 'power3.out',
        onUpdate: () => ring.style.setProperty('--progress', `${state.value}deg`)
      });
    });
    gsap.to('.growth-ring__value', { strokeDashoffset: 39.2, duration: 1.8, delay: .55, ease: 'power3.out' });
    const growth = { value: 0 };
    gsap.to(growth, {
      value: 87,
      duration: 1.65,
      delay: .55,
      ease: 'power3.out',
      onUpdate() {
        const target = qs('[data-growth-count]', section);
        if (target) target.textContent = `${Math.round(growth.value)}%`;
      }
    });
    gsap.from('.plan-step', { opacity: 0, y: 12, stagger: .15, duration: .55, delay: .45, ease: 'power2.out' });
    gsap.from('.method-pillar', { opacity: 0, y: 10, stagger: .1, duration: .55, delay: .75, ease: 'power2.out' });
  };

  if ('IntersectionObserver' in window && section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      });
    }, { threshold: .22 });
    observer.observe(section);
  } else {
    reveal();
  }
})();

(() => {
  if (document.querySelector('script[src="acquisition.js"]')) return;
  const script = document.createElement('script');
  script.src = 'acquisition.js';
  script.defer = true;
  document.body.appendChild(script);
})();
