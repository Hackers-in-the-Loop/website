export const hardware = [
  ["AI compute", "3 × NVIDIA DGX Spark", "128 GB unified memory and 4 TB NVMe each. 384 GB of memory across three separate machines for inference and training experiments. The build thread describes a two-Spark pair plus one standalone Spark."],
  ["General compute", "MS-A2, N150, and K15", "MS-A2: Ryzen 9 9955HX, 96 GB RAM, 6 TB SSD. N150 controller: 16 GB, 500 GB SSD + 5 TB USB HDD. K15: Core Ultra 5 125U, 32 GB, 512 GB SSD + 4 TB NVMe; also hosts the GPU bench."],
  ["GPU bench", "14 cards. One dock.", "8 P100s, 2 V100s, 2 BC-160s, and 2 Radeon VIIs, including ten spares. The K15 connects to a DEG2 dock with a 2 TB NVMe drive. Only one GPU is installed in the dock at a time."],
  ["Storage", "QNAP TS-464", "4 × 8 TB WD Red Plus HDDs in RAID5: 32 TB raw, about 24 TB after parity and before overhead. One 4 TB WD Blue NVMe drive provides the Qtier SSD tier."],
  ["Small-device experiments", "FPGA, edge AI, and ESP32", "Custom i5 host with 8 GB RAM and a PCIe slot; TANG Primer 20K, Stratix V, Kintex-7, and XCKU3P FPGA platforms. Orange Pi 6, M5Stack ESP32-S3, AX630C LLM module, and the experimental Agent Blade."],
  ["Rack and control", "12U TecMOJO / 10-inch rack", "NETGEAR GS108E with eight Gigabit ports and VLAN support; patch panel, eight-port KVM, rack displays, fans, power meter, and essential-load UPS. The GPU and microbench sit alongside the rack."],
] as const;

