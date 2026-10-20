"use client";

import { SebraeGoldenTicketConfetti } from "@features/sebrae/components/sebrae-golden-ticket-confetti";
import { trackCampaignEvent } from "@features/sebrae/utils/campaign-analytics";
import {
  formatBrazilMobile,
  maskBrazilMobile,
} from "@features/trainings/utils/brazil-mobile";
import { useState, type FormEvent } from "react";

type SebraeGoldenTicketFormProps = {
  label: string;
};

const inputClassName =
  "mt-2 w-full border border-kickops-gray/15 bg-[#f2f1ed] px-4 py-3 text-sm text-kickops-gray outline-none placeholder:text-kickops-gray/40 focus:border-fe26-purple";

export function SebraeGoldenTicketForm({ label }: SebraeGoldenTicketFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "duplicate"
  >("idle");
  const [showConfetti, setShowConfetti] = useState(false);

  if (status === "success") {
    return (
      <>
        {showConfetti ? (
          <SebraeGoldenTicketConfetti onDone={() => setShowConfetti(false)} />
        ) : null}
        <p className="mt-6 text-sm leading-relaxed text-kickops-gray">
          Sua vaga cortesia está confirmada. Nos vemos em 12 de novembro de
          2026, das 10h às 16h. O e-mail com os detalhes já está a caminho.
        </p>
      </>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const formattedPhone = formatBrazilMobile(phone);

    if (!trimmedName || !trimmedEmail.includes("@") || !formattedPhone) {
      setFieldError("Informe nome, e-mail e um celular com DDD.");
      setStatus("idle");
      return;
    }

    setFieldError(null);
    setStatus("pending");

    try {
      const response = await fetch("/api/sebrae/golden-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: formattedPhone,
        }),
      });

      if (response.status === 409) {
        setStatus("duplicate");
        return;
      }

      if (!response.ok) {
        setStatus("error");
        return;
      }

      trackCampaignEvent("golden_ticket_submit");
      setShowConfetti(true);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="mt-2" onSubmit={onSubmit} noValidate>
      <label className="block text-xs font-semibold tracking-wide text-kickops-lightgray uppercase">
        Nome
        <input
          className={inputClassName}
          name="name"
          autoComplete="name"
          placeholder="Seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <label className="mt-4 block text-xs font-semibold tracking-wide text-kickops-lightgray uppercase">
        E-mail
        <input
          className={inputClassName}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@empresa.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label className="mt-4 block text-xs font-semibold tracking-wide text-kickops-lightgray uppercase">
        Telefone
        <input
          className={inputClassName}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(event) => setPhone(maskBrazilMobile(event.target.value))}
          required
        />
      </label>

      {fieldError ? (
        <p className="mt-4 text-sm text-fe26-purple">{fieldError}</p>
      ) : null}
      {status === "duplicate" ? (
        <p className="mt-4 text-sm text-fe26-purple">
          Este e-mail já tem uma vaga cortesia registrada.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-fe26-purple">
          Não foi possível enviar agora. Tente de novo.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "pending"}
        className="sebrae-button mt-6 inline-flex min-h-12 w-full items-center justify-center bg-fe26-pink px-5 py-4 text-center text-sm font-bold text-kickops-gray transition-colors hover:bg-fe26-lime disabled:cursor-wait disabled:opacity-70"
      >
        {status === "pending" ? "Enviando..." : label}
      </button>
    </form>
  );
}
