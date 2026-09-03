'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type ForgotPasswordState = {
  error?: string
} | null

export async function forgotPassword(
  _prevState: ForgotPasswordState,
  formData: FormData
) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://revisewise-vrk9.vercel.app/auth/callback',
  })

  if (error) {
    return { error: 'Unable to send the reset link. Please try again.' }
  }

  redirect('/check-email-pwordReset')
}