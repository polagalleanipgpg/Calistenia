import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        <p className="text-muted-foreground mt-2">
          Ingresa a tu cuenta de entrenador
        </p>
      </div>
      
      <AuthForm mode="login" />
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
