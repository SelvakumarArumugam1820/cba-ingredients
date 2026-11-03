import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { NOT_FOUND_META } from "@/lib/seo";
import SiteHeader from "@/components/SiteHeader";
import FooterCredits from "@/components/FooterCredits";

const logoUrl = "/assets/cba-logo.png";

export default function NotFound() {
  useDocumentMeta({ ...NOT_FOUND_META, noindex: true });

  return <div className="site-shell"><SiteHeader variant="inner" /><main>
    <section className="notfound-section section-pad">
      <span className="section-label"><span className="label-line" />404</span>
      <h1>Page not found<br /><em>let's get you back on track.</em></h1>
      <p>The page you're looking for doesn't exist. It may have been moved, or the link may be out of date.</p>
      <Link className="button-primary" href="/">Back to homepage <ArrowUpRight size={17} /></Link>
    </section>
  </main><Footer /></div>;
}

function Footer() { return <footer className="site-footer reveal"><div className="footer-brand"><img src={logoUrl} alt="CBA Ingredients" width={512} height={512} /><div><strong>CBA Ingredients</strong><span>Food ingredients & raw materials</span></div></div><div className="footer-links"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/sustainable-supply">Sustainable supply</Link></div><div className="footer-note">© 2026 CBA Ingredients Company<br />Dammam, Saudi Arabia</div><FooterCredits /></footer>; }
