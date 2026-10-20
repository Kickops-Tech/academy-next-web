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

`/sebrae` não renderiza a landing. Sem Golden Ticket, redireciona para `/?from=sebrae` e a home mostra o card “Como empreender na era da IA” no início do catálogo enquanto a origem durar na aba. Com `?from=kickops-golden-ticket`, redireciona para `/treinamentos/como-empreender-na-era-da-ia` com o mesmo parâmetro. Lá o checkout vira o formulário de cortesia. O envio grava `academy_contact_training_interest` com `training_slug = sebrae-golden-ticket` e enfileira a confirmação ao visitante mais o aviso interno. O mesmo e-mail neste slug é recusado.

O conteúdo de treinamentos e da landing Sebrae vem de dados em `src/assets/data` e da feature correspondente. No desktop, a primeira dobra da home cabe na altura da janela: menu, busto, globo wireframe, “Kickops” sobre “Academy” em duas linhas, texto e seta. O menu leva a `/para-empresas` (botão amarelo preenchido), ao catálogo e ao WhatsApp. Na home, Treinamentos rola até `#catalogo`. No iPad a dobra usa a mesma composição em duas linhas; o título cresce com a largura, em vez de saltar para o tamanho de desktop, para “Academy” não ocupar a tela de ponta a ponta. O catálogo abaixo mostra a grade “Escolha por onde começar”: cards coloridos com o objeto 3D, categoria, título em League Gothic (estreita e em negrito) e descrição. Os cards entram com fade em progressão curta (40ms por coluna); o objeto tem parallax no scroll. No hover o card e o objeto dão zoom com `scale`, sem mudar o tamanho da célula. A grade fica em três colunas quando cada card cabe com cerca de 300px (iPad em paisagem e a partir daí); no retrato estreito continua em duas, no tamanho do card de desktop. O detalhe mantém o menu Academy e, abaixo, a faixa da mesma cor, com volta ao catálogo, título em League Gothic (estreita e em negrito), a linha de treinamento gravado com encontros ao vivo e acesso às gravações por um ano, o formato online na Plataforma Kickops Academy e o objeto. O catálogo tem oito treinamentos. A ordem dos cards da home está em `src/features/trainings/constants/catalog-order.ts` — basta mover o slug. O card da FE26 não entra nessa lista: com origem Sebrae ele continua fixo no início. Cinco endereços antigos redirecionam de forma permanente para o slug atual: trabalho remoto, gestão, arquitetura, RAG e design. O card lateral pede nome, e-mail e celular para avisar sobre a próxima turma; o envio grava `academy_contact_training_interest` e enfileira o e-mail interno. No sucesso, um confete curto nas cores da marca cobre a tela e some. O link “Fale com a gente” do cabeçalho continua no WhatsApp. O checkout não depende desses dados. A página de obrigado é a mesma para qualquer produto.

`/para-empresas` é a landing B2B: Hero “Kickops Academy / Para empresas” numa linha no desktop, fundo em gradiente escuro com o amarelo Kickops (diferente do cinza da home), o mesmo globo wireframe atrás do menu e do busto, Contents (“Como funciona”), Moments (“Prática ao vivo”), Formats e People, sem a dobra Target. O CTA do Hero rola para `#como-funciona`. Contents conta o caminho: entender o negócio, criar o treinamento no contexto, realizar presencial ou online e voltar para uma sessão de acompanhamento. Moments é só o título e as fotos da Introspecção em `public/img/introspeccao`, sem texto de contexto nem link. No mobile as fotos são uma grade 2×3; a partir de `md` a galeria é o Cinemascope da Fibra: cilindro côncavo, painéis 16:9, arraste, scroll horizontal ou setas com snap no quadro do centro. Um clique na foto abre lightbox em tela cheia (Esc, clique fora ou × fecha). No desktop a dobra cabe na altura da janela; as fotos crescem nesse vão (as laterais entram no fade) e o título e as setas ficam junto da faixa, sem colar nas bordas. No mobile a dobra cresce com a grade. Formats (“É preciso saber”) é o título, os três blocos (formato, conteúdo, investimento) e o CTA — sem a faixa de duração da imersão. A faixa de Contents em diante continua com o globo temático da banda; só um dos dois anima por vez (o que está na tela). Moments cobre o globo com branco para as fotos não brigarem com a malha.

A animação Lottie da marca toca uma vez por aba no first load, em qualquer rota de marketing. Recarregar a mesma aba ou navegar no client não repete. `/checkout` e `/sebrae` não tocam. `prefers-reduced-motion` também pula. No Hero de `/para-empresas`, o título só começa o baffle depois do reveal da Lottie quando a cortina ainda está nessa visita.

Próximo: [Checkout Hotmart](checkout-hotmart.md).
