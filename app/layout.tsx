import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ZupassProvider } from "@/components/auth/ZupassProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "zubazaar",
  description:
    "Products, projects, and forkable experiments from the Zuzalu world"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ZupassProvider>
            {children}
            <Toaster />
          </ZupassProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
