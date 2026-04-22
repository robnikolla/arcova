import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectDetailClient } from "./project-detail-client";
import { PROJECTS } from "../data";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.location} · ${project.year}`,
    description: `${project.architect} specified ${project.systems.join(" and ")} across ${project.openings} openings. Completed ${project.year}.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <>
      <Nav locale={locale} />
      <ProjectDetailClient project={project} locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
