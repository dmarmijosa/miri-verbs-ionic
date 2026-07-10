# Contexto de desarrollo actual

**Última actualización:** 2026-07-10

## Fase

Migración inicial de diseño Flutter → Ionic completada con datos mock.

## Completado

- [x] Estructura Clean Architecture (`core/` + `features/`)
- [x] Design system Stitch Kinetic (SCSS + `app-theme.ts`)
- [x] Widgets: TactileButton, SquishyProgressBar, GoogleLogo, ToastService
- [x] Syllabus 348 verbos portados desde Flutter
- [x] Servicios mock: Auth, Progress, Verb, Battle, Config, Toast
- [x] Pantallas: splash, onboarding, login, home, presentation-video, verbs-list, practice, waiting-challenge, battle
- [x] OnlineFriendsFab (arena PvP global)
- [x] Assets: mascots + logo copiados desde Flutter
- [x] Build exitoso (`ng build`)
- [x] Documentación `.ai/`, `tasks/`, `docs/`

## Pendiente

- [ ] Integración Supabase (auth, progress, battles, verbs sync)
- [ ] Integración Firebase FCM (push notifications)
- [ ] Capacitor iOS/Android (`cap add`)
- [ ] Tests unitarios de servicios y componentes clave
- [ ] Showcase tour en home (equivalente Flutter `showcaseview`)
- [ ] Incoming challenge alert en tiempo real

## Sesión mock

- Login Google/Apple simula éxito y persiste `miriverbs_mock_session` en `localStorage`.
- Perfil demo: `Estudiante Demo`, racha 7 días, progreso A1 subniveles 1-2 completados.

## Rutas activas

| Ruta | Pantalla |
|------|----------|
| `/` | Splash |
| `/onboarding` | Onboarding 4 slides |
| `/login` | SSO mock |
| `/home` | Hub principal |
| `/presentation-video` | Video YouTube |
| `/verbs/:level` | Lista verbos |
| `/practice` | Quiz |
| `/waiting-challenge` | Espera PvP |
| `/battle` | Duelo PvP |
