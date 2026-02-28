'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, TrendingUp, User } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Atletas', href: '/dashboard/athletes', icon: Users },
  { name: 'Métricas', href: '/dashboard/metrics', icon: TrendingUp },
  { name: 'Perfil', href: '/dashboard/profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
