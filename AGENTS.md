# AGENTS.md

Regras operacionais para agentes e assistentes de código em projetos **Next.js + Tailwind + shadcn**.

Trate este arquivo como instrução prática: arquitetura-alvo primeiro, mudanças pequenas e verificáveis. Em tarefas triviais, use julgamento; no restante, prefira cautela a velocidade.

Leia `CONTEXT.md` para o glossário de domínio do produto. Não misture linguagem de domínio com detalhes de implementação neste arquivo.

---

## Priorities

1. Preservar os limites arquiteturais do projeto.
2. Manter páginas, layouts e rotas o mais finos possível.
3. Manter regras de domínio dentro da `feature` correspondente.
4. Não editar arquivos em `src/shadcn/*`.
5. Preferir mudanças pequenas, claras e fáceis de revisar.
6. Seguir padrões existentes quando não conflitarem com este documento.
7. Evitar abstrações prematuras.

---

## Karpathy behavioral guidelines

### 1. Think before coding

- Não assuma. Se houver ambiguidade, apresente interpretações e pergunte.
- Declare premissas e trade-offs antes de implementar.
- Se existir abordagem mais simples, diga. Faça pushback quando o pedido conflitar com arquitetura, segurança ou estabilidade.
- Se algo estiver pouco claro, pare. Nomeie o que confunde. Pergunte.

### 2. Simplicity first

- Escreva o mínimo de código que resolve o pedido.
- Sem features especulativas, abstrações de uso único ou “flexibilidade” não solicitada.
- Sem tratamento de erro para cenários impossíveis.
- Se ficou grande sem necessidade, simplifique antes de finalizar.

### 3. Surgical changes

- Altere só o necessário. Sem refactors drive-by, formatação cosmética ou “melhorias” adjacentes.
- Preserve o estilo local.
- Remova apenas órfãos que *sua* mudança tornou não usados.
- Código morto não relacionado: mencione; não delete sem pedido.
- Toda linha alterada deve rastrear ao pedido do usuário.

### 4. Goal-driven execution

- Defina critério de sucesso verificável (“feito” = X passa / Y se comporta assim).
- Em tarefas multi-step, declare um plano curto e execute até o critério.
- Prefira validação focada no escopo alterado a comandos amplos desnecessários.

### Object calisthenics and DRY

- Nesting raso; extraia cedo quando um bloco faz um único trabalho.
- Uma responsabilidade por função/componente.
- Não duplique lógica que já vive em hooks, helpers ou models — reutilize.

---

## Project structure

Arquitetura-alvo (ajuste aliases no `tsconfig` do projeto):

```txt
src/
  app/        # rotas e composição Next.js (App Router)
  assets/     # estáticos no grafo do bundler (import / hash)
  core/       # técnico compartilhado (sem regra de produto)
  features/   # produto e domínio
  shadcn/     # base imutável do shadcn/ui
public/       # URL estável por path (sem fingerprint do bundler)
```

Código novo vai para `features`, `core`, `assets` ou `public/` conforme a matriz abaixo. Não criar pastas vazias por antecipação.

### O que é uma feature

Em apps de produto, **feature ≈ bounded context** (capacidade de domínio com regras próprias).

**Exceção documentada — landings / marketing:** feature ≈ **seção** da Landing (Hero, Target, Contents, …). Isso é válido aqui; não copie cegamente para produtos com domínio rico. Imports entre seções são esperados e permitidos com folga (abaixo).

---

## Folder responsibilities

### `src/app`

Camada de rotas e composição do Next.js App Router.

Use para: páginas, layouts, route handlers, `loading.tsx`, `error.tsx`, `not-found.tsx`, metadados.

Regras:

- arquivos finos; sem regra de negócio complexa;
- compor telas a partir de `features`;
- infra compartilhada em `core`;
- UI reutilizável sem domínio em `core/components`.

### `src/features`

Camada de produto e domínio. Cada domínio em:

```txt
src/features/<nome-da-feature>/
```

Pastas internas sob demanda (não criar vazias):

```txt
api/
components/
constants/
contexts/
dto/
enums/
hooks/
models/
server/
stores/
utils/
public.ts   # opcional: entrada estável quando outras features consomem esta
```

Regras:

- lógica da feature fica na feature;
- **feature → feature é permitido** (lax), especialmente em landings onde seções se compõem;
- prefira não criar grafos densos: se A depende de meia dúzia de internals de B, pare e simplifique;
- quando o consumo for intencional e recorrente, um `public.ts` fino ajuda a despluguar depois — **recomendação, não obrigação**;
- outras saídas: compor em `app`, extrair para `core` se for técnico sem domínio, ou duplicar temporariamente.

### Cross-feature (lax)

Não há allowlist de “shared surfaces”. Critério prático:

- import direto de outro `@features/...` ok;
- `public.ts` é conveniência para marcar uma API estável (`contact` usa isso hoje) — consumidores podem usar `public` ou o path interno;
- se o acoplamento doer na hora de mudar, aí sim estreite a superfície ou mova a composição para `app`.

### `src/core`

Camada técnica compartilhada (sem regra de produto).

```txt
src/core/
  api/
  components/   # wrappers / composições visuais reutilizáveis
  constants/
  hooks/
  lib/
  providers/
  server/
  utils/
```

Regras:

- `core` não importa `app` nem `features`;
- não mover código para `core` só porque “parece genérico”;
- wrappers de `shadcn` e UI sem domínio → `core/components`.

### `src/shadcn`

Base imutável do shadcn/ui.

```txt
Nunca editar arquivos em src/shadcn/*
```

Adaptação: (1) composição no uso → (2) wrapper em `core/components` → (3) componente novo nessa camada.

```ts
/**
 * Rationale: <necessidade do produto>, <limitação do shadcn>, <decisão>.
 */
```

### `src/assets` vs `public/`

Critério: **import / hashing no bundler** vs **URL estável por string**.

| | `src/assets` | `public/` |
|---|---|---|
| Uso | Arquivo entra no grafo via `import` (fingerprint, tipagem, otimização) | Servido em path fixo (`/img/...`); referência por string |
| Exemplos | CSS/tokens, JSON importado, SVG/imagem importados, fontes locais importadas | Fotos/ícones referenciados como `"/img/..."`, arquivos que precisam de URL estável |

```txt
src/assets/
  data/         # JSON / dados importados (podem apontar para paths em public/)
  styles/       # CSS global, tokens, variáveis
  fonts/        # só com import explícito (ex.: next/font/local)
  # imagens / SVG importados conforme necessário

public/
  img/          # mídia com URL estável (padrão atual da Landing)
  # favicon etc. na raiz quando não forem Metadata API em src/app
```

Regras:

- código novo: escolha pelo critério acima; **não migrar** o inventário atual de `public/img` só por estética;
- CSS / tokens → `src/assets/styles`;
- JSON / dados importados → `src/assets/data` (ok apontar para `/img/...` em `public/`);
- fontes: preferir `next/font` (ex.: Google) sem arquivo local; colocar arquivos em `src/assets/fonts` **somente** com import explícito (`next/font/local` ou import direto);
- SVG / imagem: URL estável → `public/`; import como módulo / `next/image` com import → `src/assets`;
- favicon, `opengraph-image`, `robots`, etc. → `src/app` (Metadata / App Router) ou raiz de `public/`; não misturar isso em `assets`.

---

## Dependency boundaries

```txt
app
 ├─ features
 ├─ core
 └─ assets

features
 ├─ core
 └─ features   # lax — ok entre seções; use julgamento

core
 └─ (shadcn + utilidades técnicas)

shadcn
 └─ (sem depender de app / features / core de domínio)
```

Obrigatório (duro):

- `core` não importa `app` / `features`;
- `shadcn` não importa `app` / `features` / `core`;
- Client Components não importam código server-only;
- não editar `src/shadcn/*`.

Orientação (lax): feature→feature ok; `public.ts` opcional.

Checagem mecânica só das regras duras: `npm run lint:boundaries`.

---

## File conventions

- TypeScript; `.ts` sem JSX, `.tsx` com JSX.
- `kebab-case` para arquivos e pastas.
- Named exports por padrão; default export só quando o framework exigir.
- Nomes descritivos; evitar abreviações ambíguas.

Exemplos:

```txt
user-profile-card.tsx
use-user-profile.ts
get-user-profile.ts
user-profile.dto.ts
```

---

## Feature organization

Exemplo:

```txt
src/features/user-profile/
  api/
  components/
  dto/
  hooks/
  models/
  server/
  utils/
```

| Pasta | Uso |
|---|---|
| `api` | Transporte de dados tipado; pouca regra de negócio |
| `components` | UI do domínio; não consumida por outras features |
| `hooks` | Queries, mutations, estado e cola da feature |
| `dto` | Contratos externos (preferência: Zod) |
| `models` | Tipos internos da aplicação |
| `server` | Server-only (actions, secrets, cookies, SDKs) |
| `stores` | Estado compartilhado da feature; só se props/contexto/cache não bastarem |
| `utils` | Helpers da feature; se virar genérico de verdade → `core` |

```txt
Nada em server pode ser importado diretamente por Client Components.
```

---

## Decision matrix

| Caso | Local |
|---|---|
| Página / layout / route handler | `src/app` |
| Favicon / OG image / `robots` (Metadata API) | `src/app` (ou raiz de `public/` se não for Metadata) |
| Componente visual genérico / wrapper shadcn | `src/core/components` |
| UI / hook / API / DTO / model da feature | `src/features/<feature>/…` |
| API pública opcional de uma feature | `src/features/<feature>/public.ts` |
| Código server-only da feature | `src/features/<feature>/server` |
| Cliente HTTP / adapter / provider global | `src/core/lib`, `src/core/api`, `src/core/providers` |
| Hook / util genuíno compartilhado | `src/core/hooks`, `src/core/utils` |
| Estilo global / tokens | `src/assets/styles` |
| JSON / dados importados | `src/assets/data` |
| Fonte local com import explícito | `src/assets/fonts` |
| Fonte via `next/font` sem arquivo local | (sem pasta — só config no layout) |
| Mídia / SVG com URL estável (`"/img/..."`) | `public/` |
| Mídia / SVG importados no bundler | `src/assets` |

---

## React / Next / Tailwind / shadcn

Quando a tarefa envolver UI React, data fetching ou performance, carregue e siga:

- `vercel-react-best-practices` — especialmente: sem componentes inline, derivar estado no render (sem espelhar em effect), ternários explícitos quando o valor pode ser `0`, evitar memo desnecessário.
- `vercel-composition-patterns` — preferir `children` / composição a proliferação de props booleanas.

Não copie os catálogos completos para este arquivo; abra as skills quando precisar.

### React

- Preferir Server Components por padrão; `'use client'` só com estado, efeitos ou APIs de browser.
- Uma responsabilidade por componente; composição em vez de props booleanas em cascata.
- Evitar lógica de domínio em componentes puramente visuais.
- Não adicionar `useMemo` / `useCallback` por reflexo (React Compiler quando aplicável).
- Reduzir waterfalls: `Promise.all` para independentes; await só onde necessário.

### Next.js (App Router)

- Páginas finas em `app`; domínio em `features`.
- Separar server/client com fronteira clara; não vazar secrets para o client.
- Preferir imports diretos a barrels grandes quando isso inflar bundle.
- Usar `next/dynamic` para UI pesada sob demanda.
- Route handlers / server actions: autenticar e validar input como qualquer endpoint.
- Middleware: só o essencial (auth gate, redirects); lógica de domínio fora.

### Tailwind

- Preferir utilitários do design system / tokens do projeto a valores mágicos.
- Estilos globais e variáveis CSS em `src/assets/styles`.
- Evitar CSS ad-hoc que duplique o que o Tailwind já cobre, salvo exceção documentada.

### shadcn

- Gerar/atualizar via CLI do shadcn no destino configurado (`components.json`).
- Não editar `src/shadcn/*` à mão para “ajustes de produto”.
- Customização: composição → wrapper → componente novo fora de `shadcn`.

### Secrets and env

- Não commitiar `.env` nem secrets.
- `NEXT_PUBLIC_*` nunca para segredos.
- Não logar secrets, tokens ou PII desnecessária.

---

## Development Workflow

- Trabalhe em fases pequenas e revisáveis.
- Encerre cada fase com um commit focado **somente quando o usuário pedir** execução com commits.
- Prefira a menor implementação correta antes de introduzir abstrações.
- Prefira padrões já existentes no projeto a stacks novas.
- Quando a feature tiver contrato de backend (API → client → UI), implemente nessa ordem: contrato, depois o hook, depois a UI.
- Aplique checagens de acesso / permissão na UI e no server quando a feature for protegida.
- Verifique o escopo afetado antes de commitiar e reporte validações bloqueadas por tooling existente.
- Não commitiar `.env` nem secrets.
- Toda mudança que altere comportamento, rota, ambiente ou operação entra na wiki no mesmo trabalho. Atualize a página que descreve aquilo; se não existir, crie e inclua em `wiki/index.md`. A wiki descreve o estado atual, nunca o anterior.
- Mudança que mereça histórico também ganha nota em `docs/` com data no frontmatter e prefixo `yyyymmdd`, listada no topo de `docs/index.md`.

### Commit messages

Formato obrigatório (igual ao histórico do repo):

```txt
(type): short summary in English, lowercase after the colon
```

Tipos em uso:

| Type | Quando |
|---|---|
| `feat` | Nova capacidade visível ou comportamento novo |
| `fix` | Correção de bug ou regressão |
| `chore` | Tooling, boundaries, deps, manutenção sem feature/fix |
| `docs` | Só documentação (`AGENTS`, `CONTEXT`, `README`, `wiki/`, `docs/`, ADRs) |

Regras:

- um espaço após `):`;
- summary em inglês, imperativo informal (`add`, `fix`, `document`), sem ponto final no subject;
- subject curto (≈72 chars); body opcional em inglês, separado por linha em branco, explicando o *why*;
- não usar Conventional Commits com `feat:` sem parênteses — o padrão daqui é `(feat): …`;
- escopo no tipo só se o histórico já usar (`(feat):`, não `(feat/hero):`).

Exemplos:

```txt
(feat): add People carousel and Formats timeline
(fix): restore Contents column strip crop on mobile
(chore): allow lax feature imports; keep hard layer checks
(docs): expand CONTEXT glossary for landing sections
```

---

## Matt Pocock skills

Fluxo multi-sessão (invocação sob demanda do usuário — não rode automaticamente em toda tarefa):

```txt
grill-me | grill-with-docs  →  to-spec  →  (implementação)  →  handoff
```

| Skill | Quando usar |
|---|---|
| `grill-me` | Estressar plano/decisão; entrevista até entendimento compartilhado. Não implementa. |
| `grill-with-docs` | Igual ao grill, e grava glossário (`CONTEXT.md`) / ADRs conforme o alinhamento. |
| `to-spec` | Depois do alinhamento: sintetiza a spec (PRD) a partir do que já foi decidido; **não** reentrevista. Requer a skill instalada e setup do issue tracker. |
| `handoff` | Compactar a sessão para outro agente; salvar fora do workspace; referenciar artefatos existentes em vez de duplicar. |

Notas:

- Se `/to-spec` não estiver disponível: orientar `npx skills add mattpocock/skills --skill=to-spec` e o setup do tracker (`/setup-matt-pocock-skills` quando aplicável).
- Para editar o glossário de domínio fora do grill: skill `domain-modeling`.
- ADRs em `docs/adr/` só quando a decisão for difícil de reverter, surpreendente sem contexto e fruto de trade-off real.

---

## Implementation rules

- Evite componentes grandes com muitas responsabilidades.
- Prefira composição e contratos explícitos entre módulos.
- Evite grafos densos entre features; `public.ts` ajuda quando quiser uma entrada estável.
- Evite modificar código gerado / base de bibliotecas (`shadcn`).
- Prefira código simples, legível e fácil de revisar.
- Comentários para racional, exceções e decisões não óbvias — não JSDoc mecânico.

---

## Exceptions

Evite exceções. Quando forem necessárias:

- documente o motivo;
- limite o escopo;
- prefira solução reversível;
- registre o racional no PR ou no código;
- não transforme a exceção em padrão.

Quando houver conflito entre conveniência imediata e arquitetura-alvo, priorize a arquitetura-alvo ou documente a exceção.

---

## Enforcement

Modo: **pragmático e preventivo**.

Em código novo:

- não violar limites duros entre camadas (`core` / `shadcn`);
- não importar server-only em Client Components;
- não editar `src/shadcn/*`;
- não mover para `core` sem necessidade real;
- não criar abstrações sem uso concreto;
- não criar estrutura de pastas vazia por antecipação.

Após mudanças que toquem imports de `core` ou `shadcn`: `npm run lint:boundaries`.

---

## Validation

Não execute lint, teste ou build amplos automaticamente sem necessidade.

Prefira o escopo alterado. Use os scripts definidos no `package.json` do projeto (ex.: `lint`, `lint:boundaries`, `build`, `test` quando existirem).

Se uma validação relevante não for feita, informe ao finalizar.

---

## Before implementing

- Onde este código deve viver na arquitetura-alvo?
- Pertence a uma `feature`, a `core`, a `assets` ou a `public/`?
- Há dependência proibida ou risco server→client?
- Preciso mesmo de uma nova abstração?
- Premissas e critério de sucesso estão claros?
- O glossário em `CONTEXT.md` cobre os termos em jogo?
- Se for mídia/fonte/dado estático: critério import/hash (`assets`) vs URL estável (`public/`)?

## Before finishing

- Página em `app` ficou fina?
- Domínio encapsulado em `features/<domínio>`?
- `core` / `assets` / `public/` usados corretamente?
- `src/shadcn/*` intocado?
- Feature→feature sem grafo denso desnecessário?
- Nenhum server-only vazou para Client Components?
- `npm run lint:boundaries` ok se imports de `core`/`shadcn` mudaram?
- Critério de sucesso verificado ou validação faltante mencionada?
- Wiki atualizada ou incrementada para o que mudou, com `wiki/index.md` em ordem?
- Diff cirúrgico (sem drive-by)?

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
