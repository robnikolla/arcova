# Arcova Design System

This document is the source of truth for AI when building new pages, sections, or components. Follow it exactly — no deviations without explicit instruction.

---

## 1. Color Tokens

All colors are CSS variables. **Never use raw hex values in components.** Always reference the variable.

| Variable          | Commercial (default) | Minimal   | Industrial | Purpose                             |
| ----------------- | -------------------- | --------- | ---------- | ----------------------------------- |
| `--bg`            | `#F4F2EE`            | `#FAFAF7` | `#121210`  | Page background                     |
| `--bg-2`          | `#EAE7E1`            | `#F0EEE8` | `#1A1A18`  | Secondary sections, hover states    |
| `--ink`           | `#141414`            | `#0F0F0E` | `#F2EFE7`  | Primary text, borders, buttons      |
| `--ink-2`         | `#2B2B2B`            | `#2B2B2A` | `#D9D3C4`  | Secondary text                      |
| `--muted`         | `#6E6A62`            | `#7A766D` | `#8B8678`  | Labels, eyebrows, metadata          |
| `--line`          | `#D9D4CA`            | `#E2DED3` | `#2A2A26`  | Hairlines, section borders          |
| `--line-2`        | `#C6C0B3`            | `#CFC9BC` | `#3A3932`  | Input borders, chip borders         |
| `--accent`        | `#8A7A5C`            | `#111`    | `#C9A86A`  | Focus rings, dots, hover highlights |
| `--card`          | `#FFFFFF`            | `#FFFFFF` | `#1A1A18`  | Card backgrounds                    |
| `--placeholder`   | `#DED8CC`            | `#E4E0D5` | `#1F1F1C`  | Hatched placeholder stripe 1        |
| `--placeholder-2` | `#CFC8B8`            | `#D6D0C0` | `#262622`  | Hatched placeholder stripe 2        |

The **Commercial** concept is the default. Themes are switched by setting `data-concept="minimal"` or `data-concept="industrial"` on any ancestor element. Components automatically adapt since they only use CSS variables.

**Dark sections:** Use `background: var(--ink); color: var(--bg)` for inverted sections (like the Manufacturing block). Use `rgba(255,255,255,0.6)` for muted text inside dark sections — never `var(--muted)`.

---

## 2. Typography

### Font Families

```css
--f-display:
  var(--font-inter-tight), ui-sans-serif, system-ui,
  sans-serif --f-body: var(--font-inter-tight), ui-sans-serif, system-ui,
  sans-serif --f-mono: var(--font-jetbrains-mono), ui-monospace, Menlo,
  monospace --f-serif: var(--font-fraunces), Georgia,
  serif /* Minimal concept only */;
```

### Font Sizes

```css
--fs-display: clamp(48px, 7vw, 112px) /* h1 / hero headline */
  --fs-h1: clamp(36px, 4.2vw, 64px) /* h2 / section title */
  --fs-h2: clamp(28px, 2.6vw, 40px) /* h3 / subsection */ --fs-h3: 22px
  /* h4 / card title */ --fs-body: 16px --fs-small: 13px --fs-mono: 12px
  /* monospace labels */;
```

### Heading rules

- `h1–h4`: `font-weight: 600`, `letter-spacing: -0.02em`, `line-height: 1.02`, `margin: 0`
- Minimal concept: `h1`, `h2` use `var(--f-serif)` with `font-weight: 300`
- Use `textWrap: "balance"` on headings to prevent orphans

### Monospace / Eyebrow text rules

- All labels, eyebrows, chips, captions, table headers: `font-family: var(--f-mono)`
- Standard sizes: `10px`, `11px`, `12px` — never larger than `12px` for mono labels
- Always `text-transform: uppercase` + `letter-spacing: 0.1em` to `0.14em`
- Color: `var(--muted)` by default

---

## 3. Spacing & Layout

### Container

```tsx
<div className="container"> ... </div>
/* max-width: 1440px, padding: 0 clamp(20px, 4vw, 72px) */
```

Never set a container width manually. Always use `.container`.

### Section padding

- Large sections: `padding: "120px 0"` on `<section>`
- Medium sections: `padding: "80px 0"`
- Header/footer-type sections: `padding: "64px var(--pad-x)"`
- Stat/strip sections: `padding: "72px var(--pad-x)"`

### Borders between sections

```tsx
style={{ borderBottom: "1px solid var(--line)" }}
```

Use `var(--line)` for standard section dividers. `var(--line-2)` for stronger borders (inputs, chips, card outlines).

### Grid columns (common patterns)

| Pattern              | Template                     |
| -------------------- | ---------------------------- |
| 2-column equal       | `"1fr 1fr"`                  |
| 2-column wide-left   | `"1.2fr 1fr"` or `"2fr 1fr"` |
| 3-column             | `"repeat(3, 1fr)"`           |
| 4-column             | `"repeat(4, 1fr)"`           |
| 6-column (materials) | `"repeat(6, 1fr)"`           |
| Footer               | `"1.3fr 1fr 1fr 1fr"`        |

### Border radius

**Zero. No border-radius anywhere.** The design is sharp-cornered. `--radius: 0px`.

---

## 4. Component Inventory

### `<Arrow dir="right" size={14} />`

Internal SVG arrow. Used in buttons, links, product cards.

- `dir`: `"right"` (default) | `"left"` | `"up"` | `"down"`
- Import from `@/components/ui/arrow`

### `<Button variant="primary" size="default" arrow>`

Wraps the `.btn` CSS classes.

- `variant`: `"primary"` | `"ghost"` (default)
- `size`: `"default"` | `"sm"`
- `arrow`: adds an Arrow component automatically
- Import from `@/components/ui/button`

For link-as-button, use `<Link className="btn btn-primary">` directly with the CSS classes.

### `<Chip live>`

Small mono label. `live` adds accent color border.

- Import from `@/components/ui/chip`

### `<Eyebrow index="01" dot>`

Mono uppercase label with optional index number and accent dot.

- Import from `@/components/ui/eyebrow`

### `<Placeholder label="IMAGE" caption="..." aspect="4/3" src="...">`

Hatched image placeholder OR real image via `next/image`. Client component.

- `aspect`: any CSS aspect-ratio string (`"4/3"`, `"16/9"`, `"21/9"`, `"4/5"`)
- `src`: if provided, shows real image; falls back to hatch on error
- Import from `@/components/ui/placeholder`

### `<SectionHeader eyebrow="..." title="..." subtitle="..." index="01" rightSlot={...}>`

Standard section header with eyebrow, h2 title, optional subtitle, and optional right-side slot (usually a ghost button).

- Import from `@/components/ui/section-header`

### `<Logo size={28} showWord color="currentColor" />`

Brand lockup. `showWord=false` for icon-only.

- Import from `@/components/ui/logo`

### `<LogoMark size={40} color="currentColor" />`

SVG icon only.

- Import from `@/components/ui/logo`

### `<Nav locale="en" />` (Client Component)

Sticky header with scroll-blur effect, navigation links, language chip, quote CTA.

### `<Footer locale="en" />`

Full-width dark footer with logo, columns, legal strip.

---

## 5. CSS Utility Classes

These come from `globals.css` and are always available:

| Class                  | Effect                              |
| ---------------------- | ----------------------------------- |
| `.container`           | Max-width centered wrapper          |
| `.eyebrow`             | Mono uppercase label style          |
| `.btn`                 | Base button                         |
| `.btn-primary`         | Filled ink button                   |
| `.btn-ghost`           | Transparent border button           |
| `.btn-sm`              | Smaller padding/font                |
| `.chip`                | Small mono label border             |
| `.chip.live`           | Accent-colored chip                 |
| `.placeholder`         | Hatched image placeholder           |
| `.spec` (table)        | Spec/data table style               |
| `.segment`             | Segmented control                   |
| `.field`               | Form field wrapper                  |
| `.modal-backdrop`      | Full-screen blurred overlay         |
| `.modal`               | Modal container                     |
| `.grid-lines`          | 12-column grid overlay (decorative) |
| `.marquee`             | Infinite scroll strip               |
| `.marquee-item`        | Item inside marquee                 |
| `.ulink`               | Animated underline link             |
| `.prod-card`           | Card with lift-on-hover             |
| `.num`                 | Mono number style                   |
| `.vertical`            | Vertical rotated text               |
| `.hide-sm`             | Hidden at ≤820px                    |
| `.no-scrollbar`        | Hide scrollbar                      |
| `.between`             | `flex justify-between items-center` |
| `.flex`                | `display: flex`                     |
| `.col`                 | `flex-direction: column`            |
| `.gap-sm/md/lg/xl`     | Gap 8/16/32/64px                    |
| `.hairline-top/bottom` | 1px border                          |

---

## 6. Section Template

Every new section follows this pattern:

```tsx
<section style={{ borderBottom: "1px solid var(--line)", padding: "120px 0" }}>
  <div className="container">
    <SectionHeader
      index="XX"
      eyebrow="Short label"
      title="Main headline."
      subtitle="Optional supporting text, kept to 1–2 lines."
      rightSlot={
        <Link href="..." className="btn btn-ghost btn-sm">
          CTA <Arrow size={12} />
        </Link>
      }
    />
    {/* Section content */}
  </div>
</section>
```

---

## 7. Page Structure

Every page follows:

```tsx
<>
  <Nav locale={locale} />
  <main>
    {/* page header section */}
    {/* content sections */}
    {/* CTA band (optional) */}
  </main>
  <Footer locale={locale} />
</>
```

---

## 8. i18n

All user-facing strings live in `dictionaries/en.json`. To add strings:

1. Add the key to `dictionaries/en.json`
2. Load in the page: `const dict = await getDictionary(locale)`
3. Reference: `dict.section.key`

When more languages are added, create `dictionaries/de.json` etc. with the same structure. The `getDictionary` utility in `dictionaries/index.ts` handles lookup with English fallback.

---

## 9. SEO Pattern

For static pages:

```tsx
export const metadata: Metadata = {
  title: "Page Name",
  description: "...",
};
```

For dynamic pages (must await params in Next.js 16):

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} | Arcova` };
}
```

---

## 10. Do's and Don'ts

**Do:**

- Use CSS variables for all colors: `color: "var(--ink)"`, `background: "var(--bg)"`
- Use `.container` for every section's content wrapper
- Keep headings to `margin: 0` (CSS reset handles this)
- Use `text-transform: uppercase` + `letter-spacing` for all mono labels
- Use `<Link>` for navigation, `<a>` for external/download links
- Keep `border-radius: 0` on everything (no rounded corners)
- Await `params` in layout/page — Next.js 16 makes it a Promise

**Don't:**

- Don't hardcode hex colors inline — always use `var(--token)`
- Don't use `border-radius` (the brand is sharp-cornered)
- Don't use Tailwind color utilities like `text-gray-500` — use `color: "var(--muted)"`
- Don't add `margin` to headings — the reset sets them to 0
- Don't use `middleware.ts` — this project uses `proxy.ts` (Next.js 16)
- Don't create `app/page.tsx` at root — the proxy redirects `/` → `/en`
- Don't inline font-family strings — always use `var(--f-display)`, `var(--f-mono)` etc.
