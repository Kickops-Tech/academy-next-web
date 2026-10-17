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

O log sai como `hotmart.webhook` com `id`, `event`, `productUcode`, `transaction` e `status`. Nome, e-mail e o restante do payload não entram no log. Se o JSON for válido mas não bater no formato esperado, a resposta continua 200 e o log marca só `{ accepted: true }`, para a Hotmart não reenviar em loop.

Eventos de compra previstos na documentação 2.0.0 incluem `PURCHASE_APPROVED`, `PURCHASE_BILLET_PRINTED`, `PURCHASE_COMPLETE`, `PURCHASE_CANCELED`, `PURCHASE_PROTEST`, `PURCHASE_REFUNDED`, `PURCHASE_CHARGEBACK`, `PURCHASE_EXPIRED` e `PURCHASE_DELAYED`. O endpoint não filtra por nome: qualquer evento autenticado é aceito.

Próximo: [Acesso e ambiente](acesso-e-ambiente.md).
