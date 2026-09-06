import Image from "next/image";
import Link from "next/link";
import { CommunityLink } from "@/components/community-link";
import { SiteNavigation } from "@/components/site-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <Link
          className="site-brand"
          href="/"
          aria-label="Hackers in the Loop home"
        >
          <Image
            alt=""
            height={78}
            loading="eager"
            unoptimized
            src="/brand/hitl-horizontal-lockup.svg"
            width={270}
          />
        </Link>
        <SiteNavigation />
        <CommunityLink className="button button--primary header-join" />
      </div>
    </header>
  );
}
