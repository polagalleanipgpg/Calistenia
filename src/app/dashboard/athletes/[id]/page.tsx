import { requireAuth } from '@/lib/services/auth'
import { getAthleteById } from '@/lib/services/athletes'
import { getRecordsByAthlete } from '@/lib/services/records'
import { getMetrics } from '@/lib/services/metrics'
import { AthleteDetail } from '@/components/athletes/athlete-detail'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'

interface Props {
  params: {
    id: string
  }
}

export default async function AthletePage({ params }: Props) {
  const user = await requireAuth()
  
  const [athlete, records, metrics] = await Promise.all([
    getAthleteById(params.id),
    getRecordsByAthlete(params.id),
    getMetrics()
  ])

  if (!athlete) {
    return <div>Athlete not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <AthleteDetail 
        athlete={athlete} 
        records={records} 
        availableMetrics={metrics} 
      />
      <FloatingActionButtons />
    </div>
  )
}
