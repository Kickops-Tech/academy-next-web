"use client";

import { LockKeyhole } from "lucide-react";
import { useGoldenTicketSource } from "../hooks/use-golden-ticket-source";
import type { SebraeTrainingData } from "../models/sebrae-training";
import { SebraeCta } from "./sebrae-cta";
import { SebraeGoldenTicketForm } from "./sebrae-golden-ticket-form";

export function SebraeOfferAction({
  offer,
}: {
  offer: SebraeTrainingData["offer"];
}) {
  const goldenTicket = useGoldenTicketSource();

  if (goldenTicket) {
    return (
      <>
        <p className="mb-7 text-sm leading-relaxed text-kickops-lightgray">
          Oferta especial Golden Ticket para visitantes da Feira do Empreendedor.
        </p>
        <SebraeGoldenTicketForm label={offer.ctaLabel} />
        <p className="mt-4 flex items-center gap-2 text-xs text-kickops-lightgray">
          <LockKeyhole aria-hidden className="size-3 shrink-0" />
          Vaga cortesia via Golden Ticket.
        </p>
      </>
    );
  }

  return (
    <>
      <p className="mb-7 text-sm leading-relaxed text-kickops-lightgray">
        {offer.note}
      </p>
      <SebraeCta offer={offer} placement="offer" />
      <p className="mt-4 flex items-center gap-2 text-xs text-kickops-lightgray">
        <LockKeyhole aria-hidden className="size-3 shrink-0" />
        {offer.securityNote}
      </p>
    </>
  );
}
