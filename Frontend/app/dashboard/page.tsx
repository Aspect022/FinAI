"use client";

import { Wallet2, TrendingUp, LineChart, User, Plus } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useTranslation } from "@/components/i18n/translation-provider";
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog";
import { MarketInsights } from "@/components/widgets/market-insights";
import { FinancialHealthCard } from "@/components/widgets/financial-health-card";
import { EducationCard } from "@/components/education/education-card";

const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((m) => m.CartesianGrid),
  { ssr: false }
);

const savingsData = [
  { month: "Apr", savings: 6000 },
  { month: "May", savings: 7200 },
  { month: "Jun", savings: 6800 },
  { month: "Jul", savings: 7500 },
  { month: "Aug", savings: 8100 },
  { month: "Sep", savings: 9000 },
];

export default function DashboardPage() {
  const { t, lang, setLang } = useTranslation();

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
          <span className="font-semibold">MoneyFyi</span>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <span className="text-pretty">{"Hello, Rajesh"}</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              {t("totalSavings")}
            </CardTitle>
            <Wallet2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹45,000</CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              {t("monthlyIncome")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">₹28,000</CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Active Investments
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">3</CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MarketInsights />
        <FinancialHealthCard />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-pretty">
          {t("recommendations")}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  SIP in Balanced Fund
                </CardTitle>
                <span className="text-xs px-2 py-0.5 rounded-md border">
                  Medium
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Expected: 12-14% p.a.
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-pretty text-foreground/80 mb-3">
                Balances growth and stability for your income pattern.
              </p>
              <Button size="sm" asChild>
                <a
                  href="/recommendation"
                  aria-label="View details for SIP in Balanced Fund"
                >
                  View Details
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recurring Deposit</CardTitle>
                <span className="text-xs px-2 py-0.5 rounded-md border">
                  Low
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Expected: 6.5-7% p.a.
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-pretty text-foreground/80 mb-3">
                Safe, steady returns for short-term goals.
              </p>
              <Button size="sm" asChild>
                <a
                  href="/recommendation"
                  aria-label="View details for Recurring Deposit"
                >
                  View Details
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Blue-Chip Equity SIP
                </CardTitle>
                <span className="text-xs px-2 py-0.5 rounded-md border">
                  High
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Expected: 14-16% p.a.
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-pretty text-foreground/80 mb-3">
                Higher long-term growth potential with market risks.
              </p>
              <Button size="sm" asChild>
                <a
                  href="/recommendation"
                  aria-label="View details for Blue-Chip Equity SIP"
                >
                  View Details
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-pretty">
          Financial Literacy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <EducationCard
            title="What is SIP?"
            mode="5 min read"
            difficulty="Beginner"
            state="completed"
            progress={100}
          />
          <EducationCard
            title="Understanding Risk vs Return"
            mode="6 min read"
            difficulty="Beginner"
            state="in-progress"
            progress={45}
          />
          <EducationCard
            title="Emergency Funds 101"
            mode="3 min video"
            difficulty="Beginner"
            state="not-started"
          />
        </div>
      </section>

      <section className="space-y-3 mb-20">
        <h2 className="text-lg font-semibold text-pretty">
          Monthly Savings Trend
        </h2>
        <Card className="shadow-sm">
          <CardContent className="pt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(47, 53, 66, 0.08)" /> {/* chart_histogram.grid_line */}
                <XAxis dataKey="month" stroke="rgba(47, 53, 66, 0.55)" /> {/* chart_histogram.axis_text */}
                <YAxis stroke="rgba(47, 53, 66, 0.55)" /> {/* chart_histogram.axis_text */}
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#2f3542', /* chart_histogram.tooltip_bg */
                    borderColor: '#2f3542',
                    color: '#ffffff', /* chart_histogram.tooltip_text */
                    borderRadius: 'var(--radius)',
                    border: '1px solid #2f3542'
                  }} 
                />
                <Bar 
                  dataKey="savings" 
                  radius={[4, 4, 0, 0]} 
                  fill="url(#colorSavings)" 
                />
                <defs>
                  <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff8a70" stopOpacity={0.8}/> {/* Orange start */}
                    <stop offset="95%" stopColor="#ff6f55" stopOpacity={0.4}/> {/* Darker orange end */}
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <AddTransactionDialog>
        <Button
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
          size="icon"
          aria-label={t("addTransaction")}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </AddTransactionDialog>
    </main>
  );
}
