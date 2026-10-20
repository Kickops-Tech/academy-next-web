# Acesso e ambiente

Variáveis de servidor. Nenhuma delas deve ir para `NEXT_PUBLIC_*`. Os nomes estão em `.env.example`.

| Variável | Uso |
|---|---|
| `MAILER_CONTACT_URL` | Destino do `POST /api/contact`. Sem ela, o contato responde 500. |
| `HOTMART_HOTTOK` | Token da conta Hotmart. Sem ele, o webhook responde 500. |
| `SUPABASE_URL` | Projeto Supabase da Academy, diferente do mailer. Sem ela, o webhook, o interesse em treinamento e o Golden Ticket respondem 500. |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço dessa tabela. Não é `NEXT_PUBLIC_`. |
| `MAILER_PURCHASE_WEBHOOK_URL` | `POST` que enfileira o e-mail de compra. Sem ela, evento que precisa de e-mail responde 500. |
| `MAILER_TRAINING_INTEREST_URL` | `POST` que enfileira o e-mail de interesse em treinamento. Sem ela, o app usa `https://mailer.kickops.dev/kickops/academy/training-interest`. |
| `MAILER_GOLDEN_TICKET_URL` | `POST` que enfileira a confirmação do Golden Ticket e o aviso interno. Sem ela, o app usa `https://mailer.kickops.dev/kickops/academy/golden-ticket`. |

`/`, `/para-empresas`, os detalhes em `/treinamentos/[slug]`, `/sebrae` e `/treinamentos/como-empreender-na-era-da-ia` são públicos. As variáveis `PRIVATE_ACCESS_*` não são utilizadas, e o cookie antigo `kickops_private_access` não participa do acesso.

Configurações públicas da landing FE26:

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_CHECKOUT_URL` | URL completa de compra, incluindo cupom. Tem prioridade sobre `offer.checkoutUrl` no JSON. Vale para `/treinamentos/como-empreender-na-era-da-ia` sem Golden Ticket. |
| `NEXT_PUBLIC_GTM_ID` | Container do Google Tag Manager. Sem ele, o script não entra. GA4 e Clarity ficam no container, não nesta variável. |

Essas configurações são públicas, não credenciais. Alterações exigem novo build/deploy.

Comandos do dia a dia: `npm run dev`, `npm run build`, `npm run lint` e `npm run lint:boundaries`.

Próximo: [Medição](medicao.md).
