// Top nav + footer
function Nav({ page, setPage, onQuote }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const items = [
    { k: "home", label: "Systems", sub: "01" },
    { k: "pdp", label: "Product", sub: "02" },
    { k: "catalog", label: "Catalog", sub: "03" },
    { k: "projects", label: "Projects", sub: "04" },
    { k: "manufacturing", label: "Manufacturing", sub: "05" },
    { k: "about", label: "About", sub: "06" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: scrolled
          ? "color-mix(in oklab, var(--bg) 92%, transparent)"
          : "var(--bg)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: "1px solid var(--line)",
        transition: "all .2s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <button onClick={() => setPage("home")} style={{ padding: 0 }}>
          <Logo size={24} />
        </button>

        <nav style={{ display: "flex", gap: 32 }} className="hide-sm">
          {items.map((it) => (
            <button
              key={it.k}
              onClick={() => setPage(it.k)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: page === it.k ? "var(--ink)" : "var(--muted)",
                padding: "4px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  color: "var(--muted)",
                }}
              >
                {it.sub}
              </span>
              <span>{it.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="chip hide-sm" style={{ border: 0, padding: 0 }}>
            <span
              style={{
                width: 6,
                height: 6,
                background: "var(--accent)",
                borderRadius: "50%",
              }}
            />
            EN / DE / FR / IT
          </div>
          <button className="btn btn-primary btn-sm" onClick={onQuote}>
            Request Quote
            <Arrow size={12} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onQuote }) {
  const cols = [
    {
      t: "Systems",
      i: [
        "Windows",
        "Doors",
        "Shutters",
        "Curtain Walls",
        "Sliding Systems",
        "Entrance Doors",
      ],
    },
    {
      t: "Company",
      i: [
        "Manufacturing",
        "Certifications",
        "Sustainability",
        "Projects",
        "Press",
        "Careers",
      ],
    },
    {
      t: "Support",
      i: [
        "Technical Library",
        "CAD Downloads",
        "Installation Guides",
        "Distributor Portal",
        "Contact",
      ],
    },
  ];
  return (
    <footer
      style={{ background: "var(--ink)", color: "var(--bg)", marginTop: 0 }}
    >
      <div className="container" style={{ padding: "80px var(--pad-x) 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 80,
          }}
        >
          <div>
            <Logo size={28} color="var(--bg)" />
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                marginTop: 28,
                maxWidth: 320,
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              Precision windows, doors, and shutters. Engineered in Kosovo,
              shipped across Europe.
            </p>
            <button
              className="btn"
              style={{
                marginTop: 32,
                borderColor: "var(--bg)",
                color: "var(--bg)",
              }}
              onClick={onQuote}
            >
              Request Quote <Arrow size={12} />
            </button>
          </div>
          {cols.map((c) => (
            <div key={c.t}>
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 20,
                }}
              >
                {c.t}
              </div>
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
                {c.i.map((x) => (
                  <li key={x}>
                    <a
                      href="#"
                      style={{
                        fontSize: 14,
                        color: "var(--bg)",
                        opacity: 0.85,
                      }}
                    >
                      {x}
                    </a>
                  </li>
                ))}
                {c.t === "Company" && (
                  <li
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: 12,
                    }}
                  >
                    Fabricator · aluplast · Salamander
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <span>© 2026 Arcova sh.p.k.</span>
            <span>Ferizaj, Kosovo</span>
            <span>VAT: XK-810429316</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <a href="#">Legal</a>
            <a href="#">Privacy</a>
            <a href="#">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer });
