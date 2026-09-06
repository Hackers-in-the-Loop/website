export const manifesto = {
  title: "Keep intelligence hackable.",
  introduction: [
    "Agentic software is becoming an execution layer between human intent and machine action. That layer will decide what systems can see, which tools they can use, how they spend authority, and whether anyone can understand what happened afterward.",
    "We think that layer should be built in the open.",
  ],
  principles: [
    {
      id: "show-the-mechanism",
      title: "We reject sealed intelligence.",
      practice:
        "Publish the mechanism, its limits, and an example someone else can run.",
      body: [
        "A model is only one part of an agentic system. The consequential machinery lives around it: runtimes, memory, tools, credentials, protocols, evaluators, schedulers, and interfaces.",
        "When that machinery is hidden, people cannot inspect it, adapt it, repair it, or meaningfully trust it. We want visible mechanisms instead of magic boxes.",
      ],
    },
    {
      id: "people-in-the-architecture",
      title: "People belong in the architecture.",
      practice:
        "Make authority explicit. Give people a way to inspect, interrupt, and recover.",
      body: [
        "Human-in-the-loop cannot be a checkbox added after the system is built. Human agency should shape permissions, execution boundaries, review points, reversibility, and accountability from the beginning.",
        "Agents should extend a person’s ability to act—not make responsibility disappear.",
      ],
    },
    {
      id: "composability",
      title: "Composability beats captivity.",
      practice:
        "Document interfaces and make it possible to replace a part without rebuilding the whole.",
      body: [
        "We prefer small primitives, explicit interfaces, portable components, and replaceable parts. Good infrastructure lets people understand one layer without asking permission from the layer above it.",
        "The best agent stack is not one stack. It is a commons of pieces that can be tested, recombined, and improved.",
      ],
    },
    {
      id: "open-source-in-practice",
      title: "Open source is a way of working.",
      practice:
        "Leave decisions, examples, and useful failures somewhere others can find them.",
      body: [
        "Publishing code is the beginning, not the end. We work in public, document the mechanism, expose the tradeoffs, share the failures, and make room for someone else to carry the idea further.",
        "A contribution is not only a pull request. It can be a careful question, a reproducible bug, a benchmark, a design critique, a tutorial, or help given to the next person.",
      ],
    },
    {
      id: "every-layer",
      title: "Every layer is worth hacking.",
      practice:
        "Follow a question across layers. Explain the connections you discover.",
      body: [
        "We care about orchestration and language design. We care about credentials and isolation. We care about WASM components, protocols, kernels, memory movement, and old GPUs made useful again.",
        "The seams between layers are where new systems become possible. We refuse the idea that some layers are too low, too hard, or too unfashionable to explore.",
      ],
    },
    {
      id: "first-principles",
      title: "First principles still matter.",
      practice:
        "State what you measured, how you measured it, and what you still do not know.",
      body: [
        "We use existing tools when they earn their place. We rebuild when understanding the machinery is the point. We measure before we declare victory.",
        "The goal is not novelty for its own sake. The goal is knowledge that survives a framework cycle.",
      ],
    },
    {
      id: "help-is-infrastructure",
      title: "Help is infrastructure.",
      practice:
        "Answer with context, make room for beginners, and give credit for work that helps others.",
      body: [
        "Communities compound capability when people can ask honest questions, show unfinished work, cross disciplines, and receive serious feedback without performance or posturing.",
        "We want the person learning agent runtimes today to help someone understand kernels tomorrow—and to be helped in return.",
      ],
    },
    {
      id: "earned-trust",
      title: "Trust is earned through work.",
      practice:
        "Pair a claim with evidence. Make it easy for someone else to challenge the result.",
      body: [
        "We choose demonstrations over declarations, reproducibility over spectacle, and durable systems over launch-day theater.",
        "We will be ambitious about what agentic systems can become and rigorous about how they get there.",
      ],
    },
  ],
  closing: [
    "Hackers in the Loop is a workshop, not a pedestal. Bring a difficult problem, a strange machine, an unfinished tool, or a question that refuses to go away.",
    "Understand the system. Improve the system. Share what you learn.",
  ],
} as const;
