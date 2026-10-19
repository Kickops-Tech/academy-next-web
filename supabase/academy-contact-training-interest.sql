-- Cole no Supabase da Academy. Não use o projeto do mailer.
-- O Next grava o interesse e enfileira o e-mail. O mailer não lê esta tabela.
-- Se a tabela antiga ainda existir, o rename abaixo a aproveita.

alter table if exists public.training_interests
  rename to academy_contact_training_interest;

create table if not exists public.academy_contact_training_interest (
  id uuid primary key default gen_random_uuid(),
  training_slug text not null,
  training_name text not null,
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now()
);
