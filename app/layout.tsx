import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
    process.env.NEXT_PUBLIC_SITE_URL || "https://bridgemark.tech"
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
    url: "https://bridgemark.tech",
    siteName: "Bridgemark",
    title: "Bridgemark - Premium Agency Marketplace",
    description:
      "Connect with top-tier marketing agencies vetted by industry leaders. Experience the future of agency partnerships.",
    images: [
      {
        url: "/bridgemark_logo.png",
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
    images: ["/bridgemark_logo.png"],
  },
  icons: {
    icon: [
      { url: "/bridgemark_logo.png" },
      { url: "/bridgemark_logo.png", type: "image/svg+xml" },
    ],
    apple: [{ url: "/bridgemark_logo.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
