import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import "../../../styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { notoSans, roboto } from "@/styles/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "KBP",
  description: "Local Knowledge base",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body
        className={`h-full ${notoSans.variable} ${roboto.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
