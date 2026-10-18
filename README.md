# Kickops Academy Landings

Landings públicas de marketing e conversão da Kickops Academy, braço educacional da Kickops. Hoje o foco é landing; o projeto pode evoluir para o site da Kickops Academy.

## Stack

- Next.js (App Router) + React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Pré-requisitos

- Node.js (compatível com Next.js 16)
- npm (o repositório usa `package-lock.json`)

## Setup

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Acesso temporário

As rotas `/treinamentos` e `/treinamentos/*` usam autenticação
HTTP Basic temporária. Configure no ambiente local e na Vercel:

```bash
PRIVATE_ACCESS_USERNAME=kickops
PRIVATE_ACCESS_PASSWORD=<senha-compartilhada>
PRIVATE_ACCESS_SECRET=<segredo-aleatorio>
```

Gere o segredo com `openssl rand -hex 32`. Após o primeiro acesso válido, um
cookie seguro mantém o navegador autorizado por 30 dias. Sem senha ou segredo
configurados, as rotas protegidas respondem com `503` e não ficam públicas.

A landing `/sebrae` é pública e não exige usuário, senha ou cookie de acesso.

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint com correção automática |
| `npm run lint:boundaries` | Limites duros de camada (`core` / `shadcn`) |

## Estrutura

```txt
src/
  app/        # rotas e composição (App Router)
  assets/     # import / hash (CSS, JSON, fontes locais, mídia importada)
  core/       # técnico compartilhado (sem regra de produto)
  features/   # produto e domínio (em landings: seções; feature→feature lax)
  shadcn/     # base imutável do shadcn/ui
public/       # URL estável (/img/..., etc.)
```

Aliases TypeScript: `@app/*`, `@assets/*`, `@core/*`, `@features/*`, `@shadcn/*`.

Regras de ouro:

- páginas e layouts em `app` ficam finos;
- domínio vive em `features`;
- feature→feature permitido (lax); `public.ts` opcional para API estável;
- `assets` = import/hash; `public/` = URL estável (sem migrar `public/img` existente por estética);
- fontes: `next/font` sem arquivo local; `src/assets/fonts` só com import explícito;
- não editar `src/shadcn/*` (wrappers em `core/components`).

## Documentação

- [AGENTS.md](AGENTS.md) — arquitetura, workflow e convenção de commits para agentes
- [CONTEXT.md](CONTEXT.md) — glossário de domínio
- `npm run lint:boundaries` — checagem das regras duras de camada

### Mensagens de commit

```txt
(type): short summary in English, lowercase after the colon
```

Tipos: `(feat)`, `(fix)`, `(chore)`, `(docs)`. Detalhes em [AGENTS.md](AGENTS.md) → Commit messages.
