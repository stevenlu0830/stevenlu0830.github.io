"use client";

import { useInstall } from "./InstallContext";
import { ExperienceCard } from "./cards";
import { EXPERIENCE } from "@/data/experience";

export default function ExperienceRunner() {
  const { installed, experienceOutput: output, setExperienceOutput } =
    useInstall();

  const run = () => setExperienceOutput(installed ? "cards" : "error");

  return (
    <section id="experience" className="mt-20">
      <div className="rounded border border-border bg-surface">
        {/* read-only 3-line code + Run button */}
        <div className="flex items-center gap-3 px-4 py-3">
          <code className="flex-1 select-none text-sm leading-relaxed">
            <span className="block">
              <span className="text-[#c586c0]">from </span>
              <span className="text-[#4fc9af]">stevenlu0830</span>
              <span className="text-[#c586c0]"> import </span>
              <span className="text-[#4fc9af]">Experience</span>
            </span>
            <span className="block">&nbsp;</span>
            <span className="block">
              <span className="text-[#9ddcff]">experience</span>
              <span className="text-[#dddddd]"> = </span>
              <span className="text-[#4fc9af]">Experience</span>
              <span className="text-[#ffd800]">()</span>
            </span>
            <span className="block">
              <span className="text-[#9ddcff]">experience</span>
              <span className="text-[#dddddd]">.</span>
              <span className="text-[#dcdcaa]">display</span>
              <span className="text-[#ffd800]">()</span>
            </span>
          </code>
          <button
            type="button"
            onClick={run}
            className="shrink-0 rounded border border-border px-3 py-1 text-sm text-[#dddddd] transition-colors hover:border-[#4fc9af]"
          >
            ▶ Run
          </button>
        </div>

        {/* simulated output: the experience buttons, or a NameError */}
        {output && (
          <div className="border-t border-border bg-background px-4 py-3 text-sm leading-relaxed">
            {output === "cards" ? (
              <div className="space-y-4">
                {EXPERIENCE.map((job) => (
                  <ExperienceCard key={job.slug} job={job} />
                ))}
              </div>
            ) : (
              <p>
                <span className="text-[#d670d6]">NameError</span>
                <span className="text-[#dddddd]">: </span>
                <span className="text-[#c152be]">
                  name &apos;Experience&apos; is not defined
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
