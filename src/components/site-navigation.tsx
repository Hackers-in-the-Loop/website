"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/site";

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      {navigation.map((item) => (
        <Link
          className="site-nav__link"
          href={item.href}
          key={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
