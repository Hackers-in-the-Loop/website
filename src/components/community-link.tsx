import Link from "next/link";
import { siteConfig } from "@/lib/site";

type CommunityLinkProps = {
  className?: string;
  children?: React.ReactNode;
};

export function CommunityLink({
  className,
  children = "Join the community",
}: CommunityLinkProps) {
  const isExternal = siteConfig.discordUrl.startsWith("http");

  if (isExternal) {
    return (
      <a
        className={className}
        href={siteConfig.discordUrl}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={siteConfig.discordUrl}>
      {children}
    </Link>
  );
}
