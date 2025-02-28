"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/auth"

type HeaderProps = {
  session: {
    username: string
    role: string
  } | null
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <header className="bg-primary text-primary-foreground shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Система заявок
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span>
                {session.username} ({session.role === "admin" ? "Администратор" : "Пользователь"})
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <span>Гостевой доступ</span>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Войти
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

