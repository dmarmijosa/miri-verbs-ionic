# Graph Report - miri-verbs-ionic  (2026-07-10)

## Corpus Check
- 70 files · ~117,508 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 507 nodes · 642 edges · 47 communities (33 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `900320b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- home.page.ts
- development
- dependencies
- devDependencies
- app
- Verb
- BattleService
- ToastService
- AuthService
- options
- PracticePage
- BattlePage
- HomePage
- VerbsListPage
- AppComponent
- What You Must Do When Invoked
- OnboardingPage
- WaitingChallengePage
- angular-cli
- .eslintrc.json
- PresentationVideoPage
- capacitor.config.ts
- environment.ts
- environment.prod.ts
- Decisiones de arquitectura
- Comandos del proyecto
- Convenciones de código
- Tarea actual
- Arquitectura
- Miriverbs Ionic — Resumen del Proyecto
- CLAUDE.md
- graphify reference: extra exports and benchmark
- Stack tecnológico
- Contexto de desarrollo actual
- Reglas para modificar el código
- graphify reference: query, path, explain
- Backlog
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- graphify
- extraction-spec.md

## God Nodes (most connected - your core abstractions)
1. `PracticePage` - 14 edges
2. `AuthService` - 13 edges
3. `BattleService` - 13 edges
4. `TactileButtonComponent` - 13 edges
5. `BattlePage` - 13 edges
6. `AppTheme` - 12 edges
7. `HomePage` - 12 edges
8. `What You Must Do When Invoked` - 12 edges
9. `ProgressService` - 11 edges
10. `Decisiones de arquitectura` - 11 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (47 total, 14 thin omitted)

### Community 0 - "home.page.ts"
Cohesion: 0.09
Nodes (24): AppConfig, BattleResult, BattleStats, FriendRequest, SublevelProgress, MOCK_FRIENDS, MOCK_ONLINE, MOCK_REQUESTS (+16 more)

### Community 1 - "development"
Cohesion: 0.07
Nodes (34): architect, build, extract-i18n, lint, serve, test, builder, configurations (+26 more)

### Community 2 - "dependencies"
Cohesion: 0.06
Nodes (32): author, dependencies, @angular/animations, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser (+24 more)

### Community 3 - "devDependencies"
Cohesion: 0.08
Nodes (26): devDependencies, @angular/compiler-cli, @angular-devkit/build-angular, @angular-eslint/builder, @angular-eslint/eslint-plugin, @angular-eslint/eslint-plugin-template, @angular-eslint/schematics, @angular-eslint/template-parser (+18 more)

### Community 4 - "app"
Cohesion: 0.08
Nodes (24): setParserOptionsProject, setParserOptionsProject, prefix, projectType, root, schematics, sourceRoot, cli (+16 more)

### Community 5 - "Verb"
Cohesion: 0.33
Nodes (4): SYLLABUS_VERBS, Verb, Injectable, VerbService

### Community 6 - "BattleService"
Cohesion: 0.17
Nodes (6): BattleSession, OnlinePlayer, BattleService, Injectable, OnlineFriendsFabComponent, Component

### Community 7 - "ToastService"
Cohesion: 0.15
Nodes (8): ToastMessage, ToastService, ToastType, Injectable, GoogleLogoComponent, Component, LoginPage, Component

### Community 8 - "AuthService"
Cohesion: 0.16
Nodes (7): AuthResult, UserProfile, AuthService, MOCK_PROFILE, Injectable, SplashPage, Component

### Community 9 - "options"
Cohesion: 0.18
Nodes (15): options, assets, browser, index, inlineStyleLanguage, karmaConfig, main, outputPath (+7 more)

### Community 14 - "AppComponent"
Cohesion: 0.36
Nodes (3): AppComponent, Component, routes

### Community 15 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 18 - "angular-cli"
Cohesion: 0.50
Nodes (3): angular-cli, npx, @angular/cli

### Community 19 - ".eslintrc.json"
Cohesion: 0.50
Nodes (3): ignorePatterns, overrides, root

### Community 27 - "Decisiones de arquitectura"
Cohesion: 0.17
Nodes (11): ADR-001: Angular Standalone sin NgModules, ADR-002: Servicios estáticos → Servicios injectable, ADR-003: Datos mock sin backend, ADR-004: Syllabus como archivo TypeScript, ADR-005: Design tokens duplicados SCSS + TS, ADR-006: Toast imperativo vía DOM, ADR-007: Feature-first folder structure, Convenciones (+3 more)

### Community 28 - "Comandos del proyecto"
Cohesion: 0.18
Nodes (10): Build, Capacitor (futuro), Comandos del proyecto, Desarrollo (Browser), Despliegue web (futuro), Instalación, Lint, Requisitos (+2 more)

### Community 29 - "Convenciones de código"
Cohesion: 0.18
Nodes (10): Angular / Ionic, Buenas prácticas del proyecto, Convenciones de código, Estilos, Git, Imports, Nombres, Organización de archivos (+2 more)

### Community 30 - "Tarea actual"
Cohesion: 0.18
Nodes (10): Archivos afectados (migración reciente), Bloqueadores, Config, Core, Docs, Features, Próximos pasos, Qué falta por terminar (+2 more)

### Community 31 - "Arquitectura"
Cohesion: 0.20
Nodes (9): Arquitectura, Comunicación entre componentes, Ejemplo: Práctica de verbos, Estructura de carpetas, Flujo de datos, Navegación, Tecnologías utilizadas, Visión general (+1 more)

### Community 32 - "Miriverbs Ionic — Resumen del Proyecto"
Cohesion: 0.22
Nodes (8): Arquitectura, Descripción, Documentación relacionada, Estado actual, Flujo de usuario, Miriverbs Ionic — Resumen del Proyecto, Origen, Reglas de dominio preservadas

### Community 33 - "CLAUDE.md"
Cohesion: 0.22
Nodes (7): Architecture, Commands, Conventions that matter here, Domain rules (preserved from Flutter, mostly in `ProgressService`), graphify, Project docs (read these for depth before large changes), What this is

### Community 34 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 35 - "Stack tecnológico"
Cohesion: 0.25
Nodes (7): Backend (planificado, no integrado), Capacitor plugins instalados, Configuración Ionic, Fuentes, Plataformas objetivo, Stack tecnológico, Versiones verificadas (2026-07-10)

### Community 36 - "Contexto de desarrollo actual"
Cohesion: 0.29
Nodes (6): Completado, Contexto de desarrollo actual, Fase, Pendiente, Rutas activas, Sesión mock

### Community 37 - "Reglas para modificar el código"
Cohesion: 0.33
Nodes (5): Antes de push, Imports, No hacer, Reglas para modificar el código, Siempre seguir

### Community 38 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 39 - "Backlog"
Cohesion: 0.33
Nodes (5): Backlog, Bugs encontrados, Ideas nuevas funcionalidades, Mejoras futuras, Refactors pendientes

### Community 40 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 41 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 42 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **232 isolated node(s):** `npx`, `@angular/cli`, `root`, `ignorePatterns`, `overrides` (+227 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `dependencies`, `app`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `architect` connect `development` to `app`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `npx`, `@angular/cli`, `root` to the rest of the system?**
  _232 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `home.page.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0880503144654088 - nodes in this community are weakly interconnected._
- **Should `development` be split into smaller, more focused modules?**
  _Cohesion score 0.0659536541889483 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._