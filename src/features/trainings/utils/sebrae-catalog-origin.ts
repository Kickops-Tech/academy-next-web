import {
  SEBRAE_CATALOG_FROM,
  SEBRAE_CATALOG_STORAGE_KEY,
} from "@features/trainings/constants/sebrae-catalog";

/**
 * Remembers a Sebrae-fair arrival for this tab and drops `from=sebrae`
 * from the current history entry. Other query params stay.
 */
export function rememberSebraeCatalogOrigin(fromQuery: boolean): boolean {
  let active = fromQuery;
  try {
    if (
      sessionStorage.getItem(SEBRAE_CATALOG_STORAGE_KEY) === SEBRAE_CATALOG_FROM
    ) {
      active = true;
    }
    if (fromQuery) {
      sessionStorage.setItem(SEBRAE_CATALOG_STORAGE_KEY, SEBRAE_CATALOG_FROM);
    }
  } catch {
    /* The query param still shows the extra card for this page view. */
  }

  if (!fromQuery) {
    return active;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("from") !== SEBRAE_CATALOG_FROM) {
    return active;
  }

  params.delete("from");
  const search = params.toString();
  const next = `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`;
  window.history.replaceState(window.history.state, "", next);
  return active;
}
