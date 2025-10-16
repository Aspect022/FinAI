"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type Range = "1Y" | "3Y" | "5Y"

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)
}

export function ProjectionChart() {
  const [range, setRange] = useState<Range>("3Y")
  const data = useMemo(() => makeData(range), [range])

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="text-sm text-muted-foreground">Projection</div>
        <div className="flex items-center gap-2">
          {(["1Y", "3Y", "5Y"] as Range[]).map((r) => (
            <Button
              key={r}
              variant={r === range ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(r)}
              aria-pressed={r === range}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `₹${formatINR(v as number)}`} tick={{ fontSize: 12 }} width={60} />
            <Tooltip
              formatter={(val: number) => [`₹${formatINR(val)}`, "Projected value"]}
              labelClassName="text-xs"
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Line type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function makeData(range: Range) {
  // Simple monthly SIP of ₹500 with a mid-range 13.5% annualized return
  const monthly = 500
  const annualRate = 0.135
  const months = range === "1Y" ? 12 : range === "3Y" ? 36 : 60
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1

  let total = 0
  const points: { label: string; value: number }[] = []

  for (let m = 1; m <= months; m++) {
    total = total * (1 + monthlyRate) + monthly
    // Show label at quarterly intervals to keep axis readable
    if (m % Math.max(1, Math.floor(months / 6)) === 0 || m === months) {
      points.push({ label: `${m}m`, value: Math.round(total) })
    }
  }

  return points
}
