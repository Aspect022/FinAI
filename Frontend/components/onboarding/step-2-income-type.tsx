"use client"
import { cn } from "@/lib/utils"
import { Bike, Laptop, Store, Briefcase } from "lucide-react"

export type IncomeType = "gig" | "freelancer" | "small-business" | "salaried"

const labels: Record<"en" | "hi", Record<IncomeType, string>> = {
  en: {
    gig: "Gig Worker",
    freelancer: "Freelancer",
    "small-business": "Small Business",
    salaried: "Salaried",
  },
  hi: {
    gig: "गिग वर्कर",
    freelancer: "फ्रीलांसर",
    "small-business": "छोटा व्यवसाय",
    salaried: "वेतनभोगी",
  },
}

export function StepIncomeType({
  language,
  value,
  onChange,
}: {
  language: "en" | "hi"
  value: IncomeType | ""
  onChange: (v: IncomeType) => void
}) {
  const items: { key: IncomeType; label: string; Icon: any }[] = [
    { key: "gig", label: labels[language]["gig"], Icon: Bike },
    { key: "freelancer", label: labels[language]["freelancer"], Icon: Laptop },
    { key: "small-business", label: labels[language]["small-business"], Icon: Store },
    { key: "salaried", label: labels[language]["salaried"], Icon: Briefcase },
  ]

  return (
    <div
      role="radiogroup"
      aria-label={language === "en" ? "Select income type" : "आय का प्रकार चुनें"}
      className="grid grid-cols-1 gap-3 md:grid-cols-2"
    >
      {items.map(({ key, label, Icon }) => {
        const selected = value === key
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(key)}
            className={cn(
              "text-left rounded-lg border p-3 focus:outline-none focus:ring-2",
              selected ? "border-accent bg-accent text-accent-foreground" : "hover:bg-secondary",
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn("rounded-md p-2 border", selected ? "border-accent-foreground/30" : "border-border")}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-medium">{label}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
