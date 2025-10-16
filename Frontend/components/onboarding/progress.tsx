"use client"

import { cn } from "@/lib/utils"

export function ProgressSteps({
  currentStep,
  steps,
}: {
  currentStep: number
  steps: string[]
}) {
  return (
    <ol className="flex items-center gap-2" role="list">
      {steps.map((label, idx) => {
        const stepNum = idx + 1
        const isDone = stepNum < currentStep
        const isCurrent = stepNum === currentStep
        return (
          <li key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "h-7 w-7 rounded-full grid place-items-center text-xs font-medium border",
                isDone && "bg-accent text-accent-foreground border-accent",
                isCurrent && "bg-primary text-primary-foreground border-primary",
                !isDone && !isCurrent && "bg-secondary text-secondary-foreground",
              )}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`${stepNum}: ${label}`}
            >
              {stepNum}
            </div>
            {/* connector except for last */}
            {idx < steps.length - 1 && (
              <div
                aria-hidden="true"
                className={cn("h-0.5 w-6 rounded", stepNum < currentStep ? "bg-accent" : "bg-muted")}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
