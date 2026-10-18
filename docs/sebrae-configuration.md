# FE26 — configuração da landing

Briefing: [kickops-academy-fe26-landing-brief.md](./kickops-academy-fe26-landing-brief.md).

- Conteúdo, preço, programa e links: `src/assets/data/sebrae-training.json`.
- Checkout: `NEXT_PUBLIC_CHECKOUT_URL` tem prioridade sobre `offer.checkoutUrl` no JSON. Configure a URL completa com o cupom já aplicado pelo provedor e faça novo deploy.
- Os CTAs usam “Garantir meu lugar”. Sem checkout configurado, levam à seção de oferta; o botão dentro da oferta fica desabilitado, sem mensagem de preparação.
- Analytics: `NEXT_PUBLIC_GA_ID` ativa o envio para GA4. Sem ID, os eventos ficam disponíveis em `window.dataLayer` para integração posterior.
- Eventos: `page_view`, `hero_cta_click`, `nav_cta_click`, `audience_cta_click`, `offer_cta_click`, `final_cta_click`, `sticky_cta_click`, `syllabus_click`, `faq_open`, `checkout_start` e `web_vital`. Eventos de checkout só são emitidos com destino de compra configurado.
- UTMs (`source`, `medium`, `campaign`, `content`, `term`) são preservadas em `sessionStorage` durante a sessão da aba e adicionadas ao checkout sem remover os parâmetros de cupom. Uma nova campanha substitui a anterior.
- `checkout_start` significa clique de saída. `checkout_success` deve ser emitido pelo provedor após pagamento confirmado; não é inferido por clique ou parâmetro de URL.

## Pendências externas

Data da imersão e URL do checkout não foram fornecidas. O rodapé reutiliza `SiteFooter`, com link para `/treinamentos` composto pela landing.

## Revisão de conteúdo

O produto se chama “Como empreender na era da IA”, com duração de 5 horas. A revisão do usuário substitui a copy inicial do briefing. As seções de problema, transformação, entregáveis e biblioteca foram removidas. A seção de mentor usa a foto da home e uma adaptação da biografia publicada em `src/assets/data/people.json`.

As rotas continuam protegidas pelo acesso temporário. Não foram incluídas em sitemap público. O schema é `Course` com `Organization` como provedor, sem inventar uma data de evento nem prometer rich results de FAQ.

As metas de Lighthouse do briefing exigem medição no navegador e não são garantidas apenas pelo build.
