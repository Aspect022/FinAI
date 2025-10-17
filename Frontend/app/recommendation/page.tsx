"use client";

import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeInfo,
  TrendingUp,
  ShieldCheck,
  PiggyBank,
  ArrowLeft,
} from "lucide-react";
import { ProjectionChart } from "@/components/recommendation/projection-chart";

export default function RecommendationPage() {
  const router = useRouter();

  return (
    <div className="min-h-[100svh] flex flex-col">
      <header className="w-full border-b bg-card">
        <div className="mx-auto w-full max-w-screen-sm px-4 py-3 flex items-center gap-3">
          <img
            src="/logo.png"
            alt="MoneyFyi Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain rounded-full"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <h1 className="text-pretty text-lg font-semibold">
            Your Investment Recommendation
          </h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-screen-sm px-4 py-6 md:py-8">
          {/* Investment Card (hero) */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-pretty text-xl font-semibold">
                    HDFC Balanced Advantage Fund
                  </h2>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground"
                    aria-label="Risk: Medium"
                  >
                    Medium Risk
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground">
                      Expected returns
                    </div>
                    <div className="font-semibold">12–15% annually</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground">
                      Minimum investment
                    </div>
                    <div className="font-semibold">₹500/month</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-muted-foreground">Type</div>
                    <div className="font-semibold">
                      Balanced Advantage (Hybrid)
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This option balances growth and stability by dynamically
                  managing equity and debt. It’s designed to help your money
                  grow steadily while cushioning big market swings.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why this? */}
          <div className="mt-6">
            <h3 className="text-pretty text-base font-semibold mb-3">
              Why This?
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <ReasonCard
                Icon={PiggyBank}
                title="Your consistent savings pattern"
                desc="You regularly set aside money, so a steady-growth plan fits well."
              />
              <ReasonCard
                Icon={TrendingUp}
                title="Positive market sentiment for diversified funds"
                desc="FinBERT signals a favorable outlook for diversified funds right now."
              />
              <ReasonCard
                Icon={ShieldCheck}
                title="Matches your moderate risk profile"
                desc="Aligned to a moderate approach for balanced results."
              />
            </div>
          </div>

          {/* Market Insight */}
          <div className="mt-6">
            <h3 className="text-pretty text-base font-semibold mb-3">
              Market insight
            </h3>
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md border">
                      <TrendingUp
                        className="h-5 w-5 text-accent"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Current Sentiment
                      </div>
                      <div className="text-lg font-semibold text-accent">
                        Bullish
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <BadgeInfo className="h-4 w-4" aria-hidden="true" />
                    Based on FinBERT analysis of 150+ news articles
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projection Chart */}
          <div className="mt-6">
            <h3 className="text-pretty text-base font-semibold mb-3">
              Potential growth
            </h3>
            <ProjectionChart />
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Illustrative example showing how ₹500/month could grow over time
              at mid-range returns. Actual performance can vary. Use this as a
              guide, not a guarantee.
            </p>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 left-0 right-0 mt-6 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto w-full max-w-screen-sm px-4 py-4 grid grid-cols-2 gap-3">
              <Button
                type="button"
                className="col-span-2 md:col-span-1 bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                I&apos;m Interested
              </Button>
              <div className="col-span-2 md:col-span-1 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Not for Me
                </Button>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary underline underline-offset-4 hover:no-underline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ReasonCard({
  Icon,
  title,
  desc,
}: {
  Icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-md border">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <div className="font-medium">{title}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
