// Home page — product-first, grid-driven
function Home({ setPage, onQuote }) {
  return (
    <main>
      <Hero onQuote={onQuote} setPage={setPage} />
      <ValueStrip />
      <Systems setPage={setPage} />
      <Manufacturing />
      <Materials />
      <Projects />
      <Trust />
      <CtaBand onQuote={onQuote} />
    </main>
  );
}

/* ---------- HERO ---------- */
function Hero({ onQuote, setPage }) {
  return (
    <section style={{ position: "relative", borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
        {/* top meta strip */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 56 }}>
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

        {/* headline */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 40, marginBottom: 56 }}>
          <h1 style={{ textWrap: "balance" }}>
            Precision openings<br />
            for European building.
          </h1>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }} className="hide-sm">
            <div className="chip live">● IN PRODUCTION</div>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", textAlign: "right" }}>
              Current lead time<br />
              <span style={{ color: "var(--ink)", fontSize: 20, fontWeight: 500, letterSpacing: 0 }}>18–22 days</span>
            </div>
          </div>
        </div>

        {/* sub + CTAs */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "end", paddingBottom: 48 }}>
          <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 540, lineHeight: 1.45, textWrap: "pretty" }}>
            Custom-engineered windows, doors, and shutters.
            Manufactured in Kosovo. Delivered across the EU with the
            specification discipline architects expect.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onQuote}>
              Request a quote <Arrow />
            </button>
            <button className="btn btn-ghost" onClick={() => setPage("pdp")}>
              Explore systems <Arrow />
            </button>
          </div>
        </div>
      </div>

      {/* big hero image — full bleed */}
      <div style={{ position: "relative" }}>
        <Placeholder
          aspect="21/9"
          src={IMGS.hero_glass}
          label="HERO · 01"
          style={{ aspectRatio: "21/9" }}
        >
          {/* Overlay window frames for concept */}
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", pointerEvents: "none" }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none" }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: 24, bottom: 36, display: "flex", gap: 32, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <span>↳ Drop:</span>
            <span>photograph of completed facade<br />— modern apt. tower, raking light</span>
          </div>
        </Placeholder>

        {/* metric overlay */}
        <div style={{
          position: "absolute", right: "var(--pad-x)", bottom: -1,
          background: "var(--bg)", borderTop: "1px solid var(--line)", borderLeft: "1px solid var(--line)",
          padding: "20px 28px",
          display: "flex", gap: 40,
        }} className="hide-sm">
          {[
            { k: "Units shipped / 2025", v: "42,810" },
            { k: "Countries served", v: "19" },
            { k: "Avg. U-value", v: "0.78 W/m²K" },
          ].map((m) => (
            <div key={m.k} style={{ minWidth: 140 }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>{m.k}</div>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- VALUE STRIP ---------- */
function ValueStrip() {
  const items = [
    { n: "01", t: "Made-to-order", d: "Every opening engineered to spec. No catalog inventory." },
    { n: "02", t: "German profile systems", d: "Built on aluplast and Salamander extrusions — engineered in Germany." },
    { n: "03", t: "Fulfillment discipline", d: "Quoted lead time held at 96.2% on-time last year." },
    { n: "04", t: "Export-ready", d: "CE-marked, EN 14351 compliant, shipped palletized." },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ padding: "72px var(--pad-x)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {items.map((it, i) => (
            <div key={it.n} style={{ padding: "8px 32px 8px 0", borderRight: i < items.length - 1 ? "1px solid var(--line)" : "none", paddingLeft: i === 0 ? 0 : 32 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.14em" }}>{it.n}</span>
                <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
              </div>
              <h4 style={{ fontSize: 22, fontWeight: 500, marginBottom: 12, letterSpacing: "-0.02em" }}>{it.t}</h4>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SYSTEMS ---------- */
function Systems({ setPage }) {
  const sysImgs = [IMGS.facade_geometric, IMGS.arch_b, IMGS.arch_c, IMGS.facade_brick, IMGS.arch_d, IMGS.facade_contrast];
  const systems = [
    { id: "AW-72", name: "Aluminium Windows", tag: "AW-72", specs: "Uw 0.78 · Rw 44dB · RC2", stock: "14 openings · 5 finishes", img: "facade_detail_A.jpg" },
    { id: "PW-88", name: "Thermal PVC Windows", tag: "PW-88", specs: "Uw 0.74 · Rw 42dB · RC2", stock: "12 openings · 34 colors", img: "profile_cross_section.jpg" },
    { id: "ED-120", name: "Entrance Doors", tag: "ED-120", specs: "Ud 0.66 · RC3 · fingerprint", stock: "9 panels · bespoke sizing", img: "door_entrance_04.jpg" },
    { id: "RS-45", name: "Roller Shutters", tag: "RS-45", specs: "Motorised · wind class 6", stock: "5 profiles · 18 colors", img: "shutter_slat.jpg" },
    { id: "SW-190", name: "Sliding Systems", tag: "SW-190", specs: "Lift-slide · 400kg sash", stock: "min. threshold 20mm", img: "sliding_door_study.jpg" },
    { id: "CW-60", name: "Curtain Walls", tag: "CW-60", specs: "Mullion-transom · structural", stock: "up to 3.6m spans", img: "curtain_facade.jpg" },
  ];

  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Systems"
          title="Six product families. One manufacturing standard."
          subtitle="Every system is made-to-order from extruded profiles, laminated glass, and European-sourced hardware. Configure dimensions, opening type, glazing, and finish at quote."
          rightSlot={
            <button className="btn btn-ghost btn-sm" onClick={() => setPage("pdp")}>
              Technical library <Arrow size={12} />
            </button>
          }
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {systems.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setPage("pdp")}
              className="prod-card"
              style={{ textAlign: "left", padding: 0, display: "block" }}
            >
              <Placeholder
                aspect="4/5"
                src={sysImgs[i]}
                label={s.tag}
              />
              <div style={{ padding: "20px 0 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.14em", marginBottom: 6, textTransform: "uppercase" }}>{s.tag} · System</div>
                  <h4 style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>{s.name}</h4>
                  <div style={{ fontSize: 13, color: "var(--ink-2)", fontFamily: "var(--f-mono)", letterSpacing: "0.02em" }}>{s.specs}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{s.stock}</div>
                </div>
                <div style={{ paddingTop: 4 }}><Arrow /></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- MANUFACTURING ---------- */
function Manufacturing() {
  const steps = [
    { n: "01", t: "Specification", d: "CAD review, structural calc, thermal model. We sign the drawings back to you." },
    { n: "02", t: "Extrusion & cut", d: "Aluminium and PVC profiles cut to the millimetre on CNC saws." },
    { n: "03", t: "Glazing assembly", d: "IGUs laminated in Class 10,000 clean lines. Argon-filled, warm-edge spacer." },
    { n: "04", t: "QC & dispatch", d: "Every unit water-tested to 600 Pa before palletising for EU dispatch." },
  ];
  return (
    <section style={{ background: "var(--ink)", color: "var(--bg)", position: "relative" }}>
      <div className="container" style={{ padding: "120px var(--pad-x)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start", marginBottom: 80 }}>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
              <span className="num" style={{ color: "rgba(255,255,255,0.55)" }}>03</span>
              <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%" }} />
              <span>Manufacturing</span>
            </div>
            <h2 style={{ color: "var(--bg)", textWrap: "balance" }}>
              14,200 m² of plant.<br />
              One continuous line.
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", textWrap: "pretty", maxWidth: 540 }}>
            Our Ferizaj facility runs a single integrated production line — from profile extrusion through glazing and QC — so scheduling is tight, tolerances are consistent, and transport
            loads ship complete. The advantage of in-house control, at export pricing.
          </p>
        </div>

        <div style={{ position: "relative", marginBottom: 80 }}>
          <Placeholder
            aspect="21/8"
            src={IMGS.plant_wide}
            label="PLANT · A2"
            style={{ filter: "saturate(0) brightness(0.85)" }}
          />
          <div style={{ position: "absolute", left: 24, top: 24, display: "flex", flexDirection: "column", gap: 4, background: "rgba(18,18,16,0.8)", padding: "12px 16px", border: "1px solid rgba(255,255,255,0.15)", color: "var(--bg)", fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <span>LIVE · OPERATIONAL</span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>Shift A · 06:00–14:00 CET</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ padding: "32px 24px 32px 0", borderTop: "1px solid rgba(255,255,255,0.15)", paddingLeft: i === 0 ? 0 : 24, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", marginBottom: 20 }}>STAGE {s.n}</div>
              <h4 style={{ fontSize: 22, fontWeight: 500, color: "var(--bg)", marginBottom: 12 }}>{s.t}</h4>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- MATERIALS ---------- */
function Materials() {
  const mats = [
    { t: "Aluminium", sub: "6060-T66 · thermal break", swatch: "linear-gradient(180deg,#BFBFB8,#8F8F88)" },
    { t: "PVC", sub: "Multi-chamber · class A", swatch: "linear-gradient(180deg,#F0EDE5,#C7C2B4)" },
    { t: "Oak veneer", sub: "FSC · satin oil", swatch: "linear-gradient(180deg,#A88559,#5C4225)" },
    { t: "Steel core", sub: "Security doors · RC3", swatch: "linear-gradient(180deg,#2E2E2E,#141414)" },
    { t: "Laminated IGU", sub: "4-16Ar-4 · low-E", swatch: "linear-gradient(180deg,rgba(200,220,230,0.9),rgba(120,150,170,0.9))" },
    { t: "RAL custom", sub: "213 colors · matte/gloss", swatch: "linear-gradient(90deg,#C9A86A,#8A7A5C,#2B2E2A,#141414)" },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ padding: "120px var(--pad-x)" }}>
        <SectionHeader
          index="04"
          eyebrow="Materials"
          title="Six substrates. Fully traceable."
          subtitle="Every material is specified by lot and certified on delivery. Request a sample kit to see the finish in person."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {mats.map((m, i) => (
            <div key={i}>
              <div style={{ aspectRatio: "3/4", background: m.swatch, border: "1px solid var(--line-2)", marginBottom: 16, position: "relative" }}>
                <div style={{ position: "absolute", top: 8, left: 8, fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)", mixBlendMode: "difference" }}>M·0{i + 1}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 2 }}>{m.t}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--f-mono)", letterSpacing: "0.04em" }}>{m.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "flex-end" }}>
          <a href="#" className="ulink" style={{ fontSize: 13, fontFamily: "var(--f-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Order sample kit <Arrow size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */
function Projects() {
  const projects = [
    { name: "Atrium Residence", loc: "Vienna, AT", yr: "2025", sys: "AW-72 · CW-60", scale: "214 openings" },
    { name: "Block 14 — Mitte", loc: "Berlin, DE", yr: "2024", sys: "PW-88 · RS-45", scale: "98 openings" },
    { name: "Hotel Karst", loc: "Ljubljana, SI", yr: "2025", sys: "SW-190 · ED-120", scale: "46 openings" },
    { name: "Villa Gornji", loc: "Dubrovnik, HR", yr: "2024", sys: "AW-72 · SW-190", scale: "34 openings" },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Projects"
          title="Recent installations."
          subtitle="Selected deliveries from 2024–25. Case studies available on request with full BOQ and thermal performance data."
          rightSlot={<button className="btn btn-ghost btn-sm">View all projects <Arrow size={12} /></button>}
        />

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32, marginBottom: 32 }}>
          <div>
            <Placeholder aspect="4/3" src={IMGS.facade_geometric} label={projects[0].name.toUpperCase()} />
            <ProjectMeta p={projects[0]} big />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <Placeholder aspect="4/3" src={IMGS.facade_contrast} label={projects[1].name.toUpperCase()} />
              <ProjectMeta p={projects[1]} />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {projects.slice(2).map((p, i) => (
            <div key={i}>
              <Placeholder aspect="16/10" src={[IMGS.facade_brick, IMGS.facade_metallic][i]} label={p.name.toUpperCase()} />
              <ProjectMeta p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMeta({ p, big }) {
  return (
    <div style={{ padding: "20px 0 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <div>
        <h4 style={{ fontSize: big ? 28 : 20, fontWeight: 500, marginBottom: 8 }}>{p.name}</h4>
        <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {p.loc} · {p.yr} · {p.sys}
        </div>
      </div>
      <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--ink-2)", textAlign: "right" }}>
        {p.scale}
      </div>
    </div>
  );
}

/* ---------- TRUST ---------- */
function Trust() {
  const certs = ["aluplast", "Salamander", "CE · EN 14351-1", "ISO 9001", "ISO 14001", "IFT Rosenheim", "PassivHaus", "RC2 / RC3", "QUALANOD", "Roto · Maco"];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "64px 0", overflow: "hidden" }}>
      <div className="container" style={{ marginBottom: 32 }}>
        <div className="eyebrow"><span className="num">06</span><span className="dot" /><span>Certifications & partners</span></div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="marquee">
          {[...certs, ...certs, ...certs].map((c, i) => (
            <div key={i} className="marquee-item">
              <span style={{ width: 8, height: 8, border: "1px solid var(--line-2)", transform: "rotate(45deg)" }} />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA BAND ---------- */
function CtaBand({ onQuote }) {
  return (
    <section style={{ padding: "120px 0", position: "relative" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "end" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="num">07</span><span className="dot" /><span>Start a project</span>
            </div>
            <h2 style={{ textWrap: "balance", maxWidth: 900 }}>
              Bring the drawings.<br />
              We'll return a costed bill of quantities in 72 hours.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
            <button className="btn btn-primary" onClick={onQuote} style={{ padding: "18px 28px", fontSize: 15 }}>
              Request a quote <Arrow />
            </button>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Or call + 383 44 271 008
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Home });
