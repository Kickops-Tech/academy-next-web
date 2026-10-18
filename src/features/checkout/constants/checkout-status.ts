export const CHECKOUT_STATUSES = {
  approved: {
    title: "Compra aprovada",
    description:
      "Pagamento confirmado. O acesso ao produto chega no e-mail usado na compra.",
    body: "Seu pagamento foi confirmado. O acesso ao produto chega no e-mail usado na compra.",
  },
  "awaiting-payment": {
    title: "Aguardando pagamento",
    description:
      "Pedido registrado. O acesso é liberado depois que o pagamento for confirmado.",
    body: "Seu pedido foi registrado. O acesso é liberado depois que o pagamento for confirmado.",
  },
  "credit-check": {
    title: "Aguardando verificação de crédito",
    description:
      "A instituição de pagamento está analisando a compra. O acesso é liberado quando a análise for aprovada.",
    body: "A instituição de pagamento está analisando a compra. O acesso é liberado quando a análise for aprovada. Você recebe a confirmação por e-mail.",
  },
} as const;

export type CheckoutStatus = keyof typeof CHECKOUT_STATUSES;
