"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CheckTicketPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTicketId = searchParams.get("id") || ""

  const [ticketId, setTicketId] = useState(initialTicketId)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ticketData, setTicketData] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ticketId.trim()) {
      setError("Введите номер заявки")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Здесь будет запрос к API для получения данных о заявке
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Имитация данных заявки
      if (ticketId === "TK-1234" || initialTicketId) {
        setTicketData({
          id: ticketId || initialTicketId,
          title: "Не работает проектор в аудитории 201",
          status: "in_progress",
          priority: "high",
          created: "15.05.2023 14:30",
          updated: "16.05.2023 10:15",
          requester: "Иванов Иван",
          department: "Кафедра информатики",
          location: "Аудитория 201",
          equipmentType: "Проектор",
          description: "Проектор не включается при нажатии на кнопку питания. Индикатор питания не горит.",
          assignee: "Сидоров Алексей",
          comments: [
            {
              author: "Сидоров Алексей",
              date: "16.05.2023 10:15",
              text: "Взял заявку в работу. Выезжаю на место для диагностики.",
            },
          ],
        })
      } else {
        setError("Заявка с указанным номером не найдена")
      }
    } catch (error) {
      setError("Произошла ошибка при поиске заявки")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!ticketData ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Проверка статуса заявки</CardTitle>
            <CardDescription>Введите номер заявки для проверки её статуса</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ticketId">Номер заявки</Label>
                <Input
                  id="ticketId"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Например: TK-1234"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Поиск..." : "Проверить статус"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={() => router.push("/dashboard/guest")}>
              Вернуться на главную
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Заявка {ticketData.id}</CardTitle>
                <CardDescription>Информация о заявке и её текущем статусе</CardDescription>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ticketData.status === "open"
                    ? "bg-yellow-100 text-yellow-800"
                    : ticketData.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {ticketData.status === "open" ? "Открыта" : ticketData.status === "in_progress" ? "В работе" : "Решена"}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">{ticketData.title}</h3>
              <p className="text-muted-foreground">{ticketData.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Заявитель</h4>
                <p>{ticketData.requester}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Отдел</h4>
                <p>{ticketData.department}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Местоположение</h4>
                <p>{ticketData.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Тип оборудования</h4>
                <p>{ticketData.equipmentType}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Создана</h4>
                <p>{ticketData.created}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Последнее обновление</h4>
                <p>{ticketData.updated}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Приоритет</h4>
                <p
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    ticketData.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : ticketData.priority === "medium"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {ticketData.priority === "high" ? "Высокий" : ticketData.priority === "medium" ? "Средний" : "Низкий"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Исполнитель</h4>
                <p>{ticketData.assignee || "Не назначен"}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Комментарии</h4>
              {ticketData.comments && ticketData.comments.length > 0 ? (
                <div className="space-y-3">
                  {ticketData.comments.map((comment: any, index: number) => (
                    <div key={index} className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Нет комментариев</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setTicketData(null)}>
              Назад
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/guest")}>
              На главную
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

