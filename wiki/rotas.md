# Rotas

| Rota | Acesso | O que faz |
|---|---|---|
| `/` | Público | Catálogo de treinamentos (home) |
| `/para-empresas` | Público | Landing B2B Kickops Academy para empresas |
| `/treinamentos` | Público | Redirect permanente para `/` |
| `/treinamentos/[slug]` | Público | Detalhe do treinamento |
| `/treinamentos/como-empreender-na-era-da-ia` | Público, sem indexação | Landing FE26 |
| `/sebrae` | Público, sem indexação | Porteiro da FE26 |
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

`/sebrae`, `/treinamentos/como-empreender-na-era-da-ia` e `/checkout` (incluindo filhos) não entram em índice. O `robots.txt` bloqueia esses caminhos para qualquer user-agent, crawler ou agent que respeite o arquivo. A resposta também manda `X-Robots-Tag: noindex, nofollow`, e o HTML dessas rotas repete `noindex`.

`/sebrae` não renderiza a landing. Sem Golden Ticket, redireciona para `/?from=sebrae`. Enquanto a origem durar na aba, a primeira dobra da home troca a seta pelo botão especial da FE SEBRAE 2026 — o clique rola até o catálogo, com o card “Como empreender na era da IA” no início. Com `?from=kickops-golden-ticket`, redireciona para `/treinamentos/como-empreender-na-era-da-ia` com o mesmo parâmetro. Lá o checkout vira o formulário de cortesia. O envio grava `academy_contact_training_interest` com `training_slug = sebrae-golden-ticket` e enfileira a confirmação ao visitante mais o aviso interno. O mesmo e-mail neste slug é recusado.

O conteúdo de treinamentos e da landing Sebrae vem de dados em `src/assets/data` e da feature correspondente. No desktop, a primeira dobra da home cabe na altura da janela: menu, busto, globo wireframe, “Kickops” sobre “Academy” em duas linhas, texto e seta. O menu leva a `/para-empresas` (botão amarelo preenchido), ao catálogo e ao WhatsApp. Na home, Treinamentos rola até `#catalogo`. No iPad a dobra usa a mesma composição em duas linhas; o título cresce com a largura, em vez de saltar para o tamanho de desktop, para “Academy” não ocupar a tela de ponta a ponta. O catálogo abaixo mostra a grade “Escolha por onde começar”: cards coloridos com o objeto 3D, categoria, título em League Gothic (estreita e em negrito) e descrição. Os cards entram com fade em progressão curta (40ms por coluna); o objeto tem parallax no scroll. No hover o card e o objeto dão zoom com `scale`, sem mudar o tamanho da célula. A grade fica em três colunas quando cada card cabe com cerca de 300px (iPad em paisagem e a partir daí); no retrato estreito continua em duas, no tamanho do card de desktop. O detalhe mantém o menu Academy e, abaixo, a faixa da mesma cor, com volta ao catálogo, título em League Gothic (estreita e em negrito), a linha de treinamento gravado com encontros ao vivo e acesso às gravações por um ano, o formato online na Plataforma Kickops Academy e o objeto. O catálogo tem oito treinamentos. A ordem dos cards da home está em `src/features/trainings/constants/catalog-order.ts` — basta mover o slug. O card da FE26 não entra nessa lista: com origem Sebrae ele continua fixo no início, e a primeira dobra troca a seta pelo botão especial da FE Sebrae 2026, que rola até o catálogo. A home termina com a mesma dobra Mentes pensantes de `/para-empresas`, antes do rodapé. Cinco endereços antigos redirecionam de forma permanente para o slug atual: trabalho remoto, gestão, arquitetura, RAG e design. O card lateral pede nome, e-mail e celular para avisar sobre a próxima turma; o envio grava `academy_contact_training_interest` e enfileira o e-mail interno. No sucesso, um confete curto nas cores da marca cobre a tela e some. O link “Fale com a gente” do cabeçalho continua no WhatsApp. O checkout não depende desses dados. A página de obrigado é a mesma para qualquer produto.

`/para-empresas` é a landing B2B de capacitação em IA para lideranças. O Hero apresenta “Treinamento in company, feito sob medida” acima de “Sua liderança, pensando e navegando com a IA”, com CTA primário para WhatsApp e link secundário para `#como-funciona`. Seguem as capacidades a desenvolver, Contents, Moments com contexto do encontro real, Formats, People e um fechamento com contato e FAQ. A bio de Guilherme informa o mestrado em Tecnologia Nuclear pelo IPEN/USP e é compartilhada com a home. A identidade usa as cores, tipografia, busto desktop e globo da Kickops Academy. A galeria mantém grade mobile, Cinemascope desktop e lightbox. Conteúdo e pontos de edição estão em [Para empresas](para-empresas.md).

A animação Lottie da marca toca uma vez por aba no first load das rotas de marketing que usam a introdução. Recarregar a mesma aba ou navegar no client não repete. `/checkout`, `/sebrae` e `/para-empresas` não tocam. `prefers-reduced-motion` também pula. Na B2B, título e CTA ficam disponíveis desde a renderização inicial.

Próximo: [Checkout Hotmart](checkout-hotmart.md).
