"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Receipt, Wallet, Lightbulb, Menu, User } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/history", label: "History", icon: Receipt },
  { href: "/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/recommendation", label: "Recommendations", icon: Lightbulb },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-lg items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="MoneyFyi Logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain rounded-full"
          />
          <span className="font-semibold">MoneyFyi</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-pretty">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/profile" className="h-8 w-8 rounded-full bg-muted flex items-center justify-center" aria-label="Profile">
            <User className="h-5 w-5" />
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/profile" className="h-8 w-8 rounded-full bg-muted flex items-center justify-center" aria-label="Profile">
            <User className="h-5 w-5" />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-6 flex flex-col gap-2">
                {links.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
