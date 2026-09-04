export const siteConfig = {
  name: "Hackers in the Loop",
  shortName: "HITL",
  description: "Open source for agentic systems.",
  xUrl: "https://x.com/iammrduncan",
  discordUrl:
    process.env.NEXT_PUBLIC_DISCORD_URL?.trim() || "/community#join",
} as const;

export const navigation = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/stack", label: "Stack" },
  { href: "/community", label: "Community" },
] as const;

export const stackProjects = [
  {
    name: "Threaded",
    kind: "Agent runtime",
    description: "Composable orchestration and visible execution paths.",
  },
  {
    name: "like-wasm",
    kind: "Runtime primitive",
    description: "Portable, inspectable components for agent systems.",
  },
  {
    name: "Credential Gateway",
    kind: "Access layer",
    description: "Human-directed credentials and controlled delegation.",
  },
  {
    name: "Kernel Engine",
    kind: "Open bench",
    description: "Custom GPU kernels, old hardware, and first principles.",
  },
] as const;

export const workingProjects = [
  {
    name: "Threaded",
    status: "Active",
    kind: "Agent runtime",
    description:
      "Composable orchestration for agentic work, with visible execution paths and deliberate human intervention.",
  },
  {
    name: "like-wasm",
    status: "Active",
    kind: "Runtime primitive",
    description:
      "Experiments in portable, inspectable components that can move cleanly through an agent system.",
  },
  {
    name: "Credential Gateway",
    status: "Active",
    kind: "Access layer",
    description:
      "A boundary for human-directed credentials, controlled delegation, and auditable tool access.",
  },
  {
    name: "fxclaw",
    status: "Ecosystem",
    kind: "Applied system",
    description:
      "An application built on the same open agent infrastructure—and a proving ground for the stack.",
  },
  {
    name: "Agent DSL research",
    status: "Research",
    kind: "Languages",
    description:
      "Exploring languages and abstractions that make agent behavior easier to express, inspect, and compose.",
  },
  {
    name: "Kernel Engine",
    status: "On the bench",
    kind: "Systems",
    description:
      "Custom GPU kernels, older hardware, and first-principles performance work—starting with a rack of P100s.",
  },
] as const;

export const upstreamAreas = [
  {
    name: "Runtimes & model tools",
    description:
      "The open runtimes, model interfaces, evaluation tools, and observability layers our work depends on.",
  },
  {
    name: "Languages & compilers",
    description:
      "Compilers, interpreters, DSLs, and component systems that make agent software portable and understandable.",
  },
  {
    name: "Systems & hardware",
    description:
      "GPU tooling, kernels, isolation, and low-level infrastructure for keeping the whole stack hackable.",
  },
  {
    name: "Community infrastructure",
    description:
      "The documentation, collaboration, and open-source tools that help people build and learn together.",
  },
] as const;
