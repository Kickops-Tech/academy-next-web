"use client";

import { TrainingInterestConfetti } from "@features/trainings/components/training-interest-confetti";
import { maskBrazilMobile, formatBrazilMobile } from "@features/trainings/utils/brazil-mobile";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

type TrainingInterestFormProps = {
  slug: string;
  label: string;
};

const inputClassName =
  "mt-2 w-full border border-white/15 bg-white px-4 py-3 text-sm text-kickops-gray outline-none placeholder:text-kickops-gray/40 focus:border-kickops-yellow";

export function TrainingInterestForm({ slug, label }: TrainingInterestFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [showConfetti, setShowConfetti] = useState(false);

  if (status === "success") {
    return (
      <>
        {showConfetti ? (
          <TrainingInterestConfetti onDone={() => setShowConfetti(false)} />
        ) : null}
        <p className="mt-8 text-sm leading-relaxed text-white">
          Recebemos o seu interesse. Vamos falar com você em breve.
        </p>
      </>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const formattedPhone = formatBrazilMobile(phone);

    if (!trimmedName || !trimmedEmail.includes("@") || !formattedPhone) {
      setFieldError("Informe nome, e-mail e um celular com DDD.");
      setStatus("idle");
      return;
    }

    setFieldError(null);
    setStatus("pending");

    try {
      const response = await fetch("/api/trainings/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: trimmedName,
          email: trimmedEmail,
          phone: formattedPhone,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setShowConfetti(true);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="mt-8" onSubmit={onSubmit} noValidate>
      <label className="block text-xs font-semibold tracking-wide text-white/70 uppercase">
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
      <label className="mt-4 block text-xs font-semibold tracking-wide text-white/70 uppercase">
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
      <label className="mt-4 block text-xs font-semibold tracking-wide text-white/70 uppercase">
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

      {fieldError ? <p className="mt-4 text-sm text-kickops-yellow">{fieldError}</p> : null}
      {status === "error" ? (
        <p className="mt-4 text-sm text-kickops-yellow">
          Não foi possível enviar agora. Tente de novo.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "pending"}
        className="group mt-6 flex w-full items-center justify-between bg-kickops-yellow px-5 py-4 font-bold text-kickops-gray transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
      >
        {status === "pending" ? "Enviando..." : label}
        <ArrowRight
          aria-hidden
          className="size-5 transition-transform group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
