(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.solutions-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-solutions-nav');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.tech-card')];
  const searchInput = document.querySelector('#solutionSearch');
  const countLabel = document.querySelector('#solutionCount');
  const emptyState = document.querySelector('#catalogEmpty');
  const modal = document.querySelector('#technologyModal');
  let activeFilter = 'all';

  const solutions = {
    concierge: {
      code: 'MOD / 01', category: 'Atendimento', title: 'Cevora Concierge 24/7',
      description: 'Uma camada de atendimento inicial que acolhe, responde informações aprovadas e organiza o próximo passo antes de envolver a equipe.',
      fix: 'Demora, repetição e conversas que começam sem direção.',
      implementation: 'WhatsApp conectado à base de informações da clínica, regras de transferência e histórico centralizado.',
      tags: ['WhatsApp', 'IA conversacional', 'FAQ aprovada', 'Passagem humana'],
      guardrail: 'Não diagnostica, não indica procedimento e não substitui orientação médica.'
    },
    qualify: {
      code: 'MOD / 02', category: 'Atendimento', title: 'Cevora Qualify',
      description: 'Reúne o contexto comercial necessário para que a equipe saiba quem está entrando, o que procura e qual próximo passo faz sentido.',
      fix: 'Atendentes começando toda conversa do zero e tratando todas as oportunidades da mesma forma.',
      implementation: 'Perguntas contextuais, critérios aprovados, registro no CRM e priorização operacional.',
      tags: ['Qualificação', 'CRM', 'Segmentação', 'Prioridade'],
      guardrail: 'A qualificação é administrativa e comercial. Triagem e decisão clínica permanecem humanas.'
    },
    agenda: {
      code: 'MOD / 03', category: 'Atendimento', title: 'Cevora Agenda',
      description: 'Reduz a distância entre intenção e avaliação confirmada, automatizando disponibilidade, agendamento e reagendamento.',
      fix: 'Trocas excessivas de mensagens, horários perdidos e agendamentos que nunca são concluídos.',
      implementation: 'Integração com calendário, regras de disponibilidade, confirmações e rotas de reagendamento.',
      tags: ['Calendário', 'Agendamento', 'Confirmação', 'Reagendamento'],
      guardrail: 'Horários, bloqueios e exceções continuam definidos pela clínica.'
    },
    multidesk: {
      code: 'MOD / 04', category: 'Atendimento', title: 'Cevora MultiDesk',
      description: 'Transforma um único número em uma operação organizada entre atendentes, filas e automações.',
      fix: 'Conversas sem dono, respostas duplicadas, histórico fragmentado e troca de contexto.',
      implementation: 'Filas, distribuição por responsável, permissões, histórico e transferência interna.',
      tags: ['Multiusuário', 'Filas', 'Histórico', 'Permissões'],
      guardrail: 'A tecnologia organiza responsabilidade; a gestão da equipe continua sendo humana.'
    },
    copilot: {
      code: 'MOD / 05', category: 'Atendimento', title: 'Cevora Copilot',
      description: 'Um assistente em tempo real para a atendente consultar scripts, objeções, rotas A/B e próximos passos.',
      fix: 'Padrões que existem no treinamento, mas desaparecem sob pressão na conversa real.',
      implementation: 'Base de scripts aprovada, interface de consulta e sugestões dentro do fluxo da equipe.',
      tags: ['Scripts', 'Rotas A/B', 'Objeções', 'Assistência ao vivo'],
      guardrail: 'Sugere, não decide. A atendente permanece no controle da resposta enviada.'
    },
    followup: {
      code: 'MOD / 06', category: 'Continuidade', title: 'Cevora Follow-up',
      description: 'Executa continuidade por estágio e contexto para que oportunidades recentes não dependam da memória da equipe.',
      fix: 'Conversas que esfriam simplesmente porque ninguém retomou no momento certo.',
      implementation: 'Cadências por etapa, mensagens aprovadas, pausa ao receber resposta e registro no CRM.',
      tags: ['Cadências', 'Contexto', 'CRM', 'Pausa humana'],
      guardrail: 'Não insiste indefinidamente e respeita consentimento, resposta e limites definidos pela clínica.'
    },
    recovery: {
      code: 'MOD / 07', category: 'Continuidade', title: 'Cevora Recovery',
      description: 'Recupera conversas em que existiu intenção clara, mas o paciente não concluiu o agendamento.',
      fix: 'Avaliações abandonadas depois de pergunta de preço, disponibilidade ou início do agendamento.',
      implementation: 'Detecção de abandono, mensagem contextual e encaminhamento para agenda ou atendente.',
      tags: ['Recuperação', 'Agendamento', 'Intenção', 'WhatsApp'],
      guardrail: 'Recuperação não é pressão. A retomada deve ser relevante e interrompida diante de recusa.'
    },
    recall: {
      code: 'MOD / 08', category: 'Continuidade', title: 'Cevora Recall',
      description: 'Reativa bases antigas com critérios claros para distinguir oportunidade real de contato inadequado.',
      fix: 'Cancelamentos, retornos prometidos e interesses antigos enterrados no histórico.',
      implementation: 'Segmentação da base, critérios de elegibilidade, sequências curtas e registro de resposta.',
      tags: ['Reativação', 'Segmentação', 'Cancelamentos', 'Base histórica'],
      guardrail: 'Não transforma uma base antiga em lista de disparo indiscriminado.'
    },
    reminders: {
      code: 'MOD / 09', category: 'Continuidade', title: 'Cevora Notify',
      description: 'Automatiza lembretes administrativos para reduzir ausência, esquecimento e tarefas repetitivas.',
      fix: 'Confirmações manuais, documentos esquecidos e pacientes sem saber o próximo passo operacional.',
      implementation: 'Gatilhos de agenda, modelos aprovados, confirmações e encaminhamento de exceções.',
      tags: ['Lembretes', 'No-show', 'Documentos', 'Pagamentos'],
      guardrail: 'Orientações clínicas só entram quando aprovadas e supervisionadas pela equipe habilitada.'
    },
    onboarding: {
      code: 'MOD / 10', category: 'Continuidade', title: 'Cevora Journey Care',
      description: 'Organiza a jornada administrativa antes e depois do procedimento em um caminho previsível para paciente e equipe.',
      fix: 'Documentos, tarefas e orientações espalhados em conversas diferentes.',
      implementation: 'Checklists, documentos, responsáveis, lembretes e pontos de passagem humana.',
      tags: ['Onboarding', 'Checklists', 'Documentos', 'Jornada'],
      guardrail: 'Não monitora condição clínica nem substitui contato com a equipe assistencial.'
    },
    reputation: {
      code: 'MOD / 11', category: 'Operação', title: 'Cevora Reputation',
      description: 'Transforma experiências positivas em pedidos de avaliação feitos no momento e canal apropriados.',
      fix: 'Pacientes satisfeitos que nunca são convidados a compartilhar a experiência.',
      implementation: 'Gatilhos pós-atendimento, coleta de feedback e direcionamento de respostas sensíveis.',
      tags: ['Google', 'Feedback', 'Reputação', 'Automação'],
      guardrail: 'Não fabrica avaliações, não condiciona atendimento e não oculta feedback negativo.'
    },
    'procedure-guide': {
      code: 'MOD / 12', category: 'Operação', title: 'Cevora Procedure Guide',
      description: 'Centraliza informações previamente aprovadas sobre procedimentos para reduzir dúvidas repetidas e orientar o próximo passo.',
      fix: 'Informações inconsistentes e equipe respondendo a mesma dúvida de formas diferentes.',
      implementation: 'Base revisada pelo cirurgião, FAQ, busca e encaminhamento de dúvidas específicas.',
      tags: ['Base de conhecimento', 'FAQ', 'Busca', 'Encaminhamento'],
      guardrail: 'Informa sem diagnosticar, recomendar ou prometer resultado médico.'
    },
    proposal: {
      code: 'MOD / 13', category: 'Operação', title: 'Cevora Proposal',
      description: 'Gera apresentações consistentes depois que a clínica define humanamente escopo, inclusões, investimento e próximos passos.',
      fix: 'Propostas lentas, visualmente inconsistentes e difíceis de revisar.',
      implementation: 'Templates, campos aprovados, geração de documento e registro de envio.',
      tags: ['Propostas', 'Templates', 'Documentos', 'Personalização'],
      guardrail: 'Não cria indicação médica nem altera plano definido pelo cirurgião.'
    },
    finance: {
      code: 'MOD / 14', category: 'Operação', title: 'Cevora Billing Care',
      description: 'Organiza cobranças administrativas com linguagem respeitosa e histórico claro para o financeiro.',
      fix: 'Pendências esquecidas ou abordagens improvisadas que geram constrangimento.',
      implementation: 'Gatilhos de vencimento, conciliação, pausa após pagamento e passagem para responsável.',
      tags: ['Pagamentos', 'Lembretes', 'Conciliação', 'Financeiro'],
      guardrail: 'Não realiza cobrança abusiva e respeita regras, consentimento e intervenção humana.'
    },
    partnerships: {
      code: 'MOD / 15', category: 'Operação B2B', title: 'Cevora Partner Network',
      description: 'Automatiza pesquisa e acompanhamento de parcerias profissionais, fornecedores e fontes de indicação.',
      fix: 'Relacionamentos B2B que dependem exclusivamente da memória e disponibilidade do cirurgião.',
      implementation: 'Pesquisa de parceiros, cadência de contato, registro e acompanhamento de oportunidades B2B.',
      tags: ['Parcerias', 'B2B', 'Indicações', 'Follow-up'],
      guardrail: 'Não realiza prospecção fria de pacientes e não cria indicações clínicas indevidas.'
    },
    intelligence: {
      code: 'MOD / 16', category: 'Dados & integrações', title: 'Cevora Intelligence',
      description: 'Centraliza indicadores para mostrar onde a jornada avança, trava ou desaparece.',
      fix: 'Decisões tomadas por sensação e relatórios desconectados.',
      implementation: 'Dashboard conectado ao CRM, agenda, canais e eventos operacionais relevantes.',
      tags: ['Dashboard', 'CRM', 'Gargalos', 'Motivos de perda'],
      guardrail: 'Métrica não substitui interpretação. O painel mostra comportamento, não causalidade automática.'
    },
    connect: {
      code: 'MOD / 17', category: 'Dados & integrações', title: 'Cevora Connect',
      description: 'Faz sistemas diferentes compartilharem contexto sem exigir cópia manual entre telas.',
      fix: 'Informação duplicada, perdida ou divergente entre WhatsApp, agenda, CRM e financeiro.',
      implementation: 'APIs, webhooks, regras de sincronização e monitoramento de falhas.',
      tags: ['API', 'Webhooks', 'CRM', 'Sincronização'],
      guardrail: 'Integra apenas sistemas autorizados e respeita acessos, segurança e minimização de dados.'
    },
    audit: {
      code: 'MOD / 18', category: 'Dados & integrações', title: 'Cevora Service Audit',
      description: 'Analisa padrões operacionais nas conversas para revelar gargalos antes que virem reclamação ou perda recorrente.',
      fix: 'Demora, ausência de próximo passo e quebra de padrão descobertas tarde demais.',
      implementation: 'Leitura de eventos, classificação de falhas, alertas e relatórios de melhoria.',
      tags: ['Auditoria', 'Conversas', 'Alertas', 'Qualidade operacional'],
      guardrail: 'Avalia processo e aderência, não competência médica ou decisão clínica.'
    }
  };

  const setMenuState = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    mobileMenu?.classList.toggle('is-open', open);
  };

  menuButton?.addEventListener('click', () => setMenuState(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const applyFilters = () => {
    const query = normalize(searchInput?.value.trim() || '');
    let visible = 0;

    cards.forEach((card) => {
      const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchable = normalize(card.textContent || '');
      const searchMatches = !query || searchable.includes(query);
      const show = categoryMatches && searchMatches;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (countLabel) countLabel.textContent = `${visible} ${visible === 1 ? 'solução encontrada' : 'soluções encontradas'}`;
    if (emptyState) emptyState.hidden = visible !== 0;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', applyFilters);

  const openModal = (key) => {
    const data = solutions[key];
    if (!modal || !data) return;

    modal.querySelector('#technologyModalCode').textContent = data.code;
    modal.querySelector('#technologyModalCategory').textContent = data.category;
    modal.querySelector('#technologyModalTitle').textContent = data.title;
    modal.querySelector('#technologyModalDescription').textContent = data.description;
    modal.querySelector('#technologyModalFix').textContent = data.fix;
    modal.querySelector('#technologyModalImplementation').textContent = data.implementation;
    modal.querySelector('#technologyModalGuardrail').textContent = data.guardrail;
    modal.querySelector('#technologyModalTags').innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
    modal.querySelector('#technologyModalCta').href = `index.html?diagnostico=1&origem=modulo-${key}`;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => modal.querySelector('.technology-modal__close')?.focus(), 80);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-open-solution]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.openSolution));
  });
  document.querySelectorAll('[data-close-solution]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .1, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));

    const visual = document.querySelector('.technology-hero__visual');
    let frame = 0;
    visual?.addEventListener('pointermove', (event) => {
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        visual.style.transform = `perspective(1200px) rotateX(${y * -1.2}deg) rotateY(${x * 1.5}deg)`;
      });
    });
    visual?.addEventListener('pointerleave', () => { visual.style.transform = ''; });
  }

  const requestedCategory = new URLSearchParams(window.location.search).get('categoria');
  if (requestedCategory && filterButtons.some((button) => button.dataset.filter === requestedCategory)) {
    filterButtons.find((button) => button.dataset.filter === requestedCategory)?.click();
  } else {
    applyFilters();
  }
})();