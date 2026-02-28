import { requireAuth } from '@/lib/services/auth'
import { getAthleteById } from '@/lib/services/athletes'
import { getAthleteRecords } from '@/lib/services/records'
import { getMetrics } from '@/lib/services/metrics'
import { AthleteDetail } from '@/components/athletes/athlete-detail'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'

interface AthletePageProps {
  params: { id: string }
}

export default async function AthletePage({ params }: AthletePageProps) {
  await requireAuth()
  
  const [athlete, records, metrics] = await Promise.all([
    getAthleteById(params.id),
    getAthleteRecords(params.id),
    getMetrics()
  ])

  if (!athlete) {
    throw new Error('Atleta no encontrado')
  }

  return (
    <div className="space-y-6">
      <AthleteDetail 
        athlete={athlete} 
        records={records}
        availableMetrics={metrics}
      />
      <FloatingActionButtons />
    </div>
  )
}
