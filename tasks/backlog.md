# Backlog

## Mejoras futuras

- [ ] Dark mode (Flutter solo tiene light theme; evaluar si añadir)
- [ ] Animaciones de transición entre rutas (View Transitions API)
- [ ] Haptic feedback en botones táctiles (Capacitor Haptics)
- [ ] PWA con service worker para offline
- [ ] Internacionalización (i18n) si se requiere inglés en UI
- [ ] Optimizar bundle del syllabus (lazy load por nivel CEFR)
- [ ] Script permanente `scripts/convert-syllabus.py` desde Flutter

## Bugs encontrados

- [ ] Syllabus parseado: 348 verbos vs 360 esperados (12 verbos no matchearon regex de conversión)
- [ ] `TactileButton` en FAB arena: ancho fijo puede desbordar texto "Retar"
- [ ] Practice page: `history.state` se pierde al refrescar — usar query params o servicio de sesión
- [ ] Presentation video: URL mock de YouTube placeholder

## Refactors pendientes

- [ ] Extraer lógica de quiz (`generateQuiz`) a `QuizService` en core
- [ ] Unificar estilos de `option-btn` entre practice y battle (componente compartido)
- [ ] Auth guard en rutas protegidas (`/home`, `/verbs`, etc.)
- [ ] Migrar `@import` SCSS a `@use` (deprecation Dart Sass 3.0)
- [ ] Aumentar budget SCSS en `angular.json` o modularizar estilos home/login

## Ideas nuevas funcionalidades

- [ ] Modo repaso espaciado (spaced repetition)
- [ ] Leaderboard global de PvP
- [ ] Logros/badges por racha y victorias
- [ ] Compartir progreso en redes sociales
- [ ] Modo offline completo con IndexedDB
