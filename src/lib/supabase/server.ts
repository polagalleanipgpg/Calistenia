import { createServerClient } from '@supabase/ssr'
import { headers } from 'next/headers'
import { Database } from '../supabase/types'

export const createServerSupabaseClient = () => {
  const cookieStore = headers()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.toString()
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
