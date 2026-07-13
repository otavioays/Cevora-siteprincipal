(() => {
  'use strict';

  const modules = {
    concierge: {
      code:'MOD / 01', category:'Atendimento', title:'Cevora Concierge 24/7', subtitle:'Atendimento inicial que acolhe, responde o que está aprovado e conduz a conversa até um próximo passo claro.',
      meaning:'Na prática, o Concierge é a primeira camada da conversa. Ele recebe a mensagem, entende a intenção administrativa do contato, responde dúvidas previamente aprovadas e encaminha a pessoa para agenda ou equipe sem fingir ser um profissional de saúde.',
      problem:'Mensagens chegam fora de hora, respostas demoram e a conversa começa sem direção.', outcome:'O primeiro contato passa a ter velocidade, consistência e uma passagem humana com contexto.',
      implementation:'A implantação conecta o WhatsApp à base de informações aprovada pela clínica, define o que pode ser respondido, em quais situações a equipe assume e como o histórico é registrado.',
      steps:[['Entrada','A pessoa escreve livremente e o sistema identifica o assunto da conversa.'],['Condução','Informações aprovadas são apresentadas e o próximo passo administrativo é organizado.'],['Passagem','Quando existe dúvida específica ou exceção, a equipe recebe a conversa com o contexto preservado.']],
      tags:['WhatsApp','IA conversacional','FAQ aprovada','Passagem humana'], fit:['A clínica demora para responder fora do horário comercial.','A equipe repete as mesmas respostas dezenas de vezes.','Conversas chegam sem um próximo passo definido.'], guardrail:'Não diagnostica, não indica procedimentos, não interpreta sintomas e não substitui orientação médica.', related:['qualify','agenda','multidesk'], io:['Mensagem do paciente','Condução inicial','Agenda ou equipe']
    },
    qualify: {
      code:'MOD / 02', category:'Atendimento', title:'Cevora Qualify', subtitle:'Organização de contexto para que a equipe saiba quem entrou, o que procura e como continuar a conversa.',
      meaning:'Qualificar não significa decidir quem “merece” atendimento. Significa reunir o contexto operacional necessário para que a atendente não precise começar do zero e consiga priorizar o próximo passo com mais clareza.',
      problem:'Todas as conversas parecem iguais e a equipe precisa descobrir novamente o básico em cada atendimento.', outcome:'Cada contato chega com intenção, momento, disponibilidade e histórico organizados.',
      implementation:'São definidas perguntas contextuais, critérios administrativos, campos no CRM e regras de prioridade. A equipe escolhe o que realmente precisa saber antes de assumir.',
      steps:[['Perguntas','O sistema coleta apenas os dados necessários para compreender a demanda administrativa.'],['Registro','As respostas são estruturadas em campos e anexadas ao histórico da pessoa.'],['Prioridade','A equipe recebe uma visão resumida e sabe qual conversa exige atenção primeiro.']],
      tags:['Qualificação','CRM','Segmentação','Prioridade'], fit:['A atendente repete perguntas que já foram respondidas.','Leads quentes e frios entram na mesma fila.','O CRM contém nomes, mas pouco contexto útil.'], guardrail:'A qualificação é administrativa e comercial. Triagem, diagnóstico e decisão clínica permanecem humanos.', related:['concierge','copilot','intelligence'], io:['Respostas iniciais','Contexto estruturado','Equipe priorizada']
    },
    agenda: {
      code:'MOD / 03', category:'Atendimento', title:'Cevora Agenda', subtitle:'Disponibilidade, agendamento, confirmação e reagendamento sem uma maratona de mensagens.',
      meaning:'A Agenda transforma o “quero marcar” em um fluxo objetivo. Ela consulta horários permitidos, apresenta opções, confirma a escolha e registra o compromisso no calendário correto.',
      problem:'A intenção existe, mas se perde em trocas de horário, demora e mensagens manuais.', outcome:'O paciente encontra um horário e a equipe recebe a avaliação já registrada e contextualizada.',
      implementation:'O calendário da clínica é conectado, regras de disponibilidade são configuradas e exceções ficam sob controle da equipe. Também podem entrar confirmação e reagendamento.',
      steps:[['Disponibilidade','O sistema lê apenas os horários autorizados para aquele tipo de compromisso.'],['Escolha','A pessoa seleciona uma opção compatível e confirma os dados necessários.'],['Registro','O compromisso entra no calendário e dispara os próximos lembretes administrativos.']],
      tags:['Calendário','Agendamento','Confirmação','Reagendamento'], fit:['O agendamento exige muitas mensagens de ida e volta.','Horários são oferecidos e depois descobertos como indisponíveis.','A equipe perde tempo confirmando e reagendando manualmente.'], guardrail:'Horários, bloqueios, duração, elegibilidade e exceções continuam definidos pela clínica.', related:['concierge','reminders','recovery'], io:['Intenção de agendar','Consulta de horários','Avaliação confirmada']
    },
    multidesk: {
      code:'MOD / 04', category:'Atendimento', title:'Cevora MultiDesk', subtitle:'Um único número organizado entre atendentes, filas, automações e responsáveis.',
      meaning:'O MultiDesk não é outro WhatsApp. É a camada que impede um canal compartilhado de virar território sem dono. Ele distribui conversas, preserva histórico e deixa claro quem está responsável por cada contato.',
      problem:'Mensagens duplicadas, conversas sem dono e contexto perdido quando outra pessoa assume.', outcome:'Cada conversa tem fila, responsável, histórico e regras de transferência visíveis.',
      implementation:'São configurados usuários, permissões, filas, critérios de distribuição, horários de atendimento e pontos em que automação e equipe trocam responsabilidade.',
      steps:[['Entrada','Toda mensagem entra em uma caixa compartilhada com histórico único.'],['Distribuição','A conversa é atribuída por fila, especialidade administrativa ou disponibilidade.'],['Responsabilidade','O sistema registra quem assumiu, transferiu e concluiu cada etapa.']],
      tags:['Multiusuário','Filas','Histórico','Permissões'], fit:['Várias pessoas usam o mesmo número sem coordenação.','Dois atendentes respondem a mesma pessoa.','A gestão não sabe quem deixou uma conversa parada.'], guardrail:'A tecnologia organiza responsabilidade, mas contratação, liderança, treinamento e gestão continuam humanos.', related:['concierge','copilot','audit'], io:['Mensagens compartilhadas','Distribuição e histórico','Responsável definido']
    },
    copilot: {
      code:'MOD / 05', category:'Atendimento', title:'Cevora Copilot', subtitle:'Assistente em tempo real para a atendente consultar scripts, rotas A/B e próximos passos.',
      meaning:'O Copilot funciona como uma memória operacional ao lado da atendente. Em vez de responder sozinho, ele sugere respostas, recupera padrões aprovados e ajuda a escolher a próxima rota da conversa.',
      problem:'O treinamento existe, mas desaparece quando a atendente enfrenta pressão, objeção ou uma conversa fora do padrão.', outcome:'A equipe consulta o padrão certo no momento em que precisa, sem entregar o controle para a IA.',
      implementation:'Scripts, objeções, critérios e exemplos são organizados em uma base consultável. A interface pode sugerir respostas a partir do contexto da conversa.',
      steps:[['Leitura','O sistema considera a etapa e o contexto da conversa atual.'],['Sugestão','Apresenta uma resposta aprovada, uma pergunta ou uma rota possível.'],['Decisão humana','A atendente revisa, adapta e decide o que realmente será enviado.']],
      tags:['Scripts','Rotas A/B','Objeções','Assistência ao vivo'], fit:['A qualidade do atendimento varia demais entre pessoas.','A equipe esquece como responder objeções importantes.','O gestor quer apoiar sem acompanhar cada conversa ao vivo.'], guardrail:'O Copilot sugere, não decide. Nenhuma resposta é enviada sem controle da atendente.', related:['qualify','multidesk','audit'], io:['Conversa atual','Sugestão contextual','Resposta humana']
    },
    followup: {
      code:'MOD / 06', category:'Continuidade', title:'Cevora Follow-up', subtitle:'Continuidade por estágio e contexto para que interesse recente não dependa da memória da equipe.',
      meaning:'Follow-up é o próximo contato necessário depois que a conversa parou. O módulo observa em qual etapa isso ocorreu e envia uma retomada coerente, em vez de repetir “ainda tem interesse?” para todo mundo.',
      problem:'Pessoas interessadas somem porque ninguém retomou a conversa no momento adequado.', outcome:'Cada oportunidade recente recebe continuidade registrada e interrompida assim que a pessoa responde.',
      implementation:'São criadas cadências curtas por estágio, mensagens aprovadas, regras de horário, pausa automática e registro no CRM.',
      steps:[['Detecção','O sistema identifica uma conversa parada em uma etapa que ainda permite avanço.'],['Retomada','Envia uma mensagem compatível com a dúvida ou próximo passo pendente.'],['Pausa','Ao receber resposta, a automação interrompe e devolve a conversa para a equipe.']],
      tags:['Cadências','Contexto','CRM','Pausa humana'], fit:['Leads desaparecem após receber informação.','A equipe promete retornar e esquece.','Não existe registro de quem recebeu continuidade.'], guardrail:'Não insiste indefinidamente, respeita consentimento e encerra diante de recusa ou ausência prolongada.', related:['recovery','recall','intelligence'], io:['Conversa parada','Retomada contextual','Resposta ou encerramento']
    },
    recovery: {
      code:'MOD / 07', category:'Continuidade', title:'Cevora Recovery', subtitle:'Recuperação de avaliações abandonadas depois de existir intenção clara de avançar.',
      meaning:'Recovery é aplicado quando a pessoa começou um movimento concreto, como pedir horários ou iniciar um agendamento, mas parou antes de concluir. É o equivalente clínico da recuperação de abandono, sem linguagem de e-commerce.',
      problem:'A pessoa demonstra intenção, mas abandona a conversa entre disponibilidade, preço e confirmação.', outcome:'O abandono vira um evento identificável com uma retomada específica e mensurável.',
      implementation:'O sistema identifica sinais de intenção, define o tempo de espera e oferece o próximo passo mais simples: retomar horário, esclarecer uma dúvida administrativa ou falar com a equipe.',
      steps:[['Sinal','A pessoa inicia uma ação concreta e deixa de concluir.'],['Espera','O sistema respeita uma janela antes de considerar a ação abandonada.'],['Recuperação','Uma mensagem contextual retoma exatamente o ponto em que a conversa parou.']],
      tags:['Recuperação','Agendamento','Intenção','WhatsApp'], fit:['Muitas pessoas pedem horários e não confirmam.','Conversas param depois da apresentação do investimento.','A clínica não mede quantas avaliações foram abandonadas.'], guardrail:'Recuperação não é pressão. A retomada deve ser relevante, curta e interrompida diante de recusa.', related:['agenda','followup','reminders'], io:['Ação incompleta','Detecção de abandono','Retomada do passo']
    },
    recall: {
      code:'MOD / 08', category:'Continuidade', title:'Cevora Recall', subtitle:'Reativação criteriosa de cancelamentos, retornos prometidos e interesses antigos.',
      meaning:'Recall trabalha com a base histórica. Ele procura pessoas que têm um motivo legítimo para serem retomadas, separando uma oportunidade ainda compatível de um contato que não deveria receber mensagem.',
      problem:'Cancelamentos e conversas antigas ficam enterrados no histórico sem qualquer critério de retomada.', outcome:'A base deixa de ser um cemitério de contatos e passa a ter segmentos claros de reativação.',
      implementation:'A clínica define elegibilidade, período, motivo de contato, sequência curta e regras de exclusão. Cada resposta atualiza o histórico.',
      steps:[['Segmentação','A base é filtrada por origem, estágio, data e motivo de interrupção.'],['Elegibilidade','Contatos sem contexto ou autorização são excluídos da retomada.'],['Reativação','Uma sequência curta verifica se ainda existe interesse real.']],
      tags:['Reativação','Segmentação','Cancelamentos','Base histórica'], fit:['Há muitos cancelamentos sem reagendamento.','Pessoas pediram para falar mais tarde e nunca foram retomadas.','A base antiga existe, mas ninguém sabe o que ainda faz sentido.'], guardrail:'Não transforma histórico antigo em lista indiscriminada de disparos.', related:['followup','recovery','intelligence'], io:['Base histórica','Elegibilidade','Reativação criteriosa']
    },
    reminders: {
      code:'MOD / 09', category:'Continuidade', title:'Cevora Notify', subtitle:'Lembretes administrativos para avaliações, documentos, localização e pagamentos.',
      meaning:'Notify é a camada que avisa a pessoa sobre o que precisa acontecer e quando. Ele reduz tarefas repetitivas da equipe e evita que o próximo passo dependa de alguém lembrar de mandar mensagem.',
      problem:'Confirmações, documentos e instruções administrativas são enviados manualmente ou esquecidos.', outcome:'Cada evento importante dispara a informação certa no momento definido pela clínica.',
      implementation:'Gatilhos são conectados à agenda e ao CRM. A clínica aprova mensagens, horários e exceções que exigem atendimento humano.',
      steps:[['Evento','Um agendamento, vencimento ou tarefa cria o gatilho.'],['Mensagem','O aviso correto é enviado no canal e horário autorizados.'],['Confirmação','Resposta, conclusão ou exceção ficam registradas para a equipe.']],
      tags:['Lembretes','No-show','Documentos','Pagamentos'], fit:['A clínica confirma avaliações manualmente.','Pacientes esquecem documentos ou localização.','A equipe repete instruções administrativas em várias conversas.'], guardrail:'Orientações clínicas só entram quando aprovadas e supervisionadas pela equipe habilitada.', related:['agenda','onboarding','finance'], io:['Evento agendado','Lembrete aprovado','Confirmação registrada']
    },
    onboarding: {
      code:'MOD / 10', category:'Continuidade', title:'Cevora Journey Care', subtitle:'Organização da jornada administrativa antes e depois do procedimento.',
      meaning:'Journey Care reúne tarefas, documentos, responsáveis e comunicações administrativas em uma sequência previsível. O paciente entende o que acontece agora e a equipe sabe o que ainda está pendente.',
      problem:'Informações ficam espalhadas em conversas diferentes e ninguém enxerga a jornada completa.', outcome:'Paciente e equipe passam a compartilhar uma sequência clara de etapas administrativas.',
      implementation:'Checklists, documentos, responsáveis, lembretes e pontos de passagem humana são configurados conforme o fluxo real da clínica.',
      steps:[['Plano','As etapas administrativas da jornada são transformadas em checklist.'],['Acompanhamento','Cada conclusão ou pendência atualiza o status da pessoa.'],['Escalada','Exceções e dúvidas clínicas são encaminhadas para a equipe responsável.']],
      tags:['Onboarding','Checklists','Documentos','Jornada'], fit:['Documentos chegam incompletos.','O paciente pergunta repetidamente qual é o próximo passo.','A equipe não sabe quais tarefas ainda estão abertas.'], guardrail:'Não monitora condição clínica e não substitui contato com a equipe assistencial.', related:['reminders','connect','intelligence'], io:['Etapas definidas','Checklist acompanhado','Jornada organizada']
    },
    reputation: {
      code:'MOD / 11', category:'Operação', title:'Cevora Reputation', subtitle:'Solicitação de avaliações no momento adequado, sem fabricar prova social.',
      meaning:'Reputation identifica momentos em que faz sentido pedir uma avaliação e transforma isso em um fluxo consistente. Feedbacks sensíveis são direcionados para tratamento interno, sem ocultar ou manipular opiniões.',
      problem:'Pacientes satisfeitos saem em silêncio e a reputação pública depende do acaso.', outcome:'Pedidos de avaliação passam a acontecer com contexto, registro e resposta organizada.',
      implementation:'São definidos gatilhos, canal, mensagem, destino da avaliação e fluxo interno para feedback que exige atenção.',
      steps:[['Momento','Um evento aprovado indica que o pedido pode ser realizado.'],['Solicitação','A pessoa recebe um convite simples e sem condicionamento.'],['Tratamento','Avaliação ou feedback entram no fluxo correto para acompanhamento.']],
      tags:['Google','Feedback','Reputação','Automação'], fit:['A clínica tem pacientes satisfeitos, mas poucas avaliações.','Pedidos são feitos de forma irregular.','Feedbacks chegam em canais diferentes e sem acompanhamento.'], guardrail:'Não fabrica avaliações, não condiciona atendimento e não bloqueia feedback negativo.', related:['reminders','audit','intelligence'], io:['Experiência concluída','Pedido de avaliação','Feedback registrado']
    },
    'procedure-guide': {
      code:'MOD / 12', category:'Operação', title:'Cevora Procedure Guide', subtitle:'Base de informações aprovadas sobre procedimentos, dúvidas frequentes e próximos passos.',
      meaning:'Procedure Guide organiza aquilo que a clínica pode explicar antes da avaliação. Ele oferece informações gerais e encaminha dúvidas específicas, sem transformar o site ou WhatsApp em consulta automática.',
      problem:'A mesma dúvida recebe respostas diferentes e informações importantes ficam dispersas.', outcome:'Equipe e canais consultam uma única base revisada pelo cirurgião.',
      implementation:'Conteúdo aprovado é estruturado em temas, perguntas, limites e pontos de encaminhamento para a equipe.',
      steps:[['Consulta','A pessoa procura uma informação geral ou faz uma pergunta frequente.'],['Resposta aprovada','O sistema apresenta apenas o conteúdo revisado e permitido.'],['Encaminhamento','Questões específicas seguem para avaliação humana.']],
      tags:['Base de conhecimento','FAQ','Busca','Encaminhamento'], fit:['A equipe responde dúvidas repetidas de formas diferentes.','Informações ficam perdidas em documentos e mensagens.','A clínica precisa educar sem diagnosticar por mensagem.'], guardrail:'Informa sem diagnosticar, recomendar procedimento ou prometer resultado médico.', related:['concierge','copilot','connect'], io:['Dúvida frequente','Informação aprovada','Avaliação humana']
    },
    proposal: {
      code:'MOD / 13', category:'Operação', title:'Cevora Proposal', subtitle:'Geração de propostas consistentes depois que o plano foi definido humanamente.',
      meaning:'Proposal transforma informações já aprovadas em um documento claro, padronizado e rastreável. Ele não cria o plano médico; apenas organiza a apresentação comercial e administrativa definida pela clínica.',
      problem:'Propostas levam tempo, variam de qualidade e podem sair com informações inconsistentes.', outcome:'A clínica gera documentos padronizados, revisáveis e registrados com mais velocidade.',
      implementation:'Templates, campos obrigatórios, identidade visual, aprovações e registro de envio são configurados.',
      steps:[['Definição humana','A equipe informa plano, inclusões, investimento e condições aprovadas.'],['Geração','O sistema monta a proposta no template correto.'],['Revisão e envio','A equipe confere, libera e acompanha o envio.']],
      tags:['Propostas','Templates','Documentos','Personalização'], fit:['A equipe monta propostas manualmente.','Cada documento usa uma linguagem ou layout diferente.','É difícil descobrir quando e para quem uma proposta foi enviada.'], guardrail:'Não cria indicação médica, não altera plano e não define investimento sem aprovação humana.', related:['finance','connect','followup'], io:['Plano aprovado','Documento padronizado','Envio registrado']
    },
    finance: {
      code:'MOD / 14', category:'Operação', title:'Cevora Billing Care', subtitle:'Cobranças e lembretes financeiros com linguagem respeitosa, pausa e histórico.',
      meaning:'Billing Care organiza avisos de sinal, parcelas e pendências. Ele envia o lembrete adequado, reconhece pagamento quando integrado e devolve exceções para uma pessoa responsável.',
      problem:'Pendências são esquecidas ou abordadas de maneira improvisada e constrangedora.', outcome:'O financeiro passa a ter cadência, registro e interrupção automática depois da regularização.',
      implementation:'Vencimentos, mensagens, canais, conciliação e regras de escalada são configurados conforme a política da clínica.',
      steps:[['Vencimento','O sistema identifica uma obrigação próxima ou pendente.'],['Lembrete','A mensagem aprovada é enviada no momento previsto.'],['Conciliação','Pagamento encerra a sequência; divergências seguem para o financeiro.']],
      tags:['Pagamentos','Lembretes','Conciliação','Financeiro'], fit:['Cobranças dependem de planilhas e memória.','Mensagens continuam mesmo depois do pagamento.','Não existe histórico claro de contato financeiro.'], guardrail:'Não realiza cobrança abusiva e respeita regras, consentimento e intervenção humana.', related:['proposal','reminders','connect'], io:['Vencimento','Lembrete respeitoso','Pagamento ou responsável']
    },
    partnerships: {
      code:'MOD / 15', category:'Operação B2B', title:'Cevora Partner Network', subtitle:'Pesquisa e acompanhamento de parcerias profissionais, fornecedores e fontes de indicação.',
      meaning:'Partner Network é uma operação B2B. Ele ajuda a clínica a mapear, registrar e acompanhar relacionamentos com profissionais e negócios complementares, sem prospectar pacientes de forma fria.',
      problem:'Parcerias dependem apenas da memória e disponibilidade do cirurgião.', outcome:'Relacionamentos B2B ganham lista, estágio, histórico e próximo passo.',
      implementation:'Perfis de parceiros, critérios de pesquisa, cadências, responsáveis e registro no CRM são definidos.',
      steps:[['Mapeamento','Possíveis parceiros são pesquisados e organizados por perfil.'],['Abordagem','A equipe utiliza mensagens e canais adequados ao relacionamento B2B.'],['Acompanhamento','Reuniões, respostas e próximos passos ficam registrados.']],
      tags:['Parcerias','B2B','Indicações','Follow-up'], fit:['A clínica quer estruturar relações com outros profissionais.','Contatos promissores se perdem depois da primeira conversa.','Não existe visão das parcerias ativas.'], guardrail:'Não realiza prospecção fria de pacientes e não cria indicações clínicas indevidas.', related:['multidesk','followup','intelligence'], io:['Parceiros potenciais','Acompanhamento B2B','Relação registrada']
    },
    intelligence: {
      code:'MOD / 16', category:'Dados & integrações', title:'Cevora Intelligence', subtitle:'Painel que mostra onde a jornada avança, trava ou desaparece.',
      meaning:'Intelligence reúne eventos que já acontecem nos canais da clínica e transforma isso em leitura operacional. Ele responde onde existem atrasos, abandono, falta de follow-up e motivos recorrentes de perda.',
      problem:'Decisões são tomadas por sensação e relatórios desconectados.', outcome:'A clínica passa a enxergar passagem, continuidade e perda por etapa, origem e procedimento.',
      implementation:'CRM, agenda, WhatsApp e eventos relevantes são conectados a um modelo comum de indicadores e motivos.',
      steps:[['Coleta','Eventos operacionais são capturados nas ferramentas autorizadas.'],['Organização','Dados são agrupados por etapa, origem, tempo e resultado.'],['Leitura','Painéis e alertas mostram onde investigar e agir.']],
      tags:['Dashboard','CRM','Gargalos','Motivos de perda'], fit:['A clínica não sabe por que pacientes somem.','Marketing e atendimento usam números diferentes.','O gestor descobre problemas apenas por reclamação.'], guardrail:'Métrica não substitui interpretação. O painel mostra comportamento, não causalidade automática.', related:['connect','audit','qualify'], io:['Eventos da jornada','Indicadores organizados','Prioridade de ação']
    },
    connect: {
      code:'MOD / 17', category:'Dados & integrações', title:'Cevora Connect', subtitle:'Integração entre WhatsApp, agenda, CRM, financeiro e outras ferramentas autorizadas.',
      meaning:'Connect é a ponte entre sistemas. Quando uma informação muda em uma ferramenta, ela pode atualizar a próxima etapa sem alguém copiar e colar dados entre telas.',
      problem:'Informação duplicada, divergente ou perdida entre várias ferramentas.', outcome:'Os sistemas compartilham contexto e a equipe trabalha com menos retrabalho e inconsistência.',
      implementation:'APIs, webhooks, autenticação, campos, regras de sincronização e monitoramento de falhas são configurados.',
      steps:[['Evento','Uma mudança acontece em um sistema, como novo agendamento ou pagamento.'],['Sincronização','A informação autorizada é transformada e enviada ao destino correto.'],['Monitoramento','Falhas, duplicidades e divergências geram registro ou alerta.']],
      tags:['API','Webhooks','CRM','Sincronização'], fit:['A equipe copia dados entre várias ferramentas.','Agenda e CRM mostram informações diferentes.','Automações falham porque não compartilham contexto.'], guardrail:'Integra apenas sistemas autorizados e respeita acessos, segurança e minimização de dados.', related:['intelligence','onboarding','audit'], io:['Evento em um sistema','Sincronização segura','Contexto compartilhado']
    },
    audit: {
      code:'MOD / 18', category:'Dados & integrações', title:'Cevora Service Audit', subtitle:'Auditoria de padrões operacionais nas conversas e etapas de atendimento.',
      meaning:'Service Audit procura sinais de quebra de processo, como demora, ausência de próximo passo, follow-up não realizado ou conversa sem responsável. Ele avalia o sistema de atendimento, não a competência médica.',
      problem:'Falhas repetidas só aparecem quando viram reclamação ou perda evidente.', outcome:'A gestão recebe alertas e padrões para corrigir o processo antes que o erro se repita.',
      implementation:'Eventos e critérios são definidos, conversas autorizadas são analisadas e relatórios indicam ocorrência, frequência e prioridade.',
      steps:[['Critério','A clínica define o que caracteriza uma falha operacional.'],['Detecção','O sistema identifica ocorrências nos eventos e conversas permitidos.'],['Correção','Alertas e relatórios orientam revisão de processo, script ou responsabilidade.']],
      tags:['Auditoria','Conversas','Alertas','Qualidade operacional'], fit:['A gestão não consegue revisar volume suficiente de conversas.','Erros de atendimento se repetem sem padrão visível.','O problema é descoberto tarde, por perda ou reclamação.'], guardrail:'Avalia processo e aderência, não competência médica, diagnóstico ou decisão clínica.', related:['multidesk','copilot','intelligence'], io:['Eventos operacionais','Detecção de padrão','Ação corretiva']
    }
  };

  const key = new URLSearchParams(window.location.search).get('modulo');
  const data = modules[key];
  const main = document.querySelector('#solutionDetail');
  const error = document.querySelector('#detailError');

  if (!data) {
    if (main) main.hidden = true;
    if (error) error.hidden = false;
    return;
  }

  const text = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  document.title = `${data.title} | Tecnologia Cevora`;
  text('#detailCode', data.code);
  text('#detailCategory', data.category);
  text('#detailTitle', data.title);
  text('#detailSubtitle', data.subtitle);
  text('#detailMeaning', data.meaning);
  text('#detailProblem', data.problem);
  text('#detailOutcome', data.outcome);
  text('#detailImplementation', data.implementation);
  text('#detailGuardrail', data.guardrail);
  text('#detailInput', data.io[0]);
  text('#detailProcess', data.io[1]);
  text('#detailOutput', data.io[2]);
  text('#detailStatus', `STATUS: ${data.category.toUpperCase()}`);

  const steps = document.querySelector('#detailSteps');
  if (steps) {
    steps.innerHTML = data.steps.map((step, index) => `
      <article class="detail-flow__step">
        <span>0${index + 1}</span>
        <small>${step[0]}</small>
        <h3>${step[0]}</h3>
        <p>${step[1]}</p>
      </article>
    `).join('');
  }

  const tags = document.querySelector('#detailTags');
  if (tags) tags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');

  const fit = document.querySelector('#detailFit');
  if (fit) fit.innerHTML = data.fit.map((item) => `<li>${item}</li>`).join('');

  const related = document.querySelector('#detailRelated');
  if (related) {
    related.innerHTML = data.related.map((relatedKey) => {
      const item = modules[relatedKey];
      return `<a class="detail-related__card" href="solucao.html?modulo=${encodeURIComponent(relatedKey)}">
        <small>${item.code} · ${item.category}</small>
        <strong>${item.title}</strong>
        <span>${item.subtitle}</span><i>↗</i>
      </a>`;
    }).join('');
  }

  const diagnosticUrl = `index.html?diagnostico=1&origem=detalhe-${encodeURIComponent(key)}`;
  ['#detailDiagnostic','#detailClosingCta'].forEach((selector) => {
    const link = document.querySelector(selector);
    if (link) link.href = diagnosticUrl;
  });
})();