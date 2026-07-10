# Reglas para modificar el código

## Siempre seguir

1. **Clean Architecture feature-first:** `core/` para lógica compartida, `features/<dominio>/` para pantallas.
2. **Standalone components:** No crear NgModules. Usar `imports` en cada componente.
3. **Sin credenciales:** Nunca commitear API keys, tokens Supabase, Firebase, etc.
4. **Servicios mock primero:** Los servicios en `core/services/` devuelven datos simulados hasta integrar backend.
5. **Diseño Stitch Kinetic:** Usar tokens de `core/theme/app-theme.ts` y variables en `src/theme/variables.scss`. No hardcodear colores fuera del tema salvo casos puntuales en SCSS de componente.
6. **UI en español:** Textos visibles al usuario y comentarios relevantes en español.
7. **Widgets reutilizables:** Botones → `TactileButtonComponent`, barras de progreso → `SquishyProgressBarComponent`, notificaciones → `ToastService`.
8. **Angular Signals:** Preferir `signal()`, `computed()` para estado local de componentes.
9. **Lazy loading:** Rutas con `loadComponent` en `app.routes.ts`.
10. **Actualizar docs:** Tras cada tarea importante, actualizar `tasks/current.md` y `/.ai/context.md`.

## Imports

- Desde `features/<x>/<y>/`: usar `../../../core/...` (3 niveles hasta `app/`).
- Desde `features/<x>/`: usar `../../core/...` (2 niveles).

## No hacer

- No llamar Supabase/Firebase directamente desde componentes.
- No usar `NgModule` ni patrones legacy de Angular.
- No modificar `capacitor.config.ts` appId sin acuerdo.
- No crear archivos markdown no solicitados fuera de `.ai/`, `tasks/`, `docs/`.

## Antes de push

```bash
npm run build   # Debe completar sin errores
npm run lint    # Sin errores críticos
```
