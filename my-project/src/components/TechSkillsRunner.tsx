"use client";

import { useInstall } from "./InstallContext";
import { SKILLS } from "@/data/skills";

// Renders the Python-style list-of-strings output, one item per line with
// later lines indented to sit under the first item (like pprint).
function SkillListOutput({ items }: { items: string[] }) {
  return (
    <div className="text-[var(--cli)]">
      {items.map((item, i) => (
        <div key={item} className="whitespace-nowrap">
          {i === 0 ? "[" : " "}
          {`"${item}"`}
          {i === items.length - 1 ? "]" : ","}
        </div>
      ))}
    </div>
  );
}

function ErrorLine({ name }: { name: string }) {
  return (
    <p>
      <span className="text-[var(--errname)]">NameError</span>
      <span className="text-[var(--cli)]">: </span>
      <span className="text-[var(--errmsg)]">
        name &apos;{name}&apos; is not defined
      </span>
    </p>
  );
}

export default function TechSkillsRunner() {
  const { installed, techDefined, setTechDefined, techOutputs, setTechOutputs } =
    useInstall();

  // First cell: imports TechnicalSkills and defines tech_skills (only if pip
  // was installed). Follow-up cells only work once tech_skills is defined.
  const runFirst = (category: string) => {
    if (installed) setTechDefined(true);
    setTechOutputs((prev) => ({
      ...prev,
      [category]: installed ? "ok" : "error",
    }));
  };

  const runFollow = (category: string) => {
    setTechOutputs((prev) => ({
      ...prev,
      [category]: techDefined ? "ok" : "error",
    }));
  };

  return (
    <section id="skills" className="mt-20 space-y-6">
      {SKILLS.map((group, idx) => {
        const isFirst = idx === 0;
        const output = techOutputs[group.category];
        return (
          <div key={group.category}>
            {/* Run button — above the box, right-aligned */}
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  isFirst ? runFirst(group.category) : runFollow(group.category)
                }
                className="rounded border border-border px-3 py-1 text-sm text-[var(--cli)] transition-colors hover:border-[var(--accent)]"
              >
                ▶ Run
              </button>
            </div>
            <div className="rounded border border-border bg-surface">
            {/* read-only code — scrolls horizontally instead of wrapping */}
            <div className="overflow-x-auto px-4 py-3">
              <code className="block select-none whitespace-nowrap text-sm leading-relaxed">
                {isFirst && (
                  <>
                    <span className="block">
                      <span className="text-[var(--keyword)]">from </span>
                      <span className="text-[var(--accent)]">stevenlu0830</span>
                      <span className="text-[var(--keyword)]"> import </span>
                      <span className="text-[var(--accent)]">TechnicalSkills</span>
                    </span>
                    <span className="block">&nbsp;</span>
                    <span className="block">
                      <span className="text-[var(--muted)]">tech_skills</span>
                      <span className="text-[var(--cli)]"> = </span>
                      <span className="text-[var(--accent)]">TechnicalSkills</span>
                      <span className="text-[var(--bracket)]">()</span>
                    </span>
                  </>
                )}
                {idx === 1 && (
                  <span className="block text-[var(--comment)]">
                    # Run the code box above before running the following five
                    code boxes
                  </span>
                )}
                <span className="block">
                  <span className="text-[var(--muted)]">tech_skills</span>
                  <span className="text-[var(--cli)]">.</span>
                  <span className="text-[var(--fn)]">display</span>
                  <span className="text-[var(--bracket)]">(</span>
                  <span className="text-[var(--foreground)]">
                    &apos;{group.category}&apos;
                  </span>
                  <span className="text-[var(--bracket)]">)</span>
                </span>
              </code>
            </div>

            {output && (
              <div className="overflow-x-auto border-t border-border px-4 py-3 text-sm leading-relaxed">
                {output === "ok" ? (
                  <SkillListOutput items={group.items} />
                ) : (
                  <ErrorLine name={isFirst ? "TechnicalSkills" : "tech_skills"} />
                )}
              </div>
            )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
