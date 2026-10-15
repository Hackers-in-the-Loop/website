// The Lab at a glance, by job. Showcase-level detail only: what each part is for, not an inventory
// (the itemized workbook stays a download). Counts follow the HACK Lab field guide
// (hack-lab docs/website, as of 13 October 2026).
export const labNumbers = [
  ["14", "GPUs and AI chips in service"],
  ["192 GB", "GPU memory in one 8-GPU server"],
  ["384 GB", "unified memory across three DGX Sparks"],
  ["~24 TB", "shared storage for models and results"],
] as const;

export const hardware = [
  ["Model servers", "3 × NVIDIA DGX Spark", "128 GB of unified memory each. Two together serve the Lab's default model; the third runs quantization experiments."],
  ["GPU server", "8 data-centre GPUs", "Four V100s and four P100s in one 4U server. Its P100s are the research lanes."],
  ["VM host", "Dell PowerEdge R730", "512 GB of memory for virtual machines, including the brain of the GPU cluster."],
  ["Platform", "A mini PC", "Runs the shared services: sign-in, dashboards and the model gateway."],
  ["GPU benches", "Swappable cards", "Radeon VII, BC-160, RTX and spare P100 cards on external docks, one GPU at a time."],
  ["Storage", "4-bay NAS", "About 24 TB usable: model files, logs and results, shared over the network."],
  ["Small devices", "FPGA, edge AI and ESP32", "FPGA boards, edge-AI modules, ESP32 devices and an electronics bench."],
  ["Rack", "12U, 10-inch mini rack", "Switches, KVM, status screens and battery backup."],
] as const;
