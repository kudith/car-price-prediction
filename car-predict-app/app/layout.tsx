import type { Metadata } from "next";
import { Geist_Mono, IBM_Plex_Sans, Playfair_Display } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "CarPredict — Prediksi Harga Mobil Berbasis Data",
    template: "%s | CarPredict",
  },
  description:
    "Sistem prediksi harga mobil menggunakan Linear Regression berdasarkan dataset Car Sales dengan pendekatan CRISP-DM. RMSE 6.692, R² 0.792.",
  keywords: [
    "prediksi harga mobil",
    "linear regression",
    "data science",
    "CRISP-DM",
    "machine learning",
    "car price prediction",
  ],
};

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        ibmPlexSans.variable,
        playfairDisplayHeading.variable,
        "font-sans"
      )}
    >
      <body className="min-h-svh flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
