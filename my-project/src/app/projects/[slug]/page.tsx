import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { PROJECTS } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return { title: project ? `${project.name} · Steven Lu` : "Steven Lu" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div>
      <BackButton fallback="/#projects" label="Back to Projects" />

      <main className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-3xl font-bold text-[#dcdcaa]">{project.name}</h1>
        <p className="mt-3 text-sm text-[#9ddcff]">{project.dates}</p>

        <section className="mt-10">
          <div className="mt-4 space-y-4 leading-relaxed text-[#dea893]">
            <p>{project.context}</p>
            <p>{project.description}</p>
            <ul className="space-y-3">
              {project.bullets.map((b) => (
                <li key={b}>
                  <span aria-hidden="true">- </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <span
                key={s}
                className="inline-block rounded border border-border bg-surface px-2 py-0.5 text-xs text-[#9ddcff]"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
