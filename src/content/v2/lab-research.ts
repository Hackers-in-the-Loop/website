// The kinds of research the Lab runs, each linked to the projects that do it
// (ids from src/content/lab-projects.ts).
export const researchAreas: { kicker: string; title: string; copy: string; projects: string[] }[] = [
  {
    kicker: "Inference",
    title: "Big models on affordable GPUs.",
    copy: "Can a modern 27-billion-parameter model run fast on a GPU from 2016? We write custom kernels to find out, and time every change.",
    projects: ["p100-engine", "gpu-bench"],
  },
  {
    kicker: "Quantization",
    title: "Smaller, and still smart.",
    copy: "Shrinking a model is easy. Keeping it good is the research. Every quantized model is checked against its full-precision original.",
    projects: ["p100-pn-quant"],
  },
  {
    kicker: "Automated research",
    title: "Research that keeps running.",
    copy: "Agents propose changes; code they can't touch measures, judges and keeps the best. Many experiments run at once, across the Lab's GPUs.",
    projects: ["thermite"],
  },
  {
    kicker: "Agents",
    title: "The tools agents work in.",
    copy: "Running, watching and steering coding agents across a fleet of machines, with a person approving what matters.",
    projects: ["magnesium"],
  },
  {
    kicker: "Hardware",
    title: "Small devices and custom silicon.",
    copy: "Agents on ESP32 boards, a clusterable board for swarms of tiny agents, and model weights encoded directly in FPGA logic.",
    projects: ["agent-blade", "fpga-inference", "wrist-pet"],
  },
  {
    kicker: "Learning",
    title: "Teaching what we learn.",
    copy: "Free books and short animated lessons that turn the Lab's experiments into explanations, from how a model works to building silicon for one.",
    projects: ["learning-hub"],
  },
];
