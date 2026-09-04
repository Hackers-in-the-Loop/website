import Image from "next/image";
import Link from "next/link";
import { CommunityLink } from "@/components/community-link";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <Link className="site-brand" href="/" aria-label="Hackers in the Loop home">
          <Image
            alt=""
            height={52}
            priority
            src="/brand/hitl-compact-badge.svg"
            width={52}
          />
          <span className="site-brand__name">Hackers in the Loop</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link className="site-nav__link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <CommunityLink className="button button--primary" />
        </nav>
      </div>
    </header>
  );
}
