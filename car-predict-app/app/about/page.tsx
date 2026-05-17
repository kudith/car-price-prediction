import type { Metadata } from "next"
import { AboutContent } from "@/components/about"

export const metadata: Metadata = {
  title: "About the Project — Methodology & Data",
  description:
    "Learn about the methodology, dataset, and model evaluation used in the CarPredict project.",
}

export default function AboutPage() {
  return (
    <>
      <AboutContent />
    </>
  )
}
