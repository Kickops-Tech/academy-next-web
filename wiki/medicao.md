# Medição

O app carrega um único Google Tag Manager no layout raiz. GA4 e Microsoft Clarity são tags desse container, não snippets no React. Sem `NEXT_PUBLIC_GTM_ID`, nenhum script é injetado. Os eventos continuam no `dataLayer` mesmo assim.

## O que o código envia

A cada rota, inclusive a primeira e as trocas do App Router, o layout empurra:

```txt
{ event: "page_view", page_path: "/caminho" }
```

`page_path` é só o caminho. A query não entra, para nome, e-mail e transação do checkout não seguirem ao analytics. No checkout, o cumprimento, o e-mail e a transação visíveis levam `data-clarity-mask`.

A landing `/sebrae` acrescenta eventos próprios, todos com `campaign: "fe26"` e os UTMs da sessão:

| Evento | Quando |
|---|---|
| `landing_view` | Abertura da landing |
| `offer_view` | A oferta entra na tela, uma vez por montagem |
| `checkout_click` | Clique de saída para o checkout, se a URL estiver configurada. Não dispara no Golden Ticket. |
| `golden_ticket_submit` | Envio bem-sucedido do formulário de cortesia |
| `syllabus_click` | Clique na ementa |
| `faq_open` | Abertura de uma pergunta |
| `program_open` | Abertura de uma etapa do programa |
| `web_vital` | Métrica de Web Vitals |

O `page_view` da landing é o global. Não há um segundo `page_view` só do `/sebrae`.

## Checklist do container

Sem estas tags, o GTM carrega e não mede nada.

- Tag do GA4 com `send_page_view` desligado. Trigger de evento personalizado `page_view`, usando `page_path`. O pageview automático do GA4 junto com o nosso evento contaria a primeira página duas vezes.
- Tag do Clarity em All Pages, com o ID do projeto Clarity.
- Um trigger de evento personalizado para cada evento da tabela acima, encaminhado ao GA4 com o mesmo nome.

Voltar ao [índice](index.md).
