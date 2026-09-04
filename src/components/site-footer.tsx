import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__inner">
        <div>
          <Image
            alt="Hackers in the Loop"
            className="site-footer__mark"
            height={80}
            src="/brand/hitl-compact-badge.svg"
            width={80}
          />
          <p className="site-footer__copy">
            Open source for agentic systems. Built in public, improved together.
          </p>
        </div>
        <div className="site-footer__links">
          <Link href="/manifesto">Manifesto</Link>
          <Link href="/stack">Stack</Link>
          <Link href="/community">Community</Link>
          <a href={siteConfig.xUrl} rel="noreferrer" target="_blank">
            X ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
