const STORAGE_KEY = "kickops-fe26-utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type CampaignWindow = Window & {
  dataLayer?: Array<unknown>;
  gtag?: (...args: unknown[]) => void;
};

export function readCampaign(): Record<string, string> {
  const current = new URLSearchParams(window.location.search);
  let saved: Record<string, string> = {};
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
    for (const key of UTM_KEYS) {
      if (typeof parsed?.[key] === "string") saved[key] = parsed[key];
    }
  } catch {
    /* Attribution still works when browser storage is unavailable. */
  }
  if (UTM_KEYS.some((key) => current.has(key))) saved = {};
  for (const key of UTM_KEYS) {
    const value = current.get(key);
    if (value) saved[key] = value;
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    /* Storage is optional. */
  }
  return saved;
}

export function campaignCheckoutUrl(
  checkoutUrl: string,
  campaign: Record<string, string>,
): string {
  const url = new URL(checkoutUrl);
  for (const key of UTM_KEYS) {
    if (campaign[key]) url.searchParams.set(key, campaign[key]);
  }
  return url.toString();
}

export function trackCampaignEvent(
  event: string,
  properties: Record<string, unknown> = {},
) {
  const target = window as CampaignWindow;
  if (process.env.NEXT_PUBLIC_GA_ID && !target.gtag) {
    target.dataLayer ??= [];
    target.gtag = function () {
      target.dataLayer.push(arguments);
    };
    target.gtag("js", new Date());
    target.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      send_page_view: false,
    });
  }
  const data = { campaign: "fe26", ...readCampaign(), ...properties };
  if (target.gtag) target.gtag("event", event, data);
  else {
    target.dataLayer ??= [];
    target.dataLayer.push({ event, ...data });
  }
}
