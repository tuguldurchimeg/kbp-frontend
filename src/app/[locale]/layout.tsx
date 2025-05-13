import { NextIntlClientProvider, hasLocale } from "next-intl";
import type { Metadata } from "next";
import "../../../styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";
import { notoSans, roboto } from "@/styles/fonts";
import PrivateRoute from "@/components/PrivateRoute";

export const metadata: Metadata = {
  title: "KBP",
  description: "Local Knowledge base",
  icons: { icon: "/login.png" },
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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`h-full ${notoSans.className} ${roboto.className}`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <PrivateRoute>{children}</PrivateRoute>
            </ThemeProvider>
          </AuthProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
