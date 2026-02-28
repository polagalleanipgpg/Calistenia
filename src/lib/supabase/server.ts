import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

let supabaseClient: any = null

export function createServerSupabaseClient(): any {
  if (!supabaseClient) {
    supabaseClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabaseClient
}
