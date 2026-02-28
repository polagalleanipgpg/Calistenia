import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

type AthleteMetricRecord = Database['public']['Tables']['athlete_metric_records']['Row']
type PerformanceMetric = Database['public']['Tables']['performance_metrics']['Row']
type AthleteMetricRecordInsert = Database['public']['Tables']['athlete_metric_records']['Insert']

export async function getAthleteRecords(athleteId: string): Promise<(AthleteMetricRecord & { performance_metrics: PerformanceMetric })[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .select(`
      *,
      performance_metrics!inner(*)
    `)
    .eq('athlete_id', athleteId)
    .order('recorded_at', { ascending: false })

  if (error) {
    throw new Error(`Error fetching athlete records: ${error.message}`)
  }

  return data || []
}

export async function getMetricRecords(athleteId: string, metricId: string): Promise<AthleteMetricRecord[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .select('*')
    .eq('athlete_id', athleteId)
    .eq('metric_id', metricId)
    .order('recorded_at', { ascending: true })

  if (error) {
    throw new Error(`Error fetching metric records: ${error.message}`)
  }

  return data || []
}

export async function createRecord(record: AthleteMetricRecordInsert): Promise<AthleteMetricRecord> {
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

export async function getLatestRecords(limit: number = 5): Promise<AthleteMetricRecord[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('athlete_metric_records')
    .select(`
      *,
      athletes!inner(
        id,
        name
      ),
      performance_metrics!inner(
        id,
        name,
        unit
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Error fetching latest records: ${error.message}`)
  }

  return data || []
}

export async function getMetricProgress(athleteId: string, metricId: string) {
  const records = await getMetricRecords(athleteId, metricId)
  
  if (records.length === 0) {
    return null
  }

  const firstRecord = records[0]
  const lastRecord = records[records.length - 1]
  const difference = lastRecord.value - firstRecord.value
  const percentageChange = firstRecord.value !== 0 ? (difference / firstRecord.value) * 100 : 0

  return {
    firstMeasurement: firstRecord.value,
    lastMeasurement: lastRecord.value,
    absoluteDifference: difference,
    percentageChange: Math.round(percentageChange * 100) / 100,
    totalRecords: records.length,
    records
  }
}
