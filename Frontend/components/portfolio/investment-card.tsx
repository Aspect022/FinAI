"use client"

import dynamic from "next/dynamic"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), { ssr: false })
const LineChart = dynamic(() => import("recharts").then((m) => m.LineChart), { ssr: false })
const Line = dynamic(() => import("recharts").then((m) => m.Line), { ssr: false })

type Investment = {
  name: string
  type: string
  currentValue: number
  returns: { amount: number; percent: number }
  direction: "up" | "down"
  data: Array<{ value: number }>
}

export function InvestmentCard({ item }: { item: Investment }) {
  const isUp = item.direction !== "down"
  const Arrow = isUp ? ArrowUpRight : ArrowDownRight
  const color = isUp ? "text-[var(--chart-2)]" : "text-[var(--chart-1)]"
  const stroke = isUp ? "rgb(var(--chart-2))" : "rgb(var(--chart-1))"

  return (
    <Card className="bg-card/50 border-border hover:bg-card transition-colors">
      <CardContent className="p-4 grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-foreground">{item.name}</div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{item.type}</span>
          </div>
          <div className="text-lg font-semibold text-foreground">₹{item.currentValue.toLocaleString("en-IN")}</div>
          <div className={`text-xs flex items-center gap-1 ${color}`}>
            <Arrow className="h-3 w-3" />₹{item.returns.amount.toLocaleString("en-IN")} ({item.returns.percent}%)
          </div>
        </div>
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={item.data}>
              <Line type="monotone" dataKey="value" stroke={stroke} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
