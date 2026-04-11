# Filatelia Peruana — Guía de Instalación

## Prerequisitos

Antes de instalar el proyecto, asegúrate de tener:

| Herramienta | Versión mínima | Descarga |
|---|---|---|
| **Node.js** | 20.x LTS | https://nodejs.org |
| **PostgreSQL** | 15+ | https://postgresql.org |
| **npm** | 10+ | (incluido con Node.js) |

---

## Paso 1 — Instalar Node.js

1. Ir a https://nodejs.org y descargar la versión **LTS (20.x)**
2. Ejecutar el instalador `.msi`
3. Verificar instalación:
```
node --version   # debe mostrar v20.x.x
npm --version    # debe mostrar 10.x.x
```

---

## Paso 2 — Instalar PostgreSQL

1. Ir a https://postgresql.org/download/windows/
2. Descargar e instalar (recordar el password del usuario `postgres`)
3. Crear la base de datos:
```sql
CREATE DATABASE filateliaperuana;
CREATE USER tienda WITH PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE filateliaperuana TO tienda;
```

---

## Paso 3 — Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
copy .env.example .env
```

Editar `.env` con tus datos:
```env
DATABASE_URL="postgresql://tienda:tu_password_seguro@localhost:5432/filateliaperuana"
NEXTAUTH_SECRET="genera-un-string-aleatorio-largo"
NEXTAUTH_URL="http://localhost:3000"
```

Para generar `NEXTAUTH_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Paso 4 — Instalar Dependencias

```bash
cd filateliaperuana
npm install
```

---

## Paso 5 — Inicializar la Base de Datos

```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones (crea todas las tablas)
npm run db:migrate

# Cargar datos de ejemplo (Perú, Israel, Chile, Brasil)
npm run db:seed
```

---

## Paso 6 — Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Abrir en el navegador: **http://localhost:3000**

### URLs importantes:
| URL | Descripción |
|---|---|
| `http://localhost:3000` | Sitio público (Home) |
| `http://localhost:3000/catalogos` | Landing de catálogos |
| `http://localhost:3000/catalogos/peru` | Catálogo de Perú |
| `http://localhost:3000/tienda` | Tienda |
| `http://localhost:3000/admin/dashboard` | Panel admin |

### Credenciales admin (datos seed):
```
Email:      admin@filateliaperuana.com
Contraseña: Admin2024!
```

---

## Comandos Útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run db:studio    # Interfaz visual de la BD (Prisma Studio)
npm run db:seed      # Re-cargar datos demo
npm run lint         # Verificar calidad de código
```

---

## Estructura de Fases Completadas

- [x] Fase 1 — Análisis y Arquitectura (`docs/FASE1_Arquitectura.md`)
- [x] Fase 2 — Diseño Técnico (`docs/FASE2_Diseño.md`)
- [ ] Fase 3 — Setup del Proyecto
- [ ] Fase 4 — Backend Core (API Routes)
- [ ] Fase 5 — Frontend Público
- [ ] Fase 6 — Admin Panel
- [ ] Fase 7 — Datos Demo
- [ ] Fase 8 — QA
- [ ] Fase 9 — Documentación Final
