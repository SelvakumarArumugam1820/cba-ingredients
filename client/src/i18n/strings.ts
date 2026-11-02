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
  heroEyebrowCompany: { en: "CBA Ingredients Company", ar: "شركة سي بي إيه للمكونات" },
  heroEyebrowCountry: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  heroTitle: { en: "Your Trusted Partner", ar: "شريكك الموثوق" },
  heroSourcingPartner: { en: "Source Smarter.", ar: "توريد أذكى." },
  heroSupplyPartner: { en: "Supply Faster.", ar: "إمداد أسرع." },
  heroTagline: { en: "Order from Verified & Safe Food Suppliers", ar: "اطلب من موردي أغذية موثوقين وآمنين" },
  heroB2BLabel: { en: "B2B Support", ar: "دعم B2B" },
  heroB2BHeading: { en: "From Ingredient Sourcing to Reliable Supply.", ar: "من توريد المكونات إلى إمداد موثوق." },
  heroSubBenefit: {
    en: "We connect food businesses across Saudi Arabia with trusted ingredient suppliers, helping them source the right ingredients for their products, applications, and production requirements.",
    ar: "نربط منشآت الأغذية في جميع أنحاء المملكة العربية السعودية بموردي مكونات موثوقين، لمساعدتها على توريد المكونات المناسبة لمنتجاتها وتطبيقاتها ومتطلبات إنتاجها.",
  },
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
    en: "B2B ingredient supply for food manufacturers across Saudi Arabia. Tap a category to see what we stock.",
    ar: "توريد مكونات للشركات لمصنّعي الأغذية في جميع أنحاء المملكة العربية السعودية. اضغط على فئة لعرض ما نوفره.",
  },
  viewProducts: { en: "View products", ar: "عرض المنتجات" },
  requestQuote: { en: "Request a quote", ar: "اطلب عرض سعر" },
  packingSizeLabel: { en: "Packing size", ar: "حجم العبوة" },
  originLabel: { en: "Origin", ar: "بلد المنشأ" },

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
    en: "Tell us what you are sourcing, formulating, or trying to improve. Our team will get back to you directly.",
    ar: "أخبرنا بما تسعى لتوريده أو تركيبه أو تحسينه، وسيتواصل معك فريقنا مباشرة.",
  },
  addressHeading: { en: "Saudi National Address", ar: "العنوان الوطني السعودي" },
  shortAddress: { en: "Short address", ar: "العنوان المختصر" },
  contactLabelSmall: { en: "Contact", ar: "التواصل" },
  whatsappLabel: { en: "WhatsApp", ar: "واتساب" },
  availableForEnquiries: { en: "Available for business enquiries", ar: "متاحون للاستفسارات التجارية" },

  // Experience & Expertise section
  expLabel: { en: "EXPERIENCE & EXPERTISE", ar: "الخبرة والكفاءة" },
  expHeading: { en: "Experience & Expertise", ar: "الخبرة والكفاءة" },
  expP1: {
    en: "At CBA Ingredients, our team brings over 10 years of experience in the food ingredients industry, with strong knowledge of ingredient sourcing, purchasing, logistics, and customer requirements.",
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
    en: "At CBA Ingredients, we aim to build long-term customer relationships by providing dependable sourcing solutions and responsive service.",
    ar: "في سي بي إيه للمكونات، نهدف إلى بناء علاقات طويلة الأمد مع العملاء من خلال تقديم حلول توريد يُعتمد عليها وخدمة سريعة الاستجابة.",
  },

  // FAQ section (AEO: real, grounded answers — no invented claims)
  faqLabel: { en: "05 / FREQUENTLY ASKED QUESTIONS", ar: "٠٥ / الأسئلة الشائعة" },
  faqHeadingLine1: { en: "Common questions,", ar: "أسئلة شائعة،" },
  faqHeadingLine2: { en: "answered clearly.", ar: "بإجابات واضحة." },
  faqQ1: { en: "What ingredients does CBA Ingredients supply?", ar: "ما هي المكونات التي توفرها سي بي إيه للمكونات؟" },
  faqA1: {
    en: "We supply dairy ingredients, bakery ingredients, beverage functional ingredients, flavours, natural and artificial colours, butter, coffee shop ingredients, chocolate ingredients, and pharmaceutical/cosmetic raw materials, alongside general kitchen-ready supply for restaurants.",
    ar: "نوفّر مكونات الألبان، ومكونات المخابز، والمكونات الوظيفية للمشروبات، والنكهات، والألوان الطبيعية والاصطناعية، والزبدة، ومكونات المقاهي، ومكونات الشوكولاتة، والمواد الخام الصيدلانية والتجميلية، بالإضافة إلى توريد جاهز لمطابخ المطاعم.",
  },
  faqQ2: { en: "Where is CBA Ingredients based?", ar: "أين يقع مقر سي بي إيه للمكونات؟" },
  faqA2: {
    en: "We are based in Dammam, Saudi Arabia, and supply food businesses across the Kingdom, with sourcing support for international B2B customers as well.",
    ar: "يقع مقرنا في الدمام، المملكة العربية السعودية، ونورّد منشآت الأغذية في جميع أنحاء المملكة، مع دعم التوريد لعملاء الأعمال الدوليين أيضًا.",
  },
  faqQ3: { en: "Which businesses do you work with?", ar: "ما هي المنشآت التي تتعاملون معها؟" },
  faqA3: {
    en: "We work with restaurants, chain restaurants, coffee shops, fast food outlets, hotels, catering services, cloud kitchens, bakeries, and food manufacturers.",
    ar: "نتعامل مع المطاعم وسلاسل المطاعم والمقاهي ومنافذ الوجبات السريعة والفنادق وخدمات التموين والمطابخ السحابية والمخابز ومصنّعي الأغذية.",
  },
  faqQ4: { en: "How do I request a quote?", ar: "كيف أطلب عرض سعر؟" },
  faqA4: {
    en: "Tap any ingredient category on this site to see what we stock, then use \"Request a quote\" to email us directly, or reach us by phone or WhatsApp.",
    ar: "اضغط على أي فئة مكونات في هذا الموقع لعرض ما نوفره، ثم استخدم زر \"اطلب عرض سعر\" لمراسلتنا مباشرة عبر البريد الإلكتروني، أو تواصل معنا هاتفيًا أو عبر واتساب.",
  },
  faqQ5: { en: "Can I contact CBA Ingredients on WhatsApp?", ar: "هل يمكنني التواصل مع سي بي إيه للمكونات عبر واتساب؟" },
  faqA5: {
    en: "Yes — use the WhatsApp button on this site or message us directly at +966 55 658 5552.",
    ar: "نعم — استخدم زر واتساب في هذا الموقع أو راسلنا مباشرة على الرقم ‎+966 55 658 5552.",
  },
  faqQ6: { en: "Does CBA Ingredients supply outside Saudi Arabia?", ar: "هل توفر سي بي إيه للمكونات خارج المملكة العربية السعودية؟" },
  faqA6: {
    en: "Saudi Arabia is our primary market, and we also support international B2B enquiries — contact us to discuss your requirements.",
    ar: "المملكة العربية السعودية هي سوقنا الأساسي، كما ندعم استفسارات العملاء الدوليين من الشركات — تواصل معنا لمناقشة متطلباتك.",
  },

  // Footer
  footerTagline: { en: "Food ingredients & raw materials", ar: "مكونات غذائية ومواد خام" },
  footerLocation: { en: "Dammam, Saudi Arabia", ar: "الدمام، المملكة العربية السعودية" },
} as const;

export type StringKey = keyof typeof dict;

export function translate(key: StringKey, lang: Lang): string {
  return dict[key][lang];
}
