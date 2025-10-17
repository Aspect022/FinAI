"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Bus,
  Receipt,
  Utensils,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import AddTransactionDialog from "@/components/transactions/add-transaction-dialog";
import { useTranslation } from "@/components/i18n/translation-provider";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

type Range = "week" | "month" | "custom";

function humanDateLabel(d: Date) {
  const today = new Date();
  const yd = new Date();
  yd.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(d, today)) return "Today";
  if (isSameDay(d, yd)) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export default function HistoryPage() {
  const { t } = useTranslation();
  const { data } = useSWR("/api/transactions", fetcher);
  const [type, setType] = useState<"all" | "income" | "expense">("all");
  const [range, setRange] = useState<"week" | "month" | "custom">("month");
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    const arr = (data?.items ?? []) as Array<any>;
    return arr.filter((i) => (type === "all" ? true : i.type === type));
  }, [data, type]);

  const summary = useMemo(() => {
    let income = 0,
      expense = 0;
    for (const i of items) {
      if (i.type === "income") income += i.amount;
      if (i.type === "expense") expense += i.amount;
    }
    return { income, expense, savings: income - expense };
  }, [items]);

  const groups = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const i of items) {
      const key = new Date(i.date).toDateString();
      map[key] ||= [];
      map[key].push(i);
    }
    return Object.entries(map)
      .map(([k, arr]) => [humanDateLabel(new Date(k)), arr] as [string, any[]])
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  }, [items]);

  const iconFor = (category: string, type: string) => {
    if (type === "income") {
      if (/daily|freelance|tips/i.test(category))
        return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      return <Wallet className="h-4 w-4 text-emerald-600" />;
    }
    if (/food/i.test(category))
      return <Utensils className="h-4 w-4 text-red-600" />;
    if (/transport/i.test(category))
      return <Bus className="h-4 w-4 text-red-600" />;
    if (/bill/i.test(category))
      return <Receipt className="h-4 w-4 text-red-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

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
          <h1 className="text-2xl font-semibold">{t("history")}</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Filter chips */}
          <div className="hidden sm:flex items-center gap-2">
            <Badge
              variant={type === "all" ? "default" : "outline"}
              onClick={() => setType("all")}
              className="cursor-pointer"
            >
              {t("all")}
            </Badge>
            <Badge
              variant={type === "income" ? "default" : "outline"}
              onClick={() => setType("income")}
              className="cursor-pointer"
            >
              {t("income")}
            </Badge>
            <Badge
              variant={type === "expense" ? "default" : "outline"}
              onClick={() => setType("expense")}
              className="cursor-pointer"
            >
              {t("expense")}
            </Badge>
          </div>

          {/* Date range selector */}
          <Select value={range} onValueChange={(v: Range) => setRange(v)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("dateRange")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{t("thisWeek")}</SelectItem>
              <SelectItem value="month">{t("thisMonth")}</SelectItem>
              <SelectItem value="custom">{t("custom")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Summary cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("monthlyIncome")}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            ₹{summary.income.toLocaleString("en-IN")}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("monthlyExpenses")}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            ₹{summary.expense.toLocaleString("en-IN")}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("netSavings")}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            ₹{summary.savings.toLocaleString("en-IN")}
          </CardContent>
        </Card>
      </section>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-lg text-muted-foreground">{t("emptyState")}</div>
        </div>
      ) : (
        <section className="space-y-4">
          {groups.map(([date, arr]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle className="text-sm">{date}</CardTitle>
              </CardHeader>
              <CardContent className="divide-y">
                {arr.map((i) => (
                  <div
                    key={i.id}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="shrink-0 rounded-md bg-muted h-8 w-8 grid place-items-center">
                        {iconFor(i.category, i.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{i.category}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(i.date).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          · {i.notes || i.merchant || "-"}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        i.type === "income"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {i.type === "income" ? "+" : "-"}₹
                      {i.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* Floating Add Transaction Button + Dialog */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-5 z-40 rounded-full h-12 px-5 shadow-lg"
      >
        <Plus className="h-5 w-5 mr-2" />
        {t("addTransaction")}
      </Button>
      <AddTransactionDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}
