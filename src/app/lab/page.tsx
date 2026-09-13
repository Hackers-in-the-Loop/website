import Link from "@/components/site-link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("The Lab", "The personal compute cluster behind HITL’s planned shared Lab: equipment, intentions, and access status.", "/lab");

export default function LabPage() {
  return <>
    <header className="page-hero"><div className="site-shell page-hero__grid">
      <p className="eyebrow">The Lab / In preparation</p>
      <div><h1 className="page-title">More room to experiment.</h1>
        <p className="page-lede">The Lab starts with our founder’s personal compute cluster. The intention is to share resources so people can learn, research, and try ideas they might not have the hardware for.</p>
        <p className="page-aside">Community compute access is planned. Applications are not open yet.</p>
      </div>
    </div></header>
    <section className="site-shell page-section" aria-labelledby="equipment-title">
      <div className="section-heading"><div><p className="eyebrow">Equipment / September 8, 2026 notes</p><h2 className="section-title" id="equipment-title">The starting point.</h2></div></div>
      <div className="community-places">
        <article className="community-place community-place--dark"><p className="metadata">Reported on hand</p><h3>A personal mini cluster.</h3>
          <ul className="lab-list"><li>3 DGX Sparks</li><li>Ryzen 9 server: 96 GB RAM, 6 TB NVMe; external V100 32 GB GPU and another 2 TB NVMe</li><li>N150 server: 16 GB RAM, 5 TB HDD</li><li>NAS: 4 TB mirrored NVMe and 64 TB RAID storage</li><li>KVM and VLAN-capable switch; most equipment in a 12U RackPi rack</li></ul>
        </article>
        <article className="community-place"><p className="metadata">Planned / Details to be settled</p><h3>Shared use, built with care.</h3>
          <ul className="lab-list"><li>Free project-based compute access, with a proposal and review process</li><li>A Discord bot the community can help build</li><li>A shared model inference gateway</li><li>Expansion with 8 P100 GPUs; a dual-Xeon server with 512 GB RAM is under consideration</li></ul>
          <p>These are intended uses and expansion plans. Scheduling, operating arrangements, and public access are still being worked out.</p>
        </article>
      </div>
      <div className="source-note" id="access"><div><p className="eyebrow">Access and support</p><h2>Help make shared access possible.</h2><p>Hardware, data center space, dedicated power, and bandwidth could help the Lab develop. Connect with the founder to discuss support or a project idea. A Google application form will be linked here when access is ready.</p><p>You do not need to apply for Lab resources to belong to the community.</p></div><Link className="button" href="/community#join">Connect with HITL →</Link></div>
    </section>
  </>;
}
