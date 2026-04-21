import type { HTMLAttributes } from "react";

interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  dot?: boolean;
  index?: string;
}

export function Eyebrow({ dot, index, children, className = "", style, ...props }: EyebrowProps) {
  return (
    <div className={`eyebrow ${className}`} style={style} {...props}>
      {index && <span className="num">{index}</span>}
      {dot && <span className="dot" />}
      {children}
    </div>
  );
}
