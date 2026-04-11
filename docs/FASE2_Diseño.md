# FASE 2 — DISEÑO TÉCNICO
## Proyecto: filateliaperuana.com

---

## 2.1 Estructura de Carpetas Completa

```
filateliaperuana/
├── prisma/
│   ├── schema.prisma          # Definición completa del modelo de BD
│   ├── seed.ts                # Datos demo (Perú, Israel, Chile, Brasil)
│   └── migrations/            # Historial de migraciones
│
├── public/
│   ├── images/
│   │   ├── stamps/            # Imágenes de estampillas
│   │   ├── logos/             # Logo del sitio
│   │   ├── banners/           # Banners de hero y secciones
│   │   └── products/          # Imágenes de productos de tienda
│   ├── sitemap.xml            # Generado dinámicamente
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── (public)/          # Grupo de rutas públicas
│   │   │   ├── page.tsx       # Home
│   │   │   ├── catalogos/
│   │   │   │   ├── page.tsx           # Landing catálogos
│   │   │   │   ├── paises/page.tsx    # Grilla de países
│   │   │   │   ├── tematicas/page.tsx # Grilla de temáticas
│   │   │   │   └── [slug]/page.tsx    # Catálogo específico (álbum)
│   │   │   ├── tienda/
│   │   │   │   ├── page.tsx           # Tienda - listado
│   │   │   │   └── [slug]/page.tsx    # Ficha de producto
│   │   │   └── auth/
│   │   │       ├── login/page.tsx
│   │   │       └── registro/page.tsx
│   │   │
│   │   ├── (admin)/           # Grupo de rutas admin (protegidas)
│   │   │   ├── layout.tsx     # Layout con sidebar admin
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── catalogos/
│   │   │   │   ├── page.tsx   # Listado de catálogos
│   │   │   │   ├── nuevo/page.tsx
│   │   │   │   └── [id]/editar/page.tsx
│   │   │   ├── grupos/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── estampillas/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── importar/page.tsx
│   │   │   ├── tienda/page.tsx
│   │   │   └── analitica/page.tsx
│   │   │
│   │   ├── api/               # API Routes (Backend)
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── catalogs/route.ts
│   │   │   ├── catalogs/[id]/route.ts
│   │   │   ├── groups/route.ts
│   │   │   ├── groups/[id]/route.ts
│   │   │   ├── stamps/route.ts
│   │   │   ├── stamps/[id]/route.ts
│   │   │   ├── products/route.ts
│   │   │   ├── visits/route.ts
│   │   │   ├── import/route.ts
│   │   │   └── users/route.ts
│   │   │
│   │   ├── layout.tsx         # Root layout (fuentes, meta global)
│   │   └── globals.css        # Variables CSS globales del design system
│   │
│   ├── components/
│   │   ├── ui/                # Componentes genéricos reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── VisitCounter.tsx
│   │   ├── catalog/           # Componentes del catálogo
│   │   │   ├── AlbumPage.tsx      # Renderiza página de álbum
│   │   │   ├── StampGroup.tsx     # Recuadro de grupo de sellos
│   │   │   ├── StampCard.tsx      # Tarjeta individual de estampilla
│   │   │   ├── CountryCard.tsx    # Card en grilla de países
│   │   │   └── ThemeCard.tsx      # Card en grilla de temáticas
│   │   ├── store/             # Componentes de tienda
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── CartButton.tsx
│   │   ├── admin/             # Componentes del panel admin
│   │   │   ├── Sidebar.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── ImportUploader.tsx
│   │   │   └── StatCard.tsx
│   │   ├── Navbar.tsx         # Navegación pública
│   │   └── Footer.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   └── prisma.ts      # Singleton de Prisma Client
│   │   ├── auth/
│   │   │   └── config.ts      # NextAuth config (providers, callbacks)
│   │   ├── excel/
│   │   │   ├── parser.ts      # Lógica de parseo de xlsx
│   │   │   └── validator.ts   # Validaciones por fila de Excel
│   │   ├── seo/
│   │   │   └── metadata.ts    # Helper para generar metadata por página
│   │   └── utils/
│   │       ├── formats.ts     # Formateadores de fecha, moneda
│   │       └── slugify.ts     # Generación de slugs para URLs
│   │
│   ├── styles/
│   │   ├── tokens.css         # Design tokens (colores, tipografía, spacing)
│   │   ├── catalog.module.css # Estilos del álbum filatélico
│   │   ├── admin.module.css   # Estilos del panel admin
│   │   └── store.module.css   # Estilos de la tienda
│   │
│   └── types/
│       ├── catalog.ts         # Tipos TypeScript para catálogos
│       ├── stamp.ts           # Tipos para estampillas
│       ├── product.ts         # Tipos para productos
│       └── user.ts            # Tipos para usuarios y roles
│
├── docs/
│   ├── FASE1_Arquitectura.md
│   ├── FASE2_Diseño.md       (este archivo)
│   └── INSTALACION.md
│
├── .env.example               # Plantilla de variables de entorno
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 2.2 Modelo de Base de Datos (PostgreSQL + Prisma)

### Entidades Principales

```prisma
// --- USUARIOS Y ROLES ---

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  username      String?   @unique
  passwordHash  String
  fullName      String?
  birthDate     DateTime?
  countryCode   String?   // ISO 3166-1 alpha-2
  avatarUrl     String?
  role          Role      @default(USER)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  collectingCountries  UserCollectingCountry[]
  collectingThemes     UserCollectingTheme[]
  catalogAdminOf       CatalogAdmin[]
  activityLogs         ActivityLog[]
}

enum Role {
  SUPER_ADMIN
  CATALOG_ADMIN
  USER
}

model CatalogAdmin {
  id        String   @id @default(cuid())
  userId    String
  catalogId String
  user      User     @relation(fields: [userId], references: [id])
  catalog   Catalog  @relation(fields: [catalogId], references: [id])
  @@unique([userId, catalogId])
}

// --- CATÁLOGOS ---

model Catalog {
  id          String        @id @default(cuid())
  slug        String        @unique // "peru", "flora-mundial"
  nameEs      String
  nameEn      String?
  descEs      String?
  descEn      String?
  type        CatalogType   // COUNTRY | THEME
  countryCode String?       // ISO 3166-1 alpha-2 (si es tipo COUNTRY)
  status      CatalogStatus @default(DRAFT)
  coverUrl    String?
  order       Int           @default(0)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  groups       StampGroup[]
  admins       CatalogAdmin[]
  views        CatalogView[]
  updateLogs   CatalogUpdateLog[]
}

enum CatalogType {
  COUNTRY
  THEME
}

enum CatalogStatus {
  ACTIVE
  UNDER_CONSTRUCTION
  DRAFT
  INACTIVE
}

// --- GRUPOS DE ESTAMPILLAS ---

model StampGroup {
  id          String   @id @default(cuid())
  catalogId   String
  year        Int
  titleEs     String
  titleEn     String?
  description String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  catalog  Catalog  @relation(fields: [catalogId], references: [id], onDelete: Cascade)
  stamps   Stamp[]
}

// --- ESTAMPILLAS ---

model Stamp {
  id              String    @id @default(cuid())
  groupId         String
  order           Int       @default(0)
  issueDate       DateTime?
  faceValue       String?   // Ej: "1d", "24c", "S/. 1.20"
  printRun        BigInt?   // Tiraje
  perforation     String?   // Ej: "11.2 x 11.4"
  watermark       String?
  printingMethod  String?   // Intaglio, Offset, etc.
  color           String?
  conditionCode   String?   // MNH, MH, USED, etc.
  catalogValue    Decimal?  @db.Decimal(10, 2)
  isPublished     Boolean   @default(false)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  group            StampGroup           @relation(fields: [groupId], references: [id], onDelete: Cascade)
  images           StampImage[]
  catalogNumbers   StampCatalogNumber[]
}

model StampCatalogNumber {
  id       String @id @default(cuid())
  stampId  String
  system   CatalogNumberSystem
  number   String // Ej: "C13A", "1234"

  stamp Stamp @relation(fields: [stampId], references: [id], onDelete: Cascade)
  @@unique([stampId, system])
}

enum CatalogNumberSystem {
  SCOTT
  MICHEL
  YVERT
  STANLEY_GIBBONS
  FACIT
}

// --- IMÁGENES ---

model StampImage {
  id        String  @id @default(cuid())
  stampId   String
  url       String
  altEs     String?
  altEn     String?
  isPrimary Boolean @default(false)
  isFront   Boolean @default(true) // true=frente, false=reverso
  order     Int     @default(0)

  stamp Stamp @relation(fields: [stampId], references: [id], onDelete: Cascade)
}

// --- TEMAS Y COLECCIONES DE USUARIO ---

model Theme {
  id    String @id @default(cuid())
  slug  String @unique
  nameEs String
  nameEn String?

  collectingUsers UserCollectingTheme[]
}

model UserCollectingCountry {
  id          String @id @default(cuid())
  userId      String
  countryCode String
  user        User   @relation(fields: [userId], references: [id])
  @@unique([userId, countryCode])
}

model UserCollectingTheme {
  id      String @id @default(cuid())
  userId  String
  themeId String
  user    User   @relation(fields: [userId], references: [id])
  theme   Theme  @relation(fields: [themeId], references: [id])
  @@unique([userId, themeId])
}

// --- TIENDA ---

model ProductCategory {
  id     String    @id @default(cuid())
  slug   String    @unique
  nameEs String
  nameEn String?
  order  Int       @default(0)

  products Product[]
}

model Product {
  id           String          @id @default(cuid())
  categoryId   String
  slug         String          @unique
  nameEs       String
  nameEn       String?
  descEs       String?
  descEn       String?
  shortDescEs  String?
  price        Decimal         @db.Decimal(10, 2)
  stock        Int             @default(0)
  isActive     Boolean         @default(true)
  coverUrl     String?
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt

  category   ProductCategory @relation(fields: [categoryId], references: [id])
  images     ProductImage[]
  orderItems OrderItem[]
}

model ProductImage {
  id        String  @id @default(cuid())
  productId String
  url       String
  isPrimary Boolean @default(false)
  order     Int     @default(0)

  product Product @relation(fields: [productId], references: [id])
}

// --- PEDIDOS ---

model Order {
  id         String      @id @default(cuid())
  userId     String
  status     OrderStatus @default(PENDING)
  totalPrice Decimal     @db.Decimal(10, 2)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt

  items OrderItem[]
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  unitPrice Decimal @db.Decimal(10, 2)

  order   Order   @relation(fields: [orderId], references: [id])
  product Product @relation(fields: [productId], references: [id])
}

// --- ANALÍTICA ---

model SiteVisit {
  id          String   @id @default(cuid())
  ip          String?
  countryCode String?
  userAgent   String?
  path        String
  visitedAt   DateTime @default(now())
}

model CatalogView {
  id        String   @id @default(cuid())
  catalogId String
  viewedAt  DateTime @default(now())
  catalog   Catalog  @relation(fields: [catalogId], references: [id])
}

// --- IMPORTACIÓN EXCEL ---

model ImportJob {
  id         String          @id @default(cuid())
  filename   String
  status     ImportJobStatus @default(PROCESSING)
  totalRows  Int             @default(0)
  okRows     Int             @default(0)
  errorRows  Int             @default(0)
  createdAt  DateTime        @default(now())
  finishedAt DateTime?

  rows ImportJobRow[]
}

enum ImportJobStatus {
  PROCESSING
  COMPLETED
  FAILED
}

model ImportJobRow {
  id        String   @id @default(cuid())
  jobId     String
  rowNumber Int
  rowData   Json
  status    String   // "ok" | "error"
  errorMsg  String?
  createdAt DateTime @default(now())

  job ImportJob @relation(fields: [jobId], references: [id])
}

// --- LOGS DE ACTIVIDAD ---

model ActivityLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String
  entity    String
  entityId  String?
  detail    Json?
  createdAt DateTime @default(now())

  user User? @relation(fields: [userId], references: [id])
}

model CatalogUpdateLog {
  id        String   @id @default(cuid())
  catalogId String
  userId    String?
  summary   String
  createdAt DateTime @default(now())

  catalog Catalog @relation(fields: [catalogId], references: [id])
}
```

---

## 2.3 Rutas de la API

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/catalogs` | Listado de catálogos activos | Pública |
| `POST` | `/api/catalogs` | Crear catálogo | SUPER_ADMIN |
| `GET` | `/api/catalogs/[id]` | Detalle de catálogo + grupos | Pública |
| `PUT` | `/api/catalogs/[id]` | Editar catálogo | ADMIN |
| `DELETE` | `/api/catalogs/[id]` | Eliminar catálogo | SUPER_ADMIN |
| `GET` | `/api/groups` | Grupos de un catálogo | Pública |
| `POST` | `/api/groups` | Crear grupo | ADMIN |
| `PUT` | `/api/groups/[id]` | Editar grupo | ADMIN |
| `GET` | `/api/stamps` | Estampillas de un grupo | Pública |
| `POST` | `/api/stamps` | Crear estampilla | ADMIN |
| `PUT` | `/api/stamps/[id]` | Editar estampilla | ADMIN |
| `GET` | `/api/products` | Productos de la tienda | Pública |
| `POST` | `/api/products` | Crear producto | SUPER_ADMIN |
| `POST` | `/api/visits` | Registrar visita | Pública |
| `GET` | `/api/visits` | Ver analítica | SUPER_ADMIN |
| `POST` | `/api/import` | Importar Excel | ADMIN |
| `GET` | `/api/import/[jobId]` | Estado del job | ADMIN |
| `POST` | `/api/auth/register` | Registrar usuario | Pública |

---

## 2.4 Estrategia de Autenticación

- **Provider**: Credentials (email + password). Listo para OAuth futuro (Google).
- **Hashing**: `bcryptjs` con salt rounds = 12.
- **Sesión**: JWT firmado con `NEXTAUTH_SECRET` en `.env`.
- **Protección de rutas**: Middleware de Next.js que redirige `/admin/**` si no hay sesión con rol `ADMIN`.
- **Rate limiting**: Header simple `X-RateLimit` en ruta de login (5 intentos / 15 minutos por IP).

---

## 2.5 Estrategia de Uploads de Imágenes

- **Almacenamiento Fase 1**: Sistema de archivos local en `/public/images/`
- **Ruta de imagen**: `/images/stamps/{catalogId}/{stamId}.webp`
- **Conversión**: Se convierte a `.webp` en el servidor al subir
- **CDN-Ready**: Variable `STORAGE_URL` en `.env` para migrar a S3/Cloudinary sin cambiar el código
- **Restricciones**: Solo tipos `image/jpeg`, `image/png`, `image/webp`. Máx 5 MB.

---

## 2.6 Estrategia de Importación Excel

Flujo del importador:
```
1. Admin sube archivo .xlsx
2. API /import parsea con SheetJS
3. Crea ImportJob con status=PROCESSING
4. Por cada fila (row):
   a. Valida campos obligatorios (country_iso, catalog_number, issue_date)
   b. Busca/crea el catálogo correspondiente
   c. Busca/crea el grupo por (year + titleEs)
   d. Crea la estampilla
   e. Registra resultado en ImportJobRow
5. Actualiza ImportJob con totales (ok, error)
6. Devuelve JSON con resumen y errores
```

Columnas del Excel (según investigacion notebook.txt):
`country_iso | catalog_system | catalog_number | issue_date | face_value | title_en | print_run | perforation | watermark | printing_method | color | image_url`

---

## 2.7 Design Tokens

```css
/* ---- src/styles/tokens.css ---- */
:root {
  /* Colores Principales */
  --color-bg:          #0A0A0A;
  --color-bg-surface:  #111111;
  --color-bg-elevated: #1A1A1A;
  --color-primary:     #556B2F;     /* Verde Musgo */
  --color-primary-light: #6B8A3E;
  --color-primary-dark:  #3D4F22;
  --color-accent:      #C8A96E;     /* Dorado filatélico */
  --color-text:        #E8E0D0;
  --color-text-muted:  #9A9080;
  --color-border:      #2A2A2A;
  --color-error:       #C0392B;

  /* Tipografía */
  --font-display: 'Cormorant Garamond', serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'Courier New', monospace;

  /* Tamaños */
  --fs-xs:   0.75rem;
  --fs-sm:   0.875rem;
  --fs-base: 1rem;
  --fs-lg:   1.125rem;
  --fs-xl:   1.25rem;
  --fs-2xl:  1.5rem;
  --fs-3xl:  2rem;
  --fs-4xl:  2.5rem;
  --fs-5xl:  3.5rem;

  /* Spacing */
  --sp-1:  0.25rem;
  --sp-2:  0.5rem;
  --sp-3:  0.75rem;
  --sp-4:  1rem;
  --sp-6:  1.5rem;
  --sp-8:  2rem;
  --sp-12: 3rem;
  --sp-16: 4rem;

  /* Bordes */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.5);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.6);
  --shadow-album: 0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05);
}
```
