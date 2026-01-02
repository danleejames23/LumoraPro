import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import Analytics from "@/components/analytics";
import ConditionalAIAssistant from "@/components/conditional-ai-assistant";
import SmoothScroll from "@/components/smooth-scroll";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { LocalBusinessSchema, WebsiteSchema } from "@/components/structured-data";

// Fallback fonts for production reliability
const fontVariables = "--font-sans --font-accent --font-mono";

export const metadata: Metadata = {
  metadataBase: new URL('https://lumorapro.netlify.app'),
  title: {
    default: "Lumora Pro | Professional Web Development & AI Solutions",
    template: "%s | Lumora Pro"
  },
  description: "Professional web development services with fixed pricing. Websites from £149, web apps, e-commerce, and AI integration. Fast delivery, quality guaranteed.",
  keywords: ["web developer", "web development", "website design", "AI integration", "React developer", "Next.js developer", "freelance developer", "UK web developer", "affordable websites", "custom web apps", "e-commerce development"],
  authors: [{ name: "Lumora Pro" }],
  creator: "Lumora Pro",
  publisher: "Lumora Pro",
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: "Lumora Pro | Professional Web Development & AI Solutions",
    description: "Professional web development with fixed pricing. Websites from £149, fast delivery, quality guaranteed.",
    url: 'https://lumorapro.netlify.app',
    siteName: 'Lumora Pro',
    locale: 'en_GB',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lumora Pro | Web Development & AI Solutions",
    description: "Professional web development with fixed pricing. Fast delivery, quality guaranteed.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className="antialiased bg-space-gray text-silver-glow min-h-screen"
        style={{ backgroundColor: '#0f0f1a', color: '#ffffff' }}
      >
        <LocalBusinessSchema />
        <WebsiteSchema />
        <ThemeProvider>
          <AuthProvider>
            <Analytics />
            <SmoothScroll />
            <Navigation />
            {children}
            <Footer />
            <ConditionalAIAssistant />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
