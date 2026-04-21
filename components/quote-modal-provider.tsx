"use client";

import { createContext, useContext, useState } from "react";
import { QuoteModal } from "./quote-modal";

interface QuoteModalContextValue {
  openQuote: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue>({
  openQuote: () => {},
});

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <QuoteModalContext.Provider value={{ openQuote: () => setOpen(true) }}>
      {children}
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </QuoteModalContext.Provider>
  );
}
