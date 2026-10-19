"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function AnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    const target = window as DataLayerWindow;
    target.dataLayer ??= [];
    target.dataLayer.push({
      event: "page_view",
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
