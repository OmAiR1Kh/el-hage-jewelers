"use client";

import { Navbar } from "@/components/ui/navbar";
import { PageTransition } from "@/components/ui/page-transition";
import { useLanguage } from "@/components/providers/language-provider";

const PrivacyComponent = () => {
  const { language, t } = useLanguage();

  const content = {
    en: {
      title: t("privacy.title"),
      intro:
        "At El Hage Jewelers, we respect your privacy and are committed to protecting the personal information you share with us. This privacy policy explains how we collect, use, and safeguard your information when you visit our website. This site is informational and does not operate as an e-commerce storefront.",
      section1Title: "Information We Collect",
      section1Items: [
        "Contact details you provide via forms (name, email, message).",
        "Cookies and analytics data (site visits, pages viewed, device type).",
        "Browser and usage information to improve the site experience.",
      ],
      section2Title: "How We Use Your Data",
      section2Items: [
        "Responding to your inquiries and service requests.",
        "Improving website content, navigation, and functionality.",
        "Sending administrative emails when you ask us to.",
      ],
      section3Title: "Cookies and Tracking",
      section3Text:
        "We may use cookies or other tracking technologies to personalize your browsing experience, analyze site performance, and support third-party tools. You can manage cookie preferences in your browser settings.",
      section4Title: "Third-Party Services",
      section4Text:
        "We may use trusted third-party providers for analytics, hosting, and messaging. These providers follow their own privacy policies and are authorized to process data on our behalf. We do not sell your personal information.",
      section5Title: "Your Rights",
      section5Text:
        "You may request access to, correction of, or deletion of your personal data. To exercise these rights, contact us at ",
      section5Link: "info@elhagejewelers.com",
      section6Title: "Updates",
      section6Text:
        "We may update this policy from time to time. Changes will be published here with an updated effective date.",
      footerText: t("privacy.lastUpdated"),
    },
    ar: {
      title: t("privacy.title"),
      intro:
        "في مجوهرات الحاج، نحترم خصوصيتك وملتزمون بحماية المعلومات الشخصية التي تشاركها معنا. تشرح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها وحمايتها عند زيارة موقعنا. هذا موقع معلوماتي ولا يعمل كمتجر تجارة إلكترونية.",
      section1Title: "المعلومات التي نجمعها",
      section1Items: [
        "تفاصيل الاتصال التي تقدمها عبر النماذج (الاسم، البريد الإلكتروني، الرسالة).",
        "ملفات تعريف الارتباط وبيانات التحليلات (زيارات الموقع، الصفحات التي تتم مشاهدتها، نوع الجهاز).",
        "معلومات المتصفح والاستخدام لتحسين تجربة الموقع.",
      ],
      section2Title: "كيفية استخدام بياناتك",
      section2Items: [
        "الرد على استفساراتك وطلبات الخدمة.",
        "تحسين محتوى الموقع والتنقل والوظائف.",
        "إرسال رسائل بريد إلكتروني إدارية عند طلبك.",
      ],
      section3Title: "ملفات تعريف الارتباط والتتبع",
      section3Text:
        "قد نستخدم ملفات تعريف الارتباط أو تقنيات تتبع أخرى لتخصيص تجربة التصفح وتحليل أداء الموقع ودعم الأدوات الخارجية. يمكنك إدارة تفضيلات ملفات تعريف الارتباط في إعدادات المتصفح.",
      section4Title: "خدمات الطرف الثالث",
      section4Text:
        "قد نستخدم مزودي خدمات خارجيين موثوقين للتحليلات والاستضافة والرسائل. تتبع هذه الجهات سياسات الخصوصية الخاصة بها، وهي مخولة بمعالجة البيانات نيابة عنا. نحن لا نبيع معلوماتك الشخصية.",
      section5Title: "حقوقك",
      section5Text:
        "يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها. لممارسة هذه الحقوق، اتصل بنا عبر ",
      section5Link: "info@elhagejewelers.com",
      section6Title: "التحديثات",
      section6Text:
        "قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر التغييرات هنا مع تاريخ سريان محدّث.",
      footerText: t("privacy.lastUpdated"),
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
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
              {page.section1Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section2Title}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
              {page.section2Items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section3Title}
            </h2>
            <p className="text-sm leading-relaxed mb-2">{page.section3Text}</p>
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
            <p className="text-sm leading-relaxed">
              {page.section5Text}
              <a
                href="mailto:info@elhagejewelers.com"
                className="text-blue-600 hover:underline"
              >
                {page.section5Link}
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              {page.section6Title}
            </h2>
            <p className="text-sm leading-relaxed">{page.section6Text}</p>
          </section>

          <p className="text-sm leading-relaxed text-gray-600">
            {page.footerText}
          </p>
        </main>
      </div>
    </PageTransition>
  );
};

export default PrivacyComponent;
