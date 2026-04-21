import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  index?: string;
  rightSlot?: ReactNode;
}

export function SectionHeader({ eyebrow, title, subtitle, index, rightSlot }: SectionHeaderProps) {
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
        <h2 style={{ textWrap: "balance" } as React.CSSProperties}>{title}</h2>
        {subtitle && (
          <p
            style={{
              marginTop: 20,
              color: "var(--muted)",
              fontSize: 17,
              maxWidth: 640,
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
