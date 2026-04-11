# 🏷️ Filatelia Peruana

> **La primera tienda filatélica online del Perú** — Catálogos digitales tipo álbum, sellos históricos y accesorios para coleccionistas.

[![CI Status](https://github.com/tu-usuario/filateliaperuana/actions/workflows/ci.yml/badge.svg)](https://github.com/tu-usuario/filateliaperuana/actions)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-teal?logo=prisma)](https://www.prisma.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Tabla de Contenidos

- [Vista General](#-vista-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Base de Datos](#-base-de-datos)
- [Scripts Disponibles](#-scripts-disponibles)
- [API Reference](#-api-reference)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Arquitectura](#-arquitectura)

---

## 🌟 Vista General

Filatelia Peruana es una plataforma fullstack construida con **Next.js 14 App Router** que ofrece:

- 📚 **Catálogo fotográfico digital** tipo álbum para estampillas de Perú, Israel y más países
- 🛒 **Tienda online** con carrito persistente (React Context) y checkout multi-paso
- 🔑 **Autenticación JWT** con roles SUPER_ADMIN, CATALOG_ADMIN y USER
- 🗄️ **Panel administrativo** con dashboard, CRUD de estampillas e importación masiva por Excel
- 📊 **Analytics** de visitas y comportamiento de coleccionistas
- 📥 **Importación Excel** con validación fila por fila usando Zod

---

## ⚡ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | CSS Modules + Variables CSS (Design System propio) |
| ORM | Prisma 5 |
| Base de datos | PostgreSQL 15 |
| Auth | JWT (`jsonwebtoken` + `bcryptjs`) |
| Validación | Zod 3 |
| Excel | xlsx (SheetJS) |
| Testing | Jest + React Testing Library |
| CI/CD | GitHub Actions |
| Deploy | Vercel |

---

## 📁 Estructura del Proyecto

```
filateliaperuana/
├── .github/
│   └── workflows/ci.yml          # Pipeline CI/CD
├── docs/
│   ├── api.md                    # Documentación API
│   ├── deployment.md             # Guía de despliegue
│   └── contributing.md           # Guía de contribución
├── prisma/
│   ├── schema.prisma             # Esquema de base de datos
│   └── seed.ts                   # Datos iniciales
├── public/
│   ├── images/                   # Assets estáticos
│   └── robots.txt
├── src/
│   ├── __tests__/                # Test suite
│   │   ├── api/                  # Tests de API routes
│   │   ├── unit/                 # Tests unitarios
│   │   └── setup.ts              # Configuración Jest
│   ├── app/
│   │   ├── (admin)/              # Panel administrativo
│   │   │   └── admin/            # Módulos: dashboard, catálogos, grupos,
│   │   │                         # estampillas, importar, modificaciones, analítica
│   │   ├── (public)/             # Sitio público
│   │   │   ├── catalogos/        # Vista álbum de catálogos
│   │   │   ├── tienda/           # Tienda con detalle de productos
│   │   │   ├── checkout/         # Flujo de pago (4 pasos)
│   │   │   └── perfil/           # Perfil usuario (3 tabs)
│   │   ├── api/                  # API routes (REST)
│   │   │   ├── auth/             # register + JWT login
│   │   │   ├── catalogs/         # GET catalogs + GET catalog/[slug]
│   │   │   ├── import/           # POST Excel import
│   │   │   └── visits/           # GET/POST visit counter
│   │   ├── layout.tsx            # Root layout + CartProvider
│   │   └── sitemap.ts            # Auto-generated sitemap
│   ├── components/
│   │   ├── Navbar/               # Barra de navegación + carrito
│   │   ├── Footer/               # Pie de página
│   │   ├── AdminNavbar/          # Navegación del panel admin
│   │   ├── CartDrawer/           # Drawer deslizable del carrito
│   │   └── Skeleton/             # Componentes de carga
│   ├── context/
│   │   └── CartContext.tsx        # Estado global del carrito (useReducer)
│   ├── lib/
│   │   ├── db/prisma.ts          # Singleton Prisma client
│   │   └── excel/parser.ts       # Parser y validador de Excel
│   ├── middleware.ts              # Rate limiting + security headers + auth guard
│   ├── styles/
│   │   ├── tokens.css            # Design system (variables CSS)
│   │   └── *.module.css          # Módulos de estilos por página
│   └── types/
│       └── catalog.ts            # Tipos TypeScript + helpers
├── .env                          # Variables de entorno locales
├── jest.config.ts                # Configuración Jest
├── next.config.js                # Configuración Next.js
├── vercel.json                   # Configuración Vercel
└── tsconfig.json                 # Configuración TypeScript
```

---

## 🚀 Instalación

### Prerrequisitos

- **Node.js** ≥ 20
- **PostgreSQL** ≥ 15
- **npm** ≥ 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/filateliaperuana.git
cd filateliaperuana

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Generar el cliente Prisma
npm run db:generate

# 5. Ejecutar migraciones
npm run db:migrate

# 6. Cargar datos de ejemplo
npm run db:seed

# 7. Iniciar el servidor de desarrollo
npm run dev
```

El sitio estará disponible en **http://localhost:3000**

---

## 🔧 Variables de Entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ | URL de conexión PostgreSQL |
| `NEXTAUTH_SECRET` | ✅ | Secret para firmar tokens JWT |
| `NEXTAUTH_URL` | ✅ | URL base de la aplicación |
| `NEXT_PUBLIC_APP_URL` | ✅ | URL pública (usada en metadata/sitemap) |

> **Cuentas demo post-seed:**
> - Admin: `admin@filateliaperuana.com` / `Admin1234!`
> - Demo: `demo@filateliaperuana.com` / `Demo1234!`
> - Login rápido sin BD: `admin@test.com` / `Admin1234!`

---

## 🗄️ Base de Datos

### Modelos principales

```
User ──────────┬── UserCollectingCountry
               └── UserCollectingTheme

Catalog ───────── StampGroup ──── Stamp ─┬── StampCatalogNumber (Scott/Michel/Yvert)
                                          └── StampImage

SiteVisit          (event log de visitas)
Order ──────────── OrderItem
```

### Comandos

```bash
# Crear nueva migración
npm run db:migrate

# Regenerar cliente Prisma (tras cambios en schema)
npm run db:generate

# Cargar datos de ejemplo
npm run db:seed

# Abrir Prisma Studio (GUI)
npm run db:studio
```

---

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm test` | Tests unitarios e integración |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con reporte de cobertura |
| `npm run test:ci` | Tests para CI (no-interactive) |
| `npm run db:migrate` | Ejecutar migraciones Prisma |
| `npm run db:generate` | Generar cliente Prisma |
| `npm run db:seed` | Poblar BD con datos de ejemplo |
| `npm run db:studio` | Abrir Prisma Studio |

---

## 🌐 API Reference

### Catálogos

```http
GET /api/catalogs
```
Devuelve lista de catálogos activos y en construcción.

```http
GET /api/catalogs/{slug}
```
Devuelve catálogo completo con grupos y estampillas.

### Visitas

```http
GET  /api/visits          → { visits: number }
POST /api/visits          → { visits: number }
Body: { path, countryCode, userAgent, ip }
```

### Autenticación

```http
POST /api/auth/register
Body: { fullName, email, username, password, countryCode? }
→ 201: { data: { id, email, username } }
→ 409: email/username duplicado
→ 422: validación fallida

POST /api/auth/[...nextauth]
Body: { email, password }
→ 200: { token, user: { id, name, email, role } }
→ 401: credenciales inválidas
```

### Importación

```http
POST /api/import                    (multipart/form-data, campo: "file")
→ 200: { total, ok, errors: [{ rowNumber, issues, rawData }] }

GET  /api/import/template           → CSV plantilla descargable
```

> **Rate limiting:** 120 req/min en APIs generales · 10 req/min en `/api/import`

---

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# En modo watch (desarrollo)
npm run test:watch

# Con cobertura de código
npm run test:coverage
```

### Estructura de tests

```
src/__tests__/
├── setup.ts                    # Mocks globales (Next.js, console)
├── unit/
│   ├── catalog-helpers.test.ts # calculateMarketValue, getScottNumber
│   ├── cart-context.test.tsx   # CartContext (add/remove/update/clear)
│   └── excel-parser.test.ts    # parseStampExcel (15 casos de prueba)
└── api/
    ├── visits.test.ts          # GET y POST /api/visits
    └── register.test.ts        # POST /api/auth/register (6 casos)
```

### Umbral mínimo de cobertura: **60%** en branches, functions, lines y statements.

---

## 🚢 Deployment

### Vercel (recomendado)

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Agregar variables de entorno en el panel de Vercel
3. El deploy automático ocurre en cada push a `main`

### Variables en Vercel

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<openssl rand -base64 32>
NEXTAUTH_URL=https://filateliaperuana.com
NEXT_PUBLIC_APP_URL=https://filateliaperuana.com
```

### CD via GitHub Actions

El pipeline `.github/workflows/ci.yml` ejecuta en cada PR/push:
1. **Lint + TypeCheck** — ESLint + `tsc --noEmit`
2. **Unit tests** — Jest con PostgreSQL de servicio
3. **Production build** — `next build`
4. **Deploy** — Vercel CLI (solo en `main`)

---

## 🏗️ Arquitectura

### Design System "Industrial Dark"

Todos los estilos se derivan de variables CSS en `src/styles/tokens.css`:

```css
--color-primary:        #2d4a2d   /* Verde musgo oscuro */
--color-accent:         #c8a96e   /* Dorado antiguo */
--color-bg-dark:        #0d1a0d   /* Fondo principal */
--font-display:         'Cormorant Garamond', serif
--font-body:            'Inter', sans-serif
```

### Server vs Client Components

| Componente | Tipo | Razón |
|-----------|------|-------|
| `page.tsx` raíces | Server | SEO, fetch en servidor |
| `StampCard` | Client | `onError` en imágenes |
| `Navbar` | Client | `usePathname`, `useCart` |
| `CartDrawer` | Client | Estado de UI, eventos `onClick` |
| `tienda/page.tsx` | Client | Filtros reactivos, `useCart` |
| `checkout/page.tsx` | Client | Formulario multi-paso |
| `perfil/page.tsx` | Client | Tabs, formularios |

### Middleware

`src/middleware.ts` intercepta todas las rutas públicas y aplica:
- **Rate limiting** (in-memory, 120/min global, 10/min en `/api/import`)
- **Seguridad headers** (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
- **Auth guard** en `/admin/*` → redirige a `/auth/login`

---

## 📄 Licencia

MIT © 2026 Filatelia Peruana
