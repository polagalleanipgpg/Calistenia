export const dynamic = 'force-dynamic'

import { BottomNav } from '@/components/navigation/bottom-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pb-16">
      <main className="container mx-auto px-4 py-6 max-w-md">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
