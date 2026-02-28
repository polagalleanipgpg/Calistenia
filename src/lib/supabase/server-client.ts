import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

export const createServerSupabaseClient = () => {
  // Dynamically import cookies only when function is called (in Server Component context)
  const { cookies } = require('next/headers')
  const cookieStore = cookies()
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
