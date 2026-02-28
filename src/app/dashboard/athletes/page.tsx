import { requireAuth } from '@/lib/services/auth'
import { getAthletes } from '@/lib/services/athletes'
import { AthleteList } from '@/components/athletes/athlete-list'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'

export default async function AthletesPage() {
  await requireAuth()
  const athletes = await getAthletes()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Atletas</h1>
        <p className="text-muted-foreground">
          Gestiona tus atletas y su progreso
        </p>
      </div>

      <AthleteList athletes={athletes} />
      <FloatingActionButtons />
    </div>
  )
}
