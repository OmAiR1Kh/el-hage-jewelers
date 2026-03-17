import PrivacyComponent from "@/components/privacyComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | El Hage Jewelers",
  description:
    "Learn how El Hage Jewelers collects, uses, and protects your personal information when you visit our website.",
};

export default function PrivacyPage() {
  return <PrivacyComponent />;
}
