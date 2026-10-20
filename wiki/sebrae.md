# Landing FE26

`/treinamentos/como-empreender-na-era-da-ia` divulga o treinamento **Como empreender na era da IA**. É pública, sem HTTP Basic ou cookie obrigatório, e permanece fora de indexação via metadata, `robots.txt` e `X-Robots-Tag`.

`/sebrae` é só o porteiro. Sem Golden Ticket, manda para a home com `?from=sebrae` e o catálogo mostra o card da FE26 primeiro enquanto a origem durar na aba. Com `?from=kickops-golden-ticket`, manda para o slug da landing com o mesmo parâmetro e a Cortesia.

- Conteúdo editável: `src/assets/data/sebrae-training.json`.
- Componentes e interações: `src/features/sebrae`.
- Data: 12/11/2026, das 10h às 16h, com 5 horas de conteúdo e intervalos.
- Plataforma: Kickops Academy, com acesso enviado perto da data.
- Professor: Guilherme Rey. A biografia abre com a experiência empreendedora e a aplicação no treinamento; a formação acadêmica vem depois.
- Oferta: R$ 89,90. O CTA diz “GARANTIR MEU LUGAR”. No Golden Ticket, o R$ 89,90 aparece riscado e o preço passa a Cortesia.
- Checkout pago: `NEXT_PUBLIC_CHECKOUT_URL` ou `offer.checkoutUrl`. Sem URL válida, os CTAs levam à oferta e o botão de compra fica desabilitado.
- Golden Ticket: `?from=kickops-golden-ticket` troca o checkout por um formulário no card da oferta (nome, e-mail, celular). Os outros CTAs rolam até `#oferta`. A origem fica na aba e o `from` sai da URL atual. O envio grava `academy_contact_training_interest` com `training_slug = sebrae-golden-ticket` e enfileira a confirmação ao visitante mais o aviso interno. No sucesso, um confete dourado denso cobre a tela e some; quem prefere menos movimento não o vê.
- O rodapé tem WhatsApp com o mesmo destino dos links de atendimento, além das páginas legais.
- A última dobra leva ao catálogo público `/`.
- O cabeçalho é o menu Academy do site (Para empresas, Treinamentos, WhatsApp). Não há âncoras internas no topo.
- Hero mobile (abaixo de 768 px): promessa curta em `hero.mobileSubtitle`, data e CTA, com os quatro destaques na base. A descrição longa aparece a partir de 768 px.
- FAQ: seis perguntas sobre pré-requisitos/ferramentas, adequação ao negócio, aplicação prática, gravação, acesso e reembolso.
- Reembolso da oferta Kickops + Feira do Empreendedor: além do direito de arrependimento previsto no CDC, é possível pedir cancelamento com reembolso total até um dia antes do evento.
- O card de oferta apresenta os itens incluídos, preço, CTA e pagamento seguro. No Golden Ticket, a nota vira “Oferta especial Golden Ticket para visitantes da Feira do Empreendedor.” e o cadeado diz “Vaga cortesia via Golden Ticket.” A FAQ de reembolso não muda.

Motion usa IntersectionObserver e Web Animations API, respeita movimento reduzido e mantém conteúdo acessível sem JavaScript. O sticky mobile desaparece na oferta, no catálogo e no rodapé.

Eventos de navegação e compra, UTMs e pendências operacionais estão descritos em [configuração da landing](../docs/sebrae-configuration.md). Cliques não confirmam pagamento; `checkout_completed` depende do provedor.
