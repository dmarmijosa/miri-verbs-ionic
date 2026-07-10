# Tarea actual

**Última actualización:** 2026-07-10

## Qué se está desarrollando

Migración del diseño Flutter Miriverbs a Ionic Angular con Clean Architecture y datos mock. Fase 1 completada.

## Qué falta por terminar

- Integración backend Supabase (auth real, progress RPC, battles realtime)
- Firebase FCM para notificaciones push
- Plataformas nativas Capacitor (iOS/Android)
- Incoming challenge alert con Realtime
- Showcase tour en home (primera visita)
- Tests automatizados
- Cambiar `appId` Capacitor a producción

## Próximos pasos

1. Conectar `AuthService` a Supabase Auth (Google/Apple SSO)
2. Reemplazar mocks de `ProgressService` con RPC `complete_practice`
3. Implementar `PresenceService` y suscripción Realtime para arena
4. Añadir `cap add ios` / `android` y probar en dispositivo
5. E2E tests del flujo onboarding → login → práctica

## Bloqueadores

- Ninguno técnico para desarrollo UI/mock.
- Credenciales Supabase/Firebase no incluidas (por diseño).

## Archivos afectados (migración reciente)

### Core
- `src/app/core/theme/app-theme.ts`
- `src/app/core/models/*.ts`
- `src/app/core/data/syllabus.data.ts`
- `src/app/core/services/*.ts`
- `src/app/core/widgets/**`

### Features
- `src/app/features/splash/`
- `src/app/features/onboarding/`
- `src/app/features/auth/login/`
- `src/app/features/home/`
- `src/app/features/verbs/`
- `src/app/features/multiplayer/`

### Config
- `src/app/app.routes.ts`
- `src/global.scss`
- `src/theme/variables.scss`
- `src/index.html`
- `src/assets/images/*`

### Docs
- `.ai/*`, `tasks/*`, `docs/*`
