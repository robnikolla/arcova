import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main";
}

export function Container({ as: Tag = "div", children, className = "", style, ...props }: ContainerProps) {
  return (
    <Tag className={`container ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
}
