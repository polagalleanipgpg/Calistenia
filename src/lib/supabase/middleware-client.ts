import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

export const createMiddlewareSupabaseClient = (req: any) => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Cookie: req.headers.get('cookie') || ''
        }
      }
    }
  )
}
