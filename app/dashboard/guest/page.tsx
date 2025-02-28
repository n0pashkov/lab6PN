import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GuestDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Гостевой доступ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Создать заявку</CardTitle>
            <CardDescription>Создайте новую заявку на ремонт техники</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Вы можете создать заявку на ремонт техники без регистрации в системе. Для отслеживания статуса заявки вам
              будет выдан уникальный номер.
            </p>
            <Link href="/dashboard/guest/tickets/new">
              <Button>Создать заявку</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Проверить статус заявки</CardTitle>
            <CardDescription>Проверьте статус существующей заявки по номеру</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Если у вас уже есть номер заявки, вы можете проверить её статус.</p>
            <Link href="/dashboard/guest/tickets/check">
              <Button>Проверить статус</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Зарегистрироваться в системе</CardTitle>
          <CardDescription>Получите больше возможностей с личным аккаунтом</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Зарегистрированные пользователи могут:</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Отслеживать все свои заявки в одном месте</li>
            <li>Получать уведомления об изменении статуса заявок</li>
            <li>Общаться с техническими специалистами</li>
            <li>Просматривать историю заявок</li>
          </ul>
          <div className="flex gap-4">
            <Link href="/login?role=user">
              <Button variant="outline">Войти</Button>
            </Link>
            <Link href="/register">
              <Button>Зарегистрироваться</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

