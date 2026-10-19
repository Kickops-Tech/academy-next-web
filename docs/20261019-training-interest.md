---
title: Interesse no detalhe do treinamento
date: 2026-10-19
---

# Interesse no detalhe do treinamento

O card do detalhe deixa o WhatsApp e pede nome, e-mail e celular. `POST /api/trainings/interest` grava a linha em `academy_contact_training_interest`, no Supabase da Academy, e enfileira o e-mail interno. O SQL está em `supabase/academy-contact-training-interest.sql`.

O cabeçalho “Fale com a gente” continua no WhatsApp. O formulário da home não muda. No sucesso, um confete curto nas cores da marca cobre a tela e some. Quem prefere menos movimento não vê o confete.

Sem `MAILER_TRAINING_INTEREST_URL`, o app envia para `https://mailer.kickops.dev/kickops/academy/training-interest`. A variável na Vercel, no projeto academy-next-web, substitui esse endereço.

Estado atual: [Rotas](../wiki/rotas.md) e [Acesso e ambiente](../wiki/acesso-e-ambiente.md).
