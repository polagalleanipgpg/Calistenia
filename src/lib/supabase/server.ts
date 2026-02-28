'use server'

import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { Database } from '../supabase/types'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Cookie: cookieStore.toString()
        }
      }
    }
  )
}
