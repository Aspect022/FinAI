"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function StepBasic({
  t,
  name,
  age,
  onChangeName,
  onChangeAge,
}: {
  t: Record<string, string>
  name: string
  age: number | ""
  onChangeName: (v: string) => void
  onChangeAge: (v: number | "") => void
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">{t.name}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t.name_placeholder}
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          autoComplete="name"
          inputMode="text"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="age">{t.age}</Label>
        <Input
          id="age"
          name="age"
          placeholder={t.age_placeholder}
          value={age}
          onChange={(e) => {
            const v = e.target.value
            if (v === "") return onChangeAge("")
            const n = Number.parseInt(v, 10)
            if (Number.isNaN(n)) return
            onChangeAge(n)
          }}
          inputMode="numeric"
          type="number"
          min={18}
          max={70}
        />
      </div>
    </div>
  )
}
