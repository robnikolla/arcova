import type { ButtonHTMLAttributes } from "react";
import { Arrow } from "./arrow";

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "default" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
}

export function Button({
  variant = "ghost",
  size = "default",
  arrow = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const cls = [
    "btn",
    variant === "primary" ? "btn-primary" : "btn-ghost",
    size === "sm" ? "btn-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} {...props}>
      {children}
      {arrow && <Arrow size={size === "sm" ? 12 : 14} />}
    </button>
  );
}
