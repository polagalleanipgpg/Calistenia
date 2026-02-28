import Link from 'next/link'
import { Database } from '@/lib/supabase/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoreVertical, Edit, Trash2 } from 'lucide-react'

type PerformanceMetric = Database['public']['Tables']['performance_metrics']['Row']

interface MetricsListProps {
  metrics: PerformanceMetric[]
}

export function MetricsList({ metrics }: MetricsListProps) {
  if (metrics.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No hay métricas</h3>
            <p className="text-muted-foreground mb-4">
              Comienza creando tu primera métrica de rendimiento
            </p>
            <Link href="/dashboard/metrics/new">
              <Button>Crear Métrica</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <Card key={metric.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-lg truncate">
                    {metric.name}
                  </h3>
                  <Badge variant="secondary">
                    {metric.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unidad: {metric.unit}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
