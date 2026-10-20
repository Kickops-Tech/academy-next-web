---
title: Formulário do Golden Ticket na FE26
date: 2026-10-20
---

# Formulário do Golden Ticket na FE26

`/sebrae?from=kickops-golden-ticket` deixa o checkout da Hotmart. O card da oferta mostra R$ 89,90 riscado e Cortesia, com um formulário de nome, e-mail e celular. Os outros CTAs rolam até `#oferta`.

`POST /api/sebrae/golden-ticket` grava a linha em `academy_contact_training_interest` com `training_slug = sebrae-golden-ticket` e enfileira a confirmação ao visitante mais o aviso interno. O mesmo e-mail neste slug é recusado. Sem `MAILER_GOLDEN_TICKET_URL`, o app envia para `https://mailer.kickops.dev/kickops/academy/golden-ticket`.

`/sebrae` sem o parâmetro continua no checkout pago.

Estado atual: [Landing FE26](../wiki/sebrae.md), [Rotas](../wiki/rotas.md) e [Acesso e ambiente](../wiki/acesso-e-ambiente.md).
