"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type InstallCtx = { installed: boolean; install: () => void };

const Ctx = createContext<InstallCtx>({ installed: false, install: () => {} });

// Shares the "stevenlu0830 is pip-installed" flag between the pip cell (home)
// and the About cell, so About only "runs" after the user installs.
export function InstallProvider({ children }: { children: ReactNode }) {
  const [installed, setInstalled] = useState(false);
  return (
    <Ctx.Provider value={{ installed, install: () => setInstalled(true) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useInstall = () => useContext(Ctx);
