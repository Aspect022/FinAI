import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Risk = "Low" | "Medium" | "High"

export function RecommendationCard({
  name,
  risk,
  expectedReturn,
  reason,
  href = "/recommendation",
}: {
  name: string
  risk: Risk
  expectedReturn: string
  reason: string
  href?: string
}) {
  const riskVariant = risk === "Low" ? "secondary" : risk === "Medium" ? "outline" : "destructive"

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">{name}</CardTitle>
          <Badge variant={riskVariant} aria-label={`Risk: ${risk}`}>
            {risk}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">Expected: {expectedReturn}</div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-pretty text-foreground/80 mb-3">{reason}</p>
        <Button asChild size="sm">
          <Link href={href} aria-label={`View details for ${name}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
