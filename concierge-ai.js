(() => {
  'use strict';

  if (window.__cevoraConciergeAiLoaded) return;
  window.__cevoraConciergeAiLoaded = true;

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const normalize = (text) => text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const answerFor = (question, state = {}) => {
    const text = normalize(question);
    const name = state.name ? `, ${state.name}` : '';

    if (/abdominoplast|flacidez|diastase|barriga/.test(text)) {
      state.topic = 'abdominoplastia';
      return `Entendi${name}. A abdominoplastia pode ser considerada quando existe excesso de pele, flacidez ou afastamento da musculatura abdominal. A indicação correta depende da avaliação do cirurgião. Essa mudança ficou mais concentrada abaixo do umbigo ou aparece em todo o abdômen?`;
    }

    if (/rinoplast|nariz|respirar|desvio/.test(text)) {
      state.topic = 'rinoplastia';
      return `Consigo te orientar${name}. Na rinoplastia, a equipe avalia tanto o objetivo estético quanto questões funcionais, como dificuldade para respirar. O que mais te incomoda hoje: o formato, o perfil ou a respiração?`;
    }

    if (/protese|mama|seio|silicone/.test(text)) {
      state.topic = 'protese mamaria';
      return `Entendi${name}. A escolha da prótese não depende apenas do volume desejado. A equipe considera proporção corporal, tecido disponível, formato e resultado esperado. Você busca mais volume, correção de assimetria ou recuperação após gestação?`;
    }

    if (/recuper|pos.?operator|voltar.*trabalho|dor|cicatriz/.test(text)) {
      return `A recuperação varia conforme o procedimento e o plano definido pelo cirurgião. Eu posso te passar as orientações gerais da clínica e registrar sua rotina para a equipe considerar na avaliação. Qual procedimento você está pesquisando e em quanto tempo precisaria voltar às atividades?`;
    }

    if (/preco|valor|quanto|investimento|custa/.test(text)) {
      return `Os valores dependem do procedimento, da complexidade e do plano indicado após avaliação. Para não te passar uma estimativa genérica, posso organizar uma conversa com a equipe e já encaminhar o procedimento de interesse. Qual cirurgia você está considerando?`;
    }

    if (/agenda|avaliacao|consulta|horario|marcar/.test(text)) {
      return `Perfeito${name}. Posso encaminhar sua solicitação para a agenda da clínica e manter o contexto desta conversa para a equipe. Você prefere atendimento pela manhã, à tarde ou no início da noite?`;
    }

    if (/abaixo do umbigo/.test(text) && state.topic === 'abdominoplastia') {
      return `Obrigada pelo contexto. A flacidez abaixo do umbigo é uma das situações avaliadas com frequência, mas somente o cirurgião pode confirmar a indicação. Posso encaminhar essa informação e verificar uma avaliação para você sem precisar repetir tudo novamente.`;
    }

    if (/meu nome e|sou a|sou o/.test(text)) {
      const match = question.match(/(?:meu nome [ée]|sou a|sou o)\s+([A-Za-zÀ-ÿ]+)/i);
      if (match) state.name = match[1];
      return `Prazer, ${state.name || 'obrigada por me contar'}. Pode escrever sua dúvida do seu jeito. Eu mantenho o contexto da conversa e uso as informações da clínica para te orientar até o próximo passo.`;
    }

    return `Entendi sua pergunta${name}. Vou considerar o contexto que você trouxe e responder com base nas informações configuradas pela clínica. Para te orientar com mais precisão, você está pesquisando um procedimento específico, recuperação, valores ou disponibilidade para avaliação?`;
  };

  const typingMarkup = '<span class="concierge-typing" aria-label="Digitando"><i></i><i></i><i></i></span>';

  const makeMessage = (role, text) => {
    const message = document.createElement('div');
    message.className = `concierge-message concierge-message--${role}`;
    message.textContent = text;
    return message;
  };

  const runConversation = ({ input, messages, send, state, compact = false }) => {
    const submit = () => {
      const question = input.value.trim();
      if (!question || send.disabled) return;

      messages.appendChild(makeMessage('patient', question));
      input.value = '';
      send.disabled = true;

      const typing = document.createElement('div');
      typing.className = 'concierge-message concierge-message--bot concierge-message--typing';
      typing.innerHTML = typingMarkup;
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;

      window.setTimeout(() => {
        typing.remove();
        messages.appendChild(makeMessage('bot', answerFor(question, state)));
        messages.scrollTop = messages.scrollHeight;
        send.disabled = false;
        if (!compact) input.focus();
      }, compact ? 650 : 900);
    };

    send.addEventListener('click', submit);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submit();
      }
    });

    return submit;
  };

  const updateHeroCopy = () => {
    const hero = qs('#produto');
    if (!hero) return;

    const copy = qs('.hero__copy', hero);
    const support = qs('.hero__support', hero);
    if (copy) copy.textContent = 'Uma IA implementada diretamente no WhatsApp da clínica, que entende perguntas livres, responde com contexto e conduz cada paciente ao próximo passo.';
    if (support) support.innerHTML = '<span></span>Sem aplicativo adicional. O paciente conversa normalmente no WhatsApp, usando as próprias palavras.';

    const primaryLabel = qs('.hero__actions .button--primary span:nth-of-type(2)', hero);
    if (primaryLabel) primaryLabel.textContent = 'Quero implementar no WhatsApp';

    const benefits = qs('.benefits', hero);
    if (benefits) {
      benefits.innerHTML = `
        <div class="benefit-card" data-tilt><span class="benefit-card__icon concierge-benefit-icon">✦</span><span>Entende perguntas livres</span></div>
        <div class="benefit-card" data-tilt><span class="benefit-card__icon concierge-benefit-icon">◎</span><span>Responde com contexto</span></div>
        <div class="benefit-card" data-tilt><span class="benefit-card__icon concierge-benefit-icon">◉</span><span>Funciona no WhatsApp</span></div>
        <div class="benefit-card" data-tilt><span class="benefit-card__icon concierge-benefit-icon">↗</span><span>Encaminha o próximo passo</span></div>`;
    }

    if (!qs('.whatsapp-implementation', hero)) {
      const price = qs('[data-price-card="concierge"]', hero);
      const badge = document.createElement('div');
      badge.className = 'whatsapp-implementation';
      badge.innerHTML = '<span class="whatsapp-implementation__icon" aria-hidden="true">◔</span><div><strong>Implementação direta no WhatsApp</strong><small>Sem mudar o hábito do paciente.</small></div>';
      if (price) price.insertAdjacentElement('beforebegin', badge);
      else support?.insertAdjacentElement('afterend', badge);
    }
  };

  const upgradeHeroChat = () => {
    const oldCard = qs('#produto .chat-card');
    if (!oldCard) return;

    const card = oldCard.cloneNode(false);
    card.className = oldCard.className;
    card.dataset.depth = oldCard.dataset.depth || '0.14';
    card.dataset.float = oldCard.dataset.float || '1';
    card.innerHTML = `
      <header class="floating-card__header concierge-card__header">
        <span class="whatsapp-dot" aria-hidden="true">◔</span>
        <div><strong>WhatsApp da clínica</strong><small>Concierge online agora</small></div>
        <span class="concierge-online" aria-label="Online"></span>
      </header>
      <div class="concierge-card__messages" aria-live="polite">
        <div class="concierge-message concierge-message--bot">Olá! Pode escrever sua dúvida do seu jeito. Eu entendo o contexto e te ajudo com o próximo passo.</div>
      </div>
      <div class="concierge-card__suggestions"><span>Experimente:</span><button type="button">Tenho flacidez depois da gravidez. A abdominoplastia pode ajudar?</button></div>
      <div class="concierge-composer concierge-composer--compact">
        <input type="text" aria-label="Pergunte livremente ao Concierge" placeholder="Digite qualquer pergunta..." />
        <button type="button" aria-label="Enviar pergunta">➤</button>
      </div>
      <small class="concierge-freeform-note">Pergunta livre • resposta personalizada • encaminhamento inteligente</small>`;

    oldCard.replaceWith(card);

    const messages = qs('.concierge-card__messages', card);
    const input = qs('input', card);
    const send = qs('.concierge-composer button', card);
    const state = {};
    const submit = runConversation({ input, messages, send, state, compact: true });
    qs('.concierge-card__suggestions button', card)?.addEventListener('click', (event) => {
      input.value = event.currentTarget.textContent;
      submit();
    });
  };

  const upgradeDemoModal = () => {
    const modal = qs('#demoModal');
    if (!modal) return;

    const panel = qs('.modal__panel', modal);
    if (!panel) return;
    panel.classList.add('concierge-demo-modal');

    const eyebrow = qs('.modal__eyebrow', panel);
    const title = qs('#demoTitle', panel);
    const intro = title?.nextElementSibling;
    if (eyebrow) eyebrow.textContent = 'Demonstração no WhatsApp';
    if (title) title.textContent = 'Pergunte com as suas próprias palavras.';
    if (intro) intro.textContent = 'A demonstração simula uma conversa livre: o Concierge interpreta a intenção, mantém o contexto e conduz o paciente para a resposta ou o próximo passo adequado.';

    const oldShell = qs('.demo-shell', panel);
    if (!oldShell) return;

    const shell = document.createElement('div');
    shell.className = 'concierge-whatsapp-demo';
    shell.innerHTML = `
      <div class="concierge-whatsapp-demo__bar">
        <span class="whatsapp-demo-avatar">C</span>
        <div><strong>Clínica • Cevora Concierge</strong><small>online • atendimento pelo WhatsApp</small></div>
        <span class="whatsapp-demo-lock">⌁</span>
      </div>
      <div class="concierge-demo-messages" aria-live="polite">
        <div class="concierge-message concierge-message--bot">Olá! Pode perguntar sobre procedimentos, recuperação, atendimento ou disponibilidade. Escreva normalmente, sem escolher um menu.</div>
      </div>
      <div class="concierge-demo-suggestions">
        <span>Ou experimente uma sugestão</span>
        <button type="button">Tenho 38 anos e flacidez depois de duas gestações.</button>
        <button type="button">Quanto tempo demora para voltar ao trabalho?</button>
        <button type="button">Quero marcar uma avaliação de rinoplastia.</button>
      </div>
      <div class="concierge-composer">
        <input type="text" aria-label="Digite qualquer pergunta" placeholder="Pergunte qualquer coisa sobre procedimentos, recuperação ou atendimento..." />
        <button type="button" aria-label="Enviar pergunta">Enviar <i>➤</i></button>
      </div>
      <div class="concierge-demo-proof"><i aria-hidden="true"></i><span>O paciente escreve livremente. A IA entende, responde com contexto e encaminha para o próximo passo.</span></div>`;

    oldShell.replaceWith(shell);

    const messages = qs('.concierge-demo-messages', shell);
    const input = qs('.concierge-composer input', shell);
    const send = qs('.concierge-composer button', shell);
    const state = {};
    const submit = runConversation({ input, messages, send, state });

    qsa('.concierge-demo-suggestions button', shell).forEach((button) => {
      button.addEventListener('click', () => {
        input.value = button.textContent;
        submit();
      });
    });
  };

  const boot = () => {
    updateHeroCopy();
    upgradeHeroChat();
    upgradeDemoModal();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
