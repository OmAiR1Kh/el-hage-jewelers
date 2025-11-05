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

    // About Page - Complete Content
    "about.page.title":
      "El Hage Jewelers: The Alchemy of Time, Craft, and Soul",
    "about.page.subtitle":
      "Jewellery is more than an adornment; it is the silent keeper of stories, the heirloom of love, the echo of moments turned eternal.",

    // Our Story section
    "about.story.title": "Our Story",
    "about.story.content":
      "Gold, in its rawest form, is but metal; until hands imbue it with purpose. Diamonds, though forged by time and pressure, only find their meaning when set with intention. And in the heart of every masterpiece lies the unseen: the soul of its maker, the whispers of generations past, the vision of a future yet to be crafted.\n\nRooted in tradition yet ever-evolving; for over 70 years, the house of El Hage carries the soul of its founders, refining its artistry from hand-engraved heritage to cutting-edge innovation.\n\nAt the heart of this evolution stands Tony El Hage, the third-generation visionary who infused fresh energy into the family craft. He is not merely preserving a name; he is sculpting its future; bridging the timeless elegance of tradition with the limitless possibilities of modern technology.\n\nFor Tony El Hage, jewellery is not just an ornament; it is an emotion cast in Gold, embedded in Gems, a sculpture of dreams, and a promise of eternity.",

    // Artist section
    "about.artist.title": "An Artist Before Anything Else",
    "about.artist.content":
      "At just 15 years old, Tony El Hage created his first masterpiece; a diamond marquise shaped ring; an ode to precision and elegance. That piece was not just jewellery; it was the whisper of destiny, the first step on a lifelong journey of creation.\n\nFrom that defining moment to the unveiling of the largest jewellery showroom in North Lebanon, Tony El Hage has never wavered in his pursuit of excellence. His hands have shaped pieces that do not just sit on the skin; they speak to the soul. While El Hage is proudly a business, it is one that has never traded integrity for trend, nor artistry for profit. Every piece remains true to its soul; he is in the art of crafting heirlooms, each piece destined to outlive trends and transcend generations.",

    // Our Values section
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

    // Masterpiece section
    "about.masterpiece.title": "A Masterpiece in Motion",
    "about.masterpiece.content":
      "From the first pencil stroke on paper to the final sparkle on a client's hand, Tony El Hage is present in every step of creation. He does not just design; he dreams, he envisions, he sculpts. Every Masterpiece carries the weight of his dedication. Every setting is a tribute to perfection.\n\nAnd so, with each passing year, El Hage Jewelers continues its journey; a house built not merely on gold and gems, but on legacy, vision, and the unwavering belief that true artistry knows no limits.\n\nEl Hage is not just worn. It is lived. It is remembered. It is eternal.",

    // Legacy section
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

    // Final sections
    "about.anniversary.title": "Celebrating 75 Years of Legacy and Excellence",
    "about.experience.title": "Experience Our Legacy",
    "about.experience.subtitle":
      "Discover the artistry and craftsmanship that has defined El Hage Jewelers for over seven decades",
    "about.experience.appointment": "Book an Appointment",
    "about.experience.collections": "Our Collections",
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

    // About Page - Complete Arabic Content
    "about.page.title": "الحاج للمجوهرات: كيمياء الزمن والحرفة والروح",
    "about.page.subtitle":
      "المجوهرات أكثر من زينة؛ إنها الحارس الصامت للقصص، ميراث الحب، صدى اللحظات التي تحولت إلى خلود.",

    // Our Story section - Arabic
    "about.story.title": "قصتنا",
    "about.story.content":
      "الذهب، في أنقى أشكاله، مجرد معدن؛ حتى تمنحه الأيدي غرضاً وتنفخ فيه الروح. والألماس، رغم تشكيله بفعل الزمن والضغط، لا يجد معناه إلا عندما يُرصع بنية صادقة. وفي قلب كل تحفة فنية يكمن غير المرئي: روح صانعها، همسات الأجيال الماضية، ورؤية مستقبل لم يُنحت بعد.\n\nمتجذرة في التقاليد ومتطورة باستمرار؛ لأكثر من ٧٠ عاماً، تحمل دار الحاج روح مؤسسيها، مصقلة فنها من التراث المحفور يدوياً إلى الابتكار المتطور.\n\nوفي قلب هذا التطور يقف طوني الحاج، الرؤيوي من الجيل الثالث الذي ضخ طاقة جديدة في الحرفة العائلية. إنه لا يحافظ على اسم فحسب؛ بل ينحت مستقبله؛ جاسراً الأناقة الخالدة للتقاليد مع الإمكانيات اللامحدودة للتكنولوجيا الحديثة.\n\nبالنسبة لطوني الحاج، المجوهرات ليست مجرد زينة؛ إنها عاطفة منصوبة في الذهب، مدمجة في الأحجار الكريمة، منحوتة من الأحلام، ووعد بالأبدية.",

    // Artist section - Arabic
    "about.artist.title": "فنان قبل أي شيء آخر",
    "about.artist.content":
      "في سن الخامسة عشرة فقط، أبدع طوني الحاج تحفته الأولى؛ خاتم ألماس بشكل الماركيز؛ قصيدة للدقة والأناقة. تلك القطعة لم تكن مجرد مجوهرات؛ كانت همسة القدر، الخطوة الأولى في رحلة إبداع مدى الحياة.\n\nمن تلك اللحظة المحورية إلى الكشف عن أكبر صالة عرض للمجوهرات في شمال لبنان، لم يتزعزع طوني الحاج أبداً في سعيه للتميز. يداه شكلتا قطعاً لا تستقر على البشرة فحسب؛ بل تتحدث إلى الروح. بينما الحاج بفخر عمل تجاري، إلا أنه عمل لم يتاجر أبداً بالنزاهة مقابل الموضة، ولا بالفنية مقابل الربح. كل قطعة تبقى صادقة لروحها؛ إنه في فن صناعة الإرث، كل قطعة مقدرة لها أن تتجاوز الاتجاهات وتتخطى الأجيال.",

    // Our Values section - Arabic
    "about.values.title": "فلسفة في ثلاث كلمات",
    "about.values.subtitle":
      "هذا التفاني الثابت في التميز متجذر في فلسفة أعمق؛ واحدة تعرّف روح مجوهرات الحاج في ثلاث ركائز فقط:",
    "about.values.luxe.title": "Maison de Luxe",
    "about.values.luxe.description":
      "حيث الترف ليس فقط عن البذخ، بل عن التنقيح والفنية والمعنى.",
    "about.values.exclusive.title": "Maison Exclusive",
    "about.values.exclusive.description":
      "عالم حيث لا توجد قطعتان متشابهتان، وكل إبداع يروي قصته الخاصة.",
    "about.values.classique.title": "Maison Classique",
    "about.values.classique.description":
      "تحية للرقي، حيث الحرفية والتنقيح لا يذبلان أبداً.",

    // Masterpiece section - Arabic
    "about.masterpiece.title": "تحفة فنية متحركة",
    "about.masterpiece.content":
      "من أول جرة قلم على الورق إلى آخر بريق على يد العميل، طوني الحاج حاضر في كل خطوة من خطوات الإبداع. إنه لا يصمم فحسب؛ يحلم، يتصور، ينحت. كل تحفة فنية تحمل ثقل تفانيه. كل ترصيع تحية للكمال.\n\nوهكذا، مع كل عام يمر، تواصل مجوهرات الحاج رحلتها؛ دار مبنية ليس فقط على الذهب والأحجار الكريمة، بل على الإرث والرؤية والإيمان الثابت بأن الفنية الحقيقية لا تعرف حدوداً.\n\nالحاج لا يُرتدى فقط. إنه يُعاش. يُتذكر. إنه أبدي.",

    // Legacy section - Arabic
    "about.legacy.title": "مجوهرات الحاج: إرث من ٧٥ عاماً",
    "about.legacy.intro":
      "المجوهرات لغة بلا كلمات، همسة حب محفورة في البريق. تحمل ثقل الوعود غير المنطوقة، ودفء لمسة ذهبت منذ زمن بعيد، والشعر الصامت للحظات ثمينة جداً لتذبل. كل قطعة هي صدى الروح، ذكرى ملموسة، شرارة أبدية تستقر على البشرة.",
    "about.legacy.description":
      "لمدة ٧٥ عاماً، لم تكتف مجوهرات الحاج بصناعة المجوهرات فحسب؛ بل ترجمت المشاعر إلى شكل، محولة المشاعر غير المعبر عنها والتجارب العزيزة إلى كنوز دائمة. كل إبداع شاهد على الحرفية الاستثنائية، انعكاس للأيدي التي تشكله والقلوب التي ستحمله؛ حيث الجمال الخام يُنقح بالنية، يُشكل بالتفاني، ومقدر له أن يصبح شاهداً صامتاً على أعمق لحظات الحياة.",

    // Timeline sections - Arabic
    "about.timeline.founding.title": "عصر التأسيس (١٩٥٣ - ١٩٧٣)",
    "about.timeline.founding.subtitle": "ولادة رؤية",
    "about.timeline.founding.content":
      "في عام ١٩٥٣، وُلدت مجوهرات الحاج في قلب سوق طرابلس القديم—متاهة من الأزقة المرصوفة بالحجارة تتردد فيها أصوات المطارق والنار. في ذلك الوقت، كانت طرابلس قد رسخت مكانتها بالفعل كمركز إقليمي لصياغة الذهب والمجوهرات الفاخرة، بتراث يعود إلى أواخر العهد العثماني. على مدى العقود، أصبحت المدينة مركزاً مشهوراً للحرفية، جاذبة التجار والحرفيين من جميع أنحاء لبنان والشام.\n\nداخل هذا المهد الثقافي والحرفي، بدأت الحاج كورشة صغيرة ومتواضعة، حيث كانت المجوهرات تُصنع بالكامل يدوياً باستخدام تقنيات عريقة متوارثة عبر الأجيال. كان الذهب يُذاب على نيران مكشوفة، يُشكل بدقة، يُنقش، ويُصقل بأدوات بدائية—ومع ذلك كانت النتائج تتألق بروح ودقة لا مثيل لهما.\n\nبدأ الإرث مع يوسف الحاج، الذي دخل عالم الذهب في سن الثامنة فقط، متعلماً المهنة من والده. في سن الثانية عشرة، بنضج ملحوظ وشرارة من الروح الريادية، كان يأخذ الحافلة من طرابلس إلى بيروت، يتاجر ويعيد بيع أساور الذهب. من خلال غريزته الحادة ونهجه الاستراتيجي في البيع وثقته الثابتة، بنى يوسف رأس ماله تدريجياً. تواضعه وجدارته بالثقة وحكمته التجارية وضعت الأساس لما ستصبح عليه مجوهرات الحاج قريباً.\n\nوسط مشهد طرابلس الحرفي المزدهر، نهضت الحاج بسرعة كاسم متميز. كل إبداع حمل ثقل التقاليد ودفء اللمسة الإنسانية. ما بدأ كرؤية حرفي واحد تطور إلى إرث من التميز—ليصبح حجر زاوية في التراث الذهبي لطرابلس ورمزاً موثوقاً للفنية والنزاهة.",

    "about.timeline.expansion.title": "التوسع والاعتراف (١٩٧٣ - ١٩٩٧)",
    "about.timeline.expansion.subtitle": "نمو تقليد عائلي",
    "about.timeline.expansion.content":
      "نمت مجوهرات الحاج خارج أصولها، مصقلة فنها ومقدمة مجموعات رنت عبر الأجيال. هذا العصر شهد مرحلة محورية من التوسع؛ واحدة غذتها الرؤية والمرونة وسعي التميز.\n\nخلال هذا الوقت، وسع يوسف الحاج نطاق العلامة التجارية دولياً، بناء علاقات موثوقة وتقديم حرفية الحاج لأسواق جديدة. حكمته التجارية والالتزام بالنزاهة وضعا الاسم كرمز للجودة بعيداً عن لبنان.\n\nاستمر الزخم مع طوني الحاج، الجيل الثالث، الذي وسع آفاق الدار أكثر؛ مؤسساً وجوداً في الخليج وأوروبا والأمريكتين. من خلال النمو الاستراتيجي والفهم العميق للأذواق العالمية، وسع طوني دائرة عملاء الحاج محافظاً على روح العلامة التجارية.\n\nبسمعة مبنية على الدقة والأناقة، أصبحت الحاج مرادفة للإبداعات المصنوعة خصيصاً؛ كل قطعة تلتقط أهم لحظات الحياة. كانت هذه فترة عندما تجاوزت الحرفية اللبنانية الحدود، وظهر اسم الحاج كعلامة للرقي الخالد في عالم المجوهرات الفاخرة.",

    "about.timeline.modernization.title": "التحديث والابتكار (١٩٩٧ - ٢٠٠٣)",
    "about.timeline.modernization.subtitle": "عصر طوني الحاج",
    "about.timeline.modernization.content":
      "مع تطور اتجاهات المجوهرات، احتضن الجيل الثالث من مجوهرات الحاج الابتكار مع احترام عميق لإرث الدار. هذا العصر شهد تحولاً محورياً؛ حيث أُعيد تصور التقاليد من خلال عدسة الرقي الحديث، والترف اتخذ بعداً جديداً.\n\nمدفوعاً بشغف عميق لاكتشاف الأحجار الكريمة، طور طوني الحاج علاقة شخصية مع استكشاف المناجم وتوريد أحجار كريمة متنوعة وعالية الجودة من حول العالم. سعيه للأحجار الكريمة النادرة أثرى مجموعات العلامة التجارية، مضيفاً طبقات جديدة من التفرد والعمق لكل إبداع.\n\nفي عام ١٩٩٨، أصبح طوني الحاج واحداً من أوائل علماء الأحجار الكريمة المعتمدين من GIA في الشرق الأوسط. تلك السنة المحورية شهدت أيضاً بداية تحويله لهوية الحاج؛ مزج التميز التقني مع الابتكار الإبداعي. اعترافه الدولي كعضو بورصة، واحدة من بورصات الألماس الرائدة في العالم، عزز مكانة العلامة التجارية على المسرح العالمي للترف.\n\nمن أناقة العرائس إلى الرقي اليومي، أصبحت تصاميم الحاج المخصصة معروفة بتفاصيلها المعقدة وإتقان الألماس والتنقيح المميز؛ وضعت معايير جديدة في الحرفية عبر لبنان والخليج وأوروبا والأمريكتين.",

    "about.timeline.luxury.title": "إعادة تعريف الترف والفنية (٢٠٠٣ - ٢٠٢٨)",
    "about.timeline.luxury.subtitle": "تطور الترف",
    "about.timeline.luxury.content":
      "هذا العصر يكرم التراث الغني للعلامة التجارية بينما يحتضن الابتكار الجريء صانعاً تصاميم تجسد السيولة والحرية والشعر الخالد للجمال في حركة. من خلال عدسته الفنية المنقحة، وضع طوني الحاج كقائد في تصميم الترف، خالقاً ليس مجرد زينات، بل إرث شخصي.\n\nمن المهم، أن الحاج حافظت ووسعت وجودها العالمي خلال هذه الفترة، نامية عبر الخليج وأوروبا والأمريكتين. هذا الأساس الدولي وقف كمرساة حيوية خلال أوقات لبنان الأكثر تحدياً، محافظاً على التزام الدار الثابت بالتميز. النمو العالمي برز كركيزة استراتيجية وانعكاس لجاذبية العلامة التجارية الدائمة وثقتها ورؤيتها.",

    "about.timeline.future.title": "المستقبل (٢٠٢٨ وما بعدها)",
    "about.timeline.future.subtitle": "استمرار الإرث",
    "about.timeline.future.content":
      "بينما تخطو مجوهرات الحاج إلى فصلها التالي، يبقى التزامها بإعادة تعريف فن المجوهرات ثابتاً. مع محفظة متنامية من المجموعات المميزة، ووجود عالمي أوسع، ورؤية تتجاوز الزمن، المستقبل يعد بأن يكون واحداً من الابتكار والأناقة والإرث الدائم.\n\nرحلة التراث والحرفية تستمر؛ متجذرة في التقاليد، متطورة بالإبداع، ومقدرة لترك بصمة دائمة على عالم المجوهرات الفاخرة.\n\nاليوم، الجيل الرابع من الحاج يخطو رسمياً إلى الضوء، حاملاً القيم والفنية والتميز التي عرّفت الدار منذ ١٩٥٣. تحت إرشاد وتوجيه طوني الحاج، هم مهيؤون لكتابة فصل جديد؛ واحد يكرم الماضي بينما يتخيل المستقبل برؤية جريئة ومنظور شبابي.",

    // Final sections - Arabic
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
