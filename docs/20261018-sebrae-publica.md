---
title: Landing FE26 revisada e acesso público
date: 2026-10-18
---

# Landing FE26 revisada e acesso público

- `/sebrae` saiu do matcher de autenticação em `src/proxy.ts`. Abre sem credenciais ou cookie, mesmo sem as variáveis do Basic.
- `/treinamentos` e seus detalhes continuam protegidos.
- Preservadas as regras de não indexação e o fluxo de checkout presentes na `main`.
- Incorporadas as revisões da landing: copy, programa, professor, oferta, data, motion acessível, acesso ao catálogo e WhatsApp no rodapé.
- Atualizadas a wiki, a configuração da landing e as variáveis de exemplo.

Referências: [briefing original](kickops-academy-fe26-landing-brief.md), [revisão editorial](kickops-academy-fe26-revisao-ementa-copy-cro.md) e [estado atual](../wiki/sebrae.md).
