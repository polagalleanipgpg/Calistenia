import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp } from 'lucide-react'

interface DashboardStatsProps {
  totalAthletes: number
  totalRecords: number
}

export function DashboardStats({ totalAthletes, totalRecords }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Atletas</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalAthletes}</div>
          <p className="text-xs text-muted-foreground">
            Total de atletas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Registros</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalRecords}</div>
          <p className="text-xs text-muted-foreground">
            Últimos registros
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
