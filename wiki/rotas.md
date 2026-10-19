# Rotas

| Rota | Acesso | O que faz |
|---|---|---|
| `/` | Público | Landing da home |
| `/treinamentos` | Público | Catálogo |
| `/treinamentos/[slug]` | Público | Detalhe do treinamento |
| `/sebrae` | Público, sem indexação | Landing da feira |
| `/checkout/approved` | Público, sem indexação | Obrigado de compra aprovada |
| `/checkout/awaiting-payment` | Público, sem indexação | Obrigado aguardando pagamento |
| `/checkout/credit-check` | Público, sem indexação | Obrigado aguardando verificação de crédito |
| `/politica-de-privacidade` | Público | O que o site recebe e onde guarda |
| `/termos-de-uso` | Público | Uso do site e compra na Hotmart |
| `POST /api/contact` | Público | Proxy do formulário de contato |
| `POST /api/hotmart/webhook` | Hottok | Eventos de compra da Hotmart |

As páginas do site são públicas, sem HTTP Basic ou cookie de acesso obrigatório. O webhook Hotmart autentica as requisições pelo Hottok.

`/sebrae` e `/checkout` (incluindo filhos) não entram em índice. O `robots.txt` bloqueia esses caminhos para qualquer user-agent, crawler ou agent que respeite o arquivo. A resposta também manda `X-Robots-Tag: noindex, nofollow`, e o HTML dessas rotas repete `noindex`.

O conteúdo de treinamentos e da landing Sebrae vem de dados em `src/assets/data` e da feature correspondente. O catálogo em `/treinamentos` mostra a grade “Escolha por onde começar”: cards coloridos com o objeto 3D, categoria, título em League Gothic (estreita e em negrito) e descrição. O detalhe mantém o menu Academy e, abaixo, a faixa da mesma cor, com volta ao catálogo, título em League Gothic (estreita e em negrito), duração, formato e o objeto. O checkout não depende desses dados. A página de obrigado é a mesma para qualquer produto.

Próximo: [Checkout Hotmart](checkout-hotmart.md).
