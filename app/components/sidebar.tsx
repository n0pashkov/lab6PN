"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  TicketIcon,
  UserIcon,
  SettingsIcon,
  HomeIcon,
  PlusCircleIcon,
  ListIcon,
  BarChartIcon,
  SearchIcon,
} from "lucide-react"

type SidebarProps = {
  role: string
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Главная",
      href: `/dashboard/${role}`,
      icon: <HomeIcon className="h-5 w-5" />,
      roles: ["admin", "user", "guest"],
    },
    {
      title: "Создать заявку",
      href: `/dashboard/${role}/tickets/new`,
      icon: <PlusCircleIcon className="h-5 w-5" />,
      roles: ["admin", "user", "guest"],
    },
    {
      title: "Проверить статус",
      href: `/dashboard/${role}/tickets/check`,
      icon: <SearchIcon className="h-5 w-5" />,
      roles: ["guest"],
    },
    {
      title: "Мои заявки",
      href: `/dashboard/${role}/tickets`,
      icon: <TicketIcon className="h-5 w-5" />,
      roles: ["admin", "user"],
    },
    {
      title: "Все заявки",
      href: `/dashboard/admin/tickets/all`,
      icon: <ListIcon className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Пользователи",
      href: `/dashboard/admin/users`,
      icon: <UserIcon className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Статистика",
      href: `/dashboard/admin/stats`,
      icon: <BarChartIcon className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Настройки",
      href: `/dashboard/${role}/settings`,
      icon: <SettingsIcon className="h-5 w-5" />,
      roles: ["admin", "user"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <aside className="w-64 bg-muted border-r border-border hidden md:block">
      <nav className="p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2", pathname === item.href && "bg-accent text-accent-foreground")}
            >
              {item.icon}
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

