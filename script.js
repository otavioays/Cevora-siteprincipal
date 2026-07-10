(() => {
  'use strict';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const loader = qs('#loader');
  const header = qs('.site-header');

  window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
    header?.classList.add('is-ready');

    if (loader) {
      window.setTimeout(() => loader.classList.add('is-hidden'), 450);
      window.setTimeout(() => loader.remove(), 1250);
    }

    if (!reduceMotion && window.gsap) {
      const gsap = window.gsap;
      gsap.from('.product-art', {
        opacity: 0,
        scale: 0.82,
        y: 40,
        duration: 1.5,
        delay: 0.45,
        ease: 'power4.out'
      });
      gsap.from('.face-outline path, .face-outline circle', {
        opacity: 0,
        stagger: 0.055,
        duration: 0.7,
        delay: 0.75,
        ease: 'power2.out'
      });
      gsap.from('.floating-card', {
        opacity: 0,
        x: 45,
        stagger: 0.14,
        duration: 1,
        delay: 0.75,
        ease: 'power3.out'
      });
      gsap.to('.score-ring__value', {
        strokeDashoffset: 20.1,
        duration: 1.8,
        delay: 1.25,
        ease: 'power3.out'
      });
      gsap.to('.journey-chart__line', {
        strokeDashoffset: 0,
        duration: 1.8,
        delay: 1.35,
        ease: 'power2.inOut'
      });
      gsap.to('.journey-chart__points circle', {
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        delay: 1.55
      });
      const scoreCounter = { value: 0 };
      gsap.to(scoreCounter, {
        value: 92,
        duration: 1.55,
        delay: 1.25,
        ease: 'power3.out',
        onUpdate() {
          const target = qs('[data-count="92"]');
          if (target) target.textContent = `${Math.round(scoreCounter.value)}%`;
        }
      });

      qsa('[data-float]').forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -8 : 7,
          duration: 3.2 + index * 0.35,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      });
    } else {
      const score = qs('[data-count="92"]');
      if (score) score.textContent = '92%';
      const ring = qs('.score-ring__value');
      if (ring) ring.style.strokeDashoffset = '20.1';
      const chart = qs('.journey-chart__line');
      if (chart) chart.style.strokeDashoffset = '0';
      qsa('.journey-chart__points circle').forEach((circle) => circle.style.opacity = '1');
    }
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
  }, { passive: true });

  const menuButton = qs('#menuButton');
  const mobileMenu = qs('#mobileMenu');
  const setMenu = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    mobileMenu?.classList.toggle('is-open', open);
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  qsa('a, button', mobileMenu).forEach((item) => item.addEventListener('click', () => setMenu(false)));

  const visual = qs('.hero__visual');
  if (visual && !reduceMotion) {
    let raf = 0;
    visual.addEventListener('pointermove', (event) => {
      const rect = visual.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        qsa('.parallax-layer', visual).forEach((layer) => {
          const depth = Number(layer.dataset.depth || 0.05);
          layer.style.setProperty('--px', `${x * depth * 110}px`);
          layer.style.setProperty('--py', `${y * depth * 70}px`);
          layer.style.translate = `var(--px) var(--py)`;
        });
      });
    });
    visual.addEventListener('pointerleave', () => {
      qsa('.parallax-layer', visual).forEach((layer) => {
        layer.animate([{ translate: getComputedStyle(layer).translate }, { translate: '0px 0px' }], {
          duration: 650,
          easing: 'cubic-bezier(.16,1,.3,1)',
          fill: 'forwards'
        });
      });
    });
  }

  qsa('[data-tilt]').forEach((card) => {
    if (reduceMotion) return;
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });

  qsa('.magnetic').forEach((button) => {
    if (reduceMotion) return;
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) translateY(-3px)`;
    });
    button.addEventListener('pointerleave', () => button.style.transform = '');
  });

  const chatMessage = qs('#chatMessage');
  const chatResponses = {
    'Quero agendar uma avaliação': ['Perfeito. Vou verificar a melhor disponibilidade para você.', 'Qual período costuma ser mais conveniente?'],
    'Tenho dúvidas sobre procedimentos': ['Claro. Posso orientar sobre o processo e preparar sua conversa com a equipe.', 'Qual procedimento você está considerando?'],
    'Quero saber valores': ['Os investimentos variam de acordo com o plano indicado em avaliação.', 'Posso organizar seu atendimento inicial agora.']
  };
  qsa('[data-chat]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!chatMessage) return;
      const response = chatResponses[button.dataset.chat];
      chatMessage.innerHTML = '<span class="typing-inline"><i></i><i></i><i></i></span><small>agora</small>';
      setTimeout(() => {
        chatMessage.innerHTML = `<span>${response[0]}</span><span>${response[1]}</span><small>agora ✓✓</small>`;
      }, 850);
    });
  });

  const demoModal = qs('#demoModal');
  const contactModal = qs('#contactModal');
  const modalByName = { demo: demoModal, contact: contactModal };
  const openModal = (name) => {
    const modal = modalByName[name];
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => qs('button, input', modal)?.focus(), 80);
  };
  const closeModal = (name) => {
    const modal = modalByName[name];
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  qsa('[data-open]').forEach((button) => button.addEventListener('click', () => openModal(button.dataset.open)));
  qsa('[data-close]').forEach((button) => button.addEventListener('click', () => closeModal(button.dataset.close)));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    Object.entries(modalByName).forEach(([name, modal]) => {
      if (modal?.classList.contains('is-open')) closeModal(name);
    });
  });

  const demoMessages = qs('#demoMessages');
  const demoAnswers = {
    agendamento: {
      user: 'Quero agendar uma avaliação.',
      bot: 'Perfeito. Vou confirmar procedimento de interesse, cidade e disponibilidade para encaminhar o melhor horário.'
    },
    procedimento: {
      user: 'Tenho dúvidas sobre um procedimento.',
      bot: 'Posso organizar suas principais dúvidas e deixar a equipe preparada para uma orientação personalizada.'
    },
    valor: {
      user: 'Quero entender os valores.',
      bot: 'O investimento depende da avaliação individual. Posso conduzir seu atendimento inicial e verificar disponibilidade.'
    }
  };
  qsa('[data-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!demoMessages) return;
      const item = demoAnswers[button.dataset.demo];
      const user = document.createElement('div');
      user.className = 'demo-message demo-message--user';
      user.textContent = item.user;
      demoMessages.append(user);
      const typing = document.createElement('div');
      typing.className = 'demo-message demo-message--bot demo-typing';
      typing.innerHTML = '<i></i><i></i><i></i>';
      demoMessages.append(typing);
      demoMessages.scrollTop = demoMessages.scrollHeight;
      setTimeout(() => {
        typing.remove();
        const bot = document.createElement('div');
        bot.className = 'demo-message demo-message--bot';
        bot.textContent = item.bot;
        demoMessages.append(bot);
        demoMessages.scrollTop = demoMessages.scrollHeight;
      }, 720);
    });
  });

  const leadForm = qs('#leadForm');
  const formSuccess = qs('#formSuccess');
  leadForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const submit = qs('button[type="submit"]', leadForm);
    if (submit) {
      submit.disabled = true;
      submit.querySelector('span').textContent = 'Enviando...';
    }
    setTimeout(() => {
      leadForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'grid';
    }, 850);
  });

  const canvas = qs('#ambientCanvas');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;
    const particles = [];
    const count = Math.min(46, Math.max(22, Math.floor(window.innerWidth / 36)));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) {
        for (let i = 0; i < count; i += 1) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.2 + 0.25,
            vx: (Math.random() - 0.5) * 0.08,
            vy: -(Math.random() * 0.12 + 0.025),
            alpha: Math.random() * 0.35 + 0.05,
            gold: Math.random() > 0.22
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(216,173,95,${p.alpha})` : `rgba(151,27,42,${p.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    draw();
  }
})();
