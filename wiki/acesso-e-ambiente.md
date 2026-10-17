# Acesso e ambiente

Variáveis de servidor. Nenhuma delas deve ir para `NEXT_PUBLIC_*`. Os nomes estão em `.env.example`.

| Variável | Uso |
|---|---|
| `MAILER_CONTACT_URL` | Destino do `POST /api/contact`. Sem ela, o contato responde 500. |
| `PRIVATE_ACCESS_USERNAME` | Usuário do Basic em `/treinamentos` e `/sebrae`. Padrão `kickops` se estiver vazio. |
| `PRIVATE_ACCESS_PASSWORD` | Senha desse Basic. |
| `PRIVATE_ACCESS_SECRET` | Assina o cookie de 30 dias. Gere com `openssl rand -hex 32`. |
| `HOTMART_HOTTOK` | Token da conta Hotmart. Sem ele, o webhook responde 500. |

Se faltar senha ou segredo do acesso temporário, `/treinamentos` e `/sebrae` respondem 503 e não ficam públicas. Depois do primeiro Basic válido, o cookie `kickops_private_access` autoriza o navegador.

Comandos do dia a dia: `npm run dev`, `npm run build`, `npm run lint` e `npm run lint:boundaries`.

Próximo: [Documentação](documentacao.md).
