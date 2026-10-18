"use client";

import { useEffect, useState } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { SebraeCta } from "./sebrae-cta";
import type { SebraeTrainingData } from "../models/sebrae-training";
import {
  campaignCheckoutUrl,
  readCampaign,
  trackCampaignEvent,
} from "../utils/campaign-analytics";

function reportMetric(metric: { name: string; value: number; id: string }) {
  trackCampaignEvent("web_vital", {
    metric_name: metric.name,
    value: metric.value,
    metric_id: metric.id,
  });
}

export function SebraeInteractions({
  offer,
}: {
  offer: SebraeTrainingData["offer"];
}) {
  const [showSticky, setShowSticky] = useState(false);
  useReportWebVitals(reportMetric);

  useEffect(() => {
    const campaign = readCampaign();
    trackCampaignEvent("page_view", { page_path: "/sebrae" });
    const hero = document.getElementById("sebrae-hero");
    const observer = new IntersectionObserver(([entry]) => {
      setShowSticky(
        !entry.isIntersecting && entry.boundingClientRect.bottom < 0,
      );
    });
    if (hero) observer.observe(hero);

    // Keep native anchors (including open-in-new-tab) and the provider's coupon parameters.
    document
      .querySelectorAll<HTMLAnchorElement>("a[data-checkout]")
      .forEach((link) => {
        link.href = campaignCheckoutUrl(offer.checkoutUrl, campaign);
      });
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a");
      if (!link) return;
      if (link.dataset.checkout) {
        link.href = campaignCheckoutUrl(offer.checkoutUrl, readCampaign());
        trackCampaignEvent(`${link.dataset.checkout}_cta_click`);
        trackCampaignEvent("checkout_start", {
          currency: offer.currency,
          value: offer.price,
        });
      }
      if (link.getAttribute("href") === "#programa")
        trackCampaignEvent("syllabus_click");
    }
    function onToggle(event: Event) {
      const detail = event.target;
      if (
        detail instanceof HTMLDetailsElement &&
        detail.open &&
        detail.dataset.faq
      ) {
        trackCampaignEvent("faq_open", { question: detail.dataset.faq });
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, [offer.checkoutUrl, offer.price, offer.currency]);

  return (
    <div
      hidden={!showSticky}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/20 bg-kickops-gray px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white md:hidden"
    >
      <SebraeCta offer={offer} placement="sticky" />
    </div>
  );
}
