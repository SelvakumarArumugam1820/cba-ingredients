/* Provenance Ledger style: company story as an editorial dossier with ink navy structure, saffron route markers, and calm reveal motion. */
import { motion } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Check, Globe2, MapPin, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ROUTE_META } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import FooterCredits from "@/components/FooterCredits";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/i18n/strings";

const logoUrl = "/assets/cba-logo.png";
const heroUrl = "/assets/cba-hero-ingredients-1280.webp";

export default function About() {
  const { lang } = useLanguage();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, lang);
  const ArrowIcon = lang === "ar" ? ArrowUpLeft : ArrowUpRight;
  useScrollReveal();
  useDocumentMeta(ROUTE_META.about);
  const audience = [t("aboutAudience1"), t("aboutAudience2"), t("aboutAudience3"), t("aboutAudience4"), t("aboutAudience5"), t("aboutAudience6")];
  const values = [{icon: Globe2, title: t("aboutValue1Title"), copy: t("aboutValue1Copy")}, {icon: Sparkles, title: t("aboutValue2Title"), copy: t("aboutValue2Copy")}, {icon: Check, title: t("aboutValue3Title"), copy: t("aboutValue3Copy")}];
  return <div className="site-shell"><div className="top-strip"><div className="top-strip-inner"><span>{t("topStripPartner")}</span><span className="top-strip-dot" /><span>{t("topStripTagline")}</span><a href="mailto:alimansour@cbaingredients.com">alimansour@cbaingredients.com</a></div></div><SiteHeader variant="home" active="about" /><main>
    <section className="inner-hero" data-label={t("aboutHeroTrail")}><div className="inner-hero-copy reveal"><div className="hero-kicker"><span className="pulse-dot" /> {t("aboutKicker")}</div><h1>{t("aboutHeroLine1")}<br /><em>{t("aboutHeroLine2")}</em></h1><p>{t("aboutHeroIntro")}</p><div className="hero-proof"><div className="proof-mark"><MapPin size={17} /></div><div><strong>{t("aboutProofTitle")}</strong><span>{t("aboutProofSub")}</span></div></div></div><div className="inner-hero-image reveal reveal-2"><img src={heroUrl} alt="Food ingredients arranged for formulation" /><div className="image-caption">CBA / 2026<br />{t("aboutImageCaption")}</div></div></section>
    <section className="about-story section-pad"><div className="story-index"><span className="section-label"><span className="label-line" />{t("aboutStoryLabel")}</span><span className="aside-number">A</span></div><div className="story-copy"><h2>{t("aboutStoryHeading1")}<br /><em>{t("aboutStoryHeading2")}</em></h2><p className="lead-copy">{t("aboutStoryLead")}</p><p>{t("aboutStoryP1")}</p><p>{t("aboutStoryP2")}</p></div><div className="story-aside"><div className="story-aside-line" /><p>{t("aboutQuote")}</p><small>{t("aboutQuoteSource")}</small></div></section>
    <section className="audience-section"><div className="section-pad"><div className="audience-head"><div><span className="section-label"><span className="label-line" />{t("aboutAudienceLabel")}</span><h2>{t("aboutAudienceHeading1")}<br /><em>{t("aboutAudienceHeading2")}</em></h2></div><p>{t("aboutAudienceIntro")}</p></div><div className="audience-grid">{audience.map((item, i) => <motion.div key={i} className="audience-item" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06, duration: .35 }}><span>0{i + 1}</span><p>{item}</p><ArrowIcon size={17} /></motion.div>)}</div></div></section>
    <section className="about-values section-pad"><span className="section-label"><span className="label-line" />{t("aboutValuesLabel")}</span><div className="values-layout"><div><h2>{t("aboutValuesHeading1")}<br /><em>{t("aboutValuesHeading2")}</em></h2><p>{t("aboutValuesIntro")}</p></div><div className="values-list">{values.map((value, i) => <motion.div className="value-row" key={i} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08, duration: .35 }}><value.icon size={22} /><div><h3>{value.title}</h3><p>{value.copy}</p></div><span>0{i + 1}</span></motion.div>)}</div></div></section>
    <section className="page-cta section-pad"><div><span className="section-label"><span className="label-line" />{t("aboutCtaLabel")}</span><h2>{t("aboutCtaHeading1")}<br /><em>{t("aboutCtaHeading2")}</em></h2></div><Link className="button-primary" href="/sustainable-supply">{t("aboutCtaButton")} <ArrowIcon size={17} /></Link></section>
  </main><Footer /></div>;
}

function Footer() {
  const { lang } = useLanguage();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, lang);
  return <footer className="site-footer reveal"><div className="footer-brand"><img src={logoUrl} alt="CBA Ingredients" width={512} height={512} /><div><strong>CBA Ingredients</strong><span>{t("footerTagline")}</span></div></div><div className="footer-links"><Link href="/">{t("navHome")}</Link><Link href="/about">{t("navAbout")}</Link><Link href="/sustainable-supply">{t("navSustainable")}</Link></div><div className="footer-note">© 2026 CBA Ingredients Company<br />{t("footerLocation")}</div><FooterCredits /></footer>;
}
