/**
 * UI copy for the homepage + shared header/footer, in English and Arabic.
 * Product/category copy lives alongside the data in `@/data/catalogue`.
 *
 * Scope: this covers the homepage, SiteHeader, and the site footer. The
 * About and Sustainable Supply pages are not yet translated.
 *
 * Arabic copy is a first-pass translation and should be reviewed by a
 * native speaker before publishing.
 */
import type { Lang } from "@/contexts/LanguageContext";

const dict = {
  // Top strip + nav
  topStripPartner: { en: "Saudi-based supply partner", ar: "شريك توريد مقره السعودية" },
  topStripTagline: { en: "Food ingredients & raw materials", ar: "مكونات غذائية ومواد خام" },
  navHome: { en: "Home", ar: "الرئيسية" },
  navAbout: { en: "About", ar: "من نحن" },
  navApplications: { en: "Applications", ar: "التطبيقات" },
  navSustainable: { en: "Sustainable supply", ar: "التوريد المستدام" },
  navContact: { en: "Contact", ar: "تواصل معنا" },
  navEnquiry: { en: "Start an enquiry", ar: "ابدأ استفسارًا" },

  // Hero
  heroEyebrowCompany: { en: "CBA Ingredient Company", ar: "شركة سي بي إيه للمكونات" },
  heroEyebrowCountry: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  heroTitle: { en: "Your Trusted Partner", ar: "شريكك الموثوق" },
  heroTagline: { en: "Order from Verified & Safe Food Suppliers", ar: "اطلب من موردي أغذية موثوقين وآمنين" },
  badgeLocalSourcing: { en: "Local sourcing", ar: "توريد محلي" },
  badgeReliableSupply: { en: "Reliable supply", ar: "إمداد موثوق" },
  badgeQualityIngredients: { en: "Quality ingredients", ar: "مكونات عالية الجودة" },
  badgeResponsiveService: { en: "Responsive service", ar: "خدمة سريعة الاستجابة" },
  ctaExplore: { en: "Explore our ingredients", ar: "استكشف مكوناتنا" },
  ctaTalk: { en: "Talk to CBA", ar: "تواصل مع سي بي إيه" },
  heroSlideRawMaterials: { en: "Ingredients & raw materials", ar: "مكونات ومواد خام" },
  frameTag: { en: "Saudi-based supply partner", ar: "شريك توريد سعودي" },

  // Segments band
  segmentsHeading: { en: "We supply ingredients to every food business", ar: "نورّد المكونات لجميع منشآت الأغذية" },
  segRestaurants: { en: "Restaurants", ar: "المطاعم" },
  segChainRestaurants: { en: "Chain Restaurants", ar: "سلاسل المطاعم" },
  segCoffeeShops: { en: "Coffee Shops", ar: "المقاهي" },
  segFastFood: { en: "Fast Food Outlets", ar: "منافذ الوجبات السريعة" },
  segHotels: { en: "Hotels", ar: "الفنادق" },
  segCatering: { en: "Catering Services", ar: "خدمات التموين" },
  segCloudKitchens: { en: "Cloud Kitchens & Delivery Brands", ar: "المطابخ السحابية وعلامات التوصيل" },

  // "01 / The CBA difference" section
  introLabel: { en: "01 / THE CBA DIFFERENCE", ar: "٠١ / تميّز سي بي إيه" },
  introHeading: { en: "The ingredient is only the beginning.", ar: "المكوّن هو مجرد البداية." },
  introLead: {
    en: "CBA Ingredients brings together quality, availability, and practical service for businesses that take food seriously.",
    ar: "تجمع سي بي إيه للمكونات بين الجودة والتوفر والخدمة العملية للمنشآت التي تُعنى بالغذاء بجدية.",
  },
  introStatCategoriesLabel: { en: "Ingredient categories", ar: "فئة مكونات" },
  introStatDairyLabel: { en: "Dairy products alone", ar: "منتج ألبان وحدها" },
  introStatLocation: { en: "Saudi-Based", ar: "مقرها السعودية" },
  introStatLocationLabel: { en: "Direct B2B supply", ar: "توريد مباشر B2B" },
  introLink: { en: "See how we work", ar: "تعرف على طريقة عملنا" },
  introQuote: { en: "Dependable supply is not an extra. It is part of the recipe.", ar: "الإمداد الموثوق ليس إضافة، بل جزء من الوصفة." },
  introQuoteAttribution: { en: "— CBA Ingredients", ar: "— سي بي إيه للمكونات" },

  // Categories section
  categoriesLabel: { en: "02 / WHAT WE SUPPLY", ar: "٠٢ / ماذا نورّد" },
  categoriesHeadingLine1: { en: "Ingredients with", ar: "مكونات صُممت" },
  categoriesHeadingLine2: { en: "an application in mind.", ar: "لتطبيق محدد." },
  categoriesIntro: {
    en: "A B2B raw material supplier for food manufacturers across Saudi Arabia. Tap a category to see what we stock.",
    ar: "مورّد مواد خام للشركات لمصنّعي الأغذية في جميع أنحاء المملكة العربية السعودية. اضغط على فئة لعرض ما نوفره.",
  },
  viewProducts: { en: "View products", ar: "عرض المنتجات" },
  requestQuote: { en: "Request a quote", ar: "اطلب عرض سعر" },

  // "03 / Why CBA" section
  approachLabel: { en: "03 / WHY CBA", ar: "٠٣ / لماذا سي بي إيه" },
  approachHeadingLine1: { en: "Good supply has", ar: "للتوريد الجيد" },
  approachHeadingLine2: { en: "a human side.", ar: "جانب إنساني." },
  approachIntro: {
    en: "We keep the process uncomplicated so your team can keep moving — from first conversation to repeat delivery.",
    ar: "نجعل العملية بسيطة ليتمكن فريقك من الاستمرار في العمل — من أول محادثة حتى التوريد المتكرر.",
  },
  principleQualityTitle: { en: "Quality assured", ar: "جودة مضمونة" },
  principleQualityText: {
    en: "A careful portfolio built around dependable food-grade ingredients and trusted supply relationships.",
    ar: "مجموعة مختارة بعناية من مكونات غذائية موثوقة وعلاقات توريد يُعتمد عليها.",
  },
  principleSupplyTitle: { en: "Supply made clearer", ar: "توريد أكثر وضوحًا" },
  principleSupplyText: {
    en: "Straightforward sourcing, practical communication, and consistent availability across the Kingdom.",
    ar: "توريد مباشر وتواصل عملي وتوفر مستمر في جميع أنحاء المملكة.",
  },
  principleApplicationTitle: { en: "Application-minded", ar: "نراعي التطبيق" },
  principleApplicationText: {
    en: "We look beyond the ingredient name to understand the product you are trying to make.",
    ar: "ننظر إلى ما هو أبعد من اسم المكوّن لفهم المنتج الذي تسعى لصنعه.",
  },
  bannerKicker: { en: "A PARTNER FOR THE LONG RUN", ar: "شريك على المدى الطويل" },
  bannerHeadingLine1: { en: "Source with confidence.", ar: "وفّر بثقة." },
  bannerHeadingLine2: { en: "Make with intent.", ar: "واصنع بقصد." },
  startConversation: { en: "Start a conversation", ar: "ابدأ محادثة" },

  // "04 / Find us" section
  contactLabel: { en: "04 / FIND US", ar: "٠٤ / تواصل معنا" },
  contactHeadingLine1: { en: "Let's make", ar: "لنصنع" },
  contactHeadingLine2: { en: "something better.", ar: "شيئًا أفضل." },
  contactIntro: {
    en: "Tell us what you are sourcing, formulating, or trying to improve. Mohammed will get back to you directly.",
    ar: "أخبرنا بما تسعى لتوريده أو تركيبه أو تحسينه، وسيتواصل معك محمد مباشرة.",
  },
  addressHeading: { en: "Saudi National Address", ar: "العنوان الوطني السعودي" },
  shortAddress: { en: "Short address", ar: "العنوان المختصر" },
  contactLabelSmall: { en: "Contact", ar: "التواصل" },
  availableForEnquiries: { en: "Available for business enquiries", ar: "متاحون للاستفسارات التجارية" },

  // Experience & Expertise section
  expLabel: { en: "EXPERIENCE & EXPERTISE", ar: "الخبرة والكفاءة" },
  expHeading: { en: "Experience & Expertise", ar: "الخبرة والكفاءة" },
  expP1: {
    en: "At CB Ingredients, our team brings over 10 years of experience in the food ingredients industry, with strong knowledge of ingredient sourcing, purchasing, logistics, and customer requirements.",
    ar: "في سي بي إيه للمكونات، يمتلك فريقنا أكثر من 10 سنوات من الخبرة في صناعة المكونات الغذائية، مع معرفة عميقة بتوريد المكونات والشراء واللوجستيات ومتطلبات العملاء.",
  },
  expP2: {
    en: "Our industry experience enables us to understand the needs of food manufacturers and provide reliable ingredient sourcing solutions with a strong focus on quality, consistency, and timely delivery.",
    ar: "تمكّننا خبرتنا الصناعية من فهم احتياجات مصنّعي الأغذية وتوفير حلول توريد مكونات موثوقة مع التركيز القوي على الجودة والاتساق والتسليم في الوقت المحدد.",
  },
  expP3: {
    en: "We work closely with our purchasing and logistics partners to support efficient sourcing and delivery arrangements, helping our customers receive the right ingredients at the right time.",
    ar: "نعمل عن كثب مع شركائنا في الشراء واللوجستيات لترتيبات التوريد والتسليم الفعالة، مما يساعد عملائنا على استلام المكونات المناسبة في الوقت المناسب.",
  },
  expSubheading: { en: "Our expertise includes:", ar: "تشمل خبراتنا:" },
  expPoint1: { en: "Food ingredient sourcing and procurement", ar: "توريد وشراء المكونات الغذائية" },
  expPoint2: { en: "Supplier coordination and purchasing", ar: "التنسيق مع الموردين وعمليات الشراء" },
  expPoint3: { en: "Logistics and delivery arrangements", ar: "ترتيبات اللوجستيات والتسليم" },
  expPoint4: { en: "Understanding of food industry requirements", ar: "فهم متطلبات صناعة الأغذية" },
  expPoint5: { en: "Reliable customer support and order coordination", ar: "دعم العملاء الموثوق والتنسيق لطلبات التوريد" },
  expFinalP: {
    en: "At CB Ingredients, we aim to build long-term customer relationships by providing dependable sourcing solutions and responsive service.",
    ar: "في سي بي إيه للمكونات، نهدف إلى بناء علاقات طويلة الأمد مع العملاء من خلال تقديم حلول توريد يُعتمد عليها وخدمة سريعة الاستجابة.",
  },

  // Footer
  footerTagline: { en: "Food ingredients & raw materials", ar: "مكونات غذائية ومواد خام" },
  footerLocation: { en: "Dammam, Saudi Arabia", ar: "الدمام، المملكة العربية السعودية" },
} as const;

export type StringKey = keyof typeof dict;

export function translate(key: StringKey, lang: Lang): string {
  return dict[key][lang];
}
