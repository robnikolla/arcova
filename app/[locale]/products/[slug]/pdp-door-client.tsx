"use client";

import { useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { Placeholder } from "@/components/ui/placeholder";
import { SectionHeader } from "@/components/ui/section-header";
import { SpecRow } from "@/components/ui/spec-row";
import { Corners } from "@/components/ui/corners";
import { useQuoteModal } from "@/components/quote-modal-provider";
import { HScroll } from "@/components/ui/h-scroll";

const TABS = [
  { k: "elevation", l: "Elevation" },
  { k: "section", l: "Section" },
  { k: "render", l: "Render" },
  { k: "installed", l: "Installed" },
];

const CAPTIONS: Record<string, string> = {
  elevation: "ed120_elevation.dwg · 1:10",
  section: "ed120_horizontal_section.dwg · 1:2",
  render: "ed120_3d_render.studio",
  installed: "ed120_completed_install.jpg",
};

const PANELS = [
  { k: "solid", l: "Solid", sub: "Full insulation" },
  { k: "half-light", l: "Half-light", sub: "35% glazed" },
  { k: "full-light", l: "Full-light", sub: "75% glazed" },
  { k: "pivot", l: "Pivot flush", sub: "Coplanar fit" },
];

const HARDWARE = [
  { k: "arrone-300", l: "Arrone 300", sub: "Lever handle" },
  { k: "arrone-400", l: "Arrone 400", sub: "Pull bar" },
  { k: "fingerprint", l: "Fingerprint", sub: "Biometric pad" },
  { k: "custom", l: "Custom", sub: "By specification" },
];

const SECURITY = [
  { k: "rc2", l: "RC2", sub: "Standard resistance" },
  { k: "rc3", l: "RC3", sub: "Enhanced resistance" },
  { k: "rc4", l: "RC4", sub: "High-security" },
];

const THRESHOLDS = [
  { k: "std", l: "Standard", sub: "18 mm rebate" },
  { k: "low", l: "Low-access", sub: "8 mm threshold" },
  { k: "flush", l: "Flush", sub: "Interior use" },
];

const PERF_DATA = [
  { metric: "Thermal transmittance", vals: ["0.66", "0.82", "1.05", "0.74"], unit: "W/m²K (Ud)" },
  { metric: "Acoustic insulation", vals: ["42", "40", "36", "42"], unit: "dB (Rw)" },
  { metric: "Air permeability", vals: ["Class 4", "Class 4", "Class 3", "Class 4"], unit: "EN 12207" },
  { metric: "Watertightness", vals: ["E900", "E900", "E600", "E900"], unit: "EN 12208" },
  { metric: "Wind resistance", vals: ["C4", "C4", "C4", "C4"], unit: "EN 12210" },
  { metric: "Burglar resistance", vals: ["RC3", "RC3", "RC2", "RC3"], unit: "EN 1627" },
  { metric: "Impact resistance", vals: ["Class 3", "Class 3", "Class 2", "Class 3"], unit: "EN 13049" },
  { metric: "Fire classification", vals: ["EI 30", "—", "—", "EI 30"], unit: "EN 13501" },
];

const PERF_COLS = ["ED-120 · Solid", "ED-120 · Half-light", "ED-120 · Full-light", "ED-120 · Pivot"];

const SPEC_SECTIONS = [
  {
    t: "Frame & threshold",
    rows: [
      ["Frame system", "Aluminium 6060-T66, 120 mm depth"],
      ["Sub-frame", "Hot-dip galvanised steel, 3 mm wall"],
      ["Threshold type", "Standard 18 mm / Low-access 8 mm / Flush"],
      ["Threshold material", "Stainless steel 316, brushed"],
      ["Max. opening width", "1600 mm (single), 2400 mm (double)"],
      ["Max. opening height", "2750 mm"],
      ["Frame finish", "Powder coat AAMA 2605 · 213 RAL"],
    ],
  },
  {
    t: "Leaf construction",
    rows: [
      ["Leaf thickness", "82 mm"],
      ["Leaf weight max", "120 kg"],
      ["Outer skin", "Galvanised steel, 1.5 mm"],
      ["Inner skin", "Galvanised steel, 1.5 mm"],
      ["Core insulation", "CFC-free mineral wool, 60 mm"],
      ["Edge seals", "Triple EPDM, continuous perimeter"],
      ["Hinge type", "3 × concealed, load-rated to 120 kg"],
    ],
  },
  {
    t: "Hardware & security",
    rows: [
      ["Security class (standard)", "RC3 · EN 1627"],
      ["Security class (upgrade)", "RC4 on request"],
      ["Locking", "Multi-point, 5-bolt anti-pry"],
      ["Cylinder", "Abloy Protec2 / EVVA MCS"],
      ["Handle options", "Arrone 300 lever · 400 bar · Biometric"],
      ["Closer", "Dorma TS83 (concealed option)"],
      ["Anti-jemmy plate", "Stainless steel, standard"],
    ],
  },
  {
    t: "Compliance & documentation",
    rows: [
      ["CE marking", "EN 14351-1:2006+A2:2016"],
      ["Security test", "EN 1627 Class RC3 · IFT Rosenheim"],
      ["Fire rating (option)", "EI 30 · EI 60 on request"],
      ["Acoustic test", "EN ISO 10140 · 42 dB Rw"],
      ["EPD", "Available on request"],
      ["Warranty — structural", "10 years"],
      ["Warranty — hardware", "5 years"],
    ],
  },
];

const DOWNLOADS = [
  { t: "Declaration of Performance", ext: "PDF", sz: "388 KB" },
  { t: "Technical data sheet", ext: "PDF", sz: "1.9 MB" },
  { t: "CAD profiles — AutoCAD", ext: "DWG", sz: "6.1 MB" },
  { t: "BIM object — Revit", ext: "RFA", sz: "9.4 MB" },
  { t: "Installation manual", ext: "PDF", sz: "4.2 MB" },
  { t: "RC3 test certificate", ext: "PDF", sz: "540 KB" },
];

const RELATED = [
  { slug: "aw-72", id: "AW-72", t: "Aluminium Window System", u: "0.78 W/m²K" },
  { slug: "sw-190", id: "SW-190", t: "Lift-slide System", u: "400 kg sash" },
  { slug: "rs-45", id: "RS-45", t: "Roller Shutter System", u: "Wind class 6" },
];

function DoorElevation() {
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
          <pattern id="door-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          </pattern>
          <pattern id="glass-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(100,140,180,0.25)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#door-grid)" />

        {/* Frame outer */}
        <rect x="80" y="30" width="240" height="430" fill="none" stroke="var(--ink)" strokeWidth="2" />
        {/* Frame inner (rebate) */}
        <rect x="92" y="42" width="216" height="406" fill="none" stroke="var(--ink)" strokeWidth="1" />

        {/* Door leaf */}
        <rect x="94" y="44" width="212" height="402" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.2" />

        {/* Panel inset */}
        <rect x="110" y="60" width="180" height="200" fill="none" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="2 3" />
        <rect x="118" y="68" width="164" height="184" fill="none" stroke="var(--ink)" strokeWidth="0.5" />

        {/* Lower panel */}
        <rect x="110" y="275" width="180" height="150" fill="none" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="2 3" />
        <rect x="118" y="283" width="164" height="134" fill="none" stroke="var(--ink)" strokeWidth="0.5" />

        {/* Handle */}
        <rect x="274" y="210" width="6" height="56" rx="1" fill="var(--ink)" />
        <circle cx="277" cy="238" r="3" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.8" />

        {/* Hinge marks */}
        <rect x="88" y="80" width="6" height="20" fill="var(--muted)" />
        <rect x="88" y="220" width="6" height="20" fill="var(--muted)" />
        <rect x="88" y="360" width="6" height="20" fill="var(--muted)" />

        {/* Threshold line */}
        <line x1="80" y1="460" x2="320" y2="460" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="80" y1="464" x2="320" y2="464" stroke="var(--muted)" strokeWidth="0.5" />

        {/* Width dimension */}
        <line x1="80" y1="14" x2="320" y2="14" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="80" y1="8" x2="80" y2="20" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="320" y1="8" x2="320" y2="20" stroke="var(--muted)" strokeWidth="0.5" />
        <text x="200" y="12" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">900</text>

        {/* Height dimension */}
        <line x1="336" y1="30" x2="336" y2="460" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="330" y1="30" x2="342" y2="30" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="330" y1="460" x2="342" y2="460" stroke="var(--muted)" strokeWidth="0.5" />
        <text x="354" y="248" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)" transform="rotate(90 354 248)">2100</text>

        {/* Labels */}
        <text x="80" y="490" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">ED-120 · ELEVATION · SCALE 1:10 · dimensions in mm</text>
      </svg>
    </div>
  );
}

function DoorSection() {
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
          <pattern id="door-grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          </pattern>
          <pattern id="steel-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="var(--ink)" strokeWidth="0.5" />
          </pattern>
          <pattern id="wool-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#door-grid2)" />

        <g transform="translate(40, 60)">
          {/* Frame block left */}
          <rect x="0" y="0" width="60" height="360" fill="url(#steel-hatch)" stroke="var(--ink)" strokeWidth="1" />
          {/* Frame thermal break */}
          <rect x="14" y="20" width="10" height="320" fill="#C9A86A" stroke="var(--ink)" strokeWidth="0.5" />
          <rect x="36" y="20" width="10" height="320" fill="#C9A86A" stroke="var(--ink)" strokeWidth="0.5" />
          {/* Frame interior void */}
          <rect x="10" y="30" width="4" height="300" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.5" />
          <rect x="46" y="30" width="4" height="300" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.5" />

          {/* Door leaf */}
          <rect x="60" y="10" width="82" height="340" fill="var(--bg-2)" stroke="var(--ink)" strokeWidth="1" />
          {/* Outer steel skin */}
          <rect x="60" y="10" width="8" height="340" fill="url(#steel-hatch)" stroke="var(--ink)" strokeWidth="0.8" />
          {/* Inner steel skin */}
          <rect x="134" y="10" width="8" height="340" fill="url(#steel-hatch)" stroke="var(--ink)" strokeWidth="0.8" />
          {/* Mineral wool core */}
          <rect x="68" y="10" width="66" height="340" fill="url(#wool-hatch)" />
          {/* EPDM seals */}
          <rect x="56" y="80" width="4" height="16" fill="var(--ink)" />
          <rect x="56" y="200" width="4" height="16" fill="var(--ink)" />
          <rect x="142" y="80" width="4" height="16" fill="var(--ink)" />
          <rect x="142" y="200" width="4" height="16" fill="var(--ink)" />

          {/* Threshold */}
          <rect x="60" y="350" width="82" height="14" fill="url(#steel-hatch)" stroke="var(--ink)" strokeWidth="1" />
          <rect x="0" y="360" width="60" height="14" fill="url(#steel-hatch)" stroke="var(--ink)" strokeWidth="1" />
        </g>

        {/* Callout labels */}
        {[
          { x: 100, y: 100, n: "01", t: "Aluminium frame · 120mm" },
          { x: 46, y: 155, n: "02", t: "Polyamide thermal break" },
          { x: 150, y: 200, n: "03", t: "Mineral wool core · 60mm" },
          { x: 100, y: 290, n: "04", t: "Steel leaf skin · 1.5mm" },
          { x: 100, y: 380, n: "05", t: "SS316 threshold · 8–18mm" },
        ].map((c) => (
          <g key={c.n}>
            <circle cx={c.x} cy={c.y} r="8" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.8" />
            <text x={c.x} y={c.y + 3} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="8" fill="var(--ink)">{c.n}</text>
            <text x={c.x + 14} y={c.y + 3} fontFamily="var(--f-mono)" fontSize="8" fill="var(--muted)">{c.t}</text>
          </g>
        ))}

        <text x="40" y="490" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">ED-120 · HORIZONTAL SECTION · SCALE 1:2</text>
      </svg>
    </div>
  );
}

export function PdpDoorClient({ locale }: { locale: string }) {
  const { openQuote } = useQuoteModal();
  const [viewTab, setViewTab] = useState("elevation");
  const [selectedPanel, setSelectedPanel] = useState("solid");
  const [selectedHardware, setSelectedHardware] = useState("arrone-300");
  const [selectedSecurity, setSelectedSecurity] = useState("rc3");
  const [selectedThreshold, setSelectedThreshold] = useState("std");

  return (
    <>
      {/* Product Hero */}
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "48px var(--pad-x) 0" }}>
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "start" }}>

            {/* Left: drawing */}
            <div className="mob-static" style={{ position: "sticky", top: 96 }}>
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

              {viewTab === "elevation" ? <DoorElevation />
                : viewTab === "section" ? <DoorSection />
                : <Placeholder aspect="4/5" label={TABS.find((t) => t.k === viewTab)!.l.toUpperCase()} caption={CAPTIONS[viewTab]} src={`https://picsum.photos/seed/ed120-${viewTab}/800/1000`} />}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase" }}>
                <span>Drawing · {viewTab === "elevation" ? "900×2100 mm typ." : "Frame · 120mm"}</span>
                <span>Revision R.04</span>
              </div>
            </div>

            {/* Right: info */}
            <div style={{ paddingTop: 8 }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                <span className="num">ED-120</span>
                <span className="dot" />
                <span>Entrance Door System</span>
              </div>

              <h1 style={{ fontSize: "clamp(44px, 5vw, 72px)", marginBottom: 24, textWrap: "balance" } as React.CSSProperties}>
                Security door,<br />120 mm frame.
              </h1>

              <p style={{ fontSize: 19, color: "var(--ink-2)", marginBottom: 32, maxWidth: 480, lineHeight: 1.5 }}>
                Engineered for contemporary entrances that demand both thermal performance and high-security resistance.
                Steel-reinforced leaf, concealed multi-point locking, RC3-certified — available in RC4 for sensitive applications.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", marginBottom: 32 }}>
                {[
                  { k: "Thermal", v: "0.66", u: "W/m²K (Ud)" },
                  { k: "Acoustic", v: "42", u: "dB (Rw)" },
                  { k: "Security", v: "RC3", u: "EN 1627" },
                  { k: "Airtight", v: "Class 4", u: "EN 12207" },
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
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Leaf construction</div>
                  <div style={{ fontSize: 20, fontWeight: 500 }}>Steel-core · mineral wool</div>
                  <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>82 mm leaf · 120 mm frame depth</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--line-2)", paddingLeft: 24 }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Lead time</div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>22–28 days</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={openQuote}>Configure & quote <Arrow /></button>
                <a href="#" className="btn btn-ghost">Download BIM <Arrow /></a>
              </div>

              <div style={{ marginTop: 32, display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                <span>✓ CE marked</span>
                <span>✓ RC3 certified</span>
                <span>✓ EI 30 option</span>
                <span>✓ EPD available</span>
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
            subtitle="Base configuration shown. Full options — dimensions, glazing inserts, handle finishes, fire ratings — available in the quote flow."
            rightSlot={
              <button className="btn btn-primary btn-sm" onClick={openQuote} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                Continue in quote flow <Arrow size={12} />
              </button>
            }
          />

          {/* Panel design */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 01</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Panel design</div>
            </div>
            <div className="mob-2col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {PANELS.map((p, i) => (
                <button key={p.k} onClick={() => setSelectedPanel(p.k)}
                  style={{
                    padding: "24px 16px", borderRight: i < PANELS.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedPanel === p.k ? "var(--ink)" : "var(--bg)",
                    color: selectedPanel === p.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer", transition: "all .15s",
                  }}>
                  <svg width="44" height="56" viewBox="0 0 44 56" fill="none" style={{ display: "block", marginBottom: 12 }}>
                    <rect x="2" y="2" width="40" height="52" stroke="currentColor" strokeWidth="1.2" />
                    {p.k === "solid" && (
                      <>
                        <rect x="6" y="6" width="32" height="22" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
                        <rect x="6" y="32" width="32" height="16" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
                      </>
                    )}
                    {p.k === "half-light" && (
                      <>
                        <rect x="6" y="6" width="32" height="22" fill="rgba(100,140,180,0.2)" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="6" y1="6" x2="38" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                        <line x1="38" y1="6" x2="6" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                        <rect x="6" y="32" width="32" height="16" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
                      </>
                    )}
                    {p.k === "full-light" && (
                      <>
                        <rect x="6" y="6" width="32" height="44" fill="rgba(100,140,180,0.2)" stroke="currentColor" strokeWidth="0.8" />
                        <line x1="6" y1="6" x2="38" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                        <line x1="38" y1="6" x2="6" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                      </>
                    )}
                    {p.k === "pivot" && (
                      <>
                        <circle cx="22" cy="28" r="2" fill="currentColor" />
                        <line x1="2" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
                        <rect x="6" y="10" width="32" height="14" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
                        <rect x="6" y="32" width="32" height="14" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
                      </>
                    )}
                    <rect x="36" y="24" width="3" height="10" fill="currentColor" />
                  </svg>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{p.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 4 }}>{p.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Hardware */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 02</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Hardware</div>
            </div>
            <div className="mob-2col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {HARDWARE.map((h, i) => (
                <button key={h.k} onClick={() => setSelectedHardware(h.k)}
                  style={{
                    padding: 20, borderRight: i < HARDWARE.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedHardware === h.k ? "var(--ink)" : "var(--bg)",
                    color: selectedHardware === h.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer",
                  }}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{h.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 6 }}>{h.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 03</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Security class</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {SECURITY.map((s, i) => (
                <button key={s.k} onClick={() => setSelectedSecurity(s.k)}
                  style={{
                    padding: 20, borderRight: i < SECURITY.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedSecurity === s.k ? "var(--ink)" : "var(--bg)",
                    color: selectedSecurity === s.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer",
                  }}>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 6 }}>{s.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Threshold */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 04</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Threshold</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {THRESHOLDS.map((t, i) => (
                <button key={t.k} onClick={() => setSelectedThreshold(t.k)}
                  style={{
                    padding: 20, borderRight: i < THRESHOLDS.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedThreshold === t.k ? "var(--ink)" : "var(--bg)",
                    color: selectedThreshold === t.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer",
                  }}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{t.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 6 }}>{t.sub}</div>
                </button>
              ))}
            </div>
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
            subtitle="All values tested per EN standards by notified body IFT Rosenheim. Declaration of Performance available for download."
          />
          <div style={{ border: "1px solid var(--line-2)", overflowX: "auto" }}>
            <div style={{ minWidth: 640 }}>
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
        </div>
      </section>

      {/* Construction — dark section */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--ink)", color: "var(--bg)" }}>
        <div className="container" style={{ padding: "120px var(--pad-x)" }}>
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
                <span className="num" style={{ color: "rgba(255,255,255,0.55)" }}>04</span>
                <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%" }} />
                <span>Construction</span>
              </div>
              <h2 style={{ color: "var(--bg)", textWrap: "balance", marginBottom: 24 } as React.CSSProperties}>
                Steel core.<br />Thermal silence.
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, marginBottom: 40, maxWidth: 480 }}>
                The ED-120 leaf runs a galvanised steel sub-frame with mineral wool cavity fill between 1.5 mm outer skins.
                Triple EPDM perimeter seals and a concealed multi-bolt locking system deliver RC3 resistance without hardware bulk on the face.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {[
                  { n: "01", t: "Galvanised steel sub-frame", d: "Hot-dip, 3 mm wall section" },
                  { n: "02", t: "Polyamide thermal break", d: "120 mm total frame depth" },
                  { n: "03", t: "Mineral wool core", d: "CFC-free, 60 mm cavity" },
                  { n: "04", t: "Multi-point locking", d: "5-bolt, RC3 · concealed" },
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
              <DoorSection />
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
            subtitle="Complete technical data for ED-120. For structural calculations and security compliance documentation, download the DOP or contact engineering."
          />
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "56px 64px" }}>
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
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
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

      {/* Related Systems */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <SectionHeader eyebrow="Compatible systems" title="Specified together." />
          <HScroll itemWidth="max(260px, calc(33.33% - 22px))" gap={32} autoScrollMs={0}>
            {RELATED.map((x) => (
              <Link
                key={x.slug}
                href={`/${locale}/products/${x.slug}`}
                className="prod-card"
                style={{ display: "block" }}
              >
                <Placeholder
                  aspect="4/5"
                  src={`https://picsum.photos/seed/related-${x.slug}/800/1000`}
                  label={x.id}
                />
                <div style={{ padding: "20px 0 0", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6, textTransform: "uppercase" }}>{x.id}</div>
                    <h4 style={{ fontSize: 20, fontWeight: 500 }}>{x.t}</h4>
                    <div style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--f-mono)", marginTop: 4 }}>{x.u}</div>
                  </div>
                  <Arrow />
                </div>
              </Link>
            ))}
          </HScroll>
        </div>
      </section>
    </>
  );
}
