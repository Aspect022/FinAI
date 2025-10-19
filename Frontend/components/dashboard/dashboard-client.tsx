"use client";

import * as React from "react";
import { Wallet2, TrendingUp, LineChart, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageToggle } from "@/components/onboarding/language-toggle";
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";

// Sample data for "Monthly Savings Trend" (last 6 months)
const savingsData = [
  { month: "Apr", savings: 6000 },
  { month: "May", savings: 7200 },
  { month: "Jun", savings: 6800 },
  { month: "Jul", savings: 7500 },
  { month: "Aug", savings: 8100 },
  { month: "Sep", savings: 9000 },
];

const chartConfig = {
  savings: {
    label: "Savings",
    // color is provided by theme tokens through ChartContainer styles
  },
};

export default function DashboardClient() {
  const [language, setLanguage] = React.useState<"en" | "hi">("en");
  const [txOpen, setTxOpen] = React.useState(false);

  const greeting = language === "en" ? "Hello, Rajesh" : "नमस्ते, राजेश";
  const quickStats = [
    {
      title: language === "en" ? "Total Savings" : "कुल बचत",
      value: "₹45,000",
      icon: Wallet2,
    },
    {
      title: language === "en" ? "This Month's Income" : "इस माह की आय",
      value: "₹28,000",
      icon: TrendingUp,
    },
    {
      title: language === "en" ? "Active Investments" : "सक्रिय निवेश",
      value: "3",
      icon: LineChart,
    },
  ];

  const recommendations = [
    {
      name: "SIP in Balanced Fund",
      risk: "Medium" as const,
      expectedReturn: "12-14% p.a.",
      reason:
        language === "en"
          ? "Balances growth and stability for your income pattern."
          : "आपकी आय के अनुसार स्थिरता और वृद्धि का संतुलन।",
    },
    {
      name: "Recurring Deposit",
      risk: "Low" as const,
      expectedReturn: "6.5-7% p.a.",
      reason:
        language === "en"
          ? "Safe, steady returns for short-term goals."
          : "लघु अवधि लक्ष्यों हेतु सुरक्षित और स्थिर रिटर्न।",
    },
    {
      name: "Blue-Chip Equity SIP",
      risk: "High" as const,
      expectedReturn: "14-16% p.a.",
      reason:
        language === "en"
          ? "Higher long-term growth potential with market risks."
          : "बाजार जोखिम के साथ दीर्घकालिक वृद्धि की अधिक संभावना।",
    },
  ];

  return (
    <main className="mx-auto max-w-3xl p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold">MoneyFyi</span>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <span className="text-pretty">{greeting}</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle
            language={language}
            onToggle={() => setLanguage((l) => (l === "en" ? "hi" : "en"))}
          />
          <Button
            size="icon"
            variant="outline"
            aria-label="Profile"
            onClick={() => (window.location.href = "/profile")}
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Quick Stats */}
      <section aria-labelledby="quick-stats-title" className="mb-6">
        <h2 id="quick-stats-title" className="sr-only">
          {language === "en" ? "Quick Stats" : "त्वरित आँकड़े"}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {quickStats.map((s, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-muted-foreground">
                    {s.title}
                  </CardTitle>
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-semibold">{s.value}</div>
              </CardContent>
            </Card>
          ))}
          {/* Third card full row on small screens */}
          <Card className="shadow-sm sm:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm text-muted-foreground">
                  {language === "en" ? "Active Investments" : "सक्रिय निवेश"}
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-semibold">3</div>
              <p className="mt-1 text-sm text-muted-foreground">
                {language === "en"
                  ? "Across SIPs and Deposits"
                  : "एसआईपी और जमा में विभाजित"}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recommendations */}
      <section aria-labelledby="recs-title" className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 id="recs-title" className="text-lg font-semibold text-pretty">
            {language === "en" ? "Your Recommendations" : "आपके सुझाव"}
          </h2>
          <Badge variant="outline">
            {language === "en" ? "Personalized" : "व्यक्तिगत"}
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {recommendations.map((r, idx) => (
            <RecommendationCard
              key={idx}
              name={r.name}
              risk={r.risk}
              expectedReturn={r.expectedReturn}
              reason={r.reason}
              href="/recommendation"
            />
          ))}
        </div>
      </section>

      {/* Monthly Savings Trend */}
      <section aria-labelledby="chart-title" className="mb-16">
        <h2 id="chart-title" className="text-lg font-semibold mb-3 text-pretty">
          {language === "en" ? "Monthly Savings Trend" : "मासिक बचत प्रवृत्ति"}
        </h2>
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <ChartContainer config={chartConfig} className="w-full">
              <BarChart data={savingsData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(v: number) => `₹${v / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  width={36}
                />
                <ChartTooltip
                  cursor={{ fill: "rgb(var(--muted))" }}
                  content={<ChartTooltipContent />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="savings" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Floating Add Transaction Button */}
      <AddTransactionDialog>
        <Button
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
          size="icon"
          aria-label={
            language === "en" ? "Add Cash Transaction" : "नकद लेन-देन जोड़ें"
          }
        >
          <Plus className="h-5 w-5" />
        </Button>
      </AddTransactionDialog>
    </main>
  );
}
