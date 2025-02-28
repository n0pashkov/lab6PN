import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TicketIcon, UserIcon, CheckCircleIcon, AlertCircleIcon, PlusCircleIcon, BarChartIcon } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for admin dashboard
  const stats = {
    totalTickets: 124,
    openTickets: 42,
    resolvedTickets: 82,
    totalUsers: 56,
    averageResolutionTime: "2 дня",
  }

  // Mock recent tickets
  const recentTickets = [
    { id: "TK-1234", title: "Не работает проектор", status: "open", priority: "high", created: "2 часа назад" },
    {
      id: "TK-1233",
      title: "Замена картриджа в принтере",
      status: "in_progress",
      priority: "medium",
      created: "5 часов назад",
    },
    {
      id: "TK-1232",
      title: "Настройка Wi-Fi в аудитории 305",
      status: "resolved",
      priority: "low",
      created: "1 день назад",
    },
    { id: "TK-1231", title: "Не включается компьютер", status: "resolved", priority: "high", created: "2 дня назад" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Панель администратора</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <p className="text-sm text-muted-foreground">Открытые заявки</p>
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

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <UserIcon className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Пользователей</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Последние заявки</CardTitle>
            <CardDescription>Недавно созданные и обновленные заявки</CardDescription>
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
                  <div className="flex items-center gap-2">
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
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        ticket.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : ticket.priority === "medium"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {ticket.priority === "high" ? "Высокий" : ticket.priority === "medium" ? "Средний" : "Низкий"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/admin/tickets/all">
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
            <Link href="/dashboard/admin/tickets/new">
              <Button className="w-full justify-start">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Создать заявку
              </Button>
            </Link>
            <Link href="/dashboard/admin/users">
              <Button variant="outline" className="w-full justify-start">
                <UserIcon className="mr-2 h-4 w-4" />
                Управление пользователями
              </Button>
            </Link>
            <Link href="/dashboard/admin/tickets/all?status=open">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircleIcon className="mr-2 h-4 w-4" />
                Открытые заявки
              </Button>
            </Link>
            <Link href="/dashboard/admin/stats">
              <Button variant="outline" className="w-full justify-start">
                <BarChartIcon className="mr-2 h-4 w-4" />
                Статистика
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

