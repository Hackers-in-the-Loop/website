import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function CurrentLayout({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter /></>;
}
