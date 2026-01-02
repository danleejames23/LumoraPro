import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Get a free quote for your web development project. Fixed pricing, no hidden costs. Websites, web apps, e-commerce, and AI solutions. Fast response guaranteed.",
  keywords: ["web development quote", "website quote", "free quote website", "web app pricing", "website cost estimate"],
  openGraph: {
    title: "Get a Free Quote | Lumora Pro",
    description: "Get a free quote for your web development project. Fixed pricing, no hidden costs.",
    url: 'https://lumorapro.netlify.app/quote',
  },
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
