import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/features/auth/auth-context";
import { ParticleCursor } from "@/components/shared/ParticleCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechSol Media | Digital Agency",
    template: "%s | TechSol Media",
  },
  description:
    "TechSol Media is a premium digital agency crafting bold brands, stunning websites, and growth-driven marketing experiences.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} min-h-screen`}
    >
      <body className="min-h-screen flex flex-col antialiased relative">
        <ParticleCursor />
        <WhatsAppButton />

        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              {/* Global Navigation Bar */}
              <Navbar />

              {/* Page Content */}
              <main className="flex-1 w-full">
                {children}
              </main>

              <Toaster position="top-right" richColors closeButton />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}