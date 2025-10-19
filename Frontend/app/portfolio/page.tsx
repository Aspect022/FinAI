"use client";

import useSWR from "swr";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslation } from "@/components/i18n/translation-provider";
import { InvestmentCard } from "@/components/portfolio/investment-card";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const PieChart = dynamic(() => import("recharts").then((m) => m.PieChart), {
  ssr: false,
});
const Pie = dynamic(() => import("recharts").then((m) => m.Pie), {
  ssr: false,
});
const Cell = dynamic(() => import("recharts").then((m) => m.Cell), {
  ssr: false,
});
const LineChart = dynamic(() => import("recharts").then((m) => m.LineChart), {
  ssr: false,
});
const Line = dynamic(() => import("recharts").then((m) => m.Line), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), {
  ssr: false,
});

const COLORS = [
  "rgb(var(--chart-1))",
  "rgb(var(--chart-2))",
  "rgb(var(--chart-3))",
  "rgb(var(--chart-4))",
  "rgb(var(--chart-5))",
  "rgb(var(--chart-6))",
  "rgb(var(--chart-7))",
  "rgb(var(--chart-8))",
  "rgb(var(--chart-9))",
  "rgb(var(--chart-10))",
];

export default function PortfolioPage() {
  const { t } = useTranslation();
  const { data } = useSWR("/api/portfolio", fetcher);

  return (
    <main className="p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="MoneyFyi Logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain rounded-full"
          />
          <h1 className="text-2xl font-semibold">{t("portfolio")}</h1>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4">
        <Card className="bg-card/60 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold text-foreground">
                ₹{(data?.totalPortfolio ?? 0).toLocaleString("en-IN")}
              </div>
              <div
                className={`mt-1 flex items-center gap-1 text-sm ${
                  data?.todaysChange?.direction === "down"
                    ? "text-red-500"
                    : "text-[var(--chart-2)]"
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                +₹{data?.todaysChange?.amount?.toLocaleString("en-IN")} (
                {data?.todaysChange?.percent}%)
                <span className="text-muted-foreground text-xs ml-1">
                  Today
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">Portfolio Report</Button>
              <Button>Add Investment</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer
              config={
                (data?.allocation ?? []).reduce(
                  (acc: any, item: any, idx: number) => {
                    acc[item.name] = {
                      label: item.name,
                      color: COLORS[idx % COLORS.length],
                    };
                    return acc;
                  },
                  {
                    value: {
                      label: "Allocation",
                    }
                  }
                )
              }
              className="h-full w-full [&_.recharts-pie-sector]:outline-none [&_.recharts-pie-sector]:focus-visible:outline-ring"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    nameKey="name"
                    data={(data?.allocation ?? []).map((item: any, idx: number) => ({
                      ...item,
                      fill: COLORS[idx % COLORS.length], // Add fill directly to data
                    }))}
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={2}
                    label
                  >
                    {(data?.allocation ?? []).map((_: any, idx: number) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={COLORS[idx % COLORS.length]}
                        stroke="rgb(var(--background))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => [`${value}%`, "Allocation"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {(data?.allocation ?? []).map((a: any, i: number) => (
                <div key={a.name} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-muted-foreground flex-1 truncate">
                    {a.name}
                  </span>
                  <span className="font-medium text-foreground">
                    {a.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Investments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(data?.investments ?? []).length === 0 ? (
              <div className="text-sm text-muted-foreground">
                Start your investment journey — Check recommendations
              </div>
            ) : (
              (data?.investments ?? []).map((it: any, idx: number) => (
                <InvestmentCard key={idx} item={it} />
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
