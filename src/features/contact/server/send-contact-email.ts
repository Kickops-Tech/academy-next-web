import { CONTACT_EMAIL_SUBJECTS } from "@features/contact/constants/contact-form";
import type {
  ContactEmailPayload,
  ContactProxyBody,
} from "@features/contact/dto/contact-email.dto";

export type SendContactEmailResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

function toMailerPayload(body: ContactProxyBody): ContactEmailPayload {
  return {
    subject: CONTACT_EMAIL_SUBJECTS[body.audienceId],
    name: body.name,
    phone: body.phone,
    email: body.email,
    company: body.company,
    employeeCount: body.employeeCount,
    message: body.message,
  };
}

export async function sendContactEmail(
  body: ContactProxyBody,
): Promise<SendContactEmailResult> {
  const mailerUrl = process.env.MAILER_CONTACT_URL;
  if (!mailerUrl) {
    return {
      ok: false,
      status: 500,
      message: "Mailer is not configured",
    };
  }

  const payload = toMailerPayload(body);

  let response: Response;
  try {
    response = await fetch(mailerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      ok: false,
      status: 502,
      message: "Failed to reach mailer",
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status >= 500 ? 502 : 400,
      message: "Mailer rejected the request",
    };
  }

  return { ok: true };
}
