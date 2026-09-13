"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const pages = [["/v2", "Home"], ["/v2/why", "Why HITL?"], ["/v2/lab", "Lab"], ["/v2/projects", "Projects"], ["/v2/community", "Community"]] as const;

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <button className="v2-menu-toggle" aria-expanded={open} aria-controls="v2-menu" onClick={() => setOpen(!open)}>{open ? "Close menu" : "Menu"}<span aria-hidden="true">{open ? "×" : "+"}</span></button>
    <nav className={`v2-nav${open ? " is-open" : ""}`} id="v2-menu" aria-label="Primary navigation">
      {pages.map(([href, label]) => <a href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}</a>)}
      <a className="v2-mobile-connect" href="/v2/community#connect">Connect with HITL →</a>
    </nav>
  </>;
}
