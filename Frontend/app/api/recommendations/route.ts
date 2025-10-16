import { NextResponse } from "next/server"

const items = [
  { id: "rec1", title: "Start SIP ₹1,500/mo", subtitle: "Balanced fund for moderate risk" },
  { id: "rec2", title: "Emergency Fund Top-up", subtitle: "Add ₹5,000 to reach 3 months buffer" },
  { id: "rec3", title: "Pay Down Debt", subtitle: "Close high-interest credit first" },
  { id: "rec4", title: "Bike Maintenance Budget", subtitle: "Reserve ₹800/mo to avoid surprises" },
  { id: "rec5", title: "Insurance Review", subtitle: "Check term + health coverage" },
]

export async function GET() {
  return NextResponse.json({ items })
}
