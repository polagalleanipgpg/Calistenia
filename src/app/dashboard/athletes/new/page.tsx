import { requireAuth } from '@/lib/services/auth'
import { NewAthleteForm } from '@/components/athletes/new-athlete-form'

export default async function NewAthletePage() {
  const user = await requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nuevo Atleta</h1>
        <p className="text-muted-foreground">
          Agrega un nuevo atleta a tu lista
        </p>
      </div>

      <NewAthleteForm trainerId={user.id} />
    </div>
  )
}
