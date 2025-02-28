"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewTicketPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    location: "",
    equipmentType: "",
    title: "",
    description: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [ticketId, setTicketId] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя"
    if (!formData.email.trim()) newErrors.email = "Введите ваш email"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Введите корректный email"
    if (!formData.department) newErrors.department = "Выберите отдел"
    if (!formData.location.trim()) newErrors.location = "Укажите местоположение"
    if (!formData.equipmentType) newErrors.equipmentType = "Выберите тип оборудования"
    if (!formData.title.trim()) newErrors.title = "Введите заголовок заявки"
    if (!formData.description.trim()) newErrors.description = "Введите описание проблемы"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      // Здесь будет отправка данных на сервер
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const generatedId = `TK-${Math.floor(1000 + Math.random() * 9000)}`
      setTicketId(generatedId)
      setSuccess(true)
    } catch (error) {
      setErrors({ form: "Произошла ошибка при создании заявки. Пожалуйста, попробуйте снова." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-green-600">Заявка успешно создана!</CardTitle>
          <CardDescription className="text-center">Ваша заявка была успешно зарегистрирована в системе</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-center mb-2">Номер вашей заявки:</p>
            <p className="text-center text-2xl font-bold">{ticketId}</p>
            <p className="text-center text-sm mt-2">Сохраните этот номер для отслеживания статуса вашей заявки</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Детали заявки:</h3>
            <p>
              <strong>Заголовок:</strong> {formData.title}
            </p>
            <p>
              <strong>Отдел:</strong> {formData.department}
            </p>
            <p>
              <strong>Местоположение:</strong> {formData.location}
            </p>
            <p>
              <strong>Тип оборудования:</strong> {formData.equipmentType}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Мы уведомим вас о статусе заявки по электронной почте: {formData.email}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard/guest")}>
            Вернуться на главную
          </Button>
          <Button onClick={() => router.push(`/dashboard/guest/tickets/check?id=${ticketId}`)}>Проверить статус</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Создание новой заявки</CardTitle>
        <CardDescription>Заполните форму для создания заявки на ремонт или обслуживание техники</CardDescription>
      </CardHeader>
      <CardContent>
        {errors.form && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errors.form}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Информация о заявителе</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Имя <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">
                  Отдел <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                    <SelectValue placeholder="Выберите отдел" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">IT отдел</SelectItem>
                    <SelectItem value="library">Библиотека</SelectItem>
                    <SelectItem value="cs">Кафедра информатики</SelectItem>
                    <SelectItem value="physics">Кафедра физики</SelectItem>
                    <SelectItem value="math">Кафедра математики</SelectItem>
                    <SelectItem value="history">Кафедра истории</SelectItem>
                    <SelectItem value="dean">Деканат</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Информация о проблеме</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">
                  Местоположение <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Например: Аудитория 305"
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipmentType">
                  Тип оборудования <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.equipmentType}
                  onValueChange={(value) => handleSelectChange("equipmentType", value)}
                >
                  <SelectTrigger className={errors.equipmentType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Выберите тип оборудования" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer">Компьютер/Ноутбук</SelectItem>
                    <SelectItem value="printer">Принтер/МФУ</SelectItem>
                    <SelectItem value="projector">Проектор</SelectItem>
                    <SelectItem value="network">Сетевое оборудование</SelectItem>
                    <SelectItem value="phone">Телефон</SelectItem>
                    <SelectItem value="software">Программное обеспечение</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                {errors.equipmentType && <p className="text-sm text-red-500">{errors.equipmentType}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Заголовок заявки <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Краткое описание проблемы"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Описание проблемы <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Подробно опишите проблему"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Назад
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Создание..." : "Создать заявку"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

