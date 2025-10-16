"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

function Meter({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}%</span>
      </div>
      <div className="h-2 w-full rounded bg-muted mt-1 overflow-hidden">
        <div className="h-full rounded bg-[var(--chart-2)]" style={{ width: `${value}%` }} />
      </div>
      <div className="text-[10px] text-muted-foreground mt-1">{note}</div>
    </div>
  )
}

export function FinancialHealthCard() {
  const score = 7.2
  const emergency = 60
  const savings = 85
  const diversification = 40
  const spending = 75

  const message =
    emergency < 70
      ? "We noticed your emergency fund could use a boost. Let's build it together this month."
      : savings > 80
        ? "Amazing consistency! You're building great habits."
        : "You're doing well — let's keep improving step by step."

  return (
    <Card>
      <CardHeader className="pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-[var(--chart-2)]" />
          <CardTitle className="text-base">Your Financial Health</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <div className="relative h-28 w-28">
            <div
              className="h-full w-full rounded-full"
              style={{
                background: "conic-gradient(var(--chart-2) calc(72*1%), #e5e7eb 0)",
              }}
              aria-label="Health score"
            />
            <div className="absolute inset-2 rounded-full bg-background border border-border grid place-items-center">
              <div className="text-sm text-muted-foreground">Score</div>
              <div className="text-xl font-semibold text-foreground">{score}/10</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Meter label="Emergency Fund" value={emergency} note="needs improvement" />
          <Meter label="Savings Rate" value={savings} note="great!" />
          <Meter label="Diversification" value={diversification} note="risky" />
          <Meter label="Spending Control" value={spending} note="good" />
        </div>
        <div className="sm:col-span-2">
          <div className="text-sm text-foreground">{message}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Progress last 3 months</div>
          <div className="mt-2 h-10 w-full rounded bg-muted relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-[var(--chart-2)]/20 w-1/3" />
            <div className="absolute inset-y-0 left-1/3 bg-[var(--chart-2)]/40 w-1/3" />
            <div className="absolute inset-y-0 left-2/3 bg-[var(--chart-2)]/60 w-1/3" />
          </div>
          <button className="mt-3 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm px-3 py-2">
            Get Personalized Tips
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
