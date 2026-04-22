import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/i18n";
import { Arrow } from "@/components/ui/arrow";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeader } from "@/components/ui/section-header";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { QuoteButton } from "@/components/quote-button";
import { HScroll } from "@/components/ui/h-scroll";

export const metadata: Metadata = {
  title: "Arcova — Precision Windows, Doors & Shutters",
  description:
    "Custom-engineered windows, doors, and shutters. Manufactured in Kosovo. Delivered across the EU.",
};

const SYSTEMS = [
  {
    id: "aw-72",
    tag: "AW-72",
    name: "Aluminium Windows",
    specs: "Uw 0.78 · Rw 44dB · RC2",
    stock: "14 openings · 5 finishes",
    img: "/images/homepage/aluminium-windows-cat.png",
  },
  {
    id: "pw-88",
    tag: "PW-88",
    name: "Thermal PVC Windows",
    specs: "Uw 0.74 · Rw 42dB · RC2",
    stock: "12 openings · 34 colors",
    img: "/images/homepage/pvc-windows-cat.png",
  },
  {
    id: "ed-120",
    tag: "ED-120",
    name: "Entrance Doors",
    specs: "Ud 0.66 · RC3 · fingerprint",
    stock: "9 panels · bespoke sizing",
    img: "/images/homepage/entrance-door-cat.png",
  },
  {
    id: "rs-45",
    tag: "RS-45",
    name: "Roller Shutters",
    specs: "Motorised · wind class 6",
    stock: "5 profiles · 18 colors",
    img: "/images/homepage/roller-shutter-cat.png",
  },
  {
    id: "sw-190",
    tag: "SW-190",
    name: "Sliding Systems",
    specs: "Lift-slide · 400kg sash",
    stock: "min. threshold 20mm",
    img: "/images/homepage/slide-system-cat.png",
  },
  {
    id: "cw-60",
    tag: "CW-60",
    name: "Curtain Walls",
    specs: "Mullion-transom · structural",
    stock: "up to 3.6m spans",
    img: "/images/homepage/curtain-wall-cat.png",
  },
];

const MATERIALS = [
  {
    t: "Aluminium",
    sub: "6060-T66 · thermal break",
    swatch: "linear-gradient(180deg,#BFBFB8,#8F8F88)",
  },
  {
    t: "PVC",
    sub: "Multi-chamber · class A",
    swatch: "linear-gradient(180deg,#F0EDE5,#C7C2B4)",
  },
  {
    t: "Oak veneer",
    sub: "FSC · satin oil",
    swatch: "linear-gradient(180deg,#A88559,#5C4225)",
  },
  {
    t: "Steel core",
    sub: "Security doors · RC3",
    swatch: "linear-gradient(180deg,#2E2E2E,#141414)",
  },
  {
    t: "Laminated IGU",
    sub: "4-16Ar-4 · low-E",
    swatch:
      "linear-gradient(180deg,rgba(200,220,230,0.9),rgba(120,150,170,0.9))",
  },
  {
    t: "RAL custom",
    sub: "213 colors · matte/gloss",
    swatch: "linear-gradient(90deg,#C9A86A,#8A7A5C,#2B2E2A,#141414)",
  },
];

const PROJECTS = [
  {
    name: "Atrium Residence",
    loc: "Vienna, AT",
    yr: "2025",
    sys: "AW-72 · CW-60",
    scale: "214 openings",
    img: "/images/projects/project-1.png",
  },
  {
    name: "Block 14 — Mitte",
    loc: "Berlin, DE",
    yr: "2024",
    sys: "PW-88 · RS-45",
    scale: "98 openings",
    img: "/images/projects/project-2.png",
  },
  {
    name: "Hotel Karst",
    loc: "Ljubljana, SI",
    yr: "2025",
    sys: "SW-190 · ED-120",
    scale: "46 openings",
    img: "/images/projects/project-3.png ",
  },
  {
    name: "Villa Gornji",
    loc: "Dubrovnik, HR",
    yr: "2024",
    sys: "AW-72 · SW-190",
    scale: "34 openings",
    img: "/images/projects/project-4.png",
  },
];

const TRUST_ITEMS = [
  "aluplast",
  "Salamander",
  "CE · EN 14351-1",
  "ISO 9001",
  "ISO 14001",
  "IFT Rosenheim",
  "PassivHaus",
  "RC2 / RC3",
  "QUALANOD",
  "Roto · Maco",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Nav locale={locale} />
      <main>
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div
            className="container"
            style={{ paddingTop: 48, paddingBottom: 0 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 56,
              }}
            >
              <div className="eyebrow">
                <span className="num">N° 01 / 05</span>
                <span className="dot" />
                <span>European Manufacturer · Est. 2011</span>
              </div>
              <div className="eyebrow hide-sm">
                <span>Ferizaj, XK</span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>42.3706°N 21.1551°E</span>
              </div>
            </div>

            <div
              className="mob-stack"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "end",
                gap: 40,
                marginBottom: 56,
              }}
            >
              <h1 style={{ textWrap: "balance" } as React.CSSProperties}>
                Precision openings
                <br />
                for European building.
              </h1>
              <div
                className="hide-sm"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 12,
                }}
              >
                <span className="chip live">● IN PRODUCTION</span>
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                    textAlign: "right",
                  }}
                >
                  Current lead time
                  <br />
                  <span
                    style={{
                      color: "var(--ink)",
                      fontSize: 20,
                      fontWeight: 500,
                      letterSpacing: 0,
                    }}
                  >
                    18–22 days
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mob-stack"
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 40,
                alignItems: "end",
                paddingBottom: 48,
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  color: "var(--ink-2)",
                  maxWidth: 540,
                  lineHeight: 1.45,
                }}
              >
                Custom-engineered windows, doors, and shutters. Manufactured in
                Kosovo. Delivered across the EU with the specification
                discipline architects expect.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <QuoteButton className="btn btn-primary">
                  Request a quote <Arrow />
                </QuoteButton>
                <Link
                  href={`/${locale}/catalog`}
                  className="btn btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  Explore systems <Arrow />
                </Link>
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <Placeholder
              aspect="21/9"
              src="/images/homepage/hero-image.png"
              label="HERO · 01"
              style={{ aspectRatio: "21/9" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    }}
                  />
                ))}
              </div>
            </Placeholder>

            <div
              className="hide-sm"
              style={{
                position: "absolute",
                right: "var(--pad-x)",
                bottom: -1,
                background: "var(--bg)",
                borderTop: "1px solid var(--line)",
                borderLeft: "1px solid var(--line)",
                padding: "20px 28px",
                display: "flex",
                gap: 40,
              }}
            >
              {[
                { k: "Units shipped / 2025", v: "42,810" },
                { k: "Countries served", v: "19" },
                { k: "Avg. U-value", v: "0.78 W/m²K" },
              ].map((m) => (
                <div key={m.k} style={{ minWidth: 140 }}>
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: 6,
                    }}
                  >
                    {m.k}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Value Strip ─────────────────────────────────────────────── */}
        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="container" style={{ padding: "72px var(--pad-x)" }}>
            <div
              className="mob-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
              }}
            >
              {[
                {
                  n: "01",
                  t: "Made-to-order",
                  d: "Every opening engineered to spec. No catalog inventory.",
                },
                {
                  n: "02",
                  t: "German profile systems",
                  d: "Built on aluplast and Salamander extrusions — engineered in Germany.",
                },
                {
                  n: "03",
                  t: "Fulfillment discipline",
                  d: "Quoted lead time held at 96.2% on-time last year.",
                },
                {
                  n: "04",
                  t: "Export-ready",
                  d: "CE-marked, EN 14351 compliant, shipped palletized.",
                },
              ].map((item, i, arr) => (
                <div
                  key={item.n}
                  style={{
                    padding: "8px 32px 8px 0",
                    borderRight:
                      i < arr.length - 1 ? "1px solid var(--line)" : "none",
                    paddingLeft: i === 0 ? 0 : 32,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 11,
                        color: "var(--muted)",
                        letterSpacing: "0.14em",
                      }}
                    >
                      {item.n}
                    </span>
                    <div
                      style={{ flex: 1, height: 1, background: "var(--line)" }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      marginBottom: 12,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.t}
                  </h4>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Systems ─────────────────────────────────────────────────── */}
        <section
          style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}
        >
          <div className="container">
            <SectionHeader
              index="02"
              eyebrow="Systems"
              title="Six product families. One manufacturing standard."
              subtitle="Every system is made-to-order from extruded profiles, laminated glass, and European-sourced hardware. Configure dimensions, opening type, glazing, and finish at quote."
              rightSlot={
                <Link
                  href={`/${locale}/catalog`}
                  className="btn btn-ghost btn-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Technical library <Arrow size={12} />
                </Link>
              }
            />
            <HScroll
              itemWidth="max(280px, calc(33.33% - 22px))"
              gap={32}
              autoScrollMs={4000}
            >
              {SYSTEMS.map((s) => (
                <Link
                  key={s.id}
                  href={`/${locale}/products/${s.id}`}
                  className="prod-card"
                  style={{ textAlign: "left", padding: 0, display: "block" }}
                >
                  <Placeholder aspect="4/5" src={s.img} label={s.tag} />
                  <div
                    style={{
                      padding: "20px 0 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--f-mono)",
                          fontSize: 11,
                          color: "var(--muted)",
                          letterSpacing: "0.14em",
                          marginBottom: 6,
                          textTransform: "uppercase",
                        }}
                      >
                        {s.tag} · System
                      </div>
                      <h4
                        style={{
                          fontSize: 22,
                          fontWeight: 500,
                          marginBottom: 8,
                        }}
                      >
                        {s.name}
                      </h4>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--ink-2)",
                          fontFamily: "var(--f-mono)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {s.specs}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--muted)",
                          marginTop: 4,
                        }}
                      >
                        {s.stock}
                      </div>
                    </div>
                    <div style={{ paddingTop: 4 }}>
                      <Arrow />
                    </div>
                  </div>
                </Link>
              ))}
            </HScroll>
          </div>
        </section>

        {/* ── Manufacturing ───────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--ink)",
            color: "var(--bg)",
            position: "relative",
          }}
        >
          <div className="container" style={{ padding: "120px var(--pad-x)" }}>
            <div
              className="mob-stack"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 72,
                alignItems: "start",
                marginBottom: 80,
              }}
            >
              <div>
                <div
                  className="eyebrow"
                  style={{ color: "rgba(255,255,255,0.55)", marginBottom: 24 }}
                >
                  <span
                    className="num"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    03
                  </span>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: "var(--accent)",
                      borderRadius: "50%",
                    }}
                  />
                  <span>Manufacturing</span>
                </div>
                <h2 style={{ color: "var(--bg)" } as React.CSSProperties}>
                  14,200 m² of plant.
                  <br />
                  One continuous line.
                </h2>
              </div>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.75)",
                  maxWidth: 540,
                }}
              >
                Our Ferizaj facility runs a single integrated production line —
                from profile extrusion through glazing and QC — so scheduling is
                tight, tolerances are consistent, and transport loads ship
                complete. The advantage of in-house control, at export pricing.
              </p>
            </div>

            <div style={{ position: "relative", marginBottom: 80 }}>
              <Placeholder
                aspect="21/8"
                src="/images/homepage/facility.png"
                label="PLANT · A2"
                style={{ filter: "saturate(0) brightness(0.85)" }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  top: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  background: "rgba(18,18,16,0.8)",
                  padding: "12px 16px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "var(--bg)",
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <span>LIVE · OPERATIONAL</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>
                  Shift A · 06:00–14:00 CET
                </span>
              </div>
            </div>

            <div
              className="mob-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
              }}
            >
              {[
                {
                  n: "01",
                  t: "Specification",
                  d: "CAD review, structural calc, thermal model. We sign the drawings back to you.",
                },
                {
                  n: "02",
                  t: "Extrusion & cut",
                  d: "Aluminium and PVC profiles cut to the millimetre on CNC saws.",
                },
                {
                  n: "03",
                  t: "Glazing assembly",
                  d: "IGUs laminated in Class 10,000 clean lines. Argon-filled, warm-edge spacer.",
                },
                {
                  n: "04",
                  t: "QC & dispatch",
                  d: "Every unit water-tested to 600 Pa before palletising for EU dispatch.",
                },
              ].map((s, i) => (
                <div
                  key={s.n}
                  style={{
                    padding: "32px 24px 32px 0",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    paddingLeft: i === 0 ? 0 : 24,
                    borderLeft:
                      i > 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.14em",
                      marginBottom: 20,
                    }}
                  >
                    STAGE {s.n}
                  </div>
                  <h4
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      color: "var(--bg)",
                      marginBottom: 12,
                    }}
                  >
                    {s.t}
                  </h4>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Materials ───────────────────────────────────────────────── */}
        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="container" style={{ padding: "120px var(--pad-x)" }}>
            <SectionHeader
              index="04"
              eyebrow="Materials"
              title="Six substrates. Fully traceable."
              subtitle="Every material is specified by lot and certified on delivery. Request a sample kit to see the finish in person."
            />
            <HScroll
              itemWidth="max(130px, calc(16.66% - 14px))"
              gap={16}
              autoScrollMs={5000}
            >
              {MATERIALS.map((m, i) => (
                <div key={i}>
                  <div
                    style={{
                      aspectRatio: "3/4",
                      background: m.swatch,
                      border: "1px solid var(--line-2)",
                      marginBottom: 16,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.9)",
                        mixBlendMode: "difference",
                      }}
                    >
                      M·0{i + 1}
                    </div>
                  </div>
                  <div
                    style={{ fontSize: 15, fontWeight: 500, marginBottom: 2 }}
                  >
                    {m.t}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontFamily: "var(--f-mono)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {m.sub}
                  </div>
                </div>
              ))}
            </HScroll>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                href={`/${locale}/contact`}
                className="ulink"
                style={{
                  fontSize: 13,
                  fontFamily: "var(--f-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Order sample kit <Arrow size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Showroom strip ──────────────────────────────────────────── */}
        <section style={{ background: "var(--ink)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            className="container"
            style={{
              padding: "28px var(--pad-x)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Showroom open in Milano</span>
              <span>Via della Moscova 40, 20121</span>
              <span>Tue – Sat, 10:00–18:00</span>
            </div>
            <Link
              href="#"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Book a visit <Arrow size={10} />
            </Link>
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────────────────── */}
        <section
          style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}
        >
          <div className="container">
            <SectionHeader
              index="05"
              eyebrow="Projects"
              title="Recent installations."
              subtitle="Selected deliveries from 2024–25. Case studies available on request with full BOQ and thermal performance data."
              rightSlot={
                <Link
                  href={`/${locale}/projects`}
                  className="btn btn-ghost btn-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  View all projects <Arrow size={12} />
                </Link>
              }
            />

            <HScroll
              itemWidth="max(300px, calc(50% - 16px))"
              gap={32}
              autoScrollMs={5500}
            >
              {PROJECTS.map((p) => (
                <div key={p.name}>
                  <Placeholder
                    aspect="16/10"
                    src={p.img}
                    label={p.name.toUpperCase()}
                  />
                  <ProjectMeta p={p} />
                </div>
              ))}
            </HScroll>
          </div>
        </section>

        {/* ── Trust / Certifications ──────────────────────────────────── */}
        <section
          style={{
            borderBottom: "1px solid var(--line)",
            padding: "64px 0",
            overflow: "hidden",
          }}
        >
          <div className="container" style={{ marginBottom: 32 }}>
            <div className="eyebrow">
              <span className="num">06</span>
              <span className="dot" />
              <span>Certifications &amp; partners</span>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="marquee">
              {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((c, i) => (
                <div key={i} className="marquee-item">
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      border: "1px solid var(--line-2)",
                      transform: "rotate(45deg)",
                      flexShrink: 0,
                    }}
                  />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Band ────────────────────────────────────────────────── */}
        <section style={{ padding: "120px 0", position: "relative" }}>
          <div className="container">
            <div
              className="mob-stack"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 48,
                alignItems: "end",
              }}
            >
              <div>
                <div className="eyebrow" style={{ marginBottom: 24 }}>
                  <span className="num">07</span>
                  <span className="dot" />
                  <span>Start a project</span>
                </div>
                <h2
                  style={
                    {
                      textWrap: "balance",
                      maxWidth: 900,
                    } as React.CSSProperties
                  }
                >
                  Bring the drawings.
                  <br />
                  We&apos;ll return a costed bill of quantities in 72 hours.
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "flex-end",
                }}
              >
                <QuoteButton
                  className="btn btn-primary"
                  style={{ padding: "18px 28px", fontSize: 15 }}
                >
                  Request a quote <Arrow />
                </QuoteButton>
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Or call + 383 44 271 008
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}

function ProjectMeta({ p, big }: { p: (typeof PROJECTS)[0]; big?: boolean }) {
  return (
    <div
      style={{
        padding: "20px 0 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div>
        <h4
          style={{ fontSize: big ? 28 : 20, fontWeight: 500, marginBottom: 8 }}
        >
          {p.name}
        </h4>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 12,
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {p.loc} · {p.yr} · {p.sys}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: 12,
          color: "var(--ink-2)",
          textAlign: "right",
        }}
      >
        {p.scale}
      </div>
    </div>
  );
}
