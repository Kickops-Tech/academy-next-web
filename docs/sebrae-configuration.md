# FE26 — configuração da landing

Briefing: [kickops-academy-fe26-landing-brief.md](./kickops-academy-fe26-landing-brief.md).

Referência editorial: [ementa, copy e conversão](./kickops-academy-fe26-revisao-ementa-copy-cro.md), com ajustes posteriores do usuário registrados abaixo.

- Conteúdo, preço, programa e links: `src/assets/data/sebrae-training.json`.
- Checkout: `NEXT_PUBLIC_CHECKOUT_URL` tem prioridade sobre `offer.checkoutUrl` no JSON. Configure a URL completa com o cupom já aplicado pelo provedor e faça novo deploy.
- Os CTAs de compra usam “GARANTIR MEU LUGAR”, sem preço no botão. O preço permanece no card da oferta. Sem checkout configurado, levam à seção de oferta; o botão dentro da oferta fica desabilitado. A referência de R$ 397 foi retirada por falta de histórico comprovado.
- Analytics: `NEXT_PUBLIC_GA_ID` ativa o envio para GA4. Sem ID, os eventos ficam disponíveis em `window.dataLayer` para integração posterior.
- Eventos: `page_view`, `landing_view`, `program_open` (etapa), `offer_view` (uma vez por montagem da página), `checkout_click` (posição do CTA, valor e moeda), `syllabus_click`, `faq_open` e `web_vital`. `landing_view` e `offer_view` evitam duplicação pelo ciclo extra de efeitos do Strict Mode. Eventos de checkout só são emitidos com destino de compra configurado. `checkout_click` substitui `checkout_start` e os eventos individuais por posição.
- UTMs (`source`, `medium`, `campaign`, `content`, `term`) são preservadas em `sessionStorage` durante a sessão da aba e adicionadas ao checkout sem remover os parâmetros de cupom. Uma nova campanha substitui a anterior.
- `checkout_click` significa clique de saída. `checkout_completed` depende de integração com o provedor após pagamento confirmado; não é emitido pela landing nem inferido por clique ou parâmetro de URL.
- O CTA sticky fica oculto enquanto a oferta, a chamada para o catálogo ou o rodapé estão visíveis.
- Motion: entradas escalonadas via IntersectionObserver + Web Animations API, transições de cards/botões/retrato e abertura de accordions. Sem bibliotecas adicionais; conteúdo visível sem JavaScript. A preferência `prefers-reduced-motion` desativa as animações, inclusive se alterada durante a navegação.

## Pendências externas

- Turma: 12/11/2026, das 10h às 16h, na plataforma Kickops Academy. Acesso enviado perto da data. Mantidas as 5 horas de conteúdo anunciadas, dentro da janela com intervalos. Canal de aviso de mudanças ainda pendente. Sincronizar `schedule` e FAQ com checkout, confirmação e e-mails quando configurados.
- Checkout: falta a URL, além das formas de pagamento, parcelamento/juros, dados da empresa e procedimento de solicitação de cancelamento e reembolso. A oferta Kickops + Feira do Empreendedor permite pedir cancelamento com reembolso total até um dia antes do evento, além do direito de arrependimento previsto no CDC. Sincronizar essa condição com o checkout. O contato de atendimento está disponível na página.
- Biografia: atualizada para “Seu professor” e “Mestre pelo IPEN”, conforme informado pelo usuário. A faixa de experiência mostra Glambox, B4A Group, iFood, XP e Grupo Primo; Indê e Plataforma Assaad permanecem como clientes da Kickops no texto. A contagem “14+ anos” aguarda confirmação e não foi publicada.
- Captura de leads/amostra e testes A/B são propostas futuras, dependentes de material, fluxo operacional e política de privacidade. Não foram adicionados formulários sem esses insumos.

O rodapé reutiliza `SiteFooter`. O link para `/treinamentos` fica na dobra de catálogo, sem faixa de texto adicional no rodapé.

## Revisão de conteúdo

O produto se chama “Como empreender na era da IA”. A entrega central é a primeira versão de um plano de 30 dias. O bloco de resultados precede os princípios; o exemplo demonstrativo, os parágrafos de introdução do programa/detalhes e a preparação opcional foram removidos. A ementa mantém objetivos e exercícios. A última dobra convida a explorar `/treinamentos`, em vez de repetir a oferta principal.

No Hero abaixo de 768 px, `hero.mobileSubtitle` apresenta a promessa em uma frase, seguida da data e do CTA. A descrição longa aparece apenas a partir de 768 px; os destaques de formato permanecem na base. A biografia prioriza experiência empreendedora, aplicação no treinamento e, por último, formação acadêmica. O FAQ reúne seis objeções de compra, consolidando ferramentas/pré-requisitos e participação/gravação. A oferta não inclui o aviso sobre formas de pagamento e parcelamento.

A landing `/sebrae` é pública, sem HTTP Basic ou cookie obrigatório, e preserva o bloqueio de indexação via metadata, `robots.txt` e `X-Robots-Tag`. O catálogo `/treinamentos` e seus detalhes também são públicos. O schema é `Course` com `Organization` como provedor, sem prometer rich results de FAQ.

As metas de Lighthouse do briefing exigem medição no navegador e não são garantidas apenas pelo build.
