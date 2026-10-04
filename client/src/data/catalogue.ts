/**
 * Data-driven product/category catalogue, in English and Arabic.
 *
 * `products` only lists items actually supplied by CBA (no invented specs,
 * certifications, origin, or packaging). Categories without a curated list yet
 * carry a `note` instead — the shape is ready to extend as real product data
 * (descriptions, applications, per-product images) is supplied.
 *
 * Arabic copy is a first-pass translation and should be reviewed by a native
 * speaker before publishing.
 */
import type { LucideIcon } from "lucide-react";
import {
  CandyIcon,
  ChefHatIcon,
  CoffeeIcon,
  CupSodaIcon,
  DropletIcon,
  FlaskConicalIcon,
  MilkIcon,
  PaletteIcon,
  SparklesIcon,
  WheatIcon,
} from "lucide-react";

export type CategoryId =
  | "dairy"
  | "beverage-functional"
  | "bakery"
  | "coffee-shop"
  | "flavours"
  | "natural-colours"
  | "artificial-colours"
  | "butter"
  | "chocolate"
  | "restaurant";

export type Localized = { en: string; ar: string };

export type SubSection = {
  id: string;
  name: Localized;
  products: Localized[];
};

export type Category = {
  id: CategoryId;
  name: Localized;
  shortText: Localized;
  description: Localized;
  /** A real photo path, or null when no photo has been supplied yet (renders an icon tile instead). */
  image: string | null;
  icon: LucideIcon;
  accent: string;
  products?: Localized[];
  /** Nested subsections within this category */
  subSections?: SubSection[];
  note?: Localized;
};

/* ─── Image paths ─── */
const dairyUrl = "/assets/cba-dairy-icecream.webp";
const beverageFunctionalUrl = "/assets/cba-beverage-functional.png";
const bakeryUrl = "/assets/cba-bakery-spices.webp";
const flavoursUrl = "/assets/cba-flavours.png";
const naturalColoursUrl = "/assets/cba-natural-colours.png";
const artificialColoursUrl = "/assets/cba-artificial-colours.png";
const butterUrl = "/assets/cba-butter.png";
const chocolateUrl = "/assets/cba-chocolate.jpg";
const restaurantUrl = "/assets/cba-restaurant.jpg";
const coffeeShopUrl = "/assets/cba-coffee-shop.jpg";

export const categories: Category[] = [
  /* ═══════════════════════════════════════════════
   * 1. DAIRY INGREDIENTS
   * ═══════════════════════════════════════════════ */
  {
    id: "dairy",
    name: { en: "Dairy Ingredients", ar: "مكونات الألبان" },
    shortText: { en: "Milk powders, proteins & dairy solids", ar: "مساحيق الحليب والبروتينات ومكوناته الصلبة" },
    description: {
      en: "Milk powders, proteins, and dairy solids for manufacturing and food-service applications.",
      ar: "مساحيق الحليب والبروتينات ومكونات الألبان الصلبة للتصنيع وتطبيقات خدمات الطعام.",
    },
    image: dairyUrl,
    icon: MilkIcon,
    accent: "#C99A3D",
    products: [
      { en: "Whole Milk Powder – Regular Grade", ar: "مسحوق الحليب كامل الدسم – درجة عادية" },
      { en: "Whole Milk Powder – UHT Grade", ar: "مسحوق الحليب كامل الدسم – درجة UHT" },
      { en: "Instant Whole Milk Powder", ar: "مسحوق الحليب كامل الدسم الفوري" },
      { en: "Fat Filled Milk Powder", ar: "مسحوق الحليب المدعم بالدهون" },
      { en: "Milk Protein Concentrate – MPC 70", ar: "مركّز بروتين الحليب – MPC 70" },
      { en: "Milk Protein Concentrate – MPC 85", ar: "مركّز بروتين الحليب – MPC 85" },
      { en: "Skim Milk Powder – LH", ar: "مسحوق الحليب منزوع الدسم – LH" },
      { en: "Skim Milk Powder – MH", ar: "مسحوق الحليب منزوع الدسم – MH" },
      { en: "Cheese Powder", ar: "مسحوق الجبن" },
      { en: "Sweet Whey Powder", ar: "مسحوق مصل اللبن الحلو" },
      { en: "Butter", ar: "زبدة" },
      { en: "Unsalted Butter", ar: "زبدة غير مملحة" },
      { en: "Vanaspati", ar: "فاناسباتي" },
      { en: "Pectin", ar: "بكتين" },
      { en: "Carragenan", ar: "كاراجينان" },
      { en: "CMC & HPMC", ar: "CMC & HPMC" },
      { en: "Guar Gum", ar: "صمغ الغار" },
      { en: "Xanthan Gum", ar: "صمغ الزانثان" },
      { en: "Gellan Gum", ar: "صمغ الجيلان" },
      { en: "Locust Bean Gum (LBG)", ar: "صمغ الخرّوب (LBG)" },
      { en: "Sodium Alginate", ar: "ألجينات الصوديوم" },
      { en: "Mpc 70%", ar: "Mpc 70%" },
      { en: "Wpc 80", ar: "Wpc 80" },
      { en: "Collagen", ar: "كولاجين" },
      { en: "Collagen +Fiber", ar: "كولاجين + ألياف" },
      { en: "Gelatin", ar: "جيلاتين" },
      { en: "Unsalted butter 82%", ar: "زبدة غير مملحة 82%" },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 2. BEVERAGE FUNCTIONAL INGREDIENTS (top-level card)
   * ═══════════════════════════════════════════════ */
  {
    id: "beverage-functional",
    name: { en: "Beverage Functional Ingredients", ar: "المكونات الوظيفية للمشروبات" },
    shortText: { en: "Stabilizers, acids & functional additives", ar: "مثبتات وأحماض ومضافات وظيفية" },
    description: {
      en: "Functional ingredients for juice, drink, and beverage manufacturing — stabilizers, acids, and hydrocolloids.",
      ar: "مكونات وظيفية لتصنيع العصائر والمشروبات — مثبتات وأحماض ومواد هلامية.",
    },
    image: beverageFunctionalUrl,
    icon: CupSodaIcon,
    accent: "#4F7891",
    products: [
      { en: "Pectin", ar: "بكتين" },
      { en: "Carragenan", ar: "كاراجينان" },
      { en: "CMC & HPMC", ar: "CMC & HPMC" },
      { en: "Guar Gum", ar: "صمغ الغار" },
      { en: "Xanthan Gum", ar: "صمغ الزانثان" },
      { en: "Gellan Gum", ar: "صمغ الجيلان" },
      { en: "Locust Bean Gum (LBG)", ar: "صمغ الخرّوب (LBG)" },
      { en: "Sodium Alginate", ar: "ألجينات الصوديوم" },
      { en: "Citric Acid", ar: "حمض الستريك" },
      { en: "Tri Sodium Citrate", ar: "سترات الصوديوم الثلاثية" },
      { en: "Ascorbic acid", ar: "حمض الأسكوربيك" },
      { en: "Potassium sorbate", ar: "سوربات البوتاسيوم" },
      { en: "Fumaric Acid", ar: "حمض الفيوماريك" },
      { en: "Lactic Acid", ar: "حمض اللاكتيك" },
      { en: "Phosphoric Acid", ar: "حمض الفوسفوريك" },
    ],
    subSections: [
      {
        id: "beverage-pulps-standalone",
        name: { en: "Beverage Applications / Pulps", ar: "تطبيقات المشروبات / لُبّ الفواكه" },
        products: [
          { en: "Mango pulp", ar: "لبّ المانجو" },
          { en: "Goua pulp", ar: "لبّ الجوافة" },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 3. BAKERY INGREDIENTS
   * ═══════════════════════════════════════════════ */
  {
    id: "bakery",
    name: { en: "Bakery Ingredients", ar: "مكونات المخابز" },
    shortText: { en: "Structure, lift & finish", ar: "قوام وانتفاخ وتشطيب" },
    description: {
      en: "Building blocks for breads, biscuits, cakes, fillings, and confectionery.",
      ar: "مكونات أساسية للخبز والبسكويت والكيك والحشوات والحلويات.",
    },
    image: bakeryUrl,
    icon: WheatIcon,
    accent: "#B66A3C",
    products: [
      { en: "Dairy Creamer", ar: "كريمة الألبان" },
      { en: "Egg products", ar: "منتجات البيض" },
      { en: "Calcium Propionate", ar: "بروبيونات الكالسيوم" },
      { en: "Sorbic Acid", ar: "حمض السوربيك" },
      { en: "Potassium Sorbate", ar: "سوربات البوتاسيوم" },
      { en: "Sodium Benzoate", ar: "بنزوات الصوديوم" },
      { en: "Soya flour", ar: "دقيق الصويا" },
      { en: "Wheat Gluten", ar: "غلوتين القمح" },
      { en: "Unsalted butter 82%", ar: "زبدة غير مملحة 82%" },
      { en: "Saputo butter", ar: "زبدة سابوتو" },
      { en: "Crissent Margarine", ar: "مارغرين كريسنت" },
      { en: "Instant Milk Powder", ar: "مسحوق حليب فوري" },
      { en: "Skimmed Milk Powder", ar: "مسحوق حليب منزوع الدسم" },
      { en: "Soya Lecithin", ar: "ليسيثين الصويا" },
      { en: "MSG", ar: "غلوتامات أحادية الصوديوم" },
      { en: "Dextrose", ar: "دكستروز" },
      { en: "Calcium propionate", ar: "بروبيونات الكالسيوم" },
      { en: "Calcium Carbonate", ar: "كربونات الكالسيوم" },
      { en: "DMG", ar: "DMG" },
      { en: "Glycerin", ar: "غليسرين" },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 4. COFFEE SHOP
   * ═══════════════════════════════════════════════ */
  {
    id: "coffee-shop",
    name: { en: "Coffee Shop", ar: "المقهى" },
    shortText: { en: "Coffee & beverage-ready supply", ar: "مكونات القهوة والشاي والمشروبات" },
    description: {
      en: "Creamers, powders, flavours, and essential ingredients for coffee shop and hot beverage menus.",
      ar: "مساحيق وكريمة ونكهات ومكونات أساسية لتطبيقات المقاهي والمشروبات الساخنة.",
    },
    image: coffeeShopUrl,
    icon: CoffeeIcon,
    accent: "#6B4226",
    subSections: [
      {
        id: "coffee-ingredients-sub",
        name: { en: "Coffee Ingredients", ar: "مكونات القهوة" },
        products: [
          { en: "Maltodextrin", ar: "مالتوديكسترين" },
          { en: "Non dairy creamer", ar: "كريمة غير حليبية" },
          { en: "Sweet whey powder", ar: "مسحوق مصل اللبن الحلو" },
          { en: "Vannila powder", ar: "مسحوق الفانيليا" },
          { en: "Coffee creamer", ar: "كريمة القهوة" },
          { en: "Karak chai Flavour powder foam", ar: "بودرة نكهة كرك تشاي رغوة" },
          { en: "Ice coffee flavour", ar: "نكهة القهوة المثلجة" },
          { en: "Cardamom powder", ar: "مسحوق الهيل" },
          { en: "Cardamom Flavour", ar: "نكهة الهيل" },
          { en: "Ginger powder", ar: "مسحوق الزنجبيل" },
          { en: "Ginger Flavour powder foam", ar: "بودرة نكهة الزنجبيل رغوة" },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 5. FLAVOURS
   * ═══════════════════════════════════════════════ */
  {
    id: "flavours",
    name: { en: "Flavours", ar: "النكهات" },
    shortText: { en: "Natural & natural identical flavours", ar: "نكهات طبيعية ومطابقة للطبيعية" },
    description: {
      en: "A range of flavours for beverage, dairy, bakery, and confectionery applications.",
      ar: "مجموعة من النكهات لتطبيقات المشروبات والألبان والمخابز والحلويات.",
    },
    image: flavoursUrl,
    icon: SparklesIcon,
    accent: "#9B59B6",
    subSections: [
      {
        id: "beverage-app-flavours",
        name: { en: "Flavour for Beverage Applications", ar: "نكهات لتطبيقات المشروبات" },
        products: [
          { en: "Orange Flavour – natural & natural identical", ar: "نكهة البرتقال – طبيعية ومطابقة للطبيعية" },
          { en: "Mango Flavour – natural & natural identical", ar: "نكهة المانجو – طبيعية ومطابقة للطبيعية" },
          { en: "Pineapple – natural & natural identical", ar: "أناناس – طبيعي ومطابق للطبيعي" },
          { en: "Apple Flavour – natural & natural identical", ar: "نكهة التفاح – طبيعية ومطابقة للطبيعية" },
          { en: "Mixed fruit Flavour – natural & natural identical", ar: "نكهة فواكه مشكّلة – طبيعية ومطابقة للطبيعية" },
          { en: "Guava Flavour – natural & natural identical", ar: "نكهة الجوافة – طبيعية ومطابقة للطبيعية" },
          { en: "Grape Flavour – natural & natural identical", ar: "نكهة العنب – طبيعية ومطابقة للطبيعية" },
          { en: "Gouva flavor- natural & natural identical", ar: "نكهة الجوافة – طبيعية ومطابقة للطبيعية" },
        ],
      },
      {
        id: "natural-identical-flavours",
        name: { en: "Natural or Natural Identical Flavours", ar: "نكهات طبيعية أو مطابقة للطبيعية" },
        products: [
          { en: "Vanesse Pure Vanillin", ar: "فانيس فانيلين نقي" },
          { en: "Vanesse Fine Mesh Vanillin", ar: "فانيس فانيلين ناعم" },
          { en: "Ethyl Vanillin powder", ar: "بودرة إيثيل فانيلين" },
          { en: "Butter Flavour powder", ar: "بودرة نكهة الزبدة" },
          { en: "Cheese Flavour powder", ar: "بودرة نكهة الجبن" },
          { en: "Milk Flavour powder", ar: "بودرة نكهة الحليب" },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 6. NATURAL COLOURS
   * ═══════════════════════════════════════════════ */
  {
    id: "natural-colours",
    name: { en: "Natural Colours", ar: "الألوان الطبيعية" },
    shortText: { en: "Plant-derived colouring", ar: "ألوان مستخلصة من النباتات" },
    description: {
      en: "Natural food colours derived from plant and mineral sources for clean-label applications.",
      ar: "ألوان غذائية طبيعية مستخلصة من مصادر نباتية ومعدنية للتطبيقات ذات الملصقات النظيفة.",
    },
    image: naturalColoursUrl,
    icon: PaletteIcon,
    accent: "#E67E22",
    products: [
      { en: "Beta Carotene 2%", ar: "بيتا كاروتين 2%" },
      { en: "Red colors", ar: "ألوان حمراء" },
      { en: "Carmine 10%", ar: "كارمين 10%" },
      { en: "Beta Carotene 10% powder", ar: "بودرة بيتا كاروتين 10%" },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 7. ARTIFICIAL COLOURS
   * ═══════════════════════════════════════════════ */
  {
    id: "artificial-colours",
    name: { en: "Artificial Colours", ar: "الألوان الاصطناعية" },
    shortText: { en: "Synthetic food colourants", ar: "ملونات غذائية اصطناعية" },
    description: {
      en: "Synthetic food colourants for confectionery, beverage, and bakery applications.",
      ar: "ملونات غذائية اصطناعية لتطبيقات الحلويات والمشروبات والمخابز.",
    },
    image: artificialColoursUrl,
    icon: FlaskConicalIcon,
    accent: "#E74C3C",
    products: [
      { en: "Tartrazine color", ar: "لون تارتازين" },
      { en: "Chocolate Brown HT", ar: "بني شوكولاتة HT" },
      { en: "Sunset Yellow", ar: "أصفر الغروب" },
      { en: "Carmoisine color", ar: "لون كارموزين" },
      { en: "Allura red", ar: "أحمر ألورا" },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 8. BUTTER
   * ═══════════════════════════════════════════════ */
  {
    id: "butter",
    name: { en: "Butter", ar: "الزبدة" },
    shortText: { en: "Premium butter products", ar: "منتجات زبدة ممتازة" },
    description: {
      en: "Premium butter and margarine products for food manufacturing and food-service.",
      ar: "منتجات زبدة ومارغرين ممتازة للتصنيع الغذائي وخدمات الطعام.",
    },
    image: butterUrl,
    icon: DropletIcon,
    accent: "#D4A843",
    products: [
      { en: "Butter", ar: "زبدة" },
      { en: "Unsalted Butter", ar: "زبدة غير مملحة" },
      { en: "Unsalted butter 82%", ar: "زبدة غير مملحة 82%" },
      { en: "Saputo butter", ar: "زبدة سابوتو" },
      { en: "Crissent Margarine", ar: "مارغرين كريسنت" },
      { en: "Vanaspati", ar: "فاناسباتي" },
    ],
  },

  /* ═══════════════════════════════════════════════
   * 9. CHOCOLATE
   * ═══════════════════════════════════════════════ */
  {
    id: "chocolate",
    name: { en: "Chocolate", ar: "الشوكولاتة" },
    shortText: { en: "Chocolate ingredients", ar: "مكونات الشوكولاتة" },
    description: {
      en: "Chocolate ingredients for confectionery and bakery applications.",
      ar: "مكونات الشوكولاتة لتطبيقات الحلويات والمخابز.",
    },
    image: chocolateUrl,
    icon: CandyIcon,
    accent: "#963F35",
    note: {
      en: "Full chocolate ingredient range available on request — get in touch for the current list.",
      ar: "المجموعة الكاملة لمكونات الشوكولاتة متاحة عند الطلب — تواصل معنا للحصول على القائمة الحالية.",
    },
  },

  /* ═══════════════════════════════════════════════
   * 10. RESTAURANT
   * ═══════════════════════════════════════════════ */
  {
    id: "restaurant",
    name: { en: "Restaurant", ar: "المطاعم" },
    shortText: { en: "Kitchen-ready supply", ar: "توريد جاهز للمطابخ" },
    description: {
      en: "We supply dairy, bakery, and beverage ingredients that restaurant kitchens rely on day to day.",
      ar: "نورّد مكونات الألبان والمخابز والمشروبات التي تعتمد عليها مطابخ المطاعم يوميًا.",
    },
    image: restaurantUrl,
    icon: ChefHatIcon,
    accent: "#0F172A",
    note: {
      en: "Speak with us about the ingredients your kitchen needs — we'll match you to the right categories above.",
      ar: "تحدث معنا عن المكونات التي يحتاجها مطبخك — سنساعدك في اختيار الفئات المناسبة أعلاه.",
    },
  },
];

