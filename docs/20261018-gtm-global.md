---
title: GTM global com GA4 e Clarity no container
date: 2026-10-18
---

# GTM global com GA4 e Clarity no container

O layout passa a carregar um único Google Tag Manager quando `NEXT_PUBLIC_GTM_ID` existe. GA4 e Clarity não são snippets do app: ficam como tags do container.

O `gtag.js` exclusivo do `/sebrae` saiu. Os eventos dessa landing continuam no `dataLayer`, sem um `page_view` próprio, porque o layout já dispara `page_view` em toda rota, só com o caminho. Nome, e-mail e transação do checkout levam `data-clarity-mask`.

Como configurar o container: [Medição](../wiki/medicao.md).
