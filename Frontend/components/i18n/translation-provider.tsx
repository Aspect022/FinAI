"use client";

import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Lang = "en" | "hi";

type Dict = Record<string, Record<Lang, string>>;

// Minimal shared dictionary. Extend as needed.
const dict: Dict = {
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  totalSavings: { en: "Total Savings", hi: "कुल बचत" },
  monthlyIncome: { en: "Monthly Income", hi: "मासिक आय" },
  monthlyExpenses: { en: "Monthly Expenses", hi: "मासिक खर्च" },
  recommendations: { en: "Recommendations", hi: "सिफारिशें" },
  addTransaction: { en: "Add Transaction", hi: "लेन-देन जोड़ें" },
  history: { en: "History", hi: "इतिहास" },
  portfolio: { en: "Portfolio", hi: "पोर्टफोलियो" },
  filter: { en: "Filter", hi: "फ़िल्टर" },
  type: { en: "Type", hi: "प्रकार" },
  dateRange: { en: "Date Range", hi: "तिथि सीमा" },
  income: { en: "Income", hi: "आय" },
  expense: { en: "Expense", hi: "खर्च" },
  all: { en: "All", hi: "सभी" },
  netSavings: { en: "Net Savings", hi: "शुद्ध बचत" },
  thisWeek: { en: "This Week", hi: "इस सप्ताह" },
  thisMonth: { en: "This Month", hi: "इस माह" },
  custom: { en: "Custom", hi: "कस्टम" },
  emptyState: {
    en: "No transactions yet. Tap + to add your first entry",
    hi: "अभी तक कोई लेन-देन नहीं। पहला जोड़ने के लिए + दबाएं",
  },
};

type TranslationContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load persisted language
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem("lang") as Lang | null)
        : null;
    if (saved === "en" || saved === "hi") {
      setLangState(saved);
    }
  }, []);

  // Listen for global language change events
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<Lang>;
      if (custom.detail === "en" || custom.detail === "hi") {
        setLang(custom.detail);
      }
    };
    window.addEventListener("MoneyFyi:set-language", handler as EventListener);
    return () =>
      window.removeEventListener(
        "MoneyFyi:set-language",
        handler as EventListener
      );
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    // broadcast to other listeners if any
    window.dispatchEvent(
      new CustomEvent<Lang>("MoneyFyi:language-changed", { detail: l })
    );
  }, []);

  const t = useCallback(
    (key: keyof typeof dict) => {
      return dict[key]?.[lang] ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx)
    throw new Error("useTranslation must be used within TranslationProvider");
  return ctx;
}

// Helper for non-React code
export function setAppLanguage(lang: Lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch {}
  window.dispatchEvent(
    new CustomEvent<Lang>("MoneyFyi:set-language", { detail: lang })
  );
}
