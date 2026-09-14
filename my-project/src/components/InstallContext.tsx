"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { SKILLS } from "@/data/skills";

type AboutOutput = null | "intro" | "error";
type ExperienceOutput = null | "cards" | "error";
type ProjectsOutput = null | "grid" | "error";
type SimpleOutput = null | "ok" | "error";
type MultiOutputs = Record<string, "ok" | "error">;

type CellCtx = {
  installed: boolean;
  install: () => void;
  // Runs every cell in order, staggered 0.25s apart (top to bottom).
  runAll: () => void;
  aboutOutput: AboutOutput;
  setAboutOutput: (v: AboutOutput) => void;
  experienceOutput: ExperienceOutput;
  setExperienceOutput: (v: ExperienceOutput) => void;
  projectsOutput: ProjectsOutput;
  setProjectsOutput: (v: ProjectsOutput) => void;
  // Technical Skills: whether the first cell defined `tech_skills`, plus each
  // cell's output keyed by category.
  techDefined: boolean;
  setTechDefined: (v: boolean) => void;
  techOutputs: MultiOutputs;
  setTechOutputs: Dispatch<SetStateAction<MultiOutputs>>;
  // Single-cell sections
  educationOutput: SimpleOutput;
  setEducationOutput: (v: SimpleOutput) => void;
  coursesOutput: SimpleOutput;
  setCoursesOutput: (v: SimpleOutput) => void;
  certsOutput: SimpleOutput;
  setCertsOutput: (v: SimpleOutput) => void;
  volunteeringOutput: SimpleOutput;
  setVolunteeringOutput: (v: SimpleOutput) => void;
};

const Ctx = createContext<CellCtx>({
  installed: false,
  install: () => {},
  runAll: () => {},
  aboutOutput: null,
  setAboutOutput: () => {},
  experienceOutput: null,
  setExperienceOutput: () => {},
  projectsOutput: null,
  setProjectsOutput: () => {},
  techDefined: false,
  setTechDefined: () => {},
  techOutputs: {},
  setTechOutputs: () => {},
  educationOutput: null,
  setEducationOutput: () => {},
  coursesOutput: null,
  setCoursesOutput: () => {},
  certsOutput: null,
  setCertsOutput: () => {},
  volunteeringOutput: null,
  setVolunteeringOutput: () => {},
});

// Holds the interactive code-cell state (pip installed, About / Experience
// outputs). Rendered in the ROOT LAYOUT, so the state survives client-side
// navigation (detail page → back) but is in-memory only — a full page refresh
// remounts the layout and resets every cell to "not run".
export function InstallProvider({ children }: { children: ReactNode }) {
  const [installed, setInstalled] = useState(false);
  const [aboutOutput, setAboutOutput] = useState<AboutOutput>(null);
  const [experienceOutput, setExperienceOutput] =
    useState<ExperienceOutput>(null);
  const [projectsOutput, setProjectsOutput] = useState<ProjectsOutput>(null);
  const [techDefined, setTechDefined] = useState(false);
  const [techOutputs, setTechOutputs] = useState<MultiOutputs>({});
  const [educationOutput, setEducationOutput] = useState<SimpleOutput>(null);
  const [coursesOutput, setCoursesOutput] = useState<SimpleOutput>(null);
  const [certsOutput, setCertsOutput] = useState<SimpleOutput>(null);
  const [volunteeringOutput, setVolunteeringOutput] =
    useState<SimpleOutput>(null);

  // Run every cell top-to-bottom, each 0.25s after the previous one.
  const runAll = () => {
    const markTech = (category: string) =>
      setTechOutputs((prev) => ({ ...prev, [category]: "ok" }));

    const steps: (() => void)[] = [
      () => setInstalled(true), // pip install
      () => setAboutOutput("intro"),
      () => setExperienceOutput("cards"),
      () => setProjectsOutput("grid"),
      () => {
        setTechDefined(true);
        markTech(SKILLS[0].category);
      },
      ...SKILLS.slice(1).map((g) => () => markTech(g.category)),
      () => setEducationOutput("ok"),
      () => setCoursesOutput("ok"),
      () => setCertsOutput("ok"),
      () => setVolunteeringOutput("ok"),
    ];
    steps.forEach((step, i) => setTimeout(step, i * 250));
  };

  return (
    <Ctx.Provider
      value={{
        installed,
        install: () => setInstalled(true),
        runAll,
        aboutOutput,
        setAboutOutput,
        experienceOutput,
        setExperienceOutput,
        projectsOutput,
        setProjectsOutput,
        techDefined,
        setTechDefined,
        techOutputs,
        setTechOutputs,
        educationOutput,
        setEducationOutput,
        coursesOutput,
        setCoursesOutput,
        certsOutput,
        setCertsOutput,
        volunteeringOutput,
        setVolunteeringOutput,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useInstall = () => useContext(Ctx);
