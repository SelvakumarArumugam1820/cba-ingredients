/**
 * Build-time SEO prerender for this client-only SPA.
 *
 * Without this, every URL served the same index.html: the homepage title,
 * description and `canonical=/`, and an empty <div id="root">. Crawlers that
 * don't run JavaScript (and Google's first, pre-render pass) therefore saw
 * /about and /sustainable-supply as empty duplicates of the homepage.
 *
 * After `vite build` this writes, from the built index.html:
 *   /index.html, /about/index.html, /sustainable-supply/index.html
 *     – route-specific <title>, description, canonical, Open Graph/Twitter,
 *       WebPage + BreadcrumbList JSON-LD (+ FAQPage on Home), and a static
 *       copy of the page's existing English content inside #root. React's
 *       createRoot() replaces that markup on load, so visitors see no change.
 *   /404.html  – noindex page served with a real 404 status by the host.
 *   It also checks public/sitemap.xml against ROUTE_META and fails the build
 *   if a route is missing, extra, or has a stale lastmod.
 *
 * All copy comes from the same strings/catalogue the pages render — nothing
 * here is new or different content.
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { LEGAL_NAME, NOT_FOUND_META, ROUTE_META, SITE_NAME, SITE_URL, type RouteMeta } from "../client/src/lib/seo";
import { translate, type StringKey } from "../client/src/i18n/strings";
import { categories } from "../client/src/data/catalogue";

const t = (key: StringKey) => translate(key, "en");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const faqs = ([1, 2, 3, 4, 5, 6] as const).map((n) => ({ q: t(`faqQ${n}` as StringKey), a: t(`faqA${n}` as StringKey) }));

function nav() {
  return `<nav aria-label="Main navigation"><a href="/">${t("navHome")}</a> · <a href="/about">${t("navAbout")}</a> · <a href="/#categories">${t("navApplications")}</a> · <a href="/sustainable-supply">${t("navSustainable")}</a> · <a href="/#contact">${t("navContact")}</a></nav>`;
}

function contact() {
  return `<footer><h2>${esc(t("contactHeadingLine1"))} ${esc(t("contactHeadingLine2"))}</h2><p><strong>${LEGAL_NAME}</strong><br>Building 5283, King Fahad ibn Abdulaziz Rd, 1st Industrial District, Dammam 32234, Kingdom of Saudi Arabia</p><p>Email: <a href="mailto:alimansour@cbaingredients.com">alimansour@cbaingredients.com</a> · Phone / WhatsApp: <a href="tel:+966556585552">+966 55 658 5552</a></p><p>© 2026 CBA Ingredients Company<br>Dammam, Saudi Arabia</p><p>Designed &amp; Developed by <a href="https://cbaingredients.com/">CBAingredients</a> &amp; <a href="https://groinnovative.com/">GroInnovative</a></p></footer>`;
}

const bodies: Record<keyof typeof ROUTE_META, () => string> = {
  home: () => `
<header><p>${esc(t("heroEyebrowCompany"))} — ${esc(t("heroEyebrowCountry"))}</p>${nav()}</header>
<main>
<h1>${esc(t("heroTitle"))}</h1>
<p>${esc(t("heroSourcingPartner"))} ${esc(t("heroSupplyPartner"))} ${esc(t("heroTagline"))}</p>
<p><strong>${esc(t("heroB2BHeading"))}</strong> ${esc(t("heroSubBenefit"))}</p>
<section id="about"><h2>${esc(t("introHeading"))}</h2><p>${esc(t("introLead"))}</p></section>
<section id="expertise"><h2>${esc(t("expHeading"))}</h2><p>${esc(t("expP1"))}</p><p>${esc(t("expP2"))}</p><p>${esc(t("expP3"))}</p>
<h3>${esc(t("expSubheading"))}</h3><ul>${([1, 2, 3, 4, 5] as const).map((n) => `<li>${esc(t(`expPoint${n}` as StringKey))}</li>`).join("")}</ul><p>${esc(t("expFinalP"))}</p></section>
<section id="categories"><h2>${esc(t("categoriesHeadingLine1"))} ${esc(t("categoriesHeadingLine2"))}</h2><p>${esc(t("categoriesIntro"))}</p>
<ul>${categories.map((c) => `<li><h3>${esc(c.name.en)}</h3><p>${esc(c.description.en)}</p></li>`).join("")}</ul></section>
<section id="approach"><h2>${esc(t("approachHeadingLine1"))} ${esc(t("approachHeadingLine2"))}</h2><p>${esc(t("approachIntro"))}</p>
<ul><li><h3>${esc(t("principleQualityTitle"))}</h3><p>${esc(t("principleQualityText"))}</p></li><li><h3>${esc(t("principleSupplyTitle"))}</h3><p>${esc(t("principleSupplyText"))}</p></li><li><h3>${esc(t("principleApplicationTitle"))}</h3><p>${esc(t("principleApplicationText"))}</p></li></ul></section>
<section id="contact"><h2>${esc(t("contactHeadingLine1"))} ${esc(t("contactHeadingLine2"))}</h2><p>${esc(t("contactIntro"))}</p></section>
<section id="faq"><h2>${esc(t("faqHeadingLine1"))} ${esc(t("faqHeadingLine2"))}</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}</section>
</main>${contact()}`,
  about: () => `
<header>${nav()}</header>
<main>
<h1>${esc(t("aboutHeroLine1"))} ${esc(t("aboutHeroLine2"))}</h1><p>${esc(t("aboutHeroIntro"))}</p>
<section><h2>${esc(t("aboutStoryHeading1"))} ${esc(t("aboutStoryHeading2"))}</h2><p>${esc(t("aboutStoryLead"))}</p><p>${esc(t("aboutStoryP1"))}</p><p>${esc(t("aboutStoryP2"))}</p></section>
<section><h2>${esc(t("aboutAudienceHeading1"))} ${esc(t("aboutAudienceHeading2"))}</h2><p>${esc(t("aboutAudienceIntro"))}</p><ul>${([1, 2, 3, 4, 5, 6] as const).map((n) => `<li>${esc(t(`aboutAudience${n}` as StringKey))}</li>`).join("")}</ul></section>
<section><h2>${esc(t("aboutValuesHeading1"))} ${esc(t("aboutValuesHeading2"))}</h2><p>${esc(t("aboutValuesIntro"))}</p>${([1, 2, 3] as const).map((n) => `<h3>${esc(t(`aboutValue${n}Title` as StringKey))}</h3><p>${esc(t(`aboutValue${n}Copy` as StringKey))}</p>`).join("")}</section>
<p><a href="/sustainable-supply">${esc(t("aboutCtaButton"))}</a></p>
</main>${contact()}`,
  sustainable: () => `
<header>${nav()}</header>
<main>
<h1>${esc(t("sustainHeroLine1"))} ${esc(t("sustainHeroLine2"))}</h1><p>${esc(t("sustainHeroIntro"))}</p><p>${esc(t("sustainStatement"))}</p>
<section id="principles"><h2>${esc(t("sustainIntroHeading1"))} ${esc(t("sustainIntroHeading2"))}</h2><p>${esc(t("sustainIntroLead"))}</p><p>${esc(t("sustainIntroP"))}</p></section>
<section><h2>${esc(t("sustainPrinciplesHeading1"))} ${esc(t("sustainPrinciplesHeading2"))}</h2>${([1, 2, 3, 4] as const).map((n) => `<h3>${esc(t(`sustainPrinciple${n}Title` as StringKey))}</h3><p>${esc(t(`sustainPrinciple${n}Text` as StringKey))}</p>`).join("")}</section>
<section><h2>${esc(t("sustainLoopHeading1"))} ${esc(t("sustainLoopHeading2"))}</h2><p>${esc(t("sustainLoopIntro"))}</p></section>
</main>${contact()}`,
};

function pageSchema(key: keyof typeof ROUTE_META, meta: RouteMeta) {
  const url = `${SITE_URL}${meta.path}`;
  const graph: object[] = [{
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
    dateModified: meta.lastmod,
  }];
  if (key !== "home") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: ROUTE_META.home.name, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: meta.name, item: url },
      ],
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function faqSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  });
}

function setHead(html: string, meta: { path: string; title: string; description: string }, extraHead: string, noindex = false) {
  const url = `${SITE_URL}${meta.path}`;
  const replace = (re: RegExp, value: string) => {
    if (!re.test(html)) throw new Error(`[seo-prerender] index.html is missing ${re}`);
    html = html.replace(re, value);
  };
  replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  replace(/(<meta name="description" content=")[^"]*/, `$1${esc(meta.description)}`);
  replace(/(<meta name="robots" content=")[^"]*/, `$1${noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}`);
  replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(meta.title)}`);
  replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(meta.description)}`);
  replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(meta.title)}`);
  replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(meta.description)}`);
  if (noindex) {
    replace(/\s*<link rel="canonical" href="[^"]*" \/>/, "");
    replace(/\s*<meta property="og:url" content="[^"]*" \/>/, "");
  } else {
    replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
    replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  }
  return html.replace("</head>", `${extraHead}\n  </head>`);
}

const withBody = (html: string, body: string) => html.replace('<div id="root"></div>', `<div id="root"><div class="prerender">${body}</div></div>`);

export function seoPrerender(): Plugin {
  let outDir = "";
  return {
    name: "cba-seo-prerender",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      for (const key of Object.keys(ROUTE_META) as (keyof typeof ROUTE_META)[]) {
        const meta = ROUTE_META[key];
        let extra = `    <script type="application/ld+json">${pageSchema(key, meta)}</script>`;
        // Same id Home's runtime effect uses, so it reuses this tag instead of adding a duplicate.
        if (key === "home") extra += `\n    <script type="application/ld+json" id="faq-structured-data">${faqSchema()}</script>`;
        const html = withBody(setHead(template, meta, extra), bodies[key]());
        const file = key === "home" ? "index.html" : path.join(meta.path.slice(1), "index.html");
        fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true });
        fs.writeFileSync(path.join(outDir, file), html);
      }
      const notFoundBody = `<header>${nav()}</header><main><h1>Page not found</h1><p>The page you're looking for doesn't exist. It may have been moved, or the link may be out of date.</p><p><a href="/">Back to homepage</a></p></main>`;
      fs.writeFileSync(path.join(outDir, "404.html"), withBody(setHead(template, NOT_FOUND_META, "", true), notFoundBody));

      const sitemap = fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8");
      const entries = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g), (m) => `${m[1]} ${m[2]}`);
      const expected = Object.values(ROUTE_META).map((m) => `${SITE_URL}${m.path} ${m.lastmod}`);
      if (JSON.stringify(entries) !== JSON.stringify(expected)) {
        throw new Error(`[seo-prerender] public/sitemap.xml is out of date.\n  expected: ${expected.join(", ")}\n  found:    ${entries.join(", ")}`);
      }
      this.info?.(`[seo-prerender] wrote ${Object.keys(ROUTE_META).length} routes + 404.html, sitemap.xml verified for ${SITE_NAME}`);
    },
  };
}
