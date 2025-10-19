"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

function Meter({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#808995]">{label}</span> {/* progress_bar.label_color */}
        <span className="text-[#2f3542]">{value}%</span> {/* progress_bar.text_color */}
      </div>
      <div className="h-2 w-full rounded bg-[#f0f3f5] mt-1 overflow-hidden"> {/* progress_bar.base_bg */}
        <div 
          className="h-full rounded" 
          style={{ 
            width: `${value}%`,
            background: `linear-gradient(to right, #ff8a70, #ff6f55)` /* Using orange and a darker orange */
          }} 
        />
      </div>
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
          <Heart className="h-4 w-4 text-[#4bbfbf]" /> {/* score_gauge.gradient_start */}
          <CardTitle className="text-base">Your Financial Health</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-24 h-24">
                <circle
                  className="text-[#f0f3f5]" /* score_gauge.bg_color */
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="48"
                  cy="48"
                />
                <circle
                  className="text-[#4bbfbf]" /* score_gauge.gradient_start */
                  strokeWidth="8"
                  strokeDasharray={276.46} // 2 * Math.PI * r (r = 44)
                  strokeDashoffset={276.46 - (score / 10) * 276.46}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="44"
                  cx="48"
                  cy="48"
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <div className="text-center">
                <div className="text-sm text-[#808995]">Score</div> {/* progress_bar.label_color */}
                <div className="text-xl font-semibold text-[#2f3542]">{score}/10</div> {/* score_gauge.text_color */}
              </div>
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
          <div className="text-sm text-[#2f3542]">{message}</div> {/* score_gauge.text_color */}
          <div className="text-[10px] text-[#808995] mt-1">Progress last 3 months</div> {/* progress_bar.label_color */}
          <div className="h-1 w-full rounded bg-[#f0f3f5] mt-1 overflow-hidden"> {/* progress_bar.base_bg */}
           
          </div>
          <button className="mt-3 inline-flex items-center justify-center rounded-md bg-[#ff8a70] text-white text-sm px-3 py-2">
            Get Personalized Tips
          </button>
        </div>
      </CardContent>
    </Card>
  )
}