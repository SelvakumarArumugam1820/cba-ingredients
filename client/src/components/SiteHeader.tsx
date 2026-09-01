import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";

const logoUrl = "/assets/cba-logo.png";
const ENQUIRY_HREF = "mailto:mohammed@cbaingredients.com?subject=Ingredient enquiry";

type SiteHeaderProps = {
  /** "home" gets the dark navy shelf; "inner" gets the light page header. */
  variant?: "home" | "inner";
  /** Which nav item to mark as the current page. */
  active?: "home" | "about" | "sustainable";
};

export default function SiteHeader({ variant = "inner", active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

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

      <nav id="primary-nav" className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
        <Link href="/" className={active === "home" ? "active-page" : undefined} onClick={close}>Home</Link>
        <Link href="/about" className={active === "about" ? "active-page" : undefined} onClick={close}>About</Link>
        <a href="/#categories" onClick={goToSection("categories")}>Applications</a>
        <Link href="/sustainable-supply" className={active === "sustainable" ? "active-page" : undefined} onClick={close}>Sustainable supply</Link>
        <a href="/#contact" onClick={goToSection("contact")}>Contact</a>
        <a className="nav-cta" href={ENQUIRY_HREF} onClick={close}>Start an enquiry <ArrowUpRight size={16} /></a>
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
