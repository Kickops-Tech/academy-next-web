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
| `POST /api/trainings/interest` | Público | Interesse no detalhe de um treinamento |
| `POST /api/sebrae/golden-ticket` | Público | Vaga cortesia do Golden Ticket da FE26 |
| `POST /api/hotmart/webhook` | Hottok | Eventos de compra da Hotmart |

As páginas do site são públicas, sem HTTP Basic ou cookie de acesso obrigatório. O webhook Hotmart autentica as requisições pelo Hottok.

`/sebrae` e `/checkout` (incluindo filhos) não entram em índice. O `robots.txt` bloqueia esses caminhos para qualquer user-agent, crawler ou agent que respeite o arquivo. A resposta também manda `X-Robots-Tag: noindex, nofollow`, e o HTML dessas rotas repete `noindex`.

Com `?from=kickops-golden-ticket`, `/sebrae` troca o checkout por um formulário no card da oferta. O envio grava `academy_contact_training_interest` com `training_slug = sebrae-golden-ticket` e enfileira a confirmação ao visitante mais o aviso interno. O mesmo e-mail neste slug é recusado.

O conteúdo de treinamentos e da landing Sebrae vem de dados em `src/assets/data` e da feature correspondente. No desktop, a primeira dobra de `/treinamentos` cabe na altura da janela: menu, busto, linha, títulos, texto e seta. No iPad a dobra usa a mesma composição; o título cresce com a largura, em vez de saltar para o tamanho de desktop, para “Academy” não ocupar a tela de ponta a ponta. O catálogo abaixo mostra a grade “Escolha por onde começar”: cards coloridos com o objeto 3D, categoria, título em League Gothic (estreita e em negrito) e descrição. A grade fica em três colunas quando cada card cabe com cerca de 300px (iPad em paisagem e a partir daí); no retrato estreito continua em duas, no tamanho do card de desktop. O detalhe mantém o menu Academy e, abaixo, a faixa da mesma cor, com volta ao catálogo, título em League Gothic (estreita e em negrito), a linha de treinamento gravado com encontros ao vivo e acesso às gravações por um ano, o formato online na Plataforma Kickops Academy e o objeto. O catálogo tem oito treinamentos. Cinco endereços antigos redirecionam de forma permanente para o slug atual: trabalho remoto, gestão, arquitetura, RAG e design. O card lateral pede nome, e-mail e celular para avisar sobre a próxima turma; o envio grava `academy_contact_training_interest` e enfileira o e-mail interno. No sucesso, um confete curto nas cores da marca cobre a tela e some. O link “Fale com a gente” do cabeçalho continua no WhatsApp. O checkout não depende desses dados. A página de obrigado é a mesma para qualquer produto.

Próximo: [Checkout Hotmart](checkout-hotmart.md).
