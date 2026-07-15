import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPERIENCE } from "@/data/experience";

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
      <Link
        href="/#experience"
        aria-label="Back to Experience"
        className="fixed left-6 top-6 text-3xl text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden="true">←</span>
      </Link>

      <main className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-3xl font-bold text-[#dcdcaa]">{job.title}</h1>
        <p className="mt-3 text-[#9ddcff]">{job.org}</p>
        <p className="mt-1 text-sm text-[#9ddcff]">{job.meta}</p>

        {job.bullets.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-[#dcdcaa]">
              Job Description
            </h2>
            <ul className="mt-4 space-y-3 leading-relaxed text-[#dea893]">
              {job.bullets.map((b) => (
                <li key={b}>
                  <span aria-hidden="true" className="text-accent">
                    -{" "}
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
