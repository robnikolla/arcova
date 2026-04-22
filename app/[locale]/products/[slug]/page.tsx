import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PdpClient } from "./pdp-client";
import { PdpDoorClient } from "./pdp-door-client";
import { PdpShutterClient } from "./pdp-shutter-client";

const DOOR_SLUGS = ["ed-120"];
const SHUTTER_SLUGS = ["rs-45"];

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
  "ed-120": {
    id: "ED-120",
    name: "Entrance Door 120",
    tagline: "Security door, 120 mm frame.",
    description: "Steel-reinforced entrance door with mineral wool core, concealed multi-point locking, and RC3 certification. Available in RC4 for sensitive applications.",
    heroSpecs: [
      { k: "Thermal", v: "0.66", u: "W/m²K (Ud)" },
      { k: "Acoustic", v: "42", u: "dB (Rw)" },
      { k: "Security", v: "RC3", u: "EN 1627" },
      { k: "Airtight", v: "Class 4", u: "EN 12207" },
    ],
    specs: [
      { k: "Frame depth", v: "120 mm" },
      { k: "Leaf thickness", v: "82 mm" },
      { k: "Core insulation", v: "CFC-free mineral wool, 60mm" },
      { k: "Security class", v: "RC3 standard · RC4 upgrade" },
      { k: "Max. dimensions", v: "1600 × 2750 mm (single leaf)" },
      { k: "Certifications", v: "CE · EN 14351-1 · RC3 · EI 30 option" },
    ],
    downloads: [
      { name: "ED-120 Technical Data Sheet", type: "PDF", size: "1.9 MB" },
      { name: "ED-120 CAD Library (.dwg)", type: "DWG", size: "6.1 MB" },
      { name: "ED-120 BIM Object (.rfa)", type: "RFA", size: "9.4 MB" },
      { name: "ED-120 RC3 Test Certificate", type: "PDF", size: "540 KB" },
    ],
    relatedSlugs: ["aw-72", "sw-190", "rs-45"],
  },
  "rs-45": {
    id: "RS-45",
    name: "Roller Shutter System",
    tagline: "Motorised shutter, wind class 6.",
    description: "Three foam-filled aluminium slat profiles with Somfy or KNX automation. Wind class 4–6 depending on profile depth. Light screening to full thermal blackout.",
    heroSpecs: [
      { k: "Wind class", v: "6", u: "EN 13241" },
      { k: "Thermal Ud", v: "0.65", u: "W/m²K (RS-77)" },
      { k: "Light block", v: "99%", u: "closed" },
      { k: "Acoustic", v: "40", u: "dB (Rw)" },
    ],
    specs: [
      { k: "Slat profiles", v: "RS-45 · RS-55 · RS-77" },
      { k: "Max. curtain area", v: "16 m² (RS-45)" },
      { k: "Drive options", v: "Tubular motor · Belt drive · Solar" },
      { k: "Control", v: "RTS · io-homecontrol · KNX · BACnet" },
      { k: "Certifications", v: "CE · EN 13241 · Somfy certified" },
    ],
    downloads: [
      { name: "RS-45 Technical Data Sheet", type: "PDF", size: "1.6 MB" },
      { name: "RS-45 CAD Library (.dwg)", type: "DWG", size: "4.8 MB" },
      { name: "RS-45 BIM Object (.rfa)", type: "RFA", size: "7.2 MB" },
      { name: "RS-45 Motor Wiring Diagrams", type: "PDF", size: "880 KB" },
    ],
    relatedSlugs: ["aw-72", "ed-120", "sw-190"],
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

        {/* Full PDP — client for interactive sections, routed by product type */}
        {DOOR_SLUGS.includes(slug) ? <PdpDoorClient locale={locale} />
          : SHUTTER_SLUGS.includes(slug) ? <PdpShutterClient locale={locale} />
          : <PdpClient locale={locale} />}
      </main>
      <Footer locale={locale} />
    </>
  );
}
