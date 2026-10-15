// Project descriptions and hardware assignments supplied by Shannon Duncan.
// These records describe work in progress, not reservations or live utilization.
export const projectsUpdated = "October 15, 2026";

export const projectGroups = [
  { id: "oss", name: "Open source software", label: "OSS" },
  { id: "research", name: "Research infrastructure", label: "Research tools" },
  { id: "gpu", name: "GPU & model research", label: "GPU work" },
  { id: "hardware", name: "Hardware experiments", label: "Hardware" },
  { id: "books", name: "Books & learning", label: "Learning" },
] as const;

export type LabProject = {
  id: string;
  group: (typeof projectGroups)[number]["id"] | "cluster";
  name: string;
  stage: string;
  description: string;
  resources: string[];
  target?: string;
  link?: { label: string; url: string };
  links?: { label: string; url: string }[];
  lead?: string;
  // The main projects right now, highlighted at the top of the projects pages, with a one-line pitch.
  featured?: string;
};

export const labProjects: LabProject[] = [
  {
    id: "magnesium", group: "oss", name: "Magnesium", stage: "In development",
    featured: "One place to run and watch every coding agent, across every machine.",
    description: "One place to run and watch coding agents across a small fleet of machines: a web app for desktop and phone, backed by a server on each machine that runs agents. Every approval, question and failure lands in one feed, answered in place. It starts from T3 Code. The first goal is done: Claude Code and Codex threads with supervised approvals, where pairing is the only sign-in.",
    resources: ["Agent machines across the Lab"],
    link: { label: "Explore Magnesium on GitHub", url: "https://github.com/iammrduncan/magnesium" },
  },
  {
    id: "thermite", group: "research", name: "Thermite", stage: "In development",
    featured: "Many research campaigns at once. Agents propose; code they can't touch judges.",
    description: "An autoresearch harness that runs many research campaigns at once across the Lab's GPUs. Agents propose changes; code they can't touch measures, judges and keeps the best. It runs three kinds of campaign: climbing a metric under guard rails, working toward goals until they are met or shown impossible, and researching a topic for a set time. One dashboard shows and steers all of it.",
    resources: ["GPU server lanes", "Kubernetes work cluster"],
    target: "Its first planned campaign builds P100 engine support for the PN3 format. v1 runs locally; the Lab deployment is next.",
    link: { label: "Explore Thermite on GitHub", url: "https://github.com/iammrduncan/thermite" },
  },
  {
    id: "p100-engine", group: "gpu", name: "P100 engine", stage: "Active research",
    description: "Custom kernels that run Qwen3.8-27B, a modern 27-billion-parameter model, on one Tesla P100, an affordable data-centre GPU from 2016. An autoresearch loop proposes and screens kernel changes; a fixed harness times every run.",
    resources: ["Tesla P100", "DGX Spark pair for the research agents"],
    target: "At least 31 tokens per second without speculation and 40–60 with it, at 32K and 65K context. These are targets, not results.",
  },
  {
    id: "p100-pn-quant", group: "gpu", name: "P100 PN3/PN4 quantization", stage: "Active research",
    description: "Quantization formats built for the P100: PN3 and PN4, made from Qwen3.8-27B's original weights. Each one is checked against a full-precision baseline on KL divergence, perplexity, top-1 and top-5 token match, signal-to-noise, error, outlier activations and structured-output pass rate, so smaller never quietly means worse.",
    resources: ["DGX Spark", "Tesla P100"],
  },
  {
    id: "gpu-bench", group: "gpu", name: "Practical Small Model Usage", stage: "Active research",
    description: "Getting useful, high-quality results from small models on memory-constrained systems. The research also explores mixtures of models and swarms of task-specific 500M-parameter models.",
    resources: ["DGX Spark", "GPU bench"],
    target: "Run 2B–30B-parameter models well on systems with 16 GB of memory or less. These are research goals, not published benchmarks.",
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
    id: "wrist-pet", group: "hardware", name: "A tiny pet on your wrist", stage: "In development",
    description: "A Tamagotchi-style watch or wristband game Shannon is building with his daughter. She is designing it and working with Claude Code and an ESP32-S3 touchscreen. The separate wrist-agent idea has been folded into this project.",
    resources: ["Microbench", "ESP32-S3 with touchscreen"],
    lead: "Shannon’s Daughter",
  },
  {
    id: "learning-hub", group: "books", name: "Learning Hub", stage: "Live, growing",
    description: "Free books and short animated lessons at hackersintheloop.org/learn. It starts with From Models to Custom Silicon, a six-book series that goes from how modern AI models work to building hardware for them. Every chapter can be read on the web, downloaded as a PDF, or watched as short videos with Dabble the duck and Flit the moth.",
    resources: ["Lab experiments as real examples", "Writing, voice and animation pipeline"],
    target: "Book I, How Modern AI Models Work, has 2 of its 23 chapters published.",
    link: { label: "Visit the Learning Hub", url: "/learn/" },
  },
];

export const completedProjects: LabProject[] = [
  {
    id: "cluster-monitoring", group: "cluster", name: "Cluster monitoring & HUD", stage: "Completed",
    description: "Metrics, logs and dashboards for the whole Lab, with status screens on the rack.",
    resources: ["Lab controller", "Rack status displays"],
  },
  {
    id: "provisioning", group: "cluster", name: "Cluster provisioning", stage: "Completed",
    description: "Repeatable setup for the Lab's machines, virtual machines and Kubernetes clusters, with the isolation needed to run other people's work safely.",
    resources: ["Cluster network, VM hosts and attached hardware"],
  },
  {
    id: "litellm-gateway", group: "cluster", name: "LiteLLM gateway", stage: "Completed",
    description: "One gateway in front of every model the Lab serves, from the DGX Sparks and the GPU server, alongside cloud models. Each key sees only the models it is allowed to use.",
    resources: ["Cluster model-serving resources"],
  },
  {
    id: "eight-gb-model-testing", group: "gpu", name: "8 GB model testing", stage: "Completed research",
    description: "Tested a quantized Ternary Bonsai 2 27B on memory-constrained hardware: whether it fits, how fast it decodes, and how good its output stays.",
    resources: ["BC-160", "GPU bench"],
    links: [
      { label: "Model files", url: "https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf" },
      { label: "Model announcement", url: "https://prismml.com/news/bonsai-2-27b" },
    ],
  },
  {
    id: "gpu-bench-server", group: "gpu", name: "Updated GPU Bench", stage: "Completed build",
    description: "A 4U GPU server now holds eight data-centre GPUs, four V100s and four P100s, with 192 GB of GPU memory between them. It is the Lab's main GPU machine, and its P100s are Thermite's research lanes.",
    resources: ["4U GPU server", "4 × V100 32 GB", "4 × P100 16 GB"],
  },
  {
    id: "zd-web-server", group: "oss", name: "ZD Web Server", stage: "Abandoned",
    description: "Serving the ZD harness and editor over the web, with a headless way to work with agent projects across the cluster. Development stopped.",
    resources: ["N150"],
  },
  {
    id: "fxclaw", group: "oss", name: "fxClaw", stage: "Abandoned",
    description: "An agent system in the vein of OpenClaw, Hermes, PicoClaw and NanoClaw, built in Zig with fx.sh as its foundation. Development stopped.",
    resources: ["MS-A2"],
  },
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
    description: "A Needle 3 agent running on ESP32 hardware. The separate decode-speed research phase has also been completed.",
    resources: ["Microbench"],
    link: { label: "Explore ESP32 Needle 3 on GitHub", url: "https://github.com/iammrduncan/esp32-needle-3" },
  },
  {
    id: "deepseek-flash", group: "gpu", name: "DeepSeek Flash 4.1", stage: "Completed research",
    description: "The research phase using a pair of DGX Sparks is complete. Performance results have not been supplied for publication here.",
    resources: ["2 × DGX Spark"],
  },
  {
    id: "gpu-cooling", group: "cluster", name: "GPU cooling shrouds", stage: "Completed build",
    description: "Cooling shrouds for the Lab's P100, P4, and V100 cards are complete. Installation and measured cooling results have not been documented here.",
    resources: ["P100, P4, and V100 GPU cards"],
  },
  {
    id: "esp32-needle-research", group: "oss", name: "ESP32 Needle 3 decode research", stage: "Completed research",
    description: "A follow-on phase explored faster decode while retaining eight layers and checking output quality. The work is complete; performance findings have not been supplied for publication here.",
    resources: ["Microbench", "pod-pi", "pi-autoresearch"],
    link: { label: "Explore the ESP32 Needle 3 repository", url: "https://github.com/iammrduncan/esp32-needle-3" },
  },
  {
    id: "typesafe-ai-benchmark", group: "oss", name: "TypeSafe AI Benchmark", stage: "Completed",
    description: "A completed benchmark project comparing structured-output approaches and model behavior.",
    resources: ["MacBook"],
    link: { label: "Explore the benchmark on GitHub", url: "https://github.com/iammrduncan/typesafe-ai-benchmark" },
  },
  {
    id: "freeinferencing", group: "oss", name: "freeinferencing.com", stage: "Completed",
    description: "The freeinferencing.com project and its related work are complete.",
    resources: ["MS-A2"],
    link: { label: "Visit freeinferencing.com", url: "http://freeinferencing.com" },
  },
  {
    id: "microwasm", group: "oss", name: "microWASM", stage: "Abandoned",
    description: "Development stopped. Existing WebAssembly runtimes such as Wasmer, Wasmtime, nodewasm, and wasmCloud are better options for this work.",
    resources: ["MS-A2"],
  },
  {
    id: "threaded", group: "oss", name: "threaded", stage: "Abandoned",
    description: "Development stopped in favor of Google's agent-substrate project.",
    resources: ["MS-A2"],
  },
  {
    id: "wrist-agent", group: "hardware", name: "An agent on your wrist", stage: "Merged into another project",
    description: "The standalone wrist-agent idea was folded into A tiny pet on your wrist, which continues as an active project led by Shannon's daughter.",
    resources: ["K15", "ESP32-S3 wearable"],
  },
];
