(() => {
  'use strict';

  const moduleIds = {
    'Cevora Concierge 24/7': 'concierge',
    'Cevora Qualify': 'qualify',
    'Cevora Agenda': 'agenda',
    'Cevora Follow-up': 'followup',
    'Cevora Recovery': 'recovery',
    'Cevora Recall': 'recall',
    'Cevora MultiDesk': 'multidesk',
    'Cevora Copilot': 'copilot',
    'Cevora Journey Care': 'onboarding',
    'Cevora Intelligence': 'intelligence',
    'Cevora Service Audit': 'audit',
    'Cevora Connect': 'connect'
  };

  const impactByProfile = {
    'Atendimento sem direção': {
      level: 'Alta', angle: '278deg',
      summary: 'A clínica já recebe interesse, mas parte dele encontra demora, falta de contexto ou um próximo passo pouco claro.',
      consequence: 'Mais tráfego pode aumentar o volume de conversas sem aumentar proporcionalmente as avaliações.',
      correction: 'Organizar a primeira resposta e a passagem até o agendamento.'
    },
    'Continuidade quebrada': {
      level: 'Crítica', angle: '322deg',
      summary: 'Existe interesse acumulado, porém oportunidades recentes e antigas deixam de ser conduzidas no momento certo.',
      consequence: 'A clínica continua pagando para gerar novas conversas enquanto abandona valor já conquistado.',
      correction: 'Criar continuidade contextual antes de ampliar a aquisição.'
    },
    'Operação dependente de pessoas': {
      level: 'Alta', angle: '274deg',
      summary: 'O padrão da jornada depende da memória, disponibilidade e experiência de pessoas específicas.',
      consequence: 'Crescer aumenta o risco de respostas inconsistentes, contexto perdido e tarefas esquecidas.',
      correction: 'Transformar conhecimento individual em processo operacional acessível.'
    },
    'Gestão no escuro': {
      level: 'Crítica', angle: '318deg',
      summary: 'A clínica percebe perdas, mas não consegue localizar com segurança onde a jornada quebra.',
      consequence: 'Investimentos e mudanças são feitos por sensação, dificultando saber o que realmente melhorou.',
      correction: 'Mensurar a jornada antes de escolher onde colocar mais recursos.'
    }
  };

  const question = document.querySelector('#assessmentQuestion');
  const options = document.querySelector('#assessmentOptions');
  const next = document.querySelector('#nextQuestion');
  const result = document.querySelector('#assessmentResult');
  const actions = result?.querySelector('.assessment-result__actions');
  let autoAdvanceTimer = 0;

  const enhanceResult = () => {
    if (!result || result.hidden) return;

    const title = document.querySelector('#resultTitle')?.textContent?.trim();
    const profile = impactByProfile[title];
    const cards = [...document.querySelectorAll('.assessment-recommendation')];
    if (!title || !profile || cards.length === 0) return;

    let priority = result.querySelector('.assessment-priority');
    if (!priority) {
      priority = document.createElement('section');
      priority.className = 'assessment-priority';
      priority.innerHTML = `
        <div class="assessment-priority__gauge" aria-label="Prioridade de correção">
          <div><small>Prioridade</small><strong></strong></div>
        </div>
        <div class="assessment-priority__copy">
          <span>ORDEM RECOMENDADA DE CORREÇÃO</span>
          <h2>Corrigir este ponto antes de ampliar a entrada.</h2>
          <p></p>
          <b>Este indicador representa prioridade operacional dentro desta avaliação, não uma previsão financeira.</b>
        </div>`;
      result.querySelector('.assessment-result__insight')?.insertAdjacentElement('afterend', priority);
    }

    priority.style.setProperty('--priority-angle', profile.angle);
    priority.querySelector('.assessment-priority__gauge strong').textContent = profile.level;
    priority.querySelector('.assessment-priority__copy p').textContent = profile.summary;

    let impact = result.querySelector('.assessment-impact-strip');
    if (!impact) {
      impact = document.createElement('section');
      impact.className = 'assessment-impact-strip';
      result.querySelector('.assessment-result__secondary')?.insertAdjacentElement('afterend', impact);
    }
    impact.innerHTML = `
      <article><small>O que acontece agora</small><strong>O vazamento antecede a consulta</strong><p>${profile.summary}</p></article>
      <article><small>Risco de manter como está</small><strong>A entrada amplifica a falha</strong><p>${profile.consequence}</p></article>
      <article><small>Primeiro movimento</small><strong>Corrigir antes de escalar</strong><p>${profile.correction}</p></article>`;

    cards.forEach((card, index) => {
      const name = card.querySelector('strong')?.textContent?.trim();
      const id = moduleIds[name];
      if (!id) return;
      card.classList.toggle('is-primary', index === 0);
      if (index === 0 && !card.querySelector('.assessment-recommendation__priority')) {
        const badge = document.createElement('span');
        badge.className = 'assessment-recommendation__priority';
        badge.textContent = 'PRIORIDADE 01';
        card.querySelector('div')?.prepend(badge);
      }
      let link = card.querySelector('.assessment-recommendation__link');
      if (!link) {
        link = document.createElement('a');
        link.className = 'assessment-recommendation__link';
        link.setAttribute('aria-label', `Entender ${name}`);
        card.appendChild(link);
        const arrow = document.createElement('i');
        arrow.className = 'assessment-recommendation__arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '↗';
        card.appendChild(arrow);
      }
      link.href = `solucao.html?modulo=${encodeURIComponent(id)}&origem=avaliacao`;
    });

    const principalName = cards[0]?.querySelector('strong')?.textContent?.trim();
    const principalId = moduleIds[principalName];
    const primaryCta = document.querySelector('#resultCta');
    if (primaryCta && principalId) {
      primaryCta.href = `solucao.html?modulo=${encodeURIComponent(principalId)}&origem=avaliacao`;
      const label = primaryCta.querySelector('span');
      if (label) label.textContent = `Conhecer ${principalName}`;
    }

    if (actions && !actions.querySelector('.assessment-result__catalog')) {
      const catalog = document.createElement('a');
      catalog.className = 'assessment-button assessment-button--ghost assessment-result__catalog';
      catalog.href = document.querySelector('#resultCta')?.dataset.catalogHref || 'solucoes.html#catalogo';
      catalog.innerHTML = '<span>Comparar soluções indicadas</span><i aria-hidden="true">↗</i>';
      const restart = document.querySelector('#restartAssessment');
      actions.insertBefore(catalog, restart || null);
    }

    const catalog = actions?.querySelector('.assessment-result__catalog');
    const resultTitle = title.toLowerCase();
    const category = resultTitle.includes('continuidade') ? 'continuidade'
      : resultTitle.includes('opera') ? 'operacao'
      : resultTitle.includes('escuro') ? 'dados'
      : 'atendimento';
    if (catalog) catalog.href = `solucoes.html?categoria=${category}#catalogo`;

    if (actions && !result.querySelector('.assessment-result__reassurance')) {
      const note = document.createElement('p');
      note.className = 'assessment-result__reassurance';
      note.innerHTML = '<i>✦</i><span>Vc não precisa automatizar toda a clínica. A recomendação começa pelo ponto que mais interfere na passagem entre interesse e avaliação.</span>';
      actions.insertAdjacentElement('afterend', note);
    }
  };

  options?.addEventListener('click', (event) => {
    const option = event.target.closest('.assessment-option[data-mode="single"]');
    if (!option) return;
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = window.setTimeout(() => {
      if (!question?.hidden && next && !next.disabled && option.classList.contains('is-selected')) next.click();
    }, 520);
  });

  document.addEventListener('keydown', (event) => {
    if (!question || question.hidden || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.toUpperCase();
    const index = key.charCodeAt(0) - 65;
    const available = [...document.querySelectorAll('.assessment-option')];
    if (index >= 0 && index < available.length) available[index].click();
    if (event.key === 'Enter' && next && !next.disabled) next.click();
  });

  const resultObserver = new MutationObserver(() => window.setTimeout(enhanceResult, 20));
  if (result) resultObserver.observe(result, { attributes: true, attributeFilter: ['hidden'], childList: true, subtree: true });
  enhanceResult();
})();
