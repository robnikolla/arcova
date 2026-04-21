// Projects index + single project page
const { useState: useStateP } = React;

/* ============================================================
   PROJECTS INDEX
   ============================================================ */
function Projects({ setPage, onQuote }) {
  const [activeType, setActiveType] = useState("all");
  const [activeCountry, setActiveCountry] = useState("all");
  const [featured, setFeatured] = useState(null);

  const projects = [
    { id: "atrium-residence", name: "Atrium Residence", location: "Vienna, Austria", country: "AT", year: 2025, type: "residential", systems: ["AW-72", "CW-60"], openings: 214, architect: "Eichinger Offices", img: IMGS.facade_geometric, featured: true, tag: "High-rise residential" },
    { id: "block-14-mitte", name: "Block 14 — Mitte", location: "Berlin, Germany", country: "DE", year: 2024, type: "residential", systems: ["PW-88", "RS-45"], openings: 98, architect: "Kuehn Malvezzi", img: IMGS.facade_contrast, featured: false, tag: "Mixed-use block" },
    { id: "hotel-karst", name: "Hotel Karst", location: "Ljubljana, Slovenia", country: "SI", year: 2025, type: "hospitality", systems: ["SW-190", "ED-120"], openings: 46, architect: "Ofis Arhitekti", img: IMGS.arch_a, featured: false, tag: "Boutique hotel" },
    { id: "villa-gornji", name: "Villa Gornji", location: "Dubrovnik, Croatia", country: "HR", year: 2024, type: "residential", systems: ["AW-72", "SW-190"], openings: 34, architect: "3LHD Studio", img: IMGS.arch_b, featured: false, tag: "Private villa" },
    { id: "campus-brno", name: "Campus Brno — Block C", location: "Brno, Czech Republic", country: "CZ", year: 2025, type: "commercial", systems: ["AW-85", "CW-60"], openings: 312, architect: "Chybik + Kristof", img: IMGS.facade_metallic, featured: true, tag: "Office campus" },
    { id: "soziale-wohnbau", name: "Soziale Wohnbau Graz", location: "Graz, Austria", country: "AT", year: 2024, type: "residential", systems: ["PW-76", "RS-45"], openings: 540, architect: "Grabner Huber Lipp", img: IMGS.facade_brick, featured: false, tag: "Social housing" },
    { id: "terme-catez", name: "Terme Čatež Extension", location: "Čatež ob Savi, Slovenia", country: "SI", year: 2023, type: "hospitality", systems: ["PW-92S", "ED-120"], openings: 88, architect: "Arhitektura Krušec", img: IMGS.arch_c, featured: false, tag: "Spa & resort" },
    { id: "munich-riem", name: "Riem Arcaden Residential", location: "Munich, Germany", country: "DE", year: 2024, type: "residential", systems: ["AW-72", "RS-45"], openings: 176, architect: "Meck Architekten", img: IMGS.arch_d, featured: false, tag: "Dense residential" },
  ];

  const types = [
    { k: "all", l: "All" },
    { k: "residential", l: "Residential" },
    { k: "commercial", l: "Commercial" },
    { k: "hospitality", l: "Hospitality" },
  ];
  const countries = [
    { k: "all", l: "All countries" },
    { k: "AT", l: "Austria" },
    { k: "DE", l: "Germany" },
    { k: "SI", l: "Slovenia" },
    { k: "HR", l: "Croatia" },
    { k: "CZ", l: "Czech Rep." },
  ];

  const filtered = projects
    .filter(p => activeType === "all" || p.type === activeType)
    .filter(p => activeCountry === "all" || p.country === activeCountry);

  const featuredProjects = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  if (featured) return <ProjectDetail project={featured} onBack={() => setFeatured(null)} onQuote={onQuote} />;

  return (
    <main>
      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "64px var(--pad-x) 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            <span className="num">01 / PROJECTS</span><span className="dot" /><span>{projects.length} completed · 2020–2025</span>
          </div>
          <h1 style={{ textWrap: "balance", maxWidth: 1000 }}>
            Openings in the<br />European built fabric.
          </h1>
        </div>
      </section>

      {/* Sticky filters */}
      <div style={{ position: "sticky", top: 72, zIndex: 30, background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "0 var(--pad-x)", display: "flex", gap: 0, justifyContent: "space-between", alignItems: "center", height: 52 }}>
          <div style={{ display: "flex" }}>
            {types.map((t) => (
              <button key={t.k} onClick={() => setActiveType(t.k)} style={{
                padding: "0 20px", height: 52,
                fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                color: activeType === t.k ? "var(--ink)" : "var(--muted)",
                borderBottom: activeType === t.k ? "2px solid var(--ink)" : "2px solid transparent",
              }}>{t.l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 0, border: "1px solid var(--line-2)", height: 34 }}>
            {countries.map((c, i) => (
              <button key={c.k} onClick={() => setActiveCountry(c.k)} style={{
                padding: "0 14px",
                fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                borderRight: i < countries.length - 1 ? "1px solid var(--line-2)" : "none",
                background: activeCountry === c.k ? "var(--ink)" : "transparent",
                color: activeCountry === c.k ? "var(--bg)" : "var(--muted)",
              }}>{c.l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "64px var(--pad-x) 120px" }}>

        {/* Featured row */}
        {featuredProjects.length > 0 && (
          <div style={{ marginBottom: 80 }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
              Featured
            </div>
            <div style={{ display: "grid", gridTemplateColumns: featuredProjects.length === 1 ? "1fr 1fr" : "1fr 1fr", gap: 32 }}>
              {featuredProjects.map((p) => (
                <ProjectCardLarge key={p.id} p={p} onClick={() => setFeatured(p)} />
              ))}
            </div>
          </div>
        )}

        {/* Rest grid */}
        {rest.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
                All projects
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {rest.map((p) => (
                <ProjectCardSmall key={p.id} p={p} onClick={() => setFeatured(p)} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ padding: "80px 0", textAlign: "center", color: "var(--muted)", fontFamily: "var(--f-mono)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            No projects match the current filter.
          </div>
        )}
      </div>
    </main>
  );
}

function ProjectCardLarge({ p, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ textAlign: "left", padding: 0, display: "block", transform: hov ? "translateY(-3px)" : "none", transition: "transform .25s ease" }}>
      <div style={{ position: "relative" }}>
        <Placeholder aspect="16/10" src={p.img} label={p.name.toUpperCase()} />
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <span style={{ background: "var(--bg)", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 10px", border: "1px solid var(--line-2)" }}>{p.tag}</span>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)", opacity: hov ? 1 : 0.6, transition: "opacity .25s" }} />
        <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            {p.location} · {p.year}
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.02em" }}>{p.name}</div>
        </div>
      </div>
      <div style={{ padding: "18px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 16, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <span>{p.systems.join(" · ")}</span>
          <span>·</span>
          <span>{p.openings} openings</span>
        </div>
        <Arrow size={12} />
      </div>
    </button>
  );
}

function ProjectCardSmall({ p, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ textAlign: "left", padding: 0, display: "block", transform: hov ? "translateY(-3px)" : "none", transition: "transform .25s ease" }}>
      <Placeholder aspect="4/3" src={p.img} label={p.id.toUpperCase()} />
      <div style={{ padding: "16px 0 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{p.location} · {p.year}</div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)" }}>{p.openings} openings</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 6 }}>{p.name}</div>
        <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.systems.join(" · ")}</div>
      </div>
    </button>
  );
}

/* ============================================================
   SINGLE PROJECT DETAIL
   ============================================================ */
function ProjectDetail({ project: p, onBack, onQuote }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    { l: "Facade", c: `${p.id}_facade.jpg` },
    { l: "Interior", c: `${p.id}_interior.jpg` },
    { l: "Detail", c: `${p.id}_detail.jpg` },
    { l: "Site", c: `${p.id}_site.jpg` },
  ];

  return (
    <main>
      {/* Back nav */}
      <div style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "14px var(--pad-x)", display: "flex", gap: 12, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)" }}>
            <Arrow dir="left" size={10} /> Projects
          </button>
          <span>/</span>
          <span style={{ color: "var(--ink)" }}>{p.name}</span>
        </div>
      </div>

      {/* Hero image — full bleed */}
      <section style={{ position: "relative", borderBottom: "1px solid var(--line)" }}>
        <Placeholder aspect="21/8" src={p.img} label={`${p.name.toUpperCase()} · HERO`}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />
          <div className="container" style={{ position: "absolute", bottom: 40, left: "var(--pad-x)", right: "var(--pad-x)" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "rgba(255,255,255,0.8)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              {p.location} · {p.year} · {p.tag}
            </div>
            <h1 style={{ color: "#fff", textWrap: "balance", maxWidth: 900 }}>{p.name}</h1>
          </div>
        </Placeholder>
      </section>

      {/* Meta strip */}
      <section style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "0 var(--pad-x)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
            {[
              { k: "Client location", v: p.location },
              { k: "Completion", v: p.year },
              { k: "Architect", v: p.architect },
              { k: "Systems", v: p.systems.join(" · ") },
              { k: "Openings", v: `${p.openings} units` },
            ].map((m, i) => (
              <div key={m.k} style={{ padding: "24px 24px 24px 0", borderRight: i < 4 ? "1px solid var(--line)" : "none", paddingLeft: i === 0 ? 0 : 24 }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{m.k}</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief + image gallery */}
      <section style={{ borderBottom: "1px solid var(--line)", padding: "96px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            {/* Text */}
            <div style={{ position: "sticky", top: 96 }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                <span className="num">01</span><span className="dot" /><span>Project brief</span>
              </div>
              <h2 style={{ textWrap: "balance", marginBottom: 32 }}>The brief.</h2>
              <div style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.7, display: "flex", flexDirection: "column", gap: 20 }}>
                <p>
                  <strong>{p.architect}</strong> specified the {p.systems.join(" and ")} systems
                  for {p.name} in {p.location}, requiring made-to-order openings across
                  {" "}{p.openings} positions in the facade.
                </p>
                <p>
                  The specification called for a consistent thermal performance across
                  all openings — U-values below 0.85 W/m²K — with a single profile
                  family to simplify installation sequencing on site.
                </p>
                <p>
                  All drawings were reviewed and signed off at Acrova before production
                  commenced. Lead time held at 18 days from confirmed order.
                </p>
              </div>

              {/* key stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--line-2)", marginTop: 40 }}>
                {[
                  { k: "Lead time", v: "18 days" },
                  { k: "On-time", v: "100%" },
                  { k: "Profile", v: p.systems[0] },
                  { k: "RC class", v: "RC2" },
                ].map((s, i) => (
                  <div key={s.k} style={{ padding: "16px 20px", background: "var(--bg)", borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none", borderBottom: i < 2 ? "1px solid var(--line-2)" : "none" }}>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{s.k}</div>
                    <div style={{ fontSize: 22, fontWeight: 500 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* main */}
              <Placeholder aspect="4/3" src={[p.img, IMGS.arch_e, IMGS.arch_f, IMGS.arch_g][activeImage]} style={{ transition: "all .2s ease" }} />
              {/* thumbs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} style={{
                    padding: 0,
                    outline: activeImage === i ? "2px solid var(--ink)" : "none",
                    outlineOffset: -2,
                    opacity: activeImage === i ? 1 : 0.6,
                    transition: "opacity .15s",
                  }}>
                    <Placeholder aspect="4/3" src={[p.img, IMGS.arch_e, IMGS.arch_f, IMGS.arch_g][i]} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Systems used */}
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-2)", padding: "96px 0" }}>
        <div className="container">
          <SectionHeader
            index="02"
            eyebrow="Systems specified"
            title={`${p.systems.length} system${p.systems.length > 1 ? "s" : ""} across this project.`}
          />
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${p.systems.length}, 1fr)`, gap: 0, border: "1px solid var(--line-2)" }}>
            {p.systems.map((sys, i) => (
              <div key={sys} style={{ padding: "36px", borderRight: i < p.systems.length - 1 ? "1px solid var(--line-2)" : "none", background: "var(--bg)" }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>System {String(i + 1).padStart(2, "0")}</div>
                <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 16 }}>{sys}</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--muted)", display: "flex", flexDirection: "column", gap: 6 }}>
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
      <section style={{ borderBottom: "1px solid var(--line)", background: "var(--ink)", color: "var(--bg)", padding: "100px 0" }}>
        <div className="container">
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>
              — {p.architect} · Project architect
            </div>
            <blockquote style={{ fontSize: "clamp(24px, 3vw, 42px)", fontWeight: 400, lineHeight: 1.25, letterSpacing: "-0.02em", margin: 0, color: "var(--bg)", textWrap: "balance" }}>
              "The drawings came back signed within 48 hours. Every opening arrived
              on the same truck, plumb to the millimetre. That's not common."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Drawings + docs */}
      <section style={{ borderBottom: "1px solid var(--line)", padding: "96px 0" }}>
        <div className="container">
          <SectionHeader index="03" eyebrow="Documentation" title="Project record." subtitle="Available to registered architects and contractors on request." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
            {[
              { t: "Signed architectural drawings", ext: "PDF", note: "R.07 · as-built" },
              { t: "Bill of quantities", ext: "XLSX", note: "All openings with references" },
              { t: "Performance declarations (DoP)", ext: "PDF", note: `${p.systems.join(", ")} systems` },
              { t: "QC water-test records", ext: "PDF", note: `${p.openings} unit certificates` },
            ].map((d, i) => (
              <a href="#" key={d.t}
                style={{ padding: "24px 28px", borderBottom: i < 2 ? "1px solid var(--line-2)" : "none", borderLeft: i % 2 === 1 ? "1px solid var(--line-2)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-2)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{d.t}</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{d.ext} · {d.note}</div>
                </div>
                <Arrow size={12} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Next project / CTA */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                <span className="dot" /><span>Start a project</span>
              </div>
              <h2 style={{ textWrap: "balance", maxWidth: 800 }}>
                Working on something similar?<br />
                Send us the drawings.
              </h2>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-primary" onClick={onQuote}>Request a quote <Arrow /></button>
              <button className="btn btn-ghost" onClick={onBack}>← All projects</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { Projects });
