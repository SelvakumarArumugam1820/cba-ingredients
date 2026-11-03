import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_URL } from "@/lib/seo";

type DocumentMetaConfig = {
  title: string;
  description: string;
  /** Route path, e.g. "/" or "/about" — used to build the canonical and og:url. */
  path: string;
  /** Set true for pages that shouldn't be indexed (e.g. the 404 page). */
  noindex?: boolean;
};

function setMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps the document title, meta description, canonical link, and
 * Open Graph/Twitter tags in sync with the current route. This is a
 * client-side-only SPA (no server rendering), so this helps crawlers that
 * execute JavaScript (Googlebot, Bingbot, and most modern AI crawlers) see
 * accurate per-page metadata; it does not change what a non-JS HTTP fetch
 * of the page receives (that still gets the shared defaults in index.html).
 */
export function useDocumentMeta({ title, description, path, noindex }: DocumentMetaConfig) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = title;
    setMetaByName("description", description);
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", `${SITE_URL}${path}`);
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setCanonical(`${SITE_URL}${path}`);
    setMetaByName("robots", noindex ? "noindex, follow" : "index, follow");
  }, [title, description, path, noindex, lang]);
}
