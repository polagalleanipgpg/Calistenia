import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { Database } from './types'

export function createServerSupabaseClient(): any {
  const cookieStore = cookies()
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase environment variables missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    )
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Cookie: cookieStore
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join('; '),
      },
    },
  })
}
