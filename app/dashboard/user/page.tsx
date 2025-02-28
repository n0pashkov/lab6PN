import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TicketIcon, CheckCircleIcon, AlertCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"

export default function UserDashboard() {
  // Mock data for user dashboard
  const stats = {
    totalTickets: 8,
    openTickets: 3,
    resolvedTickets: 5,
  }

  // Mock recent tickets
  const recentTickets = [
    { id: "TK-1234", title: "Не работает проектор в аудитории 201", status: "open", created: "2 часа назад" },
    { id: "TK-1230", title: "Замена картриджа в принтере", status: "in_progress", created: "1 день назад" },
    { id: "TK-1225", title: "Настройка Wi-Fi", status: "resolved", created: "3 дня назад" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Личный кабинет</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <TicketIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего заявок</p>
              <p className="text-2xl font-bold">{stats.totalTickets}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <AlertCircleIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Активные заявки</p>
              <p className="text-2xl font-bold">{stats.openTickets}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Решенные заявки</p>
              <p className="text-2xl font-bold">{stats.resolvedTickets}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Мои заявки</CardTitle>
            <CardDescription>Последние созданные и обновленные заявки</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{ticket.id}</span>
                      <span>•</span>
                      <span>{ticket.created}</span>
                    </div>
                  </div>
                  <div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        ticket.status === "open"
                          ? "bg-yellow-100 text-yellow-800"
                          : ticket.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ticket.status === "open" ? "Открыта" : ticket.status === "in_progress" ? "В работе" : "Решена"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/user/tickets">
                <Button variant="outline" className="w-full">
                  Просмотреть все заявки
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>Часто используемые функции</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/user/tickets/new">
              <Button className="w-full justify-start">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Создать заявку
              </Button>
            </Link>
            <Link href="/dashboard/user/tickets?status=open">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircleIcon className="mr-2 h-4 w-4" />
                Активные заявки
              </Button>
            </Link>
            <Link href="/dashboard/user/tickets?status=resolved">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircleIcon className="mr-2 h-4 w-4" />
                Решенные заявки
              </Button>
            </Link>
            <Link href="/dashboard/user/settings">
              <Button variant="outline" className="w-full justify-start">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Настройки профиля
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

