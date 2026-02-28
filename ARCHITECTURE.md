# Reglas de Arquitectura

## Principios

- Mobile-first siempre
- Server Components por defecto
- Client Components solo si hay interacción
- No lógica de negocio en componentes UI
- Todas las queries pasan por lib/services
- Nunca usar service role en frontend
- RLS es la única capa de seguridad

## Estructura Obligatoria

- app/: solo rutas
- components/: solo UI
- lib/services/: lógica de acceso a datos
- lib/utils/: funciones puras

## Prohibido

- Consultas directas en componentes grandes
- Mezclar fetch y supabase sin patrón claro
- Cualquier bypass de RLS