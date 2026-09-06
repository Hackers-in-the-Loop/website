import { discordInvite } from "@/lib/urls";

export const siteConfig = {
  name: "Hackers in the Loop",
  shortName: "HITL",
  description:
    "An open-source hackerspace for the systems beneath agentic software.",
  xUrl: "https://x.com/iammrduncan",
  githubUrl: "https://github.com/Hackers-in-the-Loop",
  repositoryUrl: "https://github.com/Hackers-in-the-Loop/website",
  issuesUrl: "https://github.com/Hackers-in-the-Loop/website/issues",
  discordUrl: discordInvite(process.env.NEXT_PUBLIC_DISCORD_URL),
} as const;

export const navigation = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/stack", label: "The work" },
  { href: "/community", label: "Community" },
] as const;

// These are project briefs, not release or availability claims. Add repository
// links after their public location and stewardship have been confirmed.
export const workingProjects = [
  {
    id: "threaded",
    name: "Threaded",
    kind: "Agent runtimes",
    description: "Orchestration you can follow, interrupt, and change.",
    detail:
      "Composable execution paths, explicit state, and places for people to intervene in agentic work.",
    question:
      "Can you explain what an agent did, and change what happens next?",
    experiment:
      "Trace a task through planning, tool use, and a failure. Sketch where you would inspect state, pause execution, or retry. Share the trace and the part you could not explain.",
  },
  {
    id: "like-wasm",
    name: "like-wasm",
    kind: "Portable components",
    description: "Small pieces that travel between systems.",
    detail:
      "Experiments with WebAssembly components, explicit interfaces, and portable execution beneath agent software.",
    question: "What should a component know about the system that runs it?",
    experiment:
      "Take one small tool and list its inputs, outputs, filesystem access, and network needs. Describe the minimum interface another runtime would need to run it.",
  },
  {
    id: "credential-gateway",
    name: "Credential Gateway",
    kind: "Authority & access",
    description:
      "Give a task the authority it needs. Keep control of the rest.",
    detail:
      "Scoped credentials, deliberate delegation, and a record of how tools use the access they receive.",
    question:
      "How does a person grant, inspect, and revoke an agent’s authority?",
    experiment:
      "Map the permissions for a single tool call using mock credentials. Identify who grants access, when it expires, and what should happen if it is revoked mid-task.",
  },
  {
    id: "fxclaw",
    name: "fxclaw",
    kind: "Applied systems",
    description: "Find the rough edges by building on the stack.",
    detail:
      "An application of open agent infrastructure, exploring what the underlying primitives make possible and where they get in the way.",
    question: "Which abstractions survive contact with an actual workflow?",
    experiment:
      "Describe a workflow from the user’s intent to its final result. Note every place the user needs visibility, a decision, or a way to recover from a mistake.",
  },
  {
    id: "agent-dsl",
    name: "Agent DSL research",
    kind: "Languages & research",
    description: "Make behavior easier to express and reason about.",
    detail:
      "Programming models for describing agent behavior, coordinating work, and making control flow legible.",
    question: "What belongs in a language, and what belongs in a runtime?",
    experiment:
      "Write the same small workflow as plain language and pseudocode. Include a timeout and a human decision. Compare what each version makes explicit or leaves ambiguous.",
  },
  {
    id: "kernel-engine",
    name: "Kernel Engine",
    kind: "Hardware & performance",
    description: "Understand the machine. Make more of what we have.",
    detail:
      "GPU kernels, older hardware, memory movement, and performance experiments grounded in measurement.",
    question:
      "Where does the time go, and can someone else reproduce the result?",
    experiment:
      "Benchmark one small operation on hardware you can access. Record the machine, software versions, input size, and warm-up method. Publish the slow result as carefully as the fast one.",
  },
] as const;

export const featuredProjects = workingProjects.filter((project) =>
  ["threaded", "like-wasm", "credential-gateway", "kernel-engine"].includes(
    project.id,
  ),
);
