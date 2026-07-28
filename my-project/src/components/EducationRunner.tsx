"use client";

import Image from "next/image";
import { useInstall } from "./InstallContext";
import { CodeCell, ImportCode, NameErrorLine } from "./codecell";
import { EDUCATION } from "@/data/education";

export default function EducationRunner() {
  const { installed, educationOutput, setEducationOutput } = useInstall();
  const run = () => setEducationOutput(installed ? "ok" : "error");

  return (
    <section id="education" className="mt-20">
      <CodeCell
        onRun={run}
        output={
          educationOutput === "ok" ? (
            <div className="space-y-4">
              {EDUCATION.map((e) => (
                <div key={e.school} className="flex items-center gap-4">
                  <Image
                    src={e.logo}
                    alt={e.school}
                    width={64}
                    height={64}
                    unoptimized
                    className="h-16 w-16 shrink-0 rounded bg-white object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[var(--fn)]">{e.school}</p>
                    <p className="text-[var(--muted)]">{e.degree}</p>
                    <p className="text-[var(--muted)]">{e.years}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : educationOutput === "error" ? (
            <NameErrorLine name="Education" />
          ) : undefined
        }
      >
        <ImportCode cls="Education" variable="education" />
      </CodeCell>
    </section>
  );
}
