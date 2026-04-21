import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cherry-chue.vercel.app"),
  title: {
    default: "Cherry Chue | Handcrafted Art — Custom Portraits, Sketches & Paintings",
    template: "%s | Cherry Chue",
  },
  description:
    "Cherry Chue - Handcrafted custom portraits, pencil sketches, watercolors, and oil paintings by self-taught artist Sheema, based in Chennai. 100+ artworks delivered since 2020. Commission yours today.",
  keywords: [
    "Cherry Chue", "Sheema artist Chennai", "custom portrait artist India",
    "pencil sketch artist Chennai", "watercolor paintings Chennai",
    "oil painting artist India", "commission art Chennai",
    "handmade art India", "cherrychuearts", "gift art India",
  ],
  authors: [{ name: "Sheema — Cherry Chue" }],
  creator: "Cherry Chue",
  openGraph: {
    type: "website",
    url: "https://cherry-chue.vercel.app",
    siteName: "Cherry Chue",
    title: "Cherry Chue | Handcrafted Art — Custom Portraits, Sketches & Paintings",
    description:
      "Custom portraits, pencil sketches, watercolors & oil paintings by artist Sheema, Chennai. Commission your piece today.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cherry Chue — Handcrafted Art" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherry Chue | Handcrafted Art by Sheema, Chennai",
    description: "Custom portraits, pencil sketches, watercolors & oil paintings.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Cherry Chue",
      description: "Handcrafted custom art — pencil sketches, watercolors & oil paintings by Sheema, Chennai.",
      url: "https://cherry-chue.vercel.app",
      telephone: "+918939215704",
      email: "cherrychue98@gmail.com",
      foundingDate: "2020",
      image: "https://cherry-chue.vercel.app/assets/logo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      sameAs: ["https://instagram.com/cherry_chue"],
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "100" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta name="theme-color" content="#fdf8f3" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        {/* Fonts — preconnect first for performance, then load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
