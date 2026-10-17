---
title: Páginas de obrigado e webhook Hotmart
date: 2026-10-17
---

# Páginas de obrigado e webhook Hotmart

Três páginas externas de obrigado para o pós-venda da Hotmart e um webhook de compra que autentica a conta e registra só identificadores.

## Decisões

- A página e o webhook são canais separados. O redirect do comprador não lê o POST do webhook.
- Três rotas compartilhadas por todos os produtos. O produto se distingue no log pelo `product.ucode`.
- Sem banco. O webhook responde e registra identificadores. Não guarda nome nem e-mail.
- A página de compra aprovada não leva o comprador para fora. O texto diz que o acesso chega por e-mail.
- Casca visual da Academy: faixa escura com logo, fundo `#f2f1ed`, amarelo do projeto e `SiteFooter`. Sem o selo do Sebrae e sem o menu de treinamentos.
- Só o webhook 2.0.0 em JSON. O postback antigo em formulário não é aceito.

## Páginas

| Status na Hotmart | Rota |
|---|---|
| Compra aprovada | `/checkout/approved` |
| Aguardando pagamento | `/checkout/awaiting-payment` |
| Aguardando verificação de crédito | `/checkout/credit-check` |

As páginas são `noindex`. Se a query trouxer nome, e-mail ou transação, só esses campos aparecem.

## Webhook

`POST /api/hotmart/webhook`, com `HOTMART_HOTTOK` comparado ao header `X-HOTMART-HOTTOK`.

| Situação | Resposta |
|---|---|
| Variável ausente | 500 |
| Token ausente ou diferente | 401, sem logar o corpo |
| JSON inválido | 400 |
| Token válido | 200, mesmo com evento desconhecido |

O log leva `id`, `event`, `product.ucode`, `purchase.transaction` e `purchase.status`.

## Onde está no código

- Rotas: `src/app/checkout/`
- UI e leitura da query: `src/features/checkout/`
- Endpoint: `src/app/api/hotmart/webhook/route.ts`
- Autenticação e log: `src/features/checkout/server/handle-hotmart-webhook.ts`

Como operar isso no dia a dia: [Checkout Hotmart](../wiki/checkout-hotmart.md).
