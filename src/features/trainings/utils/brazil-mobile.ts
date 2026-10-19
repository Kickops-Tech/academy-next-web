const MOBILE_DIGITS = /^(\d{2})(9\d{4})(\d{4})$/;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Formats up to 11 digits as `(DD) 9XXXX-XXXX` while the person types. */
export function maskBrazilMobile(value: string): string {
  const digits = digitsOnly(value).slice(0, 11);

  if (digits.length === 0) {
    return "";
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Accepts a masked or raw value. Returns `(DD) 9XXXX-XXXX` only for an 11-digit mobile. */
export function formatBrazilMobile(value: string): string | undefined {
  const match = digitsOnly(value).match(MOBILE_DIGITS);
  if (!match) {
    return undefined;
  }

  return `(${match[1]}) ${match[2]}-${match[3]}`;
}
