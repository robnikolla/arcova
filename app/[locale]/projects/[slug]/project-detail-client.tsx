"use client";

import { useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeader } from "@/components/ui/section-header";
import { QuoteButton } from "@/components/quote-button";
import type { Project } from "../data";

const GALLERY_SEEDS = ["arch-e", "arch-f", "arch-g", "arch-h"];

export function ProjectDetailClient({
  project: p,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const [activeImage, setActiveImage] = useState(0);

  const gallerySeeds = [p.imgSeed, ...GALLERY_SEEDS.slice(0, 3)];

  return (
    <main>
      {/* Back nav */}
      <div style={{ borderBottom: "1px solid var(--line)" }}>
        <div
          className="container"
          style={{
            padding: "14px var(--pad-x)",
            display: "flex",
            gap: 12,
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            alignItems: "center",
          }}
        >
          <Link
            href={`/${locale}/projects`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--muted)",
            }}
          >
            ← Projects
          </Link>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>{p.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ position: "relative", borderBottom: "1px solid var(--line)" }}>
        <Placeholder
          aspect="21/8"
          src={`https://picsum.photos/seed/${p.imgSeed}/2100/800`}
          label={`${p.name.toUpperCase()} · HERO`}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: "var(--pad-x)",
              right: "var(--pad-x)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {p.location} · {p.year} · {p.tag}
            </div>
            <h1
              style={{ color: "#fff", textWrap: "balance", maxWidth: 900 } as React.CSSProperties}
            >
              {p.name}
            </h1>
          </div>
        </Placeholder>
      </section>

      {/* Meta strip */}
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "0 var(--pad-x)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 0,
            }}
          >
            {[
              { k: "Client location", v: p.location },
              { k: "Completion", v: String(p.year) },
              { k: "Architect", v: p.architect },
              { k: "Systems", v: p.systems.join(" · ") },
              { k: "Openings", v: `${p.openings} units` },
            ].map((m, i) => (
              <div
                key={m.k}
                style={{
                  padding: "24px 24px 24px 0",
                  borderRight: i < 4 ? "1px solid var(--line)" : "none",
                  paddingLeft: i === 0 ? 0 : 24,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {m.k}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief + gallery */}
      <section style={{ borderBottom: "1px solid var(--line)", padding: "96px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Text */}
            <div style={{ position: "sticky", top: 96 }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                <span className="num">01</span>
                <span className="dot" />
                <span>Project brief</span>
              </div>
              <h2
                style={{ textWrap: "balance", marginBottom: 32 } as React.CSSProperties}
              >
                The brief.
              </h2>
              <div
                style={{
                  color: "var(--ink-2)",
                  fontSize: 16,
                  lineHeight: 1.7,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <p>
                  <strong>{p.architect}</strong> specified the{" "}
                  {p.systems.join(" and ")} systems for {p.name} in{" "}
                  {p.location}, requiring made-to-order openings across{" "}
                  {p.openings} positions in the facade.
                </p>
                <p>
                  The specification called for a consistent thermal performance
                  across all openings — U-values below 0.85 W/m²K — with a
                  single profile family to simplify installation sequencing on
                  site.
                </p>
                <p>
                  All drawings were reviewed and signed off at Arcova before
                  production commenced. Lead time held at 18 days from confirmed
                  order.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0,
                  border: "1px solid var(--line-2)",
                  marginTop: 40,
                }}
              >
                {[
                  { k: "Lead time", v: "18 days" },
                  { k: "On-time", v: "100%" },
                  { k: "Profile", v: p.systems[0] },
                  { k: "RC class", v: "RC2" },
                ].map((s, i) => (
                  <div
                    key={s.k}
                    style={{
                      padding: "16px 20px",
                      background: "var(--bg)",
                      borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                      borderBottom: i < 2 ? "1px solid var(--line-2)" : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        color: "var(--muted)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {s.k}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 500 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Placeholder
                aspect="4/3"
                src={`https://picsum.photos/seed/${gallerySeeds[activeImage]}/1200/900`}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 8,
                }}
              >
                {gallerySeeds.map((seed, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      padding: 0,
                      outline:
                        activeImage === i ? "2px solid var(--ink)" : "none",
                      outlineOffset: -2,
                      opacity: activeImage === i ? 1 : 0.6,
                      transition: "opacity .15s",
                      cursor: "pointer",
                    }}
                  >
                    <Placeholder
                      aspect="4/3"
                      src={`https://picsum.photos/seed/${seed}/400/300`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systems used */}
      <section
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-2)",
          padding: "96px 0",
        }}
      >
        <div className="container">
          <SectionHeader
            index="02"
            eyebrow="Systems specified"
            title={`${p.systems.length} system${p.systems.length > 1 ? "s" : ""} across this project.`}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${p.systems.length}, 1fr)`,
              gap: 0,
              border: "1px solid var(--line-2)",
            }}
          >
            {p.systems.map((sys, i) => (
              <div
                key={sys}
                style={{
                  padding: 36,
                  borderRight:
                    i < p.systems.length - 1 ? "1px solid var(--line-2)" : "none",
                  background: "var(--bg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    color: "var(--muted)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  System {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    marginBottom: 16,
                  }}
                >
                  {sys}
                </div>
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 12,
                    color: "var(--muted)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <span>Uw 0.78 W/m²K</span>
                  <span>Rw 44 dB</span>
                  <span>CE · EN 14351-1</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--ink)",
          color: "var(--bg)",
          padding: "100px 0",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 40,
              }}
            >
              — {p.architect} · Project architect
            </div>
            <blockquote
              style={{
                fontSize: "clamp(24px, 3vw, 42px)",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "var(--bg)",
                textWrap: "balance",
              } as React.CSSProperties}
            >
              &ldquo;The drawings came back signed within 48 hours. Every
              opening arrived on the same truck, plumb to the millimetre.
              That&apos;s not common.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section style={{ borderBottom: "1px solid var(--line)", padding: "96px 0" }}>
        <div className="container">
          <SectionHeader
            index="03"
            eyebrow="Documentation"
            title="Project record."
            subtitle="Available to registered architects and contractors on request."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 0,
              border: "1px solid var(--line-2)",
            }}
          >
            {[
              { t: "Signed architectural drawings", ext: "PDF", note: "R.07 · as-built" },
              { t: "Bill of quantities", ext: "XLSX", note: "All openings with references" },
              {
                t: "Performance declarations (DoP)",
                ext: "PDF",
                note: p.systems.join(", ") + " systems",
              },
              {
                t: "QC water-test records",
                ext: "PDF",
                note: `${p.openings} unit certificates`,
              },
            ].map((d, i) => (
              <a
                href="#"
                key={d.t}
                style={{
                  padding: "24px 28px",
                  borderBottom: i < 2 ? "1px solid var(--line-2)" : "none",
                  borderLeft: i % 2 === 1 ? "1px solid var(--line-2)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>
                    {d.t}
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
                    {d.ext} · {d.note}
                  </div>
                </div>
                <Arrow size={12} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <span className="dot" />
                <span>Start a project</span>
              </div>
              <h2
                style={{ textWrap: "balance", maxWidth: 800 } as React.CSSProperties}
              >
                Working on something similar?
                <br />
                Send us the drawings.
              </h2>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <QuoteButton className="btn btn-primary">
                Request a quote <Arrow />
              </QuoteButton>
              <Link
                href={`/${locale}/projects`}
                className="btn btn-ghost"
                style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
              >
                ← All projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
