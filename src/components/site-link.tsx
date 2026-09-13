import type { ComponentPropsWithoutRef } from "react";

// These content pages use document navigation. The published Vinext Link
// runtime currently throws during prefetch and click handling on Sites.
// Native links also preserve hashes, keyboard activation, and opening a new tab.
export default function SiteLink(props: ComponentPropsWithoutRef<"a">) {
  return <a {...props} />;
}
