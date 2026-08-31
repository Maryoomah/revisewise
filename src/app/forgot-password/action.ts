'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
redirectTo: "https://writewise-vrk9.vercel.app/auth/callback"  })

  if (error) {
    throw error
  }

  redirect('/check-email-pwordReset')
}