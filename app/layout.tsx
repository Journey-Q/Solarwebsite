import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Green Lanka Sustainable Solutions - Solar Energy Experts',
  description: 'Professional solar panel installation services in Sri Lanka. Transform your home or business with clean, renewable solar energy solutions. 15+ years experience, 250+ projects completed.',
  generator: 'Next.js',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: 'https://www.glssolution.com/images/favicon.png',
        sizes: 'any',
      },
      {
        url: 'https://www.glssolution.com/images/favicon.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: 'https://www.glssolution.com/images/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: 'https://www.glssolution.com/images/favicon.png',
    apple: 'https://www.glssolution.com/images/favicon.png',
  },
  openGraph: {
    title: 'Green Lanka Sustainable Solutions - Solar Energy Experts',
    description: 'Professional solar panel installation services in Sri Lanka. Transform your home or business with clean, renewable solar energy solutions.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.glssolution.com',
    siteName: 'Green Lanka Sustainable Solutions',
    images: [
      {
        url: 'https://www.glssolution.com/images/logo-with-text.png',
        width: 681,
        height: 88,
        alt: 'Green Lanka Sustainable Solutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green Lanka Sustainable Solutions - Solar Energy Experts',
    description: 'Professional solar panel installation services in Sri Lanka. Transform your home or business with clean, renewable solar energy solutions.',
    images: ['https://www.glssolution.com/images/logo-with-text.png'],
  },
  keywords: [
    'solar panels',
    'solar energy',
    'renewable energy',
    'Sri Lanka',
    'sustainable solutions',
    'solar installation',
    'green energy',
    'solar power',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}