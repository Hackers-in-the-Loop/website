import { SiteShell } from "@/components/v2/site-shell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
