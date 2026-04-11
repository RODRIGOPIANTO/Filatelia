# Guía de Deployment — Filatelia Peruana

## 1. Vercel (Recomendado)

### Prereqs
- Cuenta en [vercel.com](https://vercel.com)
- Repositorio en GitHub/GitLab
- Base de datos PostgreSQL (Vercel Postgres, Supabase, Neon o Railway)

### Pasos

```bash
# Opción A: Deploy desde CLI
npm install -g vercel
vercel login
vercel --prod

# Opción B: Conectar repositorio en vercel.com
# → Import Project → GitHub → Seleccionar repo → Configure → Deploy
```

### Variables de entorno en Vercel

| Variable | Dónde obtenerla |
|----------|----------------|
| `DATABASE_URL` | Panel de Vercel Postgres / Supabase Connection String |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://filateliaperuana.com` |
| `NEXT_PUBLIC_APP_URL` | `https://filateliaperuana.com` |

### Post-deploy

```bash
# Ejecutar migraciones en producción
npx prisma migrate deploy

# Poblar datos iniciales (solo primera vez)
npm run db:seed
```

---

## 2. Base de Datos

### Vercel Postgres (más sencillo)

1. En el dashboard de Vercel → Storage → Create → Postgres
2. Vincular al proyecto → las variables se agregan automáticamente
3. En local: `vercel env pull .env.local`

### Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Copiar la "Connection string" (modo `Transaction Pooler` para Vercel Serverless)
3. Agregar `?pgbouncer=true&connection_limit=1` al final de la URL

### Neon

1. Crear proyecto en [neon.tech](https://neon.tech)
2. Usar la URL de conexión serverless con `?sslmode=require`

---

## 3. Variables de Secretos GitHub Actions

Para el pipeline CI/CD, agrega en **Settings → Secrets and variables → Actions**:

| Secret | Descripción |
|--------|-------------|
| `VERCEL_TOKEN` | Token de Vercel CLI (`vercel login` → `~/.local/share/com.vercel.cli/auth.json`) |
| `VERCEL_ORG_ID` | ID de la organización en Vercel |
| `VERCEL_PROJECT_ID` | ID del proyecto en Vercel |

---

## 4. Checklist Pre-Producción

- [ ] `NEXTAUTH_SECRET` es un string aleatorio seguro (≥32 chars)
- [ ] `DATABASE_URL` apunta a la BD de producción
- [ ] Se ejecutaron las migraciones: `prisma migrate deploy`
- [ ] Se verificó el build: `npm run build`
- [ ] Headers de seguridad activos (verificar con [securityheaders.com](https://securityheaders.com))
- [ ] `robots.txt` bloquea `/admin`, `/api`
- [ ] `sitemap.xml` accesible en `https://filateliaperuana.com/sitemap.xml`
- [ ] Google Search Console: sitemap enviado
- [ ] Rate limiting verificado en `/api/import`

---

## 5. Monitoreo

### Vercel Analytics (recomendado)

```bash
npm install @vercel/analytics
```

En `src/app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'
// Agregar <Analytics /> antes del cierre de </body>
```

### Sentry (errores en producción)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```
