---
title: E-mail de compra e páginas legais
date: 2026-10-17
---

# E-mail de compra e páginas legais

O webhook da Hotmart passa a gravar o payload e a enfileirar um e-mail para o comprador. Privacidade e termos deixam de ser texto solto no rodapé.

## Decisões

- O banco da Academy é outro projeto Supabase, separado da fila do mailer. O Next grava `hotmart_purchase_webhooks`. O mailer não lê essa tabela.
- `email_status` só muda na requisição do webhook. `queued` significa que a fila do mailer aceitou, não que o Resend entregou.
- Os nove eventos de compra disparam e-mail, inclusive aprovação e conclusão da mesma compra. Sem e-mail do comprador, ou fora dessa lista, a linha fica `skipped`.
- Sem `id` do evento, o webhook responde 200 e não grava: não há chave para deduplicar.
- Linha presa em `pending` responde 500 e não enfileira de novo. Reprocessar fica manual.
- O endpoint do mailer é aberto. Remetente fixo, destinatário no body.
- Páginas legais descrevem o que o site faz hoje. Não há descadastro.

## Rotas

- `POST /api/hotmart/webhook`
- `/politica-de-privacidade`
- `/termos-de-uso`
