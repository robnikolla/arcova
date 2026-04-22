import Link from "next/link";
import { Logo } from "./ui/logo";
import { Arrow } from "./ui/arrow";
import { QuoteButton } from "./quote-button";

interface FooterProps {
  locale: string;
}

const FOOTER_COLS = [
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
    note: "Fabricator · aluplast · Salamander",
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

export function Footer({ locale }: FooterProps) {
  return (
    <footer
      style={{ background: "var(--ink)", color: "var(--bg)", marginTop: 0 }}
    >
      <div className="container" style={{ padding: "80px var(--pad-x) 32px" }}>
        <div
          className="mob-stack"
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
            <QuoteButton
              className="btn"
              style={{
                marginTop: 32,
                borderColor: "var(--bg)",
                color: "var(--bg)",
              }}
            >
              Request Quote <Arrow size={12} />
            </QuoteButton>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.t}>
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
                {col.t}
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
                {col.i.map((x) => (
                  <li key={x}>
                    <Link
                      href="#"
                      style={{
                        fontSize: 14,
                        color: "var(--bg)",
                        opacity: 0.85,
                      }}
                    >
                      {x}
                    </Link>
                  </li>
                ))}
                {col.note && (
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
                    {col.note}
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
            <Link href="#">Legal</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Imprint</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
