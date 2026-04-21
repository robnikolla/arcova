"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/arrow";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeader } from "@/components/ui/section-header";
import { SpecRow } from "@/components/ui/spec-row";
import { Corners } from "@/components/ui/corners";
import { useQuoteModal } from "@/components/quote-modal-provider";

const TABS = [
  { k: "elevation", l: "Elevation" },
  { k: "section", l: "Section" },
  { k: "render", l: "Render" },
  { k: "installed", l: "Installed" },
];

const CAPTIONS: Record<string, string> = {
  elevation: "aw72_elevation.dwg · 1:10",
  section: "aw72_horizontal_section.dwg · 1:2",
  render: "aw72_3d_render.studio",
  installed: "aw72_completed_install.jpg",
};

const OPENINGS = [
  { k: "tilt-turn", l: "Tilt & Turn", u: "0.78" },
  { k: "casement", l: "Casement", u: "0.81" },
  { k: "top-hung", l: "Top-hung", u: "0.82" },
  { k: "fixed", l: "Fixed light", u: "0.72" },
  { k: "pivot", l: "Pivot", u: "0.85" },
];

const GLAZINGS = [
  { k: "double", l: "Double · 4-16-4", u: "1.1", th: "24mm" },
  { k: "triple", l: "Triple · 4-16-4-16-4", u: "0.78", th: "44mm" },
  { k: "acoustic", l: "Acoustic triple", u: "0.78", th: "48mm" },
  { k: "security", l: "Laminated P4A", u: "0.82", th: "46mm" },
];

const FINISHES = [
  { k: "anthracite", l: "Anthracite · 7016", sw: "#383E42" },
  { k: "pure-white", l: "Pure White · 9010", sw: "#F2EFE8" },
  { k: "bronze", l: "Bronze · 8019", sw: "#3B2A20" },
  { k: "silver", l: "Silver · natural", sw: "#BBBAB4" },
  { k: "sage", l: "Sage · 6021", sw: "#89967A" },
  { k: "black", l: "Deep Black · 9005", sw: "#141414" },
];

const PERF_DATA = [
  { metric: "Thermal transmittance", vals: ["0.78", "1.1", "0.74", "0.82"], unit: "W/m²K (Uw)" },
  { metric: "Acoustic insulation", vals: ["44", "38", "46", "52"], unit: "dB (Rw)" },
  { metric: "Air permeability", vals: ["Class 4", "Class 4", "Class 4", "Class 4"], unit: "EN 12207" },
  { metric: "Watertightness", vals: ["E1200", "E900", "E1200", "E1500"], unit: "EN 12208" },
  { metric: "Wind resistance", vals: ["C5", "C4", "C5", "C5"], unit: "EN 12210" },
  { metric: "Burglar resistance", vals: ["RC2", "RC1N", "RC2", "RC3"], unit: "EN 1627" },
  { metric: "Solar factor g", vals: ["0.52", "0.62", "0.52", "0.48"], unit: "" },
  { metric: "Light transmission", vals: ["72%", "80%", "72%", "68%"], unit: "τv" },
];

const PERF_COLS = ["AW-72 · Std", "AW-72 · Dbl", "AW-72 · Acoustic", "AW-72 · Security"];

const SPEC_SECTIONS = [
  {
    t: "Profile & assembly",
    rows: [
      ["Frame depth", "72 mm"],
      ["Sash depth", "80 mm"],
      ["Sight line (frame + sash)", "106 mm"],
      ["Chamber count", "3 chambers"],
      ["Thermal break material", "Polyamide PA66 GF25"],
      ["Thermal break width", "24 mm · 34 mm option"],
      ["Corner assembly", "Mechanical crimp + glue"],
      ["Max sash weight", "160 kg"],
      ["Max sash dimensions", "1400 × 2400 mm"],
    ],
  },
  {
    t: "Glazing",
    rows: [
      ["Glazing thickness range", "24 – 56 mm"],
      ["Standard IGU", "4 / 16 Ar / 4 low-E"],
      ["Premium IGU", "4 / 16 Ar / 4 / 16 Ar / 4"],
      ["Spacer type", "Warm-edge composite"],
      ["Filling gas", "Argon 90% min."],
      ["Coating", "Low-E magnetron-sputtered"],
    ],
  },
  {
    t: "Hardware & finish",
    rows: [
      ["Hardware", "Roto NX / Maco MM concealed"],
      ["Finish process", "Powder coat AAMA 2605"],
      ["Standard colours", "Anthracite 7016, White 9010, Black 9005"],
      ["RAL options", "213 matte and gloss"],
      ["Wood-effect laminate", "Available (Renolit)"],
      ["Anodising", "Class 20 (20µm) · EURAS QUALANOD"],
    ],
  },
  {
    t: "Compliance & documentation",
    rows: [
      ["CE marking", "EN 14351-1:2006+A2:2016"],
      ["Notified body", "IFT Rosenheim · 0757"],
      ["Environmental declaration", "EPD available on request"],
      ["Fire classification", "B-s1,d0 (on option)"],
      ["Warranty — structural", "10 years"],
      ["Warranty — hardware", "5 years"],
    ],
  },
];

const DOWNLOADS = [
  { t: "Declaration of Performance", ext: "PDF", sz: "412 KB" },
  { t: "Technical data sheet", ext: "PDF", sz: "2.1 MB" },
  { t: "CAD profiles — AutoCAD", ext: "DWG", sz: "8.4 MB" },
  { t: "BIM object — Revit", ext: "RFA", sz: "12.2 MB" },
  { t: "Installation manual", ext: "PDF", sz: "3.8 MB" },
  { t: "Environmental declaration", ext: "PDF", sz: "960 KB" },
];

function OpeningIcon({ type }: { type: string }) {
  const stroke = "currentColor";
  return (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none">
      <rect x="4" y="6" width="36" height="32" stroke={stroke} strokeWidth="1" />
      {type === "tilt-turn" && (
        <>
          <line x1="4" y1="6" x2="22" y2="22" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="40" y1="6" x2="22" y2="22" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
        </>
      )}
      {type === "casement" && (
        <>
          <line x1="22" y1="6" x2="22" y2="38" stroke={stroke} strokeWidth="0.8" />
          <line x1="40" y1="22" x2="22" y2="6" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="40" y1="22" x2="22" y2="38" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
        </>
      )}
      {type === "top-hung" && (
        <>
          <line x1="4" y1="6" x2="22" y2="22" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="40" y1="6" x2="22" y2="22" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="4" y1="38" x2="40" y2="38" stroke={stroke} strokeWidth="1.4" />
        </>
      )}
      {type === "fixed" && (
        <>
          <line x1="4" y1="6" x2="40" y2="38" stroke={stroke} strokeWidth="0.6" />
          <line x1="40" y1="6" x2="4" y2="38" stroke={stroke} strokeWidth="0.6" />
        </>
      )}
      {type === "pivot" && (
        <>
          <circle cx="22" cy="22" r="2" fill={stroke} />
          <line x1="4" y1="22" x2="40" y2="22" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
        </>
      )}
    </svg>
  );
}

function ElevationDrawing() {
  return (
    <div
      style={{
        background: "var(--bg-2)",
        padding: 40,
        aspectRatio: "4/5",
        position: "relative",
        border: "1px solid var(--line)",
      }}
    >
      <Corners />
      <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#grid)" />
        <rect x="60" y="40" width="280" height="400" fill="none" stroke="var(--ink)" strokeWidth="2" />
        <rect x="72" y="52" width="256" height="376" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <line x1="200" y1="52" x2="200" y2="428" stroke="var(--ink)" strokeWidth="1" />
        <line x1="72" y1="52" x2="200" y2="240" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="72" y1="428" x2="200" y2="240" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="328" y1="52" x2="200" y2="240" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="328" y1="428" x2="200" y2="240" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="196" cy="240" r="3" fill="var(--ink)" />
        <rect x="192" y="240" width="8" height="24" fill="var(--ink)" />
        <line x1="60" y1="24" x2="340" y2="24" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="60" y1="18" x2="60" y2="30" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="340" y1="18" x2="340" y2="30" stroke="var(--muted)" strokeWidth="0.5" />
        <text x="200" y="22" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">1400</text>
        <line x1="360" y1="40" x2="360" y2="440" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="354" y1="40" x2="366" y2="40" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="354" y1="440" x2="366" y2="440" stroke="var(--muted)" strokeWidth="0.5" />
        <text x="376" y="242" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)" transform="rotate(90 376 242)">1600</text>
        <text x="130" y="470" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">SASH · A</text>
        <text x="270" y="470" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">SASH · B</text>
        <text x="72" y="490" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">AW-72 · ELEVATION · SCALE 1:10 · dimensions in mm</text>
      </svg>
    </div>
  );
}

function SectionDrawing() {
  return (
    <div
      style={{
        background: "var(--bg-2)",
        padding: 40,
        aspectRatio: "4/5",
        position: "relative",
        border: "1px solid var(--line)",
      }}
    >
      <Corners />
      <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          </pattern>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted)" strokeWidth="0.6" />
          </pattern>
          <pattern id="hatch2" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--ink)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#grid2)" />
        <g transform="translate(60, 100)">
          <rect x="0" y="0" width="72" height="300" fill="url(#hatch2)" stroke="var(--ink)" strokeWidth="1" />
          <rect x="8" y="40" width="12" height="220" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.8" />
          <rect x="52" y="40" width="12" height="220" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.8" />
          <rect x="24" y="80" width="24" height="140" fill="#C9A86A" stroke="var(--ink)" strokeWidth="0.8" />
          <rect x="72" y="40" width="60" height="220" fill="url(#hatch2)" stroke="var(--ink)" strokeWidth="1" />
          <rect x="78" y="70" width="8" height="160" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.5" />
          <circle cx="72" cy="60" r="3" fill="var(--ink)" />
          <circle cx="72" cy="240" r="3" fill="var(--ink)" />
          <rect x="132" y="80" width="80" height="140" fill="url(#hatch)" stroke="var(--ink)" strokeWidth="1" />
          <rect x="132" y="80" width="4" height="140" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.6" />
          <rect x="170" y="80" width="4" height="140" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.6" />
          <rect x="208" y="80" width="4" height="140" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.6" />
          <rect x="132" y="74" width="80" height="6" fill="var(--ink)" />
          <rect x="132" y="220" width="80" height="6" fill="var(--ink)" />
        </g>
        {[
          { x: 96, y: 50, n: "01", t: "Aluminium profile 6060-T66" },
          { x: 36, y: 180, n: "02", t: "Polyamide thermal break · 24mm" },
          { x: 210, y: 80, n: "03", t: "Triple IGU · 4-16Ar-4-16Ar-4" },
          { x: 132, y: 300, n: "04", t: "Warm-edge spacer" },
          { x: 132, y: 450, n: "05", t: "Co-extruded EPDM seal" },
        ].map((c) => (
          <g key={c.n}>
            <circle cx={c.x} cy={c.y} r="8" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.8" />
            <text x={c.x} y={c.y + 3} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="8" fill="var(--ink)">{c.n}</text>
            <text x={c.x + 14} y={c.y + 3} fontFamily="var(--f-mono)" fontSize="8" fill="var(--muted)">{c.t}</text>
          </g>
        ))}
        <text x="60" y="490" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">AW-72 · HORIZONTAL SECTION · SCALE 1:2</text>
      </svg>
    </div>
  );
}

export function PdpClient({ locale }: { locale: string }) {
  const { openQuote } = useQuoteModal();
  const [viewTab, setViewTab] = useState("elevation");
  const [selectedOpening, setSelectedOpening] = useState("tilt-turn");
  const [selectedGlazing, setSelectedGlazing] = useState("triple");
  const [selectedFinish, setSelectedFinish] = useState("anthracite");

  return (
    <>
      {/* Product Hero */}
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "48px var(--pad-x) 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "start" }}>
            {/* Left: drawing */}
            <div style={{ position: "sticky", top: 96 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 24 }}>
                  {TABS.map((t) => (
                    <button
                      key={t.k}
                      onClick={() => setViewTab(t.k)}
                      style={{
                        fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                        color: viewTab === t.k ? "var(--ink)" : "var(--muted)",
                        borderBottom: viewTab === t.k ? "1px solid var(--ink)" : "1px solid transparent",
                        paddingBottom: 4, background: "transparent", cursor: "pointer",
                      }}
                    >{t.l}</button>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em" }}>01 / 04</div>
              </div>

              {viewTab === "elevation" ? <ElevationDrawing />
                : viewTab === "section" ? <SectionDrawing />
                : <Placeholder aspect="4/5" label={TABS.find((t) => t.k === viewTab)!.l.toUpperCase()} caption={CAPTIONS[viewTab]} src={`https://picsum.photos/seed/aw72-${viewTab}/800/1000`} />}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase" }}>
                <span>Drawing · {viewTab === "elevation" ? "1400×1600 mm typ." : "Profile · 72mm"}</span>
                <span>Revision R.07</span>
              </div>
            </div>

            {/* Right: info */}
            <div style={{ paddingTop: 8 }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                <span className="num">AW-72</span>
                <span className="dot" />
                <span>Aluminium Window System</span>
              </div>

              <h1 style={{ fontSize: "clamp(44px, 5vw, 72px)", marginBottom: 24, textWrap: "balance" } as React.CSSProperties}>
                Thermal-break<br />aluminium, 72 mm.
              </h1>

              <p style={{ fontSize: 19, color: "var(--ink-2)", marginBottom: 32, maxWidth: 480, lineHeight: 1.5 }}>
                A flagship European-profile window for contemporary facades. Three-chamber aluminium,
                polyamide thermal bridge, concealed EPDM seals. Engineered for commercial and high-spec residential.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", marginBottom: 32 }}>
                {[
                  { k: "U-value", v: "0.78", u: "W/m²K" },
                  { k: "Acoustic", v: "44", u: "dB (Rw)" },
                  { k: "Watertight", v: "E1200", u: "EN 12208" },
                  { k: "Burglar", v: "RC2", u: "EN 1627" },
                ].map((s) => (
                  <div key={s.k} style={{ background: "var(--bg)", padding: "18px 20px" }}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{s.k}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em" }}>{s.v}</span>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)" }}>{s.u}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ border: "1px solid var(--line-2)", padding: "20px 24px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Profile system</div>
                  <div style={{ fontSize: 20, fontWeight: 500 }}>aluplast · Salamander</div>
                  <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>German-engineered extrusions</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--line-2)", paddingLeft: 24 }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Lead time</div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>18–22 days</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={openQuote}>Configure & quote <Arrow /></button>
                <a href="#" className="btn btn-ghost">Download BIM <Arrow /></a>
              </div>

              <div style={{ marginTop: 32, display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                <span>✓ CE marked</span>
                <span>✓ EN 14351-1</span>
                <span>✓ EPD available</span>
                <span>✓ Passivhaus comp.</span>
              </div>
            </div>
          </div>
          <div style={{ height: 96 }} />
        </div>
      </section>

      {/* Config Strip */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
        <div className="container" style={{ padding: "80px var(--pad-x)" }}>
          <SectionHeader
            index="02"
            eyebrow="Configuration"
            title="Specify in four steps."
            subtitle="Base configuration shown. Full options — dimensions, hardware, coatings, acoustic upgrades — available in the quote flow."
            rightSlot={
              <button className="btn btn-primary btn-sm" onClick={openQuote} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                Continue in quote flow <Arrow size={12} />
              </button>
            }
          />

          {/* Opening types */}
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 01</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Opening type</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {OPENINGS.map((o, i) => (
                <button key={o.k} onClick={() => setSelectedOpening(o.k)}
                  style={{
                    padding: "24px 16px", borderRight: i < OPENINGS.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedOpening === o.k ? "var(--ink)" : "var(--bg)",
                    color: selectedOpening === o.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer", transition: "all .15s",
                  }}>
                  <OpeningIcon type={o.k} />
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 16 }}>{o.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 4 }}>Uw {o.u}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Glazing */}
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 02</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Glazing</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {GLAZINGS.map((g, i) => (
                <button key={g.k} onClick={() => setSelectedGlazing(g.k)}
                  style={{
                    padding: 20, borderRight: i < GLAZINGS.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedGlazing === g.k ? "var(--ink)" : "var(--bg)",
                    color: selectedGlazing === g.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer",
                  }}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{g.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 6, display: "flex", gap: 12 }}>
                    <span>Ug {g.u}</span><span>·</span><span>{g.th}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Finish */}
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 03</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Finish</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {FINISHES.map((f, i) => (
                <button key={f.k} onClick={() => setSelectedFinish(f.k)}
                  style={{
                    padding: 16, borderRight: i < FINISHES.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedFinish === f.k ? "var(--ink)" : "var(--bg)",
                    color: selectedFinish === f.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                  }}>
                  <div style={{ width: 28, height: 28, background: f.sw, border: "1px solid rgba(0,0,0,0.15)", flexShrink: 0 }} />
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.2 }}>{f.l}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            + 213 RAL options available on request
          </div>
        </div>
      </section>

      {/* Performance Matrix */}
      <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
        <div className="container">
          <SectionHeader
            index="03"
            eyebrow="Performance"
            title="Certified across four configurations."
            subtitle="All values measured per harmonised EN standards by notified body IFT Rosenheim. Declaration of Performance available for download."
          />
          <div style={{ border: "1px solid var(--line-2)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(4, 1fr)", background: "var(--ink)", color: "var(--bg)" }}>
              <div style={{ padding: "16px 20px", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Metric</div>
              {PERF_COLS.map((c) => (
                <div key={c} style={{ padding: "16px 20px", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", borderLeft: "1px solid rgba(255,255,255,0.15)" }}>{c}</div>
              ))}
            </div>
            {PERF_DATA.map((d, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr repeat(4, 1fr)", borderTop: i > 0 ? "1px solid var(--line)" : "none", background: i % 2 === 0 ? "var(--bg)" : "var(--bg-2)" }}>
                <div style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{d.metric}</span>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)" }}>{d.unit}</span>
                </div>
                {d.vals.map((v, j) => (
                  <div key={j} style={{ padding: 20, fontFamily: "var(--f-mono)", fontSize: 15, fontWeight: 500, borderLeft: "1px solid var(--line)", background: j === 0 ? "color-mix(in oklab, var(--accent) 8%, transparent)" : "transparent" }}>
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Section */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--ink)", color: "var(--bg)" }}>
        <div className="container" style={{ padding: "120px var(--pad-x)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
                <span className="num" style={{ color: "rgba(255,255,255,0.55)" }}>04</span>
                <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%" }} />
                <span>Construction</span>
              </div>
              <h2 style={{ color: "var(--bg)", textWrap: "balance", marginBottom: 24 } as React.CSSProperties}>
                Three chambers.<br />One weather seal.
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, marginBottom: 40, maxWidth: 480 }}>
                The AW-72 profile runs a 24 mm polyamide thermal break between extruded aluminium shells.
                Co-extruded EPDM gaskets seat against the sash, eliminating the secondary brush seal common to cheaper systems.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {[
                  { n: "01", t: "Aluminium 6060-T66", d: "2.0mm wall, powder coated" },
                  { n: "02", t: "Polyamide thermal break", d: "Glass-reinforced PA66" },
                  { n: "03", t: "Triple IGU", d: "44mm sealed, argon-filled" },
                  { n: "04", t: "EPDM seals", d: "Co-extruded, continuous" },
                ].map((c) => (
                  <div key={c.n} style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 16 }}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.12em", marginBottom: 6 }}>{c.n}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--bg)", marginBottom: 4 }}>{c.t}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{c.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "var(--bg)", padding: 40 }}>
              <SectionDrawing />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
        <div className="container">
          <SectionHeader
            index="05"
            eyebrow="Technical specification"
            title="The full sheet."
            subtitle="Complete technical data for AW-72. For structural calculations and thermal modelling, download the DOP or contact engineering."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "56px 64px" }}>
            {SPEC_SECTIONS.map((s) => (
              <div key={s.t}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
                  <h4 style={{ fontSize: 20, fontWeight: 500 }}>{s.t}</h4>
                  <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
                </div>
                <table className="spec">
                  <tbody>
                    {s.rows.map((r) => <SpecRow key={r[0]} k={r[0]} v={r[1]} />)}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-2)", padding: "100px 0" }}>
        <div className="container">
          <SectionHeader index="06" eyebrow="Technical library" title="Downloads." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
            {DOWNLOADS.map((f, i) => (
              <a href="#" key={f.t}
                style={{
                  padding: "24px 28px",
                  borderBottom: i < DOWNLOADS.length - 2 ? "1px solid var(--line-2)" : "none",
                  borderLeft: i % 2 === 1 ? "1px solid var(--line-2)" : "none",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{f.t}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{f.ext} · {f.sz}</div>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
