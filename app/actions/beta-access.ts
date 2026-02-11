"use server"

import { cookies } from "next/headers"

const BETA_ACCESS_KEY = "oh2026chile"
const COOKIE_NAME = "oh-beta-access"
// Cookie value is a simple hash to avoid storing the password directly
const COOKIE_VALUE = "beta-authorized-2026"

export async function validateBetaAccess(key: string): Promise<{ success: boolean; error?: string }> {
  if (!key || key.trim() === "") {
    return { success: false, error: "Please enter an access key." }
  }

  if (key.trim() !== BETA_ACCESS_KEY) {
    return { success: false, error: "Invalid access key." }
  }

  // Set HTTP-only cookie that lasts 30 days
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return { success: true }
}

export async function checkBetaAccess(): Promise<boolean> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  return cookie?.value === COOKIE_VALUE
}

export async function revokeBetaAccess(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
