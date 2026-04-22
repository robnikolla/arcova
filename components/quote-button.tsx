"use client";

import { useQuoteModal } from "@/components/quote-modal-provider";

interface QuoteButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function QuoteButton({ children, className, style }: QuoteButtonProps) {
  const { openQuote } = useQuoteModal();
  return (
    <button
      onClick={openQuote}
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }}
    >
      {children}
    </button>
  );
}
