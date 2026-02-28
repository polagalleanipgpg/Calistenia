'use client'

import Link from 'next/link'
import { Plus, UserPlus, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2 z-40">
      <Link href="/dashboard/records/new">
        <Button size="icon" className="rounded-full w-14 h-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
      
      <Link href="/dashboard/athletes/new">
        <Button size="icon" variant="secondary" className="rounded-full w-12 h-12 shadow-lg">
          <UserPlus className="h-5 w-5" />
        </Button>
      </Link>
      
      <Link href="/dashboard/metrics/new">
        <Button size="icon" variant="secondary" className="rounded-full w-12 h-12 shadow-lg">
          <TrendingUp className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}
