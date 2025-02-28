import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Система заявок на ремонт техники</CardTitle>
          <CardDescription>Информационная система для образовательного учреждения</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-center mb-4">Выберите способ входа в систему:</p>
          <Link href="/login?role=user" className="w-full">
            <Button className="w-full" variant="outline">
              Войти как пользователь
            </Button>
          </Link>
          <Link href="/login?role=admin" className="w-full">
            <Button className="w-full" variant="outline">
              Войти как администратор
            </Button>
          </Link>
          <Link href="/dashboard/guest" className="w-full" prefetch={false}>
            <Button className="w-full">Продолжить как гость</Button>
          </Link>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Система заявок на ремонт техники. Лабораторная работа №6
        </CardFooter>
      </Card>
    </div>
  )
}

