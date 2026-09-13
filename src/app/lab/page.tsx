import Link from "@/components/site-link";
import { LabPhoto } from "@/components/lab-photo";
import { LabPowerEstimate } from "@/components/lab-power-estimate";
import { labProjects } from "@/content/lab-projects";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("The Lab", "Explore HITL’s mini cluster, hardware experiments, build journey, and operating estimates. Request a free compute grant for open research and projects.", "/lab");

const hardware = [
  ["AI compute", "3 × NVIDIA DGX Spark", "128 GB unified memory and 4 TB NVMe each. 384 GB of memory across three separate machines for inference and training experiments. The build thread describes a two-Spark pair plus one standalone Spark."],
  ["General compute", "MS-A2, N150, and K15", "MS-A2: Ryzen 9 9955HX, 96 GB RAM, 6 TB SSD. N150 controller: 16 GB, 500 GB SSD + 5 TB USB HDD. K15: Core Ultra 5 125U, 32 GB, 512 GB SSD + 4 TB NVMe; also hosts the GPU bench."],
  ["GPU bench", "14 cards. One dock.", "8 P100s, 2 V100s, 2 BC-160s, and 2 Radeon VIIs, including ten spares. The K15 connects to a DEG2 dock with a 2 TB NVMe drive. Only one GPU is installed in the dock at a time."],
  ["Storage", "QNAP TS-464", "4 × 8 TB WD Red Plus HDDs in RAID5: 32 TB raw, about 24 TB after parity and before overhead. One 4 TB WD Blue NVMe drive provides the Qtier SSD tier."],
  ["Small-device experiments", "FPGA, edge AI, and ESP32", "Custom i5 host with 8 GB RAM and a PCIe slot; TANG Primer 20K, Stratix V, Kintex-7, and XCKU3P FPGA platforms. Orange Pi 6, M5Stack ESP32-S3, AX630C LLM module, and the experimental Agent Blade."],
  ["Rack and control", "12U TecMOJO / 10-inch rack", "NETGEAR GS108E with eight Gigabit ports and VLAN support; patch panel, eight-port KVM, rack displays, fans, power meter, and essential-load UPS. The GPU and microbench sit alongside the rack."],
] as const;

export default function LabPage() {
  return <>
    <header className="site-shell lab-hero">
      <div>
        <p className="eyebrow">The HITL Lab / Built to be shared</p>
        <h1 className="page-title">Real hardware.<br />Room to experiment.</h1>
        <p className="page-lede">A founder-funded mini cluster, a collection of test benches, and a place to try ideas. We’re building toward shared compute so more people can learn, research, and build without owning all the equipment themselves.</p>
        <div className="hero__actions"><a className="button button--primary" href={siteConfig.labRequestUrl} target="_blank" rel="noreferrer">Request access / compute grant ↗</a><a className="text-link" href="#projects">Explore active projects ↓</a></div>
        <p className="lab-fineprint">Requests can be submitted now. Access and resource allocations are arranged after review; submitting a request does not provision compute.</p>
      </div>
      <LabPhoto name="cluster-complete" priority alt="The assembled HITL mini rack, with three DGX Sparks, network cabling, storage, and an external GPU bench." caption="The mini cluster and GPU bench, photographed during the build." />
    </header>

    <nav className="site-shell lab-index" aria-label="Lab sections">
      <a href="#projects">Active projects</a><a href="#hardware">Hardware</a><a href="#journey">Build journey</a><a href="#costs">Costs & power</a><a href="#access">Request access</a><a href="#support">Support the Lab</a>
    </nav>

    <section className="work-section" id="projects" aria-labelledby="projects-title">
      <div className="site-shell">
        <div className="section-heading section-heading--light"><div><p className="eyebrow">Work in progress</p><h2 className="section-title" id="projects-title">Active projects.</h2></div><p className="lab-section-note">Founder-led experiments documented in the September 12 build notes. These are project updates, not live utilization readings.</p></div>
        <div className="lab-projects">
          {labProjects.map((project) => <article className="lab-project" key={project.id} id={project.id}>
            <p className="metadata">{project.stage}</p><h3>{project.name}</h3><p className="lab-project__question">{project.question}</p><p>{project.description}</p>
            <h4>Resources</h4><ul>{project.resources.map((resource) => <li key={resource}>{resource}</li>)}</ul><p className="lab-fineprint">{project.allocation}</p>
          </article>)}
        </div>
        <p className="lab-section-note lab-projects-note">The shared model gateway and community Discord bot remain planned. A project’s presence here does not indicate spare capacity or an open allocation.</p>
        <a className="text-link" href={siteConfig.labRequestUrl} target="_blank" rel="noreferrer">Propose a project for the Lab ↗</a>
      </div>
    </section>

    <section className="site-shell lab-section" id="hardware" aria-labelledby="hardware-title">
      <div className="section-heading"><div><p className="eyebrow">Inventory / September 12, 2026</p><h2 className="section-title" id="hardware-title">What’s in the Lab.</h2></div><a className="text-link" href="/lab/machines.txt" download>Download the inventory ↓</a></div>
      <p className="lab-section-intro">A record of the equipment and its role in the build. Owned equipment, experimental configurations, and member allocations are different things; this inventory does not promise remote availability.</p>
      <div className="lab-hardware-grid">{hardware.map(([label,title,copy]) => <article key={label}><p className="eyebrow">{label}</p><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="lab-journey" id="journey" aria-labelledby="journey-title"><div className="site-shell">
      <div className="section-heading"><div><p className="eyebrow">The build journey</p><h2 className="section-title" id="journey-title">Built together.<br />Learned along the way.</h2></div></div>
      <div className="lab-story"><LabPhoto name="building-together" alt="The founder and daughter together beside the assembled mini cluster." caption="The founder and daughter beside the rack they built together." /><div><p className="lab-story__lede">This mini cluster was a project the founder built with his daughter.</p><p>The first evening meant laying out parts, assembling the rack, and figuring out how everything would fit. His daughter picked the colorful zip ties for the exhaust fan and suggested putting a mini PC on the back to make room.</p><p>After coffee and donuts, they returned to network cabling, cooling, and conversations about AC, DC, and why current matters. By September 8, the first two Sparks and a mini PC were online, brought up one system at a time using a Mac and HDMI capture as the console.</p><a className="button" href={siteConfig.buildThreadUrl} target="_blank" rel="noreferrer">Follow the build thread ↗</a><a className="text-link" href="https://x.com/iamMrDuncan/status/2096739567537652149" target="_blank" rel="noreferrer">Read on X ↗</a></div></div>
      <div className="lab-gallery">
        <LabPhoto name="parts-on-the-bench" alt="Cluster parts, boxes, tools, and hardware laid out before assembly." caption="September 6 — laying out the parts before assembling the rack." />
        <LabPhoto name="rack-assembly" alt="The empty TecMOJO rack frame being assembled on the floor." caption="September 6 — the rack is assembled; fitting everything comes next." />
        <LabPhoto name="sparks-in-the-rack" alt="The founder’s daughter beside the rack with three DGX Sparks installed." caption="September 7 — three Sparks mounted, with zip ties doing their part." />
        <LabPhoto name="gpu-test-bench" alt="The external GPU test bench with its graphics card, power supply, cabling, and cooling fans." caption="The swappable GPU bench alongside the cluster." />
      </div>
    </div></section>

    <section className="site-shell lab-section" id="costs" aria-labelledby="costs-title">
      <div className="section-heading"><div><p className="eyebrow">Stewardship / Planning estimates</p><h2 className="section-title" id="costs-title">What it takes to run.</h2></div></div>
      <div className="lab-cost-layout"><div>
        <div className="lab-cost-total"><span className="eyebrow">Estimated replacement cost</span><strong>≈ $29,749</strong><p>A September 11–12, 2026 pricing snapshot using new and used equipment references. This is a replacement estimate, not the amount paid or a donation valuation.</p></div>
        <dl className="lab-cost-breakdown"><div><dt>Compute hardware & add-ons</dt><dd>$28,244</dd></div><div><dt>Rack, network, control & power</dt><dd>$1,505</dd></div></dl>
        <a className="text-link" href="/lab/build-list.md" download>Itemized costs & price references ↓</a>
        <h3 className="lab-power-title">Estimated wall power</h3>
        <div className="lab-table-wrap"><table className="lab-power-table"><caption>Watts by workload scenario</caption><thead><tr><th scope="col">Setup</th><th scope="col">Idle</th><th scope="col">Working</th><th scope="col">Heavy</th></tr></thead><tbody><tr><th scope="row">Core cluster</th><td>229.8 W</td><td>406.5 W</td><td>907 W</td></tr><tr><th scope="row">Whole lab</th><td>339.3 W</td><td>693 W</td><td>1,413 W</td></tr></tbody></table></div>
        <p className="lab-fineprint">Whole lab adds the V100 dock, FPGA and small-device benches, and projected Agent Blade. GPU alternatives are swapped, not added together. The 750 VA UPS serves essential loads; it is not sized for the whole lab at heavy load.</p>
        <a className="text-link" href="/lab/power-notes.md" download>Power assumptions & references ↓</a>
      </div><LabPowerEstimate /></div>
    </section>

    <section className="lab-access" id="access" aria-labelledby="access-title"><div className="site-shell lab-access__inner"><div><p className="eyebrow">Free compute / Proposal-based grants</p><h2 className="section-title" id="access-title">Bring an idea.<br />Tell us what you need.</h2><p>The HITL AI Compute Grant Application collects requests for open research and projects. Share your goals, how the work benefits the community, and the resources you need: GPU type, memory, node count, or estimated time.</p><p>The form asks applicants to conduct open work that contributes back, share progress and results publicly, and tag HITL. Review its full agreements before applying.</p><p>Requests are subject to review and available capacity. The form is a way to request access, not a promise of an immediate allocation. Community membership does not require a compute application.</p></div><a className="button button--primary" href={siteConfig.labRequestUrl} target="_blank" rel="noreferrer">Open the grant application ↗</a></div></section>

    <section className="site-shell lab-section" id="support" aria-labelledby="support-title"><div className="source-note"><div><p className="eyebrow">Support the Lab</p><h2 id="support-title">Help make room for more people.</h2><p>Hardware, data center space, power, and bandwidth can help turn a personal build into a resource more people can use. The inventory and operating estimates give potential supporters a concrete starting point for that conversation.</p></div><Link className="button" href="/community#join">Discuss supporting the Lab →</Link></div></section>
  </>;
}
