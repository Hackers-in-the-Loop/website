// Editorial project records, not a scheduler or live utilization feed.
// Resource descriptions come from the September 12 build guide. Update these
// records when the operator confirms allocations or publishes a new result.
export const labProjects = [
  {
    id: "agent-blade", name: "Agent Blade", stage: "Experimental hardware",
    question: "How much of an agent’s execution and state can live on small, low-power devices?",
    description: "A custom PCB experiment for running agent harnesses and parallel workloads across ESP32 nodes. Board design and software are experimental.",
    resources: ["6 × ESP32-S3 + 3 × ESP32-P4", "9 × 16 GB SD NAND; 144 GB distributed storage"],
    allocation: "Experimental board configuration; scheduled allocations are not published.",
  },
  {
    id: "gpu-bench", name: "GPU comparison bench", stage: "Bench experiments",
    question: "What can different generations of GPU hardware and their software support make possible?",
    description: "A swappable test bench for comparing cards without building a separate machine for each one.",
    resources: ["GMKtec K15 + MINISFORUM DEG2 dock", "One P100 16 GB, V100 32 GB, BC-160 8 GB, or Radeon VII 16 GB at a time", "2 TB dock NVMe; dedicated PSU and GPU cooling"],
    allocation: "Shared physical bench; current card and booked hours are not published.",
  },
] as const;
