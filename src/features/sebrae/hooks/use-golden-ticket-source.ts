"use client";

import { useLayoutEffect, useState } from "react";
import { rememberGoldenTicketSource } from "../utils/golden-ticket-checkout";

export function useGoldenTicketSource() {
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    setActive(rememberGoldenTicketSource());
  }, []);

  return active;
}
