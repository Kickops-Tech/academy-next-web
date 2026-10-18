-- Cole no Supabase da Academy. Não use o projeto do mailer.
-- O Next grava o payload e o email_status. O mailer não lê esta tabela.

create table if not exists public.hotmart_purchase_webhooks (
  hotmart_id text primary key,
  event text,
  payload jsonb not null,
  email_status text not null
    check (email_status in ('pending', 'queued', 'failed', 'skipped')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
