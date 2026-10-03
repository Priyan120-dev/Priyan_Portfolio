import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/scroll';
import { PROFILE } from '@/lib/data';

const interTight = localFont({
  src: '../fonts/InterTight-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../fonts/JetBrainsMono-Variable.woff2',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: PROFILE.resumeSummary,
  authors: [{ name: PROFILE.name }],
  metadataBase: new URL('https://priyan-portfolio-sand.vercel.app'),
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.shortBio,
    url: 'https://priyan-portfolio-sand.vercel.app',
    siteName: `${PROFILE.name} Portfolio`,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} Portfolio Preview`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.shortBio,
    images: ['/og.jpg'],
  },
  icons: {
    icon: '/portrait-bust.webp',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-[#f4f2ee] text-[#0d0d0d] selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
