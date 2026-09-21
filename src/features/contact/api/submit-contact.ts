import type { TargetContactFormValues } from "@features/contact/dto/target-contact-form.dto";

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; message?: string };

export async function submitContact(
  values: TargetContactFormValues,
): Promise<SubmitContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      return { ok: false };
    }

    return { ok: true };
  } catch {
    return { ok: false };
  }
}
