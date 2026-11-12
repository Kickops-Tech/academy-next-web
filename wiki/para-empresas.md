# Para empresas

`/para-empresas` apresenta treinamento em IA para sócios, gestores e lideranças. A oferta é personalizada, presencial ou online, com uma sessão de acompanhamento.

## Estrutura

1. **Hero:** “Treinamento in company, feito sob medida” acima do título “Sua liderança, pensando e navegando com a IA”, descrição da oferta, CTA de conversa e link para `#como-funciona`. A copy aparece imediatamente, sem a introdução Lottie ou baffle. O busto com parallax acompanha a composição desktop; mobile prioriza a mensagem.
2. **Capacidades:** reconhecer oportunidades, rever processos antes de automatizar e dar direção aos próximos passos. Apresenta a credencial de Guilherme e um link para `#quem-conduz`. Componente em `src/features/outcomes/components/outcomes-main.tsx`.
3. **Contents:** contexto, preparação, treinamento e acompanhamento, em `src/features/contents/constants/contents-topics.ts`.
4. **Moments:** fotos de um encontro real com texto de contexto. A grade mobile, a galeria desktop e o lightbox permitem explorar as imagens.
5. **Formats:** formato, personalização e proposta sob medida, em `src/features/formats/constants/formats-blocks.ts`.
6. **People:** apresenta Guilherme Rey e os demais participantes cadastrados. A bio compartilhada com a home vem de `src/assets/data/people.json`; Guilherme é apresentado como Mestre em Tecnologia Nuclear pelo IPEN/USP.
7. **Contact:** convite para compartilhar desafio, participantes e objetivo; FAQ sobre perfil não técnico, duração e investimento, modalidade e acompanhamento. Componente em `src/features/contact/components/company-contact-section.tsx`.

## Contato

O Hero, o cabeçalho B2B, Formats e o fechamento abrem o WhatsApp da Kickops com a mesma mensagem corporativa. URL e rótulo principal vivem em `src/features/contact/constants/company-contact.ts`. O botão inicia uma conversa; não agenda automaticamente uma reunião. O link secundário do Hero leva às etapas do treinamento.

Escopo, duração e investimento são alinhados na proposta. A página apresenta capacidades a desenvolver, sem promessa de retorno financeiro ou automação entregue.

Em telas pequenas, o menu corporativo ocupa duas linhas para manter os links visíveis. Os textos de Contents, Formats e da bio usam piso de 14 px; a composição desktop mantém as ilustrações existentes.

No Hero desktop, o busto de Aristóteles tem escala ampliada, ocupa quase toda a altura visual e fica deslocado à direita. Sua moldura considera as margens transparentes da imagem, com limite de tamanho e escala menor em notebooks estreitos. A camada escura de contraste fica concentrada atrás do texto e se torna transparente a 65% da largura, preservando a luminosidade da escultura.

## Biografia

A trajetória profissional é apresentada como experiência de Guilherme, sem tratar empresas citadas como endossantes da capacitação. A titulação por extenso também aparece na [landing FE26](sebrae.md), cuja biografia específica vive em `src/assets/data/sebrae-training.json`.

Racional editorial: [análise de copy de 12/11/2026](../docs/20261112-para-empresas-copy.md).
