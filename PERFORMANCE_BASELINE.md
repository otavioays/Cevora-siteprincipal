# Cevora Performance Baseline

Data da auditoria: 11 de julho de 2026
Escopo: página principal (`index.html`) e página de oferta recém-criada.
Referência metodológica: *Web Performance in Action*, com adaptação para navegadores e práticas atuais.

## Objetivo

Registrar a arquitetura atual antes das otimizações, identificar os gargalos de maior probabilidade e definir uma ordem segura de intervenção. Esta etapa não altera o comportamento visual da página.

## O que foi verificado no código atual

### 1. Cadeia de CSS bloqueante

`index.html` carrega `styles.css` no `<head>`. Esse arquivo contém 39 declarações `@import`, portanto o navegador precisa descobrir e solicitar dezenas de folhas de estilo antes de terminar a composição visual da página.

Risco:
- atraso na primeira renderização;
- maior latência em conexões móveis;
- cascata difícil de prever;
- maior chance de estilos corretivos e `!important` disputarem entre si.

Prioridade: crítica.

### 2. CSS acumulado por camadas de correção

Existem arquivos separados para layouts, alinhamentos, estabilidade de scroll, materiais, cards, mascotes, mundos visuais, movimento, responsividade e refinamentos do CTA. A separação foi útil durante a construção, mas agora aumenta o custo de carregamento e favorece duplicação.

Arquivos de correção explícita encontrados:
- `styles-course-alignment-fix.css`;
- `styles-acquisition-alignment-fix.css`;
- `styles-scroll-stability.css`;
- `styles-ganesha-offer-refinement.css`.

Prioridade: alta.

### 3. JavaScript principal com responsabilidades demais

`script.js` está minificado, mas concentra:
- injeção de seções inteiras;
- animações GSAP;
- parallax por ponteiro;
- tilt de cards;
- efeito magnético em botões;
- modais;
- menu mobile;
- chat simulado;
- contadores;
- observação de scroll;
- carregamento de outras áreas da página.

Isso reduz bytes de texto, mas não reduz o trabalho de execução. O navegador ainda precisa interpretar, montar o DOM e registrar todos os listeners.

Prioridade: crítica.

### 4. GSAP externo bloqueando a sequência de scripts

A página carrega GSAP por CDN antes de `script.js`, sem `defer`. O parser do HTML pode ser interrompido enquanto o recurso externo é resolvido e executado.

Risco adicional: dependência de disponibilidade e latência do CDN.

Prioridade: alta.

### 5. Animações permanentes e trabalho por interação

O código atual mantém animações infinitas em elementos com `data-float`. Também registra `pointermove` para parallax, tilt e botões magnéticos.

Mesmo usando `requestAnimationFrame` em parte do parallax, há várias leituras de `getBoundingClientRect()` e escritas de estilo durante interações. Em máquinas mais fracas isso pode aumentar scripting, rendering e painting.

Prioridade: alta.

### 6. Risco de conflito entre `transform`, `translate` e GSAP

O histórico recente já mostrou desalinhamentos ao rolar para fora e voltar às seções. O código ainda combina:
- GSAP alterando posição;
- CSS transitions;
- `style.transform`;
- `style.translate`;
- Web Animations API.

A camada de estabilidade reduz sintomas, mas a arquitetura continua custosa e frágil.

Prioridade: crítica para fluidez, média para carregamento inicial.

### 7. Hero sem prioridade explícita de imagem

A imagem principal da romã aparece imediatamente, mas não possui:
- dimensões HTML explícitas;
- `fetchpriority="high"`;
- preload;
- estratégia responsiva por resolução.

A mesma imagem também é repetida no avatar do card.

Risco:
- atraso do elemento visual principal;
- possível layout shift durante a decodificação;
- bytes repetidos no DOM, ainda que o recurso seja reutilizado pelo cache.

Prioridade: alta.

### 8. Fontes externas com sete variantes

A página solicita:
- Cormorant Garamond 400, 500 e 600;
- Manrope 400, 500, 600 e 700.

Há `preconnect`, o que ajuda, mas sete variantes aumentam o custo da primeira visita. Ainda não há comprovação de que todos os pesos sejam indispensáveis.

Prioridade: média-alta.

### 9. Canvas ambiente e efeitos de pintura

A primeira dobra contém um canvas ambiente, ruído, grade, halos, órbitas, glows, backdrop filters e sombras extensas. Esses elementos sustentam o design system, mas precisam ser medidos porque podem aumentar custo de pintura e composição.

Prioridade: média, com atenção especial ao mobile.

### 10. Loader atrasa deliberadamente a percepção de conclusão

Após o evento `load`, o loader espera aproximadamente 450 ms para começar a sair e só é removido depois. Mesmo que a página já esteja utilizável, o usuário pode continuar vendo uma tela de carregamento.

Prioridade: alta para velocidade percebida.

### 11. Seções injetadas após a carga inicial

Várias dobras são inseridas por JavaScript e outros scripts são carregados em cadeia. Isso reduz o HTML inicial, mas aumenta complexidade, trabalho de DOM e risco de condições de corrida.

Prioridade: alta.

### 12. CTA flutuante com carregamento tardio em cadeia

O CTA gratuito depende de scripts carregados por outro script da seção Clínica Próspera e de CSS de refinamento versionado por query string. Esse padrão já causou cache antigo e ausência visual.

Prioridade: média para performance, alta para confiabilidade.

## Hipótese inicial de gargalos

Ordem provável de impacto:

1. 39 `@import` bloqueantes;
2. arquitetura de JavaScript e montagem dinâmica;
3. GSAP externo sem `defer`;
4. imagens e mascotes sem estratégia responsiva consistente;
5. animações e efeitos permanentes;
6. fontes externas e variantes excessivas;
7. loader artificial;
8. CSS duplicado e corretivo.

## Matriz de medição para a auditoria prática

Os testes devem ser executados sempre com cache desativado e repetidos ao menos três vezes.

### Páginas
- `/Cevora-siteprincipal/`
- `/Cevora-siteprincipal/oferta-gratis.html`

### Perfis
- desktop, viewport aproximada de 1440 × 900;
- notebook, viewport aproximada de 1366 × 768;
- mobile médio, viewport aproximada de 390 × 844;
- mobile com CPU reduzida e rede móvel simulada.

### Cenários
- primeira visita sem cache;
- visita recorrente com cache;
- rolagem completa para baixo e para cima;
- abertura e fechamento dos modais;
- interação com CTA flutuante;
- entrada e saída repetida das seções animadas.

### Métricas a registrar
- número total de requisições;
- bytes transferidos;
- peso de CSS, JS, fontes e imagens;
- TTFB;
- FCP;
- LCP;
- CLS;
- INP;
- tempo total bloqueado;
- tarefas longas no main thread;
- frames perdidos durante scroll;
- custo de scripting, rendering e painting;
- recursos bloqueantes;
- elementos responsáveis pelo LCP e CLS.

## Orçamento provisório

Estes valores serão confirmados depois da medição real:

- CSS crítico inicial: até 25 KB comprimidos;
- JavaScript necessário para a primeira dobra: até 70 KB comprimidos;
- imagem responsável pelo LCP: até 120 KB;
- fontes usadas antes da dobra: no máximo duas variantes essenciais;
- CLS: abaixo de 0,1;
- nenhuma tarefa contínua de animação fora da viewport;
- nenhuma animação estrutural disputando `transform` e `translate` no mesmo elemento.

## Próxima ação

A próxima iteração deve consolidar o CSS de produção e eliminar a cadeia de `@import`, preservando os arquivos atuais como fontes editáveis. Essa mudança tem o melhor equilíbrio entre impacto potencial e risco visual controlável.

## Limitação desta linha de base

Este documento registra achados verificáveis na arquitetura do repositório. As métricas numéricas de Lighthouse, waterfall e CPU ainda precisam ser capturadas em um navegador com perfil controlado. Nenhuma pontuação foi inventada ou estimada como se fosse uma medição real.
