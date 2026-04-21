import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/ui/arrow";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeader } from "@/components/ui/section-header";
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

const RELATED_PRODUCTS = [
  { slug: "aw-72", id: "AW-72", name: "Aluminium Window 72", specs: "Uw 0.78 · Rw 44dB", img: "https://picsum.photos/seed/facade-geo/1200/900" },
  { slug: "aw-85", id: "AW-85", name: "Aluminium Window 85", specs: "Uw 0.68 · Rw 46dB", img: "https://picsum.photos/seed/facade-met/1200/900" },
  { slug: "pw-88", id: "PW-88", name: "PVC Window 88", specs: "Uw 0.74 · Rw 44dB", img: "https://picsum.photos/seed/arch-b/1200/900" },
  { slug: "sw-190", id: "SW-190", name: "Lift-Slide System 190", specs: "Uw 0.88 · Rw 38dB", img: "https://picsum.photos/seed/facade-con/1200/900" },
];

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = PRODUCTS[slug] ?? PRODUCTS["aw-72"];
  const relatedProducts = RELATED_PRODUCTS.filter((p) => product.relatedSlugs.includes(p.slug));

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

        {/* Product hero — client for tab switching */}
        <PdpClient product={product} locale={locale} />

        {/* Technical specs */}
        <section style={{ borderBottom: "1px solid var(--line)", padding: "80px 0" }}>
          <div className="container">
            <SectionHeader
              eyebrow="Specifications"
              title="Technical data."
              index="02"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 80px",
              }}
            >
              <table className="spec">
                <tbody>
                  {product.specs.slice(0, Math.ceil(product.specs.length / 2)).map((row) => (
                    <tr key={row.k}>
                      <td>{row.k}</td>
                      <td>{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="spec">
                <tbody>
                  {product.specs.slice(Math.ceil(product.specs.length / 2)).map((row) => (
                    <tr key={row.k}>
                      <td>{row.k}</td>
                      <td>{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section style={{ borderBottom: "1px solid var(--line)", padding: "80px 0" }}>
          <div className="container">
            <SectionHeader
              eyebrow="Downloads"
              title="Technical library."
              index="03"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
                background: "var(--line)",
                border: "1px solid var(--line)",
              }}
            >
              {product.downloads.map((d) => (
                <a
                  key={d.name}
                  href="#"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    background: "var(--bg)",
                    gap: 16,
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "var(--bg-2)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "var(--bg)")
                  }
                >
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>
                      {d.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {d.type} · {d.size}
                    </div>
                  </div>
                  <Arrow size={12} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Related systems */}
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <SectionHeader
              eyebrow="Related"
              title="Other systems."
              index="04"
              rightSlot={
                <Link
                  href={`/${locale}/catalog`}
                  className="btn btn-ghost btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  Full catalog <Arrow size={12} />
                </Link>
              }
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
              }}
            >
              {relatedProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/products/${p.slug}`}
                  className="prod-card"
                  style={{ display: "block" }}
                >
                  <Placeholder aspect="4/3" src={p.img} label={p.id} />
                  <div style={{ padding: "16px 0 0", display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--f-mono)",
                          fontSize: 11,
                          color: "var(--muted)",
                          marginBottom: 4,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.id}
                      </div>
                      <h4 style={{ fontSize: 18, fontWeight: 500 }}>{p.name}</h4>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--ink-2)",
                          fontFamily: "var(--f-mono)",
                          marginTop: 4,
                        }}
                      >
                        {p.specs}
                      </div>
                    </div>
                    <Arrow />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
