import Link from 'next/link'
import { Database } from '@/lib/supabase/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { ArrowLeft, Plus, TrendingUp } from 'lucide-react'

type Athlete = Database['public']['Tables']['athletes']['Row']
type AthleteMetricRecord = Database['public']['Tables']['athlete_metric_records']['Row']
type PerformanceMetric = Database['public']['Tables']['performance_metrics']['Row']

interface AthleteDetailProps {
  athlete: Athlete
  records: (AthleteMetricRecord & { performance_metrics: PerformanceMetric })[]
  availableMetrics: PerformanceMetric[]
}

export function AthleteDetail({ athlete, records, availableMetrics }: AthleteDetailProps) {
  const latestRecords = records.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/athletes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              {athlete.photo_url ? (
                <img 
                  src={athlete.photo_url} 
                  alt={athlete.name}
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <div className="h-full w-full bg-muted rounded-full flex items-center justify-center">
                  <span className="text-2xl font-medium">
                    {athlete.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{athlete.name}</h1>
              {athlete.level && (
                <p className="text-muted-foreground">Nivel: {athlete.level}</p>
              )}
              {athlete.goal && (
                <p className="text-muted-foreground">Objetivo: {athlete.goal}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/dashboard/records/new?athlete=${athlete.id}`}>
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Medición
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Métricas Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {latestRecords.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No hay registros de métricas aún
              </p>
              <Link href={`/dashboard/records/new?athlete=${athlete.id}`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Primera Medición
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {latestRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {record.performance_metrics.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.recorded_at).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {record.value}
                      <span className="text-sm text-muted-foreground ml-1">
                        {record.performance_metrics.unit}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
