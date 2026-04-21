interface LogoProps {
  size?: number;
  showWord?: boolean;
  color?: string;
}

export function Logo({ size = 28, showWord = true, color }: LogoProps) {
  const c = color ?? "currentColor";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: c }}>
      <LogoMark size={size} color={c} />
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

interface LogoMarkProps {
  size?: number;
  color?: string;
}

export function LogoMark({ size = 40, color }: LogoMarkProps) {
  const c = color ?? "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="Arcova"
    >
      <rect x="1" y="1" width="30" height="30" stroke={c} strokeWidth="1.5" />
      <rect x="7" y="7" width="18" height="18" stroke={c} strokeWidth="1.5" />
      <line x1="16" y1="1" x2="16" y2="7" stroke={c} strokeWidth="1.5" />
      <line x1="16" y1="25" x2="16" y2="31" stroke={c} strokeWidth="1.5" />
    </svg>
  );
}
