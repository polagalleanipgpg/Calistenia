'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createAthlete } from '@/lib/services/athletes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NewAthleteFormProps {
  trainerId: string
}

export function NewAthleteForm({ trainerId }: NewAthleteFormProps) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('')
  const [goal, setGoal] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createAthlete({
        trainer_id: trainerId,
        name,
        level: level || null,
        goal: goal || null,
        photo_url: photoUrl || null,
      })
      
      router.push('/dashboard/athletes')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Atleta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre *
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nombre completo del atleta"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="level" className="text-sm font-medium">
              Nivel
            </label>
            <Input
              id="level"
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Principiante, Intermedio, Avanzado..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="goal" className="text-sm font-medium">
              Objetivo
            </label>
            <Input
              id="goal"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Ej: Ganar fuerza, mejorar resistencia..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="photoUrl" className="text-sm font-medium">
              URL de Foto (opcional)
            </label>
            <Input
              id="photoUrl"
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Atleta'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
