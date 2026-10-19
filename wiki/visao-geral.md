# Visão geral

Landings públicas de marketing e conversão da Kickops Academy, o braço educacional da Kickops. O app é Next.js (App Router), React, TypeScript e Tailwind. A base de UI do shadcn fica em `src/shadcn` e não é editada à mão.

Há quatro superfícies:

- **Home** (`/`) — landing da imersão Introspecção: Inteligência Artificial. Seções Hero, Target, Contents, Formats e People, mais o rodapé.
- **Treinamentos** (`/treinamentos` e `/treinamentos/[slug]`) — catálogo e detalhe de um treinamento, públicos e sem usuário ou senha.
- **Sebrae** (`/sebrae`) — landing pública da oferta da Feira do Empreendedor, sem usuário ou senha e sem indexação.
- **Checkout** (`/checkout/...`) — páginas externas de obrigado da Hotmart. Públicas, para o comprador chegar depois do pagamento.

Há ainda duas páginas legais, públicas: política de privacidade e termos de uso.

Três endpoints:

- `POST /api/contact` — encaminha o formulário de contato para o mailer.
- `POST /api/trainings/interest` — grava o interesse de um detalhe de treinamento e enfileira o e-mail interno.
- `POST /api/hotmart/webhook` — recebe eventos de compra da Hotmart, grava o payload no Supabase da Academy e, nos eventos de compra, enfileira um e-mail ao comprador.

O contato da home sai por HTTP para `MAILER_CONTACT_URL` e não fica num banco. O interesse do detalhe fica em `academy_contact_training_interest`, no Supabase da Academy, e o e-mail segue para `MAILER_TRAINING_INTEREST_URL`. O webhook grava o JSON da Hotmart em `hotmart_purchase_webhooks`, no mesmo projeto. A fila que entrega o e-mail é de outro projeto, o do mailer. O log do servidor continua só com identificadores.

Próximo: [Arquitetura](arquitetura.md).
