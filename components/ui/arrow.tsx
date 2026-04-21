type ArrowDir = "right" | "left" | "up" | "down";

interface ArrowProps {
  dir?: ArrowDir;
  size?: number;
}

export function Arrow({ dir = "right", size = 14 }: ArrowProps) {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir];
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 14 10"
      fill="none"
      style={{ transform: `rotate(${rot}deg)`, flexShrink: 0 }}
      aria-hidden="true"
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
