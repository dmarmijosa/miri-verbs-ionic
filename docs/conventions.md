# Convenciones de código

## Nombres

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Páginas | PascalCase + `Page` | `HomePage`, `VerbsListPage` |
| Componentes widget | PascalCase + `Component` | `TactileButtonComponent` |
| Servicios | PascalCase + `Service` | `AuthService` |
| Modelos | PascalCase interfaz | `Verb`, `UserProfile` |
| Archivos página | kebab-case | `verbs-list.page.ts` |
| Selectores | kebab-case con prefijo `app-` | `app-tactile-button` |
| Signals | camelCase | `currentPage`, `isLoading` |
| Constantes tema | PascalCase en objeto | `AppTheme.primary` |

## Organización de archivos

```
feature/
├── feature.page.ts       # Lógica + @Component
├── feature.page.html     # Template
└── feature.page.scss     # Estilos encapsulados
```

Widgets en `core/widgets/<nombre>/`:
```
tactile-button/
└── tactile-button.component.ts   # Inline template+styles OK para widgets pequeños
```

## Imports

Orden recomendado:
1. Angular / Ionic
2. ionicons
3. Core (services, models, widgets, theme)
4. Features relativos

```typescript
import { Component, inject, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../../../core/services/auth.service';
```

## Angular / Ionic

- **Standalone only:** `imports: [...]` en `@Component`
- **inject()** en lugar de constructor DI cuando sea posible
- **input() / output()** para componentes hijo (signal inputs)
- **@if / @for / @switch** (control flow moderno, no `*ngIf`)
- **Ion components** desde `@ionic/angular/standalone`

## Estilos

- Colores desde `AppTheme` o variables CSS `--ion-color-*`
- `max-width: 650px` para contenido principal (tablet-friendly)
- Fuente display: `Rubik`; cuerpo: `Plus Jakarta Sans`
- Cards: `border-radius: 16px`, `border: 1.5px solid #EAEEF2`
- Botones pill: `border-radius: 9999px`

## Servicios

```typescript
@Injectable({ providedIn: 'root' })
export class ExampleService {
  async fetch(): Promise<Model> {
    await this.delay(200);  // simular red en mock
    return { ... };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }
}
```

## Buenas prácticas del proyecto

1. Pantallas no acceden a `localStorage` directamente — usar servicios
2. Lógica de desbloqueo CEFR centralizada en `ProgressService`
3. No hardcodear listas de verbos — usar `VerbService` / `SYLLABUS_VERBS`
4. Feedback al usuario vía `ToastService`, no `alert()`
5. Navegación programática con `Router.navigate` / `navigateByUrl`
6. Lazy routes siempre en `app.routes.ts`
7. Comentarios solo para lógica de negocio no obvia
8. Build debe pasar antes de considerar tarea terminada

## Testing (convención futura)

- Servicios: Jasmine + TestBed con mocks
- Componentes: `TestBed.createComponent` + smoke tests
- Naming: `*.spec.ts` junto al archivo fuente

## Git

- No commitear: `node_modules/`, `www/`, credenciales
- Mensajes de commit en español o inglés, descriptivos del "por qué"
