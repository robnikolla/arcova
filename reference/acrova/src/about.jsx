// About page — company, heritage, team, values, credentials
function About({ setPage, onQuote }) {
  return (
    <main>
      <AboutHero />
      <PartnersBand />
      <AboutStory />
      <Principles />
      <Leadership />
      <Numbers />
      <Timeline />
      <Credentials />
      <CtaAbout onQuote={onQuote} setPage={setPage} />
    </main>
  );
}

function AboutHero() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ padding: "64px var(--pad-x) 96px" }}>
        <div className="eyebrow" style={{ marginBottom: 48 }}>
          <span className="num">01 / ABOUT</span><span className="dot" /><span>Company · Ferizaj, Kosovo · Est. 2011</span>
        </div>
        <h1 style={{ textWrap: "balance", maxWidth: 1100, marginBottom: 40 }}>
          A window factory,<br />built for architects.
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 32 }}>
          <p style={{ fontSize: 20, lineHeight: 1.45, color: "var(--ink-2)", textWrap: "pretty" }}>
            Acrova manufactures made-to-order windows, doors and shutters in Ferizaj, Kosovo — on
            <strong> aluplast</strong> and <strong>Salamander</strong> profiles engineered in Germany.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted)", textWrap: "pretty" }}>
            We ship to 19 countries. We hold quoted lead times at 96.2%. We sign drawings
            back to the architect before anything is cut. That discipline — and fifteen
            years doing only this — is the company.
          </p>
        </div>
      </div>
    </section>
  );
}

function PartnersBand() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
      <div className="container" style={{ padding: "64px var(--pad-x)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              <span className="num">02</span><span className="dot" /><span>Partners</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--muted)" }}>Certified fabricator</div>
          </div>
          {[
            { n: "aluplast", sub: "Karlsruhe, DE · PVC profile systems", yr: "Since 2014" },
            { n: "Salamander", sub: "Türkheim, DE · Industrial profile division", yr: "Since 2016" },
          ].map((p) => (
            <div key={p.n} style={{ borderLeft: "1px solid var(--line-2)", paddingLeft: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>{p.n}</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.yr}</div>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{p.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutStory() {
  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 96 }}>
            <Placeholder aspect="4/5" src={IMGS.portrait_m1} label="FOUNDER · 01" />
            <div style={{ marginTop: 20, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
              <span>Bekim Halimi · Founder</span>
              <span>Plant A · 2024</span>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="num">03</span><span className="dot" /><span>How we got here</span>
            </div>
            <h2 style={{ textWrap: "balance", marginBottom: 40 }}>
              Fifteen years, one product.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 32, color: "var(--ink-2)", fontSize: 17, lineHeight: 1.6, maxWidth: 560 }}>
              <p>
                Acrova was founded in 2011 in a 400&nbsp;m² workshop outside Ferizaj. The
                first year shipped 112 windows — mostly to neighbours rebuilding homes.
              </p>
              <p>
                In 2014, we became certified fabricators of <strong>aluplast</strong> profiles and started
                quoting commercial projects in Austria and Germany. Two years later we
                added <strong>Salamander</strong> for the premium segment. The plant grew with the order book —
                14,200&nbsp;m² by 2022, with a second glass laminating line in 2024.
              </p>
              <p>
                The company never changed what it makes. Every expansion was in service
                of doing the same thing — specifying, cutting, glazing, shipping openings —
                with less variance and more capacity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const p = [
    { n: "01", t: "No stock. Everything made to order.", d: "We don't hold finished windows. Every opening is cut to your drawing, glazed to your spec, and boxed with your project code." },
    { n: "02", t: "The drawing is the contract.", d: "We sign your CAD back to you before production. Any deviation over 2 mm is flagged, approved in writing, and logged in the QC record." },
    { n: "03", t: "German profile, Kosovo plant.", d: "aluplast and Salamander extrude in Germany. We fabricate, glaze, and QC in Ferizaj. The value is in the engineering — on both ends of that chain." },
    { n: "04", t: "Lead time is a promise.", d: "Quoted windows ship in 18–22 days. We held 96.2% on-time in 2025. Late orders are credited — it's in the contract." },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="container">
        <SectionHeader index="04" eyebrow="Principles" title="Four commitments, written down." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {p.map((x, i) => (
            <div key={x.n} style={{
              padding: "40px 40px 40px 0",
              borderTop: "1px solid var(--line)",
              borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
              paddingLeft: i % 2 === 1 ? 40 : 0,
              display: "grid", gridTemplateColumns: "48px 1fr", gap: 20,
            }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em" }}>{x.n}</div>
              <div>
                <h4 style={{ fontSize: 24, fontWeight: 500, marginBottom: 12, letterSpacing: "-0.02em" }}>{x.t}</h4>
                <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const team = [
    { name: "Bekim Halimi", role: "Founder & CEO", yrs: "Since 2011" },
    { name: "Arta Krasniqi", role: "Head of Engineering", yrs: "Since 2013" },
    { name: "Milan Novak", role: "Production Director", yrs: "Since 2017" },
    { name: "Elena Weber", role: "Commercial, DACH", yrs: "Since 2019" },
    { name: "Stefan Bauer", role: "Head of QC", yrs: "Since 2015" },
    { name: "Vesa Krasniqi", role: "Supply Chain", yrs: "Since 2020" },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Leadership"
          title="Six people who sign off on every job."
          subtitle="Flat structure by design. You can speak to any of them by name."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {team.map((t, i) => (
            <div key={t.name}>
              <Placeholder aspect="4/5" src={[IMGS.portrait_m1,IMGS.portrait_f1,IMGS.portrait_m2,IMGS.portrait_f2,IMGS.portrait_m3,IMGS.portrait_f3][i]} label={`P·0${i+1}`} />
              <div style={{ padding: "16px 0 0" }}>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
                  <span>{t.role}</span><span>{t.yrs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  const n = [
    { v: "42,810", k: "Units shipped 2025" },
    { v: "19", k: "Countries served" },
    { v: "96.2%", k: "On-time delivery" },
    { v: "14,200 m²", k: "Plant footprint" },
    { v: "138", k: "Employees" },
    { v: "15 yrs", k: "In business" },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--ink)", color: "var(--bg)" }}>
      <div className="container" style={{ padding: "100px var(--pad-x)" }}>
        <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 32 }}>
          <span className="num" style={{ color: "rgba(255,255,255,0.55)" }}>06</span>
          <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%" }} />
          <span>The company in numbers</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0 }}>
          {n.map((x, i) => (
            <div key={i} style={{ padding: "40px 24px 0 0", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : "none", paddingLeft: i > 0 ? 24 : 0 }}>
              <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--bg)", marginBottom: 12 }}>{x.v}</div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{x.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const events = [
    { y: "2011", t: "Founded in Ferizaj", d: "400 m² workshop. 112 units in year one." },
    { y: "2014", t: "aluplast certification", d: "Authorised fabricator for DE-engineered PVC profiles." },
    { y: "2016", t: "Salamander partnership", d: "Added premium German profile line." },
    { y: "2018", t: "CE / EN 14351 certification", d: "IFT Rosenheim testing at the plant." },
    { y: "2020", t: "First DACH tower block", d: "Block 14 Mitte, Berlin — 98 openings." },
    { y: "2022", t: "Plant expansion", d: "Scaled to 14,200 m² and added CNC cutting." },
    { y: "2024", t: "Second glazing line", d: "Doubled IGU capacity · argon-filled as standard." },
    { y: "2026", t: "Passivhaus certified range", d: "AW-85 launched for PH-spec specifiers." },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
      <div className="container">
        <SectionHeader index="07" eyebrow="Timeline" title="Fifteen years." />
        <div>
          {events.map((e, i) => (
            <div key={e.y} style={{
              display: "grid", gridTemplateColumns: "140px 1fr 2fr 80px",
              gap: 24, alignItems: "start",
              padding: "28px 0",
              borderTop: i === 0 ? "1px solid var(--line-2)" : "none",
              borderBottom: "1px solid var(--line)",
            }}>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 22, fontWeight: 500, letterSpacing: "0.02em" }}>{e.y}</div>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>{e.t}</div>
              <div style={{ color: "var(--muted)", fontSize: 15 }}>{e.d}</div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.1em", textAlign: "right" }}>{String(i + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  const c = [
    { n: "ISO 9001", t: "Quality management system" },
    { n: "ISO 14001", t: "Environmental management" },
    { n: "EN 14351-1", t: "Windows & doors · harmonised" },
    { n: "CE marking", t: "Via notified body IFT Rosenheim 0757" },
    { n: "QUALANOD", t: "Anodising quality label" },
    { n: "Passivhaus", t: "Component-certified range (AW-85)" },
    { n: "IFT Rosenheim", t: "Third-party tested profiles" },
    { n: "RC2 / RC3", t: "Burglar resistance · EN 1627" },
  ];
  return (
    <section style={{ borderBottom: "1px solid var(--line)", background: "var(--bg-2)", padding: "100px 0" }}>
      <div className="container">
        <SectionHeader index="08" eyebrow="Credentials" title="Certifications in force." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
          {c.map((x, i) => (
            <div key={x.n} style={{
              padding: "28px 24px",
              borderRight: (i + 1) % 4 !== 0 ? "1px solid var(--line-2)" : "none",
              borderBottom: i < 4 ? "1px solid var(--line-2)" : "none",
              background: "var(--bg)",
            }}>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{x.n}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{x.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaAbout({ onQuote, setPage }) {
  return (
    <section style={{ padding: "120px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "end" }}>
          <h2 style={{ textWrap: "balance", maxWidth: 900 }}>
            Visit the plant.<br />
            It says more than a brochure.
          </h2>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-primary" onClick={onQuote}>Request a quote <Arrow /></button>
            <button className="btn btn-ghost" onClick={() => setPage("manufacturing")}>Tour manufacturing <Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
