import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Al-Murattal Institute - Global Directory of Qur'an Schools",
  description:
    "Discover, connect, and support Islamic educational institutions worldwide. Building a unified platform for Qur'an schools across the globe.",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#059669",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Murattal",
  },
  icons: {
    icon: "/images/al-murattal-logo.png",
    apple: "/images/al-murattal-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#059669" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Al-Murattal" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/al-murattal-logo.png" />
        <link rel="apple-touch-icon" href="/images/al-murattal-logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[v0] SW registered: ', registration);
                    }, function(err) {
                      console.log('[v0] SW registration failed: ', err);
                    });
                });
              }
            `,
          }}
        />
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
