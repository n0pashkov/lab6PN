"use server"

import { cookies } from "next/headers"

// Mock user database
const users = {
  admin: { username: "admin", password: "admin123", role: "admin" },
  user: { username: "user", password: "user123", role: "user" },
}

type LoginParams = {
  username: string
  password: string
  role: string
}

export async function login({ username, password, role }: LoginParams) {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple validation
  if (!username || !password) {
    return { success: false, message: "Введите имя пользователя и пароль" }
  }

  // Check if user exists and credentials match
  const userRole = role === "admin" ? "admin" : "user"
  const user = users[userRole as keyof typeof users]

  if (!user || user.username !== username || user.password !== password) {
    return { success: false, message: "Неверное имя пользователя или пароль" }
  }

  // Set session cookie
  const cookieStore = cookies()
  cookieStore.set(
    "session",
    JSON.stringify({
      username,
      role: userRole,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    },
  )

  return { success: true }
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete("session")
  return { success: true }
}

export async function getSession() {
  const cookieStore = cookies()
  const session = cookieStore.get("session")

  if (!session) {
    return null
  }

  try {
    const sessionData = JSON.parse(session.value)

    // Check if session is expired
    if (sessionData.expires < Date.now()) {
      cookieStore.delete("session")
      return null
    }

    return sessionData
  } catch (error) {
    return null
  }
}

