import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ArrowUpLeft, Languages, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/i18n/strings";

const logoUrl = "/assets/cba-logo.png";
const ENQUIRY_HREF = "mailto:mohammed@cbaingredients.com?subject=Ingredient enquiry";

type SiteHeaderProps = {
  /** "home" gets the dark navy shelf; "inner" gets the light page header. */
  variant?: "home" | "inner";
  /** Which nav item to mark as current. On the home page this updates as the
   *  visitor scrolls past the Applications/Contact anchor sections. */
  active?: "home" | "about" | "sustainable" | "applications" | "contact";
};

export default function SiteHeader({ variant = "inner", active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { lang, setLang } = useLanguage();
  const t = (key: Parameters<typeof translate>[0]) => translate(key, lang);
  const ArrowIcon = lang === "ar" ? ArrowUpLeft : ArrowUpRight;

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // While the menu is open: lock body scroll and allow Escape to close it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Auto-close if the viewport grows back to desktop width.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const close = () => setMenuOpen(false);

  const goToSection = (id: string) => (event: MouseEvent) => {
    close();
    // On the home page, intercept and smooth-scroll. Elsewhere let the browser
    // follow "/#id" — Home scrolls to the hash target on mount.
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", `/#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onBrandClick = (event: MouseEvent) => {
    close();
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const header = (
    <header className={`site-header ${variant === "home" ? "home-header" : "page-header"}`}>
      <Link href="/" className="brand-lockup" aria-label="CBA Ingredients home" onClick={onBrandClick}>
        <span className="brand-badge"><img src={logoUrl} alt="CBA Ingredients logo" /></span>
        <span><strong>CBA</strong><small>INGREDIENTS</small></span>
      </Link>

      {/* Mobile-only controls: a one-tap language toggle beside the hamburger,
          so switching language never requires opening the menu. Wrapped
          together so the header's space-between layout keeps them paired on
          the right edge instead of splitting them apart. The full EN |
          العربية switcher further down stays inside the dropdown for
          desktop/tablet. */}
      <div className="mobile-header-actions">
        <button
          type="button"
          className="mobile-lang-toggle"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
        >
          <Languages size={15} />
          {lang === "en" ? "AR" : "EN"}
        </button>

        <button
          type="button"
          className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav id="primary-nav" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
        <Link href="/" className={active === "home" ? "active-page" : undefined} onClick={close}>{t("navHome")}</Link>
        <Link href="/about" className={active === "about" ? "active-page" : undefined} onClick={close}>{t("navAbout")}</Link>
        <a href="/#categories" className={active === "applications" ? "active-page" : undefined} onClick={goToSection("categories")}>{t("navApplications")}</a>
        <Link href="/sustainable-supply" className={active === "sustainable" ? "active-page" : undefined} onClick={close}>{t("navSustainable")}</Link>
        <a href="/#contact" className={active === "contact" ? "active-page" : undefined} onClick={goToSection("contact")}>{t("navContact")}</a>
        <div className="lang-switch" role="group" aria-label="Language">
          <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>EN</button>
          <span className="lang-switch-divider" aria-hidden="true">|</span>
          <button type="button" className={lang === "ar" ? "is-active" : ""} onClick={() => setLang("ar")}>العربية</button>
        </div>
        <a className="nav-cta" href={ENQUIRY_HREF} onClick={close}>{t("navEnquiry")} <ArrowIcon size={16} /></a>
      </nav>
    </header>
  );

  const backdrop = menuOpen ? <div className="nav-backdrop" role="presentation" onClick={close} /> : null;

  return (
    <>
      {variant === "home" ? <div className="home-header-wrap">{header}</div> : header}
      {backdrop}
    </>
  );
}
