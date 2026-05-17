import type { Metadata } from "next";
import { HeroSection } from "@/components/hero";
import { MetricsSection } from "@/components/metrics-section";
import { InsightSection } from "@/components/insight-section";
import { ProjectSummarySection } from "@/components/project-summary-section";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "CarPredict — Data-Driven Car Price Prediction",
  description:
    "CarPredict Home. Predict vehicle prices using Linear Regression based on the Car Sales dataset with a CRISP-DM approach.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MetricsSection />
      <InsightSection />
      <ProjectSummarySection />
      <CtaSection />
    </>
  );
}
