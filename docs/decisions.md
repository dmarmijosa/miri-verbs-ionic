# Decisiones de arquitectura

## ADR-001: Angular Standalone sin NgModules

**Decisión:** Usar standalone components exclusivamente, alineado con el scaffold Ionic 8 `angular-standalone`.

**Motivo:** Menos boilerplate, lazy loading con `loadComponent`, alineado con dirección actual de Angular.

## ADR-002: Servicios estáticos → Servicios injectable

**Decisión:** En Flutter los servicios son clases con métodos estáticos. En Ionic usamos `@Injectable({ providedIn: 'root' })` con `inject()`.

**Motivo:** Idioma Angular, testeable, compatible con guards e interceptors futuros.

## ADR-003: Datos mock sin backend

**Decisión:** Fase 1 sin Supabase/Firebase. Servicios devuelven datos hardcodeados con `delay()` simulado.

**Motivo:** Migrar diseño y flujos UI sin credenciales. Interfaces ya definidas para swap futuro.

## ADR-004: Syllabus como archivo TypeScript

**Decisión:** `syllabus.data.ts` con 348 verbos exportados como `const SYLLABUS_VERBS`.

**Motivo:** Misma fuente de verdad local que Flutter `SyllabusData.verbs`. Generado automáticamente desde Dart.

## ADR-005: Design tokens duplicados SCSS + TS

**Decisión:** Tokens en `app-theme.ts` (lógica) y `variables.scss` (Ionic CSS).

**Motivo:** Componentes Angular usan TS; componentes Ionic nativos usan CSS variables.

## ADR-006: Toast imperativo vía DOM

**Decisión:** `ToastService` crea elementos DOM directamente, no componente Angular.

**Motivo:** Equivalente al overlay `FeedbackToast` de Flutter que se muestra fuera del árbol de widgets. Evita dependencia de IonToast que tiene estilo diferente.

## ADR-007: Feature-first folder structure

**Decisión:** `features/<dominio>/<pantalla>/` en lugar de `pages/` plano.

**Motivo:** Escala mejor, coincide con Flutter `lib/features/`.

## Patrones utilizados

| Patrón | Aplicación |
|--------|------------|
| Feature-First Clean Architecture | Separación core/features |
| Singleton Services | `providedIn: 'root'` |
| Signals | Estado local en páginas |
| Lazy Loading | Todas las rutas con `loadComponent` |
| Smart/Dumb (parcial) | Pages smart, widgets dumb |
| Repository (futuro) | Services actuarán como repos con Supabase |

## Convenciones

- Páginas: `*.page.ts` + `*.page.html` + `*.page.scss`
- Componentes widget: `*.component.ts`
- Modelos: `*.model.ts` con interfaces
- Servicios: `*.service.ts`
- Textos UI: español
- Imports core: rutas relativas `../../../core/`

## Posibles mejoras futuras

1. **NgRx SignalStore o @ngrx/signals** si el estado global crece
2. **Capacitor Preferences** en lugar de localStorage para sesión
3. **Angular resource() API** para fetch async en componentes
4. **Shared quiz component** para practice + battle
5. **Barrel exports** (`core/index.ts`) para simplificar imports
6. **Environment-based service providers** (mock vs prod):

```typescript
{ provide: AuthService, useClass: environment.production ? SupabaseAuthService : MockAuthService }
```
