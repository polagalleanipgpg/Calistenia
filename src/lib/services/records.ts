import { createServerSupabaseClient } from '@/lib/supabase/server-client'
import { Database } from '@/lib/supabase/types'

type AthleteMetricRecord = Database['public']['Tables']['athlete_metric_records']['Row']
type RecordInsert = Database['public']['Tables']['athlete_metric_records']['Insert']

export async function getRecordsByAthlete(athleteId: string): Promise<AthleteMetricRecord[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .select(`
      *,
      performance_metrics (
        id,
        name,
        category,
        unit
      )
    `)
    .eq('athlete_id', athleteId)
    .order('recorded_at', { ascending: false })

  if (error) {
    throw new Error(`Error fetching records: ${error.message}`)
  }

  return data || []
}

export async function getRecordsByMetric(metricId: string): Promise<AthleteMetricRecord[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .select(`
      *,
      athletes (
        id,
        name
      )
    `)
    .eq('metric_id', metricId)
    .order('recorded_at', { ascending: false })

  if (error) {
    throw new Error(`Error fetching records: ${error.message}`)
  }

  return data || []
}

export async function createRecord(record: RecordInsert): Promise<AthleteMetricRecord> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .insert(record)
    .select()
    .single()

  if (error) {
    throw new Error(`Error creating record: ${error.message}`)
  }

  return data
}

export async function getRecentRecords(limit: number = 10): Promise<AthleteMetricRecord[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .select(`
      *,
      athletes (
        id,
        name
      ),
      performance_metrics (
        id,
        name,
        unit
      )
    `)
    .order('recorded_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Error fetching recent records: ${error.message}`)
  }

  return data || []
}

export async function getProgressStats(athleteId: string, metricId: string): Promise<{
  firstRecord: number | null
  lastRecord: number | null
  difference: number | null
  percentageChange: number | null
}> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .select('value')
    .eq('athlete_id', athleteId)
    .eq('metric_id', metricId)
    .order('recorded_at', { ascending: true })

  if (error) {
    throw new Error(`Error fetching progress stats: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return {
      firstRecord: null,
      lastRecord: null,
      difference: null,
      percentageChange: null
    }
  }

  const firstRecord = data[0].value
  const lastRecord = data[data.length - 1].value
  const difference = lastRecord - firstRecord
  const percentageChange = firstRecord !== 0 ? (difference / firstRecord) * 100 : 0

  return {
    firstRecord,
    lastRecord,
    difference,
    percentageChange
  }
}

// Convenience alias used by dashboard
export async function getLatestRecords(limit: number = 10): Promise<AthleteMetricRecord[]> {
  return getRecentRecords(limit)
}
