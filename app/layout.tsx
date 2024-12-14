import type { Metadata } from "next";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import '@/styles/blog.css'
import '@/styles/prism-theme.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: "Hangxi - Portfolio & Blog",
  description: "Personal portfolio and blog showcasing my work and thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
