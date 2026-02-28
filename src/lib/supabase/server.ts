import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './types'

let supabaseClient: SupabaseClient<Database> | null = null

export function createServerSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseClient) {
    supabaseClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabaseClient
}
