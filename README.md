# Cali Entrenadores

Sistema profesional de seguimiento de rendimiento deportivo para entrenadores individuales premium de calistenia en Chile.

## 🚀 Características

- **Mobile-first**: Diseñado 100% para dispositivos móviles
- **Autenticación segura**: Registro e inicio de sesión con Supabase
- **Gestión de atletas**: CRUD completo de atletas
- **Métricas personalizadas**: Crea tus propias métricas de rendimiento
- **Registro de mediciones**: Registra progreso en menos de 5 segundos
- **Gráficos de evolución**: Visualiza el progreso con estadísticas automáticas
- **Modo oscuro**: Interfaz moderna y cuidada

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Hosting**: Vercel (Free Tier)
- **UI Components**: Componentes custom mobile-first

## 📱 Pantallas Principales

1. **Autenticación**
   - Login y signup
   - Validación en tiempo real

2. **Dashboard**
   - Estadísticas generales
   - Últimos registros
   - Acceso rápido a acciones

3. **Gestión de Atletas**
   - Listado con cards mobile-friendly
   - Formulario de alta
   - Detalle con métricas recientes

4. **Métricas de Rendimiento**
   - CRUD de métricas personalizadas
   - Categorización por tipo
   - Unidades configurables

5. **Registro de Mediciones**
   - Formulario rápido (<5 segundos)
   - Selector de atleta y métrica
   - Validación automática

6. **Evolución y Gráficos**
   - Gráficos de línea temporales
   - Estadísticas automáticas (primera/última medición, diferencia, % mejora)
   - Historial completo

## 🔐 Seguridad

- **Row Level Security (RLS)**: Cada entrenador solo ve sus datos
- **Autenticación con Supabase**: Segura y escalable
- **Sin service role en frontend**: Principio de menor privilegio
- **Validaciones**: Server y client side

## 📦 Despliegue

### Variables de Entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Configuración de Base de Datos

1. Ejecutar el script `DATABASE.sql` en Supabase SQL Editor
2. Configurar CORS para el dominio de producción

## 🏗️ Arquitectura

```
src/
├── app/              # Rutas Next.js (solo routing)
├── components/        # Componentes UI puros
├── lib/
│   ├── services/     # Lógica de acceso a datos
│   ├── supabase/    # Configuración cliente/servidor
│   └── utils/        # Funciones puras
└── types/            # Tipos TypeScript
```

## 📋 Reglas de Arquitectura

- ✅ Mobile-first siempre
- ✅ Server Components por defecto
- ✅ Client Components solo si hay interacción
- ✅ Sin lógica de negocio en componentes UI
- ✅ Todas las queries pasan por lib/services
- ✅ Nunca usar service role en frontend
- ✅ RLS es la única capa de seguridad

## 🚀 Getting Started

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/polagalleanipgpg/Calistenia.git
   cd Calistenia
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus credenciales de Supabase
   ```

4. **Ejecutar SQL**
   - Copiar contenido de `DATABASE.sql`
   - Ejecutar en Supabase SQL Editor

5. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

## 📄 Licencia

MIT License - Libre para uso comercial y personal
