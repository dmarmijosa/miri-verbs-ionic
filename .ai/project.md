# Miriverbs Ionic — Resumen del Proyecto

## Descripción

**Miri Verbs Ionic** es la migración del diseño y la lógica de presentación de la app Flutter **Miriverbs** a **Ionic 8 + Angular 20** (standalone components). Es una app gamificada estilo Duolingo para aprender verbos regulares e irregulares en inglés, organizados por niveles CEFR (A1–C2).

## Origen

- **App origen (Flutter):** `/Users/danny/Desktop/proyectos/ingles/miriverbs`
- **App destino (Ionic):** `/Users/danny/Desktop/proyectos/miri-verbs-ionic`

## Estado actual

- Diseño **Stitch Kinetic** migrado (colores, tipografía, widgets táctiles).
- **348 verbos** del syllabus Flutter portados como datos locales.
- **Servicios mock** sin credenciales ni backend real (Supabase/Firebase pendiente).
- Pantallas principales implementadas: splash, onboarding, login, home, verbos, práctica, video, multiplayer (arena FAB, espera, batalla).
- Validación en **browser** vía `ng serve`.

## Arquitectura

Feature-First Clean Architecture:

```
src/app/
├── core/          # Modelos, datos, servicios, tema, widgets reutilizables
└── features/      # Pantallas por dominio (auth, home, verbs, multiplayer)
```

## Flujo de usuario

1. Splash → Onboarding (nuevo) / Home (sesión mock)
2. Onboarding → Login
3. Login (Google/Apple mock) → Home
4. Home → Lista de verbos por unidad CEFR → Práctica (quiz 10 preguntas)
5. Arena FAB global → Retar jugador → Espera → Batalla PvP

## Reglas de dominio preservadas

- 6 niveles CEFR × 6 subniveles × 10 verbos.
- Desbloqueo secuencial de niveles y subniveles.
- Aprobar práctica: ≥ 8/10 en primer intento.
- Verbos fallados se reencolan al final (banner "Repaso").

## Documentación relacionada

- `docs/architecture.md` — Arquitectura detallada
- `docs/decisions.md` — Decisiones de diseño
- `docs/conventions.md` — Convenciones de código
- `tasks/current.md` — Estado del desarrollo actual
