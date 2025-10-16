"use client"

import * as React from "react"
import { IndianRupee, CalendarIcon, ArrowDownCircle, ArrowUpCircle, StickyNote } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useToast } from "@/hooks/use-toast" // fix useToast import path to existing hook location

type TxType = "income" | "expense"

const INCOME_CATEGORIES = ["Daily Earnings", "Freelance Payment", "Tips"] as const
const EXPENSE_CATEGORIES = ["Food", "Transport", "Bills", "Other"] as const

function formatDate(d: Date | undefined) {
  if (!d) return "Pick a date"
  try {
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
  } catch {
    return "Pick a date"
  }
}

const AddTransactionDialog = ({
  children,
  onSaved,
  defaultOpen,
  open, //
  onOpenChange, //
}: {
  children: React.ReactNode
  onSaved?: (data: {
    type: TxType
    amount: number
    category: string
    date: Date
    notes?: string
  }) => void
  defaultOpen?: boolean
  open?: boolean //
  onOpenChange?: (open: boolean) => void //
}) => {
  const [internalOpen, setInternalOpen] = React.useState<boolean>(!!defaultOpen)
  const isControlled = typeof open === "boolean"
  const dialogOpen = isControlled ? (open as boolean) : internalOpen
  const setDialogOpen = (v: boolean) => {
    onOpenChange?.(v)
    if (!isControlled) setInternalOpen(v)
  }

  const [type, setType] = React.useState<TxType>("income")
  const [amount, setAmount] = React.useState<number>(0)
  const [category, setCategory] = React.useState<string>("")
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [notes, setNotes] = React.useState<string>("")

  const [errors, setErrors] = React.useState<{ amount?: string; category?: string }>({})

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  React.useEffect(() => {
    const valid = (type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).includes(category as any)
    if (!valid) setCategory("")
  }, [type, category])

  const { toast } = useToast()

  function resetForm() {
    setType("income")
    setAmount(0)
    setCategory("")
    setDate(new Date())
    setNotes("")
    setErrors({})
  }

  function validate() {
    const next: typeof errors = {}
    if (!amount || amount <= 0) next.amount = "Enter a positive amount"
    if (!category) next.category = "Select a category"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSave() {
    if (!validate()) return
    const payload = {
      type,
      amount,
      category,
      date: date || new Date(),
      notes: notes?.trim() || undefined,
    }
    ;(async () => {
      try {
        const res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            date: (payload.date as Date).toISOString(),
          }),
        })
        if (!res.ok) throw new Error("Failed to save transaction")
        const json = await res.json()
        toast({ title: "Transaction added successfully" })
        onSaved?.({
          type: json.item?.type ?? payload.type,
          amount: json.item?.amount ?? payload.amount,
          category: json.item?.category ?? payload.category,
          date: new Date(json.item?.date ?? payload.date),
          notes: json.item?.notes ?? payload.notes,
        })
        resetForm()
        setDialogOpen(false)
      } catch (e: any) {
        toast({
          title: "Could not add transaction",
          description: e?.message || "Please try again.",
          variant: "destructive",
        })
      }
    })()
  }

  function addQuickAmount(v: number) {
    setAmount((prev) => (Number.isFinite(prev) ? prev + v : v))
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-lg border", "backdrop-blur-md bg-background/80")}>
        <DialogHeader>
          <DialogTitle className="text-pretty">Add Cash Transaction</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Type selector */}
          <div className="grid gap-2">
            <Label htmlFor="tx-type">Type</Label>
            <ToggleGroup
              id="tx-type"
              type="single"
              value={type}
              onValueChange={(v) => v && setType(v as TxType)}
              className="w-full"
            >
              <ToggleGroupItem value="income" aria-label="Income" className="flex-1 data-[state=on]:border">
                <ArrowDownCircle className="mr-2 h-4 w-4" />
                Income
              </ToggleGroupItem>
              <ToggleGroupItem value="expense" aria-label="Expense" className="flex-1 data-[state=on]:border">
                <ArrowUpCircle className="mr-2 h-4 w-4" />
                Expense
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Amount with ₹ prefix and quick buttons */}
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground inline-flex items-center"
                aria-hidden="true"
              >
                <IndianRupee className="h-4 w-4" />
              </span>
              <Input
                id="amount"
                inputMode="decimal"
                type="number"
                min={0}
                step="1"
                value={Number.isFinite(amount) ? amount : ""}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === "") {
                    setAmount(Number.NaN)
                  } else {
                    const n = Number.parseFloat(v)
                    setAmount(Number.isFinite(n) ? n : Number.NaN)
                  }
                }}
                className="pl-9"
                aria-invalid={!!errors.amount}
                aria-describedby={errors.amount ? "amount-error" : undefined}
                placeholder="0"
              />
            </div>
            {errors.amount ? (
              <p id="amount-error" className="text-sm text-destructive" aria-live="polite">
                {errors.amount}
              </p>
            ) : null}
            <div className="flex items-center gap-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => addQuickAmount(100)}>
                +100
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => addQuickAmount(500)}>
                +500
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => addQuickAmount(1000)}>
                +1000
              </Button>
            </div>
          </div>

          {/* Category select */}
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id="category"
                aria-invalid={!!errors.category}
                aria-describedby={errors.category ? "category-error" : undefined}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category ? (
              <p id="category-error" className="text-sm text-destructive" aria-live="polite">
                {errors.category}
              </p>
            ) : null}
          </div>

          {/* Date picker */}
          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start gap-2 bg-transparent">
                  <CalendarIcon className="h-4 w-4" />
                  {formatDate(date)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notes */}
          <div className="grid gap-2">
            <Label htmlFor="notes" className="inline-flex items-center gap-2">
              <StickyNote className="h-4 w-4" />
              Notes (optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Add a short note"
            />
          </div>
        </div>

        <DialogFooter className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Save Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/*
Usage:

<AddTransactionDialog>
  <Button>Add Transaction</Button>
</AddTransactionDialog>

You can also pass onSaved to receive the saved payload.
*/

export default AddTransactionDialog
export { AddTransactionDialog }
