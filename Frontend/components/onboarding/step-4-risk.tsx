"use client"

import { cn } from "@/lib/utils"

export type RiskLevel = "conservative" | "moderate" | "aggressive"

export function StepRisk({
  t,
  value,
  onChange,
}: {
  t: Record<string, string>
  value: RiskLevel | ""
  onChange: (v: RiskLevel) => void
}) {
  const items: { key: RiskLevel; label: string; desc: string }[] = [
    { key: "conservative", label: t.risk_conservative, desc: t.risk_conservative_desc },
    { key: "moderate", label: t.risk_moderate, desc: t.risk_moderate_desc },
    { key: "aggressive", label: t.risk_aggressive, desc: t.risk_aggressive_desc },
  ]

  return (
    <div role="radiogroup" aria-label="Risk tolerance" className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {items.map(({ key, label, desc }) => {
        const selected = value === key
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(key)}
            className={cn(
              "rounded-lg border p-4 text-left transition-colors",
              selected ? "border-accent bg-accent text-accent-foreground" : "hover:bg-secondary",
            )}
          >
            <div className="font-medium">{label}</div>
            <div className="text-sm text-muted-foreground mt-1">{desc}</div>
          </button>
        )
      })}
    </div>
  )
}
