import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Crear Cuenta</h1>
        <p className="text-muted-foreground mt-2">
          Registra tu cuenta de entrenador
        </p>
      </div>
      
      <AuthForm mode="signup" />
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-primary hover:underline">
          Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
