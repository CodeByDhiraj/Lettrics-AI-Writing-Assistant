import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNav } from "@/components/bottom-nav"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lettrics - AI Writing Assistant",
  description: "Create essays, stories, poems, emails and more with AI assistance",
  manifest: "/manifest.json",
  themeColor: "#f97316",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lettrics",
  },
    generator: 'Lettrics-AI Writing Assistant By CodeByDhiraj',
    icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900`}>
        <main className="pb-20">{children}</main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  )
}
