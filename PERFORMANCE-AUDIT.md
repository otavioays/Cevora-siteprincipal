# Cevora Performance Audit — Baseline

Data: 2026-07-11
Escopo: página principal (`index.html`) e nova página de oferta (`oferta-gratis.html`).
Referência metodológica: *Web Performance in Action*, adaptada à arquitetura atual do projeto.

## Objetivo

Criar uma linha de base verificável antes de qualquer otimização. Esta primeira auditoria separa problemas confirmados no código de métricas que ainda dependem de execução no navegador.

## Baseline estrutural confirmada

### CSS

- `styles.css` importa 39 folhas adicionais por `@import`.
- O carregamento inclui arquivos de base, componentes, correções, estabilidade, materiais, movimento, responsividade e refinamentos.
- Há arquivos de correção posteriores à arquitetura original, como:
  - `styles-course-alignment-fix.css`
  - `styles-acquisition-alignment-fix.css`
  - `styles-scroll-stability.css`
  - `styles-ganesha-offer-refinement.css`
- A cadeia atual aumenta requisições, dificulta cache previsível e torna a ordem de precedência parte crítica do funcionamento visual.

**Risco:** alto.

### JavaScript

- `index.html` carrega GSAP externamente e depois `script.js`.
- `script.js` contém markup, animações, eventos, parallax, tilt, modais, contadores e carregadores de novas dobras em um único arquivo minificado.
- Novas partes da página são injetadas em tempo de execução, em vez de existirem no HTML inicial.
- Há animações infinitas de GSAP em elementos com `data-float`.
- Há listeners de `pointermove`, `scroll`, `pointerleave` e observadores usados por várias camadas.
- Alguns scripts carregam outros scripts, criando uma cadeia de inicialização difícil de visualizar e medir.

**Risco:** alto.

### Renderização inicial

- O HTML inicial contém apenas a primeira dobra; outras dobras dependem de JavaScript para serem inseridas.
- A página usa um loader visual antes de liberar a experiência.
- A primeira dobra depende de:
  - Google Fonts;
  - `styles.css` e sua cadeia de imports;
  - GSAP externo;
  - `script.js` para animações e montagem do restante da página.

**Risco:** alto para First Contentful Paint e Largest Contentful Paint em conexão lenta.

### Fontes

- São carregadas duas famílias externas pelo Google Fonts:
  - Cormorant Garamond: 400, 500 e 600;
  - Manrope: 400, 500, 600 e 700.
- Há `preconnect` para Google Fonts e Google Static, o que é positivo.
- Ainda não há evidência de preload seletivo, self-hosting, subset ou análise dos pesos efetivamente utilizados.

**Risco:** médio.

### Imagens

- A primeira dobra carrega `assets/pomegranate.webp` mais de uma vez.
- O CSS ainda contém uma ponte de compatibilidade que substitui imagens por `assets/pomegranate.svg` via `content`.
- Há mistura de WebP e SVG para mascotes e elementos visuais.
- Ainda não existe inventário de dimensões, tamanho em bytes, densidade, uso real e prioridade de cada imagem.

**Risco:** médio a alto.

### Animações e interação

- O projeto usa GSAP, Web Animations API, CSS transitions e atualizações de estilo em eventos de ponteiro.
- O parallax escreve `style.translate` em tempo real.
- Tilt e magnetic buttons escrevem `style.transform` em tempo real.
- Há animações infinitas para flutuação.
- Já ocorreram conflitos de rolagem e desalinhamento causados por múltiplos sistemas escrevendo nas mesmas propriedades.

**Risco:** alto para jank e regressões.

### Cache e versionamento

- O widget promocional usa query strings manuais para forçar versões.
- O projeto já apresentou situações em que alterações existiam no repositório, mas o navegador servia arquivos antigos.
- Não há pipeline de arquivos com hash de conteúdo.

**Risco:** alto para consistência de deploy.

## Gargalos prioritários

1. Cadeia de 39 `@import` no CSS.
2. Arquitetura JavaScript monolítica e carregamento encadeado de scripts.
3. Conteúdo principal abaixo da dobra dependente de injeção por JavaScript.
4. GSAP externo carregado antes do script principal sem `defer`.
5. Múltiplos sistemas de animação escrevendo em `transform` e `translate`.
6. Falta de inventário de imagens e fontes.
7. Ausência de pipeline de produção com minificação, hashes e relatório de peso.
8. Política de cache baseada em versões manuais.

## Métricas que devem ser coletadas no navegador

Estas métricas não devem ser inventadas. Precisam ser registradas em execução real:

- Total de requisições.
- Peso transferido e peso descomprimido.
- First Contentful Paint.
- Largest Contentful Paint.
- Cumulative Layout Shift.
- Interaction to Next Paint.
- Total Blocking Time.
- Time to First Byte.
- Tempo de `DOMContentLoaded` e `load`.
- Trabalho de scripting, rendering e painting.
- Frames acima de 16,7 ms durante rolagem e abertura de modal.
- Comparação desktop, mobile e conexão simulada lenta.

## Cenários de teste

### Página principal

1. Primeira visita sem cache.
2. Visita recorrente com cache.
3. Desktop 1440 × 900.
4. Notebook 1366 × 768.
5. Mobile 390 × 844.
6. CPU 4× slower.
7. Fast 3G e Slow 4G.
8. Rolagem rápida até o Prosperity Engine.
9. Subida e descida repetida entre Clínica Próspera e Acquisition OS.
10. Abertura e fechamento dos modais.
11. Interação com cards, parallax e CTA flutuante.

### Página de oferta

1. Navegação pelo CTA da página principal.
2. Primeira visita direta.
3. Mobile e desktop.
4. Com e sem cache.

## Orçamento provisório

Os valores serão ajustados após a coleta real:

- CSS crítico inicial: até 20 KB comprimidos.
- JavaScript inicial próprio: até 80 KB comprimidos.
- Imagem principal acima da dobra: até 120 KB.
- Total inicial acima da dobra: até 350 KB comprimidos.
- Nenhuma tarefa longa acima de 50 ms durante carregamento.
- Nenhuma animação estrutural contínua fora da viewport.
- CLS alvo: menor que 0,1.
- LCP alvo em mobile: menor que 2,5 s em condição razoável de rede.

## Próxima ação técnica

A próxima iteração deve consolidar e limpar o CSS sem alterar o design:

1. criar um inventário completo das folhas;
2. identificar duplicações e overrides;
3. remover regras sem uso;
4. incorporar arquivos de correção ao componente correto;
5. preparar um bundle único de produção;
6. preservar os arquivos fonte para manutenção.

## Regra de segurança

Nenhuma otimização será considerada concluída apenas porque o arquivo ficou menor. Cada alteração deverá preservar:

- aparência desktop e mobile;
- alinhamento das dobras;
- estabilidade ao subir e descer a página;
- abertura de modais;
- CTA da oferta;
- acessibilidade básica;
- suporte a `prefers-reduced-motion`.
