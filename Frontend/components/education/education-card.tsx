"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Flame } from "lucide-react"

type State = "not-started" | "in-progress" | "completed"

export function EducationCard({
  title,
  mode = "5 min read",
  difficulty = "Beginner",
  state = "not-started",
  progress = 0,
}: {
  title: string
  mode?: string
  difficulty?: "Beginner" | "Intermediate"
  state?: State
  progress?: number
}) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-foreground">{title}</div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{mode}</Badge>
            <Badge variant="outline">{difficulty}</Badge>
          </div>
        </div>
        {state === "completed" ? (
          <div className="flex items-center gap-2 text-emerald-600 text-xs">
            <CheckCircle2 className="h-4 w-4" /> Completed
          </div>
        ) : state === "in-progress" ? (
          <div>
            <div className="h-2 w-full rounded bg-[#f0f3f5] overflow-hidden"> {/* progress_bar.base_bg */}
              <div 
                className="h-full rounded" 
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(to right, #ff8a70, #ff6f55)` /* Using orange and a darker orange */
                }} 
              />
            </div>
            <div className="mt-1 text-xs text-[#808995]">{progress}% completed</div> {/* progress_bar.label_color */}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">Not started</div>
        )}
        <div className="flex items-center justify-between pt-1">
          <div className="text-[10px] text-muted-foreground inline-flex items-center gap-1">
            Earn 50 points <Flame className="h-3 w-3 text-orange-500" />
          </div>
          <button className="text-sm rounded-md bg-primary text-primary-foreground px-3 py-1.5">Start Learning</button>
        </div>
      </CardContent>
    </Card>
  )
}
