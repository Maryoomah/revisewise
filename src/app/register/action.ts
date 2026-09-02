'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(  _prevState: { error?: string } | null,
formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string
  const full_name = formData.get('full_name') as string
  const role = formData.get('role') as string

  // Validate passwords BEFORE talking to Supabase
 if (password !== confirmPassword) {
  return { error: 'Passwords do not match.',
      values: {
    full_name,
    email,
    role,
  },

   }
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
  return { error: error.message,
      values: {
    full_name,
    email,
    role,
  },

   };
}

  redirect('/verify-email')
}