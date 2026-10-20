import { rememberSebraeCatalogOrigin } from "@features/trainings/utils/sebrae-catalog-origin";
import { useLayoutEffect, useState } from "react";

/**
 * Keeps the Sebrae-fair catalog extras on for this tab after `from=sebrae`
 * is stripped from the URL.
 */
export function useSebraeCatalogOrigin(fromQuery: boolean) {
  const [active, setActive] = useState(fromQuery);

  useLayoutEffect(() => {
    setActive(rememberSebraeCatalogOrigin(fromQuery));
  }, [fromQuery]);

  return active;
}
