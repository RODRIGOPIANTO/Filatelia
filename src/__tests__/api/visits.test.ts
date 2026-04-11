/**
 * @jest-environment node
 * Integration tests for /api/visits
 * Uses Next.js route handlers directly without a live server
 */
import { GET, POST } from '@/app/api/visits/route'
import { NextRequest } from 'next/server'

// Mock Prisma so tests run without a real DB
jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    siteVisit: {
      count:  jest.fn().mockResolvedValue(0),
      create: jest.fn().mockResolvedValue({ id: 'test-visit' }),
    },
  },
}))

describe('GET /api/visits', () => {
  it('returns visit count with 200', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty('visits')
    expect(typeof body.visits).toBe('number')
    expect(body.visits).toBeGreaterThan(0)
  })
})

describe('POST /api/visits', () => {
  it('creates a visit record and returns updated count', async () => {
    const req = new NextRequest('http://localhost:3000/api/visits', {
      method: 'POST',
      body: JSON.stringify({ path: '/', countryCode: 'PE' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty('visits')
    expect(typeof body.visits).toBe('number')
  })

  it('handles missing body gracefully', async () => {
    const req = new NextRequest('http://localhost:3000/api/visits', {
      method: 'POST',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })
})
