# Rotas

| Rota | Acesso | O que faz |
|---|---|---|
| `/` | Público | Landing da home |
| `/treinamentos` | Básico temporário | Catálogo |
| `/treinamentos/[slug]` | Básico temporário | Detalhe do treinamento |
| `/sebrae` | Básico temporário, sem indexação | Landing da feira |
| `/checkout/approved` | Público, sem indexação | Obrigado de compra aprovada |
| `/checkout/awaiting-payment` | Público, sem indexação | Obrigado aguardando pagamento |
| `/checkout/credit-check` | Público, sem indexação | Obrigado aguardando verificação de crédito |
| `/politica-de-privacidade` | Público | O que o site recebe e onde guarda |
| `/termos-de-uso` | Público | Uso do site e compra na Hotmart |
| `POST /api/contact` | Público | Proxy do formulário de contato |
| `POST /api/hotmart/webhook` | Hottok | Eventos de compra da Hotmart |

O acesso básico está em `src/proxy.ts` e só cobre `/treinamentos` e `/sebrae`. Checkout e webhook ficam de fora de propósito: o comprador e a Hotmart precisam chegar sem essa senha.

`/sebrae` e `/checkout` (incluindo filhos) não entram em índice. O `robots.txt` bloqueia esses caminhos para qualquer user-agent, crawler ou agent que respeite o arquivo. A resposta também manda `X-Robots-Tag: noindex, nofollow`, e o HTML dessas rotas repete `noindex`. Isso vale para o 401 e o 503 do Sebrae, quando o crawler não chega a ver a página.

O conteúdo de treinamentos e da landing Sebrae vem de dados em `src/assets/data` e da feature correspondente. O checkout não depende desses dados. A página de obrigado é a mesma para qualquer produto.

Próximo: [Checkout Hotmart](checkout-hotmart.md).
