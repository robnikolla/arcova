import type { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  live?: boolean;
}

export function Chip({ live, children, className = "", ...props }: ChipProps) {
  return (
    <span className={`chip${live ? " live" : ""} ${className}`} {...props}>
      {children}
    </span>
  );
}
