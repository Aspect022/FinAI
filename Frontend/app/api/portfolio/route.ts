import { type NextRequest, NextResponse } from "next/server"

const sample = {
  totals: { savings: 42000, income: 24000, expenses: 18500 },
  totalPortfolio: 124500,
  todaysChange: { amount: 450, percent: 0.36, direction: "up" as const },
  allocation: [
    { name: "Equity", value: 60 },
    { name: "Debt", value: 30 },
    { name: "Gold", value: 10 },
  ],
  series: [
    { month: "Apr", savings: 30000 },
    { month: "May", savings: 32000 },
    { month: "Jun", savings: 35000 },
    { month: "Jul", savings: 38000 },
    { month: "Aug", savings: 40000 },
    { month: "Sep", savings: 42000 },
  ],
  miniSeries: [
    { label: "Equity", data: [{ value: 54 }, { value: 58 }, { value: 60 }] },
    { label: "Debt", data: [{ value: 28 }, { value: 29 }, { value: 30 }] },
    { label: "Gold", data: [{ value: 8 }, { value: 9 }, { value: 10 }] },
  ],
  investments: [
    {
      name: "HDFC Balanced Advantage",
      type: "Mutual Fund",
      currentValue: 48500,
      returns: { amount: 1250, percent: 2.6 },
      direction: "up",
      data: [{ value: 60 }, { value: 64 }, { value: 68 }, { value: 72 }],
    },
    {
      name: "Sovereign Gold Bonds",
      type: "Gold",
      currentValue: 15500,
      returns: { amount: -150, percent: -0.9 },
      direction: "down",
      data: [{ value: 18 }, { value: 17.5 }, { value: 17.2 }, { value: 17 }],
    },
    {
      name: "Nippon Liquid Fund",
      type: "Debt",
      currentValue: 30500,
      returns: { amount: 250, percent: 0.8 },
      direction: "up",
      data: [{ value: 30 }, { value: 30.2 }, { value: 30.4 }, { value: 30.5 }],
    },
  ],
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("series")) {
    return NextResponse.json({ series: sample.series })
  }
  return NextResponse.json(sample)
}
