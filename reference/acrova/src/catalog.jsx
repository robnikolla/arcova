// Product Catalog page — filterable grid of all systems
function Catalog({ setPage, onQuote }) {
  const [activeFamily, setActiveFamily] = useState("all");
  const [activeProfile, setActiveProfile] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [view, setView] = useState("grid"); // grid | table

  const allImgs = [IMGS.facade_geometric, IMGS.facade_metallic, IMGS.arch_b, IMGS.arch_a, IMGS.arch_c, IMGS.facade_brick, IMGS.arch_d, IMGS.arch_e, IMGS.facade_contrast, IMGS.arch_f, IMGS.arch_g, IMGS.arch_h];
  const products = [
    { id: "AW-72", name: "Aluminium Window 72", family: "windows", profile: "alu", tag: "Standard", uw: 0.78, rw: 44, rc: "RC2", systems: ["aluplast", "alu 6060"], new: false },
    { id: "AW-85", name: "Aluminium Window 85", family: "windows", profile: "alu", tag: "Passivhaus", uw: 0.68, rw: 46, rc: "RC2", systems: ["alu 6060-T66"], new: true },
    { id: "PW-76", name: "PVC Window 76 · aluplast", family: "windows", profile: "pvc", tag: "Standard", uw: 0.82, rw: 42, rc: "RC2", systems: ["aluplast IDEAL 4000"], new: false },
    { id: "PW-88", name: "PVC Window 88 · aluplast", family: "windows", profile: "pvc", tag: "Premium", uw: 0.74, rw: 44, rc: "RC2", systems: ["aluplast IDEAL 8000"], new: false },
    { id: "PW-70S", name: "PVC Window 70 · Salamander", family: "windows", profile: "pvc", tag: "Standard", uw: 0.84, rw: 41, rc: "RC2", systems: ["Salamander streamline 76"], new: false },
    { id: "PW-92S", name: "PVC Window 92 · Salamander", family: "windows", profile: "pvc", tag: "Premium", uw: 0.72, rw: 45, rc: "RC3", systems: ["Salamander bluEvolution 92"], new: true },
    { id: "ED-120", name: "Entrance Door 120", family: "doors", profile: "alu", tag: "Security", uw: 0.66, rw: 42, rc: "RC3", systems: ["alu 6060"], new: false },
    { id: "ED-PVC", name: "PVC Entrance Door", family: "doors", profile: "pvc", tag: "Standard", uw: 0.71, rw: 40, rc: "RC2", systems: ["aluplast IDEAL 8000"], new: false },
    { id: "SW-190", name: "Lift-Slide System 190", family: "sliding", profile: "alu", tag: "Large format", uw: 0.88, rw: 38, rc: "RC2", systems: ["alu 6060"], new: false },
    { id: "SW-PVC", name: "PVC Slide-Fold System", family: "sliding", profile: "pvc", tag: "Residential", uw: 0.90, rw: 37, rc: "RC1", systems: ["aluplast"], new: false },
    { id: "RS-45", name: "Roller Shutter 45", family: "shutters", profile: "alu", tag: "Motorised", uw: null, rw: 32, rc: null, systems: ["Aluminium slat 45"], new: false },
    { id: "CW-60", name: "Curtain Wall CW-60", family: "curtain", profile: "alu", tag: "Structural", uw: 1.1, rw: 40, rc: null, systems: ["Mullion-transom 60mm"], new: false },
  ].map((p, i) => ({ ...p, img: allImgs[i] }));

  const families = [
    { k: "all", l: "All systems", count: products.length },
    { k: "windows", l: "Windows", count: products.filter(p => p.family === "windows").length },
    { k: "doors", l: "Doors", count: products.filter(p => p.family === "doors").length },
    { k: "sliding", l: "Sliding", count: products.filter(p => p.family === "sliding").length },
    { k: "shutters", l: "Shutters", count: products.filter(p => p.family === "shutters").length },
    { k: "curtain", l: "Curtain walls", count: products.filter(p => p.family === "curtain").length },
  ];

  const profiles = [
    { k: "all", l: "All profiles" },
    { k: "pvc", l: "PVC" },
    { k: "alu", l: "Aluminium" },
  ];

  let filtered = products
    .filter(p => activeFamily === "all" || p.family === activeFamily)
    .filter(p => activeProfile === "all" || p.profile === activeProfile);

  if (sortBy === "uw") filtered = [...filtered].sort((a, b) => (a.uw ?? 99) - (b.uw ?? 99));
  if (sortBy === "rw") filtered = [...filtered].sort((a, b) => (b.rw ?? 0) - (a.rw ?? 0));
  if (sortBy === "id") filtered = [...filtered].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <main>
      {/* Page header */}
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "64px var(--pad-x) 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="num">01 / CATALOG</span><span className="dot" /><span>12 systems · aluplast · Salamander</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end" }}>
            <div>
              <h1 style={{ textWrap: "balance", marginBottom: 20 }}>
                Every system,<br />in one view.
              </h1>
              <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 600, lineHeight: 1.5 }}>
                All Acrova products across PVC and aluminium — filterable by family, profile system, and performance. Contact us for a comparison quote across multiple systems.
              </p>
            </div>
            <button className="btn btn-primary" onClick={onQuote}>
              Multi-system quote <Arrow />
            </button>
          </div>
        </div>
      </section>

      {/* Filters bar */}
      <div style={{ position: "sticky", top: 72, zIndex: 30, background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "0 var(--pad-x)", display: "flex", gap: 0, justifyContent: "space-between", alignItems: "center", height: 56 }}>
          {/* Family filter */}
          <div style={{ display: "flex", gap: 0 }}>
            {families.map((f) => (
              <button key={f.k} onClick={() => setActiveFamily(f.k)} style={{
                padding: "0 18px", height: 56,
                fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                color: activeFamily === f.k ? "var(--ink)" : "var(--muted)",
                borderBottom: activeFamily === f.k ? "2px solid var(--ink)" : "2px solid transparent",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>{f.l}</span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: activeFamily === f.k ? "var(--accent)" : "var(--muted)", letterSpacing: 0 }}>{f.count}</span>
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* Profile filter */}
            <div style={{ display: "flex", border: "1px solid var(--line-2)", height: 34 }}>
              {profiles.map((p, i) => (
                <button key={p.k} onClick={() => setActiveProfile(p.k)} style={{
                  padding: "0 14px",
                  fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                  borderRight: i < profiles.length - 1 ? "1px solid var(--line-2)" : "none",
                  background: activeProfile === p.k ? "var(--ink)" : "transparent",
                  color: activeProfile === p.k ? "var(--bg)" : "var(--muted)",
                }}>{p.l}</button>
              ))}
            </div>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
              border: "1px solid var(--line-2)", padding: "0 12px", height: 34, background: "var(--bg)", color: "var(--ink)", cursor: "pointer",
            }}>
              <option value="default">Sort · Default</option>
              <option value="uw">Sort · Best U-value</option>
              <option value="rw">Sort · Best acoustic</option>
              <option value="id">Sort · ID</option>
            </select>

            {/* View toggle */}
            <div style={{ display: "flex", border: "1px solid var(--line-2)", height: 34 }}>
              {["grid", "table"].map((v, i) => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "0 12px",
                  borderRight: i === 0 ? "1px solid var(--line-2)" : "none",
                  background: view === v ? "var(--ink)" : "transparent",
                  color: view === v ? "var(--bg)" : "var(--muted)",
                  display: "grid", placeItems: "center",
                }}>
                  {v === "grid" ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="0" y="0" width="6" height="6" stroke="currentColor" strokeWidth="1" />
                      <rect x="8" y="0" width="6" height="6" stroke="currentColor" strokeWidth="1" />
                      <rect x="0" y="8" width="6" height="6" stroke="currentColor" strokeWidth="1" />
                      <rect x="8" y="8" width="6" height="6" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="0" y1="2" x2="14" y2="2" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Count */}
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em" }}>
              {filtered.length} / {products.length}
            </span>
          </div>
        </div>
      </div>

      {/* Product grid or table */}
      <div className="container" style={{ padding: "64px var(--pad-x) 120px" }}>
        {view === "grid" ? (
          <CatalogGrid products={filtered} setPage={setPage} />
        ) : (
          <CatalogTable products={filtered} setPage={setPage} />
        )}

        {filtered.length === 0 && (
          <div style={{ padding: "80px 0", textAlign: "center", color: "var(--muted)", fontFamily: "var(--f-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            No systems match the current filter.
          </div>
        )}
      </div>

      {/* Profile partner note */}
      <section style={{ borderTop: "1px solid var(--line)", background: "var(--bg-2)" }}>
        <div className="container" style={{ padding: "56px var(--pad-x)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <span className="dot" /><span>Profile systems</span>
              </div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>
                PVC systems run on <strong style={{ color: "var(--ink)" }}>aluplast</strong> (IDEAL 4000, IDEAL 8000) and <strong style={{ color: "var(--ink)" }}>Salamander</strong> (streamline 76, bluEvolution 92) profiles extruded in Germany.
              </p>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <span className="dot" /><span>Aluminium systems</span>
              </div>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>
                Aluminium openings use 6060-T66 extrusion with polyamide PA66-GF25 thermal break. Powder coated to AAMA 2605.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "flex-end" }}>
              <button className="btn btn-primary btn-sm" onClick={onQuote}>Request comparison quote <Arrow size={12} /></button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- GRID view ---- */
function CatalogGrid({ products, setPage }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
      {products.map((p) => (
        <CatalogCard key={p.id} p={p} setPage={setPage} />
      ))}
    </div>
  );
}

function CatalogCard({ p, setPage }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => setPage("pdp")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textAlign: "left", padding: 0, display: "block", transform: hovered ? "translateY(-4px)" : "none", transition: "transform .25s ease" }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <Placeholder aspect="4/5" src={p.img} label={p.id} />
        {/* badges */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.new && (
            <span style={{ background: "var(--accent)", color: "#fff", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 8px" }}>New</span>
          )}
          <span style={{ background: "var(--ink)", color: "var(--bg)", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 8px" }}>{p.profile === "pvc" ? "PVC" : "Alu"}</span>
        </div>
        {/* hover overlay with quick specs */}
        <div style={{
          position: "absolute", inset: 0, background: "rgba(20,20,20,0.82)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20,
          opacity: hovered ? 1 : 0, transition: "opacity .2s ease",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
            {p.uw && <QuickSpec k="Uw" v={`${p.uw}`} u="W/m²K" />}
            <QuickSpec k="Rw" v={`${p.rw}`} u="dB" />
            {p.rc && <QuickSpec k="Resist." v={p.rc} u="" />}
            <QuickSpec k="Profile" v={p.profile === "pvc" ? "PVC" : "Alu"} u="" />
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {p.systems.join(" · ")}
          </div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: "18px 0 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>{p.id} · {p.tag}</div>
          <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}>{p.name}</div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", marginTop: 6, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {p.uw && <span>Uw {p.uw}</span>}
            <span>Rw {p.rw} dB</span>
            {p.rc && <span>{p.rc}</span>}
          </div>
        </div>
        <Arrow />
      </div>
    </button>
  );
}

function QuickSpec({ k, v, u }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#fff" }}>{v}</span>
        {u && <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "rgba(255,255,255,0.55)" }}>{u}</span>}
      </div>
    </div>
  );
}

/* ---- TABLE view ---- */
function CatalogTable({ products, setPage }) {
  const cols = ["ID", "System", "Profile", "Tag", "Uw W/m²K", "Rw dB", "RC", "Partner system", ""];
  return (
    <div style={{ border: "1px solid var(--line-2)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "90px 1.5fr 80px 100px 100px 80px 80px 1fr 48px", background: "var(--ink)", color: "var(--bg)" }}>
        {cols.map((c, i) => (
          <div key={i} style={{ padding: "14px 16px", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>{c}</div>
        ))}
      </div>
      {products.map((p, i) => (
        <div
          key={p.id}
          onClick={() => setPage("pdp")}
          style={{
            display: "grid", gridTemplateColumns: "90px 1.5fr 80px 100px 100px 80px 80px 1fr 48px",
            borderTop: "1px solid var(--line)",
            background: i % 2 === 0 ? "var(--bg)" : "var(--bg-2)",
            cursor: "pointer", transition: "background .12s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "color-mix(in oklab, var(--accent) 6%, var(--bg))"}
          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "var(--bg)" : "var(--bg-2)"}
        >
          <div style={{ padding: "18px 16px", fontFamily: "var(--f-mono)", fontSize: 12, fontWeight: 500, letterSpacing: "0.04em" }}>
            {p.id}
            {p.new && <span style={{ display: "block", fontSize: 9, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>NEW</span>}
          </div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", fontSize: 14, fontWeight: 500 }}>{p.name}</div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", fontFamily: "var(--f-mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.profile}</div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", fontSize: 13, color: "var(--muted)" }}>{p.tag}</div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", fontFamily: "var(--f-mono)", fontSize: 14, fontWeight: 500 }}>{p.uw ?? "—"}</div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", fontFamily: "var(--f-mono)", fontSize: 14, fontWeight: 500 }}>{p.rw}</div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", fontFamily: "var(--f-mono)", fontSize: 13, color: p.rc === "RC3" ? "var(--accent)" : "var(--ink)" }}>{p.rc ?? "—"}</div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", fontSize: 12, color: "var(--muted)" }}>{p.systems.join(" · ")}</div>
          <div style={{ padding: "18px 16px", borderLeft: "1px solid var(--line)", display: "grid", placeItems: "center" }}><Arrow size={12} /></div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Catalog });
