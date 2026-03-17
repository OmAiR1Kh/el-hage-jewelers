// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Navbar } from "@/components/ui/navbar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useLanguage } from "@/components/providers/language-provider";
// import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
// import { motion } from "framer-motion";

// export default function ContactPage() {
//   const { language, t, isRTL } = useLanguage();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // Simulate submission
//     setTimeout(() => {
//       console.log("Form submitted:", formData);
//       setFormData({ name: "", email: "", phone: "", message: "" });
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: t("contact.info.address"),
//       content:
//         language === "en"
//           ? "Beirut Central District, Lebanon"
//           : "بيروت، المنطقة التجارية المركزية، لبنان",
//     },
//     {
//       icon: Phone,
//       title: t("contact.info.phone"),
//       content: "+961 71 444 454",
//       href: "tel:+96171444454",
//     },
//     {
//       icon: Mail,
//       title: t("contact.info.email"),
//       content: "info@elhagejewelers.com",
//       href: "mailto:info@elhagejewelers.com",
//     },
//     {
//       icon: Clock,
//       title: t("contact.info.hours"),
//       content:
//         language === "en"
//           ? "Mon-Fri: 9:00 AM - 3:00 PM"
//           : "الإثنين-السبت: 9:00 ص - 8:00 م",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       <Navbar />

//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative pt-24 md:pt-32 pb-16 bg-gradient-to-b from-black via-gray-900 to-black border-b border-gray-800"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
//             {t("contact.hero.title")}
//           </h1>
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//             {t("contact.hero.subtitle")}
//           </p>
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <div className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
//           >
//             {/* Contact Information - Left Side */}
//             <motion.div variants={itemVariants} className="order-2 lg:order-1">
//               <div className="mb-12">
//                 <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
//                   {t("contact.info.title")}
//                 </h2>
//                 <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600"></div>
//               </div>

//               <div className="space-y-8">
//                 {contactInfo.map((info, index) => {
//                   const Icon = info.icon;
//                   return (
//                     <motion.div
//                       key={index}
//                       whileHover={{ x: isRTL ? -8 : 8 }}
//                       className="flex items-start gap-4 group"
//                     >
//                       <div className="flex-shrink-0">
//                         <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 group-hover:from-amber-500/40 group-hover:to-amber-600/40 transition-all duration-300">
//                           <Icon className="h-6 w-6 text-amber-500" />
//                         </div>
//                       </div>
//                       <div className="flex-grow">
//                         <h3 className="text-lg font-semibold text-white mb-1">
//                           {info.title}
//                         </h3>
//                         {info.href ? (
//                           <a
//                             href={info.href}
//                             className="text-gray-400 hover:text-amber-500 transition-colors duration-300 break-all"
//                           >
//                             {info.content}
//                           </a>
//                         ) : (
//                           <p className="text-gray-400">{info.content}</p>
//                         )}
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="mt-12"
//               >
//                 <a
//                   href="https://wa.me/96171444454"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block"
//                 >
//                   <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/50">
//                     {t("nav.appointment")}
//                   </Button>
//                 </a>
//               </motion.div>
//             </motion.div>

//             {/* Contact Form - Right Side */}
//             <motion.div variants={itemVariants} className="order-1 lg:order-2">
//               <div className="mb-12">
//                 <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-2">
//                   {t("contact.form.title")}
//                 </h2>
//                 <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600"></div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name Input */}
//                 <motion.div
//                   whileInView={{ opacity: 1, y: 0 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   viewport={{ once: true }}
//                 >
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-300 mb-3"
//                   >
//                     {t("contact.form.name")}
//                   </label>
//                   <Input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-gray-850 transition-all duration-300 px-4 py-3"
//                     placeholder={language === "en" ? "John Doe" : "جون دو"}
//                   />
//                 </motion.div>

//                 {/* Email Input */}
//                 <motion.div
//                   whileInView={{ opacity: 1, y: 0 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-300 mb-3"
//                   >
//                     {t("contact.form.email")}
//                   </label>
//                   <Input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-gray-850 transition-all duration-300 px-4 py-3"
//                     placeholder="john@example.com"
//                   />
//                 </motion.div>

//                 {/* Phone Input */}
//                 <motion.div
//                   whileInView={{ opacity: 1, y: 0 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-300 mb-3"
//                   >
//                     {t("contact.form.phone")}{" "}
//                     <span className="text-gray-500 font-normal">
//                       ({t("contact.form.optional")})
//                     </span>
//                   </label>
//                   <Input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-gray-850 transition-all duration-300 px-4 py-3"
//                     placeholder="+961 71 444 454"
//                   />
//                 </motion.div>

//                 {/* Message Textarea */}
//                 <motion.div
//                   whileInView={{ opacity: 1, y: 0 }}
//                   initial={{ opacity: 0, y: 10 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <label
//                     htmlFor="message"
//                     className="block text-sm font-medium text-gray-300 mb-3"
//                   >
//                     {t("contact.form.message")}
//                   </label>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows={6}
//                     required
//                     className="w-full bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-gray-850 transition-all duration-300 px-4 py-3 resize-none"
//                     placeholder={
//                       language === "en"
//                         ? "Tell us about your inquiry..."
//                         : "أخبرنا عن استفسارك..."
//                     }
//                   />
//                 </motion.div>

//                 {/* Submit Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full mt-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-700 disabled:to-gray-700 text-black disabled:text-gray-500 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/50 flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
//                       {language === "en" ? "Sending..." : "جاري الإرسال..."}
//                     </>
//                   ) : (
//                     <>
//                       <Send className="h-5 w-5" />
//                       {t("contact.form.submit")}
//                     </>
//                   )}
//                 </motion.button>
//               </form>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="border-t border-gray-800 bg-gradient-to-b from-black to-gray-900 py-16"
//       >
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
//             {language === "en" ? "Prefer to call us?" : "تفضل الاتصال بنا؟"}
//           </h3>
//           <p className="text-gray-400 mb-8">
//             {language === "en"
//               ? "Our team is ready to assist you during business hours"
//               : "فريقنا جاهز لمساعدتك خلال ساعات العمل"}
//           </p>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <a
//               href="tel:+96171444454"
//               className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/50"
//             >
//               +961 71 444 454
//             </a>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/providers/language-provider";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { language, t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.info.address"),
      content:
        language === "en"
          ? "Beirut Central District, Lebanon"
          : "بيروت، المنطقة التجارية المركزية، لبنان",
    },
    {
      icon: Phone,
      title: t("contact.info.phone"),
      content: "+961 71 444 454",
      href: "tel:+96171444454",
    },
    {
      icon: Mail,
      title: t("contact.info.email"),
      content: "info@elhagejewelers.com",
      href: "mailto:info@elhagejewelers.com",
    },
    {
      icon: Clock,
      title: t("contact.info.hours"),
      content:
        language === "en"
          ? "Mon-Fri: 9:00 AM - 3:00 PM"
          : "الإثنين-السبت: 9:00 ص - 8:00 م",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-24 md:pt-32 pb-16 bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-black mb-4">
            {t("contact.hero.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            // @ts-ignore
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* Contact Information - Left Side */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-2">
                  {t("contact.info.title")}
                </h2>
                <div className="h-1 w-16 bg-black"></div>
              </div>

              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ x: isRTL ? -8 : 8 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gray-200 group-hover:bg-gray-300 transition-all duration-300">
                          <Icon className="h-6 w-6 text-black" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-black mb-1">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-gray-600 hover:text-black transition-colors duration-300 break-all"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.content}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-12"
              >
                <a
                  href="https://wa.me/96171444454"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    {t("nav.appointment")}
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-2">
                  {t("contact.form.title")}
                </h2>
                <div className="h-1 w-16 bg-black"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black mb-3"
                  >
                    {t("contact.form.name")}
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 px-4 py-3"
                    placeholder={language === "en" ? "John Doe" : "جون دو"}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-3"
                  >
                    {t("contact.form.email")}
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 px-4 py-3"
                    placeholder="john@example.com"
                  />
                </motion.div>

                {/* Phone Input */}
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-black mb-3"
                  >
                    {t("contact.form.phone")}{" "}
                    <span className="text-gray-600 font-normal">
                      ({t("contact.form.optional")})
                    </span>
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 px-4 py-3"
                    dir={language === "en" ? "ltr" : "rtl"}
                    placeholder="+961 1 234 567"
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-black mb-3"
                  >
                    {t("contact.form.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 px-4 py-3 resize-none"
                    placeholder={
                      language === "en"
                        ? "Tell us about your inquiry..."
                        : "أخبرنا عن استفسارك..."
                    }
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white disabled:text-gray-600 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {language === "en" ? "Sending..." : "جاري الإرسال..."}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-gray-200 bg-gray-50 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">
            {language === "en" ? "Prefer to call us?" : "تفضل الاتصال بنا؟"}
          </h3>
          <p className="text-gray-600 mb-8">
            {language === "en"
              ? "Our team is ready to assist you during business hours"
              : "فريقنا جاهز لمساعدتك خلال ساعات العمل"}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="tel:+96171444454"
              className="inline-block bg-black hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              +961 71 444 454
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
