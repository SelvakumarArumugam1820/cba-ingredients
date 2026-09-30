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
 *
 * Category photos: dairy/beverage/bakery are CBA's own supplied photography.
 * non-dairy/ice-cream/chocolate/restaurant/coffee-shop are stock photos
 * (free, commercial-use Unsplash License) standing in until CBA supplies its
 * own — swap the `image` path below when real photography is available.
 */
import type { LucideIcon } from "lucide-react";
import { CandyIcon, ChefHatIcon, CoffeeIcon, CupSodaIcon, DropletIcon, IceCreamConeIcon, MilkIcon, WheatIcon } from "lucide-react";

export type CategoryId =
  | "dairy"
  | "non-dairy"
  | "beverage"
  | "bakery"
  | "ice-cream"
  | "chocolate"
  | "restaurant"
  | "coffee-shop";

export type Localized = { en: string; ar: string };

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
  note?: Localized;
};

const dairyUrl = "/assets/cba-dairy-icecream.webp";
const bakeryUrl = "/assets/cba-bakery-spices.webp";
const beverageUrl = "/assets/cba-beverages-juice.jpg";
const nonDairyUrl = "/assets/cba-non-dairy.jpg";
const iceCreamUrl = "/assets/cba-ice-cream.jpg";
const chocolateUrl = "/assets/cba-chocolate.jpg";
const restaurantUrl = "/assets/cba-restaurant.jpg";
const coffeeShopUrl = "/assets/cba-coffee-shop.jpg";

export const categories: Category[] = [
  {
    id: "dairy",
    name: { en: "Dairy Ingredients", ar: "مكونات الألبان" },
    shortText: { en: "Milk powders & dairy solids", ar: "مساحيق الحليب ومكوناته الصلبة" },
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
    ],
  },
  {
    id: "non-dairy",
    name: { en: "Non-Dairy Ingredients", ar: "مكونات خالية من الألبان" },
    shortText: { en: "Plant-based alternatives", ar: "بدائل نباتية" },
    description: {
      en: "Non-dairy fats and alternatives for formulations that call for a dairy-free base.",
      ar: "دهون وبدائل خالية من الألبان للتركيبات التي تتطلب قاعدة خالية من منتجات الألبان.",
    },
    image: nonDairyUrl,
    icon: DropletIcon,
    accent: "#6C8D4B",
    products: [{ en: "Vanaspati", ar: "فاناسباتي" }],
    note: {
      en: "More non-dairy ingredients will be added here as the catalogue grows.",
      ar: "سيتم إضافة المزيد من المكونات الخالية من الألبان هنا مع توسّع الكتالوج.",
    },
  },
  {
    id: "beverage",
    name: { en: "Beverage Ingredients", ar: "مكونات المشروبات" },
    shortText: { en: "Powders & functional additives", ar: "مساحيق ومضافات وظيفية" },
    description: {
      en: "Consistent flavour, colour, and mouthfeel for juices, drinks, coffee, and tea applications.",
      ar: "نكهة ولون وقوام ثابت للعصائر والمشروبات والقهوة والشاي.",
    },
    image: beverageUrl,
    icon: CupSodaIcon,
    accent: "#4F7891",
    products: [
      { en: "Non-Dairy Creamer (Coffee/Tea Grade)", ar: "بديل كريمة خالٍ من الألبان (درجة القهوة/الشاي)" },
      { en: "Formulated Milk Powder", ar: "مسحوق حليب مُركّب" },
      { en: "Instant Fat Filled Powder", ar: "مسحوق مدعم بالدهون فوري" },
      { en: "Beverage flavours & emulsions", ar: "نكهات ومستحلبات المشروبات" },
      { en: "Clouding agents", ar: "عوامل التعكير" },
      { en: "Fruit-drink stabilizers", ar: "مثبتات مشروبات الفواكه" },
      { en: "Natural beverage colours", ar: "ألوان طبيعية للمشروبات" },
      { en: "Citric & malic acids", ar: "حمض الستريك وحمض الماليك" },
      { en: "Caramel colour", ar: "لون الكراميل" },
    ],
  },
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
      { en: "Food-grade soya lecithin", ar: "ليسيثين الصويا الغذائي" },
      { en: "Dry baker's yeast", ar: "خميرة الخبز الجافة" },
      { en: "Baking enzymes", ar: "إنزيمات الخبز" },
      { en: "Functional starches", ar: "نشويات وظيفية" },
      { en: "Cocoa & bakery colours", ar: "الكاكاو وألوان المخابز" },
      { en: "Custom bakery mixes", ar: "خلطات مخابز مخصصة" },
    ],
  },
  {
    id: "ice-cream",
    name: { en: "Ice Cream Ingredients", ar: "مكونات الآيس كريم" },
    shortText: { en: "Texture & stability systems", ar: "أنظمة القوام والثبات" },
    description: {
      en: "Stabilizer and texture systems for ice cream and other frozen desserts.",
      ar: "أنظمة مثبّتات وقوام للآيس كريم والحلويات المجمدة الأخرى.",
    },
    image: iceCreamUrl,
    icon: IceCreamConeIcon,
    accent: "#7761A2",
    products: [
      { en: "Stabilizers & custom blends", ar: "مثبتات وخلطات مخصصة" },
      { en: "Hydrocolloids & blends", ar: "مواد هلامية (هيدروكولويد) وخلطات" },
      { en: "Carrageenan & alginate", ar: "كاراجينان وألجينات" },
      { en: "Emulsifying salts", ar: "أملاح مستحلبة" },
    ],
  },
  {
    id: "chocolate",
    name: { en: "Chocolate", ar: "الشوكولاتة" },
    shortText: { en: "Coming to the catalogue", ar: "قريبًا في الكتالوج" },
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
  {
    id: "coffee-shop",
    name: { en: "Coffee Shop", ar: "المقهى" },
    shortText: { en: "Beverage-ready supply", ar: "توريد جاهز للمشروبات" },
    description: {
      en: "Non-dairy creamers, milk powders, and beverage ingredients suited to coffee shop menus.",
      ar: "بدائل كريمة خالية من الألبان ومساحيق حليب ومكونات مشروبات مناسبة لقوائم المقاهي.",
    },
    image: coffeeShopUrl,
    icon: CoffeeIcon,
    accent: "#0284C7",
    note: {
      en: "Ask us about our beverage and dairy ingredients for coffee shop applications.",
      ar: "اسألنا عن مكونات المشروبات والألبان المناسبة لتطبيقات المقاهي.",
    },
  },
];
