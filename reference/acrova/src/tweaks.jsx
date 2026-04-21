// Tweaks panel — switches between the 3 aesthetic concepts + page
function TweaksPanel({ tweaks, setTweaks, active }) {
  if (!active) return null;
  const concepts = [
    { k: "minimal", l: "Minimal" },
    { k: "commercial", l: "Commercial" },
    { k: "industrial", l: "Industrial" },
  ];
  const pages = [
    { k: "home", l: "Home" },
    { k: "pdp", l: "Product" },
    { k: "catalog", l: "Catalog" },
    { k: "projects", l: "Projects" },
    { k: "about", l: "About" },
    { k: "manufacturing", l: "Mfg." },
  ];
  return (
    <div className="tweaks-panel">
      <h4>Concept</h4>
      <div className="tseg">
        {concepts.map((c) => (
          <button key={c.k} className={tweaks.concept === c.k ? "active" : ""} onClick={() => setTweaks({ ...tweaks, concept: c.k })}>
            {c.l}
          </button>
        ))}
      </div>
      <h4 style={{ marginTop: 14 }}>Page</h4>
      <div className="tseg" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: 4 }}>
        {pages.slice(0, 3).map((p) => (
          <button key={p.k} className={tweaks.page === p.k ? "active" : ""} onClick={() => setTweaks({ ...tweaks, page: p.k })}>
            {p.l}
          </button>
        ))}
      </div>
      <div className="tseg" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {pages.slice(3).map((p) => (
          <button key={p.k} className={tweaks.page === p.k ? "active" : ""} onClick={() => setTweaks({ ...tweaks, page: p.k })}>
            {p.l}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 14, opacity: 0.6, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Acrova · concept sweep
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel });
