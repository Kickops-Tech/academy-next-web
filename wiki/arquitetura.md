# Arquitetura

```txt
src/
  app/        rotas, layouts e route handlers
  assets/     CSS, JSON, fontes e mídia importados pelo bundler
  core/       código técnico compartilhado, sem regra de produto
  features/   domínio. Em landing, uma feature é uma seção ou um contexto (checkout, contact, sebrae)
  shadcn/     base imutável do shadcn/ui
public/       arquivos servidos por URL estável
```

A página em `src/app` compõe a tela e fica fina. A regra e a UI do domínio ficam na feature. `core` não importa `app` nem `features`. `shadcn` não importa o resto do app. Feature pode importar outra feature. `npm run lint:boundaries` cobre só os limites duros de `core` e `shadcn`.

Código de servidor (segredo, cookie, chamada externa) fica em `server/` e não entra em Client Component. O formulário de contato e o webhook da Hotmart seguem isso: o route handler em `src/app/api` só recebe o pedido e delega.

Aliases: `@app/*`, `@assets/*`, `@core/*`, `@features/*`, `@shadcn/*`.

Próximo: [Rotas](rotas.md).
