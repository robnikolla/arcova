import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectsClient } from "./projects-client";
import { PROJECTS } from "./data";

export const metadata: Metadata = {
  title: "Projects — Openings in the European Built Fabric",
  description:
    "Eight completed projects across Austria, Germany, Slovenia, Croatia and Czech Republic — residential, commercial, and hospitality.",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Nav locale={locale} />
      <main>
        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="container" style={{ padding: "64px var(--pad-x) 56px" }}>
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              <span className="num">01 / PROJECTS</span>
              <span className="dot" />
              <span>{PROJECTS.length} completed · 2020–2025</span>
            </div>
            <h1
              style={{ textWrap: "balance", maxWidth: 1000 } as React.CSSProperties}
            >
              Openings in the
              <br />
              European built fabric.
            </h1>
          </div>
        </section>

        <ProjectsClient locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
