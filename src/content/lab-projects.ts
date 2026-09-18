// Project descriptions and hardware assignments supplied by Shannon Duncan.
// These records describe work in progress, not reservations or live utilization.
export const projectsUpdated = "September 18, 2026";

export const projectGroups = [
  { id: "oss", name: "Open source software", label: "OSS" },
  { id: "gpu", name: "GPU & model research", label: "GPU work" },
  { id: "hardware", name: "Hardware experiments", label: "Hardware" },
  { id: "cluster", name: "Cluster infrastructure", label: "Cluster work" },
] as const;

export type LabProject = {
  id: string;
  group: (typeof projectGroups)[number]["id"];
  name: string;
  stage: string;
  description: string;
  resources: string[];
  target?: string;
  link?: { label: string; url: string };
  links?: { label: string; url: string }[];
  lead?: string;
};

export const labProjects: LabProject[] = [
  {
    id: "microwasm", group: "oss", name: "microWASM", stage: "In development",
    description: "Sandboxes and micro VMs built on WebAssembly, with durable state. The goal is fast, portable execution across machines and environments.",
    resources: ["MS-A2"],
  },
  {
    id: "threaded", group: "oss", name: "threaded", stage: "In development",
    description: "Combines microWASM and celld to multiplex agent deployments. Designed to scale from a single CPU machine to full cloud clusters.",
    resources: ["MS-A2"],
  },
  {
    id: "fxclaw", group: "oss", name: "fxClaw", stage: "In development",
    description: "An agent system in the vein of OpenClaw, Hermes, PicoClaw, and NanoClaw, built in Zig. It hosts agents natively through microWASM, with fx.sh as the default foundation.",
    resources: ["MS-A2"],
  },
  {
    id: "freeinferencing", group: "oss", name: "freeinferencing.com", stage: "Ongoing development",
    description: "Work on freeinferencing.com and its related open source projects.",
    resources: ["MS-A2"],
    link: { label: "Visit freeinferencing.com", url: "http://freeinferencing.com" },
  },
  {
    id: "zd-web-server", group: "oss", name: "ZD Web Server", stage: "In development",
    description: "Updating the ZD harness and editor to serve over the web, with a headless way to work with agent projects across the cluster.",
    resources: ["N150"],
  },
  {
    id: "typesafe-ai-benchmark", group: "oss", name: "TypeSafe AI Benchmark", stage: "Ongoing benchmarks",
    description: "Comparing structured-output approaches and model behavior. New benchmarks and models will be added as they become available.",
    resources: ["MacBook"],
    link: { label: "Explore the benchmark on GitHub", url: "https://github.com/iammrduncan/typesafe-ai-benchmark" },
  },
  {
    id: "esp32-needle-research", group: "oss", name: "ESP32 Needle 3 decode research", stage: "Active follow-on research",
    description: "Automating experiments to improve decode speed while retaining eight layers and checking that output quality does not regress. This work builds on the completed ESP32 Needle 3 project; a separate research branch is not public yet.",
    resources: ["Microbench", "pod-pi", "pi-autoresearch"],
    link: { label: "Explore the ESP32 Needle 3 repository", url: "https://github.com/iammrduncan/esp32-needle-3" },
  },
  {
    id: "gpu-bench", group: "gpu", name: "Practical Small Model Usage", stage: "Active research",
    description: "Getting useful, high-quality results from small models on memory-constrained systems. The research also explores mixtures of models and swarms of task-specific 500M-parameter models.",
    resources: ["DGX Spark", "GPU bench"],
    target: "Run 2B–30B-parameter models well on systems with 16 GB of memory or less. These are research goals, not published benchmarks.",
  },
  {
    id: "deepseek-flash", group: "gpu", name: "DeepSeek Flash 4.1", stage: "Active research",
    description: "Work on running DeepSeek Flash 4.1 across a pair of DGX Sparks.",
    resources: ["2 × DGX Spark"],
  },
  {
    id: "eight-gb-model-testing", group: "gpu", name: "8 GB model testing", stage: "Active research",
    description: "Testing quantized Ternary Bonsai 2 27B on memory-constrained hardware. Model fit, decoding speed, and output quality are questions for the experiment, not published results.",
    resources: ["BC-160", "GPU bench"],
    links: [
      { label: "Model files", url: "https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf" },
      { label: "Model announcement", url: "https://prismml.com/news/bonsai-2-27b" },
      { label: "PrismML post", url: "https://x.com/PrismML/status/2100692248480596348" },
    ],
  },
  {
    id: "agent-blade", group: "hardware", name: "Agent Blade", stage: "Prototype testing",
    description: "A clusterable board for swarms of agents. Autonomous agents and very small local models have run on ESP32 prototypes, with battery-powered operation intended to continue through internet or power outages. Current experiments include small SoCs, low-power GPUs mounted behind the blades, and older Android phones with 2–4 GB RAM as inference accelerators.",
    resources: ["Microbench", "First prototype: 6 × ESP32-S3 + 3 × ESP32-P4 on one PCB"],
    target: "Under $100 per blade board and under 200 W, preferably 30–100 W. Cost and power are design targets, not measured results.",
  },
  {
    id: "fpga-inference", group: "hardware", name: "FPGA model inference", stage: "Exploratory research",
    description: "Testing FPGA approaches to encoding model weights and tensor operations directly in hardware.",
    resources: ["Microbench / FPGA platforms"],
    target: "Explore whether a single card could eventually run a 12B-parameter model at around 13,000 tokens per second. This is a long-term ambition, not an achieved result.",
  },
  {
    id: "wrist-agent", group: "hardware", name: "An agent on your wrist", stage: "In development",
    description: "An ESP32-S3 watch or wrist-worn system designed to keep a personal autonomous agent with you.",
    resources: ["K15", "ESP32-S3 wearable"],
    target: "One autonomous agent running around the clock. Runtime and battery life are still being explored.",
  },
  {
    id: "wrist-pet", group: "hardware", name: "A tiny pet on your wrist", stage: "In development",
    description: "A Tamagotchi-style watch or wristband game Shannon is building with his daughter. She is designing it and working with Claude Code and an ESP32-S3 touchscreen to bring it to life.",
    resources: ["Microbench", "ESP32-S3 with touchscreen"],
    lead: "Shannon’s Daughter",
  },
  {
    id: "cluster-monitoring", group: "cluster", name: "Cluster monitoring & HUD", stage: "Setup in progress",
    description: "Setting up Prometheus, cluster monitoring, and the cluster HUD, with the N150 as the controller and head unit.",
    resources: ["N150 / controller", "Cluster HUD"],
  },
  {
    id: "gpu-cooling", group: "cluster", name: "GPU cooling shrouds", stage: "In development",
    description: "Building new cooling shrouds for the Lab’s P100, P4, and V100 cards.",
    resources: ["P100, P4, and V100 GPU cards"],
  },
  {
    id: "provisioning", group: "cluster", name: "Community provisioning", stage: "Planning",
    description: "Planning how to give people secure access through dynamic VLANs, virtual machines, and attached hardware. Isolation and provisioning arrangements are still being worked out.",
    resources: ["Cluster network, VM hosts, and attached hardware", "Specific allocations not yet set"],
  },
  {
    id: "litellm-gateway", group: "cluster", name: "LiteLLM gateway", stage: "Planned community access",
    description: "Preparing a gateway for models served from the cluster, including the DeepSeek Flash 4.1 work, so community members can try them using keys issued through compute grants.",
    resources: ["Cluster model-serving resources", "Gateway host not yet specified"],
    target: "Grant-based API access for community testing. The gateway and key distribution are not yet available.",
  },
];

export const completedProjects: LabProject[] = [
  {
    id: "pod-pi", group: "oss", name: "pod-pi", stage: "Completed",
    description: "Named, persistent Pi coding workspaces in rootless Podman containers. They can connect to a configured model provider, including models hosted on the DGX Sparks; pod-pi does not host a model server.",
    resources: ["Linux hosts", "Configured model provider, including DGX Sparks"],
    link: { label: "Explore pod-pi on GitHub", url: "https://github.com/Hackers-in-the-Loop/pod-pi" },
  },
  {
    id: "esp32-fx", group: "oss", name: "esp32-fx", stage: "Completed prototype",
    description: "Runs the fx coding agent on native Linux on an ESP32-S3. WAMR runs the fx WebAssembly core, and a Seeed reTerminal E1001 e-paper display shows the agent’s response. Model inference uses a remote provider.",
    resources: ["Microbench", "Seeed reTerminal E1001 with ESP32-S3"],
    link: { label: "Explore the esp32-fx source on GitHub", url: "https://github.com/iammrduncan/esp32-fx" },
  },
  {
    id: "esp32-needle-3", group: "oss", name: "ESP32 Needle 3", stage: "Completed prototype",
    description: "A Needle 3 agent running on ESP32 hardware. Follow-on decode-speed research continues separately on the active projects page.",
    resources: ["Microbench"],
    link: { label: "Explore ESP32 Needle 3 on GitHub", url: "https://github.com/iammrduncan/esp32-needle-3" },
  },
];
