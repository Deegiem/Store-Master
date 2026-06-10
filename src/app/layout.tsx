// src/app/layout.tsx
import "./globals.css"
import Providers from "./providers"
import { Toaster } from "sonner"
import { Inter_Tight, Plus_Jakarta_Sans } from "next/font/google"
import React from "react"
import type { Metadata } from 'next';

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  preload: true,
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  preload: true,
})

export const metadata: Metadata = {
  title: 'StoreMaster',
  description: 'Spatial Authority in Inventory - Manage your sales, inventory, and procurement efficiently.',
  openGraph: {
    title: 'StoreMaster - Inventory Management System',
    description: 'Manage sales, inventory, procurement, and security reports all in one place.',
    url: 'https://store-master-f3wg9jb8h-deegiems-projects.vercel.app',
    siteName: 'StoreMaster',
    images: [
      {
        // This will be dynamically generated, but fallback to static image
        url: '/assets/dashboard-mockup.jpg',  // Note: NO '/src/' in the URL!
        width: 1200,
        height: 630,
        alt: 'StoreMaster Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoreMaster - Inventory Management System',
    description: 'Manage sales, inventory, procurement, and security reports all in one place.',
    images: ['/assets/dashboard-mockup.jpg',]  // Note: NO '/src/' in the URL!],  // ✅ static file
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}