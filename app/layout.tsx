import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { WarehouseProvider } from "@/components/warehouse-provider";
import { HeaderContainer } from "@/components/header-container";
import { SidebarContainer } from "@/components/sidebar-container";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estok — Gestão de Estoque",
  description: "Controle de estoque, produtos e movimentações.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <WarehouseProvider>
            <main className="min-h-screen bg-muted/30 p-2 sm:p-4">
              <div className="mx-auto flex max-w-[1400px] flex-col gap-4 lg:grid lg:grid-cols-[260px_1fr] lg:grid-rows-[72px_1fr]">
                <HeaderContainer />
                <SidebarContainer />
                <section className="rounded-2xl border border-border bg-muted/40 p-4 shadow-sm sm:p-6 lg:p-8">
                  {children}
                </section>
              </div>
            </main>
            <Toaster richColors position="top-right" />
          </WarehouseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
