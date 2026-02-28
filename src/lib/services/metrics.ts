import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

type PerformanceMetric = Database['public']['Tables']['performance_metrics']['Row']
type PerformanceMetricInsert = Database['public']['Tables']['performance_metrics']['Insert']
type PerformanceMetricUpdate = Database['public']['Tables']['performance_metrics']['Update']

export async function getMetrics(): Promise<PerformanceMetric[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('performance_metrics')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Error fetching metrics: ${error.message}`)
  }

  return data || []
}

export async function getMetricById(id: string): Promise<PerformanceMetric | null> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('performance_metrics')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Error fetching metric: ${error.message}`)
  }

  return data
}

export async function createMetric(metric: PerformanceMetricInsert): Promise<PerformanceMetric> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('performance_metrics')
    .insert([metric] as any)
    .select()
    .single()

  if (error) {
    throw new Error(`Error creating metric: ${error.message}`)
  }

  return data
}

export async function updateMetric(id: string, metric: PerformanceMetricUpdate): Promise<PerformanceMetric> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('performance_metrics')
    .update(metric as any)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Error updating metric: ${error.message}`)
  }

  return data
}

export async function deleteMetric(id: string): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('performance_metrics')
    .update({ is_active: false })
    .eq('id', id)

  if (error) {
    throw new Error(`Error deleting metric: ${error.message}`)
  }
}
