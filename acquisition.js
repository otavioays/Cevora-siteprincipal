(() => {
  'use strict';

  if (window.__cevoraAcquisitionLoaded) return;
  window.__cevoraAcquisitionLoaded = true;

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sectionMarkup = `
    <section class="acquisition-section frame-corners" id="acquisition" aria-labelledby="acquisitionTitle">
      <div class="acquisition__content section-reveal">
        <div class="early-access-pill"><i aria-hidden="true"></i> Produto em desenvolvimento</div>
        <div class="eyebrow acquisition__eyebrow">
          <span class="eyebrow__icon" aria-hidden="true">
            <svg viewBox="0 0 44 24"><path d="M22 2c2 5 2 9 0 14-2-5-2-9 0-14Z"/><path d="M9 5c6 2 10 6 12 11-6-2-10-6-12-11Z"/><path d="M35 5c-6 2-10 6-12 11 6-2 10-6 12-11Z"/><path d="M2 13c7 0 12 2 18 7-7 0-12-2-18-7Z"/><path d="M42 13c-7 0-12 2-18 7 7 0 12-2 18-7Z"/></svg>
          </span>
          Acesso antecipado para clínicas fundadoras
        </div>

        <h2 class="acquisition__title" id="acquisitionTitle">
          <span class="gold-gradient">Cevora</span>
          <span>Acquisition <em>OS</em></span>
        </h2>

        <div class="title-rule acquisition__rule" aria-hidden="true"><span></span><i>✦</i><span></span></div>
        <p class="acquisition__copy">Sua clínica já possui dados. Agora ela precisa de direção.</p>
        <p class="acquisition__support">Uma IA especializada que conecta campanhas, páginas, contatos e agendamentos para mostrar o que está funcionando, onde oportunidades estão sendo perdidas e qual deve ser o próximo movimento.</p>

        <div class="founders-note">
          <strong>Programa de clínicas fundadoras</strong>
          Implantação assistida, acesso prioritário e participação direta na evolução da plataforma.
        </div>

        <div class="acquisition__actions">
          <button class="button button--primary acquisition-magnetic" type="button" data-acquisition-contact>
            <span class="acquisition-target" aria-hidden="true">◎</span>
            <span>Quero acesso antecipado</span>
            <i aria-hidden="true">↗</i>
          </button>
          <button class="button button--ghost acquisition-magnetic" type="button" data-acquisition-open>
            <span class="play-icon" aria-hidden="true">▶</span>
            <span>Ver como vai funcionar</span>
          </button>
        </div>

        <div class="acquisition-benefits" aria-label="Recursos planejados para o Acquisition OS">
          <div class="acquisition-benefit" data-acquisition-tilt><span>⌖</span><strong>Atribuição real</strong></div>
          <div class="acquisition-benefit" data-acquisition-tilt><span>◉</span><strong>Diagnóstico automático</strong></div>
          <div class="acquisition-benefit" data-acquisition-tilt><span>✦</span><strong>Prioridades diárias</strong></div>
          <div class="acquisition-benefit" data-acquisition-tilt><span>◫</span><strong>Visão por procedimento</strong></div>
        </div>
      </div>

      <div class="acquisition__visual parallax-zone section-reveal" aria-label="Demonstração visual do Cevora Acquisition OS">
        <div class="acquisition-orbit acquisition-orbit--outer" aria-hidden="true"><span></span><i></i></div>
        <div class="acquisition-orbit acquisition-orbit--inner" aria-hidden="true"><span></span></div>
        <div class="acquisition-glow" aria-hidden="true"></div>

        <div class="acquisition-lion parallax-layer" data-depth="0.065">
          <img src="assets/acquisition-lion.svg" alt="Leão preto, dourado e vermelho, símbolo de comando do Cevora Acquisition OS" />
        </div>

        <article class="acquisition-card radar-card parallax-layer" data-depth="0.14" data-acquisition-float="1">
          <header class="acquisition-card__header"><span>⌖</span><strong>Radar de aquisição</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="radar-grid" aria-hidden="true"><div class="radar-sweep"></div><i class="radar-node"></i><i class="radar-node"></i><i class="radar-node"></i><i class="radar-node"></i></div>
          <div class="radar-labels"><span>Campanhas</span><span>Páginas</span><span>Contatos</span><span>Agenda</span></div>
        </article>

        <article class="acquisition-card priority-card parallax-layer" data-depth="0.1" data-acquisition-float="2">
          <header class="acquisition-card__header"><span>✦</span><strong>Prioridade do dia</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="priority-body">
            <span class="priority-tag">IA analisando a operação</span>
            <h3 id="priorityTitle">Rinoplastia precisa de atenção.</h3>
            <p id="priorityCopy">Os contatos cresceram, mas a passagem para avaliação caiu nos últimos sete dias.</p>
            <div class="priority-action"><i>↗</i><span id="priorityAction">Próximo movimento: revisar a qualificação inicial e a origem dos contatos.</span></div>
          </div>
        </article>

        <article class="acquisition-card access-card parallax-layer" data-depth="0.08" data-acquisition-float="3">
          <header class="acquisition-card__header"><span>◈</span><strong>Acesso antecipado</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="access-body">
            <div class="access-status"><i aria-hidden="true"></i><div><strong>Fase piloto aberta</strong><span>Entrada assistida pela Cevora</span></div></div>
            <div class="access-list"><span>Implantação personalizada</span><span>Influência no produto</span><span>Prioridade nas integrações</span><span>Condição de fundadora</span></div>
            <div class="founder-limit"><small>Programa inicial</small><strong>10 clínicas</strong></div>
          </div>
        </article>

        <article class="acquisition-card procedure-card parallax-layer" data-depth="0.12" data-acquisition-float="4">
          <header class="acquisition-card__header"><span>◫</span><strong>Visão por procedimento</strong><button type="button" aria-label="Mais opções">•••</button></header>
          <div class="procedure-body">
            <div class="procedure-tabs">
              <button class="is-active" type="button" data-procedure="rino">Rinoplastia</button>
              <button type="button" data-procedure="mama">Prótese mamária</button>
              <button type="button" data-procedure="abdo">Abdominoplastia</button>
              <button type="button" data-procedure="face">Lifting facial</button>
            </div>
            <div class="procedure-metric"><span>Oportunidades analisadas</span><strong id="procedureMetric">128</strong></div>
          </div>
        </article>
      </div>

      <div class="acquisition-bridge" aria-hidden="true"><span></span><i>O leão observa. A IA interpreta. A clínica decide.</i><span></span></div>
    </section>`;

  const modalMarkup = `
    <div class="modal" id="acquisitionModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="acquisitionModalTitle">
      <div class="modal__backdrop" data-acquisition-close></div>
      <div class="modal__panel frame-corners">
        <button class="modal__close" type="button" aria-label="Fechar apresentação" data-acquisition-close>×</button>
        <span class="modal__eyebrow">Cevora Founders Circle™</span>
        <h2 id="acquisitionModalTitle">Entre antes. Ajude a construir melhor.</h2>
        <p>O Acquisition OS ainda está em desenvolvimento. As primeiras clínicas participarão da fase piloto com acompanhamento próximo e acesso prioritário às novas funcionalidades.</p>
        <div class="acquisition-modal-grid">
          <article><span>01</span><strong>Implantação assistida</strong><small>A Cevora ajuda a organizar as primeiras fontes de dados e a leitura da jornada.</small></article>
          <article><span>02</span><strong>IA especializada</strong><small>Recomendações orientadas por procedimento, meta, capacidade e histórico da clínica.</small></article>
          <article><span>03</span><strong>Influência direta</strong><small>As clínicas fundadoras ajudam a priorizar recursos e integrações realmente úteis.</small></article>
          <article><span>04</span><strong>Condição de fundadora</strong><small>Entrada limitada às dez clínicas da primeira fase do produto.</small></article>
        </div>
        <button class="button button--primary" type="button" data-acquisition-modal-contact><span>Solicitar acesso antecipado</span><i>↗</i></button>
      </div>
    </div>`;

  const openContactFor = (product, eyebrow, title, copy, submit) => {
    const contact = qs('#contactModal');
    if (!contact) return;
    const contactEyebrow = qs('.modal__eyebrow', contact);
    const contactTitle = qs('#contactTitle', contact);
    const contactCopy = contactTitle?.nextElementSibling;
    const submitText = qs('#leadForm button[type="submit"] span');
    if (contactEyebrow) contactEyebrow.textContent = eyebrow;
    if (contactTitle) contactTitle.textContent = title;
    if (contactCopy) contactCopy.textContent = copy;
    if (submitText) submitText.textContent = submit;
    const form = qs('#leadForm');
    if (form) {
      let hidden = qs('input[name="produto"]', form);
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'produto';
        form.append(hidden);
      }
      hidden.value = product;
    }
    contact.classList.add('is-open');
    contact.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => qs('input', contact)?.focus(), 80);
  };

  const initParallax = (visual) => {
    if (!visual || reduceMotion) return;
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
  };

  const init = () => {
    const section = qs('#acquisition');
    const modal = qs('#acquisitionModal');
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

    qsa('[data-acquisition-open]').forEach((button) => button.addEventListener('click', openModal));
    qsa('[data-acquisition-close]').forEach((button) => button.addEventListener('click', closeModal));
    qsa('[data-acquisition-contact], [data-acquisition-modal-contact]').forEach((button) => button.addEventListener('click', () => {
      closeModal();
      openContactFor(
        'Cevora Acquisition OS - Acesso antecipado',
        'Acesso antecipado para clínicas fundadoras',
        'Entre na primeira fase do Cevora Acquisition OS.',
        'Envie os dados da clínica para receber os detalhes do programa piloto e da implantação assistida.',
        'Solicitar acesso antecipado'
      );
    }));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });

    const procedureData = {
      rino: { metric: 128, title: 'Rinoplastia precisa de atenção.', copy: 'Os contatos cresceram, mas a passagem para avaliação caiu nos últimos sete dias.', action: 'Próximo movimento: revisar a qualificação inicial e a origem dos contatos.' },
      mama: { metric: 94, title: 'Prótese mamária tem espaço para escala.', copy: 'A página mantém boa conversão e a agenda ainda possui capacidade disponível.', action: 'Próximo movimento: testar aumento gradual de orçamento com limite de custo.' },
      abdo: { metric: 76, title: 'Abdominoplastia perde força na página.', copy: 'Os anúncios geram interesse, mas poucos visitantes iniciam uma conversa.', action: 'Próximo movimento: revisar mensagem, prova e chamada para avaliação.' },
      face: { metric: 51, title: 'Lifting facial exige mais confiança.', copy: 'O volume é menor e as dúvidas aparecem antes da solicitação de avaliação.', action: 'Próximo movimento: reforçar autoridade e responder objeções na jornada.' }
    };

    qsa('[data-procedure]', section).forEach((button) => button.addEventListener('click', () => {
      qsa('[data-procedure]', section).forEach((item) => item.classList.toggle('is-active', item === button));
      const data = procedureData[button.dataset.procedure];
      qs('#priorityTitle', section).textContent = data.title;
      qs('#priorityCopy', section).textContent = data.copy;
      qs('#priorityAction', section).textContent = data.action;
      const metric = qs('#procedureMetric', section);
      if (window.gsap && !reduceMotion) {
        const state = { value: Number(metric.textContent) || 0 };
        window.gsap.to(state, { value: data.metric, duration: .6, ease: 'power2.out', onUpdate: () => { metric.textContent = Math.round(state.value); } });
      } else metric.textContent = data.metric;
    }));

    qsa('[data-acquisition-tilt]', section).forEach((card) => {
      if (reduceMotion) return;
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    qsa('.acquisition-magnetic', section).forEach((button) => {
      if (reduceMotion) return;
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .08}px, ${(event.clientY - rect.top - rect.height / 2) * .12}px) translateY(-3px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });

    initParallax(qs('.acquisition__visual', section));

    let animated = false;
    const reveal = () => {
      if (animated) return;
      animated = true;
      qsa('.section-reveal', section).forEach((element, index) => setTimeout(() => element.classList.add('is-visible'), index * 130));
      const gsap = window.gsap;
      if (!gsap || reduceMotion) return;
      gsap.from('.acquisition-lion', { opacity: 0, scale: .82, y: 58, duration: 1.55, ease: 'power4.out' });
      gsap.from('.acquisition-card', { opacity: 0, x: 48, stagger: .14, duration: 1, delay: .2, ease: 'power3.out' });
      qsa('[data-acquisition-float]', section).forEach((card, index) => {
        gsap.to(card, { y: index % 2 === 0 ? -8 : 7, duration: 3.1 + index * .35, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      }, { threshold: .2 });
      observer.observe(section);
    } else reveal();
  };

  const loadFunnel = () => {
    if (qs('script[src="funnel.js"]')) return;
    const script = document.createElement('script');
    script.src = 'funnel.js';
    script.defer = true;
    document.body.append(script);
  };

  const mount = () => {
    if (qs('#acquisition')) {
      loadFunnel();
      return;
    }
    const main = qs('main');
    if (!main) return;
    const course = qs('#course');
    if (course) course.insertAdjacentHTML('afterend', sectionMarkup);
    else main.insertAdjacentHTML('beforeend', sectionMarkup);
    if (!qs('#acquisitionModal')) document.body.insertAdjacentHTML('beforeend', modalMarkup);
    init();
    loadFunnel();
  };

  if (qs('#course')) mount();
  else {
    const observer = new MutationObserver(() => {
      if (qs('#course')) {
        observer.disconnect();
        mount();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      mount();
    }, 2500);
  }
})();
