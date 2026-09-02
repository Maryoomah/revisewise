'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(    _prevState: { error?: string } | null,
  formData: FormData) {
  // Create the server-side Supabase client
  const supabase = await createClient()

  // Get the values from the login form
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Try to sign the user in
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

 if (error) {
  return { error: 'Incorrect email or password.' }
}

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Safety check
  if (!user) {
    throw new Error('User not found')
  }

  // Check whether this user already has a profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle() //ds s when no profile is part of flow

  // If no profile exists, create one
  if (!profile) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        full_name: user.user_metadata.full_name,
        role: user.user_metadata.role,
      })

    if (insertError) {
      throw insertError
    }
  }

  // Decide where to send the user
    const role = user.user_metadata.role

  if (role === 'teacher') {
    redirect('/teacher')
  } else {
    redirect('/student')
  }
}