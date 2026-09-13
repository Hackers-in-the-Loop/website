import Link from "@/components/site-link";
import { siteConfig } from "@/lib/site";

type CommunityLinkProps = {
  className?: string;
  children?: React.ReactNode;
};

export function CommunityLink({ className, children }: CommunityLinkProps) {
  const label =
    children ?? (siteConfig.discordUrl ? "Join Discord ↗" : "Join the community →");

  if (siteConfig.discordUrl) {
    return (
      <a
        className={className}
        href={siteConfig.discordUrl}
        rel="noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  return (
    <Link className={className} href="/community#join">
      {label}
    </Link>
  );
}
