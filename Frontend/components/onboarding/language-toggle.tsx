"use client"

import { Button } from "@/components/ui/button"

export function LanguageToggle({
  language,
  onToggle,
}: {
  language: "en" | "hi"
  onToggle: () => void
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onToggle}
      aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
    >
      {language === "en" ? "EN" : "HI"}
    </Button>
  )
}
