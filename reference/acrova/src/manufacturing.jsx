// Manufacturing page — plant, process, QC, logistics
function ManufacturingPage({ setPage, onQuote }) {
  return (
    <main>
      <MfgHero />
      <PlantStats />
      <LineDiagram />
      <ProcessDeep />
      <QualityControl />
      <Logistics />
      <CtaMfg onQuote={onQuote} setPage={setPage} />
    </main>
  );
}

function MfgHero() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ padding: "64px var(--pad-x) 0" }}>
        <div className="eyebrow" style={{ marginBottom: 48 }}>
          <span className="num">01 / MANUFACTURING</span>
          <span className="dot" />
          <span>Plant A · Ferizaj, Kosovo</span>
        </div>
        <h1 style={{ textWrap: "balance", marginBottom: 40, maxWidth: 1100 }}>
          One line, one roof,
          <br />
          one QC pass.
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 64,
            paddingBottom: 56,
          }}
        >
          <p
            style={{
              fontSize: 20,
              color: "var(--ink-2)",
              lineHeight: 1.45,
              textWrap: "pretty",
            }}
          >
            Every Arcova opening is cut, welded, glazed, gasketed and QC-tested
            in the same building. Profiles come from <strong>aluplast</strong>{" "}
            and <strong>Salamander</strong>. Glass and hardware from authorised
            European suppliers. Nothing is outsourced.
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
            The facility is a single integrated line: raw profile in at the west
            dock, pallet-loaded openings out at the east dock. Lead time is a
            function of queue position — not coordination. That's the whole
            trick.
          </p>
        </div>
      </div>
      <Placeholder aspect="21/8" src={IMGS.plant_wide} label="PLANT · A">
        <div
          style={{
            position: "absolute",
            left: 24,
            bottom: 24,
            display: "flex",
            gap: 24,
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              background: "var(--bg)",
              padding: "6px 10px",
              border: "1px solid var(--line-2)",
            }}
          >
            42.3706°N 21.1551°E
          </span>
          <span
            style={{
              background: "var(--bg)",
              padding: "6px 10px",
              border: "1px solid var(--line-2)",
            }}
          >
            14,200 m² · 1 building
          </span>
        </div>
      </Placeholder>
    </section>
  );
}

function PlantStats() {
  const s = [
    { v: "14,200", u: "m²", k: "Plant footprint" },
    { v: "138", u: "", k: "Employees · 2 shifts" },
    { v: "2", u: "", k: "CNC cutting lines" },
    { v: "2", u: "", k: "Glazing lines" },
    { v: "600", u: "Pa", k: "Water-test pressure" },
    { v: "96.2", u: "%", k: "On-time delivery · 2025" },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ padding: "72px var(--pad-x)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 0,
          }}
        >
          {s.map((x, i) => (
            <div
              key={i}
              style={{
                padding: "0 24px 0 0",
                borderLeft: i > 0 ? "1px solid var(--line)" : "none",
                paddingLeft: i > 0 ? 24 : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {x.k}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span
                  style={{
                    fontSize: 44,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {x.v}
                </span>
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 14,
                    color: "var(--muted)",
                  }}
                >
                  {x.u}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LineDiagram() {
  const stations = [
    {
      n: "01",
      t: "Raw profile in",
      sub: "aluplast · Salamander · Alu extrusion",
      side: "WEST",
    },
    { n: "02", t: "Cut", sub: "Elumatec dbl-head saw · ±0.3mm" },
    { n: "03", t: "Weld / crimp", sub: "4-point CNC weld · corner crimp" },
    { n: "04", t: "Reinforce", sub: "Galvanised steel · self-tapping screws" },
    { n: "05", t: "Gasket", sub: "EPDM co-extrusion · continuous" },
    { n: "06", t: "Hardware fit", sub: "Roto NX · Maco MM · torque spec" },
    { n: "07", t: "Glazing", sub: "Argon-filled IGU · warm-edge spacer" },
    { n: "08", t: "Water test", sub: "600 Pa · every unit · 30 sec" },
    {
      n: "09",
      t: "Pack & label",
      sub: "Pallet · foam corner · dispatch",
      side: "EAST",
    },
  ];
  return (
    <section
      style={{
        borderBottom: "1px solid var(--line)",
        background: "var(--ink)",
        color: "var(--bg)",
        padding: "120px 0",
      }}
    >
      <div className="container">
        <div
          className="eyebrow"
          style={{ color: "rgba(255,255,255,0.55)", marginBottom: 24 }}
        >
          <span className="num" style={{ color: "rgba(255,255,255,0.55)" }}>
            02
          </span>
          <span
            style={{
              width: 6,
              height: 6,
              background: "var(--accent)",
              borderRadius: "50%",
            }}
          />
          <span>The line · west to east</span>
        </div>
        <h2
          style={{
            color: "var(--bg)",
            textWrap: "balance",
            marginBottom: 80,
            maxWidth: 900,
          }}
        >
          Nine stations.
          <br />
          One continuous flow.
        </h2>

        {/* Flow diagram */}
        <div
          style={{ position: "relative", marginBottom: 48, padding: "0 40px" }}
        >
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 40,
              right: 40,
              height: 1,
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${stations.length}, 1fr)`,
              gap: 0,
            }}
          >
            {stations.map((s, i) => (
              <div
                key={s.n}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "var(--ink)",
                    border:
                      "1px solid " +
                      (i === 0 || i === stations.length - 1
                        ? "var(--accent)"
                        : "rgba(255,255,255,0.5)"),
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--f-mono)",
                    fontSize: 13,
                    color: "var(--bg)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {s.n}
                </div>
                {s.side && (
                  <div
                    style={{
                      position: "absolute",
                      top: -24,
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--accent)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    ↓ {s.side} DOCK
                  </div>
                )}
                <div style={{ textAlign: "center", padding: "0 6px" }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--bg)",
                      marginBottom: 6,
                      lineHeight: 1.2,
                    }}
                  >
                    {s.t}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <span>Average dwell · 4h 20m from cut to dispatch</span>
          <span>Station 01 → 09 · west-to-east · single axis</span>
        </div>
      </div>
    </section>
  );
}

function ProcessDeep() {
  const blocks = [
    {
      n: "A",
      t: "Cutting & welding",
      d: "Profiles are barcoded on arrival and queued to CNC saws. Every cut logs timestamp, operator, and machine — a traceability chain from extrusion lot to installed window.",
      bullets: [
        "Elumatec SBZ 628 CNC",
        "±0.3 mm tolerance",
        "Corner welds: 4-point simultaneous",
        "Cleanup: CNC corner-cleaner · not manual",
      ],
      img: "cutting_station.jpg",
    },
    {
      n: "B",
      t: "Glazing assembly",
      d: "IGUs are assembled in a filtered clean-line at 20°C ± 2°. Low-E coating is inspected under raking light before the unit is sealed. Argon concentration is logged per batch.",
      bullets: [
        "Warm-edge spacer: Swisspacer Ultimate",
        "Argon fill: ≥ 90% measured",
        "Secondary seal: polysulfide",
        "Low-E glass: Guardian ClimaGuard",
      ],
      img: "glazing_cleanline.jpg",
    },
    {
      n: "C",
      t: "Hardware & sealing",
      d: "Roto NX and Maco MM hardware are torque-specified. Every hinge, handle and locking mushroom is set on a calibrated bit — because a window is only weather-tight when the sash closes square.",
      bullets: [
        "Torque verified per screw · logged",
        "EPDM gaskets · continuous, co-extruded",
        "No brush seals in primary chamber",
        "Hardware traceable to lot number",
      ],
      img: "hardware_assembly.jpg",
    },
  ];
  return (
    <section
      style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}
    >
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Process · deep dive"
          title="Three things we do differently."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
          {blocks.map((b, i) => (
            <div
              key={b.n}
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
                gap: 64,
                alignItems: "center",
              }}
            >
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <Placeholder
                  aspect="4/3"
                  src={[IMGS.plant_cnc, IMGS.plant_weld, IMGS.plant_glass][i]}
                  label={`PROC · ${b.n}`}
                />
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 48,
                    fontWeight: 500,
                    color: "var(--accent)",
                    marginBottom: 20,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {b.n}
                </div>
                <h3 style={{ fontSize: 36, marginBottom: 20 }}>{b.t}</h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 16,
                    lineHeight: 1.6,
                    marginBottom: 28,
                    maxWidth: 480,
                  }}
                >
                  {b.d}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {b.bullets.map((x) => (
                    <li
                      key={x}
                      style={{
                        display: "flex",
                        gap: 12,
                        fontSize: 14,
                        fontFamily: "var(--f-mono)",
                        letterSpacing: "0.02em",
                        borderBottom: "1px solid var(--line)",
                        paddingBottom: 10,
                      }}
                    >
                      <span style={{ color: "var(--accent)" }}>→</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualityControl() {
  const checks = [
    {
      n: "T1",
      t: "Dimensional",
      d: "Every sash measured in 4 axes. Out-of-tolerance → scrap.",
    },
    {
      n: "T2",
      t: "Corner squareness",
      d: "Diagonal differential ≤ 2 mm. Logged per unit.",
    },
    {
      n: "T3",
      t: "Water penetration",
      d: "Sprayed at 600 Pa for 30 seconds · no leak permitted.",
    },
    {
      n: "T4",
      t: "Air infiltration",
      d: "Class 4 per EN 12207 at 600 Pa pressure differential.",
    },
    {
      n: "T5",
      t: "Operation",
      d: "Handle tested 20× across tilt, turn, close.",
    },
    {
      n: "T6",
      t: "Visual",
      d: "Profile, gasket, IGU inspected under 5000 K raking light.",
    },
    {
      n: "T7",
      t: "Hardware torque",
      d: "Random 1-in-10 audit on torque logs.",
    },
    {
      n: "T8",
      t: "Package integrity",
      d: "Corner foam, pallet strap tension, labeling.",
    },
  ];
  return (
    <section
      style={{
        borderBottom: "1px solid var(--line)",
        background: "var(--bg-2)",
        padding: "120px 0",
      }}
    >
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Quality control"
          title="Eight tests. Every unit."
          subtitle="A unit is not cleared for dispatch until it passes T1 through T8. Results are logged against the project code and stored for ten years."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            border: "1px solid var(--line-2)",
            background: "var(--bg)",
          }}
        >
          {checks.map((c, i) => (
            <div
              key={c.n}
              style={{
                padding: "28px 24px",
                borderRight:
                  (i + 1) % 4 !== 0 ? "1px solid var(--line-2)" : "none",
                borderBottom: i < 4 ? "1px solid var(--line-2)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 14,
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                {c.n}
              </div>
              <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
                {c.t}
              </div>
              <div
                style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}
              >
                {c.d}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            padding: "24px 28px",
            border: "1px solid var(--line-2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--f-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
            background: "var(--bg)",
          }}
        >
          <span>Sampling rate · 100% for T1–T6 · Audit 10% for T7–T8</span>
          <span>Records retained · 10 years</span>
          <span>Auditor · IFT Rosenheim 0757</span>
        </div>
      </div>
    </section>
  );
}

function Logistics() {
  const zones = [
    {
      z: "Z1",
      t: "Kosovo · Albania · N. Macedonia",
      d: "3–5 days",
      mode: "Own fleet",
    },
    {
      z: "Z2",
      t: "Slovenia · Croatia · Serbia · Bosnia",
      d: "4–6 days",
      mode: "Own + partner fleet",
    },
    {
      z: "Z3",
      t: "Austria · Italy · Hungary",
      d: "5–7 days",
      mode: "Partner fleet",
    },
    {
      z: "Z4",
      t: "Germany · Switzerland · France",
      d: "6–9 days",
      mode: "Partner fleet",
    },
    {
      z: "Z5",
      t: "Benelux · Scandinavia · UK",
      d: "8–12 days",
      mode: "Partner fleet + ferry",
    },
  ];
  return (
    <section
      style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}
    >
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Logistics"
          title="Palletised. Documented. On-time."
          subtitle="Openings ship on heat-treated pallets with foam-corner protection. Every pallet carries a QR-linked packing list, installation sequence, and photo record."
        />
        <div style={{ border: "1px solid var(--line-2)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1.5fr 1fr 1fr",
              background: "var(--ink)",
              color: "var(--bg)",
              padding: "16px 20px",
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span>Zone</span>
            <span>Destination</span>
            <span>Transit</span>
            <span>Mode</span>
          </div>
          {zones.map((z, i) => (
            <div
              key={z.z}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1.5fr 1fr 1fr",
                padding: "20px",
                borderTop: "1px solid var(--line)",
                alignItems: "center",
                background: i % 2 === 0 ? "var(--bg)" : "var(--bg-2)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontWeight: 500,
                  color: "var(--accent)",
                }}
              >
                {z.z}
              </span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{z.t}</span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 14 }}>
                {z.d}
              </span>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                {z.mode}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaMfg({ onQuote, setPage }) {
  return (
    <section style={{ padding: "120px 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 48,
            alignItems: "end",
          }}
        >
          <h2 style={{ textWrap: "balance", maxWidth: 900 }}>
            Come see it run.
            <br />
            We'll walk you station to station.
          </h2>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-primary" onClick={onQuote}>
              Book a plant tour <Arrow />
            </button>
            <button className="btn btn-ghost" onClick={() => setPage("about")}>
              Read about us <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ManufacturingPage });
