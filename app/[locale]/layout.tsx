import type { Metadata } from "next";
import { locales } from "@/i18n";
import { QuoteModalProvider } from "@/components/quote-modal-provider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
      canonical: `/${locale}`,
    },
    openGraph: {
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <QuoteModalProvider>{children}</QuoteModalProvider>;
}
