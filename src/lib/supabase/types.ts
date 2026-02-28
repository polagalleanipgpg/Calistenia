export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      athletes: {
        Row: {
          id: string
          trainer_id: string
          name: string
          photo_url: string | null
          level: string | null
          goal: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trainer_id: string
          name: string
          photo_url?: string | null
          level?: string | null
          goal?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trainer_id?: string
          name?: string
          photo_url?: string | null
          level?: string | null
          goal?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      performance_metrics: {
        Row: {
          id: string
          trainer_id: string
          name: string
          category: string
          unit: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trainer_id: string
          name: string
          category: string
          unit: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trainer_id?: string
          name?: string
          category?: string
          unit?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      athlete_metric_records: {
        Row: {
          id: string
          athlete_id: string
          metric_id: string
          value: number
          recorded_at: string
          created_at: string
        }
        Insert: {
          id?: string
          athlete_id: string
          metric_id: string
          value: number
          recorded_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          athlete_id?: string
          metric_id?: string
          value?: number
          recorded_at?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
