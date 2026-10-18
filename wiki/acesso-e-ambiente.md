# Acesso e ambiente

Variáveis de servidor. Nenhuma delas deve ir para `NEXT_PUBLIC_*`. Os nomes estão em `.env.example`.

| Variável | Uso |
|---|---|
| `MAILER_CONTACT_URL` | Destino do `POST /api/contact`. Sem ela, o contato responde 500. |
| `PRIVATE_ACCESS_USERNAME` | Usuário do Basic em `/treinamentos` e seus detalhes. Padrão `kickops` se estiver vazio. |
| `PRIVATE_ACCESS_PASSWORD` | Senha desse Basic. |
| `PRIVATE_ACCESS_SECRET` | Assina o cookie de 30 dias. Gere com `openssl rand -hex 32`. |
| `HOTMART_HOTTOK` | Token da conta Hotmart. Sem ele, o webhook responde 500. |
| `SUPABASE_URL` | Projeto Supabase da Academy, diferente do mailer. Sem ela, o webhook responde 500. |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço dessa tabela. Não é `NEXT_PUBLIC_`. |
| `MAILER_PURCHASE_WEBHOOK_URL` | `POST` que enfileira o e-mail de compra. Sem ela, evento que precisa de e-mail responde 500. |

Se faltar senha ou segredo do acesso temporário, `/treinamentos` e seus detalhes respondem 503 e não ficam públicos. Depois do primeiro Basic válido, o cookie `kickops_private_access` autoriza o navegador. `/sebrae` é pública e independe dessas variáveis.

Configurações públicas da landing FE26:

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_CHECKOUT_URL` | URL completa de compra, incluindo cupom. Tem prioridade sobre `offer.checkoutUrl` no JSON. |
| `NEXT_PUBLIC_GA_ID` | ID de medição GA4. Sem ele, eventos ficam em `window.dataLayer`. |

Essas duas configurações são públicas, não credenciais. Alterações exigem novo build/deploy.

Comandos do dia a dia: `npm run dev`, `npm run build`, `npm run lint` e `npm run lint:boundaries`.

Próximo: [Documentação](documentacao.md).
