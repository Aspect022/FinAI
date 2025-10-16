import { type NextRequest, NextResponse } from "next/server"

type Tx = {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  notes?: string
  merchant?: string
  date: string
}

const store: Tx[] = [
  { id: "t1", type: "income", amount: 12000, category: "Delivery", date: new Date().toISOString(), notes: "Zomato" },
  { id: "t2", type: "expense", amount: 3500, category: "Fuel", date: new Date().toISOString(), notes: "Bike petrol" },
]

export async function GET(req: NextRequest) {
  return NextResponse.json({ items: store })
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Tx>
    if (!body || typeof body.amount !== "number" || !body.type) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }
    const tx: Tx = {
      id: `t${Date.now()}`,
      type: body.type,
      amount: body.amount,
      category: body.category || (body.type === "income" ? "Income" : "Expense"),
      notes: body.notes,
      merchant: body.merchant,
      date: body.date || new Date().toISOString(),
    }
    store.unshift(tx)
    return NextResponse.json({ ok: true, item: tx })
  } catch (e) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 })
  }
}
