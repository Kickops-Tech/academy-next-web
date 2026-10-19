---
title: Checkout do Golden Ticket na FE26
date: 2026-10-19
---

# Checkout do Golden Ticket na FE26

`/sebrae?from=kickops-golden-ticket` passa a usar `NEXT_PUBLIC_CHECKOUT_URL_GOLDEN_TICKET` nos CTAs de compra. A origem fica na sessão da aba e o parâmetro `from` sai da URL atual, sem empilhar outra entrada no histórico. As UTMs permanecem.

Sem a variável, ou com valor que não seja uma URL, a compra continua em `NEXT_PUBLIC_CHECKOUT_URL`.

O card da oferta mostra R$ 89,90 riscado e o preço com 15% de desconto, R$ 76,42. O desconto segue a mesma origem do checkout.

Estado atual: [Landing FE26](../wiki/sebrae.md) e [Acesso e ambiente](../wiki/acesso-e-ambiente.md).
