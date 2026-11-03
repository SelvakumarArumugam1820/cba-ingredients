/**
 * Single source of truth for per-route SEO metadata. Read by the pages at
 * runtime (useDocumentMeta) and by the build-time prerender step
 * (seo/prerender-plugin.ts), which writes a static HTML file per route plus
 * sitemap.xml — so the HTML a crawler fetches before running JavaScript
 * already carries the right title, description, and canonical.
 */
export const SITE_URL = "https://cbaingredients.com";
export const SITE_NAME = "CBA Ingredients";
export const LEGAL_NAME = "CBA Ingredients Company";

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  /** Short page name used in breadcrumbs. */
  name: string;
  /** Last meaningful content change (YYYY-MM-DD), used for sitemap lastmod. */
  lastmod: string;
};

export const ROUTE_META = {
  home: {
    path: "/",
    title: "CBA Ingredients | Food Ingredients & Raw Materials Supplier in Saudi Arabia",
    description: "CBA Ingredients is a Saudi-based B2B supplier of food ingredients and raw materials — dairy, bakery, beverage, flavours, colours, butter, and pharmaceutical/cosmetic ingredients — based in Dammam and serving Saudi Arabia and international customers.",
    name: "Home",
    lastmod: "2026-11-03",
  },
  about: {
    path: "/about",
    title: "About CBA Ingredients | Saudi B2B Food Ingredient Supplier in Dammam",
    description: "CBA Ingredients is a Saudi-based B2B food ingredient supplier serving dairy, bakery, beverage, and food-service businesses across the Kingdom and beyond.",
    name: "About",
    lastmod: "2026-11-03",
  },
  sustainable: {
    path: "/sustainable-supply",
    title: "Sustainable Supply | CBA Ingredients",
    description: "How CBA Ingredients approaches responsible, dependable ingredient supply for food businesses in Saudi Arabia — planning, relationships, and product care.",
    name: "Sustainable Supply",
    lastmod: "2026-11-03",
  },
} satisfies Record<string, RouteMeta>;

export const NOT_FOUND_META = {
  path: "/404",
  title: "Page Not Found | CBA Ingredients",
  description: "The page you're looking for doesn't exist. Return to CBA Ingredients to explore our ingredient categories.",
};
