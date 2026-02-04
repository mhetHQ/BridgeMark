import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bridgemark.io"
  ),
  title: {
    default: "Bridgemark - Premium Agency Marketplace",
    template: "%s | Bridgemark",
  },
  description:
    "Connect with top-tier marketing agencies vetted by industry leaders. Experience the future of agency partnerships with smart contracts and AI matching.",
  keywords: [
    "marketing agency",
    "agency marketplace",
    "digital marketing",
    "web3 marketing",
    "agency matching",
    "AI matching",
    "marketing services",
  ],
  authors: [{ name: "Bridgemark" }],
  creator: "Bridgemark",
  publisher: "Bridgemark",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bridgemark.io",
    siteName: "Bridgemark",
    title: "Bridgemark - Premium Agency Marketplace",
    description:
      "Connect with top-tier marketing agencies vetted by industry leaders. Experience the future of agency partnerships.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridgemark - Premium Agency Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridgemark - Premium Agency Marketplace",
    description:
      "Connect with top-tier marketing agencies vetted by industry leaders.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
