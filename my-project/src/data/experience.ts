export type Job = {
  slug: string;
  title: string;
  org: string;
  meta: string;
  logo: string;
  bullets: string[];
};

export const EXPERIENCE: Job[] = [
  {
    slug: "fano-labs",
    title: "Software Engineering Intern",
    org: "Fano Labs · Co-op",
    meta: "Jun 2026 – Present · Hong Kong SAR · Hybrid",
    logo: "/org-logo/fano-labs-exp.png",
    bullets: [
      "Built a FastAPI service that serves a PyTorch deepfake-detection model through REST and WebSocket endpoints, with Pydantic-validated schemas, auto-generated OpenAPI docs and limits on how many requests run at once.",
      "Built a browser interface that sends uploaded audio to a REST endpoint and shows the verdict and each segment's fake probability on an interactive timeline, with an adjustable decision threshold.",
      "Built real-time synthetic voice detection that streams live microphone audio over WebSocket using the Web Audio API and returns an updated verdict for every segment of speech.",
      "Wrote 110+ pytest unit and integration tests for the REST API and WebSocket streaming protocol, covering upload size limits, malformed and undecodable audio, concurrency caps and error responses.",
      "Built Fano Bot Joiner, a full-stack web console using React, Vite, Fastify for scheduling meeting bots, setting auto-leave rules and metadata, tracking bot status, and playing back or downloading meeting recordings.",
      "Delivered real-time bot status via Server-Sent Events (SSE), using a single shared long-poll of the control plane's event feed across all open browser tabs to keep database load flat as user connections grow.",
      "Implemented single sign-on (SSO) across Fano Bot Joiner and Fano Meeting Agent with Keycloak and OpenID Connect, including automatic token refresh and back-channel logout.",
      "Containerized and deployed the console to Kubernetes on AWS with a multi-stage Docker image, a Helm chart and an Ingress path on a shared host, with images built by a Jenkins CI pipeline.",
      "Wrote 270+ Vitest unit and integration tests, including a mock OpenID provider used to test sign-in, token refresh and logout end to end.",
    ],
  },
  {
    slug: "dyna-ai",
    title: "Artificial Intelligence Engineer",
    org: "Dyna.Ai · Internship",
    meta: "Jun 2025 – Jul 2025 · Hong Kong SAR · On-site",
    logo: "/org-logo/dyna-ai-exp.png",
    bullets: [
      "Led the integration of LLMs into business processes such as credit card marketing and HR recruitment to streamline workflows, enable automation and reduce human effort.",
      "Compared the performance of AI agent studios using Dyna's AI Agent Builder Platform, leveraging knowledge management, knowledge space, and character configuration to evaluate effectiveness and optimize outcomes.",
      "Collaborated with a banking client to gather, track, and regularly refine user requirements, ensuring alignment between business needs and AI solution design.",
    ],
  },
  {
    slug: "private-tutor",
    title: "Private Tutor",
    org: "Self-employed",
    meta: "",
    logo: "/org-logo/person.webp",
    bullets: [],
  },
];
