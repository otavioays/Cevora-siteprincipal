(() => {
  'use strict';

  if (window.__cevoraTrustAuthorityLoaded) return;
  window.__cevoraTrustAuthorityLoaded = true;

  const waitForSolutions = (callback) => {
    const current = document.querySelector('#solucoes');
    if (current) {
      callback(current);
      return;
    }

    const observer = new MutationObserver(() => {
      const section = document.querySelector('#solucoes');
      if (!section) return;
      observer.disconnect();
      callback(section);
    });

    observer.observe(document.querySelector('main') || document.documentElement, {
      childList: true,
      subtree: true
    });

    window.setTimeout(() => observer.disconnect(), 10000);
  };

  waitForSolutions((solutions) => {
    if (document.querySelector('#sobre')) return;

    const section = document.createElement('section');
    section.className = 'trust-authority frame-corners';
    section.id = 'sobre';
    section.setAttribute('aria-labelledby', 'authorityTitle');
    section.innerHTML = `
      <div class="trust-authority__matrix" aria-hidden="true"></div>
      <div class="trust-authority__flare trust-authority__flare--one" aria-hidden="true"></div>
      <div class="trust-authority__flare trust-authority__flare--two" aria-hidden="true"></div>

      <div class="trust-authority__shell">
        <header class="authority-header">
          <div data-trust-reveal>
            <span class="authority-kicker"><i></i> Autoridade sem teatro</span>
            <h2 id="authorityTitle">A prova não começa em uma promessa. <em>Começa em um processo que pode ser inspecionado.</em></h2>
          </div>
          <p data-trust-reveal style="--trust-delay: 100ms">
            A Cevora não usa números decorativos para parecer maior. Antes de falar em resultado, mostra o diagnóstico, a lógica da intervenção, o que será implantado e quais métricas serão acompanhadas.
          </p>
        </header>

        <div class="evidence-ledger" data-trust-reveal style="--trust-delay: 160ms">
          <div class="evidence-ledger__chrome" aria-hidden="true">
            <span>CEVORA / EVIDENCE LEDGER</span>
            <span>PROVA POR PROCESSO</span>
            <span>VERSÃO 01.04</span>
          </div>

          <div class="evidence-ledger__grid">
            <article class="evidence-card">
              <span class="evidence-card__number">01</span>
              <div class="evidence-card__icon" aria-hidden="true">◎</div>
              <small>Antes da proposta</small>
              <h3>Mapa do gargalo</h3>
              <p>O ponto de perda é descrito com contexto: onde acontece, como aparece e por que merece prioridade.</p>
              <ul><li>Jornada atual</li><li>Quebras de confiança</li><li>Prioridade recomendada</li></ul>
            </article>

            <article class="evidence-card">
              <span class="evidence-card__number">02</span>
              <div class="evidence-card__icon" aria-hidden="true">⌘</div>
              <small>Antes da implantação</small>
              <h3>Blueprint da correção</h3>
              <p>A clínica vê quais peças serão alteradas, como elas se conectam e o que permanece sob responsabilidade humana.</p>
              <ul><li>Fluxos e próximos passos</li><li>Escopo de automação</li><li>Padrões da equipe</li></ul>
            </article>

            <article class="evidence-card">
              <span class="evidence-card__number">03</span>
              <div class="evidence-card__icon" aria-hidden="true">◇</div>
              <small>Durante a implantação</small>
              <h3>Sistema verificável</h3>
              <p>Cada fluxo pode ser testado com cenários reais antes de assumir contato com pacientes.</p>
              <ul><li>Testes de conversa</li><li>Rotas de exceção</li><li>Transferência humana</li></ul>
            </article>

            <article class="evidence-card">
              <span class="evidence-card__number">04</span>
              <div class="evidence-card__icon" aria-hidden="true">↗</div>
              <small>Depois da implantação</small>
              <h3>Leitura de comportamento</h3>
              <p>A evolução é acompanhada por métricas operacionais, não por gráficos inventados para preencher uma dobra.</p>
              <ul><li>Avanço para avaliação</li><li>Follow-ups realizados</li><li>Motivos de perda</li></ul>
            </article>
          </div>
        </div>

        <div class="implementation-protocol">
          <div class="implementation-protocol__copy" data-trust-reveal>
            <span class="authority-kicker"><i></i> Protocolo de implementação</span>
            <h2>Não instalamos uma ferramenta e desaparecemos. <em>Entramos por etapas.</em></h2>
            <p>O sistema avança apenas quando a etapa anterior está compreendida, validada e pronta para sustentar a próxima.</p>

            <div class="protocol-status" aria-label="Princípios da implementação">
              <div><span>01</span><strong>Sem trocar tudo de uma vez</strong><small>O gargalo prioritário entra primeiro.</small></div>
              <div><span>02</span><strong>Sem automação sem saída humana</strong><small>A equipe continua responsável por decisões clínicas e exceções.</small></div>
              <div><span>03</span><strong>Sem otimização sem registro</strong><small>O comportamento precisa deixar rastros para ser melhorado.</small></div>
            </div>
          </div>

          <div class="protocol-timeline" data-trust-reveal style="--trust-delay: 120ms">
            <div class="protocol-timeline__line" aria-hidden="true"><i></i></div>

            <article class="protocol-step is-active" data-protocol-step="1">
              <button type="button" aria-expanded="true">
                <span>01</span><div><small>Diagnóstico</small><strong>Enxergar antes de prescrever</strong></div><i>+</i>
              </button>
              <div class="protocol-step__detail">
                <p>Mapeamento do caminho entre primeira impressão, contato, atendimento, agendamento e continuidade.</p>
                <b>Saída:</b><span>Mapa de vazamentos e prioridade de correção.</span>
              </div>
            </article>

            <article class="protocol-step" data-protocol-step="2">
              <button type="button" aria-expanded="false">
                <span>02</span><div><small>Desenho</small><strong>Transformar o gargalo em sistema</strong></div><i>+</i>
              </button>
              <div class="protocol-step__detail" hidden>
                <p>Construção de fluxos, mensagens, critérios, integrações e pontos de passagem para a equipe.</p>
                <b>Saída:</b><span>Blueprint de implementação aprovado.</span>
              </div>
            </article>

            <article class="protocol-step" data-protocol-step="3">
              <button type="button" aria-expanded="false">
                <span>03</span><div><small>Implantação</small><strong>Testar antes de escalar</strong></div><i>+</i>
              </button>
              <div class="protocol-step__detail" hidden>
                <p>Configuração técnica, simulações, correções de linguagem e preparação da equipe para assumir exceções.</p>
                <b>Saída:</b><span>Sistema validado em cenários controlados.</span>
              </div>
            </article>

            <article class="protocol-step" data-protocol-step="4">
              <button type="button" aria-expanded="false">
                <span>04</span><div><small>Otimização</small><strong>Melhorar com comportamento real</strong></div><i>+</i>
              </button>
              <div class="protocol-step__detail" hidden>
                <p>Leitura dos gargalos restantes, ajuste das mensagens e priorização da próxima intervenção.</p>
                <b>Saída:</b><span>Relatório de comportamento e plano de melhoria.</span>
              </div>
            </article>
          </div>
        </div>

        <div class="guide-manifesto" data-trust-reveal>
          <div class="guide-manifesto__mark" aria-hidden="true">
            <span>C</span><i></i><b>GUIA / NÃO HERÓI</b>
          </div>
          <div class="guide-manifesto__copy">
            <span class="authority-kicker"><i></i> O papel da Cevora</span>
            <blockquote>“Eu não entendo mais de cirurgia que você. Meu trabalho começa onde o atendimento médico ainda não começou.”</blockquote>
            <p>A Cevora não ocupa o lugar do cirurgião. Organiza o caminho para que a competência clínica seja percebida antes da consulta, sem transformar o médico em vendedor e sem tratar o paciente como uma linha de planilha.</p>
          </div>
        </div>

        <div class="anti-promise" data-trust-reveal>
          <div class="anti-promise__heading">
            <span class="authority-kicker"><i></i> Limites claros</span>
            <h2>O que a Cevora <em>não promete.</em></h2>
          </div>

          <div class="anti-promise__grid">
            <article><span>×</span><strong>Agenda cheia garantida</strong><p>Nenhum sistema controla mercado, reputação clínica, capacidade ou decisão humana.</p></article>
            <article><span>×</span><strong>Paciente barato em massa</strong><p>Volume sem contexto pode aumentar comparação e sobrecarregar a operação.</p></article>
            <article><span>×</span><strong>Automação substituindo a equipe</strong><p>A tecnologia protege padrões e continuidade; não assume julgamento clínico.</p></article>
            <article><span>×</span><strong>Resultado sem mensuração</strong><p>Quando não existe registro, existe narrativa. A Cevora trabalha com evidência operacional.</p></article>
          </div>
        </div>

        <div class="measurement-board" data-trust-reveal>
          <div class="measurement-board__copy">
            <span class="authority-kicker"><i></i> O que será medido</span>
            <h2>O sistema precisa responder <em>onde o paciente avança ou desiste.</em></h2>
            <p>As métricas finais dependem do pacote e da estrutura da clínica, mas a lógica permanece: medir passagem, continuidade e motivo de perda.</p>
          </div>

          <div class="measurement-board__metrics" aria-label="Métricas acompanhadas pela Cevora">
            <article><small>M01</small><strong>Tempo até primeira resposta</strong><span>Velocidade sem perder contexto.</span></article>
            <article><small>M02</small><strong>Contato → avaliação</strong><span>Passagem do interesse para o compromisso.</span></article>
            <article><small>M03</small><strong>Cobertura de follow-up</strong><span>Quantos interessados receberam continuidade.</span></article>
            <article><small>M04</small><strong>Cancelamento e ausência</strong><span>Onde a intenção não chegou ao encontro.</span></article>
            <article><small>M05</small><strong>Motivo de perda</strong><span>Preço, timing, confiança, silêncio ou inadequação.</span></article>
            <article><small>M06</small><strong>Origem por qualidade</strong><span>Quais canais geram pacientes mais adequados.</span></article>
          </div>
        </div>

        <div class="authority-cta" data-trust-reveal>
          <div>
            <span>Próximo passo</span>
            <strong>Você não precisa acreditar no sistema inteiro agora.</strong>
            <p>Comece descobrindo onde sua clínica perde confiança antes da avaliação.</p>
          </div>
          <button class="button button--primary magnetic" type="button" data-authority-diagnostic>
            <span>Solicitar diagnóstico</span><i aria-hidden="true">↗</i>
          </button>
        </div>

        <footer class="authority-footer">
          <span>CEVORA</span>
          <div><b>CLAREZA</b><i></i><b>CONDUÇÃO</b><i></i><b>MENSURAÇÃO</b></div>
          <a href="#top">Voltar ao início ↑</a>
        </footer>
      </div>
    `;

    solutions.insertAdjacentElement('afterend', section);

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

    section.querySelectorAll('[data-authority-diagnostic]').forEach((button) => {
      button.addEventListener('click', openDiagnostic);
    });

    const protocolSteps = [...section.querySelectorAll('.protocol-step')];
    protocolSteps.forEach((step) => {
      const button = step.querySelector('button');
      const detail = step.querySelector('.protocol-step__detail');
      button?.addEventListener('click', () => {
        const willOpen = !step.classList.contains('is-active');
        protocolSteps.forEach((item) => {
          item.classList.remove('is-active');
          const itemButton = item.querySelector('button');
          const itemDetail = item.querySelector('.protocol-step__detail');
          itemButton?.setAttribute('aria-expanded', 'false');
          if (itemDetail) itemDetail.hidden = true;
        });
        if (!willOpen) return;
        step.classList.add('is-active');
        button.setAttribute('aria-expanded', 'true');
        if (detail) detail.hidden = false;
      });
    });

    const addNavigationLink = () => {
      const desktopNav = document.querySelector('.desktop-nav');
      if (desktopNav && !desktopNav.querySelector('a[href="#sobre"]')) {
        const link = document.createElement('a');
        link.href = '#sobre';
        link.textContent = 'Sobre';
        desktopNav.appendChild(link);
      }

      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu && !mobileMenu.querySelector('a[href="#sobre"]')) {
        const link = document.createElement('a');
        link.href = '#sobre';
        link.textContent = 'Sobre';
        const diagnosticButton = mobileMenu.querySelector('button');
        mobileMenu.insertBefore(link, diagnosticButton || null);
      }
    };

    addNavigationLink();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = [...section.querySelectorAll('[data-trust-reveal]')];
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
      revealItems.forEach((item) => observer.observe(item));
    }
  });
})();