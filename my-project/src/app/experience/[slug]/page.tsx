import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { EXPERIENCE } from "@/data/experience";

// 1 → "1st", 2 → "2nd", 3 → "3rd", 4 → "4th", 11 → "11th", 21 → "21st", ...
function ordinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-4 space-y-3 leading-relaxed text-[var(--foreground)]">
      {bullets.map((b) => (
        <li key={b}>
          <span aria-hidden="true" className="text-[var(--foreground)]">
            -{" "}
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export function generateStaticParams() {
  return EXPERIENCE.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = EXPERIENCE.find((j) => j.slug === slug);
  return { title: job ? `${job.title} · Steven Lu` : "Steven Lu" };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = EXPERIENCE.find((j) => j.slug === slug);
  if (!job) notFound();

  return (
    <div>
      <BackButton fallback="/#experience" label="Back to Experience" />

      <main className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-3xl font-bold text-[var(--fn)]">{job.title}</h1>
        <p className="mt-3 text-[var(--muted)]">{job.org}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{job.meta}</p>

        {job.bullets.length > 0 && (
          <section className="mt-10">
            <BulletList bullets={job.bullets} />
          </section>
        )}

        {job.projects?.map((project, i) => (
          <section key={project.name} className="mt-10">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              {ordinal(i + 1)} Project: {project.name}
            </h2>
            <BulletList bullets={project.bullets} />
          </section>
        ))}
      </main>
    </div>
  );
}
