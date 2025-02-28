"use client"

import { usePathname, redirect } from "next/navigation"
import type React from "react"
import { useEffect } from "react"

type DashboardClientProps = {
  children: React.ReactNode
  session: {
    username: string
    role: string
  } | null
}

export default function DashboardClient({ children, session }: DashboardClientProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!session && !pathname.includes("/dashboard/guest")) {
      redirect("/")
    }
  }, [session, pathname])

  return <>{children}</>
}

