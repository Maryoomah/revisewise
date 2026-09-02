'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

type UpdatePasswordState = {
  error?: string
} | null

export async function updatePassword(
  _prevState: UpdatePasswordState,
  formData: FormData
) {
  const supabase = await createClient()

  const newPassword = formData.get("newpassword") as string
  const confirmNewPassword = formData.get("confirmpassword") as string

  if (newPassword !== confirmNewPassword) {
    return { error: "Passwords do not match." }
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: "Unable to reset your password. Please try again." }
  }

  redirect("/login")
}