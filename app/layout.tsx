import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"
import { GlobalDataProvider } from "@/contexts/global-data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zinnimoney",
  description: "Wealth management platform for financial advisors",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <GlobalDataProvider>{children}</GlobalDataProvider>
        </UserProvider>
      </body>
    </html>
  )
}
