---
title: E-mail só na compra aprovada
date: 2026-10-19
---

# E-mail só na compra aprovada

O webhook da Hotmart só enfileira e-mail em `PURCHASE_APPROVED`. Os outros eventos de compra continuam gravados, com `email_status` `skipped`.

O body do mailer passa a incluir `productId`, lido de `data.product.id`. O texto da confirmação e a data da turma do produto `8752307` ficam no mailer.

Estado atual: [Checkout Hotmart](../wiki/checkout-hotmart.md).
