# Comandos del proyecto

## Requisitos

- **Node.js:** v24.16.0 (compatible con Angular 20: `^20.19.0 || ^22.12.0 || >=24.0.0`)
- **npm:** 11.x

## Instalación

```bash
cd /Users/danny/Desktop/proyectos/miri-verbs-ionic
npm install
```

## Desarrollo (Browser)

```bash
npm start
# o
ng serve
```

Abrir http://localhost:4200

## Build

```bash
npm run build
# Output: www/
```

## Tests

```bash
npm test
# o un archivo específico:
ng test --include='**/auth.service.spec.ts'
```

## Lint

```bash
npm run lint
```

## Capacitor (futuro)

```bash
# Añadir plataformas (no ejecutado aún)
npx cap add ios
npx cap add android

# Sincronizar web build
npm run build && npx cap sync

# Abrir IDE nativo
npx cap open ios
npx cap open android
```

## Despliegue web (futuro)

```bash
npm run build
# Desplegar contenido de www/ a hosting estático (Firebase Hosting, Netlify, etc.)
```

## Utilidades

```bash
# Regenerar syllabus desde Flutter (si cambia syllabus_data.dart)
python3 scripts/convert-syllabus.py   # pendiente de crear script permanente

# Limpiar build
rm -rf www/ .angular/
```
