import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Web Development Services & Pricing",
  description: "Professional web development services with transparent fixed pricing. Landing pages from £149, business websites from £349, web apps, e-commerce, and AI solutions. Fast delivery guaranteed.",
  keywords: ["web development services", "website pricing", "landing page cost", "web app development", "e-commerce website", "AI chatbot", "freelance web developer UK"],
  openGraph: {
    title: "Web Development Services & Pricing | Lumora Pro",
    description: "Professional web development with fixed pricing. Landing pages from £149, websites, web apps, and AI solutions.",
    url: 'https://lumorapro.netlify.app/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
