// Shared primitives: Logo, Placeholder, Arrow

// ── Central image map — picsum.photos (sandbox-compatible) ──────────────────
const IMGS = {
  // Hero / large facades
  hero_glass: "https://picsum.photos/seed/facade-hero/1800/800",
  facade_geometric: "https://picsum.photos/seed/facade-geo/1200/900",
  facade_contrast: "https://picsum.photos/seed/facade-con/1200/900",
  facade_brick: "https://picsum.photos/seed/facade-brk/1200/900",
  facade_metallic: "https://picsum.photos/seed/facade-met/1200/900",
  // Architecture supplemental
  arch_a: "https://picsum.photos/seed/arch-a/1200/900",
  arch_b: "https://picsum.photos/seed/arch-b/1200/900",
  arch_c: "https://picsum.photos/seed/arch-c/1200/900",
  arch_d: "https://picsum.photos/seed/arch-d/1200/900",
  arch_e: "https://picsum.photos/seed/arch-e/1200/900",
  arch_f: "https://picsum.photos/seed/arch-f/1200/900",
  arch_g: "https://picsum.photos/seed/arch-g/1200/900",
  arch_h: "https://picsum.photos/seed/arch-h/1200/900",
  // Manufacturing / industrial
  plant_wide: "https://picsum.photos/seed/plant-wide/1800/700",
  plant_cnc: "https://picsum.photos/seed/plant-cnc/1200/900",
  plant_weld: "https://picsum.photos/seed/plant-weld/1200/900",
  plant_glass: "https://picsum.photos/seed/plant-glass/1200/900",
  plant_worker: "https://picsum.photos/seed/plant-worker/1200/900",
  // Portraits
  portrait_m1: "https://picsum.photos/seed/portrait-m1/600/750",
  portrait_f1: "https://picsum.photos/seed/portrait-f1/600/750",
  portrait_m2: "https://picsum.photos/seed/portrait-m2/600/750",
  portrait_f2: "https://picsum.photos/seed/portrait-f2/600/750",
  portrait_m3: "https://picsum.photos/seed/portrait-m3/600/750",
  portrait_f3: "https://picsum.photos/seed/portrait-f3/600/750",
};
// ────────────────────────────────────────────────────────────────────────────

const { useState, useEffect, useRef, useMemo } = React;

function Arrow({ dir = "right", size = 14 }) {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir];
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 14 10"
      fill="none"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path
        d="M1 5H13M13 5L9 1M13 5L9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Logo({ size = 28, showWord = true, color }) {
  const c = color || "currentColor";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: c }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="30" height="30" stroke={c} strokeWidth="1.5" />
        <rect x="7" y="7" width="18" height="18" stroke={c} strokeWidth="1.5" />
        <line x1="16" y1="1" x2="16" y2="7" stroke={c} strokeWidth="1.5" />
        <line x1="16" y1="25" x2="16" y2="31" stroke={c} strokeWidth="1.5" />
      </svg>
      {showWord && (
        <span
          style={{
            fontFamily: "var(--f-display)",
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          ARCOVA
        </span>
      )}
    </div>
  );
}

function LogoMark({ size = 40, color }) {
  const c = color || "currentColor";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="1" y="1" width="30" height="30" stroke={c} strokeWidth="1.5" />
      <rect x="7" y="7" width="18" height="18" stroke={c} strokeWidth="1.5" />
      <line x1="16" y1="1" x2="16" y2="7" stroke={c} strokeWidth="1.5" />
      <line x1="16" y1="25" x2="16" y2="31" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

// Photo/Placeholder: shows real image if src provided, hatched fallback otherwise
// onError on the img gracefully re-hides the image and shows placeholder
function Placeholder({
  label = "IMAGE",
  caption,
  aspect = "4/3",
  style = {},
  src,
  children,
}) {
  const [imgFailed, setImgFailed] = useState(false);
  if (src && !imgFailed) {
    return (
      <div
        style={{
          position: "relative",
          aspectRatio: aspect,
          width: "100%",
          overflow: "hidden",
          background: "var(--placeholder)",
          ...style,
        }}
      >
        <img
          src={src}
          alt={label}
          onError={() => setImgFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          loading="lazy"
        />
        {children}
      </div>
    );
  }
  return (
    <div
      className="placeholder"
      style={{ aspectRatio: aspect, width: "100%", ...style }}
    >
      <span className="label">{label}</span>
      {caption && <span className="caption">{caption}</span>}
      <div className="ticks" />
      {children}
    </div>
  );
}

function SpecRow({ k, v }) {
  return (
    <tr>
      <td>{k}</td>
      <td>{v}</td>
    </tr>
  );
}

function SectionHeader({ eyebrow, title, subtitle, index, rightSlot }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 40,
        marginBottom: 40,
        flexWrap: "wrap",
      }}
    >
      <div style={{ maxWidth: 820 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>
          {index && <span className="num">{index}</span>}
          {eyebrow && (
            <>
              <span className="dot" />
              <span>{eyebrow}</span>
            </>
          )}
        </div>
        <h2 style={{ textWrap: "balance" }}>{title}</h2>
        {subtitle && (
          <p
            style={{
              marginTop: 20,
              color: "var(--muted)",
              fontSize: 17,
              maxWidth: 640,
              textWrap: "pretty",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {rightSlot}
    </div>
  );
}

function Corners() {
  const s = {
    position: "absolute",
    width: 10,
    height: 10,
    border: "1px solid var(--line-2)",
  };
  return (
    <>
      <span
        style={{ ...s, top: 10, left: 10, borderRight: 0, borderBottom: 0 }}
      />
      <span
        style={{ ...s, top: 10, right: 10, borderLeft: 0, borderBottom: 0 }}
      />
      <span
        style={{ ...s, bottom: 10, left: 10, borderRight: 0, borderTop: 0 }}
      />
      <span
        style={{ ...s, bottom: 10, right: 10, borderLeft: 0, borderTop: 0 }}
      />
    </>
  );
}

Object.assign(window, {
  Arrow,
  Logo,
  LogoMark,
  Placeholder,
  SpecRow,
  SectionHeader,
  Corners,
  IMGS,
});
