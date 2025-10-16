"use client"

import Image from "next/image"
import { Check, Languages } from "lucide-react"
import { useTranslation } from "./translation-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { lang, setLang } = useTranslation()

  const Item = ({
    code,
    label,
    img,
    disabled,
  }: {
    code: "en" | "hi" | "mr" | "bn" | "ta"
    label: string
    img?: string
    disabled?: boolean
  }) => (
    <DropdownMenuItem
      className={`flex items-center gap-2 ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      onClick={() => !disabled && (code === "en" || code === "hi") && setLang(code as any)}
    >
      {img ? (
        <Image
          src={img || "/placeholder.svg"}
          alt={`${label} flag`}
          width={18}
          height={12}
          className="rounded-sm ring-1 ring-black/10"
        />
      ) : (
        <span className="inline-block w-[18px]" />
      )}
      <span className="flex-1 text-sm">{label}</span>
      {code === lang && !disabled ? <Check className="h-4 w-4 text-primary" /> : null}
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 transition-colors bg-transparent">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline text-sm uppercase">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Item code="en" label="English (EN)" img="/images/flags/gb.jpg" />
        <Item code="hi" label="हिंदी (HI)" img="/images/flags/in.jpg" />
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">Coming Soon</DropdownMenuLabel>
        <Item code="mr" label="मराठी (MR)" disabled />
        <Item code="bn" label="বাংলা (BN)" disabled />
        <Item code="ta" label="தமிழ் (TA)" disabled />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
