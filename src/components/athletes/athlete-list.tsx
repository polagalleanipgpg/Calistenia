import Link from 'next/link'
import { Database } from '@/lib/supabase/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreVertical, Edit, Trash2 } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'

type Athlete = Database['public']['Tables']['athletes']['Row']

interface AthleteListProps {
  athletes: Athlete[]
}

export function AthleteList({ athletes }: AthleteListProps) {
  if (athletes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No hay atletas</h3>
            <p className="text-muted-foreground mb-4">
              Comienza agregando tu primer atleta
            </p>
            <Link href="/dashboard/athletes/new">
              <Button>Agregar Atleta</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {athletes.map((athlete) => (
        <Card key={athlete.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <Avatar className="h-12 w-12 mr-4">
                {athlete.photo_url ? (
                  <img 
                    src={athlete.photo_url} 
                    alt={athlete.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="h-full w-full bg-muted rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium">
                      {athlete.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-lg truncate">
                  {athlete.name}
                </h3>
                {athlete.level && (
                  <p className="text-sm text-muted-foreground">
                    Nivel: {athlete.level}
                  </p>
                )}
                {athlete.goal && (
                  <p className="text-sm text-muted-foreground truncate">
                    Objetivo: {athlete.goal}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Link href={`/dashboard/athletes/${athlete.id}`}>
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </Link>
                
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
