"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./ui/logo";
import { Arrow } from "./ui/arrow";
import { useQuoteModal } from "./quote-modal-provider";

interface NavProps {
  locale: string;
}

const NAV_ITEMS = [
  { href: "", label: "Systems", sub: "01" },
  { href: "/products/aw-72", label: "Product", sub: "02" },
  { href: "/catalog", label: "Catalog", sub: "03" },
  { href: "/projects", label: "Projects", sub: "04" },
  { href: "/manufacturing", label: "Manufacturing", sub: "05" },
  { href: "/about", label: "About", sub: "06" },
];

export function Nav({ locale }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openQuote } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: scrolled
            ? "color-mix(in oklab, var(--bg) 92%, transparent)"
            : "var(--bg)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: "1px solid var(--line)",
          transition: "all .2s ease",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          <Link href={`/${locale}`} style={{ display: "flex", padding: 0 }}>
            <Logo size={24} />
          </Link>

          <nav style={{ display: "flex", gap: 32 }} className="hide-sm">
            {NAV_ITEMS.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname === href || (item.href === "" && pathname === `/${locale}`);
              return (
                <Link
                  key={item.href + item.label}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    color: isActive ? "var(--ink)" : "var(--muted)",
                    padding: "4px 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                    }}
                  >
                    {item.sub}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              className="chip hide-sm"
              style={{ border: 0, padding: 0, gap: 8 }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--accent)",
                  borderRadius: "50%",
                }}
              />
              <span>EN</span>
            </div>
            <button
              onClick={openQuote}
              className="btn btn-primary btn-sm hide-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Request Quote
              <Arrow size={12} />
            </button>
            {/* Hamburger — mobile only */}
            <button
              className="show-sm"
              onClick={() => setMobileOpen(true)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                padding: "8px 4px",
                cursor: "pointer",
              }}
              aria-label="Open menu"
            >
              <span style={{ width: 22, height: 2, background: "var(--ink)", display: "block" }} />
              <span style={{ width: 22, height: 2, background: "var(--ink)", display: "block" }} />
              <span style={{ width: 14, height: 2, background: "var(--ink)", display: "block" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="nav-drawer" style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Link href={`/${locale}`} style={{ display: "flex" }}>
              <Logo size={22} />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: 24, lineHeight: 1, padding: 4, cursor: "pointer" }}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
            {NAV_ITEMS.map((item) => {
              const href = `/${locale}${item.href}`;
              const isActive = pathname === href || (item.href === "" && pathname === `/${locale}`);
              return (
                <Link
                  key={item.href + item.label}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "18px 0",
                    borderBottom: "1px solid var(--line)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: isActive ? "var(--ink)" : "var(--muted)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "var(--muted)",
                      width: 20,
                    }}
                  >
                    {item.sub}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => { setMobileOpen(false); openQuote(); }}
            className="btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 32,
              width: "100%",
              padding: "18px 24px",
              fontSize: 15,
            }}
          >
            Request Quote <Arrow />
          </button>
        </div>
      )}
    </>
  );
}
