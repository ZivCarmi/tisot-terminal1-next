import { Header } from "@/components/Header";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@next/third-parties/google";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Assistant } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import Providers from "./providers";

const assistant = Assistant({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Common" });

  return {
    keywords: t("pageKeywords"),
  };
}

export default async function RootLayout({
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

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
      className={`antialiased ${assistant.className}`}
    >
      <body className="selection:bg-amber-400">
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto p-6">{children}</main>
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-TDDK0DBZ8F" />
    </html>
  );
}
