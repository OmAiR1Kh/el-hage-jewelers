import TermsComponent from "@/components/terms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | El Hage Jewelers",
  description:
    "Read the terms and conditions for using El Hage Jewelers website and services.",
};

export default function TermsPage() {
  return <TermsComponent />;
}
