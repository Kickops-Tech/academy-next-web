"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { SebraeCta } from "./sebrae-cta";
import { useSebraeMotion } from "../hooks/use-sebrae-motion";
import type { SebraeTrainingData } from "../models/sebrae-training";
import {
  campaignCheckoutUrl,
  readCampaign,
  trackCampaignEvent,
} from "../utils/campaign-analytics";
import { isCheckoutReady } from "../utils/is-checkout-ready";
import { rememberGoldenTicketSource } from "../utils/golden-ticket-checkout";

function reportMetric(metric: { name: string; value: number; id: string }) {
  trackCampaignEvent("web_vital", {
    metric_name: metric.name,
    value: metric.value,
    metric_id: metric.id,
  });
}

function pointCheckoutLinksToOffer() {
  document
    .querySelectorAll<HTMLAnchorElement>("a[data-checkout]")
    .forEach((link) => {
      link.href = "#oferta";
      link.removeAttribute("data-checkout");
    });
}

export function SebraeInteractions({
  offer,
}: {
  offer: SebraeTrainingData["offer"];
}) {
  const [showSticky, setShowSticky] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(offer.checkoutUrl);
  const [campaign, setCampaign] = useState<Record<string, string>>({});
  const checkoutUrlRef = useRef(offer.checkoutUrl);
  const goldenTicketRef = useRef(false);
  const priceRef = useRef(offer.price);
  const viewed = useRef({ landing: false, offer: false });
  useReportWebVitals(reportMetric);
  useSebraeMotion();

  useLayoutEffect(() => {
    const goldenTicket = rememberGoldenTicketSource();
    goldenTicketRef.current = goldenTicket;
    priceRef.current = goldenTicket ? 0 : offer.price;
    const nextCampaign = readCampaign();
    setCampaign(nextCampaign);

    if (goldenTicket) {
      checkoutUrlRef.current = "";
      setCheckoutUrl("");
      pointCheckoutLinksToOffer();
      return;
    }

    checkoutUrlRef.current = offer.checkoutUrl;
    setCheckoutUrl(offer.checkoutUrl);
    document
      .querySelectorAll<HTMLAnchorElement>("a[data-checkout]")
      .forEach((link) => {
        link.href = campaignCheckoutUrl(offer.checkoutUrl, nextCampaign);
      });
  }, [offer.checkoutUrl, offer.price]);

  useEffect(() => {
    const campaign = readCampaign();
    if (!viewed.current.landing) {
      trackCampaignEvent("landing_view", { page_path: "/sebrae" });
      viewed.current.landing = true;
    }
    const hero = document.getElementById("sebrae-hero");
    const offerSection = document.getElementById("oferta");
    const footer = document.querySelector(".sebrae-landing footer");
    const academy = document.getElementById("academy");
    let pastHero = false;
    let offerVisible = false;
    let footerVisible = false;
    let academyVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          pastHero =
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        }
        if (entry.target === offerSection) {
          offerVisible = entry.isIntersecting;
          if (offerVisible && !viewed.current.offer) {
            trackCampaignEvent("offer_view", {
              currency: offer.currency,
              value: priceRef.current,
            });
            viewed.current.offer = true;
          }
        }
        if (entry.target === footer) footerVisible = entry.isIntersecting;
        if (entry.target === academy) academyVisible = entry.isIntersecting;
      }
      setShowSticky(
        pastHero && !offerVisible && !footerVisible && !academyVisible,
      );
    });
    if (hero) observer.observe(hero);
    if (offerSection) observer.observe(offerSection);
    if (footer) observer.observe(footer);
    if (academy) observer.observe(academy);

    if (goldenTicketRef.current) {
      pointCheckoutLinksToOffer();
    } else {
      document
        .querySelectorAll<HTMLAnchorElement>("a[data-checkout]")
        .forEach((link) => {
          link.href = campaignCheckoutUrl(checkoutUrlRef.current, campaign);
        });
    }

    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a");
      if (!link) return;
      if (link.dataset.checkout) {
        link.href = campaignCheckoutUrl(checkoutUrlRef.current, readCampaign());
        trackCampaignEvent("checkout_click", {
          placement: link.dataset.checkout,
          currency: offer.currency,
          value: priceRef.current,
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
      if (
        detail instanceof HTMLDetailsElement &&
        detail.open &&
        detail.dataset.program
      ) {
        trackCampaignEvent("program_open", { stage: detail.dataset.program });
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, [offer.price, offer.currency]);

  return (
    <div
      hidden={!showSticky}
      className="sebrae-sticky-cta fixed inset-x-0 bottom-0 z-50 border-t border-white/20 bg-kickops-gray px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white md:hidden"
    >
      <SebraeCta
        offer={{
          ...offer,
          checkoutUrl:
            !goldenTicketRef.current && isCheckoutReady(checkoutUrl)
              ? campaignCheckoutUrl(checkoutUrl, campaign)
              : checkoutUrl,
        }}
        placement="sticky"
      />
    </div>
  );
}
