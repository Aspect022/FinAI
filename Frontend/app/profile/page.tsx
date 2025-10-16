"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileDetailsComponent, type ProfileDetails } from "@/components/onboarding/profile-details";
import { useTranslation } from "@/components/i18n/translation-provider";
import { getUserProfile, updateUserProfile } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<ProfileDetails>({
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setProfile(profileData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      await updateUserProfile(profile);
      // Show success message or redirect
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] flex flex-col">
      <main className="flex-1 p-4 md:p-6">
        <section className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">{t.profile_title || "Profile Settings"}</h1>
            <p className="text-muted-foreground">
              {t.profile_subtitle || "Manage your personal and financial information"}
            </p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>{t.personal_info || "Personal Information"}</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">
                  {error}
                </div>
              )}
              <ProfileDetailsComponent 
                t={t} 
                values={profile} 
                onChange={setProfile} 
              />
              
              <div className="mt-6 flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/dashboard")}
                >
                  {t.cancel || "Cancel"}
                </Button>
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                >
                  {saving ? (t.saving || "Saving...") : (t.save_changes || "Save Changes")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}