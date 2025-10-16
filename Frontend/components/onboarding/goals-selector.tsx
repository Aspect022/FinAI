"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const GOALS = [
  { key: "emergency", label: "Emergency Fund", emoji: "🏥" },
  { key: "house", label: "House Down Payment", emoji: "🏠" },
  { key: "education", label: "Child's Education", emoji: "🎓" },
  { key: "retirement", label: "Retirement", emoji: "👴" },
  { key: "travel", label: "Travel/Vacation", emoji: "✈️" },
  { key: "business", label: "Start Business", emoji: "💼" },
  { key: "wedding", label: "Wedding", emoji: "💒" },
  { key: "saving", label: "Just Saving", emoji: "💰" },
]

export function GoalsSelector({
  onContinue,
  // new props
  showActions = true,
  onChange,
}: {
  onContinue?: (v: any) => void
  showActions?: boolean
  onChange?: (v: Record<string, { amount?: string; timeline?: string }>) => void
}) {
  const [selected, setSelected] = useState<Record<string, { amount?: string; timeline?: string }>>({})

  useEffect(() => {
    onChange?.(selected)
  }, [selected, onChange])

  const toggle = (key: string) => {
    setSelected((s) => {
      const next = s[key] ? (({ [key]: _, ...rest }) => rest)(s) : { ...s, [key]: {} }
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">What are you saving for?</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {GOALS.map((g) => {
          const active = !!selected[g.key]
          return (
            <Card
              key={g.key}
              className={`p-3 cursor-pointer transition-all ${active ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
              onClick={() => toggle(g.key)}
            >
              <div className="text-2xl">{g.emoji}</div>
              <div className="mt-1 text-sm">{g.label}</div>
              <div className="mt-2">
                <Checkbox checked={active} onCheckedChange={() => toggle(g.key)} onClick={(e) => e.stopPropagation()} />
              </div>
              {active && (
                <div className="mt-3 space-y-2">
                  <Input
                    placeholder="Target amount (₹)"
                    inputMode="numeric"
                    value={selected[g.key]?.amount ?? ""}
                    onChange={(e) => setSelected((s) => ({ ...s, [g.key]: { ...s[g.key], amount: e.target.value } }))}
                  />
                  <Input
                    placeholder="Timeline (months/years)"
                    value={selected[g.key]?.timeline ?? ""}
                    onChange={(e) => setSelected((s) => ({ ...s, [g.key]: { ...s[g.key], timeline: e.target.value } }))}
                  />
                </div>
              )}
            </Card>
          )
        })}
      </div>
      {showActions && (
        <>
          <div className="flex items-center justify-between pt-2">
            <button className="text-sm text-muted-foreground underline underline-offset-4">Skip for now</button>
            <Button onClick={() => onContinue?.(selected)}>Continue</Button>
          </div>
          <div className="text-xs text-muted-foreground">Step 2/4</div>
        </>
      )}
    </div>
  )
}
