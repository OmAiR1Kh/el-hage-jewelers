"use client";

import { Navbar } from "@/components/ui/navbar";
import { PageTransition } from "@/components/ui/page-transition";
import { useLanguage } from "@/components/providers/language-provider";

const TermsComponent = () => {
  const { language, t } = useLanguage();

  const content = {
    en: {
      title: t("terms.title"),
      intro:
        "These terms and conditions govern your use of the El Hage Jewelers website. By accessing or using this site, you agree to these terms. El Hage Jewelers is a showcase site for jewelry collections and information, not a direct e-commerce store.",
      section1Title: "1. Use of Website",
      section1Text:
        "You may use this website for personal, non-commercial purposes. You agree not to use this site for unlawful purposes or to attempt to disrupt our services.",
      section2Title: "2. Content Accuracy",
      section2Text:
        "We strive for accuracy but do not guarantee that all information is complete, current, or error-free. Product details, availability, and prices are for reference only, and are subject to change.",
      section3Title: "3. Intellectual Property",
      section3Text:
        "All text, images, logos, trademarks, and other materials on this site are owned by or licensed to El Hage Jewelers. Reproduction or use without permission is prohibited.",
      section4Title: "4. Limitation of Liability",
      section4Text:
        "El Hage Jewelers is not liable for direct, indirect, incidental, or consequential damages arising from your use of this website.",
      section5Title: "5. Third-Party Links",
      section5Text:
        "This site may contain links to third-party sites. We are not responsible for their content or privacy practices.",
      section6Title: "6. Governing Law",
      section6Text:
        "These terms are governed by the laws of Lebanon (or another jurisdiction as appropriate). Disputes should be resolved in local courts.",
      section7Title: "7. Changes to Terms",
      section7Text:
        "We may update these terms at any time. Continued use after changes implies acceptance of the updated terms.",
      footerText: t("terms.effectiveDate"),
    },
    ar: {
      title: t("terms.title"),
      intro:
        "تحكم هذه الشروط والأحكام استخدامك لموقع مجوهرات الحاج. عند الوصول إلى هذا الموقع أو استخدامه، فإنك توافق على هذه الشروط. مجوهرات الحاج هو موقع عرض لمجموعات المجوهرات والمعلومات، وليس متجر تجارة إلكترونية مباشر.",
      section1Title: "١. استخدام الموقع",
      section1Text:
        "يمكنك استخدام هذا الموقع لأغراض شخصية وغير تجارية. توافق على عدم استخدام هذا الموقع لأغراض غير قانونية أو محاولة تعطيل خدماتنا.",
      section2Title: "٢. دقة المحتوى",
      section2Text:
        "نسعى للدقة ولكن لا نضمن أن تكون جميع المعلومات كاملة أو حديثة أو خالية من الأخطاء. تفاصيل المنتج والتوفر والأسعار هي للمرجعية فقط وقد تتغير.",
      section3Title: "٣. الملكية الفكرية",
      section3Text:
        "جميع النصوص والصور والشعارات والعلامات التجارية والمواد الأخرى في هذا الموقع مملوكة لـ أو مرخصة لمجوهرات الحاج. يحظر إعادة الإنتاج أو الاستخدام بدون إذن.",
      section4Title: "٤. حد المسؤولية",
      section4Text:
        "لا تتحمل مجوهرات الحاج أي مسؤولية عن الأضرار المباشرة أو غير المباشرة أو العرضية أو التبعية الناشئة عن استخدامك لهذا الموقع.",
      section5Title: "٥. روابط الطرف الثالث",
      section5Text:
        "قد يحتوي هذا الموقع على روابط لمواقع الطرف الثالث. نحن غير مسؤولين عن محتواها أو ممارسات الخصوصية الخاصة بها.",
      section6Title: "٦. القانون الحاكم",
      section6Text:
        "يُحكم هذه الشروط بقوانين لبنان (أو ولاية قضائية أخرى حسب الاقتضاء). يجب حل النزاعات في المحاكم المحلية.",
      section7Title: "٧. التغييرات على الشروط",
      section7Text:
        "قد نقوم بتحديث هذه الشروط في أي وقت. يشير الاستمرار في الاستخدام بعد التغييرات إلى قبول الشروط المحدثة.",
      footerText: t("terms.effectiveDate"),
    },
  };

  const page = content[language];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />

        <main className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold mb-5">{page.title}</h1>

          <p className="text-base leading-relaxed mb-4">{page.intro}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section1Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section1Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section2Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section2Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section3Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section3Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section4Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section4Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section5Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section5Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section6Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section6Text}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section7Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section7Text}</p>
          </section>

          <p className="text-sm leading-relaxed text-gray-600">
            {page.footerText}
          </p>
        </main>
      </div>
    </PageTransition>
  );
};

export default TermsComponent;
