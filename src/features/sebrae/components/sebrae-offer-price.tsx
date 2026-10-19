"use client";

import { useLayoutEffect, useState } from "react";
import {
  goldenTicketPrice,
  rememberGoldenTicketSource,
} from "../utils/golden-ticket-checkout";

export function SebraeOfferPrice({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) {
  const [goldenTicket, setGoldenTicket] = useState(false);
  useLayoutEffect(() => {
    setGoldenTicket(rememberGoldenTicketSource());
  }, []);

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  });
  const discounted = goldenTicketPrice(price);

  if (!goldenTicket) {
    return (
      <p className="my-3 font-league-gothic text-7xl leading-none text-fe26-purple">
        {money.format(price)}
      </p>
    );
  }

  return (
    <p className="my-3 text-fe26-purple">
      <span className="sr-only">
        De {money.format(price)} por {money.format(discounted)}
      </span>
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
        {money.format(discounted)}
      </span>
    </p>
  );
}
