(() => {
  'use strict';

  if (window.__cevoraFunnelLoaded) return;
  window.__cevoraFunnelLoaded = true;

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sectionMarkup = `
    <section class="funnel-section frame-corners" id="prosperity-engine" aria-labelledby="funnelTitle">
      <div class="funnel__content section-reveal">
        <div class="eyebrow funnel__eyebrow">
          <span class="eyebrow__icon" aria-hidden="true">
            <svg viewBox="0 0 44 24"><path d="M22 2c2 5 2 9 0 14-2-5-2-9 0-14Z"/><path d="M9 5c6 2 10 6 12 11-6-2-10-6-12-11Z"/><path d="M35 5c-6 2-10 6-12 11 6-2 10-6 12-11Z"/><path d="M2 13c7 0 12 2 18 7-7 0-12-2-18-7Z"/><path d="M42 13c-7 0-12 2-18 7 7 0 12-2 18-7Z"/></svg>
          </span>
          Implantação completa para cirurgiões plásticos
        </div>

        <h2 class="funnel__title" id="funnelTitle">
          <span class="gold-gradient">Cevora</span>
          <span>Prosperity <em>Engine</em></span>
        </h2>

        <div class="title-rule funnel__rule" aria-hidden="true"><span></span><i>✦</i><span></span></div>
        <p class="funnel__copy">Pare de comprar peças soltas. Construa o sistema inteiro.</p>
        <p class="funnel__support">Estratégia, aquisição, página, atendimento, acompanhamento e dados conectados em um único funil implantado para transformar interesse em avaliações com mais consistência.</p>

        <div class="funnel-capacity"><i aria-hidden="true"></i><span><strong>Apenas 2</strong> novas implantações completas por mês</span></div>

        <div class="funnel__actions">
          <button class="button button--primary funnel-magnetic" type="button" data-funnel-contact>
            <span class="funnel-target" aria-hidden="true">◎</span>
            <span>Quero implantar meu funil</span>
            <i aria-hidden="true">↗</i>
          </button>
          <button class="button button--ghost funnel-magnetic" type="button" data-funnel-open>
            <span class="play-icon" aria-hidden="true">▶</span>
            <span>Conhecer a estrutura</span>
          </button>
        </div>

        <div class="funnel-benefits" aria-label="Componentes do Prosperity Engine">
          <div class="funnel-benefit" data-funnel-tilt><span>⌖</span><strong>Estratégia completa</strong></div>
          <div class="funnel-benefit" data-funnel-tilt><span>◇</span><strong>Página de conversão</strong></div>
          <div class="funnel-benefit" data-funnel-tilt><span>◉</span><strong>Atendimento inteligente</strong></div>
          <div class="funnel-benefit" data-funnel-tilt><span>↗</span><strong>Otimização contínua</strong></div>
        </div>
      </div>

      <div class="funnel__visual parallax-zone section-reveal" aria-label="Visualização do Cevora Prosperity Engine">
        <div class="funnel-orbit funnel-orbit--outer" aria-hidden="true"><span></span><i></i></div>
        <div class="funnel-orbit funnel-orbit--inner" aria-hidden="true"><span></span></div>
        <div class="funnel-glow" aria-hidden="true"></div>

        <div class="funnel-orange parallax-layer" data-depth="0.065">
          <img src="assets/prosperity-orange.svg" alt="Laranja luxuosa dourada e rubi, símbolo de prosperidade do Cevora Prosperity Engine" />
        </div>

        <article class="funnel-card chain-card parallax-layer" data-depth="0.14" data-funnel-float="1">
          <header class="funnel-card__header"><span>⛓</span><strong>Corrente de prosperidade</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="chain-track" aria-label="Etapas do funil implantado">
            <div class="chain-step is-active" data-chain-step="0"><i>01</i><span>Posicionar</span></div>
            <div class="chain-step" data-chain-step="1"><i>02</i><span>Atrair</span></div>
            <div class="chain-step" data-chain-step="2"><i>03</i><span>Convencer</span></div>
            <div class="chain-step" data-chain-step="3"><i>04</i><span>Converter</span></div>
            <div class="chain-step" data-chain-step="4"><i>05</i><span>Acompanhar</span></div>
            <div class="chain-step" data-chain-step="5"><i>06</i><span>Otimizar</span></div>
          </div>
          <div class="chain-message" id="chainMessage">Oferta, procedimento prioritário e paciente ideal alinhados.</div>
        </article>

        <article class="funnel-card operating-card parallax-layer" data-depth="0.1" data-funnel-float="2">
          <header class="funnel-card__header"><span>▽</span><strong>Funil em operação</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="funnel-bars">
            <div class="funnel-row"><span>Visitantes</span><strong data-funnel-count="1240">0</strong></div>
            <div class="funnel-row"><span>Contatos</span><strong data-funnel-count="186">0</strong></div>
            <div class="funnel-row"><span>Qualificados</span><strong data-funnel-count="112">0</strong></div>
            <div class="funnel-row"><span>Avaliações</span><strong data-funnel-count="64">0</strong></div>
            <div class="funnel-row"><span>Comparecimentos</span><strong data-funnel-count="51">0</strong></div>
          </div>
          <div class="funnel-rate"><span>Jornada rastreável</span><strong data-funnel-rate>0%</strong></div>
        </article>

        <article class="funnel-card connected-card parallax-layer" data-depth="0.12" data-funnel-float="3">
          <header class="funnel-card__header"><span>◎</span><strong>Sistema conectado</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="connected-map">
            <svg viewBox="0 0 300 150" aria-hidden="true"><path d="M61 29 150 75 240 29M61 121 150 75 240 121"/></svg>
            <span class="system-node is-core">Prosperity Engine</span>
            <span class="system-node">Campanhas</span>
            <span class="system-node">Página</span>
            <span class="system-node">Concierge</span>
            <span class="system-node">Dados</span>
          </div>
        </article>

        <article class="funnel-card status-card parallax-layer" data-depth="0.08" data-funnel-float="4">
          <header class="funnel-card__header"><span>✓</span><strong>Status de implantação</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="implementation-list">
            <div class="implementation-item is-done"><i>✓</i><strong>Estratégia definida</strong><span>Concluído</span></div>
            <div class="implementation-item is-done"><i>✓</i><strong>Pesquisa e copy</strong><span>Concluído</span></div>
            <div class="implementation-item is-done"><i>✓</i><strong>Página construída</strong><span>Concluído</span></div>
            <div class="implementation-item is-done"><i>✓</i><strong>Automação configurada</strong><span>Concluído</span></div>
            <div class="implementation-item"><i>•</i><strong>Rastreamento e testes</strong><span>Em andamento</span></div>
            <div class="implementation-item"><i>•</i><strong>Otimização inicial</strong><span>Próximo</span></div>
          </div>
          <div class="implementation-progress" aria-label="Implantação 78 por cento concluída"><span></span></div>
        </article>
      </div>

      <div class="funnel-bridge" aria-hidden="true"><span></span><i>Crescimento nasce de um sistema que trabalha inteiro.</i><span></span></div>

      <footer class="site-footer" id="contato">
        <div class="site-footer__statement">Crescimento não nasce de uma peça brilhante. <strong>Nasce de um sistema que trabalha inteiro.</strong></div>
        <div class="site-footer__brand"><b>CEVORA</b>Crescimento. Valor. Prosperidade.</div>
      </footer>
    </section>`;

  const modalMarkup = `
    <div class="modal" id="funnelModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="funnelModalTitle">
      <div class="modal__backdrop" data-funnel-close></div>
      <div class="modal__panel frame-corners">
        <button class="modal__close" type="button" aria-label="Fechar estrutura" data-funnel-close>×</button>
        <span class="modal__eyebrow">Método Corrente de Prosperidade™</span>
        <h2 id="funnelModalTitle">Nenhum elo sozinho constrói crescimento.</h2>
        <p>O Prosperity Engine implanta a jornada completa, conectando cada etapa para reduzir os espaços onde oportunidades e investimento costumam desaparecer.</p>
        <div class="funnel-modal-grid">
          <article><span>01</span><strong>Posicionar e atrair</strong><small>Definição da oferta, paciente ideal, mensagens, campanhas e criativos.</small></article>
          <article><span>02</span><strong>Convencer e converter</strong><small>Copy, design premium, página mobile e caminho claro até a avaliação.</small></article>
          <article><span>03</span><strong>Acompanhar</strong><small>Atendimento inicial, qualificação, retomadas e transferência para a equipe.</small></article>
          <article><span>04</span><strong>Medir e otimizar</strong><small>Rastreamento, leitura dos gargalos e ajustes prioritários após a publicação.</small></article>
        </div>
        <button class="button button--primary" type="button" data-funnel-modal-contact><span>Quero implantar o sistema completo</span><i>↗</i></button>
      </div>
    </div>`;

  const openContact = () => {
    const contact = qs('#contactModal');
    if (!contact) return;
    const eyebrow = qs('.modal__eyebrow', contact);
    const title = qs('#contactTitle', contact);
    const copy = title?.nextElementSibling;
    const submitText = qs('#leadForm button[type="submit"] span');
    if (eyebrow) eyebrow.textContent = 'Implantação completa do funil de vendas';
    if (title) title.textContent = 'Construa o Cevora Prosperity Engine para sua clínica.';
    if (copy) copy.textContent = 'Envie os dados para uma avaliação inicial da estrutura e da disponibilidade de implantação.';
    if (submitText) submitText.textContent = 'Solicitar diagnóstico do funil';
    const form = qs('#leadForm');
    if (form) {
      let hidden = qs('input[name="produto"]', form);
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'produto';
        form.append(hidden);
      }
      hidden.value = 'Cevora Prosperity Engine - Implantação completa';
    }
    contact.classList.add('is-open');
    contact.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => qs('input', contact)?.focus(), 80);
  };

  const init = () => {
    const section = qs('#prosperity-engine');
    const modal = qs('#funnelModal');
    if (!section || !modal) return;

    const openModal = () => {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => qs('button', modal)?.focus(), 80);
    };
    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    qsa('[data-funnel-open]').forEach((button) => button.addEventListener('click', openModal));
    qsa('[data-funnel-close]').forEach((button) => button.addEventListener('click', closeModal));
    qsa('[data-funnel-contact], [data-funnel-modal-contact]').forEach((button) => button.addEventListener('click', () => {
      closeModal();
      openContact();
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    const chainMessages = [
      'Oferta, procedimento prioritário e paciente ideal alinhados.',
      'Campanhas e criativos atraem interesse compatível com a clínica.',
      'Copy, provas e design transformam atenção em confiança.',
      'A página reduz fricção e conduz ao próximo passo.',
      'Atendimento e retomadas impedem oportunidades de desaparecer.',
      'Dados revelam o gargalo e orientam a próxima melhoria.'
    ];
    let activeStep = 0;
    const selectChain = (index) => {
      activeStep = index;
      qsa('[data-chain-step]', section).forEach((step) => step.classList.toggle('is-active', Number(step.dataset.chainStep) === index));
      qs('#chainMessage', section).textContent = chainMessages[index];
    };
    qsa('[data-chain-step]', section).forEach((step) => {
      step.tabIndex = 0;
      step.addEventListener('click', () => selectChain(Number(step.dataset.chainStep)));
      step.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') selectChain(Number(step.dataset.chainStep));
      });
    });
    let chainTimer = null;
    if (!reduceMotion) chainTimer = setInterval(() => selectChain((activeStep + 1) % chainMessages.length), 2300);
    section.addEventListener('pointerenter', () => { if (chainTimer) clearInterval(chainTimer); chainTimer = null; });
    section.addEventListener('pointerleave', () => {
      if (!reduceMotion && !chainTimer) chainTimer = setInterval(() => selectChain((activeStep + 1) % chainMessages.length), 2300);
    });

    qsa('[data-funnel-tilt]', section).forEach((card) => {
      if (reduceMotion) return;
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    qsa('.funnel-magnetic', section).forEach((button) => {
      if (reduceMotion) return;
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .08}px, ${(event.clientY - rect.top - rect.height / 2) * .12}px) translateY(-3px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });

    const visual = qs('.funnel__visual', section);
    if (visual && !reduceMotion) {
      let raf = 0;
      visual.addEventListener('pointermove', (event) => {
        const rect = visual.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          qsa('.parallax-layer', visual).forEach((layer) => {
            const depth = Number(layer.dataset.depth || .05);
            layer.style.translate = `${x * depth * 110}px ${y * depth * 70}px`;
          });
        });
      });
      visual.addEventListener('pointerleave', () => {
        qsa('.parallax-layer', visual).forEach((layer) => layer.animate(
          [{ translate: getComputedStyle(layer).translate }, { translate: '0px 0px' }],
          { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }
        ));
      });
    }

    let animated = false;
    const reveal = () => {
      if (animated) return;
      animated = true;
      qsa('.section-reveal', section).forEach((element, index) => setTimeout(() => element.classList.add('is-visible'), index * 130));
      const gsap = window.gsap;
      if (!gsap || reduceMotion) {
        qsa('[data-funnel-count]', section).forEach((target) => { target.textContent = Number(target.dataset.funnelCount).toLocaleString('pt-BR'); });
        qs('[data-funnel-rate]', section).textContent = '100%';
        qs('.implementation-progress span', section).style.width = '78%';
        return;
      }

      gsap.from('.funnel-orange', { opacity: 0, scale: .8, y: 60, duration: 1.6, ease: 'power4.out' });
      gsap.from('.funnel-card', { opacity: 0, x: 50, stagger: .14, duration: 1, delay: .2, ease: 'power3.out' });
      qsa('[data-funnel-float]', section).forEach((card, index) => {
        gsap.to(card, { y: index % 2 === 0 ? -8 : 7, duration: 3.2 + index * .34, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      });
      qsa('[data-funnel-count]', section).forEach((target, index) => {
        const total = Number(target.dataset.funnelCount);
        const state = { value: 0 };
        gsap.to(state, {
          value: total,
          duration: 1.45,
          delay: .45 + index * .08,
          ease: 'power3.out',
          onUpdate: () => { target.textContent = Math.round(state.value).toLocaleString('pt-BR'); }
        });
      });
      const rate = { value: 0 };
      gsap.to(rate, { value: 100, duration: 1.5, delay: .65, ease: 'power3.out', onUpdate: () => { qs('[data-funnel-rate]', section).textContent = `${Math.round(rate.value)}%`; } });
      gsap.to('.implementation-progress span', { width: '78%', duration: 1.7, delay: .7, ease: 'power3.out' });
      gsap.from('.implementation-item', { opacity: 0, x: 12, stagger: .1, duration: .5, delay: .45, ease: 'power2.out' });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      }, { threshold: .18 });
      observer.observe(section);
    } else reveal();
  };

  const mount = () => {
    if (qs('#prosperity-engine')) return;
    const main = qs('main');
    if (!main) return;
    const acquisition = qs('#acquisition');
    if (acquisition) acquisition.insertAdjacentHTML('afterend', sectionMarkup);
    else main.insertAdjacentHTML('beforeend', sectionMarkup);
    if (!qs('#funnelModal')) document.body.insertAdjacentHTML('beforeend', modalMarkup);
    init();
  };

  if (qs('#acquisition')) mount();
  else {
    const observer = new MutationObserver(() => {
      if (qs('#acquisition')) {
        observer.disconnect();
        mount();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      mount();
    }, 3000);
  }
})();
