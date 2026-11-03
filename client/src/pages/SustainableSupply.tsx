/* Provenance Ledger style: sustainable supply as a measured, editorial operating manifesto with no invented certifications or unverifiable claims. */
import { motion } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, Boxes, Compass, Leaf, Link2, Recycle } from "lucide-react";
import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ROUTE_META } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import FooterCredits from "@/components/FooterCredits";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/i18n/strings";

const logoUrl = "/assets/cba-logo.png";
const bakeryUrl = "/assets/cba-bakery-spices-1280.webp";

export default function SustainableSupply() {
  const { lang } = useLanguage();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, lang);
  const ArrowIcon = lang === "ar" ? ArrowUpLeft : ArrowUpRight;
  useScrollReveal();
  useDocumentMeta(ROUTE_META.sustainable);
  const principles = [{icon: Compass, title: t("sustainPrinciple1Title"), text: t("sustainPrinciple1Text")}, {icon: Link2, title: t("sustainPrinciple2Title"), text: t("sustainPrinciple2Text")}, {icon: Boxes, title: t("sustainPrinciple3Title"), text: t("sustainPrinciple3Text")}, {icon: Recycle, title: t("sustainPrinciple4Title"), text: t("sustainPrinciple4Text")}];
  const loopNodes = [["01", t("sustainLoopNode1")], ["02", t("sustainLoopNode2")], ["03", t("sustainLoopNode3")], ["04", t("sustainLoopNode4")]];
  return <div className="site-shell"><div className="top-strip"><div className="top-strip-inner"><span>{t("topStripPartner")}</span><span className="top-strip-dot" /><span>{t("topStripTagline")}</span><a href="mailto:alimansour@cbaingredients.com">alimansour@cbaingredients.com</a></div></div><SiteHeader variant="home" active="sustainable" /><main>
    <section className="sustain-hero" data-label={t("sustainHeroTrail")}><div className="sustain-hero-copy reveal"><div className="hero-kicker"><span className="pulse-dot" /> {t("sustainKicker")}</div><h1>{t("sustainHeroLine1")}<br /><em>{t("sustainHeroLine2")}</em></h1><p>{t("sustainHeroIntro")}</p><a className="button-primary" href="#principles">{t("sustainHeroCta")} <ArrowIcon size={17} /></a></div><div className="sustain-hero-side reveal reveal-2"><div className="sustain-number">03</div><div className="sustain-statement">{t("sustainStatement")}</div><div className="sustain-line"><span /><span /><span /><span /></div></div></section>
    <section id="principles" className="sustain-intro section-pad"><div className="story-index"><span className="section-label"><span className="label-line" />{t("sustainIntroLabel")}</span><span className="aside-number">S</span></div><div className="story-copy"><h2>{t("sustainIntroHeading1")}<br /><em>{t("sustainIntroHeading2")}</em></h2><p className="lead-copy">{t("sustainIntroLead")}</p><p>{t("sustainIntroP")}</p></div><div className="sustain-photo" data-label={t("sustainPhotoTag")}><img src={bakeryUrl} alt="Spices and grains arranged for food formulation" /><span>{t("sustainPhotoLine1")}<br />{t("sustainPhotoLine2")}</span></div></section>
    <section className="principles-dark section-pad"><div className="principles-dark-head"><span className="section-label"><span className="label-line" />{t("sustainPrinciplesLabel")}</span><h2>{t("sustainPrinciplesHeading1")}<br /><em>{t("sustainPrinciplesHeading2")}</em></h2></div><div className="sustain-principles">{principles.map((item, i) => <motion.article className="sustain-principle" key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .07, duration: .4 }}><span className="principle-index">0{i + 1}</span><item.icon size={25} /><h3>{item.title}</h3><p>{item.text}</p></motion.article>)}</div></section>
    <section className="supply-loop section-pad"><div className="loop-copy"><span className="section-label"><span className="label-line" />{t("sustainLoopLabel")}</span><h2>{t("sustainLoopHeading1")}<br /><em>{t("sustainLoopHeading2")}</em></h2><p>{t("sustainLoopIntro")}</p></div><div className="loop-diagram"><div className="loop-orbit" /><div className="loop-center"><Leaf size={25} /><span>CBA<br />INGREDIENTS</span></div>{loopNodes.map(([n, label], i) => <div className={`loop-node loop-node-${i + 1}`} key={n}><b>{n}</b><span>{label}</span></div>)}</div></section>
    <section className="page-cta section-pad"><div><span className="section-label"><span className="label-line" />{t("sustainCtaLabel")}</span><h2>{t("sustainCtaHeading1")}<br /><em>{t("sustainCtaHeading2")}</em></h2></div><a className="button-primary" href="mailto:alimansour@cbaingredients.com?subject=Let%27s%20talk%20about%20supply">{t("sustainCtaButton")} <ArrowIcon size={17} /></a></section>
  </main><Footer /></div>;
}
function Footer() {
  const { lang } = useLanguage();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, lang);
  return <footer className="site-footer reveal"><div className="footer-brand"><img src={logoUrl} alt="CBA Ingredients" width={512} height={512} /><div><strong>CBA Ingredients</strong><span>{t("footerTagline")}</span></div></div><div className="footer-links"><Link href="/">{t("navHome")}</Link><Link href="/about">{t("navAbout")}</Link><Link href="/sustainable-supply">{t("navSustainable")}</Link></div><div className="footer-note">© 2026 CBA Ingredients Company<br />{t("footerLocation")}</div><FooterCredits /></footer>;
}
