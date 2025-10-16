import { type NextRequest, NextResponse } from "next/server"

const details: Record<string, any> = {
  rec1: {
    id: "rec1",
    title: "Start SIP ₹1,500/mo",
    reasons: ["Builds habit", "Rupee-cost averaging", "Aligned with risk profile"],
    sentiment: { score: 0.7, label: "Positive" },
    projection: [
      { month: "M1", value: 1500 },
      { month: "M2", value: 3000 },
      { month: "M3", value: 4500 },
      { month: "M4", value: 6000 },
    ],
  },
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const d = details[params.id] || details["rec1"]
  return NextResponse.json(d)
}
