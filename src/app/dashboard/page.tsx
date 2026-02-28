import { requireAuth } from '@/lib/services/auth'
import { getAthletes } from '@/lib/services/athletes'
import { getLatestRecords } from '@/lib/services/records'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { RecentRecords } from '@/components/dashboard/recent-records'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'

export default async function DashboardPage() {
  const user = await requireAuth()
  const [athletes, latestRecords] = await Promise.all([
    getAthletes(),
    getLatestRecords(5)
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta, {user.name}
        </p>
      </div>

      <DashboardStats 
        totalAthletes={athletes.length}
        totalRecords={latestRecords.length}
      />

      <RecentRecords records={latestRecords} />

      <FloatingActionButtons />
    </div>
  )
}
