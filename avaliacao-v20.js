(() => {
  'use strict';

  const result = document.querySelector('#assessmentResult');
  const recommendations = result?.querySelector('.assessment-recommendations');
  const grid = document.querySelector('#recommendationGrid');
  const primaryCta = document.querySelector('#resultCta');
  let applying = false;

  const applyRecommendationHierarchy = () => {
    if (!result || result.hidden || !recommendations || !grid || applying) return;

    const title = document.querySelector('#resultTitle')?.textContent?.trim();
    const cards = [...grid.querySelectorAll('.assessment-recommendation')];
    if (!title || cards.length < 3) return;

    const alreadyApplied = result.dataset.recommendationHierarchy === title
      && cards.every((card) => card.dataset.recommendationRole);
    if (alreadyApplied) return;

    applying = true;

    const header = recommendations.querySelector('.assessment-recommendations__header');
    const headerLabel = header?.querySelector('span');
    const headerMeta = header?.querySelector('b');
    if (headerLabel) headerLabel.textContent = 'Prescrição tecnológica do diagnóstico';
    if (headerMeta) headerMeta.textContent = 'COMECE POR UMA';

    let prescription = recommendations.querySelector('.assessment-recommendations__prescription');
    if (!prescription) {
      prescription = document.createElement('div');
      prescription.className = 'assessment-recommendations__prescription';
      header?.insertAdjacentElement('afterend', prescription);
    }
    prescription.innerHTML = `
      <span>ORDEM DE IMPLANTAÇÃO</span>
      <div>
        <strong>Comece por uma única automação.</strong>
        <p>A primeira recomendação ataca diretamente o gargalo dominante. As outras duas são caminhos secundários e só devem ser consideradas depois de medir o efeito da solução principal.</p>
      </div>`;

    grid.classList.add('has-recommendation-hierarchy');

    cards.forEach((card, index) => {
      const isPrimary = index === 0;
      card.classList.toggle('is-primary-solution', isPrimary);
      card.classList.toggle('is-secondary-solution', !isPrimary);
      card.dataset.recommendationRole = isPrimary ? 'principal' : 'secundaria';

      const originalLabel = card.querySelector('div > small');
      if (originalLabel) {
        originalLabel.textContent = isPrimary
          ? 'SOLUÇÃO PRINCIPAL'
          : `SOLUÇÃO SECUNDÁRIA 0${index}`;
      }

      const priorityBadge = card.querySelector('.assessment-recommendation__priority');
      if (priorityBadge) priorityBadge.textContent = 'COMECE POR AQUI';

      let roleNote = card.querySelector('.assessment-recommendation__role-note');
      if (!roleNote) {
        roleNote = document.createElement('p');
        roleNote.className = 'assessment-recommendation__role-note';
        card.querySelector('div')?.appendChild(roleNote);
      }
      roleNote.textContent = isPrimary
        ? 'É a intervenção indicada para corrigir primeiro o gargalo identificado neste diagnóstico.'
        : 'Considere esta automação somente como uma segunda etapa, depois de corrigir e medir a solução principal.';

      const name = card.querySelector('strong')?.textContent?.trim() || 'automação recomendada';
      const link = card.querySelector('.assessment-recommendation__link');
      if (link) {
        link.setAttribute('aria-label', isPrimary
          ? `Conhecer a solução principal recomendada: ${name}`
          : `Conhecer a solução secundária: ${name}`);
      }
    });

    if (primaryCta) {
      primaryCta.dataset.recommendationRole = 'principal';
      primaryCta.setAttribute('aria-label', `Conhecer a solução principal recomendada: ${cards[0]?.querySelector('strong')?.textContent?.trim() || ''}`);
    }

    const catalogCta = result.querySelector('.assessment-result__catalog');
    const catalogLabel = catalogCta?.querySelector('span');
    if (catalogLabel) catalogLabel.textContent = 'Ver soluções secundárias';

    const reassurance = result.querySelector('.assessment-result__reassurance span');
    if (reassurance) {
      reassurance.textContent = 'As duas soluções secundárias não são uma recomendação de compra imediata. Elas mostram apenas quais camadas podem fazer sentido depois que o gargalo principal estiver corrigido.';
    }

    result.dataset.recommendationHierarchy = title;
    window.requestAnimationFrame(() => { applying = false; });
  };

  const observer = new MutationObserver(() => window.setTimeout(applyRecommendationHierarchy, 30));
  if (result) {
    observer.observe(result, {
      attributes: true,
      attributeFilter: ['hidden'],
      childList: true,
      subtree: true
    });
  }

  document.querySelector('#restartAssessment')?.addEventListener('click', () => {
    delete result?.dataset.recommendationHierarchy;
  });

  applyRecommendationHierarchy();
})();
