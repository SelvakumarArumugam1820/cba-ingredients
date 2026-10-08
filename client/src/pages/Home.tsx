/* Provenance Ledger style: editorial B2B composition, ink navy framing, saffron gold direction, tactile ingredient imagery, restrained motion. */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SiteHeader from "@/components/SiteHeader";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { translate, type StringKey } from "@/i18n/strings";
import { categories, type Category } from "@/data/catalogue";
import {
  ArrowUpRight,
  ArrowUpLeft,
  Award,
  Bike,
  Building2,
  ChefHat,
  Coffee,
  Headset,
  Hotel,
  MapPin,
  PackageCheck,
  Phone,
  Sandwich,
  ShieldCheck,
  Sparkles,
  Truck,
  Utensils,
} from "lucide-react";

const logoUrl = "/assets/cba-logo.png";

function SectionLabel({ children }: { children: string }) {
  return <div className="section-label"><span className="label-line" />{children}</div>;
}

/** One clickable, image-first category tile. Categories without a supplied photo render an icon tile instead. */
function CategoryCard({ category, lang, onOpen }: { category: Category; lang: Lang; onOpen: () => void }) {
  return (
    <button className="category-card" onClick={onOpen} style={{ "--card-accent": category.accent } as CSSProperties}>
      <span className="category-card-media">
        {category.image ? (
          <img src={category.image} alt={category.name[lang]} loading="lazy" />
        ) : (
          <category.icon size={38} strokeWidth={1.3} />
        )}
      </span>
      <span className="category-card-overlay">
        <span className="category-card-name">{category.name[lang]}</span>
        <span className="category-card-sub">{category.shortText[lang]}</span>
      </span>
      <span className="category-card-cta">{translate("viewProducts", lang)} {lang === "ar" ? <ArrowUpLeft size={14} /> : <ArrowUpRight size={14} />}</span>
    </button>
  );
}

/** Category detail modal: image, short description, products, and subsections. */
function CategoryDetailModal({ category, lang, onClose }: { category: Category | null; lang: Lang; onClose: () => void }) {
  const ArrowIcon = lang === "ar" ? ArrowUpLeft : ArrowUpRight;
  return (
    <Dialog open={category !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="category-modal">
        {category && (
          <>
            <span className="category-modal-media" style={{ "--card-accent": category.accent } as CSSProperties}>
              {category.image ? <img src={category.image} alt={category.name[lang]} /> : <category.icon size={44} strokeWidth={1.2} />}
            </span>
            <DialogHeader>
              <DialogTitle className="category-modal-title">{category.name[lang]}</DialogTitle>
              <DialogDescription className="category-modal-desc">{category.description[lang]}</DialogDescription>
            </DialogHeader>

            {category.availabilityNote && <p className="category-modal-availability">{category.availabilityNote[lang]}</p>}

            {/* Main products list */}
            {category.products && category.products.length > 0 && (
              <div className="category-modal-products">
                {category.products.map((product, index) => (
                  <span key={product.en} className="category-modal-chip" style={{ animationDelay: `${Math.min(index, 10) * 28}ms` }}>{product[lang]}</span>
                ))}
              </div>
            )}

            {/* Subsections */}
            {category.subSections && category.subSections.length > 0 && (
              <div className="category-modal-subsections">
                {category.subSections.map((sub) => (
                  <div key={sub.id} className="category-modal-subsection">
                    <h4 className="subsection-title">{sub.name[lang]}</h4>
                    <div className="category-modal-products">
                      {sub.products.map((product, index) => (
                        <span key={product.en} className="category-modal-chip subsection-chip" style={{ animationDelay: `${Math.min(index, 10) * 28}ms` }}>{product[lang]}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Spec-sheet style detailed groups: packing size + origin per item */}
            {category.detailedGroups && category.detailedGroups.length > 0 && (
              <div className="category-modal-detailed-groups">
                {category.detailedGroups.map((group) => (
                  <div key={group.id} className="detailed-group">
                    <h4 className="subsection-title">{group.name[lang]}</h4>
                    <div className="detailed-product-list">
                      {group.items.map((item, index) => (
                        <div key={item.name.en} className="detailed-product-card" style={{ animationDelay: `${Math.min(index, 10) * 28}ms` }}>
                          <div className="detailed-product-name">
                            {item.name[lang]}
                            {item.equivalent && <span className="detailed-product-equivalent">{item.equivalent[lang]}</span>}
                          </div>
                          <div className="detailed-product-meta">
                            <span><small>{translate("packingSizeLabel", lang)}</small>{item.packingSize[lang]}</span>
                            <span><small>{translate("originLabel", lang)}</small>{item.origin[lang]}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {category.note && <p className="category-modal-note">{category.note[lang]}</p>}

            <DialogFooter className="category-modal-footer">
              <a className="button-primary" href={`mailto:mohammed@cbaingredients.com?subject=${encodeURIComponent(`Enquiry: ${category.name.en}`)}`}>{translate("requestQuote", lang)} <ArrowIcon size={16} /></a>
              <a className="category-cta-call" href="tel:+966508465636"><Phone size={15} /> <bdi>+966 50 846 5636</bdi></a>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const t = (key: StringKey) => translate(key, lang);
  const ArrowIcon = lang === "ar" ? ArrowUpLeft : ArrowUpRight;

  // Real, derived-from-data numbers for the "at a glance" stat strip — not invented claims.
  const dairyProductCount = categories.find((category) => category.id === "dairy")?.products?.length ?? 0;

  const principles = [
    { icon: ShieldCheck, title: t("principleQualityTitle"), text: t("principleQualityText") },
    { icon: PackageCheck, title: t("principleSupplyTitle"), text: t("principleSupplyText") },
    { icon: Sparkles, title: t("principleApplicationTitle"), text: t("principleApplicationText") },
  ];

  // Hero carousel: a brief logo intro, then every approved category exactly
  // once, in catalogue order. Categories without a supplied photo yet (e.g.
  // Pharmaceutical and cosmetic products) fall back to an icon tile instead
  // of being skipped, so every approved category is represented.
  type HeroSlide = { kind: "logo" } | { kind: "category"; category: Category };
  const heroSlides: HeroSlide[] = [{ kind: "logo" }, ...categories.map((category) => ({ kind: "category" as const, category }))];
  const LOGO_SLIDE_MS = 3000;
  const CATEGORY_SLIDE_MS = 4500;
  // Matches the splash screen's own fixed 1.5s hold + 450ms fade-out (not
  // imported — the splash is approved as-is and never touched by this file).
  const SPLASH_SYNC_MS = 1950;

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const openCategory = categories.find((category) => category.id === openCategoryId) ?? null;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", duration: 26, direction: lang === "ar" ? "rtl" : "ltr" });
  const [selectedSlide, setSelectedSlide] = useState(0);
  const carouselPaused = useRef(false);
  // The logo slide's autoplay timer starts counting from mount, same as the
  // splash screen's own timer — so without this offset, most of its dwell
  // time would silently elapse while still hidden behind the opaque splash.
  // Added once, only to the very first timer, not on later loop-arounds.
  const splashSyncDelayUsed = useRef(false);

  useScrollReveal();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  // Scroll-spy: keep the nav's active-link state in sync with which anchor
  // section the visitor has actually scrolled to, instead of leaving "Home"
  // permanently highlighted while they're reading Applications or Contact.
  const [activeSection, setActiveSection] = useState<"home" | "applications" | "contact">("home");
  useEffect(() => {
    const categoriesEl = document.getElementById("categories");
    const contactEl = document.getElementById("contact");
    const sections: { id: "applications" | "contact"; el: HTMLElement }[] = [];
    if (categoriesEl) sections.push({ id: "applications", el: categoriesEl });
    if (contactEl) sections.push({ id: "contact", el: contactEl });

    let ticking = false;
    const updateActiveSection = () => {
      ticking = false;
      const threshold = Math.max(120, window.innerHeight * 0.35);
      let current: "home" | "applications" | "contact" = "home";
      for (const { id, el } of sections) {
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length > 0) current = sections[sections.length - 1].id;
      setActiveSection(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Hero carousel: track the active slide so content/dots stay in sync.
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Auto-advance with a per-slide dwell time (brief intro, longer per category
  // so there's time to read), re-armed whenever the active slide changes —
  // whether from autoplay itself, a dot click, or a manual swipe.
  useEffect(() => {
    if (!emblaApi) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let duration = heroSlides[selectedSlide]?.kind === "logo" ? LOGO_SLIDE_MS : CATEGORY_SLIDE_MS;
    if (selectedSlide === 0 && !splashSyncDelayUsed.current) {
      duration += SPLASH_SYNC_MS;
      splashSyncDelayUsed.current = true;
    }
    const timer = window.setTimeout(() => {
      if (!document.hidden && !carouselPaused.current) emblaApi.scrollNext();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [emblaApi, selectedSlide]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="site-shell">
      <div className="top-strip">
        <div className="top-strip-inner"><span>{t("topStripPartner")}</span><span className="top-strip-dot" /><span>{t("topStripTagline")}</span><a href="mailto:mohammed@cbaingredients.com">mohammed@cbaingredients.com</a></div>
      </div>

      <SiteHeader variant="home" active={activeSection} />

      <main id="top">
        {/* ─── HERO ─── */}
        <section className="lux-hero">
          <div className="lux-hero-inner">
            <div className="lux-hero-copy">
              <div className="lux-eyebrow"><span className="pulse-dot" /> {t("heroEyebrowCompany")} <span className="lux-eyebrow-rule" /> {t("heroEyebrowCountry")}</div>
              <h1 className="lux-title">{t("heroTitle")}</h1>
              <p className="lux-partner-lines">
                <span className="lux-partner-line lux-partner-line--gold">{t("heroSourcingPartner")}</span>
                <span className="lux-partner-line lux-partner-line--white">{t("heroSupplyPartner")}</span>
              </p>
              <p className="lux-tagline">{t("heroTagline")}</p>
              <div className="lux-b2b">
                <span className="lux-b2b-label">{t("heroB2BLabel")}</span>
                <p className="lux-b2b-heading">{t("heroB2BHeading")}</p>
              </div>
              <p className="lux-sub">{t("heroSubBenefit")}</p>
              <div className="lux-badges">
                <span className="lux-badge"><MapPin size={14} /> {t("badgeLocalSourcing")}</span>
                <span className="lux-badge"><Truck size={14} /> {t("badgeReliableSupply")}</span>
                <span className="lux-badge"><Award size={14} /> {t("badgeQualityIngredients")}</span>
                <span className="lux-badge"><Headset size={14} /> {t("badgeResponsiveService")}</span>
              </div>
              <div className="lux-cta">
                <button className="btn-gold" onClick={() => scrollTo("categories")}>{t("ctaExplore")} <ArrowIcon size={17} /></button>
                <button className="btn-ghost" onClick={() => scrollTo("contact")}>{t("ctaTalk")}</button>
              </div>
            </div>
            <div className="lux-hero-media">
              <div
                className="lux-frame"
                onMouseEnter={() => { carouselPaused.current = true; }}
                onMouseLeave={() => { carouselPaused.current = false; }}
              >
                <div className="hero-carousel" ref={emblaRef}>
                  <div className="hero-carousel-track">
                    {heroSlides.map((slide, index) => {
                      const key = slide.kind === "logo" ? "logo" : slide.category.id;
                      const isActive = index === selectedSlide;
                      return (
                        <div className={`hero-slide ${slide.kind === "logo" ? "hero-slide-logo" : ""} ${isActive ? "is-active" : ""}`} key={key}>
                          {slide.kind === "logo" ? (
                            <div className="hero-slide-logo-stage">
                              <img src={logoUrl} alt="CBA Ingredients" className="hero-slide-logo-img" draggable={false} loading="eager" fetchPriority="high" />
                            </div>
                          ) : slide.category.image ? (
                            <img
                              src={slide.category.image}
                              alt={slide.category.name[lang]}
                              draggable={false}
                              loading={index <= 1 ? "eager" : "lazy"}
                              fetchPriority={index <= 1 ? "high" : "auto"}
                            />
                          ) : (
                            <div className="hero-slide-icon-fallback" style={{ "--card-accent": slide.category.accent } as CSSProperties}>
                              <slide.category.icon size={56} strokeWidth={1.1} />
                            </div>
                          )}
                          {slide.kind === "category" && (
                            <div className="hero-slide-content">
                              <span className="hero-slide-title">{slide.category.name[lang]}</span>
                              <span className="hero-slide-sub">{slide.category.shortText[lang]}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="hero-carousel-dots" role="tablist" aria-label="Hero images">
                  {heroSlides.map((slide, index) => {
                    const key = slide.kind === "logo" ? "logo" : slide.category.id;
                    const label = slide.kind === "logo" ? "CBA Ingredients" : slide.category.name[lang];
                    return (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={index === selectedSlide}
                        aria-label={`Show ${label}`}
                        className={index === selectedSlide ? "is-active" : ""}
                        onClick={() => emblaApi?.scrollTo(index)}
                      />
                    );
                  })}
                </div>
                <span className="lux-frame-tag"><span className="pulse-dot" /> {t("frameTag")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SEGMENTS BAND ─── */}
        <section className="segments-band">
          <div className="segments-inner">
            <p className="segments-head reveal">{t("segmentsHeading")}</p>
            <div className="segments-grid">
              {[
                { icon: Utensils, label: t("segRestaurants") },
                { icon: Building2, label: t("segChainRestaurants") },
                { icon: Coffee, label: t("segCoffeeShops") },
                { icon: Sandwich, label: t("segFastFood") },
                { icon: Hotel, label: t("segHotels") },
                { icon: ChefHat, label: t("segCatering") },
                { icon: Bike, label: t("segCloudKitchens") },
              ].map((seg, index) => (
                <motion.div
                  className="segment-card"
                  key={seg.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span className="seg-ic"><seg.icon size={22} strokeWidth={1.5} /></span>
                  <span>{seg.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 01 / THE CBA DIFFERENCE ─── */}
        <section id="about" className="intro-section section-pad">
          <div className="intro-aside reveal"><SectionLabel>{t("introLabel")}</SectionLabel><div className="aside-number">01</div></div>
          <div className="intro-content reveal reveal-2">
            <h2>{t("introHeading")}</h2>
            <p className="lead-copy">{t("introLead")}</p>
            <div className="intro-stats">
              <div className="intro-stat"><strong>{categories.length}</strong><span>{t("introStatCategoriesLabel")}</span></div>
              <div className="intro-stat"><strong>{dairyProductCount}</strong><span>{t("introStatDairyLabel")}</span></div>
              <div className="intro-stat intro-stat--text"><strong>{t("introStatLocation")}</strong><span>{t("introStatLocationLabel")}</span></div>
            </div>
            <button className="underlined-link" onClick={() => scrollTo("approach")}>{t("introLink")} <ArrowIcon size={16} /></button>
          </div>
          <div className="intro-quote reveal reveal-3"><span className="quote-mark">&ldquo;</span><p>{t("introQuote")}</p><small>{t("introQuoteAttribution")}</small></div>
        </section>

        {/* ─── EXPERIENCE & EXPERTISE ─── */}
        <section id="expertise" className="expertise-section section-pad">
          <div className="expertise-header reveal">
            <SectionLabel>{t("expLabel")}</SectionLabel>
            <h2>{t("expHeading")}</h2>
          </div>

          <div className="expertise-grid-layout">
            <div className="expertise-narrative reveal reveal-2">
              <p className="lead-copy">{t("expP1")}</p>
              <p>{t("expP2")}</p>
              <p>{t("expP3")}</p>
            </div>

            <div className="expertise-cards-wrap reveal reveal-3">
              <h3 className="expertise-subheading">{t("expSubheading")}</h3>
              <div className="expertise-cards-grid">
                {[
                  { icon: PackageCheck, text: t("expPoint1"), num: "01" },
                  { icon: ShieldCheck, text: t("expPoint2"), num: "02" },
                  { icon: Truck, text: t("expPoint3"), num: "03" },
                  { icon: Award, text: t("expPoint4"), num: "04" },
                  { icon: Headset, text: t("expPoint5"), num: "05" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="expertise-card"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <span className="expertise-card-icon"><item.icon size={20} strokeWidth={1.5} /></span>
                    <span className="expertise-card-text">{item.text}</span>
                    <span className="expertise-card-num">{item.num}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="expertise-footer-note reveal">
            <div className="expertise-footer-inner">
              <span className="gold-dot" />
              <p>{t("expFinalP")}</p>
            </div>
          </div>
        </section>

        {/* ─── 02 / CATEGORIES ─── */}
        <section id="categories" className="category-section section-pad">
          <div className="category-heading reveal"><div><SectionLabel>{t("categoriesLabel")}</SectionLabel><h2>{t("categoriesHeadingLine1")}<br /><em>{t("categoriesHeadingLine2")}</em></h2></div><p>{t("categoriesIntro")}</p></div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <CategoryCard category={category} lang={lang} onOpen={() => setOpenCategoryId(category.id)} />
              </motion.div>
            ))}
          </div>
        </section>

        <CategoryDetailModal category={openCategory} lang={lang} onClose={() => setOpenCategoryId(null)} />

        {/* ─── 03 / WHY CBA ─── */}
        <section id="approach" className="approach-section section-pad"><div className="approach-head reveal"><SectionLabel>{t("approachLabel")}</SectionLabel><h2>{t("approachHeadingLine1")}<br /><em>{t("approachHeadingLine2")}</em></h2><p>{t("approachIntro")}</p></div><div className="principles-grid">{principles.map((principle, index) => <motion.article key={principle.title} className="principle-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}><span className="principle-index">0{index + 1}</span><principle.icon size={25} strokeWidth={1.4} /><h3>{principle.title}</h3><p>{principle.text}</p></motion.article>)}</div><div className="approach-banner reveal"><div><span className="banner-kicker">{t("bannerKicker")}</span><h3>{t("bannerHeadingLine1")}<br />{t("bannerHeadingLine2")}</h3></div><button className="button-light" onClick={() => scrollTo("contact")}>{t("startConversation")} <ArrowIcon size={17} /></button></div></section>

        {/* ─── 04 / CONTACT ─── */}
        <section id="contact" className="contact-section section-pad"><div className="contact-intro reveal"><SectionLabel>{t("contactLabel")}</SectionLabel><h2>{t("contactHeadingLine1")}<br /><em>{t("contactHeadingLine2")}</em></h2><p>{t("contactIntro")}</p><a className="contact-email" href="mailto:mohammed@cbaingredients.com">mohammed@cbaingredients.com <ArrowIcon size={18} /></a></div><div className="contact-card reveal reveal-2"><div className="contact-card-top"><span className="contact-card-label">CBA INGREDIENTS COMPANY</span><MapPin size={22} /></div><div className="address-block"><h3>{t("addressHeading")}</h3><p>Building 5283, King Fahad ibn Abdulaziz Rd<br />1st Industrial District<br />Dammam 32234<br />Kingdom of Saudi Arabia</p></div><div className="address-meta"><span><small>{t("shortAddress")}</small><strong>EDGA5283</strong></span><span><small>{t("contactLabelSmall")}</small><a href="tel:+966508465636"><bdi>+966 50 846 5636</bdi></a></span></div><div className="contact-card-bottom"><span>{t("availableForEnquiries")}</span><span className="gold-dot" /></div></div></section>
      </main>

      <footer className="site-footer reveal"><div className="footer-brand"><img src={logoUrl} alt="CBA Ingredients" /><div><strong>CBA Ingredients</strong><span>{t("footerTagline")}</span></div></div><div className="footer-links"><Link href="/about">{t("navAbout")}</Link><button onClick={() => scrollTo("categories")}>{t("navApplications")}</button><Link href="/sustainable-supply">{t("navSustainable")}</Link><button onClick={() => scrollTo("contact")}>{t("navContact")}</button></div><div className="footer-note">© 2026 CBA Ingredients Company<br />{t("footerLocation")}</div></footer>
    </div>
  );
}
