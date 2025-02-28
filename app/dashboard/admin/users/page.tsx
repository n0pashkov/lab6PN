import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchIcon, EditIcon, TrashIcon, UserPlusIcon } from "lucide-react"

export default function UsersPage() {
  // Mock users data
  const users = [
    {
      id: 1,
      name: "Иванов Иван",
      email: "ivanov@example.com",
      role: "user",
      department: "Кафедра информатики",
      status: "active",
    },
    {
      id: 2,
      name: "Петров Петр",
      email: "petrov@example.com",
      role: "user",
      department: "Кафедра физики",
      status: "active",
    },
    {
      id: 3,
      name: "Сидорова Анна",
      email: "sidorova@example.com",
      role: "admin",
      department: "IT отдел",
      status: "active",
    },
    {
      id: 4,
      name: "Козлов Дмитрий",
      email: "kozlov@example.com",
      role: "user",
      department: "Кафедра математики",
      status: "inactive",
    },
    {
      id: 5,
      name: "Новикова Елена",
      email: "novikova@example.com",
      role: "user",
      department: "Библиотека",
      status: "active",
    },
    {
      id: 6,
      name: "Морозов Алексей",
      email: "morozov@example.com",
      role: "user",
      department: "Кафедра истории",
      status: "active",
    },
    {
      id: 7,
      name: "Волкова Мария",
      email: "volkova@example.com",
      role: "user",
      department: "Деканат",
      status: "active",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление пользователями</h1>
        <Button>
          <UserPlusIcon className="mr-2 h-4 w-4" />
          Добавить пользователя
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Пользователи системы</CardTitle>
          <CardDescription>Управление учетными записями пользователей</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск пользователей..." className="pl-8" />
            </div>
            <div className="ml-4 flex gap-2">
              <Button variant="outline">Фильтры</Button>
              <Button variant="outline">Экспорт</Button>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Отдел</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role === "admin" ? "Администратор" : "Пользователь"}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status === "active" ? "Активен" : "Неактивен"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <EditIcon className="h-4 w-4" />
                          <span className="sr-only">Редактировать</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Удалить</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Показано 7 из 7 пользователей</div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>
                Предыдущая
              </Button>
              <Button variant="outline" size="sm" disabled>
                Следующая
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

