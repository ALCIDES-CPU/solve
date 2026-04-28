import "./globals.css"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/next'
import { Inter, Roboto } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
})

// URLs de referência para SEO
const siteUrl = "https://aimagovpt.com"

export const metadata: Metadata = {
  title: {
    default: "AIMA Portugal - Agendamento e Apoio ao Imigrante",
    template: "%s | AIMA Portugal"
  },
  description:
    "Portal informativo para agendamentos na AIMA (ex-SEF). Saiba como renovar autorização de residência, reagrupamento familiar e regularização de imigrantes em Portugal.",
  keywords: [
    "AIMA agendamento online",
    "AIMA contactos",
    "renovação residência portugal",
    "manifestação de interesse portugal",
    "vistos para portugal 2024",
    "integração migrações e asilo",
    "portal aima agendamentos",
    "como agendar na AIMA",
    "residência CPLP"
  ],
  authors: [{ name: "AIMA Portugal" }],
  creator: "AIMA",
  publisher: "AIMA",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "pt-PT": "/",
      "en-US": "/en"
    }
  },
  openGraph: {
    title: "AIMA - Agendamentos e Informações sobre Imigração em Portugal",
    description: "Tudo sobre agendamentos, vistos e autorização de residência em Portugal através da AIMA.",
    url: siteUrl,
    siteName: "AIMA Portugal",
    images: [
      {
        url: "/og-image.png", // Certifique-se que este arquivo existe na pasta public
        width: 1200,
        height: 630,
        alt: "AIMA Portugal - Serviços ao Imigrante"
      }
    ],
    locale: "pt_PT",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "AIMA Portugal - Agendamentos",
    description: "Portal de apoio ao imigrante em Portugal.",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD para busca estruturada (Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "AIMA - Agência para a Integração, Migrações e Asilo",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PT"
    },
    "description": "Organismo responsável por serviços de imigração e asilo em Portugal.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+351-217-115-000",
      "contactType": "customer service"
    }
  }

  return (
    <html lang="pt-PT" suppressHydrationWarning className={`${inter.variable} ${roboto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
