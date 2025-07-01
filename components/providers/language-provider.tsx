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
    // Existing translations...
    "nav.collections": "Collections",
    "nav.categories": "Categories",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.appointment": "Book an Appointment",
    "hero.title": "Exquisite Jewelry Since 1953",
    "hero.subtitle": "Discover our timeless collections of luxury jewelry",
    "hero.cta": "Explore Collections",
    "collections.title": "Our Collections",
    "collections.subtitle": "Handcrafted with precision and passion",
    "products.title": "Featured Products",
    "products.subtitle": "Discover our most coveted pieces",
    "about.title": "About El Hage Jewelers",
    "testimonials.title": "What Our Clients Say",
    "video.title": "Our Story",
    loading: "Loading...",
    error: "Something went wrong",

    // Updated About page translations
    "about.page.title":
      "El Hage Jewelers: The Alchemy of Time, Craft, and Soul",
    "about.page.subtitle":
      "Jewellery is more than an adornment; it is the silent keeper of stories, the heirloom of love, the echo of moments turned eternal.",

    // Our Story section - Updated
    "about.story.title": "Our Story",
    "about.story.content":
      "Gold, in its rawest form, is but metal; until hands imbue it with purpose. Diamonds, though forged by time and pressure, only find their meaning when set with intention. And in the heart of every masterpiece lies the unseen: the soul of its maker, the whispers of generations past, the vision of a future yet to be crafted.\n\nRooted in tradition yet ever-evolving; for over 70 years, the house of El Hage carries the soul of its founders, refining its artistry from hand-engraved heritage to cutting-edge innovation.\n\nAt the heart of this evolution stands Tony El Hage, the third-generation visionary who infused fresh energy into the family craft. He is not merely preserving a name; he is sculpting its future; bridging the timeless elegance of tradition with the limitless possibilities of modern technology.\n\nFor Tony El Hage, jewellery is not just an ornament; it is an emotion cast in Gold, embedded in Gems, a sculpture of dreams, and a promise of eternity.",

    // Artist section - New
    "about.artist.title": "An Artist Before Anything Else",
    "about.artist.content":
      "At just 15 years old, Tony El Hage created his first masterpiece; a diamond marquise shaped ring; an ode to precision and elegance. That piece was not just jewellery; it was the whisper of destiny, the first step on a lifelong journey of creation.\n\nFrom that defining moment to the unveiling of the largest jewellery showroom in North Lebanon, Tony El Hage has never wavered in his pursuit of excellence. His hands have shaped pieces that do not just sit on the skin; they speak to the soul. While El Hage is proudly a business, it is one that has never traded integrity for trend, nor artistry for profit. Every piece remains true to its soul; he is in the art of crafting heirlooms, each piece destined to outlive trends and transcend generations.",

    // Our Values section - Updated
    "about.values.title": "A Philosophy in Three Words",
    "about.values.subtitle":
      "This unwavering dedication to excellence is rooted in a deeper philosophy; one that defines the soul of El Hage Jewelers in just three pillars:",
    "about.values.luxe.title": "Maison de Luxe",
    "about.values.luxe.description":
      "Where luxury is not just about opulence, but about refinement, artistry, and meaning.",
    "about.values.exclusive.title": "Maison Exclusive",
    "about.values.exclusive.description":
      "A realm where no two pieces are alike, and every creation tells its own story.",
    "about.values.classique.title": "Maison Classique",
    "about.values.classique.description":
      "A tribute to sophistication, where craftsmanship and refinement never fade.",

    // Masterpiece section - New
    "about.masterpiece.title": "A Masterpiece in Motion",
    "about.masterpiece.content":
      "From the first pencil stroke on paper to the final sparkle on a client's hand, Tony El Hage is present in every step of creation. He does not just design; he dreams, he envisions, he sculpts. Every Masterpiece carries the weight of his dedication. Every setting is a tribute to perfection.\n\nAnd so, with each passing year, El Hage Jewelers continues its journey; a house built not merely on gold and gems, but on legacy, vision, and the unwavering belief that true artistry knows no limits.\n\nEl Hage is not just worn. It is lived. It is remembered. It is eternal.",

    // Legacy section - Updated
    "about.legacy.title": "El Hage Jewelers: A Legacy of 75 Years",
    "about.legacy.intro":
      "Jewelry is a language without words, a whisper of love etched in brilliance. It carries the weight of unspoken promises, the warmth of a touch long gone, and the silent poetry of moments too precious to fade. Each piece is a soul's echo, a memory made tangible, a spark of eternity resting against the skin.",
    "about.legacy.description":
      "For 75 years, El Hage Jewelers has not merely crafted jewelry; it has translated emotions into form, turning unspoken sentiments and cherished experiences into lasting treasures. Every creation is a testament to exceptional craftsmanship, a reflection of the hands that shape it and the hearts that will hold it; where raw beauty is refined with intention, shaped by devotion, and destined to become a silent witness to life's most profound moments.",

    // Timeline sections
    "about.timeline.founding.title": "The Founding Era (1953 - 1973)",
    "about.timeline.founding.subtitle": "A Vision is Born",
    "about.timeline.founding.content":
      "In 1953, nestled within the heart of Tripoli's old souk—a labyrinth of stone-paved alleys echoing with the sounds of hammers and fire—El Hage Jewelers was born. At the time, Tripoli had already cemented its status as a regional hub for goldsmithing and fine jewelry, with a heritage that traced back to the late Ottoman era. Over the decades, the city had become a celebrated epicenter of craftsmanship, attracting merchants and artisans from across Lebanon and the Levant.\n\nWithin this cultural and artisanal cradle, El Hage began as a small, humble workshop, where jewelry was crafted entirely by hand using time-honored techniques passed down through generations. Gold was melted over open flames, delicately shaped, engraved, and polished with rudimentary tools—yet the results gleamed with unmatched soul and precision.\n\nThe legacy began with Youssef El Hage, who entered the world of gold at the age of just eight, learning the métier from his father. By the age of twelve, with remarkable maturity and a spark of entrepreneurial spirit, he was already taking the bus from Tripoli to Beirut, trading and reselling gold bracelets. Through his sharp instinct, strategic sales approach, and unwavering confidence, Youssef steadily built his own capital. His humility, trustworthiness, and business acumen laid the foundation for what El Hage Jewelers would soon become.\n\nAmid Tripoli's thriving craft scene, El Hage quickly rose as a name of distinction. Each creation carried the weight of tradition and the warmth of human touch. What began as one artisan's vision evolved into a legacy of excellence—becoming a cornerstone of Tripoli's golden heritage and a trusted symbol of artistry and integrity.",

    "about.timeline.expansion.title": "Expansion & Recognition (1973 - 1997)",
    "about.timeline.expansion.subtitle": "A Family Tradition Grows",
    "about.timeline.expansion.content":
      "El Hage Jewelers grew beyond its origins, refining its artistry and introducing collections that resonated across generations. This era marked a pivotal phase of expansion; one fueled by vision, resilience, and the pursuit of excellence.\n\nDuring this time, Youssef El Hage extended the brand's reach internationally, building trusted relationships and introducing El Hage's craftsmanship to new markets. His business acumen and commitment to integrity positioned the name as a symbol of quality far beyond Lebanon.\n\nThe momentum continued as Tony El Hage, the third generation, broadened the house's horizons even further; establishing a presence in the Gulf, Europe and the Americas. Through strategic growth and a deep understanding of global tastes, Tony expanded El Hage's circle of clients while preserving the soul of the brand.\n\nWith a reputation built on precision and elegance, El Hage became synonymous with custom-made creations; each piece capturing life's most meaningful moments. This was a period when Lebanese craftsmanship transcended borders, and the name El Hage emerged as a hallmark of timeless sophistication in the world of fine jewelry.",

    "about.timeline.modernization.title":
      "Modernization & Innovation (1997 - 2003)",
    "about.timeline.modernization.subtitle": "The Tony El Hage Era",
    "about.timeline.modernization.content":
      "As jewelry trends evolved, the third generation of El Hage Jewelers embraced innovation with a deep reverence for the house's legacy. This era marked a pivotal transformation; where tradition was reimagined through a lens of modern sophistication, and luxury took on a new dimension.\n\nDriven by a profound passion for gemstone discovery, Tony El Hage developed a personal connection with mine exploration and the sourcing of diverse, high-quality gems from around the world. His pursuit of rare gems enriched the brand's collections, adding new layers of uniqueness and depth to each creation.\n\nIn 1998, Tony El Hage became one of the first GIA-certified gemologists in the Middle East. That pivotal year also marked the beginning of his transformation of the El Hage identity; blending technical excellence with creative innovation. His international recognition as Bourse Membre, one of the world's leading diamond exchanges, further solidified the brand's place on the global luxury stage.\n\nFrom bridal elegance to everyday sophistication, El Hage's bespoke designs became known for their intricate detailing, diamond mastery, and signature refinement; setting new standards in craftsmanship across Lebanon, the Gulf, Europe and the Americas.",

    "about.timeline.luxury.title": "Luxury & Artistry Redefined (2003 - 2028)",
    "about.timeline.luxury.subtitle": "The Evolution of Luxury",
    "about.timeline.luxury.content":
      "This era honors the brand's rich heritage while embracing bold innovation crafting designs that embody fluidity, freedom, and the timeless poetry of beauty in motion. Through his refined artistic lens, Tony positioned El Hage as a leader in luxury design, creating not just ornaments, but personal legacies.\n\nImportantly, El Hage sustained and expanded its global presence during this period, growing across the Gulf, Europe and the Americas. This international foundation stood as a vital anchor during Lebanon's more challenging times, preserving the house's unwavering commitment to excellence. Global growth emerged as both a strategic pillar and a reflection of the brand's enduring appeal, trust, and vision.",

    "about.timeline.future.title": "The Future (2028 & Beyond)",
    "about.timeline.future.subtitle": "A Legacy Continues",
    "about.timeline.future.content":
      "As El Hage Jewelers steps into its next chapter, its commitment to redefining jewelry artistry remains unwavering. With a growing portfolio of signature collections, a broader global presence, and a vision that transcends time, the future promises to be one of innovation, elegance, and enduring legacy.\n\nThe journey of heritage and craftsmanship continues; rooted in tradition, evolving with creativity, and destined to leave a lasting imprint on the world of fine jewelry.\n\nToday, the fourth generation of El Hage is officially stepping into the spotlight, carrying forward the values, artistry, and excellence that have defined the house since 1953. Under the guidance and mentorship of Tony El Hage, they are set to write a new chapter; one that honors the past while imagining the future with bold vision and youthful perspective.",

    "about.anniversary.title": "Celebrating 75 Years of Legacy and Excellence",
    "about.experience.title": "Experience Our Legacy",
    "about.experience.subtitle":
      "Discover the artistry and craftsmanship that has defined El Hage Jewelers for over seven decades",
    "about.experience.appointment": "Book an Appointment",
    "about.experience.collections": "Our Collections",
  },
  ar: {
    // Existing Arabic translations...
    "nav.collections": "المجموعات",
    "nav.categories": "الفئات",
    "nav.about": "حولنا",
    "nav.contact": "اتصل بنا",
    "nav.appointment": "احجز موعد",
    "hero.title": "مجوهرات رائعة منذ ١٩٥٣",
    "hero.subtitle": "اكتشف مجموعاتنا الخالدة من المجوهرات الفاخرة",
    "hero.cta": "استكشف المجموعات",
    "collections.title": "مجموعاتنا",
    "collections.subtitle": "مصنوعة يدوياً بدقة وشغف",
    "products.title": "المنتجات المميزة",
    "products.subtitle": "اكتشف قطعنا الأكثر رواجاً",
    "about.title": "حول مجوهرات الحاج",
    "testimonials.title": "ما يقوله عملاؤنا",
    "video.title": "قصتنا",
    loading: "جاري التحميل...",
    error: "حدث خطأ ما",

    // Updated About page Arabic translations
    "about.page.title": "الحاج للمجوهرات: كيمياء الزمن، الحرفة والروح",
    "about.page.subtitle":
      "المجوهرات ليست زينة تُرتدى، بل سرد صامت يهمس دون كلمات. هي ذكرى مغروسة في نبض الذهب، ووعد موتوم بوميض لا يخفت.",

    // Our Story section - Updated
    "about.story.title": "قصتنا",
    "about.story.content":
      "الذهب، في جوهره، مجرد معدن حتى تمر عليه يد تعرف الغاية وتنفخ فيه الروح. أما الألماس، مهما صقله الزمن وضغطه، لا يجد معناه إلا حين يُصاغ بنية وتثبت بمكان اختير له بالعاطفة والبصيرة.\n\nفي كل قطعة تصنعها دار الحاج، هناك ما لا يُرى: روح الصانع، أنفاس الأجداد، وهمسات المستقبل الذي لم يُكتب بعد. لأكثر من سبعين عاماً، ظلت هذه الروح تنبض في قلب الدار، تتجدد مع كل جيل، من النقش اليدوي الدقيق إلى الابتكار الذي يعانق المستقبل.\n\nإنها ليست داراً تواكب الزمن فحسب، بل دار تعيد تشكيله كما يعيد تشكيل الذهب في يد من يرى ما لا يرى في قلب هذه المسيرة، يقف طوني الحاج، حفيد المؤسسين ووريث الرؤية.\n\nليس مجرد حافظ اسم، بل نحات المستقبل. يربط أناقة الماضي الخالدة بآفاق التكنولوجيا اللامحدودة، ويمزج بين الحرفة والإحساس، بين الدقة الهندسية واللمسة الإنسانية. في عينه، المجوهرات ليست سلعة، ولا نصيحة؛ بل إحساس يُصب، حلم يُجسد، ووعد يُخلد.",

    // Artist section - New
    "about.artist.title": "فنان قبل أن يكون صائغاً",
    "about.artist.content":
      "في سن الخامسة عشرة، لم يصنع طوني خاتماً فحسب بل وضع أول حجر أساس لمسيرته. قطعة ألماس بشكل الماركيز، كانت أكثر من مجوهرات؛ كانت همسة قدر. لحظة حملت داخلها ملامح المستقبل، وبداية رحلة لم تنقطع يوماً.\n\nمن تلك اللمسة الأولى، إلى افتتاح أكبر صالة عرض للمجوهرات في شمال لبنان، لم تتغير اليد. يد تنحت بإحساس، وتخلق بقناعة، وترفض المساومة بين المعنى والمظهر.\n\nدار الحاج لم تكن يوماً مجرد مشروع تجاري، بل صوت فن نقي، وإرث أخلاقي، ومدرسة في الصدق مع الذات. كل قطعة وُلدت لتبقى للتوريث، وتروى، وتعيش.",

    // Our Values section - Updated
    "about.values.title": "فلسفة تختصر بثلاث كلمات",
    "about.values.subtitle": "ثلاث كلمات، ثلاث عوالم، تختصر جوهر الحاج:",
    "about.values.luxe.title": "Maison de Luxe",
    "about.values.luxe.description":
      "حيث الفخامة لا تُقاس بالبذخ، بل بالرقي، والفن، والمعنى الكامن في كل تفصيل",
    "about.values.exclusive.title": "Maison Exclusive",
    "about.values.exclusive.description":
      "عالم لا يتكرر فيه تصميم، ولا تشبه فيه قطعة أخرى. كل إبداع يولد وكأنه الوحيد وكأنه السرمدي",
    "about.values.classique.title": "Maison Classique",
    "about.values.classique.description":
      "تحية للذوق الأصيل، حيث البراعة لا تهرم، والصنعة لا تبهت، والأسلوب لا يخضع للزمن",

    // Masterpiece section - New
    "about.masterpiece.title": "تحفة تولد من الحلم",
    "about.masterpiece.content":
      "من أول سطر بالقلم إلى آخر بريق على يد امرأة، يكون طوني الحاج حاضراً. لا يرسم فقط، بل يحلم، يتأمل، ويمنح الجماد حياة. كل تفصيلة تحمل بصمته، وكل حجر – أو بالأحرى، كل وميض سرمدي – هو ترجمة لرحلة داخلية لا تُرى، لكنها تُحس.\n\nدار الحاج لا تُقاس أعوامها بالتقويم، بل بما تركته في القلب. ليست داراً بُنيت على الذهب والأحجار فقط، بل على الإرث، والرؤية، والإيمان العميق بأن الفن الحقيقي لا يعرف حدوداً، وأن القطعة الصادقة لا تعبر الموضة، بل تعبر الزمن.\n\nالحاج لا يُرتدى فقط.\nبل يُعاش\nويُروى\nويُورث",

    // Legacy section - Updated
    "about.legacy.title": "مجوهرات الحاج: إرث من ٧٥ عاماً",
    "about.legacy.intro":
      "المجوهرات لغة بلا كلمات، همسة حب محفورة في البريق. تحمل ثقل الوعود غير المنطوقة، ودفء لمسة ذهبت منذ زمن بعيد، والشعر الصامت للحظات ثمينة جداً لتذبل.",
    "about.legacy.description":
      "لمدة ٧٥ عاماً، لم تكتف مجوهرات الحاج بصناعة المجوهرات فحسب؛ بل ترجمت المشاعر إلى شكل، محولة المشاعر غير المعبر عنها والتجارب العزيزة إلى كنوز دائمة.",

    // Timeline sections
    "about.timeline.founding.title": "عصر التأسيس (١٩٥٣ - ١٩٧٣)",
    "about.timeline.founding.subtitle": "ولادة رؤية",
    "about.timeline.founding.content":
      "في عام ١٩٥٣، وُلدت مجوهرات الحاج في قلب سوق طرابلس القديم...",

    "about.timeline.expansion.title": "التوسع والاعتراف (١٩٧٣ - ١٩٩٧)",
    "about.timeline.expansion.subtitle": "نمو تقليد عائلي",
    "about.timeline.expansion.content":
      "نمت مجوهرات الحاج خارج أصولها، مصقلة فنها ومقدمة مجموعات رنت عبر الأجيال...",

    "about.timeline.modernization.title": "التحديث والابتكار (١٩٩٧ - ٢٠٠٣)",
    "about.timeline.modernization.subtitle": "عصر طوني الحاج",
    "about.timeline.modernization.content":
      "مع تطور اتجاهات المجوهرات، احتضن الجيل الثالث من مجوهرات الحاج الابتكار مع احترام عميق لإرث الدار...",

    "about.timeline.luxury.title": "إعادة تعريف الترف والفنية (٢٠٠٣ - ٢٠٢٨)",
    "about.timeline.luxury.subtitle": "تطور الترف",
    "about.timeline.luxury.content":
      "هذا العصر يكرم التراث الغني للعلامة التجارية بينما يحتضن الابتكار الجريء...",

    "about.timeline.future.title": "المستقبل (٢٠٢٨ وما بعدها)",
    "about.timeline.future.subtitle": "استمرار الإرث",
    "about.timeline.future.content":
      "بينما تخطو مجوهرات الحاج إلى فصلها التالي، يبقى التزامها بإعادة تعريف فن المجوهرات ثابتاً...",

    "about.anniversary.title": "احتفال بـ ٧٥ عاماً من الإرث والتميز",
    "about.experience.title": "اختبر إرثنا",
    "about.experience.subtitle":
      "اكتشف الفنية والحرفية التي ميزت مجوهرات الحاج لأكثر من سبعة عقود",
    "about.experience.appointment": "احجز موعد",
    "about.experience.collections": "مجموعاتنا",
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
