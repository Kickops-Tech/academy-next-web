# Visão geral

Landings públicas de marketing e conversão da Kickops Academy, o braço educacional da Kickops. O app é Next.js (App Router), React, TypeScript e Tailwind. A base de UI do shadcn fica em `src/shadcn` e não é editada à mão.

Há quatro superfícies:

- **Home** (`/`) — landing da imersão Introspecção: Inteligência Artificial. Seções Hero, Target, Contents, Formats e People, mais o rodapé.
- **Treinamentos** (`/treinamentos` e `/treinamentos/[slug]`) — catálogo e detalhe de um treinamento. Protegidos por acesso temporário.
- **Sebrae** (`/sebrae`) — landing da oferta da Feira do Empreendedor. Protegida pelo mesmo acesso.
- **Checkout** (`/checkout/...`) — páginas externas de obrigado da Hotmart. Públicas, para o comprador chegar depois do pagamento.

Dois endpoints:

- `POST /api/contact` — encaminha o formulário de contato para o mailer.
- `POST /api/hotmart/webhook` — recebe eventos de compra da Hotmart.

Não há banco neste repositório. Contato sai por HTTP para `MAILER_CONTACT_URL`. O webhook só autentica e escreve identificadores no log do servidor.

Próximo: [Arquitetura](arquitetura.md).
