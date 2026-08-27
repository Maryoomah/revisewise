'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string
  const full_name = formData.get('full_name') as string
  const role = formData.get('role') as string

  // Validate passwords BEFORE talking to Supabase
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        role,
      },
    },
  })

if (error) {
  console.error("SIGNUP ERROR:", error);
  throw new Error(error.message);
}

  redirect('/verify-email')
}