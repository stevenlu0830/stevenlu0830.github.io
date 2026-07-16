import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out for GitHub Pages (no Node server there).
  output: "export",
  // The default image optimizer needs a server, which Pages doesn't provide.
  images: { unoptimized: true },
};

export default nextConfig;
