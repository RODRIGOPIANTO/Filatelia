# Guía de Contribución — Filatelia Peruana

¡Gracias por tu interés en contribuir! Esta guía te explica cómo trabajar con el proyecto.

## Flujo de trabajo

```
main          ← producción (Vercel auto-deploy)
  └─ develop  ← integración
       └─ feature/mi-feature   ← tu rama de trabajo
       └─ fix/nombre-del-bug
```

### Pasos para contribuir

```bash
# 1. Fork + clonar
git clone https://github.com/tu-usuario/filateliaperuana.git

# 2. Crear rama desde develop
git checkout develop
git pull
git checkout -b feature/nueva-funcionalidad

# 3. Hacer cambios y commitear
git add .
git commit -m "feat(tienda): agregar filtro por precio"

# 4. Asegurarse que los tests pasan
npm test
npm run build

# 5. Push y abrir PR hacia develop
git push origin feature/nueva-funcionalidad
```

## Convenciones de commits (Conventional Commits)

```
feat(scope): descripción        → Nueva funcionalidad
fix(scope): descripción         → Corrección de bug
docs(scope): descripción        → Solo documentación
style(scope): descripción       → Formato (no afecta lógica)
refactor(scope): descripción    → Refactoring
test(scope): descripción        → Tests
chore(scope): descripción       → Tareas de mantenimiento
```

### Scopes disponibles

`tienda` | `catalogo` | `admin` | `auth` | `api` | `db` | `ui` | `docs`

## Code Style

- **TypeScript strict** — sin `any` explícitos
- **Componentes Client** — solo cuando se necesiten eventos o hooks de estado
- **CSS Modules** — sin Tailwind, sin estilos en línea (excepto en `global-error.tsx`)
- **Naming**: PascalCase para componentes, camelCase para funciones

## Agregar un nuevo catálogo

1. Crear la migración de BD:
   ```bash
   npx prisma migrate dev --name add-catalog-mexico
   ```
2. Agregar el catálogo al seed (`prisma/seed.ts`)
3. Agregar cover image en `public/images/`
4. Actualizar `ACTIVE_CATALOGS` en `src/app/sitemap.ts`

## Agregar una nueva API route

1. Crear `src/app/api/<recurso>/route.ts`
2. Siempre usar try/catch con fallback demo
3. Agregar tests en `src/__tests__/api/<recurso>.test.ts`
4. Documentar en `docs/api.md`

## Ejecutar solo los tests afectados

```bash
# Tests que coincidan con un patrón
npx jest --testPathPattern="cart"

# Tests de un solo archivo
npx jest src/__tests__/unit/cart-context.test.tsx
```
