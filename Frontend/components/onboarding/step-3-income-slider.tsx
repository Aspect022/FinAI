"use client"

import { IndianRupee } from "lucide-react"

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)
}

export function StepIncomeSlider({
  value,
  onChange,
  hint,
}: {
  value: number
  onChange: (v: number) => void
  hint: string
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <IndianRupee className="h-5 w-5" aria-hidden="true" />
          <span>{formatINR(value)}</span>
        </div>
        <span className="text-sm text-muted-foreground">{hint}</span>
      </div>

      <input
        type="range"
        min={5000}
        max={100000}
        step={500}
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
        aria-valuemin={5000}
        aria-valuemax={100000}
        aria-valuenow={value}
        aria-label="Monthly income"
        className="w-full accent-accent"
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>₹5,000</span>
        <span>₹1,00,000</span>
      </div>
    </div>
  )
}
