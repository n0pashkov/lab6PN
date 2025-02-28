import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchIcon, FilterIcon, EyeIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

export default function AllTicketsPage() {
  // Mock tickets data
  const tickets = [
    {
      id: "TK-1234",
      title: "Не работает проектор в аудитории 201",
      requester: "Иванов Иван",
      department: "Кафедра информатики",
      status: "open",
      priority: "high",
      created: "2023-05-15 14:30",
      updated: "2023-05-15 15:45",
    },
    {
      id: "TK-1233",
      title: "Замена картриджа в принтере",
      requester: "Петров Петр",
      department: "Кафедра физики",
      status: "in_progress",
      priority: "medium",
      created: "2023-05-15 10:15",
      updated: "2023-05-15 11:30",
    },
    {
      id: "TK-1232",
      title: "Настройка Wi-Fi в аудитории 305",
      requester: "Сидорова Анна",
      department: "IT отдел",
      status: "resolved",
      priority: "low",
      created: "2023-05-14 09:45",
      updated: "2023-05-14 13:20",
    },
    {
      id: "TK-1231",
      title: "Не включается компьютер",
      requester: "Козлов Дмитрий",
      department: "Кафедра математики",
      status: "resolved",
      priority: "high",
      created: "2023-05-13 16:10",
      updated: "2023-05-14 10:30",
    },
    {
      id: "TK-1230",
      title: "Установка программного обеспечения",
      requester: "Новикова Елена",
      department: "Библиотека",
      status: "open",
      priority: "medium",
      created: "2023-05-13 11:25",
      updated: "2023-05-13 11:25",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Все заявки</h1>
        <Button>Создать заявку</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Управление заявками</CardTitle>
          <CardDescription>Просмотр и управление всеми заявками в системе</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск заявок..." className="pl-8" />
            </div>
            <div className="ml-4 flex gap-2">
              <Button variant="outline">
                <FilterIcon className="mr-2 h-4 w-4" />
                Фильтры
              </Button>
              <Button variant="outline">Экспорт</Button>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Заявитель</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Приоритет</TableHead>
                  <TableHead>Создана</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.requester}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ticket.status === "open"
                            ? "bg-yellow-100 text-yellow-800"
                            : ticket.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.status === "open" ? "Открыта" : ticket.status === "in_progress" ? "В работе" : "Решена"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ticket.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "medium"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.priority === "high" ? "Высокий" : ticket.priority === "medium" ? "Средний" : "Низкий"}
                      </div>
                    </TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <EyeIcon className="h-4 w-4" />
                          <span className="sr-only">Просмотр</span>
                        </Button>
                        {ticket.status !== "resolved" && (
                          <Button variant="ghost" size="icon">
                            <CheckCircleIcon className="h-4 w-4" />
                            <span className="sr-only">Решить</span>
                          </Button>
                        )}
                        {ticket.status === "open" && (
                          <Button variant="ghost" size="icon">
                            <XCircleIcon className="h-4 w-4" />
                            <span className="sr-only">Отклонить</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Показано 5 из 124 заявок</div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Предыдущая
              </Button>
              <Button variant="outline" size="sm">
                Следующая
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

