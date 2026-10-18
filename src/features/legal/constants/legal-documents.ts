export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDocumentCopy = {
  title: string;
  description: string;
  sections: LegalSection[];
};

export const PRIVACY_POLICY: LegalDocumentCopy = {
  title: "Política de privacidade",
  description:
    "Quais dados a Kickops Academy recebe neste site e para onde eles vão.",
  sections: [
    {
      heading: "O que este site é",
      paragraphs: [
        "A Kickops Academy é o braço educacional da Kickops. Este site publica a landing, o catálogo de treinamentos, a página da feira e as páginas de retorno da compra.",
        "O pagamento não acontece aqui. A compra é feita na Hotmart.",
      ],
    },
    {
      heading: "Formulário de contato",
      paragraphs: [
        "O formulário da página inicial pede nome, telefone, e-mail, empresa, número de funcionários e mensagem. Esses campos seguem para o serviço de e-mail da Kickops, que avisa a equipe. Não guardamos essa mensagem num banco deste site.",
      ],
    },
    {
      heading: "Páginas de obrigado",
      paragraphs: [
        "Depois da compra, a Hotmart pode abrir uma página deste site com nome, e-mail e transação na URL. A página mostra esses dados na tela e não os grava.",
      ],
    },
    {
      heading: "Webhook de compra",
      paragraphs: [
        "A Hotmart também envia um aviso de compra para este site, separado da página que o comprador vê. Guardamos o JSON inteiro desse aviso no banco da Academy, inclusive nome, e-mail e documento quando a Hotmart os envia.",
        "O registro existe para não tratar o mesmo aviso duas vezes. O log do servidor fica só com identificadores: id do evento, nome do evento, produto, transação e status. Nome e e-mail não entram nesse log.",
      ],
    },
    {
      heading: "E-mails da compra",
      paragraphs: [
        "Nos eventos de compra previstos, enviamos um e-mail transacional para o e-mail do comprador. O texto confirma o produto e a transação. Não é uma lista de marketing, e este site não oferece descadastro: o link de cancelar inscrição no rodapé do e-mail abre a página inicial.",
        "O envio passa pelo serviço de e-mail da Kickops, que usa uma fila própria, em outro banco, só para entregar a mensagem.",
      ],
    },
    {
      heading: "Áreas com senha",
      paragraphs: [
        "Treinamentos e a página da feira podem pedir usuário e senha. Depois do acesso válido, o navegador guarda um cookie para não pedir de novo por 30 dias.",
      ],
    },
  ],
};

export const TERMS_OF_USE: LegalDocumentCopy = {
  title: "Termos de uso",
  description: "Como usar o site da Kickops Academy e o que a compra na Hotmart cobre.",
  sections: [
    {
      heading: "Uso do site",
      paragraphs: [
        "O site apresenta a Kickops Academy, os treinamentos e o retorno depois de uma compra. O conteúdo é da Kickops. Copiar o material das páginas para redistribuir não faz parte do uso previsto.",
      ],
    },
    {
      heading: "Compra",
      paragraphs: [
        "A compra é concluída na Hotmart, não neste site. Preço, pagamento, reembolso e acesso ao produto seguem as regras da Hotmart e da oferta comprada.",
        "As páginas de obrigado só informam o status que a URL trouxer. Elas não confirmam o pagamento por conta própria e não entregam acesso.",
      ],
    },
    {
      heading: "E-mail da compra",
      paragraphs: [
        "Quando a Hotmart avisa um evento de compra, podemos enviar um e-mail ao comprador confirmando produto e transação. Aprovação e conclusão são avisos diferentes e podem chegar os dois.",
      ],
    },
    {
      heading: "Áreas restritas",
      paragraphs: [
        "Algumas páginas pedem senha temporária. Sem essa senha, o conteúdo não é público.",
      ],
    },
    {
      heading: "Contato",
      paragraphs: [
        "Dúvidas sobre este site vão pelo formulário de contato da página inicial.",
      ],
    },
  ],
};
