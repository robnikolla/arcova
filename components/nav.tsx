"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./ui/logo";
import { Arrow } from "./ui/arrow";

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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
          <Link
            href={`/${locale}/contact`}
            className="btn btn-primary btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Request Quote
            <Arrow size={12} />
          </Link>
        </div>
      </div>
    </header>
  );
}
