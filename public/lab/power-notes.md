# HITL mini-cluster: power notes

Updated September 12, 2026.

The estimates below cover power at the wall. "Working" means mixed inference, development, storage, and bench activity; "Heavy" means those systems are busy together. Storage and internal fans are included in their host rows. The dock includes its GPU, SSD, four cooling fans, and PSU losses.

| Equipment | Idle | Working | Heavy | Included |
|---|---:|---:|---:|---|
| 3 × DGX Spark | 105 W | 215 W | 570 W | Includes all three systems and their internal storage. Idle: 35 W each. Working: two at 90 W and one at 35 W. Heavy: 190 W each.[^p-spark-test][^p-spark-idle] |
| MS-A2: Ryzen 9 9955HX, 96 GB, all 3 SSDs | 30 W | 60 W | 140 W | Includes 96 GB RAM and all three SSDs, with extra allowance over the review configuration.[^p-msa2] |
| Beelink N150: 16 GB, SSD + 5 TB USB HDD | 14 W | 18 W | 30 W | Includes the mini PC, internal SSD, and a spinning 5 TB USB hard drive. Estimated from the components. |
| GMKtec K15: 32 GB, internal SSD + 4 TB NVMe | 12 W | 25 W | 55 W | Includes both internal drives. The external GPU dock is counted separately.[^p-k15] |
| QNAP TS-464: 4 × 8 TB HDDs + 4 TB NVMe | 45 W | 55 W | 70 W | Includes four spinning hard drives, the NVMe tier, enclosure, and fan. Higher loads allow for transfers and RAID activity.[^p-qnap] |
| NETGEAR GS108E | 3 W | 4 W | 5 W | Eight Gigabit ports, VLAN support, fanless, and non-PoE. The 3–5 W estimate allows for connected ports and the power adapter.[^p-switch] |
| DEG2 + V100 32 GB + 2 TB NVMe + 4 Noctua fans + GF A3 PSU losses | 45 W | 170 W | 295 W | Includes one V100, the DEG2, 2 TB SSD, four Noctua fans, and PSU losses. Heavy load allows 250 W for the GPU; the K15 is separate.[^p-v100][^p-fans] |
| Custom i5 microbench: 8 GB + HDD, excluding FPGA | 30 W | 50 W | 95 W | Includes the i5 host, 8 GB RAM, HDD, and PSU losses. The FPGA has its own row. Estimated from the components. |
| One installed PCIe FPGA card | 12 W | 25 W | 45 W | One installed PCIe card, using the Stratix V as the example. Power varies with the card and bitstream. |
| TANG Primer 20K | 2 W | 3 W | 5 W | USB-powered board, counted separately from the PCIe FPGA. |
| Orange Pi 6 | 12 W | 22 W | 40 W | Includes the board, storage, cooling, and power adapter. Estimated from the components. |
| M5Stack ESP32-S3 device | 1.5 W | 2 W | 3 W | Includes the ESP32-S3 device and its peripherals. Estimated from the components. |
| M5Stack AX630C LLM module | 1 W | 2.5 W | 3 W | Includes the AX630C module and power-conversion allowance. The M5Stack host is separate.[^p-m5] |
| Agent Blade: all 9 ESP32 nodes + SD NAND | 6 W | 12 W | 20 W | Projected draw for all nine ESP32 nodes, SD NAND, and board power conversion. Working: about 0.8 W per S3 and 1.5 W per P4, plus 2.7 W overhead. |
| Seeed E1001 ePaper / ESP32 display | 0.3 W | 0.5 W | 1 W | Periodic screen updates with sleep between refreshes. |
| 7.84-inch rack touchscreen | 5 W | 7 W | 8 W | Screen on; brightness affects consumption. |
| KC-KVM801 + keyboard and mouse | 3 W | 4 W | 5 W | Includes the KVM electronics, keyboard, and mouse. |
| HDMI capture + connected recovery USB devices | 1 W | 3 W | 4 W | Includes connected capture and USB devices. |
| 2 × 120 mm rack fans + their DC supply | 4 W | 5 W | 7 W | Both rack fans and their DC supply. GPU cooling is included in the dock row. |
| PDU and volt/amp/watt/kWh meter electronics | 1.5 W | 2 W | 2 W | Power used by the meter and PDU electronics. |
| CyberPower 750 VA UPS overhead | 6 W | 8 W | 10 W | UPS losses and maintenance charging, assuming an essential-load branch. Excludes battery recharge after an outage. |
| **Total** | **339.3 W** | **693 W** | **1413 W** | |

## Totals

| Setup | Idle | Working | Heavy |
|---|---:|---:|---:|
| Core cluster | 229.8 W | 406.5 W | 907 W |
| Whole lab | 339.3 W | 693 W | 1413 W |

The core consists of the Sparks, MS-A2, N150 and USB HDD, K15, NAS, GS108E, console, rack fans, meter, and UPS overhead. The whole lab adds the GPU dock, i5/FPGA bench, TANG, Orange Pi, M5Stack devices, and populated Agent Blade.

The GS108E is estimated at 3 W idle, 4 W working, and 5 W in the heavy scenario. Those are planning estimates, not measured GS108E readings. NETGEAR lists 3.7 W maximum for the current v4; the 5 W allowance leaves room for the power adapter and model variation.

For the custom systems and accessories, the values are component-based estimates. Agent Blade consumption is projected for a populated board. Room cooling, the household router, and UPS battery recharging after an outage are excluded. UPS overhead assumes essential loads only.

## References

[^p-spark-test]: [ServeTheHome: DGX Spark review and power testing](https://www.servethehome.com/nvidia-dgx-spark-review-the-gb10-machine-is-so-freaking-cool/4/).
[^p-spark-idle]: [Tom’s Hardware: DGX Spark idle-power update](https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidia-dgx-spark-update-cuts-idle-power-by-32-percent-or-more-hot-plug-detection-on-connectx-nic-makes-for-a-more-efficient-ai-workstation).
[^p-msa2]: [Notebookcheck: MINISFORUM MS-A2 review](https://www.notebookcheck.net/Minisforum-MS-A2-review-Compact-AMD-mini-PC-with-workstation-ambitions-and-GPU-upgrade-option.1062179.0.html).
[^p-k15]: [Notebookcheck: GMK NucBox K15 review](https://www.notebookcheck.net/GMK-NucBox-K15-review-Affordable-mini-PC-with-an-oversized-design.1214008.0.html).
[^p-qnap]: [QNAP: TS-464 hardware specifications](https://www.qnap.com/en-us/product/ts-464/specs/hardware).
[^p-v100]: [NVIDIA: Tesla V100 specifications](https://www.nvidia.com/en-gb/data-center/tesla-v100/).
[^p-p100]: [NVIDIA: Inside Pascal](https://developer.nvidia.com/blog/inside-pascal/).
[^p-radeon]: [AMD: Radeon VII specifications](https://www.amd.com/en/support/downloads/drivers.html/graphics/radeon-rx/radeon-rx-vega-series/amd-radeon-vii.html).
[^p-fans]: [Noctua: NF-A4x20 PWM specifications](https://www.noctua.at/en/products/nf-a4x20-pwm/specifications).
[^p-m5]: [M5Stack: Module LLM documentation](https://docs.m5stack.com/en/module/Module-LLM).
[^p-switch]: [NETGEAR: GS108E specifications](https://www.netgear.com/business/wired/switches/easy-smart/gs108e/). Eight Gigabit ports, VLAN support, no PoE, and fanless operation. NETGEAR lists 3.7 W maximum for the current v4. This build uses a 3–5 W wall-power estimate. Checked September 12, 2026.
