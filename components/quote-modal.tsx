"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Arrow } from "@/components/ui/arrow";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

const SYSTEMS = [
  { id: "AW-72", t: "Aluminium Windows", cat: "window" },
  { id: "PW-88", t: "PVC Windows", cat: "window" },
  { id: "ED-120", t: "Entrance Doors", cat: "door" },
  { id: "RS-45", t: "Roller Shutters", cat: "shutter" },
  { id: "SW-190", t: "Sliding Systems", cat: "sliding" },
  { id: "CW-60", t: "Curtain Walls", cat: "curtain" },
];

const COUNTRIES = [
  "Germany", "Austria", "Switzerland", "France", "Italy",
  "Netherlands", "Belgium", "Slovenia", "Croatia",
];

const STEPS = ["Project", "Systems", "Configure", "Details", "Contact", "Review"];

const SYSTEM_CONFIG_OPTIONS: Record<string, { label: string; key: string; opts: string[] }[]> = {
  window: [
    { label: "Opening type", key: "opening", opts: ["Tilt-turn", "Casement", "Fixed light", "Pivot"] },
    { label: "Glazing tier", key: "glazing", opts: ["Double IGU", "Triple IGU", "Acoustic triple", "Security laminate"] },
  ],
  door: [
    { label: "Panel design", key: "panel", opts: ["Solid", "Half-light", "Full-light", "Pivot flush"] },
    { label: "Security class", key: "security", opts: ["RC2", "RC3", "RC4"] },
  ],
  shutter: [
    { label: "Slat profile", key: "slat", opts: ["RS-45 round-base", "RS-55 foam-filled", "RS-77 high-insul."] },
    { label: "Drive type", key: "drive", opts: ["Tubular motor", "Belt drive", "Solar"] },
  ],
  sliding: [
    { label: "Sash weight", key: "weight", opts: ["Up to 200 kg", "Up to 400 kg", "Heavy-duty 600 kg"] },
    { label: "Threshold", key: "threshold", opts: ["Low 20mm", "Flush 0mm", "Standard"] },
  ],
  curtain: [
    { label: "Span tier", key: "span", opts: ["Up to 1.8m", "Up to 2.7m", "Up to 3.6m"] },
    { label: "Cladding", key: "cladding", opts: ["Glazed standard", "Structural glass", "Opaque infill"] },
  ],
};

const DEFAULT_COUNTS: Record<string, number> = {
  window: 10,
  door: 3,
  shutter: 8,
  sliding: 5,
  curtain: 4,
};

const COUNT_RANGES: Record<string, [number, number]> = {
  window: [1, 500],
  door: [1, 50],
  shutter: [1, 200],
  sliding: [1, 100],
  curtain: [1, 60],
};

type SystemConfig = {
  count: number;
  options: Record<string, string>;
};

type QuoteData = {
  projectType: string;
  units: number;
  systems: string[];
  systemConfigs: Record<string, SystemConfig>;
  timeline: string;
  country: string;
  city: string;
  name: string;
  company: string;
  email: string;
  role: string;
  notes: string;
};

function buildDefaultConfig(systemId: string): SystemConfig {
  const sys = SYSTEMS.find((s) => s.id === systemId)!;
  const cat = sys.cat;
  const opts: Record<string, string> = {};
  (SYSTEM_CONFIG_OPTIONS[cat] ?? []).forEach((field) => {
    opts[field.key] = field.opts[0];
  });
  return { count: DEFAULT_COUNTS[cat] ?? 5, options: opts };
}

export function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>({
    projectType: "residential",
    units: 24,
    systems: ["AW-72"],
    systemConfigs: { "AW-72": buildDefaultConfig("AW-72") },
    timeline: "3-6mo",
    country: "Germany",
    city: "",
    name: "",
    company: "",
    email: "",
    role: "architect",
    notes: "",
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (k: keyof QuoteData, v: string | number | string[] | Record<string, SystemConfig>) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleSystem = (s: string) => {
    setData((d) => {
      const isSelected = d.systems.includes(s);
      const newSystems = isSelected ? d.systems.filter((x) => x !== s) : [...d.systems, s];
      const newConfigs = { ...d.systemConfigs };
      if (!isSelected && !newConfigs[s]) {
        newConfigs[s] = buildDefaultConfig(s);
      }
      if (isSelected) {
        delete newConfigs[s];
      }
      return { ...d, systems: newSystems, systemConfigs: newConfigs };
    });
  };

  const updateSystemConfig = (systemId: string, field: string, value: string | number) => {
    setData((d) => ({
      ...d,
      systemConfigs: {
        ...d.systemConfigs,
        [systemId]: {
          ...d.systemConfigs[systemId],
          ...(field === "count"
            ? { count: value as number }
            : { options: { ...d.systemConfigs[systemId]?.options, [field]: value as string } }),
        },
      },
    }));
  };

  const monoLabel: React.CSSProperties = {
    fontFamily: "var(--f-mono)",
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: 12,
    display: "block",
  };

  const selectedSystemObjects = SYSTEMS.filter((s) => data.systems.includes(s.id));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div
          className="modal-header"
          style={{
            padding: "24px 32px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Logo size={22} />
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
              Request a quote
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, display: "grid", placeItems: "center", border: "1px solid var(--line-2)", background: "transparent", cursor: "pointer" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div
          className="modal-progress"
          style={{ padding: "16px 32px", borderBottom: "1px solid var(--line)", display: "flex", gap: 0 }}
        >
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 22, height: 22,
                  border: "1px solid " + (i <= step ? "var(--ink)" : "var(--line-2)"),
                  background: i < step ? "var(--ink)" : i === step ? "var(--accent)" : "transparent",
                  color: i < step ? "var(--bg)" : i === step ? "var(--bg)" : "var(--muted)",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--f-mono)", fontSize: 10, fontWeight: 500,
                }}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className="modal-step-label"
                style={{
                  fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: i === step ? "var(--ink)" : "var(--muted)",
                }}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className="modal-step-connector"
                  style={{ flex: 1, height: 1, background: i < step ? "var(--ink)" : "var(--line)", marginRight: 10 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: 32, overflow: "auto", flex: 1 }}>

          {/* Step 0: Project */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <label style={monoLabel}>Project type</label>
                <div className="segment">
                  {["residential", "commercial", "hospitality", "civic"].map((t) => (
                    <button key={t} onClick={() => update("projectType", t)} className={data.projectType === t ? "active" : ""}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                <div>
                  <label style={monoLabel}>Units (approx.)</label>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <input
                      type="range" min="1" max="500" value={data.units}
                      onChange={(e) => update("units", +e.target.value)}
                      style={{ flex: 1, accentColor: "var(--ink)" }}
                    />
                    <span style={{ fontSize: 28, fontWeight: 500, minWidth: 80, textAlign: "right" }}>{data.units}</span>
                  </div>
                </div>
                <div>
                  <label style={monoLabel}>Target timeline</label>
                  <div className="segment">
                    {[{ k: "urgent", l: "< 3mo" }, { k: "3-6mo", l: "3–6mo" }, { k: "6-12mo", l: "6–12mo" }, { k: "flex", l: "Flexible" }].map((t) => (
                      <button key={t.k} onClick={() => update("timeline", t.k)} className={data.timeline === t.k ? "active" : ""}>{t.l}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Systems */}
          {step === 1 && (
            <div>
              <label style={{ ...monoLabel, marginBottom: 16 }}>Systems of interest · multi-select</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px solid var(--line-2)" }}>
                {SYSTEMS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => toggleSystem(s.id)}
                    style={{
                      padding: 20, textAlign: "left",
                      borderRight: i % 2 === 0 ? "1px solid var(--line-2)" : "none",
                      borderBottom: i < 4 ? "1px solid var(--line-2)" : "none",
                      background: data.systems.includes(s.id) ? "var(--ink)" : "transparent",
                      color: data.systems.includes(s.id) ? "var(--bg)" : "var(--ink)",
                      display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 4 }}>{s.id}</div>
                      <div style={{ fontSize: 16, fontWeight: 500 }}>{s.t}</div>
                    </div>
                    <div style={{ width: 18, height: 18, border: "1px solid currentColor", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      {data.systems.includes(s.id) && <span style={{ fontSize: 11 }}>✓</span>}
                    </div>
                  </button>
                ))}
              </div>
              {data.systems.length === 0 && (
                <p style={{ marginTop: 16, fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--muted)", letterSpacing: "0.08em" }}>
                  Select at least one system to continue.
                </p>
              )}
            </div>
          )}

          {/* Step 2: Configure — per-system */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <p style={{ ...monoLabel, marginBottom: 0 }}>
                Configure each selected system · adjust counts and key options
              </p>
              {selectedSystemObjects.length === 0 && (
                <p style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--muted)" }}>No systems selected — go back to Step 2.</p>
              )}
              {selectedSystemObjects.map((sys) => {
                const cfg = data.systemConfigs[sys.id] ?? buildDefaultConfig(sys.id);
                const cat = sys.cat;
                const fields = SYSTEM_CONFIG_OPTIONS[cat] ?? [];
                const [min, max] = COUNT_RANGES[cat] ?? [1, 200];
                return (
                  <div key={sys.id} style={{ border: "1px solid var(--line-2)" }}>
                    {/* System header */}
                    <div style={{
                      padding: "14px 20px", background: "var(--ink)", color: "var(--bg)",
                      display: "flex", alignItems: "center", gap: 12,
                    }}>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", opacity: 0.7 }}>{sys.id}</span>
                      <span style={{ fontSize: 15, fontWeight: 500 }}>{sys.t}</span>
                    </div>
                    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 20 }}>
                      {/* Count slider */}
                      <div>
                        <label style={{ ...monoLabel, marginBottom: 8 }}>Approx. count</label>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                          <input
                            type="range" min={min} max={max} value={cfg.count}
                            onChange={(e) => updateSystemConfig(sys.id, "count", +e.target.value)}
                            style={{ flex: 1, accentColor: "var(--ink)" }}
                          />
                          <span style={{ fontSize: 24, fontWeight: 500, minWidth: 60, textAlign: "right" }}>{cfg.count}</span>
                        </div>
                      </div>
                      {/* Option fields */}
                      {fields.map((field) => (
                        <div key={field.key}>
                          <label style={monoLabel}>{field.label}</label>
                          <div className="segment" style={{ flexWrap: "wrap" }}>
                            {field.opts.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => updateSystemConfig(sys.id, field.key, opt)}
                                className={cfg.options[field.key] === opt ? "active" : ""}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                <div className="field">
                  <label>Delivery country</label>
                  <select value={data.country} onChange={(e) => update("country", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Delivery city (postcode)</label>
                  <input value={data.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. 10115 Berlin" />
                </div>
              </div>
              <div className="field">
                <label>Project notes / BOQ summary</label>
                <textarea
                  placeholder="Describe the project — site, typology, key dimensions, drawings status."
                  value={data.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Attach drawings (optional)</label>
                <div style={{ border: "1px dashed var(--line-2)", padding: 24, textAlign: "center", color: "var(--muted)", fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  ↑ Drop DWG · PDF · IFC · up to 200 MB
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                <div className="field">
                  <label>Full name</label>
                  <input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Elena Weber" />
                </div>
                <div className="field">
                  <label>Company</label>
                  <input value={data.company} onChange={(e) => update("company", e.target.value)} placeholder="Weber & Partner Architekten" />
                </div>
              </div>
              <div className="mob-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                <div className="field">
                  <label>Work email</label>
                  <input value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="e.weber@weber.de" type="email" />
                </div>
                <div className="field">
                  <label>Role</label>
                  <select value={data.role} onChange={(e) => update("role", e.target.value)}>
                    <option value="architect">Architect</option>
                    <option value="developer">Developer</option>
                    <option value="contractor">Contractor</option>
                    <option value="distributor">Distributor</option>
                    <option value="owner">Building owner</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
                Review & submit
              </div>
              <div style={{ border: "1px solid var(--line-2)" }}>
                {/* Project row */}
                <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>Project</span>
                  <span style={{ fontSize: 15 }}>{data.projectType} · {data.units} units · {data.timeline}</span>
                </div>
                {/* Per-system config rows */}
                {selectedSystemObjects.map((sys, idx) => {
                  const cfg = data.systemConfigs[sys.id];
                  const optSummary = cfg ? Object.values(cfg.options).join(" · ") : "—";
                  return (
                    <div
                      key={sys.id}
                      style={{
                        display: "grid", gridTemplateColumns: "180px 1fr",
                        padding: "16px 20px",
                        borderBottom: idx < selectedSystemObjects.length - 1 ? "1px solid var(--line)" : "none",
                        background: idx % 2 === 0 ? "var(--bg)" : "var(--bg-2)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                        {sys.id}
                      </span>
                      <div>
                        <span style={{ fontSize: 15 }}>{sys.t}</span>
                        <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                          {cfg?.count ?? "—"} units · {optSummary}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* Remaining summary rows */}
                {[
                  ["Delivery", data.country + (data.city ? ` · ${data.city}` : "")],
                  ["Contact", `${data.name || "—"} · ${data.company || "—"}`],
                  ["Email", data.email || "—"],
                  ["Role", data.role],
                ].map((r, i) => (
                  <div
                    key={r[0]}
                    className="modal-review-row"
                    style={{ display: "grid", gridTemplateColumns: "180px 1fr", padding: "16px 20px", borderTop: "1px solid var(--line)" }}
                  >
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>{r[0]}</span>
                    <span style={{ fontSize: 15 }}>{r[1]}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "flex-start", fontSize: 13, color: "var(--muted)" }}>
                <input type="checkbox" defaultChecked style={{ marginTop: 3, accentColor: "black" }} />
                <span>I consent to Arcova contacting me about this project. We reply within 72 hours.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="modal-footer"
          style={{ padding: "20px 32px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
            Step {step + 1} of {STEPS.length}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {step > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={() => setStep(step - 1)}>← Back</button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && data.systems.length === 0}
                style={{ opacity: step === 1 && data.systems.length === 0 ? 0.4 : 1 }}
              >
                Continue <Arrow size={12} />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => { alert("Thank you — quote request received."); onClose(); }}
              >
                Submit request <Arrow size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
