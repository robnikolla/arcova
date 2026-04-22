"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface PlaceholderProps {
  label?: string;
  caption?: string;
  aspect?: string;
  style?: CSSProperties;
  src?: string;
  children?: ReactNode;
}

export function Placeholder({
  label = "IMAGE",
  caption,
  aspect = "4/3",
  style = {},
  src,
  children,
}: PlaceholderProps) {
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
        <Image
          src={src}
          alt={label}
          fill
          unoptimized
          sizes="(max-width: 820px) 100vw, 50vw"
          style={{ objectFit: "cover", position: "absolute" }}
          onError={() => setImgFailed(true)}
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
