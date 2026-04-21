"use client";

import { useState } from "react";
import Link from "next/link";
import { Placeholder } from "@/components/ui/placeholder";
import { Arrow } from "@/components/ui/arrow";

type Family = "all" | "windows" | "doors" | "sliding" | "shutters" | "curtain";
type Profile = "all" | "pvc" | "alu";
type SortKey = "default" | "uw" | "rw" | "id";
type View = "grid" | "table";

interface Product {
  id: string;
  slug: string;
  name: string;
  family: Family;
  profile: Profile;
  tag: string;
  uw: number | null;
  rw: number;
  rc: string | null;
  systems: string[];
  isNew: boolean;
  img: string;
}

const PRODUCTS: Product[] = [
  { id: "AW-72", slug: "aw-72", name: "Aluminium Window 72", family: "windows", profile: "alu", tag: "Standard", uw: 0.78, rw: 44, rc: "RC2", systems: ["aluplast", "alu 6060"], isNew: false, img: "https://picsum.photos/seed/facade-geo/1200/900" },
  { id: "AW-85", slug: "aw-85", name: "Aluminium Window 85", family: "windows", profile: "alu", tag: "Passivhaus", uw: 0.68, rw: 46, rc: "RC2", systems: ["alu 6060-T66"], isNew: true, img: "https://picsum.photos/seed/facade-met/1200/900" },
  { id: "PW-76", slug: "pw-76", name: "PVC Window 76 · aluplast", family: "windows", profile: "pvc", tag: "Standard", uw: 0.82, rw: 42, rc: "RC2", systems: ["aluplast IDEAL 4000"], isNew: false, img: "https://picsum.photos/seed/arch-b/1200/900" },
  { id: "PW-88", slug: "pw-88", name: "PVC Window 88 · aluplast", family: "windows", profile: "pvc", tag: "Premium", uw: 0.74, rw: 44, rc: "RC2", systems: ["aluplast IDEAL 8000"], isNew: false, img: "https://picsum.photos/seed/arch-a/1200/900" },
  { id: "PW-70S", slug: "pw-70s", name: "PVC Window 70 · Salamander", family: "windows", profile: "pvc", tag: "Standard", uw: 0.84, rw: 41, rc: "RC2", systems: ["Salamander streamline 76"], isNew: false, img: "https://picsum.photos/seed/arch-c/1200/900" },
  { id: "PW-92S", slug: "pw-92s", name: "PVC Window 92 · Salamander", family: "windows", profile: "pvc", tag: "Premium", uw: 0.72, rw: 45, rc: "RC3", systems: ["Salamander bluEvolution 92"], isNew: true, img: "https://picsum.photos/seed/facade-brk/1200/900" },
  { id: "ED-120", slug: "ed-120", name: "Entrance Door 120", family: "doors", profile: "alu", tag: "Security", uw: 0.66, rw: 42, rc: "RC3", systems: ["alu 6060"], isNew: false, img: "https://picsum.photos/seed/arch-d/1200/900" },
  { id: "ED-PVC", slug: "ed-pvc", name: "PVC Entrance Door", family: "doors", profile: "pvc", tag: "Standard", uw: 0.71, rw: 40, rc: "RC2", systems: ["aluplast IDEAL 8000"], isNew: false, img: "https://picsum.photos/seed/arch-e/1200/900" },
  { id: "SW-190", slug: "sw-190", name: "Lift-Slide System 190", family: "sliding", profile: "alu", tag: "Large format", uw: 0.88, rw: 38, rc: "RC2", systems: ["alu 6060"], isNew: false, img: "https://picsum.photos/seed/facade-con/1200/900" },
  { id: "SW-PVC", slug: "sw-pvc", name: "PVC Slide-Fold System", family: "sliding", profile: "pvc", tag: "Residential", uw: 0.90, rw: 37, rc: "RC1", systems: ["aluplast"], isNew: false, img: "https://picsum.photos/seed/arch-f/1200/900" },
  { id: "RS-45", slug: "rs-45", name: "Roller Shutter 45", family: "shutters", profile: "alu", tag: "Motorised", uw: null, rw: 32, rc: null, systems: ["Aluminium slat 45"], isNew: false, img: "https://picsum.photos/seed/arch-g/1200/900" },
  { id: "CW-60", slug: "cw-60", name: "Curtain Wall CW-60", family: "curtain", profile: "alu", tag: "Structural", uw: 1.1, rw: 40, rc: null, systems: ["Mullion-transom 60mm"], isNew: false, img: "https://picsum.photos/seed/arch-h/1200/900" },
];

const FAMILIES: { k: Family; l: string }[] = [
  { k: "all", l: "All systems" },
  { k: "windows", l: "Windows" },
  { k: "doors", l: "Doors" },
  { k: "sliding", l: "Sliding" },
  { k: "shutters", l: "Shutters" },
  { k: "curtain", l: "Curtain walls" },
];

const PROFILES: { k: Profile; l: string }[] = [
  { k: "all", l: "All profiles" },
  { k: "pvc", l: "PVC" },
  { k: "alu", l: "Aluminium" },
];

interface CatalogClientProps {
  locale: string;
}

export function CatalogClient({ locale }: CatalogClientProps) {
  const [activeFamily, setActiveFamily] = useState<Family>("all");
  const [activeProfile, setActiveProfile] = useState<Profile>("all");
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [view, setView] = useState<View>("grid");

  let filtered = PRODUCTS.filter(
    (p) => (activeFamily === "all" || p.family === activeFamily) &&
            (activeProfile === "all" || p.profile === activeProfile)
  );

  if (sortBy === "uw") filtered = [...filtered].sort((a, b) => (a.uw ?? 99) - (b.uw ?? 99));
  if (sortBy === "rw") filtered = [...filtered].sort((a, b) => (b.rw ?? 0) - (a.rw ?? 0));
  if (sortBy === "id") filtered = [...filtered].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <>
      {/* Filters bar */}
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
            height: 56,
          }}
        >
          <div style={{ display: "flex", gap: 0 }}>
            {FAMILIES.map((f) => (
              <button
                key={f.k}
                onClick={() => setActiveFamily(f.k)}
                style={{
                  padding: "0 18px",
                  height: 56,
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: activeFamily === f.k ? "var(--ink)" : "var(--muted)",
                  borderBottom: activeFamily === f.k ? "2px solid var(--ink)" : "2px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{f.l}</span>
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    color: activeFamily === f.k ? "var(--accent)" : "var(--muted)",
                    letterSpacing: 0,
                  }}
                >
                  {PRODUCTS.filter((p) => f.k === "all" || p.family === f.k).length}
                </span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", border: "1px solid var(--line-2)", height: 34 }}>
              {PROFILES.map((p, i) => (
                <button
                  key={p.k}
                  onClick={() => setActiveProfile(p.k)}
                  style={{
                    padding: "0 14px",
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    borderRight: i < PROFILES.length - 1 ? "1px solid var(--line-2)" : "none",
                    background: activeProfile === p.k ? "var(--ink)" : "transparent",
                    color: activeProfile === p.k ? "var(--bg)" : "var(--muted)",
                  }}
                >
                  {p.l}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "1px solid var(--line-2)",
                padding: "0 12px",
                height: 34,
                background: "var(--bg)",
                color: "var(--ink)",
                cursor: "pointer",
              }}
            >
              <option value="default">Sort · Default</option>
              <option value="uw">Sort · Best U-value</option>
              <option value="rw">Sort · Best acoustic</option>
              <option value="id">Sort · ID</option>
            </select>

            <div style={{ display: "flex", border: "1px solid var(--line-2)", height: 34 }}>
              {(["grid", "table"] as View[]).map((v, i) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    padding: "0 12px",
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    borderRight: i === 0 ? "1px solid var(--line-2)" : "none",
                    background: view === v ? "var(--ink)" : "transparent",
                    color: view === v ? "var(--bg)" : "var(--muted)",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      {view === "grid" ? (
        <div className="container" style={{ padding: "48px var(--pad-x)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "var(--line)",
              border: "1px solid var(--line)",
            }}
          >
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/products/${p.slug}`}
                className="prod-card"
                style={{
                  display: "block",
                  background: "var(--bg)",
                  padding: "24px",
                  position: "relative",
                }}
              >
                {p.isNew && (
                  <div
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background: "var(--accent)",
                      color: "#fff",
                      padding: "3px 8px",
                    }}
                  >
                    NEW
                  </div>
                )}
                <Placeholder aspect="4/3" label={p.id} src={p.img} />
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {p.id} · {p.tag}
                  </div>
                  <h4 style={{ fontSize: 17, fontWeight: 500, marginBottom: 12 }}>{p.name}</h4>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      fontFamily: "var(--f-mono)",
                      fontSize: 11,
                      color: "var(--ink-2)",
                    }}
                  >
                    {p.uw !== null && <span>Uw {p.uw}</span>}
                    <span>Rw {p.rw} dB</span>
                    {p.rc && <span>{p.rc}</span>}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.profile.toUpperCase()}
                  </span>
                  <Arrow size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Table view */
        <div className="container" style={{ padding: "48px var(--pad-x)" }}>
          <table className="spec" style={{ fontSize: 13 }}>
            <thead>
              <tr>
                {["ID", "System", "Profile", "Tag", "U-value", "Acoustic", "Security", "Profile System"].map((h) => (
                  <td
                    key={h}
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--line-2)",
                    }}
                  >
                    {h}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ cursor: "pointer" }}>
                  <td>
                    <Link
                      href={`/${locale}/products/${p.slug}`}
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 12,
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {p.id}
                      {p.isNew && (
                        <span
                          style={{
                            fontSize: 9,
                            background: "var(--accent)",
                            color: "#fff",
                            padding: "2px 5px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </Link>
                  </td>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td style={{ textTransform: "uppercase", fontSize: 11, fontFamily: "var(--f-mono)" }}>
                    {p.profile}
                  </td>
                  <td>{p.tag}</td>
                  <td>{p.uw !== null ? `${p.uw} W/m²K` : "—"}</td>
                  <td>{p.rw} dB</td>
                  <td>{p.rc ?? "—"}</td>
                  <td style={{ color: "var(--muted)", fontSize: 12 }}>{p.systems.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
