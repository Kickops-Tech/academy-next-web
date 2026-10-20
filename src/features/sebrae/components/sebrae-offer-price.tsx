"use client";

import { useGoldenTicketSource } from "../hooks/use-golden-ticket-source";

export function SebraeOfferPrice({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) {
  const goldenTicket = useGoldenTicketSource();

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  });

  if (!goldenTicket) {
    return (
      <p className="my-3 font-league-gothic text-7xl leading-none text-fe26-purple">
        {money.format(price)}
      </p>
    );
  }

  return (
    <p className="my-3 text-fe26-purple">
      <span className="sr-only">De {money.format(price)} por cortesia</span>
      <span
        aria-hidden
        className="block font-league-gothic text-4xl leading-none line-through decoration-2 opacity-50"
      >
        {money.format(price)}
      </span>
      <span
        aria-hidden
        className="mt-1 block font-league-gothic text-7xl leading-none"
      >
        Cortesia
      </span>
    </p>
  );
}
