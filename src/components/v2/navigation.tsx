"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const pages = [["/", "Home"], ["/why", "Why?"], ["/lab", "Lab"], ["/projects", "Projects"], ["/community", "Community"]] as const;

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <button className="v2-menu-toggle" aria-expanded={open} aria-controls="v2-menu" onClick={() => setOpen(!open)}>{open ? "Close menu" : "Menu"}<span aria-hidden="true">{open ? "×" : "+"}</span></button>
    <nav className={`v2-nav${open ? " is-open" : ""}`} id="v2-menu" aria-label="Primary navigation">
      {pages.map(([href, label]) => <a href={href} key={href} aria-current={pathname === href ? "page" : undefined}>{label}</a>)}
      <a className="v2-mobile-connect" href="/community">Join community →</a>
    </nav>
  </>;
}
