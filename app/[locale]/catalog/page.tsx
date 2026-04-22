import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/ui/arrow";
import { CatalogClient } from "./catalog-client";
import Link from "next/link";
import { QuoteButton } from "@/components/quote-button";

export const metadata: Metadata = {
  title: "Catalog — Every System in One View",
  description:
    "All Arcova products across PVC and aluminium — filterable by family, profile system, and performance.",
};

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Nav locale={locale} />
      <main>
        {/* Page header */}
        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div
            className="container"
            style={{ padding: "64px var(--pad-x) 56px" }}
          >
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              <span className="num">01 / CATALOG</span>
              <span className="dot" />
              <span>12 systems · aluplast · Salamander</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 40,
                alignItems: "end",
              }}
            >
              <div>
                <h1 style={{ marginBottom: 20 } as React.CSSProperties}>
                  Every system,
                  <br />
                  in one view.
                </h1>
                <p
                  style={{
                    fontSize: 18,
                    color: "var(--muted)",
                    maxWidth: 600,
                    lineHeight: 1.5,
                  }}
                >
                  All Arcova products across PVC and aluminium — filterable by
                  family, profile system, and performance. Contact us for a
                  comparison quote across multiple systems.
                </p>
              </div>
              <QuoteButton className="btn btn-primary">
                Multi-system quote <Arrow />
              </QuoteButton>
            </div>
          </div>
        </section>

        <CatalogClient locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
