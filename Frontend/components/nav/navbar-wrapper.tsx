"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "./navbar"

export function NavbarWrapper() {
  const pathname = usePathname()
  if (pathname?.startsWith("/onboarding")) return null
  return <Navbar />
}

export default NavbarWrapper
