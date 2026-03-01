import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './types'

// Use a loose Supabase client type on server to avoid strict typed-table issues
export const createServerSupabaseClient = (): SupabaseClient<any> => {
  // Dynamically import cookies only when function is called (in Server Component context)
  const { cookies } = require('next/headers')
  const cookieStore = cookies()
  
  return createClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        headers: {
          Cookie: cookieStore
            .getAll()
            .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
            .join('; '),
        },
      },
    }
  )
}
