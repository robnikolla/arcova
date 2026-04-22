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
  { k: "profile", l: "Profile" },
  { k: "installation", l: "Installation" },
  { k: "render", l: "Render" },
  { k: "installed", l: "Installed" },
];

const CAPTIONS: Record<string, string> = {
  profile: "rs45_slat_section.dwg · 1:1",
  installation: "rs45_installation_diagram.dwg · 1:10",
  render: "rs45_3d_render.studio",
  installed: "rs45_completed_install.jpg",
};

const SLATS = [
  { k: "rs-45", l: "RS-45", sub: "Round-base · 45mm", ud: "1.0" },
  { k: "rs-55", l: "RS-55", sub: "Foam-filled · 55mm", ud: "0.82" },
  { k: "rs-77", l: "RS-77", sub: "High-insulation · 77mm", ud: "0.65" },
];

const DRIVES = [
  { k: "tubular", l: "Tubular motor", sub: "Compact, silent" },
  { k: "belt", l: "Belt drive", sub: "Ultra-quiet operation" },
  { k: "solar", l: "Solar drive", sub: "Off-grid, no wiring" },
];

const CONTROLS = [
  { k: "switch", l: "Wall switch", sub: "Standard" },
  { k: "somfy", l: "Somfy app", sub: "iOS & Android" },
  { k: "knx", l: "KNX / BACnet", sub: "Building automation" },
];

const COLOURS = [
  { k: "white", l: "White · 9010", sw: "#F2EFE8" },
  { k: "anthracite", l: "Anthracite · 7016", sw: "#383E42" },
  { k: "bronze", l: "Bronze · 8017", sw: "#49281A" },
  { k: "silver", l: "Silver · natural", sw: "#BBBAB4" },
  { k: "black", l: "Black · 9005", sw: "#141414" },
  { k: "ral", l: "RAL custom", sw: "linear-gradient(135deg,#C9A86A,#2B2E2A,#8A7A5C)" },
];

const PERF_DATA = [
  { metric: "Wind resistance class", vals: ["Class 4", "Class 5", "Class 6"], unit: "EN 13241" },
  { metric: "Thermal transmittance", vals: ["1.0", "0.82", "0.65"], unit: "W/m²K (Ud)" },
  { metric: "Acoustic insulation", vals: ["32", "36", "40"], unit: "dB (Rw)" },
  { metric: "Light blockage (closed)", vals: ["85%", "95%", "99%"], unit: "transmittance" },
  { metric: "Max. curtain area", vals: ["16 m²", "14 m²", "12 m²"], unit: "single span" },
  { metric: "Max. curtain width", vals: ["5000 mm", "4500 mm", "4000 mm"], unit: "" },
  { metric: "Max. curtain height", vals: ["4000 mm", "3500 mm", "3200 mm"], unit: "" },
  { metric: "Operating temp. range", vals: ["−20 / +80°C", "−20 / +80°C", "−20 / +80°C"], unit: "" },
];

const PERF_COLS = ["RS-45 · Round-base", "RS-55 · Foam-filled", "RS-77 · High-insulation"];

const SPEC_SECTIONS = [
  {
    t: "Box & guide",
    rows: [
      ["Box type", "On-wall · in-wall · integrated lintel"],
      ["Box material", "Aluminium 6060-T66, powder coated"],
      ["Box dimensions (on-wall)", "Height 220–280 mm · depth 200 mm"],
      ["Guide rail width", "55 mm · 70 mm (heavy-duty)"],
      ["Guide rail material", "Extruded aluminium, zinc-coated"],
      ["Guide seals", "Twin brush + EPDM wiper"],
      ["Bottom rail", "Aluminium · rubber seal · optional lock"],
    ],
  },
  {
    t: "Slat data",
    rows: [
      ["RS-45 slat width", "45 mm · roll-formed steel"],
      ["RS-55 slat width", "55 mm · foam-injected aluminium"],
      ["RS-77 slat width", "77 mm · foam-injected aluminium"],
      ["End caps", "Pressed aluminium, UV-stable"],
      ["Axle diameter", "60 mm (std) · 80 mm (heavy)"],
      ["Surface finish", "Powder coat RAL · anodised option"],
      ["Recycled content", "≥ 50% aluminium"],
    ],
  },
  {
    t: "Drive & control",
    rows: [
      ["Motor (tubular)", "Somfy LT60 · Simu T5 Pro"],
      ["Motor (belt)", "Rademacher DuoFern belt drive"],
      ["Solar option", "Somfy Solar RS100 · 10W panel"],
      ["Manual override", "Octagonal crank, all motor types"],
      ["Control protocol", "RTS · io-homecontrol · KNX · BACnet"],
      ["Obstacle detection", "Force limit + encoder feedback"],
      ["Power consumption", "85–200 W operating · < 1 W standby"],
    ],
  },
  {
    t: "Compliance & documentation",
    rows: [
      ["CE marking", "EN 13241:2003+A2:2016"],
      ["Wind test", "EN 12210 · Class 4–6 by profile"],
      ["Fire performance", "B-s1,d0 (aluminium slats)"],
      ["Electrical safety", "IEC 60335-2-97"],
      ["EPD", "Available on request"],
      ["Warranty — structure", "10 years"],
      ["Warranty — motor", "5 years / 50,000 cycles"],
    ],
  },
];

const DOWNLOADS = [
  { t: "Declaration of Performance", ext: "PDF", sz: "344 KB" },
  { t: "Technical data sheet", ext: "PDF", sz: "1.6 MB" },
  { t: "CAD profiles — AutoCAD", ext: "DWG", sz: "4.8 MB" },
  { t: "BIM object — Revit", ext: "RFA", sz: "7.2 MB" },
  { t: "Installation manual", ext: "PDF", sz: "3.1 MB" },
  { t: "Motor wiring diagrams", ext: "PDF", sz: "880 KB" },
];

const RELATED = [
  { slug: "aw-72", id: "AW-72", t: "Aluminium Window System", u: "0.78 W/m²K" },
  { slug: "ed-120", id: "ED-120", t: "Entrance Door System", u: "RC3 · 0.66 Ud" },
  { slug: "sw-190", id: "SW-190", t: "Lift-slide System", u: "400 kg sash" },
];

function ProfileSection() {
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
          <pattern id="shutter-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          </pattern>
          <pattern id="foam-fill" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="rgba(160,140,100,0.4)" />
          </pattern>
          <pattern id="steel-skin" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--ink)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#shutter-grid)" />

        {/* Slat cross-section — RS-55 foam-filled */}
        <g transform="translate(60, 140)">
          {/* Outer aluminium skin (curved top) */}
          <path d="M0,10 Q140,0 280,10 L280,55 Q140,60 0,55 Z" fill="url(#steel-skin)" stroke="var(--ink)" strokeWidth="1.2" />
          {/* Inner skin */}
          <rect x="8" y="12" width="264" height="38" fill="url(#foam-fill)" stroke="none" />
          <rect x="0" y="10" width="280" height="4" fill="var(--ink)" opacity="0.15" />
          <rect x="0" y="51" width="280" height="4" fill="var(--ink)" opacity="0.15" />

          {/* End cap left */}
          <rect x="-8" y="6" width="12" height="52" rx="2" fill="var(--muted)" stroke="var(--ink)" strokeWidth="0.8" />
          {/* End cap right */}
          <rect x="276" y="6" width="12" height="52" rx="2" fill="var(--muted)" stroke="var(--ink)" strokeWidth="0.8" />

          {/* Pivot joint top */}
          <ellipse cx="140" cy="6" rx="12" ry="6" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1" />
          {/* Pivot joint bottom */}
          <ellipse cx="140" cy="58" rx="12" ry="6" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1" />
        </g>

        {/* Second slat below */}
        <g transform="translate(60, 204)">
          <path d="M0,10 Q140,0 280,10 L280,55 Q140,60 0,55 Z" fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
          <ellipse cx="140" cy="6" rx="12" ry="6" fill="none" stroke="var(--ink)" strokeWidth="0.8" opacity="0.4" />
        </g>

        {/* Width dimension */}
        <line x1="60" y1="110" x2="340" y2="110" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="60" y1="104" x2="60" y2="116" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="340" y1="104" x2="340" y2="116" stroke="var(--muted)" strokeWidth="0.5" />
        <text x="200" y="108" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">variable width (up to 5000mm)</text>

        {/* Height dimension for slat */}
        <line x1="356" y1="150" x2="356" y2="198" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="350" y1="150" x2="362" y2="150" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="350" y1="198" x2="362" y2="198" stroke="var(--muted)" strokeWidth="0.5" />
        <text x="378" y="177" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)" transform="rotate(90 378 177)">55mm</text>

        {/* Callout labels */}
        {[
          { x: 110, y: 130, n: "01", t: "Aluminium extrusion · 6060-T66" },
          { x: 200, y: 165, n: "02", t: "CFC-free foam insulation fill" },
          { x: 80, y: 170, n: "03", t: "Pivot interlocking joint" },
          { x: 200, y: 210, n: "04", t: "Adjacent slat · articulation" },
          { x: 60, y: 280, n: "05", t: "Pressed aluminium end cap" },
        ].map((c) => (
          <g key={c.n}>
            <circle cx={c.x} cy={c.y} r="8" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.8" />
            <text x={c.x} y={c.y + 3} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="8" fill="var(--ink)">{c.n}</text>
            <text x={c.x + 14} y={c.y + 3} fontFamily="var(--f-mono)" fontSize="8" fill="var(--muted)">{c.t}</text>
          </g>
        ))}

        <text x="60" y="490" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">RS-55 · SLAT CROSS-SECTION · SCALE 1:1</text>
      </svg>
    </div>
  );
}

function InstallationDiagram() {
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
          <pattern id="shutter-grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
          </pattern>
          <pattern id="wall-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--ink)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="500" fill="url(#shutter-grid2)" />

        {/* Wall left */}
        <rect x="20" y="20" width="50" height="440" fill="url(#wall-hatch)" stroke="var(--ink)" strokeWidth="1" />
        {/* Wall right */}
        <rect x="330" y="20" width="50" height="440" fill="url(#wall-hatch)" stroke="var(--ink)" strokeWidth="1" />

        {/* Lintel box */}
        <rect x="70" y="20" width="260" height="60" fill="var(--bg-2)" stroke="var(--ink)" strokeWidth="1.2" />
        <rect x="80" y="28" width="240" height="44" fill="var(--bg)" stroke="var(--ink)" strokeWidth="0.8" />
        {/* Axle in box */}
        <circle cx="200" cy="50" r="14" fill="none" stroke="var(--ink)" strokeWidth="1" />
        <circle cx="200" cy="50" r="4" fill="var(--ink)" />
        <text x="220" y="53" fontFamily="var(--f-mono)" fontSize="8" fill="var(--muted)">Motor + axle</text>

        {/* Guide rails */}
        <rect x="70" y="80" width="18" height="360" fill="var(--muted)" stroke="var(--ink)" strokeWidth="0.8" />
        <rect x="312" y="80" width="18" height="360" fill="var(--muted)" stroke="var(--ink)" strokeWidth="0.8" />
        {/* Rail brush seals */}
        <rect x="86" y="80" width="4" height="360" fill="none" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="2 2" />
        <rect x="310" y="80" width="4" height="360" fill="none" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="2 2" />

        {/* Slats — represented as horizontal lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x="88" y={84 + i * 30} width="224" height="24" fill={i % 2 === 0 ? "var(--bg)" : "var(--bg-2)"} stroke="var(--ink)" strokeWidth="0.6" />
        ))}

        {/* Bottom rail */}
        <rect x="70" y="380" width="260" height="16" fill="var(--ink)" stroke="var(--ink)" strokeWidth="1" />
        <rect x="74" y="394" width="252" height="8" fill="var(--muted)" stroke="var(--ink)" strokeWidth="0.5" />

        {/* Ground line */}
        <line x1="20" y1="460" x2="380" y2="460" stroke="var(--ink)" strokeWidth="2" />

        {/* Dimension: height */}
        <line x1="14" y1="80" x2="14" y2="402" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="8" y1="80" x2="20" y2="80" stroke="var(--muted)" strokeWidth="0.5" />
        <line x1="8" y1="402" x2="20" y2="402" stroke="var(--muted)" strokeWidth="0.5" />
        <text x="10" y="244" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="8" fill="var(--muted)" transform="rotate(-90 10 244)">max. 4000 mm</text>

        <text x="60" y="490" fontFamily="var(--f-mono)" fontSize="9" fill="var(--muted)">RS-45 · INSTALLATION SECTION · SCALE 1:10</text>
      </svg>
    </div>
  );
}

export function PdpShutterClient({ locale }: { locale: string }) {
  const { openQuote } = useQuoteModal();
  const [viewTab, setViewTab] = useState("profile");
  const [selectedSlat, setSelectedSlat] = useState("rs-55");
  const [selectedDrive, setSelectedDrive] = useState("tubular");
  const [selectedControl, setSelectedControl] = useState("somfy");
  const [selectedColour, setSelectedColour] = useState("anthracite");

  const currentSlat = SLATS.find((s) => s.k === selectedSlat)!;

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

              {viewTab === "profile" ? <ProfileSection />
                : viewTab === "installation" ? <InstallationDiagram />
                : <Placeholder aspect="4/5" label={TABS.find((t) => t.k === viewTab)!.l.toUpperCase()} caption={CAPTIONS[viewTab]} src={`https://picsum.photos/seed/rs45-${viewTab}/800/1000`} />}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", textTransform: "uppercase" }}>
                <span>{viewTab === "profile" ? `Slat · ${currentSlat.l} ${currentSlat.sub}` : "Installation · on-wall box"}</span>
                <span>Revision R.03</span>
              </div>
            </div>

            {/* Right: info */}
            <div style={{ paddingTop: 8 }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                <span className="num">RS-45</span>
                <span className="dot" />
                <span>Roller Shutter System</span>
              </div>

              <h1 style={{ fontSize: "clamp(44px, 5vw, 72px)", marginBottom: 24, textWrap: "balance" } as React.CSSProperties}>
                Motorised shutter,<br />wind class 6.
              </h1>

              <p style={{ fontSize: 19, color: "var(--ink-2)", marginBottom: 32, maxWidth: 480, lineHeight: 1.5 }}>
                Three slat profiles, one system. From round-base steel to foam-injected high-insulation aluminium,
                the RS-45 family covers light screening through to full thermal blackout — with Somfy or KNX automation built in.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)", border: "1px solid var(--line)", marginBottom: 32 }}>
                {[
                  { k: "Wind class", v: "6", u: "EN 13241" },
                  { k: "Thermal Ud", v: "0.65", u: "W/m²K (RS-77)" },
                  { k: "Light block", v: "99%", u: "closed" },
                  { k: "Acoustic", v: "40", u: "dB (Rw)" },
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
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Motor system</div>
                  <div style={{ fontSize: 20, fontWeight: 500 }}>Somfy · Rademacher</div>
                  <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>RTS · io-homecontrol · KNX</div>
                </div>
                <div style={{ borderLeft: "1px solid var(--line-2)", paddingLeft: 24 }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Lead time</div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>14–18 days</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={openQuote}>Configure & quote <Arrow /></button>
                <a href="#" className="btn btn-ghost">Download BIM <Arrow /></a>
              </div>

              <div style={{ marginTop: 32, display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                <span>✓ CE marked</span>
                <span>✓ EN 13241</span>
                <span>✓ Wind class 6</span>
                <span>✓ Somfy certified</span>
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
            subtitle="Base configuration shown. Full options — box type, guide width, custom dimensions, controls integration — available in the quote flow."
            rightSlot={
              <button className="btn btn-primary btn-sm" onClick={openQuote} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                Continue in quote flow <Arrow size={12} />
              </button>
            }
          />

          {/* Slat profile */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 01</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Slat profile</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {SLATS.map((s, i) => (
                <button key={s.k} onClick={() => setSelectedSlat(s.k)}
                  style={{
                    padding: "24px 20px", borderRight: i < SLATS.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedSlat === s.k ? "var(--ink)" : "var(--bg)",
                    color: selectedSlat === s.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer", transition: "all .15s",
                  }}>
                  <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>{s.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 400, marginBottom: 6 }}>{s.sub}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7 }}>Ud {s.ud} W/m²K</div>
                </button>
              ))}
            </div>
          </div>

          {/* Drive */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 02</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Drive type</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {DRIVES.map((d, i) => (
                <button key={d.k} onClick={() => setSelectedDrive(d.k)}
                  style={{
                    padding: 20, borderRight: i < DRIVES.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedDrive === d.k ? "var(--ink)" : "var(--bg)",
                    color: selectedDrive === d.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer",
                  }}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{d.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 6 }}>{d.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Control */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", borderBottom: "1px solid var(--line-2)", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 03</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Control</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {CONTROLS.map((c, i) => (
                <button key={c.k} onClick={() => setSelectedControl(c.k)}
                  style={{
                    padding: 20, borderRight: i < CONTROLS.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedControl === c.k ? "var(--ink)" : "var(--bg)",
                    color: selectedControl === c.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", cursor: "pointer",
                  }}>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{c.l}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, opacity: 0.7, marginTop: 6 }}>{c.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, padding: "32px 0", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6 }}>STEP 04</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Colour</div>
            </div>
            <div className="mob-3col" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
              {COLOURS.map((c, i) => (
                <button key={c.k} onClick={() => setSelectedColour(c.k)}
                  style={{
                    padding: 16, borderRight: i < COLOURS.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: selectedColour === c.k ? "var(--ink)" : "var(--bg)",
                    color: selectedColour === c.k ? "var(--bg)" : "var(--ink)",
                    textAlign: "left", display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                  }}>
                  <div style={{
                    width: 24, height: 24, flexShrink: 0,
                    background: c.sw.startsWith("linear") ? c.sw : c.sw,
                    border: "1px solid rgba(0,0,0,0.15)",
                  }} />
                  <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.2 }}>{c.l}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            + 18 RAL standard colours available
          </div>
        </div>
      </section>

      {/* Performance Matrix */}
      <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
        <div className="container">
          <SectionHeader
            index="03"
            eyebrow="Performance"
            title="Three profiles, one system."
            subtitle="All values certified to EN 13241. Wind resistance class increases with slat depth. Select the profile that matches your façade exposure zone."
          />
          <div style={{ border: "1px solid var(--line-2)", overflowX: "auto" }}>
            <div style={{ minWidth: 540 }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3, 1fr)", background: "var(--ink)", color: "var(--bg)" }}>
                <div style={{ padding: "16px 20px", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Metric</div>
                {PERF_COLS.map((c) => (
                  <div key={c} style={{ padding: "16px 20px", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", borderLeft: "1px solid rgba(255,255,255,0.15)" }}>{c}</div>
                ))}
              </div>
              {PERF_DATA.map((d, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr repeat(3, 1fr)", borderTop: i > 0 ? "1px solid var(--line)" : "none", background: i % 2 === 0 ? "var(--bg)" : "var(--bg-2)" }}>
                  <div style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{d.metric}</span>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)" }}>{d.unit}</span>
                  </div>
                  {d.vals.map((v, j) => (
                    <div key={j} style={{ padding: 20, fontFamily: "var(--f-mono)", fontSize: 15, fontWeight: 500, borderLeft: "1px solid var(--line)", background: j === 2 ? "color-mix(in oklab, var(--accent) 8%, transparent)" : "transparent" }}>
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
                Foam-filled.<br />Wind-rated.
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, marginBottom: 40, maxWidth: 480 }}>
                The RS-55 slat extrudes 6060-T66 aluminium around a CFC-free foam core, then pivots at interlocking joints
                to form a curtain that stacks cleanly into the lintel box. Twin brush seals in the guide rails eliminate
                lateral air infiltration without increasing operating force.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {[
                  { n: "01", t: "Aluminium 6060-T66 extrusion", d: "Powder coated · 213 RAL" },
                  { n: "02", t: "CFC-free foam core", d: "Ud 0.82 W/m²K · RS-55" },
                  { n: "03", t: "Pivot interlocking joint", d: "Full articulation · no gaps" },
                  { n: "04", t: "Twin-brush guide seal", d: "Air class 4 · EN 12207" },
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
              <ProfileSection />
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
            subtitle="Complete technical data for the RS-45 system family. For structural and wind load calculations, download the DOP or contact engineering."
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
