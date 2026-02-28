import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Database } from '@/lib/supabase/types'

type AthleteMetricRecord = Database['public']['Tables']['athlete_metric_records']['Row']

interface RecentRecordsProps {
  records: AthleteMetricRecord[]
}

export function RecentRecords({ records }: RecentRecordsProps) {
  if (records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Registros Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No hay registros aún
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registros Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">
                  {(record as any).athletes?.name || 'Atleta'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(record as any).performance_metrics?.name || 'Métrica'}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  {record.value}
                  <span className="text-sm text-muted-foreground ml-1">
                    {(record as any).performance_metrics?.unit || ''}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(record.recorded_at).toLocaleDateString('es-CL')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
