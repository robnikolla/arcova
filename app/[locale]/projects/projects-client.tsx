"use client";

import { useState } from "react";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { Placeholder } from "@/components/ui/placeholder";
import { PROJECTS, TYPES, COUNTRIES, type Project } from "./data";

export function ProjectsClient({ locale }: { locale: string }) {
  const [activeType, setActiveType] = useState("all");
  const [activeCountry, setActiveCountry] = useState("all");

  const filtered = PROJECTS
    .filter((p) => activeType === "all" || p.type === activeType)
    .filter((p) => activeCountry === "all" || p.country === activeCountry);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <>
      {/* Sticky filters */}
      <div
        style={{
          position: "sticky",
          top: 72,
          zIndex: 30,
          background: "var(--bg)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="container"
          style={{
            padding: "0 var(--pad-x)",
            display: "flex",
            gap: 0,
            justifyContent: "space-between",
            alignItems: "center",
            height: 52,
          }}
        >
          <div style={{ display: "flex" }}>
            {TYPES.map((t) => (
              <button
                key={t.k}
                onClick={() => setActiveType(t.k)}
                style={{
                  padding: "0 20px",
                  height: 52,
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: activeType === t.k ? "var(--ink)" : "var(--muted)",
                  borderBottom:
                    activeType === t.k
                      ? "2px solid var(--ink)"
                      : "2px solid transparent",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {t.l}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 0,
              border: "1px solid var(--line-2)",
              height: 34,
            }}
          >
            {COUNTRIES.map((c, i) => (
              <button
                key={c.k}
                onClick={() => setActiveCountry(c.k)}
                style={{
                  padding: "0 14px",
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  borderRight:
                    i < COUNTRIES.length - 1 ? "1px solid var(--line-2)" : "none",
                  background: activeCountry === c.k ? "var(--ink)" : "transparent",
                  color: activeCountry === c.k ? "var(--bg)" : "var(--muted)",
                  cursor: "pointer",
                }}
              >
                {c.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "64px var(--pad-x) 120px" }}>
        {/* Featured row */}
        {featured.length > 0 && (
          <div style={{ marginBottom: 80 }}>
            <div
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 24,
              }}
            >
              Featured
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
              }}
            >
              {featured.map((p) => (
                <ProjectCardLarge key={p.id} p={p} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* Rest grid */}
        {rest.length > 0 && (
          <div>
            {featured.length > 0 && (
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                All projects
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 40,
              }}
            >
              {rest.map((p) => (
                <ProjectCardSmall key={p.id} p={p} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div
            style={{
              padding: "80px 0",
              textAlign: "center",
              color: "var(--muted)",
              fontFamily: "var(--f-mono)",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            No projects match the current filter.
          </div>
        )}
      </div>
    </>
  );
}

function ProjectCardLarge({ p, locale }: { p: Project; locale: string }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={`/${locale}/projects/${p.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        display: "block",
        transform: hov ? "translateY(-3px)" : "none",
        transition: "transform .25s ease",
      }}
    >
      <div style={{ position: "relative" }}>
        <Placeholder
          aspect="16/10"
          src={`https://picsum.photos/seed/${p.imgSeed}/1600/1000`}
          label={p.name.toUpperCase()}
        />
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <span
            style={{
              background: "var(--bg)",
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "5px 10px",
              border: "1px solid var(--line-2)",
            }}
          >
            {p.tag}
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)",
            opacity: hov ? 1 : 0.6,
            transition: "opacity .25s",
          }}
        />
        <div
          style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}
        >
          <div
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            {p.location} · {p.year}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {p.name}
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "18px 0 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>{p.systems.join(" · ")}</span>
          <span>·</span>
          <span>{p.openings} openings</span>
        </div>
        <Arrow size={12} />
      </div>
    </Link>
  );
}

function ProjectCardSmall({ p, locale }: { p: Project; locale: string }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      href={`/${locale}/projects/${p.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "left",
        display: "block",
        transform: hov ? "translateY(-3px)" : "none",
        transition: "transform .25s ease",
      }}
    >
      <Placeholder
        aspect="4/3"
        src={`https://picsum.photos/seed/${p.imgSeed}/800/600`}
        label={p.id.toUpperCase()}
      />
      <div style={{ padding: "16px 0 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 4,
          }}
        >
          <div
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              color: "var(--muted)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {p.location} · {p.year}
          </div>
          <div
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              color: "var(--muted)",
            }}
          >
            {p.openings} openings
          </div>
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            marginBottom: 6,
          }}
        >
          {p.name}
        </div>
        <div
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {p.systems.join(" · ")}
        </div>
      </div>
    </Link>
  );
}
