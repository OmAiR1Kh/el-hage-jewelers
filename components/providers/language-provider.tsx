// "use client";

// import type React from "react";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useLocation } from "./location-provider";

// interface LanguageContextType {
//   language: "en" | "ar";
//   setLanguage: (lang: "en" | "ar") => void;
//   isRTL: boolean;
//   t: (key: string) => string;
// }

// const translations = {
//   en: {
//     // Navigation
//     "nav.collections": "Collections",
//     "nav.categories": "Categories",
//     "nav.about": "Our Legacy",
//     "nav.contact": "Contact",
//     "nav.appointment": "Book an Appointment",

//     // Hero
//     "hero.title": "Exquisite Jewelry Since 1953",
//     "hero.subtitle": "Discover our timeless collections of luxury jewelry",
//     "hero.cta": "Explore Collections",

//     // General
//     "collections.title": "Our Collections",
//     "collections.subtitle": "Handcrafted with precision and passion",
//     "products.title": "Featured Products",
//     "products.subtitle": "Discover our most coveted pieces",
//     "about.title": "About El Hage Jewelers",
//     "testimonials.title": "What Our Clients Say",
//     "video.title": "Our Story",
//     loading: "Loading...",
//     error: "Something went wrong",

//     // About Page
//     "about.page.title": "Our Legacy",
//     "about.page.subtitle":
//       "Rooted in tradition yet ever evolving; the House of El Hage Jewelers has carried the soul of its founders into every masterpiece since 1953, holding a memory; shaped by devotion destined to last.",

//     // Legacy section
//     "about.legacy.title": "A Legacy of Family Craftsmanship Since 1953",
//     "about.legacy.intro":
//       "Rooted in tradition yet ever evolving; the House of El Hage Jewelers has carried the soul of its founders into every masterpiece since 1953, holding a memory; shaped by devotion destined to last.",
//     "about.legacy.description": "",

//     // Timeline sections
//     "about.timeline.founding.title": "The Founding Era (1953 - 1973)",
//     "about.timeline.founding.subtitle": "A Vision is Born",
//     "about.timeline.founding.content":
//       "Founded in 1953 within Tripoli's historic Gold Souk, El Hage Jewelers began as a disciplined goldsmith atelier. Gold was melted over open flames and shaped by the steady hand of Youssef El Hage, with patience, precision, and devotion to craft.\n\nIn a city long recognized as a hub of fine jewelry craftsmanship in the Levant, the House established a name synonymous with integrity and refined artistry. What began as a humble workshop evolved into one of North Lebanon's most respected luxury jewelry houses.",

//     "about.timeline.expansion.title": "Expansion & Recognition (1973 - 1997)",
//     "about.timeline.expansion.subtitle": "A Family Tradition Grows",
//     "about.timeline.expansion.content":
//       "Under Youssef El Hage's leadership, the House expanded beyond Lebanon. Through strategic growth and enduring relationships, El Hage introduced its fine jewelry and bespoke creations to clients across the Gulf region, Europe, and the Americas — positioning Lebanese mastery on an international stage.\n\nWith the arrival of the third generation, Tony El Hage, the House strengthened its global presence while preserving its founding values of precision and timeless elegance.",

//     "about.timeline.modernization.title":
//       "Modernization & Innovation (1997 - 2003)",
//     "about.timeline.modernization.subtitle":
//       "The Tony El Hage Era | Diamond Mastery & Gemological Excellence",
//     "about.timeline.modernization.content":
//       "Among the one of the first GIA-certified gemologists in the Middle East, Tony El Hage elevated the House to international diamond authority. Through direct sourcing and affiliations with leading diamond exchanges, each natural diamond is selected for brilliance, proportion, rarity, and architectural harmony.",

//     "about.timeline.luxury.title": "Luxury & Artistry Redefined (2003 - 2026)",
//     "about.timeline.luxury.subtitle":
//       "The Evolution of Luxury | A Luxury Destination Beyond Borders",
//     "about.timeline.luxury.content":
//       "Today, El Hage Jewelers operates one of the largest luxury jewelry showrooms in North Lebanon, welcoming clients from Lebanon, the Gulf region, Europe, and the Americas. Recognized for bespoke engagement rings, natural diamond collections, bridal jewelry, and high jewelry masterpieces, the House offers discretion, personalization, and excellence.",

//     "about.timeline.future.title": "The Future (2026 & Beyond)",
//     "about.timeline.future.subtitle":
//       "A Legacy Continues | Continuity of Vision",
//     "about.timeline.future.content":
//       "As El Hage Jewelers enters its next chapter, its commitment to luxury jewelry, diamond authority, and artistic mastery remains unwavering.\n\nGuided by Tony El Hage, the fourth generation steps forward; carrying the values of precision, integrity, and refinement that define the House.",

//     // Artist section
//     "about.artist.title": "An Artist Before Anything Else",
//     "about.artist.content":
//       "From crafting his first marquise diamond ring at fifteen to guiding the House's evolution, Tony El Hage approaches jewelry as sculpture in gold. From sketch to final setting, each masterpiece reflects balance, structure, and intention.",

//     // Our Values section
//     "about.values.title": "The Maison Philosophy",
//     "about.values.subtitle": "",
//     "about.values.luxe.title": "Maison de Luxe",
//     "about.values.luxe.description":
//       "Luxury defined by refinement and meaning.",
//     "about.values.exclusive.title": "Maison Exclusive",
//     "about.values.exclusive.description": "Every creation is singular.",
//     "about.values.classique.title": "Maison Classique",
//     "about.values.classique.description":
//       "Timeless sophistication beyond trend.",

//     // Masterpiece section (kept for compatibility but merged into artist)
//     "about.story.title": "Our Story",
//     "about.story.content":
//       "Rooted in tradition yet ever evolving; the House of El Hage Jewelers has carried the soul of its founders into every masterpiece since 1953, holding a memory; shaped by devotion destined to last.",
//     "about.masterpiece.title": "A Masterpiece in Motion",
//     "about.masterpiece.content":
//       "From sketch to final setting, each masterpiece reflects balance, structure, and intention. El Hage is not just worn. It is lived. It is remembered. It is eternal.",

//     // Final sections
//     "about.anniversary.title": "A Legacy Since 1953",
//     "about.experience.title": "Experience Our Legacy",
//     "about.experience.subtitle":
//       "Discover the artistry and craftsmanship that has defined El Hage Jewelers for over seven decades",
//     "about.experience.appointment": "Book an Appointment",
//     "about.experience.collections": "Our Collections",

//     // Legal pages
//     "privacy.title": "Privacy Policy",
//     "privacy.description": "At El Hage Jewelers, we respect your privacy and are committed to protecting your personal information.",
//     "privacy.subtitle": "This is an informational site and not an e-commerce storefront.",
//     "privacy.lastUpdated": "Last updated: March 2026.",

//     "terms.title": "Terms & Conditions",
//     "terms.description": "These terms govern your use of the El Hage Jewelers website.",
//     "terms.effectiveDate": "Effective date: March 2026.",
//   },
//   ar: {
//     // Navigation - Arabic
//     "nav.collections": "المجموعات",
//     "nav.categories": "الفئات",
//     "nav.about": "إرثنا",
//     "nav.contact": "اتصل بنا",
//     "nav.appointment": "احجز موعد",

//     // Hero - Arabic
//     "hero.title": "مجوهرات رائعة منذ ١٩٥٣",
//     "hero.subtitle": "اكتشف مجموعاتنا الخالدة من المجوهرات الفاخرة",
//     "hero.cta": "استكشف المجموعات",

//     // General - Arabic
//     "collections.title": "مجموعاتنا",
//     "collections.subtitle": "مصنوعة يدوياً بدقة وشغف",
//     "products.title": "المنتجات المميزة",
//     "products.subtitle": "اكتشف قطعنا الأكثر رواجاً",
//     "about.title": "حول مجوهرات الحاج",
//     "testimonials.title": "ما يقوله عملاؤنا",
//     "video.title": "قصتنا",
//     loading: "جاري التحميل...",
//     error: "حدث خطأ ما",

//     // About Page - Arabic
//     "about.page.title": "إرثنا",
//     "about.page.subtitle":
//       "متجذرة في التقاليد ومتطورة باستمرار؛ حملت دار الحاج للمجوهرات روح مؤسسيها في كل تحفة فنية منذ عام ١٩٥٣، تحمل ذكرى؛ شُكّلت بالتفاني لتدوم.",

//     // Legacy section - Arabic
//     "about.legacy.title": "إرث من الحرفية العائلية منذ ١٩٥٣",
//     "about.legacy.intro":
//       "متجذرة في التقاليد ومتطورة باستمرار؛ حملت دار الحاج للمجوهرات روح مؤسسيها في كل تحفة فنية منذ عام ١٩٥٣، تحمل ذكرى؛ شُكّلت بالتفاني لتدوم.",
//     "about.legacy.description": "",

//     // Timeline sections - Arabic
//     "about.timeline.founding.title": "عصر التأسيس (١٩٥٣ - ١٩٧٣)",
//     "about.timeline.founding.subtitle": "ولادة رؤية",
//     "about.timeline.founding.content":
//       "تأسست مجوهرات الحاج عام ١٩٥٣ في سوق الذهب التاريخي بطرابلس، بدأت كمحترف صياغة ذهب منضبط. كان الذهب يُذاب على نيران مكشوفة ويُشكّل بيد يوسف الحاج الثابتة، بصبر ودقة وتفانٍ في الحرفة.\n\nفي مدينة اعتُرف بها منذ أمد بعيد كمركز للمجوهرات الفاخرة في بلاد الشام، أرست الدار اسماً مرادفاً للنزاهة والفنية الراقية. ما بدأ كورشة متواضعة تطوّر ليصبح أحد أكثر دور المجوهرات الفاخرة احتراماً في شمال لبنان.",

//     "about.timeline.expansion.title": "التوسع والاعتراف (١٩٧٣ - ١٩٩٧)",
//     "about.timeline.expansion.subtitle": "نمو تقليد عائلي",
//     "about.timeline.expansion.content":
//       "في عهد يوسف الحاج، توسعت الدار خارج حدود لبنان. من خلال النمو الاستراتيجي والعلاقات الدائمة، قدّمت الحاج مجوهراتها الفاخرة وإبداعاتها المخصصة لعملاء في منطقة الخليج وأوروبا والأمريكتين — راسخةً الحرفية اللبنانية على الساحة الدولية.\n\nمع وصول الجيل الثالث، طوني الحاج، عزّزت الدار وجودها العالمي مع الحفاظ على قيمها التأسيسية من الدقة والأناقة الخالدة.",

//     "about.timeline.modernization.title": "التحديث والابتكار (١٩٩٧ - ٢٠٠٣)",
//     "about.timeline.modernization.subtitle":
//       "عصر طوني الحاج | إتقان الألماس والتميز في علم الأحجار الكريمة",
//     "about.timeline.modernization.content":
//       "بوصفه من أوائل علماء الأحجار الكريمة المعتمدين من GIA في الشرق الأوسط، رفع طوني الحاج مكانة الدار إلى مرجعية الألماس الدولية. من خلال التوريد المباشر والانتماء إلى بورصات الألماس الرائدة، يُختار كل ألماس طبيعي وفق معايير التألق والتناسب والندرة والتناسق المعماري.",

//     "about.timeline.luxury.title": "إعادة تعريف الترف والفنية (٢٠٠٣ - ٢٠٢٦)",
//     "about.timeline.luxury.subtitle": "تطور الترف | وجهة فاخرة تتجاوز الحدود",
//     "about.timeline.luxury.content":
//       "اليوم، تدير مجوهرات الحاج أحد أكبر صالات عرض المجوهرات الفاخرة في شمال لبنان، مرحّبةً بعملاء من لبنان ومنطقة الخليج وأوروبا والأمريكتين. تُعرف الدار بخواتم الخطوبة المخصصة ومجموعات الألماس الطبيعي ومجوهرات العرائس وتحف المجوهرات الراقية، وتقدّم الخصوصية والتخصيص والتميز.",

//     "about.timeline.future.title": "المستقبل (٢٠٢٦ وما بعدها)",
//     "about.timeline.future.subtitle": "استمرار الإرث | استمرارية الرؤية",
//     "about.timeline.future.content":
//       "مع دخول مجوهرات الحاج فصلها التالي، يبقى التزامها بالمجوهرات الفاخرة وسلطة الألماس والإتقان الفني ثابتاً.\n\nبإرشاد طوني الحاج، يتقدم الجيل الرابع؛ حاملاً قيم الدقة والنزاهة والرقي التي تُعرّف الدار.",

//     // Artist section - Arabic
//     "about.artist.title": "فنان قبل أي شيء آخر",
//     "about.artist.content":
//       "من صياغة أول خاتم ألماس ماركيز له في سن الخامسة عشرة إلى قيادة تطور الدار، يتعامل طوني الحاج مع المجوهرات كنحت في الذهب. من الرسم إلى الترصيع النهائي، كل تحفة فنية تعكس التوازن والبنية والنية.",

//     // Our Values section - Arabic
//     "about.values.title": "فلسفة الدار",
//     "about.values.subtitle": "",
//     "about.values.luxe.title": "Maison de Luxe",
//     "about.values.luxe.description": "الترف محدَّد بالتنقيح والمعنى.",
//     "about.values.exclusive.title": "Maison Exclusive",
//     "about.values.exclusive.description": "كل إبداع فريد من نوعه.",
//     "about.values.classique.title": "Maison Classique",
//     "about.values.classique.description": "رقي خالد يتجاوز الموضة.",

//     // Kept for compatibility
//     "about.story.title": "قصتنا",
//     "about.story.content":
//       "متجذرة في التقاليد ومتطورة باستمرار؛ حملت دار الحاج للمجوهرات روح مؤسسيها في كل تحفة فنية منذ عام ١٩٥٣.",
//     "about.masterpiece.title": "تحفة فنية متحركة",
//     "about.masterpiece.content":
//       "من الرسم إلى الترصيع النهائي، كل تحفة فنية تعكس التوازن والبنية والنية. الحاج لا يُرتدى فقط. إنه يُعاش. يُتذكر. إنه أبدي.",

//     // Final sections - Arabic
//     "about.anniversary.title": "إرث منذ ١٩٥٣",
//     "about.experience.title": "اختبر إرثنا",
//     "about.experience.subtitle":
//       "اكتشف الفنية والحرفية التي ميزت مجوهرات الحاج لأكثر من سبعة عقود",
//     "about.experience.appointment": "احجز موعد",
//     "about.experience.collections": "مجموعاتنا",

//     // Legal pages
//     "privacy.title": "سياسة الخصوصية",
//     "privacy.description": "في مجوهرات الحاج، نحترم خصوصيتك وملتزمون بحماية معلوماتك الشخصية.",
//     "privacy.subtitle": "هذا موقع معلوماتي وليس متجر تجارة إلكترونية.",
//     "privacy.lastUpdated": "آخر تحديث: مارس ٢٠٢٦.",

//     "terms.title": "الشروط والأحكام",
//     "terms.description": "هذه الشروط تحكم استخدامك لموقع مجوهرات الحاج.",
//     "terms.effectiveDate": "تاريخ السريان: مارس ٢٠٢٦.",
//   }
// };

// const LanguageContext = createContext<LanguageContextType>({
//   language: "en",
//   setLanguage: () => {},
//   isRTL: false,
//   t: (key: string) => key,
// });

// export const useLanguage = () => useContext(LanguageContext);

// export function LanguageProvider({ children }: { children: React.ReactNode }) {
//   const { country, isLoading } = useLocation();
//   const [language, setLanguage] = useState<"en" | "ar">("en");

//   useEffect(() => {
//     if (!isLoading) {
//       if (country === "UAE" || country === "KSA") {
//         setLanguage("ar");
//       } else {
//         setLanguage("en");
//       }
//     }
//   }, [country, isLoading]);

//   const isRTL = language === "ar";

//   const t = (key: string): string => {
//     return (
//       translations[language][key as keyof (typeof translations)["en"]] || key
//     );
//   };

//   useEffect(() => {
//     document.documentElement.dir = isRTL ? "rtl" : "ltr";
//     document.documentElement.lang = language;
//   }, [isRTL, language]);

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
//       <div className={`${isRTL ? "rtl font-arabic" : "ltr"}`}>{children}</div>
//     </LanguageContext.Provider>
//   );
// }

"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "./location-provider";

interface LanguageContextType {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.collections": "Collections",
    "nav.categories": "Categories",
    "nav.about": "Our Legacy",
    "nav.contact": "Contact",
    "nav.appointment": "Book an Appointment",

    // Hero
    "hero.title": "Exquisite Jewelry Since 1953",
    "hero.subtitle": "Discover our timeless collections of luxury jewelry",
    "hero.cta": "Explore Collections",

    // General
    "collections.title": "Our Collections",
    "collections.subtitle": "Handcrafted with precision and passion",
    "products.title": "Featured Products",
    "products.subtitle": "Discover our most coveted pieces",
    "about.title": "About El Hage Jewelers",
    "testimonials.title": "What Our Clients Say",
    "video.title": "Our Story",
    loading: "Loading...",
    error: "Something went wrong",

    // About Page
    "about.page.title": "Our Legacy",
    "about.page.subtitle":
      "Rooted in tradition yet ever evolving; the House of El Hage Jewelers has carried the soul of its founders into every masterpiece since 1953, holding a memory; shaped by devotion destined to last.",

    // Legacy section
    "about.legacy.title": "A Legacy of Family Craftsmanship Since 1953",
    "about.legacy.intro":
      "Rooted in tradition yet ever evolving; the House of El Hage Jewelers has carried the soul of its founders into every masterpiece since 1953, holding a memory; shaped by devotion destined to last.",
    "about.legacy.description": "",

    // Timeline sections
    "about.timeline.founding.title": "The Founding Era (1953 - 1973)",
    "about.timeline.founding.subtitle": "A Vision is Born",
    "about.timeline.founding.content":
      "Founded in 1953 within Tripoli's historic Gold Souk, El Hage Jewelers began as a disciplined goldsmith atelier. Gold was melted over open flames and shaped by the steady hand of Youssef El Hage, with patience, precision, and devotion to craft.\n\nIn a city long recognized as a hub of fine jewelry craftsmanship in the Levant, the House established a name synonymous with integrity and refined artistry. What began as a humble workshop evolved into one of North Lebanon's most respected luxury jewelry houses.",

    "about.timeline.expansion.title": "Expansion & Recognition (1973 - 1997)",
    "about.timeline.expansion.subtitle": "A Family Tradition Grows",
    "about.timeline.expansion.content":
      "Under Youssef El Hage's leadership, the House expanded beyond Lebanon. Through strategic growth and enduring relationships, El Hage introduced its fine jewelry and bespoke creations to clients across the Gulf region, Europe, and the Americas — positioning Lebanese mastery on an international stage.\n\nWith the arrival of the third generation, Tony El Hage, the House strengthened its global presence while preserving its founding values of precision and timeless elegance.",

    "about.timeline.modernization.title":
      "Modernization & Innovation (1997 - 2003)",
    "about.timeline.modernization.subtitle":
      "The Tony El Hage Era | Diamond Mastery & Gemological Excellence",
    "about.timeline.modernization.content":
      "Among the one of the first GIA-certified gemologists in the Middle East, Tony El Hage elevated the House to international diamond authority. Through direct sourcing and affiliations with leading diamond exchanges, each natural diamond is selected for brilliance, proportion, rarity, and architectural harmony.",

    "about.timeline.luxury.title": "Luxury & Artistry Redefined (2003 - 2026)",
    "about.timeline.luxury.subtitle":
      "The Evolution of Luxury | A Luxury Destination Beyond Borders",
    "about.timeline.luxury.content":
      "Today, El Hage Jewelers operates one of the largest luxury jewelry showrooms in North Lebanon, welcoming clients from Lebanon, the Gulf region, Europe, and the Americas. Recognized for bespoke engagement rings, natural diamond collections, bridal jewelry, and high jewelry masterpieces, the House offers discretion, personalization, and excellence.",

    "about.timeline.future.title": "The Future (2026 & Beyond)",
    "about.timeline.future.subtitle":
      "A Legacy Continues | Continuity of Vision",
    "about.timeline.future.content":
      "As El Hage Jewelers enters its next chapter, its commitment to luxury jewelry, diamond authority, and artistic mastery remains unwavering.\n\nGuided by Tony El Hage, the fourth generation steps forward; carrying the values of precision, integrity, and refinement that define the House.",

    // Artist section
    "about.artist.title": "An Artist Before Anything Else",
    "about.artist.content":
      "From crafting his first marquise diamond ring at fifteen to guiding the House's evolution, Tony El Hage approaches jewelry as sculpture in gold. From sketch to final setting, each masterpiece reflects balance, structure, and intention.",

    // Our Values section
    "about.values.title": "The Maison Philosophy",
    "about.values.subtitle": "",
    "about.values.luxe.title": "Maison de Luxe",
    "about.values.luxe.description":
      "Luxury defined by refinement and meaning.",
    "about.values.exclusive.title": "Maison Exclusive",
    "about.values.exclusive.description": "Every creation is singular.",
    "about.values.classique.title": "Maison Classique",
    "about.values.classique.description":
      "Timeless sophistication beyond trend.",

    // Masterpiece section (kept for compatibility but merged into artist)
    "about.story.title": "Our Story",
    "about.story.content":
      "Rooted in tradition yet ever evolving; the House of El Hage Jewelers has carried the soul of its founders into every masterpiece since 1953, holding a memory; shaped by devotion destined to last.",
    "about.masterpiece.title": "A Masterpiece in Motion",
    "about.masterpiece.content":
      "From sketch to final setting, each masterpiece reflects balance, structure, and intention. El Hage is not just worn. It is lived. It is remembered. It is eternal.",

    // Final sections
    "about.anniversary.title": "A Legacy Since 1953",
    "about.experience.title": "Experience Our Legacy",
    "about.experience.subtitle":
      "Discover the artistry and craftsmanship that has defined El Hage Jewelers for over seven decades",
    "about.experience.appointment": "Book an Appointment",
    "about.experience.collections": "Our Collections",

    // Legal pages
    "privacy.title": "Privacy Policy",
    "privacy.description":
      "At El Hage Jewelers, we respect your privacy and are committed to protecting your personal information.",
    "privacy.subtitle":
      "This is an informational site and not an e-commerce storefront.",
    "privacy.lastUpdated": "Last updated: March 2026.",

    "terms.title": "Terms & Conditions",
    "terms.description":
      "These terms govern your use of the El Hage Jewelers website.",
    "terms.effectiveDate": "Effective date: March 2026.",

    // Contact Page
    "contact.hero.title": "Get In Touch",
    "contact.hero.subtitle":
      "Connect with us for inquiries about our collections or to schedule a private consultation",
    "contact.info.title": "Visit Our Showroom",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    "contact.info.hours": "Hours",
    "contact.form.title": "Send us a Message",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.form.optional": "Optional",
  },
  ar: {
    // Navigation - Arabic
    "nav.collections": "المجموعات",
    "nav.categories": "الفئات",
    "nav.about": "إرثنا",
    "nav.contact": "اتصل بنا",
    "nav.appointment": "احجز موعد",

    // Hero - Arabic
    "hero.title": "مجوهرات رائعة منذ ١٩٥٣",
    "hero.subtitle": "اكتشف مجموعاتنا الخالدة من المجوهرات الفاخرة",
    "hero.cta": "استكشف المجموعات",

    // General - Arabic
    "collections.title": "مجموعاتنا",
    "collections.subtitle": "مصنوعة يدوياً بدقة وشغف",
    "products.title": "المنتجات المميزة",
    "products.subtitle": "اكتشف قطعنا الأكثر رواجاً",
    "about.title": "حول مجوهرات الحاج",
    "testimonials.title": "ما يقوله عملاؤنا",
    "video.title": "قصتنا",
    loading: "جاري التحميل...",
    error: "حدث خطأ ما",

    // About Page - Arabic
    "about.page.title": "إرثنا",
    "about.page.subtitle":
      "متجذرة في التقاليد ومتطورة باستمرار؛ حملت دار الحاج للمجوهرات روح مؤسسيها في كل تحفة فنية منذ عام ١٩٥٣، تحمل ذكرى؛ شُكّلت بالتفاني لتدوم.",

    // Legacy section - Arabic
    "about.legacy.title": "إرث من الحرفية العائلية منذ ١٩٥٣",
    "about.legacy.intro":
      "متجذرة في التقاليد ومتطورة باستمرار؛ حملت دار الحاج للمجوهرات روح مؤسسيها في كل تحفة فنية منذ عام ١٩٥٣، تحمل ذكرى؛ شُكّلت بالتفاني لتدوم.",
    "about.legacy.description": "",

    // Timeline sections - Arabic
    "about.timeline.founding.title": "عصر التأسيس (١٩٥٣ - ١٩٧٣)",
    "about.timeline.founding.subtitle": "ولادة رؤية",
    "about.timeline.founding.content":
      "تأسست مجوهرات الحاج عام ١٩٥٣ في سوق الذهب التاريخي بطرابلس، بدأت كمحترف صياغة ذهب منضبط. كان الذهب يُذاب على نيران مكشوفة ويُشكّل بيد يوسف الحاج الثابتة، بصبر ودقة وتفانٍ في الحرفة.\n\nفي مدينة اعتُرف بها منذ أمد بعيد كمركز للمجوهرات الفاخرة في بلاد الشام، أرست الدار اسماً مرادفاً للنزاهة والفنية الراقية. ما بدأ كورشة متواضعة تطوّر ليصبح أحد أكثر دور المجوهرات الفاخرة احتراماً في شمال لبنان.",

    "about.timeline.expansion.title": "التوسع والاعتراف (١٩٧٣ - ١٩٩٧)",
    "about.timeline.expansion.subtitle": "نمو تقليد عائلي",
    "about.timeline.expansion.content":
      "في عهد يوسف الحاج، توسعت الدار خارج حدود لبنان. من خلال النمو الاستراتيجي والعلاقات الدائمة، قدّمت الحاج مجوهراتها الفاخرة وإبداعاتها المخصصة لعملاء في منطقة الخليج وأوروبا والأمريكتين — راسخةً الحرفية اللبنانية على الساحة الدولية.\n\nمع وصول الجيل الثالث، طوني الحاج، عزّزت الدار وجودها العالمي مع الحفاظ على قيمها التأسيسية من الدقة والأناقة الخالدة.",

    "about.timeline.modernization.title": "التحديث والابتكار (١٩٩٧ - ٢٠٠٣)",
    "about.timeline.modernization.subtitle":
      "عصر طوني الحاج | إتقان الألماس والتميز في علم الأحجار الكريمة",
    "about.timeline.modernization.content":
      "بوصفه من أوائل علماء الأحجار الكريمة المعتمدين من GIA في الشرق الأوسط، رفع طوني الحاج مكانة الدار إلى مرجعية الألماس الدولية. من خلال التوريد المباشر والانتماء إلى بورصات الألماس الرائدة، يُختار كل ألماس طبيعي وفق معايير التألق والتناسب والندرة والتناسق المعماري.",

    "about.timeline.luxury.title": "إعادة تعريف الترف والفنية (٢٠٠٣ - ٢٠٢٦)",
    "about.timeline.luxury.subtitle": "تطور الترف | وجهة فاخرة تتجاوز الحدود",
    "about.timeline.luxury.content":
      "اليوم، تدير مجوهرات الحاج أحد أكبر صالات عرض المجوهرات الفاخرة في شمال لبنان، مرحّبةً بعملاء من لبنان ومنطقة الخليج وأوروبا والأمريكتين. تُعرف الدار بخواتم الخطوبة المخصصة ومجموعات الألماس الطبيعي ومجوهرات العرائس وتحف المجوهرات الراقية، وتقدّم الخصوصية والتخصيص والتميز.",

    "about.timeline.future.title": "المستقبل (٢٠٢٦ وما بعدها)",
    "about.timeline.future.subtitle": "استمرار الإرث | استمرارية الرؤية",
    "about.timeline.future.content":
      "مع دخول مجوهرات الحاج فصلها التالي، يبقى التزامها بالمجوهرات الفاخرة وسلطة الألماس والإتقان الفني ثابتاً.\n\nبإرشاد طوني الحاج، يتقدم الجيل الرابع؛ حاملاً قيم الدقة والنزاهة والرقي التي تُعرّف الدار.",

    // Artist section - Arabic
    "about.artist.title": "فنان قبل أي شيء آخر",
    "about.artist.content":
      "من صياغة أول خاتم ألماس ماركيز له في سن الخامسة عشرة إلى قيادة تطور الدار، يتعامل طوني الحاج مع المجوهرات كنحت في الذهب. من الرسم إلى الترصيع النهائي، كل تحفة فنية تعكس التوازن والبنية والنية.",

    // Our Values section - Arabic
    "about.values.title": "فلسفة الدار",
    "about.values.subtitle": "",
    "about.values.luxe.title": "Maison de Luxe",
    "about.values.luxe.description": "الترف محدَّد بالتنقيح والمعنى.",
    "about.values.exclusive.title": "Maison Exclusive",
    "about.values.exclusive.description": "كل إبداع فريد من نوعه.",
    "about.values.classique.title": "Maison Classique",
    "about.values.classique.description": "رقي خالد يتجاوز الموضة.",

    // Kept for compatibility
    "about.story.title": "قصتنا",
    "about.story.content":
      "متجذرة في التقاليد ومتطورة باستمرار؛ حملت دار الحاج للمجوهرات روح مؤسسيها في كل تحفة فنية منذ عام ١٩٥٣.",
    "about.masterpiece.title": "تحفة فنية متحركة",
    "about.masterpiece.content":
      "من الرسم إلى الترصيع النهائي، كل تحفة فنية تعكس التوازن والبنية والنية. الحاج لا يُرتدى فقط. إنه يُعاش. يُتذكر. إنه أبدي.",

    // Final sections - Arabic
    "about.anniversary.title": "إرث منذ ١٩٥٣",
    "about.experience.title": "اختبر إرثنا",
    "about.experience.subtitle":
      "اكتشف الفنية والحرفية التي ميزت مجوهرات الحاج لأكثر من سبعة عقود",
    "about.experience.appointment": "احجز موعد",
    "about.experience.collections": "مجموعاتنا",

    // Legal pages
    "privacy.title": "سياسة الخصوصية",
    "privacy.description":
      "في مجوهرات الحاج، نحترم خصوصيتك وملتزمون بحماية معلوماتك الشخصية.",
    "privacy.subtitle": "هذا موقع معلوماتي وليس متجر تجارة إلكترونية.",
    "privacy.lastUpdated": "آخر تحديث: مارس ٢٠٢٦.",

    "terms.title": "الشروط والأحكام",
    "terms.description": "هذه الشروط تحكم استخدامك لموقع مجوهرات الحاج.",
    "terms.effectiveDate": "تاريخ السريان: مارس ٢٠٢٦.",

    // Contact Page
    "contact.hero.title": "تواصل معنا",
    "contact.hero.subtitle":
      "تواصل معنا للاستفسار عن مجموعاتنا أو لحجز استشارة خاصة",
    "contact.info.title": "زر صالة عرضنا",
    "contact.info.address": "العنوان",
    "contact.info.phone": "الهاتف",
    "contact.info.email": "البريد الإلكتروني",
    "contact.info.hours": "ساعات العمل",
    "contact.form.title": "أرسل لنا رسالة",
    "contact.form.name": "الاسم الكامل",
    "contact.form.email": "عنوان البريد الإلكتروني",
    "contact.form.phone": "رقم الهاتف",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال الرسالة",
    "contact.form.optional": "اختياري",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  isRTL: false,
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { country, isLoading } = useLocation();
  const [language, setLanguage] = useState<"en" | "ar">("en");

  useEffect(() => {
    if (!isLoading) {
      if (country === "UAE" || country === "KSA") {
        setLanguage("ar");
      } else {
        setLanguage("en");
      }
    }
  }, [country, isLoading]);

  const isRTL = language === "ar";

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [isRTL, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      <div className={`${isRTL ? "rtl font-arabic" : "ltr"}`}>{children}</div>
    </LanguageContext.Provider>
  );
}
