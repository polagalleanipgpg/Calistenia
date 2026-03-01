import { createServerSupabaseClient } from '@/lib/supabase/server-client'
import { Database } from '@/lib/supabase/types'

type Athlete = Database['public']['Tables']['athletes']['Row']
type AthleteInsert = Database['public']['Tables']['athletes']['Insert']
type AthleteUpdate = Database['public']['Tables']['athletes']['Update']

export async function getAthletes(): Promise<Athlete[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Error fetching athletes: ${error.message}`)
  }

  return data || []
}

export async function getAthleteById(id: string): Promise<Athlete | null> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athletes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Error fetching athlete: ${error.message}`)
  }

  return data
}

export async function createAthlete(athlete: AthleteInsert): Promise<Athlete> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athletes')
    .insert(athlete)
    .select()
    .single()

  if (error) {
    throw new Error(`Error creating athlete: ${error.message}`)
  }

  return data
}

export async function updateAthlete(id: string, athlete: AthleteUpdate): Promise<Athlete> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athletes')
    .update(athlete)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Error updating athlete: ${error.message}`)
  }

  return data
}

export async function deleteAthlete(id: string): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('athletes')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Error deleting athlete: ${error.message}`)
  }
}
