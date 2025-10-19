"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Banknote, Building2, Cpu, Factory } from "lucide-react"

type Sector = {
  name: string
  icon: React.ElementType
  sentiment: "Bullish" | "Neutral" | "Bearish"
  reason: string
}

const COLORS: Record<Sector["sentiment"], string> = {
  Bullish: "bg-success text-white border-success/50",
  Neutral: "bg-warning text-white border-warning/50", 
  Bearish: "bg-destructive text-white border-destructive/50",
}

export function MarketInsights() {
  const sectors: Sector[] = [
    { name: "IT / Technology", icon: Cpu, sentiment: "Bullish", reason: "Strong Q3 earnings" },
    { name: "Banking / Finance", icon: Banknote, sentiment: "Neutral", reason: "Stable NIM guidance" },
    { name: "FMCG", icon: Building2, sentiment: "Bullish", reason: "Rural pickup, input costs ease" },
    { name: "Manufacturing", icon: Factory, sentiment: "Bearish", reason: "Slow order inflows" },
  ]
  const updated = new Date().toLocaleString("en-IN")

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Market Insights</CardTitle>
        <div className="text-xs text-muted-foreground">
          Based on analysis of 500+ news articles • Last updated {updated}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 rounded-md bg-muted/40 p-3">
          <div className="text-2xl" aria-hidden>
            😊
          </div>
          <div className="text-sm font-medium">Overall mood: Positive</div>
          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
            Powered by FinBERT & IndicBERT
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sectors.map((s) => (
            <div key={s.name} className="group rounded-md border border-border p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm font-medium text-foreground">{s.name}</div>
                </div>
                <Badge variant="outline" className={COLORS[s.sentiment]}>
                  {s.sentiment}
                </Badge>
              </div>
              <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                <span>Reason:</span>
                <span>{s.reason}</span>
                <span className="ml-auto group-hover:translate-x-0.5 transition-transform">↗</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
