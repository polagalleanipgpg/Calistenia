import { createServerSupabaseClient } from '@/lib/supabase/server-client'
import { Database } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

export async function getCurrentUser(): Promise<Profile | null> {
  const supabase = createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    throw new Error(`Error fetching user profile: ${error.message}`)
  }

  return profile
}

export async function requireAuth(): Promise<Profile> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}
