(() => {
  'use strict';

  if (window.__cevoraProductArchitectureLoaded) return;
  window.__cevoraProductArchitectureLoaded = true;

  const main = document.querySelector('main');
  const method = document.querySelector('#metodo');
  if (!main || !method) return;

  const legacySelectors = ['#conversion', '#course', '#acquisition', '#prosperity-engine'];
  const hideLegacySections = () => {
    legacySelectors.forEach((selector) => {
      const section = document.querySelector(selector);
      if (!section) return;
      section.classList.add('legacy-product-section');
      section.setAttribute('aria-hidden', 'true');
      section.hidden = true;
    });
  };

  const section = document.createElement('section');
  section.className = 'solutions-architecture frame-corners';
  section.id = 'solucoes';
  section.setAttribute('aria-labelledby', 'solutionsTitle');
  section.innerHTML = `
    <div class="solutions-architecture__grid" aria-hidden="true"></div>
    <div class="solutions-architecture__orb solutions-architecture__orb--gold" aria-hidden="true"></div>
    <div class="solutions-architecture__orb solutions-architecture__orb--red" aria-hidden="true"></div>

    <div class="solutions-architecture__shell">
      <div class="solutions-heading">
        <div class="solutions-heading__copy" data-solution-reveal>
          <span class="solutions-kicker"><i></i> Arquitetura de soluções</span>
          <h2 id="solutionsTitle">Uma clínica não precisa escolher entre oito automações. <em>Precisa corrigir o gargalo certo.</em></h2>
          <p>Os módulos da Cevora são combinados em pacotes progressivos. Cada nível contém o anterior e amplia a parte da jornada sob responsabilidade do sistema.</p>
        </div>

        <article class="diagnostic-entry" data-solution-reveal style="--solution-delay: 100ms">
          <span class="diagnostic-entry__label">Ponto de entrada</span>
          <div class="diagnostic-entry__scan" aria-hidden="true"><i></i><i></i><i></i></div>
          <h3>Diagnóstico de Vazamento de Confiança</h3>
          <p>Antes de recomendar tecnologia, a Cevora identifica onde a clínica perde confiança, continuidade e informação.</p>
          <div class="diagnostic-entry__nodes" aria-label="Pontos analisados no diagnóstico">
            <span>Posicionamento</span><span>WhatsApp</span><span>Preço</span><span>Agenda</span><span>Follow-up</span><span>Perdas</span>
          </div>
          <button class="button button--ghost" type="button" data-package-diagnostic>
            <span>Diagnosticar primeiro</span><i aria-hidden="true">↗</i>
          </button>
        </article>
      </div>

      <div class="package-ladder" data-solution-reveal style="--solution-delay: 160ms">
        <div class="package-ladder__rail" role="tablist" aria-label="Pacotes Cevora">
          <button class="package-selector is-active" type="button" role="tab" aria-selected="true" aria-controls="package-preconsulta" data-package-target="preconsulta">
            <small>01 · Operação essencial</small>
            <strong>Cevora Pré-Consulta</strong>
            <span>Atender e agendar</span>
            <div class="package-selector__modules"><i>Concierge</i><i>Agenda</i></div>
          </button>

          <button class="package-selector" type="button" role="tab" aria-selected="false" aria-controls="package-conversao" data-package-target="conversao">
            <small>02 · Continuidade comercial</small>
            <strong>Cevora Conversão</strong>
            <span>Conduzir e recuperar</span>
            <div class="package-selector__modules"><i>+ Follow-up</i><i>+ Recall</i></div>
          </button>

          <button class="package-selector package-selector--principal" type="button" role="tab" aria-selected="false" aria-controls="package-journey" data-package-target="journey">
            <small>03 · Sistema completo</small>
            <strong>Cevora Journey</strong>
            <span>Implantar a jornada inteira</span>
            <div class="package-selector__modules"><i>Oferta</i><i>Página</i><i>CRM</i><i>Dados</i></div>
          </button>
        </div>

        <div class="package-stage" data-active-package="preconsulta">
          <div class="package-stage__chrome" aria-hidden="true">
            <span>CEVORA / SYSTEM MAP</span>
            <span>JORNADA PRÉ-CONSULTA</span>
            <span>STATUS: PRESCRIÇÃO POR DIAGNÓSTICO</span>
          </div>

          <div class="package-system-map" aria-label="Mapa dos módulos incluídos em cada pacote">
            <div class="system-map__line" aria-hidden="true"></div>
            <div class="system-node" data-system-node="positioning"><span>01</span><strong>Posicionamento</strong></div>
            <div class="system-node is-core" data-system-node="concierge"><span>02</span><strong>Concierge</strong></div>
            <div class="system-node is-core" data-system-node="agenda"><span>03</span><strong>Agenda</strong></div>
            <div class="system-node" data-system-node="followup"><span>04</span><strong>Follow-up</strong></div>
            <div class="system-node" data-system-node="recall"><span>05</span><strong>Recall</strong></div>
            <div class="system-node" data-system-node="measurement"><span>06</span><strong>Mensuração</strong></div>
          </div>

          <article class="package-panel is-active" id="package-preconsulta" role="tabpanel" data-package-panel="preconsulta">
            <div class="package-panel__topline"><span>Pacote 01</span><b>Corrige o primeiro contato</b></div>
            <h3>Cevora Pré-Consulta</h3>
            <p class="package-panel__promise">Transforme o WhatsApp em uma pré-consulta que acolhe, qualifica e conduz o paciente até um horário.</p>
            <div class="package-panel__columns">
              <div>
                <small>Inclui</small>
                <ul><li>Concierge em linguagem natural</li><li>Qualificação inicial</li><li>Consulta de horários</li><li>Agendamento e confirmação</li><li>Transferência com contexto</li></ul>
              </div>
              <div>
                <small>Indicado quando</small>
                <p>A recepção está sobrecarregada, as respostas são repetitivas ou o agendamento depende de muitas mensagens manuais.</p>
              </div>
            </div>
            <button class="package-panel__cta" type="button" data-package-diagnostic>Corrigir meu atendimento <span>↗</span></button>
          </article>

          <article class="package-panel" id="package-conversao" role="tabpanel" hidden data-package-panel="conversao">
            <div class="package-panel__topline"><span>Pacote 02</span><b>Corrige continuidade e retomada</b></div>
            <h3>Cevora Conversão</h3>
            <p class="package-panel__promise">Nenhum paciente interessado depende apenas da memória da equipe para receber o próximo passo.</p>
            <div class="package-panel__columns">
              <div>
                <small>Inclui tudo da Pré-Consulta, mais</small>
                <ul><li>Follow-up por estágio de decisão</li><li>Retomada após pergunta de preço</li><li>Reativação de conversas antigas</li><li>Recuperação de cancelamentos</li><li>Interrupção ao receber resposta humana</li></ul>
              </div>
              <div>
                <small>Indicado quando</small>
                <p>A clínica já recebe volume de mensagens, mas pacientes somem, conversas ficam esquecidas e a base antiga permanece parada.</p>
              </div>
            </div>
            <button class="package-panel__cta" type="button" data-package-diagnostic>Parar de perder oportunidades <span>↗</span></button>
          </article>

          <article class="package-panel package-panel--journey" id="package-journey" role="tabpanel" hidden data-package-panel="journey">
            <div class="package-panel__topline"><span>Oferta principal</span><b>Responsabilidade pela jornada inteira</b></div>
            <h3>Cevora Journey</h3>
            <p class="package-panel__promise">Da primeira impressão ao agendamento, uma jornada inteira desenhada para acumular confiança e revelar gargalos.</p>
            <div class="package-panel__columns">
              <div>
                <small>Integra</small>
                <ul><li>Diagnóstico e posicionamento</li><li>Oferta e página por procedimento</li><li>Pré-Consulta e Conversão</li><li>CRM e padrões da equipe</li><li>Mensuração e otimização contínua</li></ul>
              </div>
              <div>
                <small>Indicado quando</small>
                <p>Tráfego, página, atendimento e acompanhamento existem, mas trabalham como peças soltas e ninguém responde pelo caminho completo.</p>
              </div>
            </div>
            <blockquote>O Journey não é a soma de ferramentas. É a responsabilidade sobre o sistema inteiro.</blockquote>
            <button class="package-panel__cta" type="button" data-package-diagnostic>Avaliar minha jornada <span>↗</span></button>
          </article>
        </div>
      </div>

      <div class="solution-layers" data-solution-reveal style="--solution-delay: 220ms">
        <article class="solution-layer solution-layer--intelligence">
          <span class="solution-layer__index">04</span>
          <div>
            <small>Camada de mensuração</small>
            <h3>Cevora Intelligence</h3>
            <p>Mostra onde a confiança cresce, trava ou desaparece por procedimento, origem e estágio da jornada.</p>
          </div>
          <ul><li>Motivos de perda</li><li>Conversão em avaliação</li><li>Prioridade diária</li></ul>
          <em>Incluído no Journey ou contratado como camada recorrente.</em>
        </article>

        <article class="solution-layer solution-layer--formation">
          <span class="solution-layer__index">05</span>
          <div>
            <small>Camada de formação</small>
            <h3>Clínica Próspera</h3>
            <p>Formação para o cirurgião e a equipe entenderem a máquina antes de tentar acelerá-la.</p>
          </div>
          <ul><li>Estratégia</li><li>Conversão</li><li>Operação</li></ul>
          <em>Produto educacional separado da implementação.</em>
        </article>
      </div>

      <div class="solutions-closing" data-solution-reveal style="--solution-delay: 280ms">
        <div>
          <span>Prescrição, não prateleira</span>
          <strong>A clínica não escolhe o pacote maior. Escolhe a correção necessária.</strong>
          <p>O diagnóstico define se o gargalo exige Pré-Consulta, Conversão ou a implantação completa do Journey.</p>
        </div>
        <button class="button button--primary magnetic" type="button" data-package-diagnostic>
          <span>Diagnosticar minha clínica</span><i aria-hidden="true">↗</i>
        </button>
      </div>

      <footer class="solutions-footer">
        <span>CEVORA</span>
        <p>Sistemas de confiança e conversão para clínicas de cirurgia plástica.</p>
        <a href="#top">Voltar ao início ↑</a>
      </footer>
    </div>
  `;

  method.insertAdjacentElement('afterend', section);

  const packageConfig = {
    preconsulta: ['concierge', 'agenda'],
    conversao: ['concierge', 'agenda', 'followup', 'recall'],
    journey: ['positioning', 'concierge', 'agenda', 'followup', 'recall', 'measurement']
  };

  const selectors = [...section.querySelectorAll('[data-package-target]')];
  const panels = [...section.querySelectorAll('[data-package-panel]')];
  const nodes = [...section.querySelectorAll('[data-system-node]')];
  const stage = section.querySelector('.package-stage');

  const activatePackage = (name) => {
    if (!packageConfig[name]) return;
    selectors.forEach((button) => {
      const active = button.dataset.packageTarget === name;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.dataset.packagePanel === name;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    nodes.forEach((node) => {
      node.classList.toggle('is-active', packageConfig[name].includes(node.dataset.systemNode));
    });
    if (stage) stage.dataset.activePackage = name;
  };

  selectors.forEach((button, index) => {
    button.addEventListener('click', () => activatePackage(button.dataset.packageTarget));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      const next = selectors[(index + direction + selectors.length) % selectors.length];
      next.focus();
      activatePackage(next.dataset.packageTarget);
    });
  });

  const openDiagnostic = () => {
    const modal = document.querySelector('#diagnosticModal');
    if (!modal) return;
    document.querySelectorAll('.modal.is-open').forEach((item) => {
      item.classList.remove('is-open');
      item.setAttribute('aria-hidden', 'true');
    });
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => modal.querySelector('input')?.focus(), 80);
  };

  section.querySelectorAll('[data-package-diagnostic]').forEach((button) => {
    button.addEventListener('click', openDiagnostic);
  });

  const repairNavigation = () => {
    document.querySelectorAll('.desktop-nav a, .mobile-menu a').forEach((link) => {
      const label = link.textContent.trim().toLowerCase();
      if (label.includes('problema')) link.setAttribute('href', '#problema');
      if (label.includes('método') || label.includes('metodo')) link.setAttribute('href', '#metodo');
      if (label.includes('soluções') || label.includes('solucoes')) link.setAttribute('href', '#solucoes');
    });
    document.querySelectorAll('a[href="#conversion"]').forEach((link) => link.setAttribute('href', '#solucoes'));
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = [...section.querySelectorAll('[data-solution-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  activatePackage('preconsulta');
  repairNavigation();
  hideLegacySections();

  const legacyObserver = new MutationObserver(() => {
    hideLegacySections();
    repairNavigation();
  });
  legacyObserver.observe(main, { childList: true, subtree: true });
  window.setTimeout(() => legacyObserver.disconnect(), 9000);
})();