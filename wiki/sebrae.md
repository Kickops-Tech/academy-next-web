# Landing FE26

`/sebrae` divulga o treinamento **Como empreender na era da IA**. É pública, sem HTTP Basic ou cookie obrigatório, e permanece fora de indexação via metadata, `robots.txt` e `X-Robots-Tag`.

- Conteúdo editável: `src/assets/data/sebrae-training.json`.
- Componentes e interações: `src/features/sebrae`.
- Data: 12/11/2026, das 10h às 16h, com 5 horas de conteúdo e intervalos.
- Plataforma: Kickops Academy, com acesso enviado perto da data.
- Professor: Guilherme Rey. A biografia abre com a experiência empreendedora e a aplicação no treinamento; a formação acadêmica vem depois.
- Oferta: R$ 89,90. O CTA diz “GARANTIR MEU LUGAR”.
- Checkout: `NEXT_PUBLIC_CHECKOUT_URL` ou `offer.checkoutUrl`. Sem URL válida, os CTAs levam à oferta e o botão de compra fica desabilitado.
- O rodapé tem WhatsApp com o mesmo destino dos links de atendimento, além das páginas legais.
- A última dobra leva ao catálogo público `/treinamentos`.
- Hero mobile (abaixo de 768 px): promessa curta em `hero.mobileSubtitle`, data e CTA, com os quatro destaques na base. A descrição longa aparece a partir de 768 px.
- FAQ: seis perguntas sobre pré-requisitos/ferramentas, adequação ao negócio, aplicação prática, gravação, acesso e reembolso.
- Reembolso da oferta Kickops + Feira do Empreendedor: além do direito de arrependimento previsto no CDC, é possível pedir cancelamento com reembolso total até um dia antes do evento.
- O card de oferta apresenta os itens incluídos, preço, CTA e pagamento seguro.

Motion usa IntersectionObserver e Web Animations API, respeita movimento reduzido e mantém conteúdo acessível sem JavaScript. O sticky mobile desaparece na oferta, no catálogo e no rodapé.

Eventos de navegação e compra, UTMs e pendências operacionais estão descritos em [configuração da landing](../docs/sebrae-configuration.md). Cliques não confirmam pagamento; `checkout_completed` depende do provedor.
