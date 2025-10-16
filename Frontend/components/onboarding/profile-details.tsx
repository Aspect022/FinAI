"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProfileDetails = {
  occupation: string;
  location: string;
  maritalStatus: string;
  dependents: string;
  financialGoals: string;
  investmentExperience: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
};

export type { ProfileDetails };

type ProfileDetailsProps = {
  t: Record<string, string>;
  values: ProfileDetails;
  onChange: (values: ProfileDetails) => void;
};

export function ProfileDetailsComponent({ t, values, onChange }: ProfileDetailsProps) {
  const handleChange = (field: keyof ProfileDetails, value: string) => {
    onChange({
      ...values,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="occupation">{t.occupation || "Occupation"}</Label>
          <Input
            id="occupation"
            value={values.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
            placeholder={t.occupation_placeholder || "e.g., Software Engineer"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">{t.location || "Location"}</Label>
          <Input
            id="location"
            value={values.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder={t.location_placeholder || "City, State"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">{t.maritalStatus || "Marital Status"}</Label>
          <Select value={values.maritalStatus} onValueChange={(value) => handleChange("maritalStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t.maritalStatus_placeholder || "Select status"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">{t.maritalStatus_single || "Single"}</SelectItem>
              <SelectItem value="married">{t.maritalStatus_married || "Married"}</SelectItem>
              <SelectItem value="divorced">{t.maritalStatus_divorced || "Divorced"}</SelectItem>
              <SelectItem value="widowed">{t.maritalStatus_widowed || "Widowed"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dependents">{t.dependents || "Number of Dependents"}</Label>
          <Input
            id="dependents"
            type="number"
            min="0"
            value={values.dependents}
            onChange={(e) => handleChange("dependents", e.target.value)}
            placeholder={t.dependents_placeholder || "0"}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="financialGoals">{t.financialGoals || "Financial Goals"}</Label>
        <Input
          id="financialGoals"
          value={values.financialGoals}
          onChange={(e) => handleChange("financialGoals", e.target.value)}
          placeholder={t.financialGoals_placeholder || "e.g., Retirement, House, Education"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="investmentExperience">{t.investmentExperience || "Investment Experience"}</Label>
        <Select value={values.investmentExperience} onValueChange={(value) => handleChange("investmentExperience", value)}>
          <SelectTrigger>
            <SelectValue placeholder={t.investmentExperience_placeholder || "Select experience level"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{t.investmentExperience_none || "No Experience"}</SelectItem>
            <SelectItem value="beginner">{t.investmentExperience_beginner || "Beginner"}</SelectItem>
            <SelectItem value="intermediate">{t.investmentExperience_intermediate || "Intermediate"}</SelectItem>
            <SelectItem value="advanced">{t.investmentExperience_advanced || "Advanced"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t.email || "Email Address"}</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder={t.email_placeholder || "your.email@example.com"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t.phone || "Phone Number"}</Label>
        <Input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder={t.phone_placeholder || "+91 XXXXX XXXXX"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName">{t.emergencyContactName || "Emergency Contact Name"}</Label>
          <Input
            id="emergencyContactName"
            value={values.emergencyContactName}
            onChange={(e) => handleChange("emergencyContactName", e.target.value)}
            placeholder={t.emergencyContactName_placeholder || "Full name"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContactPhone">{t.emergencyContactPhone || "Emergency Contact Phone"}</Label>
          <Input
            id="emergencyContactPhone"
            type="tel"
            value={values.emergencyContactPhone}
            onChange={(e) => handleChange("emergencyContactPhone", e.target.value)}
            placeholder={t.emergencyContactPhone_placeholder || "+91 XXXXX XXXXX"}
          />
        </div>
      </div>
    </div>
  );
}