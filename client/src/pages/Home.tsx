/* Provenance Ledger style: editorial B2B composition, ink navy framing, saffron gold direction, tactile ingredient imagery, restrained motion. */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowUpRight,
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
const heroUrl = "/assets/cba-hero-ingredients.webp";
const dairyUrl = "/assets/cba-dairy-icecream.webp";
const bakeryUrl = "/assets/cba-bakery-spices.webp";
const beverageUrl = "/assets/cba-beverages-juice.jpg";
const meatUrl = "/assets/cba-meat-savoury.jpg";
const saucesUrl = "/assets/cba-sauces-oils.jpg";
const snacksUrl = "/assets/cba-snacks.jpg";

const categories = [
  {
    number: "01",
    name: "Dairy & Ice Cream",
    eyebrow: "Texture · stability · indulgence",
    description:
      "Functional systems and powders for dairy, frozen desserts, cheese, and yogurt.",
    items: ["Stabilizers & custom blends", "Hydrocolloids & blends", "Carrageenan & alginate", "Whey & milk powders", "Emulsifying salts", "Natural cheese flavours"],
    image: dairyUrl,
    accent: "#C99A3D",
  },
  {
    number: "02",
    name: "Bakery & Confectionery",
    eyebrow: "Structure · lift · finish",
    description:
      "Building blocks for breads, biscuits, cakes, fillings, and confectionery.",
    items: ["Food-grade soya lecithin", "Dry baker's yeast", "Baking enzymes", "Functional starches", "Cocoa & bakery colours", "Custom bakery mixes"],
    image: bakeryUrl,
    accent: "#B66A3C",
  },
  {
    number: "03",
    name: "Beverages & Juice",
    eyebrow: "Clarity · flavour · flow",
    description:
      "Consistent flavour, colour, and mouthfeel for juices, drinks, and concentrates.",
    items: ["Beverage flavours & emulsions", "Clouding agents", "Fruit-drink stabilizers", "Natural beverage colours", "Citric & malic acids", "Caramel colour"],
    image: beverageUrl,
    accent: "#6C8D4B",
  },
  {
    number: "04",
    name: "Meat & Savoury",
    eyebrow: "Body · binding · character",
    description:
      "Functional and flavour ingredients for processed meat, poultry, and ready meals.",
    items: ["Functional soy protein", "Meat binding systems", "Phosphate blends", "Spice & seasoning blends", "Marinade hydrocolloids", "Smoke flavours"],
    image: meatUrl,
    accent: "#963F35",
  },
  {
    number: "05",
    name: "Sauces, Oils & Fats",
    eyebrow: "Emulsion · sheen · balance",
    description:
      "Ingredients for dressings, mayonnaise, sauces, marinades, and frying systems.",
    items: ["Egg-replacer emulsifiers", "Xanthan & guar gum", "Cold-swelling starches", "Vinegar & acidity regulators", "Antioxidants for oils", "Sauce seasoning blends"],
    image: saucesUrl,
    accent: "#7761A2",
  },
  {
    number: "06",
    name: "Snacks & Food Applications",
    eyebrow: "Crunch · taste · repeatability",
    description:
      "Everyday essentials and specialist raw materials for snacks, cereals, and foodservice.",
    items: ["Potato flakes & granules", "Cereal & grain flakes", "Preservatives", "Vitamins & protein powders", "Snack seasoning coatings", "Colours & flavours"],
    image: snacksUrl,
    accent: "#4F7891",
  },
];

const principles = [
  { icon: ShieldCheck, title: "Quality assured", text: "A careful portfolio built around dependable food-grade ingredients and trusted supply relationships." },
  { icon: PackageCheck, title: "Supply made clearer", text: "Straightforward sourcing, practical communication, and consistent availability across the Kingdom." },
  { icon: Sparkles, title: "Application-minded", text: "We look beyond the ingredient name to understand the product you are trying to make." },
];

const heroSlides = [
  { src: heroUrl, label: "Ingredients & raw materials" },
  ...categories.map((category) => ({ src: category.image, label: category.name })),
];

function SectionLabel({ children }: { children: string }) {
  return <div className="section-label"><span className="label-line" />{children}</div>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", duration: 26 });
  const [selectedSlide, setSelectedSlide] = useState(0);
  const carouselPaused = useRef(false);

  useScrollReveal();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  // Hero carousel: track the active slide and gently auto-advance.
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;
    if (!reduce) {
      timer = setInterval(() => {
        if (!document.hidden && !carouselPaused.current) emblaApi.scrollNext();
      }, 4200);
    }
    return () => {
      if (timer) clearInterval(timer);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectCategory = (index: number) => {
    setActiveCategory(index);
    // On stacked (mobile/tablet) layouts the product panel renders below the
    // category list, so bring it into the viewport instead of forcing a manual scroll.
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 900px)").matches) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  };

  const jumpToHomeSection = (id: string) => {
    if (window.location.pathname === "/") {
      window.history.replaceState(null, "", `/#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    window.location.assign(`/#${id}`);
  };

  return (
    <div className="site-shell">
      <div className="top-strip">
        <div className="top-strip-inner"><span>Saudi-based supply partner</span><span className="top-strip-dot" /><span>Food ingredients & raw materials</span><a href="mailto:mohammed@cbaingredients.com">mohammed@cbaingredients.com</a></div>
      </div>

      <div className="home-header-wrap">
        <header className="site-header home-header">
          <button className="brand-lockup" onClick={() => scrollTo("top")} aria-label="CBA Ingredients home">
            <span className="brand-badge"><img src={logoUrl} alt="CBA Ingredients logo" /></span>
            <span><strong>CBA</strong><small>INGREDIENTS</small></span>
          </button>
          <nav className="main-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <a href="/#categories" onClick={(event) => { event.preventDefault(); jumpToHomeSection("categories"); }}>Applications</a>
            <Link href="/sustainable-supply">Sustainable supply</Link>
            <a href="/#contact" onClick={(event) => { event.preventDefault(); jumpToHomeSection("contact"); }}>Contact</a>
            <a className="nav-cta" href="mailto:mohammed@cbaingredients.com?subject=Ingredient enquiry">Start an enquiry <ArrowUpRight size={16} /></a>
          </nav>
        </header>
      </div>

      <main id="top">
        <section className="lux-hero">
          <div className="lux-hero-inner">
            <div className="lux-hero-copy">
              <div className="lux-eyebrow"><span className="pulse-dot" /> CBA Ingredient Company <span className="lux-eyebrow-rule" /> Saudi Arabia</div>
              <h1 className="lux-title">Your trusted partner<span>for food ingredients &amp; chemicals</span></h1>
              <p className="lux-tagline">&ldquo;Connecting Ingredients. Powering Possibilities.&rdquo;</p>
              <p className="lux-sub">Reliable local sourcing and supply solutions for food manufacturers, restaurants, chain restaurants, caf&eacute;s, bakeries, beverage businesses and more.</p>
              <div className="lux-badges">
                <span className="lux-badge"><MapPin size={14} /> Local sourcing</span>
                <span className="lux-badge"><Truck size={14} /> Reliable supply</span>
                <span className="lux-badge"><Award size={14} /> Quality ingredients</span>
                <span className="lux-badge"><Headset size={14} /> Responsive service</span>
              </div>
              <div className="lux-cta">
                <button className="btn-gold" onClick={() => scrollTo("categories")}>Explore our ingredients <ArrowUpRight size={17} /></button>
                <button className="btn-ghost" onClick={() => scrollTo("contact")}>Talk to CBA</button>
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
                    {heroSlides.map((slide, index) => (
                      <div className="hero-slide" key={slide.src + index}>
                        <img
                          src={slide.src}
                          alt={slide.label}
                          draggable={false}
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "auto"}
                        />
                        <span className="hero-slide-label">{slide.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hero-carousel-dots" role="tablist" aria-label="Hero images">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.src + index}
                      type="button"
                      role="tab"
                      aria-selected={index === selectedSlide}
                      aria-label={`Show ${slide.label}`}
                      className={index === selectedSlide ? "is-active" : ""}
                      onClick={() => emblaApi?.scrollTo(index)}
                    />
                  ))}
                </div>
                <span className="lux-frame-tag"><span className="pulse-dot" /> Saudi-based supply partner</span>
              </div>
            </div>
          </div>
        </section>

        <section className="segments-band">
          <div className="segments-inner">
            <p className="segments-head reveal">We supply ingredients to every food business</p>
            <div className="segments-grid">
              {[
                { icon: Utensils, label: "Restaurants" },
                { icon: Building2, label: "Chain Restaurants" },
                { icon: Coffee, label: "Coffee Shops" },
                { icon: Sandwich, label: "Fast Food Outlets" },
                { icon: Hotel, label: "Hotels" },
                { icon: ChefHat, label: "Catering Services" },
                { icon: Bike, label: "Cloud Kitchens & Delivery Brands" },
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

        <section id="about" className="intro-section section-pad">
          <div className="intro-aside reveal"><SectionLabel>01 / THE CBA DIFFERENCE</SectionLabel><div className="aside-number">01</div></div>
          <div className="intro-content reveal reveal-2"><h2>The ingredient is only the beginning.</h2><p className="lead-copy">CBA Ingredients brings together quality, availability, and practical service for businesses that take food seriously.</p><p>From everyday essentials to specialized raw materials, we help dairy producers, bakeries, restaurant groups, cafés, caterers, and food-service teams source with less friction and more confidence. Our portfolio is selected to support real applications — not just fill a catalogue.</p><button className="underlined-link" onClick={() => scrollTo("approach")}>See how we work <ArrowUpRight size={16} /></button></div>
          <div className="intro-quote reveal reveal-3"><span className="quote-mark">“</span><p>Dependable supply is not an extra. It is part of the recipe.</p><small>— CBA Ingredients</small></div>
        </section>

        <section id="categories" className="category-section section-pad">
          <div className="category-heading reveal"><div><SectionLabel>02 / WHAT WE SUPPLY</SectionLabel><h2>Ingredients with<br /><em>an application in mind.</em></h2></div><p>A B2B raw material supplier for food manufacturers across Saudi Arabia. Select a category to see what we stock.</p></div>
          <div className="category-layout">
            <div className="category-list">{categories.map((category, index) => <button key={category.name} className={`category-row ${activeCategory === index ? "active" : ""}`} onClick={() => selectCategory(index)} aria-pressed={activeCategory === index}><span className="category-number">{category.number}</span><span className="category-name">{category.name}</span><span className="category-arrow"><ArrowUpRight size={18} /></span></button>)}</div>
            <motion.div ref={detailRef} id="category-detail" key={activeCategory} className="category-detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}><div className="category-image"><img src={categories[activeCategory].image} alt={categories[activeCategory].name} /><span style={{ backgroundColor: categories[activeCategory].accent }}>{categories[activeCategory].number}</span></div><div className="category-detail-copy"><span className="category-eyebrow">{categories[activeCategory].eyebrow}</span><h3>{categories[activeCategory].name}</h3><p>{categories[activeCategory].description}</p><div className="ingredient-chips">{categories[activeCategory].items.map(item => <span key={item}>{item}</span>)}</div><div className="category-cta"><a className="button-primary" href={`mailto:mohammed@cbaingredients.com?subject=${encodeURIComponent(`Enquiry: ${categories[activeCategory].name}`)}`}>Request a quote <ArrowUpRight size={16} /></a><a className="category-cta-call" href="tel:+966508465636"><Phone size={15} /> +966 50 846 5636</a></div></div></motion.div>
          </div>
        </section>

        <section id="approach" className="approach-section section-pad"><div className="approach-head reveal"><SectionLabel>03 / WHY CBA</SectionLabel><h2>Good supply has<br /><em>a human side.</em></h2><p>We keep the process uncomplicated so your team can keep moving — from first conversation to repeat delivery.</p></div><div className="principles-grid">{principles.map((principle, index) => <motion.article key={principle.title} className="principle-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}><span className="principle-index">0{index + 1}</span><principle.icon size={25} strokeWidth={1.4} /><h3>{principle.title}</h3><p>{principle.text}</p></motion.article>)}</div><div className="approach-banner reveal"><div><span className="banner-kicker">A PARTNER FOR THE LONG RUN</span><h3>Source with confidence.<br />Make with intent.</h3></div><button className="button-light" onClick={() => scrollTo("contact")}>Start a conversation <ArrowUpRight size={17} /></button></div></section>

        <section id="contact" className="contact-section section-pad"><div className="contact-intro reveal"><SectionLabel>04 / FIND US</SectionLabel><h2>Let’s make<br /><em>something better.</em></h2><p>Tell us what you are sourcing, formulating, or trying to improve. Mohammed will get back to you directly.</p><a className="contact-email" href="mailto:mohammed@cbaingredients.com">mohammed@cbaingredients.com <ArrowUpRight size={18} /></a></div><div className="contact-card reveal reveal-2"><div className="contact-card-top"><span className="contact-card-label">CBA INGREDIENTS COMPANY</span><MapPin size={22} /></div><div className="address-block"><h3>Saudi National Address</h3><p>Building 5283, King Fahad ibn Abdulaziz Rd<br />1st Industrial District<br />Dammam 32234<br />Kingdom of Saudi Arabia</p></div><div className="address-meta"><span><small>Short address</small><strong>EDGA5283</strong></span><span><small>Contact</small><a href="tel:+966508465636">+966 50 846 5636</a></span></div><div className="contact-card-bottom"><span>Available for business enquiries</span><span className="gold-dot" /></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><img src={logoUrl} alt="CBA Ingredients" /><div><strong>CBA Ingredients</strong><span>Food ingredients & raw materials</span></div></div><div className="footer-links"><Link href="/about">About</Link><button onClick={() => scrollTo("categories")}>Applications</button><Link href="/sustainable-supply">Sustainable supply</Link><button onClick={() => scrollTo("contact")}>Contact</button></div><div className="footer-note">© 2026 CBA Ingredients Company<br />Dammam, Saudi Arabia</div></footer>
    </div>
  );
}
