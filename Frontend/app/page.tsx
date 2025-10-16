"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootRedirect() {
  const router = useRouter()
  useEffect(() => {
    try {
      const onboarded = localStorage.getItem("onboarded") === "1"
      router.replace(onboarded ? "/dashboard" : "/onboarding")
    } catch {
      router.replace("/onboarding")
    }
  }, [router])
  return null
}
