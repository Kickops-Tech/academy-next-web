---
title: Sem indexação em /sebrae e /checkout
date: 2026-10-17
---

# Sem indexação em /sebrae e /checkout

`/sebrae` e `/checkout`, com os filhos, ficam fora de índice de crawler e de agent.

Três sinais, todos ligados à lista `UNINDEXED_PATHS`:

- `robots.txt` com `Disallow` para qualquer user-agent
- `X-Robots-Tag: noindex, nofollow` na resposta, inclusive no 401 e no 503 do Sebrae
- metadata `noindex` nos layouts de `/sebrae` e `/checkout`

`/treinamentos` não entrou nessa regra.
