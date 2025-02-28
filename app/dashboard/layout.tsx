import type React from "react"
import { getSession } from "@/app/actions/auth"
import Header from "@/app/components/header"
import Sidebar from "@/app/components/sidebar"
import DashboardClient from "./dashboard-client"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <DashboardClient session={session}>
      <div className="min-h-screen flex flex-col">
        <Header session={session} />
        <div className="flex flex-1">
          <Sidebar role={session?.role || "guest"} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </DashboardClient>
  )
}

