(() => {
  'use strict';

  const dimensions = ['atendimento', 'continuidade', 'operacao', 'dados'];

  const questions = [
    {
      eyebrow: 'Primeiro sinal',
      title: 'Onde vc sente que a clínica mais perde oportunidades hoje?',
      help: 'Escolha o sintoma que mais parece descrever a operação atual, mesmo que mais de um aconteça.',
      type: 'single',
      options: [
        { label: 'Demoramos para responder novas mensagens.', weights: { atendimento: 4, dados: 1 } },
        { label: 'A conversa começa, mas não avança.', weights: { atendimento: 4, continuidade: 1 } },
        { label: 'A pessoa pede informações e desaparece.', weights: { continuidade: 4, atendimento: 1 } },
        { label: 'O agendamento exige mensagens demais.', weights: { atendimento: 3, operacao: 1 } },
        { label: 'A equipe perde contexto entre atendentes.', weights: { operacao: 3, atendimento: 2, dados: 1 } },
        { label: 'Não sabemos exatamente onde estamos perdendo.', weights: { dados: 4, operacao: 1 } }
      ]
    },
    {
      eyebrow: 'Velocidade de atendimento',
      title: 'Quanto tempo normalmente leva para uma nova pessoa receber uma primeira resposta útil?',
      help: 'Mensagem automática dizendo apenas “aguarde” não conta como resposta útil.',
      type: 'single',
      options: [
        { label: 'Menos de 2 minutos.', weights: { atendimento: 0 } },
        { label: 'Entre 2 e 10 minutos.', weights: { atendimento: 1 } },
        { label: 'Entre 10 e 30 minutos.', weights: { atendimento: 2, dados: 1 } },
        { label: 'Mais de 30 minutos.', weights: { atendimento: 4, dados: 1 } },
        { label: 'Depende muito do horário.', weights: { atendimento: 3, operacao: 1 } },
        { label: 'Não medimos isso.', weights: { dados: 3, atendimento: 2 } }
      ]
    },
    {
      eyebrow: 'Qualidade da pré-consulta',
      title: 'Antes de a equipe assumir uma conversa, ela já sabe o que a pessoa procura e qual seria o próximo passo?',
      help: 'A pergunta mede quanto contexto chega pronto para a atendente continuar, em vez de reiniciar a conversa.',
      type: 'single',
      options: [
        { label: 'Sim, quase sempre.', weights: { atendimento: 0, operacao: 0 } },
        { label: 'Às vezes, mas as informações chegam incompletas.', weights: { atendimento: 2, operacao: 1 } },
        { label: 'Raramente.', weights: { atendimento: 3, operacao: 1 } },
        { label: 'Não. A atendente começa praticamente do zero.', weights: { atendimento: 4, operacao: 2 } }
      ]
    },
    {
      eyebrow: 'Continuidade',
      title: 'Quando alguém demonstra interesse, mas não agenda a avaliação, o que acontece depois?',
      help: 'O ponto não é insistir. É existir uma próxima ação coerente, registrada e interrompida quando a pessoa responde.',
      type: 'single',
      options: [
        { label: 'Entra em uma sequência organizada conforme o estágio.', weights: { continuidade: 0 } },
        { label: 'A atendente tenta lembrar de retomar manualmente.', weights: { continuidade: 3, operacao: 1 } },
        { label: 'Enviamos alguma mensagem genérica depois.', weights: { continuidade: 2, atendimento: 1 } },
        { label: 'Normalmente, nada acontece.', weights: { continuidade: 4, operacao: 1 } },
        { label: 'Não sabemos quantas conversas ficam assim.', weights: { dados: 3, continuidade: 3 } }
      ]
    },
    {
      eyebrow: 'Oportunidades antigas',
      title: 'Quando alguém cancela, desaparece ou pede para conversar no futuro, essa oportunidade volta para algum fluxo?',
      help: 'Aqui medimos quanto valor fica enterrado no histórico da própria clínica.',
      type: 'single',
      options: [
        { label: 'Sim, automaticamente e no momento adequado.', weights: { continuidade: 0 } },
        { label: 'Fica registrada em uma lista ou planilha.', weights: { continuidade: 2, operacao: 1 } },
        { label: 'Depende da atendente lembrar.', weights: { continuidade: 3, operacao: 2 } },
        { label: 'Normalmente fica perdida no histórico.', weights: { continuidade: 4, dados: 1 } },
        { label: 'Não temos esse controle.', weights: { continuidade: 3, dados: 3 } }
      ]
    },
    {
      eyebrow: 'Dependência da equipe',
      title: 'Quanto do atendimento depende da memória e da experiência individual de cada atendente?',
      help: 'Um processo saudável não exige heroísmo diário para manter padrão, contexto e próximo passo.',
      type: 'single',
      options: [
        { label: 'Quase nada. Os processos estão registrados e integrados.', weights: { operacao: 0 } },
        { label: 'Algumas partes ainda dependem da pessoa.', weights: { operacao: 1, atendimento: 1 } },
        { label: 'Grande parte depende da atendente certa estar disponível.', weights: { operacao: 3, atendimento: 2 } },
        { label: 'Praticamente tudo.', weights: { operacao: 4, atendimento: 2 } },
        { label: 'Nunca avaliamos isso.', weights: { dados: 2, operacao: 3 } }
      ]
    },
    {
      eyebrow: 'Visibilidade dos números',
      title: 'Quais informações ainda não estão centralizadas ou são difíceis de consultar?',
      help: 'Marque todas as lacunas. Esta é a única pergunta em que vc pode escolher mais de uma opção.',
      type: 'multiple',
      options: [
        { label: 'Tempo médio de primeira resposta.', weights: { dados: 1, atendimento: 1 } },
        { label: 'Quantas oportunidades receberam follow-up.', weights: { dados: 1, continuidade: 1 } },
        { label: 'Em qual estágio cada conversa está.', weights: { dados: 1, operacao: 1 } },
        { label: 'Principais motivos de perda.', weights: { dados: 2 } },
        { label: 'Origem das consultas qualificadas.', weights: { dados: 1 } },
        { label: 'Quantas avaliações foram abandonadas.', weights: { dados: 1, continuidade: 1 } },
        { label: 'Não sabemos responder com segurança.', weights: { dados: 4, operacao: 1 }, exclusive: true },
        { label: 'Tudo isso já está centralizado.', weights: {}, exclusive: true }
      ]
    },
    {
      eyebrow: 'Impacto desejado',
      title: 'Se um único gargalo fosse corrigido nos próximos 30 dias, qual mudança teria mais valor?',
      help: 'A resposta ajuda a transformar o diagnóstico em uma recomendação que faça sentido para a prioridade atual.',
      type: 'single',
      options: [
        { label: 'Responder mais rápido sem aumentar a equipe.', weights: { atendimento: 3, operacao: 1 } },
        { label: 'Transformar mais conversas em avaliações.', weights: { atendimento: 3, continuidade: 1 } },
        { label: 'Recuperar oportunidades que hoje desaparecem.', weights: { continuidade: 4 } },
        { label: 'Reduzir tarefas repetitivas das atendentes.', weights: { operacao: 3, atendimento: 1 } },
        { label: 'Padronizar a qualidade do atendimento.', weights: { operacao: 3, atendimento: 2 } },
        { label: 'Finalmente entender onde estamos perdendo.', weights: { dados: 4 } }
      ]
    }
  ];

  const profiles = {
    atendimento: {
      title: 'Atendimento sem direção',
      description: 'A clínica recebe interesse, mas velocidade, contexto ou condução ainda criam atrito antes do agendamento.',
      insight: 'O problema não é apenas responder. É responder com contexto suficiente para a conversa avançar até um próximo passo claro.',
      category: 'atendimento',
      recommendations: [
        ['Cevora Concierge 24/7', 'Acolhe, responde informações aprovadas e organiza o próximo passo.'],
        ['Cevora Qualify', 'Entrega contexto e prioridade antes de a atendente assumir.'],
        ['Cevora Agenda', 'Reduz a distância entre intenção e avaliação confirmada.']
      ]
    },
    continuidade: {
      title: 'Continuidade quebrada',
      description: 'O interesse existe, mas parte das oportunidades esfria porque a retomada depende de memória, iniciativa manual ou mensagens genéricas.',
      insight: 'Antes de buscar mais pessoas, a clínica precisa impedir que conversas já iniciadas desapareçam sem uma retomada coerente.',
      category: 'continuidade',
      recommendations: [
        ['Cevora Follow-up', 'Continua conversas recentes conforme estágio e contexto.'],
        ['Cevora Recovery', 'Retoma quem demonstrou intenção, mas abandonou o agendamento.'],
        ['Cevora Recall', 'Reativa oportunidades antigas com critérios claros.']
      ]
    },
    operacao: {
      title: 'Operação dependente de pessoas',
      description: 'O processo funciona quando a pessoa certa está disponível, lembra do histórico e sabe intuitivamente qual próximo passo tomar.',
      insight: 'A equipe não precisa de mais cobrança. Precisa de uma camada operacional que preserve contexto, padrão e responsabilidade por conversa.',
      category: 'operacao',
      recommendations: [
        ['Cevora MultiDesk', 'Organiza filas, responsáveis e histórico em um único número.'],
        ['Cevora Copilot', 'Ajuda a atendente com scripts, objeções e próximos passos.'],
        ['Cevora Journey Care', 'Estrutura tarefas, documentos e etapas administrativas.']
      ]
    },
    dados: {
      title: 'Gestão no escuro',
      description: 'A clínica sente que perde oportunidades, mas ainda não possui dados suficientes para localizar o vazamento com segurança.',
      insight: 'Sem enxergar tempo de resposta, cobertura de follow-up, estágio e motivo de perda, qualquer melhoria começa por opinião.',
      category: 'dados',
      recommendations: [
        ['Cevora Intelligence', 'Centraliza indicadores e revela onde a jornada trava.'],
        ['Cevora Service Audit', 'Analisa padrões de demora, condução e continuidade.'],
        ['Cevora Connect', 'Integra canais, agenda, CRM e bases para preservar o contexto.']
      ]
    }
  };

  const elements = {
    intro: document.querySelector('#assessmentIntro'),
    question: document.querySelector('#assessmentQuestion'),
    result: document.querySelector('#assessmentResult'),
    start: document.querySelector('#startAssessment'),
    back: document.querySelector('#backQuestion'),
    next: document.querySelector('#nextQuestion'),
    restart: document.querySelector('#restartAssessment'),
    status: document.querySelector('#assessmentStatus'),
    counter: document.querySelector('#questionCounter'),
    percent: document.querySelector('#progressPercent'),
    progress: document.querySelector('#progressBar'),
    eyebrow: document.querySelector('#questionEyebrow'),
    title: document.querySelector('#questionTitle'),
    help: document.querySelector('#questionHelp'),
    options: document.querySelector('#assessmentOptions'),
    hint: document.querySelector('#selectionHint'),
    mapState: document.querySelector('#mapState'),
    mapCore: document.querySelector('#mapCore'),
    resultTitle: document.querySelector('#resultTitle'),
    resultDescription: document.querySelector('#resultDescription'),
    resultInsight: document.querySelector('#resultInsight'),
    secondaryTitle: document.querySelector('#secondaryTitle'),
    secondaryDescription: document.querySelector('#secondaryDescription'),
    recommendationGrid: document.querySelector('#recommendationGrid'),
    resultCta: document.querySelector('#resultCta')
  };

  let currentQuestion = 0;
  let answers = Array(questions.length).fill(null);

  const emptyScores = () => Object.fromEntries(dimensions.map((key) => [key, 0]));

  const calculateScores = () => {
    const scores = emptyScores();
    answers.forEach((answer, questionIndex) => {
      if (answer === null) return;
      const question = questions[questionIndex];
      const selectedIndexes = Array.isArray(answer) ? answer : [answer];
      selectedIndexes.forEach((optionIndex) => {
        const option = question.options[optionIndex];
        Object.entries(option?.weights || {}).forEach(([key, value]) => {
          scores[key] += value;
        });
      });
    });
    return scores;
  };

  const updateMap = () => {
    const scores = calculateScores();
    const maxScore = Math.max(1, ...Object.values(scores));
    const sorted = [...dimensions].sort((a, b) => scores[b] - scores[a]);
    const answered = answers.filter((answer) => answer !== null).length;

    dimensions.forEach((key) => {
      const value = scores[key];
      const score = document.querySelector(`#score-${key}`);
      const bar = document.querySelector(`#bar-${key}`);
      const row = document.querySelector(`[data-map-key="${key}"]`);
      if (score) score.textContent = String(value).padStart(2, '0');
      if (bar) bar.style.width = `${Math.min(100, (value / maxScore) * 100)}%`;
      row?.classList.toggle('is-leading', answered > 0 && key === sorted[0] && value > 0);
    });

    if (answered === 0) {
      elements.mapState.textContent = 'AGUARDANDO RESPOSTAS';
      elements.mapCore.textContent = 'MAPA';
    } else {
      elements.mapState.textContent = `${answered}/${questions.length} RESPOSTAS`;
      elements.mapCore.textContent = profiles[sorted[0]].title.split(' ')[0].toUpperCase();
    }
  };

  const updateNextState = () => {
    const question = questions[currentQuestion];
    const answer = answers[currentQuestion];
    const hasSelection = question.type === 'multiple' ? Array.isArray(answer) && answer.length > 0 : Number.isInteger(answer);
    elements.next.disabled = !hasSelection;
    elements.hint.textContent = question.type === 'multiple'
      ? 'Marque todas as opções aplicáveis e continue.'
      : 'Escolha uma resposta para continuar.';
  };

  const selectOption = (index) => {
    const question = questions[currentQuestion];
    const option = question.options[index];

    if (question.type === 'multiple') {
      let selection = Array.isArray(answers[currentQuestion]) ? [...answers[currentQuestion]] : [];
      if (option.exclusive) {
        selection = selection.includes(index) ? [] : [index];
      } else {
        selection = selection.filter((selectedIndex) => !question.options[selectedIndex]?.exclusive);
        selection = selection.includes(index)
          ? selection.filter((selectedIndex) => selectedIndex !== index)
          : [...selection, index];
      }
      answers[currentQuestion] = selection;
    } else {
      answers[currentQuestion] = index;
    }

    renderOptions();
    updateNextState();
    updateMap();
  };

  const renderOptions = () => {
    const question = questions[currentQuestion];
    const selected = answers[currentQuestion];

    elements.options.innerHTML = question.options.map((option, index) => {
      const isSelected = Array.isArray(selected) ? selected.includes(index) : selected === index;
      const code = String.fromCharCode(65 + index);
      return `
        <button class="assessment-option${isSelected ? ' is-selected' : ''}" type="button" data-option-index="${index}" data-mode="${question.type}" aria-pressed="${isSelected}">
          <span class="assessment-option__code">${code}</span>
          <strong>${option.label}</strong>
          <span class="assessment-option__mark" aria-hidden="true">✓</span>
        </button>
      `;
    }).join('');

    elements.options.querySelectorAll('[data-option-index]').forEach((button) => {
      button.addEventListener('click', () => selectOption(Number(button.dataset.optionIndex)));
    });
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

    elements.counter.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    elements.percent.textContent = `${progress}%`;
    elements.progress.style.width = `${progress}%`;
    elements.eyebrow.textContent = question.eyebrow;
    elements.title.textContent = question.title;
    elements.help.textContent = question.help;
    elements.back.disabled = currentQuestion === 0;
    elements.back.style.opacity = currentQuestion === 0 ? '.35' : '1';
    elements.status.textContent = `STATUS: PERGUNTA ${String(currentQuestion + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;

    renderOptions();
    updateNextState();
    updateMap();

    if (typeof elements.question.animate === 'function') {
      elements.question.animate(
        [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' }
      );
    }
  };

  const showResult = () => {
    const scores = calculateScores();
    const sorted = [...dimensions].sort((a, b) => scores[b] - scores[a]);
    const primary = profiles[sorted[0]];
    const secondary = profiles[sorted[1]];

    elements.question.hidden = true;
    elements.result.hidden = false;
    elements.status.textContent = 'STATUS: DIAGNÓSTICO CONCLUÍDO';
    elements.mapState.textContent = 'GARGALO IDENTIFICADO';
    elements.mapCore.textContent = 'RESULTADO';

    elements.resultTitle.textContent = primary.title;
    elements.resultDescription.textContent = primary.description;
    elements.resultInsight.textContent = primary.insight;
    elements.secondaryTitle.textContent = secondary.title;
    elements.secondaryDescription.textContent = secondary.description;
    elements.recommendationGrid.innerHTML = primary.recommendations.map((recommendation, index) => `
      <article class="assessment-recommendation">
        <div>
          <small>0${index + 1} / RECOMENDADA</small>
          <strong>${recommendation[0]}</strong>
          <p>${recommendation[1]}</p>
        </div>
        <span>R$ 200</span>
      </article>
    `).join('');
    elements.resultCta.href = `solucoes.html?categoria=${encodeURIComponent(primary.category)}#catalogo`;

    updateMap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const start = () => {
    elements.intro.hidden = true;
    elements.question.hidden = false;
    currentQuestion = 0;
    elements.status.textContent = 'STATUS: AVALIAÇÃO EM ANDAMENTO';
    renderQuestion();
  };

  const restart = () => {
    answers = Array(questions.length).fill(null);
    currentQuestion = 0;
    elements.result.hidden = true;
    elements.intro.hidden = false;
    elements.status.textContent = 'STATUS: PRONTO PARA INICIAR';
    updateMap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  elements.start?.addEventListener('click', start);
  elements.back?.addEventListener('click', () => {
    if (currentQuestion === 0) return;
    currentQuestion -= 1;
    renderQuestion();
  });
  elements.next?.addEventListener('click', () => {
    if (elements.next.disabled) return;
    if (currentQuestion === questions.length - 1) showResult();
    else {
      currentQuestion += 1;
      renderQuestion();
    }
  });
  elements.restart?.addEventListener('click', restart);

  updateMap();
})();
