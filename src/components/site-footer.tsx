import Image from "next/image";
import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__inner">
        <div>
          <Image
            alt="Hackers in the Loop"
            className="site-footer__mark"
            height={80}
            unoptimized
            src="/brand/hitl-compact-badge.svg"
            width={80}
          />
          <p className="site-footer__copy">
            Open source for agentic systems. Built in public, improved together.
          </p>
        </div>
        <nav className="site-footer__links" aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={siteConfig.githubUrl} rel="noreferrer" target="_blank">
            GitHub ↗
          </a>
          <a href={siteConfig.xUrl} rel="noreferrer" target="_blank">
            Follow on X ↗
          </a>
        </nav>
      </div>
      <div className="site-shell site-footer__bottom">
        <p>Understand the system. Improve the system. Share what you learn.</p>
        <a href={siteConfig.repositoryUrl} rel="noreferrer" target="_blank">
          This site is open source ↗
        </a>
      </div>
    </footer>
  );
}
