import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Lumora Pro for your web development project. Email, WhatsApp, or use our contact form. We respond within 24 hours.",
  keywords: ["contact web developer", "hire web developer", "web development inquiry", "get quote website"],
  openGraph: {
    title: "Contact Us | Lumora Pro",
    description: "Get in touch for your web development project. We respond within 24 hours.",
    url: 'https://lumorapro.netlify.app/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
