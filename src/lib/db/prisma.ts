import { PrismaClient } from '@prisma/client'

// Patrón singleton para Prisma en Next.js
// Evita múltiples conexiones en desarrollo con hot-reload

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaConfig = {
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
} as any

// Inicialización segura para evitar errores en entornos sin base de datos (Vercel Build)
export const prisma =
  globalForPrisma.prisma ??
  (process.env.DATABASE_URL 
    ? new PrismaClient(prismaConfig) 
    : new Proxy({} as PrismaClient, {
        get: () => { throw new Error('Base de datos no configurada. Por favor, usa el modo demo.') }
      }))

if (process.env.NODE_ENV !== 'production' && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma
}
