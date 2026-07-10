# Miriverbs — Ionic

App gamificada estilo Duolingo para aprender verbos regulares e irregulares en inglés, organizados por niveles CEFR (A1–C2). Versión **Ionic 8 + Angular 20** migrada desde la app Flutter [Miriverbs](https://github.com/dmarmijosa/miriverbs).

## Stack

| Tecnología | Versión |
|------------|---------|
| Angular | 20.3.x |
| Ionic | 8.x |
| Capacitor | 8.x |
| TypeScript | 5.9.x |
| Node.js | ≥ 20.19 |

## Estado del proyecto

- Diseño **Stitch Kinetic** migrado (colores, tipografía, widgets táctiles).
- **348 verbos** del syllabus como datos locales.
- **Servicios mock** — sin credenciales ni backend (Supabase/Firebase pendiente).
- Pantallas: splash, onboarding, login, home, verbos, práctica, video, multiplayer (arena PvP).
- Validado en browser con `ng serve`.

## Inicio rápido

```bash
git clone https://github.com/dmarmijosa/miri-verbs-ionic.git
cd miri-verbs-ionic
npm install
npm start
```

Abrir [http://localhost:4200](http://localhost:4200).

### Build

```bash
npm run build    # output en www/
npm test         # tests unitarios
npm run lint     # ESLint
```

## Flujo de la app

1. **Splash** → Onboarding (usuario nuevo) o Home (sesión activa)
2. **Onboarding** → Login
3. **Login** (Google/Apple mock) → Home
4. **Home** → Unidades CEFR → Lista de verbos → Práctica (quiz 10 preguntas)
5. **Arena FAB** → Retar jugador → Espera → Batalla PvP

## Arquitectura

Feature-First Clean Architecture:

```
src/app/
├── core/          # Modelos, datos, servicios, tema, widgets
│   ├── data/      # syllabus.data.ts (348 verbos)
│   ├── models/
│   ├── services/  # Auth, Progress, Verb, Battle, Config (mock)
│   ├── theme/     # Design tokens Stitch Kinetic
│   └── widgets/   # TactileButton, SquishyProgressBar, GoogleLogo
└── features/      # Pantallas por dominio
    ├── splash/
    ├── onboarding/
    ├── auth/
    ├── home/
    ├── verbs/
    └── multiplayer/
```

## Reglas de dominio

- 6 niveles CEFR × 6 subniveles × 10 verbos.
- Desbloqueo secuencial de niveles y subniveles.
- Aprobar práctica: **≥ 8/10** en primer intento.
- Verbos fallados se reencolan al final (banner "Repaso").

## Sesión demo (mock)

El login con Google/Apple simula éxito y guarda la sesión en `localStorage` (`miriverbs_mock_session`). Perfil demo: **Estudiante Demo**, racha de 7 días, progreso A1 subniveles 1–2 completados.

## Documentación

| Ruta | Contenido |
|------|-----------|
| [docs/architecture.md](docs/architecture.md) | Arquitectura, flujo de datos, diagramas |
| [docs/decisions.md](docs/decisions.md) | Decisiones de diseño y patrones |
| [docs/conventions.md](docs/conventions.md) | Convenciones de código |
| [tasks/current.md](tasks/current.md) | Tareas en curso y próximos pasos |
| [tasks/backlog.md](tasks/backlog.md) | Mejoras, bugs y refactors pendientes |
| [.ai/](.ai/) | Contexto del proyecto para agentes IA |

## Próximos pasos

- [ ] Integración Supabase (auth, progress, battles, realtime)
- [ ] Firebase FCM (push notifications)
- [ ] Capacitor iOS / Android
- [ ] Auth guards en rutas protegidas

## Licencia

Proyecto privado — © 2026 Miriverbs
