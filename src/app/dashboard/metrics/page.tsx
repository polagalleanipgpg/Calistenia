import { requireAuth } from '@/lib/services/auth'
import { getMetrics } from '@/lib/services/metrics'
import { MetricsList } from '@/components/metrics/metrics-list'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'

export default async function MetricsPage() {
  await requireAuth()
  const metrics = await getMetrics()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Métricas</h1>
        <p className="text-muted-foreground">
          Gestiona las métricas de rendimiento
        </p>
      </div>

      <MetricsList metrics={metrics} />
      <FloatingActionButtons />
    </div>
  )
}
