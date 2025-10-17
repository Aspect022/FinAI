"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressSteps } from "@/components/onboarding/progress";
import { LanguageToggle } from "@/components/onboarding/language-toggle";
import { StepBasic } from "@/components/onboarding/step-1-basic";
import {
  StepIncomeType,
  type IncomeType,
} from "@/components/onboarding/step-2-income-type";
import { StepIncomeSlider } from "@/components/onboarding/step-3-income-slider";
import { StepRisk, type RiskLevel } from "@/components/onboarding/step-4-risk";
import {
  ProfileDetailsComponent,
  type ProfileDetails,
} from "@/components/onboarding/profile-details";
import { setAppLanguage } from "@/components/i18n/translation-provider";

type Lang = "en" | "hi";

const tDict: Record<Lang, Record<string, string>> = {
  en: {
    title: "MoneyFyi Onboarding",
    subtitle: "Tell us about yourself to personalize your financial plan.",
    continue: "Continue",
    back: "Back",
    step1_title: "Basic Details",
    step2_title: "Profile Details",
    step3_title: "Monthly Income",
    step4_title: "Risk Tolerance",
    name: "Full Name",
    age: "Age",
    name_placeholder: "Enter your name",
    age_placeholder: "Enter your age",
    occupation: "Occupation",
    occupation_placeholder: "e.g., Software Engineer",
    location: "Location",
    location_placeholder: "City, State",
    maritalStatus: "Marital Status",
    maritalStatus_placeholder: "Select status",
    maritalStatus_single: "Single",
    maritalStatus_married: "Married",
    maritalStatus_divorced: "Divorced",
    maritalStatus_widowed: "Widowed",
    dependents: "Number of Dependents",
    dependents_placeholder: "0",
    financialGoals: "Financial Goals",
    financialGoals_placeholder: "e.g., Retirement, House, Education",
    investmentExperience: "Investment Experience",
    investmentExperience_placeholder: "Select experience level",
    investmentExperience_none: "No Experience",
    investmentExperience_beginner: "Beginner",
    investmentExperience_intermediate: "Intermediate",
    investmentExperience_advanced: "Advanced",
    email: "Email Address",
    email_placeholder: "your.email@example.com",
    phone: "Phone Number",
    phone_placeholder: "+91 XXXXX XXXXX",
    emergencyContactName: "Emergency Contact Name",
    emergencyContactName_placeholder: "Full name",
    emergencyContactPhone: "Emergency Contact Phone",
    emergencyContactPhone_placeholder: "+91 XXXXX XXXXX",
    risk_conservative: "Conservative",
    risk_moderate: "Moderate",
    risk_aggressive: "Aggressive",
    currency_hint: "Drag to set your monthly income",
    // errors
    err_name_required: "Please enter your name (2–50 characters).",
    err_age_required: "Please enter a valid age between 18 and 70.",
    err_incomeType_required: "Please select your income type.",
    err_income_required: "Please set your income between ₹5,000 and ₹1,00,000.",
    err_risk_required: "Please choose a risk level.",
    // progress
    p1: "Basics",
    p2: "Profile",
    p3: "Income Type",
    p4: "Monthly Income",
    p5: "Risk",
    risk_conservative_desc: "Lower risk, steady growth",
    risk_moderate_desc: "Balanced risk and return",
    risk_aggressive_desc: "Higher risk, higher potential",
    profile_title: "Profile Settings",
    profile_subtitle: "Manage your personal and financial information",
    personal_info: "Personal Information",
    cancel: "Cancel",
    save_changes: "Save Changes",
    saving: "Saving...",
  },
  hi: {
    title: "MoneyFyi ऑनबोर्डिंग",
    subtitle:
      "अपनी जानकारी दें ताकि हम आपकी वित्तीय योजना को व्यक्तिगत बना सकें।",
    continue: "आगे बढ़ें",
    back: "वापस",
    step1_title: "मूल विवरण",
    step2_title: "प्रोफ़ाइल विवरण",
    step3_title: "मासिक आय",
    step4_title: "जोखिम सहनशीलता",
    name: "पूरा नाम",
    age: "उम्र",
    name_placeholder: "अपना नाम लिखें",
    age_placeholder: "अपनी उम्र लिखें",
    occupation: "व्यवसाय",
    occupation_placeholder: "उदाहरण: सॉफ्टवेयर इंजीनियर",
    location: "स्थान",
    location_placeholder: "शहर, राज्य",
    maritalStatus: "वैवाहिक स्थिति",
    maritalStatus_placeholder: "स्थिति चुनें",
    maritalStatus_single: "अविवाहित",
    maritalStatus_married: "विवाहित",
    maritalStatus_divorced: "तलाकशुदा",
    maritalStatus_widowed: "विधवा",
    dependents: "परिवार के सदस्य",
    dependents_placeholder: "0",
    financialGoals: "वित्तीय लक्ष्य",
    financialGoals_placeholder: "उदाहरण: सेवानिवृत्ति, घर, शिक्षा",
    investmentExperience: "निवेश अनुभव",
    investmentExperience_placeholder: "अनुभव स्तर चुनें",
    investmentExperience_none: "कोई अनुभव नहीं",
    investmentExperience_beginner: "शुरुआतकर्ता",
    investmentExperience_intermediate: "मध्यम",
    investmentExperience_advanced: "उन्नत",
    email: "ईमेल पता",
    email_placeholder: "your.email@example.com",
    phone: "फ़ोन नंबर",
    phone_placeholder: "+91 XXXXX XXXXX",
    emergencyContactName: "आपातकालीन संपर्क नाम",
    emergencyContactName_placeholder: "पूरा नाम",
    emergencyContactPhone: "आपातकालीन संपर्क फ़ोन",
    emergencyContactPhone_placeholder: "+91 XXXXX XXXXX",
    risk_conservative: "सुरक्षित",
    risk_moderate: "मध्यम",
    risk_aggressive: "आक्रामक",
    currency_hint: "अपनी मासिक आय सेट करने के लिए स्लाइड करें",
    // errors
    err_name_required: "कृपया अपना नाम दर्ज करें (2–50 अक्षर).",
    err_age_required: "कृपया 18 से 70 के बीच मान्य उम्र दर्ज करें.",
    err_incomeType_required: "कृपया आय का प्रकार चुनें.",
    err_income_required: "कृपया ₹5,000 से ₹1,00,000 के बीच आय सेट करें.",
    err_risk_required: "कृपया एक जोखिम स्तर चुनें.",
    // progress
    p1: "बुनियादी",
    p2: "प्रोफ़ाइल",
    p3: "आय प्रकार",
    p4: "मासिक आय",
    p5: "जोखिम",
    risk_conservative_desc: "कम जोखिम, स्थिर वृद्धि",
    risk_moderate_desc: "संतुलित जोखिम और रिटर्न",
    risk_aggressive_desc: "उच्च जोखिम, अधिक संभावित",
    profile_title: "प्रोफ़ाइल सेटिंग्स",
    profile_subtitle: "अपनी व्यक्तिगत और वित्तीय जानकारी प्रबंधित करें",
    personal_info: "व्यक्तिगत जानकारी",
    cancel: "रद्द करें",
    save_changes: "परिवर्तन सहेजें",
    saving: "सहेजा जा रहा है...",
  },
};

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export default function OnboardingPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') as Lang | null : null;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      setLanguage(savedLang);
    }
  }, []);

  const t = useMemo(() => tDict[language], [language]);

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [incomeType, setIncomeType] = useState<IncomeType | "">("");
  const [income, setIncome] = useState<number>(25000);
  const [risk, setRisk] = useState<RiskLevel | "">("");
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    occupation: "",
    location: "",
    maritalStatus: "",
    dependents: "",
    financialGoals: "",
    investmentExperience: "",
    email: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [error, setError] = useState<string>("");

  const steps = useMemo(() => [t.p1, t.p2, t.p3, t.p4, t.p5], [t]);

  function validateCurrentStep(): boolean {
    // Clear previous
    setError("");
    if (step === 1) {
      const nameOK =
        typeof name === "string" &&
        name.trim().length >= 2 &&
        name.trim().length <= 50;
      const ageNum =
        typeof age === "number" ? age : Number.parseInt(String(age || ""), 10);
      const ageOK = Number.isFinite(ageNum) && ageNum >= 18 && ageNum <= 70;
      if (!nameOK) {
        setError(t.err_name_required);
        return false;
      }
      if (!ageOK) {
        setError(t.err_age_required);
        return false;
      }
      return true;
    }
    if (step === 2) {
      // Profile details validation - we'll keep it simple for now
      // Could add more detailed validation as needed
      return true;
    }
    if (step === 3) {
      if (!incomeType) {
        setError(t.err_incomeType_required);
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!(income >= 5000 && income <= 100000)) {
        setError(t.err_income_required);
        return false;
      }
      return true;
    }
    if (step === 5) {
      if (!risk) {
        setError(t.err_risk_required);
        return false;
      }
      return true;
    }
    return true;
  }

  function onContinue() {
    if (!validateCurrentStep()) return;
    if (step < 5) {
      setStep((s) => s + 1);
      return;
    }
    try {
      localStorage.setItem("onboarded", "1");
    } catch {}
    router.push("/dashboard");
  }

  function onBack() {
    setError("");
    if (step > 1) setStep((s) => s - 1);
  }

  if (!mounted) {
    return (
      <div className="min-h-[100svh] flex flex-col">
        <header className="w-full border-b bg-card">
          <div className="mx-auto w-full max-w-screen-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="MoneyFyi Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain rounded-full"
              />
              <span className="font-semibold text-lg">MoneyFyi</span>
            </div>
            <div className="h-8 w-8 rounded-md bg-muted animate-pulse" />
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] flex flex-col">
      <header className="w-full border-b bg-card">
        <div className="mx-auto w-full max-w-screen-sm px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="MoneyFyi Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain rounded-full"
            />
            <span className="font-semibold text-lg">MoneyFyi</span>
          </div>
          <LanguageToggle
            language={language}
            onToggle={() => {
              const next = language === "en" ? "hi" : "en";
              setLanguage(next);
              try {
                localStorage.setItem("lang", next);
              } catch {}
              setAppLanguage(next);
            }}
          />
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-screen-sm px-4 py-6 md:py-8">
          <nav aria-label="Progress" className="mb-6">
            <ProgressSteps currentStep={step} steps={steps} />
          </nav>

          <div className="mb-2">
            <h1 className="text-balance text-2xl font-semibold">{t.title}</h1>
            <p className="text-muted-foreground leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <Card className="mt-4">
            <CardContent className="p-4 md:p-6">
              <div
                aria-live="polite"
                className={cn("text-destructive mb-3", !error && "sr-only")}
              >
                {error || "."}
              </div>

              {step === 1 && (
                <div>
                  <h2 className="text-xl font-medium mb-3">{t.step1_title}</h2>
                  <StepBasic
                    t={t}
                    name={name}
                    age={age}
                    onChangeName={setName}
                    onChangeAge={setAge}
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-medium mb-3">{t.step2_title}</h2>
                  <ProfileDetailsComponent
                    t={t}
                    values={profileDetails}
                    onChange={setProfileDetails}
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-medium mb-3">{t.step3_title}</h2>
                  <StepIncomeType
                    language={language}
                    value={incomeType || ""}
                    onChange={setIncomeType}
                  />
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-xl font-medium mb-3">{t.step4_title}</h2>
                  <StepIncomeSlider
                    hint={t.currency_hint}
                    value={income}
                    onChange={setIncome}
                  />
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="text-xl font-medium mb-3">{t.step4_title}</h2>
                  <StepRisk t={t} value={risk || ""} onChange={setRisk} />
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onBack}
                  disabled={step === 1}
                >
                  {t.back}
                </Button>
                <Button type="button" onClick={onContinue}>
                  {t.continue}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
