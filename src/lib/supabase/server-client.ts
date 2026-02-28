import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { Database } from './types'

export const createServerSupabaseClient = () => {
  const cookieStore = cookies()
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Cookie: cookieStore
            .getAll()
            .map(({ name, value }) => `${name}=${value}`)
            .join('; '),
        },
      },
    }
  )
}
