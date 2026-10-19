# Acesso e ambiente

Variáveis de servidor. Nenhuma delas deve ir para `NEXT_PUBLIC_*`. Os nomes estão em `.env.example`.

| Variável | Uso |
|---|---|
| `MAILER_CONTACT_URL` | Destino do `POST /api/contact`. Sem ela, o contato responde 500. |
| `HOTMART_HOTTOK` | Token da conta Hotmart. Sem ele, o webhook responde 500. |
| `SUPABASE_URL` | Projeto Supabase da Academy, diferente do mailer. Sem ela, o webhook responde 500. |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço dessa tabela. Não é `NEXT_PUBLIC_`. |
| `MAILER_PURCHASE_WEBHOOK_URL` | `POST` que enfileira o e-mail de compra. Sem ela, evento que precisa de e-mail responde 500. |

`/treinamentos`, seus detalhes e `/sebrae` são públicos. As variáveis `PRIVATE_ACCESS_*` não são utilizadas, e o cookie antigo `kickops_private_access` não participa do acesso.

Configurações públicas da landing FE26:

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_CHECKOUT_URL` | URL completa de compra, incluindo cupom. Tem prioridade sobre `offer.checkoutUrl` no JSON. |
| `NEXT_PUBLIC_CHECKOUT_URL_GOLDEN_TICKET` | URL de compra quando `/sebrae` abre com `?from=kickops-golden-ticket`. Sem ela, vale a URL padrão. |
| `NEXT_PUBLIC_GTM_ID` | Container do Google Tag Manager. Sem ele, o script não entra. GA4 e Clarity ficam no container, não nesta variável. |

Essas configurações são públicas, não credenciais. Alterações exigem novo build/deploy.

Comandos do dia a dia: `npm run dev`, `npm run build`, `npm run lint` e `npm run lint:boundaries`.

Próximo: [Medição](medicao.md).
