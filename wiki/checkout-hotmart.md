# Checkout Hotmart

A Hotmart manda o comprador para uma URL por status e, à parte, faz POST no webhook. Um não alimenta o outro.

## O que configurar na Hotmart

No domínio publicado:

- compras aprovadas: `https://<dominio>/checkout/approved`
- aguardando pagamento: `https://<dominio>/checkout/awaiting-payment`
- aguardando verificação de crédito: `https://<dominio>/checkout/credit-check`
- webhook 2.0.0: `https://<dominio>/api/hotmart/webhook`

Um `HOTMART_HOTTOK` de conta vale para todos os produtos. No painel, o token da conta é o mesmo valor enviado no header `X-HOTMART-HOTTOK`.

## Página de obrigado

A ajuda oficial da página externa não documenta query string. A página lê o que chegar e mostra só isto, como texto, até 200 caracteres:

- nome: `name` ou `nome`; se nenhum dos dois vier, `first_name` e `last_name`
- e-mail: `email`
- transação: `transaction`

`doc`, telefone e qualquer outra chave não aparecem. As três páginas têm `robots: noindex`. O layout de `/checkout` repete isso para qualquer filho novo. O `robots.txt` também desautoriza `/checkout` para todos os user-agents, e a resposta HTTP leva `X-Robots-Tag: noindex, nofollow`.

Textos:

- **Aprovada** — o pagamento foi confirmado e o acesso chega no e-mail da compra.
- **Aguardando pagamento** — o pedido existe e o acesso espera a confirmação.
- **Verificação de crédito** — a instituição está analisando; o acesso espera a aprovação e a confirmação vem por e-mail.

## Webhook

Contrato: [eventos de pedido 2.0.0](https://developers.hotmart.com/docs/pt-BR/2.0.0/webhook/purchase-webhook/). POST JSON. A comparação do token usa `timingSafeEqual`.

O log sai como `hotmart.webhook` com `id`, `event`, `productUcode`, `transaction`, `status` e `emailStatus`. Nome, e-mail e o restante do payload não entram no log. O JSON inteiro fica na tabela `hotmart_purchase_webhooks`, no Supabase da Academy. O SQL para criar a tabela está em `supabase/hotmart-purchase-webhooks.sql`.

A chave é o `id` do evento. Se esse id já estiver `queued` ou `skipped`, a resposta é 200 e o mailer não é chamado de novo. Se o enfileiramento falhar, a linha fica `failed` e a resposta é 500, para a Hotmart tentar de novo. Sem `id`, a resposta é 200 e nada é gravado.

`queued` significa que o mailer aceitou a mensagem na fila dele. O consumo que envia pelo Resend não atualiza esta tabela: os projetos são diferentes, e o mailer não tem a service role da Academy.

Eventos que geram e-mail ao comprador: `PURCHASE_APPROVED`, `PURCHASE_COMPLETE`, `PURCHASE_BILLET_PRINTED`, `PURCHASE_DELAYED`, `PURCHASE_EXPIRED`, `PURCHASE_CANCELED`, `PURCHASE_REFUNDED`, `PURCHASE_PROTEST` e `PURCHASE_CHARGEBACK`. Aprovação e conclusão da mesma compra enviam os dois. Qualquer outro evento autenticado é gravado como `skipped`. Sem `data.buyer.email`, também fica `skipped`.

Se a linha permanecer `pending` porque o processo morreu no meio, o retry responde 500 e não enfileira de novo. Reprocessar essa linha é manual.

Próximo: [Acesso e ambiente](acesso-e-ambiente.md).
