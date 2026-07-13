(() => {
  'use strict';

  if (window.__cevoraCopyStrengthenerLoaded) return;
  window.__cevoraCopyStrengthenerLoaded = true;

  const setHTML = (root, selector, value) => {
    const element = root.querySelector(selector);
    if (element) element.innerHTML = value;
  };

  const setText = (root, selector, value) => {
    const element = root.querySelector(selector);
    if (element) element.textContent = value;
  };

  const setTexts = (root, selector, values) => {
    root.querySelectorAll(selector).forEach((element, index) => {
      if (values[index] !== undefined) element.textContent = values[index];
    });
  };

  const setHTMLs = (root, selector, values) => {
    root.querySelectorAll(selector).forEach((element, index) => {
      if (values[index] !== undefined) element.innerHTML = values[index];
    });
  };

  const updateButtonLabel = (button, value) => {
    if (!button) return;
    const candidates = [...button.querySelectorAll('span')].filter((span) => !span.classList.contains('button__icon') && !span.classList.contains('play-icon'));
    const label = candidates.at(-1);
    if (label) label.textContent = value;
    else button.firstChild.textContent = value;
  };

  const applyStaticCopy = () => {
    if (document.body.dataset.copyV6Static === 'true') return;
    document.body.dataset.copyV6Static = 'true';

    document.title = 'Cevora | Transforme Interesse em Confiança Antes da Consulta';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'A Cevora encontra onde clínicas de cirurgia plástica perdem confiança e estrutura a jornada entre o primeiro interesse e a avaliação.';
    }

    const hero = document.querySelector('#produto');
    if (hero) {
      setHTML(hero, '.hero__copy', 'Você pode investir em tráfego, conteúdo e atendimento rápido. Se o paciente não entende por que confiar, ele compara preço, adia e desaparece. <strong>A Cevora corrige o caminho entre o primeiro interesse e a avaliação.</strong>');
      updateButtonLabel(hero.querySelector('.hero__actions [data-diagnostic-open]'), 'Encontrar meu vazamento');
      updateButtonLabel(hero.querySelector('.hero__actions [data-open="demo"]'), 'Ver por que pacientes somem');
      setTexts(hero, '.benefit-card > span:last-child', [
        'Descobrir onde a confiança quebra',
        'Conduzir até a avaliação',
        'Medir o que faz avançar'
      ]);
      setHTML(hero, '.chat-message', '<span>Pode escrever sua dúvida do seu jeito.</span><span>Eu organizo o próximo passo sem deixar a conversa morrer.</span><small>agora ✓✓</small>');
      setText(hero, '.score-copy > strong', 'A confiança quebra antes da agenda');
      setTexts(hero, '.score-copy > span', [
        'Preço aparece cedo demais',
        'A conversa não conduz',
        'O follow-up depende da memória'
      ]);
      setText(hero, '.journey-card__status strong', 'Interesse não basta. A jornada precisa fazê-lo avançar.');
      setText(hero, '.journey-card__status span', 'A Cevora registra onde o paciente ganha segurança e onde desiste.');
    }

    const problem = document.querySelector('#problema');
    if (problem) {
      setText(problem, '.brand-story__kicker', 'Onde o crescimento morre');
      setHTML(problem, '.brand-story__title', 'A maioria dos pacientes não é perdida na consulta. <em>É perdida antes de chegar nela.</em>');
      setHTML(problem, '.brand-story__lead', 'Eles não somem porque acordaram sem interesse. Somem quando a jornada entrega dúvida onde deveria acumular confiança, responde sem conduzir e termina sem um próximo passo.');
      setTexts(problem, '.patient-path__step > span', [
        'A clínica conquistou atenção. Ainda não conquistou preferência.',
        'Entrou no WhatsApp procurando segurança suficiente para avançar.',
        'Preço vira atalho quando o valor ainda não foi construído.',
        'Sem diferença percebida, o cirurgião vira apenas mais uma opção.',
        'A conversa respondeu perguntas, mas não conduziu uma decisão.',
        'Sem próximo passo e sem follow-up, a oportunidade desapareceu.'
      ]);
      setText(problem, '.brand-story__diagnosis strong', 'Paciente que some deixa pistas.');
      setText(problem, '.brand-story__diagnosis span', 'Quando ninguém registra a quebra, a perda parece acaso. Quando a jornada é medida, ela vira um gargalo corrigível.');
    }

    const thesis = document.querySelector('#tese');
    if (thesis) {
      setText(thesis, '.brand-story__kicker', 'O erro que custa caro');
      setHTML(thesis, '.brand-story__title', 'Mais leads não corrigem uma jornada que não transmite confiança. <em>Só alimentam o vazamento.</em>');
      setHTML(thesis, '.brand-story__lead', 'Tráfego não corrige atendimento genérico, preço sem contexto, follow-up inexistente ou posicionamento indiferenciado. Ele apenas coloca mais oportunidades dentro de uma operação que ainda não sabe conduzi-las.');
      setTexts(thesis, '.enemy-card strong', [
        'Marketing que termina no clique',
        'Atendimento que apenas reage',
        'Operação que perde no escuro'
      ]);
      setTexts(thesis, '.enemy-card p', [
        'Gera atenção, entrega mensagens e abandona a responsabilidade quando a conversa começa.',
        'Responde o que o paciente pergunta, mas não constrói o que ele precisa entender para avançar.',
        'A clínica perde oportunidades sem saber onde, por que ou quanto está deixando escapar.'
      ]);
      setTexts(thesis, '.leak-machine__flow span', [
        'A clínica compra ou conquista atenção',
        'O paciente entra procurando segurança',
        'Recebe informação, mas não ganha contexto',
        'A conversa termina sem decisão nem próximo passo',
        'A oportunidade some sem deixar diagnóstico'
      ]);
      setText(thesis, '.leak-machine__rupture', 'Mais tráfego não resolve. Amplifica.');
      setHTMLs(thesis, '.leak-machine__outcome div', [
        '<strong>Mais conversas perdidas</strong><span>porque volume não substitui condução</span>',
        '<strong>Mais comparação por preço</strong><span>porque a diferença não foi percebida</span>',
        '<strong>Mais dinheiro sem diagnóstico</strong><span>porque a perda continua invisível</span>'
      ]);
    }

    const conflict = document.querySelector('#conflito');
    if (conflict) {
      setText(conflict, '.brand-story__kicker', 'O jogo que recusamos');
      setHTML(conflict, '.brand-story__title', 'Quem entrega cirurgia séria não deveria disputar paciente <em>como quem vende promoção.</em>');
      setHTML(conflict, '.brand-story__lead', 'Antes da consulta, o paciente ainda não consegue avaliar técnica. Ele interpreta sinais. Quando a jornada não traduz competência em confiança, um cirurgião excelente pode parecer apenas o mais caro.');
      setTexts(conflict, '.identity-shift__state strong', [
        'Competência invisível, preço exposto',
        'Autoridade percebida antes da consulta'
      ]);
      setTexts(conflict, '.identity-shift__state p', [
        'A clínica espera que o paciente adivinhe valor entre posts, respostas soltas e uma pergunta de preço.',
        'Cada etapa reduz incerteza, comunica diferença e conduz a escolha sem vulgarizar a medicina.'
      ]);
      setHTML(conflict, '.guide-line', '<strong>Você domina a cirurgia.</strong> A Cevora impede que a jornada anterior esconda isso.');
    }

    const method = document.querySelector('#metodo');
    if (method) {
      setText(method, '.brand-story__kicker', 'Diagnóstico antes da ferramenta');
      setHTML(method, '.brand-story__title', 'Não automatizamos um problema <em>que ainda não foi nomeado.</em>');
      setHTML(method, '.brand-story__lead', 'Primeiro tornamos a perda visível. Depois reconstruímos o caminho. Só então usamos tecnologia para proteger o padrão e dados para provar o que realmente faz o paciente avançar.');
      setTexts(method, '.method-path__step h3', [
        'Tornar o vazamento visível',
        'Reconstruir o caminho até a avaliação',
        'Provar o que funciona e corrigir o resto'
      ]);
      setTexts(method, '.method-path__step p', [
        'Separamos sensação de evidência para localizar a quebra que mais prejudica a decisão.',
        'Organizamos mensagem, atendimento, próximos passos e automação para que a conversa tenha direção.',
        'Medimos passagem, continuidade e motivos de perda para melhorar a jornada com comportamento real.'
      ]);
      setTexts(method, '.method-path__step ul', [
        '<li>Onde o paciente perde segurança</li><li>Quando o preço assume o controle</li><li>Por que a conversa não avança</li>',
        '<li>Oferta e mensagem por procedimento</li><li>Pré-consulta e condução no WhatsApp</li><li>Automação com saída humana</li>',
        '<li>Contato transformado em avaliação</li><li>Follow-up realmente executado</li><li>Motivos de perda registrados</li>'
      ]);
      setText(method, '.method-cta__copy strong', 'Antes de comprar mais atenção, descubra por que a atenção atual não vira avaliação.');
      setText(method, '.method-cta__copy span', 'O diagnóstico mostra a perda prioritária e qual correção faz sentido primeiro.');
      updateButtonLabel(method.querySelector('.method-cta [data-diagnostic-open]'), 'Mapear meus gargalos');
    }

    const demo = document.querySelector('#demoModal');
    if (demo) {
      setText(demo, '.modal__eyebrow', 'Mapa de Vazamentos de Confiança');
      setText(demo, '#demoTitle', 'O paciente não some. A jornada o perde.');
      setText(demo, '#demoTitle + p', 'A Cevora investiga os pontos em que a clínica deixa de acumular confiança e passa a produzir comparação, adiamento ou silêncio.');
      setTexts(demo, '.method-grid article small', [
        'O paciente percebe uma diferença concreta ou vê mais um cirurgião oferecendo o mesmo procedimento?',
        'Perfil, página e mensagem inicial reduzem incerteza ou obrigam o paciente a interpretar tudo sozinho?',
        'A equipe constrói contexto e conduz o próximo passo ou apenas entrega respostas?',
        'A conversa continua de forma relevante ou morre quando o paciente para de responder?',
        'A clínica sabe onde perde oportunidades ou chama toda desistência de falta de interesse?'
      ]);
      updateButtonLabel(demo.querySelector('[data-diagnostic-open]'), 'Encontrar meu principal vazamento');
    }

    const diagnostic = document.querySelector('#diagnosticModal');
    if (diagnostic) {
      setText(diagnostic, '.modal__eyebrow', 'Diagnóstico de Vazamento de Confiança');
      setText(diagnostic, '#diagnosticTitle', 'Descubra onde sua clínica perde confiança antes de perder o paciente.');
      setText(diagnostic, '#diagnosticTitle + p', 'Vamos analisar o caminho entre a primeira impressão, o WhatsApp e o agendamento para identificar a correção prioritária.');
      updateButtonLabel(diagnostic.querySelector('#diagnosticForm button[type="submit"]'), 'Solicitar meu diagnóstico');
      setText(diagnostic, '#diagnosticSuccess strong', 'Seu diagnóstico começou.');
      setText(diagnostic, '#diagnosticSuccess span', 'A equipe da Cevora entrará em contato para entender onde a jornada da clínica está travando.');
    }
  };

  const applySolutionsCopy = () => {
    const root = document.querySelector('#solucoes');
    if (!root || root.dataset.copyV6 === 'true') return false;
    root.dataset.copyV6 = 'true';

    setHTML(root, '.solutions-heading__copy h2', 'Automação sem diagnóstico só torna o erro <em>mais eficiente.</em>');
    setText(root, '.solutions-heading__copy > p', 'A Cevora combina os módulos conforme a perda que precisa ser impedida. Você não compra uma pilha de funções. Implanta responsabilidade sobre uma parte clara da jornada.');

    setText(root, '.diagnostic-entry h3', 'Descubra o vazamento antes de automatizá-lo.');
    setText(root, '.diagnostic-entry > p', 'O diagnóstico revela onde a clínica perde confiança, continuidade e informação antes de prescrever qualquer tecnologia.');
    updateButtonLabel(root.querySelector('.diagnostic-entry [data-package-diagnostic]'), 'Encontrar o gargalo primeiro');

    const panelPromises = root.querySelectorAll('.package-panel__promise');
    const promises = [
      'Faça o paciente sentir condução desde a primeira mensagem, mesmo quando a equipe não pode responder na hora.',
      'Paciente interessado não pode desaparecer porque ninguém lembrou de continuar a conversa.',
      'Pare de comprar peças soltas para um problema que atravessa posicionamento, atendimento e operação.'
    ];
    panelPromises.forEach((element, index) => {
      if (promises[index]) element.textContent = promises[index];
    });

    setTexts(root, '.package-panel__columns > div:last-child p', [
      'A recepção está sobrecarregada, o paciente espera demais ou o agendamento exige uma maratona de mensagens.',
      'A clínica recebe interesse, mas deixa conversas esfriarem, cancelamentos morrerem e oportunidades antigas acumularem poeira.',
      'Cada peça existe, mas ninguém responde pelo caminho inteiro entre ser encontrado e chegar à avaliação.'
    ]);

    const packageCtas = root.querySelectorAll('.package-panel__cta');
    ['Corrigir o primeiro contato', 'Impedir oportunidades esquecidas', 'Reconstruir a jornada inteira'].forEach((label, index) => {
      const button = packageCtas[index];
      if (!button) return;
      const arrow = button.querySelector('span');
      button.childNodes[0].textContent = `${label} `;
      if (arrow) arrow.textContent = '↗';
    });

    setText(root, '.solution-layer--intelligence p', 'Sem dados, toda melhoria é opinião. A Intelligence mostra onde o paciente avança, trava e desaparece.');
    setText(root, '.solution-layer--formation p', 'Ensina o cirurgião e a equipe a enxergarem a máquina para não confundirem movimento com crescimento.');

    setText(root, '.solutions-closing strong', 'A clínica não precisa do pacote maior. Precisa parar a perda certa.');
    setText(root, '.solutions-closing p', 'O diagnóstico determina se o vazamento exige corrigir o primeiro contato, recuperar continuidade ou reconstruir a jornada inteira.');
    updateButtonLabel(root.querySelector('.solutions-closing [data-package-diagnostic]'), 'Descobrir a correção prioritária');
    return true;
  };

  const applyAuthorityCopy = () => {
    const root = document.querySelector('#sobre');
    if (!root || root.dataset.copyV6 === 'true') return false;
    root.dataset.copyV6 = 'true';

    setHTML(root, '.authority-header h2', 'Confiança não se pede. <em>Constrói-se de forma verificável.</em>');
    setText(root, '.authority-header > p', 'A Cevora não usa dashboards cenográficos nem percentuais sem origem. Mostra o gargalo, a lógica da intervenção, o que foi implantado e qual comportamento mudou.');

    setTexts(root, '.evidence-card h3', [
      'A perda deixa de ser opinião',
      'A correção deixa de ser improviso',
      'A automação deixa de ser uma caixa-preta',
      'O resultado deixa rastros'
    ]);
    setTexts(root, '.evidence-card p', [
      'A clínica vê onde a jornada quebra, como a perda aparece e por que aquele ponto merece prioridade.',
      'Fluxos, mensagens, responsabilidades e limites são definidos antes de qualquer implantação.',
      'Cenários reais são testados antes de o sistema assumir contato com pacientes.',
      'A evolução é acompanhada por passagem, continuidade e motivos de perda, não por vaidade gráfica.'
    ]);

    setHTML(root, '.implementation-protocol__copy h2', 'Uma ferramenta instalada em um processo ruim <em>só automatiza o desperdício.</em>');
    setText(root, '.implementation-protocol__copy > p', 'Por isso a Cevora entra em sequência: enxerga, desenha, testa e só depois otimiza. Cada etapa precisa sustentar a próxima.');

    setHTML(root, '.guide-manifesto blockquote', '“Você já domina a cirurgia. A Cevora existe para que a jornada anterior não esconda essa competência.”');
    setText(root, '.guide-manifesto__copy > p', 'Não ocupamos o lugar do cirurgião e não transformamos o paciente em um número. Estruturamos os sinais, as conversas e os próximos passos que permitem à confiança chegar antes da consulta.');

    setHTML(root, '.anti-promise__heading h2', 'Preferimos perder uma venda a <em>vender uma fantasia.</em>');
    setTexts(root, '.anti-promise__grid strong', [
      'Agenda cheia por decreto',
      'Volume barato como estratégia',
      'Robô fingindo ser equipe',
      'Resultado que ninguém consegue explicar'
    ]);
    setTexts(root, '.anti-promise__grid p', [
      'Nenhum sistema controla mercado, reputação, capacidade da clínica ou decisão humana.',
      'Mais contatos dentro de uma jornada ruim podem apenas multiplicar comparação e desperdício.',
      'A tecnologia protege padrão e continuidade. Julgamento clínico e exceções continuam humanos.',
      'Sem registro existe narrativa. Com registro existe um gargalo que pode ser corrigido.'
    ]);

    setHTML(root, '.measurement-board__copy h2', 'O que não deixa rastro <em>vira desculpa.</em>');
    setText(root, '.measurement-board__copy p', 'A Cevora mede a passagem entre etapas, a continuidade das conversas e os motivos de perda para que a próxima decisão não dependa de palpite.');

    setText(root, '.authority-cta strong', 'Você não precisa acreditar em uma promessa. Precisa enxergar o vazamento.');
    setText(root, '.authority-cta p', 'O diagnóstico transforma uma perda difusa em uma prioridade concreta de correção.');
    updateButtonLabel(root.querySelector('.authority-cta [data-authority-diagnostic]'), 'Encontrar onde estou perdendo');
    return true;
  };

  applyStaticCopy();
  const solutionsReady = applySolutionsCopy();
  const authorityReady = applyAuthorityCopy();

  if (!solutionsReady || !authorityReady) {
    const observer = new MutationObserver(() => {
      const hasSolutions = applySolutionsCopy();
      const hasAuthority = applyAuthorityCopy();
      if (hasSolutions && hasAuthority) observer.disconnect();
    });

    observer.observe(document.querySelector('main') || document.documentElement, {
      childList: true,
      subtree: true
    });

    window.setTimeout(() => observer.disconnect(), 12000);
  }
})();