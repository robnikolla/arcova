import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PdpClient } from "./pdp-client";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug] ?? PRODUCTS["aw-72"];
  return {
    title: `${product.id} — ${product.name}`,
    description: product.description,
  };
}

const PRODUCTS: Record<
  string,
  {
    id: string;
    name: string;
    tagline: string;
    description: string;
    specs: { k: string; v: string }[];
    heroSpecs: { k: string; v: string; u: string }[];
    downloads: { name: string; type: string; size: string }[];
    relatedSlugs: string[];
  }
> = {
  "aw-72": {
    id: "AW-72",
    name: "Aluminium Window 72",
    tagline: "Thermal-break aluminium, 72 mm.",
    description: "A flagship European-profile window for contemporary facades. Three-chamber aluminium, polyamide thermal bridge, concealed EPDM seals.",
    heroSpecs: [
      { k: "U-value", v: "0.78", u: "W/m²K" },
      { k: "Acoustic", v: "44", u: "dB (Rw)" },
      { k: "Watertight", v: "E1200", u: "EN 12208" },
      { k: "Burglar", v: "RC2", u: "EN 1627" },
    ],
    specs: [
      { k: "Profile system", v: "Aluminium 6060-T66, 72mm" },
      { k: "Thermal break", v: "Polyamide, 34mm" },
      { k: "Glazing", v: "Double or triple IGU" },
      { k: "Frame depth", v: "72 mm" },
      { k: "Sash weight max", v: "150 kg" },
      { k: "Max. dimensions", v: "2500 × 3000 mm" },
      { k: "Opening types", v: "Tilt, turn, tilt-turn, fixed, parallel" },
      { k: "Finish", v: "RAL, anodised, wood-effect foil" },
      { k: "Certifications", v: "CE · EN 14351-1 · RC2 · E1200" },
    ],
    downloads: [
      { name: "AW-72 Technical Data Sheet", type: "PDF", size: "2.4 MB" },
      { name: "AW-72 CAD Library (.dwg)", type: "DWG", size: "8.1 MB" },
      { name: "AW-72 BIM Object (.rfa)", type: "RFA", size: "4.6 MB" },
      { name: "AW-72 Installation Guide", type: "PDF", size: "3.8 MB" },
    ],
    relatedSlugs: ["aw-85", "pw-88", "sw-190"],
  },
  "aw-85": {
    id: "AW-85",
    name: "Aluminium Window 85",
    tagline: "Passivhaus-certified aluminium, 85 mm.",
    description: "Extended depth aluminium profile for Passivhaus and near-zero energy buildings.",
    heroSpecs: [
      { k: "U-value", v: "0.68", u: "W/m²K" },
      { k: "Acoustic", v: "46", u: "dB (Rw)" },
      { k: "Watertight", v: "E1200", u: "EN 12208" },
      { k: "Burglar", v: "RC2", u: "EN 1627" },
    ],
    specs: [
      { k: "Profile system", v: "Aluminium 6060-T66, 85mm" },
      { k: "Thermal break", v: "Polyamide, 52mm" },
      { k: "Glazing", v: "Triple IGU required" },
      { k: "Frame depth", v: "85 mm" },
      { k: "Certifications", v: "CE · EN 14351-1 · PassivHaus · RC2" },
    ],
    downloads: [
      { name: "AW-85 Technical Data Sheet", type: "PDF", size: "2.6 MB" },
      { name: "AW-85 CAD Library (.dwg)", type: "DWG", size: "7.9 MB" },
    ],
    relatedSlugs: ["aw-72", "pw-92s"],
  },
};

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = PRODUCTS[slug] ?? PRODUCTS["aw-72"];

  return (
    <>
      <Nav locale={locale} />
      <main>
        {/* Breadcrumb */}
        <div style={{ borderBottom: "1px solid var(--line)" }}>
          <div
            className="container"
            style={{
              padding: "16px var(--pad-x)",
              display: "flex",
              gap: 12,
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            <Link href={`/${locale}`}>Index</Link>
            <span>/</span>
            <Link href={`/${locale}/catalog`}>Systems</Link>
            <span>/</span>
            <span style={{ color: "var(--ink)" }}>{product.id}</span>
          </div>
        </div>

        {/* Full PDP — client for interactive sections */}
        <PdpClient locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
