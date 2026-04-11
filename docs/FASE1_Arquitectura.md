# FASE 1 — ANÁLISIS Y ARQUITECTURA
## Proyecto: filateliaperuana.com

---

## 1.1 Resumen de Requerimientos

### Negocio
- **Producto Principal**: Catálogo filatélico digital tipo álbum
- **Producto Secundario**: Tienda online (estampillas, accesorios, álbumes)
- **Mercado Inicial**: Perú — Escalable a internacional
- **Idioma Base**: Español — Preparado para Inglés

### Módulos Identificados
| Módulo | Prioridad | Descripción |
|---|---|---|
| Catálogo | ALTA | Álbum visual por país y temática |
| Admin Panel | ALTA | CRUD completo + importación Excel |
| Autenticación | ALTA | Login, registro, sesiones, roles |
| Tienda | MEDIA | Productos, categorías, carrito base |
| Analítica | MEDIA | Contador de visitas, vistas por catálogo |
| Importación Excel | ALTA | Carga masiva con validación por fila |
| SEO | ALTA | SSR, meta tags, sitemap, robots.txt |

---

## 1.2 Stack Tecnológico Seleccionado

### Decisión Técnica y Justificación

| Capa | Tecnología | Justificación |
|---|---|---|
| **Frontend + Backend** | Next.js 14 (App Router) | SSR nativo = SEO óptimo; API Routes integradas; TypeScript |
| **Base de Datos** | PostgreSQL 16 | Relacional robusto, soporte JSON, índices, escalable |
| **ORM** | Prisma | Tipado, migraciones declarativas, DX excelente |
| **Autenticación** | NextAuth.js v5 | Soporte JWT + sesiones, OAuth listo, extensible |
| **Estilos** | CSS Modules + Variables CSS | Control total, sin dependencias pesadas, coherencia visual |
| **Tipografía** | Google Fonts: Cormorant Garamond + Inter | Elegancia clásica + legibilidad moderna |
| **Excel** | SheetJS (xlsx) | Parser robusto para importación masiva |
| **Imágenes** | Next.js Image + almacenamiento local | Optimización automática, lazy loading, CDN-ready |
| **ORM Seeds** | Prisma Seeds | Datos demo consistentes |

### Decisión Rechazada
- **Wordpress/WooCommerce**: Descartado. Ya existe y no da la elegancia de álbum requerida.
- **Tailwind CSS**: Descartado. CSS Modules ofrecen más control fino para diseño tipo álbum.

---

## 1.3 Módulos del Sistema

```
filateliaperuana.com
├── PUBLIC SITE
│   ├── Home (Hero + Bloques CTA)
│   ├── Catálogos Landing
│   │   ├── Por Países
│   │   └── Por Temáticas
│   ├── Catálogo Específico (/catalogo/peru)
│   ├── Tienda
│   │   ├── Listado de Productos
│   │   └── Ficha de Producto
│   ├── Login
│   └── Registro
│
├── ADMIN PANEL (/admin)
│   ├── Dashboard (Resumen + Últimas Modificaciones)
│   ├── Gestión de Catálogos (CRUD)
│   ├── Gestión de Grupos (CRUD)
│   ├── Gestión de Estampillas (CRUD)
│   ├── Importación Excel
│   ├── Gestión de Tienda (Productos)
│   └── Analítica (Vistas, Visitas por país)
│
└── API (/api)
    ├── /auth
    ├── /catalogs
    ├── /groups
    ├── /stamps
    ├── /products
    ├── /visits
    ├── /import
    └── /users
```

---

## 1.4 Roles de Usuario

| Rol | Permisos |
|---|---|
| `SUPER_ADMIN` | Acceso total: todos los catálogos, tienda, usuarios, analítica |
| `CATALOG_ADMIN` | Gestiona solo los catálogos que le asignen |
| `USER` | Navega catálogos, usa la tienda, tiene perfil |
| `GUEST` | Solo lectura del sitio público |

---

## 1.5 Roadmap Técnico por Fases

| Fase | Descripción | Archivos Clave |
|---|---|---|
| **1** | Análisis + Arquitectura | Este documento |
| **2** | Diseño Técnico (BD, Rutas, Auth) | FASE2_Diseño.md |
| **3** | Setup del Proyecto | package.json, .env, prisma/schema.prisma |
| **4** | Backend Core (API Routes) | src/app/api/** |
| **5** | Frontend Público | src/app/(public)/** |
| **6** | Admin Panel | src/app/(admin)/** |
| **7** | Datos Demo (Seeds) | prisma/seed.ts |
| **8** | QA + Correcciones | Tests, navegador |
| **9** | Documentación Final | README.md |

---

## 1.6 Estrategia SEO (Decisiones Clave)

- **SSR** para todas las páginas públicas de catálogo → Google indexa contenido
- **Metadata API** de Next.js para meta tags dinámicos por catálogo/país
- **URLs limpias**: `/catalogo/peru`, `/catalogo/tematica/fauna`
- **sitemap.xml** generado dinámicamente desde la BD
- **robots.txt** que excluye /admin y /api
- **Alt text** en todas las imágenes de estampillas
- **Schema.org** JSON-LD para productos de tienda
