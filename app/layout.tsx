import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import StickyFloorAd from "@/components/StickyFloorAd";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import { getSiteData } from "@/lib/store";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://threepointslondon.com"),
  title: "Three Points London | Independent coverage of Arsenal, Chelsea and Tottenham",
  description:
    "Independent football journalism covering Arsenal, Chelsea, and Tottenham Hotspur. Data-led features, tactical analysis, academy reporting, and transfer investigations.",
  openGraph: {
    title: "Three Points London | Arsenal, Chelsea and Tottenham",
    description: "One city. Three clubs. One newsroom that covers nothing else.",
    url: "https://threepointslondon.com",
    siteName: "Three Points London",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@3pointslondon",
    creator: "@vayamlahoti",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = getSiteData();
  const ticker = data.ticker || [];

  return (
    <html lang="en" className={`${archivo.variable} ${newsreader.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "Three Points London",
              url: "https://threepointslondon.com",
              logo: "https://threepointslondon.com/logo.png",
              foundingDate: "2026",
              sameAs: [
                "https://x.com/3pointslondon",
                "https://instagram.com/3pointslondon",
                "https://youtube.com/@3pointslondon",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased selection:bg-navy selection:text-white">
        <ScrollAnimationProvider>
          <NewsTicker items={ticker} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyFloorAd />
        </ScrollAnimationProvider>
      </body>
    </html>
  );
}
